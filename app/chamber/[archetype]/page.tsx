'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Chamber from '../../../components/Chamber'

export default function ArchetypeChamberPage() {
  const params = useParams()
  const router = useRouter()
  const archetype = params.archetype as string
  
  // Quiz results state
  const [quizResults, setQuizResults] = useState<any>(null)
  const [rIndex, setRIndex] = useState(0)
  const [triggers, setTriggers] = useState<string[]>([])
  const [triggerCounts, setTriggerCounts] = useState<Record<string, number>>({})
  const [isClient, setIsClient] = useState(false)
  
  // Handle hydration issues caused by browser extensions
  useEffect(() => {
    setIsClient(true)
    
    // Load quiz results
    if (typeof window !== 'undefined') {
      const storedResults = localStorage.getItem('quiz_results')
      if (storedResults) {
        try {
          const results = JSON.parse(storedResults)
          setQuizResults(results)
          setRIndex(results.rIndex || 0)
          setTriggers(results.triggers || [])
          setTriggerCounts(results.triggerCounts || {})
        } catch (error) {
          console.error('Error parsing quiz results:', error)
        }
      }
    }
    
    console.log('🏛️ Chamber entered:', archetype)
  }, [archetype])

  if (!isClient) {
    return null
  }

  // Render unified Chamber component
  return (
    <Chamber
      archetype={archetype}
      rIndex={rIndex}
      triggers={triggers}
      triggerCounts={triggerCounts}
    />
  )
}
