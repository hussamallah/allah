const { createClient } = require('@supabase/supabase-js')

async function testTimerTracking() {
  console.log('🧪 Testing Timer Tracking System\n')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // 1. Check current profiles
    console.log('1. 📊 Checking current profiles...')
    const { data: profiles, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('❌ Error fetching profiles:', error)
      return
    }

    console.log(`   Found ${profiles?.length || 0} profiles`)

    if (profiles && profiles.length > 0) {
      console.log('\n2. 📋 Latest profile details:')
      const latest = profiles[0]
      console.log(`   User ID: ${latest.user_id}`)
      console.log(`   Email: ${latest.email || 'NULL'}`)
      console.log(`   Total Time: ${latest.total_time || 0}s`)
      console.log(`   Time Spent:`, latest.time_spent || '{}')
      
      if (latest.time_spent && Object.keys(latest.time_spent).length > 0) {
        console.log('\n3. ⏱️ Time breakdown:')
        Object.entries(latest.time_spent).forEach(([page, time]) => {
          console.log(`   ${page}: ${time}s`)
        })
      }
    }

    // 3. Test API endpoints
    console.log('\n4. 🔗 Testing API endpoints...')
    
    // Test page-timers API
    try {
      const timersResponse = await fetch('http://localhost:3000/api/war-room/page-timers')
      const timersData = await timersResponse.json()
      console.log(`   Page Timers API: ${timersData.timers?.length || 0} timers`)
    } catch (e) {
      console.log('   Page Timers API: ❌ Failed')
    }

    // Test users-real-time API
    try {
      const usersResponse = await fetch('http://localhost:3000/api/war-room/users-real-time')
      const usersData = await usersResponse.json()
      console.log(`   Users Real-time API: ${usersData.users?.length || 0} users`)
    } catch (e) {
      console.log('   Users Real-time API: ❌ Failed')
    }

  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testTimerTracking() 