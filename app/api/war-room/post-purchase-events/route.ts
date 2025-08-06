import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()
    
    const { data, error } = await supabase
      .from('post_purchase_events')
      .insert([{
        user_id: event.userId,
        event_type: event.eventType,
        archetype: event.archetype,
        days_since_purchase: event.daysSincePurchase,
        feature_name: event.featureName,
        usage_duration: event.usageDuration,
        churn_reason: event.churnReason,
        metadata: event.metadata,
        created_at: new Date().toISOString()
      }])

    if (error) {
      console.error('Error saving post-purchase event:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error processing post-purchase event:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const archetype = searchParams.get('archetype')
    const days = searchParams.get('days') || '30'

    let query = supabase
      .from('post_purchase_events')
      .select('*')
      .gte('created_at', new Date(Date.now() - parseInt(days) * 24 * 60 * 60 * 1000).toISOString())

    if (userId) {
      query = query.eq('user_id', userId)
    }
    if (archetype) {
      query = query.eq('archetype', archetype)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching post-purchase events:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching post-purchase events:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 