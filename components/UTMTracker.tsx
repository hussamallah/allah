'use client'

import { useEffect, useState } from 'react'

interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  fbclid?: string
}

interface UTMData {
  userId: string
  utmParams: UTMParams
  landingPage: string
  timestamp: string
  sessionId: string
}

export default function UTMTracker() {
  const [utmData, setUtmData] = useState<UTMData | null>(null)

  useEffect(() => {
    const getUTMParams = (): UTMParams => {
      const urlParams = new URLSearchParams(window.location.search)
      return {
        utm_source: urlParams.get('utm_source') || undefined,
        utm_medium: urlParams.get('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || undefined,
        utm_term: urlParams.get('utm_term') || undefined,
        utm_content: urlParams.get('utm_content') || undefined,
        gclid: urlParams.get('gclid') || undefined,
        fbclid: urlParams.get('fbclid') || undefined
      }
    }

    const getUserId = (): string => {
      let userId = localStorage.getItem('utm_user_id')
      if (!userId) {
        userId = `utm_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('utm_user_id', userId)
      }
      return userId
    }

    const getSessionId = (): string => {
      let sessionId = sessionStorage.getItem('utm_session_id')
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem('utm_session_id', sessionId)
      }
      return sessionId
    }

    const utmParams = getUTMParams()
    
    // Only track if UTM parameters exist
    if (utmParams.utm_source || utmParams.utm_medium || utmParams.utm_campaign || utmParams.gclid || utmParams.fbclid) {
      const data: UTMData = {
        userId: getUserId(),
        utmParams,
        landingPage: window.location.pathname,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId()
      }

      setUtmData(data)

      // Store UTM data in localStorage for session persistence
      localStorage.setItem('utm_data', JSON.stringify(data))

      // Send to analytics
      fetch('/api/war-room/utm-tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(console.error)

      // Clean URL of UTM parameters (optional)
      if (window.history.replaceState) {
        const cleanUrl = window.location.pathname + window.location.hash
        window.history.replaceState({}, document.title, cleanUrl)
      }
    }
  }, [])

  return null // Invisible component
} 