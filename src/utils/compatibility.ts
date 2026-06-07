import type {
  CandidateProfile,
  CategoryScore,
  CompatibilityCategory,
  CompatibilityReport,
  CompatibilityRisk,
  CompatibilityStrength,
  UserProfile,
} from '../types'

const categoryConfig: Record<
  CompatibilityCategory,
  { label: string; weight: number }
> = {
  lifeProject: { label: 'Proyecto vital', weight: 0.2 },
  values: { label: 'Valores', weight: 0.2 },
  emotionalStyle: { label: 'Estilo emocional', weight: 0.15 },
  communication: { label: 'Comunicación y conflicto', weight: 0.15 },
  intimacy: { label: 'Intimidad y afecto', weight: 0.1 },
  lifestyle: { label: 'Estilo de vida', weight: 0.05 },
  availability: { label: 'Disponibilidad relacional', weight: 0.1 },
  innerWorld: { label: 'Mundo interior y anhelos', weight: 0.05 },
}

const coreQuestions: {
  category: CompatibilityCategory
  question: string
}[] = [
  {
    category: 'lifeProject',
    question: '¿Qué significa para ti construir algo serio?',
  },
  {
    category: 'emotionalStyle',
    question: '¿Cómo sueles reaccionar cuando tienes miedo de perder a alguien?',
  },
  {
    category: 'availability',
    question: '¿Qué necesitas para sentirte seguro/a en una relación?',
  },
  {
    category: 'communication',
    question: '¿Qué no quieres repetir de relaciones anteriores?',
  },
  {
    category: 'lifestyle',
    question: '¿Qué lugar ocupa la libertad individual dentro de una pareja?',
  },
]

function scoreDifference(
  userValue: number,
  candidateValue: number,
  category: CompatibilityCategory,
) {
  const difference = Math.abs(userValue - candidateValue)
  let score = 100 - difference * 22

  // En intimidad y mundo interior, una diferencia moderada puede ser
  // complementaria si ambas personas tienen una base de apertura suficiente.
  const canComplement =
    ['intimacy', 'innerWorld', 'lifestyle'].includes(category) &&
    difference <= 1.5 &&
    Math.min(userValue, candidateValue) >= 2.8

  if (canComplement) score += 6

  // Proyecto y disponibilidad necesitan algo más que una media aceptable:
  // si una persona está claramente poco disponible, la tensión es estructural.
  if (
    ['lifeProject', 'availability'].includes(category) &&
    Math.min(userValue, candidateValue) < 2.5
  ) {
    score -= 14
  }

  return Math.round(Math.max(18, Math.min(98, score)))
}

function getCategoryNote(score: number, label: string) {
  if (score >= 88) return `Existe una sintonía muy clara en ${label.toLowerCase()}.`
  if (score >= 74)
    return `Hay una base compartida en ${label.toLowerCase()}, con matices conversables.`
  if (score >= 58)
    return `Puede funcionar, pero conviene entender las diferencias en ${label.toLowerCase()}.`
  return `Aquí aparecen diferencias importantes que merecen claridad temprana.`
}

function buildStrengths(scores: CategoryScore[]): CompatibilityStrength[] {
  return [...scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => ({
      title:
        item.score >= 88
          ? `Sintonía en ${item.label.toLowerCase()}`
          : `Buena base en ${item.label.toLowerCase()}`,
      description: item.note,
      categories: [item.category],
    }))
}

function buildRisks(scores: CategoryScore[]): CompatibilityRisk[] {
  const lowerScores = [...scores]
    .sort((a, b) => a.score - b.score)
    .filter((item) => item.score < 82)
    .slice(0, 2)

  if (lowerScores.length === 0) {
    return [
      {
        title: 'Cuidar el ritmo real',
        description:
          'La afinidad es alta, pero sigue siendo importante observar si la consistencia cotidiana acompaña a la conexión inicial.',
        severity: 'low',
        categories: ['availability'],
      },
    ]
  }

  return lowerScores.map((item) => ({
    title: `Diferentes ritmos en ${item.label.toLowerCase()}`,
    description:
      item.score < 55
        ? `La distancia en ${item.label.toLowerCase()} podría afectar a decisiones importantes. Conviene hablarlo antes de generar expectativas.`
        : `Esta diferencia no es necesariamente incompatible, pero requeriría comunicación clara, acuerdos y capacidad de reparación.`,
    severity: item.score < 55 ? 'high' : item.score < 70 ? 'medium' : 'low',
    categories: [item.category],
  }))
}

export function calculateCompatibility(
  user: UserProfile,
  candidate: CandidateProfile,
): CompatibilityReport {
  const categories = Object.keys(categoryConfig) as CompatibilityCategory[]

  const categoryScores = categories.map((category): CategoryScore => {
    const config = categoryConfig[category]
    const score = scoreDifference(
      user.dimensions[category],
      candidate.dimensions[category],
      category,
    )

    return {
      category,
      label: config.label,
      score,
      weight: config.weight,
      note: getCategoryNote(score, config.label),
    }
  })

  const weightedScore = categoryScores.reduce(
    (total, item) => total + item.score * item.weight,
    0,
  )

  const priorityAlignment = user.priorities.filter((priority) =>
    candidate.priorities.includes(priority),
  ).length
  const priorityAdjustment = Math.min(3, priorityAlignment)
  const totalScore = Math.round(
    Math.max(20, Math.min(98, weightedScore + priorityAdjustment)),
  )

  const strengths = buildStrengths(categoryScores)
  const risks = buildRisks(categoryScores)
  const riskCategories = risks.flatMap((risk) => risk.categories)
  const suggestedQuestions = [...coreQuestions]
    .sort((a, b) => {
      const aPriority = riskCategories.includes(a.category) ? 1 : 0
      const bPriority = riskCategories.includes(b.category) ? 1 : 0
      return bPriority - aPriority
    })
    .map((item) => item.question)

  const topLabels = [...categoryScores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.label.toLowerCase())

  const weakest = [...categoryScores].sort((a, b) => a.score - b.score)[0]
  const relationalRisk =
    totalScore >= 80 && weakest.score >= 62
      ? 'Bajo'
      : totalScore >= 60
        ? 'Moderado'
        : 'Elevado'
  const longTermPotential =
    totalScore >= 82
      ? 'Prometedor'
      : totalScore >= 62
        ? 'Posible con atención'
        : 'Limitado'

  const explanation =
    totalScore >= 80
      ? `Este vínculo muestra una compatibilidad alta en ${topLabels.join(', ')}. Ambas personas parecen compartir una base sólida para construir. La principal zona a conversar aparece en ${weakest.label.toLowerCase()}; no es necesariamente una incompatibilidad, pero requeriría claridad y capacidad de reparación.`
      : totalScore >= 60
        ? `Hay una conexión posible y varios puntos de afinidad, especialmente en ${topLabels.slice(0, 2).join(' y ')}. A la vez, las diferencias en ${weakest.label.toLowerCase()} podrían generar tensión si no se hablan con honestidad desde el principio.`
        : `Puede existir curiosidad o atracción, pero aparecen diferencias relevantes en el modo de imaginar y sostener una relación. La distancia en ${weakest.label.toLowerCase()} merece más atención que la afinidad inicial.`

  const recommendation =
    totalScore >= 82
      ? 'Merece una conversación pausada. Hay base para explorar el vínculo sin acelerar la intimidad ni dar la compatibilidad por hecha.'
      : totalScore >= 62
        ? 'Puede ser valioso conocerse si ambos pueden hablar pronto sobre sus ritmos y expectativas. Observa los hechos, no solo la conexión.'
        : 'Conviene avanzar con cautela y sin intentar convertir la intensidad en compatibilidad. Prioriza claridad sobre el proyecto y la disponibilidad.'

  return {
    candidateId: candidate.id,
    totalScore,
    categoryScores,
    strengths,
    risks,
    suggestedQuestions,
    recommendation,
    explanation,
    relationalRisk,
    longTermPotential,
  }
}
