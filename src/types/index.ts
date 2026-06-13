export type AppPage =
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'library'
  | 'onboarding'
  | 'relationship-map'
  | 'matches'
  | 'compatibility-report'

export type QuestionCategory =
  | 'basic'
  | 'practicalLife'
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
  intro?: string
  helper?: string
  placeholder?: string
  type: QuestionType
  options?: string[]
  scaleLabels?: [string, string]
  sentenceStart?: string
  nuancePrompt?: string
  nuancePlaceholder?: string
  conditionalWhen?: string
  conditionalPrompt?: string
  conditionalOptions?: string[]
  conditionalAnswerId?: string
  conditionalRequired?: boolean
}

export type AnswerValue = string | number | string[]

export interface Answer {
  questionId: string
  value: AnswerValue
}

export interface UploadedProfilePhoto {
  id: string
  name: string
  type: string
  size: number
  previewUrl: string
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
  symbolicProfile?: SymbolicProfile
  gazeProfile?: GazeProfile
}

export interface GazeProfile {
  comfort: number
  tendency: 'direct' | 'needs-trust' | 'protective'
}

export type SymbolicFileCategory =
  | 'Carta astral'
  | 'Human Design'
  | 'Informe de personalidad'
  | 'Otro documento simbólico'

export interface UploadedSymbolicFile {
  id: string
  name: string
  type: string
  size: number
  category: SymbolicFileCategory
}

export interface SymbolicProfile {
  wantsSymbolicLayer: boolean
  sunSign?: string
  moonSign?: string
  risingSign?: string
  mbtiType?: string
  humanDesignType?: string
  humanDesignAuthority?: string
  humanDesignProfile?: string
  uploadedFiles?: UploadedSymbolicFile[]
  symbolicNotes?: string
}

export type StageAtmosphereName =
  | 'clear'
  | 'earth'
  | 'structure'
  | 'depth'
  | 'warm'
  | 'honest'
  | 'delicate'
  | 'silent'
  | 'poetic'
  | 'mature'
  | 'night'
  | 'summary'

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
  gazeReading?: string
}
