import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    console.log('🔵 GET /api/war-room/test-simple - Testing simple connection')
    
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('❌ Supabase environment variables not configured')
      return NextResponse.json({ error: 'Environment variables missing' }, { status: 503 })
    }

    console.log('✅ Environment variables found')

    // Create simple Supabase client (not server-side)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    
    console.log('✅ Supabase client created')
    
    // Fetch real user profiles from database
    const { data: profiles, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`✅ Found ${profiles?.length || 0} profiles`)
    
    // Return simple profile data
    const simpleProfiles = (profiles || []).map(profile => ({
      id: profile.id,
      email: profile.email,
      archetype: profile.archetype,
      created_at: profile.created_at
    }))

    return NextResponse.json({ 
      success: true,
      count: simpleProfiles.length,
      profiles: simpleProfiles 
    })

  } catch (error) {
    console.error('❌ Test API error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
} 