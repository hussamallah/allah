import { NextResponse } from 'next/server'

export async function GET() {
  // Only return basic info for security
  const envStatus = {
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  }
  
  return NextResponse.json(envStatus)
} 