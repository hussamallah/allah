#!/usr/bin/env node

/**
 * Supabase Connection Fix Script
 * 
 * This script helps diagnose and fix common Supabase connection issues
 * including invalid API keys and missing database tables.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

console.log('🔧 Supabase Connection Fix Script\n');

// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('📋 Environment Check:');
console.log(`   URL: ${supabaseUrl ? '✅ Present' : '❌ Missing'}`);
console.log(`   Key: ${supabaseKey ? '✅ Present' : '❌ Missing'}`);

if (!supabaseUrl || !supabaseKey) {
  console.log('\n❌ Missing environment variables!');
  console.log('\n📋 To fix this:');
  console.log('1. Create a .env.local file in the project root');
  console.log('2. Add your Supabase credentials:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your_project_url');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key');
  console.log('\n🔗 Get your credentials from: https://supabase.com/dashboard/project/_?showConnect=true');
  process.exit(1);
}

// Test the connection
console.log('\n🔍 Testing Supabase connection...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnoseConnection() {
  try {
    // Test 1: Basic connection
    console.log('\n📡 Test 1: Basic connection...');
    const { data: testData, error: testError } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.log('❌ Connection failed:', testError.message);
      
      if (testError.message.includes('Invalid API key')) {
        console.log('\n🔑 INVALID API KEY DETECTED');
        console.log('\n📋 This means:');
        console.log('   • Your Supabase project may have been deleted');
        console.log('   • The API key has been regenerated');
        console.log('   • The project URL is incorrect');
        
        console.log('\n🛠️  To fix this:');
        console.log('1. Go to https://database.new');
        console.log('2. Create a new Supabase project');
        console.log('3. Get the new credentials from Settings → API');
        console.log('4. Update your .env.local file');
        console.log('5. Run the database setup script');
        
        return false;
      }
      
      if (testError.message.includes('relation "user_profiles" does not exist')) {
        console.log('\n📊 TABLE MISSING DETECTED');
        console.log('\n📋 The connection works, but the database table is missing!');
        
        console.log('\n🛠️  To fix this:');
        console.log('1. Go to your Supabase dashboard');
        console.log('2. Open the SQL Editor');
        console.log('3. Run the setup-database.sql script');
        console.log('4. Or copy this SQL:');
        
        const setupSQL = fs.readFileSync(path.join(__dirname, '..', 'setup-database.sql'), 'utf8');
        console.log('\n' + setupSQL);
        
        return false;
      }
      
      console.log('\n❌ Unknown error:', testError.message);
      return false;
    }
    
    console.log('✅ Connection successful!');
    console.log('✅ Database table exists!');
    
    // Test 2: Try to insert a test record
    console.log('\n📝 Test 2: Testing write permissions...');
    const { data: insertData, error: insertError } = await supabase
      .from('user_profiles')
      .insert({
        email: 'test@example.com',
        archetype: 'test',
        time_spent: {},
        total_time: 0
      })
      .select();
    
    if (insertError) {
      console.log('❌ Write test failed:', insertError.message);
      
      if (insertError.message.includes('duplicate key')) {
        console.log('✅ Write permissions work (duplicate key is expected)');
      } else {
        console.log('❌ Write permissions issue:', insertError.message);
        return false;
      }
    } else {
      console.log('✅ Write permissions work!');
      
      // Clean up test record
      await supabase
        .from('user_profiles')
        .delete()
        .eq('email', 'test@example.com');
    }
    
    console.log('\n🎉 All tests passed! Your Supabase connection is working correctly.');
    return true;
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
    return false;
  }
}

// Run the diagnosis
diagnoseConnection().then(success => {
  if (success) {
    console.log('\n✅ Your Supabase setup is working correctly!');
    console.log('   You should now be able to save profiles without issues.');
  } else {
    console.log('\n❌ Issues detected. Please follow the instructions above to fix them.');
    console.log('\n📚 For more help, see: SETUP_ENVIRONMENT_VARIABLES.md');
  }
  
  console.log('\n🔗 Useful links:');
  console.log('   • Supabase Dashboard: https://database.new');
  console.log('   • API Settings: https://supabase.com/dashboard/project/_?showConnect=true');
  console.log('   • SQL Editor: https://supabase.com/dashboard/project/_/sql');
}); 