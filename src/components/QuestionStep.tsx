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
  pause?: string
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
  pause,
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
    <section key={`${category}-${questions[0]?.id}`}>
      {questions[0]?.intro && (
        <div className="mb-5 border-l border-clay/45 pl-5 sm:mb-7 sm:pl-7">
          <p className="max-w-3xl font-serif text-lg italic leading-7 text-forest/82 sm:text-xl sm:leading-8">
            {questions[0].intro}
          </p>
        </div>
      )}

      <div className="grid gap-4">
        {questions.map((question, index) => {
          const answer = answers[question.id]
          const nuanceId = `${question.id}__nuance`
          const nuance = answers[nuanceId]
          const conditionalAnswerId = question.conditionalAnswerId
          const conditionalAnswer = conditionalAnswerId
            ? answers[conditionalAnswerId]
            : undefined
          const showConditional =
            question.conditionalWhen !== undefined &&
            answer === question.conditionalWhen
          const hasAnswer = Array.isArray(answer)
            ? answer.length > 0
            : answer !== undefined && answer !== ''
          const vagueOpenAnswer =
            (question.type === 'text' || question.type === 'sentence') &&
            needsMoreDetail(answer)
          const shortTextPlaceholder = shortTextQuestions[question.id]
          const isGazeQuestion = question.id === 'intimacy-gaze'

          return (
            <article
              key={question.id}
              className={`rounded-[1.65rem] border border-white/75 shadow-[0_14px_38px_rgba(38,55,47,0.05)] backdrop-blur-sm ${
                isGazeQuestion ? 'p-2.5 sm:p-6' : 'p-4 sm:p-6'
              } ${
                index % 2 === 0 ? 'bg-white/62' : 'bg-ivory/55'
              }`}
            >
              <div
                className={`flex gap-3 ${
                  isGazeQuestion ? 'mb-3 sm:mb-5' : 'mb-4 sm:mb-5'
                }`}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-moss/25 bg-white/45 text-[0.64rem] font-semibold text-moss">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                    <h2
                      className={`max-w-3xl font-medium text-ink ${
                        isGazeQuestion
                          ? 'text-sm leading-5 sm:text-lg sm:leading-7'
                          : 'text-base leading-6 sm:text-lg sm:leading-7'
                      }`}
                    >
                    {question.prompt}
                  </h2>
                  {question.helper && (
                    <p className="mt-1.5 text-xs leading-5 text-muted sm:text-sm">
                      {question.helper}
                    </p>
                  )}
                </div>
              </div>

              {(question.type === 'text' || question.type === 'sentence') && (
                <div className="sm:ml-10">
                  {question.type === 'sentence' && (
                    <p className="mb-3 font-serif text-lg italic leading-7 text-forest sm:text-xl">
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
                      className="min-h-11 w-full border-0 border-b border-moss/30 bg-transparent px-1 text-base text-ink outline-none transition placeholder:text-muted/45 focus:border-forest sm:max-w-xl"
                    />
                  ) : (
                    <textarea
                      value={typeof answer === 'string' ? answer : ''}
                      onChange={(event) =>
                        onAnswer(question.id, event.target.value)
                      }
                      rows={2}
                      placeholder={
                        question.placeholder
                          ? question.placeholder
                          : question.type === 'sentence'
                          ? 'Continúa la frase...'
                          : 'Escribe con tus propias palabras...'
                      }
                      className={`w-full resize-none rounded-xl border bg-white/58 px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-muted/60 focus:bg-white ${
                        vagueOpenAnswer
                          ? 'border-clay/65 focus:border-clay'
                          : 'border-line focus:border-moss'
                      }`}
                    />
                  )}
                  {vagueOpenAnswer && (
                    <p className="mt-2 text-xs leading-5 text-clay">
                      Esta respuesta necesita una segunda capa. ¿De qué depende
                      y qué suele ocurrir en ti?
                    </p>
                  )}
                </div>
              )}

              {question.type === 'scale' && (
                <div className="sm:ml-10">
                  <div className="relative grid grid-cols-5 gap-1.5">
                    <div className="absolute left-[8%] right-[8%] top-1/2 -z-10 h-px bg-moss/20" />
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => onAnswer(question.id, value)}
                        className={`mx-auto flex size-10 items-center justify-center rounded-full border text-xs font-medium shadow-sm transition sm:size-12 ${
                          answer === value
                            ? 'scale-105 border-forest bg-forest text-paper'
                            : 'border-line bg-paper text-muted hover:border-moss hover:text-forest'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[0.64rem] text-muted">
                    <span>{question.scaleLabels?.[0]}</span>
                    <span>{question.scaleLabels?.[1]}</span>
                  </div>
                </div>
              )}

              {(question.type === 'single' ||
                question.type === 'multiple') &&
                !showConditional && (
                <div
                  className={`grid sm:ml-10 sm:grid-cols-2 ${
                    isGazeQuestion
                      ? 'grid-cols-2 gap-1.5'
                      : 'gap-2'
                  }`}
                >
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
                        className={`flex items-center rounded-xl border text-left transition ${
                          isGazeQuestion
                            ? 'min-h-9 gap-1.5 px-2 py-1.5 text-[0.6rem] leading-[0.85rem] sm:min-h-11 sm:gap-2.5 sm:px-3.5 sm:py-2.5 sm:text-sm sm:leading-5'
                            : 'min-h-11 gap-2.5 px-3.5 py-2.5 text-xs leading-5 sm:text-sm'
                        } ${
                          selected
                            ? 'border-forest bg-[#e2eae3] text-forest shadow-sm'
                            : 'border-line/90 bg-white/55 text-ink hover:border-moss hover:bg-white/80'
                        }`}
                      >
                        <span
                          className={`flex size-4.5 shrink-0 items-center justify-center border ${
                            question.type === 'multiple'
                              ? 'rounded'
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

              {showConditional &&
                question.conditionalPrompt &&
                question.conditionalOptions &&
                conditionalAnswerId && (
                  <div className="mt-2.5 rounded-xl border border-clay/25 bg-[#f5e8df]/72 p-2.5 sm:ml-10 sm:mt-4 sm:p-4">
                    <div className="mb-2 flex items-center justify-between gap-3 sm:mb-3">
                      <div>
                        <p className="text-xs font-medium text-forest sm:text-sm">
                          {question.conditionalPrompt}
                        </p>
                        <p className="mt-0.5 text-[0.6rem] text-muted">
                          Has elegido concretar de qué depende.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onAnswer(question.id, '')
                          onAnswer(conditionalAnswerId, '')
                        }}
                        className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-clay"
                      >
                        Cambiar
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      {question.conditionalOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            onAnswer(conditionalAnswerId, option)
                          }
                          className={`rounded-lg border px-2 py-1.5 text-left text-[0.62rem] leading-4 transition sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs sm:leading-5 ${
                            conditionalAnswer === option
                              ? 'border-forest bg-forest text-paper'
                              : 'border-line bg-white/65 text-ink hover:border-moss'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {question.nuancePrompt && hasAnswer && (
                <div className="mt-2.5 rounded-xl border border-line/80 bg-ivory/58 p-2.5 sm:ml-10 sm:mt-4 sm:p-3.5">
                  <div className="mb-1 flex items-center justify-between gap-3 sm:mb-2">
                    <p className="text-xs font-medium leading-5 text-forest">
                      {question.nuancePrompt}
                    </p>
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted">
                      Opcional
                    </span>
                  </div>
                  <textarea
                    value={typeof nuance === 'string' ? nuance : ''}
                    onChange={(event) =>
                      onAnswer(nuanceId, event.target.value)
                    }
                    rows={1}
                    placeholder={
                      question.nuancePlaceholder ??
                      'Una frase concreta es suficiente.'
                    }
                    className="w-full resize-none border-0 border-b border-moss/25 bg-transparent px-0 py-1 text-[0.68rem] leading-4 text-ink outline-none transition placeholder:text-muted/55 focus:border-forest sm:py-1.5 sm:text-xs sm:leading-5"
                  />
                </div>
              )}
            </article>
          )
        })}
      </div>

      {pause && (
        <p className="mx-auto mt-5 max-w-3xl text-balance text-center font-serif text-lg italic leading-7 text-forest/76 sm:text-xl">
          “{pause}”
        </p>
      )}
    </section>
  )
}
