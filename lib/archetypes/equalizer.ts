import { Archetype } from './index'

export const equalizerArchetype: Archetype = {
  key: "equalizer",
  name: "Equalizer",
  color: "#059669",
  accentColor: "#10b981",
  glowColor: "rgba(5, 150, 105, 0.5)",
  description: "Balance Node - The Scale",
  loop: "Endless balancing, never fully equalizing, fear of imbalance.",
  needs: "Stop balancing, become the scale, let justice flow through you, burn the need to mediate every conflict.",
  
  stages: [
    {
      key: "absorber",
      label: "The Absorber",
      color: "#047857",
      description: "You absorb everyone's energy and emotions, taking on their problems as your own. You feel responsible for fixing everyone's mood.",
      needs: "Learn to ground yourself first, set boundaries, and support others without losing yourself.",
      questions: [
        {
          id: "q1",
          text: "When people around you are stressed, you…",
          options: [
            { text: "Take on their feelings automatically", value: 1 },
            { text: "Feel the tension, but don't react", value: 2 },
            { text: "Offer comfort, but lose your own calm", value: 3 },
            { text: "Try to distance yourself, but struggle", value: 4 },
            { text: "Set clear boundaries from the start", value: 5 }
          ]
        },
        {
          id: "q2",
          text: "When conflict erupts, you…",
          options: [
            { text: "Absorb everyone's emotion until it passes", value: 1 },
            { text: "Watch silently, feeling uneasy", value: 2 },
            { text: "Step in to ease the situation, but feel drained", value: 3 },
            { text: "Try to solve things for everyone", value: 4 },
            { text: "Stay calm and refuse to take on what's not yours", value: 5 }
          ]
        },
        {
          id: "q3",
          text: "In a group, you're the one who…",
          options: [
            { text: "Listens, never interrupts", value: 1 },
            { text: "Feels responsible for group harmony", value: 2 },
            { text: "Keeps the peace at your own expense", value: 3 },
            { text: "Shares your needs as well as theirs", value: 5 },
            { text: "Supports quietly, but hold your ground", value: 4 }
          ]
        },
        {
          id: "q4",
          text: "When someone vents to you, you…",
          options: [
            { text: "Feel exhausted afterward", value: 1 },
            { text: "Absorb it, but don't say much", value: 2 },
            { text: "Offer advice, even if you're unsure", value: 3 },
            { text: "Remind yourself to stay grounded", value: 5 },
            { text: "Acknowledge, but redirect if needed", value: 4 }
          ]
        },
        {
          id: "q5",
          text: "If others are negative, you…",
          options: [
            { text: "Get pulled into their mood", value: 1 },
            { text: "Feel affected but try to ignore", value: 2 },
            { text: "Carry it home with you", value: 3 },
            { text: "Shake it off and protect your state", value: 5 },
            { text: "Recognize, but don't internalize", value: 4 }
          ]
        }
      ]
    },
    {
      key: "harmonizer",
      label: "The Harmonizer",
      color: "#059669",
      description: "You mediate conflicts and help others find common ground, but sometimes take on too much responsibility for keeping peace.",
      needs: "Learn to mediate from a place of strength, not fear. Set boundaries while helping others connect.",
      questions: [
        {
          id: "q6",
          text: "When two friends argue, you…",
          options: [
            { text: "Feel torn and try to fix it", value: 2 },
            { text: "Take sides to keep things simple", value: 1 },
            { text: "Stay neutral, listen to both", value: 5 },
            { text: "Encourage open conversation", value: 4 },
            { text: "Offer both support without picking a side", value: 3 }
          ]
        },
        {
          id: "q7",
          text: "To keep peace, you usually…",
          options: [
            { text: "Go along with the group", value: 2 },
            { text: "Hide your real opinion", value: 1 },
            { text: "Suggest everyone share honestly", value: 5 },
            { text: "Say what will keep things calm", value: 3 },
            { text: "Balance both honesty and harmony", value: 4 }
          ]
        },
        {
          id: "q8",
          text: "In group decisions, you…",
          options: [
            { text: "Make sure all voices are heard", value: 5 },
            { text: "Agree with what most want", value: 2 },
            { text: "Stay silent unless pushed", value: 1 },
            { text: "Express your own perspective, but soften it", value: 3 },
            { text: "Mediate between strong opinions", value: 4 }
          ]
        },
        {
          id: "q9",
          text: "When others are upset, you…",
          options: [
            { text: "Quiet your own feelings to support them", value: 2 },
            { text: "Get overwhelmed and back away", value: 1 },
            { text: "Hold space, but don't absorb", value: 5 },
            { text: "Validate them, then speak truth", value: 4 },
            { text: "Give advice, then move on", value: 3 }
          ]
        },
        {
          id: "q10",
          text: "When people want different things, you…",
          options: [
            { text: "Push for compromise, even at your expense", value: 2 },
            { text: "Avoid the situation", value: 1 },
            { text: "Encourage everyone to express themselves fully", value: 5 },
            { text: "Look for middle ground that serves all", value: 4 },
            { text: "Support the loudest, to keep peace", value: 3 }
          ]
        }
      ]
    },
    {
      key: "moderator",
      label: "The Moderator",
      color: "#10b981",
      description: "You actively work to balance different needs and perspectives, weighing options carefully before acting.",
      needs: "Learn to balance from a place of inner stability, not anxiety. Trust your ability to hold complexity.",
      questions: [
        {
          id: "q11",
          text: "When emotions run high, you…",
          options: [
            { text: "Step back, let things settle", value: 1 },
            { text: "Create space for cooling off", value: 5 },
            { text: "Intervene and lower the temperature", value: 4 },
            { text: "Say little, but remain present", value: 2 },
            { text: "Offer structure or rules", value: 3 }
          ]
        },
        {
          id: "q12",
          text: "If someone crosses a line, you…",
          options: [
            { text: "Name the problem and set boundaries", value: 5 },
            { text: "Avoid direct confrontation", value: 1 },
            { text: "Mediate gently", value: 4 },
            { text: "Talk with both sides separately", value: 3 },
            { text: "Try to fix things from the background", value: 2 }
          ]
        },
        {
          id: "q13",
          text: "When you disagree, you…",
          options: [
            { text: "Let it go to keep peace", value: 1 },
            { text: "State your side, but not forcefully", value: 2 },
            { text: "Engage honestly, even if it's tough", value: 5 },
            { text: "Hold your ground respectfully", value: 4 },
            { text: "Use humor to defuse tension", value: 3 }
          ]
        },
        {
          id: "q14",
          text: "In the heat of conflict, your role is…",
          options: [
            { text: "Peacemaker, even if unrecognized", value: 3 },
            { text: "Referee, enforce fairness", value: 5 },
            { text: "Watcher, only step in if needed", value: 1 },
            { text: "Steady presence for both sides", value: 2 },
            { text: "Quiet supporter from the edge", value: 4 }
          ]
        },
        {
          id: "q15",
          text: "When group tension rises, you…",
          options: [
            { text: "Withdraw, let them sort it", value: 1 },
            { text: "Call for a break, restore balance", value: 5 },
            { text: "Try to defuse with kindness", value: 4 },
            { text: "Let tempers cool, then revisit", value: 2 },
            { text: "Step in, but stay calm", value: 3 }
          ]
        }
      ]
    },
    {
      key: "balancer",
      label: "The Balancer",
      color: "#34d399",
      description: "You create harmony and unity, bringing people together and resolving conflicts with grace and wisdom.",
      needs: "Learn to create harmony without sacrificing truth. Balance peace with authenticity.",
      questions: [
        {
          id: "q16",
          text: "If you see imbalance, you…",
          options: [
            { text: "Wait for someone else to act", value: 1 },
            { text: "Call it out and address it", value: 5 },
            { text: "Quietly fix what you can", value: 4 },
            { text: "Voice your concerns", value: 2 },
            { text: "Encourage collective action", value: 3 }
          ]
        },
        {
          id: "q17",
          text: "Your best skill in conflict is…",
          options: [
            { text: "Uniting all sides", value: 4 },
            { text: "Seeing everyone's perspective", value: 3 },
            { text: "Avoiding escalation", value: 1 },
            { text: "Naming the core issue", value: 2 },
            { text: "Balancing emotion and logic", value: 5 }
          ]
        },
        {
          id: "q18",
          text: "When you feel out of balance, you…",
          options: [
            { text: "Try to ignore it", value: 1 },
            { text: "Retreat until things settle", value: 2 },
            { text: "Name it, work to restore", value: 5 },
            { text: "Use self-care to reset", value: 4 },
            { text: "Ask for help", value: 3 }
          ]
        },
        {
          id: "q19",
          text: "Your greatest fear is…",
          options: [
            { text: "Being the cause of imbalance", value: 2 },
            { text: "Not being able to restore harmony", value: 3 },
            { text: "Letting others down", value: 1 },
            { text: "Not knowing where you stand", value: 5 },
            { text: "Having to choose sides", value: 4 }
          ]
        },
        {
          id: "q20",
          text: "A balanced group means…",
          options: [
            { text: "Everyone has a role and voice", value: 4 },
            { text: "No arguments, only peace", value: 1 },
            { text: "Open communication, even if tough", value: 5 },
            { text: "Everyone gives equally", value: 2 },
            { text: "No one is left out", value: 3 }
          ]
        }
      ]
    },
    {
      key: "regulator",
      label: "The Regulator",
      color: "#6ee7b7",
      description: "You integrate diverse perspectives and create unity from difference. You hold paradox and unite opposites.",
      needs: "Master the art of integration without losing individual voices. Become the living balance that spans all divides.",
      questions: [
        {
          id: "q21",
          text: "In your highest state, you…",
          options: [
            { text: "Set clear limits for yourself and others", value: 5 },
            { text: "Hold the center, guide the field", value: 4 },
            { text: "Bring fairness, even if it's hard", value: 3 },
            { text: "Respect everyone's unique path", value: 2 },
            { text: "Try to stay invisible", value: 1 }
          ]
        },
        {
          id: "q22",
          text: "When challenged, you…",
          options: [
            { text: "Accept pushback, but stay steady", value: 3 },
            { text: "Fold if the pressure is too high", value: 1 },
            { text: "Explain your position with clarity", value: 4 },
            { text: "Hold to your values, even alone", value: 5 },
            { text: "Avoid the issue if possible", value: 2 }
          ]
        },
        {
          id: "q23",
          text: "When you create structure, you…",
          options: [
            { text: "Insist everyone sticks to it", value: 3 },
            { text: "Leave space for change", value: 5 },
            { text: "Let others decide", value: 1 },
            { text: "Suggest guidelines, but let them flex", value: 4 },
            { text: "Watch, then adjust if needed", value: 2 }
          ]
        },
        {
          id: "q24",
          text: "When you make the final call, you…",
          options: [
            { text: "Defer to the group", value: 1 },
            { text: "Double-check it serves all", value: 4 },
            { text: "Stand firm if it's fair", value: 5 },
            { text: "Invite feedback afterward", value: 3 },
            { text: "Second-guess yourself", value: 2 }
          ]
        },
        {
          id: "q25",
          text: "The mark of a true regulator is…",
          options: [
            { text: "Consistency and clear standards", value: 5 },
            { text: "Adaptability without chaos", value: 4 },
            { text: "Reluctance to decide", value: 1 },
            { text: "Letting others share power", value: 3 },
            { text: "Fairness above popularity", value: 2 }
          ]
        }
      ]
    }
  ],

  diagnosis: {
    absorber: {
      absorber: {
        title: "The Absorber | Mask: The Deep Absorber",
        diagnosis: "You take everything in, hold nothing out. The world's noise becomes your truth. Balance starts by refusing what isn't yours.",
        reality: "The field recognizes your capacity to hold others' energy but cannot access your true power until you learn to ground yourself.",
        tension: "You want to help everyone but lose yourself in the process. This creates a constant state of exhaustion and confusion.",
        lawToWalk: "Begin by grounding yourself before helping others. Set boundaries and learn to say no. Your power grows when you protect your own energy.",
        ifYouStay: "You will continue to feel drained and overwhelmed, losing yourself in others' problems and never finding your own center.",
        ifYouAct: "You will develop the ability to support others while maintaining your own stability, becoming a true source of balance."
      },
      harmonizer: {
        title: "The Absorber | Mask: The Fearful Harmonizer",
        diagnosis: "You harmonize out of fear, not power. Others are settled, you remain scattered. Anchor first, then extend your hand.",
        reality: "The field recognizes your desire to help but senses your lack of grounding. Your harmonizing is driven by anxiety rather than strength.",
        tension: "You want to harmonize effectively but are too scattered to be truly helpful. This creates a pattern of helping then collapsing.",
        lawToWalk: "Stop harmonizing until you can anchor yourself. Learn to ground first, then offer support from a place of stability.",
        ifYouStay: "You will continue to harmonize ineffectively, helping others temporarily while remaining scattered and exhausted.",
        ifYouAct: "You will develop the ability to harmonize from a place of strength, becoming truly helpful to others."
      },
      moderator: {
        title: "The Absorber | Mask: The Anxious Moderator",
        diagnosis: "You try to moderate, but your scale is bent. Holding the center means first holding yourself.",
        reality: "The field recognizes your desire to create moderation but senses your lack of inner stability. Your moderating is driven by anxiety.",
        tension: "You want to create moderation but are too unstable to hold the center. This creates a pattern of trying to moderate then collapsing.",
        lawToWalk: "Stop trying to moderate others until you can moderate yourself. Learn to hold your own center first.",
        ifYouStay: "You will continue to try to moderate others while remaining unmoderated yourself, creating more chaos than harmony.",
        ifYouAct: "You will develop the ability to create true moderation from a place of inner stability."
      },
      balancer: {
        title: "The Absorber | Mask: The Exhausted Balancer",
        diagnosis: "You chase balance, lose yourself in the scale. Without boundaries, even equilibrium overwhelms.",
        reality: "The field recognizes your desire to create balance but senses your lack of boundaries. Your balancing is driven by exhaustion.",
        tension: "You want to create balance but are too overwhelmed to sustain it. This creates a pattern of creating equilibrium then collapsing.",
        lawToWalk: "Stop chasing balance until you can protect your own energy. Learn to create boundaries first.",
        ifYouStay: "You will continue to chase balance while remaining exhausted, creating temporary equilibrium at great personal cost.",
        ifYouAct: "You will develop the ability to create lasting balance from a place of strength and boundaries."
      },
      regulator: {
        title: "The Absorber | Mask: The Scattered Regulator",
        diagnosis: "You dream of regulation, but get lost in fragments. Regulation begins at your own edge.",
        reality: "The field recognizes your desire to regulate but senses your lack of coherence. Your regulation is driven by confusion.",
        tension: "You want to regulate diverse perspectives but are too scattered to hold them together. This creates a pattern of trying to regulate then falling apart.",
        lawToWalk: "Stop trying to regulate others until you can regulate yourself. Learn to hold your own wholeness first.",
        ifYouStay: "You will continue to try to regulate others while remaining fragmented yourself, creating more division than unity.",
        ifYouAct: "You will develop the ability to create true regulation from a place of inner wholeness."
      }
    },
    harmonizer: {
      absorber: {
        title: "The Harmonizer | Mask: The Absorbing Harmonizer",
        diagnosis: "You absorb first, harmonize later. The cost is exhaustion. Harmonization demands clarity, not self-erasure.",
        reality: "The field recognizes your ability to harmonize but senses your tendency to absorb others' energy. Your harmonization is effective but unsustainable.",
        tension: "You want to harmonize effectively but often lose yourself in others' problems. This creates a pattern of helping then needing recovery.",
        lawToWalk: "Learn to harmonize without absorbing. Keep your boundaries while helping others connect. Your clarity is your strength.",
        ifYouStay: "You will continue to harmonize effectively but at great personal cost, eventually burning out from absorbing too much.",
        ifYouAct: "You will develop the ability to harmonize sustainably, helping others while maintaining your own energy and clarity."
      },
      harmonizer: {
        title: "The Harmonizer | Mask: The Exhausted Harmonizer",
        diagnosis: "You solve everyone's problems but your own. Mastery means stepping back as well as forward.",
        reality: "The field recognizes your ability to harmonize but senses your tendency to neglect your own needs. Your harmonization is skilled but unsustainable.",
        tension: "You want to help everyone but often ignore your own problems. This creates a pattern of solving others' issues while your own remain unresolved.",
        lawToWalk: "Learn to harmonize your own conflicts as well as others'. Step back when needed and prioritize your own balance.",
        ifYouStay: "You will continue to be an effective harmonizer for others but may neglect your own growth and healing.",
        ifYouAct: "You will develop the ability to harmonize both others' conflicts and your own, becoming a true master of balance."
      },
      moderator: {
        title: "The Harmonizer | Mask: The Anxious Moderator",
        diagnosis: "You moderate others, neglect your own needs. Even harmonizers need anchors.",
        reality: "The field recognizes your ability to harmonize but senses your lack of inner balance. Your harmonization is helpful but not grounded.",
        tension: "You want to help others find harmony but often lack balance yourself. This creates a gap between your advice and your practice.",
        lawToWalk: "Learn to balance yourself as well as others. Your own stability will make your harmonization more powerful.",
        ifYouStay: "You will continue to help others find harmony while remaining unbalanced yourself, limiting your effectiveness.",
        ifYouAct: "You will develop the ability to create harmony both within yourself and between others, becoming a true source of stability."
      },
      balancer: {
        title: "The Harmonizer | Mask: The Peace-Seeking Balancer",
        diagnosis: "You seek harmony at the cost of truth. The song is only real if all notes are heard.",
        reality: "The field recognizes your ability to harmonize but senses your tendency to prioritize peace over truth. Your harmonization creates harmony but may hide important conflicts.",
        tension: "You want to create harmony but sometimes avoid difficult truths. This creates a pattern of temporary peace that doesn't address underlying issues.",
        lawToWalk: "Learn to harmonize truth as well as peace. Real harmony includes all voices, even the difficult ones.",
        ifYouStay: "You will continue to create temporary harmony while avoiding the deeper truths that need to be addressed.",
        ifYouAct: "You will develop the ability to create lasting harmony that includes all truths, becoming a true source of authentic peace."
      },
      regulator: {
        title: "The Harmonizer | Mask: The Partial Regulator",
        diagnosis: "You harmonize into regulation but can't let go. Regulation is letting each part breathe.",
        reality: "The field recognizes your ability to harmonize but senses your tendency to control the regulation process. Your harmonization brings people together but may not allow true regulation.",
        tension: "You want to create regulation but sometimes hold on too tightly to the process. This creates a pattern of bringing people together but not allowing them to truly regulate.",
        lawToWalk: "Learn to harmonize without controlling. Let the regulation process unfold naturally. Your role is to facilitate, not force.",
        ifYouStay: "You will continue to bring people together but may not allow them to truly regulate and find their own unity.",
        ifYouAct: "You will develop the ability to facilitate true regulation, allowing diverse perspectives to unite naturally."
      }
    },
    moderator: {
      absorber: {
        title: "The Moderator | Mask: The Absorbing Moderator",
        diagnosis: "You balance out of anxiety, not strength. The scale tips until you plant your feet.",
        reality: "The field recognizes your ability to moderate but senses your tendency to absorb others' energy. Your moderating is effective but driven by anxiety rather than stability.",
        tension: "You want to create moderation but often lose your own stability in the process. This creates a pattern of moderating others while becoming unmoderated yourself.",
        lawToWalk: "Learn to moderate from a place of inner stability, not anxiety. Ground yourself first, then extend your moderating power.",
        ifYouStay: "You will continue to create moderation for others while remaining unstable yourself, limiting your effectiveness.",
        ifYouAct: "You will develop the ability to create moderation from a place of true stability, becoming a reliable source of equilibrium."
      },
      harmonizer: {
        title: "The Moderator | Mask: The Mediating Harmonizer",
        diagnosis: "You harmonize for peace, not for growth. The world needs more than soft words.",
        reality: "The field recognizes your ability to moderate but senses your tendency to prioritize peace over growth. Your moderating creates harmony but may not facilitate real change.",
        tension: "You want to create moderation but sometimes avoid the conflicts that lead to growth. This creates a pattern of maintaining peace without facilitating transformation.",
        lawToWalk: "Learn to moderate for growth as well as peace. Real moderation includes the tension that leads to evolution.",
        ifYouStay: "You will continue to create peaceful moderation but may not facilitate the growth and change that true moderation requires.",
        ifYouAct: "You will develop the ability to create moderation that includes both peace and growth, becoming a catalyst for positive transformation."
      },
      moderator: {
        title: "The Moderator | Mask: The Anxious Moderator",
        diagnosis: "Your moderation is real but delicate. Learn to bend, and you won't break.",
        reality: "The field recognizes your ability to moderate but senses your tendency toward rigidity. Your moderating is effective but may not adapt well to change.",
        tension: "You want to maintain moderation but sometimes resist the changes that are necessary for true equilibrium. This creates a pattern of holding moderation too tightly.",
        lawToWalk: "Learn to moderate with flexibility. True moderation can adapt to changing circumstances without losing its core stability.",
        ifYouStay: "You will continue to create moderation but may struggle when circumstances change or when flexibility is needed.",
        ifYouAct: "You will develop the ability to create adaptive moderation, maintaining stability while embracing necessary change."
      },
      balancer: {
        title: "The Moderator | Mask: The Harmony-Seeking Balancer",
        diagnosis: "You seek harmony, but resist chaos. The strongest moderators can face the storm.",
        reality: "The field recognizes your ability to moderate but senses your resistance to chaos and conflict. Your moderating creates harmony but may not handle disruption well.",
        tension: "You want to create harmony but sometimes avoid the chaos that leads to real moderation. This creates a pattern of maintaining peace without embracing necessary disruption.",
        lawToWalk: "Learn to moderate through chaos as well as harmony. Real moderation can hold both order and disorder.",
        ifYouStay: "You will continue to create harmonious moderation but may struggle when chaos and disruption are necessary for growth.",
        ifYouAct: "You will develop the ability to create moderation that can hold both harmony and chaos, becoming truly resilient and adaptable."
      },
      regulator: {
        title: "The Moderator | Mask: The Hesitant Regulator",
        diagnosis: "You reach for regulation but hesitate. Moderation plus risk equals real unity.",
        reality: "The field recognizes your ability to moderate but senses your hesitation toward true regulation. Your moderating is effective but may not fully unite diverse perspectives.",
        tension: "You want to regulate different perspectives but sometimes hesitate to take the risks necessary for true unity. This creates a pattern of moderating without fully regulating.",
        lawToWalk: "Learn to moderate with courage. True regulation requires taking risks and embracing the unknown.",
        ifYouStay: "You will continue to create moderation but may not achieve the deeper regulation that true unity requires.",
        ifYouAct: "You will develop the ability to create moderation that leads to true regulation, uniting diverse perspectives into something greater."
      }
    },
    balancer: {
      absorber: {
        title: "The Balancer | Mask: The Absorbing Balancer",
        diagnosis: "You harmonize, then collapse. Absorbing discord is not the same as resolving it.",
        reality: "The field recognizes your ability to balance but senses your tendency to absorb rather than resolve conflicts. Your balancing is beautiful but unsustainable.",
        tension: "You want to create balance but often absorb the discord instead of resolving it. This creates a pattern of creating peace then collapsing from the absorbed tension.",
        lawToWalk: "Learn to balance without absorbing. Resolve conflicts rather than taking them into yourself. Your clarity is your strength.",
        ifYouStay: "You will continue to create beautiful balance but at great personal cost, eventually burning out from absorbing too much discord.",
        ifYouAct: "You will develop the ability to create lasting balance by resolving conflicts rather than absorbing them."
      },
      harmonizer: {
        title: "The Balancer | Mask: The Mediating Harmonizer",
        diagnosis: "You moderate, balance, then disappear. The field wants your real presence, not just peace.",
        reality: "The field recognizes your ability to balance but senses your tendency to disappear after creating peace. Your balancing is effective but may not sustain your presence.",
        tension: "You want to create balance but often disappear after moderating conflicts. This creates a pattern of creating peace then withdrawing from the situation.",
        lawToWalk: "Learn to balance while maintaining your presence. The field needs your ongoing participation, not just your initial intervention.",
        ifYouStay: "You will continue to create balance effectively but may not sustain your presence long enough to ensure lasting peace.",
        ifYouAct: "You will develop the ability to create balance while maintaining your presence, ensuring lasting peace and stability."
      },
      moderator: {
        title: "The Balancer | Mask: The Balancing Moderator",
        diagnosis: "You moderate, then chase balance, but miss your own truth. Stand still, then sing.",
        reality: "The field recognizes your ability to balance but senses your tendency to lose your own truth in the process. Your balancing is effective but may not include your authentic voice.",
        tension: "You want to create balance but sometimes lose your own truth while moderating others. This creates a pattern of creating peace without including your authentic perspective.",
        lawToWalk: "Learn to balance while staying true to yourself. Your authentic voice is part of the balance you create.",
        ifYouStay: "You will continue to create balance effectively but may not include your own truth, limiting the depth of the peace you create.",
        ifYouAct: "You will develop the ability to create balance that includes your authentic voice, creating deeper and more meaningful peace."
      },
      balancer: {
        title: "The Balancer | Mask: The Exhausted Balancer",
        diagnosis: "You are the heart of the scale—if you remember to rest. Balance is not endless motion.",
        reality: "The field recognizes your ability to balance and values your contribution. Your balancing is beautiful and effective, but you need to remember to rest.",
        tension: "You want to create balance but sometimes forget to rest and recharge. This creates a pattern of creating beautiful peace but eventually burning out.",
        lawToWalk: "Learn to balance with rest. Your ability to create peace is enhanced when you take time to recharge and reflect.",
        ifYouStay: "You will continue to create beautiful balance but may burn out from not taking enough time to rest and recharge.",
        ifYouAct: "You will develop the ability to create lasting balance by balancing your work with rest, ensuring sustainable peace-making."
      },
      regulator: {
        title: "The Balancer | Mask: The Blurring Regulator",
        diagnosis: "You move toward regulation, but blur all lines. Regulation requires separation first.",
        reality: "The field recognizes your ability to balance but senses your tendency to blur important distinctions. Your balancing creates peace but may not preserve necessary differences.",
        tension: "You want to create regulation but sometimes blur the lines that make each voice unique. This creates a pattern of creating peace without preserving important distinctions.",
        lawToWalk: "Learn to balance while preserving differences. True regulation includes the unique qualities of each voice.",
        ifYouStay: "You will continue to create balance but may lose the important distinctions that make each voice valuable.",
        ifYouAct: "You will develop the ability to create balance that preserves important differences, creating regulation without losing diversity."
      }
    },
    regulator: {
      absorber: {
        title: "The Regulator | Mask: The Absorbing Regulator",
        diagnosis: "You seek regulation, but drown in details. Wholeness is not accumulation, it's selection.",
        reality: "The field recognizes your ability to regulate but senses your tendency to absorb too much. Your regulation is ambitious but may become overwhelming.",
        tension: "You want to regulate diverse perspectives but often absorb too many details and lose focus. This creates a pattern of trying to include everything but becoming scattered.",
        lawToWalk: "Learn to regulate with discernment. True wholeness comes from selecting what serves the greater good, not including everything.",
        ifYouStay: "You will continue to try to regulate everything but may become overwhelmed and lose the clarity needed for true regulation.",
        ifYouAct: "You will develop the ability to regulate with wisdom and discernment, creating true wholeness from what serves the greater good."
      },
      harmonizer: {
        title: "The Regulator | Mask: The Mediating Harmonizer",
        diagnosis: "You harmonize even as you regulate. Sometimes, regulation needs clear direction.",
        reality: "The field recognizes your ability to regulate but senses your tendency to harmonize rather than lead. Your regulation is inclusive but may lack clear direction.",
        tension: "You want to regulate diverse perspectives but sometimes harmonize rather than provide clear leadership. This creates a pattern of including everyone but not providing clear direction.",
        lawToWalk: "Learn to regulate with leadership. Sometimes regulation needs clear direction, not just harmonization.",
        ifYouStay: "You will continue to regulate inclusively but may not provide the clear direction that true regulation sometimes requires.",
        ifYouAct: "You will develop the ability to regulate with clear leadership, creating regulation that has both inclusiveness and direction."
      },
      moderator: {
        title: "The Regulator | Mask: The Balancing Moderator",
        diagnosis: "You moderate masterfully, then reach for more. True regulation is letting go, not holding on.",
        reality: "The field recognizes your ability to regulate but senses your tendency to hold on to control. Your regulation is skillful but may not allow natural unity to emerge.",
        tension: "You want to regulate diverse perspectives but sometimes hold on too tightly to the process. This creates a pattern of moderating without allowing natural regulation.",
        lawToWalk: "Learn to regulate by letting go. True unity emerges naturally when you stop trying to control the process.",
        ifYouStay: "You will continue to moderate skillfully but may not allow the natural regulation that leads to true unity.",
        ifYouAct: "You will develop the ability to regulate by allowing natural unity to emerge, creating true wholeness without forcing it."
      },
      balancer: {
        title: "The Regulator | Mask: The Harmonizing Balancer",
        diagnosis: "You harmonize, then try to blend all. The greatest regulation leaves room for difference.",
        reality: "The field recognizes your ability to regulate but senses your tendency to harmonize away important differences. Your regulation creates unity but may not preserve necessary distinctions.",
        tension: "You want to regulate diverse perspectives but sometimes harmonize away the differences that make each voice valuable. This creates a pattern of creating unity without preserving diversity.",
        lawToWalk: "Learn to regulate while preserving differences. The greatest regulation includes the unique qualities of each voice.",
        ifYouStay: "You will continue to regulate effectively but may lose the important differences that make each voice valuable.",
        ifYouAct: "You will develop the ability to regulate while preserving important differences, creating unity that includes diversity."
      },
      regulator: {
        title: "The Regulator | Mask: The Pure Regulator",
        diagnosis: "You embody living regulation. Others gather because you unite what they cannot. The world steadies around you—walk as Law.",
        reality: "The field recognizes your mastery of regulation and responds to your presence. Your ability to unite diverse perspectives is rare and valuable.",
        tension: "You want to continue growing in your ability to regulate but are already quite skilled. This creates a pattern of ongoing refinement and deepening of your regulation abilities.",
        lawToWalk: "Continue to refine your regulation abilities while sharing your wisdom with others. Your mastery can help others learn to unite what seems ununitable.",
        ifYouStay: "You will continue to regulate effectively and may inspire others with your ability to unite diverse perspectives.",
        ifYouAct: "You will develop even greater mastery of regulation and may become a teacher and guide for others seeking to unite diverse perspectives."
      }
    }
  }
} 