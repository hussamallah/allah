import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * GroundZero Quiz — Spec-Accurate + Observe-Only Telemetry + QuizBank ID Mapping
 * - Logic stays identical to spec (FH → Face → Lines).
 * - Each screen now resolves a concrete Quiz Bank ID (from your mapping) and
 *   uses it for content (prompt/options) and telemetry (qid).
 * - If a given ID isn't found in the bank, we show placeholders (logic unchanged).
 *
 * Props:
 *   - quizBank?: { items: Array<{ id: string; prompt?: string; options?: Array<{ label: string }> }> }
 *   - onBeaconUrl?: string (optional; overrides window.__TELEMETRY_URL)
 */

// -----------------------------
// Types & Constants
// -----------------------------
type Line =
  | "Control"
  | "Pace"
  | "Boundary"
  | "Truth"
  | "Recognition"
  | "Bonding"
  | "Stress";

type Verdict = "C" | "O" | "F";

type QuizOption = { label: string };
type QuizItem = { id: string; prompt?: string; options?: QuizOption[] };
type QuizBank = { items: QuizItem[] };

const LINES: Line[] = [
  "Control",
  "Pace",
  "Boundary",
  "Truth",
  "Recognition",
  "Bonding",
  "Stress",
];

const PROFILE_ORDER: Line[] = [
  "Control",
  "Pace",
  "Boundary",
  "Truth",
  "Recognition",
  "Bonding",
  "Stress",
];

// Faces (A/B/C slot order)
const FACES: Record<Line, [string, string, string]> = {
  Control: ["sovereign", "rebel", "catalyst"],
  Pace: ["strategist", "navigator", "visionary"],
  Boundary: ["sentinel", "equalizer", "guardian"],
  Truth: ["seeker", "architect", "alchemist"],
  Recognition: ["spotlight", "mask", "artisan"],
  Bonding: ["provider", "partner", "servant"],
  Stress: ["diplomat", "wanderer", "catalyst"],
};

// Legend (Lines phase): A→C, B→O, C→F
const LEGEND: Record<"A" | "B" | "C", Verdict> = { A: "C", B: "O", C: "F" };

// -----------------------------
// Quiz Bank ID Mapping (from your message)
// -----------------------------
const FH_IDS = [
  "FH_Q0",
  "FH_A1", "FH_A2", "FH_A3", "FH_A4", "FH_A5",
  "FH_A6", "FH_A7", "FH_A8", "FH_A9", "FH_A10",
  "FH_A11", "FH_A12", "FH_A13", "FH_A14", "FH_A15",
  "FH_A16", "FH_A17", "FH_A18", "FH_A19", "FH_A20",
];

const FC_ID = (line: Line) =>
  `FC-${lineCode(line)}-1`;

const FD_ID = (line: Line, a: string, b: string) => {
  // pick the id by unordered pair per family
  const [A, B, C] = FACES[line]; // faces in A/B/C slot order for that family
  const pair = new Set([a, b]);
  if (pair.has(A) && pair.has(B)) return `FD-${lineCode(line)}-1`;
  if (pair.has(A) && pair.has(C)) return `FD-${lineCode(line)}-2`;
  return `FD-${lineCode(line)}-3`; // B vs C
};

const L_BASE_IDS = (line: Line) => [`L-${lineCode(line)}-1`, `L-${lineCode(line)}-2`];
const L_TB_IDS   = (line: Line) => [`L_TB-${lineCode(line)}-1`, `L_TB-${lineCode(line)}-2`];

function lineCode(line: Line) {
  return (
    line === "Control" ? "CTL" :
    line === "Pace" ? "PAC" :
    line === "Boundary" ? "BND" :
    line === "Truth" ? "TRU" :
    line === "Recognition" ? "REC" :
    line === "Bonding" ? "BON" :
    "STR"
  );
}

// -----------------------------
// Utilities
// -----------------------------
const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));

function strongLadder(expo: number, hits: number): boolean {
  if (expo === 2 && hits >= 2) return true;
  if ((expo === 3 || expo === 4) && hits >= 3) return true;
  if (expo >= 5 && expo <= 7 && hits >= 4) return true;
  if (expo >= 8 && expo <= 10 && hits >= 5) return true;
  return false;
}
function msfFloor(expo: number, hits: number): boolean {
  if (expo <= 3) return hits >= 2;
  if (expo <= 5) return hits >= 3;
  if (expo <= 7) return hits >= 4;
  return hits >= 5; // 8–10
}
function rankL1L2(
  hits: Record<Line, number>,
  prevL1: Line | null,
  prevL2: Line | null,
  mostRecent: Line | null
): { L1: Line; L2: Line } {
  const ranked = [...LINES].sort((a, b) => {
    const ha = hits[a] || 0;
    const hb = hits[b] || 0;
    if (hb !== ha) return hb - ha;
    if (a === prevL1) return -1;
    if (b === prevL1) return 1;
    if (a === prevL2) return -1;
    if (b === prevL2) return 1;
    if (a === mostRecent) return -1;
    if (b === mostRecent) return 1;
    return 0;
  });
  return { L1: ranked[0], L2: ranked[1] };
}

// Plan FH options with exposure fairness (≤1 gap if possible)
function planFhOptions(
  L1: Line,
  L2: Line,
  expo: Record<Line, number>,
  lastFillers: Line[] | null,
  preferredFillers: Set<Line> | null
): { opts: Line[]; nextFillers: Line[] } {
  const base: Line[] = [L1, L2];
  const rest = LINES.filter((x) => x !== L1 && x !== L2);
  rest.sort((a, b) => {
    const pa = preferredFillers?.has(a) ? 0 : 1;
    const pb = preferredFillers?.has(b) ? 0 : 1;
    if (pa !== pb) return pa - pb;
    const ea = expo[a] || 0;
    const eb = expo[b] || 0;
    if (ea !== eb) return ea - eb;
    return a.localeCompare(b);
  });
  let best: { trio: Line[]; gap: number } = { trio: rest.slice(0, 3), gap: Infinity };
  for (let i = 0; i < rest.length; i++) {
    for (let j = i + 1; j < rest.length; j++) {
      for (let k = j + 1; k < rest.length; k++) {
        const trio: Line[] = [rest[i], rest[j], rest[k]];
        const inc: Record<Line, number> = {
          Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0
        };
        [...base, ...trio].forEach((ln) => (inc[ln] = (expo[ln] || 0) + 1));
        const exps = LINES.map((ln) => inc[ln] ?? (expo[ln] || 0));
        const gap = Math.max(...exps) - Math.min(...exps);
        if (gap < best.gap) best = { trio, gap };
      }
    }
  }
  let fillers = best.trio;
  if (lastFillers && fillers.join("|") === lastFillers.join("|")) {
    fillers = [fillers[1], fillers[2], fillers[0]];
  }
  return { opts: [...base, ...fillers], nextFillers: fillers };
}

function decideLineVerdict(arr: Verdict[]): Verdict {
  const C = arr.filter((t) => t === "C").length;
  const O = arr.filter((t) => t === "O").length;
  const F = arr.filter((t) => t === "F").length;
  if (C === 2 && F === 1 && O === 0) return "O";
  if (F >= O && F >= C) return "F";
  if (O >= C && O >= F) return "O";
  return "C";
}
function isClearAfterTwo(arr: Verdict[]): boolean {
  if (arr.length !== 2) return false;
  const c2 = arr.filter((t) => t === "C").length === 2;
  const o2 = arr.filter((t) => t === "O").length === 2;
  const f2 = arr.filter((t) => t === "F").length === 2;
  return c2 || o2 || f2;
}

// -----------------------------
// Telemetry (observe-only)
// -----------------------------
type StageTag = "FH" | "FH_DUEL" | "F_TRIAD" | "F_DUEL" | "L_BASE" | "L_TB";
type TelemetryRow = {
  session_id: string;
  qid: string;
  stage: StageTag;
  appeared_at: number;
  clicked_at: number;
  response_time_ms: number;
  first_move_ms: number;
  hover_count: number;
  option_switches: number;
  reopened: 0 | 1;
  content_word_count: number;
  device: "mobile" | "desktop";
  conviction_tag?: "High" | "Medium" | "Low";
  mirror_signals?: string[];
};
const isMobile = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(pointer:coarse)").matches ||
    /Mobi|Android/i.test(navigator.userAgent));
const countWords = (t: string) => (t.trim().match(/\b\w+\b/g)?.length ?? 0);
function convictionFrom(rt: number, switches: number, hovers: number): "High" | "Medium" | "Low" {
  if (rt < 1500 && switches <= 1 && hovers <= 2) return "High";
  if (rt < 4000 && switches <= 3) return "Medium";
  return "Low";
}
function deriveMirrorSignals(line: Line | null, firstMoveMs: number, rt: number, hovers: number, backUsed: boolean): string[] {
  const list: string[] = [];
  if (line === "Control" && firstMoveMs > 1200) list.push("control_wait_to_be_allowed");
  if (line === "Truth" && rt > 3500) list.push("truth_adds_reasons");
  if (line === "Recognition" && hovers > 4) list.push("recognition_chases_stage");
  if (line === "Stress" && backUsed) list.push("stress_multi_fire_hop");
  return list;
}
const Telemetry = {
  rows: [] as TelemetryRow[],
  sessionId: (() => "sess_" + Math.random().toString(36).slice(2))(),
  url: (override?: string) =>
    override ??
    (typeof window !== "undefined" ? (window as any).__TELEMETRY_URL : undefined),
  push(row: TelemetryRow, overrideUrl?: string) {
    this.rows.push(row);
    const url = this.url(overrideUrl);
    if (url) {
      try {
        const blob = new Blob([JSON.stringify(row)], { type: "application/json" });
        navigator.sendBeacon?.(url, blob);
      } catch {}
    }
  },
  flush() { if (this.rows.length) console.log("[Telemetry]", this.rows); },
};

function useScreenTelemetry(args: {
  stage: StageTag;
  qid: string;
  currentLineForMirror?: Line | null;
  reopened?: boolean;
  promptText?: string;
  optionLabels?: string[];
  onBeaconUrl?: string;
}) {
  const { stage, qid, currentLineForMirror = null, reopened = false, promptText = "", optionLabels = [], onBeaconUrl } = args;
  const shownRef = useRef<number>(0);
  const firstMoveRef = useRef<number | null>(null);
  const hoverCountRef = useRef(0);
  const lastHoverKeyRef = useRef<string | null>(null);
  const optionSwitchesRef = useRef(0);
  const device = isMobile() ? "mobile" : "desktop";
  const wordCount = countWords([promptText, ...optionLabels].join(" "));

  useEffect(() => {
    shownRef.current = Date.now();
    firstMoveRef.current = null;
    hoverCountRef.current = 0;
    lastHoverKeyRef.current = null;
    optionSwitchesRef.current = 0;
    const setFirstMove = () => { if (firstMoveRef.current == null) firstMoveRef.current = Date.now(); };
    const evs: (keyof DocumentEventMap)[] = ["mousemove", "touchstart", "keydown", "scroll"];
    evs.forEach((ev) => document.addEventListener(ev, setFirstMove, { passive: true, once: true }));
    return () => evs.forEach((ev) => document.removeEventListener(ev, setFirstMove as any));
  }, [stage, qid]);

  function onHover(key: string) {
    if (device === "desktop") {
      hoverCountRef.current += 1;
      if (lastHoverKeyRef.current !== key) {
        if (lastHoverKeyRef.current !== null) optionSwitchesRef.current += 1;
        lastHoverKeyRef.current = key;
      }
    }
  }

  function onClickFinalize() {
    const clicked = Date.now();
    const shown = shownRef.current || clicked;
    const firstMove = firstMoveRef.current ?? 0;
    const rt = clicked - shown;
    const fm = firstMove ? firstMove - shown : 0;
    const conviction = convictionFrom(rt, optionSwitchesRef.current, hoverCountRef.current);
    const mirror = deriveMirrorSignals(currentLineForMirror, fm, rt, hoverCountRef.current, reopened);
    const row: TelemetryRow = {
      session_id: Telemetry.sessionId,
      qid, stage,
      appeared_at: shown,
      clicked_at: clicked,
      response_time_ms: rt,
      first_move_ms: fm,
      hover_count: hoverCountRef.current,
      option_switches: optionSwitchesRef.current,
      reopened: reopened ? 1 : 0,
      content_word_count: wordCount,
      device,
      conviction_tag: conviction,
      mirror_signals: mirror,
    };
    Telemetry.push(row, args.onBeaconUrl);
  }

  return { onHover, onClickFinalize };
}

// -----------------------------
// Question Mapper (bank lookup helpers)
// -----------------------------
const getById = (quizBank?: QuizBank, id?: string): QuizItem | undefined =>
  id ? quizBank?.items?.find((it) => it.id === id) : undefined;

// -----------------------------
// Component
// -----------------------------
export default function GroundZeroQuiz({
  quizBank,
  onBeaconUrl,
}: {
  quizBank?: QuizBank;
  onBeaconUrl?: string;
}) {
  type Phase = "FH" | "FH_DUEL" | "F_TRIAD" | "F_DUEL" | "LINES" | "DONE";
  const [phase, setPhase] = useState<Phase>("FH");

  // FH state
  const [fhHits, setFhHits] = useState<Record<Line, number>>({
    Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0,
  });
  const [fhExpo, setFhExpo] = useState<Record<Line, number>>({
    Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0,
  });
  const [fhScreen, setFhScreen] = useState(0); // 0..20 (we still cap logic at 9 for commit)
  const [prevL1, setPrevL1] = useState<Line | null>(null);
  const [prevL2, setPrevL2] = useState<Line | null>(null);
  const [mostRecentPick, setMostRecentPick] = useState<Line | null>(null);
  const { L1, L2 } = useMemo(
    () => rankL1L2(fhHits, prevL1, prevL2, mostRecentPick),
    [fhHits, prevL1, prevL2, mostRecentPick]
  );
  const [lastFillers, setLastFillers] = useState<Line[] | null>(null);
  const [preferredFillers, setPreferredFillers] = useState<Set<Line> | null>(null);
  const [fhDuelPair, setFhDuelPair] = useState<{ a: Line; b: Line } | null>(null);

  // Face state
  const [lockedFamily, setLockedFamily] = useState<Line | null>(null);
  const [lockedFace, setLockedFace] = useState<string | null>(null);
  const [faceTrio, setFaceTrio] = useState<[string, string, string] | null>(null);
  const [facePickF1, setFacePickF1] = useState<string | null>(null);
  const [faceChallenger, setFaceChallenger] = useState<string | null>(null);
  const [faceNeedsFinal, setFaceNeedsFinal] = useState(false);

  // Lines state
  const [lineOrder, setLineOrder] = useState<Line[] | null>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [lineBaseAsked, setLineBaseAsked] = useState(0);
  const [lineTbAsked, setLineTbAsked] = useState(0);
  const [tokens, setTokens] = useState<Record<Line, Verdict[]>>({
    Control: [], Pace: [], Boundary: [], Truth: [], Recognition: [], Bonding: [], Stress: [],
  });
  const [verdicts, setVerdicts] = useState<Record<Line, Verdict | null>>({
    Control: null, Pace: null, Boundary: null, Truth: null, Recognition: null, Bonding: null, Stress: null,
  });
  const [confidence, setConfidence] = useState<
    Record<Line, "high" | "low" | "face-lock" | null>
  >({
    Control: null, Pace: null, Boundary: null, Truth: null, Recognition: null, Bonding: null, Stress: null,
  });

  // -----------------------------
  // Resolve current Quiz Bank ID + item (by phase/screen)
// -----------------------------
  // FH ID: use mapping index; Q0 is index 0. We keep logic-driven options but tag telemetry with this ID.
  const currentFhId = FH_IDS[Math.min(fhScreen, FH_IDS.length - 1)];
  const currentFhItem = getById(quizBank, currentFhId);

  // FH options (logic-driven)
  const fhOptions = useMemo<Line[]>(() => {
    if (phase !== "FH") return [];
    if (fhScreen === 0) return [...LINES];
    const plan = planFhOptions(L1, L2, fhExpo, lastFillers, preferredFillers);
    return plan.opts;
  }, [phase, fhScreen, L1, L2, fhExpo, lastFillers, preferredFillers]);

  // Face IDs
  const faceTriadId = lockedFamily ? FC_ID(lockedFamily) : undefined;
  const faceTriadItem = getById(quizBank, faceTriadId);

  const faceDuelId = ((): string | undefined => {
    if (!lockedFamily || !facePickF1 || !faceChallenger) return;
    return FD_ID(lockedFamily, facePickF1, faceChallenger);
  })();
  const faceDuelItem = getById(quizBank, faceDuelId);

  // Lines IDs
  const currentLine: Line | null = lineOrder?.[lineIndex] ?? null;
  const [lBase1, lBase2] = currentLine ? L_BASE_IDS(currentLine) : [undefined, undefined];
  const [lTb1, lTb2] = currentLine ? L_TB_IDS(currentLine) : [undefined, undefined];

  const thisBaseId =
    phase === "LINES" ? (lineBaseAsked === 0 ? lBase1 : lineBaseAsked === 1 ? lBase2 : undefined) : undefined;
  const thisTbId =
    phase === "LINES" && verdicts[currentLine as Line] == null && lineBaseAsked >= 2
      ? (lineTbAsked === 0 ? lTb1 : lTb2)
      : undefined;

  const thisBaseItem = getById(quizBank, thisBaseId);
  const thisTbItem = getById(quizBank, thisTbId);

  // Telemetry stage + qid from bank IDs
  const tlStage: StageTag =
    phase === "FH" ? "FH" :
    phase === "FH_DUEL" ? "FH_DUEL" :
    phase === "F_TRIAD" ? "F_TRIAD" :
    phase === "F_DUEL" ? "F_DUEL" :
    phase === "LINES" && (lineBaseAsked < 2 && verdicts[currentLine as Line] == null)
      ? "L_BASE"
      : phase === "LINES" ? "L_TB" : "FH";

  const qid =
    phase === "FH" ? (currentFhId ?? `FH_FALLBACK_${fhScreen}`) :
    phase === "FH_DUEL" ? `FH_DUEL_${(prevL1 ?? "L1")}-${(prevL2 ?? "L2")}` :
    phase === "F_TRIAD" ? (faceTriadId ?? `F_TRIAD_${lockedFamily ?? "?"}`) :
    phase === "F_DUEL" ? (faceDuelId ?? `F_DUEL_${lockedFamily ?? "?"}`) :
    phase === "LINES" ? ((thisBaseId ?? thisTbId) ?? `LINES_${currentLine ?? "?"}`) :
    "DONE";

  const promptText =
    phase === "FH" ? (currentFhItem?.prompt ?? (fhScreen === 0 ? "Family Hone — all 7" : "Family Hone — choose.")) :
    phase === "F_TRIAD" ? (faceTriadItem?.prompt ?? "Face — Triad") :
    phase === "F_DUEL" ? (faceDuelItem?.prompt ?? "Face — Duel") :
    phase === "LINES" ? ((thisBaseItem ?? thisTbItem)?.prompt ?? "Lines — choose A/B/C") :
    "";

  const optionLabels =
    phase === "FH" ? (currentFhItem?.options?.map(o => o.label) ?? (fhScreen === 0 ? LINES : fhOptions).map(String)) :
    phase === "F_TRIAD" ? (faceTriadItem?.options?.map(o => o.label) ?? (lockedFamily ? FACES[lockedFamily] : [])) :
    phase === "F_DUEL" ? (faceDuelItem?.options?.map(o => o.label) ?? (facePickF1 && faceChallenger ? [facePickF1, faceChallenger] : [])) :
    phase === "LINES" ? ((thisBaseItem ?? thisTbItem)?.options?.map(o => o.label) ?? ["Answer A → C","Answer B → O","Answer C → F"]) :
    [];

  const { onHover: telemetryHover, onClickFinalize: telemetryClick } = useScreenTelemetry({
    stage: tlStage,
    qid,
    currentLineForMirror: phase === "LINES" ? currentLine : (phase === "F_TRIAD" || phase === "F_DUEL") ? lockedFamily : null,
    reopened: false,
    promptText,
    optionLabels,
    onBeaconUrl,
  });

  // -----------------------------
  // FH pick
  // -----------------------------
  function handleFhPick(line: Line) {
    const newExpo = clone(fhExpo);
    fhOptions.forEach((ln) => (newExpo[ln] = (newExpo[ln] || 0) + 1));
    const newHits = clone(fhHits);
    newHits[line] = (newHits[line] || 0) + 1;

    telemetryClick();

    const { L1: nL1, L2: nL2 } = rankL1L2(newHits, L1, L2, line);
    const expoPicked = newExpo[line];
    const hitsPicked = newHits[line];
    const cleanDirect =
      (expoPicked === 2 && hitsPicked === 2) ||
      (expoPicked === 3 && hitsPicked === 3);

    const duelEligible = (() => {
      if (cleanDirect) return false;
      const e1 = newExpo[nL1], h1 = newHits[nL1];
      const e2 = newExpo[nL2], h2 = newHits[nL2];
      if (!(msfFloor(e1, h1) && msfFloor(e2, h2))) return false;
      if (Math.abs(e1 - e2) > 1) return false;
      if (Math.abs(h1 - h2) > 1) return false;
      return true;
    })();

    const anyStrong = LINES.some((ln) => strongLadder(newExpo[ln], newHits[ln]));

    if (cleanDirect) return lockFamily(line, newHits, newExpo, nL1, nL2, line);
    if (duelEligible) {
      setFhHits(newHits); setFhExpo(newExpo);
      setPrevL1(nL1); setPrevL2(nL2); setMostRecentPick(line);
      setFhDuelPair({ a: nL1, b: nL2 }); setPhase("FH_DUEL"); return;
    }
    if (anyStrong || fhScreen >= 8) {
      return lockFamily(nL1, newHits, newExpo, nL1, nL2, line);
    }

    const omitted = new Set(LINES.filter((ln) => !fhOptions.includes(ln)));
    const plan = planFhOptions(nL1, nL2, newExpo, lastFillers, omitted);
    setLastFillers(plan.nextFillers);
    setPreferredFillers(omitted);

    setFhHits(newHits); setFhExpo(newExpo);
    setPrevL1(nL1); setPrevL2(nL2);
    setMostRecentPick(line);
    setFhScreen((s) => s + 1);
  }

  function lockFamily(
    family: Line,
    newHits: Record<Line, number>,
    newExpo: Record<Line, number>,
    nL1: Line,
    nL2: Line,
    recent: Line
  ) {
    setFhHits(newHits); setFhExpo(newExpo);
    setPrevL1(nL1); setPrevL2(nL2);
    setMostRecentPick(recent);

    setLockedFamily(family);
    setFaceTrio(FACES[family]);
    setPhase("F_TRIAD");
  }

  // -----------------------------
  // Face phase
  // -----------------------------
  function onTriadPick(slot: 0 | 1 | 2) {
    if (!lockedFamily || !faceTrio) return;
    const f1 = faceTrio[slot];
    const challenger = slot === 0 ? faceTrio[1] : slot === 1 ? faceTrio[0] : faceTrio[1];
    telemetryClick();
    setFacePickF1(f1);
    setFaceChallenger(challenger);
    setPhase("F_DUEL");
  }

  function onDuelPick(name: string) {
    if (!facePickF1 || !faceChallenger) return;
    telemetryClick();
    if (name === facePickF1 && !faceNeedsFinal) {
      finishFace(facePickF1);
    } else if (!faceNeedsFinal) {
      setFaceNeedsFinal(true);
    } else {
      const winner = name; // final pick decides
      finishFace(winner);
    }
  }

  function finishFace(winner: string) {
    setLockedFace(winner);
    const order = PROFILE_ORDER.filter((ln) => ln !== lockedFamily);
    setLineOrder(order);

    if (lockedFamily) {
      const v = clone(verdicts); const c = clone(confidence);
      v[lockedFamily] = "C"; c[lockedFamily] = "face-lock";
      setVerdicts(v); setConfidence(c);
    }

    setLineIndex(0); setLineBaseAsked(0); setLineTbAsked(0);
    setPhase("LINES");
  }

  // -----------------------------
  // Lines phase
  // -----------------------------
  function onPickBase(option: "A" | "B" | "C") {
    if (!lineOrder) return;
    telemetryClick();
    const line = lineOrder[lineIndex];
    const token = LEGEND[option];
    const nt = clone(tokens);
    nt[line] = [...(nt[line] || []), token];
    setTokens(nt);

    const asked = lineBaseAsked + 1;
    if (asked < 2) { setLineBaseAsked(asked); return; }

    const arr = nt[line];
    const clear = isClearAfterTwo(arr);

    if (clear) {
      const v = decideLineVerdict(arr);
      const nv = clone(verdicts); const nc = clone(confidence);
      nv[line] = v; nc[line] = "high";
      setVerdicts(nv); setConfidence(nc);
      advanceLine();
    } else {
      setLineTbAsked(0); // enter TB
    }
  }

  function onPickTiebreak(option: "A" | "B" | "C") {
    if (!lineOrder) return;
    telemetryClick();
    const line = lineOrder[lineIndex];
    const token = LEGEND[option];
    const nt = clone(tokens);
    nt[line] = [...(nt[line] || []), token];
    setTokens(nt);

    const askedTB = lineTbAsked + 1;
    setLineTbAsked(askedTB);

    if (askedTB < 2) {
      const arr = nt[line];
      const C = arr.filter((t) => t === "C").length;
      const O = arr.filter((t) => t === "O").length;
      const F = arr.filter((t) => t === "F").length;
      const counts = [C, O, F].sort((a, b) => b - a);
      const ambiguous = !(counts[0] > counts[1]);
      if (ambiguous) return; // ask a second TB
    }

    const v = decideLineVerdict(nt[line]);
    const nv = clone(verdicts); const nc = clone(confidence);
    nv[line] = v; nc[line] = "low";
    setVerdicts(nv); setConfidence(nc);
    advanceLine();
  }

  function advanceLine() {
    if (!lineOrder) return;
    if (lineIndex + 1 >= lineOrder.length) { setPhase("DONE"); return; }
    setLineIndex(lineIndex + 1);
    setLineBaseAsked(0);
    setLineTbAsked(0);
  }

  // -----------------------------
  // UI helpers
  // -----------------------------
  function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode; }) {
    return (
      <div style={{ maxWidth: 720, margin: "24px auto", padding: 16, background: "#fff", borderRadius: 12, border: "1px solid #ddd", boxShadow: "0 2px 12px rgba(0,0,0,.06)"}}>
        <div style={{ marginBottom: 8 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h2>
        {subtitle && <p style={{ opacity: 0.7, fontSize: 14 }}>{subtitle}</p>}
        </div>
        {children}
      </div>
    );
  }
  function Row({ children }: { children: React.ReactNode }) {
    return <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>{children}</div>;
  }
  function Trio({ children }: { children: React.ReactNode }) {
    return <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" }}>{children}</div>;
  }
  function Btn({ onClick, children, onMouseEnter }: { onClick: () => void; children: React.ReactNode; onMouseEnter?: () => void; }) {
    return (
      <button onMouseEnter={onMouseEnter} onClick={onClick} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid #ccc", background: "#f7f7f7", cursor: "pointer" }}>
        {children}
      </button>
    );
  }
  function Pill({ children }: { children: React.ReactNode }) {
    return <span style={{ padding: "2px 8px", borderRadius: 999, border: "1px solid #ddd", fontSize: 12, background: "#fafafa" }}>{children}</span>;
  }

  // -----------------------------
  // Renderers (show bank content when available; fallback otherwise)
// -----------------------------
  function renderFH() {
    const title = fhScreen === 0 ? "Family Hone — Q0" : `Family Hone — Q${fhScreen}`;
    const prompt = promptText;
    const labels = optionLabels;

    return (
      <Section title={title} subtitle={prompt}>
        <div style={{ marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Pill>L1: {L1}</Pill>
          <Pill>L2: {L2}</Pill>
          <Pill>Screen {Math.min(fhScreen, 20)}/20</Pill>
          <Pill>Bank ID: {currentFhId}</Pill>
        </div>

        {fhScreen === 0 ? (
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
            {LINES.map((ln, i) => (
              <Btn key={ln} onMouseEnter={() => telemetryHover(String(i))} onClick={() => handleFhPick(ln)}>
                <div style={{ fontWeight: 600 }}>{labels[i] ?? ln}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{ln}</div>
              </Btn>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
            {fhOptions.map((ln, i) => (
              <Btn key={ln} onMouseEnter={() => telemetryHover(String(i))} onClick={() => handleFhPick(ln)}>
                <div style={{ fontWeight: 600 }}>{labels[i] ?? ln}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{ln}</div>
              </Btn>
            ))}
          </div>
        )}

        <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
          Exposure (hits/expo):
          <div style={{ display: "grid", gap: 6, gridTemplateColumns: "1fr 1fr 1fr" }}>
            {LINES.map((ln) => (
              <div key={ln} style={{ display: "flex", justifyContent: "space-between", padding: "4px 8px", background: "#fafafa", border: "1px solid #eee", borderRadius: 8 }}>
                <span>{ln}</span><span>{fhHits[ln]}/{fhExpo[ln]}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  function renderFaceTriad() {
    if (!lockedFamily || !faceTrio) return null;
    const labels = optionLabels;
    return (
      <Section title="Face — Triad" subtitle={`${promptText} · Bank ID: ${faceTriadId}`}>
        <Trio>
          {faceTrio.map((nm, i) => (
            <Btn key={nm} onMouseEnter={() => telemetryHover(String(i))} onClick={() => onTriadPick(i as 0 | 1 | 2)}>
              <div style={{ fontWeight: 600 }}>{labels[i] ?? nm}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{nm}</div>
            </Btn>
          ))}
        </Trio>
      </Section>
    );
  }

  function renderFhDuel() {
    if (!fhDuelPair) return null;
    const { a, b } = fhDuelPair;
    const duelQid = `FH_DUEL_${a}-${b}`;
    const { onHover, onClickFinalize } = useScreenTelemetry({
      stage: "FH_DUEL",
      qid: duelQid,
      currentLineForMirror: null,
      reopened: false,
      promptText: "Family Hone — Duel (pick the family that fits more).",
      optionLabels: [a, b],
      onBeaconUrl,
    });

    return (
      <Section title="Family Hone — Duel" subtitle="Pick the one that fits more.">
        <Row>
          {[a, b].map((ln, i) => (
            <Btn
              key={ln}
              onMouseEnter={() => onHover(String(i))}
              onClick={() => {
                onClickFinalize();
                setLockedFamily(ln);
                setFaceTrio(FACES[ln]);
                setPhase("F_TRIAD");
              }}
            >
              {ln}
            </Btn>
          ))}
        </Row>
      </Section>
    );
  }

  function renderFaceDuel() {
    if (!lockedFamily || !faceTrio || !facePickF1 || !faceChallenger) return null;
    const labels = optionLabels;
    return (
      <Section title={`Face — Duel${faceNeedsFinal ? " (Final)" : ""}`} subtitle={`${promptText} · Bank ID: ${faceDuelId}`}>
        <Row>
          {[facePickF1, faceChallenger].map((nm, i) => (
            <Btn key={nm} onMouseEnter={() => telemetryHover(String(i))} onClick={() => onDuelPick(nm)}>
              <div style={{ fontWeight: 600 }}>{labels[i] ?? nm}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{nm}</div>
            </Btn>
          ))}
        </Row>
      </Section>
    );
  }

  function renderLines() {
    if (!lineOrder || lockedFamily === null) return null;
    const ln = currentLine!;
    const onBase = lineBaseAsked < 2 && verdicts[ln] == null;
    const idForThis = onBase ? thisBaseId : thisTbId;
    const labels = optionLabels;

    return (
      <Section title={`Lines — ${ln}`} subtitle={`${promptText} · Bank ID: ${idForThis ?? "—"}`}>
        {onBase ? (
          <>
            <Trio>
              <Btn onMouseEnter={() => telemetryHover("A")} onClick={() => onPickBase("A")}>{labels[0] ?? "Answer A → C"}</Btn>
              <Btn onMouseEnter={() => telemetryHover("B")} onClick={() => onPickBase("B")}>{labels[1] ?? "Answer B → O"}</Btn>
              <Btn onMouseEnter={() => telemetryHover("C")} onClick={() => onPickBase("C")}>{labels[2] ?? "Answer C → F"}</Btn>
            </Trio>
          </>
        ) : verdicts[ln] == null ? (
          <>
            <Trio>
              <Btn onMouseEnter={() => telemetryHover("A")} onClick={() => onPickTiebreak("A")}>{labels[0] ?? "Answer A → C"}</Btn>
              <Btn onMouseEnter={() => telemetryHover("B")} onClick={() => onPickTiebreak("B")}>{labels[1] ?? "Answer B → O"}</Btn>
              <Btn onMouseEnter={() => telemetryHover("C")} onClick={() => onPickTiebreak("C")}>{labels[2] ?? "Answer C → F"}</Btn>
            </Trio>
          </>
        ) : null}

        <div style={{ marginTop: 16, fontSize: 12 }}>
          <div>Locked Family: <b>{lockedFamily}</b>{lockedFace ? ` → ${lockedFace}` : ""}</div>
          <div style={{ display: "grid", gap: 6, gridTemplateColumns: "1fr 1fr 1fr" }}>
            {PROFILE_ORDER.map((l) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 8px", background: "#fafafa", border: "1px solid #eee", borderRadius: 8 }}>
                <span>{l}</span>
                <span>
                  {verdicts[l] ?? "—"}
                  {confidence[l] ? ` (${confidence[l]})` : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  function renderDone() {
    const profileCode = PROFILE_ORDER.map((ln) => verdicts[ln] ?? "-").join("");
    useEffect(() => { Telemetry.flush(); }, []);
    return (
      <Section title="Results" subtitle="Archetype + profile code + all line verdicts">
        <div style={{ marginBottom: 8, fontSize: 14 }}>
          Archetype: {lockedFamily ? <b>{lockedFamily}</b> : "—"}{lockedFace ? ` → ${lockedFace}` : ""}
        </div>
        <div style={{ marginBottom: 12, fontSize: 14 }}>
          Profile Code (C,P,B,T,R,Bn,S): <b>{profileCode}</b>
        </div>
        <div style={{ display: "grid", gap: 6, gridTemplateColumns: "1fr 1fr 1fr" }}>
          {PROFILE_ORDER.map((ln) => (
            <div key={ln} style={{ display: "flex", justifyContent: "space-between", padding: "4px 8px", background: "#fafafa", border: "1px solid #eee", borderRadius: 8 }}>
              <span>{ln}</span>
              <span>
                {verdicts[ln] ?? "—"}
                {confidence[ln] ? ` (${confidence[ln]})` : ""}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button onClick={() => window.location.reload()} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ccc" }}>Restart</button>
          <button onClick={() => Telemetry.flush()} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ccc" }}>Debug Telemetry</button>
        </div>
      </Section>
    );
  }

  // -----------------------------
  // Root render
  // -----------------------------
  return (
    <div style={{ minHeight: "100vh", background: "#f1f1f1", padding: 16 }}>
      <div style={{ maxWidth: 720, margin: "0 auto 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>GroundZero — Quiz (Bank-ID Mapped)</h1>
        <button onClick={() => window.location.reload()} style={{ fontSize: 12, textDecoration: "underline" }}>Reset</button>
      </div>

      {phase === "FH" && renderFH()}
      {phase === "FH_DUEL" && renderFhDuel()}
      {phase === "F_TRIAD" && renderFaceTriad()}
      {phase === "F_DUEL" && renderFaceDuel()}
      {phase === "LINES" && renderLines()}
      {phase === "DONE" && renderDone()}
    </div>
  );
}
