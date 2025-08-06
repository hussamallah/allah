'use client'

import { useEffect, useState, useRef } from 'react'

interface LandingPageMetrics {
  archetype: string
  userId: string
  timeOnPage: number
  scrollDepth: number
  bounceRate: boolean
  pageViews: number
  interactions: number
  exitIntent: boolean
  deviceType: string
  referrer: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

interface LandingPageTrackerProps {
  archetype: string
  userId: string
  onMetricsUpdate?: (metrics: Partial<LandingPageMetrics>) => void
}

export default function LandingPageTracker({ 
  archetype, 
  userId, 
  onMetricsUpdate 
}: LandingPageTrackerProps) {
  const [metrics, setMetrics] = useState<LandingPageMetrics>({
    archetype,
    userId,
    timeOnPage: 0,
    scrollDepth: 0,
    bounceRate: true, // Assume bounce until proven otherwise
    pageViews: 1,
    interactions: 0,
    exitIntent: false,
    deviceType: 'desktop',
    referrer: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: ''
  })

  const startTime = useRef(Date.now())
  const maxScrollDepth = useRef(0)
  const interactionCount = useRef(0)
  const hasInteracted = useRef(false)
  const exitIntentDetected = useRef(false)

  // Initialize metrics on mount
  useEffect(() => {
    // Detect device type
    const deviceType = window.innerWidth < 768 ? 'mobile' : 
                      window.innerWidth < 1024 ? 'tablet' : 'desktop'
    
    // Get referrer and UTM parameters
    const urlParams = new URLSearchParams(window.location.search)
    const referrer = document.referrer || 'direct'
    
    const initialMetrics = {
      ...metrics,
      deviceType,
      referrer,
      utmSource: urlParams.get('utm_source') || '',
      utmMedium: urlParams.get('utm_medium') || '',
      utmCampaign: urlParams.get('utm_campaign') || ''
    }
    
    setMetrics(initialMetrics)
    
    // Send initial page view
    sendMetricsToAnalytics(initialMetrics)
    
    console.log('📊 Landing page tracking initialized:', {
      archetype,
      deviceType,
      referrer,
      utmSource: initialMetrics.utmSource
    })
  }, [])

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
      
      if (scrollPercent > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercent
        setMetrics(prev => ({ ...prev, scrollDepth: scrollPercent }))
        
        // Mark as not bounced if user scrolls
        if (scrollPercent > 10 && prev.bounceRate) {
          setMetrics(prev => ({ ...prev, bounceRate: false }))
          hasInteracted.current = true
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track interactions (clicks, form inputs, etc.)
  useEffect(() => {
    const handleInteraction = () => {
      interactionCount.current++
      hasInteracted.current = true
      
      setMetrics(prev => ({ 
        ...prev, 
        interactions: interactionCount.current,
        bounceRate: false 
      }))
    }

    // Track various interaction types
    const events = ['click', 'input', 'focus', 'submit', 'change']
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { passive: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction)
      })
    }
  }, [])

  // Track exit intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentDetected.current) {
        exitIntentDetected.current = true
        setMetrics(prev => ({ ...prev, exitIntent: true }))
        
        console.log('🚪 Exit intent detected on', archetype, 'chamber')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [archetype])

  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000)
      setMetrics(prev => ({ ...prev, timeOnPage: timeSpent }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Send metrics on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const finalMetrics = {
        ...metrics,
        timeOnPage: Math.floor((Date.now() - startTime.current) / 1000),
        scrollDepth: maxScrollDepth.current,
        interactions: interactionCount.current,
        bounceRate: !hasInteracted.current
      }
      
      sendMetricsToAnalytics(finalMetrics)
      onMetricsUpdate?.(finalMetrics)
      
      console.log('�� Final landing page metrics:', finalMetrics)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [metrics, onMetricsUpdate])

  // Send metrics periodically for real-time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      const currentMetrics = {
        ...metrics,
        timeOnPage: Math.floor((Date.now() - startTime.current) / 1000),
        scrollDepth: maxScrollDepth.current,
        interactions: interactionCount.current
      }
      
      // Only send if there are meaningful changes
      if (currentMetrics.timeOnPage % 30 === 0) { // Every 30 seconds
        sendMetricsToAnalytics(currentMetrics)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [metrics])

  const sendMetricsToAnalytics = async (metricsData: LandingPageMetrics) => {
    try {
      // Send to your existing war room API
      const response = await fetch('/api/war-room/landing-metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metricsData)
      })

      if (!response.ok) {
        console.warn('Failed to send landing page metrics')
      }
    } catch (error) {
      console.error('Error sending landing page metrics:', error)
    }
  }

  // This component doesn't render anything visible
  return null
} 