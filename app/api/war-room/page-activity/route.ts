import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    console.log("API WAR ROOM HIT", { method: request.method });
    
    const body = await request.json()
    const { userId, currentPage, timeSpent, lastActivity } = body
    
    console.log("API RECEIVED:", { userId, currentPage, timeSpent, lastActivity });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('id, time_spent, total_time')
      .eq('user_id', userId)
      .single()

    if (existingProfile) {
      console.log("Writing to DB (UPDATE):", { userId, currentPage, timeSpent, existingTimeSpent: existingProfile.time_spent });
      
      const updatedTimeSpent = {
        ...existingProfile.time_spent,
        [currentPage]: (existingProfile.time_spent?.[currentPage] || 0) + timeSpent
      }

      const { error } = await supabase
        .from('user_profiles')
        .update({
          time_spent: updatedTimeSpent,
          total_time: (existingProfile.total_time || 0) + timeSpent,
          last_activity: lastActivity
        })
        .eq('user_id', userId)

      if (error) {
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
      }
    } else {
      console.log("Writing to DB (INSERT):", { userId, currentPage, timeSpent });
      
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          user_id: userId,
          email: null,
          archetype: null,
          time_spent: { [currentPage]: timeSpent },
          total_time: timeSpent,
          last_activity: lastActivity,
          test_results: {}
        })

      if (error) {
        return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 