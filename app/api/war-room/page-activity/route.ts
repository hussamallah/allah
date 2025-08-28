import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    console.log(" API WAR ROOM HIT", { method: request.method });
    
    const body = await request.json()
    const { userId, currentPage, timeSpent, lastActivity } = body
    
    console.log("📥 API RECEIVED:", { userId, currentPage, timeSpent, lastActivity });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Missing environment variables")
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check for existing profile
    const { data: existingProfile, error: selectError } = await supabase
      .from('user_profiles')
      .select('id, time_spent, total_time')
      .eq('user_id', userId)
      .single()

    if (selectError && selectError.code !== 'PGRST116') {
      console.error("❌ Select error:", selectError)
      return NextResponse.json({ error: 'Failed to check profile' }, { status: 500 })
    }

    if (existingProfile) {
      console.log("📝 Writing to DB (UPDATE):", { 
        userId, 
        currentPage, 
        timeSpent, 
        existingTimeSpent: existingProfile.time_spent 
      });
      
      const updatedTimeSpent = {
        ...existingProfile.time_spent,
        [currentPage]: (existingProfile.time_spent?.[currentPage] || 0) + timeSpent
      }

      console.log(" Updated time_spent:", updatedTimeSpent)

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          time_spent: updatedTimeSpent,
          total_time: (existingProfile.total_time || 0) + timeSpent,
          last_activity: lastActivity
        })
        .eq('user_id', userId)

      if (updateError) {
        console.error("❌ Update error:", updateError)
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
      }
      
      console.log("✅ Profile updated successfully")
    } else {
      console.log("📝 Writing to DB (INSERT):", { userId, currentPage, timeSpent });
      
      const { error: insertError } = await supabase
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

      if (insertError) {
        console.error("❌ Insert error:", insertError)
        return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
      }
      
      console.log("✅ Profile created successfully")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 