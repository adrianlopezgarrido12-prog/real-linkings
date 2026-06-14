import type { StageAtmosphereName } from '../types'

interface MapNode {
  dimension: number
  shortLabel: string
  description: string
  atmosphere: StageAtmosphereName
  x: number
  y: number
  labelSide: 'top' | 'bottom'
}

const MAP_NODES: MapNode[] = [
  { dimension: 1, shortLabel: 'Lo visible', description: 'La primera capa desde la que empiezas a situarte.', atmosphere: 'clear', x: 8, y: 70, labelSide: 'top' },
  { dimension: 2, shortLabel: 'Vida práctica', description: 'El lugar cotidiano donde una relación tendría que vivir.', atmosphere: 'earth', x: 22, y: 61, labelSide: 'bottom' },
  { dimension: 3, shortLabel: 'Proyecto vital', description: 'La dirección que quieres poder compartir sin perder la propia.', atmosphere: 'structure', x: 37, y: 69, labelSide: 'top' },
  { dimension: 4, shortLabel: 'Valores', description: 'Los principios que permanecen cuando elegir tiene un coste.', atmosphere: 'depth', x: 51, y: 55, labelSide: 'bottom' },
  { dimension: 5, shortLabel: 'Emocional', description: 'Cómo te acercas y cómo te proteges cuando alguien importa.', atmosphere: 'warm', x: 66, y: 63, labelSide: 'top' },
  { dimension: 6, shortLabel: 'Conflicto', description: 'La manera en que hablas, escuchas y vuelves a encontrarte.', atmosphere: 'honest', x: 82, y: 51, labelSide: 'bottom' },
  { dimension: 7, shortLabel: 'Intimidad', description: 'El ritmo, el lenguaje y los límites de la cercanía.', atmosphere: 'delicate', x: 91, y: 36, labelSide: 'top' },
  { dimension: 8, shortLabel: 'Patrones', description: 'Las respuestas antiguas que todavía aparecen al vincularte.', atmosphere: 'silent', x: 75, y: 28, labelSide: 'top' },
  { dimension: 9, shortLabel: 'Anhelo', description: 'Aquello que esperas poder compartir y todavía cuesta nombrar.', atmosphere: 'poetic', x: 58, y: 34, labelSide: 'top' },
  { dimension: 10, shortLabel: 'Disponibilidad', description: 'El espacio que hoy puedes ofrecer con hechos.', atmosphere: 'mature', x: 41, y: 22, labelSide: 'bottom' },
  { dimension: 11, shortLabel: 'Simbólica', description: 'Una lectura opcional de los lenguajes con los que te interpretas.', atmosphere: 'night', x: 24, y: 31, labelSide: 'top' },
  { dimension: 12, shortLabel: 'Síntesis', description: 'Las capas del recorrido reunidas en tu mapa relacional.', atmosphere: 'summary', x: 10, y: 16, labelSide: 'bottom' },
]

const NODE_COLORS: Record<StageAtmosphereName, string> = {
  clear: '#b8cc94',
  earth: '#8ab080',
  structure: '#7aa878',
  depth: '#6a9870',
  warm: '#c09060',
  honest: '#7aa870',
  delicate: '#c89080',
  silent: '#909878',
  poetic: '#a890b8',
  mature: '#789878',
  night: '#344a3c',
  summary: '#5c8068',
}

function smoothPath(points: Array<{ x: number; y: number }>): string {
  if (points.length < 2) return ''

  const path = [`M ${points[0].x},${points[0].y}`]
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1]
    const current = points[index]
    const beforePrevious = points[index - 2] ?? previous
    const next = points[index + 1] ?? current
    const firstX = previous.x + (current.x - beforePrevious.x) * 0.26
    const firstY = previous.y + (current.y - beforePrevious.y) * 0.26
    const secondX = current.x - (next.x - previous.x) * 0.26
    const secondY = current.y - (next.y - previous.y) * 0.26
    path.push(
      `C ${firstX.toFixed(2)},${firstY.toFixed(2)} ${secondX.toFixed(2)},${secondY.toFixed(2)} ${current.x},${current.y}`,
    )
  }
  return path.join(' ')
}

const FULL_PATH = smoothPath(MAP_NODES)

function pathThrough(completedUpTo: number): string {
  return smoothPath(MAP_NODES.slice(0, completedUpTo))
}

interface DimensionMapViewProps {
  completedUpTo: number
  onContinue: () => void
}

export function DimensionMapView({
  completedUpTo,
  onContinue,
}: DimensionMapViewProps) {
  const isFinished = completedUpTo >= 11
  const nextDimension = isFinished ? 12 : completedUpTo + 1
  const nextNode = MAP_NODES[nextDimension - 1]
  const completedNode = MAP_NODES[completedUpTo - 1]

  const ctaLabel = isFinished
    ? 'Reunir mi mapa'
    : nextDimension === 11
      ? 'Abrir la dimensión simbólica'
      : `Entrar en ${nextNode.shortLabel.toLowerCase()}`

  return (
    <section className="dimension-map-shell flex h-full min-h-[34rem] flex-col justify-center py-2 sm:py-4">
      <header className="relative z-10 mb-4 flex items-end justify-between gap-5 px-1 sm:mb-6">
        <div>
          <p className="eyebrow mb-2">Cartografía del vínculo</p>
          <h2 className="max-w-xl font-serif text-2xl leading-tight text-forest sm:text-4xl">
            {isFinished
              ? 'Las capas empiezan a formar un mapa.'
              : 'Cada respuesta abre una parte del recorrido.'}
          </h2>
        </div>
        <p className="hidden max-w-[14rem] text-right text-xs leading-5 text-muted md:block">
          {completedUpTo} de 11 dimensiones exploradas
        </p>
      </header>

      <div className="dimension-map-card relative min-h-0 flex-1 overflow-hidden rounded-[1.75rem] border border-white/75 bg-[#f7f3eb]/72 shadow-[0_28px_80px_rgba(42,74,58,0.14)] backdrop-blur-xl sm:rounded-[2.25rem]">
        <div className="dimension-map-grid pointer-events-none absolute inset-0 opacity-45" />
        <div className="dimension-map-wash pointer-events-none absolute inset-0" />

        <div className="relative grid h-full min-h-[27rem] lg:grid-cols-[1fr_17rem]">
          <div className="relative min-h-[20rem] overflow-hidden px-3 pb-1 pt-3 sm:px-6 sm:pt-5 lg:min-h-0 lg:px-8">
            <div className="absolute left-7 top-5 font-serif text-[0.58rem] italic tracking-[0.18em] text-forest/35 sm:left-10">
              interior · presencia · vínculo
            </div>
            <div className="absolute bottom-5 right-5 hidden text-[0.52rem] uppercase tracking-[0.2em] text-forest/30 sm:block">
              12 capas / un mapa
            </div>

            <div className="relative h-full min-h-[20rem] w-full">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 82"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <filter id="map-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="1.25" />
                  </filter>
                </defs>

                <path
                  d="M -8 77 C 14 44, 35 88, 58 52 S 90 48, 108 16"
                  fill="none"
                  stroke="rgba(92,122,105,0.08)"
                  strokeWidth="12"
                />
                <path
                  d="M -10 31 C 9 47, 25 1, 43 18 S 77 1, 110 30"
                  fill="none"
                  stroke="rgba(176,104,72,0.07)"
                  strokeWidth="8"
                />

                <path
                  d={FULL_PATH}
                  fill="none"
                  stroke="#c9c2b4"
                  strokeWidth="0.58"
                  strokeDasharray="1.1 1.45"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                {completedUpTo > 1 && (
                  <>
                    <path
                      d={pathThrough(completedUpTo)}
                      className="dimension-path-glow"
                      fill="none"
                      stroke="#789887"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.16"
                      filter="url(#map-soft-glow)"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d={pathThrough(completedUpTo)}
                      className="dimension-path-draw"
                      fill="none"
                      stroke="#5c7a69"
                      strokeWidth="1.15"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </>
                )}
              </svg>

              {MAP_NODES.map((node) => {
                const isCompleted = node.dimension <= completedUpTo
                const isCurrent = node.dimension === completedUpTo
                const isNext = node.dimension === nextDimension
                const isFuture = node.dimension > nextDimension
                const color = NODE_COLORS[node.atmosphere]

                return (
                  <div
                    key={node.dimension}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    {isNext && (
                      <span
                        className="dimension-next-orbit absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                        style={{ borderColor: color }}
                      />
                    )}

                    <span
                      className={`dimension-map-node relative flex items-center justify-center rounded-full border ${
                        isCurrent ? 'dimension-map-node-current' : ''
                      } ${isNext ? 'dimension-map-node-next' : ''}`}
                      style={{
                        width: isCurrent || isNext ? 30 : 22,
                        height: isCurrent || isNext ? 30 : 22,
                        color: isCompleted ? '#fff' : '#7f8379',
                        backgroundColor: isCompleted
                          ? color
                          : isNext
                            ? '#f7f3eb'
                            : '#e4dfd5',
                        borderColor: isCompleted || isNext
                          ? color
                          : 'rgba(122,138,122,0.18)',
                        boxShadow: isCompleted
                          ? `0 5px 16px ${color}55`
                          : undefined,
                        opacity: isFuture ? 0.42 : 1,
                      }}
                    >
                      <span className="font-serif text-[0.62rem] leading-none">
                        {isCompleted && !isCurrent ? '✓' : node.dimension}
                      </span>
                    </span>

                    <div
                      className={`pointer-events-none absolute left-1/2 w-24 -translate-x-1/2 text-center ${
                        node.labelSide === 'top'
                          ? 'bottom-[calc(100%+0.42rem)]'
                          : 'top-[calc(100%+0.42rem)]'
                      }`}
                      style={{ opacity: isFuture ? 0.42 : 1 }}
                    >
                      <span className="block text-[0.43rem] uppercase tracking-[0.12em] text-muted sm:text-[0.48rem]">
                        {String(node.dimension).padStart(2, '0')}
                      </span>
                      <span
                        className={`mt-0.5 block font-serif text-[0.56rem] leading-tight sm:text-[0.66rem] ${
                          isNext || isCurrent
                            ? 'font-medium text-forest'
                            : 'text-forest/62'
                        }`}
                      >
                        {node.shortLabel}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <aside className="relative flex flex-col justify-between border-t border-forest/10 bg-white/30 p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-7">
            <div>
              <div className="mb-7 flex items-center justify-between">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-moss">
                  {isFinished ? 'Próxima lectura' : 'Próxima estación'}
                </span>
                <span className="font-serif text-sm italic text-clay">
                  {String(nextDimension).padStart(2, '0')}
                </span>
              </div>

              <div
                className="mb-5 h-px w-12"
                style={{ backgroundColor: NODE_COLORS[nextNode.atmosphere] }}
              />
              <h3 className="font-serif text-2xl leading-tight text-forest">
                {nextNode.shortLabel}
              </h3>
              <p className="mt-3 text-xs leading-5 text-muted">
                {nextNode.description}
              </p>

              {completedNode && (
                <p className="mt-6 border-l border-moss/25 pl-3 text-[0.68rem] leading-5 text-forest/55">
                  Has dejado atrás{' '}
                  <span className="font-medium text-forest/75">
                    {completedNode.shortLabel.toLowerCase()}
                  </span>
                  . El mapa conserva esa capa.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onContinue}
              className="group mt-5 flex min-h-11 w-full items-center justify-between rounded-full bg-forest px-5 text-left text-xs font-semibold text-paper shadow-[0_10px_28px_rgba(42,74,58,0.2)] transition hover:bg-[#355d4a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest active:scale-[0.98]"
            >
              <span>{ctaLabel}</span>
              <span
                className="ml-3 text-base transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </aside>
        </div>
      </div>
    </section>
  )
}
