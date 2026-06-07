import type { SymbolicProfile } from '../types'

export const zodiacSigns = [
  'Aries',
  'Tauro',
  'Géminis',
  'Cáncer',
  'Leo',
  'Virgo',
  'Libra',
  'Escorpio',
  'Sagitario',
  'Capricornio',
  'Acuario',
  'Piscis',
]

export const mbtiTypes = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
]

export const humanDesignTypes = [
  'Manifestor',
  'Generator',
  'Manifesting Generator',
  'Projector',
  'Reflector',
]

export const humanDesignAuthorities = [
  'Emotional',
  'Sacral',
  'Splenic',
  'Ego',
  'Self-projected',
  'Mental',
  'Lunar',
  'No lo sé',
]

export const emptySymbolicProfile: SymbolicProfile = {
  wantsSymbolicLayer: false,
  uploadedFiles: [],
}

export function hasSymbolicData(profile?: SymbolicProfile) {
  if (!profile?.wantsSymbolicLayer) return false

  return Boolean(
    profile.sunSign ||
      profile.moonSign ||
      profile.risingSign ||
      profile.mbtiType ||
      profile.humanDesignType ||
      profile.humanDesignAuthority ||
      profile.humanDesignProfile ||
      profile.symbolicNotes?.trim() ||
      profile.uploadedFiles?.length,
  )
}
