import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    console.log('🗑️ Deleting profile with ID:', id)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing Supabase environment variables')
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Delete the profile by user_id (since that's what we're using as the ID)
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('user_id', id)

    if (error) {
      console.error('❌ Error deleting profile:', error)
      return NextResponse.json({ 
        error: 'Failed to delete profile',
        details: error.message 
      }, { status: 500 })
    }

    console.log('✅ Successfully deleted profile:', id)
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('❌ Error in delete profile:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 