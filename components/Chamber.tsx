'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import LandingPageTracker from './LandingPageTracker'
import ConversionTracker from './ConversionTracker'

// Complete archetype configurations from the original Chamber component
const archetypeConfigs = {
  seeker: {
    name: '🧠 SEEKER',
    color: '#4c1d95',
    primaryColor: '#4c1d95',
    secondaryColor: '#000000',
    accentColor: '#7c3aed',
    glowColor: 'rgba(124, 58, 237, 0.5)',
    powerColor: 'rgba(124, 58, 237, 0.3)',
    description: 'Void Node — You, Becoming the One Who Dissolves the Illusion',
    loop: 'Endless seeking, never arriving, fear of emptiness.',
    needs: 'Stop seeking, face the void, surrender to silence, burn the hunger for answers.',
    override: '★★★★★',
    overrideDesc: 'You don\'t let lies live long. You spot the fake, the false, the flawed—and you act. Even when it disrupts everything. You\'d rather destroy comfort than live blind.',
    resilience: '★★★★★',
    resilienceDesc: 'You recover from things others don\'t even talk about. Silence, endings, erasure—these are your teachers. You return from absence sharper, carrying truths that others left behind.',
    selfNullification: '★★★★★',
    selfNullificationDesc: 'You know when to vanish. It\'s not escape—it\'s a tool. You leave spaces so you can see them clearly again. When needed, you dissolve from memory and wait until it\'s time to re-enter with power.',
    witnessLogging: '★★★★★',
    witnessLoggingDesc: 'You catch what no one else sees. A shift in tone. A missing comma. A lie in a look. You track the cracks before they form. Your gift is quiet vigilance.',
    adaptability: '★★★★★',
    adaptabilityDesc: 'Uncertainty is your fuel. Where others freeze, you move. Where others doubt, you test. You don\'t need structure to act—you\'re the one who finds order inside collapse.',
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
    overrideDesc: 'You intervene when boundaries are crossed—protecting, defending, and calling out violations. You restore safety even if it makes you unpopular.',
    resilience: '★★★★★',
    resilienceDesc: 'You endure threats and protect others, staying strong amid danger. Your sense of protection is unshakable, giving you the strength to guard even the most vulnerable.',
    selfNullification: '★★★★☆',
    selfNullificationDesc: 'After protecting others, you quietly withdraw, satisfied when safety is restored. You do not crave recognition, only the security of those you guard.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You detect threats instantly—who\'s dangerous, who\'s vulnerable, where the system fails. You see the truth when others are lost in confusion.',
    adaptability: '★★★☆☆',
    adaptabilityDesc: 'You adjust your protective strategies based on the situation, seeing all angles and helping others understand the risks. You are the guardian, the defender, the protector of truth.',
    edge: 'Watch for: Sometimes, you become overprotective, refusing to let others face their own challenges. Notice when your protection becomes control.',
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
    override: '★★★☆☆',
    overrideDesc: 'You intervene when relationships are strained—connecting, harmonizing, and calling both sides to unity. You restore connection even if it makes you vulnerable.',
    resilience: '★★★★☆',
    resilienceDesc: 'You endure conflicts and emotional storms, staying connected amid chaos. Your sense of partnership is unshakable, giving you the strength to bridge even the hardest divides.',
    selfNullification: '★★★★☆',
    selfNullificationDesc: 'After connecting others, you quietly withdraw, satisfied when harmony is restored. You do not crave the spotlight, only the unity of those you love.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You detect disconnection instantly—who\'s isolated, who\'s hurting, where the bridge fails. You see the truth when others are lost in conflict.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You move easily between people, seeing all perspectives and helping others understand one another. You are the partner, the connector, the harmonizer of truth.',
    edge: 'Watch for: Sometimes, you become lost in endless connection, refusing to let others face their own conflicts. Notice when your harmony becomes avoidance.',
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
    override: '★★☆☆☆',
    overrideDesc: 'You intervene when systems are broken—disrupting, challenging, and calling out corruption. You restore justice even if it makes you dangerous.',
    resilience: '★★★★☆',
    resilienceDesc: 'You endure oppression and resistance, staying strong amid chaos. Your sense of rebellion is unshakable, giving you the strength to fight even the most powerful.',
    selfNullification: '★★☆☆☆',
    selfNullificationDesc: 'After disrupting systems, you quietly withdraw, satisfied when justice is restored. You do not crave recognition, only the freedom of those you fight for.',
    witnessLogging: '★★★☆☆',
    witnessLoggingDesc: 'You detect corruption instantly—who\'s oppressed, who\'s corrupt, where the system fails. You see the truth when others are lost in lies.',
    adaptability: '★★★★★',
    adaptabilityDesc: 'You move easily between battles, seeing all perspectives and helping others understand the fight. You are the rebel, the disruptor, the liberator of truth.',
    edge: 'Watch for: Sometimes, you become lost in endless rebellion, refusing to let others find peace. Notice when your disruption becomes destruction.',
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
    selfNullification: '★★★☆☆',
    selfNullificationDesc: 'After the conflict, you quietly withdraw, satisfied when peace is restored. You do not crave the credit, only the resolution.',
    witnessLogging: '★★★★☆',
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
    override: '★★★☆☆',
    overrideDesc: 'You don\'t just see problems—you see what comes next. You imagine whole systems, trends, or futures. Your insight helps people shift, prepare, or even start over.',
    resilience: '★★★☆☆',
    resilienceDesc: 'You\'ve been doubted, misunderstood, or dismissed for dreaming too big. But you keep going. You learn fast from failed ideas and always have another path ready.',
    selfNullification: '★★★☆☆',
    selfNullificationDesc: 'You disappear when the world gets too noisy—retreating to sketch, build, or imagine. You need time alone to construct new realities, and that solitude is sacred.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You sense changes before they happen. You notice what others don\'t—subtle signals in mood, speech, design, or culture. You follow threads no one else sees yet.',
    adaptability: '★★★★★',
    adaptabilityDesc: 'You jump into new tools, roles, or industries without fear. Your brain adjusts quickly, often seeing how things connect faster than most people.',
    edge: 'Sometimes you move so fast that the present slips away. You might neglect what\'s right in front of you while chasing the next idea. Your vision is your gift—but it only matters if it gets built.',
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
    override: '★★★★☆',
    overrideDesc: 'You\'re the fixer in the background. You restore what\'s broken, patch what\'s forgotten, and rebuild what others leave behind. You don\'t wait for thanks—you just act.',
    resilience: '★★★★★',
    resilienceDesc: 'You endure exhaustion, loneliness, and long hours without recognition. What keeps you going isn\'t praise—it\'s the need to hold everything together.',
    selfNullification: '★★★★★',
    selfNullificationDesc: 'You\'re used to disappearing. You do the work, but you don\'t demand the spotlight. You often measure yourself by usefulness, not visibility—and it leaves others blind to your value.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You don\'t miss a detail. You track who needs what, what\'s breaking down, and what deadlines are slipping. Others rely on your memory, even if they don\'t say it.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You step into roles no one else wants. Whether it\'s cleaning up a mess or taking care of the small stuff that keeps the world turning, you move without complaint.',
    edge: 'Sometimes, you serve until you disappear. Be careful not to erase yourself in the name of being helpful. Service is sacred—but only if it doesn\'t cost you your core.',
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
    overrideDesc: 'You redirect attention, reveal secrets at the perfect time, and change the flow of a situation without being seen as the cause. Your control isn\'t loud—it\'s perfectly placed.',
    resilience: '★★★☆☆',
    resilienceDesc: 'You rebuild identity through reinvention. Even after loss, shame, or exposure, you shapeshift again. Each time stronger. Each time smoother. You always have a new card to play.',
    selfNullification: '★★★★☆',
    selfNullificationDesc: 'You mastered vanishing. You can enter any role, any space, and disappear behind the function you serve. But behind that skill, there\'s a risk—no one sees the real you if you stay hidden too long.',
    witnessLogging: '★★★★★',
    witnessLoggingDesc: 'You catch the hidden codes. Group dynamics, secret motives, changing alliances—you read it all in silence. You log tension with your body before your mind even names it.',
    adaptability: '★★★★★',
    adaptabilityDesc: 'You become whatever\'s needed to stay in motion. New names, new roles, new skins. You can lead one day, vanish the next. This ability makes you untouchable—but it also risks isolation.',
    edge: 'Sometimes, you wear the mask so long you forget who placed it. Notice when flexibility becomes erasure. You can adapt—but don\'t forget the real face behind the shape.',
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
    description: 'Wanderer Node — You, Becoming the Flux-Walker of Possibility',
    loop: 'Constant movement, avoiding commitment, fear of settling.',
    needs: 'Find anchor, commit to place, burn the need to wander.',
    override: '★★☆☆☆',
    overrideDesc: 'You disrupt loops, spot when things are stuck, and become the breath of new motion. Your timing is your weapon—you move just before the system cracks, forcing change without warning.',
    resilience: '★★★☆☆',
    resilienceDesc: 'No matter how many shifts, jobs, friendships, or identities—you rebuild. You adapt fast, accept loss, and make strength from the freedom others fear. You\'re not fragile; you\'re frictionless.',
    selfNullification: '★★★☆☆',
    selfNullificationDesc: 'You vanish when needed—pulling away from center stage, letting others lead, observing from a safe distance. You protect your core by being unseen. But vanish too long, and no one finds you.',
    witnessLogging: '★★★☆☆',
    witnessLoggingDesc: 'You track the motion under everything. You feel the emotional temperature, sense what\'s coming before it arrives. You don\'t need data to know. Your body logs it all.',
    adaptability: '★★★★★',
    adaptabilityDesc: 'You don\'t cling. You shift. Whether roles, ideas, people, or paths—you bend to survive and explore. Others see indecision; you know it\'s sensing. What\'s next is your specialty.',
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
    override: '★★★★★',
    overrideDesc: 'You don\'t just give—you regenerate. When people around you need help, your instincts activate. You offer what\'s missing. Whether it\'s time, food, effort, or space, you often carry what others forget to ask for.',
    resilience: '★★★★☆',
    resilienceDesc: 'Even when drained, you find a way to keep going. You adapt, recover, and keep showing up—even if no one notices. Your strength comes from repetition and care under pressure, not bursts of glory.',
    selfNullification: '★★★☆☆',
    selfNullificationDesc: 'Sometimes, you vanish—not because you\'re weak, but because you\'re full. You\'ve given too much and silence becomes your armor. You know how to hide in plain sight to protect your energy.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You detect other people\'s needs before they say anything. You notice the small tells—tired eyes, shifting tones, long pauses. You track who needs what, even when it\'s unspoken.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You adjust to group needs quickly. You move between roles, tasks, and expectations without breaking. It might seem invisible, but your flexibility is often what holds the entire system together.',
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
    override: '★★★★☆',
    overrideDesc: 'You bring order to chaos. People turn to you when direction is unclear. You naturally create structure—whether through words, plans, or presence. Even if you\'re quiet, people sense your certainty.',
    resilience: '★★★★★',
    resilienceDesc: 'You don\'t just survive pressure—you stabilize inside it. When things go wrong, you don\'t flinch. Your inner compass stays firm. Others might react—you\'re already calculating the path through.',
    selfNullification: '★★☆☆☆',
    selfNullificationDesc: 'You rarely step back, but when you do, it\'s deliberate. You withdraw from noise to reset and regain power. But sometimes, this withdrawal cuts you off from the softer signals others need you to catch.',
    witnessLogging: '★★★★☆',
    witnessLoggingDesc: 'You see the long arc—the trends, the movements, the tipping points. But your wide vision can miss the subtle. While you\'re charting the big map, the whispers nearby may go unheard.',
    adaptability: '★★★☆☆',
    adaptabilityDesc: 'You know how to shift roles without losing your throne. Whether adjusting to lead, support, or observe, your adaptability is never weakness—it\'s leadership in motion.',
    edge: 'Sometimes, your clarity turns to rigidity. You may push your truth so hard that you miss what others need. The danger isn\'t in power—it\'s forgetting that others hold truth, too.',
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
}

// Main Chamber Component - Original structure from quizEngineIntegration.tsx
export default function Chamber({ archetype, rIndex, triggers, triggerCounts }: {
  archetype: string
  rIndex: number
  triggers: string[]
  triggerCounts: Record<string, number>
}) {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const archetypeParam = (params?.archetype as string) || archetype
  const isSharedView = searchParams?.get('shared') === 'true'
  
  const config = archetypeConfigs[archetypeParam.toLowerCase() as keyof typeof archetypeConfigs] || archetypeConfigs.visionary
  
  // Quiz results state
  const [quizResults, setQuizResults] = useState<any>(null)
  const [profileCode, setProfileCode] = useState<string>('')
  const [lineVerdicts, setLineVerdicts] = useState<Record<string, string>>({})
  const [lineConfidence, setLineConfidence] = useState<Record<string, string>>({})
  
  // State management
  const [showShareModal, setShowShareModal] = useState(false)
  const [showCompatibilityModal, setShowCompatibilityModal] = useState(false)
  const [showOverrideModal, setShowOverrideModal] = useState(false)
  const [showBundleModal, setShowBundleModal] = useState(false)
  const [showFullBundleModal, setShowFullBundleModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [friendEmail, setFriendEmail] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')

  // Flip state for trait cards
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({
    override: false,
    resilience: false,
    selfNullification: false,
    witnessLogging: false,
    adaptability: false
  })

  // Handle card flip
  const handleCardFlip = (cardKey: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }))
  }

  // Handle copy link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyStatus('Link copied!')
      setTimeout(() => setCopyStatus(''), 2000)
    } catch (err) {
      setCopyStatus('Failed to copy')
      setTimeout(() => setCopyStatus(''), 2000)
    }
  }

  // Handle email sharing
  const handleShareEmail = () => {
    const subject = `Check out my ${config.name} results!`
    const body = `I just discovered I'm a ${config.name} archetype. Here's what that means:\n\n${config.description}\n\nView my full results: ${window.location.href}`
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    setShowShareModal(false)
  }

  // Handle social sharing
  const handleShareSocial = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I'm a ${config.name}!`,
          text: config.description,
          url: window.location.href
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      handleCopyLink()
    }
    setShowShareModal(false)
  }

  // Load quiz results on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try to load Quiz V2 results first
      const v2Results = localStorage.getItem('quiz_v2_results')
      if (v2Results) {
        try {
          const results = JSON.parse(v2Results)
          setQuizResults(results)
          setProfileCode(results.profileCode || '')
          setLineVerdicts(results.lineVerdicts || {})
          setLineConfidence(results.confidence || {})
          console.log('📊 Quiz V2 results loaded:', results)
        } catch (error) {
          console.error('Error parsing Quiz V2 results:', error)
        }
      } else {
        // Fallback to legacy quiz results
        const legacyResults = localStorage.getItem('quiz_results')
        if (legacyResults) {
          try {
            const results = JSON.parse(legacyResults)
            setQuizResults(results)
            // Legacy results might have different structure
            console.log('📊 Legacy quiz results loaded:', results)
          } catch (error) {
            console.error('Error parsing legacy quiz results:', error)
          }
        }
      }
    }
  }, [archetypeParam])

  // Handle compatibility submission
  const handleCompatibilitySubmit = async () => {
    if (!friendEmail || !userEmail) return
    
    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setShowCompatibilityModal(false)
    setShowConfirmationModal(true)
  }

  // Handle purchase
  const handlePurchase = (type: string) => {
    setShowConfirmationModal(true)
    // Close other modals
    setShowOverrideModal(false)
    setShowBundleModal(false)
    setShowFullBundleModal(false)
  }

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

        {/* 7 Lines Results - Dynamic Display */}
        {quizResults && profileCode ? (
          <div className="max-w-6xl mx-auto mb-12">
            {/* Profile Code Display */}
            <div className="bg-gradient-to-r from-gray-900/40 to-gray-800/40 border border-gray-500/50 rounded-2xl p-8 backdrop-blur-sm mb-8">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: config.color }}>
                Your Complete Profile Code
              </h3>
              <div className="text-center">
                <div className="inline-block bg-gray-900/80 text-white text-5xl font-mono font-bold px-12 py-6 rounded-xl tracking-widest border-2 border-gray-600/50"
                     style={{ boxShadow: `0 0 30px ${config.color}50` }}>
                  {profileCode}
                </div>
                <p className="text-gray-400 mt-4 text-lg">
                  This 7-character code represents your complete personality profile across all 7 lines
                </p>
              </div>
            </div>

            {/* 7 Lines Assessment Results */}
            <div className="bg-gradient-to-r from-gray-900/40 to-gray-800/40 border border-gray-500/50 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-center mb-8" style={{ color: config.color }}>
                Your 7 Lines Assessment Results
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {Object.entries(lineVerdicts).map(([line, verdict]) => {
                  const confidence = lineConfidence[line] || 'low'
                  const isLocked = confidence === 'face-lock'
                  const isCurrentArchetype = line.toLowerCase() === archetypeParam.toLowerCase()
                  
                  return (
                    <div 
                      key={line} 
                      className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        isLocked 
                          ? 'border-purple-500/70 bg-purple-900/20' 
                          : isCurrentArchetype
                          ? 'border-blue-500/70 bg-blue-900/20'
                          : 'border-gray-500/50 bg-gray-800/20'
                      }`}
                      style={{
                        boxShadow: isLocked 
                          ? '0 0 20px rgba(147, 51, 234, 0.3)' 
                          : isCurrentArchetype
                          ? `0 0 20px ${config.color}30`
                          : '0 0 10px rgba(75, 85, 99, 0.2)'
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-lg text-gray-200">{line}</h4>
                        {isLocked && (
                          <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                            Face-Locked
                          </span>
                        )}
                        {isCurrentArchetype && (
                          <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                            Your Family
                          </span>
                        )}
                      </div>
                      
                      <div className="text-center mb-4">
                        <span className={`inline-block w-16 h-16 rounded-full text-white font-bold text-2xl flex items-center justify-center ${
                          verdict === 'C' ? 'bg-blue-600' :
                          verdict === 'O' ? 'bg-orange-500' :
                          verdict === 'F' ? 'bg-red-600' :
                          'bg-gray-600'
                        }`}
                        style={{
                          boxShadow: verdict === 'C' ? '0 0 20px rgba(37, 99, 235, 0.5)' :
                                   verdict === 'O' ? '0 0 20px rgba(249, 115, 22, 0.5)' :
                                   verdict === 'F' ? '0 0 20px rgba(220, 38, 38, 0.5)' :
                                   '0 0 10px rgba(75, 85, 99, 0.3)'
                        }}>
                          {verdict || '?'}
                        </span>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-300 mb-2 font-medium">
                          {verdict === 'C' ? 'Control' :
                           verdict === 'O' ? 'Open' :
                           verdict === 'F' ? 'Flow' :
                           'Pending'}
                        </p>
                        <p className="text-xs text-gray-400">
                          Confidence: {confidence === 'high' ? 'High' : confidence === 'low' ? 'Low' : confidence === 'face-lock' ? 'Face-Locked' : 'Unknown'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Legend */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-600/30">
                <h4 className="font-semibold text-gray-200 mb-4 text-center">Legend:</h4>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-blue-600 rounded-full mr-2 shadow-lg"></span>
                    <span className="text-gray-300">C = Control (Structure, Boundaries)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-orange-500 rounded-full mr-2 shadow-lg"></span>
                    <span className="text-gray-300">O = Open (Flexibility, Adaptability)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-red-600 rounded-full mr-2 shadow-lg"></span>
                    <span className="text-gray-300">F = Flow (Movement, Change)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-purple-500 rounded-full mr-2 shadow-lg"></span>
                    <span className="text-gray-300">Face-Locked = Determined by Face Selection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Quiz Prompt for users without results */
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-gray-900/40 to-gray-800/40 border border-gray-500/50 rounded-2xl p-8 backdrop-blur-sm text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ color: config.color }}>
                Discover Your Complete Profile
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Take the quiz to unlock your personalized 7-line assessment and profile code. 
                See how your archetype fits into the bigger picture of your complete personality.
              </p>
              <Link 
                href="/quiz-v2"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                style={{ boxShadow: `0 0 20px ${config.color}30` }}
              >
                Take the Quiz Now
              </Link>
            </div>
          </div>
        )}

        {/* Pattern explanation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 border border-gray-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4" style={{ color: config.color }}>
              What These Traits Say About You
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Every answer you gave revealed the rhythm you live by: you give, you hold, and you provide. This isn't about personality—it's about survival patterns that became gifts. You didn't invent your traits. They were shaped by the quiet demands of everyone who needed you.
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

        {/* Attribute Grid Cards - WITH FLIP FUNCTIONALITY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {/* Override Card */}
          <div 
            className="perspective-1000 cursor-pointer"
            onClick={() => handleCardFlip('override')}
          >
            <div className={`transform-style-preserve-3d relative w-full h-64 transition-transform duration-700 ${
              flippedCards.override ? 'rotate-y-180' : ''
            }`}>
              {/* Front of card */}
              <div className="backface-hidden absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300 flex flex-col justify-center items-center text-center"
                   style={{ borderColor: `${config.color}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 mr-1">★</span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: config.color }}>Override</h3>
                <p className="text-sm text-gray-400">Click to see details</p>
              </div>
              
                             {/* Back of card */}
               <div className="backface-hidden rotate-y-180 absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 flex flex-col justify-center shadow-lg"
                    style={{ borderColor: `${config.color}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
                 <h3 className="text-lg font-bold mb-3" style={{ color: config.color }}>Override</h3>
                 <p className="text-sm text-gray-300 leading-relaxed">{config.overrideDesc}</p>
               </div>
            </div>
          </div>

          {/* Resilience Card */}
          <div 
            className="perspective-1000 cursor-pointer"
            onClick={() => handleCardFlip('resilience')}
          >
            <div className={`transform-style-preserve-3d relative w-full h-64 transition-transform duration-700 ${
              flippedCards.resilience ? 'rotate-y-180' : ''
            }`}>
              {/* Front of card */}
              <div className="backface-hidden absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300 flex flex-col justify-center items-center text-center"
                   style={{ borderColor: `${config.accentColor}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
                <div className="flex mb-4">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-yellow-400 mr-1">★</span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: config.accentColor }}>Resilience</h3>
                <p className="text-sm text-gray-400">Click to see details</p>
              </div>
              
                             {/* Back of card */}
               <div className="backface-hidden rotate-y-180 absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 flex flex-col justify-center shadow-lg"
                    style={{ borderColor: `${config.accentColor}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
                 <h3 className="text-lg font-bold mb-3" style={{ color: config.accentColor }}>Resilience</h3>
                 <p className="text-sm text-gray-300 leading-relaxed">{config.resilienceDesc}</p>
               </div>
            </div>
          </div>

          {/* Self-Nullification Card */}
          <div 
            className="perspective-1000 cursor-pointer"
            onClick={() => handleCardFlip('selfNullification')}
          >
            <div className={`transform-style-preserve-3d relative w-full h-64 transition-transform duration-700 ${
              flippedCards.selfNullification ? 'rotate-y-180' : ''
            }`}>
              {/* Front of card */}
              <div className="backface-hidden absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300 flex flex-col justify-center items-center text-center"
                   style={{ borderColor: `${config.powerColor}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
                <div className="flex mb-4">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-yellow-400 mr-1">★</span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: config.powerColor }}>Self-Nullification</h3>
                <p className="text-sm text-gray-400">Click to see details</p>
              </div>
              
                             {/* Back of card */}
               <div className="backface-hidden rotate-y-180 absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 flex flex-col justify-center shadow-lg"
                    style={{ borderColor: `${config.powerColor}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
                 <h3 className="text-lg font-bold mb-3" style={{ color: config.powerColor }}>Self-Nullification</h3>
                 <p className="text-sm text-gray-300 leading-relaxed">{config.selfNullificationDesc}</p>
               </div>
            </div>
          </div>

          {/* Witness/Logging Card */}
          <div 
            className="perspective-1000 cursor-pointer"
            onClick={() => handleCardFlip('witnessLogging')}
          >
            <div className={`transform-style-preserve-3d relative w-full h-64 transition-transform duration-700 ${
              flippedCards.witnessLogging ? 'rotate-y-180' : ''
            }`}>
              {/* Front of card */}
              <div className="backface-hidden absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300 flex flex-col justify-center items-center text-center"
                   style={{ borderColor: `${config.color}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
                <div className="flex mb-4">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-yellow-400 mr-1">★</span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: config.color }}>Witness/Logging</h3>
                <p className="text-sm text-gray-400">Click to see details</p>
              </div>
              
                             {/* Back of card */}
               <div className="backface-hidden rotate-y-180 absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 flex flex-col justify-center shadow-lg"
                    style={{ borderColor: `${config.color}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
                 <h3 className="text-lg font-bold mb-3" style={{ color: config.color }}>Witness/Logging</h3>
                 <p className="text-sm text-gray-300 leading-relaxed">{config.witnessLoggingDesc}</p>
               </div>
            </div>
          </div>

          {/* Adaptability Card */}
          <div 
            className="perspective-1000 cursor-pointer"
            onClick={() => handleCardFlip('adaptability')}
          >
            <div className={`transform-style-preserve-3d relative w-full h-64 transition-transform duration-700 ${
              flippedCards.adaptability ? 'rotate-y-180' : ''
            }`}>
              {/* Front of card */}
              <div className="backface-hidden absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300 flex flex-col justify-center items-center text-center"
                   style={{ borderColor: `${config.accentColor}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
                <div className="flex mb-4">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-yellow-400 mr-1">★</span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: config.accentColor }}>Adaptability</h3>
                <p className="text-sm text-gray-400">Click to see details</p>
              </div>
              
                             {/* Back of card */}
               <div className="backface-hidden rotate-y-180 absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-6 flex flex-col justify-center shadow-lg"
                    style={{ borderColor: `${config.accentColor}50`, boxShadow: `0 0 40px ${config.glowColor}` }}>
                 <h3 className="text-lg font-bold mb-3" style={{ color: config.accentColor }}>Adaptability</h3>
                 <p className="text-sm text-gray-300 leading-relaxed">{config.adaptabilityDesc}</p>
               </div>
            </div>
          </div>
        </div>

        {/* INVITE CARD - WITH NAVIGATION TO WHO-YOU-ARE */}
        <Link href={`/chamber/${archetypeParam}/who-you-are`} className="block">
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

        {/* WHO YOU ARE Card - Bottom of Screen - Hidden in shared view - WITH NAVIGATION TO EXPLORE-WHO-YOU-ARE */}
        {!isSharedView && (
          <div className="mt-12 max-w-4xl mx-auto">
            <Link href={`/chamber/${archetypeParam}/explore-who-you-are`} className="block">
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
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
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

      {/* CSS for 3D flip effect */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}
