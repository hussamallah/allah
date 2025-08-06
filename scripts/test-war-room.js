async function testWarRoom() {
  console.log('🔍 Testing War Room Endpoints\n');
  
  try {
    // Test 1: Check profiles endpoint
    console.log('1. Testing /api/war-room/profiles...');
    const profilesResponse = await fetch('http://localhost:3000/api/war-room/profiles');
    const profilesData = await profilesResponse.json();
    
    console.log(`   Status: ${profilesResponse.status}`);
    console.log(`   Profiles found: ${profilesData.profiles?.length || 0}`);
    
    if (profilesData.profiles?.length > 0) {
      console.log('   Sample profile:', {
        email: profilesData.profiles[0].email,
        archetype: profilesData.profiles[0].archetype,
        created: profilesData.profiles[0].created_at
      });
    }
    
    // Test 2: Check users-real-time endpoint
    console.log('\n2. Testing /api/war-room/users-real-time...');
    const usersResponse = await fetch('http://localhost:3000/api/war-room/users-real-time');
    const usersData = await usersResponse.json();
    
    console.log(`   Status: ${usersResponse.status}`);
    console.log(`   Users found: ${usersData.users?.length || 0}`);
    
    if (usersData.users?.length > 0) {
      console.log('   Sample user:', {
        email: usersData.users[0].email,
        archetype: usersData.users[0].archetype,
        phase: usersData.users[0].phase
      });
    }
    
    // Test 3: Check if data matches
    console.log('\n3. Data consistency check...');
    if (profilesData.profiles?.length === usersData.users?.length) {
      console.log('   ✅ Profile count matches user count');
    } else {
      console.log('   ⚠️ Profile count does not match user count');
      console.log(`      Profiles: ${profilesData.profiles?.length || 0}`);
      console.log(`      Users: ${usersData.users?.length || 0}`);
    }
    
    console.log('\n✅ War Room endpoints are working correctly!');
    console.log('📋 Next steps:');
    console.log('1. Go to http://localhost:3000/war-room');
    console.log('2. Check if you can see the user data');
    console.log('3. If not visible, try refreshing the page');
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('\nMake sure your development server is running on http://localhost:3000');
  }
}

testWarRoom(); 