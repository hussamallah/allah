import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    console.log('👥 Fetching real-time user data...')

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing Supabase environment variables')
      return NextResponse.json({
        error: 'Database configuration missing'
      }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch all user profiles
    console.log('🔍 Fetching all user profiles from database...')
    
    const { data: profiles, error } = await supabase
      .from('user_profiles')
      .select('id, email, archetype, test_results, created_at, last_activity, time_spent, total_time, user_id')
      .order('last_activity', { ascending: false })
      .limit(100)

    if (error) {
      console.error('❌ Database query error:', error)
      console.error('❌ Error details:', error.message, error.details, error.hint)
      return NextResponse.json({
        error: 'Failed to fetch user data',
        details: error.message
      }, { status: 500 })
    }

    console.log(`📊 Raw database profiles: ${profiles?.length || 0}`)

    // Process profiles into user activity data
    const users = (profiles || []).map((profile) => {
      try {
        const lastActivityTime = new Date(profile.last_activity || profile.created_at).getTime()
        const now = Date.now()
        const timeSinceLastActivity = Math.floor((now - lastActivityTime) / 1000)

        // Determine current page from time_spent data
        let currentPage = '/'
        if (profile.time_spent && Object.keys(profile.time_spent).length > 0) {
          // Get the page with the most recent activity (highest time spent)
          const pages = Object.entries(profile.time_spent)
          const mostActivePage = pages.reduce((a, b) => (a[1] as number) > (b[1] as number) ? a : b)
          currentPage = mostActivePage[0]
        }

        // Determine phase based on email and archetype
        let phase = 'quiz'
        if (profile.email && profile.archetype) {
          phase = 'post-chamber'
        } else if (profile.archetype) {
          phase = 'chamber'
        } else {
          phase = 'quiz'
        }

        return {
          id: profile.user_id || profile.id,
          email: profile.email || `Anonymous User (${profile.user_id?.slice(-6) || 'Unknown'})`,
          archetype: profile.archetype || 'Unknown',
          lastActivity: profile.last_activity || profile.created_at,
          phase: phase,
          isDormant: false, // Removed dormant logic
          currentPage: currentPage,
          timeSpent: profile.time_spent || {},
          totalTime: profile.total_time || 0,
          test_results: profile.test_results || {},
          created_at: profile.created_at || new Date().toISOString(),
          user_id: profile.user_id || profile.id
        }
      } catch (profileError) {
        console.error('❌ Error processing profile:', profileError)
        return {
          id: profile.id || 'unknown',
          email: profile.email || 'Unknown User',
          archetype: profile.archetype || 'Unknown',
          lastActivity: profile.last_activity || profile.created_at,
          phase: 'quiz',
          isDormant: false,
          currentPage: '/',
          timeSpent: {},
          totalTime: 0,
          test_results: {},
          created_at: profile.created_at || new Date().toISOString(),
          user_id: profile.user_id || profile.id
        }
      }
    })

    console.log(`✅ Processed ${users.length} users from ${profiles?.length || 0} raw profiles`)
    
    // Log each user for debugging
    users.forEach((user, index) => {
      console.log(`👤 User ${index + 1}: ${user.email} (${user.archetype}) - Phase: ${user.phase} - ID: ${user.id}`)
    })

    return NextResponse.json({
      users: users,
      timestamp: new Date().toISOString(),
      totalUsers: users.length
    })

  } catch (error) {
    console.error('❌ Error fetching users:', error)
    return NextResponse.json({
      error: 'Failed to fetch users',
      users: [],
      timestamp: new Date().toISOString(),
      totalUsers: 0
    }, { status: 500 })
  }
}