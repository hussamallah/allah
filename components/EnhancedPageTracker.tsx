'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface PageMetrics {
  userId: string
  currentPage: string
  timeSpent: number
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
  lastActivity: string
  email?: string
  archetype?: string
  pageType: 'landing' | 'quiz' | 'results' | 'payment' | 'chamber' | 'other'
}

interface EnhancedPageTrackerProps {
  pageType?: 'landing' | 'quiz' | 'results' | 'payment' | 'chamber' | 'other'
  archetype?: string
  onMetricsUpdate?: (metrics: Partial<PageMetrics>) => void
}

export default function EnhancedPageTracker({ 
  pageType = 'other',
  archetype,
  onMetricsUpdate 
}: EnhancedPageTrackerProps) {
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState(pathname)
  const [startTime, setStartTime] = useState(Date.now())
  const [userId, setUserId] = useState<string>('')
  const [metrics, setMetrics] = useState<PageMetrics>({
    userId: '',
    currentPage: pathname,
    timeSpent: 0,
    scrollDepth: 0,
    bounceRate: true,
    pageViews: 1,
    interactions: 0,
    exitIntent: false,
    deviceType: 'desktop',
    referrer: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    lastActivity: new Date().toISOString(),
    archetype,
    pageType
  })

  const maxScrollDepth = useRef(0)
  const interactionCount = useRef(0)
  const hasInteracted = useRef(false)
  const exitIntentDetected = useRef(false)
  const previousPathname = useRef(pathname)

  // Initialize tracking on mount
  useEffect(() => {
    // Get or create user ID
    let trackingUserId = localStorage.getItem('user_tracking_id')
    if (!trackingUserId) {
      trackingUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('user_tracking_id', trackingUserId)
      console.log('🆔 Generated new tracking ID:', trackingUserId)
    } else {
      console.log('🆔 Using existing tracking ID:', trackingUserId)
    }
    
    setUserId(trackingUserId)

    // Detect device type
    const deviceType = window.innerWidth < 768 ? 'mobile' : 
                      window.innerWidth < 1024 ? 'tablet' : 'desktop'
    
    // Get referrer and UTM parameters
    const urlParams = new URLSearchParams(window.location.search)
    const referrer = document.referrer || 'direct'
    
    const initialMetrics = {
      ...metrics,
      userId: trackingUserId,
      deviceType,
      referrer,
      utmSource: urlParams.get('utm_source') || '',
      utmMedium: urlParams.get('utm_medium') || '',
      utmCampaign: urlParams.get('utm_campaign') || '',
      archetype,
      pageType
    }
    
    setMetrics(initialMetrics)
    
    // Send initial page view
    sendPageActivity(trackingUserId, pathname, 0, initialMetrics)
    
    console.log('📊 Enhanced page tracking initialized:', {
      page: pathname,
      pageType,
      archetype,
      deviceType,
      referrer
    })
  }, [])

  // Track page changes
  useEffect(() => {
    if (previousPathname.current !== pathname && previousPathname.current && userId) {
      // Page changed - calculate time spent and send update
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      const finalMetrics = {
        ...metrics,
        timeSpent,
        scrollDepth: maxScrollDepth.current,
        interactions: interactionCount.current,
        bounceRate: !hasInteracted.current
      }
      
      sendPageActivity(userId, previousPathname.current, timeSpent, finalMetrics)
      
      // Reset for new page
      setStartTime(Date.now())
      maxScrollDepth.current = 0
      interactionCount.current = 0
      hasInteracted.current = false
      exitIntentDetected.current = false
    }

    previousPathname.current = pathname
    setCurrentPage(pathname)
  }, [pathname, userId])

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
      
      if (scrollPercent > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercent
        
        // Update scroll depth and check bounce rate in a single setMetrics call
        setMetrics(prev => {
          const newMetrics = { ...prev, scrollDepth: scrollPercent }
          
          // Mark as not bounced if user scrolls more than 10%
          if (scrollPercent > 10 && prev.bounceRate) {
            newMetrics.bounceRate = false
            hasInteracted.current = true
          }
          
          return newMetrics
        })
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
    const events = ['click', 'input', 'focus', 'submit', 'change', 'keydown']
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
        
        console.log('🚪 Exit intent detected on', pathname)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [pathname])

  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      setMetrics(prev => ({ ...prev, timeSpent }))
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  // Send metrics on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const finalMetrics = {
        ...metrics,
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
        scrollDepth: maxScrollDepth.current,
        interactions: interactionCount.current,
        bounceRate: !hasInteracted.current,
        exitIntent: exitIntentDetected.current
      }
      
      sendPageActivity(userId, pathname, finalMetrics.timeSpent, finalMetrics)
      onMetricsUpdate?.(finalMetrics)
      
      console.log('�� Final page metrics:', finalMetrics)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [metrics, userId, pathname, startTime, onMetricsUpdate])

  // Send metrics periodically for real-time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      const currentMetrics = {
        ...metrics,
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
        scrollDepth: maxScrollDepth.current,
        interactions: interactionCount.current
      }
      
      // Only send if there are meaningful changes (every 30 seconds)
      if (currentMetrics.timeSpent % 30 === 0 && currentMetrics.timeSpent > 0) {
        sendPageActivity(userId, pathname, currentMetrics.timeSpent, currentMetrics)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [metrics, userId, pathname, startTime])

  const sendPageActivity = async (
    id: string, 
    page: string, 
    timeSpent: number, 
    fullMetrics?: PageMetrics
  ) => {
    try {
      console.log("Enhanced tracker sending page activity", { id, page, timeSpent });
      
      const activity = fullMetrics || {
        ...metrics,
        userId: id,
        currentPage: page,
        timeSpent,
        lastActivity: new Date().toISOString()
      }

      // Send to existing war room API (backward compatible)
      await fetch('/api/war-room/page-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: activity.userId,
          currentPage: activity.currentPage,
          timeSpent: activity.timeSpent,
          lastActivity: activity.lastActivity
        })
      })

      // Send enhanced metrics to new API
      await fetch('/api/war-room/enhanced-metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
      })

      console.log('�� Sent enhanced page activity:', { id, page, timeSpent })
      
      // Trigger immediate War Room update
      window.dispatchEvent(new CustomEvent('pageActivityUpdate', {
        detail: { userId: id, page, timeSpent, metrics: activity }
      }))
    } catch (error) {
      console.error('❌ Error sending page activity:', error)
    }
  }

  // This component doesn't render anything visible
  return null
} 