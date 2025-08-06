const { exec } = require('child_process');
const fs = require('fs');

// Read environment variables from .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

console.log('🔧 Adding environment variables to Vercel...');

// Add each environment variable
Object.entries(envVars).forEach(([key, value]) => {
  console.log(`📝 Adding ${key}...`);
  
  // Use PowerShell to handle the interactive prompt
  const command = `powershell -Command "Write-Output '${value}' | vercel env add ${key} production"`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error adding ${key}:`, error.message);
    } else {
      console.log(`✅ Successfully added ${key}`);
    }
  });
});

console.log('🎯 Environment variables added! Deploying to production...');

// Deploy to production
setTimeout(() => {
  exec('vercel --prod', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Deployment error:', error.message);
    } else {
      console.log('✅ Deployment successful!');
      console.log(stdout);
    }
  });
}, 5000); 