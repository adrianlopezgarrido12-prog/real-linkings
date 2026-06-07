import type {
  AnswerValue,
  Question,
  QuestionCategory,
} from '../types'

interface QuestionStepProps {
  category: QuestionCategory
  title: string
  reflection: string
  description: string
  questions: Question[]
  answers: Record<string, AnswerValue>
  onAnswer: (questionId: string, value: AnswerValue) => void
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
  title,
  reflection,
  description,
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
    <section key={category} className="animate-reveal">
      <div className="mb-14 max-w-3xl">
        <p className="eyebrow mb-4">Una conversación contigo</p>
        <h1 className="max-w-2xl font-serif text-4xl leading-tight text-forest sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-xl italic leading-8 text-clay">
          {reflection}
        </p>
        <div className="mt-7 max-w-2xl border-l border-moss/35 pl-5">
          <p className="text-sm leading-7 text-muted">{description}</p>
          <p className="mt-3 text-xs leading-5 text-moss">
            Tómate un momento. No buscamos una respuesta perfecta, sino una
            respuesta que puedas reconocer como tuya.
          </p>
        </div>
      </div>

      <div className="space-y-12">
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

          return (
            <div
              key={question.id}
              className="border-b border-line/80 pb-10 last:border-0"
            >
              <div className="mb-5 flex gap-4">
                <span className="pt-1 text-xs font-semibold text-moss">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="max-w-2xl text-lg font-medium leading-7 text-ink sm:text-xl">
                    {question.prompt}
                  </h2>
                  {question.helper && (
                    <p className="mt-2 text-sm text-muted">{question.helper}</p>
                  )}
                </div>
              </div>

              {(question.type === 'text' || question.type === 'sentence') && (
                <div className="ml-0 sm:ml-8">
                  {question.type === 'sentence' && (
                    <p className="mb-3 font-serif text-lg italic leading-7 text-forest">
                      {question.sentenceStart}
                    </p>
                  )}
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
                  {vagueOpenAnswer && (
                    <p className="mt-2 text-xs leading-5 text-clay">
                      Esta respuesta necesita una segunda capa. ¿De qué depende?
                      ¿Qué suele ocurrir en ti cuando cambia el contexto?
                    </p>
                  )}
                </div>
              )}

              {question.type === 'scale' && (
                <div className="ml-0 sm:ml-8">
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => onAnswer(question.id, value)}
                        className={`min-h-12 rounded-xl border text-sm font-medium transition ${
                          answer === value
                            ? 'border-forest bg-forest text-paper'
                            : 'border-line bg-white/50 text-muted hover:border-moss hover:text-forest'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[0.68rem] text-muted">
                    <span>{question.scaleLabels?.[0]}</span>
                    <span>{question.scaleLabels?.[1]}</span>
                  </div>
                </div>
              )}

              {(question.type === 'single' ||
                question.type === 'multiple') && (
                <div className="ml-0 grid gap-2 sm:ml-8 sm:grid-cols-2">
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
                        className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm leading-5 transition ${
                          selected
                            ? 'border-forest bg-[#e7ece7] text-forest'
                            : 'border-line bg-white/45 text-ink hover:border-moss'
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
                <div className="ml-0 mt-5 rounded-2xl border border-line/80 bg-ivory/55 p-4 sm:ml-8">
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
            </div>
          )
        })}
      </div>
    </section>
  )
}
