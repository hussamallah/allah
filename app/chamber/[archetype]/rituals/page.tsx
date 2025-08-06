'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ChamberChat from '../../../../components/ChamberChat'

const archetypeConfigs = {
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
    description: 'Living Bridge Node - The Harmonizing Force ✨',
    loop: 'Over-connecting, losing self in others, fear of disconnection.',
    needs: 'Tune your own frequency, become a source of harmony, burn the need to merge.',
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
    description: 'Center of Gravity Node - The Beacon',
    loop: 'Performing, craving validation, fear of invisibility.',
    needs: 'Endure stillness, embrace silence, survive rejection, burn the "show."',
    rituals: [
      'Presence Beacon (claim your space, be fully seen)',
      'Voice Claim (make your voice impossible to ignore)',
      'Stage Burn (turn fear into fuel, let the heat reveal you)',
      'Light Reflection (face how others see you)',
      'Applause Listen (metabolize praise without shrinking)'
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
    description: 'Arbiter Node - The Scale',
    loop: 'Over-mediating, compulsive peacemaking, fear of decisive action.',
    needs: 'Become the arbiter, make final judgments, release endless mediation.',
    rituals: [
      'Judgment Call (make a final decision, no appeal)',
      'Authority Walk (speak with final authority)',
      'Death Ritual (kill the endless mediator)',
      'Silent Meal (practice decisive presence)',
      'Shadow Recording (confess your true judgments)',
      'Name Surrender (drop the "mediator" mask)'
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
    description: 'Future Node - The Now Snare',
    loop: 'Escaping present, fantasy loops, avoiding reality.',
    needs: 'Ground into now, face discomfort, integrate shadow, embody the vision.',
    rituals: [
      'Night Walk (face real darkness, not fantasy)',
      'Silent Meal (fully in the present)',
      'Mirror Burn (see illusion, return to real)',
      'Cold Water Override (physical grounding)',
      'Shadow Recording (confess hidden fears/escapes)',
      'Body Mark (embody vision, then erase)'
    ]
  },
  servant: {
    name: '🧤 SERVANT',
    color: '#059669',
    primaryColor: '#059669',
    secondaryColor: '#000000',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    powerColor: 'rgba(16, 185, 129, 0.3)',
            description: 'Submission Node - The Channel',
    loop: 'Self-erasure, compulsive service, fear of own needs/voice.',
    needs: 'Assert self, claim space, confront unworthiness, embrace personal law.',
    rituals: [
      'Voice Release (claim voice, release repression)',
      'Opposite Day (ask for, not give)',
      'Hunger Vigil (endure own need, survive)',
      'Shadow Gift (integrate selfishness as power)',
      'Public Freeze (occupy space, survive attention)',
      'Timed Burn (serve self, collapse pattern)'
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
    description: 'Facade Node - The Facade',
    loop: 'Sometimes, you lose yourself in your masks. Notice when your talent for adaptation prevents you from forming real, lasting identity or trust.',
    needs: 'Become the facade, master protection, burn the need to disappear.',
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
    loop: 'Restlessness, never settling, running from roots.',
    needs: 'Choose a point to stand, endure stillness, integrate root.',
    rituals: [
      'Night Walk (stand alone in stillness)',
      'Blind Walk (move without knowing, find core)',
      'Timed Burn (burn chaos, feel what stays)',
      'Silent Meal (sit, refuse motion)',
      'Heat Stand (endure single place, pressure)',
      'Name Surrender (drop the "seeker" mask)'
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
    description: 'Harvest Node - The Empty Table',
    loop: 'Over-giving, depletion, fear of emptiness, compulsive nurturing.',
    needs: 'Receive, survive hunger, integrate selfishness, trust abundance.',
    rituals: [
      'Hunger Vigil (endure emptiness, survive without giving)',
      'Shadow Gift (give to self, not others)',
      'Silent Meal (eat alone, receive)',
      'Mirror Burn (face depletion, see true source)',
      'Public Freeze (occupy space, don\'t serve)',
      'Opposite Day (ask, not give)'
    ]
  },
  sovereign: {
    name: '👑 SOVEREIGN',
    color: '#000000',
    primaryColor: '#000000',
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    powerColor: 'rgba(251, 191, 36, 0.3)',
    description: 'Crown Node - The Decree of Breath',
    loop: 'Over-control, isolation, fear of dependence, burden of power.',
    needs: 'Relinquish control, endure uncertainty, accept support, trust the field.',
    rituals: [
      'Blind Walk (lose control, trust senses)',
      'Public Freeze (be seen, not controlling)',
      'Opposite Day (receive, obey, yield)',
      'Heat Stand (physical surrender)',
      'Death Ritual (release old crown)',
      'Shadow Gift (own vulnerability)'
    ]
  },
  seeker: {
    name: '🧠 SEEKER',
    color: '#7c3aed',
    primaryColor: '#7c3aed',
    secondaryColor: '#000000',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    powerColor: 'rgba(168, 85, 247, 0.3)',
    description: 'Void Node - The Black Mirror',
    loop: 'Chronic seeking, emptiness addiction, refusing arrival.',
    needs: 'Rest in emptiness, stop seeking, embody what\'s found.',
    rituals: [
      'Night Walk (walk into darkness until urge to move dissolves)',
      'Death Ritual (eulogize seeking self, then sit in emptiness)',
      'Silent Meal (eat in utter silence, meet cravings with breath)',
      'Shadow Recording (admit what you\'re always seeking, listen in stillness)',
      'Timed Burn (obsess for 15 minutes, then drop everything)',
      'Name Surrender (write "I am the Seeker" until it feels empty)'
    ]
  }
}

const allRituals = {
  'Mirror Burn': {
    purpose: 'Face your mask directly. Burn through self-deception.',
    steps: [
      'Stand before a mirror. Lock eyes with yourself.',
      'Speak your archetype\'s pattern out loud ("I am always the helper / controller / rebel / victim," etc.).',
      'Repeat it, louder each time, without blinking.',
      'Keep going until it feels fake, empty, or painful.',
      'Suddenly go silent. Drop all expression. Stare until the urge to speak or act is gone.',
      'On your next out-breath, say: "This is not me. Law—emerge."',
      'Notice shifts in your face, body, or the room.',
      '**Anchor:** Press palm to heart. "When I press here, Law returns."'
    ]
  },
  'Night Walk': {
    purpose: 'Stand alone, dissolve fear, become the Law in darkness.',
    steps: [
      'Go outside alone at midnight or pre-dawn, leaving your phone behind.',
      'Walk in silence as your archetype would—cautious, defiant, invisible, or bold.',
      'Suddenly stop. Stand still in the dark, listening to all sounds.',
      'Stay there until discomfort, fear, or boredom surfaces.',
      'Whisper: "Law stands alone."',
      'Notice if the night feels different, heavier, lighter, or safer.',
      '**Anchor:** Press thumb and forefinger together. "Night is Law\'s witness."'
    ]
  },
  'Silent Meal': {
    purpose: 'Drop compulsions, face self in silence, reclaim the present.',
    steps: [
      'Prepare and eat a full meal in absolute silence—no talking, no devices, no music.',
      'Every time you want to break the silence (speak, check phone, serve others, perform), simply pause, and breathe.',
      'Finish the meal in total presence, no matter how uncomfortable.',
      'On the last bite or sip, silently affirm: "In silence, Law is present."',
      '**Anchor:** Press thumb to lips, then heart. "Silence holds Law."'
    ]
  },
  'Name Surrender': {
    purpose: 'Release your label, step beyond identity.',
    steps: [
      'Write your full name and archetype ("I am [Name], the [Archetype]") on paper.',
      'Speak it aloud, softer each time, until it\'s a whisper, then silence.',
      'Stare at the written name until it feels strange, distant, or unreal.',
      'Tear up the paper and scatter the pieces (wind, water, trash).',
      'State: "Nameless, I remain. Law remains."',
      '**Anchor:** Draw an "X" with your finger in the air. "Nameless is Law."'
    ]
  },
  'Death Ritual': {
    purpose: 'Burn the archetype—end the old loop.',
    steps: [
      'Sit quietly and imagine your archetype or old pattern as a person or object.',
      'Visualize its funeral—bury it, burn it, let it go.',
      'Speak a eulogy, thank it, name its lies, release it.',
      'Afterward, sit in the emptiness, resisting the urge to pick a new story.',
      'Whisper: "I rise as Law. The past is ash."',
      '**Anchor:** Touch the ground/floor, then stand tall. "Risen, Law endures."'
    ]
  },
  'Shadow Gift': {
    purpose: 'Integrate your shadow—make it fuel for Law.',
    steps: [
      'Identify a part of yourself you hide/dislike (envy, need, anger, shame).',
      'Write a letter to it, thanking it for its service. Read aloud.',
      'Find a symbolic object for your shadow (stone, token, paper).',
      'Carry it for a day. When shame/discomfort surfaces, hold it and breathe.',
      'Say: "Law owns all parts. Shadow is included."',
      '**Anchor:** Hold the object to your chest. "Shadow embraced, Law returns."'
    ]
  },
  'Silent Eye': {
    purpose: 'Face relational discomfort, own the mirror.',
    steps: [
      'Sit facing a trusted partner, knees touching.',
      'Each states their archetype aloud, then locks eyes for 2 minutes.',
      'No talking, no laughter, no breaking gaze—hold through discomfort.',
      'When strong emotion (cry/laugh/turn away) arises, breathe and stay.',
      'Inhale, exhale: "Beyond you, I am Law."',
      '**Anchor:** Touch fingers together. "Contact recalls Law."'
    ]
  },
  'Opposite Day': {
    purpose: 'Break your default. Become Law through inversion.',
    steps: [
      'For an hour (or a whole day), act in the exact opposite way of your archetype.',
      'If you\'re a peacemaker, create healthy disruption.',
      'If you\'re a controller, be silent and let others lead.',
      'If you serve, ask others to serve you.',
      'Feel every urge to "correct" yourself—resist it.',
      'At the end, say: "Opposition reveals the Law that does not move."',
      '**Anchor:** Cross index and middle fingers. "Opposite recalls Law."'
    ]
  },
  'Shadow Recording': {
    purpose: 'Drag secrets and shame into the light.',
    steps: [
      'Alone, turn on voice recorder/video.',
      'Confess every hidden thought, fear, and shame—out loud, no holding back.',
      'When done, force yourself to listen/watch fully, no excuses.',
      'Say out loud: "Law stands naked. The mask has no secrets."',
      '**Anchor:** Press both hands to face, then lower. "Revealed, I am Law."'
    ]
  },
  'Blind Walk': {
    purpose: 'Trust the unknown. Find Law without control.',
    steps: [
      'In a safe space, blindfold yourself.',
      'Say your mask aloud ("I need control / I must see / I\'m never lost").',
      'Move slowly, crawling or walking, relying only on breath and instinct.',
      'When panic/frustration rises, stand or sit still.',
      'Whisper: "Without sight, I am still Law."',
      '**Anchor:** Touch blindfold to heart. "Unseen, Law leads."'
    ]
  },
  'Hunger Vigil': {
    purpose: 'Endure emptiness, let Law feed you.',
    steps: [
      'Fast for a safe, set period (skip meal or two; listen to your body).',
      'Write your hunger story ("I get weak / angry / anxious"), say aloud.',
      'When hunger peaks, read your story again, noticing all urges.',
      'Sit with hunger, doing nothing, no distraction.',
      'On out-breath: "Law feeds what endures. I do not feed the mask."',
      '**Anchor:** Tap stomach three times. "Hunger recalls Law."'
    ]
  },
  'Public Freeze': {
    purpose: 'Survive exposure. Hold stillness.',
    steps: [
      'Go to a public place (park, square, station).',
      'Act out your archetype (helpful, bossy, aloof, dramatic, etc.) for 1 minute.',
      'Suddenly freeze. Stand still, eyes open, ignore all reactions.',
      'Stay until discomfort peaks and mind panics.',
      'Internally: "Law is not seen. Law is felt."',
      '**Anchor:** Tap foot three times. "Stillness is Law."'
    ]
  },
  'Timed Burn': {
    purpose: 'Burn out your pattern, then let Law move you.',
    steps: [
      'Set a timer for 15 minutes.',
      'For the full time, act as your archetype as intensely as possible—overplay it to the point of parody.',
      'When timer ends, go still, silent—no movement, no thought.',
      'Refuse action until a new impulse arises from emptiness, not the mask.',
      'Say: "The timer ends the mask. Only Law remains."',
      '**Anchor:** Snap fingers. "Snap recalls Law."'
    ]
  },
  'Cold Water Override': {
    purpose: 'Discipline, burn with discomfort, override by will.',
    steps: [
      'Prepare a bowl of ice water or cold shower.',
      'Speak your self-story ("I can\'t handle pain / I need comfort"), repeat aloud.',
      'Submerge hands/feet or step in.',
      'Hold as long as possible, refusing to narrate or resist.',
      'On sharp exhale: "Law survives. Mask dies."',
      '**Anchor:** Rub arms briskly. "Law returns with the cold."'
    ]
  },
  'Voice Release': {
    purpose: 'Free repressed energy. Command with sound.',
    steps: [
      'In private or in a car, scream, yell, chant, or sing at the top of your lungs.',
      'Continue until embarrassment, fear, or tears break through.',
      'When exhausted, go silent—let the quiet flood in.',
      '"Voice released, Law revealed."',
      '**Anchor:** Hand on throat, then heart. "Voice is Law\'s thread."'
    ]
  },
  'Heat Stand': {
    purpose: 'Survive discomfort, withstand pressure, build Law\'s endurance.',
    steps: [
      'Stand in the sun or by a safe heat source.',
      'Say your comfort phrases ("I need shade / I avoid heat"), repeat aloud.',
      'Remain exposed, refusing to move, fan yourself, or hide.',
      'When sweat/discomfort peaks, go silent and still.',
      '"Heat refines Law. The mask melts."',
      '**Anchor:** Wipe sweat across brow. "This touch recalls Law."'
    ]
  },
  'Body Mark': {
    purpose: 'Make your flaw visible, then erase it.',
    steps: [
      'With a safe marker, write your flaw/pattern on your skin (forearm, chest, palm).',
      'Stare at it, read aloud.',
      'Go about your day with it visible—endure reactions.',
      'At day\'s end, look once more, then wash it off with intent.',
      '"This body remembers Law. The mask is erased."',
      '**Anchor:** Rub cleaned area. "Washed, Law stays."'
    ]
  },
  'Social Disruption': {
    purpose: 'Break social loops, test the field\'s response.',
    steps: [
      'In a group, say something awkward, true, or challenging (not cruel, just raw).',
      'Observe reactions and your urge to explain or retreat.',
      'Resist apologizing or softening.',
      'Sit in the tension until nerves fade.',
      '"Law disrupts to reveal truth."',
      '**Anchor:** Cross arms or legs. "Disruption is Law\'s ally."'
    ]
  },
  'Resonance Scan': {
    purpose: 'Sharpens your awareness of unspoken energies. Trains you to detect resonance without absorption or mimicry.',
    steps: [
      'Choose a space where you will interact with at least one other person. This can be a public area, a workplace, or even a video call.',
      'Before entering the interaction, pause. Stand or sit with eyes closed.',
      'Breathe in slowly, then out even slower.',
      'As you inhale, imagine "tuning" your chest and gut to the emotional frequency in the room—try to feel the dominant emotion (joy, tension, fatigue, excitement).',
      'Exhale and state silently: "I register the field. I notice, but do not merge."',
      'Open your eyes. Do not act on what you sense; just log it. Did the room feel tense, warm, cold, heavy, alive?',
      'After the interaction, note if your reading was accurate.',
      '**Completion Signal:** You accurately name the field\'s dominant emotion before anyone speaks. Your body feels like a sensitive instrument, not a sponge.'
    ]
  },
  'Mirroring Pulse': {
    purpose: 'Shows you the power of intentional resonance and the instant feedback loop between you and others.',
    steps: [
      'Find a person to interact with—friend, stranger, coworker.',
      'During conversation, pick one subtle behavior: tone, posture, or pace of speech.',
      'Without exaggeration, mirror that aspect for 2–3 minutes—if they speak softly, soften your voice; if they lean forward, subtly do the same.',
      'As you do this, check: does the person relax, open up, or shift their energy?',
      'At the end, break the mirror—shift your posture or tone slightly, and see if they unconsciously follow.',
      '**Completion Signal:** If the other person unconsciously matches your shift, you\'ve achieved synchrony.'
    ]
  },
  'Sync Entry': {
    purpose: 'Forces you to practice connection as active creation, not a passive state. Sync is built, not lucked into.',
    steps: [
      'Choose a partner willing to experiment (could be a close friend or partner).',
      'Sit facing each other. No phones, no distractions.',
      'Set a 3-minute timer.',
      'For the first minute, both of you breathe at your natural pace.',
      'At the one-minute mark, announce: "Begin sync." Now, try to breathe in unison—match inhale and exhale.',
      'No speaking. Use only body language and breath.',
      'When the timer ends, reflect: how hard was it? Who led, who followed? Did you both arrive at a shared rhythm?',
      '**Completion Signal:** You both report a tangible "shift" where breathing felt easy, unified, and tension dissolved.'
    ]
  },
  'Group Breath': {
    purpose: 'Teaches you the amplifying effect of group resonance. Connection is exponential, not additive.',
    steps: [
      'Gather 3+ people (family, friends, even strangers if possible).',
      'Stand or sit in a loose circle.',
      'One person starts, breathing deeply and audibly (in through the nose, out through the mouth).',
      'Each person joins in, following the same pattern until the whole group breathes together.',
      'Once in sync, everyone closes their eyes for 60 seconds. Feel how the atmosphere shifts.',
      'Afterward, reflect as a group: what changed? Did anyone feel more calm, more energy, or new emotions?',
      '**Completion Signal:** The room feels charged—buzzing, calm, or "thicker" than before. People look at each other differently, as if a silent pact was made.'
    ]
  },
  'Echo Exchange': {
    purpose: 'Builds true emotional mirroring—showing you how deep connection happens when someone is truly seen and felt, not fixed.',
    steps: [
      'Find a safe person willing to be fully present with you.',
      'One person speaks for 2 minutes about anything emotionally real—no surface talk.',
      'The other listens, then repeats back the main feeling, not just the words ("You sound frustrated and hopeful at once").',
      'Switch roles.',
      'No advice, no solutions. The only goal is to reflect emotion accurately.',
      'If either of you gets it wrong, try again until the speaker feels "fully echoed."',
      '**Completion Signal:** When both parties feel lighter, more known, and "complete" after being echoed.'
    ]
  },
  'Presence Beacon': {
    purpose: 'Trains your nervous system to handle exposure, not by shrinking, but by claiming the air around you.',
    steps: [
      'Find a busy place—café, lobby, park, or even a digital meeting.',
      'Stand or sit upright, shoulders back, chest open.',
      'For 3 full minutes, do nothing to shrink or hide yourself. Make no apologies for your space—no crossed arms, no phone, no avoiding eye contact.',
      'If you catch someone\'s gaze, hold it for a breath, then let your eyes move on naturally.',
      'Feel the "light" of your presence filling the space around you. Don\'t try to impress—just *be seen*, fully and plainly.',
      '**Completion Signal:** You feel a pulse of energy in your chest or face—adrenaline, heat, maybe fear. When that happens, silently declare: "I am here. I am seen."'
    ]
  },
  'Voice Claim': {
    purpose: 'Builds the habit of making your voice impossible to ignore, even when it shakes.',
    steps: [
      'Choose a moment to speak in a group setting—class, meeting, or even a family meal.',
      'Before you speak, take a deliberate breath.',
      'Speak clearly, not loudly, but with full intent—no shrinking, mumbling, or apologizing for your words.',
      'Announce something that feels true for you: an opinion, a boundary, or even a compliment.',
      'If your voice shakes or attention comes your way, keep going—do not rush or retract.',
      '**Completion Signal:** After you speak, notice the field: Did energy shift? Did others turn, react, or listen? Anchor the moment by pressing your tongue to the roof of your mouth, then release.'
    ]
  },
  'Stage Burn': {
    purpose: 'Turns fear of the spotlight into fuel. The heat is proof of real presence.',
    steps: [
      'Find or create a real or symbolic "stage": a literal platform, a marked space, or simply a video call where all eyes are on you.',
      'Step onto the stage with intent.',
      'For 60 seconds, perform something—read, tell a story, dance, recite a line, or simply stand in silence.',
      'The rule: do not hide or apologize. Whatever happens—mistake, silence, laughter—let it all burn through you.',
      'When self-consciousness spikes, breathe and repeat internally: "Let the burn reveal me, not destroy me."',
      '**Completion Signal:** Once you step off the "stage," log what emotion is strongest: pride, embarrassment, relief, hunger for more.'
    ]
  },
  'Light Reflection': {
    purpose: 'Forces you to face how others see you—the real, the projected, and the uncomfortable.',
    steps: [
      'Choose a trusted person or record yourself.',
      'Ask them to describe what stands out about your presence—good, bad, or raw. ("When you enter a room, what changes?")',
      'Listen without arguing, explaining, or shrinking.',
      'Write down every word, even the uncomfortable ones.',
      'For self-record: watch or listen back. Note every moment you wince, flinch, or wish you could edit.',
      'Say aloud: "This is the light. I accept what it shows."',
      '**Completion Signal:** If you feel resistance or emotion, let it hit—then let it pass. No fixing, just absorbing.'
    ]
  },
  'Applause Listen': {
    purpose: 'Teaches you to metabolize praise, letting it strengthen your core instead of feeding your mask.',
    steps: [
      'After any achievement, big or small—share it with at least one person.',
      'State what you accomplished, clearly and without minimizing.',
      'If praise or congratulations come, do not deflect, self-deprecate, or dismiss.',
      'Accept the words. Feel how your body wants to shrink or dodge.',
      'Thank them, then stay silent for a moment—let the applause, literal or spoken, echo in your field.',
      '**Completion Signal:** When you can take in the applause or praise without flinching, hiding, or apologizing—even if it feels uncomfortable.'
    ]
  }
}

export default function ArchetypeRitualsPage() {
  const params = useParams()
  const archetype = params.archetype as string
  const [showChat, setShowChat] = useState(false)
  const [showRituals, setShowRituals] = useState(true)
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null)

  const config = archetypeConfigs[archetype.toLowerCase() as keyof typeof archetypeConfigs]
  
  // Debug: Force Partner for testing
  if (archetype.toLowerCase() === 'partner') {
    console.log('PARTNER DETECTED - Config:', config)
  }
  
  console.log('Rituals page - showChat:', showChat, 'archetype:', archetype, 'config:', config?.name)

  if (!config) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Invalid Archetype</h1>
          <Link href="/chambers" className="px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors">
            Return to Chambers
          </Link>
        </div>
      </div>
    )
  }

  // If chat is active, show only the chat component
  if (showChat) {
    return (
      <div className="min-h-screen bg-black">
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setShowChat(false)}
            className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors font-bold"
          >
            ← Back to Journey
          </button>
        </div>
        <ChamberChat
          archetype={archetype}
          archetypeColor={config.color}
          glowColor={config.color}
          onClose={() => setShowChat(false)}
        />
      </div>
    )
  }

  // If rituals modal is active, show rituals
  if (showRituals) {
  return (
      <div 
        className="min-h-screen relative overflow-hidden font-mono"
        style={{
          background: config.secondaryColor,
          color: '#ffffff',
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${config.powerColor} 0%, transparent 50%),
            repeating-linear-gradient(45deg, transparent 0px, transparent 1px, ${config.powerColor} 1px, ${config.powerColor} 2px)
          `,
          animation: 'powerPulse 2s infinite'
        }}
      >
        <style jsx>{`
          @keyframes powerPulse {
            0%, 100% { background-size: 100% 100%, 20px 20px; }
            50% { background-size: 150% 150%, 20px 20px; }
          }
          
          @keyframes powerGlow {
            0%, 100% { text-shadow: 0 0 20px ${config.glowColor}; }
            50% { text-shadow: 0 0 30px ${config.glowColor}, 0 0 50px ${config.glowColor}; }
          }
          
          @keyframes powerFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.02); }
          }
          
          @keyframes sectionReveal {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div 
            className="flex items-center justify-between mb-8"
            style={{ animation: 'sectionReveal 1s ease-out' }}
          >
            <h1 
              className="text-3xl font-bold"
              style={{
                textShadow: `0 0 20px ${config.glowColor}`,
                animation: 'powerGlow 2s infinite'
              }}
            >
              {config.name} RITUALS TO COMPLETE - ARCHETYPE: {archetype}
            </h1>
            <button
              onClick={() => setShowRituals(false)}
              className="px-4 py-2 border-2 transition-all duration-300 hover:scale-105 font-bold"
              style={{
                borderColor: config.accentColor,
                color: config.accentColor,
                textShadow: `0 0 10px ${config.glowColor}`,
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
            >
              ← Back to Journey
            </button>
          </div>
          
          {/* Archetype Analysis */}
          <div 
            className="grid md:grid-cols-2 gap-6 mb-8"
            style={{ animation: 'sectionReveal 1s ease-out 0.2s both' }}
          >
            <div 
              className="p-6 border-l-4"
              style={{
                borderColor: config.primaryColor,
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-3">🔄</span>
                YOUR LOOP
              </h2>
              <p className="text-gray-300">{config.loop}</p>
            </div>
            <div 
              className="p-6 border-l-4"
              style={{
                borderColor: config.accentColor,
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-3">⚖️</span>
                WHAT YOU NEED
              </h2>
              <p className="text-gray-300">{config.needs}</p>
          </div>
        </div>

          {/* Your Rituals */}
          <div 
            className="mb-8"
            style={{ animation: 'sectionReveal 1s ease-out 0.4s both' }}
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{
                textShadow: `0 0 10px ${config.glowColor}`
              }}
            >
              YOUR RITUAL ASSIGNMENTS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.rituals.map((ritual, index) => {
                const ritualName = ritual.split(' (')[0]
                const ritualDesc = ritual.split(' (')[1]?.replace(')', '')
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedRitual(ritualName)}
                    className="p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                      borderColor: config.accentColor,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      animation: `sectionReveal 1s ease-out ${0.6 + index * 0.1}s both`
                    }}
                  >
                    <h3 
                      className="font-bold mb-2"
                      style={{ textShadow: `0 0 5px ${config.glowColor}` }}
                    >
                      {ritualName}
                      </h3>
                    <p className="text-sm text-gray-300 mb-3">{ritualDesc}</p>
                      <button
                      className="text-xs px-3 py-1 rounded border-2 transition-all duration-300 hover:scale-105 font-bold"
                      style={{
                        borderColor: config.accentColor,
                        color: config.accentColor,
                        textShadow: `0 0 5px ${config.glowColor}`,
                        backgroundColor: 'rgba(0,0,0,0.3)'
                      }}
                    >
                      VIEW FULL RITUAL
                      </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Selected Ritual Modal */}
        {selectedRitual && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
            <div 
              className="border-2 rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto"
              style={{
                borderColor: config.primaryColor,
                backgroundColor: 'rgba(0,0,0,0.9)',
                boxShadow: `0 0 30px ${config.glowColor}`
              }}
            >
            <div className="flex items-center justify-between mb-4">
                <h2 
                  className="text-2xl font-bold"
                  style={{ textShadow: `0 0 10px ${config.glowColor}` }}
                >
                  {selectedRitual}
                  </h2>
              <button
                onClick={() => setSelectedRitual(null)}
                  className="text-gray-400 hover:text-white text-2xl transition-colors"
              >
                  ×
              </button>
            </div>

              {allRituals[selectedRitual as keyof typeof allRituals] && (
                <div>
                  <h3 
                    className="text-lg font-bold mb-2"
                    style={{ textShadow: `0 0 5px ${config.glowColor}` }}
                  >
                    Purpose
                  </h3>
                  <p 
                    className="text-gray-300 mb-4"
                    style={{ textShadow: `0 0 2px ${config.glowColor}` }}
                  >
                    {allRituals[selectedRitual as keyof typeof allRituals].purpose}
                  </p>
                  
                  <h3 
                    className="text-lg font-bold mb-2"
                    style={{ textShadow: `0 0 5px ${config.glowColor}` }}
                  >
                    Steps
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    {allRituals[selectedRitual as keyof typeof allRituals].steps.map((step, index) => (
                      <li 
                        key={index} 
                        className="mb-2"
                        style={{ textShadow: `0 0 2px ${config.glowColor}` }}
                      >
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
                  </div>
                </div>
        )}
              </div>
    )
  }

  // Show the initial page content
  return (
    <div 
      className="min-h-screen relative overflow-hidden font-mono"
      style={{
        background: config.secondaryColor,
        color: '#ffffff',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, ${config.powerColor} 0%, transparent 50%),
          repeating-linear-gradient(45deg, transparent 0px, transparent 1px, ${config.powerColor} 1px, ${config.powerColor} 2px)
        `,
        animation: 'powerPulse 2s infinite'
      }}
    >
      <style jsx>{`
        @keyframes powerPulse {
          0%, 100% { background-size: 100% 100%, 20px 20px; }
          50% { background-size: 150% 150%, 20px 20px; }
        }
        
        @keyframes powerGlow {
          0%, 100% { text-shadow: 0 0 20px ${config.glowColor}; }
          50% { text-shadow: 0 0 30px ${config.glowColor}, 0 0 50px ${config.glowColor}; }
        }
        
        @keyframes powerFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        
        @keyframes sectionReveal {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div 
          className="text-center mb-12"
          style={{ animation: 'sectionReveal 1s ease-out' }}
        >
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              textShadow: `0 0 20px ${config.glowColor}`,
              animation: 'powerGlow 2s infinite'
            }}
          >
            {config.name} JOURNEY TO LAW
          </h1>
          <p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            style={{ textShadow: `0 0 5px ${config.glowColor}` }}
          >
            {config.description}
          </p>
          
          {/* Main Buttons */}
          <div 
            className="text-center mb-8 space-y-4"
            style={{ animation: 'sectionReveal 1s ease-out 0.2s both' }}
          >
            <button
              onClick={() => setShowChat(true)}
              className="block w-full px-8 py-4 border-2 transition-all duration-300 hover:scale-105 font-bold text-lg"
              style={{
                borderColor: config.accentColor,
                color: config.accentColor,
                textShadow: `0 0 10px ${config.glowColor}`,
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
            >
              ⚖️ BEGIN YOUR JOURNEY TO BECOME LAW
            </button>
            
            <button
              onClick={() => setShowRituals(true)}
              className="block w-full px-8 py-4 border-2 transition-all duration-300 hover:scale-105 font-bold text-lg"
              style={{
                borderColor: config.accentColor,
                color: config.accentColor,
                textShadow: `0 0 10px ${config.glowColor}`,
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
            >
              📋 YOUR RITUALS TO COMPLETE
            </button>
              </div>
            </div>

        {/* Journey Description */}
        <div 
          className="p-8 mb-8 border-l-4"
          style={{
            borderColor: config.accentColor,
            backgroundColor: 'rgba(0,0,0,0.3)',
            animation: 'sectionReveal 1s ease-out 0.4s both'
          }}
        >
          <h2 
            className="text-2xl font-bold mb-4 text-center"
            style={{ textShadow: `0 0 10px ${config.glowColor}` }}
          >
            The Path to Becoming Law
          </h2>
          <div className="text-center space-y-4 text-gray-300">
            <p style={{ textShadow: `0 0 2px ${config.glowColor}` }}>
              Your journey to becoming law begins with a conversation. The AI guide will assess your current state, 
              identify your missing elements, and guide you through the rituals that will transform you into your archetype's highest expression.
            </p>
            <p style={{ textShadow: `0 0 2px ${config.glowColor}` }}>
              This is not a passive experience. You will be challenged, tested, and pushed beyond your current limitations. 
              The field will respond to your commitment, and reality will bend to your will.
            </p>
            <p style={{ textShadow: `0 0 2px ${config.glowColor}` }}>
              Are you ready to begin your transformation?
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div 
          className="flex justify-between items-center mt-8 pt-6 border-t"
          style={{ 
            borderColor: config.accentColor,
            animation: 'sectionReveal 1s ease-out 0.6s both'
          }}
        >
          <Link 
            href={`/chamber/${archetype}`}
            className="px-6 py-3 border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: config.accentColor,
              color: config.accentColor,
              textShadow: `0 0 10px ${config.glowColor}`,
              backgroundColor: 'rgba(0,0,0,0.3)'
            }}
          >
            ← Return to {config.name}
          </Link>
          
          <Link 
            href="/chambers"
            className="px-6 py-3 border-2 transition-all duration-300 hover:scale-105 font-bold"
            style={{
              borderColor: config.accentColor,
              color: config.accentColor,
              textShadow: `0 0 10px ${config.glowColor}`,
              backgroundColor: 'rgba(0,0,0,0.3)'
            }}
          >
            All Chambers →
          </Link>
        </div>
      </div>
    </div>
  )
} 