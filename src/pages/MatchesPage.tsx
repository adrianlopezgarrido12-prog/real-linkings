import { MatchCard } from '../components/MatchCard'
import { Card } from '../components/Card'
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
        <p className="eyebrow">Una selección deliberadamente pequeña</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-forest sm:text-6xl">
          No necesitas recorrer cientos de perfiles.
          <span className="block italic text-clay">
            Necesitas tiempo para mirar a las personas adecuadas.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
          Estas propuestas parten de tu mapa relacional y de distintas maneras
          de acercarse a una relación. Aquí no hay decisiones automáticas:
          solo puntos de partida para observar mejor.
        </p>
      </header>

      <Card tone="sage" className="mt-12 overflow-hidden p-7 sm:p-9">
        <div className="grid gap-7 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div>
            <p className="eyebrow">El ritmo importa</p>
            <p className="mt-3 max-w-xl font-serif text-2xl leading-relaxed text-forest sm:text-3xl">
              Hoy no te mostramos muchas personas. Te mostramos pocas
              posibilidades para mirar con atención.
            </p>
          </div>
          <div className="hidden h-24 w-px bg-forest/15 md:block" />
          <div className="flex gap-3">
            <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-forest/25 text-xs text-forest">
              i
            </span>
            <p className="text-sm leading-7 text-forest/72">
              El porcentaje no decide por ti. Solo señala dónde merece la pena
              conversar, qué podría sostener el encuentro y qué diferencias no
              conviene ignorar.
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
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
          Ninguna lectura sustituye el encuentro. Su propósito es ayudarte a
          llegar con mejores preguntas, menos proyecciones y más atención a lo
          que ocurre de verdad.
        </p>
      </div>
    </div>
  )
}
