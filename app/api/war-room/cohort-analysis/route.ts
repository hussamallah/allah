import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '90')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Call the cohort analysis function
    const { data: cohorts, error } = await supabase
      .rpc('get_cohort_analysis', { p_days: days })

    if (error) {
      console.error('Failed to fetch cohort analysis:', error)
      return NextResponse.json({ error: 'Failed to fetch cohort data' }, { status: 500 })
    }

    return NextResponse.json({ cohorts: cohorts || [] })
  } catch (error) {
    console.error('Cohort analysis API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 