import { questionsBySection } from '../data/questions'
import { hasSymbolicData } from '../data/symbolic'
import type { AnswerValue, SymbolicProfile } from '../types'

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

    return { ...section, answered }
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
    <div className="flex h-full flex-col justify-center">
      <p className="eyebrow">Dimensión 12 de 12</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-forest sm:text-5xl">
        Síntesis del mapa
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
        Has avanzado por las capas principales de tu vida, tu forma de amar,
        tus patrones, tus anhelos y tu disponibilidad para vincularte.
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.52fr_1.48fr]">
        <div className="rounded-2xl border border-sage/55 bg-[#e8eee9] p-5">
          <p className="eyebrow">Mapa completado</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-serif text-5xl text-forest">{completion}</span>
            <span className="mb-1.5 text-xs text-muted">%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-forest/10">
            <div
              className="h-full rounded-full bg-forest"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">
            {answeredQuestions} de {totalQuestions} respuestas principales.
          </p>
          <p className="mt-4 border-t border-forest/10 pt-3 text-xs leading-5 text-forest/72">
            {symbolicAdded
              ? 'Dimensión simbólica añadida como capa narrativa secundaria.'
              : 'Dimensión simbólica omitida. El núcleo de tu mapa está completo.'}
          </p>
        </div>

        <div className="hidden rounded-2xl border border-line bg-paper/72 p-4 sm:block sm:p-5">
          <p className="eyebrow mb-3">Dimensiones recorridas</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="rounded-xl border border-line/70 bg-white/40 px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[0.58rem] ${
                      section.answered > 0
                        ? 'bg-moss text-paper'
                        : 'border border-line text-muted'
                    }`}
                  >
                    {section.answered > 0 ? '✓' : index + 1}
                  </span>
                  <span className="text-[0.65rem] text-muted">
                    {section.answered}/{section.questions.length}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-[0.68rem] leading-4 text-ink">
                  {section.label.replace('Dimensión de la ', '').replace(
                    'Dimensión del ',
                    '',
                  ).replace('Dimensión de los ', '').replace(
                    'Dimensión ',
                    '',
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
        <div className="rounded-xl border border-line bg-white/45 p-3">
          <p className="text-[0.64rem] uppercase tracking-[0.12em] text-muted">
            Núcleo recorrido
          </p>
          <p className="mt-1 font-serif text-lg text-forest">10 dimensiones</p>
        </div>
        <div className="rounded-xl border border-line bg-white/45 p-3">
          <p className="text-[0.64rem] uppercase tracking-[0.12em] text-muted">
            Capa simbólica
          </p>
          <p className="mt-1 font-serif text-lg text-forest">
            {symbolicAdded ? 'Añadida' : 'Omitida'}
          </p>
        </div>
      </div>

      <p className="mt-3 max-w-4xl font-serif text-base italic leading-6 text-forest/78 sm:mt-4 sm:text-lg sm:leading-7">
        “A partir de aquí, Real Linkings puede construir una lectura más
        completa de tu forma de vincularte.”
      </p>
    </div>
  )
}
