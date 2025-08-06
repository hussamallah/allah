'use client'

import { useEffect, useRef } from 'react'

interface PaymentEvent {
  userId: string
  eventType: 'payment_page_view' | 'payment_attempt' | 'payment_success' | 'payment_failed' | 'payment_abandoned'
  amount?: number
  currency?: string
  archetype?: string
  paymentMethod?: string
  failureReason?: string
  utmData?: any
  timestamp: string
  metadata?: Record<string, any>
}

interface PaymentAnalyticsTrackerProps {
  archetype?: string
  onPaymentEvent?: (event: PaymentEvent) => void
}

export default function PaymentAnalyticsTracker({ 
  archetype, 
  onPaymentEvent 
}: PaymentAnalyticsTrackerProps) {
  const userIdRef = useRef<string>('')

  useEffect(() => {
    const getUserId = () => {
      let userId = localStorage.getItem('payment_user_id')
      if (!userId) {
        userId = `payment_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('payment_user_id', userId)
      }
      userIdRef.current = userId
      return userId
    }

    const getUTMData = () => {
      const utmData = localStorage.getItem('utm_data')
      return utmData ? JSON.parse(utmData) : null
    }

    const trackPaymentEvent = (eventType: PaymentEvent['eventType'], metadata?: Record<string, any>) => {
      const event: PaymentEvent = {
        userId: getUserId(),
        eventType,
        archetype,
        utmData: getUTMData(),
        timestamp: new Date().toISOString(),
        metadata
      }

      // Send to analytics
      fetch('/api/war-room/payment-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(console.error)

      onPaymentEvent?.(event)
    }

    // Track payment page views
    const trackPaymentPageView = () => {
      if (window.location.pathname.includes('/payment') || window.location.pathname.includes('/checkout')) {
        trackPaymentEvent('payment_page_view')
      }
    }

    // Track payment attempts
    const trackPaymentAttempts = () => {
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const paymentButton = target.closest('[data-payment-button]')
        
        if (paymentButton) {
          const amount = paymentButton.getAttribute('data-amount')
          const currency = paymentButton.getAttribute('data-currency')
          const paymentMethod = paymentButton.getAttribute('data-payment-method')
          
          trackPaymentEvent('payment_attempt', {
            amount: amount ? parseFloat(amount) : undefined,
            currency,
            paymentMethod
          })
        }
      })
    }

    // Track payment success/failure (via Stripe webhooks or similar)
    const trackPaymentResults = () => {
      // Listen for payment result events
      window.addEventListener('payment-success', (e: any) => {
        trackPaymentEvent('payment_success', {
          amount: e.detail.amount,
          currency: e.detail.currency,
          paymentMethod: e.detail.paymentMethod
        })
      })

      window.addEventListener('payment-failed', (e: any) => {
        trackPaymentEvent('payment_failed', {
          amount: e.detail.amount,
          currency: e.detail.currency,
          failureReason: e.detail.reason
        })
      })
    }

    // Track payment abandonment
    const trackPaymentAbandonment = () => {
      window.addEventListener('beforeunload', () => {
        if (window.location.pathname.includes('/payment') || window.location.pathname.includes('/checkout')) {
          trackPaymentEvent('payment_abandoned')
        }
      })
    }

    // Initialize tracking
    trackPaymentPageView()
    trackPaymentAttempts()
    trackPaymentResults()
    trackPaymentAbandonment()

  }, [archetype, onPaymentEvent])

  return null
} 