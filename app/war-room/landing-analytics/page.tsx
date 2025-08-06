'use client'

import { useState } from 'react'
import LandingPageAnalytics from '../../../components/LandingPageAnalytics'

export default function LandingAnalyticsPage() {
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
          <h1 className="text-3xl font-bold mb-4">📈 Landing Analytics</h1>
          <p className="text-gray-400 mb-6">
            Track landing page performance and user engagement metrics
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

        {/* Landing Analytics Dashboard */}
        <LandingPageAnalytics archetype={selectedArchetype} />
      </div>
    </div>
  )
}
  
