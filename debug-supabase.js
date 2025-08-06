// Debug Supabase connection with detailed error information
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Debugging Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseKey ? supabaseKey.length : 0);
console.log('Key starts with:', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'N/A');

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing environment variables');
  process.exit(1);
}

// Validate URL format
if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
  console.log('❌ Invalid Supabase URL format');
  process.exit(1);
}

// Validate key format (should start with eyJ)
if (!supabaseKey.startsWith('eyJ')) {
  console.log('❌ Invalid API key format - should start with eyJ');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('🔗 Testing connection...');
    
    // Test basic connection with a simple query
    const { data, error } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log('❌ Supabase error:', error.message);
      console.log('Error details:', error);
      
      if (error.message.includes('Invalid API key')) {
        console.log('🔧 Possible solutions:');
        console.log('1. Check if the API key is correct in your Supabase dashboard');
        console.log('2. Make sure you\'re using the "anon public" key, not the service role key');
        console.log('3. Verify the project URL is correct');
        console.log('4. Check if your Supabase project is active');
      } else if (error.message.includes('relation "user_profiles" does not exist')) {
        console.log('✅ Connection works! Table just needs to be created.');
        console.log('Run the setup-database.sql script in your Supabase dashboard');
      }
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('Data:', data);
    }
  } catch (err) {
    console.log('❌ Connection error:', err.message);
    console.log('Full error:', err);
  }
}

testConnection(); 