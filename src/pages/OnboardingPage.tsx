import { useEffect, useMemo, useRef, useState } from 'react'
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
  const [transition, setTransition] = useState<{
    target: number
    direction: 'forward' | 'backward'
  } | null>(null)
  const transitionTimer = useRef<number | null>(null)

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
  const answeredInSection = questionSection
    ? questionSection.questions.filter((question) => {
        const answer = answers[question.id]
        return Array.isArray(answer)
          ? answer.length > 0
          : answer !== undefined && answer !== ''
      }).length
    : 0

  useEffect(
    () => () => {
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current)
      }
    },
    [],
  )

  const goToStep = (nextStep: number) => {
    if (transition || nextStep === step) return

    const direction = nextStep > step ? 'forward' : 'backward'
    setTransition({ target: nextStep, direction })
    transitionTimer.current = window.setTimeout(() => {
      setStep(nextStep)
      setTransition(null)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 720)
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

  const renderStage = (stageIndex: number) => {
    const stage = stages[stageIndex]
    const stageQuestionSection =
      stage.kind === 'questions' ? stage.section : null
    const stageReflection = stageQuestionSection
      ? onboardingReflections[stageQuestionSection.id]
      : undefined

    return (
      <StageAtmosphere atmosphere={stage.atmosphere}>
        {stageQuestionSection && (
          <>
            <OnboardingStageIntro
              room={`Sala ${String(stageIndex + 1).padStart(2, '0')} de ${stages.length}`}
              title={stageQuestionSection.title}
              subtitle={stageQuestionSection.reflection}
              description={stageQuestionSection.description}
            />

            {stageReflection && (
              <ReflectionQuote
                text={stageReflection.text}
                context={stageReflection.context}
                className="mb-12"
              />
            )}

            <QuestionStep
              category={stageQuestionSection.id}
              questions={stageQuestionSection.questions}
              answers={answers}
              onAnswer={onAnswer}
            />
          </>
        )}

        {stage.kind === 'symbolic' && (
          <SymbolicLayerStep
            profile={symbolicProfile}
            onChange={onSymbolicChange}
            onSkip={skipSymbolicLayer}
          />
        )}

        {stage.kind === 'summary' && (
          <OnboardingSummaryStep
            answers={answers}
            symbolicProfile={symbolicProfile}
          />
        )}
      </StageAtmosphere>
    )
  }

  return (
    <div className="mx-auto max-w-6xl overflow-hidden px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <StageProgress
        stages={stages.map(({ id, label }) => ({ id, label }))}
        current={step}
      />

      <div className="grid">
        <div
          key={`current-${currentStage.id}`}
          className={`col-start-1 row-start-1 min-w-0 ${
            transition
              ? transition.direction === 'forward'
                ? 'animate-room-exit-forward pointer-events-none'
                : 'animate-room-exit-backward pointer-events-none'
              : ''
          }`}
        >
          {renderStage(step)}
        </div>

        {transition && (
          <div
            key={`incoming-${stages[transition.target].id}`}
            aria-hidden="true"
            className={`pointer-events-none col-start-1 row-start-1 min-w-0 ${
              transition.direction === 'forward'
                ? 'animate-room-enter-forward'
                : 'animate-room-enter-backward'
            }`}
          >
            {renderStage(transition.target)}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse items-stretch justify-between gap-4 border-t border-forest/10 pt-7 sm:flex-row sm:items-center">
        <Button variant="ghost" onClick={goBack} disabled={Boolean(transition)}>
          <span aria-hidden="true">←</span>
          {step === 0 ? 'Volver al inicio' : 'Volver a la sala anterior'}
        </Button>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <Button onClick={goNext} disabled={Boolean(transition)}>
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
  )
}
