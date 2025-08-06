async function updateDatabasePolicies() {
  console.log('🔧 Updating Database Policies\n');
  
  try {
    // Test the current policies by trying to delete a profile
    console.log('1. Testing current DELETE policy...');
    
    // First, get a list of profiles
    const usersResponse = await fetch('http://localhost:3000/api/war-room/users-real-time');
    const usersData = await usersResponse.json();
    
    if (usersData.users.length === 0) {
      console.log('❌ No profiles found to test with');
      return;
    }
    
    const testUser = usersData.users[0];
    console.log(`   Testing with profile: ${testUser.email} (ID: ${testUser.id})`);
    
    // Try to delete the profile
    const deleteResponse = await fetch(`http://localhost:3000/api/war-room/profiles/${testUser.id}`, {
      method: 'DELETE'
    });
    
    if (deleteResponse.ok) {
      console.log('✅ DELETE policy is working correctly!');
      
      // Recreate the profile for testing
      console.log('\n2. Recreating test profile...');
      const recreateData = {
        email: testUser.email,
        archetype: testUser.archetype,
        testResults: testUser.test_results,
        timeSpent: testUser.time_spent
      };
      
      const recreateResponse = await fetch('http://localhost:3000/api/war-room/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recreateData)
      });
      
      if (recreateResponse.ok) {
        console.log('✅ Test profile recreated successfully');
      } else {
        console.log('❌ Failed to recreate test profile');
      }
      
    } else {
      console.log('❌ DELETE policy is not working');
      console.log('   Response:', await deleteResponse.text());
      console.log('\n💡 You may need to run the updated setup-database.sql in Supabase');
    }
    
  } catch (error) {
    console.log('❌ Error testing DELETE policy:', error.message);
  }
}

updateDatabasePolicies(); 