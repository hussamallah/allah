import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      archetype,
      userId,
      timeOnPage,
      scrollDepth,
      bounceRate,
      pageViews,
      interactions,
      exitIntent,
      deviceType,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign
    } = body

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if landing metrics table exists, if not create it
    const { error: tableCheck } = await supabase
      .from('landing_page_metrics')
      .select('id')
      .limit(1)

    if (tableCheck && tableCheck.message.includes('relation "landing_page_metrics" does not exist')) {
      // Create the table if it doesn't exist
      const { error: createError } = await supabase.rpc('create_landing_metrics_table')
      if (createError) {
        console.error('Failed to create landing metrics table:', createError)
      }
    }

    // Insert or update landing page metrics
    const { error } = await supabase
      .from('landing_page_metrics')
      .upsert({
        user_id: userId,
        archetype,
        time_on_page: timeOnPage,
        scroll_depth: scrollDepth,
        bounce_rate: bounceRate,
        page_views: pageViews,
        interactions,
        exit_intent: exitIntent,
        device_type: deviceType,
        referrer,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,archetype'
      })

    if (error) {
      console.error('Failed to save landing metrics:', error)
      return NextResponse.json({ error: 'Failed to save metrics' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Landing metrics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const archetype = searchParams.get('archetype')
    const limit = parseInt(searchParams.get('limit') || '100')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    let query = supabase
      .from('landing_page_metrics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (archetype) {
      query = query.eq('archetype', archetype)
    }

    const { data: metrics, error } = await query

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 })
    }

    return NextResponse.json({ metrics: metrics || [] })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 