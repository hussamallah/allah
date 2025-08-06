#!/usr/bin/env node

/**
 * Environment Variables Check Script
 * 
 * This script checks if the required environment variables are configured
 * and provides helpful feedback for setting up the application.
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking environment variables...\n');

// Check for .env.local file
const envLocalPath = path.join(__dirname, '..', '.env.local');
const envExamplePath = path.join(__dirname, '..', '.env.example');

let hasEnvLocal = fs.existsSync(envLocalPath);
let hasEnvExample = fs.existsSync(envExamplePath);

console.log(`📁 .env.local file: ${hasEnvLocal ? '✅ Found' : '❌ Not found'}`);
console.log(`📁 .env.example file: ${hasEnvExample ? '✅ Found' : '❌ Not found'}`);

if (!hasEnvLocal) {
  console.log('\n⚠️  No .env.local file found!');
  console.log('\n📋 To fix this:');
  console.log('1. Create a file called .env.local in the project root');
  console.log('2. Add the following content:');
  console.log('');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here');
  console.log('');
  console.log('3. Replace the placeholder values with your actual Supabase credentials');
  console.log('4. Restart your development server');
} else {
  // Read and check the .env.local file
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  const lines = envContent.split('\n');
  
  let hasSupabaseUrl = false;
  let hasSupabaseKey = false;
  
  lines.forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      hasSupabaseUrl = true;
      const value = line.split('=')[1];
      if (value && value !== 'your_supabase_project_url_here') {
        console.log('✅ NEXT_PUBLIC_SUPABASE_URL: Configured');
      } else {
        console.log('❌ NEXT_PUBLIC_SUPABASE_URL: Not configured (using placeholder)');
      }
    }
    
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      hasSupabaseKey = true;
      const value = line.split('=')[1];
      if (value && value !== 'your_supabase_anon_key_here') {
        console.log('✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Configured');
      } else {
        console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY: Not configured (using placeholder)');
      }
    }
  });
  
  if (!hasSupabaseUrl) {
    console.log('❌ NEXT_PUBLIC_SUPABASE_URL: Missing from .env.local');
  }
  
  if (!hasSupabaseKey) {
    console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY: Missing from .env.local');
  }
  
  if (hasSupabaseUrl && hasSupabaseKey) {
    console.log('\n✅ Environment variables appear to be configured!');
    console.log('\n📋 Next steps:');
    console.log('1. Make sure your Supabase project is set up');
    console.log('2. Create the user_profiles table in your Supabase database');
    console.log('3. Restart your development server');
    console.log('4. Test the save functionality');
  }
}

console.log('\n📚 For detailed setup instructions, see: SETUP_ENVIRONMENT_VARIABLES.md');
console.log('\n🔗 Supabase Dashboard: https://database.new');
console.log('🔗 Supabase API Settings: https://supabase.com/dashboard/project/_?showConnect=true'); 