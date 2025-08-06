'use client'

import { useEffect, useRef } from 'react'

interface PaymentEvent {
  userId: string
  eventType: 'payment_page_view' | 'payment_attempt' | 'payment_success' | 'payment_failed'
  amount?: number
  currency?: string
  archetype?: string
  paymentMethod?: string
  failureReason?: string
  timestamp: string
  pageType: string
  currentPage: string
  metadata?: Record<string, any>
}

interface PaymentTrackerProps {
  archetype?: string
  pageType: string
  onPaymentEvent?: (event: PaymentEvent) => void
}

export default function PaymentTracker({ 
  archetype, 
  pageType, 
  onPaymentEvent 
}: PaymentTrackerProps) {
  const userId = useRef<string>('')
  const paymentEvents = useRef<Set<string>>(new Set())

  useEffect(() => {
    // Get user ID
    let trackingUserId = localStorage.getItem('user_tracking_id')
    if (!trackingUserId) {
      trackingUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('user_tracking_id', trackingUserId)
    }
    userId.current = trackingUserId

    // Track payment page view
    trackPaymentEvent('payment_page_view', {
      archetype,
      pageType
    })

    console.log('💰 Payment tracking initialized for:', pageType, archetype)
  }, [pageType, archetype])

  const trackPaymentEvent = (
    eventType: PaymentEvent['eventType'], 
    metadata?: Record<string, any>
  ) => {
    // Prevent duplicate tracking of the same event
    const eventKey = `${pageType}_${eventType}`
    if (paymentEvents.current.has(eventKey)) {
      console.log('🔄 Payment event already tracked:', eventType)
      return
    }
    paymentEvents.current.add(eventKey)

    const event: PaymentEvent = {
      userId: userId.current,
      eventType,
      archetype,
      timestamp: new Date().toISOString(),
      pageType,
      currentPage: window.location.pathname,
      metadata
    }

    // Send to analytics
    sendPaymentEvent(event)
    onPaymentEvent?.(event)

    console.log('💰 Payment event tracked:', { eventType, archetype, pageType })
  }

  const trackRevenue = (amount: number, currency: string = 'USD', metadata?: Record<string, any>) => {
    const event: PaymentEvent = {
      userId: userId.current,
      eventType: 'payment_success',
      amount,
      currency,
      archetype,
      timestamp: new Date().toISOString(),
      pageType,
      currentPage: window.location.pathname,
      metadata
    }

    sendPaymentEvent(event)
    onPaymentEvent?.(event)

    console.log(' Revenue tracked:', { amount, currency, archetype })
  }

  const sendPaymentEvent = async (event: PaymentEvent) => {
    try {
      await fetch('/api/war-room/payment-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      })

      // Trigger real-time update
      window.dispatchEvent(new CustomEvent('paymentEvent', {
        detail: event
      }))
    } catch (error) {
      console.error('❌ Error sending payment event:', error)
    }
  }

  // Expose tracking functions globally
  useEffect(() => {
    ;(window as any).trackPaymentEvent = trackPaymentEvent
    ;(window as any).trackRevenue = trackRevenue
    return () => {
      delete (window as any).trackPaymentEvent
      delete (window as any).trackRevenue
    }
  }, [])

  return null
} 