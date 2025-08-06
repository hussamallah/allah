import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing database state...')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test 1: Check if we can read profiles
    const { data: profiles, error: readError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(5)

    if (readError) {
      return NextResponse.json({ 
        error: 'Read test failed', 
        details: readError.message 
      }, { status: 500 })
    }

    // Test 2: Try to create a profile without email
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
      return NextResponse.json({ 
        error: 'Insert test failed', 
        details: insertError.message,
        hint: insertError.hint,
        existingProfiles: profiles?.length || 0
      }, { status: 500 })
    }

    // Test 3: Clean up test profile
    await supabase
      .from('user_profiles')
      .delete()
      .eq('user_id', testUserId)

    return NextResponse.json({
      success: true,
      message: 'Database tests passed',
      existingProfiles: profiles?.length || 0,
      testProfileCreated: !!newProfile,
      profiles: profiles?.map(p => ({
        id: p.id,
        user_id: p.user_id,
        email: p.email,
        archetype: p.archetype,
        created_at: p.created_at
      }))
    })

  } catch (error) {
    console.error('❌ Test error:', error)
    return NextResponse.json({ 
      error: 'Test failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 