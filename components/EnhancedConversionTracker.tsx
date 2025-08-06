'use client'

import { useEffect, useRef } from 'react'

interface ConversionEvent {
  userId: string
  step: string
  archetype?: string
  timestamp: string
  pageType: string
  currentPage: string
  utmData?: any
  metadata?: Record<string, any>
}

interface EnhancedConversionTrackerProps {
  archetype?: string
  pageType: string
  onConversion?: (event: ConversionEvent) => void
}

export default function EnhancedConversionTracker({ 
  archetype, 
  pageType, 
  onConversion 
}: EnhancedConversionTrackerProps) {
  const userIdRef = useRef<string>('')

  useEffect(() => {
    const getUserId = () => {
      let userId = localStorage.getItem('conversion_user_id')
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('conversion_user_id', userId)
      }
      userIdRef.current = userId
      return userId
    }

    const getUTMData = () => {
      const utmData = localStorage.getItem('utm_data')
      return utmData ? JSON.parse(utmData) : null
    }

    const trackConversion = (step: string, metadata?: Record<string, any>) => {
      const event: ConversionEvent = {
        userId: getUserId(),
        step,
        archetype,
        timestamp: new Date().toISOString(),
        pageType,
        currentPage: window.location.pathname,
        utmData: getUTMData(),
        metadata
      }

      // Send to analytics
      fetch('/api/war-room/conversion-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(console.error)

      onConversion?.(event)
    }

    // Track specific funnel steps
    const trackFunnelSteps = () => {
      // Track page load
      trackConversion('page_loaded')

      // Track button clicks with data attributes
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const button = target.closest('[data-conversion-step]')
        
        if (button) {
          const step = button.getAttribute('data-conversion-step')
          const metadata = {
            buttonText: button.textContent?.trim(),
            buttonClass: button.className,
            position: { x: e.clientX, y: e.clientY }
          }
          
          if (step) {
            trackConversion(step, metadata)
          }
        }
      })

      // Track form submissions
      document.addEventListener('submit', (e) => {
        const form = e.target as HTMLFormElement
        const step = form.getAttribute('data-conversion-step')
        
        if (step) {
          trackConversion(step, {
            formAction: form.action,
            formMethod: form.method
          })
        }
      })

      // Track quiz starts
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const quizButton = target.closest('[data-quiz-start]')
        
        if (quizButton) {
          trackConversion('quiz_started', {
            quizType: quizButton.getAttribute('data-quiz-type')
          })
        }
      })

      // Track email submissions
      document.addEventListener('submit', (e) => {
        const form = e.target as HTMLFormElement
        const emailInput = form.querySelector('input[type="email"]')
        
        if (emailInput) {
          trackConversion('email_submitted', {
            emailDomain: (emailInput as HTMLInputElement).value.split('@')[1]
          })
        }
      })
    }

    // Track abandonment
    const trackAbandonment = () => {
      window.addEventListener('beforeunload', () => {
        trackConversion('page_abandoned', {
          timeOnPage: Date.now() - performance.timing.navigationStart
        })
      })

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          trackConversion('page_hidden', {
            timeOnPage: Date.now() - performance.timing.navigationStart
          })
        }
      })
    }

    // Initialize tracking
    trackFunnelSteps()
    trackAbandonment()

  }, [archetype, pageType, onConversion])

  return null
} 