import { MatchCard } from '../components/MatchCard'
import { candidates, mainUser } from '../data/mockUsers'
import type { CandidateProfile } from '../types'
import { calculateCompatibility } from '../utils/compatibility'

interface MatchesPageProps {
  onSelectCandidate: (candidate: CandidateProfile) => void
}

export function MatchesPage({ onSelectCandidate }: MatchesPageProps) {
  const matches = candidates
    .map((candidate) => ({
      candidate,
      report: calculateCompatibility(mainUser, candidate),
    }))
    .sort((a, b) => b.report.totalScore - a.report.totalScore)

  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 pt-10 sm:px-8 lg:px-10">
      <header className="max-w-3xl animate-reveal">
        <p className="eyebrow">Tres posibilidades para mirar con atención</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-forest sm:text-6xl">
          No necesitas ver cientos de personas.
          <span className="block italic text-clay">
            Necesitas mirar bien a las adecuadas.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
          Estas propuestas parten de tu mapa relacional. El porcentaje no
          promete un resultado: señala dónde hay base y dónde conviene
          conversar antes de avanzar.
        </p>
      </header>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {matches.map(({ candidate, report }) => (
          <MatchCard
            key={candidate.id}
            candidate={candidate}
            report={report}
            onView={onSelectCandidate}
          />
        ))}
      </div>

      <div className="mt-10 flex items-start gap-3 rounded-2xl border border-line bg-white/30 p-5 text-sm leading-6 text-muted">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-moss text-xs text-moss">
          i
        </span>
        <p>
          La compatibilidad no sustituye el encuentro. Sirve para llegar a él
          con mejores preguntas y menos proyecciones.
        </p>
      </div>
    </div>
  )
}
