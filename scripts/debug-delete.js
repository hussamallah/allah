async function debugDelete() {
  console.log('🔍 Debugging Delete Functionality\n');
  
  try {
    // Check current profiles
    console.log('1. Checking current profiles...');
    const usersResponse = await fetch('http://localhost:3000/api/war-room/users-real-time');
    const usersData = await usersResponse.json();
    
    console.log(`   Found ${usersData.users.length} profiles`);
    usersData.users.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.email} (ID: ${user.id})`);
    });
    
    // Create a unique test profile
    const uniqueEmail = `delete-test-${Date.now()}@example.com`;
    const testData = {
      email: uniqueEmail,
      archetype: 'spotlight',
      testResults: {
        archetypeConfig: { name: 'Spotlight', color: '#f59e0b' },
        timeSpent: { '/quiz': 30 },
        submittedAt: new Date().toISOString()
      },
      timeSpent: { '/quiz': 30 }
    };
    
    console.log(`\n2. Creating unique test profile: ${uniqueEmail}`);
    
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
    
    console.log('✅ Test profile created successfully');
    
    // Check profiles again
    console.log('\n3. Checking profiles after creation...');
    const usersResponse2 = await fetch('http://localhost:3000/api/war-room/users-real-time');
    const usersData2 = await usersResponse2.json();
    
    const testUser = usersData2.users.find(u => u.email === uniqueEmail);
    if (!testUser) {
      console.log('❌ Test user not found after creation');
      return;
    }
    
    console.log(`✅ Test user found with ID: ${testUser.id}`);
    console.log(`   Total profiles now: ${usersData2.users.length}`);
    
    // Delete the profile
    console.log('\n4. Deleting the test profile...');
    const deleteResponse = await fetch(`http://localhost:3000/api/war-room/profiles/${testUser.id}`, {
      method: 'DELETE'
    });
    
    if (deleteResponse.ok) {
      console.log('✅ Profile deleted successfully!');
      
      // Check profiles one more time
      console.log('\n5. Checking profiles after deletion...');
      const usersResponse3 = await fetch('http://localhost:3000/api/war-room/users-real-time');
      const usersData3 = await usersResponse3.json();
      
      console.log(`   Total profiles after deletion: ${usersData3.users.length}`);
      
      const deletedUser = usersData3.users.find(u => u.email === uniqueEmail);
      if (!deletedUser) {
        console.log('✅ Profile successfully removed from war room data');
      } else {
        console.log('❌ Profile still exists in war room data');
        console.log(`   Found: ${deletedUser.email} (ID: ${deletedUser.id})`);
      }
      
    } else {
      console.log('❌ Failed to delete profile:', await deleteResponse.text());
    }
    
  } catch (error) {
    console.log('❌ Error debugging delete functionality:', error.message);
  }
}

debugDelete(); 