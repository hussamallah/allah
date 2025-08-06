// Test the new API key provided by the user
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://szedcfessmhnwmgfqfge.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZWRjZmVzc21obndtZ2ZxZmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MzAxMjIsImV4cCI6MjA2NzQwNjEyMn0.bgA87qo7d4D6g7rxBZyd7roZG1Yn5XXCpVdxpWh4sso';

console.log('🔍 Testing the new API key...');
console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseKey.length);
console.log('Key starts with:', supabaseKey.substring(0, 20) + '...');

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
        console.log('🔧 This suggests:');
        console.log('1. The project might be paused in Supabase dashboard');
        console.log('2. The API key might be for a different project');
        console.log('3. The project might need to be resumed');
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