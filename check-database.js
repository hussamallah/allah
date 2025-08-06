// Check database for saved profiles
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Checking database for saved profiles...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.log('❌ Database error:', error.message);
      return;
    }
    
    console.log(`✅ Found ${data.length} profiles in database:`);
    
    if (data.length === 0) {
      console.log('No profiles found. The save might not have worked.');
    } else {
      data.forEach((profile, index) => {
        console.log(`\n--- Profile ${index + 1} ---`);
        console.log('Email:', profile.email);
        console.log('Archetype:', profile.archetype);
        console.log('Created:', profile.created_at);
        console.log('Last Activity:', profile.last_activity);
      });
    }
  } catch (err) {
    console.log('❌ Error:', err.message);
  }
}

checkDatabase(); 