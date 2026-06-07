import { relationshipMap as defaultRelationshipMap } from '../data/mockUsers'
import type { AnswerValue, RelationshipMap } from '../types'

type Answers = Record<string, AnswerValue>

function numericAnswer(answers: Answers, id: string, fallback = 3) {
  const value = answers[id]
  return typeof value === 'number' ? value : fallback
}

function textAnswer(answers: Answers, id: string) {
  const value = answers[id]
  return typeof value === 'string' ? value : ''
}

function selectedAnswer(answers: Answers, id: string) {
  const value = answers[id]
  return Array.isArray(value) ? value : typeof value === 'string' ? [value] : []
}

function includesAny(value: string | string[], terms: string[]) {
  const normalized = (Array.isArray(value) ? value.join(' ') : value).toLowerCase()
  return terms.some((term) => normalized.includes(term.toLowerCase()))
}

function average(values: number[]) {
  return values.reduce((total, value) => total + value, 0) / values.length
}

export function generateRelationshipMap(answers: Answers): RelationshipMap {
  const answeredCount = Object.values(answers).filter((answer) =>
    Array.isArray(answer) ? answer.length > 0 : answer !== '',
  ).length

  if (answeredCount < 6) {
    return defaultRelationshipMap
  }

  const autonomyNeed = average([
    numericAnswer(answers, 'intimacy-space'),
    numericAnswer(answers, 'values-freedom'),
  ])
  const directCommunication = numericAnswer(answers, 'communication-direct')
  const vulnerability = numericAnswer(answers, 'emotional-vulnerability')
  const emotionalDistance = textAnswer(answers, 'emotional-distance')
  const firstFear = textAnswer(answers, 'emotional-first-fear')
  const conflictResponse = textAnswer(answers, 'communication-tension')
  const protectionTrigger = textAnswer(answers, 'patterns-trigger')
  const openingNeeds = selectedAnswer(answers, 'emotional-opening')
  const chosenNeeds = selectedAnswer(answers, 'inner-chosen')
  const lifePlace = textAnswer(answers, 'life-place')
  const motivation = textAnswer(answers, 'availability-carence')

  const clarityNeed =
    numericAnswer(answers, 'values-consistency') >= 4 ||
    includesAny(openingNeeds, ['coherencia', 'palabras claras']) ||
    includesAny(chosenNeeds, ['palabras claras', 'presencia consistente']) ||
    includesAny(emotionalDistance, ['claridad', 'insisto'])

  const abandonmentSensitivity =
    includesAny(firstFear, ['deje de elegirme', 'no ser suficiente']) ||
    includesAny(protectionTrigger, [
      'distancia emocional',
      'ambigüedad',
      'falta de reciprocidad',
    ])

  const protectsWithDistance =
    includesAny(emotionalDistance, ['me retiro', 'no me afectara']) ||
    includesAny(conflictResponse, ['callar', 'alejarme']) ||
    includesAny(textAnswer(answers, 'emotional-closeness'), [
      'recuperar espacio',
      'buscar defectos',
    ])

  const seeksDepth =
    numericAnswer(answers, 'inner-depth') >= 4 ||
    textAnswer(answers, 'inner-love').trim().length > 35 ||
    textAnswer(answers, 'inner-home').trim().length > 35

  const availabilityAverage = average([
    numericAnswer(answers, 'basic-time'),
    numericAnswer(answers, 'availability-space'),
    numericAnswer(answers, 'availability-seen'),
    numericAnswer(answers, 'availability-past'),
    numericAnswer(answers, 'patterns-awareness'),
  ])
  const availabilityLevel = Math.round(
    Math.max(35, Math.min(94, 30 + availabilityAverage * 13)),
  )

  let bondingStyle =
    'Parece que buscas acercarte con intención, dejando que la confianza se demuestre en lo cotidiano antes de entregar demasiado de ti.'

  if (autonomyNeed >= 4) {
    bondingStyle =
      'Deseas construir cercanía sin perder autonomía. Te resulta importante poder elegir a alguien desde la libertad, conservando espacios propios y una identidad que no dependa de la relación.'
  } else if (clarityNeed && seeksDepth) {
    bondingStyle =
      'Tiendes a buscar una conexión emocional significativa y te abres mejor cuando percibes intención clara, continuidad y curiosidad genuina por tu mundo interior.'
  } else if (vulnerability <= 2.5 || protectsWithDistance) {
    bondingStyle =
      'Hay deseo de cercanía, aunque sueles necesitar tiempo para comprobar que puedes abrirte sin quedar demasiado expuesto/a. La confianza parece crecer para ti mediante gestos consistentes.'
  }

  let safetyNeeds =
    'Para sentirte seguro/a parece importante que la cercanía avance con respeto, reciprocidad y suficiente tiempo para reconocer lo que ambos están construyendo.'

  if (clarityNeed && autonomyNeed >= 4) {
    safetyNeeds =
      'Necesitas claridad, coherencia entre palabras y hechos, y comunicación directa; al mismo tiempo, la cercanía se vuelve más segura cuando también se respetan tus límites y tu espacio propio.'
  } else if (clarityNeed) {
    safetyNeeds =
      'Tus respuestas sugieren que la claridad emocional, la coherencia y una comunicación directa te ayudan a abrirte. La ambigüedad sostenida podría dificultar que descanses dentro de la relación.'
  } else if (autonomyNeed >= 4) {
    safetyNeeds =
      'La confianza parece depender de poder estar cerca sin sentirte absorbido/a. Que la otra persona respete tus ritmos y no interprete el espacio como desinterés sería especialmente valioso.'
  }

  let desiredRelationship =
    'Buscas una relación presente y cuidada, capaz de integrar afecto, conversaciones honestas y decisiones compartidas sin convertir el encuentro en una promesa apresurada.'

  if (includesAny(lifePlace, ['proyecto central', 'parte importante'])) {
    desiredRelationship =
      'Quieres que la relación tenga un lugar importante en tu vida y se traduzca en cuidado cotidiano, decisiones compartidas y un horizonte que ambos puedan construir de forma consciente.'
  } else if (includesAny(lifePlace, ['mucha autonomía'])) {
    desiredRelationship =
      'Imaginas una relación estable que acompañe la vida de ambos sin ocuparla por completo: compromiso, presencia y un proyecto común que conviva con caminos individuales.'
  } else if (includesAny(lifePlace, ['descubrirlo'])) {
    desiredRelationship =
      'Prefieres descubrir la forma de la relación junto a la otra persona, sin imponer un guion previo, pero esperando que la honestidad y la capacidad de elegir estén presentes.'
  }

  const sensitiveAreas: string[] = []
  if (abandonmentSensitivity) {
    sensitiveAreas.push(
      'Podría aparecer cierta sensibilidad ante la distancia emocional o la falta de definición. La incertidumbre sostenida puede hacer que necesites confirmar antes de tiempo dónde estás.',
    )
  }
  if (protectsWithDistance) {
    sensitiveAreas.push(
      'Cuando algo te sobrepasa, quizá intentes protegerte retirándote o reduciendo lo que muestras. Pedir una pausa sin desaparecer podría ayudarte a cuidar tanto tu espacio como el encuentro.',
    )
  }
  if (seeksDepth && directCommunication <= 2.5) {
    sensitiveAreas.push(
      'Hay deseo de una conexión íntima, aunque también señales de autoprotección ante conversaciones difíciles. Conviene mirar con honestidad esa distancia entre lo que anhelas y lo que hoy puedes sostener.',
    )
  }
  if (
    includesAny(motivation, ['dejar atrás', 'sentirme elegido']) ||
    numericAnswer(answers, 'availability-past') <= 2
  ) {
    sensitiveAreas.push(
      'Parte de la búsqueda podría estar intentando aliviar una ausencia o cerrar una etapa todavía presente. No invalida tu deseo, pero merece avanzar sin pedir a otra persona que lo resuelva.',
    )
  }
  if (sensitiveAreas.length < 2) {
    sensitiveAreas.push(
      'Parece importante cuidar el equilibrio entre ilusionarte con lo posible y observar la consistencia real antes de construir expectativas.',
    )
  }
  if (sensitiveAreas.length < 2) {
    sensitiveAreas.push(
      'Esta zona no es un problema: simplemente conviene seguir nombrando tus necesidades antes de adaptarte demasiado a las de otra persona.',
    )
  }

  const strengths: string[] = []
  if (numericAnswer(answers, 'patterns-awareness') >= 4) {
    strengths.push(
      'Capacidad para reconocer tus patrones mientras ocurren y elegir una respuesta distinta.',
    )
  }
  if (directCommunication >= 4) {
    strengths.push(
      'Disposición para sostener conversaciones incómodas sin retirar el cuidado.',
    )
  }
  if (numericAnswer(answers, 'availability-seen') >= 4) {
    strengths.push(
      'Apertura para dejarte conocer con honestidad, incluso cuando no tienes todo resuelto.',
    )
  }
  if (numericAnswer(answers, 'values-consistency') >= 4) {
    strengths.push(
      'Valoras la coherencia y puedes aportar una mirada atenta a los actos cotidianos.',
    )
  }
  if (selectedAnswer(answers, 'life-build').length >= 3) {
    strengths.push(
      'Tu idea de relación incluye contribuir, sostener y construir, no solo recibir.',
    )
  }

  const defaultStrengths = [
    'Capacidad para reflexionar sobre lo que necesitas antes de elegir.',
    'Interés por construir desde la reciprocidad y no solo desde la intensidad.',
    'Sensibilidad para cuidar la cercanía sin darla por supuesta.',
  ]
  defaultStrengths.forEach((strength) => {
    if (strengths.length < 3) strengths.push(strength)
  })

  const availabilityLabel =
    availabilityLevel >= 82
      ? 'Disponibilidad sólida para construir con presencia'
      : availabilityLevel >= 68
        ? 'Buen espacio para avanzar con atención'
        : availabilityLevel >= 52
          ? 'Disponibilidad posible, con aspectos que conviene cuidar'
          : 'Un momento para avanzar despacio y escucharte'

  return {
    bondingStyle,
    safetyNeeds,
    desiredRelationship,
    sensitiveAreas: sensitiveAreas.slice(0, 3),
    strengths: strengths.slice(0, 3),
    availabilityLevel,
    availabilityLabel,
  }
}
