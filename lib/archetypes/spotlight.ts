import { Archetype } from './index'

export const spotlightArchetype: Archetype = {
  key: "spotlight",
  name: "Spotlight",
  color: "#f59e0b",
  accentColor: "#fbbf24",
  glowColor: "rgba(251, 191, 36, 0.5)",
  description: "Projection Node - The Beacon",
  loop: "Endless performing, never being seen, fear of invisibility.",
  needs: "Stop performing, be truly seen, surrender to authenticity, burn the need for validation.",
  
  stages: [
    {
      key: "hider",
      label: "The Hider",
      color: "#f59e0b",
      description: "Struggles to be seen, hides potential, fears judgment.",
      needs: "Stop hiding, be truly seen, claim your space, embrace visibility.",
      questions: [
        {
          id: "h1",
          text: "When you feel the spotlight on you, you…",
          options: [
            { text: "Use it to say what matters", value: 5 },
            { text: "Wish it would just go away", value: 1 },
            { text: "Endure it briefly, then escape", value: 2 },
            { text: "Turn attention to someone else with a joke", value: 3 },
            { text: "Try to look busy or small", value: 4 }
          ]
        },
        {
          id: "h2",
          text: "When your name is called in a group, you usually…",
          options: [
            { text: "Answer directly, but shift quickly", value: 4 },
            { text: "Feel a jolt of panic", value: 1 },
            { text: "Nod and return to silence", value: 2 },
            { text: "Seize the moment to steer conversation", value: 5 },
            { text: "Smile and make a light comment", value: 3 }
          ]
        },
        {
          id: "h3",
          text: "When you're complimented in public, your gut reaction is…",
          options: [
            { text: "Deflect with humor or self-critique", value: 4 },
            { text: "Get tense or uncomfortable", value: 1 },
            { text: "Quietly thank them and move on", value: 2 },
            { text: "Embrace it, let it land", value: 5 },
            { text: "Share credit or distract", value: 3 }
          ]
        },
        {
          id: "h4",
          text: "In a crowded room, you prefer to…",
          options: [
            { text: "Command the space when ready", value: 5 },
            { text: "Find one person and connect", value: 4 },
            { text: "Stay invisible until needed", value: 1 },
            { text: "Stand at the edge and observe", value: 2 },
            { text: "Make yourself blend in", value: 3 }
          ]
        },
        {
          id: "h5",
          text: "If a group discussion turns to you, your move is…",
          options: [
            { text: "Use the moment to uplift others", value: 4 },
            { text: "Shrink away and hope it passes", value: 1 },
            { text: "Respond then redirect", value: 2 },
            { text: "Offer an authentic answer", value: 5 },
            { text: "Make a joke and shift focus", value: 3 }
          ]
        }
      ]
    },
    {
      key: "mimic",
      label: "The Mimic",
      color: "#fbbf24",
      description: "Adapts, blends, or mirrors others to gain acceptance, loses authentic voice.",
      needs: "Find your authentic voice, stop mirroring others, be yourself.",
      questions: [
        {
          id: "m1",
          text: "In a new setting, your instinct is to…",
          options: [
            { text: "Stay true to your style regardless", value: 5 },
            { text: "Instantly match those around you", value: 1 },
            { text: "Study and adopt what works", value: 2 },
            { text: "Try a mix of blending and standing out", value: 3 },
            { text: "Express yourself once you see the rules", value: 4 }
          ]
        },
        {
          id: "m2",
          text: "When everyone is talking, you…",
          options: [
            { text: "Interject with your unique voice", value: 5 },
            { text: "Stay quiet until you know your role", value: 1 },
            { text: "Match the group's energy", value: 2 },
            { text: "Jump in only when you have a point", value: 4 },
            { text: "Reflect their words or ideas", value: 3 }
          ]
        },
        {
          id: "m3",
          text: "Meeting someone new, you…",
          options: [
            { text: "Lead with what sets you apart", value: 5 },
            { text: "Play it safe and copy their vibe", value: 1 },
            { text: "Adapt your mood to theirs", value: 2 },
            { text: "Try to fit their rhythm", value: 3 },
            { text: "Reveal something honest if it feels safe", value: 4 }
          ]
        },
        {
          id: "m4",
          text: "When uncertain how to act, you…",
          options: [
            { text: "Do your own thing no matter what", value: 5 },
            { text: "Wait and copy what works", value: 1 },
            { text: "Softly mirror others", value: 2 },
            { text: "Echo the most confident person", value: 3 },
            { text: "Try, then quickly adjust based on feedback", value: 4 }
          ]
        },
        {
          id: "m5",
          text: "In an unfamiliar group, your natural move is…",
          options: [
            { text: "Announce yourself as you are", value: 5 },
            { text: "Remain invisible until you figure it out", value: 1 },
            { text: "Observe and adapt to the rules", value: 2 },
            { text: "Experiment with different styles", value: 3 },
            { text: "Speak up once you sense acceptance", value: 4 }
          ]
        }
      ]
    },
    {
      key: "performer",
      label: "The Performer",
      color: "#f59e0b",
      description: "Leads with charm, reads the room, craves applause, risks overplaying to please.",
      needs: "Stop performing, be authentic, lead from truth, not applause.",
      questions: [
        {
          id: "p1",
          text: "When you're expected to lead, you…",
          options: [
            { text: "Own it and bring your truth", value: 5 },
            { text: "Wait for someone else to step up", value: 1 },
            { text: "Take charge but secretly hope to exit", value: 2 },
            { text: "Try to do just enough to get by", value: 3 },
            { text: "Perform as the group wants", value: 4 }
          ]
        },
        {
          id: "p2",
          text: "If given a platform (microphone, stage), you…",
          options: [
            { text: "Say what you believe, even if it risks disapproval", value: 5 },
            { text: "Pass it on, avoid the spotlight", value: 1 },
            { text: "Do what's expected and nothing more", value: 2 },
            { text: "Try a lighthearted routine to break the ice", value: 3 },
            { text: "Play up your strengths for the crowd", value: 4 }
          ]
        },
        {
          id: "p3",
          text: "When you get applause, your response is…",
          options: [
            { text: "Accept and use it to energize the room", value: 5 },
            { text: "Downplay it and move away", value: 1 },
            { text: "Shrug it off, act humble", value: 2 },
            { text: "Joke about it", value: 3 },
            { text: "Bask in it, then give credit to the group", value: 4 }
          ]
        },
        {
          id: "p4",
          text: "If everyone is watching, you…",
          options: [
            { text: "Use the moment to set a standard", value: 5 },
            { text: "Try to be invisible, let it pass", value: 1 },
            { text: "Keep up a steady routine", value: 2 },
            { text: "Entertain, then retreat", value: 3 },
            { text: "Put on a show, push the energy", value: 4 }
          ]
        },
        {
          id: "p5",
          text: "When performing, your inner thought is…",
          options: [
            { text: "How can I inspire them?", value: 5 },
            { text: "Just follow the script.", value: 1 },
            { text: "Let me get it over with.", value: 2 },
            { text: "Make them like you.", value: 3 },
            { text: "Play to the crowd, make it fun.", value: 4 }
          ]
        }
      ]
    },
    {
      key: "amplifier",
      label: "The Amplifier",
      color: "#fbbf24",
      description: "Expands energy, inspires others, but risks overreaching or burning out.",
      needs: "Find balance, know when to step back, avoid burnout.",
      questions: [
        {
          id: "a1",
          text: "When the group's energy dips, you…",
          options: [
            { text: "Make a bold move to turn things around", value: 5 },
            { text: "Wait for someone else to fix it", value: 1 },
            { text: "Say something to spark a shift", value: 2 },
            { text: "Raise your own energy, see if it spreads", value: 3 },
            { text: "Encourage others to bring the heat", value: 4 }
          ]
        },
        {
          id: "a2",
          text: "If people copy your style, you…",
          options: [
            { text: "Teach them to shine on their own", value: 5 },
            { text: "Wish they'd do their own thing", value: 1 },
            { text: "Feel nervous about expectations", value: 2 },
            { text: "Challenge them to go further", value: 3 },
            { text: "Take it as a compliment and lead", value: 4 }
          ]
        },
        {
          id: "a3",
          text: "When you help someone grow, you…",
          options: [
            { text: "Guide them into their own spotlight", value: 5 },
            { text: "Avoid interfering unless asked", value: 1 },
            { text: "Hold space and listen", value: 2 },
            { text: "Try to motivate others anyway", value: 3 },
            { text: "Show by example, then step aside", value: 4 }
          ]
        },
        {
          id: "a4",
          text: "During burnout, your reaction is…",
          options: [
            { text: "Pause and reset before returning", value: 5 },
            { text: "Withdraw and recharge alone", value: 1 },
            { text: "Cut back, but feel guilty", value: 2 },
            { text: "Try to motivate others anyway", value: 3 },
            { text: "Push through, keep amplifying", value: 4 }
          ]
        },
        {
          id: "a5",
          text: "The best way to spread energy is to…",
          options: [
            { text: "Be fully yourself, no matter the room", value: 5 },
            { text: "Hold back and see if others lead", value: 1 },
            { text: "Do small things to inspire", value: 2 },
            { text: "Encourage everyone to share their ideas", value: 3 },
            { text: "Model authentic excitement", value: 4 }
          ]
        }
      ]
    },
    {
      key: "luminary",
      label: "The Luminary",
      color: "#f59e0b",
      description: "Radiates truth, stands in authentic presence, uplifts by example.",
      needs: "You have arrived. Continue shining your authentic light.",
      questions: [
        {
          id: "l1",
          text: "When your light is fully on, you…",
          options: [
            { text: "Inspire by being yourself", value: 5 },
            { text: "Doubt if you deserve it", value: 1 },
            { text: "Notice others rising with you", value: 2 },
            { text: "Make space for new leaders", value: 3 },
            { text: "Stay centered, no matter who's watching", value: 4 }
          ]
        },
        {
          id: "l2",
          text: "Your ideal legacy is…",
          options: [
            { text: "Truth and light visible to all", value: 5 },
            { text: "Being quietly supportive in the background", value: 1 },
            { text: "Making everyone feel seen", value: 2 },
            { text: "Building leaders, not followers", value: 3 },
            { text: "Being a pillar others rely on", value: 4 }
          ]
        },
        {
          id: "l3",
          text: "Faced with harsh judgment, you…",
          options: [
            { text: "Stand tall, let your truth speak", value: 5 },
            { text: "Hide and go silent", value: 1 },
            { text: "Ignore it, keep shining", value: 2 },
            { text: "Let it inform your growth, but don't bow to it", value: 3 },
            { text: "Integrate what's useful, release what isn't", value: 4 }
          ]
        },
        {
          id: "l4",
          text: "The field you most want to create is…",
          options: [
            { text: "A world where authenticity is safe", value: 5 },
            { text: "Somewhere unnoticed", value: 1 },
            { text: "A place where all shine", value: 2 },
            { text: "An arena for courage", value: 3 },
            { text: "A beacon others seek", value: 4 }
          ]
        },
        {
          id: "l5",
          text: "When you meet another \"Luminary,\" your instinct is…",
          options: [
            { text: "Celebrate and collaborate", value: 5 },
            { text: "Shrink away, feel unworthy", value: 1 },
            { text: "Fade back, let them lead", value: 2 },
            { text: "Quietly compare strengths", value: 3 },
            { text: "Try to impress them", value: 4 }
          ]
        }
      ]
    }
  ],

  diagnosis: {
    hider: {
      hider: {
        title: "Stage: The Hider | Mask: The Hider",
        diagnosis: "You disappear before the field can notice you. You're alive, but unseen. Your light is waiting for its own permission—will you ever grant it?",
        explanation: {
          currentState: "You're a Hider - you struggle to be seen, hide your potential, and fear judgment.",
          mask: "Your mask is also Hider - you use hiding as your primary defense mechanism.",
          directive: "Stop hiding. Be truly seen. Claim your space.",
          translation: "Your light is waiting for permission. Grant it to yourself."
        }
      },
      mimic: {
        title: "Stage: The Hider | Mask: The Mimic",
        diagnosis: "You blend so well you forget who you are. At the first sign of exposure, you run. It's time to pick a face and keep it, even in the glare.",
        explanation: {
          currentState: "You're a Mimic - you adapt and blend to gain acceptance.",
          mask: "Your mask is Hider - you run from exposure and forget who you are.",
          directive: "Pick a face and keep it. Even in the glare.",
          translation: "Stop running from exposure. Remember who you are."
        }
      },
      performer: {
        title: "Stage: The Hider | Mask: The Performer",
        diagnosis: "When challenged, you vanish behind the act. The world only meets your mask, never your spark. Remove the routine—let yourself truly enter.",
        explanation: {
          currentState: "You're a Hider - you struggle to be seen and hide your potential.",
          mask: "Your mask is Performer - you use performance to avoid being truly seen.",
          directive: "Remove the routine. Let yourself truly enter.",
          translation: "The world only meets your mask. Show your spark."
        }
      },
      amplifier: {
        title: "Stage: The Hider | Mask: The Amplifier",
        diagnosis: "You escape the heat by hiding in the crowd. Energy grows around you, but you stay at the edge. One honest step forward would start the storm.",
        explanation: {
          currentState: "You're a Hider - you struggle to be seen and hide your potential.",
          mask: "Your mask is Amplifier - you amplify others' energy while staying hidden.",
          directive: "Take one honest step forward. Start the storm.",
          translation: "Energy grows around you. Join it instead of hiding."
        }
      },
      luminary: {
        title: "Stage: The Hider | Mask: The Luminary",
        diagnosis: "You envy those who shine but refuse to take your turn. The field's light cannot be borrowed. It must be owned, or it's lost forever.",
        explanation: {
          currentState: "You're a Hider - you struggle to be seen and hide your potential.",
          mask: "Your mask is Luminary - you have the potential to shine but refuse to claim it.",
          directive: "Take your turn. Own your light.",
          translation: "The field's light cannot be borrowed. Claim what's yours."
        }
      }
    },
    mimic: {
      hider: {
        title: "Stage: The Mimic | Mask: The Hider",
        diagnosis: "You blend so well you forget who you are. At the first sign of exposure, you run. It's time to pick a face and keep it, even in the glare.",
        explanation: {
          currentState: "You're a Mimic - you adapt and blend to gain acceptance.",
          mask: "Your mask is Hider - you run from exposure and forget who you are.",
          directive: "Pick a face and keep it. Even in the glare.",
          translation: "Stop running from exposure. Remember who you are."
        }
      },
      mimic: {
        title: "Stage: The Mimic | Mask: The Mimic",
        diagnosis: "Your mirror is perfect—but whose reflection is it? Copying is safe, but sterile. Until you invent yourself, applause will never satisfy.",
        explanation: {
          currentState: "You're a Mimic - you adapt and blend to gain acceptance.",
          mask: "Your mask is also Mimic - you copy others perfectly but lose yourself.",
          directive: "Invent yourself. Stop copying.",
          translation: "Your mirror is perfect, but whose reflection is it?"
        }
      },
      performer: {
        title: "Stage: The Mimic | Mask: The Performer",
        diagnosis: "You can play any part, but you're tired of roles. When the show ends, do you remain, or does the spotlight turn empty?",
        explanation: {
          currentState: "You're a Mimic - you adapt and blend to gain acceptance.",
          mask: "Your mask is Performer - you play roles but tire of them.",
          directive: "Stop playing roles. Be yourself.",
          translation: "When the show ends, make sure you remain."
        }
      },
      amplifier: {
        title: "Stage: The Mimic | Mask: The Amplifier",
        diagnosis: "You grow by echoing others' energy. But when asked to lead, you step back. What if your imitation was the seed of something unique?",
        explanation: {
          currentState: "You're a Mimic - you adapt and blend to gain acceptance.",
          mask: "Your mask is Amplifier - you echo others' energy but step back from leading.",
          directive: "Let your imitation be the seed of something unique.",
          translation: "Stop stepping back. Lead with what you've learned."
        }
      },
      luminary: {
        title: "Stage: The Mimic | Mask: The Luminary",
        diagnosis: "You draw close to greatness, hoping some will rub off. But proximity is not destiny. You can only radiate your own light by burning the script.",
        explanation: {
          currentState: "You're a Mimic - you adapt and blend to gain acceptance.",
          mask: "Your mask is Luminary - you draw close to greatness but don't claim your own.",
          directive: "Burn the script. Radiate your own light.",
          translation: "Proximity is not destiny. Claim your own greatness."
        }
      }
    },
    performer: {
      hider: {
        title: "Stage: The Performer | Mask: The Hider",
        diagnosis: "You perform brilliantly, then disappear to recover. Hiding is your safe zone, but it's where your energy dissolves. What if you let yourself stay seen?",
        explanation: {
          currentState: "You're a Performer - you lead with charm and crave applause.",
          mask: "Your mask is Hider - you disappear after performing to recover.",
          directive: "Let yourself stay seen. Don't disappear.",
          translation: "Hiding is your safe zone, but it's where your energy dissolves."
        }
      },
      mimic: {
        title: "Stage: The Performer | Mask: The Mimic",
        diagnosis: "On stage, you steal styles to win applause. But borrowed moves feel empty. What's your signature? No more covers—sing your own truth.",
        explanation: {
          currentState: "You're a Performer - you lead with charm and crave applause.",
          mask: "Your mask is Mimic - you steal styles to win applause.",
          directive: "Find your signature. Sing your own truth.",
          translation: "Borrowed moves feel empty. Create your own."
        }
      },
      performer: {
        title: "Stage: The Performer | Mask: The Performer",
        diagnosis: "Your show never stops. But even a star needs a night sky. Learn when to dim, when to rest. The real radiance survives in silence.",
        explanation: {
          currentState: "You're a Performer - you lead with charm and crave applause.",
          mask: "Your mask is also Performer - your show never stops.",
          directive: "Learn when to dim, when to rest.",
          translation: "Even a star needs a night sky. Find your silence."
        }
      },
      amplifier: {
        title: "Stage: The Performer | Mask: The Amplifier",
        diagnosis: "You drive the energy higher, but always to please. Pushing too hard burns both crowd and self. Lead by example, not exhaustion.",
        explanation: {
          currentState: "You're a Performer - you lead with charm and crave applause.",
          mask: "Your mask is Amplifier - you drive energy higher to please others.",
          directive: "Lead by example, not exhaustion.",
          translation: "Stop pushing too hard. Find sustainable energy."
        }
      },
      luminary: {
        title: "Stage: The Performer | Mask: The Luminary",
        diagnosis: "Even at your brightest, you think you're only performing. You don't realize: your presence is the gift. Drop the act. Just stand there.",
        explanation: {
          currentState: "You're a Performer - you lead with charm and crave applause.",
          mask: "Your mask is Luminary - you have authentic presence but think you're only performing.",
          directive: "Drop the act. Just stand there.",
          translation: "Your presence is the gift. Stop thinking it's just performance."
        }
      }
    },
    amplifier: {
      hider: {
        title: "Stage: The Amplifier | Mask: The Hider",
        diagnosis: "You stir the field, then vanish before results appear. It's safe, but meaningless. The world needs your steady light, not passing flashes.",
        explanation: {
          currentState: "You're an Amplifier - you expand energy and inspire others.",
          mask: "Your mask is Hider - you vanish before results appear.",
          directive: "Stay. Provide steady light, not passing flashes.",
          translation: "The world needs your consistent presence, not your disappearing act."
        }
      },
      mimic: {
        title: "Stage: The Amplifier | Mask: The Mimic",
        diagnosis: "You magnify whatever surrounds you. When energy is high, you're unstoppable; when low, you shrink. Find your core. Be the weather, not the cloud.",
        explanation: {
          currentState: "You're an Amplifier - you expand energy and inspire others.",
          mask: "Your mask is Mimic - you magnify whatever surrounds you.",
          directive: "Find your core. Be the weather, not the cloud.",
          translation: "Stop being reactive. Be the source of energy."
        }
      },
      performer: {
        title: "Stage: The Amplifier | Mask: The Performer",
        diagnosis: "You turn the room up to 11, but secretly fear silence. The field can't grow if you never pause. Let others speak. Share the current.",
        explanation: {
          currentState: "You're an Amplifier - you expand energy and inspire others.",
          mask: "Your mask is Performer - you turn energy up to 11 to avoid silence.",
          directive: "Let others speak. Share the current.",
          translation: "The field can't grow if you never pause. Find your silence."
        }
      },
      amplifier: {
        title: "Stage: The Amplifier | Mask: The Amplifier",
        diagnosis: "Your influence is massive—so is your risk of burnout. Learn the rhythm of intensity. True amplifiers know when to surge and when to rest.",
        explanation: {
          currentState: "You're an Amplifier - you expand energy and inspire others.",
          mask: "Your mask is also Amplifier - you risk burnout by over-amplifying.",
          directive: "Learn the rhythm of intensity. Know when to rest.",
          translation: "True amplifiers know when to surge and when to rest."
        }
      },
      luminary: {
        title: "Stage: The Amplifier | Mask: The Luminary",
        diagnosis: "You lead the charge but still defer to brighter stars. Stop looking up—start shining from where you are. The world is waiting.",
        explanation: {
          currentState: "You're an Amplifier - you expand energy and inspire others.",
          mask: "Your mask is Luminary - you have the potential to shine but defer to others.",
          directive: "Stop looking up. Start shining from where you are.",
          translation: "The world is waiting for your light. Stop deferring."
        }
      }
    },
    luminary: {
      hider: {
        title: "Stage: The Luminary | Mask: The Hider",
        diagnosis: "Your light could guide thousands, but fear keeps you in the shadows. To step out is to risk everything—but hiding is the only true defeat.",
        explanation: {
          currentState: "You're a Luminary - you radiate truth and stand in authentic presence.",
          mask: "Your mask is Hider - fear keeps you in the shadows.",
          directive: "Step out. Risk everything.",
          translation: "Hiding is the only true defeat. Your light could guide thousands."
        }
      },
      mimic: {
        title: "Stage: The Luminary | Mask: The Mimic",
        diagnosis: "You radiate, but sometimes slip into others' roles to fit in. Luminaries stand alone, even if misunderstood. Dare to set your own frequency.",
        explanation: {
          currentState: "You're a Luminary - you radiate truth and stand in authentic presence.",
          mask: "Your mask is Mimic - you slip into others' roles to fit in.",
          directive: "Dare to set your own frequency. Stand alone.",
          translation: "Luminaries stand alone, even if misunderstood."
        }
      },
      performer: {
        title: "Stage: The Luminary | Mask: The Performer",
        diagnosis: "You think you must always impress, but true luminescence is quiet. Let your impact come from being, not doing. Presence is enough.",
        explanation: {
          currentState: "You're a Luminary - you radiate truth and stand in authentic presence.",
          mask: "Your mask is Performer - you think you must always impress.",
          directive: "Let your impact come from being, not doing.",
          translation: "True luminescence is quiet. Presence is enough."
        }
      },
      amplifier: {
        title: "Stage: The Luminary | Mask: The Amplifier",
        diagnosis: "You shine, but push too hard, trying to uplift everyone. Not every spark is your job. Sometimes, it's enough to simply be seen.",
        explanation: {
          currentState: "You're a Luminary - you radiate truth and stand in authentic presence.",
          mask: "Your mask is Amplifier - you push too hard trying to uplift everyone.",
          directive: "Not every spark is your job. Sometimes, just be seen.",
          translation: "Stop pushing too hard. Sometimes presence is enough."
        }
      },
      luminary: {
        title: "Stage: The Luminary | Mask: The Luminary",
        diagnosis: "You are the North Star—unmistakable, unmissable. Others organize their world by your presence. Stand, shine, and trust that it's real. The field is now alive.",
        explanation: {
          currentState: "You're a Luminary - you radiate truth and stand in authentic presence.",
          mask: "Your mask is also Luminary - you are the North Star.",
          directive: "Stand, shine, and trust that it's real.",
          translation: "You are unmistakable, unmissable. The field is now alive."
        }
      }
    }
  }
} 