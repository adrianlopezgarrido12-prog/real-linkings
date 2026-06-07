import { useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { OnboardingStageIntro } from '../components/OnboardingStageIntro'
import { OnboardingSummaryStep } from '../components/OnboardingSummaryStep'
import { QuestionStep } from '../components/QuestionStep'
import { ReflectionQuote } from '../components/ReflectionQuote'
import { StageAtmosphere } from '../components/StageAtmosphere'
import { StageProgress } from '../components/StageProgress'
import { SymbolicLayerStep } from '../components/SymbolicLayerStep'
import { questionsBySection } from '../data/questions'
import { onboardingReflections } from '../data/reflections'
import { emptySymbolicProfile } from '../data/symbolic'
import type {
  AnswerValue,
  StageAtmosphereName,
  SymbolicProfile,
} from '../types'

interface OnboardingPageProps {
  answers: Record<string, AnswerValue>
  symbolicProfile: SymbolicProfile
  onAnswer: (questionId: string, value: AnswerValue) => void
  onSymbolicChange: (profile: SymbolicProfile) => void
  onFinish: () => void
  onExit: () => void
}

type OnboardingStage =
  | {
      id: string
      label: string
      kind: 'questions'
      atmosphere: StageAtmosphereName
      nextLabel: string
      section: (typeof questionsBySection)[number]
    }
  | {
      id: 'symbolic'
      label: 'Mapa simbólico'
      kind: 'symbolic'
      atmosphere: 'night'
      nextLabel: 'Continuar hacia la síntesis'
    }
  | {
      id: 'summary'
      label: 'Síntesis final'
      kind: 'summary'
      atmosphere: 'summary'
      nextLabel: 'Construir mi mapa relacional'
    }

export function OnboardingPage({
  answers,
  symbolicProfile,
  onAnswer,
  onSymbolicChange,
  onFinish,
  onExit,
}: OnboardingPageProps) {
  const [step, setStep] = useState(0)

  const stages = useMemo<OnboardingStage[]>(
    () => [
      ...questionsBySection.map((section) => ({
        id: section.id,
        label: section.label,
        kind: 'questions' as const,
        atmosphere: section.atmosphere,
        nextLabel: section.nextLabel,
        section,
      })),
      {
        id: 'symbolic',
        label: 'Mapa simbólico',
        kind: 'symbolic',
        atmosphere: 'night',
        nextLabel: 'Continuar hacia la síntesis',
      },
      {
        id: 'summary',
        label: 'Síntesis final',
        kind: 'summary',
        atmosphere: 'summary',
        nextLabel: 'Construir mi mapa relacional',
      },
    ],
    [],
  )

  const currentStage = stages[step]
  const questionSection =
    currentStage.kind === 'questions' ? currentStage.section : null
  const sectionReflection = questionSection
    ? onboardingReflections[questionSection.id]
    : undefined
  const answeredInSection = questionSection
    ? questionSection.questions.filter((question) => {
        const answer = answers[question.id]
        return Array.isArray(answer)
          ? answer.length > 0
          : answer !== undefined && answer !== ''
      }).length
    : 0

  const goToStep = (nextStep: number) => {
    setStep(nextStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goNext = () => {
    if (currentStage.kind === 'summary') {
      onFinish()
      return
    }
    goToStep(Math.min(step + 1, stages.length - 1))
  }

  const goBack = () => {
    if (step === 0) {
      onExit()
      return
    }
    goToStep(step - 1)
  }

  const skipSymbolicLayer = () => {
    onSymbolicChange({ ...emptySymbolicProfile, uploadedFiles: [] })
    goToStep(step + 1)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-5 sm:px-8 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[250px_1fr] lg:gap-16">
        <StageProgress
          stages={stages.map(({ id, label }) => ({ id, label }))}
          current={step}
          onSelect={goToStep}
        />

        <div className="min-w-0">
          <StageAtmosphere atmosphere={currentStage.atmosphere}>
            {questionSection && (
              <>
                <OnboardingStageIntro
                  room={`Sala ${String(step + 1).padStart(2, '0')} de ${stages.length}`}
                  title={questionSection.title}
                  subtitle={questionSection.reflection}
                  description={questionSection.description}
                />

                {sectionReflection && (
                  <ReflectionQuote
                    text={sectionReflection.text}
                    context={sectionReflection.context}
                    className="mb-12"
                  />
                )}

                <QuestionStep
                  category={questionSection.id}
                  questions={questionSection.questions}
                  answers={answers}
                  onAnswer={onAnswer}
                />
              </>
            )}

            {currentStage.kind === 'symbolic' && (
              <SymbolicLayerStep
                profile={symbolicProfile}
                onChange={onSymbolicChange}
                onSkip={skipSymbolicLayer}
              />
            )}

            {currentStage.kind === 'summary' && (
              <OnboardingSummaryStep
                answers={answers}
                symbolicProfile={symbolicProfile}
              />
            )}
          </StageAtmosphere>

          <div className="mt-8 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-line pt-8 sm:flex-row sm:items-center">
            <Button variant="ghost" onClick={goBack}>
              <span aria-hidden="true">←</span>
              {step === 0 ? 'Volver al inicio' : 'Volver a la sala anterior'}
            </Button>
            <div className="flex flex-col items-stretch gap-2 sm:items-end">
              <Button onClick={goNext}>
                {currentStage.nextLabel}
                <span aria-hidden="true">→</span>
              </Button>
              {questionSection && (
                <span className="text-center text-[0.68rem] text-muted sm:text-right">
                  {answeredInSection} de {questionSection.questions.length}{' '}
                  respondidas en esta sala
                </span>
              )}
              {currentStage.kind === 'symbolic' && (
                <span className="text-center text-[0.68rem] text-muted sm:text-right">
                  Esta capa no modifica la afinidad principal
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
