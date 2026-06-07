import { questionsBySection } from '../data/questions'
import { hasSymbolicData } from '../data/symbolic'
import type { AnswerValue, SymbolicProfile } from '../types'
import { OnboardingStageIntro } from './OnboardingStageIntro'

interface OnboardingSummaryStepProps {
  answers: Record<string, AnswerValue>
  symbolicProfile: SymbolicProfile
}

export function OnboardingSummaryStep({
  answers,
  symbolicProfile,
}: OnboardingSummaryStepProps) {
  const sections = questionsBySection.map((section) => {
    const answered = section.questions.filter((question) => {
      const answer = answers[question.id]
      return Array.isArray(answer)
        ? answer.length > 0
        : answer !== undefined && answer !== ''
    }).length

    return {
      ...section,
      answered,
      complete: answered === section.questions.length,
    }
  })

  const totalQuestions = sections.reduce(
    (total, section) => total + section.questions.length,
    0,
  )
  const answeredQuestions = sections.reduce(
    (total, section) => total + section.answered,
    0,
  )
  const completion = Math.round((answeredQuestions / totalQuestions) * 100)
  const symbolicAdded = hasSymbolicData(symbolicProfile)

  return (
    <div>
      <OnboardingStageIntro
        room="Duodécima sala · La mirada completa"
        title="Síntesis final"
        subtitle="Has recorrido desde lo visible hasta aquello que suele costar más nombrar."
        description="Has recorrido las capas principales de tu mapa. Algunas hablan de tu vida práctica. Otras, de cómo amas. Otras, de lo que temes, deseas o estás preparado/a para sostener. A partir de aquí, Real Linkings puede empezar a construir una lectura más completa de tu forma de vincularte."
      />

      <div className="grid gap-5 md:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-2xl border border-sage/55 bg-[#e8eee9] p-6">
          <p className="eyebrow">Recorrido principal</p>
          <div className="mt-5 flex items-end gap-2">
            <span className="font-serif text-6xl text-forest">{completion}</span>
            <span className="mb-2 text-sm text-muted">% completado</span>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-forest/10">
            <div
              className="h-full rounded-full bg-forest"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            {answeredQuestions} de {totalQuestions} preguntas respondidas.
            Puedes volver a cualquier sala antes de construir tu mapa.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-paper/72 p-5 sm:p-6">
          <p className="eyebrow mb-4">Salas recorridas</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center gap-3 rounded-xl border border-line/70 bg-white/35 px-4 py-3"
              >
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[0.62rem] ${
                    section.complete
                      ? 'bg-moss text-paper'
                      : 'border border-line text-muted'
                  }`}
                >
                  {section.complete ? '✓' : index + 1}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">{section.label}</p>
                  <p className="text-[0.68rem] text-muted">
                    {section.answered}/{section.questions.length} respondidas
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-white/35 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span
            className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${
              symbolicAdded
                ? 'bg-[#273937] text-[#d8cda8]'
                : 'border border-line text-muted'
            }`}
          >
            {symbolicAdded ? '✓' : '—'}
          </span>
          <div>
            <p className="font-medium text-forest">
              {symbolicAdded
                ? 'Dimensión simbólica añadida'
                : 'Dimensión simbólica omitida'}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {symbolicAdded
                ? 'Aparecerá como una capa narrativa secundaria. No modificará el cálculo principal de afinidad.'
                : 'Tu mapa se construirá desde las capas prácticas, emocionales y relacionales. No falta ninguna parte esencial.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
