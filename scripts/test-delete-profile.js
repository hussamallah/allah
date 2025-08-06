async function testDeleteProfile() {
  console.log('🧪 Testing Delete Profile Functionality\n');
  
  try {
    // First, create a test profile to delete
    const testData = {
      email: 'delete-test@example.com',
      archetype: 'spotlight',
      testResults: {
        archetypeConfig: { name: 'Spotlight', color: '#f59e0b' },
        timeSpent: { '/quiz': 30 },
        submittedAt: new Date().toISOString()
      },
      timeSpent: { '/quiz': 30 }
    };
    
    console.log('📤 Creating test profile for deletion...');
    
    const createResponse = await fetch('http://localhost:3000/api/war-room/profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    if (!createResponse.ok) {
      console.log('❌ Failed to create test profile');
      return;
    }
    
    const createResult = await createResponse.json();
    console.log('✅ Test profile created successfully');
    
    // Get the profile ID from the war room data
    console.log('\n🔍 Finding the test profile...');
    const usersResponse = await fetch('http://localhost:3000/api/war-room/users-real-time');
    const usersData = await usersResponse.json();
    
    const testUser = usersData.users.find(u => u.email === 'delete-test@example.com');
    if (!testUser) {
      console.log('❌ Test user not found in war room data');
      return;
    }
    
    console.log('✅ Test user found with ID:', testUser.id);
    
    // Now delete the profile
    console.log('\n🗑️ Deleting the test profile...');
    const deleteResponse = await fetch(`http://localhost:3000/api/war-room/profiles/${testUser.id}`, {
      method: 'DELETE'
    });
    
    if (deleteResponse.ok) {
      console.log('✅ Profile deleted successfully!');
      
      // Verify deletion by checking war room data again
      console.log('\n🔍 Verifying deletion...');
      const verifyResponse = await fetch('http://localhost:3000/api/war-room/users-real-time');
      const verifyData = await verifyResponse.json();
      
      const deletedUser = verifyData.users.find(u => u.email === 'delete-test@example.com');
      if (!deletedUser) {
        console.log('✅ Profile successfully removed from war room data');
      } else {
        console.log('❌ Profile still exists in war room data');
      }
      
    } else {
      console.log('❌ Failed to delete profile:', await deleteResponse.text());
    }
    
  } catch (error) {
    console.log('❌ Error testing delete functionality:', error.message);
  }
}

testDeleteProfile(); 