const { createClient } = require('@supabase/supabase-js')

async function checkDatabaseSchema() {
  console.log('🔍 Checking Database Schema\n')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Test basic connection
    console.log('1. �� Testing connection...')
    const { data: testData, error: testError } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1)

    if (testError) {
      console.error('❌ Connection failed:', testError)
      return
    }
    console.log('✅ Connection successful')

    // Try to insert a test record to see what happens
    console.log('\n2. 🧪 Testing insert operation...')
    const testUserId = `test_schema_${Date.now()}`
    const { data: insertTest, error: insertError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: testUserId,
        email: null,
        archetype: null,
        time_spent: { '/test': 1 },
        total_time: 1,
        last_activity: new Date().toISOString(),
        test_results: {}
      })
      .select()
      .single()

    if (insertError) {
      console.error('❌ Insert test failed:', insertError)
      console.error('Error details:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code
      })
    } else {
      console.log('✅ Insert test successful:', insertTest)
      
      // Clean up test record
      await supabase
        .from('user_profiles')
        .delete()
        .eq('user_id', testUserId)
      console.log('🧹 Cleaned up test record')
    }

    // Check existing profiles
    console.log('\n3. 📊 Checking existing profiles...')
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(5)

    if (profilesError) {
      console.error('❌ Failed to fetch profiles:', profilesError)
    } else {
      console.log(`Found ${profiles?.length || 0} profiles`)
      if (profiles && profiles.length > 0) {
        console.log('Latest profile:', {
          id: profiles[0].id,
          user_id: profiles[0].user_id,
          email: profiles[0].email,
          time_spent: profiles[0].time_spent,
          total_time: profiles[0].total_time
        })
      }
    }

  } catch (error) {
    console.error('❌ Schema check failed:', error)
  }
}

checkDatabaseSchema() 