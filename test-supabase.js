// Test Supabase connection
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key present:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.message.includes('relation "user_profiles" does not exist')) {
        console.log('✅ Supabase connection works!');
        console.log('❌ user_profiles table does not exist yet');
        console.log('Please run the SQL script in your Supabase dashboard');
      } else {
        console.log('❌ Supabase error:', error.message);
      }
    } else {
      console.log('✅ Supabase connection and table both work!');
    }
  } catch (err) {
    console.log('❌ Connection error:', err.message);
  }
}

testConnection(); 