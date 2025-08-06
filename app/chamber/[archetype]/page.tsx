'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

import { useState, useEffect } from 'react'

import LandingPageTracker from '../../../components/LandingPageTracker'
import EnhancedPageTracker from '../../../components/EnhancedPageTracker'
import ConversionTracker from '../../../components/ConversionTracker'

const archetypeConfigs = {
  seeker: {
    name: '🧠 SEEKER',
    color: '#4c1d95',
    primaryColor: '#4c1d95',
    secondaryColor: '#000000',
    accentColor: '#7c3aed',
    glowColor: 'rgba(124, 58, 237, 0.5)',
    powerColor: 'rgba(124, 58, 237, 0.3)',
    description: 'Seeker Node (You, Becoming the Breaker)',
    loop: 'Endless seeking, never arriving, fear of emptiness.',
    needs: 'Stop seeking, face the void, surrender to silence, burn the hunger for answers.',
    override: '★★★★★',
    overrideDesc: 'You see the flaw in any pattern, refuse to accept illusions, and will end what is false—even if it disrupts everything.',
    resilience: '★★★★☆',
    resilienceDesc: 'You recover from emptiness, collapse, or being forgotten. Loss makes you sharper, not weaker—you return with ideas that others miss.',
    selfNullification: '★★★★★',
    selfNullificationDesc: 'You know when to step out of the spotlight, disappearing from conflict or memory. You survive by becoming invisible until it\'s time to act.',
    witnessLogging: '★★★★★',
    witnessLoggingDesc: 'You always catch the detail others ignore, spotting every clue, error, or shift. Nothing escapes your attention—not even hidden motives.',
    adaptability: '★★★★★',
    adaptabilityDesc: 'You\'re comfortable with uncertainty, able to adjust instantly in new situations. You thrive in chaos and see opportunity where others freeze.',
    futureSelf: '★★★★★',
    futureSelfDesc: 'When the moment calls for it, you become the person who resets the system. Whether it\'s a team, relationship, or crisis—you bring it back to order. Not through control, but through presence.',
    edge: 'You can vanish too long. Sometimes, hiding becomes habit, and silence becomes avoidance. The danger isn\'t disappearance—it\'s forgetting to come back.',
    rituals: [
      'Night Walk (face the emptiness you avoid)',
      'Death Ritual (kill the seeker within)',
      'Silent Meal (eat without seeking distraction)',
      'Shadow Recording (confess what you hide)',
      'Timed Burn (exhaust the seeking loop)',
      'Name Surrender (lose your identity)'
    ]
  },
  guardian: {
    name: '🛡️ GUARDIAN',
    color: '#1e3a8a',
    primaryColor: '#1e3a8a',
    secondaryColor: '#000000',
    accentColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    powerColor: 'rgba(59, 130, 246, 0.3)',
    description: 'Anchor Node - The Boundary Fire',
    loop: 'Overprotection, fear of loss, clinging to boundaries.',
    needs: 'Surrender control, expose vulnerability, trust the void, burn the need to "save."',
    override: '★★★☆☆',
    overrideDesc: 'You step in decisively when needed, holding boundaries, stopping harmful cycles, and protecting what matters—even if it brings conflict or resistance. People rely on your presence to restore order and safety.',
    resilience: '★★★★★',
    resilienceDesc: 'When others collapse, you remain unshaken. You have an unbreakable core that survives loss, betrayal, or upheaval—transforming hardship into a new foundation. When storms come, you become the anchor for all.',
    selfNullification: '★★☆☆☆',
    selfNullificationDesc: 'You withdraw from noise and drama, not from weakness, but from a deep sense of timing. You can fade into the background without resentment, waiting for the right moment to act or re-emerge.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You are always watching. Small changes, forgotten promises, shifts in people\'s moods—nothing escapes you. Your memory and attention to detail create an unbroken record of what truly happened, even as others rewrite the past.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You move between stability and action, shifting gears as situations demand. You remain yourself under pressure, but know when to soften or harden, keeping your values as your inner compass.',
    edge: 'Sometimes, your need to protect can become control. Notice when you hold on too long or refuse help, isolating yourself behind your own walls.',
    rituals: [
      'Mirror Burn (face own limits, see the mask)',
      'Night Walk (alone, outside comfort, face fear)',
      'Name Surrender (release "protector" identity)',
      'Silent Meal (be with self, drop service)',
      'Death Ritual (ritualize the end of the overprotective self)',
      'Shadow Gift (integrate vulnerability as strength)'
    ]
  },
  partner: {
    name: '🤝 PARTNER',
    color: '#e11d48',
    primaryColor: '#e11d48',
    secondaryColor: '#000000',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    powerColor: 'rgba(244, 63, 94, 0.3)',
    description: 'Living Bridge Node - The Harmonizing Force',
    loop: 'Over-connecting, losing self in others, fear of disconnection.',
    needs: 'Tune your own frequency, become a source of harmony, burn the need to merge.',
    override: '★★☆☆☆',
    overrideDesc: 'You rarely force outcomes, but when bridges burn, you are the one who repairs them—restoring communication, smoothing over wounds, and reminding people how to trust each other again.',
    resilience: '★★★★☆',
    resilienceDesc: 'Loss, separation, or disappointment do not break you; you process, grieve, and then begin quietly weaving new connections, always searching for what can be mended or born from pain.',
    selfNullification: '★★★★☆',
    selfNullificationDesc: 'You dissolve into groups, sometimes forgetting yourself, always focused on harmony. You put aside ego to ensure the whole keeps moving, even if it means hiding your needs.',
    witnessLogging: '★★★★★',
    witnessLoggingDesc: 'You feel the emotional weather in any room, sensing silent grief, joy, or tension. You notice unspoken needs, holding the invisible threads others miss.',
    adaptability: '★★★★★',
    adaptabilityDesc: 'You thrive among difference—shifting between cultures, family systems, and friendships—always finding your place, adapting to what each relationship needs to survive.',
    edge: 'Sometimes, you vanish into others\' needs, losing your voice. Notice when your urge to heal keeps you trapped in unhealthy ties or silences your own truth.',
    rituals: [
      'Resonance Scan (tune to emotional frequency without merging)',
      'Mirroring Pulse (intentional resonance and feedback loops)',
      'Sync Entry (active connection creation through breath)',
      'Group Breath (amplifying group resonance exponentially)',
      'Echo Exchange (true emotional mirroring and deep connection)'
    ]
  },
  spotlight: {
    name: '🌟 SPOTLIGHT',
    color: '#f59e0b',
    primaryColor: '#f59e0b',
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    powerColor: 'rgba(251, 191, 36, 0.3)',
    description: 'Spotlight Node (You, Becoming the Center of Gravity)',
    loop: 'Performing, craving validation, fear of invisibility.',
    needs: 'Endure stillness, embrace silence, survive rejection, burn the "show."',
    override: '★★★★★',
    overrideDesc: 'You magnetize attention and set the tempo. When you walk in, rooms reorganize. Your words and moods ripple outward, influencing group energy, direction, and even conflict—whether you want it or not.',
    resilience: '★★★☆☆',
    resilienceDesc: 'You handle both applause and attack, absorbing praise or criticism. You recover from embarrassment or failure, but emotional wounds from public setbacks cut deeper than you admit.',
    selfNullification: '★★★☆☆',
    selfNullificationDesc: 'You never fully vanish; even in silence, your presence is felt. But you can quiet yourself to observe, giving others a turn before reclaiming center stage.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You read the social atmosphere instantly—what will land, what will fall flat, who\'s in, who\'s out. You know when to perform and when to pivot.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You shift personas, style, or voice as needed, blending performance and authenticity. You reinvent yourself often, adapting to expectations while keeping your core magnetic.',
    edge: 'Sometimes, you mistake attention for connection. Notice when you perform instead of relate, or when the need to be seen clouds your judgment of what\'s true.',
    rituals: [
      'Public Freeze (be seen, then still, no performance)',
      'Voice Release (release unfiltered voice, break stage self)',
      'Timed Burn (overact, then stop—all masks fall)',
      'Silent Meal (be present without audience)',
      'Heat Stand (withstand attention/pressure physically)',
      'Name Surrender (drop "performer" identity)'
    ]
  },
  rebel: {
    name: '⚔️ REBEL',
    color: '#dc2626',
    primaryColor: '#dc2626',
    secondaryColor: '#000000',
    accentColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    powerColor: 'rgba(239, 68, 68, 0.3)',
    description: 'Disruption Node - The Unbreakable Wall',
    loop: 'Opposition for its own sake, attachment to chaos, fear of order.',
    needs: 'Choose disruption consciously, learn stillness, integrate discipline, own consequences.',
    override: '★★★★☆',
    overrideDesc: 'You disrupt the expected. In any setting, you break inertia—challenging leaders, calling out hypocrisy, or launching new cycles when old ones become stale.',
    resilience: '★★★★☆',
    resilienceDesc: 'Rejection, chaos, or exile do not faze you. You build yourself anew after each fall, using each rupture as creative fuel, never letting defeat stick for long.',
    selfNullification: '★★★☆☆',
    selfNullificationDesc: 'You slip through cracks and loopholes, working from shadows when direct action fails. You can become invisible to power, only to emerge elsewhere and set things moving.',
    witnessLogging: '★★★☆☆',
    witnessLoggingDesc: 'You sense tension, stagnation, or injustice—feeling when things need a shake-up. You know who\'s holding power and who needs a voice, spotting where revolt can start.',
    adaptability: '★★★★★',
    adaptabilityDesc: 'You thrive amid chaos, navigating shifting alliances, uncertainty, and upheaval—always finding your leverage, always landing on your feet.',
    edge: 'Sometimes, you create conflict for its own sake. Notice when your urge to break things is a reaction to boredom, not necessity, and when you burn bridges that might serve you later.',
    rituals: [
      'Social Disruption (test true power of challenge)',
      'Opposite Day (practice obedience, calm)',
      'Death Ritual (bury the old chaos-loop)',
      'Mirror Burn (see self as source of disruption)',
      'Cold Water Override (discipline through discomfort)',
      'Body Mark (display the flaw, then erase)'
    ]
  },
  equalizer: {
    name: '⚖️ EQUALIZER',
    color: '#0d9488',
    primaryColor: '#0d9488',
    secondaryColor: '#000000',
    accentColor: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.5)',
    powerColor: 'rgba(20, 184, 166, 0.3)',
    description: 'Arbiter Node (You, Becoming the Scale)',
    loop: 'Sometimes, you become lost in endless mediation, refusing to make final judgments even when needed. Notice when your fairness becomes avoidance of decisive action.',
    needs: 'Become the arbiter, make final judgments, burn the need for endless mediation.',
    override: '★★★☆☆',
    overrideDesc: 'You intervene when disputes arise—mediating, defusing, and calling both sides to account. You restore peace even if it makes you unpopular.',
    resilience: '★★★★☆',
    resilienceDesc: 'You endure conflicts and strong emotions, staying calm amid chaos. Your sense of justice is unshakable, giving you the strength to arbitrate even the hardest disputes.',
    selfNullification: '★★★★☆',
    selfNullificationDesc: 'After the conflict, you quietly withdraw, satisfied when peace is restored. You do not crave the credit, only the resolution.',
    witnessLogging: '★★★★★',
    witnessLoggingDesc: 'You detect injustice instantly—who\'s wronged, who\'s wronging, where the system fails. You see the truth when others are lost in arguments.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You move easily between groups, seeing all perspectives and helping others understand one another. You are the arbiter, the judge, the translator of truth.',
    edge: 'Watch for: Sometimes, you become lost in endless mediation, refusing to make final judgments even when needed. Notice when your fairness becomes avoidance of decisive action.',
    rituals: [
      'Judgment Call (make a final decision, no appeal)',
      'Authority Walk (speak with final authority)',
      'Death Ritual (kill the endless mediator)',
      'Silent Meal (practice decisive presence)',
      'Shadow Recording (confess your true judgments)',
      'Name Surrender (drop "mediator" identity)'
    ]
  },
  sage: {
    name: '🧙 SAGE',
    color: '#059669',
    primaryColor: '#059669',
    secondaryColor: '#000000',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    powerColor: 'rgba(16, 185, 129, 0.3)',
    description: 'Wisdom Node - The Silent Oracle',
    loop: 'Over-thinking, analysis paralysis, fear of action.',
    needs: 'Act without knowing, embrace uncertainty, burn the need to understand.',
    override: '★★★★☆',
    overrideDesc: 'You intervene when wisdom is needed—analyzing, understanding, and calling others to deeper insight. You restore clarity even if it makes you seem distant.',
    resilience: '★★★★☆',
    resilienceDesc: 'You endure confusion and complexity, staying wise amid chaos. Your sense of understanding is unshakable, giving you the strength to guide even the most lost.',
    selfNullification: '★★★★★',
    selfNullificationDesc: 'After sharing wisdom, you quietly withdraw, satisfied when understanding is restored. You do not crave recognition, only the clarity of those you guide.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You detect confusion instantly—who\'s lost, who\'s unclear, where the wisdom fails. You see the truth when others are lost in complexity.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You move easily between perspectives, seeing all angles and helping others understand the deeper truth. You are the sage, the wise one, the illuminator of truth.',
    edge: 'Watch for: Sometimes, you become lost in endless analysis, refusing to let others act. Notice when your wisdom becomes paralysis.',
    rituals: [
      'Blind Action (act without thinking)',
      'Opposite Day (act impulsively, not wisely)',
      'Mirror Burn (see the over-thinker)',
      'Silent Meal (be present without analysis)',
      'Death Ritual (kill the need to understand)',
      'Shadow Gift (integrate the impulsive self)'
    ]
  },
  mystic: {
    name: '🔮 MYSTIC',
    color: '#7c3aed',
    primaryColor: '#7c3aed',
    secondaryColor: '#000000',
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    powerColor: 'rgba(139, 92, 246, 0.3)',
    description: 'Transcendence Node - The Void Walker',
    loop: 'Escaping reality, spiritual bypassing, fear of embodiment.',
    needs: 'Embrace the physical, ground in reality, burn the need to transcend.',
    override: '★★★★☆',
    overrideDesc: 'You intervene when transcendence is needed—elevating, inspiring, and calling others to higher awareness. You restore connection even if it makes you seem otherworldly.',
    resilience: '★★★★★',
    resilienceDesc: 'You endure material limitations and spiritual challenges, staying transcendent amid chaos. Your sense of connection is unshakable, giving you the strength to guide even the most grounded.',
    selfNullification: '★★★★☆',
    selfNullificationDesc: 'After transcending reality, you quietly withdraw, satisfied when awareness is restored. You do not crave recognition, only the elevation of those you guide.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You detect spiritual poverty instantly—who\'s lost, who\'s disconnected, where the transcendence fails. You see the truth when others are lost in materialism.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You move easily between realms, seeing all perspectives and helping others understand the deeper truth. You are the mystic, the transcendent one, the connector of truth.',
    edge: 'Watch for: Sometimes, you become lost in endless transcendence, refusing to let others stay grounded. Notice when your elevation becomes escape.',
    rituals: [
      'Body Mark (embrace physical reality)',
      'Opposite Day (act materially, not spiritually)',
      'Mirror Burn (see the escapist)',
      'Silent Meal (be present in the body)',
      'Death Ritual (kill the need to transcend)',
      'Shadow Gift (integrate the embodied self)'
    ]
  },
  visionary: {
    name: '👁️ VISIONARY',
    color: '#4338ca',
    primaryColor: '#4338ca',
    secondaryColor: '#000000',
    accentColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.5)',
    powerColor: 'rgba(99, 102, 241, 0.3)',
    description: 'Visionary Node — You, Becoming the One Who Sees Ahead',
    loop: 'Sometimes, your eyes are on the horizon while the present burns behind you. Notice when your pursuit of the new means abandoning what still needs you.',
    needs: 'Embrace the present, ground your vision, burn the need to escape.',
    override: '★★★★★',
    overrideDesc: 'You see what doesn\'t yet exist—dreaming and describing futures others cannot imagine. Your ideas catalyze transformation, reshaping plans, companies, or communities.',
    resilience: '★★★☆☆',
    resilienceDesc: 'You rebound from mockery, mistakes, or failed dreams by inventing new ones. Criticism stings but never stops your mind from racing forward.',
    selfNullification: '★★★☆☆',
    selfNullificationDesc: 'You vanish to vision—retreating inward to plan, create, or forecast. You need solitude to gather the next big picture before unveiling it.',
    witnessLogging: '★★★★★',
    witnessLoggingDesc: 'You spot early signals of change—shifts in markets, moods, or politics—decoding the future from subtle hints no one else trusts yet.',
    adaptability: '★★★★★',
    adaptabilityDesc: 'You jump into new fields, roles, or technologies without fear, learning quickly and making sense of complexity faster than most.',
    edge: 'Sometimes, your eyes are on the horizon while the present burns behind you. Notice when your pursuit of the new means abandoning what still needs you.',
    rituals: [
      'Present Moment (stay in now, no future planning)',
      'Grounding Walk (connect vision to current reality)',
      'Mirror Burn (see the future-avoider)',
      'Silent Meal (be present without projection)',
      'Death Ritual (kill the need to escape)',
      'Shadow Gift (integrate the present self)'
    ]
  },
  servant: {
    name: '🏺 VESSEL',
    color: '#059669',
    primaryColor: '#059669',
    secondaryColor: '#000000',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    powerColor: 'rgba(16, 185, 129, 0.3)',
    description: 'Servant Node — You, Becoming the Silent Engine',
    loop: 'Endless serving, never receiving, fear of being seen.',
    needs: 'Stop serving, become the vessel, let others serve you, burn the need to be invisible.',
    override: '★★☆☆☆',
    overrideDesc: 'You lead by serving—fixing what\'s broken, restoring what\'s lost, often without reward or praise. You only push when no one else will, quietly rebuilding what others discard.',
    resilience: '★★★★★',
    resilienceDesc: 'You endure exhaustion, loneliness, or unacknowledged effort. Your ability to keep going, especially when others fade, gives you rare influence in crisis.',
    selfNullification: '★★★★★',
    selfNullificationDesc: 'You are content to be invisible. You work behind the scenes, letting others shine, measuring your worth by what gets done—not by who notices.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You track every resource, schedule, and responsibility, catching details others miss. Your care ensures the system survives, even in chaos.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You find ways to help in any context—taking on roles no one else wants, solving problems with humility and creativity.',
    edge: 'Sometimes, you serve until you\'re empty. Notice when giving becomes self-erasure, or when your value depends on being needed, not being whole.',
    rituals: [
      'Receive Ritual (allow others to serve you)',
      'Opposite Day (act in power, not service)',
      'Mirror Burn (see the over-servant)',
      'Silent Meal (be served, not serving)',
      'Death Ritual (kill the need to serve)',
      'Shadow Gift (integrate the powerful self)'
    ]
  },
  mask: {
    name: '🎭 MASK',
    color: '#6b7280',
    primaryColor: '#6b7280',
    secondaryColor: '#000000',
    accentColor: '#9ca3af',
    glowColor: 'rgba(156, 163, 175, 0.5)',
    powerColor: 'rgba(156, 163, 175, 0.3)',
    description: 'Mask Node — You, Becoming the Shapeshifter of Reality',
    loop: 'Sometimes, you lose yourself in your masks. Notice when your talent for adaptation prevents you from forming real, lasting identity or trust.',
    needs: 'Become the facade, master protection, burn the need to disappear.',
    override: '★★★☆☆',
    overrideDesc: 'You influence events from the wings—redirecting attention, hiding truths, or revealing secrets at precisely the right moment. Your power is subtle, but can change everything.',
    resilience: '★★★☆☆',
    resilienceDesc: 'You survive setbacks by shapeshifting—adapting your story, name, or appearance. Old wounds do not define you; you always have a new face.',
    selfNullification: '★★★★★',
    selfNullificationDesc: 'You are the master of disappearance. You slip away unseen, blending into roles or spaces until the time is right to step forward.',
    witnessLogging: '★★★★★',
    witnessLoggingDesc: 'You notice unspoken codes and hidden dynamics. You read the undercurrents—detecting alliances, feuds, or secrets from a glance or stray word.',
    adaptability: '★★★★★',
    adaptabilityDesc: 'You thrive in the unknown—navigating changing groups, expectations, or threats. You become whatever is needed to survive or win.',
    edge: 'Watch for: Sometimes, you lose yourself in your masks. Notice when your talent for adaptation prevents you from forming real, lasting identity or trust.',
    rituals: [
      'Identity Reveal (show true self without adaptation)',
      'Opposite Day (act consistently, not adaptively)',
      'Mirror Burn (see the mask-wearer)',
      'Silent Meal (be present without shapeshifting)',
      'Death Ritual (kill the need to disappear)',
      'Shadow Gift (integrate the authentic self)'
    ]
  },
  wanderer: {
    name: '🧭 WANDERER',
    color: '#0891b2',
    primaryColor: '#0891b2',
    secondaryColor: '#000000',
    accentColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    powerColor: 'rgba(6, 182, 212, 0.3)',
    description: 'Flux Node - The Anchorless Trap',
    loop: 'Constant movement, avoiding commitment, fear of settling.',
    needs: 'Find anchor, commit to place, burn the need to wander.',
    override: '★★★☆☆',
    overrideDesc: 'You have the power to disrupt patterns, break cycles, and force change when needed. Your presence can override existing dynamics and create new possibilities.',
    resilience: '★★★★☆',
    resilienceDesc: 'You recover from setbacks, adapt to change, and maintain your core strength even under pressure. Challenges make you stronger, not weaker.',
    selfNullification: '★★★☆☆',
    selfNullificationDesc: 'You know when to step back, become invisible, or let others take center stage. This strategic withdrawal allows you to observe and act from the shadows.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You notice details others miss, remember what others forget, and see patterns in behavior and events that remain invisible to most.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You adjust to new situations, shift strategies when needed, and find ways to thrive in changing circumstances. Your flexibility is your strength.',
    edge: 'Sometimes, freedom is flight. Watch when your motion is avoidance. When running becomes a reflex. You aren\'t meant to be everywhere. You\'re meant to arrive.',
    rituals: [
      'Anchor Ritual (commit to one place)',
      'Opposite Day (act in commitment, not wandering)',
      'Mirror Burn (see the wanderer)',
      'Silent Meal (be present in one place)',
      'Death Ritual (kill the need to wander)',
      'Shadow Gift (integrate the settled self)'
    ]
  },
  provider: {
    name: '🛒 PROVIDER',
    color: '#b45309',
    primaryColor: '#b45309',
    secondaryColor: '#000000',
    accentColor: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.5)',
    powerColor: 'rgba(217, 119, 6, 0.3)',
    description: 'Harvest Node — You, Becoming the Well That Feeds the World',
    loop: 'Over-providing, neglecting own needs, fear of receiving.',
    needs: 'Receive, allow others to provide, burn the need to provide.',
    override: '★★★☆☆',
    overrideDesc: 'You have the power to disrupt patterns, break cycles, and force change when needed. Your presence can override existing dynamics and create new possibilities.',
    resilience: '★★★★☆',
    resilienceDesc: 'You recover from setbacks, adapt to change, and maintain your core strength even under pressure. Challenges make you stronger, not weaker.',
    selfNullification: '★★★☆☆',
    selfNullificationDesc: 'You know when to step back, become invisible, or let others take center stage. This strategic withdrawal allows you to observe and act from the shadows.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You notice details others miss, remember what others forget, and see patterns in behavior and events that remain invisible to most.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You adjust to new situations, shift strategies when needed, and find ways to thrive in changing circumstances. Your flexibility is your strength.',
    edge: 'You sometimes forget to refill yourself. Giving becomes identity—and if no one needs you, you feel lost. The trap isn\'t giving—it\'s believing your value depends on being needed.',
    rituals: [
      'Receive Ritual (allow others to provide for you)',
      'Opposite Day (act in receiving, not providing)',
      'Mirror Burn (see the over-provider)',
      'Silent Meal (be provided for)',
      'Death Ritual (kill the need to provide)',
      'Shadow Gift (integrate the receiving self)'
    ]
  },
  sovereign: {
    name: '👑 SOVEREIGN',
    color: '#f59e0b',
    primaryColor: '#f59e0b',
    secondaryColor: '#fbbf24',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    powerColor: 'rgba(251, 191, 36, 0.3)',
    description: 'Crown Node — You, Becoming the One Who Declares the Law',
    override: '★★★★★',
    overrideDesc: 'You create structure and command attention—naturally setting agendas and holding things together. People look to you for clarity and direction, even when chaos reigns.',
    resilience: '★★★★☆',
    resilienceDesc: 'You endure storms—standing firm under criticism, responsibility, or rebellion. You rarely yield to pressure, believing deeply in your core mission.',
    selfNullification: '★★☆☆☆',
    selfNullificationDesc: 'You seldom withdraw—your presence is needed and felt. But sometimes, this makes it hard to see what\'s happening outside your immediate circle.',
    witnessLogging: '★★★☆☆',
    witnessLoggingDesc: 'You see the big changes, but fine details can slip past. Your focus is on vision and order, sometimes missing quiet warnings or subtle cues.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You adjust tactics without losing your center—shifting plans, alliances, or even beliefs to meet the demands of the moment while keeping your purpose clear.',
    edge: 'Sometimes, your certainty can harden into stubbornness. Notice when leading becomes dictating, or when you lose sight of what others need to thrive.',
    loop: 'Over-controlling, fear of losing power, isolation.',
    needs: 'Share power, trust others, burn the need to control.',
    rituals: [
      'Power Share (delegate control to others)',
      'Opposite Day (act in trust, not control)',
      'Mirror Burn (see the controller)',
      'Silent Meal (be present without control)',
      'Death Ritual (kill the need to control)',
      'Shadow Gift (integrate the trusting self)'
    ]
  }
  // TODO: Add visionary config here once linting issue is resolved
  // The visionary explore-who-you-are page will work with the config in that file
}

export default function ArchetypeChamberPage() {
  const params = useParams()
  const router = useRouter()
  const archetype = params.archetype as string
  const [hasStarted, setHasStarted] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [pageStartTime] = useState(Date.now())
  const [showShareModal, setShowShareModal] = useState(false)
  const [showCompatibilityModal, setShowCompatibilityModal] = useState(false)
  const [showOverrideModal, setShowOverrideModal] = useState(false)
  const [showBundleModal, setShowBundleModal] = useState(false)
  const [showFullBundleModal, setShowFullBundleModal] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const [isSharedView, setIsSharedView] = useState(false)
  const [friendEmail, setFriendEmail] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  // Handle hydration issues caused by browser extensions
  useEffect(() => {
    setIsClient(true)
    
    // Check if this is a shared view
    const urlParams = new URLSearchParams(window.location.search)
    const isShared = urlParams.get('share') === 'true'
    setIsSharedView(isShared)
    
    console.log('🏛️ Chamber entered:', archetype, isShared ? '(shared view)' : '')
  }, [archetype])
  
  // Prevent navigation in shared view
  useEffect(() => {
    if (isSharedView) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        e.returnValue = ''
      }
      
      const handlePopState = (e: PopStateEvent) => {
        e.preventDefault()
        window.history.pushState(null, '', window.location.href)
      }
      
      window.addEventListener('beforeunload', handleBeforeUnload)
      window.addEventListener('popstate', handlePopState)
      
      // Push current state to prevent back navigation
      window.history.pushState(null, '', window.location.href)
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
        window.removeEventListener('popstate', handlePopState)
      }
    }
  }, [isSharedView])
  
  // Share functionality
  const handleCopyLink = async () => {
    // Create a unique share URL with a share parameter
    const shareUrl = `${window.location.origin}/chamber/${archetype}?share=true&id=${Date.now()}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      setCopyStatus('Failed to copy')
      setTimeout(() => setCopyStatus(''), 2000)
    }
  }

  const handleShareEmail = () => {
    const currentUrl = window.location.href
    const subject = `Check out my ${archetype.toUpperCase()} archetype results!`
    const body = `I just discovered my archetype and wanted to share it with you. Take a look: ${currentUrl}`
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    setCopyStatus('Email ready!')
    setTimeout(() => setCopyStatus(''), 2000)
  }

  const handleShareSocial = () => {
    const currentUrl = window.location.href
    const text = `Just discovered my ${archetype.toUpperCase()} archetype! Check it out: ${currentUrl}`
    if (navigator.share) {
      navigator.share({
        title: 'My Archetype Results',
        text: text,
        url: currentUrl
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(text)
      setCopyStatus('Shared!')
      setTimeout(() => setCopyStatus(''), 2000)
    }
  }

  const handleCompatibilitySubmit = async () => {
    if (!friendEmail || !userEmail) {
      alert('Please fill in both email addresses')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(friendEmail) || !emailRegex.test(userEmail)) {
      alert('Please enter valid email addresses')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would integrate with your payment processor
      // For now, we'll simulate a successful payment
      
      // Close the compatibility modal
      setShowCompatibilityModal(false)
      
      // Show confirmation
      setShowConfirmation(true)
      
      // Reset form
      setFriendEmail('')
      setUserEmail('')
      
      // Hide confirmation after 5 seconds
      setTimeout(() => setShowConfirmation(false), 5000)
      
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }
  
  console.log('Accessing archetype:', archetype)
  console.log('Available archetypes:', Object.keys(archetypeConfigs))
  
  // Don't render until client-side hydration is complete
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
  
  if (!archetype || !(archetype.toLowerCase() in archetypeConfigs)) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Archetype</h1>
          <p className="text-gray-400">The archetype "{archetype}" was not found.</p>
          <p className="text-gray-400 mt-2">Available: {Object.keys(archetypeConfigs).join(', ')}</p>
          <Link href="/chambers" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            ← Back to Chambers
          </Link>
        </div>
      </div>
    )
  }

  const config = archetypeConfigs[archetype.toLowerCase() as keyof typeof archetypeConfigs]

  // Special case for Seeker chamber - DISABLED to use normal layout with cards
  if (false && archetype.toLowerCase() === 'seeker') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Pulsing field overlay */}
          <div 
            className="absolute inset-0 animate-pulse opacity-10"
            style={{ 
              background: `radial-gradient(circle at center, #9D4EDD 0%, transparent 70%)`,
              animationDuration: '4s'
            }}
          />
          {/* Glitch particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-ping"
                style={{
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
          {/* Header with Animated Seeker Glyph */}
          <div className="text-center mb-16">
            {/* Animated Seeker Glyph */}
            <div className="text-8xl mb-6 animate-pulse" style={{ 
              animationDuration: '3s',
              filter: 'drop-shadow(0 0 20px #9D4EDD)'
            }}>
              🔮
            </div>
            
            {/* Glitching Title */}
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-wider relative group"
              style={{ 
                color: '#9D4EDD',
                textShadow: '0 0 30px #9D4EDD'
              }}
            >
              <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                SEEKER CHAMBER
              </span>
              {/* Glitch effect */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                    style={{ color: '#ff0080', transform: 'translate(2px, 2px)' }}>
                SEEKER CHAMBER
              </span>
            </h1>
            
            {/* Animated Subtitle */}
            <p className="text-2xl text-gray-300 mb-4 animate-fade-in">
              Seeker Node (You, Becoming the Breaker)
            </p>
            
            {/* Living prophecy text */}
            <div className="text-lg text-purple-300 mb-8 animate-pulse" style={{ animationDuration: '20s' }}>
              <span className="opacity-80">Understanding Your Pattern</span>
            </div>
            
            {/* Pattern explanation */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-purple-400">What These Traits Reveal About You</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Every answer you gave was a real reflection of your way of moving through life—not a guess, not an ideal.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The traits below are the core strengths and tendencies that show up in your actions, your decisions, and your responses—often before you even think about them.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  You didn't invent these patterns; they're the lines your experience has already drawn.
                </p>
              </div>
            </div>
            
            <div className="w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse" 
                 style={{ animationDuration: '4s' }}></div>
          </div>

















        </div>
      </div>
    )
  }

  // Special case for Guardian chamber - DISABLED to use normal layout with cards
  if (false && archetype.toLowerCase() === 'guardian') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Pulsing field overlay */}
          <div 
            className="absolute inset-0 animate-pulse opacity-10"
            style={{ 
              background: `radial-gradient(circle at center, #1e3a8a 0%, transparent 70%)`,
              animationDuration: '4s'
            }}
          />
          {/* Glitch particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-ping"
                style={{
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
          {/* Header with Animated Guardian Glyph */}
          <div className="text-center mb-16">
            {/* Animated Guardian Glyph */}
            <div className="text-8xl mb-6 animate-pulse" style={{ 
              animationDuration: '3s',
              filter: 'drop-shadow(0 0 20px #1e3a8a)'
            }}>
              🛡️
          </div>

            {/* Glitching Title */}
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-wider relative group"
              style={{
                color: '#1e3a8a',
                textShadow: '0 0 30px #1e3a8a'
              }}
            >
              <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                GUARDIAN CHAMBER
              </span>
              {/* Glitch effect */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                    style={{ color: '#3b82f6', transform: 'translate(2px, 2px)' }}>
                GUARDIAN CHAMBER
              </span>
            </h1>
            
            {/* Animated Subtitle */}
            <p className="text-2xl text-gray-300 mb-4 animate-fade-in">
              Guardian Node — You, Becoming the Wall That Holds
            </p>
            
            {/* Living prophecy text */}
            <div className="text-lg text-blue-300 mb-8 animate-pulse" style={{ animationDuration: '20s' }}>
              <span className="opacity-80">Understanding Your Pattern</span>
            </div>
            
            {/* Pattern explanation */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-blue-400">What These Traits Say About You</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Your answers show that you operate with strength, steadiness, and protection. You may not always be loud, but you are the one others depend on when things get difficult. These traits didn't appear out of nowhere—they're built from everything you've been through.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  You didn't invent your behavior patterns—they're how your experience trained you to survive.
                </p>
              </div>
            </div>
            
            <div className="w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse" 
                 style={{ animationDuration: '4s' }}></div>
          </div>

          







        </div>
      </div>
    )
  }

  // Special case for Partner chamber - DISABLED to use normal layout with cards
  if (false && archetype.toLowerCase() === 'partner') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Pulsing field overlay */}
          <div 
            className="absolute inset-0 animate-pulse opacity-10"
            style={{ 
              background: `radial-gradient(circle at center, #e11d48 0%, transparent 70%)`,
              animationDuration: '4s'
            }}
          />
          {/* Glitch particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-red-400 rounded-full opacity-30 animate-ping"
                style={{
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
          {/* Header with Animated Partner Glyph */}
          <div className="text-center mb-16">
            {/* Animated Partner Glyph */}
            <div className="text-8xl mb-6 animate-pulse" style={{ 
              animationDuration: '3s',
              filter: 'drop-shadow(0 0 20px #e11d48)'
            }}>
              🤝
            </div>
            
            {/* Glitching Title */}
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-wider relative group"
              style={{ 
                color: '#e11d48',
                textShadow: '0 0 30px #e11d48'
              }}
            >
              <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                PARTNER CHAMBER
              </span>
              {/* Glitch effect */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                    style={{ color: '#f43f5e', transform: 'translate(2px, 2px)' }}>
                PARTNER CHAMBER
              </span>
            </h1>
            
            {/* Animated Subtitle */}
            <p className="text-2xl text-gray-300 mb-4 animate-fade-in">
              Partner Node — You, Becoming the Mirror That Connects
            </p>
            
            {/* Living prophecy text */}
            <div className="text-lg text-red-300 mb-8 animate-pulse" style={{ animationDuration: '20s' }}>
              <span className="opacity-80">Understanding Your Pattern</span>
            </div>
            
            {/* Pattern explanation */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-red-400">What These Traits Say About You</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Your answers show that you're deeply relational—tuned in to others, emotionally aware, and often the glue that holds connections together. These traits come from your lived experience of listening, adjusting, and carrying emotional weight for others.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  You didn't invent these tendencies—they were formed through relationships, expectations, and survival.
                </p>
              </div>
            </div>
            
            <div className="w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-red-600 to-pink-600 animate-pulse" 
                 style={{ animationDuration: '4s' }}></div>
          </div>

          {/* Hexagonal Attribute Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-start">
            {/* Connection (Override) Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-2xl p-6 hover:border-red-400 transition-all duration-300 min-w-[280px]"
                   style={{ boxShadow: '0 0 30px rgba(225, 29, 72, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    Connection (Override)
                  </h3>
                  <div className="text-2xl">🤝</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You rarely force outcomes, but you repair them. When things fall apart—friendships, teams, conversations—you're the one who brings people back together. You smooth over tension and help people trust again.
                </p>
              </div>
            </div>

            {/* Resilience Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:-rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-2xl p-6 hover:border-red-400 transition-all duration-300 min-w-[280px]"
                   style={{ boxShadow: '0 0 30px rgba(225, 29, 72, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    Resilience
                  </h3>
                  <div className="text-2xl">🛡️</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You've been through emotional loss, distance, and disconnection. You grieve quietly, but recover by reconnecting. You find new ways to support others without needing the spotlight.
                </p>
              </div>
            </div>

            {/* Self-Holding (Self-Nullification) Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-2xl p-6 hover:border-red-400 transition-all duration-300 min-w-[280px]"
                   style={{ boxShadow: '0 0 30px rgba(225, 29, 72, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    Self-Holding (Self-Nullification)
                  </h3>
                  <div className="text-2xl">👻</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You tend to blend in to keep peace. You might suppress your own voice to maintain harmony. This helps others feel safe, but can lead to your needs being overlooked—even by yourself.
                </p>
              </div>
            </div>

            {/* Emotional Awareness (Witness/Logging) Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:-rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-2xl p-6 hover:border-red-400 transition-all duration-300 min-w-[280px]"
                   style={{ boxShadow: '0 0 30px rgba(225, 29, 72, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    Emotional Awareness (Witness/Logging)
                  </h3>
                  <div className="text-2xl">👁️</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You sense what others feel, even if they don't say it. You can feel joy, fear, grief, or love before anyone speaks. This helps you show up with care—but it can also drain you.
                </p>
              </div>
            </div>

            {/* Adaptability Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-2xl p-6 hover:border-red-400 transition-all duration-300 min-w-[280px]"
                   style={{ boxShadow: '0 0 30px rgba(225, 29, 72, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    Adaptability
                  </h3>
                  <div className="text-2xl">🔄</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You shift easily between people, settings, and emotional roles. You're the bridge between different groups and dynamics. You adapt quickly, but still hold your sense of purpose.
                </p>
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
          </div>
          




                    {/* NEW: Navigation Buttons - Hidden in shared view */}
          {!isSharedView && (
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            {/* The Path Button */}
            <Link href={`/chamber/${archetype}/the-path`} className="block">
              <div className="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="bg-gradient-to-r from-red-900/60 to-pink-900/60 backdrop-blur-md border-2 rounded-2xl p-8 hover:border-opacity-70 transition-all duration-300 min-w-[280px] text-center"
                     style={{ 
                       borderColor: '#e11d4850',
                       boxShadow: '0 0 40px rgba(225, 29, 72, 0.3)'
                     }}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-3xl mr-3">🛤️</div>
                    <h3 className="text-2xl font-bold group-hover:text-opacity-80 transition-colors text-red-400">
                      THE PATH
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Explore your journey and discover the stages of your archetype's evolution
                  </p>
                  <div className="text-center">
                    <span className="text-sm font-medium group-hover:text-opacity-80 transition-colors text-pink-400">
                      Begin your journey →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Who You Are Button */}
            <Link href={`/chamber/${archetype}/explore-who-you-are`} className="block">
              <div className="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="bg-gradient-to-r from-blue-900/60 to-purple-900/60 backdrop-blur-md border-2 rounded-2xl p-8 hover:border-opacity-70 transition-all duration-300 min-w-[280px] text-center"
                     style={{ 
                       borderColor: '#8b5cf650',
                       boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)'
                     }}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-3xl mr-3">🔍</div>
                    <h3 className="text-2xl font-bold group-hover:text-opacity-80 transition-colors text-blue-400">
                      WHO YOU ARE
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Dive deeper into your archetype and discover your unique characteristics
                  </p>
                  <div className="text-center">
                    <span className="text-sm font-medium group-hover:text-opacity-80 transition-colors text-purple-400">
                      Explore yourself →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          )}


        </div>
      </div>
    )
  }

  // Special case for Spotlight chamber - DISABLED to use normal layout with cards
  if (false && archetype.toLowerCase() === 'spotlight') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Pulsing field overlay */}
          <div 
            className="absolute inset-0 animate-pulse opacity-10"
            style={{ 
              background: `radial-gradient(circle at center, #f59e0b 0%, transparent 70%)`,
              animationDuration: '4s'
            }}
          />
          {/* Glitch particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30 animate-ping"
                style={{
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
          {/* Header with Animated Spotlight Glyph */}
          <div className="text-center mb-16">
            {/* Animated Spotlight Glyph */}
            <div className="text-8xl mb-6 animate-pulse" style={{ 
              animationDuration: '3s',
              filter: 'drop-shadow(0 0 20px #f59e0b)'
            }}>
              🌟
            </div>
            
            {/* Glitching Title */}
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-wider relative group"
              style={{ 
                color: '#f59e0b',
                textShadow: '0 0 30px #f59e0b'
              }}
            >
              <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                SPOTLIGHT CHAMBER
              </span>
              {/* Glitch effect */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                    style={{ color: '#fbbf24', transform: 'translate(2px, 2px)' }}>
                SPOTLIGHT CHAMBER
              </span>
            </h1>
            
            {/* Animated Subtitle */}
            <p className="text-2xl text-gray-300 mb-4 animate-fade-in">
              Spotlight Node — You, Becoming the Center of Attention
            </p>
            
            {/* Living prophecy text */}
            <div className="text-lg text-yellow-300 mb-8 animate-pulse" style={{ animationDuration: '20s' }}>
              <span className="opacity-80">Understanding Your Pattern</span>
            </div>
            
            {/* Pattern explanation */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">What These Traits Say About You</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Every answer you gave revealed how you naturally move through the world—this isn't a guess or personality type. These patterns show up in how you lead, connect, and respond—often before you realize it.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You didn't make up these traits. They formed through experience. You've been living them the whole time.
                </p>
              </div>
            </div>
            
            <div className="w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-yellow-600 to-orange-600 animate-pulse" 
                 style={{ animationDuration: '4s' }}></div>
          </div>

          {/* Hexagonal Attribute Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Command (Override) Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-yellow-500/50 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300"
                   style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    Command (Override)
                  </h3>
                  <div className="text-2xl">✨</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You naturally draw attention and set the tone. When you speak, move, or enter a room, others notice. You might not always mean to lead, but people still follow your energy.
                </p>
              </div>
            </div>

            {/* Resilience Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:-rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-yellow-500/50 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300"
                   style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    Resilience
                  </h3>
                  <div className="text-2xl">🔧</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You bounce back from criticism, pressure, or even burnout. It takes a lot to keep you down. While people may see your confidence, it's your emotional stamina that holds everything together.
                </p>
              </div>
            </div>

            {/* Self-Holding (Self-Nullification) Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-yellow-500/50 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300"
                   style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    Self-Holding (Self-Nullification)
                  </h3>
                  <div className="text-2xl">👻</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You know how to disappear when needed. Even though you're often in the spotlight, you can step back and go quiet when things get too loud. This is your way of staying in control—but it can lead to hiding.
                </p>
              </div>
            </div>

            {/* Reading the Room (Witness/Logging) Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:-rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-yellow-500/50 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300"
                   style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    Reading the Room (Witness/Logging)
                  </h3>
                  <div className="text-2xl">🔍</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You sense what's happening before others do. You pick up on body language, tone shifts, and emotional tension. You're often the first to know when something's off, but not always the first to react.
                </p>
              </div>
            </div>

            {/* Adaptability Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-yellow-500/50 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300"
                   style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    Adaptability
                  </h3>
                  <div className="text-2xl">🔄</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You can shift how you present yourself based on the group or situation. Whether it's style, tone, or posture, you adjust easily. But your ability to fit in doesn't mean you're fake—you know how to flex while staying true to yourself.
                </p>
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
          </div>


          




          {/* NEW: Navigation Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            {/* The Path Button */}
            <Link href={`/chamber/${archetype}/the-path`} className="block">
              <div className="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="bg-gradient-to-r from-yellow-900/60 to-orange-900/60 backdrop-blur-md border-2 rounded-2xl p-8 hover:border-opacity-70 transition-all duration-300 min-w-[280px] text-center"
                     style={{ 
                       borderColor: '#f59e0b50',
                       boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)'
                     }}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-3xl mr-3">🛤️</div>
                    <h3 className="text-2xl font-bold group-hover:text-opacity-80 transition-colors text-yellow-400">
                      THE PATH
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Explore your journey and discover the stages of your archetype's evolution
                  </p>
                  <div className="text-center">
                    <span className="text-sm font-medium group-hover:text-opacity-80 transition-colors text-orange-400">
                      Begin your journey →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Who You Are Button */}
            <Link href={`/chamber/${archetype}/explore-who-you-are`} className="block">
              <div className="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="bg-gradient-to-r from-blue-900/60 to-purple-900/60 backdrop-blur-md border-2 rounded-2xl p-8 hover:border-opacity-70 transition-all duration-300 min-w-[280px] text-center"
                     style={{ 
                       borderColor: '#8b5cf650',
                       boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)'
                     }}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-3xl mr-3">🔍</div>
                    <h3 className="text-2xl font-bold group-hover:text-opacity-80 transition-colors text-blue-400">
                      WHO YOU ARE
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Dive deeper into your archetype and discover your unique characteristics
                  </p>
                  <div className="text-center">
                    <span className="text-sm font-medium group-hover:text-opacity-80 transition-colors text-purple-400">
                      Explore yourself →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* NEW: Field Connection Section */}

        </div>
      </div>
    )
  }

  // Special case for Rebel chamber - DISABLED to use normal layout with cards
  if (false && archetype.toLowerCase() === 'rebel') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Pulsing field overlay */}
          <div 
            className="absolute inset-0 animate-pulse opacity-10"
            style={{ 
              background: `radial-gradient(circle at center, #dc2626 0%, transparent 70%)`,
              animationDuration: '4s'
            }}
          />
          {/* Glitch particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-red-400 rounded-full opacity-30 animate-ping"
                style={{
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
          {/* Header with Animated Rebel Glyph */}
          <div className="text-center mb-16">
            {/* Animated Rebel Glyph */}
            <div className="text-8xl mb-6 animate-pulse" style={{ 
              animationDuration: '3s',
              filter: 'drop-shadow(0 0 20px #dc2626)'
            }}>
              ⚔️
            </div>
            
            {/* Glitching Title */}
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-wider relative group"
              style={{ 
                color: '#dc2626',
                textShadow: '0 0 30px #dc2626'
              }}
            >
              <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
                REBEL CHAMBER
              </span>
              {/* Glitch effect */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                    style={{ color: '#ef4444', transform: 'translate(2px, 2px)' }}>
                REBEL CHAMBER
              </span>
            </h1>
            
            {/* Animated Subtitle */}
            <p className="text-2xl text-gray-300 mb-4 animate-fade-in">
              Rebel Node — You, Becoming the Disruptor
            </p>
            
            {/* Living prophecy text */}
            <div className="text-lg text-red-300 mb-8 animate-pulse" style={{ animationDuration: '20s' }}>
              <span className="opacity-80">Understanding Your Pattern</span>
            </div>
            
            {/* Pattern explanation */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-red-400">What These Traits Say About You</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Your answers show you are driven to challenge, question, and shake things up. You don't break things for fun—you break what doesn't work. You push against what feels fake, unfair, or stagnant. These traits weren't learned in books. They were built through tension, frustration, and a desire for better.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  You didn't invent these habits. They came from learning how to move when the system didn't make sense.
                </p>
              </div>
            </div>
            
            <div className="w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-red-600 to-red-700 animate-pulse" 
                 style={{ animationDuration: '4s' }}></div>
          </div>

          {/* Hexagonal Attribute Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-start">
            {/* Disruption (Override) Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-2xl p-6 hover:border-red-400 transition-all duration-300 min-w-[280px]"
                   style={{ boxShadow: '0 0 30px rgba(220, 38, 38, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    Disruption (Override)
                  </h3>
                  <div className="text-2xl">⚡</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You notice what isn't working before others do—and you're often the one who says it out loud. You speak up, challenge the room, and break patterns that others are afraid to touch.
                </p>
              </div>
            </div>

            {/* Resilience Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:-rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-2xl p-6 hover:border-red-400 transition-all duration-300 min-w-[280px]"
                   style={{ boxShadow: '0 0 30px rgba(220, 38, 38, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    Resilience
                  </h3>
                  <div className="text-2xl">🛡️</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You've been rejected, pushed out, or misunderstood. But it never stops you for long. You rebuild after setbacks with more clarity and force. You use failure as fuel.
                </p>
              </div>
            </div>

            {/* Self-Holding (Self-Nullification) Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-2xl p-6 hover:border-red-400 transition-all duration-300 min-w-[280px]"
                   style={{ boxShadow: '0 0 30px rgba(220, 38, 38, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    Self-Holding (Self-Nullification)
                  </h3>
                  <div className="text-2xl">👻</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Sometimes, when direct action fails, you disappear on purpose. You watch from the edges, plan from the shadows, and wait for the right moment. You're strategic—but sometimes it becomes hiding.
                </p>
              </div>
            </div>

            {/* Awareness (Witness/Logging) Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:-rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-2xl p-6 hover:border-red-400 transition-all duration-300 min-w-[280px]"
                   style={{ boxShadow: '0 0 30px rgba(220, 38, 38, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    Awareness (Witness/Logging)
                  </h3>
                  <div className="text-2xl">👁️</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You can feel when a group is stuck. You sense when something's about to break. You notice who's in charge, who's quiet, and who's ready to move. You look for the fault line.
                </p>
              </div>
            </div>

            {/* Adaptability Card */}
            <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
              <div className="bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-2xl p-6 hover:border-red-400 transition-all duration-300 min-w-[280px]"
                   style={{ boxShadow: '0 0 30px rgba(220, 38, 38, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    Adaptability
                  </h3>
                  <div className="text-2xl">🔄</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  You adjust fast—when things change, you find the crack and move through it. You're not afraid to shift, switch sides, or change tactics. It's what keeps you in motion.
                </p>
              </div>
            </div>

            {/* INVITE CARD */}
            <Link href={`/chamber/${archetype}/who-you-are`} className="block">
              <div className="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="bg-black/60 backdrop-blur-md border-2 border-yellow-500/50 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 min-w-[280px]"
                     style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-red-800 group-hover:text-red-700 transition-colors">
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
          </div>


          




          {/* NEW: Navigation Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            {/* The Path Button */}
            <Link href={`/chamber/${archetype}/the-path`} className="block">
              <div className="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="bg-gradient-to-r from-red-900/60 to-red-800/60 backdrop-blur-md border-2 rounded-2xl p-8 hover:border-opacity-70 transition-all duration-300 min-w-[280px] text-center"
                     style={{ 
                       borderColor: '#dc262650',
                       boxShadow: '0 0 40px rgba(220, 38, 38, 0.3)'
                     }}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-3xl mr-3">🛤️</div>
                    <h3 className="text-2xl font-bold group-hover:text-opacity-80 transition-colors text-red-400">
                      THE PATH
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Explore your journey and discover the stages of your archetype's evolution
                  </p>
                  <div className="text-center">
                    <span className="text-sm font-medium group-hover:text-opacity-80 transition-colors text-red-300">
                      Begin your journey →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Who You Are Button */}
            <Link href={`/chamber/${archetype}/explore-who-you-are`} className="block">
              <div className="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="bg-gradient-to-r from-red-900/60 to-red-800/60 backdrop-blur-md border-2 rounded-2xl p-8 hover:border-opacity-70 transition-all duration-300 min-w-[280px] text-center"
                     style={{ 
                       borderColor: '#ef444450',
                       boxShadow: '0 0 40px rgba(239, 68, 68, 0.3)'
                     }}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-3xl mr-3">🔍</div>
                    <h3 className="text-2xl font-bold group-hover:text-opacity-80 transition-colors text-red-300">
                      WHO YOU ARE
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Deep dive into your core identity and understand your true nature
                  </p>
                  <div className="text-center">
                    <span className="text-sm font-medium group-hover:text-opacity-80 transition-colors text-red-300">
                      Explore who you are →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Default return (fallback for all other archetypes)  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Add conversion tracking */}
      <ConversionTracker 
        pageType="chamber"
        archetype={archetype}
        onConversion={(event) => {
          console.log(' Chamber conversion:', event)
        }}
      />
      
      {/* Enhanced page tracking */}
      <EnhancedPageTracker 
        pageType="landing"
        archetype={archetype}
        onMetricsUpdate={(metrics) => {
          console.log('📊 Enhanced chamber metrics:', metrics)
        }}
      />
      
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
          <div className="text-8xl mb-6 animate-pulse" style={{ 
            animationDuration: '3s',
            filter: `drop-shadow(0 0 20px ${config.color})`
          }}>
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
            <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                  style={{ color: config.accentColor, transform: 'translate(2px, 2px)' }}>
              {config.name.split(' ').slice(1).join(' ')} CHAMBER
            </span>
          </h1>
          
          {/* Animated Subtitle */}
          <p className="text-2xl text-gray-300 mb-4 animate-fade-in">
            {config.description}
          </p>
          
          {/* Living prophecy text */}
          <div className="text-lg mb-8 animate-pulse" style={{ 
            color: config.color,
            animationDuration: '20s' 
          }}>
            <span className="opacity-80">Understanding Your Pattern</span>
          </div>
          
          {/* Pattern explanation */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 border border-gray-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4" style={{ color: config.color }}>
                {archetype.toLowerCase() === 'visionary' || archetype.toLowerCase() === 'servant' || archetype.toLowerCase() === 'mask' || archetype.toLowerCase() === 'wanderer' || archetype.toLowerCase() === 'provider' || archetype.toLowerCase() === 'sovereign' || archetype.toLowerCase() === 'seeker' ? 'What These Traits Say About You' : 'What These Traits Reveal About You'}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {archetype.toLowerCase() === 'visionary' 
                  ? 'Your answers reveal that you live in the future before anyone else can see it. You spot changes early, connect patterns others miss, and build visions of what could be. You\'ve been called "ahead of your time"—and you are. But your insight didn\'t come from ease. It was shaped by needing to escape, to reinvent, to imagine something better.'
                  : archetype.toLowerCase() === 'servant'
                  ? 'Your answers reveal a pattern of invisible strength. You\'re someone who shows up when no one else will. You carry what others drop. Not because you\'re asked—but because you see what needs to be done.'
                  : archetype.toLowerCase() === 'mask'
                  ? 'Your answers reveal a gift few admit to having: you adapt so well, others forget you\'re adapting. You read rooms, shift tone, change appearance—not to deceive, but to survive. You became many versions of yourself to stay safe, or useful, or close.'
                  : archetype.toLowerCase() === 'wanderer'
                  ? 'You never belonged in one place—so you learned to belong everywhere. Movement became your method. Change, your constant. When others rooted down, you kept shifting, not to escape, but to understand. You know how to adapt before you\'re asked, how to walk away before it costs you too much.'
                  : archetype.toLowerCase() === 'provider'
                  ? 'Every answer you gave revealed the rhythm you live by: you give, you hold, and you provide. This isn\'t about personality—it\'s about survival patterns that became gifts. You didn\'t invent your traits. They were shaped by the quiet demands of everyone who needed you.'
                  : archetype.toLowerCase() === 'sovereign'
                  ? 'Every answer you gave showed a natural authority—not loud, but undeniable. You didn\'t pick leadership. It arrived in your presence. This isn\'t about control—it\'s about the internal order you hold when everyone else spins.'
                  : archetype.toLowerCase() === 'seeker'
                  ? 'Every answer you gave revealed something rare: a pattern of disappearing just enough to see the truth beneath. You don\'t follow maps—you question why they were drawn in the first place. You dissolve noise, symbols, even memory—until the real shape emerges.'
                  : 'Every answer you gave was a real reflection of your way of moving through life—not a guess, not an ideal.'
                }
              </p>
              <p className="text-gray-300 leading-relaxed">
                {archetype.toLowerCase() === 'visionary'
                  ? 'You didn\'t ask to be different. You just saw what no one else could yet.'
                  : archetype.toLowerCase() === 'servant'
                  ? 'This didn\'t come from ease. It was shaped in moments where the weight had to be held, no matter what. You didn\'t invent these traits—they were carved into you by necessity.'
                  : archetype.toLowerCase() === 'mask'
                  ? 'This isn\'t fake. It\'s a skill forged from exposure. You didn\'t invent these masks—they were survival before they were strategy.'
                  : archetype.toLowerCase() === 'wanderer'
                  ? 'This doesn\'t make you lost. It makes you the map. You didn\'t invent this pattern—it was survival first, freedom second.'
                  : archetype.toLowerCase() === 'provider'
                  ? ''
                  : archetype.toLowerCase() === 'sovereign'
                  ? 'You didn\'t invent this strength. It formed from moments when silence needed voice, and you spoke.'
                  : archetype.toLowerCase() === 'seeker'
                  ? 'You didn\'t choose this path. It chose you the first time silence revealed more than words.'
                  : 'You didn\'t invent these patterns; they\'re the lines your experience has already drawn.'
                }
              </p>
            </div>
          </div>
          
          <div className="w-32 h-1 mx-auto mb-8 animate-pulse" 
               style={{ 
                 background: `linear-gradient(to right, ${config.color}, ${config.accentColor})`,
                 animationDuration: '4s' 
               }}></div>
        </div>



        {/* Hexagonal Attribute Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-start">
          {/* Override Card */}
          <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
            <div className="bg-black/60 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300"
                 style={{ 
                   borderColor: `${config.color}50`,
                   boxShadow: `0 0 30px ${config.glowColor}`
                 }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold group-hover:text-opacity-80 transition-colors" style={{ color: config.color }}>
                  {archetype.toLowerCase() === 'visionary' ? 'Vision Mapping (Override)' : archetype.toLowerCase() === 'servant' ? 'Repair Instinct (Override)' : archetype.toLowerCase() === 'mask' ? 'Subtle Override (Override)' : archetype.toLowerCase() === 'wanderer' ? 'Override' : archetype.toLowerCase() === 'provider' ? 'Sustaining Power (Override)' : archetype.toLowerCase() === 'sovereign' ? 'Command Structure (Override)' : archetype.toLowerCase() === 'seeker' ? 'Command (Override)' : 'Override'}
                </h3>
                <div className="text-2xl">{archetype.toLowerCase() === 'visionary' ? '🔮' : archetype.toLowerCase() === 'servant' ? '🔧' : archetype.toLowerCase() === 'mask' ? '🎭' : archetype.toLowerCase() === 'wanderer' ? '🧭' : archetype.toLowerCase() === 'provider' ? '✨' : archetype.toLowerCase() === 'sovereign' ? '✨' : archetype.toLowerCase() === 'seeker' ? '⚡' : '⚡'}</div>
              </div>
              <div className="flex mb-3">
                {((config as any).override || '★★★☆☆').split('').map((star: string, i: number) => (
                  <span key={i} className={`text-lg animate-pulse ${star === '★' ? 'text-yellow-400' : 'text-gray-600'}`} 
                        style={{ animationDelay: `${i * 0.2}s` }}>{star}</span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">
                {(config as any).overrideDesc || 'You have the power to disrupt patterns, break cycles, and force change when needed. Your presence can override existing dynamics and create new possibilities.'}
              </p>
            </div>
          </div>

          {/* Resilience Card */}
          <div className="group relative transform hover:scale-105 transition-all duration-500 hover:-rotate-1">
            <div className="bg-black/60 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300"
                 style={{ 
                   borderColor: `${config.color}50`,
                   boxShadow: `0 0 30px ${config.glowColor}`
                 }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold group-hover:text-opacity-80 transition-colors" style={{ color: config.color }}>
                  Resilience
                </h3>
                <div className="text-2xl">🛡️</div>
              </div>
              <div className="flex mb-3">
                {((config as any).resilience || '★★★★☆').split('').map((star: string, i: number) => (
                  <span key={i} className={`text-lg animate-pulse ${star === '★' ? 'text-yellow-400' : 'text-gray-600'}`} 
                        style={{ animationDelay: `${i * 0.2}s` }}>{star}</span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">
                {(config as any).resilienceDesc || 'You recover from setbacks, adapt to change, and maintain your core strength even under pressure. Challenges make you stronger, not weaker.'}
              </p>
            </div>
          </div>

          {/* Self-Nullification Card */}
          <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
            <div className="bg-black/60 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300"
                 style={{ 
                   borderColor: `${config.color}50`,
                   boxShadow: `0 0 30px ${config.glowColor}`
                 }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold group-hover:text-opacity-80 transition-colors" style={{ color: config.color }}>
                  {archetype.toLowerCase() === 'visionary' ? 'Inward Vision (Self-Nullification)' : archetype.toLowerCase() === 'provider' ? 'Withdrawal as Protection (Self-Nullification)' : archetype.toLowerCase() === 'sovereign' ? 'Strategic Withdrawal (Self-Nullification)' : archetype.toLowerCase() === 'seeker' ? 'Self-Holding (Self-Nullification)' : 'Self-Nullification'}
                </h3>
                <div className="text-2xl">👻</div>
              </div>
              <div className="flex mb-3">
                {((config as any).selfNullification || '★★★☆☆').split('').map((star: string, i: number) => (
                  <span key={i} className={`text-lg animate-pulse ${star === '★' ? 'text-yellow-400' : 'text-gray-600'}`} 
                        style={{ animationDelay: `${i * 0.2}s` }}>{star}</span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">
                {(config as any).selfNullificationDesc || 'You know when to step back, become invisible, or let others take center stage. This strategic withdrawal allows you to observe and act from the shadows.'}
              </p>
            </div>
          </div>

          {/* Witness/Logging Card */}
          <div className="group relative transform hover:scale-105 transition-all duration-500 hover:-rotate-1">
            <div className="bg-black/60 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300"
                 style={{ 
                   borderColor: `${config.color}50`,
                   boxShadow: `0 0 30px ${config.glowColor}`
                 }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold group-hover:text-opacity-80 transition-colors" style={{ color: config.color }}>
                  {archetype.toLowerCase() === 'visionary' ? 'Signal Tracking (Witness/Logging)' : archetype.toLowerCase() === 'servant' ? 'Witness / Logging' : archetype.toLowerCase() === 'mask' ? 'Witness / Logging' : archetype.toLowerCase() === 'wanderer' ? 'Witness / Logging' : archetype.toLowerCase() === 'provider' ? 'Silent Sensing (Witness/Logging)' : archetype.toLowerCase() === 'sovereign' ? 'Focused Vision (Witness/Logging)' : archetype.toLowerCase() === 'seeker' ? 'Awareness (Witness/Logging)' : 'Witness/Logging'}
                </h3>
                <div className="text-2xl">👁️</div>
              </div>
              <div className="flex mb-3">
                {((config as any).witnessLogging || '★★★★☆').split('').map((star: string, i: number) => (
                  <span key={i} className={`text-lg animate-pulse ${star === '★' ? 'text-yellow-400' : 'text-gray-600'}`} 
                        style={{ animationDelay: `${i * 0.2}s` }}>{star}</span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">
                {(config as any).witnessLoggingDesc || 'You notice details others miss, remember what others forget, and see patterns in behavior and events that remain invisible to most.'}
              </p>
            </div>
          </div>

          {/* Adaptability Card */}
          <div className="group relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
            <div className="bg-black/60 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300 min-w-[280px]"
                 style={{ 
                   borderColor: `${config.color}50`,
                   boxShadow: `0 0 30px ${config.glowColor}`
                 }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold group-hover:text-opacity-80 transition-colors" style={{ color: config.color }}>
                  Adaptability
                </h3>
                <div className="text-2xl">🔄</div>
              </div>
              <div className="flex mb-3">
                {((config as any).adaptability || '★★★★☆').split('').map((star: string, i: number) => (
                  <span key={i} className={`text-lg animate-pulse ${star === '★' ? 'text-yellow-400' : 'text-gray-600'}`} 
                        style={{ animationDelay: `${i * 0.2}s` }}>{star}</span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">
                {(config as any).adaptabilityDesc || 'You adjust to new situations, shift strategies when needed, and find ways to thrive in changing circumstances. Your flexibility is your strength.'}
              </p>
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
        </div>















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

        {/* Edge Warning - MOVED HERE to appear above "Become Who You're Meant to Be" */}
        {(config as any).edge && (
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 border rounded-2xl p-6 backdrop-blur-sm"
                 style={{ 
                   borderColor: `${config.color}30`,
                   boxShadow: `0 0 40px ${config.glowColor}`
                 }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: config.color }}>
                {archetype.toLowerCase() === 'visionary' || archetype.toLowerCase() === 'servant' || archetype.toLowerCase() === 'mask' || archetype.toLowerCase() === 'wanderer' || archetype.toLowerCase() === 'provider' || archetype.toLowerCase() === 'sovereign' || archetype.toLowerCase() === 'seeker' ? 'Things to Watch For' : 'Edge — Watch for:'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {(config as any).edge}
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
                   style={{ 
                     borderColor: `${config.accentColor}50`,
                     boxShadow: `0 0 40px ${config.powerColor}`
                   }}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold group-hover:text-opacity-80 transition-colors" style={{ color: config.accentColor }}>
                      Become Who You're Meant to Be
                  </h3>
                  <div className="text-2xl animate-pulse">🔍</div>
                </div>
                  <div className="leading-relaxed text-xs space-y-1 text-justify" style={{ background: 'linear-gradient(135deg, #3A3D7C 0%, #17B9A7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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

        {/* Compatibility Report Modal */}
        {showCompatibilityModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900/95 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Get Compatibility Report</h2>
                <p className="text-gray-400 text-sm">Send your friend an invite and unlock detailed compatibility insights</p>
        </div>

              <div className="space-y-4">
                {/* Friend's Email Input */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Enter your friend's email:
                  </label>
                  <input
                    type="email"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    placeholder="friend@example.com"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
          </div>

                {/* User's Email Input */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Enter your email to save your results:
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
        </div>

                {/* What You Get Section */}
                <div className="bg-gray-800/50 rounded-xl p-4 mt-6">
                  <h3 className="font-semibold mb-3" style={{ background: 'linear-gradient(135deg, #FF69B4, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>What You Get:</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2" style={{ color: '#FF69B4' }}>•</span>
                      <span>Side-by-side results as soon as both finish</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2" style={{ color: '#FF69B4' }}>•</span>
                      <span>In-depth compatibility score</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2" style={{ color: '#FF69B4' }}>•</span>
                      <span>Breakdown of strengths, clashes, and next-step tips</span>
                    </li>
                  </ul>
                </div>

                {/* Pay & Send Button */}
                <button 
                  onClick={handleCompatibilitySubmit}
                  disabled={isProcessing}
                  className="w-full group relative inline-block px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    background: 'linear-gradient(135deg, #FF69B4, #FF1493, #FF69B4)',
                    boxShadow: '0 0 30px rgba(255, 105, 180, 0.6), 0 0 60px rgba(255, 20, 147, 0.3)'
                  }}>
                  <span className="relative z-10 flex items-center justify-center">
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">💳</span>
                        Pay $1 & Send Invite
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{ background: 'linear-gradient(135deg, #FF1493, #FF69B4, #FF1493)' }}></div>
                </button>

                {/* Close Button */}
                <button 
                  onClick={() => setShowCompatibilityModal(false)}
                  className="w-full px-6 py-3 rounded-xl font-medium text-gray-400 hover:text-white transition-colors duration-300 border border-gray-700 hover:border-gray-600">
                  Cancel
                </button>
                </div>
              </div>
            </div>
        )}

        {/* Confirmation Toast */}
        {showConfirmation && (
          <div className="fixed top-4 right-4 bg-green-900/95 border border-green-500/50 rounded-xl p-6 max-w-sm z-50 transform transition-all duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-green-400 text-2xl">✅</span>
        </div>
              <div className="ml-3">
                <h3 className="text-green-300 font-semibold">Invite Sent!</h3>
                <p className="text-green-200 text-sm mt-1">
                  Your friend will get a test invite soon. Once they finish, your compatibility report unlocks automatically. You'll be notified by email.
                </p>
      </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900/95 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Share Your Results</h2>
                <p className="text-gray-400 text-sm">Choose how you'd like to share your archetype discovery</p>
              </div>
              
              <div className="space-y-4">
                {/* Copy Link Button */}
                <button 
                  onClick={handleCopyLink}
                  className="w-full group relative inline-block px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 transform bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                  style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}>
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-3 text-lg">🔗</span>
                    {copyStatus === 'Copied!' ? 'Copied!' : 'Copy Link'}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Share via Email Button */}
                <button 
                  onClick={handleShareEmail}
                  className="w-full group relative inline-block px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 transform bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600"
                  style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}>
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-3 text-lg">📧</span>
                    {copyStatus === 'Email ready!' ? 'Email ready!' : 'Share via Email'}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Share on Social Media Button */}
                <button 
                  onClick={handleShareSocial}
                  className="w-full group relative inline-block px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 transform bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600"
                  style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)' }}>
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-3 text-lg">📱</span>
                    {copyStatus === 'Shared!' ? 'Shared!' : 'Share on Social Media'}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setShowShareModal(false)}
                className="w-full mt-6 px-6 py-3 rounded-xl font-medium text-gray-400 hover:text-white transition-colors duration-300 border border-gray-700 hover:border-gray-600">
                Close
              </button>
            </div>
          </div>
        )}
    </div>
    </div>
  )
}
