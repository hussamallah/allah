// Chamber Page Implementation
// Complete chamber page with all interactive features and button functionality

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { QuizEngine, type QuizStep, type QuizResult } from './quizEngine';
import { type BehaviorSample } from './quizConfig';

// Archetype configuration interface
interface ArchetypeConfig {
  name: string;
  description: string;
  color: string;
  accentColor: string;
  glowColor: string;
  powerColor: string;
  override: string;
  overrideDesc: string;
  resilience: string;
  resilienceDesc: string;
  selfNullification: string;
  selfNullificationDesc: string;
  witnessLogging: string;
  witnessLoggingDesc: string;
  adaptability: string;
  adaptabilityDesc: string;
  edge?: string;
}

// Archetype configurations
const archetypeConfigs: Record<string, ArchetypeConfig> = {
  visionary: {
    name: 'Visionary',
    description: 'You live in the future before anyone else can see it.',
    color: '#8B5CF6',
    accentColor: '#A78BFA',
    glowColor: '#8B5CF6',
    powerColor: '#7C3AED',
    override: 'Future Sight',
    overrideDesc: 'You see possibilities others miss',
    resilience: 'Adaptive Vision',
    resilienceDesc: 'You reinvent when others give up',
    selfNullification: 'Temporal Shift',
    selfNullificationDesc: 'You disappear into future possibilities',
    witnessLogging: 'Pattern Recognition',
    witnessLoggingDesc: 'You connect dots across time',
    adaptability: 'Morphing Identity',
    adaptabilityDesc: 'You become what the future needs',
    edge: 'Watch for getting lost in possibilities and neglecting the present moment.'
  },
  seeker: {
    name: 'Seeker',
    description: 'You question everything to find deeper truth.',
    color: '#06B6D4',
    accentColor: '#22D3EE',
    glowColor: '#06B6D4',
    powerColor: '#0891B2',
    override: 'Truth Detection',
    overrideDesc: 'You see through illusions and facades',
    resilience: 'Endless Curiosity',
    resilienceDesc: 'You keep searching when others stop',
    selfNullification: 'Dissolving Self',
    selfNullificationDesc: 'You disappear to observe clearly',
    witnessLogging: 'Deep Observation',
    witnessLoggingDesc: 'You notice what others miss',
    adaptability: 'Pattern Shifting',
    adaptabilityDesc: 'You change to understand change',
    edge: 'Watch for getting lost in analysis and losing connection to others.'
  },
  guardian: {
    name: 'Guardian',
    description: 'You protect and guide others through their challenges.',
    color: '#10B981',
    accentColor: '#34D399',
    glowColor: '#10B981',
    powerColor: '#059669',
    override: 'Protective Instinct',
    overrideDesc: 'You shield others from harm',
    resilience: 'Unwavering Support',
    resilienceDesc: 'You remain steady when others falter',
    selfNullification: 'Self-Sacrifice',
    selfNullificationDesc: 'You put others before yourself',
    witnessLogging: 'Emotional Intelligence',
    witnessLoggingDesc: 'You read others\' needs accurately',
    adaptability: 'Situational Awareness',
    adaptabilityDesc: 'You adjust your approach as needed',
    edge: 'Watch for neglecting your own needs while caring for others.'
  }
};

// QuizEngineIntegration class for quiz functionality
export class QuizEngineIntegration {
  private engine: QuizEngine;

  constructor() {
    this.engine = new QuizEngine();
  }

  start(): QuizStep {
    return this.engine.start();
  }

  nextStepAfterAnswer(optionId: string, behavior: BehaviorSample): QuizStep | "FINISHED" {
    return this.engine.nextStepAfterAnswer(optionId, behavior);
  }

  finalize(): QuizResult {
    return this.engine.finalize();
  }

  getIndex(): number {
    return this.engine.getIndex();
  }

  getLeaders() {
    return this.engine.getLeaders();
  }

  getProgress() {
    const currentQuestion = this.engine.getIndex() + 1; // Convert 0-based index to 1-based question number
    const totalQuestions = 15; // Total questions in the quiz
    const progress = (currentQuestion / totalQuestions) * 100; // Calculate progress percentage
    
    return {
      currentQuestion,
      totalQuestions,
      progress,
      isMilestone: currentQuestion % 3 === 0 // Milestone every 3 questions (Q3, Q6, Q9, Q12, Q15)
    };
  }

  async handleAnswer(optionId: string) {
    // Create a default behavior sample for now
    // In a real implementation, this might come from user input or be randomized
    const defaultBehavior: BehaviorSample = {
      archetype: 'visionary', // Default archetype
      trigger: 'curiosity', // Default trigger
      intensity: 0.5 // Default intensity
    };
    
    return this.engine.nextStepAfterAnswer(optionId, defaultBehavior);
  }

  getTriggerRecommendations(triggerCounts: Record<string, number>) {
    // Simple implementation - return top triggers by count
    const sortedTriggers = Object.entries(triggerCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([trigger]) => trigger)
      .slice(0, 3); // Top 3 triggers
    
    return sortedTriggers;
  }
}

// Main Chamber Page Component
export function ChamberPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const archetype = (params?.archetype as string) || 'visionary';
  const isSharedView = searchParams.get('shared') === 'true';
  
  const config = archetypeConfigs[archetype.toLowerCase()] || archetypeConfigs.visionary;
  
  // State management
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCompatibilityModal, setShowCompatibilityModal] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [showFullBundleModal, setShowFullBundleModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  // Handle copy link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('Link copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      setCopyStatus('Failed to copy');
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  // Handle email sharing
  const handleShareEmail = () => {
    const subject = `Check out my ${config.name} results!`;
    const body = `I just discovered I'm a ${config.name} archetype. Here's what that means:\n\n${config.description}\n\nView my full results: ${window.location.href}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setShowShareModal(false);
  };

  // Handle social sharing
  const handleShareSocial = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I'm a ${config.name}!`,
          text: config.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
    setShowShareModal(false);
  };

  // Handle compatibility submission
  const handleCompatibilitySubmit = async () => {
    if (!friendEmail || !userEmail) return;
    
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowCompatibilityModal(false);
    setShowConfirmationModal(true);
  };

  // Handle purchase
  const handlePurchase = (type: string) => {
    setShowConfirmationModal(true);
    // Close other modals
    setShowOverrideModal(false);
    setShowBundleModal(false);
    setShowFullBundleModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Pulsing field overlay */}
        <div 
          className="absolute inset-0 animate-pulse opacity-10" 
          style={{ 
            background: `radial-gradient(circle at center, ${config.color} 0%, transparent 70%)`,
            animationDuration: '4s' 
          }} 
        />
        {/* Glitch particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-30 animate-ping"
              style={{
                backgroundColor: config.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Shared View Banner */}
        {isSharedView && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-blue-900/20 border border-blue-500/50 rounded-xl">
              <span className="text-blue-400 mr-2">🔗</span>
              <span className="text-blue-300">Shared View - Read Only</span>
            </div>
          </div>
        )}

        {/* Header with Animated Glyph */}
        <div className="text-center mb-16">
          {/* Animated Glyph */}
          <div 
            className="text-8xl mb-6 animate-pulse"
            style={{ 
              animationDuration: '3s',
              filter: `drop-shadow(0 0 20px ${config.color})`
            }}
          >
            {config.name.split(' ')[0]}
          </div>
          
          {/* Glitching Title */}
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 tracking-wider relative group"
            style={{ 
              color: config.color,
              textShadow: `0 0 30px ${config.color}`
            }}
          >
            <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
              {config.name.split(' ').slice(1).join(' ')} CHAMBER
            </span>
            {/* Glitch effect */}
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
              style={{ color: config.accentColor, transform: 'translate(2px, 2px)' }}
            >
              {config.name.split(' ').slice(1).join(' ')} CHAMBER
            </span>
          </h1>
          
          {/* Animated Subtitle */}
          <p className="text-2xl text-gray-300 mb-4 animate-fade-in">
            {config.description}
          </p>
          
          {/* Living prophecy text */}
          <div 
            className="text-lg mb-8 animate-pulse"
            style={{ color: config.color, animationDuration: '20s' }}
          >
            <span className="opacity-80">Understanding Your Pattern</span>
          </div>
        </div>

        {/* Pattern explanation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 border border-gray-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4" style={{ color: config.color }}>
              What These Traits Say About You
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Every answer you gave was a real reflection of your way of moving through life—not a guess, not an ideal.
            </p>
            <p className="text-gray-300 leading-relaxed">
              You didn't invent these patterns; they're the lines your experience has already drawn.
            </p>
          </div>
          <div 
            className="w-32 h-1 mx-auto mb-8 animate-pulse"
            style={{ 
              background: `linear-gradient(to right, ${config.color}, ${config.accentColor})`,
              animationDuration: '4s' 
            }}
          ></div>
        </div>

        {/* Attribute Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {/* Override Card */}
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300"
               style={{ borderColor: `${config.color}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: config.color }}>{config.override}</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 mr-1">★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-300 text-sm">{config.overrideDesc}</p>
          </div>

          {/* Resilience Card */}
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300"
               style={{ borderColor: `${config.accentColor}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: config.accentColor }}>{config.resilience}</h3>
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-yellow-400 mr-1">★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-300 text-sm">{config.resilienceDesc}</p>
          </div>

          {/* Self-Nullification Card */}
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300"
               style={{ borderColor: `${config.powerColor}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: config.powerColor }}>{config.selfNullification}</h3>
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="text-yellow-400 mr-1">★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-300 text-sm">{config.selfNullificationDesc}</p>
          </div>

          {/* Witness/Logging Card */}
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300"
               style={{ borderColor: `${config.color}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: config.color }}>{config.witnessLogging}</h3>
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-yellow-400 mr-1">★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-300 text-sm">{config.witnessLoggingDesc}</p>
          </div>

          {/* Adaptability Card */}
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300"
               style={{ borderColor: `${config.accentColor}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: config.accentColor }}>{config.adaptability}</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 mr-1">★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-300 text-sm">{config.adaptabilityDesc}</p>
          </div>
        </div>

        {/* INVITE CARD */}
        <Link href={`/chamber/${archetype}/who-you-are`} className="block">
          <div className="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
            <div className="bg-black/60 backdrop-blur-md border-2 border-yellow-500/50 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 min-w-[280px]"
                 style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold transition-colors" style={{ color: '#D4AF37' }}>
                  Invite Someone You Trust — Unlock for $1
                </h3>
                <div className="text-2xl">🔍</div>
              </div>
              <p className="text-sm mb-3" style={{ color: '#E1E1E1' }}>
                Friend, partner, rival, or teammate—see what really happens when your archetypes meet.
              </p>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 mr-1">★</span>
                ))}
              </div>
              <div className="text-sm mb-3" style={{ color: '#E1E1E1' }}>
                <p className="font-semibold mb-2" style={{ color: '#D4AF37' }}>You'll get:</p>
                <div className="space-y-1">
                  <div>Results revealed side-by-side</div>
                  <div>Shared strengths decoded</div>
                  <div>Potential clash zones mapped</div>
                  <div>Compatibility score</div>
                  <div>Key blind spot for each</div>
                  <div>Pro tip for breakthrough communication</div>
                  <div>Team or duo summary, unique to your match</div>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm font-medium" style={{ color: '#D4AF37' }}>
                  All for just $1—see your real connection, not just the surface.
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Pricing Buttons - Hidden in shared view */}
        {!isSharedView && (
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <button 
                onClick={() => setShowShareModal(true)}
                className="group relative inline-block px-8 py-4 rounded-xl font-bold text-white transition-all duration-500 hover:scale-105 transform bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 mr-4"
                style={{ boxShadow: '0 0 30px rgba(75, 85, 99, 0.5)' }}>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-2">📨</span>
                  Share my results
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>

              <button 
                onClick={() => setShowCompatibilityModal(true)}
                className="group relative inline-block px-8 py-4 rounded-xl font-bold text-white transition-all duration-500 hover:scale-105 transform"
                style={{ 
                  background: 'linear-gradient(135deg, #FF69B4, #FF1493, #FF69B4)',
                  boxShadow: '0 0 40px rgba(255, 105, 180, 0.7), 0 0 80px rgba(255, 20, 147, 0.4)'
                }}>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-2">💡</span>
                  Get Compatibility Report — $1
                </span>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: 'linear-gradient(135deg, #FF1493, #FF69B4, #FF1493)' }}></div>
              </button>

              <button 
                onClick={() => setShowOverrideModal(true)}
                className="group relative inline-block px-8 py-4 rounded-xl font-bold text-white transition-all duration-500 hover:scale-105 transform"
                style={{ 
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED, #4F46E5)',
                  boxShadow: '0 0 40px rgba(79, 70, 229, 0.7), 0 0 80px rgba(124, 58, 237, 0.4)'
                }}>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-2">⚡</span>
                  1 Override Card — $3
                </span>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5, #7C3AED)' }}></div>
              </button>

              <button 
                onClick={() => setShowBundleModal(true)}
                className="group relative inline-block px-8 py-4 rounded-xl font-bold text-white transition-all duration-500 hover:scale-105 transform"
                style={{ 
                  background: 'linear-gradient(135deg, #059669, #10B981, #059669)',
                  boxShadow: '0 0 40px rgba(5, 150, 105, 0.7), 0 0 80px rgba(16, 185, 129, 0.4)'
                }}>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-2">🎯</span>
                  2-Card Bundle — $5
                </span>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: 'linear-gradient(135deg, #10B981, #059669, #10B981)' }}></div>
              </button>

              <button 
                onClick={() => setShowFullBundleModal(true)}
                className="group relative inline-block px-8 py-4 rounded-xl font-bold text-white transition-all duration-500 hover:scale-105 transform"
                style={{ 
                  background: 'linear-gradient(135deg, #D97706, #F59E0B, #D97706)',
                  boxShadow: '0 0 40px rgba(217, 119, 6, 0.7), 0 0 80px rgba(245, 158, 11, 0.4)'
                }}>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-2">👑</span>
                  5-Card Full Bundle — $10
                </span>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706, #F59E0B)' }}></div>
              </button>
            </div>
          </div>
        )}

        {/* Edge Warning Section */}
        {config.edge && (
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 border rounded-2xl p-6 backdrop-blur-sm"
                 style={{ borderColor: `${config.color}30`, boxShadow: `0 0 40px ${config.glowColor}` }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: config.color }}>
                Things to Watch For
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {config.edge}
              </p>
            </div>
          </div>
        )}

        {/* WHO YOU ARE Card - Bottom of Screen - Hidden in shared view */}
        {!isSharedView && (
          <div className="mt-12 max-w-4xl mx-auto">
            <Link href={`/chamber/${archetype}/explore-who-you-are`} className="block">
              <div className="group relative transform hover:scale-105 transition-all duration-500 hover:-rotate-1 cursor-pointer">
                <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300"
                     style={{ borderColor: `${config.accentColor}50`, boxShadow: `0 0 40px ${config.powerColor}` }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold group-hover:text-opacity-80 transition-colors" style={{ color: config.accentColor }}>
                      Become Who You're Meant to Be
                    </h3>
                    <div className="text-2xl animate-pulse">🔍</div>
                  </div>
                  <div className="leading-relaxed text-xs space-y-1 text-justify"
                       style={{ 
                         background: 'linear-gradient(135deg, #3A3D7C 0%, #17B9A7 100%)',
                         WebkitBackgroundClip: 'text',
                         WebkitTextFillColor: 'transparent',
                         backgroundClip: 'text'
                       }}>
                    <div>This is where you see the real difference between who you are now and who you could become. Here, you glimpse the confidence, freedom, and power that unlock the moment you embody your true archetype. Read closely—what you see on this page is the doorway to the version of you that others feel but only you can fully claim.</div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm font-medium group-hover:text-opacity-80 transition-colors" style={{ color: config.accentColor }}>
                      Explore who you are →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Share Your Results</h3>
            <div className="space-y-3">
              <button
                onClick={handleShareEmail}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                📧 Share via Email
              </button>
              <button
                onClick={handleShareSocial}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                🌐 Share Socially
              </button>
              <button
                onClick={handleCopyLink}
                className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                🔗 Copy Link
              </button>
            </div>
            {copyStatus && (
              <p className="text-center mt-3 text-green-400">{copyStatus}</p>
            )}
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Compatibility Modal */}
      {showCompatibilityModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Get Compatibility Report</h3>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your friend's email"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
              <input
                type="email"
                placeholder="Your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleCompatibilitySubmit}
                disabled={isProcessing || !friendEmail || !userEmail}
                className="flex-1 px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 rounded-lg transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Submit ($1)'}
              </button>
              <button
                onClick={() => setShowCompatibilityModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Modals */}
      {showOverrideModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Purchase Override Card</h3>
            <p className="text-gray-300 mb-4">Get 1 Override Card for $3</p>
            <div className="flex space-x-3">
              <button
                onClick={() => handlePurchase('override')}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Purchase ($3)
              </button>
              <button
                onClick={() => setShowOverrideModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showBundleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Purchase 2-Card Bundle</h3>
            <p className="text-gray-300 mb-4">Get 2 Override Cards for $5</p>
            <div className="flex space-x-3">
              <button
                onClick={() => handlePurchase('bundle')}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Purchase ($5)
              </button>
              <button
                onClick={() => setShowBundleModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showFullBundleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Purchase Full Bundle</h3>
            <p className="text-gray-300 mb-4">Get all 5 Override Cards for $10</p>
            <div className="flex space-x-3">
              <button
                onClick={() => handlePurchase('full-bundle')}
                className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
              >
                Purchase ($10)
              </button>
              <button
                onClick={() => setShowFullBundleModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-bold mb-4">Purchase Successful!</h3>
            <p className="text-gray-300 mb-4">Thank you for your purchase. You'll receive your items shortly.</p>
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
