import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Missing environment variables',
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    // Test database connection
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1)

    if (error) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Database connection failed',
        error: error.message,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    // All checks passed
    return NextResponse.json({ 
      status: 'healthy',
      message: 'All systems operational',
      database: 'connected',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    })

  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 