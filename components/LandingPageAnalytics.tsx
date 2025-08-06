'use client'

import { useState, useEffect } from 'react'

interface LandingPageAnalyticsProps {
  archetype?: string
}

export default function LandingPageAnalytics({ archetype }: LandingPageAnalyticsProps) {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [archetype])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (archetype) params.append('archetype', archetype)
      params.append('limit', '1000')

      const response = await fetch(`/api/war-room/landing-metrics?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch analytics')
      }

      // Calculate aggregate metrics
      const metrics = data.metrics || []
      const totalVisitors = metrics.length
      const avgTimeOnPage = metrics.reduce((sum: number, m: any) => sum + m.time_on_page, 0) / totalVisitors
      const avgScrollDepth = metrics.reduce((sum: number, m: any) => sum + m.scroll_depth, 0) / totalVisitors
      const bounceRate = (metrics.filter((m: any) => m.bounce_rate).length / totalVisitors) * 100
      const avgInteractions = metrics.reduce((sum: number, m: any) => sum + m.interactions, 0) / totalVisitors
      const exitIntentRate = (metrics.filter((m: any) => m.exit_intent).length / totalVisitors) * 100

      setAnalytics({
        totalVisitors,
        avgTimeOnPage: Math.round(avgTimeOnPage),
        avgScrollDepth: Math.round(avgScrollDepth),
        bounceRate: Math.round(bounceRate),
        avgInteractions: Math.round(avgInteractions),
        exitIntentRate: Math.round(exitIntentRate),
        deviceBreakdown: metrics.reduce((acc: any, m: any) => {
          acc[m.device_type] = (acc[m.device_type] || 0) + 1
          return acc
        }, {}),
        topReferrers: metrics.reduce((acc: any, m: any) => {
          acc[m.referrer] = (acc[m.referrer] || 0) + 1
          return acc
        }, {})
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

  if (!analytics) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg">
        <p className="text-gray-400">No analytics data available</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-white">
        Landing Page Analytics {archetype && `- ${archetype.toUpperCase()}`}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
          <div className="text-2xl font-bold text-blue-400">{analytics.totalVisitors}</div>
          <div className="text-sm text-gray-400">Total Visitors</div>
        </div>
        
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
          <div className="text-2xl font-bold text-green-400">{analytics.avgTimeOnPage}s</div>
          <div className="text-sm text-gray-400">Avg Time on Page</div>
        </div>
        
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
          <div className="text-2xl font-bold text-yellow-400">{analytics.avgScrollDepth}%</div>
          <div className="text-sm text-gray-400">Avg Scroll Depth</div>
        </div>
        
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
          <div className="text-2xl font-bold text-red-400">{analytics.bounceRate}%</div>
          <div className="text-sm text-gray-400">Bounce Rate</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Device Breakdown</h4>
          <div className="space-y-2">
            {Object.entries(analytics.deviceBreakdown).map(([device, count]) => (
              <div key={device} className="flex justify-between items-center">
                <span className="text-gray-300 capitalize">{device}</span>
                <span className="text-white font-medium">{count as number}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Top Referrers</h4>
          <div className="space-y-2">
            {Object.entries(analytics.topReferrers)
              .sort(([,a], [,b]) => (b as number) - (a as number))
              .slice(0, 5)
              .map(([referrer, count]) => (
                <div key={referrer} className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm truncate">{referrer || 'Direct'}</span>
                  <span className="text-white font-medium">{count as number}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
} 