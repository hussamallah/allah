'use client'

import { useEffect } from 'react'

export default function ReturnVisitTracker() {
  useEffect(() => {
    // Track basic user visit (no EAS scoring)
    const currentTime = Date.now()
    const lastVisit = localStorage.getItem('lastVisitTime')
    
    if (lastVisit) {
      const timeSinceLastVisit = currentTime - parseInt(lastVisit)
      const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      
      if (timeSinceLastVisit > twentyFourHours) {
        console.log('🔄 Return visit detected')
      }
    }
    
    // Update last visit time
    localStorage.setItem('lastVisitTime', currentTime.toString())
  }, [])

  // This component doesn't render anything visible
  return null
}