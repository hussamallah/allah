import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Environment variables not configured',
        details: {
          supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
      }, { status: 503 })
    }

    // Test Supabase connection
    const supabase = await createClient()
    
    // Try a simple query to test connection
    const { data, error } = await supabase
      .from('user_profiles')
      .select('count(*)', { count: 'exact', head: true })

    if (error) {
      console.error('Database test error:', error)
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        details: {
          message: error.message,
          code: error.code,
          details: error.details
        }
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      count: data?.[0]?.count || 0
    })
    
  } catch (error) {
    console.error('Database test exception:', error)
    return NextResponse.json({
      success: false,
      error: 'Database test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 