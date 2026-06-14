import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { DimensionInterlude } from '../components/DimensionInterlude'
import { OnboardingStageIntro } from '../components/OnboardingStageIntro'
import { OnboardingSummaryStep } from '../components/OnboardingSummaryStep'
import { ProfilePhotoStep } from '../components/ProfilePhotoStep'
import { QuestionStep } from '../components/QuestionStep'
import { StageAtmosphere } from '../components/StageAtmosphere'
import { StageProgress } from '../components/StageProgress'
import {
  SymbolicLayerStep,
  type SymbolicView,
} from '../components/SymbolicLayerStep'
import { questionsBySection } from '../data/questions'
import { onboardingReflections } from '../data/reflections'
import {
  stageAccentClasses,
  stageBackgroundClasses,
} from '../data/stageThemes'
import { emptySymbolicProfile } from '../data/symbolic'
import type {
  AnswerValue,
  Question,
  StageAtmosphereName,
  SymbolicProfile,
  UploadedProfilePhoto,
} from '../types'

interface OnboardingPageProps {
  answers: Record<string, AnswerValue>
  initialScreenId?: string
  profilePhotos: UploadedProfilePhoto[]
  symbolicProfile: SymbolicProfile
  onAnswer: (questionId: string, value: AnswerValue) => void
  onProfilePhotosChange: (photos: UploadedProfilePhoto[]) => void
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
      kind: 'interlude'
      dimension: number
      label: string
      atmosphere: StageAtmosphereName
      title: string
      text: string
      prompt: string
      substep: number
      totalSubsteps: number
    }
  | {
      id: 'basic-photos'
      kind: 'photos'
      dimension: 1
      label: 'Dimensión de lo visible'
      atmosphere: 'clear'
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
  { kind: 'intro' | 'questions' | 'interlude' | 'photos' }
>

const dimensionInterludes: Record<
  string,
  { title: string; text: string; prompt: string }
> = {
  basic: {
    title: 'La atracción importa. No tiene que explicarlo todo.',
    text: 'El rostro y el cuerpo forman parte del deseo. No hace falta negarlo ni convertirlos en una medida del valor de alguien. Una imagen puede abrir una posibilidad; cuando lo demás encaja, deja de ser un examen y se vuelve una forma más de reconocer a la persona.',
    prompt: 'Una foto puede despertar interés. Lo que hace que quieras quedarte casi nunca cabe entero en ella.',
  },
  practicalLife: {
    title: 'El vínculo también necesita un lugar en el calendario.',
    text: 'La disponibilidad no se demuestra solo con intención. También aparece en los horarios, las distancias y la capacidad de reorganizar la vida cotidiana.',
    prompt: '¿Tu vida actual tiene espacio para una relación real o solo para imaginarla?',
  },
  lifeProject: {
    title: 'Compartir camino no significa renunciar al propio.',
    text: 'Una dirección compatible permite que dos proyectos personales se acompañen sin que uno tenga que desaparecer dentro del otro.',
    prompt: '¿Qué quieres construir con alguien y qué necesitas seguir construyendo por ti mismo/a?',
  },
  values: {
    title: 'Los valores aparecen cuando elegir tiene un coste.',
    text: 'Es fácil coincidir en palabras como honestidad o libertad. Lo importante es descubrir qué significan cuando hay miedo, deseo o desacuerdo.',
    prompt: '¿Qué principio quieres seguir cuidando incluso cuando amar se vuelva incómodo?',
  },
  emotionalStyle: {
    title: 'Acercarse y protegerse pueden ocurrir a la vez.',
    text: 'No buscamos corregir tu forma de sentir. Buscamos comprender qué hace que puedas abrirte y qué activa tu necesidad de recuperar distancia.',
    prompt: '¿Qué tendría que sentir tu cuerpo para saber que puede bajar la guardia?',
  },
  communication: {
    title: 'Un conflicto también revela cómo cuidamos.',
    text: 'La diferencia no rompe por sí sola un vínculo. Lo decisivo suele ser cómo se habla, cuánto se escucha y si existe una forma posible de reparación.',
    prompt: 'Cuando algo duele, ¿intentas tener razón o volver a encontrarte con la otra persona?',
  },
  intimacy: {
    title: 'La cercanía necesita ritmo, lenguaje y consentimiento.',
    text: 'La intimidad puede aparecer en el tacto, en el silencio, en una conversación o en la capacidad de sostener una mirada sin esconderse.',
    prompt: '¿Qué convierte para ti la intensidad en una presencia segura?',
  },
  patterns: {
    title: 'Reconocer un patrón ya empieza a cambiarlo.',
    text: 'No se trata de juzgar lo vivido. Se trata de ver qué respuestas antiguas siguen apareciendo cuando algo importante está en juego.',
    prompt: '¿Qué haces para protegerte que a veces termina alejándote de lo que deseas?',
  },
  innerWorld: {
    title: 'Lo que anhelas también habla de lo que quieres aprender.',
    text: 'Algunos deseos nacen de una falta; otros, de una visión de futuro. A menudo conviven y necesitan ser escuchados sin vergüenza.',
    prompt: '¿Buscas a alguien que complete algo o a alguien con quien compartir lo que ya estás construyendo?',
  },
  availability: {
    title: 'Querer una relación no siempre significa poder sostenerla.',
    text: 'Estar disponible no exige tener la vida resuelta. Sí implica poder ofrecer presencia, honestidad y responsabilidad sobre lo que uno activa.',
    prompt: '¿Qué puedes cuidar hoy con hechos, no solo con deseo?',
  },
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
  initialScreenId,
  profilePhotos,
  symbolicProfile,
  onAnswer,
  onProfilePhotosChange,
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
          substep: 1,
          totalSubsteps: 1,
        })

        if (
          groupIndex === Math.floor((groups.length - 1) / 2) &&
          dimensionInterludes[section.id]
        ) {
          const interlude = dimensionInterludes[section.id]
          sectionScreens.push({
            id: `${section.id}-interlude`,
            kind: 'interlude',
            dimension: index + 1,
            label: section.label,
            atmosphere: section.atmosphere,
            title: interlude.title,
            text: interlude.text,
            prompt: interlude.prompt,
            substep: 1,
            totalSubsteps: 1,
          })

          if (section.id === 'basic') {
            sectionScreens.push({
              id: 'basic-photos',
              kind: 'photos',
              dimension: 1,
              label: 'Dimensión de lo visible',
              atmosphere: 'clear',
              substep: 1,
              totalSubsteps: 1,
            })
          }
        }
      })

      return sectionScreens.map((screen, screenIndex) => ({
        ...screen,
        substep: screenIndex + 1,
        totalSubsteps: sectionScreens.length,
      }))
    })

    const symbolicViews: SymbolicView[] = [
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

  useEffect(() => {
    if (!initialScreenId) return

    const initialIndex = screens.findIndex(
      (screen) => screen.id === initialScreenId,
    )
    if (initialIndex >= 0) setScreenIndex(initialIndex)
  }, [initialScreenId, screens])

  const currentScreen = screens[screenIndex]
  const nextScreen = screens[screenIndex + 1]
  const activeAtmosphere = transition
    ? screens[transition.target].atmosphere
    : currentScreen.atmosphere
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
    const duration = 560

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

  const skipSymbolicDimension = () => {
    onSymbolicChange({ ...emptySymbolicProfile, uploadedFiles: [] })
    const summaryIndex = screens.findIndex((screen) => screen.kind === 'summary')
    goToScreen(summaryIndex)
  }

  const renderScreen = (index: number) => {
    const screen = screens[index]

    return (
      <StageAtmosphere>
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
            />
          </div>
        )}

        {screen.kind === 'interlude' && (
          <DimensionInterlude
            dimension={screen.dimension}
            label={screen.label}
            title={screen.title}
            text={screen.text}
            prompt={screen.prompt}
            atmosphere={screen.atmosphere}
          />
        )}

        {screen.kind === 'photos' && (
          <ProfilePhotoStep
            photos={profilePhotos}
            onChange={onProfilePhotosChange}
          />
        )}

        {screen.kind === 'symbolic' && (
          <SymbolicLayerStep
            view={screen.view}
            profile={symbolicProfile}
            onChange={onSymbolicChange}
            onSkip={skipSymbolicDimension}
          />
        )}

        {screen.kind === 'summary' && (
          <OnboardingSummaryStep
            answers={answers}
            profilePhotoCount={profilePhotos.length}
            symbolicProfile={symbolicProfile}
          />
        )}
      </StageAtmosphere>
    )
  }

  const nextLabel =
    currentScreen.kind === 'summary'
      ? 'Construir mi mapa relacional'
      : currentScreen.kind === 'symbolic'
        ? 'Continuar'
        : isFirstScreenOfDimension
          ? 'Entrar en esta dimensión'
          : isLastScreenOfDimension && nextScreen?.dimension !== 11
            ? 'Pasar a la siguiente dimensión'
            : isLastScreenOfDimension && nextScreen?.dimension === 11
              ? 'Abrir la dimensión simbólica'
              : 'Continuar'

  return (
    <div
      className={`relative h-[calc(100dvh-5.25rem)] overflow-hidden transition-[background] duration-[1600ms] ${stageBackgroundClasses[activeAtmosphere]}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span
          className={`absolute -right-24 -top-40 size-[32rem] rounded-full opacity-30 blur-3xl transition-colors duration-[1600ms] ${stageAccentClasses[activeAtmosphere][0]}`}
        />
        <span
          className={`absolute -bottom-52 left-[4%] size-[34rem] rounded-full opacity-30 blur-3xl transition-colors duration-[1600ms] ${stageAccentClasses[activeAtmosphere][1]}`}
        />
        <span className="absolute right-[13%] top-[16%] size-40 rounded-full border border-white/45 bg-white/10" />
        <span className="absolute right-[20%] top-[29%] size-20 rounded-[2rem] bg-white/22 backdrop-blur-sm" />
        <span className="absolute bottom-[8%] left-[8%] h-32 w-64 -rotate-6 rounded-[3rem] border border-white/42 bg-white/12" />
        <span className="absolute left-[39%] top-[10%] size-3 rounded-full bg-white/65 shadow-[2.5rem_1.2rem_0_rgba(255,255,255,0.35),5rem_-0.5rem_0_rgba(255,255,255,0.45)]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col overflow-hidden px-4 pb-3 sm:px-8 lg:px-10">
        <StageProgress
          dimension={currentScreen.dimension}
          totalDimensions={12}
          label={currentScreen.label}
          substep={currentScreen.substep}
          totalSubsteps={currentScreen.totalSubsteps}
          globalProgress={globalProgress}
          atmosphere={activeAtmosphere}
        />

        <div className="grid min-h-0 flex-1 overflow-hidden">
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
            className={`!min-h-10 !px-3 sm:!px-5 ${
              activeAtmosphere === 'night'
                ? '!text-[#d8edd6] hover:!bg-white/8'
                : ''
            }`}
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
            <Button
              className={`!min-h-10 !px-4 sm:!px-6 ${
                activeAtmosphere === 'night'
                  ? '!bg-[#cce8d5] !text-[#182b1e] hover:!bg-[#dff0e5]'
                  : ''
              }`}
              onClick={goNext}
              disabled={Boolean(transition) || conditionalBlocked}
            >
              {nextLabel}
              <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
