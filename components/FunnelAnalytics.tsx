'use client'

import { useState, useEffect } from 'react'

interface FunnelAnalyticsProps {
  archetype?: string
}

export default function FunnelAnalytics({ archetype }: FunnelAnalyticsProps) {
  const [funnelData, setFunnelData] = useState({
    quizStart: 1000,
    quizComplete: 750,
    emailSubmit: 500,
    chamberView: 400,
    pathView: 300,
    purchase: 50
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [archetype])

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const calculateConversionRate = (current: number, previous: number) => {
    return previous > 0 ? ((current / previous) * 100).toFixed(1) : '0'
  }

  const funnelSteps = [
    { name: 'Quiz Start', count: funnelData.quizStart, rate: '100%' },
    { name: 'Quiz Complete', count: funnelData.quizComplete, rate: calculateConversionRate(funnelData.quizComplete, funnelData.quizStart) },
    { name: 'Email Submit', count: funnelData.emailSubmit, rate: calculateConversionRate(funnelData.emailSubmit, funnelData.quizComplete) },
    { name: 'Chamber View', count: funnelData.chamberView, rate: calculateConversionRate(funnelData.chamberView, funnelData.emailSubmit) },
    { name: 'Path View', count: funnelData.pathView, rate: calculateConversionRate(funnelData.pathView, funnelData.chamberView) },
    { name: 'Purchase', count: funnelData.purchase, rate: calculateConversionRate(funnelData.purchase, funnelData.pathView) }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-6 text-white">
        {archetype ? `${archetype.charAt(0).toUpperCase() + archetype.slice(1)} Funnel` : 'Overall Funnel'}
      </h2>
      
      <div className="space-y-4">
        {funnelSteps.map((step, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div>
                <h3 className="font-medium text-white">{step.name}</h3>
                <p className="text-sm text-gray-400">{step.count.toLocaleString()} users</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-400">{step.rate}</p>
              <p className="text-sm text-gray-400">conversion</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-400">Overall Conversion</h3>
        <p className="text-2xl font-bold text-white">
          {calculateConversionRate(funnelData.purchase, funnelData.quizStart)}%
        </p>
        <p className="text-sm text-gray-400">
          From {funnelData.quizStart.toLocaleString()} starts to {funnelData.purchase.toLocaleString()} purchases
        </p>
      </div>
    </div>
  )
} 