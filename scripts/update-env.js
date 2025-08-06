#!/usr/bin/env node

/**
 * Update Environment Variables Script
 * 
 * This script helps update the .env.local file with new Supabase credentials
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Update Environment Variables Script\n');

// Get command line arguments
const args = process.argv.slice(2);
const newUrl = args[0];
const newKey = args[1];

if (!newUrl || !newKey) {
  console.log('❌ Usage: node scripts/update-env.js <supabase_url> <anon_public_key>');
  console.log('');
  console.log('📋 Example:');
  console.log('   node scripts/update-env.js https://your-project.supabase.co eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
  console.log('');
  console.log('🔗 Get your credentials from: https://supabase.com/dashboard/project/_/settings/api');
  console.log('⚠️  Make sure to use the "anon public" key (starts with eyJ), NOT the service role key!');
  process.exit(1);
}

// Validate the key format
if (!newKey.startsWith('eyJ')) {
  console.log('❌ ERROR: The key should be the "anon public" key that starts with "eyJ"');
  console.log('   You provided a service role key (starts with "sb_secret_")');
  console.log('   Service role keys should NEVER be used in client-side code!');
  console.log('');
  console.log('🔗 Go to: https://supabase.com/dashboard/project/_/settings/api');
  console.log('   Copy the "anon public" key (not the service role key)');
  process.exit(1);
}

// Validate the URL format
if (!newUrl.startsWith('https://') || !newUrl.includes('.supabase.co')) {
  console.log('❌ ERROR: The URL should be a valid Supabase project URL');
  console.log('   Example: https://your-project-id.supabase.co');
  process.exit(1);
}

const envPath = path.join(__dirname, '..', '.env.local');

// Read current .env.local file
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  console.log('📁 Found existing .env.local file');
} else {
  console.log('📁 Creating new .env.local file');
}

// Update or add the environment variables
const lines = envContent.split('\n');
let updatedUrl = false;
let updatedKey = false;

const newLines = lines.map(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
    updatedUrl = true;
    return `NEXT_PUBLIC_SUPABASE_URL=${newUrl}`;
  }
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
    updatedKey = true;
    return `NEXT_PUBLIC_SUPABASE_ANON_KEY=${newKey}`;
  }
  return line;
});

// Add new variables if they don't exist
if (!updatedUrl) {
  newLines.push(`NEXT_PUBLIC_SUPABASE_URL=${newUrl}`);
}
if (!updatedKey) {
  newLines.push(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${newKey}`);
}

// Write the updated content
const newContent = newLines.join('\n');
fs.writeFileSync(envPath, newContent);

console.log('✅ Environment variables updated successfully!');
console.log('');
console.log('📋 Updated values:');
console.log(`   URL: ${newUrl}`);
console.log(`   Key: ${newKey.substring(0, 20)}...`);
console.log('');
console.log('🔄 Next steps:');
console.log('1. Restart your development server');
console.log('2. Run: node scripts/fix-supabase-connection.js');
console.log('3. Test the save functionality');
console.log('');
console.log('🔗 If you need to set up the database table, see: SUPABASE_CONNECTION_FIX.md'); 