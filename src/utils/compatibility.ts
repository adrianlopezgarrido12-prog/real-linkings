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
  if (score >= 88)
    return `Ambas personas parecen acercarse de una forma muy parecida a ${label.toLowerCase()}.`
  if (score >= 74)
    return `Hay una base compartida en ${label.toLowerCase()}, aunque conviene conocer sus matices.`
  if (score >= 58)
    return `Las diferencias en ${label.toLowerCase()} podrían complementarse si se hablan con claridad.`
  return `Aquí aparecen ritmos distintos que merecen una conversación temprana y concreta.`
}

function buildStrengths(scores: CategoryScore[]): CompatibilityStrength[] {
  return [...scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => ({
      title:
        item.score >= 88
          ? `Una mirada parecida sobre ${item.label.toLowerCase()}`
          : `Terreno compartido en ${item.label.toLowerCase()}`,
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
        title: 'No dar por hecha la sintonía',
        description:
          'La afinidad es alta, pero sigue siendo importante observar si la consistencia cotidiana acompaña a la conexión inicial.',
        severity: 'low',
        categories: ['availability'],
      },
    ]
  }

  return lowerScores.map((item) => ({
    title: `Ritmos distintos en ${item.label.toLowerCase()}`,
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
  const secondWeakest = [...categoryScores].sort(
    (a, b) => a.score - b.score,
  )[1]
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
      ? `Este encuentro muestra una afinidad alta en ${topLabels.join(', ')}. Ambas personas parecen compartir una base sólida para construir. La principal zona a conversar aparece en ${weakest.label.toLowerCase()}; no tiene por qué cerrar la posibilidad, pero requeriría claridad y capacidad de reparación.`
      : totalScore >= 60
        ? `Hay una conexión posible y varios puntos de afinidad, especialmente en ${topLabels.slice(0, 2).join(' y ')}. A la vez, las diferencias en ${weakest.label.toLowerCase()} podrían generar tensión si no se hablan con honestidad desde el principio.`
        : `Puede existir curiosidad o atracción, pero aparecen diferencias relevantes en el modo de imaginar y sostener una relación. La distancia en ${weakest.label.toLowerCase()} merece más atención que la afinidad inicial.`

  const likelyConnection =
    totalScore >= 80
      ? `La conexión probablemente aparecería en la facilidad para reconocerse en ${topLabels.slice(0, 2).join(' y ')}. Podría sentirse como una conversación que avanza sin tener que justificar cada prioridad.`
      : totalScore >= 60
        ? `El encuentro podría ganar fuerza a través de ${topLabels.slice(0, 2).join(' y ')}. Hay suficiente terreno común para despertar curiosidad y explorar sin forzar una definición inmediata.`
        : `La curiosidad podría aparecer en ${topLabels[0]}, especialmente si ambos se permiten conocer lo distinto sin convertir la atracción en una promesa.`

  const likelyTension =
    weakest.score < 55
      ? `La tensión podría aparecer cuando haya que tomar decisiones relacionadas con ${weakest.label.toLowerCase()}. La diferencia no es menor: necesitaría hechos claros, no solo buena intención.`
      : `La tensión podría aparecer en los ritmos de ${weakest.label.toLowerCase()} y ${secondWeakest.label.toLowerCase()}. Una persona podría necesitar algo que la otra tarda más en ofrecer o expresar.`

  const relationalDynamic =
    totalScore >= 82
      ? 'La dinámica probable combina sensación de reconocimiento y suficiente diferencia para mantener curiosidad. El cuidado principal sería no acelerar la confianza solo porque el comienzo resulte fluido.'
      : totalScore >= 62
        ? 'Podría haber una alternancia entre cercanía y ajuste: momentos de encuentro claro seguidos de otros en los que cada persona necesite traducir mejor sus ritmos y expectativas.'
        : 'La dinámica podría sentirse estimulante al principio, pero exigir demasiada adaptación para sostenerse. Conviene observar si ambos pueden negociar las diferencias sin intentar cambiar al otro.'

  const relationshipLesson =
    candidate.priorities.includes('lifestyle') &&
    user.priorities.includes('lifeProject')
      ? `El encuentro con ${candidate.name} podría invitaros a distinguir libertad de distancia y compromiso de renuncia. Para que ambos pudierais elegir sin perderos, haría falta hablar con claridad sobre cuánto espacio necesita cada uno y qué presencia puede ofrecer de verdad.`
      : candidate.priorities.includes('availability') &&
          user.priorities.includes('availability')
        ? `Este encuentro podría recordaros que estar disponible no significa estar siempre de acuerdo ni responder de inmediato. Con ${candidate.name}, el aprendizaje estaría en cuidar la presencia sin convertirla en exigencia y en dejar que la confianza se demuestre con actos.`
        : totalScore >= 75
          ? `Más allá de la afinidad, este encuentro podría enseñaros a no confundir facilidad con conocimiento. Elegirse implicaría seguir mirando al otro como alguien libre, capaz de sorprender, poner límites y cambiar sin dejar de cuidar lo que construís.`
          : `Este encuentro podría ayudaros a reconocer que no toda atracción necesita convertirse en relación. Cuidar también puede significar ver la diferencia con honestidad, sin intentar poseer lo posible ni pedir al otro que encaje en una expectativa.`

  const depthReading =
    totalScore >= 80
      ? [
          `Hay una base especialmente sólida en ${topLabels.slice(0, 3).join(', ')}. Esto no significa que ambos respondan igual a todo, sino que parecen atribuir un valor parecido a aspectos que influyen en la vida cotidiana y en las decisiones importantes.`,
          `El punto que más cuidado pediría es ${weakest.label.toLowerCase()}. Si logran hablar de esta diferencia sin defenderse ni intentar resolverla demasiado rápido, podría convertirse en una zona de aprendizaje en lugar de desgaste.`,
          'Para que esta posibilidad se sostenga, la afinidad inicial tendría que convertirse en coherencia: tiempo ofrecido, curiosidad mutua, límites respetados y capacidad de volver a hablar cuando algo incomode.',
        ]
      : totalScore >= 60
        ? [
            `La relación podría apoyarse en ${topLabels.slice(0, 2).join(' y ')}, dos áreas capaces de crear reconocimiento y deseo de seguir conociéndose. Hay motivos reales para una conversación, aunque todavía no para asumir un horizonte compartido.`,
            `La diferencia en ${weakest.label.toLowerCase()} podría sentirse con más fuerza cuando aparezcan expectativas, distancia o decisiones concretas. No tendría por qué cerrar la posibilidad, pero sí exige nombrar necesidades antes de acumular interpretaciones.`,
            'Lo importante sería comprobar si ambos pueden hacer ajustes recíprocos sin que una sola persona cargue con toda la adaptación.',
          ]
        : [
            `Hay puntos de interés, sobre todo alrededor de ${topLabels[0]}, que podrían generar una conversación estimulante o una atracción inicial.`,
            `Sin embargo, las diferencias en ${weakest.label.toLowerCase()} y ${secondWeakest.label.toLowerCase()} afectan a la forma de imaginar y cuidar una relación. Es importante no confundir intensidad, novedad o curiosidad con capacidad de construir.`,
            'Si decidieran conocerse, convendría hacerlo sin expectativas anticipadas y observando si las diferencias pueden hablarse con respeto, no solo explicarse.',
          ]

  const observeSignals = [
    'Si existe coherencia entre lo que se expresa y lo que se hace con el tiempo.',
    'Si ambos respetan los ritmos del otro sin castigar la diferencia.',
    'Si una conversación difícil puede sostenerse sin desaparecer, perseguir ni retirar el cuidado.',
    'Si aparece curiosidad genuina por la otra persona y no solo atracción o proyección.',
    totalScore >= 75
      ? 'Si la facilidad inicial permite seguir haciendo preguntas en lugar de dar al otro por conocido.'
      : 'Si los ajustes y concesiones empiezan a ser recíprocos en lugar de recaer siempre en la misma persona.',
  ]

  const recommendation =
    totalScore >= 82
      ? 'Merece una conversación pausada. Hay base para explorar el encuentro sin acelerar la intimidad ni dar la sintonía por hecha.'
      : totalScore >= 62
        ? 'Puede ser valioso conocerse si ambos pueden hablar pronto sobre sus ritmos y expectativas. Observa los hechos, no solo la conexión.'
        : 'Conviene avanzar con cautela y sin intentar convertir la intensidad en capacidad de construir. Prioriza claridad sobre el proyecto y la disponibilidad.'

  return {
    candidateId: candidate.id,
    totalScore,
    categoryScores,
    strengths,
    risks,
    suggestedQuestions,
    recommendation,
    explanation,
    depthReading,
    relationalDynamic,
    likelyConnection,
    likelyTension,
    relationshipLesson,
    observeSignals,
    relationalRisk,
    longTermPotential,
  }
}
