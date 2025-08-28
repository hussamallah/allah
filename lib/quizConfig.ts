// Ground Zero — Quiz Config 2.1 (Elastic Archetype Engine)
// Single source of truth for item bank + scoring knobs.

import { QuizConfig, Archetype, Trigger, PhaseAItem, PhaseBTemplate } from "./quizTypes";
import { PHASE_B_TEMPLATES } from "./phaseBTemplates";

// ===================== SCORING KNOBS =====================
const SCORING: QuizConfig["scoring"] = {
  decayLambda: 0.92,
  stableMarginPct: 6,
  stableNeededConsecutive: 2,
  flipOvertake2Q: 6,
  flipSingleAfterQ: { qMin: 8, marginPct: 10 },
  maxFlips: 2,
  lateOverride: { qStart: 12, qEnd: 14, multiplier: 1.25 },
  rIndexWeights: { choices: 0.60, behavior: 0.25, underClock: 0.15 },
  routeThreshold: 50
};

// ===================== TELEMETRY RULES =====================
const TELEMETRY: QuizConfig["telemetry"] = {
  cleanStrikeMs: 2000,
  hesitationMs: 6000,
  maxSwitchesClean: 0,
  hesitationSwitches: 2,
  hoverRefsMs: 2500,
  behaviorScoring: { clean: 1, hesitation: -1, hoverPenalty: -0.5 }
};

// ===================== PHASE A QUESTIONS (Q1-Q7) =====================
const PHASE_A: PhaseAItem[] = [
  {
    id: "A1",
    prompt: "When you walk into a room of strangers, you…",
    options: [
      { id: "A1-1", label: "Scan who holds power and decide when to speak.", weights: { primary: "Sovereign", secondary: "Guardian", p: 0.75, s: 0.25 } },
      { id: "A1-2", label: "Note the possibilities and imagine new futures.", weights: { primary: "Visionary", secondary: "Rebel", p: 0.75, s: 0.25 } },
      { id: "A1-3", label: "Blend in and quietly support whomever needs it.", weights: { primary: "Servant", secondary: "Partner", p: 0.75, s: 0.25 } },
      { id: "A1-4", label: "Find the safest corner and observe everything first.", weights: { primary: "Mask", secondary: "Seeker", p: 0.75, s: 0.25 } },
      { id: "A1-5", label: "Say something sharp just to watch reactions.", weights: { primary: "Rebel", secondary: "Equalizer", p: 0.75, s: 0.25 } },
      { id: "A1-6", label: "Feel the emotional temperature, then bring balance.", weights: { primary: "Equalizer", secondary: "Provider", p: 0.75, s: 0.25 } }
    ]
  },
  {
    id: "A2",
    prompt: "Success feels most real when…",
    options: [
      { id: "A2-1", label: "Everyone feels protected and supplied because of you.", weights: { primary: "Provider", secondary: "Guardian", p: 0.75, s: 0.25 } },
      { id: "A2-2", label: "The crowd erupts and you OWN the moment.", weights: { primary: "Spotlight", secondary: "Sovereign", p: 0.75, s: 0.25 } },
      { id: "A2-3", label: "You uncover a hidden truth no one else saw.", weights: { primary: "Seeker", secondary: "Mask", p: 0.75, s: 0.25 } },
      { id: "A2-4", label: "Your idea becomes tangible and inspires others.", weights: { primary: "Visionary", secondary: "Rebel", p: 0.75, s: 0.25 } },
      { id: "A2-5", label: "You can wander freely with no demands on you.", weights: { primary: "Wanderer", secondary: "Mask", p: 0.75, s: 0.25 } },
      { id: "A2-6", label: "Someone vulnerable finally feels safe around you.", weights: { primary: "Guardian", secondary: "Servant", p: 0.75, s: 0.25 } }
    ]
  },
  {
    id: "A3",
    prompt: "In conflict, you naturally…",
    options: [
      { id: "A3-1", label: "Take charge and establish clear boundaries.", weights: { primary: "Sovereign", secondary: "Guardian", p: 0.75, s: 0.25 } },
      { id: "A3-2", label: "Find the deeper meaning and reframe the issue.", weights: { primary: "Visionary", secondary: "Equalizer", p: 0.75, s: 0.25 } },
      { id: "A3-3", label: "Challenge the status quo and push for change.", weights: { primary: "Rebel", secondary: "Spotlight", p: 0.75, s: 0.25 } },
      { id: "A3-4", label: "Mediate and find common ground.", weights: { primary: "Equalizer", secondary: "Partner", p: 0.75, s: 0.25 } },
      { id: "A3-5", label: "Provide practical solutions and resources.", weights: { primary: "Provider", secondary: "Servant", p: 0.75, s: 0.25 } },
      { id: "A3-6", label: "Step back and observe the dynamics.", weights: { primary: "Mask", secondary: "Seeker", p: 0.75, s: 0.25 } }
    ]
  },
  {
    id: "A4",
    prompt: "Your greatest fear is…",
    options: [
      { id: "A4-1", label: "Losing control and being powerless.", weights: { primary: "Sovereign", secondary: "Guardian", p: 0.75, s: 0.25 } },
      { id: "A4-2", label: "Being trapped in a meaningless existence.", weights: { primary: "Visionary", secondary: "Rebel", p: 0.75, s: 0.25 } },
      { id: "A4-3", label: "Being forced to conform to others' expectations.", weights: { primary: "Rebel", secondary: "Wanderer", p: 0.75, s: 0.25 } },
      { id: "A4-4", label: "Causing harm through your actions.", weights: { primary: "Equalizer", secondary: "Servant", p: 0.75, s: 0.25 } },
      { id: "A4-5", label: "Being unable to help those who depend on you.", weights: { primary: "Provider", secondary: "Guardian", p: 0.75, s: 0.25 } },
      { id: "A4-6", label: "Being exposed and vulnerable.", weights: { primary: "Mask", secondary: "Seeker", p: 0.75, s: 0.25 } }
    ]
  },
  {
    id: "A5",
    prompt: "When making decisions, you prioritize…",
    options: [
      { id: "A5-1", label: "Efficiency and clear outcomes.", weights: { primary: "Sovereign", secondary: "Provider", p: 0.75, s: 0.25 } },
      { id: "A5-2", label: "Innovation and future possibilities.", weights: { primary: "Visionary", secondary: "Rebel", p: 0.75, s: 0.25 } },
      { id: "A5-3", label: "Authenticity and personal freedom.", weights: { primary: "Rebel", secondary: "Wanderer", p: 0.75, s: 0.25 } },
      { id: "A5-4", label: "Harmony and collective well-being.", weights: { primary: "Equalizer", secondary: "Partner", p: 0.75, s: 0.25 } },
      { id: "A5-5", label: "Practical needs and immediate solutions.", weights: { primary: "Provider", secondary: "Servant", p: 0.75, s: 0.25 } },
      { id: "A5-6", label: "Understanding and gathering information.", weights: { primary: "Seeker", secondary: "Mask", p: 0.75, s: 0.25 } }
    ]
  },
  {
    id: "A6",
    prompt: "In relationships, you tend to…",
    options: [
      { id: "A6-1", label: "Take the lead and set the direction.", weights: { primary: "Sovereign", secondary: "Spotlight", p: 0.75, s: 0.25 } },
      { id: "A6-2", label: "Inspire and challenge your partner to grow.", weights: { primary: "Visionary", secondary: "Rebel", p: 0.75, s: 0.25 } },
      { id: "A6-3", label: "Maintain independence while being supportive.", weights: { primary: "Wanderer", secondary: "Mask", p: 0.75, s: 0.25 } },
      { id: "A6-4", label: "Focus on partnership and shared goals.", weights: { primary: "Partner", secondary: "Equalizer", p: 0.75, s: 0.25 } },
      { id: "A6-5", label: "Provide stability and practical support.", weights: { primary: "Guardian", secondary: "Provider", p: 0.75, s: 0.25 } },
      { id: "A6-6", label: "Adapt and serve your partner's needs.", weights: { primary: "Servant", secondary: "Partner", p: 0.75, s: 0.25 } }
    ]
  },
  {
    id: "A7",
    prompt: "When stressed, you need to…",
    options: [
      { id: "A7-1", label: "Take action and regain control.", weights: { primary: "Sovereign", secondary: "Guardian", p: 0.75, s: 0.25 } },
      { id: "A7-2", label: "Find quiet space to process and reflect.", weights: { primary: "Visionary", secondary: "Seeker", p: 0.75, s: 0.25 } },
      { id: "A7-3", label: "Express your feelings and release tension.", weights: { primary: "Rebel", secondary: "Spotlight", p: 0.75, s: 0.25 } },
      { id: "A7-4", label: "Connect with others and find support.", weights: { primary: "Equalizer", secondary: "Partner", p: 0.75, s: 0.25 } },
      { id: "A7-5", label: "Focus on helping someone else.", weights: { primary: "Provider", secondary: "Servant", p: 0.75, s: 0.25 } },
      { id: "A7-6", label: "Withdraw and protect yourself.", weights: { primary: "Mask", secondary: "Wanderer", p: 0.75, s: 0.25 } }
    ]
  }
];

// ===================== PHASE B TEMPLATES (Q8-Q15) =====================
// Using the new dynamic Phase-B bank from phaseBTemplates.ts
const PHASE_B: PhaseBTemplate[] = PHASE_B_TEMPLATES;

// ===================== EXPORT CONFIG =====================
export const QUIZ_CONFIG: QuizConfig = {
  archetypes: ["Sovereign", "Visionary", "Rebel", "Equalizer", "Provider", "Wanderer", "Seeker", "Mask", "Partner", "Guardian", "Servant", "Spotlight"],
  triggers: ["Control", "Rejection", "Shame", "Overwhelm", "Neglect", "Uncertainty", "Invisibility"],
  scoring: SCORING,
  telemetry: TELEMETRY,
  phaseA: PHASE_A,
  phaseB: PHASE_B
};

export type { Archetype, Trigger, RWeight, PhaseAItem, PhaseAOption, PhaseBTemplate };
