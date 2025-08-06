'use client'

import { useState, useEffect } from 'react'

interface PaymentAnalyticsProps {
  archetype?: string
}

export default function PaymentAnalytics({ archetype }: PaymentAnalyticsProps) {
  const [paymentData, setPaymentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPaymentData()
  }, [archetype])

  const fetchPaymentData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (archetype) params.append('archetype', archetype)
      params.append('limit', '1000')

      const response = await fetch(`/api/war-room/payment-events?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch payment data')
      }

      // Calculate payment metrics
      const events = data.events || []
      const pageViews = events.filter((e: any) => e.event_type === 'payment_page_view').length
      const attempts = events.filter((e: any) => e.event_type === 'payment_attempt').length
      const successes = events.filter((e: any) => e.event_type === 'payment_success')
      const failures = events.filter((e: any) => e.event_type === 'payment_failed')

      const totalRevenue = successes.reduce((sum: number, e: any) => sum + (e.amount || 0), 0)
      const avgOrderValue = successes.length > 0 ? totalRevenue / successes.length : 0
      const conversionRate = pageViews > 0 ? (successes.length / pageViews) * 100 : 0
      const failureRate = attempts > 0 ? (failures.length / attempts) * 100 : 0

      // Calculate revenue by archetype
      const revenueByArchetype = events.reduce((acc: any, e: any) => {
        if (e.event_type === 'payment_success' && e.archetype) {
          acc[e.archetype] = (acc[e.archetype] || 0) + (e.amount || 0)
        }
        return acc
      }, {})

      setPaymentData({
        pageViews,
        attempts,
        successes: successes.length,
        failures: failures.length,
        totalRevenue,
        avgOrderValue,
        conversionRate,
        failureRate,
        revenueByArchetype
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-700 rounded w-5/6"></div>
            <div className="h-3 bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-900/20 border border-red-500/50 rounded-lg">
        <p className="text-red-400">Error: {error}</p>
      </div>
    )
  }

  if (!paymentData) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg">
        <p className="text-gray-400">No payment data available</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-white">
        Payment Analytics {archetype && `(${archetype})`}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
          <div className="text-2xl font-bold text-blue-400">${paymentData.totalRevenue.toFixed(2)}</div>
          <div className="text-sm text-gray-400">Total Revenue</div>
        </div>
        
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
          <div className="text-2xl font-bold text-green-400">{paymentData.successes}</div>
          <div className="text-sm text-gray-400">Successful Payments</div>
        </div>
        
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
          <div className="text-2xl font-bold text-yellow-400">{paymentData.conversionRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-400">Conversion Rate</div>
        </div>
        
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
          <div className="text-2xl font-bold text-purple-400">${paymentData.avgOrderValue.toFixed(2)}</div>
          <div className="text-sm text-gray-400">Avg Order Value</div>
        </div>
      </div>

      {/* Payment Funnel */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3 text-white">Payment Funnel</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-300">Payment Page Views</span>
            <span className="text-white font-medium">{paymentData.pageViews}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-300">Payment Attempts</span>
            <span className="text-white font-medium">{paymentData.attempts}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-800/20 rounded-lg border border-green-500/30">
            <span className="text-green-300">Successful Payments</span>
            <span className="text-green-400 font-medium">{paymentData.successes}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-800/20 rounded-lg border border-red-500/30">
            <span className="text-red-300">Failed Payments</span>
            <span className="text-red-400 font-medium">{paymentData.failures}</span>
          </div>
        </div>
      </div>

      {/* Revenue by Archetype */}
      {!archetype && Object.keys(paymentData.revenueByArchetype).length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Revenue by Archetype</h4>
          <div className="space-y-2">
            {Object.entries(paymentData.revenueByArchetype)
              .sort(([,a], [,b]) => (b as number) - (a as number))
              .map(([archetype, revenue]) => (
                <div key={archetype} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                  <span className="text-gray-300 capitalize">{archetype}</span>
                  <span className="text-white font-medium">${(revenue as number).toFixed(2)}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
} 