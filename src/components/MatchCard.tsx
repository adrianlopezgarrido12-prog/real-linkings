import type { CandidateProfile, CompatibilityReport } from '../types'
import { Button } from './Button'
import { Card } from './Card'

interface MatchCardProps {
  candidate: CandidateProfile
  report: CompatibilityReport
  onView: (candidate: CandidateProfile) => void
}

const accentClasses = {
  sage: 'bg-[#dcebf7] text-forest',
  clay: 'bg-[#e2e5fb] text-[#345b84]',
  ink: 'bg-[#e2eaf4] text-ink',
}

export function MatchCard({ candidate, report, onView }: MatchCardProps) {
  return (
    <Card className="flex h-full flex-col p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`flex size-14 shrink-0 items-center justify-center rounded-full font-serif text-lg ${accentClasses[candidate.accent]}`}
          >
            {candidate.initials}
          </div>
          <div>
            <h2 className="font-serif text-2xl text-forest">{candidate.name}</h2>
            <p className="text-sm text-muted">
              {candidate.age} · {candidate.city}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-serif text-3xl text-forest">
            {report.totalScore}
          </span>
          <span className="text-sm text-muted">%</span>
          <p className="text-[0.65rem] uppercase tracking-wider text-muted">
            afinidad orientativa
          </p>
        </div>
      </div>

      <div className="my-5 h-px bg-line/80" />
      <p className="text-sm leading-6 text-muted">{candidate.bio}</p>

      <div className="mt-6 border-t border-line/70 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-moss">
          Forma de vincularse
        </p>
        <p className="mt-2 text-sm leading-6 text-ink">
          {candidate.traits.map((trait, index) => (
            <span key={trait}>
              {index > 0 && ' · '}
              {trait}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-moss">
          Lo que busca construir
        </p>
        <p className="mt-2 text-sm leading-6 text-ink">
          {candidate.relationshipVision}
        </p>
      </div>

      <div className="mt-5 rounded-xl bg-ivory/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-clay">
          Zona que convendría conversar
        </p>
        <p className="mt-2 text-sm leading-5 text-muted">
          {report.risks[0].title}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-moss">
          Por qué aparece aquí
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          {report.strengths[0].description}
        </p>
      </div>

      <Button
        variant="secondary"
        fullWidth
        className="mt-auto pt-3"
        onClick={() => onView(candidate)}
      >
        Leer esta posibilidad
        <span aria-hidden="true">→</span>
      </Button>
    </Card>
  )
}
