import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Fetching page timers...")
    
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

    if (error) {
      console.error("❌ Database error:", error)
      return NextResponse.json({ error: 'Failed to fetch page timer data', details: error.message }, { status: 500 })
    }

    console.log(` Found ${profiles?.length || 0} profiles in database`)

    const timers: any[] = []
    ;(profiles || []).forEach((profile: any, index: number) => {
      console.log(` Profile ${index + 1}:`, {
        id: profile.id,
        user_id: profile.user_id,
        time_spent: profile.time_spent,
        total_time: profile.total_time
      })
      
      if (profile.time_spent && Object.keys(profile.time_spent).length > 0) {
        Object.entries(profile.time_spent).forEach(([pagePath, timeSpent]) => {
          console.log(`⏱️ Adding timer: ${pagePath} = ${timeSpent}s`)
          timers.push({
            pageId: pagePath,
            totalTime: timeSpent as number,
            lastActivity: profile.last_activity || profile.created_at,
            userId: profile.user_id || profile.id,
            userEmail: profile.email || `Anonymous User (${profile.user_id?.slice(-6) || 'Unknown'})`,
            archetype: profile.archetype || 'Unknown'
          })
        })
      } else {
        console.log(`⚠️ Profile ${index + 1} has no time_spent data`)
      }
    })
    
    console.log(` Returning ${timers.length} timers`)
    return NextResponse.json({ timers: timers, totalTimers: timers.length })
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ error: 'Failed to fetch page timers', timers: [], totalPages: 0, activePages: 0 }, { status: 500 })
  }
} 