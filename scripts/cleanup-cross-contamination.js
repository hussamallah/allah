// Script to clean up cross-contaminated time spent data
// This script removes time spent data that contains pages from different archetypes

const { createClient } = require('@supabase/supabase-js')

async function cleanupCrossContamination() {
  console.log('🧹 Starting cleanup of cross-contaminated time spent data...')
  
  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Supabase environment variables not configured')
    console.log('💡 Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file')
    return
  }

  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  
  try {
    // Fetch all profiles
    const { data: profiles, error } = await supabase
      .from('user_profiles')
      .select('id, email, archetype, time_spent')
    
    if (error) {
      console.error('❌ Error fetching profiles:', error)
      return
    }
    
    console.log(`📊 Found ${profiles.length} profiles to check`)
    
    let cleanedCount = 0
    let totalCleaned = 0
    
    for (const profile of profiles) {
      if (!profile.time_spent || Object.keys(profile.time_spent).length === 0) {
        continue
      }
      
      const timeSpent = profile.time_spent
      const archetype = profile.archetype
      const pages = Object.keys(timeSpent)
      
      // Check for pages from different archetypes
      const crossContaminatedPages = pages.filter(page => {
        const archetypeMatch = page.match(/\/chamber\/([^\/]+)/)
        if (archetypeMatch) {
          const pageArchetype = archetypeMatch[1]
          return pageArchetype !== archetype
        }
        return false
      })
      
      if (crossContaminatedPages.length > 0) {
        console.log(`🔍 Found cross-contamination in ${profile.email} (${archetype}):`)
        console.log(`   Cross-contaminated pages: ${crossContaminatedPages.join(', ')}`)
        
        // Remove cross-contaminated pages
        const cleanedTimeSpent = { ...timeSpent }
        crossContaminatedPages.forEach(page => {
          delete cleanedTimeSpent[page]
        })
        
        // Recalculate total time
        const totalTime = Object.values(cleanedTimeSpent).reduce((acc, time) => acc + (time || 0), 0)
        
        // Update the profile
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({
            time_spent: cleanedTimeSpent,
            total_time: totalTime
          })
          .eq('id', profile.id)
        
        if (updateError) {
          console.error(`❌ Error updating ${profile.email}:`, updateError)
        } else {
          console.log(`✅ Cleaned ${profile.email}: removed ${crossContaminatedPages.length} cross-contaminated pages`)
          cleanedCount++
          totalCleaned += crossContaminatedPages.length
        }
      }
    }
    
    console.log(`\n🎉 Cleanup completed!`)
    console.log(`📊 Profiles cleaned: ${cleanedCount}`)
    console.log(`🗑️ Total cross-contaminated pages removed: ${totalCleaned}`)
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  }
}

// Run the cleanup if this script is executed directly
if (require.main === module) {
  cleanupCrossContamination()
}

module.exports = { cleanupCrossContamination } 