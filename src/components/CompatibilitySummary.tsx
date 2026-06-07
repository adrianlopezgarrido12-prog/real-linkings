import type { CandidateProfile, CompatibilityReport } from '../types'
import { Card } from './Card'

interface CompatibilitySummaryProps {
  candidate: CandidateProfile
  report: CompatibilityReport
}

export function CompatibilitySummary({
  candidate,
  report,
}: CompatibilitySummaryProps) {
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (report.totalScore / 100) * circumference

  return (
    <Card
      tone="forest"
      className="grain overflow-hidden p-7 sm:p-9 lg:grid lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10"
    >
      <div className="relative mx-auto size-36 lg:mx-0">
        <svg viewBox="0 0 120 120" className="-rotate-90">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="5"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#d8e4da"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-4xl">{report.totalScore}%</span>
          <span className="text-[0.62rem] uppercase tracking-[0.16em] text-paper/60">
            orientación
          </span>
        </div>
      </div>

      <div className="mt-6 text-center lg:mt-0 lg:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
          Lectura compartida con {candidate.name}
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          Una posibilidad que merece tiempo antes de convertirse en respuesta.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-paper/72">
          {report.explanation}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
          <span className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-paper/80">
            Cuidado {report.relationalRisk.toLowerCase()}
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-paper/80">
            Horizonte {report.longTermPotential.toLowerCase()}
          </span>
        </div>
      </div>
    </Card>
  )
}
