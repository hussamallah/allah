const { createClient } = require('@supabase/supabase-js')

async function debugDatabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🔍 Checking database state...')
    
    // Check table structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1)
    
    if (tableError) {
      console.error('❌ Table error:', tableError)
      return
    }

    console.log('✅ Table exists and accessible')
    
    // Get all profiles
    const { data: profiles, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Query error:', error)
      return
    }

    console.log(`📊 Found ${profiles?.length || 0} profiles:`)
    
    if (profiles && profiles.length > 0) {
      profiles.forEach((profile, index) => {
        console.log(`\n--- Profile ${index + 1} ---`)
        console.log('ID:', profile.id)
        console.log('User ID:', profile.user_id)
        console.log('Email:', profile.email || 'NULL')
        console.log('Archetype:', profile.archetype || 'NULL')
        console.log('Created:', profile.created_at)
        console.log('Last Activity:', profile.last_activity)
        console.log('Time Spent:', profile.time_spent)
        console.log('Total Time:', profile.total_time)
      })
    } else {
      console.log('❌ No profiles found in database')
    }

    // Test creating a profile without email
    console.log('\n🧪 Testing profile creation without email...')
    const testUserId = `test_${Date.now()}`
    
    const { data: newProfile, error: insertError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: testUserId,
        email: null,
        archetype: null,
        time_spent: { '/test': 10 },
        total_time: 10,
        last_activity: new Date().toISOString(),
        test_results: {}
      })
      .select()
      .single()

    if (insertError) {
      console.error('❌ Insert error:', insertError)
    } else {
      console.log('✅ Successfully created profile without email:', newProfile)
      
      // Clean up test profile
      await supabase
        .from('user_profiles')
        .delete()
        .eq('user_id', testUserId)
      
      console.log('🧹 Cleaned up test profile')
    }

  } catch (error) {
    console.error('❌ Debug error:', error)
  }
}

debugDatabase() 