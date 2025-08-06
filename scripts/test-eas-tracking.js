async function testEASTracking() {
  console.log('🧪 Testing EAS Tracking System\n');
  
  try {
    // Create a test profile with EAS data
    const testData = {
      email: 'eas-test@example.com',
      archetype: 'spotlight',
      testResults: {
        archetypeConfig: { name: 'Spotlight', color: '#f59e0b' },
        timeSpent: {
          '/quiz': 45,
          '/chamber/spotlight': 120,
          '/chamber/spotlight/explore-who-you-are': 180
        },
        submittedAt: new Date().toISOString()
      },
      timeSpent: {
        '/quiz': 45,
        '/chamber/spotlight': 120,
        '/chamber/spotlight/explore-who-you-are': 180
      },
      // EAS data
      eas_events: [
        {
          id: 'personal-1',
          type: 'personal',
          action: 'quiz_completed',
          score: 20,
          timestamp: new Date().toISOString(),
          page: '/quiz/results',
          details: { archetype: 'spotlight' }
        },
        {
          id: 'personal-2',
          type: 'personal',
          action: 'question_answered',
          score: 15,
          timestamp: new Date().toISOString(),
          page: '/quiz',
          details: { questionNumber: 15, totalQuestions: 15 }
        },
        {
          id: 'behavioral-1',
          type: 'behavioral',
          action: 'stalled_page',
          score: 2,
          timestamp: new Date().toISOString(),
          page: '/chamber/spotlight',
          details: { timeSpent: 25 }
        }
      ],
      personal_eas: 35, // 20 + 15
      behavioral_eas: 2
    };
    
    console.log('📤 Creating test profile with EAS tracking...');
    console.log('   Expected EAS scores:');
    console.log('   - Personal EAS: 35 (Superuser level)');
    console.log('   - Behavioral EAS: 2 (Flowing level)');
    
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
      
      // Check the war room data
      console.log('\n🔍 Checking war room data...');
      const usersResponse = await fetch('http://localhost:3000/api/war-room/users-real-time');
      const usersData = await usersResponse.json();
      
      const testUser = usersData.users.find(u => u.email === 'eas-test@example.com');
      if (testUser) {
        console.log('✅ User found in war room');
        console.log('   Personal EAS:', testUser.personal_eas, '(should be 35)');
        console.log('   Behavioral EAS:', testUser.behavioral_eas, '(should be 2)');
        console.log('   EAS Events:', testUser.eas_events?.length || 0, 'events');
        
        if (testUser.eas_events?.length > 0) {
          console.log('\n📊 EAS Events breakdown:');
          testUser.eas_events.forEach((event, index) => {
            console.log(`   ${index + 1}. ${event.type.toUpperCase()}: ${event.action} (+${event.score})`);
          });
        }
      } else {
        console.log('❌ User not found in war room data');
      }
      
    } else {
      console.log('❌ Failed to create test profile:', result);
    }
    
  } catch (error) {
    console.log('❌ Error testing EAS tracking:', error.message);
  }
}

testEASTracking(); 