const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testAuth() {
  console.log('🔐 Testing Authentication...');
  
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
    // Test 1: Try to sign in with existing user
    console.log('\n🔍 Test 1: Testing user signin...');
    const userEmail = 'hus.1998.apr@gmail.com';
    const userPassword = 'Killaz_123';
    
    console.log('Attempting to sign in with:', userEmail);
    
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });

    if (signInError) {
      console.error('❌ Signin error:', signInError);
      console.error('Error details:', {
        message: signInError.message,
        details: signInError.details,
        hint: signInError.hint,
        code: signInError.code
      });
      return;
    }

    console.log('✅ Signin successful:', signInData);
    console.log('🎉 Authentication is working! You can now log in with:');
    console.log('Email:', userEmail);
    console.log('Password:', userPassword);
    
    // Test 2: Check current session
    console.log('\n🔍 Test 2: Checking current session...');
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      console.log('✅ Active session found for user:', session.user.email);
    } else {
      console.log('❌ No active session found');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testAuth();
