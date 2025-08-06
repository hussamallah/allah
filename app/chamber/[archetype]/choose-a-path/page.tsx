'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function ChooseAPathPage() {
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
      title: 'THE CHANNEL',
      subtitle: 'Vessel → The Channel',
      regularTitle: 'Regular Vessel:',
      regularDesc: 'Serves others, provides support, channels energy and wisdom.',
      regularEffect: 'Others feel supported, energy flows, wisdom passes through.',
      breakerTitle: 'Channel (Future Self):',
      breakerDesc: 'You become the living channel that reality cannot resist.',
      breakerBenefit: 'You become the conduit for all wisdom and energy. Reality flows through you.',
      breakerSign: 'Others feel nourished just by your presence. The field channels through you.',
      pathButtonText: 'The Path to Channel',
      backText: '← Back to Vessel Chamber'
    },
    visionary: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      title: 'THE FUTURE',
      subtitle: 'Visionary → The Future',
      regularTitle: 'Regular Visionary:',
      regularDesc: 'Sees patterns, predicts outcomes, envisions possibilities.',
      regularEffect: 'Others see clearer futures, patterns emerge, possibilities expand.',
      breakerTitle: 'The Future (Future Self):',
      breakerDesc: 'You become the engine of emergence, the hand that sculpts tomorrow out of mist.',
      breakerBenefit: 'You become the founding force that turns vision into gravity. Reality bends where you set your gaze.',
      breakerSign: 'Others feel the pressure of what\'s coming through your presence. The field tilts forward around you.',
      pathButtonText: 'The Path to the Future',
      backText: '← Back to Visionary Chamber'
    },
    equalizer: {
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      title: 'THE BALANCE',
      subtitle: 'Equalizer → The Balance',
      regularTitle: 'Regular Equalizer:',
      regularDesc: 'Mediates disputes, restores peace, notices injustice.',
      regularEffect: 'Fights calm, fairness spreads, justice prevails.',
      breakerTitle: 'The Balance (Future Self):',
      breakerDesc: 'You become the living scale that reality cannot resist.',
      breakerBenefit: 'You become the living justice. Reality balances through your presence.',
      breakerSign: 'Others feel fairness and peace just by your presence. The field balances around you.',
      pathButtonText: 'The Path to the Balance',
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
      title: 'THE PROVIDER',
      subtitle: 'Harvest → The Provider',
      regularTitle: 'You Arrive Where Needs Gather',
      regularDesc: 'Most crave abundance. You create it. You are not just generous—you are the source, the field\'s harvest. You do not take—your existence multiplies all that is near you.',
      regularEffect: 'People and creatures flourish in your presence. Your work, words, or touch leaves things richer than before. Others seek you in drought, remember you at every feast. You sense lack as a call—not to rescue, but to build, to overflow. You are the garden in the wasteland, the spring at the end of thirst.',
      breakerTitle: 'What is a Provider?',
      breakerDesc: 'Providers are not mere givers or caretakers. They are the harvest node—the field\'s living abundance, its proof that need is meant to be met. Harvest is not only reaping, but planting, growing, sustaining. Provider is the force: enough is never an accident; it is your daily ritual.',
      breakerBenefit: 'Where you walk: Scarcity dissolves. Wealth flows—material, emotional, creative. Hunger (in every sense) is satisfied. People around you feel it: Their tension eases. Their joy rises. They remember hope.',
      breakerSign: 'Abundance is not found—it is made. I feed the field, and the field feeds me. The world bends because I overflow. Providers don\'t just give—they regenerate.',
      pathButtonText: 'Begin the Provider\'s Rite',
      backText: '← Back to Provider Chamber'
    },
    sovereign: {
      primaryColor: '#f59e0b',
      secondaryColor: '#fbbf24',
      title: 'THE SOVEREIGN',
      subtitle: 'Crown → The Sovereign',
      regularTitle: 'You Arrive Where Authority Begins',
      regularDesc: 'Most crave control. You are control. You do not follow the throne; The throne shapes itself around you. You are not just a leader—you are the axis, the law behind every law. Where you stand, decisions crystallize. Where you breathe, confusion flees.',
      regularEffect: 'Others defer—sometimes with awe, sometimes with silent resistance. Chaos waits for you to choose, to set the course. You sense the architecture of power, invisible but absolute. You do not seek attention—the world orbits you. You are the gravity that shapes the age.',
      breakerTitle: 'What Is a Sovereign?',
      breakerDesc: 'Not a mere ruler. Not a boss. You are the crown node—the field\'s living law. The crown is not granted; It is taken by pure presence. Where you walk, doubt dissolves. Decisions become law. Confusion finds its order. People feel you coming: Their plans rearrange. Their ambitions sharpen. Their anxieties bow—even if their words do not. You are the unseen hand behind every movement.',
      breakerBenefit: 'Leaders consult you—openly or in secret. Opposition becomes momentum. Rooms align around your will, even if you never speak. You are the source that others circle, even in defiance.',
      breakerSign: 'The crown is not given—it is claimed. I do not ask; I declare. The field bends because I am its law. Sovereigns do not negotiate their presence. They enforce it.',
      pathButtonText: 'Claim Your Crown',
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
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="text-8xl mb-8 animate-pulse" style={{ 
            animationDuration: '3s',
            filter: `drop-shadow(0 0 30px ${currentConfig.primaryColor})`
          }}>
            {isSeeker ? '⚡' : isGuardian ? '🛡️' : isSpotlight ? '🌟' : isPartner ? '💚' : isRebel ? '⚔️' : isServant ? '🏺' : isSovereign ? '👑' : isProvider ? '🌾' : '⚡'}
          </div>
          
          <h1 
            className="text-6xl md:text-8xl font-bold mb-8 tracking-wider relative group"
            style={{ 
              color: currentConfig.primaryColor,
              textShadow: `0 0 30px ${currentConfig.primaryColor}`
            }}
          >
            <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
              CHOOSE A PATH
            </span>
            {/* Glitch effect */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                  style={{ color: currentConfig.secondaryColor, transform: 'translate(2px, 2px)' }}>
              CHOOSE A PATH
            </span>
          </h1>
          
          <p className="text-3xl text-gray-300 mb-8 animate-fade-in">
            <em>{currentConfig.subtitle}</em>
          </p>
          
          <div className="w-48 h-1 mx-auto mb-12 bg-gradient-to-r from-current to-current animate-pulse" 
               style={{ 
                 background: `linear-gradient(to right, ${currentConfig.primaryColor}, ${currentConfig.secondaryColor})`,
                 animationDuration: '4s' 
               }}></div>
        </div>

        {/* Main Content Section */}
        <div className="backdrop-blur-md border-2 rounded-2xl p-12 mb-12"
             style={{ 
               background: `linear-gradient(to right, ${currentConfig.primaryColor}20, ${currentConfig.secondaryColor}20)`,
               borderColor: `${currentConfig.primaryColor}50`,
               boxShadow: `0 0 40px ${currentConfig.primaryColor}30`
             }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Regular Archetype */}
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: currentConfig.primaryColor }}>
                {currentConfig.regularTitle}
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                {currentConfig.regularDesc}
              </p>
              <p className="text-lg text-gray-300">
                <strong>Effect:</strong> {currentConfig.regularEffect}
              </p>
            </div>

            {/* Future Self */}
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: currentConfig.secondaryColor }}>
                {currentConfig.breakerTitle}
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                {currentConfig.breakerDesc}
              </p>
              <p className="text-lg text-gray-300">
                <strong>Real benefit:</strong> {currentConfig.breakerBenefit}
              </p>
              <p className="text-lg text-gray-300">
                <strong>Field sign:</strong> {currentConfig.breakerSign}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <Link
            href={`/chamber/${archetype}/the-path`}
            className="inline-block px-12 py-6 text-2xl font-bold text-white rounded-2xl transition-all duration-300 transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${currentConfig.primaryColor} 0%, ${currentConfig.secondaryColor} 50%, ${currentConfig.primaryColor} 100%)`,
              boxShadow: `0 0 30px ${currentConfig.primaryColor}50`
            }}
          >
            Begin Your Path
          </Link>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href={`/chamber/${archetype}`}
            className="inline-block text-gray-400 hover:text-white transition-colors duration-300"
            style={{ color: currentConfig.primaryColor }}
          >
            {currentConfig.backText}
          </Link>
        </div>
      </div>
    </div>
  )
} 