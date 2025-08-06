'use client'

import Link from 'next/link'
import { useState } from 'react'

const chambers = [
  { id: 'guardian', name: '🛡️ GUARDIAN', color: '#1e3a8a', description: 'Anchor Node - The Boundary Fire' },
      { id: 'partner', name: '🤝 PARTNER', color: '#e11d48', description: 'Living Bridge Node - The Harmonizing Force' },
  { id: 'spotlight', name: '🌟 SPOTLIGHT', color: '#f59e0b', description: 'Projection Node - The Light Vacuum' },
  { id: 'rebel', name: '⚔️ REBEL', color: '#dc2626', description: 'Disruption Node - The Unbreakable Wall' },
  { id: 'equalizer', name: '⚖️ EQUALIZER', color: '#0d9488', description: 'Arbiter Node - The Scale' },
  { id: 'visionary', name: '👁️ VISIONARY', color: '#4338ca', description: 'Future Node - The Now Snare' },
  { id: 'servant', name: '🏺 VESSEL', color: '#059669', description: 'Vessel Node - The Channel' },
  { id: 'mask', name: '🎭 MASK', color: '#6b7280', description: 'Facade Node - The Facade' },
  { id: 'wanderer', name: '🧭 WANDERER', color: '#0891b2', description: 'Flux Node - The Anchorless Trap' },
  { id: 'provider', name: '🛒 PROVIDER', color: '#b45309', description: 'Harvest Node - The Empty Table' },
  { id: 'sovereign', name: '👑 SOVEREIGN', color: '#000000', description: 'Crown Node - The Decree of Breath' },
  { id: 'seeker', name: '🧠 SEEKER', color: '#7c3aed', description: 'Void Node - The Black Mirror' }
]

export default function ChamberNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/80 backdrop-blur-sm border-2 border-white/20 text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-all duration-300 shadow-lg"
        style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' }}
      >
        {isOpen ? '✕' : '🏛️ Chambers'}
      </button>

      {/* Chamber Grid */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-80 bg-black/90 backdrop-blur-md border-2 border-white/20 rounded-lg p-4 shadow-2xl">
          <h3 className="text-white font-bold text-lg mb-4 text-center">Chamber Access</h3>
          
          <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
            {chambers.map((chamber) => (
              <Link
                key={chamber.id}
                href={`/chamber/${chamber.id}`}
                onClick={() => setIsOpen(false)}
                className="group relative p-3 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: `${chamber.color}20`,
                  boxShadow: `0 0 10px ${chamber.color}40`
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{chamber.name.split(' ')[0]}</div>
                  <div className="text-xs text-white/70 font-medium">
                    {chamber.name.split(' ').slice(1).join(' ')}
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    {chamber.description.split(' - ')[1]}
                  </div>
                </div>
                
                {/* Hover effect */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: chamber.color }}
                />
              </Link>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-white/10 text-center">
            <p className="text-xs text-white/50">
              Dominion Voice Alignment Protocol
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 