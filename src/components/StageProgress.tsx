interface StageProgressProps {
  dimension: number
  totalDimensions: number
  label: string
  substep: number
  totalSubsteps: number
  globalProgress: number
}

export function StageProgress({
  dimension,
  totalDimensions,
  label,
  substep,
  totalSubsteps,
  globalProgress,
}: StageProgressProps) {
  const dimensionProgress = (substep / totalSubsteps) * 100

  return (
    <div className="mb-4 shrink-0 sm:mb-5">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow truncate">
            {dimension}/{totalDimensions} · {label}
          </p>
          <p className="mt-1.5 text-xs text-muted">
            {totalSubsteps === 1
              ? 'Lectura final'
              : `Paso ${substep} de ${totalSubsteps}`}
          </p>
        </div>
        <span className="shrink-0 font-serif text-lg italic text-clay">
          {Math.round(globalProgress)}%
        </span>
      </div>

      <div className="mt-3 h-px overflow-hidden bg-forest/10">
        <div
          className="h-full bg-clay transition-[width] duration-500 ease-out"
          style={{ width: `${globalProgress}%` }}
        />
      </div>
      {totalSubsteps > 1 && (
        <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-forest/6">
          <div
            className="h-full rounded-full bg-moss/50 transition-[width] duration-500 ease-out"
            style={{ width: `${dimensionProgress}%` }}
          />
        </div>
      )}
    </div>
  )
}
