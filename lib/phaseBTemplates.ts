// phaseBTemplates.ts
import type { Archetype, Trigger } from "./quizConfig";

export type RWeight = 1 | 2 | 3;

export interface PureA1 {
  id: string;
  labelTemplate: string;     // behavioral, no archetype names
  trigger: Trigger;          // accrues only when pure A1
  rWeight: RWeight;          // 1 (low), 2 (mid), 3 (high)
}

export interface MixedOpt {
  id: string;
  labelTemplate: string;     // behavioral
  weights: { primary: "__A1__" | "__A2__"; secondary: "__A1__" | "__A2__"; p: 0.75; s: 0.25 };
}

export interface PhaseBTemplate {
  id: string;
  promptTemplate: string;    // situation-first, neutral copy
  pureA1: [PureA1, PureA1, PureA1];
  mixed: [MixedOpt, MixedOpt];
  underClock?: boolean;      // enables timed probe
}

// Q8
export const B1: PhaseBTemplate = {
  id: "B1",
  promptTemplate: "A boundary is tested under time pressure. Pick your move.",
  pureA1: [
    { id:"B1-P1", labelTemplate:"State the decision once and proceed.", trigger:"Control", rWeight:1 },
    { id:"B1-P2", labelTemplate:"Put it on record; no back-and-forth.", trigger:"Invisibility", rWeight:2 },
    { id:"B1-P3", labelTemplate:"Take one irreversible step now.", trigger:"Shame", rWeight:3 },
  ],
  mixed: [
    { id:"B1-M1", labelTemplate:"Hold the line, then assign one follow-up.", weights:{ primary:"__A1__", secondary:"__A2__", p:0.75, s:0.25 } },
    { id:"B1-M2", labelTemplate:"Stabilize immediate risk, then decide.", weights:{ primary:"__A2__", secondary:"__A1__", p:0.75, s:0.25 } },
  ],
  underClock: true
};

// Q9
export const B2: PhaseBTemplate = {
  id: "B2",
  promptTemplate: "Halfway through a project, a better opportunity appears.",
  pureA1: [
    { id:"B2-P1", labelTemplate:"Archive the old; switch fully now.", trigger:"Neglect", rWeight:1 },
    { id:"B2-P2", labelTemplate:"Integrate the new without dropping cadence.", trigger:"Invisibility", rWeight:2 },
    { id:"B2-P3", labelTemplate:"Set a private checkpoint and pivot quietly.", trigger:"Rejection", rWeight:3 },
  ],
  mixed: [
    { id:"B2-M1", labelTemplate:"Work both in alternating sprints.", weights:{ primary:"__A1__", secondary:"__A2__", p:0.75, s:0.25 } },
    { id:"B2-M2", labelTemplate:"Delegate current; you steer the new.", weights:{ primary:"__A2__", secondary:"__A1__", p:0.75, s:0.25 } },
  ]
};

// Q10
export const B3: PhaseBTemplate = {
  id: "B3",
  promptTemplate: "Pushback is public and loud. What ends the loop?",
  pureA1: [
    { id:"B3-P1", labelTemplate:"Restate once; disengage argument.", trigger:"Control", rWeight:1 },
    { id:"B3-P2", labelTemplate:"Keep posture; let critique pass.", trigger:"Shame", rWeight:2 },
    { id:"B3-P3", labelTemplate:"Route through action, not debate.", trigger:"Invisibility", rWeight:3 },
  ],
  mixed: [
    { id:"B3-M1", labelTemplate:"One answer then silence.", weights:{ primary:"__A1__", secondary:"__A2__", p:0.75, s:0.25 } },
    { id:"B3-M2", labelTemplate:"Reframe the image, then move.", weights:{ primary:"__A2__", secondary:"__A1__", p:0.75, s:0.25 } },
  ]
};

// Q11
export const B4: PhaseBTemplate = {
  id: "B4",
  promptTemplate: "New data drops and keeps things ambiguous. Next move?",
  pureA1: [
    { id:"B4-P1", labelTemplate:"Select one variable to track; ignore the rest.", trigger:"Overwhelm", rWeight:1 },
    { id:"B4-P2", labelTemplate:"Hold decision; advance timeline anyway.", trigger:"Uncertainty", rWeight:2 },
    { id:"B4-P3", labelTemplate:"Act first; document later.", trigger:"Shame", rWeight:3 },
  ],
  mixed: [
    { id:"B4-M1", labelTemplate:"Codify one rule, proceed.", weights:{ primary:"__A1__", secondary:"__A2__", p:0.75, s:0.25 } },
    { id:"B4-M2", labelTemplate:"Adjust direction, set a new checkpoint.", weights:{ primary:"__A2__", secondary:"__A1__", p:0.75, s:0.25 } },
  ],
  underClock: true
};

// Q12
export const B5: PhaseBTemplate = {
  id: "B5",
  promptTemplate: "A key person withholds engagement. Your response?",
  pureA1: [
    { id:"B5-P1", labelTemplate:"Move without audience; log privately.", trigger:"Neglect", rWeight:2 },
    { id:"B5-P2", labelTemplate:"Keep pace; no reassurance texts.", trigger:"Rejection", rWeight:1 },
    { id:"B5-P3", labelTemplate:"One boundary line; end the thread.", trigger:"Control", rWeight:3 },
  ],
  mixed: [
    { id:"B5-M1", labelTemplate:"Boundary, then proceed.", weights:{ primary:"__A1__", secondary:"__A2__", p:0.75, s:0.25 } },
    { id:"B5-M2", labelTemplate:"Reframe goal, single ask.", weights:{ primary:"__A2__", secondary:"__A1__", p:0.75, s:0.25 } },
  ]
};

// Q13
export const B6: PhaseBTemplate = {
  id: "B6",
  promptTemplate: "The team is noisy and fragmented. What do you do?",
  pureA1: [
    { id:"B6-P1", labelTemplate:"Name one priority; cut the rest.", trigger:"Overwhelm", rWeight:1 },
    { id:"B6-P2", labelTemplate:"Put decisions on record; no hallway talk.", trigger:"Invisibility", rWeight:2 },
    { id:"B6-P3", labelTemplate:"Ship a small irreversible step.", trigger:"Rejection", rWeight:3 },
  ],
  mixed: [
    { id:"B6-M1", labelTemplate:"Boundary then action.", weights:{ primary:"__A1__", secondary:"__A2__", p:0.75, s:0.25 } },
    { id:"B6-M2", labelTemplate:"Re-sequence and decide.", weights:{ primary:"__A2__", secondary:"__A1__", p:0.75, s:0.25 } },
  ]
};

// Q14
export const B7: PhaseBTemplate = {
  id: "B7",
  promptTemplate: "You can ship now or perfect later. Choose.",
  pureA1: [
    { id:"B7-P1", labelTemplate:"Ship at 80%; log unknowns.", trigger:"Uncertainty", rWeight:2 },
    { id:"B7-P2", labelTemplate:"Ignore validation; enforce pace.", trigger:"Neglect", rWeight:3 },
    { id:"B7-P3", labelTemplate:"Minimal words; maximal move.", trigger:"Shame", rWeight:1 },
  ],
  mixed: [
    { id:"B7-M1", labelTemplate:"Choose now, review later.", weights:{ primary:"__A1__", secondary:"__A2__", p:0.75, s:0.25 } },
    { id:"B7-M2", labelTemplate:"Refine once, then commit.", weights:{ primary:"__A2__", secondary:"__A1__", p:0.75, s:0.25 } },
  ],
  underClock: true
};

// Q15
export const B8: PhaseBTemplate = {
  id: "B8",
  promptTemplate: "Final call with limited certainty. What ends it cleanly?",
  pureA1: [
    { id:"B8-P1", labelTemplate:"Decide and post the single rule.", trigger:"Control", rWeight:1 },
    { id:"B8-P2", labelTemplate:"Act first and publish results later.", trigger:"Shame", rWeight:3 },
    { id:"B8-P3", labelTemplate:"Close the thread; no follow-ups.", trigger:"Invisibility", rWeight:2 },
  ],
  mixed: [
    { id:"B8-M1", labelTemplate:"Decide, then one review pass.", weights:{ primary:"__A1__", secondary:"__A2__", p:0.75, s:0.25 } },
    { id:"B8-M2", labelTemplate:"Set the image, then act.", weights:{ primary:"__A2__", secondary:"__A1__", p:0.75, s:0.25 } },
  ]
};

export const PHASE_B_TEMPLATES: PhaseBTemplate[] = [B1,B2,B3,B4,B5,B6,B7,B8];
