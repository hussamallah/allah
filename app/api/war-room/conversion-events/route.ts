import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      step,
      archetype,
      timestamp,
      pageType,
      currentPage,
      metadata
    } = body

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if conversion events table exists, if not create it
    const { error: tableCheck } = await supabase
      .from('conversion_events')
      .select('id')
      .limit(1)

    if (tableCheck && tableCheck.message.includes('relation "conversion_events" does not exist')) {
      // Create the table if it doesn't exist
      const { error: createError } = await supabase.rpc('create_conversion_events_table')
      if (createError) {
        console.error('Failed to create conversion events table:', createError)
      }
    }

    // Insert conversion event
    const { error } = await supabase
      .from('conversion_events')
      .insert({
        user_id: userId,
        step,
        archetype,
        timestamp,
        page_type: pageType,
        current_page: currentPage,
        metadata: metadata || {},
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Failed to save conversion event:', error)
      return NextResponse.json({ error: 'Failed to save event' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Conversion events API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const step = searchParams.get('step')
    const archetype = searchParams.get('archetype')
    const pageType = searchParams.get('pageType')
    const limit = parseInt(searchParams.get('limit') || '100')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    let query = supabase
      .from('conversion_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (step) {
      query = query.eq('step', step)
    }

    if (archetype) {
      query = query.eq('archetype', archetype)
    }

    if (pageType) {
      query = query.eq('page_type', pageType)
    }

    const { data: events, error } = await query

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }

    return NextResponse.json({ events: events || [] })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 