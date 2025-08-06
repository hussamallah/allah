'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

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
    description: 'Projection Node - The Light Vacuum',
    loop: 'Performing, craving validation, fear of invisibility.',
    needs: 'Endure stillness, embrace silence, survive rejection, burn the "show."',
    override: '★★☆☆☆',
    overrideDesc: 'You intervene when attention is misdirected—shining, performing, and calling others to center stage. You restore focus even if it makes you vulnerable.',
    resilience: '★★★☆☆',
    resilienceDesc: 'You endure rejection and criticism, staying bright amid darkness. Your sense of performance is unshakable, giving you the strength to shine even when ignored.',
    selfNullification: '★☆☆☆☆',
    selfNullificationDesc: 'After performing for others, you quietly withdraw, satisfied when attention is restored. You do not crave the spotlight, only the recognition of your worth.',
    witnessLogging: '★★★☆☆',
    witnessLoggingDesc: 'You detect invisibility instantly—who\'s unseen, who\'s ignored, where the light fails. You see the truth when others are lost in darkness.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You move easily between audiences, seeing all perspectives and helping others understand their worth. You are the spotlight, the illuminator, the revealer of truth.',
    edge: 'Watch for: Sometimes, you become lost in endless performance, refusing to let others have their moment. Notice when your light becomes blinding.',
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

export default function ArchetypeChamberPage() {
  const params = useParams()
  const router = useRouter()
  const archetype = params.archetype as string
  
  console.log('Accessing archetype:', archetype)
  console.log('Available archetypes:', Object.keys(archetypeConfigs))
  
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

  // Special case for Rebel chamber
  if (archetype.toLowerCase() === 'rebel') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* ... rest of rebel content ... */}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* ... rest of default content ... */}
    </div>
  )
}