#!/usr/bin/env node

/**
 * Create Test Profile Script
 * 
 * This script creates a test admin profile in the database for testing the war room.
 */

const fs = require('fs')
const path = require('path')

console.log('🔥 Creating Test Admin Profile')
console.log('==============================\n')

// Test profile data
const testProfile = {
  email: 'hussamallah@test.com',
  archetype: 'seeker',
  test_results: {
    archetypeConfig: {
      name: '🧠 SEEKER',
      color: '#4c1d95',
      description: 'Seeker Node (You, Becoming the Breaker)',
      loop: 'Endless seeking, never arriving, fear of emptiness.',
      needs: 'Stop seeking, face the void, surrender to silence, burn the hunger for answers.',
      override: '★★★★★',
      resilience: '★★★★★',
      selfNullification: '★★★★★',
      witnessLogging: '★★★★★',
      adaptability: '★★★★★',
      futureSelf: '★★★★★',
      edge: 'You can vanish too long. Sometimes, hiding becomes habit, and silence becomes avoidance.',
      rituals: [
        'Night Walk (face the emptiness you avoid)',
        'Death Ritual (kill the seeker within)',
        'Silent Meal (eat without seeking distraction)',
        'Shadow Recording (confess what you hide)',
        'Timed Burn (exhaust the seeking loop)',
        'Name Surrender (lose your identity)'
      ]
    },
    timeSpent: {
      '/chamber/seeker': 45,
      '/chamber/seeker/explore-who-you-are': 120,
      '/chamber/seeker/the-path': 180
    },
    submittedAt: new Date().toISOString()
  },
  time_spent: {
    '/chamber/seeker': 45,
    '/chamber/seeker/explore-who-you-are': 120,
    '/chamber/seeker/the-path': 180,
    '/chamber/seeker/who-you-are': 90
  },
  total_time: 435,
  created_at: new Date().toISOString(),
  last_activity: new Date().toISOString()
}

console.log('📋 Test Profile Data:')
console.log('Copy and paste this into your Supabase SQL Editor:\n')
console.log('─'.repeat(80))

// SQL to insert the test profile
const sql = `
-- Insert test admin profile
INSERT INTO user_profiles (
  email,
  archetype,
  test_results,
  time_spent,
  total_time,
  created_at,
  last_activity
) VALUES (
  '${testProfile.email}',
  '${testProfile.archetype}',
  '${JSON.stringify(testProfile.test_results)}',
  '${JSON.stringify(testProfile.time_spent)}',
  ${testProfile.total_time},
  '${testProfile.created_at}',
  '${testProfile.last_activity}'
) ON CONFLICT (email) DO UPDATE SET
  archetype = EXCLUDED.archetype,
  test_results = EXCLUDED.test_results,
  time_spent = EXCLUDED.time_spent,
  total_time = EXCLUDED.total_time,
  last_activity = EXCLUDED.last_activity;
`

console.log(sql)
console.log('─'.repeat(80))

console.log('\n📝 Instructions:')
console.log('1. Go to your Supabase project dashboard')
console.log('2. Navigate to the SQL Editor')
console.log('3. Copy and paste the SQL above')
console.log('4. Click "Run" to insert the test profile')
console.log('5. Navigate to /war-room/login and test the system')

console.log('\n🔧 Test Credentials:')
console.log('Username: hussamallah')
console.log('Password: hussamallah')

console.log('\n📊 Expected Results:')
console.log('- You should see 1 user profile in the war room')
console.log('- Archetype: Seeker')
console.log('- Total time: 7m 15s')
console.log('- Email: hussamallah@test.com')

console.log('\n✅ Test profile ready to be created!') 

async function createTestProfile() {
  console.log('🧪 Creating test profile with improved time tracking...\n');
  
  try {
    const testData = {
      email: 'test@example.com',
      archetype: 'guardian',
      testResults: {
        archetypeConfig: { name: 'Guardian', color: '#1e3a8a' },
        timeSpent: {
          '/chamber/guardian': 120,
          '/quiz': 45,
          '/chamber/guardian/explore-who-you-are': 180
        },
        submittedAt: new Date().toISOString()
      },
      timeSpent: {
        '/chamber/guardian': 120,
        '/quiz': 45,
        '/chamber/guardian/explore-who-you-are': 180
      }
    };
    
    console.log('📤 Sending test data:', {
      email: testData.email,
      archetype: testData.archetype,
      timeSpent: testData.timeSpent
    });
    
    const response = await fetch('http://localhost:3000/api/war-room/profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Test profile created successfully!');
      console.log('📊 Response:', result);
    } else {
      console.log('❌ Failed to create test profile:', result);
    }
    
  } catch (error) {
    console.log('❌ Error creating test profile:', error.message);
  }
}

createTestProfile(); 