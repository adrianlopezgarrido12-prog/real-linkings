import { useState } from 'react'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { QuestionStep } from '../components/QuestionStep'
import { questionsBySection } from '../data/questions'
import type { AnswerValue } from '../types'

interface OnboardingPageProps {
  answers: Record<string, AnswerValue>
  onAnswer: (questionId: string, value: AnswerValue) => void
  onFinish: () => void
  onExit: () => void
}

export function OnboardingPage({
  answers,
  onAnswer,
  onFinish,
  onExit,
}: OnboardingPageProps) {
  const [step, setStep] = useState(0)
  const section = questionsBySection[step]
  const progress = ((step + 1) / questionsBySection.length) * 100
  const answeredInSection = section.questions.filter((question) => {
    const answer = answers[question.id]
    return Array.isArray(answer) ? answer.length > 0 : answer !== undefined && answer !== ''
  }).length

  const goNext = () => {
    if (step < questionsBySection.length - 1) {
      setStep((current) => current + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    onFinish()
  }

  const goBack = () => {
    if (step === 0) {
      onExit()
      return
    }
    setStep((current) => current - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-5 sm:px-8 lg:px-10">
      <div className="mb-8 lg:hidden">
        <ProgressBar
          value={progress}
          label={`Etapa ${step + 1} de ${questionsBySection.length}`}
        />
      </div>

      <div className="grid gap-12 lg:grid-cols-[250px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <p className="eyebrow mb-5">Tu recorrido</p>
            <ol className="space-y-1">
              {questionsBySection.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setStep(index)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      index === step
                        ? 'bg-paper text-forest shadow-sm'
                        : index < step
                          ? 'text-moss hover:bg-white/35'
                          : 'text-muted hover:bg-white/35'
                    }`}
                  >
                    <span
                      className={`flex size-6 items-center justify-center rounded-full border text-[0.65rem] ${
                        index < step
                          ? 'border-moss bg-moss text-paper'
                          : index === step
                            ? 'border-forest text-forest'
                            : 'border-line text-muted'
                      }`}
                    >
                      {index < step ? '✓' : index + 1}
                    </span>
                    {item.title}
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-7">
              <ProgressBar value={progress} />
              <p className="mt-3 text-xs leading-5 text-muted">
                Puedes avanzar aunque una pregunta necesite más tiempo.
              </p>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <QuestionStep
            category={section.id}
            title={section.title}
            subtitle={section.subtitle}
            questions={section.questions}
            answers={answers}
            onAnswer={onAnswer}
          />

          <div className="mt-10 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-line pt-8 sm:flex-row sm:items-center">
            <Button variant="ghost" onClick={goBack}>
              <span aria-hidden="true">←</span>
              {step === 0 ? 'Volver al inicio' : 'Anterior'}
            </Button>
            <div className="flex flex-col items-stretch gap-2 sm:items-end">
              <Button onClick={goNext}>
                {step === questionsBySection.length - 1
                  ? 'Ver mi mapa relacional'
                  : 'Continuar'}
                <span aria-hidden="true">→</span>
              </Button>
              <span className="text-center text-[0.68rem] text-muted sm:text-right">
                {answeredInSection} de {section.questions.length} respondidas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
