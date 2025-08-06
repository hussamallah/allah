#!/usr/bin/env node

/**
 * War Room Database Setup Script
 * 
 * This script helps set up the database table for the war room functionality.
 * Run this after setting up your Supabase project.
 */

const fs = require('fs')
const path = require('path')

console.log('🔥 War Room Database Setup')
console.log('==========================\n')

// Read the SQL file
const sqlPath = path.join(__dirname, '..', 'database', 'user_profiles.sql')
const sqlContent = fs.readFileSync(sqlPath, 'utf8')

console.log('📋 SQL Migration Content:')
console.log('Copy and paste this into your Supabase SQL Editor:\n')
console.log('─'.repeat(80))
console.log(sqlContent)
console.log('─'.repeat(80))

console.log('\n📝 Setup Instructions:')
console.log('1. Go to your Supabase project dashboard')
console.log('2. Navigate to the SQL Editor')
console.log('3. Copy and paste the SQL content above')
console.log('4. Click "Run" to execute the migration')
console.log('5. Update admin emails in app/api/war-room/profiles/route.ts')

console.log('\n🔧 Next Steps:')
console.log('1. Update ADMIN_EMAILS in the API route with your admin emails')
console.log('2. Ensure your environment variables are set')
console.log('3. Test the war room by navigating to /war-room')
console.log('4. Have users complete the archetype journey to see data')

console.log('\n✅ Setup complete! The war room is ready to track user journeys.') 