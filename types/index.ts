export interface Session {
  id: string
  user_id: string
  archetype: string
  history: any[]
  depth_score: number
  ritual_completed: boolean
  created_at: string
  updated_at: string
}

export interface QuizOption {
  text: string
  weights: Record<string, number>
}

export interface QuizQuestion {
  question: string
  options: QuizOption[]
}

export interface Archetype {
  id: string
  name: string
  description: string
  missing_truth: string
  ritual_instructions: string
  indirect_questions: string[]
}

export interface QuizResult {
  archetype: string
  score: number
  answers: Array<{
    questionId: number
    selectedOption: number
    responseTime: number
  }>
}

export interface ChamberResponse {
  questionId: string
  answer: string
  responseTime: number
  emotionalKeywords: string[]
}

export interface RitualCompletion {
  ritualId: string
  completed: boolean
  reflection: string
  completedAt?: string
} 