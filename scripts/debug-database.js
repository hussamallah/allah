async function debugDatabase() {
  console.log('🔍 Debugging Database Content\n');
  
  try {
    // Get raw profiles data
    console.log('1. Fetching raw profiles data...');
    const profilesResponse = await fetch('http://localhost:3000/api/war-room/profiles');
    const profilesData = await profilesResponse.json();
    
    console.log(`   Found ${profilesData.profiles?.length || 0} profiles`);
    
    if (profilesData.profiles?.length > 0) {
      const latestProfile = profilesData.profiles[0];
      console.log('\n2. Latest profile details:');
      console.log('   Email:', latestProfile.email);
      console.log('   Archetype:', latestProfile.archetype);
      console.log('   Created:', latestProfile.created_at);
      console.log('   Total Time:', latestProfile.total_time);
      console.log('   Time Spent:', latestProfile.time_spent);
      console.log('   Test Results:', latestProfile.test_results ? 'Present' : 'Missing');
      
      if (latestProfile.time_spent) {
        console.log('\n3. Time spent breakdown:');
        Object.entries(latestProfile.time_spent).forEach(([page, time]) => {
          console.log(`   ${page}: ${time} seconds`);
        });
      } else {
        console.log('\n3. Time spent: No data available');
      }
      
      if (latestProfile.test_results) {
        console.log('\n4. Test results structure:');
        console.log('   Keys:', Object.keys(latestProfile.test_results));
        if (latestProfile.test_results.timeSpent) {
          console.log('   Test Results Time Spent:', latestProfile.test_results.timeSpent);
        }
      }
    }
    
    // Get war room formatted data
    console.log('\n5. War room formatted data...');
    const usersResponse = await fetch('http://localhost:3000/api/war-room/users-real-time');
    const usersData = await usersResponse.json();
    
    if (usersData.users?.length > 0) {
      const latestUser = usersData.users[0];
      console.log('   Latest user time_spent:', latestUser.time_spent);
      console.log('   Latest user total_time:', latestUser.total_time);
      console.log('   Latest user test_results:', latestUser.test_results ? 'Present' : 'Missing');
    }
    
  } catch (error) {
    console.log('❌ Debug failed:', error.message);
  }
}

debugDatabase(); 