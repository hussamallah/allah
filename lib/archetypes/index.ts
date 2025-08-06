import { seekerArchetype } from './seeker'
import { guardianArchetype } from './guardian'
import { spotlightArchetype } from './spotlight'
import { partnerArchetype } from './partner'
import { equalizerArchetype } from './equalizer'
import { rebelArchetype } from './rebel'
import { visionaryArchetype } from './visionary'
import { wandererArchetype } from './wanderer'
import { vesselArchetype } from './servant'
import { maskArchetype } from './mask'
import { providerArchetype } from './provider'
import { sovereignArchetype } from './sovereign'
import { testStageSeekerArchetype } from './testStageSeeker'

export interface Archetype {
  key: string
  name: string
  color: string
  accentColor: string
  glowColor: string
  description: string
  loop: string
  needs: string
  stages: Stage[]
  diagnosis: DiagnosisMap
}

export interface Stage {
  key: string
  label: string
  color: string
  description: string
  needs: string
  questions: Question[]
}

export interface Question {
  id: string
  text: string
  options: QuestionOption[]
}

export interface QuestionOption {
  text: string
  value: number
}

export interface DiagnosisMap {
  [dominantStage: string]: {
    [maskStage: string]: Diagnosis
  }
}

export interface Diagnosis {
  title: string
  diagnosis: string
  reality: string
  tension: string
  lawToWalk: string
  ifYouStay: string
  ifYouAct: string
}

// Archetype registry
export const archetypes: { [key: string]: Archetype } = {
  seeker: seekerArchetype,
  guardian: guardianArchetype,
  spotlight: spotlightArchetype,
  partner: partnerArchetype,
  equalizer: equalizerArchetype,
  rebel: rebelArchetype,
  visionary: visionaryArchetype,
  wanderer: wandererArchetype,
  vessel: vesselArchetype,
  mask: maskArchetype,
  provider: providerArchetype,
  sovereign: sovereignArchetype,
  testStageSeeker: testStageSeekerArchetype,
  // Add other archetypes here as they're created
  // etc.
}

export function getArchetype(archetypeKey: string): Archetype | null {
  return archetypes[archetypeKey] || null
}

export function getAllArchetypes(): { [key: string]: Archetype } {
  return archetypes
}

export function getArchetypeKeys(): string[] {
  return Object.keys(archetypes)
} 