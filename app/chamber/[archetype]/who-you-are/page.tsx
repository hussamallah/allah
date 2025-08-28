'use client'

import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// Card descriptions for recommendations
const cardDescriptions = {
  'Face-to-Face': 'Upgrade your real-life interactions. Show up as the version of you who commands respect and moves forward.',
  'Romantic': 'Shift relationships. Create new patterns in dating, love, and self-worth.',
  'Group/Team': 'Stop being overlooked. Become the one others notice and follow.',
  'Physical (Nonverbal)': 'Your presence becomes magnetic. People sense the shift, even if they can\'t name it.',
  'Digital/Text': 'You write and communicate with clarity, confidence, and boundaries—no more second-guessing.',
  'Mind Break': 'Stop thought spirals, shame loops, and internal shutdown patterns.'
}

export default function WhoYouArePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const archetype = params.archetype as string
  const [purchaseStates, setPurchaseStates] = useState<Record<string, 'idle' | 'processing' | 'completed'>>({
    volume1: 'idle',
    volume2: 'idle',
    volume3: 'idle',
    volume4: 'idle',
    volume5: 'idle',
    bundle: 'idle'
  })
  const [selectedTier, setSelectedTier] = useState<string>('bundle')
  const [recommendedCards, setRecommendedCards] = useState<string[]>([])
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [redirectTrigger, setRedirectTrigger] = useState<string>('')

  // Archetype-specific image configurations based on actual files
  const getArchetypeImages = (archetype: string) => {
    const imageConfigs = {
      guardian: {
        step1: '/guardian1.png',
        step2: '/gaurdain2.png', // Using actual filename with typo
        step3: '/Guardain3.png'  // Using actual filename with typo
      },
      partner: {
        step1: '/partner1.png',
        step2: '/partner2.png',
        step3: '/partner3.png'
      },
      provider: {
        step1: '/provider1.png',
        step2: '/provider2.png',
        step3: '/provider3.png'
      },
      equalizer: {
        step1: '/equalizer1.png',
        step2: '/equalizer 2.png', // Using actual filename with space
        step3: '/equalizer3.png'
      },
      mask: {
        step1: '/mask1.png',
        step2: '/mask2.png',
        step3: '/mask3.png'
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
        step1: '/sovereign 1.png', // Using actual filename with space
        step2: '/sovereign2.png',
        step3: '/sovereign3.png'
      },
      spotlight: {
        step1: '/owl-freedom.png', // Using actual owl images
        step2: '/owl-mystery.png',
        step3: '/owl-radiance.png' // Fixed the extra dot
      },
      vessel: {
        step1: '/provider1.png', // Using provider images for vessel since no vessel-specific images exist
        step2: '/provider2.png',
        step3: '/provider3.png'
      },
      visionary: {
        step1: '/visonary1.png', // Using actual filename with typo
        step2: '/visonary2.png', // Using actual filename with typo
        step3: '/visonary3.png'  // Using actual filename with typo
      },
      wanderer: {
        step1: '/wanderer1.png',
        step2: '/wanderer1.png', // Reusing wanderer1 since no wanderer2 exists
        step3: '/wanderer1.png'  // Reusing wanderer1 since no wanderer3 exists
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

  // Check for quiz results and set redirect flag
  useEffect(() => {
    // Check localStorage for quiz results
    const quizResults = localStorage.getItem('quiz_results')
    if (quizResults) {
      try {
        const results = JSON.parse(quizResults)
        if (results.highestTrigger) {
          // Set redirect flag instead of redirecting immediately
          setShouldRedirect(true)
          setRedirectTrigger(results.highestTrigger.toLowerCase())
          return
        }
      } catch (error) {
        console.error('Error parsing quiz results:', error)
      }
    }

    // If no quiz results, check URL parameters for cards
    const cardsParam = searchParams.get('cards')
    if (cardsParam) {
      const cards = cardsParam.split(',').filter(card => card.trim())
      setRecommendedCards(cards)
      setShowRecommendations(true)
    }
  }, [searchParams])

  // Handle redirect in separate useEffect
  useEffect(() => {
    if (shouldRedirect && redirectTrigger) {
      setRedirecting(true)
      router.push(`/chamber/${archetype}/who-you-are/${redirectTrigger}`)
    }
  }, [shouldRedirect, redirectTrigger, archetype, router])

  // Function to check if a card is recommended
  const isRecommendedCard = (cardName: string) => {
    return recommendedCards.includes(cardName)
  }

  // Function to get card styling based on recommendation status
  const getCardStyling = (cardName: string) => {
    if (isRecommendedCard(cardName)) {
      return {
        backgroundColor: 'rgba(212, 175, 55, 0.15)', // Gold background
        borderColor: '#D4AF37',
        borderWidth: '3px',
        boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
        transform: 'scale(1.02)'
      }
    }
    return {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#E8ECFA'
    }
  }

  // Show loading while redirecting
  if (redirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-6"></div>
          <p className="text-blue-200 text-lg">Loading your personalized results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-[#0D1B2A] via-[#1E3A5F] to-[#FFEACB]" 
         style={{ 
           animation: 'dawnPulse 6s ease-in-out infinite alternate'
         }}>
      
      {/* Dawn Animation Styles */}
      <style jsx>{`
        @keyframes dawnPulse {
          from {
            filter: brightness(1);
          }
          to {
            filter: brightness(1.1);
          }
        }
      `}</style>
      
      {/* Optional: Add subtle animated light pulse */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-96 h-96 rounded-full opacity-20 animate-pulse"
             style={{
               background: `radial-gradient(circle, 
                 rgba(252, 163, 17, 0.4) 0%, 
                 rgba(252, 163, 17, 0.2) 30%, 
                 transparent 70%)`
             }}>
        </div>
      </div>

      {/* Foreground terrain/mist layer */}
      <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none"
           style={{
             background: `linear-gradient(90deg, 
               transparent 0%, 
               rgba(26, 26, 26, 0.3) 50%, 
               rgba(26, 26, 26, 0.6) 100%)`
           }}>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-12 relative z-10">
        
        {/* Subheader */}
        <div className="text-center mb-12 sm:mb-24">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium" style={{ color: '#E49759' }}>
            This is the final step of Ground Zero. You've seen who you are.
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mt-2" style={{ color: '#E49759' }}>
            Now you choose the shift that begins your override.
          </p>
        </div>
        
        {/* 1. How It Works Section - Vertical Scroll Layout */}
        <div className="mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12" style={{ color: '#D4AF37' }}>
            Your Signal Takes Flight: How Change Begins
          </h2>
          
          {/* Card 1 - Full Screen Section */}
          <div className="min-h-screen flex items-start justify-center pt-8 sm:pt-16 mb-8 sm:mb-16">
            <div className="text-center max-w-4xl mx-auto px-4 sm:px-8">
              <div className="w-80 h-[32rem] mx-auto mb-1 rounded-xl overflow-hidden">
                <img 
                  src={archetypeImages.step1} 
                  alt="Begin your transformation"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4" style={{ color: '#D4AF37' }}>
                1
              </h3>
              <div className="max-w-2xl mx-auto">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4" style={{ color: '#D4AF37' }}>
                  What This Page Is
                </h4>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4" style={{ color: '#E1E1E1' }}>
                  You're at the final step of Ground Zero.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6" style={{ color: '#E1E1E1' }}>
                  This is the point where reflection ends and action begins. You've seen your Archetype — now you choose your first Override and start changing how you move through the world.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 - Full Screen Section */}
          <div className="min-h-screen flex items-start justify-center pt-8 sm:pt-16 mb-8 sm:mb-16">
            <div className="text-center max-w-4xl mx-auto px-4 sm:px-8">
              <div className="w-80 h-[32rem] mx-auto mb-1 rounded-xl overflow-hidden">
                <img 
                  src={archetypeImages.step2} 
                  alt="Access instantly"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4" style={{ color: '#D4AF37' }}>
                2
              </h3>
              <div className="max-w-2xl mx-auto">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4" style={{ color: '#D4AF37' }}>
                  What You're Choosing
                </h4>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4" style={{ color: '#E1E1E1' }}>
                  These are Override Cards — real-life tools.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6" style={{ color: '#E1E1E1' }}>
                  Each card installs a behavioral shift: in presence, love, speech, or leadership. This isn't advice. It's architecture. Choose 1, 2, or all 5 and override a pattern right now.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 - Full Screen Section */}
          <div className="min-h-screen flex items-start justify-center pt-8 sm:pt-16 mb-8 sm:mb-16">
            <div className="text-center max-w-4xl mx-auto px-4 sm:px-8">
              <div className="w-80 h-[32rem] mx-auto mb-1 rounded-xl overflow-hidden">
                <img 
                  src={archetypeImages.step3} 
                  alt="See change fast"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4" style={{ color: '#D4AF37' }}>
                3
              </h3>
              <div className="max-w-2xl mx-auto">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4" style={{ color: '#D4AF37' }}>
                  What Happens After
                </h4>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4" style={{ color: '#E1E1E1' }}>
                  You're not learning. You're about to act.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6" style={{ color: '#E1E1E1' }}>
                  Once you select your Override, the change begins. These rituals don't sit in your inbox. They activate the moment you engage. Choose your shift and step into your future.
                </p>
                </div>
            </div>
          </div>
        </div>

        {/* Recommended Cards Banner */}
        {showRecommendations && recommendedCards.length > 0 && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 border border-yellow-500/50 rounded-xl mx-2 sm:mx-4 mt-4">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3" style={{ color: '#D4AF37' }}>
                 Based on Your Test Results, We Recommend:
              </h3>
              <p className="text-white/80 mb-3 sm:mb-4 text-sm sm:text-base">
                These upgrades are specifically tailored to your emotional trigger patterns and will help you overcome your biggest challenges.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {recommendedCards.map((card, index) => (
                  <span 
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-yellow-600/20 border border-yellow-500/50 rounded-full text-xs sm:text-sm font-medium"
                    style={{ color: '#D4AF37' }}
                  >
                    {card}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. What's Inside Your Upgrade Section */}
        <div className="mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12" style={{ color: '#D4AF37' }}>
            What's Inside Your Upgrade?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            <div 
              className="text-center p-4 sm:p-6 border rounded-xl transition-all duration-300 hover:scale-105"
              style={getCardStyling('Face-to-Face')}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: '#D4AF37' }}>
                Face-to-Face
                {isRecommendedCard('Face-to-Face') && (
                  <span className="ml-2 text-yellow-400">⭐</span>
                )}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#E1E1E1' }}>
                Upgrade your real-life interactions. Show up as the version of you who commands respect and moves forward.
              </p>
              {isRecommendedCard('Face-to-Face') && (
                <div className="mt-2 sm:mt-3 p-2 bg-yellow-600/20 rounded-lg">
                  <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>
                    🎯 Recommended for you
                  </p>
                </div>
              )}
            </div>

            <div 
              className="text-center p-6 border rounded-xl transition-all duration-300 hover:scale-105"
              style={getCardStyling('Romantic')}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                Romantic
                {isRecommendedCard('Romantic') && (
                  <span className="ml-2 text-yellow-400">⭐</span>
                )}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#E1E1E1' }}>
                Shift relationships. Create new patterns in dating, love, and self-worth.
              </p>
              {isRecommendedCard('Romantic') && (
                <div className="mt-3 p-2 bg-yellow-600/20 rounded-lg">
                  <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>
                    🎯 Recommended for you
                  </p>
                </div>
              )}
            </div>

            <div 
              className="text-center p-6 border rounded-xl transition-all duration-300 hover:scale-105"
              style={getCardStyling('Group/Team')}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                Group/Team
                {isRecommendedCard('Group/Team') && (
                  <span className="ml-2 text-yellow-400">⭐</span>
                )}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#E1E1E1' }}>
                Stop being overlooked. Become the one others notice and follow.
              </p>
              {isRecommendedCard('Group/Team') && (
                <div className="mt-3 p-2 bg-yellow-600/20 rounded-lg">
                  <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>
                    🎯 Recommended for you
                  </p>
                </div>
              )}
            </div>

            <div 
              className="text-center p-6 border rounded-xl transition-all duration-300 hover:scale-105"
              style={getCardStyling('Physical (Nonverbal)')}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                Physical (Nonverbal)
                {isRecommendedCard('Physical (Nonverbal)') && (
                  <span className="ml-2 text-yellow-400">⭐</span>
                )}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#E1E1E1' }}>
                Your presence becomes magnetic. People sense the shift, even if they can't name it.
              </p>
              {isRecommendedCard('Physical (Nonverbal)') && (
                <div className="mt-3 p-2 bg-yellow-600/20 rounded-lg">
                  <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>
                    🎯 Recommended for you
                  </p>
                </div>
              )}
            </div>

            <div 
              className="text-center p-6 border rounded-xl transition-all duration-300 hover:scale-105"
              style={getCardStyling('Digital/Text')}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                Digital/Text
                {isRecommendedCard('Digital/Text') && (
                  <span className="ml-2 text-yellow-400">⭐</span>
                )}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#E1E1E1' }}>
                You write and communicate with clarity, confidence, and boundaries—no more second-guessing.
              </p>
              {isRecommendedCard('Digital/Text') && (
                <div className="mt-3 p-2 bg-yellow-600/20 rounded-lg">
                  <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>
                    🎯 Recommended for you
                  </p>
                </div>
              )}
            </div>

            <div 
              className="text-center p-6 border rounded-xl transition-all duration-300 hover:scale-105"
              style={getCardStyling('Mind Break')}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>
                Mind Break
                {isRecommendedCard('Mind Break') && (
                  <span className="ml-2 text-yellow-400">⭐</span>
                )}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#E1E1E1' }}>
                Stop thought spirals, shame loops, and internal shutdown patterns.
              </p>
              {isRecommendedCard('Mind Break') && (
                <div className="mt-3 p-2 bg-yellow-600/20 rounded-lg">
                  <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>
                    🎯 Recommended for you
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Choose Your Upgrade Section */}
        <div className="mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12" style={{ color: '#D4AF37' }}>
            Choose Your Upgrade
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            
            {/* Compatibility Report */}
            <div className="text-center p-4 sm:p-6 md:p-8 border rounded-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: selectedTier === 'compatibility' ? '#D4AF37' : '#E8ECFA' 
                 }}>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#D4AF37' }}>
                  Compatibility Report
                </h3>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ color: '#D4AF37' }}>
                  $1
                </div>
                <p className="text-center mb-4 sm:mb-6 h-12 sm:h-16 flex items-center justify-center text-sm sm:text-base" style={{ color: '#FFFFFF' }}>
                  Get detailed compatibility insights with friends or partners.
                </p>
              </div>
              <button 
                onClick={() => setSelectedTier('compatibility')}
                className={`w-full py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedTier === 'compatibility' ? 'scale-105' : ''
                }`}
                style={{ 
                  background: selectedTier === 'compatibility' 
                    ? '#D4AF37'
                    : 'rgba(212, 175, 55, 0.2)',
                  color: selectedTier === 'compatibility' ? '#000000' : '#D4AF37',
                  border: '2px solid #E8ECFA'
                }}>
                Select This Option
              </button>
            </div>

            {/* 1 Override Card */}
            <div className="text-center p-8 border rounded-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: selectedTier === 'override1' ? '#D4AF37' : '#E8ECFA' 
                 }}>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                  1 Override Card
                </h3>
                <div className="text-4xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                  $3
                </div>
                <p className="text-center mb-6 h-16 flex items-center justify-center" style={{ color: '#FFFFFF' }}>
                  Unlock one powerful override ritual to break patterns.
                </p>
              </div>
              <button 
                onClick={() => setSelectedTier('override1')}
                className={`w-full py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedTier === 'override1' ? 'scale-105' : ''
                }`}
                style={{ 
                  background: selectedTier === 'override1' 
                    ? '#D4AF37'
                    : 'rgba(212, 175, 55, 0.2)',
                  color: selectedTier === 'override1' ? '#000000' : '#D4AF37',
                  border: '2px solid #E8ECFA'
                }}>
                Select This Option
              </button>
            </div>

            {/* 2-Card Bundle */}
            <div className="text-center p-8 border rounded-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: selectedTier === 'override2' ? '#D4AF37' : '#E8ECFA' 
                 }}>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                  2-Card Bundle
                </h3>
                <div className="text-4xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                  $5
                </div>
                <p className="text-center mb-6 h-16 flex items-center justify-center" style={{ color: '#FFFFFF' }}>
                  Get two override cards for focused transformation.
                </p>
              </div>
              <button 
                onClick={() => setSelectedTier('override2')}
                className={`w-full py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedTier === 'override2' ? 'scale-105' : ''
                }`}
                style={{ 
                  background: selectedTier === 'override2' 
                    ? '#D4AF37'
                    : 'rgba(212, 175, 55, 0.2)',
                  color: selectedTier === 'override2' ? '#000000' : '#D4AF37',
                  border: '2px solid #E8ECFA'
                }}>
                Select This Option
              </button>
            </div>

            {/* 5-Card Full Bundle */}
            <div className="text-center p-8 border rounded-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full"
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
                   borderColor: selectedTier === 'fullBundle' ? '#D4AF37' : '#E8ECFA' 
                 }}>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                  5-Card Full Bundle
                </h3>
                <div className="text-4xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                  $10
                </div>
                <p className="text-center mb-6 h-16 flex items-center justify-center" style={{ color: '#FFFFFF' }}>
                  Complete override toolkit—full transformation, every area covered.
                </p>
              </div>
              <button 
                onClick={() => setSelectedTier('fullBundle')}
                className={`w-full py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedTier === 'fullBundle' ? 'scale-105' : ''
                }`}
                style={{ 
                  background: selectedTier === 'fullBundle' 
                    ? '#D4AF37'
                    : 'rgba(212, 175, 55, 0.2)',
                  color: selectedTier === 'fullBundle' ? '#000000' : '#D4AF37',
                  border: '2px solid #E8ECFA'
                }}>
                Select This Option
              </button>
            </div>
          </div>
        </div>

        {/* 4. Final Call to Action */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#D4AF37' }}>
            Ready to Break Through?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4" style={{ color: '#E1E1E1' }}>
            Choose your Override Volume(s) and start living as the version of yourself others already sense—and you finally claim.
          </p>
          <button
            onClick={() => handlePurchase(selectedTier, getTierPrice(selectedTier))}
            disabled={purchaseStates[selectedTier as keyof typeof purchaseStates] === 'processing'}
            className="px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl md:text-2xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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