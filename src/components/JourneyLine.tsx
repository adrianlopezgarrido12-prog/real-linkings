import type { StageAtmosphereName } from '../types'

interface JourneyLineProps {
  atmosphere: StageAtmosphereName
}

const lineColors: Record<StageAtmosphereName, [string, string]> = {
  clear: ['#557b6d', '#b66c52'],
  earth: ['#98663f', '#d5a45f'],
  structure: ['#315f4d', '#86a68d'],
  depth: ['#4f5545', '#a98059'],
  warm: ['#a84f3f', '#d99169'],
  honest: ['#26705f', '#7eac9b'],
  delicate: ['#a85f68', '#d6a1a7'],
  silent: ['#565b59', '#979d98'],
  poetic: ['#76506f', '#bd7e91'],
  mature: ['#24583f', '#7d9e71'],
  night: ['#cfb96f', '#5f8f88'],
  summary: ['#416f59', '#b66c52'],
}

const paths: Record<StageAtmosphereName, string> = {
  clear: 'M-40 175 C120 35 205 280 390 138 S690 35 860 162 S1110 280 1280 112',
  earth: 'M-40 118 C120 260 250 18 405 165 S690 250 820 95 S1080 25 1280 165',
  structure:
    'M-40 190 C120 80 230 88 360 180 S615 245 770 105 S1030 54 1280 142',
  depth: 'M-40 95 C105 245 270 235 405 100 S670 36 815 178 S1100 238 1280 92',
  warm: 'M-40 170 C95 15 240 275 385 130 S650 28 825 180 S1080 275 1280 105',
  honest:
    'M-40 135 C120 255 245 20 430 150 S705 242 850 94 S1085 42 1280 175',
  delicate:
    'M-40 165 C130 44 260 240 420 118 S690 46 830 175 S1080 220 1280 82',
  silent:
    'M-40 92 C115 210 260 250 420 112 S675 55 835 170 S1090 220 1280 120',
  poetic:
    'M-40 178 C120 28 240 270 405 145 S660 10 825 174 S1100 250 1280 88',
  mature:
    'M-40 120 C105 250 250 34 410 158 S670 238 845 88 S1080 35 1280 155',
  night:
    'M-40 180 C90 20 245 255 410 116 S670 18 825 170 S1090 260 1280 72',
  summary:
    'M-40 145 C120 35 245 250 410 128 S680 38 835 172 S1080 235 1280 98',
}

export function JourneyLine({ atmosphere }: JourneyLineProps) {
  const [start, end] = lineColors[atmosphere]
  const gradientId = `journey-${atmosphere}`

  return (
    <svg
      viewBox="0 0 1240 300"
      preserveAspectRatio="none"
      className="journey-line absolute inset-x-0 top-[42%] h-[42%] w-full overflow-visible opacity-80"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1">
          <stop offset="0%" stopColor={start} stopOpacity="0.08" />
          <stop offset="32%" stopColor={start} stopOpacity="0.7" />
          <stop offset="72%" stopColor={end} stopOpacity="0.62" />
          <stop offset="100%" stopColor={end} stopOpacity="0.06" />
        </linearGradient>
        <filter id={`${gradientId}-glow`}>
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <path
        d={paths[atmosphere]}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="13"
        opacity="0.1"
        filter={`url(#${gradientId}-glow)`}
      />
      <path
        d={paths[atmosphere]}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={paths[atmosphere]}
        fill="none"
        stroke={end}
        strokeWidth="1"
        strokeDasharray="2 20"
        strokeLinecap="round"
        opacity="0.65"
        className="journey-line-pulse"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
