import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const { data: profiles, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      if (error.message.includes('relation "user_profiles" does not exist')) {
        return NextResponse.json({ profiles: [] })
      }
      return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 })
    }

    return NextResponse.json({ profiles: profiles || [] })
  } catch (error) {
    return NextResponse.json({ profiles: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, archetype, testResults, userId } = body

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (existingProfile) {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          email: email,
          archetype: archetype,
          test_results: testResults,
          last_activity: new Date().toISOString()
        })
        .eq('user_id', userId)
      if (error) return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    } else {
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          user_id: userId,
          email: email,
          archetype: archetype,
          test_results: testResults,
          time_spent: {},
          total_time: 0,
          last_activity: new Date().toISOString()
        })
      if (error) return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 