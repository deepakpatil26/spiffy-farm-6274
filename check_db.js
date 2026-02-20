const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://butgdlroubygbwncfvht.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dGdkbHJvdWJ5Z2J3bmNmdmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzA5MjcsImV4cCI6MjA4NjkwNjkyN30.SeRmpP2N6jPV5-mkqe-_UQ5ocfTK3uHFfYMm2_DXQWk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
  const { data, error, count } = await supabase
    .from('products_data')
    .select('*', { count: 'exact' });
  if (error) {
    console.error('Error fetching data:', error);
    return;
  }
  console.log('Total Products:', count);
  if (data && data.length > 0) {
    console.log(
      'Sample Data (First Product):',
      JSON.stringify(data[0], null, 2),
    );
  } else {
    console.log('NO DATA FOUND in products_data');
  }
}

checkData();
