import type { CandidateProfile, CompatibilityReport } from '../types'
import { Button } from './Button'
import { Card } from './Card'

interface MatchCardProps {
  candidate: CandidateProfile
  report: CompatibilityReport
  onView: (candidate: CandidateProfile) => void
}

const accentClasses = {
  sage: 'bg-[#dce6dd] text-forest',
  clay: 'bg-[#edd9d0] text-[#754231]',
  ink: 'bg-[#dfe0dd] text-ink',
}

export function MatchCard({ candidate, report, onView }: MatchCardProps) {
  return (
    <Card className="flex h-full flex-col p-5 sm:p-6">
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
            compatibilidad
          </p>
        </div>
      </div>

      <div className="my-5 h-px bg-line/80" />
      <p className="text-xs font-semibold uppercase tracking-wider text-moss">
        Intención relacional
      </p>
      <p className="mt-2 text-sm leading-6 text-ink">{candidate.intention}</p>
      <p className="mt-3 text-sm leading-6 text-muted">{candidate.bio}</p>

      <div className="mt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-moss">
          Lo que podría sostener el vínculo
        </p>
        <ul className="space-y-2">
          {report.strengths.map((strength) => (
            <li
              key={strength.title}
              className="flex gap-2 text-sm leading-5 text-ink"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-moss" />
              {strength.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl bg-ivory/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-clay">
          Zona a conversar
        </p>
        <p className="mt-2 text-sm leading-5 text-muted">
          {report.risks[0].title}
        </p>
      </div>

      <Button
        variant="secondary"
        fullWidth
        className="mt-6"
        onClick={() => onView(candidate)}
      >
        Ver vínculo posible
        <span aria-hidden="true">→</span>
      </Button>
    </Card>
  )
}
