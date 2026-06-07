import type { StageAtmosphereName } from '../types'

interface StageProgressProps {
  dimension: number
  totalDimensions: number
  label: string
  substep: number
  totalSubsteps: number
  globalProgress: number
  atmosphere: StageAtmosphereName
}

const accentColors: Record<StageAtmosphereName, string> = {
  clear: '#5589b7',
  earth: '#4f82ad',
  structure: '#397da4',
  depth: '#607cad',
  warm: '#727fc0',
  honest: '#3f88aa',
  delicate: '#7788c5',
  silent: '#6d829b',
  poetic: '#7d78bc',
  mature: '#397f9f',
  night: '#b8d5ff',
  summary: '#4f84b3',
}

export function StageProgress({
  dimension,
  totalDimensions,
  label,
  substep,
  totalSubsteps,
  globalProgress,
  atmosphere,
}: StageProgressProps) {
  const dimensionProgress = (substep / totalSubsteps) * 100
  const accent = accentColors[atmosphere]
  const dark = atmosphere === 'night'

  return (
    <div className="mb-3 shrink-0 sm:mb-4">
      <div className="flex items-end justify-between gap-5">
        <div className="min-w-0">
          <p
            className={`text-[0.62rem] font-semibold uppercase tracking-[0.17em] ${
              dark ? 'text-white/55' : 'text-muted'
            }`}
          >
            Dimensión {dimension} de {totalDimensions}
          </p>
          <h1
            className="mt-0.5 truncate font-serif text-2xl leading-tight sm:text-3xl"
            style={{ color: accent }}
          >
            {label}
          </h1>
          <p
            className={`mt-0.5 text-[0.68rem] ${
              dark ? 'text-white/48' : 'text-muted'
            }`}
          >
            {totalSubsteps === 1
              ? 'Lectura final'
              : `Paso ${substep} de ${totalSubsteps}`}
          </p>
        </div>
        <span
          className="shrink-0 font-serif text-lg italic sm:text-xl"
          style={{ color: accent }}
        >
          {Math.round(globalProgress)}%
        </span>
      </div>

      <div
        className={`mt-2.5 h-px overflow-hidden ${
          dark ? 'bg-white/12' : 'bg-forest/10'
        }`}
      >
        <div
          className="h-full transition-[width,background-color] duration-500 ease-out"
          style={{ width: `${globalProgress}%`, backgroundColor: accent }}
        />
      </div>
      {totalSubsteps > 1 && (
        <div
          className={`mt-1.5 h-0.5 overflow-hidden rounded-full ${
            dark ? 'bg-white/8' : 'bg-forest/6'
          }`}
        >
          <div
            className="h-full rounded-full opacity-45 transition-[width,background-color] duration-500 ease-out"
            style={{ width: `${dimensionProgress}%`, backgroundColor: accent }}
          />
        </div>
      )}
    </div>
  )
}
