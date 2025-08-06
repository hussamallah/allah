const { createClient } = require('@supabase/supabase-js')

async function fixDeletePolicy() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🔧 Checking current RLS policies...')
    
    // Check if the delete policy exists
    const { data: policies, error } = await supabase
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'user_profiles')
      .eq('cmd', 'DELETE')

    if (error) {
      console.error('❌ Error checking policies:', error)
      return
    }

    console.log('📋 Current DELETE policies:', policies)

    if (policies.length === 0) {
      console.log('⚠️ No DELETE policy found, creating one...')
      
      // Create the delete policy
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE POLICY "Allow anyone to delete profiles" ON user_profiles
          FOR DELETE USING (true);
        `
      })

      if (createError) {
        console.error('❌ Error creating delete policy:', createError)
      } else {
        console.log('✅ Delete policy created successfully')
      }
    } else {
      console.log('✅ Delete policy already exists')
    }

    // Test the delete functionality
    console.log('🧪 Testing delete functionality...')
    
    // First, let's see what profiles exist
    const { data: profiles, error: fetchError } = await supabase
      .from('user_profiles')
      .select('id, email')
      .limit(1)

    if (fetchError) {
      console.error('❌ Error fetching profiles:', fetchError)
      return
    }

    if (profiles.length === 0) {
      console.log('⚠️ No profiles found to test with')
      return
    }

    const testProfile = profiles[0]
    console.log('🧪 Testing delete with profile:', testProfile)

    // Try to delete the profile
    const { error: deleteError } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', testProfile.id)

    if (deleteError) {
      console.error('❌ Delete test failed:', deleteError)
    } else {
      console.log('✅ Delete test successful!')
      
      // Recreate the profile for future testing
      const { error: recreateError } = await supabase
        .from('user_profiles')
        .insert({
          email: testProfile.email,
          archetype: 'test',
          test_results: { test: true }
        })

      if (recreateError) {
        console.error('⚠️ Could not recreate test profile:', recreateError)
      } else {
        console.log('✅ Test profile recreated')
      }
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

fixDeletePolicy() 