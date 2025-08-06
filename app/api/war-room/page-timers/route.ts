import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database config missing' }, { status: 500 })
    }
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: profiles, error } = await supabase
      .from('user_profiles')
      .select('id, user_id, email, archetype, last_activity, created_at, time_spent, total_time')
      .order('last_activity', { ascending: false })
      .limit(50)

    if (error) return NextResponse.json({ error: 'Failed to fetch page timer data', details: error.message }, { status: 500 })

    const timers: any[] = []
    ;(profiles || []).forEach((profile: any) => {
      if (profile.time_spent && Object.keys(profile.time_spent).length > 0) {
        Object.entries(profile.time_spent).forEach(([pagePath, timeSpent]) => {
          timers.push({
            pageId: pagePath,
            totalTime: timeSpent as number,
            lastActivity: profile.last_activity || profile.created_at,
            userId: profile.user_id || profile.id,
            userEmail: profile.email || `Anonymous User (${profile.user_id?.slice(-6) || 'Unknown'})`,
            archetype: profile.archetype || 'Unknown'
          })
        })
      }
    })
    return NextResponse.json({ timers: timers, totalTimers: timers.length })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch page timers', timers: [], totalPages: 0, activePages: 0 }, { status: 500 })
  }
} 