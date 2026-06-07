import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { OnboardingStageIntro } from '../components/OnboardingStageIntro'
import { OnboardingSummaryStep } from '../components/OnboardingSummaryStep'
import { QuestionStep } from '../components/QuestionStep'
import { StageAtmosphere } from '../components/StageAtmosphere'
import { StageProgress } from '../components/StageProgress'
import {
  SymbolicLayerStep,
  type SymbolicView,
} from '../components/SymbolicLayerStep'
import { questionsBySection } from '../data/questions'
import { onboardingReflections } from '../data/reflections'
import { emptySymbolicProfile } from '../data/symbolic'
import type {
  AnswerValue,
  Question,
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

type OnboardingScreen =
  | {
      id: string
      kind: 'intro'
      dimension: number
      label: string
      atmosphere: StageAtmosphereName
      title: string
      subtitle: string
      description: string
      reflection?: string
      substep: number
      totalSubsteps: number
    }
  | {
      id: string
      kind: 'questions'
      dimension: number
      label: string
      atmosphere: StageAtmosphereName
      questions: Question[]
      pause?: string
      substep: number
      totalSubsteps: number
    }
  | {
      id: string
      kind: 'symbolic'
      dimension: 11
      label: 'Dimensión simbólica'
      atmosphere: 'night'
      view: SymbolicView
      substep: number
      totalSubsteps: number
    }
  | {
      id: 'summary'
      kind: 'summary'
      dimension: 12
      label: 'Síntesis del mapa'
      atmosphere: 'summary'
      substep: 1
      totalSubsteps: 1
    }

type QuestionOnboardingScreen = Extract<
  OnboardingScreen,
  { kind: 'intro' | 'questions' }
>

const dimensionPauses: Record<string, string[]> = {
  basic: [
    'No necesitamos resumirte en una etiqueta. Solo empezar a situar desde dónde llegas.',
  ],
  practicalLife: [
    'La vida cotidiana no es el fondo de una relación. Es una parte de la relación.',
  ],
  lifeProject: [
    'Dos caminos no tienen que ser idénticos para poder avanzar juntos.',
  ],
  values: [
    'Amar no es retener ni llenar un vacío. También es aprender a cuidar la libertad del otro.',
  ],
  emotionalStyle: [
    'Acercarse y protegerse pueden convivir dentro de una misma persona.',
  ],
  communication: [
    'Reparar no borra lo ocurrido. Permite volver a mirarlo juntos.',
  ],
  intimacy: [
    'Toda cercanía necesita deseo, consentimiento, lenguaje y cuidado.',
  ],
  patterns: [
    'Un patrón deja de gobernarnos cuando podemos reconocerlo mientras está ocurriendo.',
  ],
  innerWorld: [
    'Sentirse en casa con alguien no debería exigir desaparecer dentro de la relación.',
  ],
  availability: [
    'La disponibilidad no es no tener miedo. Es poder actuar con honestidad incluso cuando aparece.',
  ],
}

function questionWeight(question: Question) {
  if (question.intro || question.conditionalOptions) return 10
  if (question.type === 'multiple') return 6
  if (question.type === 'single') return (question.options?.length ?? 0) >= 5 ? 6 : 5
  if (question.type === 'text' || question.type === 'sentence') return 3
  return 3
}

function groupQuestions(questions: Question[]) {
  const groups: Question[][] = []
  let current: Question[] = []
  let weight = 0

  questions.forEach((question) => {
    const nextWeight = questionWeight(question)
    if (current.length > 0 && (weight + nextWeight > 7 || current.length >= 2)) {
      groups.push(current)
      current = []
      weight = 0
    }
    current.push(question)
    weight += nextWeight
  })

  if (current.length > 0) groups.push(current)
  return groups
}

export function OnboardingPage({
  answers,
  symbolicProfile,
  onAnswer,
  onSymbolicChange,
  onFinish,
  onExit,
}: OnboardingPageProps) {
  const [screenIndex, setScreenIndex] = useState(0)
  const [transition, setTransition] = useState<{
    target: number
    direction: 'forward' | 'backward'
    duration: number
  } | null>(null)
  const transitionTimer = useRef<number | null>(null)

  const screens = useMemo<OnboardingScreen[]>(() => {
    const questionScreens = questionsBySection.flatMap((section, index) => {
      const groups = groupQuestions(section.questions)
      const reflection = onboardingReflections[section.id]?.text
      const sectionScreens: QuestionOnboardingScreen[] = [
        {
          id: `${section.id}-intro`,
          kind: 'intro' as const,
          dimension: index + 1,
          label: section.label,
          atmosphere: section.atmosphere,
          title: section.title,
          subtitle: section.reflection,
          description: section.description,
          reflection,
          substep: 1,
          totalSubsteps: 1,
        },
      ]

      groups.forEach((questions, groupIndex) => {
        const microIntro = questions[0]?.intro
        if (microIntro) {
          sectionScreens.push({
            id: `${section.id}-microintro-${groupIndex + 1}`,
            kind: 'intro',
            dimension: index + 1,
            label: section.label,
            atmosphere: section.atmosphere,
            title: 'Mirar y dejarse mirar',
            subtitle: 'Presencia, vulnerabilidad y contacto.',
            description: microIntro,
            substep: 1,
            totalSubsteps: 1,
          })
        }

        sectionScreens.push({
          id: `${section.id}-questions-${groupIndex + 1}`,
          kind: 'questions',
          dimension: index + 1,
          label: section.label,
          atmosphere: section.atmosphere,
          questions: questions.map((question) =>
            question.intro ? { ...question, intro: undefined } : question,
          ),
          pause:
            groupIndex === Math.floor(groups.length / 2)
              ? dimensionPauses[section.id]?.[0]
              : undefined,
          substep: 1,
          totalSubsteps: 1,
        })
      })

      return sectionScreens.map((screen, screenIndex) => ({
        ...screen,
        substep: screenIndex + 1,
        totalSubsteps: sectionScreens.length,
      }))
    })

    const symbolicViews: SymbolicView[] = [
      'intro',
      'astrology',
      'personality',
      'documents',
      'notes',
    ]

    const allScreens: OnboardingScreen[] = [
      ...questionScreens,
      ...symbolicViews.map((view, index) => ({
        id: `symbolic-${view}`,
        kind: 'symbolic' as const,
        dimension: 11 as const,
        label: 'Dimensión simbólica' as const,
        atmosphere: 'night' as const,
        view,
        substep: index + 1,
        totalSubsteps: symbolicViews.length,
      })),
      {
        id: 'summary',
        kind: 'summary',
        dimension: 12 as const,
        label: 'Síntesis del mapa',
        atmosphere: 'summary' as const,
        substep: 1 as const,
        totalSubsteps: 1 as const,
      },
    ]
    return allScreens
  }, [])

  const currentScreen = screens[screenIndex]
  const nextScreen = screens[screenIndex + 1]
  const globalProgress = ((screenIndex + 1) / screens.length) * 100
  const isFirstScreenOfDimension = currentScreen.substep === 1
  const isLastScreenOfDimension =
    currentScreen.substep === currentScreen.totalSubsteps
  const conditionalBlocked =
    currentScreen.kind === 'questions' &&
    currentScreen.questions.some(
      (question) =>
        question.conditionalRequired &&
        answers[question.id] === question.conditionalWhen &&
        question.conditionalAnswerId &&
        !answers[question.conditionalAnswerId],
    )

  useEffect(
    () => () => {
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current)
      }
    },
    [],
  )

  const goToScreen = (target: number) => {
    if (
      transition ||
      target === screenIndex ||
      target < 0 ||
      target >= screens.length
    ) {
      return
    }

    const direction = target > screenIndex ? 'forward' : 'backward'
    const changesDimension =
      screens[target].dimension !== currentScreen.dimension
    const duration = changesDimension ? 560 : 460

    setTransition({ target, direction, duration })
    transitionTimer.current = window.setTimeout(() => {
      setScreenIndex(target)
      setTransition(null)
    }, duration)
  }

  const goNext = () => {
    if (currentScreen.kind === 'summary') {
      onFinish()
      return
    }
    goToScreen(screenIndex + 1)
  }

  const goBack = () => {
    if (screenIndex === 0) {
      onExit()
      return
    }
    goToScreen(screenIndex - 1)
  }

  const startSymbolicDimension = () => {
    onSymbolicChange({ ...symbolicProfile, wantsSymbolicLayer: true })
    goNext()
  }

  const skipSymbolicDimension = () => {
    onSymbolicChange({ ...emptySymbolicProfile, uploadedFiles: [] })
    const summaryIndex = screens.findIndex((screen) => screen.kind === 'summary')
    goToScreen(summaryIndex)
  }

  const renderScreen = (index: number) => {
    const screen = screens[index]

    return (
      <StageAtmosphere atmosphere={screen.atmosphere}>
        {screen.kind === 'intro' && (
          <div className="flex h-full flex-col justify-center">
            <OnboardingStageIntro
              room={`Dimensión ${screen.dimension} de 12`}
              title={screen.title}
              subtitle={screen.subtitle}
              description={screen.description}
            />
            {screen.reflection && (
              <p className="max-w-3xl border-l border-clay/35 pl-5 font-serif text-lg italic leading-7 text-forest/72 sm:text-xl">
                “{screen.reflection}”
              </p>
            )}
          </div>
        )}

        {screen.kind === 'questions' && (
          <div className="flex h-full flex-col justify-center">
            <QuestionStep
              category={screen.questions[0].category}
              questions={screen.questions}
              answers={answers}
              onAnswer={onAnswer}
              pause={screen.pause}
            />
          </div>
        )}

        {screen.kind === 'symbolic' && (
          <SymbolicLayerStep
            view={screen.view}
            profile={symbolicProfile}
            onChange={onSymbolicChange}
            onStart={startSymbolicDimension}
            onSkip={skipSymbolicDimension}
          />
        )}

        {screen.kind === 'summary' && (
          <OnboardingSummaryStep
            answers={answers}
            symbolicProfile={symbolicProfile}
          />
        )}
      </StageAtmosphere>
    )
  }

  const nextLabel =
    currentScreen.kind === 'summary'
      ? 'Construir mi mapa relacional'
      : isFirstScreenOfDimension
        ? 'Entrar en esta dimensión'
        : isLastScreenOfDimension && nextScreen?.dimension !== 11
          ? 'Pasar a la siguiente dimensión'
          : isLastScreenOfDimension && nextScreen?.dimension === 11
            ? 'Abrir la dimensión simbólica'
            : 'Continuar'

  const hidePrimaryNavigation =
    currentScreen.kind === 'symbolic' && currentScreen.view === 'intro'

  return (
    <div className="mx-auto flex h-[calc(100dvh-5.25rem)] max-w-6xl flex-col overflow-hidden px-4 pb-3 sm:px-8 lg:px-10">
      <StageProgress
        dimension={currentScreen.dimension}
        totalDimensions={12}
        label={currentScreen.label}
        substep={currentScreen.substep}
        totalSubsteps={currentScreen.totalSubsteps}
        globalProgress={globalProgress}
      />

      <div className="grid min-h-0 flex-1">
        <div
          key={`current-${currentScreen.id}`}
          className={`col-start-1 row-start-1 min-h-0 min-w-0 ${
            transition
              ? transition.direction === 'forward'
                ? 'animate-room-exit-forward pointer-events-none'
                : 'animate-room-exit-backward pointer-events-none'
              : ''
          }`}
          style={
            transition
              ? { animationDuration: `${transition.duration}ms` }
              : undefined
          }
        >
          {renderScreen(screenIndex)}
        </div>

        {transition && (
          <div
            key={`incoming-${screens[transition.target].id}`}
            aria-hidden="true"
            className={`pointer-events-none col-start-1 row-start-1 min-h-0 min-w-0 ${
              transition.direction === 'forward'
                ? 'animate-room-enter-forward'
                : 'animate-room-enter-backward'
            }`}
            style={{ animationDuration: `${transition.duration}ms` }}
          >
            {renderScreen(transition.target)}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 pt-3 sm:pt-4">
        <Button
          variant="ghost"
          className="!min-h-10 !px-3 sm:!px-5"
          onClick={goBack}
          disabled={Boolean(transition)}
        >
          <span aria-hidden="true">←</span>
          <span className="hidden sm:inline">
            {screenIndex === 0 ? 'Volver al inicio' : 'Atrás'}
          </span>
        </Button>

        <div className="text-center">
          {conditionalBlocked && (
            <p className="mb-1 text-[0.66rem] text-clay">
              Concreta de qué depende para continuar.
            </p>
          )}
          {!hidePrimaryNavigation && (
            <Button
              className="!min-h-10 !px-4 sm:!px-6"
              onClick={goNext}
              disabled={Boolean(transition) || conditionalBlocked}
            >
              {nextLabel}
              <span aria-hidden="true">→</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
