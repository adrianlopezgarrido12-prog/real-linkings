import { ProgressBar } from './ProgressBar'

interface StageProgressProps {
  stages: { id: string; label: string }[]
  current: number
  onSelect: (index: number) => void
}

export function StageProgress({
  stages,
  current,
  onSelect,
}: StageProgressProps) {
  const progress = ((current + 1) / stages.length) * 100

  return (
    <div>
      <div className="mb-8 lg:hidden">
        <ProgressBar
          value={progress}
          label={`Sala ${current + 1} de ${stages.length}`}
        />
        <p className="mt-3 text-sm font-medium text-forest">
          {stages[current].label}
        </p>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-8">
          <p className="eyebrow mb-5">Las salas de tu mapa</p>
          <ol className="space-y-1">
            {stages.map((stage, index) => (
              <li key={stage.id}>
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs transition ${
                    index === current
                      ? 'bg-paper text-forest shadow-sm'
                      : index < current
                        ? 'text-moss hover:bg-white/35'
                        : 'text-muted hover:bg-white/35'
                  }`}
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-[0.62rem] ${
                      index < current
                        ? 'border-moss bg-moss text-paper'
                        : index === current
                          ? 'border-forest text-forest'
                          : 'border-line text-muted'
                    }`}
                  >
                    {index < current ? '✓' : index + 1}
                  </span>
                  <span className="leading-4">{stage.label}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-7">
            <ProgressBar value={progress} />
            <p className="mt-3 text-xs leading-5 text-muted">
              Cada sala añade una capa distinta. Puedes volver cuando lo
              necesites.
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}
