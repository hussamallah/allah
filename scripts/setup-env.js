const fs = require('fs');
const path = require('path');

console.log('🔧 Environment Setup Helper\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '..', '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('✅ .env.local file found');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  const hasUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL=');
  const hasKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=');
  
  console.log('Environment variables:');
  console.log(`  Supabase URL: ${hasUrl ? '✅ SET' : '❌ MISSING'}`);
  console.log(`  Supabase Key: ${hasKey ? '✅ SET' : '❌ MISSING'}`);
  
  if (!hasUrl || !hasKey) {
    console.log('\n⚠️  Some environment variables are missing!');
    console.log('Please add the missing variables to your .env.local file.');
  }
} else {
  console.log('❌ .env.local file not found');
  console.log('\n📝 Creating .env.local template...');
  
  const template = `# Supabase Configuration
# Get these values from your Supabase project dashboard
# Go to Settings > API

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Example:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
`;
  
  fs.writeFileSync(envPath, template);
  console.log('✅ Created .env.local template');
  console.log('📝 Please edit .env.local and add your Supabase credentials');
}

console.log('\n📋 Next steps:');
console.log('1. Go to https://supabase.com/dashboard');
console.log('2. Create a new project or select existing one');
console.log('3. Go to Settings > API');
console.log('4. Copy Project URL and anon public key');
console.log('5. Add them to .env.local file');
console.log('6. Restart your development server');
console.log('7. Run: node scripts/test-database.js'); 