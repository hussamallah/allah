'use client'

import { useEffect, useRef } from 'react'

interface ConversionEvent {
  userId: string
  step: string
  archetype?: string
  timestamp: string
  pageType: string
  currentPage: string
  metadata?: Record<string, any>
}

interface ConversionTrackerProps {
  archetype?: string
  pageType: string
  onConversion?: (event: ConversionEvent) => void
}

export default function ConversionTracker({ 
  archetype, 
  pageType, 
  onConversion 
}: ConversionTrackerProps) {
  const userId = useRef<string>('')
  const conversionSteps = useRef<Set<string>>(new Set())

  useEffect(() => {
    // Get user ID
    let trackingUserId = localStorage.getItem('user_tracking_id')
    if (!trackingUserId) {
      trackingUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('user_tracking_id', trackingUserId)
    }
    userId.current = trackingUserId

    console.log('🎯 Conversion tracking initialized for:', pageType, archetype)
  }, [pageType, archetype])

  const trackConversion = (step: string, metadata?: Record<string, any>) => {
    // Prevent duplicate tracking of the same step
    const stepKey = `${pageType}_${step}`
    if (conversionSteps.current.has(stepKey)) {
      console.log('🔄 Conversion step already tracked:', step)
      return
    }
    conversionSteps.current.add(stepKey)

    const event: ConversionEvent = {
      userId: userId.current,
      step,
      archetype,
      timestamp: new Date().toISOString(),
      pageType,
      currentPage: window.location.pathname,
      metadata
    }

    // Send to analytics
    sendConversionEvent(event)
    onConversion?.(event)

    console.log('�� Conversion tracked:', { step, archetype, pageType })
  }

  const sendConversionEvent = async (event: ConversionEvent) => {
    try {
      await fetch('/api/war-room/conversion-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      })

      // Trigger real-time update
      window.dispatchEvent(new CustomEvent('conversionEvent', {
        detail: event
      }))
    } catch (error) {
      console.error('❌ Error sending conversion event:', error)
    }
  }

  // Expose tracking function globally for use in other components
  useEffect(() => {
    ;(window as any).trackConversion = trackConversion
    return () => {
      delete (window as any).trackConversion
    }
  }, [])

  return null
} 