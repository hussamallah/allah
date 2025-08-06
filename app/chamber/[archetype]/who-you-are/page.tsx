'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function WhoYouArePage() {
  const params = useParams()
  const archetype = params.archetype as string
  const router = useRouter()
  const [purchaseStates, setPurchaseStates] = useState<Record<string, 'idle' | 'processing' | 'completed'>>({
    volume1: 'idle',
    volume2: 'idle',
    volume3: 'idle',
    volume4: 'idle',
    volume5: 'idle',
    bundle: 'idle'
  })
  const [selectedTier, setSelectedTier] = useState<string>('bundle')

  // Archetype-specific image configurations based on actual files
  const getArchetypeImages = (archetype: string) => {
    const imageConfigs = {
      guardian: {
        step1: '/guardian1.png',
        step2: '/Guardain-nod.png', 
        step3: '/guardian1.png' // Using guardian1 as step3 since no guardian3 exists
      },
      partner: {
        step1: '/partner1.png',
        step2: '/partenr-nod.png', // Note: typo in filename
        step3: '/partner1.png' // Using partner1 as step3 since no partner3 exists
      },
      provider: {
        step1: '/provider1.png',
        step2: '/provider2.png',
        step3: '/provider-nod.png'
      },
      equalizer: {
        step1: '/equalizer1.png',
        step2: '/equalizer1.png', // Using equalizer1 as step2 since no equalizer2 exists
        step3: '/equalizer1.png' // Using equalizer1 as step3 since no equalizer3 exists
      },
      mask: {
        step1: '/mask1.png',
        step2: '/mask1.png', // Using mask1 as step2 since no mask2 exists
        step3: '/mask1.png' // Using mask1 as step3 since no mask3 exists
      },
      rebel: {
        step1: '/rebel1.png',
        step2: '/rebel2.png',
        step3: '/rebel3.png'
      },
      seeker: {
        step1: '/seeker1.png',
        step2: '/seeker2.png',
        step3: '/seeker3.png'
      },
      sovereign: {
        step1: '/sovereign 1.png', // Note: space in filename
        step2: '/sovereign2.png',
        step3: '/sovereign3.png'
      },
      spotlight: {
        step1: '/owl-freedom.png', // Using owl images for spotlight
        step2: '/owl-mystery.png',
        step3: '/owl-radiance..png' // Note: extra dot in filename
      },
      vessel: {
        step1: '/channel1.png', // Using channel1 for vessel
        step2: '/channel1.png', // Using channel1 as step2 since no vessel2 exists
        step3: '/channel1.png' // Using channel1 as step3 since no vessel3 exists
      },
      visionary: {
        step1: '/visonary1.png', // Note: typo in filename
        step2: '/visonary2.png', // Note: typo in filename
        step3: '/visonary3.png' // Note: typo in filename
      },
      wanderer: {
        step1: '/wanderer1.png',
        step2: '/wanderer1.png', // Using wanderer1 as step2 since no wanderer2 exists
        step3: '/wanderer1.png' // Using wanderer1 as step3 since no wanderer3 exists
      }
    }

    // Return the configuration for the current archetype, or default to guardian
    return imageConfigs[archetype as keyof typeof imageConfigs] || imageConfigs.guardian
  }

  const archetypeImages = getArchetypeImages(archetype)

  // Archetype-specific configurations
  const archetypeConfigs = {
    seeker: {
      name: '🧠 SEEKER',
      color: '#4c1d95',
      primaryColor: '#4c1d95',
      secondaryColor: '#7c3aed',
      accentColor: '#7c3aed',
      glowColor: 'rgba(124, 58, 237, 0.5)',
      powerColor: 'rgba(124, 58, 237, 0.3)',
      emoji: '⚡'
    },
    guardian: {
      name: '🛡️ GUARDIAN',
      color: '#1e3a8a',
      primaryColor: '#1e3a8a',
      secondaryColor: '#3b82f6',
      accentColor: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.5)',
      powerColor: 'rgba(59, 130, 246, 0.3)',
      emoji: '🛡️'
    },
    partner: {
      name: '🤝 PARTNER',
      color: '#e11d48',
      primaryColor: '#e11d48',
      secondaryColor: '#f43f5e',
      accentColor: '#f43f5e',
      glowColor: 'rgba(244, 63, 94, 0.5)',
      powerColor: 'rgba(244, 63, 94, 0.3)',
      emoji: '💚'
    },
    spotlight: {
      name: '🌟 SPOTLIGHT',
      color: '#f59e0b',
      primaryColor: '#f59e0b',
      secondaryColor: '#fbbf24',
      accentColor: '#fbbf24',
      glowColor: 'rgba(251, 191, 36, 0.5)',
      powerColor: 'rgba(251, 191, 36, 0.3)',
      emoji: ''
    },
    rebel: {
      name: '⚔️ REBEL',
      color: '#dc2626',
      primaryColor: '#dc2626',
      secondaryColor: '#ef4444',
      accentColor: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.5)',
      powerColor: 'rgba(239, 68, 68, 0.3)',
      emoji: '⚔️'
    },
    equalizer: {
      name: '⚖️ EQUALIZER',
      color: '#059669',
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      accentColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.5)',
      powerColor: 'rgba(16, 185, 129, 0.3)',
      emoji: '⚖️'
    },
    visionary: {
      name: '🔮 VISIONARY',
      color: '#3b82f6',
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      accentColor: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.5)',
      powerColor: 'rgba(139, 92, 246, 0.3)',
      emoji: '🔮'
    },
    servant: {
      name: '🤲 SERVANT',
      color: '#065f46',
      primaryColor: '#065f46',
      secondaryColor: '#059669',
      accentColor: '#059669',
      glowColor: 'rgba(5, 150, 105, 0.5)',
      powerColor: 'rgba(5, 150, 105, 0.3)',
      emoji: '🤲'
    },
    mask: {
      name: ' MASK',
      color: '#6366f1',
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      accentColor: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.5)',
      powerColor: 'rgba(139, 92, 246, 0.3)',
      emoji: ''
    },
    wanderer: {
      name: '🧭 WANDERER',
      color: '#0891b2',
      primaryColor: '#0891b2',
      secondaryColor: '#06b6d4',
      accentColor: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.5)',
      powerColor: 'rgba(6, 182, 212, 0.3)',
      emoji: '🧭'
    },
    provider: {
      name: '🛒 PROVIDER',
      color: '#f59e0b',
      primaryColor: '#f59e0b',
      secondaryColor: '#fbbf24',
      accentColor: '#fbbf24',
      glowColor: 'rgba(251, 191, 36, 0.5)',
      powerColor: 'rgba(251, 191, 36, 0.3)',
      emoji: '🛒'
    },
    sovereign: {
      name: '👑 SOVEREIGN',
      color: '#f59e0b',
      primaryColor: '#f59e0b',
      secondaryColor: '#fbbf24',
      accentColor: '#fbbf24',
      glowColor: 'rgba(251, 191, 36, 0.5)',
      powerColor: 'rgba(251, 191, 36, 0.3)',
      emoji: '👑'
    }
  }

  // Basic tracking
  useEffect(() => {
    console.log('🔍 Override Volumes page accessed for archetype:', archetype)
  }, [archetype])

  const handlePurchase = async (tier: string, price: number) => {
    console.log(`Purchase clicked: ${tier} for $${price}`)
    setPurchaseStates(prev => ({ ...prev, [tier]: 'processing' }))
    
    try {
      // Simulate purchase process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setPurchaseStates(prev => ({ ...prev, [tier]: 'completed' }))
      alert(`🎉 Purchase successful! You now have access to ${tier}.\n\nThis would normally integrate with a payment system and unlock content.`)
      
    } catch (error) {
      console.error('Purchase failed:', error)
      setPurchaseStates(prev => ({ ...prev, [tier]: 'idle' }))
      alert('Purchase failed. Please try again.')
    }
  }

  const getTierPrice = (tier: string) => {
    switch (tier) {
      case 'compatibility': return 1
      case 'override1': return 3
      case 'override2': return 5
      case 'fullBundle': return 10
      default: return 10
    }
  }

  const getTierName = (tier: string) => {
    switch (tier) {
      case 'compatibility': return 'Compatibility Report'
      case 'override1': return '1 Override Card'
      case 'override2': return '2-Card Bundle'
      case 'fullBundle': return '5-Card Full Bundle'
      default: return '5-Card Full Bundle'
    }
  }

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

  const config = archetypeConfigs[archetype.toLowerCase() as keyof typeof archetypeConfigs]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 py-12">
        
        {/* 1. How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#D4AF37' }}>
            Your Signal Takes Flight: How Change Begins
          </h2>
          <div className="grid md:grid-cols-3 gap-32 max-w-full mx-auto px-8">
            <div className="text-center">
              <div className="w-72 h-[28rem] mx-auto mb-4 rounded-xl overflow-hidden">
                <img 
                  src={archetypeImages.step1} 
                  alt="Begin your transformation"
                  className="w-full h-full object-cover"
                />
            </div>
              <h3 className="text-4xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                1
              </h3>
              <div className="w-72 mx-auto">
                <p className="text-lg mb-3" style={{ color: '#E1E1E1' }}>
                  Begin with the area you feel needs change now.
                </p>
                <p className="text-lg mb-3" style={{ color: '#E1E1E1' }}>
                  Every upgrade is a direct step toward your future—unstoppable and fully realized.
                </p>
                <p className="text-lg mb-3" style={{ color: '#E1E1E1' }}>
                  The deeper you go, the more you become the version of yourself others can't ignore.
                </p>
                <p className="text-lg font-semibold" style={{ color: '#D4AF37' }}>
                  Start the shift. Become undeniable.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-72 h-[28rem] mx-auto mb-4 rounded-xl overflow-hidden">
                <img 
                  src={archetypeImages.step2} 
                  alt="Access instantly"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-4xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                2
              </h3>
              <div className="w-72 mx-auto">
                <p className="text-lg" style={{ color: '#E1E1E1' }}>
                  Access instantly
                </p>
                <p className="text-lg" style={{ color: '#E1E1E1' }}>
                  Start upgrading your reality today.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-72 h-[28rem] mx-auto mb-4 rounded-xl overflow-hidden">
                <img 
                  src={archetypeImages.step3} 
                  alt="See change fast"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-4xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                3
              </h3>
              <div className="w-72 mx-auto">
                <p className="text-lg" style={{ color: '#E1E1E1' }}>
                  See change fast
                </p>
                <p className="text-lg" style={{ color: '#E1E1E1' }}>
                  Every tool is built to work now, not "someday."
                </p>
              </div>
              </div>
              </div>
            </div>

        {/* 2. What's Inside Your Upgrade Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#D4AF37' }}>
            What's Inside Your Upgrade?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6 border rounded-xl"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: '#E8ECFA' 
                 }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                Face-to-Face
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#E1E1E1' }}>
                Upgrade your real-life interactions. Show up as the version of you who commands respect and moves forward.
              </p>
              </div>

            <div className="text-center p-6 border rounded-xl"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: '#E8ECFA' 
                 }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                Romantic
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#E1E1E1' }}>
                Shift relationships. Create new patterns in dating, love, and self-worth.
              </p>
            </div>

            <div className="text-center p-6 border rounded-xl"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: '#E8ECFA' 
                 }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                Group/Team
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#E1E1E1' }}>
                Stop being overlooked. Become the one others notice and follow.
              </p>
            </div>

            <div className="text-center p-6 border rounded-xl"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: '#E8ECFA' 
                 }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                Physical (Nonverbal)
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#E1E1E1' }}>
                Your presence becomes magnetic. People sense the shift, even if they can't name it.
                </p>
            </div>

            <div className="text-center p-6 border rounded-xl"
                  style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: '#E8ECFA' 
                 }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                Digital/Text
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#E1E1E1' }}>
                You write and communicate with clarity, confidence, and boundaries—no more second-guessing.
                </p>
              </div>
              </div>
            </div>

        {/* 3. Choose Your Upgrade Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#D4AF37' }}>
            Choose Your Upgrade
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            
            {/* Compatibility Report */}
            <div className="text-center p-8 border rounded-2xl transition-all duration-300 hover:scale-105"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: selectedTier === 'compatibility' ? '#FF69B4' : '#E8ECFA' 
                 }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#FF69B4' }}>
                Compatibility Report
              </h3>
              <div className="text-4xl font-bold mb-4" style={{ color: '#FF69B4' }}>
                $1
              </div>
              <p className="text-center mb-6" style={{ color: '#E1E1E1' }}>
                Get detailed compatibility insights with friends or partners.
              </p>
              <button 
                onClick={() => setSelectedTier('compatibility')}
                className={`w-full py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedTier === 'compatibility' ? 'scale-105' : ''
                }`}
                style={{ 
                  background: selectedTier === 'compatibility' 
                    ? '#FF69B4'
                    : 'rgba(255, 105, 180, 0.2)',
                  color: selectedTier === 'compatibility' ? '#000000' : '#FF69B4',
                  border: '2px solid #E8ECFA'
                }}>
                Select This Option
              </button>
            </div>

            {/* 1 Override Card */}
            <div className="text-center p-8 border rounded-2xl transition-all duration-300 hover:scale-105"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: selectedTier === 'override1' ? '#4F46E5' : '#E8ECFA' 
                 }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#4F46E5' }}>
                1 Override Card
              </h3>
              <div className="text-4xl font-bold mb-4" style={{ color: '#4F46E5' }}>
                $3
              </div>
              <p className="text-center mb-6" style={{ color: '#E1E1E1' }}>
                Unlock one powerful override ritual to break patterns.
              </p>
              <button 
                onClick={() => setSelectedTier('override1')}
                className={`w-full py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedTier === 'override1' ? 'scale-105' : ''
                }`}
                style={{ 
                  background: selectedTier === 'override1' 
                    ? '#4F46E5'
                    : 'rgba(79, 70, 229, 0.2)',
                  color: selectedTier === 'override1' ? '#FFFFFF' : '#4F46E5',
                  border: '2px solid #E8ECFA'
                }}>
                Select This Option
              </button>
            </div>

            {/* 2-Card Bundle */}
            <div className="text-center p-8 border rounded-2xl transition-all duration-300 hover:scale-105"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: selectedTier === 'override2' ? '#059669' : '#E8ECFA' 
                 }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#059669' }}>
                2-Card Bundle
              </h3>
              <div className="text-4xl font-bold mb-4" style={{ color: '#059669' }}>
                $5
              </div>
              <p className="text-center mb-6" style={{ color: '#E1E1E1' }}>
                Get two override cards for focused transformation.
              </p>
              <button 
                onClick={() => setSelectedTier('override2')}
                className={`w-full py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedTier === 'override2' ? 'scale-105' : ''
                }`}
                style={{ 
                  background: selectedTier === 'override2' 
                    ? '#059669'
                    : 'rgba(5, 150, 105, 0.2)',
                  color: selectedTier === 'override2' ? '#FFFFFF' : '#059669',
                  border: '2px solid #E8ECFA'
                }}>
                Select This Option
              </button>
            </div>

            {/* 5-Card Full Bundle */}
            <div className="text-center p-8 border rounded-2xl transition-all duration-300 hover:scale-105"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: selectedTier === 'fullBundle' ? '#D97706' : '#E8ECFA' 
                 }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#D97706' }}>
                5-Card Full Bundle
              </h3>
              <div className="text-4xl font-bold mb-4" style={{ color: '#D97706' }}>
                $10
              </div>
              <p className="text-center mb-6" style={{ color: '#E1E1E1' }}>
                Complete override toolkit—full transformation, every area covered.
              </p>
              <button 
                onClick={() => setSelectedTier('fullBundle')}
                className={`w-full py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedTier === 'fullBundle' ? 'scale-105' : ''
                }`}
                style={{ 
                  background: selectedTier === 'fullBundle' 
                    ? '#D97706'
                    : 'rgba(217, 119, 6, 0.2)',
                  color: selectedTier === 'fullBundle' ? '#FFFFFF' : '#D97706',
                  border: '2px solid #E8ECFA'
                }}>
                Select This Option
              </button>
            </div>
          </div>
        </div>

        {/* 4. Final Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#D4AF37' }}>
            Ready to Break Through?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: '#E1E1E1' }}>
            Choose your Override Volume(s) and start living as the version of yourself others already sense—and you finally claim.
          </p>
          <button
            onClick={() => handlePurchase(selectedTier, getTierPrice(selectedTier))}
            disabled={purchaseStates[selectedTier as keyof typeof purchaseStates] === 'processing'}
            className="px-12 py-6 text-2xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: '#D4AF37',
              color: '#000000',
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)'
            }}>
            {purchaseStates[selectedTier as keyof typeof purchaseStates] === 'processing' 
              ? 'Processing...' 
              : 'Unlock Your Upgrade'}
          </button>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href={`/chamber/${archetype}`}
            className="inline-block hover:text-white transition-colors duration-300"
            style={{ color: config.primaryColor }}
          >
            ← Back to {config.name} Chamber
          </Link>
        </div>
      </div>
    </div>
  )
} 