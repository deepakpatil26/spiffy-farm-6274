require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please check your .env.local file.',
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
  const { data, error, count } = await supabase
    .from('products_data')
    .select('*', { count: 'exact' });
  if (error) {
    console.error('Error fetching data:', error);
    return;
  }
  if (data && data.length > 0) {
    // Data loaded, silently proceed
  } else {
  }
}

checkData();
