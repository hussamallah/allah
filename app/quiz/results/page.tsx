'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import ArchetypeResults from '../../../components/ArchetypeResults'
import EnhancedPageTracker from '../../../components/EnhancedPageTracker'


function QuizResultsContent() {
  const searchParams = useSearchParams()
  const [currentTime, setCurrentTime] = useState(0)
  
  // Handle both ?archetype=sovereign and ?sovereign formats
  let archetypeParam = searchParams.get('archetype')
  if (!archetypeParam) {
    // If no 'archetype' parameter, check if there's a direct parameter
    const allParams = Object.fromEntries(searchParams.entries())
    const directParam = Object.keys(allParams)[0]
    archetypeParam = directParam || 'Guardian'
  }
  
  // Basic tracking (no EAS scoring)
  useEffect(() => {
    console.log('🎉 Quiz completed for archetype:', archetypeParam)
  }, [archetypeParam])

  // Update current time display
  useEffect(() => {
    // Reset timer when page changes
    setCurrentTime(0)
    
    const interval = setInterval(() => {
      setCurrentTime(prev => prev + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Normalize archetype name to handle case variations and typos
  const normalizeArchetypeName = (name: string) => {
    const decodedName = decodeURIComponent(name)
    const variations: { [key: string]: string } = {
      'partner': 'Partner',
      'guardian': 'Guardian',
      'spotlight': 'Spotlight',
      'spotligth': 'Spotlight', // Handle typo
      'rebel': 'Rebel',
      'equalizer': 'Equalizer',
      'visionary': 'Visionary',
      'visionnary': 'Visionary', // Handle typo with double 'n'
      'servant': 'Servant',
      'vessel': 'Servant',
      'channel': 'Servant',
      'mask': 'Mask',
      'wanderer': 'Wanderer',
      'provider': 'Provider',
      'prvider': 'Provider', // Handle typo missing 'o'
      'sovereign': 'Sovereign',
      'seeker': 'Seeker'
    }
    
    const lowerName = decodedName.toLowerCase()
    if (variations[lowerName]) {
      return variations[lowerName]
    }
    
    return decodedName.charAt(0).toUpperCase() + decodedName.slice(1).toLowerCase()
  }
  
  const archetype = normalizeArchetypeName(archetypeParam)
  
  // For display purposes, preserve original archetype name for known variations
  const displayArchetype = archetypeParam.toLowerCase() === 'vessel' ? 'Vessel' : 
                          archetypeParam.toLowerCase() === 'channel' ? 'Channel' : 
                          archetype

  // Debug logging
  console.log('🔍 Quiz Results Page Debug:', {
    archetypeParam: archetypeParam,
    normalizedArchetype: archetype,
    displayArchetype: displayArchetype,
    searchParams: Object.fromEntries(searchParams.entries())
  })

  const handleReset = () => {
    console.log('🔄 Quiz reset for archetype:', archetype)
    window.location.href = '/quiz'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Add enhanced tracking */}
      <EnhancedPageTracker 
        pageType="results"
        archetype={archetypeParam}
        onMetricsUpdate={(metrics) => {
          console.log('📊 Results page metrics:', metrics)
        }}
      />
      
      {/* Visible Timer */}
      <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-bold z-50">
        ⏱️ {formatTime(currentTime)}
      </div>
      <ArchetypeResults archetype={displayArchetype} onReset={handleReset} />
    </div>
  )
}

export default function QuizResultsPage() {
  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <QuizResultsContent />
    </Suspense>
  )
} 