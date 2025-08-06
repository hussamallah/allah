'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ThePathPage() {
  const params = useParams()
  const archetype = params.archetype as string
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only show for valid archetypes
  const validArchetypes = ['seeker', 'guardian', 'partner', 'spotlight', 'rebel', 'equalizer', 'visionary', 'servant', 'mask', 'wanderer', 'provider', 'sovereign']
  if (!validArchetypes.includes(archetype.toLowerCase())) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Path</h1>
          <p className="text-gray-400">This path is only for valid archetypes.</p>
          <Link href="/chambers" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            ← Back to Chambers
          </Link>
        </div>
      </div>
    )
  }

  // Get archetype-specific configuration
  const isSeeker = archetype.toLowerCase() === 'seeker'
  const isGuardian = archetype.toLowerCase() === 'guardian'
  const isPartner = archetype.toLowerCase() === 'partner'
  const isSpotlight = archetype.toLowerCase() === 'spotlight'
  const isRebel = archetype.toLowerCase() === 'rebel'
  const isWanderer = archetype.toLowerCase() === 'wanderer'
  const isServant = archetype.toLowerCase() === 'servant'
  const isVisionary = archetype.toLowerCase() === 'visionary'
  const isEqualizer = archetype.toLowerCase() === 'equalizer'
  const isMask = archetype.toLowerCase() === 'mask'
  const isProvider = archetype.toLowerCase() === 'provider'
  const isSovereign = archetype.toLowerCase() === 'sovereign'

  // Archetype-specific configurations
  const config = {
    seeker: {
      primaryColor: '#EC4899',
      secondaryColor: '#9D4EDD',
      title: 'THE PATH OF THE SEEKER',
      subtitle: 'From Seeker to Breaker',
      description: 'Your journey from seeking to becoming the one who breaks illusions and reveals truth.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '🌾'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    },
    guardian: {
      primaryColor: '#1e3a8a',
      secondaryColor: '#3b82f6',
      title: 'THE PATH OF THE GUARDIAN',
      subtitle: 'From Guardian to Anchor',
      description: 'Your journey from protecting to becoming the unshakeable foundation.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '🛡️'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    },
    partner: {
      primaryColor: '#e11d48',
      secondaryColor: '#f43f5e',
      title: 'THE PATH OF THE PARTNER',
      subtitle: 'From Partner to Bridge',
      description: 'Your journey from connecting to becoming the living bridge between worlds.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '🤝'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    },
    spotlight: {
      primaryColor: '#f59e0b',
      secondaryColor: '#fbbf24',
      title: 'THE PATH OF THE SPOTLIGHT',
      subtitle: 'From Spotlight to Beacon',
      description: 'Your journey from performing to becoming the living lighthouse.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '🌟'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    },
    rebel: {
      primaryColor: '#dc2626',
      secondaryColor: '#ef4444',
      title: 'THE PATH OF THE REBEL',
      subtitle: 'From Rebel to Anarch',
      description: 'Your journey from disrupting to becoming the chaos engine.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '⚔️'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    },
    equalizer: {
      primaryColor: '#0d9488',
      secondaryColor: '#14b8a6',
      title: 'THE PATH OF THE EQUALIZER',
      subtitle: 'From Equalizer to Arbiter',
      description: 'Your journey from mediating to becoming the living scale of justice.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '⚖️'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    },
    visionary: {
      primaryColor: '#4338ca',
      secondaryColor: '#6366f1',
      title: 'THE PATH OF THE VISIONARY',
      subtitle: 'From Visionary to Creator',
      description: 'Your journey from seeing to becoming the one who manifests the future.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '👁️'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    },
    servant: {
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      title: 'THE PATH OF THE VESSEL',
      subtitle: 'From Servant to Vessel',
      description: 'Your journey from serving to becoming the silent engine of transformation.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '🏺'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    },
    mask: {
      primaryColor: '#6b7280',
      secondaryColor: '#9ca3af',
      title: 'THE PATH OF THE MASK',
      subtitle: 'From Mask to Shapeshifter',
      description: 'Your journey from adapting to becoming the master of reality.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '🎭'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    },
    wanderer: {
      primaryColor: '#0891b2',
      secondaryColor: '#06b6d4',
      title: 'THE PATH OF THE WANDERER',
      subtitle: 'From Wanderer to Anchorless',
      description: 'Your journey from wandering to becoming the master of flux.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '🧭'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    },
    provider: {
      primaryColor: '#b45309',
      secondaryColor: '#d97706',
      title: 'THE PATH OF THE PROVIDER',
      subtitle: 'From Provider to Harvest',
      description: 'Your journey from providing to becoming the living abundance.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '🛒'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    },
    sovereign: {
      primaryColor: '#f59e0b',
      secondaryColor: '#fbbf24',
      title: 'THE PATH OF THE SOVEREIGN',
      subtitle: 'From Sovereign to Crown',
      description: 'Your journey from leading to becoming the living law.',
      paths: [
        {
          name: 'Field Proof',
          description: 'Test your abilities in real-world scenarios',
          href: `/chamber/${archetype}/the-path/field-proof`,
          icon: '👑'
        },
        {
          name: 'Stage Test',
          description: 'Take the advanced stage assessment',
          href: `/chamber/${archetype}/the-path/stage-test`,
          icon: '📊'
        }
      ]
    }
  }

  const currentConfig = isSeeker ? config.seeker : 
                       isGuardian ? config.guardian : 
                       isPartner ? config.partner :
                       isSpotlight ? config.spotlight :
                       isRebel ? config.rebel :
                       isServant ? config.servant :
                       isVisionary ? config.visionary :
                       isEqualizer ? config.equalizer :
                       isMask ? config.mask :
                       isWanderer ? config.wanderer :
                       isProvider ? config.provider :
                       isSovereign ? config.sovereign : config.seeker

  // Helper function to get archetype-specific colors
  const getArchetypeColors = () => {
    if (isSeeker) return { primary: 'pink', secondary: 'purple', bg: 'from-purple-900/30 to-pink-900/30', border: 'border-purple-500/50', text: 'text-purple-400', textLight: 'text-purple-300', dot: 'bg-pink-400', glow: 'rgba(157, 78, 221, 0.2)', button: 'from-pink-600 to-purple-600', buttonGlow: 'rgba(236, 72, 153, 0.7)', back: 'text-purple-400 hover:text-purple-300' }
    if (isGuardian) return { primary: 'blue', secondary: 'indigo', bg: 'from-blue-900/30 to-indigo-900/30', border: 'border-blue-500/50', text: 'text-blue-400', textLight: 'text-blue-300', dot: 'bg-indigo-400', glow: 'rgba(30, 58, 138, 0.3)', button: 'from-blue-600 to-indigo-600', buttonGlow: 'rgba(30, 58, 138, 0.7)', back: 'text-blue-400 hover:text-blue-300' }
    if (isPartner) return { primary: 'red', secondary: 'pink', bg: 'from-red-900/30 to-pink-900/30', border: 'border-red-500/50', text: 'text-red-400', textLight: 'text-red-300', dot: 'bg-pink-400', glow: 'rgba(225, 29, 72, 0.3)', button: 'from-red-600 to-pink-600', buttonGlow: 'rgba(225, 29, 72, 0.7)', back: 'text-red-400 hover:text-red-300' }
    if (isSpotlight) return { primary: 'yellow', secondary: 'orange', bg: 'from-yellow-900/30 to-orange-900/30', border: 'border-yellow-500/50', text: 'text-yellow-400', textLight: 'text-yellow-300', dot: 'bg-orange-400', glow: 'rgba(245, 158, 11, 0.3)', button: 'from-yellow-600 to-orange-600', buttonGlow: 'rgba(245, 158, 11, 0.7)', back: 'text-yellow-400 hover:text-yellow-300' }
    if (isRebel) return { primary: 'red', secondary: 'red', bg: 'from-red-900/30 to-red-800/30', border: 'border-red-500/50', text: 'text-red-400', textLight: 'text-red-300', dot: 'bg-red-400', glow: 'rgba(220, 38, 38, 0.3)', button: 'from-red-600 to-red-700', buttonGlow: 'rgba(220, 38, 38, 0.7)', back: 'text-red-400 hover:text-red-300' }
    if (isServant) return { primary: 'emerald', secondary: 'green', bg: 'from-emerald-900/30 to-green-900/30', border: 'border-emerald-500/50', text: 'text-emerald-400', textLight: 'text-emerald-300', dot: 'bg-green-400', glow: 'rgba(5, 150, 105, 0.3)', button: 'from-emerald-600 to-green-600', buttonGlow: 'rgba(5, 150, 105, 0.7)', back: 'text-emerald-400 hover:text-emerald-300' }
    if (isVisionary) return { primary: 'blue', secondary: 'purple', bg: 'from-blue-900/30 to-purple-900/30', border: 'border-blue-500/50', text: 'text-blue-400', textLight: 'text-blue-300', dot: 'bg-purple-400', glow: 'rgba(59, 130, 246, 0.3)', button: 'from-blue-600 to-purple-600', buttonGlow: 'rgba(59, 130, 246, 0.7)', back: 'text-blue-400 hover:text-blue-300' }
    if (isEqualizer) return { primary: 'emerald', secondary: 'green', bg: 'from-emerald-900/30 to-green-900/30', border: 'border-emerald-500/50', text: 'text-emerald-400', textLight: 'text-emerald-300', dot: 'bg-green-400', glow: 'rgba(5, 150, 105, 0.3)', button: 'from-emerald-600 to-green-600', buttonGlow: 'rgba(5, 150, 105, 0.7)', back: 'text-emerald-400 hover:text-emerald-300' }
    if (isMask) return { primary: 'indigo', secondary: 'purple', bg: 'from-indigo-900/30 to-purple-900/30', border: 'border-indigo-500/50', text: 'text-indigo-400', textLight: 'text-indigo-300', dot: 'bg-purple-400', glow: 'rgba(99, 102, 241, 0.3)', button: 'from-indigo-600 to-purple-600', buttonGlow: 'rgba(99, 102, 241, 0.7)', back: 'text-indigo-400 hover:text-indigo-300' }
    if (isWanderer) return { primary: 'cyan', secondary: 'blue', bg: 'from-cyan-900/30 to-blue-900/30', border: 'border-cyan-500/50', text: 'text-cyan-400', textLight: 'text-cyan-300', dot: 'bg-blue-400', glow: 'rgba(8, 145, 178, 0.3)', button: 'from-cyan-600 to-blue-600', buttonGlow: 'rgba(8, 145, 178, 0.7)', back: 'text-cyan-400 hover:text-cyan-300' }
    if (isProvider) return { primary: 'amber', secondary: 'yellow', bg: 'from-amber-900/30 to-yellow-900/30', border: 'border-amber-500/50', text: 'text-amber-400', textLight: 'text-amber-300', dot: 'bg-yellow-400', glow: 'rgba(245, 158, 11, 0.3)', button: 'from-amber-600 to-yellow-600', buttonGlow: 'rgba(245, 158, 11, 0.7)', back: 'text-amber-400 hover:text-amber-300' }
    if (isSovereign) return { primary: 'amber', secondary: 'yellow', bg: 'from-amber-900/30 to-yellow-900/30', border: 'border-amber-500/50', text: 'text-amber-400', textLight: 'text-amber-300', dot: 'bg-yellow-400', glow: 'rgba(245, 158, 11, 0.3)', button: 'from-amber-600 to-yellow-600', buttonGlow: 'rgba(245, 158, 11, 0.7)', back: 'text-amber-400 hover:text-amber-300' }
    return { primary: 'blue', secondary: 'indigo', bg: 'from-blue-900/30 to-indigo-900/30', border: 'border-blue-500/50', text: 'text-blue-400', textLight: 'text-blue-300', dot: 'bg-indigo-400', glow: 'rgba(30, 58, 138, 0.3)', button: 'from-blue-600 to-indigo-600', buttonGlow: 'rgba(30, 58, 138, 0.7)', back: 'text-blue-400 hover:text-blue-300' }
  }

  const colors = getArchetypeColors()

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-y-auto">
      {/* Fixed Full-Screen Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 animate-pulse opacity-15"
          style={{ 
            background: `radial-gradient(circle at center, ${currentConfig.primaryColor} 0%, ${currentConfig.secondaryColor} 50%, transparent 70%)`,
            animationDuration: '3s'
          }}
        />
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-0 animate-ping"
              style={{
                color: currentConfig.primaryColor,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6 animate-pulse" style={{ 
            animationDuration: '3s',
            filter: `drop-shadow(0 0 20px ${currentConfig.primaryColor})`
          }}>
            ��️
          </div>
          
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-wider"
            style={{ 
              color: currentConfig.primaryColor,
              textShadow: `0 0 30px ${currentConfig.primaryColor}`
            }}
          >
            {currentConfig.title}
          </h1>
          
          <p className="text-xl text-gray-300 mb-4">
            {currentConfig.subtitle}
          </p>
          
          <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
            {currentConfig.description}
          </p>
          
          <div className="w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-current to-current animate-pulse" 
               style={{ 
                 color: currentConfig.primaryColor,
                 animationDuration: '4s' 
               }}></div>
        </div>

        {/* Path Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {currentConfig.paths.map((path, index) => (
            <Link key={index} href={path.href} className="block">
              <div className="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <div 
                  className="bg-black/60 backdrop-blur-md border-2 rounded-2xl p-8 hover:border-opacity-70 transition-all duration-300 text-center"
                  style={{ 
                    borderColor: `${currentConfig.primaryColor}50`,
                    boxShadow: `0 0 40px ${currentConfig.primaryColor}30`
                  }}
                >
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-4xl mr-4">{path.icon}</div>
                    <h3 
                      className="text-2xl font-bold group-hover:text-opacity-80 transition-colors"
                      style={{ color: currentConfig.primaryColor }}
                    >
                      {path.name}
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {path.description}
                  </p>
                  <div className="text-center">
                    <span 
                      className="text-sm font-medium group-hover:text-opacity-80 transition-colors"
                      style={{ color: currentConfig.secondaryColor }}
                    >
                      Begin your journey →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link 
            href={`/chamber/${archetype}`}
            className={`inline-flex items-center px-6 py-3 rounded-lg border transition-colors ${colors.back}`}
            style={{ borderColor: `${currentConfig.primaryColor}50` }}
          >
            ← Back to {archetype.charAt(0).toUpperCase() + archetype.slice(1)} Chamber
          </Link>
        </div>
      </div>
    </div>
  )
} 