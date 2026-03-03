import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

interface UserData {
  id: string;
  email: string;
  created_at: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
  };
}

const ManageUsers: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getFunctionErrorMessage = async (
    invokeError: any,
    fallback: string,
  ): Promise<string> => {
    let message = invokeError?.message || fallback;
    const context = invokeError?.context;

    if (context?.json) {
      try {
        const body = await context.json();
        message = body?.error || body?.message || message;
      } catch {
        // Keep default message when response body is not JSON.
      }
    }

    return message;
  };

  const getData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Get the current session to include auth token
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Use environment variable directly instead of accessing protected property
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

      // Debug logging
      if (!session) {
        setError(
          'No session found. Please log in as admin to access this page.',
        );
        setIsLoading(false);
        return;
      }

      if (!session.access_token) {
        setError('No access token in session. Please log in again.');
        setIsLoading(false);
        return;
      }

      if (!supabaseUrl) {
        setError('Supabase URL not configured.');
        setIsLoading(false);
        return;
      }

      const { data, error: invokeError } = await supabase.functions.invoke(
        'admin-users',
        {
          method: 'GET',
        },
      );

      if (invokeError) {
        const detailedError = await getFunctionErrorMessage(
          invokeError,
          'Failed to fetch users',
        );
        throw new Error(detailedError);
      }

      const users = data?.users || [];
      setUserData(users);
      setIsLoading(false);
    } catch (err: any) {
      setError(
        err.message ||
          'Failed to fetch users. Check browser console for details.',
      );
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const deleteUser = async (userId: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this user? This action cannot be undone.',
      )
    ) {
      return;
    }

    setDeletingUserId(userId);
    setDeleteError(null);

    try {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

      if (!supabaseUrl) {
        setDeleteError('Supabase URL not configured.');
        return;
      }

      const { error: invokeError } = await supabase.functions.invoke(
        'admin-users',
        {
          method: 'DELETE',
          body: { userId },
        },
      );

      if (!invokeError) {
        setUserData(userData.filter((user) => user.id !== userId));
        setSuccessMessage('User deleted successfully!');
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        const detailedError = await getFunctionErrorMessage(
          invokeError,
          'Failed to delete user',
        );
        setDeleteError(detailedError);
      }
    } catch (err: any) {
      setDeleteError(err.message || 'Failed to delete user');
    } finally {
      setDeletingUserId(null);
    }
  };

  if (isLoading) {
    return (
      <>
        <AdminNavbar />
        <AdminSidebar />
        <div className='ml-64 pt-16 p-8'>
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNavbar />
        <AdminSidebar />
        <div className='ml-64 pt-16 p-8'>
          <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
            <h3 className='text-lg font-semibold text-red-800 mb-2'>
              Error Loading Users
            </h3>
            <p className='text-red-700 mb-4'>{error}</p>
            {error.includes('Edge function not found') && (
              <div className='bg-yellow-50 border border-yellow-200 rounded p-3 mb-4'>
                <p className='text-yellow-800 text-sm'>
                  <strong>Note:</strong> The admin-users Edge Function needs to
                  be deployed to Supabase. Please ensure the function is
                  properly deployed and accessible.
                </p>
              </div>
            )}
            <button
              onClick={getData}
              className='mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors'>
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className='ml-64 pt-16 p-8'>
        {successMessage && (
          <div className='mb-4 bg-green-50 border border-green-200 rounded-lg p-4'>
            <p className='text-green-800'>{successMessage}</p>
          </div>
        )}

        {deleteError && (
          <div className='mb-4 bg-red-50 border border-red-200 rounded-lg p-4'>
            <p className='text-red-800'>{deleteError}</p>
          </div>
        )}

        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Manage Users
            </h2>
            <p className='text-sm text-gray-600 mt-1'>
              Total users: {userData.length}
            </p>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    S.No
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    User Name
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Email
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Created At
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {userData.length > 0 ? (
                  userData.map((user, index) => (
                    <tr
                      key={user.id}
                      className='hover:bg-gray-50 transition-colors'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {index + 1}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {user.user_metadata?.first_name &&
                        user.user_metadata?.last_name
                          ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                          : user.user_metadata?.first_name || 'N/A'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {user.email}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm'>
                        <button
                          onClick={() => deleteUser(user.id)}
                          disabled={deletingUserId === user.id}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            deletingUserId === user.id
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-red-600 hover:bg-red-700 text-white'
                          }`}>
                          {deletingUserId === user.id
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className='px-6 py-4 text-center text-gray-500'>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
