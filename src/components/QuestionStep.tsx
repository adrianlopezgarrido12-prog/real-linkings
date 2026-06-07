import type {
  AnswerValue,
  Question,
  QuestionCategory,
} from '../types'

interface QuestionStepProps {
  category: QuestionCategory
  questions: Question[]
  answers: Record<string, AnswerValue>
  onAnswer: (questionId: string, value: AnswerValue) => void
}

const stagePauses: Record<QuestionCategory, [string, string]> = {
  basic: [
    'No necesitamos resumirte en una etiqueta. Solo empezar a situar desde dónde llegas.',
    'Lo que buscas importa, pero también la forma en que deseas ser encontrado/a.',
  ],
  practicalLife: [
    'El amor necesita tiempo emocional, pero también un lugar real en la agenda.',
    'La vida cotidiana no es el fondo de una relación. Es una parte de la relación.',
  ],
  lifeProject: [
    'Dos caminos no tienen que ser idénticos para poder avanzar juntos.',
    'Construir también significa saber qué parte de ti necesitas conservar.',
  ],
  values: [
    'Los valores se vuelven visibles cuando elegir tiene un coste.',
    'Amar no es retener ni llenar un vacío. También es aprender a cuidar la libertad del otro.',
  ],
  emotionalStyle: [
    'Acercarse y protegerse pueden convivir dentro de una misma persona.',
    'No buscamos corregir tu forma de sentir, sino comprender qué necesita para sentirse segura.',
  ],
  communication: [
    'Una relación no se mide por evitar el conflicto, sino por cómo consigue atravesarlo.',
    'Reparar no borra lo ocurrido. Permite volver a mirarlo juntos.',
  ],
  intimacy: [
    'La intimidad no empieza en el cuerpo. Empieza donde ya no hace falta defenderse.',
    'Toda cercanía necesita deseo, consentimiento, lenguaje y cuidado.',
  ],
  patterns: [
    'Mirar lo vivido no obliga a quedarse dentro de ello.',
    'Un patrón deja de gobernarnos cuando podemos reconocerlo mientras está ocurriendo.',
  ],
  innerWorld: [
    'A veces lo que más anhelamos es también lo que más nos cuesta pedir.',
    'Sentirse en casa con alguien no debería exigir desaparecer dentro de la relación.',
  ],
  availability: [
    'Desear una relación y poder sostenerla no siempre son lo mismo.',
    'La disponibilidad no es no tener miedo. Es poder actuar con honestidad incluso cuando aparece.',
  ],
}

const shortTextQuestions: Record<string, string> = {
  'basic-name': 'Tu nombre',
  'basic-age': 'Tu edad',
  'basic-city': 'Tu ciudad',
}

function isSelected(answer: AnswerValue | undefined, option: string) {
  return Array.isArray(answer) ? answer.includes(option) : answer === option
}

function needsMoreDetail(value: AnswerValue | undefined) {
  if (typeof value !== 'string') return false

  const normalized = value.trim().toLowerCase()
  if (normalized.length === 0 || normalized.length > 55) return false

  return [
    /^depende[. ]*$/,
    /^depende (del|de la|de)[^.]*[. ]*$/,
    /^no (lo )?sé[. ]*$/,
    /^no estoy segur[oa](\/a)?[. ]*$/,
    /^según (el momento|la persona|el contexto)[. ]*$/,
  ].some((pattern) => pattern.test(normalized))
}

export function QuestionStep({
  category,
  questions,
  answers,
  onAnswer,
}: QuestionStepProps) {
  const handleMultiple = (
    questionId: string,
    currentValue: AnswerValue | undefined,
    option: string,
  ) => {
    const current = Array.isArray(currentValue) ? currentValue : []
    onAnswer(
      questionId,
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    )
  }

  return (
    <section key={category}>
      <div className="space-y-7">
        {questions.map((question, index) => {
          const answer = answers[question.id]
          const nuanceId = `${question.id}__nuance`
          const nuance = answers[nuanceId]
          const hasAnswer = Array.isArray(answer)
            ? answer.length > 0
            : answer !== undefined && answer !== ''
          const vagueOpenAnswer =
            (question.type === 'text' || question.type === 'sentence') &&
            needsMoreDetail(answer)
          const shortTextPlaceholder = shortTextQuestions[question.id]
          const pause =
            index === 1
              ? stagePauses[category][0]
              : index === 3
                ? stagePauses[category][1]
                : null

          return (
            <div
              key={question.id}
              className="space-y-7"
            >
              <article
                className={`rounded-[1.75rem] border border-white/70 p-5 shadow-[0_16px_45px_rgba(38,55,47,0.055)] backdrop-blur-sm sm:p-7 ${
                  index % 2 === 0 ? 'bg-white/58' : 'bg-ivory/52'
                }`}
              >
                <div className="mb-6 flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-moss/25 bg-white/45 text-[0.68rem] font-semibold text-moss">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="max-w-3xl text-lg font-medium leading-7 text-ink sm:text-xl">
                      {question.prompt}
                    </h2>
                    {question.helper && (
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {question.helper}
                      </p>
                    )}
                  </div>
                </div>

                {(question.type === 'text' ||
                  question.type === 'sentence') && (
                  <div className="ml-0 sm:ml-12">
                    {question.type === 'sentence' && (
                      <p className="mb-4 font-serif text-xl italic leading-8 text-forest sm:text-2xl">
                        {question.sentenceStart}
                      </p>
                    )}
                    {shortTextPlaceholder ? (
                      <input
                        type={question.id === 'basic-age' ? 'number' : 'text'}
                        value={typeof answer === 'string' ? answer : ''}
                        onChange={(event) =>
                          onAnswer(question.id, event.target.value)
                        }
                        placeholder={shortTextPlaceholder}
                        className="min-h-14 w-full border-0 border-b border-moss/30 bg-transparent px-1 text-lg text-ink outline-none transition placeholder:text-muted/45 focus:border-forest sm:max-w-xl"
                      />
                    ) : (
                      <textarea
                        value={typeof answer === 'string' ? answer : ''}
                        onChange={(event) =>
                          onAnswer(question.id, event.target.value)
                        }
                        rows={3}
                        placeholder={
                          question.type === 'sentence'
                            ? 'Continúa la frase...'
                            : 'Escribe con tus propias palabras...'
                        }
                        className={`w-full resize-none rounded-2xl border bg-white/55 px-5 py-4 text-sm leading-6 text-ink outline-none transition placeholder:text-muted/60 focus:bg-white ${
                          vagueOpenAnswer
                            ? 'border-clay/65 focus:border-clay'
                            : 'border-line focus:border-moss'
                        }`}
                      />
                    )}
                    {vagueOpenAnswer && (
                      <p className="mt-2 text-xs leading-5 text-clay">
                        Esta respuesta necesita una segunda capa. ¿De qué
                        depende? ¿Qué suele ocurrir en ti cuando cambia el
                        contexto?
                      </p>
                    )}
                  </div>
                )}

                {question.type === 'scale' && (
                  <div className="ml-0 sm:ml-12">
                    <div className="relative grid grid-cols-5 gap-2">
                      <div className="absolute left-[8%] right-[8%] top-1/2 -z-10 h-px bg-moss/20" />
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => onAnswer(question.id, value)}
                          className={`mx-auto flex size-12 items-center justify-center rounded-full border text-sm font-medium shadow-sm transition sm:size-14 ${
                            answer === value
                              ? 'scale-105 border-forest bg-forest text-paper'
                              : 'border-line bg-paper text-muted hover:border-moss hover:text-forest'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-between text-[0.68rem] text-muted">
                      <span>{question.scaleLabels?.[0]}</span>
                      <span>{question.scaleLabels?.[1]}</span>
                    </div>
                  </div>
                )}

                {(question.type === 'single' ||
                  question.type === 'multiple') && (
                  <div className="ml-0 grid gap-2 sm:ml-12 sm:grid-cols-2">
                    {question.options?.map((option) => {
                      const selected = isSelected(answer, option)

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            question.type === 'multiple'
                              ? handleMultiple(question.id, answer, option)
                              : onAnswer(question.id, option)
                          }
                          className={`flex min-h-14 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm leading-5 transition ${
                            selected
                              ? 'border-forest bg-[#e2eae3] text-forest shadow-sm'
                              : 'border-line/90 bg-white/52 text-ink hover:-translate-y-0.5 hover:border-moss hover:bg-white/75'
                          }`}
                        >
                          <span
                            className={`flex size-5 shrink-0 items-center justify-center border ${
                              question.type === 'multiple'
                                ? 'rounded-md'
                                : 'rounded-full'
                            } ${
                              selected
                                ? 'border-forest bg-forest text-paper'
                                : 'border-line bg-paper'
                            }`}
                          >
                            {selected && (
                              <svg
                                viewBox="0 0 16 16"
                                className="size-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="m3 8 3 3 7-7" />
                              </svg>
                            )}
                          </span>
                          {option}
                        </button>
                      )
                    })}
                  </div>
                )}

                {question.nuancePrompt && hasAnswer && (
                  <div className="ml-0 mt-5 rounded-2xl border border-line/80 bg-ivory/55 p-4 sm:ml-12">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-forest">
                        {question.nuancePrompt}
                      </p>
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
                        Opcional
                      </span>
                    </div>
                    <textarea
                      value={typeof nuance === 'string' ? nuance : ''}
                      onChange={(event) =>
                        onAnswer(nuanceId, event.target.value)
                      }
                      rows={2}
                      placeholder="No hace falta explicarlo todo. Una frase concreta es suficiente."
                      className="w-full resize-none border-0 border-b border-moss/25 bg-transparent px-0 py-2 text-sm leading-6 text-ink outline-none transition placeholder:text-muted/55 focus:border-forest"
                    />
                  </div>
                )}
              </article>

              {pause && (
                <aside className="mx-auto max-w-3xl px-4 py-5 text-center sm:py-9">
                  <span className="mx-auto block h-8 w-px bg-clay/35" />
                  <p className="mt-5 text-balance font-serif text-2xl italic leading-9 text-forest/82 sm:text-3xl sm:leading-10">
                    “{pause}”
                  </p>
                </aside>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
