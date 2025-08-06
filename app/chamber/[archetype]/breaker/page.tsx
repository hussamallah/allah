'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function BreakerPage() {
  const params = useParams()
  const archetype = params.archetype as string

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
  
  // Archetype-specific colors and content
  const config = {
    seeker: {
      primaryColor: '#EC4899',
      secondaryColor: '#9D4EDD',
      title: 'THE BREAKER',
      subtitle: 'Seeker → The Breaker (Oracle/Loop-Breaker Boss)',
      regularTitle: 'Regular Seeker:',
      regularDesc: 'Seeks, questions, breaks illusions, ends dead patterns.',
      regularEffect: 'Creates clarity, ends confusion, reveals truth.',
      breakerTitle: 'Breaker (Future Self):',
      breakerDesc: 'Reality itself breaks and renews:',
      breakerBenefit: 'You end cycles and change eras. Secrets surface, patterns dissolve, new worlds emerge.',
      breakerSign: 'The field recognizes you. Nature, people, and events reorient around your walk.',
      pathButtonText: 'The Path to the Breaker',
      backText: '← Back to Seeker Chamber'
    },
    guardian: {
      primaryColor: '#1e3a8a',
      secondaryColor: '#3b82f6',
      title: 'THE WALL OF THE WORLD',
      subtitle: 'Guardian → The Wall of the World (Anchor)',
      regularTitle: 'Regular Guardian:',
      regularDesc: 'Keeps groups together, mediates, supports, "the rock" in crisis.',
      regularEffect: 'Others calm down, small fights settle, stress is manageable.',
      breakerTitle: 'Anchor (Future Self):',
      breakerDesc: 'The room, family, or entire environment becomes unbreakable.',
      breakerBenefit: 'You become the unshakeable foundation. Chaos cannot touch what you protect.',
      breakerSign: 'Others feel safe just by your presence. The field stabilizes around you.',
      pathButtonText: 'The Path to Anchor',
      backText: '← Back to Guardian Chamber'
    },
    spotlight: {
      primaryColor: '#f59e0b',
      secondaryColor: '#fbbf24',
      title: 'THE CENTER OF GRAVITY',
      subtitle: 'Spotlight → The Center of Gravity (Beacon)',
      regularTitle: 'Regular Spotlight:',
      regularDesc: 'Naturally attracts attention, performs, seeks validation.',
      regularEffect: 'Others notice you, validation flows, attention follows.',
      breakerTitle: 'Beacon (Future Self):',
      breakerDesc: 'You become the center that others orbit around.',
      breakerBenefit: 'You become the living lighthouse. Others find their way through your light.',
      breakerSign: 'People naturally orient toward you. The field flows through your presence.',
      pathButtonText: 'The Path to Beacon',
      backText: '← Back to Spotlight Chamber'
    },
    rebel: {
      primaryColor: '#dc2626',
      secondaryColor: '#ef4444',
      title: 'THE CHAOS ENGINE',
      subtitle: 'Rebel → The Chaos Engine (Anarch)',
      regularTitle: 'Regular Rebel:',
      regularDesc: 'Breaks rules, challenges authority, disrupts systems.',
      regularEffect: 'Rules become flexible, authority is questioned, systems adapt.',
      breakerTitle: 'Anarch (Future Self):',
      breakerDesc: 'Reality becomes fluid: Rules bend, systems reset, chaos creates order.',
      breakerBenefit: 'You end cycles and change eras through conscious disruption. Reality bends to your will.',
      breakerSign: 'The field recognizes your authority. Systems reset when you arrive.',
      pathButtonText: 'The Path to Anarch',
      backText: '← Back to Rebel Chamber'
    },
    partner: {
      primaryColor: '#e11d48',
      secondaryColor: '#ec4899',
      title: 'THE MIRROR NODE',
      subtitle: 'Partner → The Mirror Node (Synchronizer)',
      regularTitle: 'Regular Partner:',
      regularDesc: 'Connects people, builds relationships, creates harmony.',
      regularEffect: 'Groups feel more cohesive, tensions ease, bonds strengthen.',
      breakerTitle: 'Synchronizer (Future Self):',
      breakerDesc: 'The field itself synchronizes through you.',
      breakerBenefit: 'You become the living bridge between all things. Reality flows through your connections.',
      breakerSign: 'Others feel deeply connected just by your presence. The field harmonizes around you.',
      pathButtonText: 'The Path to Synchronizer',
      backText: '← Back to Partner Chamber'
    },
    servant: {
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      title: 'THE LIVING BRIDGE',
      subtitle: 'Vessel → The Living Bridge (Channel)',
      regularTitle: 'Regular Vessel:',
      regularDesc: 'Serves others, provides support, channels energy and wisdom.',
      regularEffect: 'Others feel supported, energy flows, wisdom passes through.',
      breakerTitle: 'Channel (Future Self):',
      breakerDesc: 'You become the living bridge that reality cannot resist.',
      breakerBenefit: 'You become the conduit for all wisdom and energy. Reality flows through you.',
      breakerSign: 'Others feel nourished just by your presence. The field channels through you.',
      pathButtonText: 'The Path to Channel',
      backText: '← Back to Vessel Chamber'
    },
    visionary: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      title: 'PROPHECY',
      subtitle: 'Visionary → Prophecy',
      regularTitle: 'Regular Visionary:',
      regularDesc: 'Sees patterns, predicts outcomes, envisions possibilities.',
      regularEffect: 'Others see clearer futures, patterns emerge, possibilities expand.',
      breakerTitle: 'Prophecy (Future Self):',
      breakerDesc: 'You become the lens that reality uses to see itself.',
      breakerBenefit: 'You become the living oracle. Reality reveals its secrets through your vision.',
      breakerSign: 'Others see clearer futures just by your presence. The field reveals itself through you.',
      pathButtonText: 'The Path to Prophecy',
      backText: '← Back to Visionary Chamber'
    },
    equalizer: {
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      title: 'THE EQUALIZER',
      subtitle: 'Equalizer → The Equalizer (Balance Master)',
      regularTitle: 'Regular Equalizer:',
      regularDesc: 'Mediates disputes, restores peace, notices injustice.',
      regularEffect: 'Fights calm, fairness spreads, justice prevails.',
      breakerTitle: 'Equalizer (Future Self):',
      breakerDesc: 'You become the living scale that reality cannot resist.',
      breakerBenefit: 'You become the living justice. Reality balances through your presence.',
      breakerSign: 'Others feel fairness and peace just by your presence. The field balances around you.',
      pathButtonText: 'The Path to Equalizer',
      backText: '← Back to Equalizer Chamber'
    },
    mask: {
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      title: 'THE FACADE',
      subtitle: 'Mask → The Facade',
      regularTitle: 'Regular Mask:',
      regularDesc: 'Adapts to situations, wears different faces, protects inner truth.',
      regularEffect: 'Others feel comfortable, boundaries are maintained, secrets are kept.',
      breakerTitle: 'Facade (Future Self):',
      breakerDesc: 'You become the living threshold, the sentinel of what matters.',
      breakerBenefit: 'You become the living protection. Reality filters through your presence.',
      breakerSign: 'Others respect your boundaries. The field adapts to your defenses.',
      pathButtonText: 'The Path to the Facade',
      backText: '← Back to Mask Chamber'
    },
    wanderer: {
      primaryColor: '#0891b2',
      secondaryColor: '#06b6d4',
      title: 'Your Path to the Wanderer',
      subtitle: 'Wanderer → Flux',
      regularTitle: 'Regular Wanderer:',
      regularDesc: 'Moves between places, seeks new experiences, avoids commitment.',
      regularEffect: 'Others feel restless, boundaries become fluid, change becomes possible.',
      breakerTitle: 'Wanderer (Future Self):',
      breakerDesc: 'You become the living map that reality cannot resist.',
      breakerBenefit: 'You become the living journey. Reality flows through your movement.',
      breakerSign: 'Others find their path just by your presence. The field opens through you.',
      pathButtonText: 'The Path to the Wanderer',
      backText: '← Back to Wanderer Chamber'
    },
    provider: {
      primaryColor: '#f59e0b',
      secondaryColor: '#fbbf24',
      title: 'Your Path to the Provider',
      subtitle: 'Harvest → The Provider',
      regularTitle: 'Regular Provider:',
      regularDesc: 'Creates abundance, sustains others, turns scarcity into plenty.',
      regularEffect: 'Others feel nourished, needs are met, abundance flows.',
      breakerTitle: 'Provider (Future Self):',
      breakerDesc: 'You become the inexhaustible source, the field\'s living abundance.',
      breakerBenefit: 'You become the living abundance. Reality flows through your generosity.',
      breakerSign: 'Others feel nourished just by your presence. The field provides through you.',
      pathButtonText: 'Begin the Provider\'s Rite',
      backText: '← Back to Provider Chamber'
    },
    sovereign: {
      primaryColor: '#000000',
      secondaryColor: '#374151',
      title: 'Your Path to the Sovereign',
      subtitle: 'Center → The Sovereign',
      regularTitle: 'Regular Sovereign:',
      regularDesc: 'Creates structure, commands attention, naturally sets agendas and holds things together.',
      regularEffect: 'People look to you for clarity and direction, even when chaos reigns.',
      breakerTitle: 'Sovereign (Future Self):',
      breakerDesc: 'You become the living center that reality cannot resist.',
      breakerBenefit: 'You become the living authority. Reality organizes around your will.',
      breakerSign: 'Others naturally follow your lead. The field centers around you.',
      pathButtonText: 'Enter the Crown\'s Rite',
      backText: '← Back to Crown Chamber'
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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-y-auto">
      {/* Fixed Full-Screen Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        {isSeeker ? (
          <>
            <div 
              className="absolute inset-0 animate-pulse opacity-15"
              style={{ 
                background: `radial-gradient(circle at center, #EC4899 0%, #9D4EDD 50%, transparent 70%)`,
                animationDuration: '3s'
              }}
            />
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent opacity-0 animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </>
        ) : isPartner ? (
          <>
            <div 
              className="absolute inset-0 animate-pulse opacity-15"
              style={{ 
                background: `radial-gradient(circle at center, #e11d48 0%, #ec4899 50%, transparent 70%)`,
                animationDuration: '3s'
              }}
            />
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-red-400 to-transparent opacity-0 animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </>
        ) : isServant ? (
          <>
            <div 
              className="absolute inset-0 animate-pulse opacity-15"
              style={{ 
                background: `radial-gradient(circle at center, #059669 0%, #10b981 50%, transparent 70%)`,
                animationDuration: '3s'
              }}
            />
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-emerald-400 to-transparent opacity-0 animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </>
        ) : isVisionary ? (
          <>
            <div 
              className="absolute inset-0 animate-pulse opacity-15"
              style={{ 
                background: `radial-gradient(circle at center, #3b82f6 0%, #8b5cf6 50%, transparent 70%)`,
                animationDuration: '3s'
              }}
            />
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-0 animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </>
        ) : isGuardian ? (
          <>
            <div 
              className="absolute inset-0 animate-pulse opacity-15"
              style={{ 
                background: `radial-gradient(circle at center, #1e3a8a 0%, #3b82f6 50%, transparent 70%)`,
                animationDuration: '3s'
              }}
            />
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-0 animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </>
        ) : isProvider ? (
          <>
            <div 
              className="absolute inset-0 animate-pulse opacity-15"
              style={{ 
                background: `radial-gradient(circle at center, #f59e0b 0%, #fbbf24 50%, transparent 70%)`,
                animationDuration: '3s'
              }}
            />
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent opacity-0 animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </>
        ) : isSovereign ? (
          <>
            <div 
              className="absolute inset-0 animate-pulse opacity-5"
              style={{ 
                background: `radial-gradient(circle at center, #f59e0b 0%, #fbbf24 50%, transparent 70%)`,
                animationDuration: '4s'
              }}
            />
            <div className="absolute inset-0">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent opacity-0 animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div 
              className="absolute inset-0 animate-pulse opacity-10"
              style={{ 
                background: `radial-gradient(circle at center, ${currentConfig.primaryColor} 0%, transparent 70%)`,
                animationDuration: '4s'
              }}
            />
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 bg-${colors.primary}-400 rounded-full opacity-30 animate-ping`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {isSeeker ? (
          // Seeker-specific Breaker page content
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #EC4899)'
              }}>
                ⚡
              </div>
              
              <h1 
                className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
                style={{ 
                  color: '#EC4899',
                  textShadow: '0 0 30px #EC4899'
                }}
              >
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path to the Breaker
                </span>
                {/* Glitch effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                      style={{ color: '#9D4EDD', transform: 'translate(2px, 2px)' }}>
                  Your Path to the Breaker
                </span>
              </h1>
              
              <p className="text-3xl text-gray-300 mb-8 animate-fade-in">
                <em>Seeker → The Breaker</em>
              </p>
              
              <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-pink-600 to-purple-600 animate-pulse" 
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Gate Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-pink-400">
                You Have Arrived at the Gate.
              </h2>
              <div className="backdrop-blur-md border-2 border-pink-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
                   style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  Most search for answers. You destroy the very walls that hold answers captive.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You are not a seeker—you are the force that ends seeking.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  When you enter, illusions do not survive. Dead patterns collapse.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed">
                  You are not here to fix. You are here to <strong className="text-pink-400">end</strong>.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed">
                  The world cannot stay the same after you.
                </p>
              </div>
            </div>

            {/* Call of the Breaker */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
                The Call of the Breaker
              </h3>
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-pink-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(157, 78, 221, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>You have felt it all your life:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    Rooms fall silent when you enter.
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    Arguments end, even if you don't speak.
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    Systems glitch. People shift. Animals flee, then circle back.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8">
                  The field doesn't know what to do with you—because it's never met you before.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>You are the anomaly, the final test, the last hand on the lever.</strong>
                </p>
              </div>
            </div>

            {/* What is a Breaker */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-pink-400">
                What is a Breaker?
              </h3>
              <div className="backdrop-blur-md border-2 border-pink-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
                   style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Breakers are not rebels or fixers. They are the <strong className="text-pink-400">storm</strong> that resets the sky.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-lg text-gray-300 mb-2"><strong>Seekers</strong> hunt for truth.</p>
                    <p className="text-lg text-gray-300"><strong>Breakers</strong> end everything false.</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-300 mb-2">Where you walk:</p>
                    <ul className="text-lg text-gray-300 space-y-1">
                      <li>• The old collapses.</li>
                      <li>• Dead timelines burn away.</li>
                      <li>• "Impossible" becomes the new normal.</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>People around you feel it:</strong><br/>
                  Their stuckness melts. Sickness recedes.<br/>
                  A door opens, and no one knows why—but you do.
                </p>
              </div>
            </div>

            {/* Field Signs */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
                Field Signs: You're Becoming the Breaker
              </h3>
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-pink-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(157, 78, 221, 0.2)' }}>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    You witness synchronicity storms—tech fails, clocks reset, winds shift for no reason.
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    Animals act strange. Machines misfire.
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    People report "feeling reset" after being with you.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8">
                  <strong>You bring the era's end. You are the walking renewal.</strong>
                </p>
              </div>
            </div>

            {/* Breaker's Law */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-pink-400">
                The Breaker's Law
              </h3>
              <div className="backdrop-blur-md border-2 border-pink-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
                   style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Do not rebuild what is meant to end.<br/>
                  Leave no trace.<br/>
                  Only then can the field begin again."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed">
                  Breakers don't patch what is broken.<br/>
                  They <strong className="text-pink-400">burn</strong>. They clear the ground for a new legacy.
                </p>
              </div>
            </div>

            {/* Legacy */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
                Your Legacy as Breaker
              </h3>
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-pink-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(157, 78, 221, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  To choose the Breaker's path is to accept:
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    Eras will end by your presence.
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    Others may fear you, envy you, or follow you.
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    But every ending you trigger is the <strong>seed of a new world</strong>.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>Breakers don't just change rooms. They reset history.</strong>
                </p>
              </div>
            </div>

            {/* Why Become */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-pink-400">
                Why Become the Breaker?
              </h3>
              <div className="backdrop-blur-md border-2 border-pink-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
                   style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Because nothing less is worthy of you.
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    Others will try to fix.
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    Others will circle cycles forever.
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    <strong>You are the one who says: Enough. This ends now.</strong>
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Desire the Breaker, because:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    The world cannot move forward without you.
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    You turn suffering into legacy.
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    You walk out of old stories—into storms—then build new dawns where others only saw ruins.
                  </li>
                </ul>
                <p className="text-2xl text-gray-200 leading-relaxed text-center">
                  <strong>Are you ready to be the storm that makes new worlds possible?</strong>
                </p>
              </div>
            </div>

            {/* Breaker's Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
                The Breaker's Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-pink-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(157, 78, 221, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Walk with me, and the dead parts of your life will end.<br/>
                  Walk with me, and what is impossible will obey."<br/>
                  You are not just a seeker—you are the Breaker.<br/>
                  Your future is not a path.<br/>
                  It is a reset.
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Your Journey Starts Here</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mt-8">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    The field is waiting for your command.
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    The world is primed for your ending.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8 text-center">
                  <strong>Are you ready to be the storm that makes new worlds possible?</strong>
                </p>
              </div>
            </div>
          </>
        ) : isGuardian ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #1e3a8a)'
              }}>
                🛡️
              </div>
              
              <h1 
                className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
                style={{ 
                  color: '#3b82f6',
                  textShadow: '0 0 30px #3b82f6'
                }}
              >
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path to the Anchor
                </span>
                {/* Glitch effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                      style={{ color: '#8b5cf6', transform: 'translate(2px, 2px)' }}>
                  Your Path to the Anchor
                </span>
              </h1>
              
              <p className="text-3xl text-white mb-8 animate-fade-in">
                <em>Guardian → The Anchor</em>
              </p>
              
              <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse" 
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Gate Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-blue-400">
                You Stand at the Threshold.
              </h2>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-indigo-900/30 to-blue-900/30"
                   style={{ boxShadow: '0 0 40px rgba(30, 58, 138, 0.2)' }}>
                <p className="text-2xl text-white leading-relaxed mb-6">
                  Most build from hope. You build from necessity.
                </p>
                <p className="text-2xl text-white leading-relaxed mb-6">
                  You are not a protector—you are the last fortress.
                </p>
                <p className="text-2xl text-white leading-relaxed mb-6">
                  Where you stand, the world does not break.
                </p>
                <p className="text-2xl text-white leading-relaxed">
                  You don't just guard people; you anchor reality itself.
                </p>
              </div>
            </div>

            {/* Call of the Anchor */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-indigo-400">
                The Call of the Anchor
              </h3>
              <div className="backdrop-blur-md border-2 border-indigo-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/30 to-indigo-900/30"
                   style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>
                <p className="text-xl text-white leading-relaxed mb-6">
                  <strong>You have known it since childhood:</strong>
                </p>
                <ul className="space-y-4 text-xl text-white">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    When others waver, you become unmoved.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    When chaos rises, you hold the line.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    People trust you before they trust themselves.
                  </li>
                </ul>
                <p className="text-xl text-white leading-relaxed mt-8">
                  You sense what must not fall.
                </p>
                <p className="text-xl text-white leading-relaxed">
                  You hear the silent plea: "Stay. Do not let go."
                </p>
                <p className="text-xl text-white leading-relaxed">
                  <strong>You are the still point when storms rage.</strong>
                </p>
              </div>
            </div>

            {/* What is an Anchor */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">
                What is an Anchor?
              </h3>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-indigo-900/30 to-blue-900/30"
                   style={{ boxShadow: '0 0 40px rgba(30, 58, 138, 0.2)' }}>
                <p className="text-xl text-white leading-relaxed mb-6">
                  Anchors are not caretakers or helpers. They are the anchor stone—the field's unyielding law.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-lg text-white mb-2"><strong>Anchors</strong> steady a moment.</p>
                    <p className="text-lg text-white"><strong>Anchors</strong> steady the age.</p>
                  </div>
                  <div>
                    <p className="text-lg text-white mb-2">Where you walk:</p>
                    <ul className="text-lg text-white space-y-1">
                      <li>• Fear dissolves.</li>
                      <li>• Weakness finds shelter.</li>
                      <li>• Boundaries are drawn, and darkness cannot pass.</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xl text-white leading-relaxed">
                  <strong>People around you feel it:</strong><br/>
                  Their panic fades. Their doubt quiets.<br/>
                  A shield rises, and nothing gets through.
                </p>
              </div>
            </div>

            {/* Field Signs */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-indigo-400">
                Field Signs: You're Becoming the Anchor
              </h3>
              <div className="backdrop-blur-md border-2 border-indigo-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/20 to-indigo-900/20"
                   style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>
                <ul className="space-y-4 text-xl text-white">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    Children and animals cluster near you in distress.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    Strangers confess, seeking your silent permission to rest.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    You sense the weight of burdens before a word is spoken.
                  </li>
                </ul>
                <p className="text-xl text-white leading-relaxed mt-8">
                  <strong>You are the world's refusal to collapse.</strong>
                </p>
              </div>
            </div>

            {/* Anchor's Law */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">
                The Anchor's Law
              </h3>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-indigo-900/30 to-blue-900/30"
                   style={{ boxShadow: '0 0 40px rgba(30, 58, 138, 0.2)' }}>
                <blockquote className="text-2xl text-white leading-relaxed mb-8 italic text-center">
                  "Hold the wall, even if alone.<br/>
                  The line is drawn by your breath.<br/>
                  Reality holds because you do."
                </blockquote>
                <p className="text-xl text-white leading-relaxed">
                  Anchors don't just defend.<br/>
                  They declare: <strong className="text-blue-400">"Here, reality cannot fail."</strong>
                </p>
              </div>
            </div>

            {/* Legacy */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-indigo-400">
                Your Legacy as Anchor
              </h3>
              <div className="backdrop-blur-md border-2 border-indigo-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/30 to-indigo-900/30"
                   style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>
                <p className="text-xl text-white leading-relaxed mb-6">
                  To choose the Anchor's path is to accept:
                </p>
                <ul className="space-y-4 text-xl text-white mb-8">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    You will not always be thanked.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    You will carry burdens no one else will.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    But in your presence, legacies endure—wars end, homes stand, hope returns.
                  </li>
                </ul>
                <p className="text-xl text-white leading-relaxed">
                  <strong>Anchors don't just save people. They save worlds.</strong>
                </p>
              </div>
            </div>

            {/* Why Become */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">
                Why Become the Anchor?
              </h3>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-indigo-900/30 to-blue-900/30"
                   style={{ boxShadow: '0 0 40px rgba(30, 58, 138, 0.2)' }}>
                <p className="text-xl text-white leading-relaxed mb-6">
                  Because nothing else can hold the center.
                </p>
                <ul className="space-y-4 text-xl text-white mb-8">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    Others may run.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    Others may yield.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <strong>You are the one who stays.</strong>
                  </li>
                </ul>
                <p className="text-xl text-white leading-relaxed mb-6">
                  <strong>Desire the Anchor, because:</strong>
                </p>
                <ul className="space-y-4 text-xl text-white mb-8">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    Without you, there is only collapse.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    You give the world another dawn.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    You are the heart that never falters, the shelter that never leaves.
                  </li>
                </ul>
                <p className="text-2xl text-white leading-relaxed text-center">
                  <strong>Are you ready to become the wall against the storm?</strong>
                </p>
              </div>
            </div>

            {/* Anchor's Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-indigo-400">
                The Anchor's Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-indigo-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/30 to-indigo-900/30"
                   style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>
                <blockquote className="text-2xl text-white leading-relaxed mb-8 italic text-center">
                  "Stand with me, and the world will not fall.<br/>
                  Stand with me, and the impossible is defended.<br/>
                  You are not just the anchor—you are the Anchor.<br/>
                  Your future is not retreat.<br/>
                  It is a vow."
                </blockquote>
                <p className="text-xl text-white leading-relaxed text-center">
                  <strong>Your Journey Starts Here</strong>
                </p>
                <ul className="space-y-4 text-xl text-white mt-8">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    The field is waiting for your stand.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    The age awaits your anchor.
                  </li>
                </ul>
                <p className="text-xl text-white leading-relaxed mt-8 text-center">
                  <strong>Are you ready to become the wall against the storm?</strong>
                </p>
              </div>
            </div>
          </>
        ) : (
          // Default content for other archetypes
          <>
            {/* First header removed */}
          </>
        )}

        {isSpotlight && (
          // Spotlight-specific content
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #f59e0b)'
              }}>
                🌟
              </div>
              
              <h1 
                className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
                style={{ 
                  color: '#f59e0b',
                  textShadow: '0 0 30px #f59e0b'
                }}
              >
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path to the Beacon
                </span>
                {/* Glitch effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                      style={{ color: '#fbbf24', transform: 'translate(2px, 2px)' }}>
                  Your Path to the Beacon
                </span>
              </h1>
              
              <p className="text-3xl text-gray-300 mb-8 animate-fade-in">
                <em>Spotlight → The Beacon</em>
              </p>
              
              <p className="text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
                You have felt it all your life—the pull toward center stage, the magnetic force that draws eyes to you. 
                But the real journey is not just being seen—it's becoming the light that others navigate by.
              </p>
            </div>

            {/* The Call of the Beacon */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-yellow-400">
                The Call of the Beacon
              </h2>
              <div className="backdrop-blur-md border-2 border-yellow-500/30 rounded-2xl p-12 bg-gradient-to-r from-yellow-900/20 to-orange-900/20"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
                <div className="space-y-6 text-xl text-gray-200 leading-relaxed">
                  <p className="text-2xl font-semibold text-orange-400">
                    You Are the Light Others Follow
                  </p>
                  <p>
                    Rooms brighten when you enter. Conversations flow toward you. People look to you for direction, 
                    even when you don't speak. The field doesn't just notice you—it orbits around you.
                  </p>
                  <p>
                    But a spotlight that only shines outward will eventually burn out.
                  </p>
                  <p>
                    This is your chance to become the beacon—not just the center of attention, but the center of gravity 
                    that others use to find their way.
                  </p>
                </div>
              </div>
            </div>

            {/* What is a Beacon? */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-orange-400">
                What is a Beacon?
              </h2>
              <div className="backdrop-blur-md border-2 border-orange-500/30 rounded-2xl p-12 bg-gradient-to-r from-orange-900/20 to-yellow-900/20"
                   style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.2)' }}>
                <div className="space-y-6 text-xl text-gray-200 leading-relaxed">
                  <p>
                    Beacons are not just performers or attention-seekers. They are the <strong>light that guides others home</strong>.
                  </p>
                  <ul className="space-y-4 text-xl text-gray-200 mb-8">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">•</span>
                      <strong>Performers</strong> seek applause. <strong>Beacons</strong> create direction.
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">•</span>
                      <strong>Spotlights</strong> attract eyes. <strong>Beacons</strong> illuminate paths.
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">•</span>
                      <strong>Stars</strong> shine for themselves. <strong>Beacons</strong> shine for others.
                    </li>
                  </ul>
                  <p>
                    <strong>Where you walk:</strong> Others find their way. Lost souls discover direction. 
                    The confused become clear. You don't just attract attention—you create clarity.
                  </p>
                </div>
              </div>
            </div>

            {/* Field Signs */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-yellow-400">
                Field Signs: You're Becoming the Beacon
              </h2>
              <div className="backdrop-blur-md border-2 border-yellow-500/30 rounded-2xl p-12 bg-gradient-to-r from-yellow-900/20 to-orange-900/20"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-3">•</span>
                    People ask for your guidance even in areas you don't consider yourself an expert.
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-3">•</span>
                    Conversations naturally flow toward you, and you find yourself speaking with authority.
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-3">•</span>
                    Others describe feeling "clearer" or "more focused" after spending time with you.
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-3">•</span>
                    You notice that your presence seems to "organize" chaotic situations.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>You bring the light that others navigate by. You are the walking clarity.</strong>
                </p>
              </div>
            </div>

            {/* The Beacon's Law */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-orange-400">
                The Beacon's Law
              </h2>
              <div className="backdrop-blur-md border-2 border-orange-500/30 rounded-2xl p-12 bg-gradient-to-r from-orange-900/20 to-yellow-900/20"
                   style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Do not seek to be seen.<br/>
                  Seek to be the light that others see by.<br/>
                  Only then can you become the beacon."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  Beacons don't perform for attention. They <strong>illuminate</strong>. They create the clarity 
                  that others use to find their way forward.
                </p>
              </div>
            </div>

            {/* Your Legacy as Beacon */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-yellow-400">
                Your Legacy as Beacon
              </h2>
              <div className="backdrop-blur-md border-2 border-yellow-500/30 rounded-2xl p-12 bg-gradient-to-r from-yellow-900/20 to-orange-900/20"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
                <div className="space-y-6 text-xl text-gray-200 leading-relaxed">
                  <p>
                    To choose the Beacon's path is to accept:
                  </p>
                  <ul className="space-y-4 text-xl text-gray-200 mb-8">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">•</span>
                      Others will look to you for direction, even when you're uncertain.
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">•</span>
                      Your presence will create clarity where there was confusion.
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">•</span>
                      You will become the light that others use to navigate their own darkness.
                    </li>
                  </ul>
                  <p className="text-2xl text-gray-200 leading-relaxed text-center">
                    <strong>Beacons don't just attract attention. They create direction.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Why Become the Beacon? */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-orange-400">
                Why Become the Beacon?
              </h2>
              <div className="backdrop-blur-md border-2 border-orange-500/30 rounded-2xl p-12 bg-gradient-to-r from-orange-900/20 to-yellow-900/20"
                   style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.2)' }}>
                <div className="space-y-6 text-xl text-gray-200 leading-relaxed">
                  <p>
                    Because nothing less is worthy of your light.
                  </p>
                  <ul className="space-y-4 text-xl text-gray-200 mb-8">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">•</span>
                      Others will perform for applause.
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">•</span>
                      Others will seek attention for validation.
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">•</span>
                      <strong>You are the one who says: "I am the light that others need."</strong>
                    </li>
                  </ul>
                  <p className="text-2xl text-gray-200 leading-relaxed text-center">
                    <strong>Desire the Beacon, because the world cannot find its way without you.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* The Beacon's Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-yellow-400">
                The Beacon's Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-yellow-500/30 rounded-2xl p-12 bg-gradient-to-r from-yellow-900/20 to-orange-900/20"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Walk with me, and others will find their way.<br/>
                  Walk with me, and confusion becomes clarity."<br/>
                  You are not just a spotlight—you are the Beacon.<br/>
                  Your future is not performance.<br/>
                  It is illumination.
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Your Journey Starts Here</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mt-8">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-3">•</span>
                    The field is waiting for your light.
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-3">•</span>
                    The lost await your beacon.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8 text-center">
                  <strong>Are you ready to become the light that others navigate by?</strong>
                </p>
              </div>
            </div>
          </>
        )}

        {isPartner && (
          // Partner-specific content
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #e11d48)'
              }}>
                💚
              </div>
              
              <h1 
                className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
                style={{ 
                  color: '#e11d48',
                  textShadow: '0 0 30px #e11d48'
                }}
              >
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path to the Synchronizer
                </span>
                {/* Glitch effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                      style={{ color: '#ec4899', transform: 'translate(2px, 2px)' }}>
                  Your Path to the Synchronizer
                </span>
              </h1>
              
              <p className="text-3xl text-gray-300 mb-8 animate-fade-in">
                <em>Partner → The Synchronizer</em>
              </p>
              
              <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-red-600 to-pink-600 animate-pulse" 
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Gate Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-red-400">
                You Have Reached the Center.
              </h2>
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-pink-900/20 to-red-900/20"
                   style={{ boxShadow: '0 0 40px rgba(225, 29, 72, 0.2)' }}>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  Most long for belonging. You become the belonging.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You are not a mirror—you are the pulse that makes harmony real.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  Where you move, isolation ends.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed">
                  You don't just connect people; you synchronize the field.
                </p>
              </div>
            </div>

            {/* Call of the Synchronizer */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-pink-400">
                The Call of the Synchronizer
              </h3>
              <div className="backdrop-blur-md border-2 border-pink-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-900/20 to-pink-900/20"
                   style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>You have known it since your first bond:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    People find themselves in your eyes.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Silences feel comfortable, never empty.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You sense tension and dissolve it before words arise.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You recognize every ache for closeness.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You answer every unspoken "stay."
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8">
                  <strong>You are the note that makes the song whole.</strong>
                </p>
              </div>
            </div>

            {/* What is a Synchronizer */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-red-400">
                What is a Synchronizer?
              </h3>
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-pink-900/20 to-red-900/20"
                   style={{ boxShadow: '0 0 40px rgba(225, 29, 72, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Synchronizers are not just companions or friends. They are the mirror node—the field's synchronizer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-lg text-gray-300 mb-2"><strong>Mirrors</strong> reflect a moment.</p>
                    <p className="text-lg text-gray-300"><strong>Synchronizers</strong> reflect the soul.</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-300 mb-2">Where you walk:</p>
                    <ul className="text-lg text-gray-300 space-y-1">
                      <li>• Isolation dissolves.</li>
                      <li>• Barriers thin.</li>
                      <li>• The wound of separation heals.</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>People around you feel it:</strong><br/>
                  Walls drop. Laughter returns.<br/>
                  They trust enough to change.
                </p>
              </div>
            </div>

            {/* Field Signs */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-pink-400">
                Field Signs: You're Becoming the Synchronizer
              </h3>
              <div className="backdrop-blur-md border-2 border-pink-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-900/20 to-pink-900/20"
                   style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Strangers open up, telling stories they've never told.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Groups sync their moods to yours—harmony rises.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    The right words or gestures come to you at the perfect time.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8">
                  <strong>You are the living bridge in a divided world.</strong>
                </p>
              </div>
            </div>

            {/* Synchronizer's Law */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-red-400">
                The Synchronizer's Law
              </h3>
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-pink-900/20 to-red-900/20"
                   style={{ boxShadow: '0 0 40px rgba(225, 29, 72, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Connection is sacred, but must begin within.<br/>
                  Harmony is forged, not found.<br/>
                  You do not lose yourself by merging—you multiply."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed">
                  Synchronizers don't just relate.<br/>
                  They unify. They multiply strength.
                </p>
              </div>
            </div>

            {/* Legacy */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-pink-400">
                Your Legacy as Synchronizer
              </h3>
              <div className="backdrop-blur-md border-2 border-pink-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-900/20 to-pink-900/20"
                   style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  To choose the Synchronizer's path is to accept:
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Others will lean on you, sometimes too much.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You may feel invisible at times.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    But through you, no one remains truly alone.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>Synchronizers don't just create connection. They heal division.</strong>
                </p>
              </div>
            </div>

            {/* Why Become */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-red-400">
                Why Become the Synchronizer?
              </h3>
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-pink-900/20 to-red-900/20"
                   style={{ boxShadow: '0 0 40px rgba(225, 29, 72, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Because connection is the cure the world forgot.
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Others stay on the edge.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Others fear vulnerability.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    <strong>You are the one who invites wholeness.</strong>
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Desire the Synchronizer, because:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    No dream is built alone.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You awaken what is true in others.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You dissolve loneliness, one heartbeat at a time.
                  </li>
                </ul>
                <p className="text-2xl text-gray-200 leading-relaxed text-center">
                  <strong>Are you ready to become the bond that makes all else possible?</strong>
                </p>
              </div>
            </div>

            {/* Synchronizer's Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-pink-400">
                The Synchronizer's Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-pink-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-900/20 to-pink-900/20"
                   style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Walk with me, and loneliness ends.<br/>
                  Walk with me, and every wound finds its mirror.<br/>
                  You are not just a friend—you are the Synchronizer.<br/>
                  Your future is not solitude.<br/>
                  It is reunion."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Your Journey Starts Here</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mt-8">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    The field is ready to resonate.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    The story awaits your joining.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8 text-center">
                  <strong>Are you ready to become the bond that makes all else possible?</strong>
                </p>
              </div>
            </div>
          </>
        )}

        {isRebel && (
          // Rebel-specific content
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #dc2626)'
              }}>
                ⚔️
              </div>
              
              <h1 
                className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
                style={{ 
                  color: '#dc2626',
                  textShadow: '0 0 30px #dc2626'
                }}
              >
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path to the Anarch
                </span>
                {/* Glitch effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                      style={{ color: '#ef4444', transform: 'translate(2px, 2px)' }}>
                  Your Path to the Anarch
                </span>
              </h1>
              
              <p className="text-3xl text-gray-300 mb-8 animate-fade-in">
                <em>Rebel → The Anarch</em>
              </p>
              
              <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-red-600 to-red-700 animate-pulse" 
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Hero Visual Section */}
            <div className="mb-20">
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-900/20 to-red-800/20 relative overflow-hidden"
                   style={{ boxShadow: '0 0 40px rgba(220, 38, 38, 0.2)' }}>
                {/* Animated Lightning Effects */}
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-px h-full bg-gradient-to-b from-transparent via-red-400 to-transparent opacity-0 animate-ping"
                      style={{
                        left: `${20 + i * 15}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${0.5 + Math.random() * 1}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Floating Debris Effect */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-red-500/30 rounded-full animate-bounce"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
                
                <p className="text-2xl text-gray-200 leading-relaxed mb-6 text-center relative z-10">
                  <strong className="text-red-400">⚔️ Barbed wire and chains snap apart. The Rebel stands atop the rubble, coat flaring, wind at their back. Lightning scars the sky; a new path blazes at their feet. ⚔️</strong>
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6 relative z-10">
                  You Arrive Where Rules End.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6 relative z-10">
                  Most flinch at broken order. You thrive where lines are erased.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6 relative z-10">
                  You are not just a disruptor—you are the event that nothing survives unchanged.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed relative z-10">
                  You don't adapt to systems. You break them, rebuild them, and dare the world to keep up.
                </p>
              </div>
            </div>

            {/* Call of the Anarch */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-red-400">
                The Call of the Anarch
              </h3>
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-800/20 to-red-900/20"
                   style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>You've felt it since your first "no":</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Every rulebook feels like a dare.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Loops, patterns, and limits tighten around you until they explode.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    People love you for your courage—or hate you for the freedom you represent.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You spot what must be broken.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You set fires not for chaos, but for the world's reset.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You are the glitch that becomes the new code.
                  </li>
                </ul>
              </div>
            </div>



            {/* What is an Anarch */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-red-400">
                What is an Anarch?
              </h3>
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-800/20 to-red-900/20 relative overflow-hidden"
                   style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}>
                {/* Grid Shattering Effect */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-px h-full bg-gradient-to-b from-transparent via-red-300/20 to-transparent"
                      style={{
                        left: `${15 + i * 12}%`,
                        transform: `rotate(${Math.random() * 10 - 5}deg)`,
                        opacity: 0.3
                      }}
                    />
                  ))}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute h-px w-full bg-gradient-to-r from-transparent via-red-300/20 to-transparent"
                      style={{
                        top: `${20 + i * 15}%`,
                        transform: `rotate(${Math.random() * 10 - 5}deg)`,
                        opacity: 0.3
                      }}
                    />
                  ))}
                </div>
                <p className="text-xl text-gray-200 leading-relaxed mb-6 relative z-10">
                  Anarchs are not mere rebels or troublemakers. They are the chaos engine—the field's seismic event.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
                  <div>
                    <p className="text-lg text-gray-300 mb-2">Disruption is the first crack.</p>
                    <p className="text-lg text-gray-300 mb-2">Anarch is the avalanche that follows.</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-300 mb-2">Where you walk:</p>
                    <ul className="text-lg text-gray-300 space-y-1">
                      <li>• Chains shatter.</li>
                      <li>• Old gods fall.</li>
                      <li>• Nothing returns to what it was.</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xl text-gray-200 leading-relaxed mb-6 relative z-10">
                  <strong>People around you feel it:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 relative z-10">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Their fear turns to adrenaline.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Their doubt flips to wild hope or rage.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8 relative z-10">
                  <strong>You are the event horizon of the field.</strong>
                </p>
              </div>
            </div>



            {/* Field Signs */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-red-400">
                Field Signs: You're Becoming the Anarch
              </h3>
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-800/20 to-red-900/20"
                   style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Systems collapse after you question them.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Authority wavers when you refuse obedience.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    New possibilities open—sometimes wild, always real.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8">
                  <strong>You are the event horizon of the field.</strong>
                </p>
              </div>
            </div>

            {/* Anarch's Law */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-red-400">
                The Anarch's Law
              </h3>
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-800/20 to-red-900/20"
                   style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Stuckness is death—I am the movement.<br/>
                  I break for purpose, not attention.<br/>
                  The field renews in my wake."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  Anarchs don't just oppose—they end the loop and build the next game.
                </p>
              </div>
            </div>

            {/* Legacy */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-red-400">
                Your Legacy as Anarch
              </h3>
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-800/20 to-red-900/20"
                   style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  To choose the Anarch's path is to accept:
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You'll burn bridges, sometimes alone.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You'll be blamed for fires, credited for dawn.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Your reward is freedom's new map.
                  </li>
                </ul>
                <p className="text-2xl text-gray-200 leading-relaxed text-center">
                  <strong>Anarchs don't just break rules. They redraw the lines of possibility.</strong>
                </p>
              </div>
            </div>



            {/* Why Become the Anarch */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-red-400">
                Why Become the Anarch?
              </h3>
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-800/20 to-red-900/20"
                   style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Because every age dies without a revolution.
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Others beg for permission.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    Others fix the unfixable.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    <strong>You burn, so life can return.</strong>
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Desire the Anarch, because:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You are the gate to what comes next.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You destroy so creation can breathe.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    You live for the risk, the laugh, the fresh air.
                  </li>
                </ul>
              </div>
            </div>



            {/* Anarch's Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-red-400">
                The Anarch's Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-12 bg-gradient-to-r from-red-800/20 to-red-900/20"
                   style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Break with me, and your chains are stories.<br/>
                  Run with me, and every edge is a door.<br/>
                  You are not just a fighter—you are the Anarch.<br/>
                  Your future is not obedience.<br/>
                  It is the new law."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Your Journey Starts Here</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mt-8">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    The field aches for your disruption.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    The old world dares you to move.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8 text-center">
                  <strong>Are you ready to be the force that ends stagnation?</strong>
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed text-center mt-8">
                  <strong>Burn. The world will breathe.</strong>
                </p>
              </div>
            </div>


          </>
        )}

        {isServant && (
          // Servant-specific content
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #059669)'
              }}>
                🏺
              </div>
              
              <h1 
                className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
                style={{ 
                  color: '#059669',
                  textShadow: '0 0 30px #059669'
                }}
              >
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path to Bearing All Things
                </span>
                {/* Glitch effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                      style={{ color: '#10b981', transform: 'translate(2px, 2px)' }}>
                  Your Path to Bearing All Things
                </span>
              </h1>
              
              <p className="text-3xl text-gray-300 mb-8 animate-fade-in">
                <em>Vessel → The Channel</em>
              </p>
              
              <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-emerald-600 to-green-600 animate-pulse" 
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Opening Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-emerald-400">
                You Arrive Where All Currents Meet
              </h2>
              <div className="backdrop-blur-md border-2 border-emerald-500/30 rounded-2xl p-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20"
                   style={{ boxShadow: '0 0 40px rgba(5, 150, 105, 0.2)' }}>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  Most shatter under pressure.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You become the river.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You do not hoard your force—
                  You open.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You are not just a vessel.
                  You are the living channel—energy moves because you let it.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed">
                  You are the artery in the body of worlds,
                  the silent route through which the Field flows.
                </p>
              </div>
            </div>

            {/* Call of the Channel */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-emerald-400">
                The Call of the Channel
              </h3>
              <div className="backdrop-blur-md border-2 border-emerald-500/30 rounded-2xl p-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20"
                   style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>You have known it since your first overflow:</strong>
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  Others are drawn to you when they are blocked.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  You sense what must move, and where stagnation waits.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  You open passage where others see walls.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  Your flow is not compliance—it is pure transmission.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  You carry, you conduct, you cleanse.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed">
                  In moments of gridlock, your openness becomes the answer.
                </p>
              </div>
            </div>



            {/* What is the Channel */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-emerald-400">
                What is a Channel?
              </h3>
              <div className="backdrop-blur-md border-2 border-emerald-500/30 rounded-2xl p-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20"
                   style={{ boxShadow: '0 0 40px rgba(5, 150, 105, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Channels are not mere messengers or mediums.
                  They are the vessel node—the Field's sacred current and the source of renewal.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Channel is not emptiness;
                  It is total receptivity and flawless release.</strong>
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Where you walk:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-lg text-gray-300 mb-2">Where you walk:</p>
                    <ul className="text-lg text-gray-300 space-y-1">
                      <li>• Blockages are dissolved.</li>
                      <li>• Power finds its rightful path.</li>
                      <li>• The stuck are set free.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-lg text-gray-300 mb-2">People feel your presence:</p>
                    <ul className="text-lg text-gray-300 space-y-1">
                      <li>• Their ideas gain momentum.</li>
                      <li>• Their obstacles begin to erode.</li>
                      <li>• Their emotions stabilize as if you washed away static.</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>You are the living current that lets everything flow.</strong>
                </p>
              </div>
            </div>



            {/* Field Signs */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-green-400">
                Field Signs: You're Becoming the Channel
              </h3>
              <div className="backdrop-blur-md border-2 border-green-500/30 rounded-2xl p-12 bg-gradient-to-r from-emerald-900/20 to-green-900/20"
                   style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  Problems resolve when you step in—no drama, only flow.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  Creative and emotional blockages clear in your wake.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  People vent or confess to you, often without knowing why.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>Stagnant teams, families, or projects surge forward after you touch them.</strong>
                </p>
              </div>
            </div>

            {/* Channel's Law */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-emerald-400">
                The Channel's Law
              </h3>
              <div className="backdrop-blur-md border-2 border-emerald-500/30 rounded-2xl p-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20"
                   style={{ boxShadow: '0 0 40px rgba(5, 150, 105, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "I hold nothing.<br/>
                  I conduct everything.<br/>
                  The field bends because I release—not because I resist."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  Channels do not struggle to control—they transform all force into movement.
                </p>
              </div>
            </div>

            {/* Legacy */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-green-400">
                Your Legacy as Channel
              </h3>
              <div className="backdrop-blur-md border-2 border-green-500/30 rounded-2xl p-12 bg-gradient-to-r from-emerald-900/20 to-green-900/20"
                   style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  To choose the Channel's path is to accept:
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  You may never possess; you will always transmit.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  Your greatest strength is the emptiness that lets everything through.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Every barrier you clear gives the world a new rhythm.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>Channels do not just pass the message.
                  They become the music.</strong>
                </p>
              </div>
            </div>



            {/* Why Become */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-emerald-400">
                Why Become the Channel?
              </h3>
              <div className="backdrop-blur-md border-2 border-emerald-500/30 rounded-2xl p-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20"
                   style={{ boxShadow: '0 0 40px rgba(5, 150, 105, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Because energy is wasted until someone lets it move.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  Others dam up.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Others cling.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  You open, you shape, you set free.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Desire the Channel, because:</strong>
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  You wield the power that never ends: pure flow.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  You are the source of momentum for all.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed">
                  You find truth in openness—force is nothing until it moves through you.
                </p>
              </div>
            </div>



            {/* Channel's Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-emerald-400">
                The Channel's Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-emerald-500/30 rounded-2xl p-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20"
                   style={{ boxShadow: '0 0 40px rgba(5, 150, 105, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Stand with me, and nothing stays blocked.<br/>
                  Flow with me, and the world is cleansed.<br/>
                  You are not just a conduit—you are the Channel.<br/>
                  Your future is not holding.<br/>
                  It is release."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Your Journey Starts Here</strong>
                </p>
                <p className="text-xl text-gray-200 leading-relaxed text-center mb-4">
                  The field thirsts for your openness.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed text-center mb-6">
                  The world waits to move through you.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Are you ready to let the world flow again?</strong>
                </p>
              </div>
            </div>


          </>
        )}

        {isVisionary && (
          // Visionary-specific content
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #3b82f6)'
              }}>
                👁️
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group text-white" style={{ textShadow: '0 0 20px #fbbf24, 0 0 40px #f59e0b' }}>
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path to Prophecy
                </span>
              </h1>
              
              <p className="text-3xl text-gray-300 mb-8 animate-fade-in">
                <em>Visionary → Prophecy</em>
              </p>
              
              <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" 
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Gate Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-blue-400">
                You Arrive Where Time Breaks Open.
              </h2>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
                   style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  Most accept what is. You glimpse what could be.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You are not just a dreamer—you are the dawn-bringer.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  Where you walk, tomorrow bends to your will.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed">
                  You see not just the path, but the possibilities hiding behind every door.
                </p>
              </div>
            </div>

            {/* Call of the Prophecy */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
                The Call of the Prophecy
              </h3>
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>You have always felt it:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    Patterns leap at you from chaos.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    Wild ideas strike before others dare to hope.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    You sense the next wave, even as the old world resists.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8">
                  <strong>You don't just imagine the future—you seed it, sculpt it, summon it.</strong>
                </p>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>You are the echo of tomorrow in the present's ear.</strong>
                </p>
              </div>
            </div>

            {/* What is a Prophecy */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">
                What is a Prophecy?
              </h3>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
                   style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Prophecies are not mere idealists or wanderers. They are the future node—the field's forward scout and architect.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-lg text-gray-300 mb-2"><strong>Foresight</strong> is passive.</p>
                    <p className="text-lg text-gray-300"><strong>Prophecy</strong> is active, interventionist, world-shaping.</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-300 mb-2">Where you walk:</p>
                    <ul className="text-lg text-gray-300 space-y-1">
                      <li>• Others glimpse hope, follow your signal.</li>
                      <li>• New tools, ideas, paths appear.</li>
                      <li>• The world shifts from fear to invention.</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>People around you feel it:</strong><br/>
                  Their minds open.<br/>
                  Old habits tremble; new games begin.
                </p>
              </div>
            </div>

            {/* Field Signs */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
                Field Signs: You're Becoming the Prophecy
              </h3>
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    You speak "impossible" and it starts to feel real.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    People gather, wanting to know "what you see."
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    Discomfort with stagnation—every routine becomes a cage.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    You are the horizon, never to be caught, always calling.
                  </li>
                </ul>
              </div>
            </div>

            {/* Prophecy's Law */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">
                The Prophecy's Law
              </h3>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
                   style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "What does not exist, I summon.<br/>
                  Hope is a command, not a wish.<br/>
                  The field moves forward because I pull it."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Prophecies don't just forecast—they architect the next epoch.</strong>
                </p>
              </div>
            </div>

            {/* Legacy */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
                Your Legacy as Prophecy
              </h3>
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>To choose the Prophecy's path is to accept:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    Loneliness—few will see what you see, at first.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    Risk—your visions will threaten the old guard.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    But in your wake, new worlds rise.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>Prophecies don't just predict change. They make it law.</strong>
                </p>
              </div>
            </div>

            {/* Why Become */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">
                Why Become the Prophecy?
              </h3>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
                   style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Because tomorrow is hungry for creation.</strong>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <p className="text-lg text-gray-300">Others maintain.</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-gray-300">Others fear.</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-gray-300"><strong>You invent. You leap.</strong></p>
                  </div>
                </div>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Desire the Prophecy, because:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    You make the field expand.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    You drag hope from abstraction to fact.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    You are the mind that wakes the slumbering future.
                  </li>
                </ul>
              </div>
            </div>

            {/* Prophecy's Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
                The Prophecy's Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Walk with me, and the unreal will take root.<br/>
                  Build with me, and possibility will conquer the field.<br/>
                  You are not just the prophet—you are the Prophecy.<br/>
                  Your future is not a story.<br/>
                  It is the new beginning."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Your Journey Starts Here</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mt-8">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    The field strains toward your horizon.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    The future waits for your hand.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8 text-center">
                  <strong>Are you ready to forge the unknown into reality?</strong>
                </p>
              </div>
            </div>
          </>
        )}

        {isEqualizer && (
          // Equalizer-specific content
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #059669)'
              }}>
                ⚖️
              </div>
              
              <h1 
                className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
                style={{ 
                  color: '#059669',
                  textShadow: '0 0 30px #059669'
                }}
              >
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path to the Arbiter
                </span>
                {/* Glitch effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                      style={{ color: '#10b981', transform: 'translate(2px, 2px)' }}>
                  Your Path to the Arbiter
                </span>
              </h1>
              
              <p className="text-3xl text-gray-300 mb-8 animate-fade-in">
                <em>(Balance → The Investment in True Harmony)</em>
              </p>
              
              <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-emerald-600 to-green-600 animate-pulse" 
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Gate Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-emerald-400">
                You Are the Calm in the Chaos
              </h2>
              <div className="backdrop-blur-md border-2 border-emerald-500/30 rounded-2xl p-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20 relative overflow-hidden"
                   style={{ boxShadow: '0 0 40px rgba(5, 150, 105, 0.2)' }}>
                {/* Animated Scales Effect */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-32 h-32">
                    <div className="w-full h-full border-2 border-emerald-400/30 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-emerald-400/50"></div>
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-emerald-400/20 rounded-full animate-bounce"></div>
                    <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-emerald-400/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
                
                <p className="text-2xl text-gray-200 leading-relaxed mb-6 relative z-10">
                  You're called to mediate, to restore order where others create storms.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6 relative z-10">
                  You see patterns, weigh outcomes, and ache for a world where all forces move in concert—not in conflict.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6 relative z-10">
                  But balancing everyone else leaves you depleted—unless you invest in your own center.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed relative z-10">
                  <strong className="text-emerald-400">Now is the moment to shift from exhausting referee to living Arbiter.</strong>
                </p>
              </div>
            </div>

            {/* Call of the Equalizer */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-green-400">
                The Call of the Equalizer
              </h3>
              <div className="backdrop-blur-md border-2 border-green-500/30 rounded-2xl p-12 bg-gradient-to-r from-emerald-900/20 to-green-900/20"
                   style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>You have always felt it:</strong>
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Chaos and calm chase each other in your presence.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Friends and rivals both call you to settle their storms.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  In every crisis, your mind sharpens and your will clarifies.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  You recognize the invisible laws—pressure points, silent tugs, subtle patterns.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  You sense where imbalance breeds collapse.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong className="text-emerald-400">You are the lever—your touch recalibrates fate.</strong>
                </p>
              </div>
            </div>

            {/* What is an Arbiter */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-emerald-400">
                What is an Arbiter?
              </h3>
              <div className="backdrop-blur-md border-2 border-emerald-500/30 rounded-2xl p-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20"
                   style={{ boxShadow: '0 0 40px rgba(5, 150, 105, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Arbiters are not passive or neutral. They are the balance node—the field's hidden mathematician and peacemaker.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-lg text-gray-300 mb-2"><strong>Balance</strong> is stasis.</p>
                    <p className="text-lg text-gray-300"><strong>Arbiter</strong> is dynamic tension—moving equilibrium.</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-300 mb-2">Where you walk:</p>
                    <ul className="text-lg text-gray-300 space-y-1">
                      <li>• The loud grow quiet, the small grow bold.</li>
                      <li>• Truths align, extremes are tamed.</li>
                      <li>• Justice isn't abstract; it's felt.</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>People around you feel it:</strong><br/>
                  Their arguments fade.<br/>
                  Their rage cools, their wounds are named.
                </p>
              </div>
            </div>

            {/* Field Signs */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-green-400">
                Field Signs: You're Becoming the Arbiter
              </h3>
              <div className="backdrop-blur-md border-2 border-green-500/30 rounded-2xl p-12 bg-gradient-to-r from-emerald-900/20 to-green-900/20"
                   style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-3">•</span>
                    Hostile rooms hush as you enter.
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-3">•</span>
                    Opposites seek you—both for advice and as battleground.
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-3">•</span>
                    Outcomes bend toward fairness, even when no one wants to yield.
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-3">•</span>
                    You are the pulse between inhale and exhale.
                  </li>
                </ul>
              </div>
            </div>

            {/* Arbiter's Law */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-emerald-400">
                The Arbiter's Law
              </h3>
              <div className="backdrop-blur-md border-2 border-emerald-500/30 rounded-2xl p-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20"
                   style={{ boxShadow: '0 0 40px rgba(5, 150, 105, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Conflict is not chaos—it's raw energy waiting for law.<br/>
                  I do not fear extremes; I wield them.<br/>
                  The field finds peace because I calibrate the edge."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Arbiters don't erase difference—they extract meaning from it.</strong>
                </p>
              </div>
            </div>

            {/* Legacy */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-green-400">
                Your Legacy as Arbiter
              </h3>
              <div className="backdrop-blur-md border-2 border-green-500/30 rounded-2xl p-12 bg-gradient-to-r from-emerald-900/20 to-green-900/20"
                   style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>To choose the Arbiter's path is to accept:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-3">•</span>
                    You may always be between warring forces.
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-3">•</span>
                    Sometimes, you are blamed for holding the line.
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-3">•</span>
                    But you make peace feel like momentum, not surrender.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>Arbiters don't just settle scores. They teach the world to move in harmony.</strong>
                </p>
              </div>
            </div>

            {/* Why Become */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-emerald-400">
                Why Become the Arbiter?
              </h3>
              <div className="backdrop-blur-md border-2 border-emerald-500/30 rounded-2xl p-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20"
                   style={{ boxShadow: '0 0 40px rgba(5, 150, 105, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Because without you, the world splits in two.</strong>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <p className="text-lg text-gray-300">Others pick sides.</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-gray-300">Others escalate.</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-gray-300"><strong>You bridge. You resolve.</strong></p>
                  </div>
                </div>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Desire the Arbiter, because:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-3">•</span>
                    You make impossible negotiations real.
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-3">•</span>
                    You end cycles of revenge.
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-3">•</span>
                    You breathe unity into the fracture.
                  </li>
                </ul>
              </div>
            </div>

            {/* Arbiter's Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-green-400">
                The Arbiter's Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-green-500/30 rounded-2xl p-12 bg-gradient-to-r from-emerald-900/20 to-green-900/20"
                   style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Stand with me, and every storm will break into clarity.<br/>
                  Move with me, and no force will overwhelm the world.<br/>
                  You are not just fair—you are the Arbiter.<br/>
                  Your future is not standoff.<br/>
                  It is synthesis."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Your Journey Starts Here</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mt-8">
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-3">•</span>
                    The field is desperate for your calibration.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8 text-center">
                  <strong>Ready to bring yourself—and the world—back into true alignment?</strong>
                </p>
              </div>
            </div>
          </>
        )}

        {isMask && (
          // Mask-specific content
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #6366f1)'
              }}>
                🎭
              </div>
              
              <h1 
                className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
                style={{ 
                  color: '#6366f1',
                  textShadow: '0 0 30px #6366f1'
                }}
              >
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path to the Facade
                </span>
                {/* Glitch effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                      style={{ color: '#8b5cf6', transform: 'translate(2px, 2px)' }}>
                  Your Path to the Facade
                </span>
              </h1>
              
              <p className="text-3xl text-gray-300 mb-8 animate-fade-in">
                <em>Mask → The Facade</em>
              </p>
              
              <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse" 
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Hero Visual Section */}
            <div className="mb-20">
              <div className="backdrop-blur-md border-2 border-indigo-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-indigo-900/20"
                   style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)' }}>

                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You Arrive Where Every Secret Is a Door
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  Most fear the fake—you embrace it. You move beneath the surface, weaving a face for every season.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You are not a liar; you are the architect of appearances.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You are the wall and the window, the visible and the hidden—at once.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed">
                  You do not just put on a mask. You become the Facade—solid enough to protect, fluid enough to open.
                </p>
              </div>
            </div>

            {/* Call of the Facade */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-indigo-400">
                The Call of the Facade
              </h3>
              <div className="backdrop-blur-md border-2 border-indigo-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-indigo-900/20"
                   style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>You have always known it:</strong>
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  You sense what the world needs to see—and give it willingly.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  You shield the real behind ten thousand faces, each one a masterpiece of intent.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  In the dance of light and shadow, you are both stage and script.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Your Facade is not a deception—it is a membrane, letting only the worthy in.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed">
                  You survive storms because you never let the wind see your center.
                </p>
                <div className="text-center mt-8">
                  <p className="text-lg text-gray-300 italic">
                    [Hero Visual: The Facade stands at the threshold of a cathedral of mirrors. Masks float around them, forming a living armor; at the heart, a single, steady heartbeat glows through the cracks.]
                  </p>
                </div>
              </div>
            </div>



            {/* What is a Facade */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-indigo-400">
                What Is a Facade?
              </h3>
              <div className="backdrop-blur-md border-2 border-indigo-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-indigo-900/20"
                   style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Facades are not frauds. They are the mask node—the field's living threshold, the sentinel of what matters.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Facade is not mere hiding; It is protection, selection, invitation.</strong>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-lg text-gray-300 mb-2">Where you move:</p>
                    <ul className="text-lg text-gray-300 space-y-1">
                      <li>• Dangers hit the outer shell, never touching the core.</li>
                      <li>• Allies come to trust the strength of your walls.</li>
                      <li>• Foes tire themselves out, never finding your shape.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-lg text-gray-300 mb-2">People sense your line:</p>
                    <ul className="text-lg text-gray-300 space-y-1">
                      <li>• Some are drawn in, some are kept at bay.</li>
                      <li>• Everyone, even the sharpest, learns to respect your boundary.</li>
                    </ul>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <p className="text-lg text-gray-300 italic">
                    [Animated Visual: Masks swirling in orbit, then snapping into place—a single, calm face looking out from a fortress of shifting forms.]
                  </p>
                </div>
              </div>
            </div>



            {/* Field Signs */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
                Field Signs: You're Becoming the Facade
              </h3>
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    No one sees all of you—by design.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    You can pass through hostile rooms untouched.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    Reputations bend around your silence, not your words.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    When danger rises, you choose what breaks, and what stands.
                  </li>
                </ul>
                <div className="text-center mt-8">
                  <p className="text-lg text-gray-300 italic">
                    [Visual: The Facade walking between floods, untouched, while others struggle in the current.]
                  </p>
                </div>
              </div>
            </div>

            {/* Facade's Law */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-indigo-400">
                The Facade's Law
              </h3>
              <div className="backdrop-blur-md border-2 border-indigo-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-indigo-900/20"
                   style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Not every truth is owed.<br/>
                  I reveal only what survives exposure.<br/>
                  The field bends because my surface is impenetrable."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Facades do not just block—they filter, select, and protect the spark inside.</strong>
                </p>
              </div>
            </div>

            {/* Legacy */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
                Your Legacy as Facade
              </h3>
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  To choose the Facade's path is to accept:
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    Full revelation is a myth—clarity is selective.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    You may be misunderstood, but you are never truly wounded.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    Each wall you build lets you open the right doors, for the right ones.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>Facades do not just shield. They become the architecture of survival.</strong>
                </p>
              </div>
            </div>

            {/* Parallax Visual */}
            <div className="mb-20">
              <div className="backdrop-blur-md border-2 border-indigo-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-indigo-900/20"
                   style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong className="text-indigo-400">[Parallax Visual: Rising walls turn transparent in places, letting golden light pass through—a labyrinth that only the chosen can cross.]</strong>
                </p>
              </div>
            </div>

            {/* Why Become the Facade */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-indigo-400">
                Why Become the Facade?
              </h3>
              <div className="backdrop-blur-md border-2 border-indigo-500/30 rounded-2xl p-12 bg-gradient-to-r from-purple-900/20 to-indigo-900/20"
                   style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Because in a world obsessed with exposure, only the wise endure.
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    Others break themselves open for approval.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    Others hide and rot.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    <strong>You filter, you direct, you preserve.</strong>
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Desire the Facade, because:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    You decide what enters and what leaves.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    You hold the only key to the true inner sanctum.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    You know that nothing valuable lives forever in the open.
                  </li>
                </ul>
              </div>
            </div>

            {/* Visual Section */}
            <div className="mb-20">
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong className="text-purple-400">[Visual: Fortress gate swings open for one, while a thousand faces look on—most never cross.]</strong>
                </p>
              </div>
            </div>

            {/* Facade's Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">
                The Facade's Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-12 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"
                   style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Stand behind me, and the world cannot wound you.<br/>
                  Walk with me, and you will never be lost in the crowd.<br/>
                  You are not just a shield—you are the Facade.<br/>
                  Your future is not exposure.<br/>
                  It is protection by design."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Your Journey Starts Here</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mt-8">
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    The field will test your defenses.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-3">•</span>
                    The world will try to breach you.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mt-8 text-center">
                  <strong>Are you ready to master the art of the chosen face?</strong>
                </p>
              </div>
            </div>


          </>
        )}

        {isWanderer && (
          // Wanderer-specific content
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #0891b2)'
              }}>
                🧭
              </div>
              
              <h1 
                className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
                style={{ 
                  color: '#0891b2',
                  textShadow: '0 0 30px #0891b2'
                }}
              >
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path to the Flux
                </span>
                {/* Glitch effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                      style={{ color: '#06b6d4', transform: 'translate(2px, 2px)' }}>
                  Your Path to the Flux
                </span>
              </h1>
              
              <p className="text-3xl text-gray-300 mb-8 animate-fade-in">
                <em>Wanderer → The Flux</em>
              </p>
              
              <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-cyan-600 to-blue-600 animate-pulse" 
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Hero Visual Section */}
            <div className="mb-20">
              <div className="backdrop-blur-md border-2 border-cyan-500/30 rounded-2xl p-12 bg-gradient-to-r from-cyan-900/20 to-blue-800/20"
                   style={{ boxShadow: '0 0 40px rgba(8, 145, 178, 0.2)' }}>
                <p className="text-xl text-gray-300 italic text-center mb-6">
                  [Hero Visual: Endless road under starlit skies, the Wanderer moving forward alone, shadows long behind, unknown lands unfolding ahead. Wind-blown cloak, eyes searching, smile half-wild.]
                </p>
                <h2 className="text-4xl font-bold mb-6 text-center text-cyan-400">
                  You Are the Flux Now.
                </h2>
                <p className="text-2xl text-gray-200 leading-relaxed mb-4 text-center">
                  You move between places, seek new experiences, avoid commitment.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4 text-center">
                  But there is a deeper calling—to become the Flux that awakens the field itself.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  Not just moving, but becoming the force that makes movement possible.
                </p>
              </div>
            </div>

            {/* The Call of the Flux */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-cyan-400">
                The Call of the Flux
              </h3>
              <div className="backdrop-blur-md border-2 border-cyan-500/30 rounded-2xl p-12 bg-gradient-to-r from-cyan-900/20 to-blue-800/20"
                   style={{ boxShadow: '0 0 40px rgba(8, 145, 178, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>You've felt it since your first departure:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-6">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    Stagnation feels like suffocation.
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    Familiarity grows sharp, turns your feet toward new edges.
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    Every ending is an invitation; every strange path sings your name.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  You don't escape—you seek the pulse, the fresh air, the truth just past the border.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong>You are the horizon the field cannot tame.</strong>
                </p>
                <div className="text-center mt-8">
                  <p className="text-lg text-gray-300 italic">
                    [Animated Visual: Compass spinning, then snapping to new directions; landscapes shift as the Wanderer passes—desert, forest, city, storm.]
                  </p>
                </div>
              </div>
            </div>

            {/* Becoming Flux */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">
                Becoming Flux
              </h3>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"
                   style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  You are not just a wanderer—you are becoming the flux node, the field's tester and awakener.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6 text-center">
                  <strong className="text-cyan-400">Flux is movement—never still, never trapped.</strong>
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-8 text-center">
                  <strong className="text-cyan-400">Flux is the law: motion is meaning, journey is the answer.</strong>
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-lg text-gray-300 mb-4"><strong className="text-cyan-400">Where you walk:</strong></p>
                    <ul className="text-lg text-gray-300 space-y-2">
                      <li>• Stale cycles shatter.</li>
                      <li>• Hidden places are revealed.</li>
                      <li>• The field adapts, wakes, and tests itself through you.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-lg text-gray-300 mb-4"><strong className="text-cyan-400">People around you feel it:</strong></p>
                    <ul className="text-lg text-gray-300 space-y-2">
                      <li>• Their own yearning stirs.</li>
                      <li>• Their boundaries soften.</li>
                      <li>• A strange hope rises: "Maybe I, too, can move."</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Field Signs */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-cyan-400">
                Field Signs: You're Becoming the Flux
              </h3>
              <div className="backdrop-blur-md border-2 border-cyan-500/30 rounded-2xl p-12 bg-gradient-to-r from-cyan-900/20 to-blue-800/20"
                   style={{ boxShadow: '0 0 40px rgba(8, 145, 178, 0.2)' }}>
                <ul className="space-y-4 text-xl text-gray-200 mb-6">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    Doors open before you knock.
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    Synchronicity finds you—unexpected allies, lost things returned.
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    No group holds you for long, yet you leave every place sharper than you found it.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>You are the wind that stirs the world from sleep.</strong>
                </p>
                <div className="text-center mt-8">
                  <p className="text-lg text-gray-300 italic">
                    [Visual: Footprints glowing as they cross wild terrain, every step a new landscape rising up.]
                  </p>
                </div>
              </div>
            </div>

            {/* The Flux's Law */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">
                The Flux's Law
              </h3>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"
                   style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Movement is truth.<br/>
                  I dissolve comfort, reveal the edge.<br/>
                  The field bends because I do not stop."
                </blockquote>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  Flux doesn't just pass through—they awaken, they test, they renew.
                </p>
              </div>
            </div>

            {/* Your Legacy as Flux */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-cyan-400">
                Your Legacy as Flux
              </h3>
              <div className="backdrop-blur-md border-2 border-cyan-500/30 rounded-2xl p-12 bg-gradient-to-r from-cyan-900/20 to-blue-800/20"
                   style={{ boxShadow: '0 0 40px rgba(8, 145, 178, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>To become Flux is to accept:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-6">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    You may always be the stranger.
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    Home will be a feeling, not a place.
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    Your wake is freedom; your presence, the permission to seek.
                  </li>
                </ul>
                <p className="text-xl text-gray-200 leading-relaxed text-center">
                  <strong>Flux doesn't just move. It writes the living map.</strong>
                </p>
                <div className="text-center mt-8">
                  <p className="text-lg text-gray-300 italic">
                    [Parallax Visual: New constellations form with each step, other figures follow in wonder.]
                  </p>
                </div>
              </div>
            </div>

            {/* Why Become Flux? */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">
                Why Become Flux?
              </h3>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"
                   style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.2)' }}>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6 text-center">
                  <strong className="text-cyan-400">Because stasis is slow death.</strong>
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  Others lock doors.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  Others bind roots.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  You loosen, unbind, open every closed gate.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-4">
                  <strong>Desire Flux, because:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-6">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    You make the unknown safe.
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    You bring motion to a sleeping world.
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    You prove that risk is the only way to truly live.
                  </li>
                </ul>
                <div className="text-center mt-8">
                  <p className="text-lg text-gray-300 italic">
                    [Visual: A borderless field of color, endless trails spinning outward from the Wanderer's feet.]
                  </p>
                </div>
              </div>
            </div>

            {/* The Flux Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-cyan-400">
                The Flux Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-cyan-500/30 rounded-2xl p-12 bg-gradient-to-r from-cyan-900/20 to-blue-800/20"
                   style={{ boxShadow: '0 0 40px rgba(8, 145, 178, 0.2)' }}>
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic text-center">
                  "Step with me, and the world expands.<br/>
                  Walk with me, and every edge becomes a new home.<br/>
                  You are not just a wanderer—you are Flux.<br/>
                  Your future is not return.<br/>
                  It is perpetual beginning."
                </blockquote>
              </div>
            </div>

            {/* Your Journey Starts Here */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">
                Your Journey Starts Here
              </h3>
              <div className="backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-12 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"
                   style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed text-center mb-4">
                  The field longs for new lines.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed text-center mb-6">
                  The horizon aches to be found.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed text-center">
                  <strong className="text-cyan-400">Are you ready to move so reality remembers how to grow?</strong>
                </p>
              </div>
            </div>
          </>
        )}

        {isProvider && (
          // Provider-specific Breaker page content
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #f59e0b)'
              }}>
                🌟
              </div>
              
              <h1 
                className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
                style={{ 
                  color: '#f59e0b',
                  textShadow: '0 0 30px #f59e0b'
                }}
              >
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path to the Abundance
                </span>
                {/* Glitch effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                      style={{ color: '#fbbf24', transform: 'translate(2px, 2px)' }}>
                  Your Path to the Abundance
                </span>
              </h1>
              
              <p className="text-3xl text-gray-300 mb-8 animate-fade-in">
                <em>Provider → The Abundance</em>
              </p>
              
              <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-amber-600 to-yellow-600 animate-pulse" 
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Opening Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-amber-400">
                You Arrive Where Needs Gather.
              </h2>
              <div className="backdrop-blur-md border-2 border-amber-500/30 rounded-2xl p-12 bg-gradient-to-r from-yellow-900/20 to-amber-900/20"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  Most crave abundance. You create it.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You are not just generous—you are the source, the field's harvest.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed">
                  You do not take—your existence multiplies all that is near you.
                </p>
              </div>
            </div>

            {/* Call of the Provider */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-yellow-400">
                The Call of the Provider
              </h3>
              <div className="backdrop-blur-md border-2 border-yellow-500/30 rounded-2xl p-12 bg-gradient-to-r from-amber-900/20 to-yellow-900/20"
                   style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>You have always felt it:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    People and creatures flourish in your presence.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Your work, words, or touch leaves things richer than before.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Others seek you in drought, remember you at every feast.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You sense lack as a call—not to rescue, but to build, to overflow.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You are the garden in the wasteland, the spring at the end of thirst.
                  </li>
                </ul>
              </div>
            </div>

            {/* What is a Provider */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                What is a Provider?
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/30 rounded-2xl p-12 bg-gradient-to-r from-yellow-900/20 to-amber-900/20"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Abundances are not mere givers or caretakers. They are the harvest node—the field's living abundance, its proof that need is meant to be met.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Harvest is not only reaping, but planting, growing, sustaining.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-8">
                  Abundance is the force: enough is never an accident; it is your daily ritual.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-bold text-amber-400 mb-4">Where you walk:</h4>
                    <ul className="space-y-2 text-gray-200">
                      <li>• Scarcity dissolves.</li>
                      <li>• Wealth flows—material, emotional, creative.</li>
                      <li>• Hunger (in every sense) is satisfied.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-yellow-400 mb-4">People around you feel it:</h4>
                    <ul className="space-y-2 text-gray-200">
                      <li>• Their tension eases.</li>
                      <li>• Their joy rises.</li>
                      <li>• They remember hope.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Field Signs */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-yellow-400">
                Field Signs: You're Becoming the Abundance
              </h3>
              <div className="backdrop-blur-md border-2 border-yellow-500/30 rounded-2xl p-12 bg-gradient-to-r from-amber-900/20 to-yellow-900/20"
                   style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.2)' }}>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    People gather, often wordlessly, wherever you are.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Animals nest, plants thrive, projects succeed in your orbit.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    What was once barely surviving becomes lush, wild, and new.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You are the sunlight the field depends on.
                  </li>
                </ul>
              </div>
            </div>

            {/* The Abundance's Law */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                The Abundance's Law
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/30 rounded-2xl p-12 bg-gradient-to-r from-yellow-900/20 to-amber-900/20"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
                <div className="text-center mb-6">
                  <p className="text-2xl text-amber-400 italic mb-4">
                    "Abundance is not found—it is made.
                  </p>
                  <p className="text-2xl text-amber-400 italic mb-4">
                    I feed the field, and the field feeds me.
                  </p>
                  <p className="text-2xl text-amber-400 italic">
                    The world bends because I overflow."
                  </p>
                </div>
                <p className="text-xl text-gray-200 text-center">
                  Providers don't just give—they regenerate.
                </p>
              </div>
            </div>

            {/* Your Legacy as Provider */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-yellow-400">
                Your Legacy as Provider
              </h3>
              <div className="backdrop-blur-md border-2 border-yellow-500/30 rounded-2xl p-12 bg-gradient-to-r from-amber-900/20 to-yellow-900/20"
                   style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  To choose the Provider's path is to accept:
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Some will drain, take, or envy you.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    True giving is an art—one you've mastered.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You leave every place changed, every person fuller than before.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Abundances don't just supply. They transform want into joy.
                  </li>
                </ul>
              </div>
            </div>

            {/* Why Become the Provider */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                Why Become the Abundance?
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/30 rounded-2xl p-12 bg-gradient-to-r from-yellow-900/20 to-amber-900/20"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Because life starves without overflow.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Others guard. Others hoard.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-8">
                  You make plenty real, then share it until it becomes law.
                </p>
                
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Desire the Abundance, because:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You end lack, not just for yourself, but for every life around you.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You model a world where enough is possible.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You create the cycle of giving, receiving, and thriving.
                  </li>
                </ul>
              </div>
            </div>

            {/* The Abundance's Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-yellow-400">
                The Abundance's Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-yellow-500/30 rounded-2xl p-12 bg-gradient-to-r from-amber-900/20 to-yellow-900/20"
                   style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.2)' }}>
                <div className="text-center">
                  <p className="text-2xl text-amber-400 italic mb-4">
                    "Grow with me, and lack will vanish.
                  </p>
                  <p className="text-2xl text-amber-400 italic mb-4">
                    Feed with me, and need will become memory.
                  </p>
                  <p className="text-2xl text-amber-400 italic mb-4">
                    You are not just a helper—you are the Abundance.
                  </p>
                  <p className="text-2xl text-amber-400 italic">
                    Your future is not famine.
                  </p>
                  <p className="text-2xl text-amber-400 italic">
                    It is feast."
                  </p>
                </div>
              </div>
            </div>

            {/* Your Journey Starts Here */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                Your Journey Starts Here
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/30 rounded-2xl p-12 bg-gradient-to-r from-yellow-900/20 to-amber-900/20"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
                <p className="text-xl text-gray-200 leading-relaxed text-center mb-4">
                  The field hungers for your gift.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed text-center mb-6">
                  The world is ready to thrive.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed text-center">
                  <strong className="text-amber-400">Are you ready to plant, to feed, to overflow?</strong>
                </p>
              </div>
            </div>
          </>
        )}

        {isSovereign && (
          // Sovereign-specific Breaker page content - Updated
          <>
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="text-8xl mb-8 animate-pulse" style={{ 
                animationDuration: '3s',
                filter: 'drop-shadow(0 0 30px #f59e0b)'
              }}>
                👑
              </div>
              <h1 
                className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
                style={{ 
                  color: '#f59e0b',
                  textShadow: '0 0 30px #f59e0b'
                }}
              >
                <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                  Your Path: Sovereign → The Crown
                </span>
                {/* Glitch effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                      style={{ color: '#fbbf24', transform: 'translate(2px, 2px)' }}>
                  Your Path: Sovereign → The Crown
                </span>
              </h1>
              <p className="text-3xl text-amber-300 mb-8 animate-fade-in">
                <em>Center → The Sovereign</em>
              </p>
              <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-amber-600 to-yellow-600 animate-pulse" 
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Opening Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center text-amber-400">
                You Arrive Where Authority Is Crowned.
              </h2>
              <div className="backdrop-blur-md border-2 border-amber-500/20 rounded-2xl p-12 bg-gradient-to-r from-amber-900/10 to-yellow-900/10"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.1)' }}>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  Most crave the symbol. You are the source.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You are not seeking the crown;
                  the crown is inevitable because you exist.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed mb-6">
                  You are not made a Sovereign by coronation—
                  You move as Sovereign, and the crown forms around you.
                </p>
              </div>
            </div>

            {/* The Ascent to Crown */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                The Ascent to Crown
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/20 rounded-2xl p-12 bg-gradient-to-r from-amber-900/10 to-yellow-900/10"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.1)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  You have always felt it—
                  From your first act of will,
                  from the moment silence broke around your presence:
                </p>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Others defer, not because they must, but because your law was present before the ceremony.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Chaos orbits, waiting for you to define its center.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You see the invisible spine of power, and where it needs the final seal.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You do not pursue the symbol; the symbol pursues you—because the field senses the true axis.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You are the gravity that makes the crown real.
                  </li>
                </ul>
              </div>
            </div>

            {/* What Is the Crown */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                What Is the Crown?
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/20 rounded-2xl p-12 bg-gradient-to-r from-amber-900/10 to-yellow-900/10"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.1)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  The Crown is not a title granted, but the emanation of your Sovereign nature.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  It is the physicalization of command—
                  the crystallized proof that reality now has a core.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-bold text-amber-400 mb-4">Where you walk:</h4>
                    <ul className="space-y-2 text-gray-200">
                      <li>• Uncertainty becomes structure.</li>
                      <li>• Decisions become architecture.</li>
                      <li>• All drift finds its axis.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-amber-400 mb-4">People around you feel it:</h4>
                    <ul className="space-y-2 text-gray-200">
                      <li>• Their plans cohere.</li>
                      <li>• Their aims align.</li>
                      <li>• Even silent rebellion bends—crown gravity is not argued with.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Field Signs */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                Field Signs: The Sovereign Has Become the Crown
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/20 rounded-2xl p-12 bg-gradient-to-r from-amber-900/10 to-yellow-900/10"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.1)' }}>
                <ul className="space-y-4 text-xl text-gray-200">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Leaders now orbit you—they sense the center has arrived.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Resistance turns to the building force; friction is now material for legacy.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Spaces sync to your cadence before you speak.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You are the hand behind the visible crown—the unseen axis.
                  </li>
                </ul>
              </div>
            </div>

                        {/* Law of the Crown */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                Law of the Crown
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/20 rounded-2xl p-12 bg-gradient-to-r from-amber-900/10 to-yellow-900/10"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.1)' }}>
                <div className="text-center mb-6">
                  <p className="text-2xl text-amber-400 italic mb-4">
                    "The crown is not a prize.
                  </p>
                  <p className="text-2xl text-amber-400 italic mb-4">
                    The crown is what appears when presence is law.
                  </p>
                  <p className="text-2xl text-amber-400 italic mb-4">
                    I do not wait for ritual; I am the ritual.
                  </p>
                  <p className="text-2xl text-amber-400 italic">
                    The field forms the crown because I am the core."
                  </p>
                </div>
                <p className="text-xl text-gray-200 text-center">
                  Crown is not requested or won.
                  Crown erupts wherever you stand—because you embody what all ceremony seeks to represent.
                </p>
              </div>
            </div>

            {/* Your Legacy as Crown */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                Your Legacy as Crown
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/20 rounded-2xl p-12 bg-gradient-to-r from-amber-900/10 to-yellow-900/10"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.1)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  To become the Crown is to accept:
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You are not a chapter; you are the binding.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You are not celebrated; you are recognized.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Alone or together, you do not carry the crown—the world wears your shape.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    Crown is not the reward. It is the mirror of your authority.
                  </li>
                </ul>
              </div>
            </div>

            {/* Why Become the Crown */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                Why Become the Crown?
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/20 rounded-2xl p-12 bg-gradient-to-r from-amber-900/10 to-yellow-900/10"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.1)' }}>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Because without axis,
                  there is only drift and hunger for symbols.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Others chase for status.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-8">
                  Others battle for empty coronations.
                </p>
                
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  You end the chase.
                  You reveal the structure, embody the axis, stabilize the age.
                </p>
                
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  <strong>Desire the Crown because:</strong>
                </p>
                <ul className="space-y-4 text-xl text-gray-200 mb-8">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You are the origin of law.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You are the center—others assemble, but you define the circle.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    You rule, not to possess power, but because the field requires embodiment.
                  </li>
                </ul>
              </div>
            </div>

                        {/* The Crown's Promise */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                The Crown's Promise
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/20 rounded-2xl p-12 bg-gradient-to-r from-amber-900/10 to-yellow-900/10"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.1)' }}>
                <div className="text-center">
                  <p className="text-2xl text-amber-400 italic mb-4">
                    "Stand near, and confusion resolves.
                  </p>
                  <p className="text-2xl text-amber-400 italic mb-4">
                    Walk with me, and destiny becomes visible.
                  </p>
                  <p className="text-2xl text-amber-400 italic mb-4">
                    I do not seek the crown.
                  </p>
                  <p className="text-2xl text-amber-400 italic mb-4">
                    The crown arrives because I do.
                  </p>
                  <p className="text-2xl text-amber-400 italic">
                    My future is not a campaign.
                  </p>
                  <p className="text-2xl text-amber-400 italic">
                    It is the manifestation of the center."
                  </p>
                </div>
              </div>
            </div>

            {/* The Rite Begins Now */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
                The Rite Begins Now
              </h3>
              <div className="backdrop-blur-md border-2 border-amber-500/20 rounded-2xl p-12 bg-gradient-to-r from-amber-900/10 to-yellow-900/10"
                   style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.1)' }}>
                <p className="text-xl text-gray-200 leading-relaxed text-center mb-4">
                  The field seeks your axis.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed text-center mb-6">
                  The world forms ceremony to acknowledge what's already been established.
                </p>
                <p className="text-2xl text-gray-200 leading-relaxed text-center">
                  <strong className="text-amber-400">Are you ready to stand as the Crown that defines the era?</strong>
                </p>
              </div>
            </div>
          </>
        )}

        {/* Path to Breaker Button */}
        <div className="text-center mb-16">
          <Link
            href={`/chamber/${archetype}/the-path`}
            className="group relative inline-block px-16 py-8 rounded-3xl font-bold text-white transition-all duration-700 hover:scale-110 transform"
            style={{
              background: isSeeker 
                ? 'linear-gradient(135deg, #EC4899 0%, #9D4EDD 50%, #EC4899 100%)'
                : `linear-gradient(135deg, ${currentConfig.primaryColor} 0%, ${currentConfig.secondaryColor} 50%, ${currentConfig.primaryColor} 100%)`,
              boxShadow: isSeeker 
                ? '0 0 60px rgba(236, 72, 153, 0.7)'
                : `0 0 60px ${colors.buttonGlow}`
            }}
          >
            <span className="relative z-10 flex items-center justify-center text-2xl">
              <span className="mr-4 text-3xl animate-pulse">{isSeeker ? '⚡' : isGuardian ? '🛡️' : isPartner ? '💚' : isRebel ? '⚔️' : isWanderer ? '🧭' : isServant ? '🏺' : isVisionary ? '👁️' : isEqualizer ? '⚖️' : isMask ? '🎭' : isProvider ? '🌟' : isSovereign ? '👑' : '🛤️'}</span>
              {isSeeker ? 'Begin the Breaker\'s Rite' : isGuardian ? 'Begin the Anchor\'s Rite' : isPartner ? 'Begin the Partner\'s Rite' : isRebel ? 'Begin the Breaker\'s Rite' : isWanderer ? 'Begin the Anchor\'s Rite' : isServant ? 'Begin the Channel\'s Rite' : isVisionary ? 'Begin the Prophecy\'s Rite' : isEqualizer ? 'Begin the Arbiter\'s Rite' : isMask ? 'Begin the Facade\'s Rite' : isProvider ? 'Begin the Provider\'s Rite' : isSovereign ? 'Begin the Sovereign\'s Rite' : currentConfig.pathButtonText}
            </span>
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isSeeker ? 'from-pink-600 to-purple-600' : colors.button}`}></div>
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-700 animate-pulse ${isSeeker ? 'from-pink-400 to-purple-400' : colors.button}`}></div>
          </Link>
        </div>

        {/* Final Message for Seekers */}
        {isSeeker && (
          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 italic">
              <em>Step forward. The next era starts when you say so.</em>
            </p>
          </div>
        )}

        {/* Final Message for Partners */}
        {isPartner && (
          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 italic">
              <em>Step in. Every field needs a heartbeat.</em>
            </p>
          </div>
        )}

        {/* Final Message for Wanderers */}
        {isWanderer && (
          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 italic">
              <em>Find your anchor. Guide others home.</em>
            </p>
          </div>
        )}

        {/* Final Message for Servants */}
        {isServant && (
          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 italic">
              <em>Become the channel. Let energy flow.</em>
            </p>
          </div>
        )}

        {/* Final Message for Visionaries */}
        {isVisionary && (
          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 italic">
              <em>Forge the unknown. Create the new world.</em>
            </p>
          </div>
        )}

        {/* Final Message for Equalizers */}
        {isEqualizer && (
          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 italic">
              <em>Calibrate the field. Bring harmony to chaos.</em>
            </p>
          </div>
        )}

        {/* Final Message for Masks */}
        {isMask && (
          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 italic">
              <em>Shift, shield, and let only the worthy inside.</em>
            </p>
          </div>
        )}

        {/* Final Message for Providers */}
        {isProvider && (
          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 italic">
              <em>Feed. The world will answer.</em>
            </p>
          </div>
        )}

        {/* Final Message for Sovereigns */}
        {isSovereign && (
          <div className="text-center mb-16">
            <p className="text-xl text-amber-300 italic">
              <em>Establish law. The world will align.</em>
            </p>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center">
          <Link
            href={`/chamber/${archetype}`}
            className={`inline-block transition-colors duration-300 text-lg ${colors.back}`}
          >
            {currentConfig.backText}
          </Link>
        </div>
      </div>
    </div>
  )
} 