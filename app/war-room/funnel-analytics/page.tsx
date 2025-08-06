'use client'

import { useState } from 'react'
import FunnelAnalytics from '../../../components/FunnelAnalytics'

export default function FunnelAnalyticsPage() {
  const [selectedArchetype, setSelectedArchetype] = useState<string>('')

  const archetypes = [
    'seeker', 'guardian', 'partner', 'spotlight', 'rebel', 
    'equalizer', 'sage', 'mystic', 'visionary', 'servant', 
    'mask', 'wanderer', 'provider', 'sovereign'
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">📊 Funnel Analytics</h1>
          <p className="text-gray-400 mb-6">
            Track conversion rates and drop-offs at each step of your user journey
          </p>
          
          {/* Archetype Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedArchetype('')}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedArchetype === '' 
                  ? 'bg-blue-600 border-blue-500 text-white' 
                  : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Archetypes
            </button>
            {archetypes.map(archetype => (
              <button
                key={archetype}
                onClick={() => setSelectedArchetype(archetype)}
                className={`px-4 py-2 rounded-lg border transition-colors capitalize ${
                  selectedArchetype === archetype 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {archetype}
              </button>
            ))}
          </div>
        </div>

        {/* Funnel Analytics Dashboard */}
        <FunnelAnalytics archetype={selectedArchetype} />
        
        {/* Optimization Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-white">🎯 Optimization Opportunities</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <span className="font-medium text-yellow-400">High Drop-off at Quiz Start:</span>
                <ul className="mt-2 space-y-1 text-gray-400">
                  <li>• Simplify quiz introduction</li>
                  <li>• Add progress indicator</li>
                  <li>• Reduce initial friction</li>
                </ul>
              </div>
              <div>
                <span className="font-medium text-red-400">Low Email Submission Rate:</span>
                <ul className="mt-2 space-y-1 text-gray-400">
                  <li>• Improve value proposition</li>
                  <li>• Add social proof</li>
                  <li>• Simplify form design</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-white">📊 Industry Benchmarks</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <span className="font-medium">Quiz Completion Rate:</span>
                <ul className="mt-2 space-y-1 text-gray-400">
                  <li>• Good: 60-80%</li>
                  <li>• Average: 40-60%</li>
                  <li>• Poor: &lt;40%</li>
                </ul>
              </div>
              <div>
                <span className="font-medium">Email Capture Rate:</span>
                <ul className="mt-2 space-y-1 text-gray-400">
                  <li>• Good: 15-25%</li>
                  <li>• Average: 5-15%</li>
                  <li>• Poor: &lt;5%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  
