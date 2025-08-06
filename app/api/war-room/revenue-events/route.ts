import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      amount,
      currency,
      archetype,
      transactionType,
      productId,
      cohortDate,
      timestamp,
      metadata
    } = body

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if revenue events table exists, if not create it
    const { error: tableCheck } = await supabase
      .from('revenue_events')
      .select('id')
      .limit(1)

    if (tableCheck && tableCheck.message.includes('relation "revenue_events" does not exist')) {
      // Create the table if it doesn't exist
      const { error: createError } = await supabase.rpc('create_revenue_events_table')
      if (createError) {
        console.error('Failed to create revenue events table:', createError)
      }
    }

    // Insert revenue event
    const { error } = await supabase
      .from('revenue_events')
      .insert({
        user_id: userId,
        amount: amount || 0,
        currency: currency || 'USD',
        archetype,
        transaction_type: transactionType,
        product_id: productId,
        cohort_date: cohortDate,
        timestamp,
        metadata: metadata || {},
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Failed to save revenue event:', error)
      return NextResponse.json({ error: 'Failed to save event' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Revenue events API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const transactionType = searchParams.get('transactionType')
    const archetype = searchParams.get('archetype')
    const cohortDate = searchParams.get('cohortDate')
    const limit = parseInt(searchParams.get('limit') || '100')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    let query = supabase
      .from('revenue_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (transactionType) {
      query = query.eq('transaction_type', transactionType)
    }

    if (archetype) {
      query = query.eq('archetype', archetype)
    }

    if (cohortDate) {
      query = query.eq('cohort_date', cohortDate)
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