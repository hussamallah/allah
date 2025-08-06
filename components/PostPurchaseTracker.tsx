'use client'

import { useEffect, useRef, useState } from 'react'

interface PostPurchaseEvent {
  userId: string
  eventType: 'return_visit' | 'feature_usage' | 'churn_indicator' | 'engagement_drop'
  archetype?: string
  daysSincePurchase: number
  featureName?: string
  usageDuration?: number
  churnReason?: string
  timestamp: string
  metadata?: Record<string, any>
}

interface PostPurchaseTrackerProps {
  userId: string
  archetype?: string
  purchaseDate?: string
  onPostPurchaseEvent?: (event: PostPurchaseEvent) => void
}

export default function PostPurchaseTracker({ 
  userId, 
  archetype, 
  purchaseDate, 
  onPostPurchaseEvent 
}: PostPurchaseTrackerProps) {
  const [isTracking, setIsTracking] = useState(false)
  const lastActivityRef = useRef<number>(Date.now())
  const sessionStartRef = useRef<number>(Date.now())
  const featureUsageRef = useRef<Record<string, number>>({})

  useEffect(() => {
    if (!userId || !purchaseDate) return

    const startTracking = () => {
      setIsTracking(true)
      sessionStartRef.current = Date.now()
      
      // Track return visit
      const daysSincePurchase = Math.floor(
        (Date.now() - new Date(purchaseDate).getTime()) / (1000 * 60 * 60 * 24)
      )
      
      if (daysSincePurchase > 0) {
        trackEvent('return_visit', { daysSincePurchase })
      }
    }

    const trackEvent = (eventType: PostPurchaseEvent['eventType'], metadata?: Record<string, any>) => {
      const event: PostPurchaseEvent = {
        userId,
        eventType,
        archetype,
        daysSincePurchase: Math.floor(
          (Date.now() - new Date(purchaseDate).getTime()) / (1000 * 60 * 60 * 24)
        ),
        timestamp: new Date().toISOString(),
        metadata
      }

      // Send to analytics
      fetch('/api/war-room/post-purchase-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(console.error)

      onPostPurchaseEvent?.(event)
    }

    // Track feature usage
    const trackFeatureUsage = (featureName: string, duration: number) => {
      featureUsageRef.current[featureName] = (featureUsageRef.current[featureName] || 0) + duration
      trackEvent('feature_usage', { featureName, usageDuration: duration })
    }

    // Track churn indicators
    const trackChurnIndicators = () => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current
      const sessionDuration = Date.now() - sessionStartRef.current
      
      // Churn indicators
      if (timeSinceLastActivity > 30 * 60 * 1000) { // 30 minutes
        trackEvent('churn_indicator', { 
          churnReason: 'inactivity',
          timeSinceLastActivity 
        })
      }
      
      if (sessionDuration < 60 * 1000) { // Less than 1 minute
        trackEvent('churn_indicator', { 
          churnReason: 'short_session',
          sessionDuration 
        })
      }
    }

    // Activity tracking
    const updateActivity = () => {
      lastActivityRef.current = Date.now()
    }

    // Event listeners
    const events = ['click', 'scroll', 'keypress', 'mousemove']
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true })
    })

    // Feature usage tracking
    const trackPageFeatures = () => {
      // Track time spent on different sections
      const sections = document.querySelectorAll('[data-feature-section]')
      sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const featureName = entry.target.getAttribute('data-feature-section')
              if (featureName) {
                trackFeatureUsage(featureName, 5000) // 5 seconds
              }
            }
          })
        })
        observer.observe(section)
      })
    }

    // Start tracking
    startTracking()
    trackPageFeatures()

    // Periodic churn check
    const churnInterval = setInterval(trackChurnIndicators, 60000) // Every minute

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity)
      })
      clearInterval(churnInterval)
    }
  }, [userId, purchaseDate, archetype, onPostPurchaseEvent])

  return null // Invisible component
} 