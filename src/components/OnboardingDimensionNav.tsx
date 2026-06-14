interface DimensionNavigationItem {
  dimension: number
  label: string
  progress?: number
}

interface OnboardingDimensionNavProps {
  items: DimensionNavigationItem[]
  currentDimension: number
  disabled?: boolean
  dark?: boolean
  onNavigate: (dimension: number) => void
}

export function OnboardingDimensionNav({
  items,
  currentDimension,
  disabled = false,
  dark = false,
  onNavigate,
}: OnboardingDimensionNavProps) {
  const currentItem =
    items.find((item) => item.dimension === currentDimension) ?? items[0]

  return (
    <div className="min-h-0 lg:h-full">
      <div
        className={`relative rounded-2xl border px-4 py-3 backdrop-blur-md lg:hidden ${
          dark
            ? 'border-white/12 bg-[#15271c]/72 text-white'
            : 'border-white/70 bg-white/52 text-forest'
        }`}
      >
        <label
          htmlFor="dimension-navigation"
          className={`block text-[0.58rem] font-semibold uppercase tracking-[0.16em] ${
            dark ? 'text-white/50' : 'text-muted'
          }`}
        >
          Ir a una dimensión
        </label>
        <div className="mt-1 flex items-center gap-3">
          <span
            className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[0.62rem] font-semibold ${
              dark ? 'bg-white/12 text-white' : 'bg-forest text-paper'
            }`}
          >
            {String(currentDimension).padStart(2, '0')}
          </span>
          <select
            id="dimension-navigation"
            value={currentDimension}
            disabled={disabled}
            onChange={(event) => onNavigate(Number(event.target.value))}
            className={`min-w-0 flex-1 appearance-none bg-transparent pr-7 font-serif text-base outline-none disabled:cursor-wait ${
              dark ? 'text-white' : 'text-forest'
            }`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='m1 1 5 5 5-5' fill='none' stroke='%235c7a69' stroke-width='1.5'/%3E%3C/svg%3E\")",
              backgroundPosition: 'right 0.25rem center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {items.map((item) => (
              <option key={item.dimension} value={item.dimension}>
                {item.dimension}. {item.label}
              </option>
            ))}
          </select>
          {currentItem.progress !== undefined && (
            <span
              className={`shrink-0 text-[0.62rem] ${
                dark ? 'text-white/48' : 'text-muted'
              }`}
            >
              {currentItem.progress}%
            </span>
          )}
        </div>
      </div>

      <aside
        className={`onboarding-dimension-nav hidden h-full min-h-0 flex-col overflow-hidden rounded-[1.6rem] border p-4 shadow-[0_18px_55px_rgba(42,74,58,0.1)] backdrop-blur-xl lg:flex ${
          dark
            ? 'border-white/12 bg-[#15271c]/72 text-white'
            : 'border-white/72 bg-white/48 text-forest'
        }`}
        aria-label="Dimensiones del formulario"
      >
        <header className="shrink-0 px-2 pb-3 pt-1">
          <p
            className={`text-[0.58rem] font-semibold uppercase tracking-[0.17em] ${
              dark ? 'text-white/48' : 'text-muted'
            }`}
          >
            Tu recorrido
          </p>
          <p className="mt-1 font-serif text-lg">Dimensiones</p>
          <p
            className={`mt-1 text-[0.64rem] leading-4 ${
              dark ? 'text-white/42' : 'text-muted'
            }`}
          >
            Puedes completarlas en el orden que prefieras.
          </p>
        </header>

        <nav className="onboarding-dimension-list min-h-0 flex-1 overflow-y-auto pr-1">
          <ol className="space-y-0.5">
            {items.map((item) => {
              const active = item.dimension === currentDimension
              const complete = item.progress === 100

              return (
                <li key={item.dimension}>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => onNavigate(item.dimension)}
                    aria-current={active ? 'step' : undefined}
                    className={`group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition disabled:cursor-wait ${
                      active
                        ? dark
                          ? 'bg-white/12 text-white'
                          : 'bg-forest text-paper shadow-[0_7px_18px_rgba(42,74,58,0.16)]'
                        : dark
                          ? 'text-white/58 hover:bg-white/7 hover:text-white'
                          : 'text-forest/62 hover:bg-white/60 hover:text-forest'
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-[0.56rem] font-semibold ${
                        active
                          ? 'border-white/20 bg-white/12'
                          : complete
                            ? dark
                              ? 'border-[#9bc9aa]/35 bg-[#9bc9aa]/18 text-[#cce8d5]'
                              : 'border-moss/15 bg-moss/12 text-moss'
                            : dark
                              ? 'border-white/12 text-white/45'
                              : 'border-forest/10 text-muted'
                      }`}
                    >
                      {complete ? '✓' : String(item.dimension).padStart(2, '0')}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-[0.7rem] font-medium ${
                          active ? '' : 'group-hover:text-inherit'
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.progress !== undefined && (
                        <span
                          className={`mt-1 block h-px overflow-hidden rounded-full ${
                            active
                              ? 'bg-white/18'
                              : dark
                                ? 'bg-white/8'
                                : 'bg-forest/7'
                          }`}
                        >
                          <span
                            className={`block h-full transition-[width] duration-500 ${
                              active
                                ? 'bg-white/72'
                                : dark
                                  ? 'bg-[#9bc9aa]/65'
                                  : 'bg-moss/55'
                            }`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </span>
                      )}
                    </span>

                    {active && (
                      <span className="text-xs opacity-65" aria-hidden="true">
                        →
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>
      </aside>
    </div>
  )
}
