import type { StageAtmosphereName } from '../types'

export const stageBackgroundClasses: Record<StageAtmosphereName, string> = {
  // Dimensión 1: Lo visible — marfil luminoso
  clear:
    'bg-[linear-gradient(135deg,rgba(250,246,240,0.97)_0%,rgba(238,230,215,0.87)_58%,rgba(232,225,208,0.82)_100%)]',
  // Dimensión 2: Vida práctica — tierra y salvia
  earth:
    'bg-[linear-gradient(135deg,rgba(242,244,236,0.96)_0%,rgba(220,232,215,0.86)_54%,rgba(210,226,208,0.82)_100%)]',
  // Dimensión 3: Proyecto vital — verde-salvia estructurado
  structure:
    'bg-[linear-gradient(135deg,rgba(238,244,234,0.96)_0%,rgba(210,228,205,0.86)_55%,rgba(200,220,200,0.82)_100%)]',
  // Dimensión 4: Valores — verde profundo
  depth:
    'bg-[linear-gradient(135deg,rgba(234,242,232,0.96)_0%,rgba(200,222,198,0.88)_55%,rgba(190,215,192,0.84)_100%)]',
  // Dimensión 5: Emocional — ámbar y arcilla cálida
  warm:
    'bg-[linear-gradient(135deg,rgba(252,246,238,0.97)_0%,rgba(242,225,205,0.89)_55%,rgba(238,215,195,0.85)_100%)]',
  // Dimensión 6: Conflicto — salvia clara y honesta
  honest:
    'bg-[linear-gradient(135deg,rgba(240,244,237,0.96)_0%,rgba(215,228,210,0.87)_55%,rgba(205,222,205,0.83)_100%)]',
  // Dimensión 7: Intimidad — blush cálido, arcilla suave
  delicate:
    'bg-[linear-gradient(135deg,rgba(252,244,238,0.97)_0%,rgba(242,225,210,0.89)_55%,rgba(238,215,200,0.85)_100%)]',
  // Dimensión 8: Patrones — silencioso, gris-salvia cálido
  silent:
    'bg-[linear-gradient(135deg,rgba(240,240,233,0.97)_0%,rgba(218,220,208,0.89)_55%,rgba(208,212,198,0.85)_100%)]',
  // Dimensión 9: Anhelo — poético, lavanda cálida y ámbar
  poetic:
    'bg-[radial-gradient(circle_at_82%_12%,rgba(210,195,230,0.4),transparent_20rem),linear-gradient(135deg,rgba(250,244,240,0.97)_0%,rgba(235,220,210,0.89)_55%,rgba(225,210,222,0.85)_100%)]',
  // Dimensión 10: Disponibilidad — verde maduro cálido
  mature:
    'bg-[linear-gradient(135deg,rgba(238,244,234,0.96)_0%,rgba(208,226,205,0.87)_55%,rgba(198,218,198,0.84)_100%)]',
  // Dimensión 11: Simbólica — noche de bosque, oscuro y cálido
  night:
    'bg-[radial-gradient(circle_at_82%_8%,rgba(72,108,88,0.28),transparent_22rem),linear-gradient(145deg,#18281e,#20342a_58%,#263020)] text-[#f2ede2]',
  // Dimensión 12: Síntesis — marfil luminoso y esperanzador
  summary:
    'bg-[radial-gradient(circle_at_80%_10%,rgba(185,215,182,0.4),transparent_22rem),linear-gradient(145deg,rgba(250,246,240,0.99),rgba(232,225,208,0.93))]',
}

export const stageAccentClasses: Record<
  StageAtmosphereName,
  [string, string]
> = {
  clear: ['bg-[#c8d8b0]', 'bg-[#e0c8a8]'],
  earth: ['bg-[#a8c4a0]', 'bg-[#c4b880]'],
  structure: ['bg-[#98b898]', 'bg-[#b8c898]'],
  depth: ['bg-[#88aa88]', 'bg-[#a8b878]'],
  warm: ['bg-[#c89868]', 'bg-[#dfba90]'],
  honest: ['bg-[#90b088]', 'bg-[#a8c890]'],
  delicate: ['bg-[#d0a090]', 'bg-[#e0c0a0]'],
  silent: ['bg-[#a0a888]', 'bg-[#b8b898]'],
  poetic: ['bg-[#b8a0c8]', 'bg-[#d8b888]'],
  mature: ['bg-[#88a888]', 'bg-[#a8c090]'],
  night: ['bg-[#385848]', 'bg-[#2c4035]'],
  summary: ['bg-[#a8c4a0]', 'bg-[#d0c898]'],
}
