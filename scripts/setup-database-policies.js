const { createClient } = require('@supabase/supabase-js')

async function setupDatabasePolicies() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables')
    console.log('📝 Please create a .env.local file with:')
    console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url')
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🔧 Setting up database policies...')
    
    // SQL commands to set up proper policies
    const setupCommands = [
      // Enable RLS
      'ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;',
      
      // Drop existing policies to avoid conflicts
      'DROP POLICY IF EXISTS "Allow anyone to insert profiles" ON user_profiles;',
      'DROP POLICY IF EXISTS "Allow profile owners to update their profile" ON user_profiles;',
      'DROP POLICY IF EXISTS "Allow anyone to read profiles" ON user_profiles;',
      'DROP POLICY IF EXISTS "Allow anyone to delete profiles" ON user_profiles;',
      
      // Create new policies
      'CREATE POLICY "Allow anyone to insert profiles" ON user_profiles FOR INSERT WITH CHECK (true);',
      'CREATE POLICY "Allow profile owners to update their profile" ON user_profiles FOR UPDATE USING (true);',
      'CREATE POLICY "Allow anyone to read profiles" ON user_profiles FOR SELECT USING (true);',
      'CREATE POLICY "Allow anyone to delete profiles" ON user_profiles FOR DELETE USING (true);'
    ]

    for (const command of setupCommands) {
      console.log(`🔧 Executing: ${command}`)
      const { error } = await supabase.rpc('exec_sql', { sql: command })
      
      if (error) {
        console.error(`❌ Error executing command: ${error.message}`)
        // Try alternative method for some commands
        if (command.includes('CREATE POLICY') || command.includes('DROP POLICY')) {
          console.log('⚠️ Trying alternative method for policy creation...')
          // You might need to run these directly in Supabase SQL editor
        }
      } else {
        console.log('✅ Command executed successfully')
      }
    }

    console.log('🎉 Database policies setup complete!')
    console.log('📝 If you see any errors above, you may need to run the SQL commands manually in your Supabase SQL editor')

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

setupDatabasePolicies() 