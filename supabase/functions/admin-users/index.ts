import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
};

interface AuthUser {
  id: string;
  email: string;
  created_at: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
  };
}

// Check if user is admin (you can customize this logic)
async function checkAdminRole(
  supabaseAdmin: any,
  userId: string,
): Promise<boolean> {
  try {
    // Get user from auth.users
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (error || !user) {
      return false;
    }

    // Check if user has admin role in user_metadata or custom claims
    const adminEmails = (Deno.env.get('ADMIN_EMAILS') ?? '')
      .split(',')
      .map((email: string) => email.trim().toLowerCase())
      .filter(Boolean);

    const isAdminByRole =
      user.user_metadata?.role === 'admin' ||
      user.app_metadata?.role === 'admin';
    const isAdminByEmail = adminEmails.includes((user.email ?? '').toLowerCase());
    const isAdmin = isAdminByRole || isAdminByEmail;

    return isAdmin;
  } catch (error) {
    return false;
  }
}

Deno.serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase admin client with service role key
    const url =
      Deno.env.get('PROJECT_URL') ?? Deno.env.get('SUPABASE_URL') ?? '';
    const serviceKey =
      Deno.env.get('PROJECT_SERVICE_ROLE_KEY') ??
      Deno.env.get('SUPABASE_SERVICE_ROLE') ??
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ??
      '';

    if (!url || !serviceKey) {
      return new Response(
        JSON.stringify({
          error: 'Server configuration error: missing Supabase credentials',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    const supabaseAdmin = createClient(url, serviceKey);
    const authHeader =
      req.headers.get('authorization') ?? req.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid authorization header' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    const token = authHeader.replace('Bearer ', '').trim();
    const {
      data: { user: requestingUser },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);

    if (authError || !requestingUser) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const isAdmin = await checkAdminRole(supabaseAdmin, requestingUser.id);
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle GET request - List all users
    if (req.method === 'GET') {
      const { data: authUsers, error: usersError } =
        await supabaseAdmin.auth.admin.listUsers();

      if (usersError) {
        throw usersError;
      }

      const users: AuthUser[] = authUsers.users.map((user: any) => ({
        id: user.id,
        email: user.email || '',
        created_at: user.created_at,
        user_metadata: user.user_metadata || {},
      }));

      return new Response(JSON.stringify({ users }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle DELETE request - Delete a user
    if (req.method === 'DELETE') {
      const { userId } = await req.json();

      if (!userId) {
        return new Response(JSON.stringify({ error: 'User ID is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Delete the user
      const { error: deleteError } =
        await supabaseAdmin.auth.admin.deleteUser(userId);

      if (deleteError) {
        throw deleteError;
      }

      return new Response(
        JSON.stringify({ message: 'User deleted successfully', userId }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
