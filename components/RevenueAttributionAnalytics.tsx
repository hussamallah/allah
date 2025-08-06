'use client'

import { useState, useEffect } from 'react'

interface RevenueAttributionAnalyticsProps {
  archetype?: string
}

export default function RevenueAttributionAnalytics({ archetype }: RevenueAttributionAnalyticsProps) {
  const [revenueData, setRevenueData] = useState<any>(null)
  const [cohortData, setCohortData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRevenueData()
    fetchCohortData()
  }, [archetype])

  const fetchRevenueData = async () => {
    try {
      const params = new URLSearchParams()
      if (archetype) params.append('archetype', archetype)
      params.append('limit', '1000')

      const response = await fetch(`/api/war-room/revenue-events?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch revenue data')
      }

      // Calculate revenue metrics
      const events = data.events || []
      const totalRevenue = events.reduce((sum: number, e: any) => sum + (e.amount || 0), 0)
      const uniqueUsers = new Set(events.map((e: any) => e.user_id)).size
      const avgRevenuePerUser = uniqueUsers > 0 ? totalRevenue / uniqueUsers : 0

      // Calculate revenue by transaction type
      const revenueByType = events.reduce((acc: any, e: any) => {
        acc[e.transaction_type] = (acc[e.transaction_type] || 0) + (e.amount || 0)
        return acc
      }, {})

      // Calculate revenue by archetype
      const revenueByArchetype = events.reduce((acc: any, e: any) => {
        if (e.archetype) {
          acc[e.archetype] = (acc[e.archetype] || 0) + (e.amount || 0)
        }
        return acc
      }, {})

      setRevenueData({
        totalRevenue,
        uniqueUsers,
        avgRevenuePerUser,
        revenueByType,
        revenueByArchetype,
        totalTransactions: events.length
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const fetchCohortData = async () => {
    try {
      const response = await fetch('/api/war-room/cohort-analysis')
      const data = await response.json()

      if (response.ok) {
        setCohortData(data.cohorts || [])
      }
    } catch (err) {
      console.error('Failed to fetch cohort data:', err)
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

  if (!revenueData) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg">
        <p className="text-gray-400">No revenue data available</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-white">
        Revenue Attribution {archetype && `(${archetype})`}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
          <div className="text-2xl font-bold text-blue-400">${revenueData.totalRevenue.toFixed(2)}</div>
          <div className="text-sm text-gray-400">Total Revenue</div>
        </div>
        
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
          <div className="text-2xl font-bold text-green-400">{revenueData.uniqueUsers}</div>
          <div className="text-sm text-gray-400">Unique Users</div>
        </div>
        
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
          <div className="text-2xl font-bold text-yellow-400">${revenueData.avgRevenuePerUser.toFixed(2)}</div>
          <div className="text-sm text-gray-400">Avg Revenue/User</div>
        </div>
        
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
          <div className="text-2xl font-bold text-purple-400">{revenueData.totalTransactions}</div>
          <div className="text-sm text-gray-400">Total Transactions</div>
        </div>
      </div>

      {/* Revenue by Transaction Type */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3 text-white">Revenue by Transaction Type</h4>
        <div className="space-y-2">
          {Object.entries(revenueData.revenueByType).map(([type, revenue]) => (
            <div key={type} className="flex justify-between items-center p-2 bg-gray-800 rounded">
              <span className="text-gray-300 capitalize">{type.replace('_', ' ')}</span>
              <span className="text-white font-medium">${(revenue as number).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue by Archetype */}
      {!archetype && Object.keys(revenueData.revenueByArchetype).length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-white">Revenue by Archetype</h4>
          <div className="space-y-2">
            {Object.entries(revenueData.revenueByArchetype)
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

      {/* Cohort Analysis */}
      {cohortData && cohortData.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Cohort Analysis (Last 90 Days)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left p-2">Cohort Date</th>
                  <th className="text-right p-2">Users</th>
                  <th className="text-right p-2">Day 0</th>
                  <th className="text-right p-2">Day 7</th>
                  <th className="text-right p-2">Day 30</th>
                  <th className="text-right p-2">Day 90</th>
                  <th className="text-right p-2">Retention 7d</th>
                  <th className="text-right p-2">Retention 30d</th>
                </tr>
              </thead>
              <tbody>
                {cohortData.slice(0, 10).map((cohort: any) => (
                  <tr key={cohort.cohort_date} className="border-b border-gray-800">
                    <td className="p-2 text-gray-300">{cohort.cohort_date}</td>
                    <td className="p-2 text-right text-white">{cohort.total_users}</td>
                    <td className="p-2 text-right text-green-400">${cohort.day_0_revenue?.toFixed(2) || '0.00'}</td>
                    <td className="p-2 text-right text-green-400">${cohort.day_7_revenue?.toFixed(2) || '0.00'}</td>
                    <td className="p-2 text-right text-green-400">${cohort.day_30_revenue?.toFixed(2) || '0.00'}</td>
                    <td className="p-2 text-right text-green-400">${cohort.day_90_revenue?.toFixed(2) || '0.00'}</td>
                    <td className="p-2 text-right text-blue-400">{cohort.retention_rate_7?.toFixed(1) || '0'}%</td>
                    <td className="p-2 text-right text-blue-400">{cohort.retention_rate_30?.toFixed(1) || '0'}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
} 