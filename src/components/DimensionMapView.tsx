import type { StageAtmosphereName } from '../types'

interface MapNode {
  dimension: number
  shortLabel: string
  atmosphere: StageAtmosphereName
  x: number
  y: number
}

const MAP_NODES: MapNode[] = [
  { dimension: 1,  shortLabel: 'Lo visible',     atmosphere: 'clear',     x: 10, y: 58 },
  { dimension: 2,  shortLabel: 'Práctica',        atmosphere: 'earth',     x: 26, y: 62 },
  { dimension: 3,  shortLabel: 'Proyecto',        atmosphere: 'structure', x: 44, y: 56 },
  { dimension: 4,  shortLabel: 'Valores',         atmosphere: 'depth',     x: 62, y: 60 },
  { dimension: 5,  shortLabel: 'Emocional',       atmosphere: 'warm',      x: 78, y: 50 },
  { dimension: 6,  shortLabel: 'Conflicto',       atmosphere: 'honest',    x: 84, y: 36 },
  { dimension: 7,  shortLabel: 'Intimidad',       atmosphere: 'delicate',  x: 72, y: 24 },
  { dimension: 8,  shortLabel: 'Patrones',        atmosphere: 'silent',    x: 55, y: 30 },
  { dimension: 9,  shortLabel: 'Anhelo',          atmosphere: 'poetic',    x: 38, y: 22 },
  { dimension: 10, shortLabel: 'Disponible',      atmosphere: 'mature',    x: 24, y: 32 },
  { dimension: 11, shortLabel: 'Simbólica',       atmosphere: 'night',     x: 18, y: 18 },
  { dimension: 12, shortLabel: 'Síntesis',        atmosphere: 'summary',   x: 50, y: 8  },
]

const NODE_COLORS: Record<StageAtmosphereName, { fill: string; text: string; glow: string }> = {
  clear:     { fill: '#b8cc94', text: '#1e2e26', glow: 'rgba(184,204,148,0.5)' },
  earth:     { fill: '#8ab080', text: '#fff',    glow: 'rgba(138,176,128,0.5)' },
  structure: { fill: '#7aa878', text: '#fff',    glow: 'rgba(122,168,120,0.5)' },
  depth:     { fill: '#6a9870', text: '#fff',    glow: 'rgba(106,152,112,0.5)' },
  warm:      { fill: '#c09060', text: '#fff',    glow: 'rgba(192,144,96,0.5)'  },
  honest:    { fill: '#7aa870', text: '#fff',    glow: 'rgba(122,168,112,0.5)' },
  delicate:  { fill: '#c89080', text: '#fff',    glow: 'rgba(200,144,128,0.5)' },
  silent:    { fill: '#909878', text: '#fff',    glow: 'rgba(144,152,120,0.5)' },
  poetic:    { fill: '#a890b8', text: '#fff',    glow: 'rgba(168,144,184,0.5)' },
  mature:    { fill: '#789878', text: '#fff',    glow: 'rgba(120,152,120,0.5)' },
  night:     { fill: '#263020', text: '#f2ede2', glow: 'rgba(92,122,105,0.5)'  },
  summary:   { fill: '#5c8068', text: '#fff',    glow: 'rgba(92,128,104,0.5)'  },
}

function smoothPath(pts: Array<{ x: number; y: number }>): string {
  if (pts.length < 2) return ''
  const d: string[] = [`M ${pts[0].x},${pts[0].y}`]
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const pp = pts[i - 2] ?? prev
    const nx = pts[i + 1] ?? curr
    const cp1x = +(prev.x + (curr.x - pp.x) * 0.28).toFixed(2)
    const cp1y = +(prev.y + (curr.y - pp.y) * 0.28).toFixed(2)
    const cp2x = +(curr.x - (nx.x - prev.x) * 0.28).toFixed(2)
    const cp2y = +(curr.y - (nx.y - prev.y) * 0.28).toFixed(2)
    d.push(`C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`)
  }
  return d.join(' ')
}

const FULL_PATH = smoothPath(MAP_NODES.map((n) => ({ x: n.x, y: n.y })))

function completedPathUpTo(n: number): string {
  return smoothPath(MAP_NODES.slice(0, n + 1).map((m) => ({ x: m.x, y: m.y })))
}

interface DimensionMapViewProps {
  completedUpTo: number
  onContinue: () => void
}

export function DimensionMapView({ completedUpTo, onContinue }: DimensionMapViewProps) {
  const nextDimension = completedUpTo + 1
  const isFinished = completedUpTo >= 11

  const ctaLabel = isFinished
    ? 'Ver mi síntesis →'
    : nextDimension === 11
      ? 'Abrir la dimensión simbólica →'
      : `Explorar dimensión ${nextDimension} →`

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-2 py-4 sm:gap-5 sm:py-6">
      <div className="text-center">
        <p className="eyebrow mb-1">Mapa del recorrido</p>
        <h2 className="font-serif text-xl text-forest sm:text-2xl">
          {isFinished
            ? 'Has explorado las once dimensiones'
            : `${completedUpTo} de 11 dimensiones exploradas`}
        </h2>
        {!isFinished && (
          <p className="mt-1 text-xs text-muted">
            Siguiente: <span className="font-medium text-forest">{MAP_NODES[nextDimension - 1]?.shortLabel}</span>
          </p>
        )}
      </div>

      {/* Map canvas */}
      <div className="w-full max-w-3xl rounded-2xl border border-white/80 bg-white/50 p-4 shadow-[0_20px_60px_rgba(42,74,58,0.12)] backdrop-blur-md sm:rounded-[1.5rem] sm:p-6">
        <div className="relative w-full" style={{ paddingBottom: '55%' }}>
          {/* SVG: paths */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 65"
            preserveAspectRatio="none"
          >
            {/* Upcoming path — dashed */}
            <path
              d={FULL_PATH}
              fill="none"
              stroke="#d0c8b8"
              strokeWidth="0.7"
              strokeDasharray="1.2 1"
              strokeLinecap="round"
            />
            {/* Completed path */}
            {completedUpTo > 0 && (
              <path
                d={completedPathUpTo(completedUpTo)}
                fill="none"
                stroke="#5c7a69"
                strokeWidth="1.1"
                strokeLinecap="round"
                opacity="0.65"
              />
            )}
          </svg>

          {/* Nodes */}
          {MAP_NODES.map((node) => {
            const isCompleted = node.dimension <= completedUpTo
            const isJustCompleted = node.dimension === completedUpTo
            const isNext = node.dimension === nextDimension && !isFinished
            const isUpcoming = node.dimension > nextDimension
            const colors = NODE_COLORS[node.atmosphere]

            const size = isNext ? 34 : isCompleted ? 30 : 24

            return (
              <div
                key={node.dimension}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {/* Ping ring for just-completed node */}
                {isJustCompleted && (
                  <div
                    className="animate-node-ping absolute rounded-full"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: colors.glow,
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
                {/* Pulse ring for next node */}
                {isNext && (
                  <div
                    className="absolute animate-pulse rounded-full opacity-30"
                    style={{
                      width: size + 10,
                      height: size + 10,
                      backgroundColor: colors.fill,
                      top: -(5),
                      left: -(5),
                    }}
                  />
                )}

                {/* Node circle */}
                <div
                  className="relative flex items-center justify-center rounded-full border transition-all duration-500"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: isCompleted
                      ? colors.fill
                      : isNext
                        ? `${colors.fill}70`
                        : '#e8e4dc',
                    borderColor: isCompleted
                      ? 'rgba(255,255,255,0.55)'
                      : 'rgba(210,202,188,0.8)',
                    boxShadow: isCompleted
                      ? `0 3px 12px ${colors.glow}`
                      : 'none',
                    opacity: isUpcoming ? 0.38 : 1,
                  }}
                >
                  {isCompleted && !isJustCompleted ? (
                    <svg viewBox="0 0 10 10" style={{ width: size * 0.42, height: size * 0.42 }} fill="none">
                      <path d="M2 5.2l2 2 4-4" stroke={colors.text} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span
                      className="font-serif leading-none"
                      style={{
                        fontSize: isNext ? '0.72rem' : '0.58rem',
                        color: isCompleted ? colors.text : '#9a9080',
                        fontWeight: 500,
                      }}
                    >
                      {node.dimension}
                    </span>
                  )}
                </div>

                {/* Label */}
                <p
                  className="pointer-events-none absolute w-14 -translate-x-1/4 text-center leading-tight"
                  style={{
                    top: size + 3,
                    left: 0,
                    fontSize: '0.46rem',
                    color: isCompleted ? '#2a4a3a' : '#b0a898',
                    fontWeight: isNext ? 600 : 400,
                    opacity: isUpcoming ? 0.4 : 1,
                  }}
                >
                  {node.shortLabel}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="rounded-full bg-forest px-8 py-3 font-semibold text-paper shadow-[0_10px_28px_rgba(42,74,58,0.22)] transition hover:bg-[#355d4a] active:scale-95"
      >
        {ctaLabel}
      </button>
    </div>
  )
}
