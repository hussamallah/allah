'use client'

import { useEffect, useRef } from 'react'

interface RevenueEvent {
  userId: string
  amount: number
  currency: string
  archetype?: string
  transactionType: 'purchase' | 'refund' | 'subscription' | 'one_time'
  productId?: string
  cohortDate: string
  timestamp: string
  metadata?: Record<string, any>
}

interface RevenueTrackerProps {
  archetype?: string
  onRevenueEvent?: (event: RevenueEvent) => void
}

export default function RevenueTracker({ 
  archetype, 
  onRevenueEvent 
}: RevenueTrackerProps) {
  const userId = useRef<string>('')
  const revenueEvents = useRef<Set<string>>(new Set())

  useEffect(() => {
    // Get user ID
    let trackingUserId = localStorage.getItem('user_tracking_id')
    if (!trackingUserId) {
      trackingUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('user_tracking_id', trackingUserId)
    }
    userId.current = trackingUserId

    console.log('💰 Revenue tracking initialized for:', archetype)
  }, [archetype])

  const trackRevenue = (
    amount: number, 
    transactionType: RevenueEvent['transactionType'] = 'purchase',
    productId?: string,
    metadata?: Record<string, any>
  ) => {
    // Prevent duplicate tracking of the same event
    const eventKey = `${userId.current}_${amount}_${transactionType}_${Date.now()}`
    if (revenueEvents.current.has(eventKey)) {
      console.log('🔄 Revenue event already tracked:', { amount, transactionType })
      return
    }
    revenueEvents.current.add(eventKey)

    const event: RevenueEvent = {
      userId: userId.current,
      amount,
      currency: 'USD',
      archetype,
      transactionType,
      productId,
      cohortDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      timestamp: new Date().toISOString(),
      metadata
    }

    // Send to analytics
    sendRevenueEvent(event)
    onRevenueEvent?.(event)

    console.log('�� Revenue tracked:', { amount, archetype, transactionType })
  }

  const trackLTV = (userId: string, archetype?: string) => {
    // Calculate LTV for a user
    const ltvEvent: RevenueEvent = {
      userId,
      amount: 0, // Will be calculated on backend
      currency: 'USD',
      archetype,
      transactionType: 'purchase',
      cohortDate: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      metadata: { action: 'ltv_calculation' }
    }

    sendRevenueEvent(ltvEvent)
    console.log('💰 LTV calculation requested for:', userId, archetype)
  }

  const sendRevenueEvent = async (event: RevenueEvent) => {
    try {
      await fetch('/api/war-room/revenue-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      })

      // Trigger real-time update
      window.dispatchEvent(new CustomEvent('revenueEvent', {
        detail: event
      }))
    } catch (error) {
      console.error('❌ Error sending revenue event:', error)
    }
  }

  // Expose tracking functions globally
  useEffect(() => {
    ;(window as any).trackRevenue = trackRevenue
    ;(window as any).trackLTV = trackLTV
    return () => {
      delete (window as any).trackRevenue
      delete (window as any).trackLTV
    }
  }, [])

  return null
} 