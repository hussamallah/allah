export const wandererArchetype: Archetype = {
  key: "wanderer",
  name: "Wanderer",
  color: "#0891b2",
  accentColor: "#06b6d4",
  glowColor: "rgba(6, 182, 212, 0.5)",
  description: "Flux Node - The Anchorless Trap",
  loop: "Constant movement, avoiding commitment, fear of settling.",
  needs: "Find anchor, commit to place, burn the need to wander.",
  
  stages: [
    {
      key: "nomad",
      label: "The Nomad",
      color: "#0891b2",
      description: "You're constantly moving, avoiding commitment and settling. You fear being trapped in one place or situation.",
      needs: "Find anchor, commit to place, burn the need to wander.",
      questions: [
        {
          id: "q1",
          text: "The moment you arrive somewhere new, you…",
          options: [
            { text: "Feel the urge to move again", value: 1 },
            { text: "Scan for the exit in case you need it", value: 2 },
            { text: "Unpack, but feel restless already", value: 3 },
            { text: "Settle temporarily, never fully unpack", value: 4 },
            { text: "Wonder where you'll go next", value: 5 }
          ]
        },
        {
          id: "q2",
          text: "If someone asks where you belong, you…",
          options: [
            { text: "Shrug, you're not sure", value: 1 },
            { text: "List everywhere you've been", value: 2 },
            { text: "Laugh and give a non-answer", value: 3 },
            { text: "Share one place that felt right", value: 4 },
            { text: "Say \"anywhere the wind takes me\"", value: 5 }
          ]
        },
        {
          id: "q3",
          text: "Your approach to possessions is…",
          options: [
            { text: "Keep only what you can carry", value: 1 },
            { text: "Lose things often, don't mind", value: 2 },
            { text: "Trade or adapt items for each place", value: 3 },
            { text: "Collect memories, not stuff", value: 4 },
            { text: "Give away things as you move", value: 5 }
          ]
        },
        {
          id: "q4",
          text: "When forced to stay put, you…",
          options: [
            { text: "Daydream about leaving", value: 1 },
            { text: "Grow impatient", value: 2 },
            { text: "Make loose plans to break free", value: 3 },
            { text: "Change your space to feel new", value: 4 },
            { text: "Get creative with new mini-adventures", value: 5 }
          ]
        },
        {
          id: "q5",
          text: "To you, \"home\" means…",
          options: [
            { text: "A series of stops", value: 1 },
            { text: "Temporary comfort", value: 2 },
            { text: "People you meet along the way", value: 3 },
            { text: "Anywhere you can start over", value: 4 },
            { text: "A feeling, not a place", value: 5 }
          ]
        }
      ]
    },
    {
      key: "drifter",
      label: "The Drifter",
      color: "#06b6d4",
      description: "You drift along with the flow, adapting to change but rarely steering your own course.",
      needs: "Find direction, make choices, burn the need to drift.",
      questions: [
        {
          id: "q6",
          text: "When plans change unexpectedly, you…",
          options: [
            { text: "Lose focus, wander off", value: 1 },
            { text: "Drift along, see what unfolds", value: 2 },
            { text: "Get nervous, but adapt", value: 3 },
            { text: "Turn it into an adventure", value: 4 },
            { text: "Try to steer, but accept chaos", value: 5 }
          ]
        },
        {
          id: "q7",
          text: "Your social life feels like…",
          options: [
            { text: "A stream of short connections", value: 1 },
            { text: "People come and go, few stay", value: 2 },
            { text: "Reconnecting randomly", value: 3 },
            { text: "More drifting than anchoring", value: 4 },
            { text: "Flowing between circles, never fixed", value: 5 }
          ]
        },
        {
          id: "q8",
          text: "When you're lost, you…",
          options: [
            { text: "Enjoy not knowing where you are", value: 1 },
            { text: "Pause and let the answer come", value: 2 },
            { text: "Ask directions, but might not follow", value: 3 },
            { text: "Keep moving, trusting it will work out", value: 4 },
            { text: "Take the long way for new scenery", value: 5 }
          ]
        },
        {
          id: "q9",
          text: "In group situations, you…",
          options: [
            { text: "Don't fully commit to any", value: 1 },
            { text: "Stay on the edge", value: 2 },
            { text: "Fade in and out", value: 3 },
            { text: "Mix, but always keep options open", value: 4 },
            { text: "Float, never settle in one", value: 5 }
          ]
        },
        {
          id: "q10",
          text: "When stability appears, you…",
          options: [
            { text: "Distrust it, expecting it to end", value: 1 },
            { text: "Rest, but only briefly", value: 2 },
            { text: "Drift, but consider anchoring", value: 3 },
            { text: "Start seeking new energy", value: 4 },
            { text: "Stay, but ready to leave", value: 5 }
          ]
        }
      ]
    },
    {
      key: "seeker",
      label: "The Seeker",
      color: "#0891b2",
      description: "You seek meaning and purpose through exploration and discovery, driven by curiosity and wonder.",
      needs: "Find your true quest, commit to the search, burn the need for endless seeking.",
      questions: [
        {
          id: "q11",
          text: "Your heart's pull is toward…",
          options: [
            { text: "New mysteries", value: 1 },
            { text: "Wisdom gained from wandering", value: 2 },
            { text: "The horizon, whatever it holds", value: 3 },
            { text: "Growth over comfort", value: 4 },
            { text: "Questions that never end", value: 5 }
          ]
        },
        {
          id: "q12",
          text: "The unknown makes you feel…",
          options: [
            { text: "Restless until it's known", value: 1 },
            { text: "Both lost and alive", value: 2 },
            { text: "Motivated to explore", value: 3 },
            { text: "Curious, not afraid", value: 4 },
            { text: "At home, like you belong", value: 5 }
          ]
        },
        {
          id: "q13",
          text: "You know you're on the right path when…",
          options: [
            { text: "You feel both fear and excitement", value: 1 },
            { text: "Others doubt, but you continue", value: 2 },
            { text: "There are surprises", value: 3 },
            { text: "You learn something new", value: 4 },
            { text: "The route isn't mapped", value: 5 }
          ]
        },
        {
          id: "q14",
          text: "The hardest thing to find is…",
          options: [
            { text: "Final answers", value: 1 },
            { text: "A pattern in chaos", value: 2 },
            { text: "Peace in uncertainty", value: 3 },
            { text: "True belonging", value: 4 },
            { text: "Meaning in the wandering", value: 5 }
          ]
        },
        {
          id: "q15",
          text: "If you had to stay in one place, you would…",
          options: [
            { text: "Plan future escapes", value: 1 },
            { text: "Make quests in daily life", value: 2 },
            { text: "Become restless, then creative", value: 3 },
            { text: "Seek new adventures in the familiar", value: 4 },
            { text: "Turn inward for answers", value: 5 }
          ]
        }
      ]
    },
    {
      key: "edge-walker",
      label: "The Edge-Walker",
      color: "#06b6d4",
      description: "You walk the boundaries between worlds, testing limits and finding freedom in the spaces between.",
      needs: "Find your center, choose your ground, burn the need to always be on the edge.",
      questions: [
        {
          id: "q16",
          text: "When you find a border, you…",
          options: [
            { text: "Wonder who drew it", value: 1 },
            { text: "Step over without hesitation", value: 2 },
            { text: "Cross, then look back", value: 3 },
            { text: "Get close, test its strength", value: 4 },
            { text: "Stay just on the edge", value: 5 }
          ]
        },
        {
          id: "q17",
          text: "The meaning of \"risk\" is…",
          options: [
            { text: "A game of timing", value: 1 },
            { text: "Necessary, but scary", value: 2 },
            { text: "Something that wakes you up", value: 3 },
            { text: "An invitation to learn", value: 4 },
            { text: "The call to test what's real", value: 5 }
          ]
        },
        {
          id: "q18",
          text: "The most alive you feel is…",
          options: [
            { text: "When safety vanishes", value: 1 },
            { text: "In the company of edge-walkers", value: 2 },
            { text: "At the first step into unknown", value: 3 },
            { text: "Where comfort ends", value: 4 },
            { text: "On the verge of discovery", value: 5 }
          ]
        },
        {
          id: "q19",
          text: "When pressured to commit, you…",
          options: [
            { text: "Buy time, look for escape", value: 1 },
            { text: "Name your limits", value: 2 },
            { text: "Say yes, but resist fully landing", value: 3 },
            { text: "Find a way to keep moving", value: 4 },
            { text: "Commit for now, but never forever", value: 5 }
          ]
        },
        {
          id: "q20",
          text: "You draw others who are…",
          options: [
            { text: "Anchored, but drawn to freedom", value: 1 },
            { text: "Curious, but cautious", value: 2 },
            { text: "Also restless and wild", value: 3 },
            { text: "Lost, searching for newness", value: 4 },
            { text: "Edge-seekers, like you", value: 5 }
          ]
        }
      ]
    },
    {
      key: "anchor",
      label: "The Anchor",
      color: "#0891b2",
      description: "You've found your true destination and can commit deeply while still maintaining your sense of adventure.",
      needs: "Build lasting foundations, share your wisdom, burn the need for constant movement.",
      questions: [
        {
          id: "q21",
          text: "When you root somewhere, you…",
          options: [
            { text: "Test the roots, unsure they'll hold", value: 1 },
            { text: "Still feel pulled by distant winds", value: 2 },
            { text: "Treasure the calm, even if rare", value: 3 },
            { text: "Gather others, make a haven", value: 4 },
            { text: "Invest fully, but leave space for change", value: 5 }
          ]
        },
        {
          id: "q22",
          text: "Your vision of \"belonging\" is…",
          options: [
            { text: "Accepting arrivals and departures", value: 1 },
            { text: "Building, then rebuilding", value: 2 },
            { text: "Being present, but not trapped", value: 3 },
            { text: "Creating space for others to land", value: 4 },
            { text: "Enduring storms together", value: 5 }
          ]
        },
        {
          id: "q23",
          text: "If others come and go, you…",
          options: [
            { text: "Wonder if you should leave too", value: 1 },
            { text: "Remain open, never closing doors", value: 2 },
            { text: "Learn from each arrival", value: 3 },
            { text: "Adapt, build again", value: 4 },
            { text: "Stay, hold space for their return", value: 5 }
          ]
        },
        {
          id: "q24",
          text: "Your anchor is strongest when…",
          options: [
            { text: "You rest, but know you may move", value: 1 },
            { text: "It's tested by change", value: 2 },
            { text: "It lets you grow", value: 3 },
            { text: "Others help you hold", value: 4 },
            { text: "You choose it, not by force", value: 5 }
          ]
        },
        {
          id: "q25",
          text: "The field you wish to build is…",
          options: [
            { text: "Stable, yet flexible", value: 1 },
            { text: "Always welcoming, never stuck", value: 2 },
            { text: "Centered, but with many exits", value: 3 },
            { text: "Open, ever-changing, but rooted", value: 4 },
            { text: "Safe for those who wander in", value: 5 }
          ]
        }
      ]
    }
  ],

  diagnosis: {
    nomad: {
      nomad: {
        title: "The Eternal Nomad",
        diagnosis: "You're trapped in endless movement, never finding true rest or purpose.",
        reality: "You're constantly seeking the next thing, the next place, the next experience, but never finding satisfaction.",
        tension: "Your movement is a defense mechanism against facing your deeper needs and fears.",
        lawToWalk: "Stop running. Find one place, one thing, one person to commit to fully. Burn your need for constant movement.",
        ifYouStay: "You'll continue to drift aimlessly, never building anything lasting or meaningful.",
        ifYouAct: "You'll find true freedom in choosing to stay and build something that matters."
      },
      drifter: {
        title: "The Restless Drifter",
        diagnosis: "You drift along with the flow but can't find direction or purpose.",
        reality: "You adapt to whatever comes your way but rarely make conscious choices about your path.",
        tension: "You use drifting as a mask to avoid making difficult decisions and commitments.",
        lawToWalk: "Choose your direction. Make conscious decisions about where you're going. Burn your need to just go with the flow.",
        ifYouStay: "You'll continue to be carried by circumstances rather than steering your own course.",
        ifYouAct: "You'll find power in making choices and taking responsibility for your path."
      },
      seeker: {
        title: "The Aimless Seeker",
        diagnosis: "You seek endlessly but can't commit to what you find.",
        reality: "You're driven by curiosity and wonder but avoid the deeper work of building and maintaining.",
        tension: "You use seeking as a mask to avoid the vulnerability of staying put and building something lasting.",
        lawToWalk: "Choose your quest and commit to it fully. Stop seeking and start building. Burn your need for endless discovery.",
        ifYouStay: "You'll continue to wander from one discovery to the next without ever creating anything meaningful.",
        ifYouAct: "You'll find purpose in committing to a path and building something that matters."
      },
      "edge-walker": {
        title: "The Boundary Nomad",
        diagnosis: "You walk the edges but can't find your center or choose your ground.",
        reality: "You test limits and boundaries but avoid committing to any particular space or path.",
        tension: "You use edge-walking as a mask to avoid the vulnerability of choosing and committing.",
        lawToWalk: "Find your center. Choose your ground. Burn your need to always be on the edge.",
        ifYouStay: "You'll continue to drift between worlds without ever choosing your own space.",
        ifYouAct: "You'll find power in choosing your ground and building from a place of strength."
      },
      anchor: {
        title: "The Reluctant Anchor",
        diagnosis: "You have the capacity for deep commitment but still resist it.",
        reality: "You can see the value of staying put and building something lasting, but your old patterns pull you away.",
        tension: "You use your anchor potential as a mask to avoid the vulnerability of true commitment.",
        lawToWalk: "Embrace your role as an anchor. Build something lasting. Burn your resistance to staying put.",
        ifYouStay: "You'll continue to resist your own anchoring and miss opportunities to build something meaningful.",
        ifYouAct: "You'll find fulfillment in being a stable foundation for yourself and others."
      }
    },
    drifter: {
      nomad: {
        title: "The Directionless Wanderer",
        diagnosis: "You move constantly but lack purpose and direction in your movement.",
        reality: "You're always going somewhere but never sure where or why you're going there.",
        tension: "You use movement as a mask to avoid making conscious choices about your life.",
        lawToWalk: "Find your direction. Make conscious choices about where you're going. Burn your need for aimless movement.",
        ifYouStay: "You'll continue to drift without purpose, never building anything meaningful.",
        ifYouAct: "You'll find power in choosing your path and moving with intention."
      },
      drifter: {
        title: "The Eternal Drifter",
        diagnosis: "You drift along with the flow, never taking control of your own course.",
        reality: "You adapt to whatever comes your way but rarely make conscious decisions about your path.",
        tension: "You use drifting as a mask to avoid responsibility and commitment.",
        lawToWalk: "Take control of your course. Make conscious decisions. Burn your need to just go with the flow.",
        ifYouStay: "You'll continue to be carried by circumstances rather than steering your own life.",
        ifYouAct: "You'll find power in making choices and taking responsibility for your path."
      },
      seeker: {
        title: "The Passive Seeker",
        diagnosis: "You seek but let others or circumstances determine what you find.",
        reality: "You're curious and open but don't actively pursue what you're looking for.",
        tension: "You use passive seeking as a mask to avoid the work of actively choosing and pursuing.",
        lawToWalk: "Choose your quest and pursue it actively. Stop waiting for things to come to you. Burn your need for passive discovery.",
        ifYouStay: "You'll continue to wait for meaning to find you rather than actively seeking it.",
        ifYouAct: "You'll find purpose in actively pursuing what matters to you."
      },
      "edge-walker": {
        title: "The Passive Edge-Walker",
        diagnosis: "You walk the edges but let circumstances determine which boundaries you test.",
        reality: "You test limits but don't actively choose which boundaries matter to you.",
        tension: "You use passive edge-walking as a mask to avoid choosing your own ground.",
        lawToWalk: "Choose your edges. Find your center. Burn your need to just drift along boundaries.",
        ifYouStay: "You'll continue to drift between worlds without ever choosing your own space.",
        ifYouAct: "You'll find power in choosing your ground and walking your own edges."
      },
      anchor: {
        title: "The Hesitant Anchor",
        diagnosis: "You can be stable but hesitate to fully commit to your anchoring role.",
        reality: "You have the capacity to be a foundation but still resist the full responsibility of anchoring.",
        tension: "You use hesitant anchoring as a mask to avoid the full commitment of being a true foundation.",
        lawToWalk: "Embrace your anchoring role fully. Build lasting foundations. Burn your hesitation to commit.",
        ifYouStay: "You'll continue to hesitate in your anchoring and miss opportunities to build something lasting.",
        ifYouAct: "You'll find fulfillment in being a stable foundation for yourself and others."
      }
    },
    seeker: {
      nomad: {
        title: "The Purposeful Wanderer",
        diagnosis: "You seek with purpose but still struggle with deep commitment.",
        reality: "You explore with meaning and direction, but you still avoid the vulnerability of staying put.",
        tension: "You use purposeful seeking as a mask to avoid the deeper work of building and maintaining.",
        lawToWalk: "Choose your destination and commit to building there. Stop seeking and start creating. Burn your need for constant discovery.",
        ifYouStay: "You'll continue to seek without ever building what you find meaningful.",
        ifYouAct: "You'll find fulfillment in committing to what you discover and building upon it."
      },
      drifter: {
        title: "The Active Seeker",
        diagnosis: "You seek actively but still drift between different quests and discoveries.",
        reality: "You pursue meaning and purpose but struggle to commit to any particular path or discovery.",
        tension: "You use active seeking as a mask to avoid the vulnerability of choosing one path and sticking to it.",
        lawToWalk: "Choose your quest and commit to it fully. Stop drifting between discoveries. Burn your need for endless options.",
        ifYouStay: "You'll continue to drift between different quests without ever completing any of them.",
        ifYouAct: "You'll find fulfillment in committing to one quest and seeing it through to completion."
      },
      seeker: {
        title: "The Balanced Seeker",
        diagnosis: "You seek with purpose and are learning to commit to what you find meaningful.",
        reality: "You explore with direction and meaning, and you're developing the capacity to build upon your discoveries.",
        tension: "You use balanced seeking as a mask to avoid the full vulnerability of complete commitment.",
        lawToWalk: "Deepen your commitments. Choose fewer quests and pursue them more fully. Burn your need for constant variety.",
        ifYouStay: "You'll continue to seek without ever fully committing to what you find meaningful.",
        ifYouAct: "You'll find fulfillment in committing to your discoveries and building something lasting."
      },
      "edge-walker": {
        title: "The Seeking Edge-Walker",
        diagnosis: "You seek while walking the edges, testing boundaries in your quest for meaning.",
        reality: "You explore boundaries and limits as part of your search for purpose and understanding.",
        tension: "You use seeking at the edges as a mask to avoid choosing your own ground and committing to it.",
        lawToWalk: "Choose your ground. Find your center. Burn your need to always be testing boundaries.",
        ifYouStay: "You'll continue to test boundaries without ever choosing your own space to build.",
        ifYouAct: "You'll find power in choosing your ground and building from a place of strength."
      },
      anchor: {
        title: "The Seeking Anchor",
        diagnosis: "You seek meaning and purpose while developing the capacity to be a stable foundation.",
        reality: "You explore and discover while learning to commit to what you find meaningful and build upon it.",
        tension: "You use seeking while anchoring as a mask to avoid the full vulnerability of complete commitment.",
        lawToWalk: "Commit to what you discover. Build lasting foundations. Burn your need to always be seeking more.",
        ifYouStay: "You'll continue to seek without ever fully committing to what you find meaningful.",
        ifYouAct: "You'll find fulfillment in committing to your discoveries and building something lasting."
      }
    },
    "edge-walker": {
      nomad: {
        title: "The Boundary Wanderer",
        diagnosis: "You walk the edges while constantly moving, never finding your center.",
        reality: "You test limits and boundaries but avoid committing to any particular space or path.",
        tension: "You use edge-walking as a mask to avoid the vulnerability of choosing and committing.",
        lawToWalk: "Find your center. Choose your ground. Burn your need to always be on the move at the edges.",
        ifYouStay: "You'll continue to drift between boundaries without ever choosing your own space.",
        ifYouAct: "You'll find power in choosing your ground and building from a place of strength."
      },
      drifter: {
        title: "The Passive Edge-Walker",
        diagnosis: "You walk the edges but let circumstances determine which boundaries you test.",
        reality: "You test limits but don't actively choose which boundaries matter to you.",
        tension: "You use passive edge-walking as a mask to avoid choosing your own ground.",
        lawToWalk: "Choose your edges. Find your center. Burn your need to just drift along boundaries.",
        ifYouStay: "You'll continue to drift between worlds without ever choosing your own space.",
        ifYouAct: "You'll find power in choosing your ground and walking your own edges."
      },
      seeker: {
        title: "The Seeking Edge-Walker",
        diagnosis: "You seek while walking the edges, testing boundaries in your quest for meaning.",
        reality: "You explore boundaries and limits as part of your search for purpose and understanding.",
        tension: "You use seeking at the edges as a mask to avoid choosing your own ground and committing to it.",
        lawToWalk: "Choose your ground. Find your center. Burn your need to always be testing boundaries.",
        ifYouStay: "You'll continue to test boundaries without ever choosing your own space to build.",
        ifYouAct: "You'll find power in choosing your ground and building from a place of strength."
      },
      "edge-walker": {
        title: "The True Edge-Walker",
        diagnosis: "You walk the edges with purpose and choose which boundaries to test.",
        reality: "You test limits and boundaries consciously, choosing which edges matter to you.",
        tension: "You use edge-walking as a mask to avoid the vulnerability of choosing your own ground and staying there.",
        lawToWalk: "Find your center. Choose your ground. Burn your need to always be on the edge.",
        ifYouStay: "You'll continue to walk edges without ever choosing your own space to build.",
        ifYouAct: "You'll find power in choosing your ground and building from a place of strength."
      },
      anchor: {
        title: "The Anchored Edge-Walker",
        diagnosis: "You walk the edges while developing the capacity to be a stable foundation.",
        reality: "You test boundaries and limits while learning to commit to what matters and build upon it.",
        tension: "You use edge-walking while anchoring as a mask to avoid the full vulnerability of complete commitment.",
        lawToWalk: "Choose your ground. Build lasting foundations. Burn your need to always be testing boundaries.",
        ifYouStay: "You'll continue to test boundaries without ever fully committing to what matters.",
        ifYouAct: "You'll find power in choosing your ground and building something lasting."
      }
    },
    anchor: {
      nomad: {
        title: "The Wise Wanderer",
        diagnosis: "You have the wisdom to guide others but still resist your own anchoring.",
        reality: "You can help others find their way and commit to their paths, but you still avoid your own deep commitments.",
        tension: "You use your wisdom and guidance as a mask to avoid your own vulnerability and commitment.",
        lawToWalk: "Apply your own wisdom to yourself. Choose your own path and commit to it fully. Burn your resistance to your own anchoring.",
        ifYouStay: "You'll continue to guide others without ever fully committing to your own path.",
        ifYouAct: "You'll find fulfillment in committing to your own path and being a true anchor for others."
      },
      drifter: {
        title: "The Guiding Drifter",
        diagnosis: "You can guide others but still drift in your own life and commitments.",
        reality: "You have the capacity to help others find direction but still struggle to choose your own path.",
        tension: "You use your guidance as a mask to avoid making your own choices and commitments.",
        lawToWalk: "Choose your own path. Make your own commitments. Burn your need to always be guiding others.",
        ifYouStay: "You'll continue to guide others without ever fully committing to your own path.",
        ifYouAct: "You'll find fulfillment in choosing your own path and being a true anchor for others."
      },
      seeker: {
        title: "The Seeking Anchor",
        diagnosis: "You seek meaning and purpose while developing the capacity to be a stable foundation.",
        reality: "You explore and discover while learning to commit to what you find meaningful and build upon it.",
        tension: "You use seeking while anchoring as a mask to avoid the full vulnerability of complete commitment.",
        lawToWalk: "Commit to what you discover. Build lasting foundations. Burn your need to always be seeking more.",
        ifYouStay: "You'll continue to seek without ever fully committing to what you find meaningful.",
        ifYouAct: "You'll find fulfillment in committing to your discoveries and building something lasting."
      },
      "edge-walker": {
        title: "The Anchored Edge-Walker",
        diagnosis: "You walk the edges while developing the capacity to be a stable foundation.",
        reality: "You test boundaries and limits while learning to commit to what matters and build upon it.",
        tension: "You use edge-walking while anchoring as a mask to avoid the full vulnerability of complete commitment.",
        lawToWalk: "Choose your ground. Build lasting foundations. Burn your need to always be testing boundaries.",
        ifYouStay: "You'll continue to test boundaries without ever fully committing to what matters.",
        ifYouAct: "You'll find power in choosing your ground and building something lasting."
      },
      anchor: {
        title: "The True Anchor",
        diagnosis: "You've found your true destination and can be a stable foundation for others.",
        reality: "You've learned to commit deeply while maintaining your sense of adventure. You can help others find their way and build lasting foundations.",
        tension: "You use your anchoring role as a mask to avoid the vulnerability of being truly seen and known.",
        lawToWalk: "Share your wisdom and be a true anchor for others. Build lasting foundations and help others do the same. Burn any remaining resistance to being fully present.",
        ifYouStay: "You'll continue to resist being fully seen and known in your anchoring role.",
        ifYouAct: "You'll find fulfillment in being a true anchor and helping others find their way home."
      }
    }
  }
} 