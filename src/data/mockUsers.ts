import type {
  CandidateProfile,
  RelationshipMap,
  UserProfile,
} from '../types'

export const mainUser: UserProfile = {
  id: 'user-alex',
  name: 'Alex',
  age: 34,
  city: 'Madrid',
  intention: 'Una relación estable, honesta y con proyecto compartido',
  dimensions: {
    lifeProject: 4.7,
    values: 4.8,
    emotionalStyle: 3.9,
    communication: 4.2,
    intimacy: 4.4,
    lifestyle: 3.8,
    availability: 4.1,
    innerWorld: 4.6,
  },
  priorities: ['lifeProject', 'values', 'communication', 'availability'],
  traits: ['reflexivo/a', 'afectuoso/a', 'orientado/a al compromiso'],
}

export const candidates: CandidateProfile[] = [
  {
    id: 'candidate-lucia',
    name: 'Lucía',
    initials: 'LU',
    age: 33,
    city: 'Madrid',
    accent: 'sage',
    intention: 'Relación seria y construcción a largo plazo',
    bio: 'Editora, caminante lenta y defensora de las conversaciones que no caben en un mensaje corto.',
    relationshipVision:
      'Un vínculo estable donde el cuidado cotidiano y la autonomía puedan convivir.',
    highlights: ['Claridad afectiva', 'Proyecto compatible', 'Presencia emocional'],
    dimensions: {
      lifeProject: 4.8,
      values: 4.7,
      emotionalStyle: 4.2,
      communication: 4.1,
      intimacy: 4.5,
      lifestyle: 4.0,
      availability: 4.6,
      innerWorld: 4.7,
    },
    priorities: ['lifeProject', 'values', 'innerWorld', 'availability'],
    traits: ['serena', 'curiosa', 'consistente'],
    symbolicProfile: {
      wantsSymbolicLayer: true,
      sunSign: 'Virgo',
      moonSign: 'Piscis',
      risingSign: 'Libra',
      mbtiType: 'INFP',
      symbolicNotes:
        'Utiliza estos lenguajes como herramientas narrativas, no como certezas.',
      uploadedFiles: [],
    },
  },
  {
    id: 'candidate-daniel',
    name: 'Daniel',
    initials: 'DA',
    age: 36,
    city: 'Valencia',
    accent: 'clay',
    intention: 'Relación comprometida con espacio individual',
    bio: 'Arquitecto, muy presente cuando confía y cuidadoso con sus tiempos emocionales.',
    relationshipVision:
      'Una pareja sólida que no renuncie a los proyectos individuales.',
    highlights: ['Valores afines', 'Atracción probable', 'Autonomía compartida'],
    dimensions: {
      lifeProject: 4.0,
      values: 4.3,
      emotionalStyle: 2.0,
      communication: 1.6,
      intimacy: 4.3,
      lifestyle: 4.4,
      availability: 2.8,
      innerWorld: 4.0,
    },
    priorities: ['values', 'lifestyle', 'intimacy'],
    traits: ['independiente', 'sensible', 'reservado'],
    symbolicProfile: {
      wantsSymbolicLayer: false,
      uploadedFiles: [],
    },
  },
  {
    id: 'candidate-marta',
    name: 'Marta',
    initials: 'MA',
    age: 31,
    city: 'Barcelona',
    accent: 'ink',
    intention: 'Conocer sin expectativas y mantener libertad total',
    bio: 'Productora creativa, espontánea y en un momento de exploración personal.',
    relationshipVision:
      'Un vínculo intenso y flexible, sin necesidad de definir un horizonte común.',
    highlights: ['Curiosidad mutua', 'Energía creativa', 'Conversación estimulante'],
    dimensions: {
      lifeProject: 1.4,
      values: 2.6,
      emotionalStyle: 1.8,
      communication: 2.4,
      intimacy: 3.8,
      lifestyle: 1.8,
      availability: 1.4,
      innerWorld: 4.1,
    },
    priorities: ['innerWorld', 'intimacy', 'lifestyle'],
    traits: ['espontánea', 'creativa', 'exploradora'],
  },
]

export const relationshipMap: RelationshipMap = {
  bondingStyle:
    'Buscas un vínculo consciente y recíproco. Tiendes a abrirte cuando percibes coherencia, intención y una curiosidad genuina por tu mundo interior.',
  safetyNeeds:
    'Tus respuestas sugieren que necesitas claridad emocional para abrirte con seguridad. La presencia consistente y poder hablar sin retirar el afecto son importantes para ti.',
  desiredRelationship:
    'Quieres construir una relación estable, honesta y con horizonte compartido, sin renunciar al espacio propio ni a la identidad de cada persona.',
  innerReading:
    'Más allá de tus preferencias, parece que buscas una relación donde la presencia no se convierta en exigencia y la libertad no se confunda con distancia. Quieres poder elegir y sentirte elegido/a sin tener que dejar de ser tú.',
  sensitiveAreas: [
    'Podría haber cierta ambivalencia entre tu deseo de resolver pronto y tu necesidad de protegerte cuando no sientes claridad.',
    'Esta zona no es un problema, pero convendría mirar con honestidad cuánto esfuerzo asumes para evitar decepcionar.',
  ],
  strengths: [
    'Capacidad para conversar con profundidad y nombrar necesidades.',
    'Deseo real de construir, no solo de sentir intensidad.',
    'Sensibilidad para cuidar el vínculo sin dejar de valorar la autonomía.',
  ],
  availabilityLevel: 82,
  availabilityLabel: 'Buena disponibilidad para construir con calma',
}
