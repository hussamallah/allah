async function testTimeTracking() {
  console.log('🧪 Testing Improved Time Tracking System\n');
  
  try {
    // Create a test profile with immediate time tracking
    const testData = {
      email: 'immediate-tracking@test.com',
      archetype: 'spotlight',
      testResults: {
        archetypeConfig: { name: 'Spotlight', color: '#f59e0b' },
        timeSpent: {
          '/quiz': 45, // Time spent on quiz
          '/chamber/spotlight': 120, // Time spent on chamber landing
          '/chamber/spotlight/explore-who-you-are': 180 // Time spent on explore page
        },
        submittedAt: new Date().toISOString()
      },
      timeSpent: {
        '/quiz': 45,
        '/chamber/spotlight': 120,
        '/chamber/spotlight/explore-who-you-are': 180
      }
    };
    
    console.log('📤 Creating test profile with immediate time tracking...');
    console.log('   Expected time tracking to start on:');
    console.log('   - /quiz (45s)');
    console.log('   - /chamber/spotlight (120s)');
    console.log('   - /chamber/spotlight/explore-who-you-are (180s)');
    
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
      
      const testUser = usersData.users.find(u => u.email === 'immediate-tracking@test.com');
      if (testUser) {
        console.log('✅ User found in war room');
        console.log('   Total time:', testUser.total_time, 'seconds');
        console.log('   Time spent breakdown:');
        Object.entries(testUser.time_spent).forEach(([page, time]) => {
          console.log(`   - ${page}: ${time} seconds`);
        });
      } else {
        console.log('❌ User not found in war room data');
      }
      
    } else {
      console.log('❌ Failed to create test profile:', result);
    }
    
  } catch (error) {
    console.log('❌ Error testing time tracking:', error.message);
  }
}

testTimeTracking(); 