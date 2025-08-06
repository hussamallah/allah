require('dotenv').config({ path: '.env.local' });

console.log('🔍 Environment Variables Check:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ SET' : '❌ MISSING');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ SET' : '❌ MISSING');

// Test the same Supabase client creation as the API
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Environment variables missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test the same query as the API
supabase
  .from('user_profiles')
  .select('*')
  .order('created_at', { ascending: false })
  .then(({ data, error }) => {
    if (error) {
      console.log('❌ Database error:', error.message);
    } else {
      console.log('✅ Database query successful');
      console.log(`📊 Found ${data?.length || 0} profiles`);
    }
  })
  .catch(err => {
    console.log('❌ Connection error:', err.message);
  }); 