async function testDatabase() {
  console.log('🔍 Testing database connection...\n');
  
  try {
    // Test environment variables
    console.log('1. Testing environment variables...');
    const envResponse = await fetch('http://localhost:3000/api/env');
    const envData = await envResponse.json();
    
    console.log('Environment Status:', {
      'Supabase URL': envData.supabaseUrl ? '✅ SET' : '❌ NOT SET',
      'Supabase Key': envData.supabaseKey ? '✅ SET' : '❌ NOT SET',
      'Node Environment': envData.nodeEnv || '❌ NOT SET'
    });
    
    if (!envData.supabaseUrl || !envData.supabaseKey) {
      console.log('\n❌ Environment variables are not properly configured!');
      console.log('Please check your .env.local file and ensure you have:');
      console.log('- NEXT_PUBLIC_SUPABASE_URL');
      console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }
    
    console.log('\n2. Testing database connection...');
    const dbResponse = await fetch('http://localhost:3000/api/test-database');
    const dbData = await dbResponse.json();
    
    if (dbData.success) {
      console.log('✅ Database connection successful!');
      console.log(`📊 Total profiles in database: ${dbData.count}`);
    } else {
      console.log('❌ Database connection failed!');
      console.log('Error:', dbData.error);
      console.log('Details:', dbData.details);
      
      if (dbData.details?.message?.includes('relation "user_profiles" does not exist')) {
        console.log('\n💡 The user_profiles table does not exist.');
        console.log('Please run the setup-database.sql script in your Supabase SQL Editor.');
      }
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('\nMake sure your development server is running on http://localhost:3000');
  }
}

testDatabase(); 