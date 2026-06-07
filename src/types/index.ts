export type AppPage =
  | 'landing'
  | 'onboarding'
  | 'relationship-map'
  | 'matches'
  | 'compatibility-report'

export type QuestionCategory =
  | 'basic'
  | 'lifeProject'
  | 'values'
  | 'emotionalStyle'
  | 'communication'
  | 'intimacy'
  | 'patterns'
  | 'innerWorld'
  | 'availability'

export type CompatibilityCategory =
  | 'lifeProject'
  | 'values'
  | 'emotionalStyle'
  | 'communication'
  | 'intimacy'
  | 'lifestyle'
  | 'availability'
  | 'innerWorld'

export type QuestionType =
  | 'scale'
  | 'single'
  | 'multiple'
  | 'text'
  | 'sentence'

export interface Question {
  id: string
  category: QuestionCategory
  prompt: string
  helper?: string
  type: QuestionType
  options?: string[]
  scaleLabels?: [string, string]
  sentenceStart?: string
  nuancePrompt?: string
}

export type AnswerValue = string | number | string[]

export interface Answer {
  questionId: string
  value: AnswerValue
}

export interface CompatibilityDimensions {
  lifeProject: number
  values: number
  emotionalStyle: number
  communication: number
  intimacy: number
  lifestyle: number
  availability: number
  innerWorld: number
}

export interface UserProfile {
  id: string
  name: string
  age: number
  city: string
  intention: string
  dimensions: CompatibilityDimensions
  priorities: CompatibilityCategory[]
  traits: string[]
}

export interface CandidateProfile extends UserProfile {
  initials: string
  accent: 'sage' | 'clay' | 'ink'
  bio: string
  relationshipVision: string
  highlights: string[]
}

export interface CategoryScore {
  category: CompatibilityCategory
  label: string
  score: number
  weight: number
  note: string
}

export interface CompatibilityStrength {
  title: string
  description: string
  categories: CompatibilityCategory[]
}

export interface CompatibilityRisk {
  title: string
  description: string
  severity: 'low' | 'medium' | 'high'
  categories: CompatibilityCategory[]
}

export interface CompatibilityReport {
  candidateId: string
  totalScore: number
  categoryScores: CategoryScore[]
  strengths: CompatibilityStrength[]
  risks: CompatibilityRisk[]
  suggestedQuestions: string[]
  recommendation: string
  explanation: string
  depthReading: string[]
  relationalDynamic: string
  likelyConnection: string
  likelyTension: string
  relationshipLesson: string
  observeSignals: string[]
  relationalRisk: 'Bajo' | 'Moderado' | 'Elevado'
  longTermPotential: 'Prometedor' | 'Posible con atención' | 'Limitado'
}

export interface RelationshipMap {
  bondingStyle: string
  safetyNeeds: string
  desiredRelationship: string
  innerReading: string
  sensitiveAreas: string[]
  strengths: string[]
  availabilityLevel: number
  availabilityLabel: string
}
