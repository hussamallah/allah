export interface ArchetypeTraitConfig {
  name: string
  color: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  glowColor: string
  powerColor: string
  description: string
  loop: string
  needs: string
  override: string
  overrideDesc: string
  resilience: string
  resilienceDesc: string
  selfNullification: string
  selfNullificationDesc: string
  witnessLogging: string
  witnessLoggingDesc: string
  adaptability: string
  adaptabilityDesc: string
  edge: string
  rituals: string[]
}

export const archetypeTraitConfigs: Record<string, ArchetypeTraitConfig> = {
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
      'Void Walk (face the emptiness directly)',
      'Silence Burn (endure the quiet without answers)',
      'Seeker Death (kill the endless questioner)',
      'Mirror Burn (see the seeker in yourself)',
      'Name Surrender (drop "seeker" identity)',
      'Shadow Gift (integrate the finder)'
    ]
  },
  guardian: {
    name: '🛡️ GUARDIAN',
    color: '#1e40af',
    primaryColor: '#1e40af',
    secondaryColor: '#000000',
    accentColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    powerColor: 'rgba(59, 130, 246, 0.3)',
    description: 'Protection Node — You, Becoming the One Who Holds the Line',
    loop: 'Over-protecting, never receiving, fear of vulnerability.',
    needs: 'Let others protect you, become vulnerable, burn the need to shield.',
    override: '★★★☆☆',
    overrideDesc: 'You intervene when boundaries are crossed—defending, protecting, and calling others to account. You restore safety even if it makes you seem harsh.',
    resilience: '★★★★★',
    resilienceDesc: 'You endure attacks, criticism, or threats, staying strong amid chaos. Your sense of protection is unshakable, giving you the strength to guard even the most vulnerable.',
    selfNullification: '★★★★☆',
    selfNullificationDesc: 'After protecting others, you quietly withdraw, satisfied when safety is restored. You do not crave recognition, only the security of those you guard.',
    witnessLogging: '★★★★★',
    witnessLoggingDesc: 'You detect threats instantly—who\'s vulnerable, who\'s dangerous, where the system fails. You see the danger when others are lost in trust.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You adjust to group needs quickly. You move between roles, tasks, and expectations without breaking. It might seem invisible, but your flexibility is often what holds the entire system together.',
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
    witnessLoggingDesc: 'You notice when systems become rigid, when authority becomes corrupt, or when rules serve the wrong people. Your gift is seeing through the facade of order.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You thrive in chaos, finding opportunity in disruption. You adapt by breaking what doesn\'t work and building what does, always staying one step ahead of the system.',
    edge: 'Sometimes, you rebel against what\'s good for you. Notice when your opposition becomes reflexive, or when you destroy what you actually need.',
    rituals: [
      'Stillness Practice (learn to be still without breaking)',
      'Discipline Integration (choose structure that serves you)',
      'Consequence Ownership (face the results of your actions)',
      'Mirror Burn (see the rebel in yourself)',
      'Name Surrender (drop "rebel" identity)',
      'Shadow Gift (integrate the builder)'
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
    edge: 'Sometimes, you think instead of act. Notice when your analysis becomes paralysis, or when understanding becomes a substitute for doing.',
    rituals: [
      'Action Without Knowing (act before you understand)',
      'Uncertainty Embrace (lean into the unknown)',
      'Understanding Burn (let go of the need to know)',
      'Mirror Burn (see the sage in yourself)',
      'Name Surrender (drop "sage" identity)',
      'Shadow Gift (integrate the doer)'
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
    loop: 'Over-controlling, never trusting others, fear of chaos.',
    needs: 'Let others lead, become vulnerable, burn the need to control.',
    override: '★★★★★',
    overrideDesc: 'You create structure and command attention—naturally setting agendas and holding things together. People look to you for clarity and direction, even when chaos reigns.',
    resilience: '★★★★☆',
    resilienceDesc: 'You endure storms—standing firm under criticism, responsibility, or rebellion. You rarely yield to pressure, believing deeply in your core mission.',
    selfNullification: '★★☆☆☆',
    selfNullificationDesc: 'You seldom withdraw—your presence is needed and felt. But sometimes, this makes it hard to see what\'s happening outside your immediate circle.',
    witnessLogging: '★★★☆☆',
    witnessLoggingDesc: 'You see the big changes, but fine details can slip past. Your focus is on vision and order, sometimes missing quiet warnings or subtle cues.',
    adaptability: '★★★★☆',
    adaptabilityDesc: 'You adjust to group needs quickly. You move between roles, tasks, and expectations without breaking. It might seem invisible, but your flexibility is often what holds the entire system together.',
    edge: 'Sometimes, you control what doesn\'t need controlling. Notice when your leadership becomes micromanagement, or when you refuse help that would make you stronger.',
    rituals: [
      'Trust Ritual (let others lead without interference)',
      'Vulnerability Practice (show your weaknesses)',
      'Control Burn (let go of the need to manage everything)',
      'Mirror Burn (see the controller in yourself)',
      'Name Surrender (drop "sovereign" identity)',
      'Shadow Gift (integrate the collaborator)'
    ]
  }
}

export function getArchetypeTraitConfig(archetype: string): ArchetypeTraitConfig | null {
  return archetypeTraitConfigs[archetype.toLowerCase()] || null
}
