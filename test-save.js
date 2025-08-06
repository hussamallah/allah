// Test the save API endpoint
require('dotenv').config({ path: '.env.local' });

const fetch = require('node-fetch');

async function testSave() {
  console.log('Testing save API endpoint...');
  
  const testData = {
    email: 'test@example.com',
    archetype: 'guardian',
    testResults: {
      archetypeConfig: { name: 'Guardian', emoji: '🛡️' },
      timeSpent: { '/chamber/guardian': 120 },
      submittedAt: new Date().toISOString()
    },
    timeSpent: { '/chamber/guardian': 120 }
  };
  
  try {
    const response = await fetch('http://localhost:3000/api/war-room/profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response body:', result);
    
    if (response.ok) {
      console.log('✅ Save API is working!');
    } else {
      console.log('❌ Save API failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

testSave(); 