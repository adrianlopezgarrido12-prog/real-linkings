import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CompatibilitySummary } from '../components/CompatibilitySummary'
import { ScoreBar } from '../components/ScoreBar'
import type { CandidateProfile } from '../types'
import { mainUser } from '../data/mockUsers'
import { calculateCompatibility } from '../utils/compatibility'

interface CompatibilityReportPageProps {
  candidate: CandidateProfile
  onBack: () => void
}

export function CompatibilityReportPage({
  candidate,
  onBack,
}: CompatibilityReportPageProps) {
  const report = calculateCompatibility(mainUser, candidate)

  return (
    <div className="mx-auto max-w-6xl px-5 pb-10 pt-8 sm:px-8 lg:px-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-muted transition hover:text-forest"
      >
        <span aria-hidden="true">←</span>
        Volver a compatibilidades
      </button>

      <CompatibilitySummary candidate={candidate} report={report} />

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
            <p className="eyebrow">Fortalezas del vínculo</p>
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
            <p className="eyebrow !text-clay">Zonas sensibles</p>
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

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <p className="eyebrow">Lectura orientativa</p>
          <h2 className="mt-3 font-serif text-3xl text-forest">
            Riesgo relacional estimado
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
                No mide el valor de ninguna persona. Señala cuánto cuidado
                podrían requerir las diferencias observadas.
              </p>
            </div>
          </div>
        </Card>

        <Card tone="forest" className="p-6 sm:p-8">
          <p className="eyebrow !text-sage">Mirada a largo plazo</p>
          <h2 className="mt-3 font-serif text-3xl">
            Potencial {report.longTermPotential.toLowerCase()}
          </h2>
          <p className="mt-5 text-sm leading-6 text-paper/68">
            {candidate.relationshipVision}
          </p>
        </Card>
      </div>

      <Card className="mt-6 p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow">Antes de avanzar</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">
              Conversaciones que merecen tiempo.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              No son preguntas para evaluar a nadie. Son puertas para conocer
              cómo piensa, siente y repara la otra persona.
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

      <Card tone="sage" className="mt-6 p-7 text-center sm:p-10">
        <p className="eyebrow">Recomendación final</p>
        <p className="mx-auto mt-4 max-w-3xl font-serif text-2xl leading-relaxed text-forest sm:text-3xl">
          {report.recommendation}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button>
            Quiero conocer esta compatibilidad
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
