const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function debugProfilesAPI() {
  console.log('🔍 Debugging Profiles API...');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('📋 Environment variables:');
  console.log('SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('SUPABASE_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Test 1: Check if table exists
    console.log('\n🔍 Test 1: Checking if user_profiles table exists...');
    const { data: tableCheck, error: tableError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('❌ Table check error:', tableError);
      return;
    }
    console.log('✅ Table exists');

    // Test 2: Try to insert a test profile
    console.log('\n🔍 Test 2: Testing profile insertion...');
    const testProfile = {
      user_id: 'test-user-' + Date.now(),
      email: 'test@example.com',
      archetype: 'test-archetype',
      test_results: { test: true },
      time_spent: {},
      total_time: 0,
      last_activity: new Date().toISOString()
    };

    const { data: insertData, error: insertError } = await supabase
      .from('user_profiles')
      .insert(testProfile)
      .select();

    if (insertError) {
      console.error('❌ Insert error:', insertError);
      console.error('Error details:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code
      });
      return;
    }
    console.log('✅ Insert successful:', insertData);

    // Test 3: Try to update the profile
    console.log('\n🔍 Test 3: Testing profile update...');
    const { data: updateData, error: updateError } = await supabase
      .from('user_profiles')
      .update({
        archetype: 'updated-archetype',
        last_activity: new Date().toISOString()
      })
      .eq('user_id', testProfile.user_id)
      .select();

    if (updateError) {
      console.error('❌ Update error:', updateError);
      return;
    }
    console.log('✅ Update successful:', updateData);

    // Test 4: Clean up test data
    console.log('\n🔍 Test 4: Cleaning up test data...');
    const { error: deleteError } = await supabase
      .from('user_profiles')
      .delete()
      .eq('user_id', testProfile.user_id);

    if (deleteError) {
      console.error('❌ Delete error:', deleteError);
      return;
    }
    console.log('✅ Cleanup successful');

    console.log('\n✅ All tests passed! The API should work correctly.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

debugProfilesAPI(); 