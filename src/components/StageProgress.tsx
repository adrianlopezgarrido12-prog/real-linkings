interface StageProgressProps {
  stages: { id: string; label: string }[]
  current: number
}

export function StageProgress({ stages, current }: StageProgressProps) {
  const progress = ((current + 1) / stages.length) * 100

  return (
    <div className="mb-7 sm:mb-10">
      <div className="flex items-end justify-between gap-5">
        <div>
          <p className="eyebrow">Tu recorrido</p>
          <p className="mt-2 font-serif text-xl text-forest sm:text-2xl">
            {stages[current].label}
          </p>
        </div>
        <p className="shrink-0 text-xs font-medium tracking-[0.12em] text-muted">
          {String(current + 1).padStart(2, '0')}
          <span className="mx-2 text-line">/</span>
          {String(stages.length).padStart(2, '0')}
        </p>
      </div>

      <div className="mt-5 h-px overflow-hidden bg-forest/10">
        <div
          className="h-full bg-clay transition-[width] duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[0.65rem] text-muted/70">
        <span>Lo visible</span>
        <span>Tu mapa completo</span>
      </div>
    </div>
  )
}
