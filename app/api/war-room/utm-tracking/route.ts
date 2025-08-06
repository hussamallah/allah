import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const utmData = await request.json()
    
    const { data, error } = await supabase
      .from('utm_tracking')
      .insert([{
        user_id: utmData.userId,
        session_id: utmData.sessionId,
        utm_source: utmData.utmParams.utm_source,
        utm_medium: utmData.utmParams.utm_medium,
        utm_campaign: utmData.utmParams.utm_campaign,
        utm_term: utmData.utmParams.utm_term,
        utm_content: utmData.utmParams.utm_content,
        gclid: utmData.utmParams.gclid,
        fbclid: utmData.utmParams.fbclid,
        landing_page: utmData.landingPage,
        created_at: new Date().toISOString()
      }])

    if (error) {
      console.error('Error saving UTM data:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error processing UTM data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const campaign = searchParams.get('campaign')
    const source = searchParams.get('source')
    const days = searchParams.get('days') || '30'

    let query = supabase
      .from('utm_tracking')
      .select('*')
      .gte('created_at', new Date(Date.now() - parseInt(days) * 24 * 60 * 60 * 1000).toISOString())

    if (campaign) {
      query = query.eq('utm_campaign', campaign)
    }
    if (source) {
      query = query.eq('utm_source', source)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching UTM data:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching UTM data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 