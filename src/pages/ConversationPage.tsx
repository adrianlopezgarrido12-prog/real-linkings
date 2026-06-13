import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { mainUser } from '../data/mockUsers'
import type {
  CandidateProfile,
  ConversationMessage,
  ConversationRequest,
  ConversationStatus,
} from '../types'
import { calculateCompatibility } from '../utils/compatibility'

interface ConversationPageProps {
  candidate: CandidateProfile
  status: ConversationStatus
  request: ConversationRequest | null
  messages: ConversationMessage[]
  onSubmitRequest: (request: ConversationRequest) => void
  onSimulateAcceptance: () => void
  onSendMessage: (message: string) => void
  onPause: () => void
  onResume: () => void
  onClose: () => void
  onWithdraw: () => void
  onBack: () => void
  onDashboard: () => void
}

const openingIntentions = [
  {
    title: 'Conocernos sin prisa',
    description:
      'Abrir una conversación sencilla, sin convertir la afinidad en una expectativa.',
  },
  {
    title: 'Hablar de cómo entendemos una relación',
    description:
      'Explorar proyecto, presencia y compromiso antes de imaginar demasiado.',
  },
  {
    title: 'Comprender una diferencia importante',
    description:
      'Acercarse con curiosidad a una zona que el informe invita a conversar.',
  },
]

const agreements = [
  'No responder también es una respuesta y no insistiré.',
  'No compartiré datos íntimos, médicos o de contacto antes de sentir confianza.',
  'Puedo pausar o cerrar el encuentro si deja de sentirse cuidado.',
]

function formatTime(value: string) {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function ConversationPage({
  candidate,
  status,
  request,
  messages,
  onSubmitRequest,
  onSimulateAcceptance,
  onSendMessage,
  onPause,
  onResume,
  onClose,
  onWithdraw,
  onBack,
  onDashboard,
}: ConversationPageProps) {
  const report = useMemo(
    () => calculateCompatibility(mainUser, candidate),
    [candidate],
  )
  const [intention, setIntention] = useState(openingIntentions[0].title)
  const [note, setNote] = useState('')
  const [acceptedAgreements, setAcceptedAgreements] = useState<string[]>([])
  const [composer, setComposer] = useState('')
  const [notice, setNotice] = useState('')
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const allAgreementsAccepted =
    acceptedAgreements.length === agreements.length

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }, [messages])

  const toggleAgreement = (agreement: string) => {
    setAcceptedAgreements((current) =>
      current.includes(agreement)
        ? current.filter((item) => item !== agreement)
        : [...current, agreement],
    )
  }

  const submitRequest = () => {
    if (!allAgreementsAccepted) {
      setNotice('Confirma los tres acuerdos antes de enviar la invitación.')
      return
    }

    onSubmitRequest({
      intention,
      message: note.trim(),
      createdAt: new Date().toISOString(),
    })
    setNotice('')
  }

  const sendMessage = () => {
    const message = composer.trim()
    if (!message || status !== 'active') return
    onSendMessage(message)
    setComposer('')
  }

  if (status === 'draft') {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted transition hover:text-forest"
        >
          <span aria-hidden="true">←</span>
          Volver al informe
        </button>

        <header className="mt-8 max-w-4xl">
          <p className="eyebrow">Antes del primer mensaje</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-forest sm:text-6xl">
            Abrir una conversación también es pedir permiso.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted">
            Tu decisión enviará una invitación a {candidate.name}. No abrirá un
            chat automáticamente: la otra persona podrá aceptar, declinar o no
            responder.
          </p>
        </header>

        {notice && (
          <div
            role="alert"
            className="mt-7 rounded-2xl border border-clay/30 bg-clay/8 px-5 py-4 text-sm text-clay"
          >
            {notice}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="p-7 sm:p-9">
            <p className="eyebrow">Tu intención</p>
            <h2 className="mt-3 font-serif text-3xl text-forest">
              ¿Desde dónde quieres acercarte?
            </h2>
            <div className="mt-7 grid gap-3">
              {openingIntentions.map((item) => {
                const selected = intention === item.title
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setIntention(item.title)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      selected
                        ? 'border-forest bg-[#e7f2fc] shadow-soft'
                        : 'border-line bg-white/40 hover:border-moss'
                    }`}
                  >
                    <span className="flex items-start gap-4">
                      <span
                        className={`mt-1 size-4 shrink-0 rounded-full border ${
                          selected
                            ? 'border-forest bg-forest shadow-[inset_0_0_0_3px_#e7f2fc]'
                            : 'border-moss/45'
                        }`}
                      />
                      <span>
                        <strong className="block font-medium text-forest">
                          {item.title}
                        </strong>
                        <span className="mt-2 block text-sm leading-6 text-muted">
                          {item.description}
                        </span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <label className="mt-7 block">
              <span className="text-sm font-medium text-ink">
                Una nota breve para {candidate.name}{' '}
                <span className="font-normal text-muted">(opcional)</span>
              </span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value.slice(0, 320))}
                rows={4}
                placeholder="Por ejemplo: Me ha interesado cómo entiendes la autonomía dentro de una relación. Me gustaría conocerte sin prisa."
                className="mt-3 w-full resize-none rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-muted/55 focus:border-moss focus:bg-white"
              />
              <span className="mt-2 block text-right text-xs text-muted">
                {note.length}/320
              </span>
            </label>
          </Card>

          <div className="space-y-6">
            <Card tone="sage" className="p-7">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-forest font-serif text-sm text-paper">
                  {candidate.initials}
                </span>
                <div>
                  <h2 className="font-serif text-2xl text-forest">
                    {candidate.name}
                  </h2>
                  <p className="text-sm text-muted">
                    {candidate.age} · {candidate.city} · {report.totalScore}%
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-forest/72">
                {candidate.relationshipVision}
              </p>
              <div className="mt-5 rounded-xl border border-forest/10 bg-white/35 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-moss">
                  Zona a cuidar
                </p>
                <p className="mt-2 text-sm leading-6 text-forest">
                  {report.risks[0].title}
                </p>
              </div>
            </Card>

            <Card className="p-7">
              <p className="eyebrow">Acuerdos antes de enviar</p>
              <div className="mt-5 space-y-4">
                {agreements.map((agreement) => (
                  <label
                    key={agreement}
                    className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-muted"
                  >
                    <input
                      type="checkbox"
                      checked={acceptedAgreements.includes(agreement)}
                      onChange={() => toggleAgreement(agreement)}
                      className="mt-1 size-4 accent-[#285680]"
                    />
                    {agreement}
                  </label>
                ))}
              </div>
              <Button fullWidth className="mt-7" onClick={submitRequest}>
                Enviar invitación
                <span aria-hidden="true">→</span>
              </Button>
              <p className="mt-4 text-xs leading-5 text-muted">
                En este prototipo la solicitud y la respuesta son simuladas.
                No se envía información a otra persona.
              </p>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'pending') {
    return (
      <div className="mx-auto flex min-h-[72vh] max-w-5xl items-center px-5 py-12 sm:px-8">
        <Card className="w-full overflow-hidden p-8 text-center sm:p-12">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#e5f1fb] text-2xl text-forest">
            ∿
          </span>
          <p className="eyebrow mt-7">Invitación enviada</p>
          <h1 className="mt-4 font-serif text-5xl text-forest">
            Ahora toca dejar espacio.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted">
            {candidate.name} recibirá tu intención y decidirá si quiere abrir
            la conversación. No necesitas hacer nada más ni enviar otra señal.
          </p>

          {request && (
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-line bg-ivory/65 p-6 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-moss">
                {request.intention}
              </p>
              <p className="mt-3 text-sm leading-7 text-ink">
                {request.message ||
                  'Has enviado la invitación sin añadir una nota personal.'}
              </p>
            </div>
          )}

          <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ['01', 'Tú has expresado interés'],
              ['02', `${candidate.name} decide con libertad`],
              ['03', 'Solo entonces se abre el diálogo'],
            ].map(([number, text]) => (
              <div
                key={number}
                className="rounded-2xl border border-line bg-white/45 p-4 text-left"
              >
                <span className="font-serif text-lg text-clay">{number}</span>
                <p className="mt-3 text-xs leading-5 text-muted">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button onClick={onSimulateAcceptance}>
              Simular aceptación de {candidate.name}
            </Button>
            <Button variant="secondary" onClick={onDashboard}>
              Volver a mi espacio
            </Button>
            <Button variant="ghost" onClick={onWithdraw}>
              Retirar invitación
            </Button>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-xs leading-5 text-muted">
            El botón de aceptación solo permite recorrer el prototipo. En el
            producto real, únicamente {candidate.name} podría aceptar.
          </p>
        </Card>
      </div>
    )
  }

  if (status === 'closed') {
    return (
      <div className="mx-auto flex min-h-[72vh] max-w-5xl items-center px-5 py-12 sm:px-8">
        <Card tone="sage" className="w-full p-8 text-center sm:p-12">
          <p className="eyebrow">Conversación cerrada</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-5xl leading-tight text-forest">
            Cerrar con claridad también es una forma de cuidado.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted">
            La conversación con {candidate.name} ha quedado cerrada en este
            prototipo. No significa que el encuentro haya sido un error: puede
            haber servido para reconocer un límite, una necesidad o una forma
            más honesta de elegir.
          </p>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-forest/10 bg-white/40 p-6 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-moss">
              Una pregunta para llevarte
            </p>
            <p className="mt-3 font-serif text-xl leading-8 text-forest">
              ¿Qué has podido observar sobre tu manera de acercarte, esperar,
              expresarte o poner un límite?
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={onDashboard}>Volver a mi espacio</Button>
            <Button variant="secondary" onClick={onBack}>
              Revisar el informe
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:px-10">
      <header className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-forest font-serif text-base text-paper">
            {candidate.initials}
          </span>
          <div>
            <p className="eyebrow">
              {status === 'paused'
                ? 'Conversación en pausa'
                : 'Conversación abierta por ambas personas'}
            </p>
            <h1 className="mt-2 font-serif text-4xl text-forest">
              Tú y {candidate.name}
            </h1>
          </div>
        </div>
        <Button variant="secondary" onClick={onDashboard}>
          Volver a mi espacio
        </Button>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.38fr_0.62fr]">
        <Card className="flex min-h-[660px] flex-col overflow-hidden p-0">
          <div className="border-b border-line bg-[#e9f4fc] px-6 py-4">
            <p className="text-sm leading-6 text-forest">
              Esta conversación empezó con la intención:{' '}
              <strong>{request?.intention ?? 'Conocernos sin prisa'}</strong>
            </p>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-7 sm:px-8">
            {messages.map((message) => {
              if (message.sender === 'system') {
                return (
                  <div
                    key={message.id}
                    className="mx-auto max-w-lg rounded-full bg-ivory px-4 py-2 text-center text-xs text-muted"
                  >
                    {message.body}
                  </div>
                )
              }

              const isUser = message.sender === 'user'
              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-5 py-4 ${
                      isUser
                        ? 'rounded-br-sm bg-forest text-paper'
                        : 'rounded-bl-sm border border-line bg-[#e9f4fc] text-ink'
                    }`}
                  >
                    <p className="text-sm leading-7">{message.body}</p>
                    <div
                      className={`mt-2 flex items-center gap-2 text-[0.65rem] ${
                        isUser ? 'justify-end text-paper/45' : 'text-muted'
                      }`}
                    >
                      {message.simulated && <span>Respuesta simulada</span>}
                      <span>{formatTime(message.sentAt)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {status === 'paused' ? (
            <div className="border-t border-line bg-ivory/70 p-6 text-center">
              <p className="text-sm leading-6 text-muted">
                Has puesto esta conversación en pausa. Nadie tiene que
                responder mientras necesite distancia o claridad.
              </p>
              <Button className="mt-4" onClick={onResume}>
                Retomar conversación
              </Button>
            </div>
          ) : (
            <div className="border-t border-line bg-white/35 p-5 sm:p-6">
              <textarea
                value={composer}
                onChange={(event) =>
                  setComposer(event.target.value.slice(0, 800))
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    sendMessage()
                  }
                }}
                rows={3}
                placeholder="Escribe desde la curiosidad, no desde la necesidad de obtener una respuesta concreta..."
                className="w-full resize-none rounded-2xl border border-line bg-white/80 px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-muted/55 focus:border-moss"
              />
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-xs text-muted">{composer.length}/800</span>
                <Button disabled={!composer.trim()} onClick={sendMessage}>
                  Enviar mensaje
                </Button>
              </div>
            </div>
          )}
        </Card>

        <aside className="space-y-6">
          <Card tone="sage" className="p-6">
            <p className="eyebrow">Preguntas que pueden ayudar</p>
            <h2 className="mt-3 font-serif text-2xl text-forest">
              No hace falta preguntar todo.
            </h2>
            <p className="mt-3 text-xs leading-5 text-muted">
              Elige solo una cuando nazca de verdad en la conversación.
            </p>
            <div className="mt-5 space-y-2">
              {report.suggestedQuestions.slice(0, 4).map((question) => (
                <button
                  key={question}
                  type="button"
                  disabled={status === 'paused'}
                  onClick={() => setComposer(question)}
                  className="w-full rounded-xl border border-forest/10 bg-white/38 p-3 text-left text-xs leading-5 text-forest transition hover:bg-white/65 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {question}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="eyebrow">Cuidar el ritmo</p>
            <ul className="mt-5 space-y-4 text-xs leading-5 text-muted">
              <li>· No conviertas el silencio en una deuda.</li>
              <li>· Evita compartir contacto o datos sensibles demasiado pronto.</li>
              <li>· Observa la coherencia, no solo la intensidad.</li>
              <li>· Puedes salir sin justificar un límite.</li>
            </ul>
            <div className="mt-6 grid gap-2">
              {status === 'active' && (
                <Button variant="secondary" fullWidth onClick={onPause}>
                  Poner en pausa
                </Button>
              )}
              <Button
                variant="ghost"
                fullWidth
                onClick={() => setShowCloseConfirmation(true)}
              >
                Cerrar conversación
              </Button>
              <button
                type="button"
                onClick={() =>
                  setNotice(
                    'Bloqueo y reporte son funciones simuladas. En producción tendrían revisión y trazabilidad.',
                  )
                }
                className="py-2 text-xs font-semibold text-clay transition hover:text-ink"
              >
                Bloquear o reportar
              </button>
            </div>
          </Card>

          {notice && (
            <div className="rounded-2xl border border-clay/25 bg-clay/8 p-4 text-xs leading-5 text-clay">
              {notice}
            </div>
          )}
        </aside>
      </div>

      {showCloseConfirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest/35 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="close-conversation-title"
        >
          <Card className="w-full max-w-lg p-7 sm:p-9">
            <p className="eyebrow">Cerrar con claridad</p>
            <h2
              id="close-conversation-title"
              className="mt-3 font-serif text-3xl text-forest"
            >
              ¿Quieres cerrar esta conversación?
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              En el producto real, {candidate.name} recibiría un aviso sencillo
              de que la conversación ha terminado. No tendría acceso a tus
              notas privadas ni a una valoración.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button onClick={onClose}>Sí, cerrar con respeto</Button>
              <Button
                variant="secondary"
                onClick={() => setShowCloseConfirmation(false)}
              >
                Volver
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
