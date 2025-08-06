'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface PostPurchaseData {
  returnVisits: any[]
  featureUsage: any[]
  churnIndicators: any[]
}

export default function PostPurchaseAnalytics() {
  const [data, setData] = useState<PostPurchaseData>({ returnVisits: [], featureUsage: [], churnIndicators: [] })
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30')

  useEffect(() => {
    fetchPostPurchaseData()
  }, [timeRange])

  const fetchPostPurchaseData = async () => {
    setLoading(true)
    try {
      const [returnVisits, featureUsage, churnIndicators] = await Promise.all([
        fetch(`/api/war-room/post-purchase-events?eventType=return_visit&days=${timeRange}`).then(r => r.json()),
        fetch(`/api/war-room/post-purchase-events?eventType=feature_usage&days=${timeRange}`).then(r => r.json()),
        fetch(`/api/war-room/post-purchase-events?eventType=churn_indicator&days=${timeRange}`).then(r => r.json())
      ])

      setData({
        returnVisits: returnVisits.data || [],
        featureUsage: featureUsage.data || [],
        churnIndicators: churnIndicators.data || []
      })
    } catch (error) {
      console.error('Error fetching post-purchase data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateReturnVisitRate = () => {
    const uniqueUsers = new Set(data.returnVisits.map(v => v.user_id)).size
    const totalVisits = data.returnVisits.length
    return totalVisits > 0 ? (uniqueUsers / totalVisits * 100).toFixed(1) : '0'
  }

  const calculateChurnRate = () => {
    const uniqueUsers = new Set(data.churnIndicators.map(c => c.user_id)).size
    return uniqueUsers > 0 ? uniqueUsers : 0
  }

  const getTopFeatures = () => {
    const featureCounts = data.featureUsage.reduce((acc, usage) => {
      acc[usage.feature_name] = (acc[usage.feature_name] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(featureCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
  }

  if (loading) {
    return <div className="p-4">Loading post-purchase analytics...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Post-Purchase Behavior Analytics</h2>
        <div className="space-x-2">
          {['7', '30', '90'].map(days => (
            <Button
              key={days}
              variant={timeRange === days ? 'default' : 'outline'}
              onClick={() => setTimeRange(days)}
            >
              {days} days
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Return Visit Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{calculateReturnVisitRate()}%</div>
            <p className="text-sm text-muted-foreground">
              {data.returnVisits.length} return visits tracked
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Churn Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{calculateChurnRate()}</div>
            <p className="text-sm text-muted-foreground">
              Users showing churn indicators
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.featureUsage.length}</div>
            <p className="text-sm text-muted-foreground">
              Feature interactions tracked
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Features Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getTopFeatures().map(([feature, count]) => (
                <div key={feature} className="flex justify-between">
                  <span className="capitalize">{feature}</span>
                  <span className="font-mono">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Churn Reasons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(
                data.churnIndicators.reduce((acc, indicator) => {
                  acc[indicator.churn_reason] = (acc[indicator.churn_reason] || 0) + 1
                  return acc
                }, {} as Record<string, number>)
              ).map(([reason, count]) => (
                <div key={reason} className="flex justify-between">
                  <span className="capitalize">{reason.replace('_', ' ')}</span>
                  <span className="font-mono">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 