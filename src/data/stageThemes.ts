import type { StageAtmosphereName } from '../types'

export const stageBackgroundClasses: Record<StageAtmosphereName, string> = {
  clear:
    'bg-[linear-gradient(135deg,rgba(247,252,255,0.94)_0%,rgba(226,242,255,0.82)_58%,rgba(235,238,255,0.78)_100%)]',
  earth:
    'bg-[linear-gradient(135deg,rgba(239,248,255,0.94)_0%,rgba(210,232,248,0.84)_54%,rgba(221,224,252,0.8)_100%)]',
  structure:
    'bg-[linear-gradient(135deg,rgba(235,250,255,0.94)_0%,rgba(202,233,246,0.84)_55%,rgba(197,217,249,0.82)_100%)]',
  depth:
    'bg-[linear-gradient(135deg,rgba(240,247,255,0.94)_0%,rgba(210,223,244,0.86)_55%,rgba(202,208,239,0.82)_100%)]',
  warm:
    'bg-[linear-gradient(135deg,rgba(244,247,255,0.95)_0%,rgba(217,225,250,0.86)_55%,rgba(221,207,246,0.82)_100%)]',
  honest:
    'bg-[linear-gradient(135deg,rgba(235,250,255,0.94)_0%,rgba(195,229,241,0.86)_55%,rgba(190,216,241,0.82)_100%)]',
  delicate:
    'bg-[linear-gradient(135deg,rgba(245,248,255,0.96)_0%,rgba(218,229,252,0.88)_55%,rgba(227,216,250,0.84)_100%)]',
  silent:
    'bg-[linear-gradient(135deg,rgba(241,247,253,0.95)_0%,rgba(214,226,239,0.86)_55%,rgba(202,216,233,0.84)_100%)]',
  poetic:
    'bg-[radial-gradient(circle_at_82%_12%,rgba(226,213,255,0.68),transparent_20rem),linear-gradient(135deg,rgba(241,247,255,0.96)_0%,rgba(211,225,251,0.88)_55%,rgba(208,200,244,0.84)_100%)]',
  mature:
    'bg-[linear-gradient(135deg,rgba(233,249,255,0.95)_0%,rgba(192,226,241,0.86)_55%,rgba(184,209,237,0.84)_100%)]',
  night:
    'bg-[radial-gradient(circle_at_82%_8%,rgba(151,190,241,0.24),transparent_22rem),linear-gradient(145deg,#172d4a,#203c61_58%,#2d315c)] text-[#f7fbff]',
  summary:
    'bg-[radial-gradient(circle_at_80%_10%,rgba(186,219,248,0.52),transparent_22rem),linear-gradient(145deg,rgba(248,252,255,0.98),rgba(221,237,252,0.9))]',
}

export const stageAccentClasses: Record<
  StageAtmosphereName,
  [string, string]
> = {
  clear: ['bg-[#a9d8f5]', 'bg-[#c9c8f5]'],
  earth: ['bg-[#91c6e7]', 'bg-[#c3caf7]'],
  structure: ['bg-[#82c8e5]', 'bg-[#aebff1]'],
  depth: ['bg-[#91add9]', 'bg-[#c2c7ef]'],
  warm: ['bg-[#9fb7ea]', 'bg-[#d2bfea]'],
  honest: ['bg-[#78bfdc]', 'bg-[#a9c6ee]'],
  delicate: ['bg-[#abc4ee]', 'bg-[#d4c2ee]'],
  silent: ['bg-[#a4b8ce]', 'bg-[#cbd6e8]'],
  poetic: ['bg-[#a8b8e9]', 'bg-[#c8b8eb]'],
  mature: ['bg-[#78b9da]', 'bg-[#aebee9]'],
  night: ['bg-[#70a8d8]', 'bg-[#777fc8]'],
  summary: ['bg-[#8bc8eb]', 'bg-[#b8c4f0]'],
}
