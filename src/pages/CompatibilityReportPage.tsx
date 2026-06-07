import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CompatibilitySummary } from '../components/CompatibilitySummary'
import { ScoreBar } from '../components/ScoreBar'
import type { CandidateProfile, SymbolicProfile } from '../types'
import { mainUser } from '../data/mockUsers'
import { hasSymbolicData } from '../data/symbolic'
import { calculateCompatibility } from '../utils/compatibility'

interface CompatibilityReportPageProps {
  candidate: CandidateProfile
  symbolicProfile: SymbolicProfile
  onBack: () => void
}

export function CompatibilityReportPage({
  candidate,
  symbolicProfile,
  onBack,
}: CompatibilityReportPageProps) {
  const report = calculateCompatibility(mainUser, candidate)
  const userHasSymbolic = hasSymbolicData(symbolicProfile)
  const candidateHasSymbolic = hasSymbolicData(candidate.symbolicProfile)
  const showSymbolicResonances = userHasSymbolic || candidateHasSymbolic
  const symbolicSummary =
    userHasSymbolic && candidateHasSymbolic
      ? `Tanto tú como ${candidate.name} habéis añadido esta dimensión. Esto puede indicar un interés compartido por lenguajes simbólicos, aunque no implica que los interpretéis de la misma manera.`
      : userHasSymbolic
        ? `Tú has completado esta capa y ${candidate.name} no. Esto no indica falta de afinidad; simplemente puede mostrar formas distintas de acercarse al autoconocimiento.`
        : `${candidate.name} ha completado esta capa y tú has preferido omitirla. Esto no indica falta de afinidad; simplemente puede mostrar formas distintas de acercarse al autoconocimiento.`

  return (
    <div className="mx-auto max-w-6xl px-5 pb-10 pt-8 sm:px-8 lg:px-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-muted transition hover:text-forest"
      >
        <span aria-hidden="true">←</span>
        Volver a posibilidades
      </button>

      <CompatibilitySummary candidate={candidate} report={report} />

      <Card className="mt-6 p-7 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr]">
          <div>
            <p className="eyebrow">Lectura del encuentro</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-4xl">
              Lo que podría unirles y lo que pediría más cuidado.
            </h2>
          </div>
          <div className="space-y-5">
            {report.depthReading.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-7 text-muted first:text-base first:text-ink"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-6 sm:p-8">
          <div className="mb-4">
            <p className="eyebrow">Afinidad por áreas</p>
            <h2 className="mt-3 font-serif text-3xl text-forest">
              Ocho dimensiones del vínculo
            </h2>
          </div>
          {report.categoryScores.map((item) => (
            <ScoreBar
              key={item.category}
              label={item.label}
              score={item.score}
              note={item.note}
            />
          ))}
        </Card>

        <div className="space-y-6">
          <Card tone="sage" className="p-6 sm:p-8">
            <p className="eyebrow">Lo que podría sostenerles</p>
            <div className="mt-6 space-y-6">
              {report.strengths.map((strength, index) => (
                <div key={strength.title} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest text-xs text-paper">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-forest">{strength.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-forest/70">
                      {strength.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 sm:p-8">
            <p className="eyebrow !text-clay">
              Diferencias que merecen atención
            </p>
            <div className="mt-6 space-y-5">
              {report.risks.map((risk) => (
                <div
                  key={risk.title}
                  className="border-l-2 border-clay/50 pl-4"
                >
                  <h3 className="font-medium text-ink">{risk.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {risk.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card tone="forest" className="mt-6 overflow-hidden p-7 sm:p-10">
        <div className="max-w-3xl">
          <p className="eyebrow !text-sage">Dinámica probable</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            Si esta relación avanzara, no todo aparecería al mismo tiempo.
          </h2>
          <p className="mt-5 text-sm leading-7 text-paper/65">
            {report.relationalDynamic}
          </p>
        </div>
        <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
          <div className="bg-forest p-6 sm:p-8">
            <span className="font-serif text-xl italic text-sage">01</span>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.13em] text-paper/85">
              La conexión podría aparecer cuando...
            </h3>
            <p className="mt-4 text-sm leading-7 text-paper/62">
              {report.likelyConnection}
            </p>
          </div>
          <div className="bg-forest p-6 sm:p-8">
            <span className="font-serif text-xl italic text-clay">02</span>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.13em] text-paper/85">
              La tensión podría aparecer cuando...
            </h3>
            <p className="mt-4 text-sm leading-7 text-paper/62">
              {report.likelyTension}
            </p>
          </div>
        </div>
      </Card>

      <Card
        tone="transparent"
        className="relative mt-6 overflow-hidden p-7 sm:p-10"
      >
        <div className="absolute -bottom-20 -right-16 size-56 rounded-full border border-moss/10" />
        <div className="relative grid gap-8 lg:grid-cols-[0.58fr_1.42fr]">
          <div>
            <p className="eyebrow">Lo que este encuentro podría enseñaros</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-4xl">
              Encajar no basta. También importa cómo aprendéis a elegiros.
            </h2>
          </div>
          <div className="border-l border-moss/25 pl-6 sm:pl-8">
            <p className="font-serif text-xl leading-8 text-forest sm:text-2xl sm:leading-9">
              {report.relationshipLesson}
            </p>
            <p className="mt-5 text-sm leading-7 text-muted">
              Una relación no se sostiene porque dos personas coincidan en
              todo, sino porque pueden cuidar lo que aparece entre ellas sin
              poseerse ni dejar de escucharse.
            </p>
          </div>
        </div>
      </Card>

      {showSymbolicResonances && (
        <Card className="mt-6 overflow-hidden p-7 sm:p-9">
          <div className="grid gap-7 lg:grid-cols-[0.5fr_1.5fr]">
            <div>
              <p className="eyebrow">Resonancias simbólicas</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">
                Un lenguaje secundario para conversar.
              </h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-muted">
                Esta sección no funciona como veredicto. Solo recoge
                coincidencias, contrastes o lenguajes simbólicos que podrían
                enriquecer una conversación.
              </p>
              <div className="mt-5 rounded-2xl border border-line bg-ivory/65 p-5">
                <p className="text-sm leading-7 text-ink">{symbolicSummary}</p>
                {candidateHasSymbolic &&
                  candidate.symbolicProfile?.mbtiType &&
                  symbolicProfile.mbtiType && (
                    <p className="mt-3 text-xs leading-6 text-muted">
                      Referencia MBTI aportada: tú{' '}
                      <strong>{symbolicProfile.mbtiType}</strong> ·{' '}
                      {candidate.name}{' '}
                      <strong>{candidate.symbolicProfile.mbtiType}</strong>.
                      Puede servir para abrir preguntas, no para cerrar
                      conclusiones.
                    </p>
                  )}
              </div>
              <p className="mt-4 text-xs leading-5 text-muted">
                Esta información no ha intervenido en el porcentaje ni en las
                categorías principales del informe.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <p className="eyebrow">Nivel de cuidado estimado</p>
          <h2 className="mt-3 font-serif text-3xl text-forest">
            Diferencias que pedirían atención
          </h2>
          <div className="mt-6 flex items-center gap-5">
            <div
              className={`size-3 rounded-full ${
                report.relationalRisk === 'Bajo'
                  ? 'bg-moss'
                  : report.relationalRisk === 'Moderado'
                    ? 'bg-clay'
                    : 'bg-ink'
              }`}
            />
            <div>
              <p className="text-lg font-medium text-ink">
                {report.relationalRisk}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                No mide el valor de nadie ni anticipa un resultado. Solo indica
                cuánto diálogo podrían requerir las diferencias observadas.
              </p>
            </div>
          </div>
        </Card>

        <Card tone="forest" className="p-6 sm:p-8">
          <p className="eyebrow !text-sage">Posibilidad a largo plazo</p>
          <h2 className="mt-3 font-serif text-3xl">
            Una construcción {report.longTermPotential.toLowerCase()}
          </h2>
          <p className="mt-5 text-sm leading-6 text-paper/68">
            {candidate.relationshipVision}
          </p>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <Card className="p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow">Una primera conversación honesta</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">
                Preguntas para escuchar, no para evaluar.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                No hace falta formularlas como una entrevista. Son invitaciones
                para descubrir cómo piensa, siente, elige y repara la otra
                persona.
              </p>
            </div>
            <ol className="divide-y divide-line/80">
              {report.suggestedQuestions.map((question, index) => (
                <li key={question} className="flex gap-4 py-4 first:pt-0">
                  <span className="font-serif text-lg italic text-clay">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-6 text-ink">{question}</p>
                </li>
              ))}
            </ol>
          </div>
        </Card>

        <Card tone="sage" className="p-6 sm:p-8">
          <p className="eyebrow">Señales a observar</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">
            Lo importante también ocurre entre las respuestas.
          </h2>
          <ul className="mt-6 space-y-5">
            {report.observeSignals.map((signal, index) => (
              <li key={signal} className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-forest/20 text-[0.65rem] text-forest">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-forest/72">{signal}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card tone="sage" className="mt-6 p-7 text-center sm:p-10">
        <p className="eyebrow">Una orientación, no un veredicto</p>
        <p className="mx-auto mt-4 max-w-3xl font-serif text-2xl leading-relaxed text-forest sm:text-3xl">
          {report.recommendation}
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-forest/68">
          Ninguna lectura puede saber si una relación va a nacer. Sí puede
          ayudarnos a reconocer si merece una conversación lenta, honesta y
          bien cuidada.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button>
            Quiero abrir esta conversación
            <span aria-hidden="true">→</span>
          </Button>
          <Button variant="secondary" onClick={onBack}>
            Seguir reflexionando
          </Button>
        </div>
      </Card>
    </div>
  )
}
