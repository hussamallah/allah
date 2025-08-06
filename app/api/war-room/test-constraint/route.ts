import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check if the unique constraint exists
    const { data: constraints, error: constraintError } = await supabase
      .rpc('check_user_id_constraint')

    if (constraintError) {
      // If the RPC doesn't exist, let's try a different approach
      console.log('RPC not available, checking constraints manually')
      
      // Try to insert a duplicate user_id to see if constraint is enforced
      const { data: existingProfiles } = await supabase
        .from('user_profiles')
        .select('user_id')
        .limit(1)

      if (existingProfiles && existingProfiles.length > 0) {
        const testUserId = existingProfiles[0].user_id
        
        // Try to insert a duplicate
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: testUserId,
            email: 'test@constraint.com',
            archetype: 'test'
          })

        if (insertError && insertError.code === '23505') {
          return NextResponse.json({
            success: true,
            message: 'Unique constraint IS working - duplicate insert was rejected',
            constraintExists: true,
            errorCode: insertError.code,
            errorMessage: insertError.message
          })
        } else if (insertError) {
          return NextResponse.json({
            success: false,
            message: 'Unique constraint NOT working - different error occurred',
            constraintExists: false,
            errorCode: insertError.code,
            errorMessage: insertError.message
          })
        } else {
          // If no error, constraint doesn't exist
          return NextResponse.json({
            success: false,
            message: 'Unique constraint NOT working - duplicate insert succeeded',
            constraintExists: false
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Constraint check completed',
      constraints
    })

  } catch (error) {
    console.error('Constraint test error:', error)
    return NextResponse.json({ error: 'Constraint test failed' }, { status: 500 })
  }
} 