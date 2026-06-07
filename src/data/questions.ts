import type {
  Question,
  QuestionCategory,
  StageAtmosphereName,
} from '../types'

export interface QuestionSection {
  id: QuestionCategory
  label: string
  title: string
  reflection: string
  description: string
  atmosphere: StageAtmosphereName
  nextLabel: string
}

export const questionSections: QuestionSection[] = [
  {
    id: 'basic',
    label: 'Identidad básica',
    title: 'Lo visible también ayuda a situarnos',
    reflection: 'Lo visible abre el recorrido, pero no lo agota.',
    description:
      'Empezamos por lo visible: los datos que permiten situarte. Esta parte no define quién eres, solo abre la primera puerta.',
    atmosphere: 'clear',
    nextLabel: 'Entrar en tu vida práctica',
  },
  {
    id: 'practicalLife',
    label: 'Vida práctica',
    title: 'La forma concreta que tiene tu día a día',
    reflection: 'El lugar concreto donde una relación tendría que poder vivir.',
    description:
      'Una relación también se construye en lo cotidiano: horarios, ciudad, estilo de vida, disponibilidad real y forma de habitar el día a día.',
    atmosphere: 'earth',
    nextLabel: 'Continuar hacia tu proyecto vital',
  },
  {
    id: 'lifeProject',
    label: 'Proyecto vital',
    title: 'La vida que quieres poder compartir',
    reflection: 'Una relación también es una dirección elegida entre dos.',
    description:
      'Amar también implica mirar hacia dónde camina cada persona. No basta con gustarse: hace falta saber si se quiere construir en direcciones que puedan convivir.',
    atmosphere: 'structure',
    nextLabel: 'Abrir la sala de tus valores',
  },
  {
    id: 'values',
    label: 'Valores y visión del amor',
    title: 'Los principios desde los que eliges',
    reflection: 'Lo que permanece cuando la intensidad cambia.',
    description:
      'A veces dos personas se desean, pero no entienden el amor de la misma manera. Aquí miramos qué principios sostienen tu forma de elegir.',
    atmosphere: 'depth',
    nextLabel: 'Continuar hacia el mapa emocional',
  },
  {
    id: 'emotionalStyle',
    label: 'Estilo emocional',
    title: 'Cómo te mueves cuando alguien empieza a importarte',
    reflection: 'Donde cercanía y protección empiezan a encontrarse.',
    description:
      'No todos nos movemos igual cuando alguien empieza a importarnos. Algunas personas buscan claridad. Otras necesitan espacio. Otras se protegen antes de abrirse.',
    atmosphere: 'warm',
    nextLabel: 'Entrar en cómo atraviesas el conflicto',
  },
  {
    id: 'communication',
    label: 'Comunicación y conflicto',
    title: 'Lo que ocurre cuando estar de acuerdo ya no es posible',
    reflection: 'No se trata de no romperse, sino de aprender a reparar.',
    description:
      'Una relación no se revela solo cuando todo va bien. También aparece en cómo se habla, se discute, se repara y se vuelve a mirar al otro después de una tensión.',
    atmosphere: 'honest',
    nextLabel: 'Continuar hacia la intimidad',
  },
  {
    id: 'intimacy',
    label: 'Intimidad y afecto',
    title: 'Las formas en las que permites que alguien se acerque',
    reflection: 'La cercanía también tiene un ritmo, un lenguaje y unos límites.',
    description:
      'El deseo, la ternura y el contacto también forman parte del vínculo. Esta sección no busca invadir, sino entender cómo vives la cercanía.',
    atmosphere: 'delicate',
    nextLabel: 'Abrir la sala de tu historia relacional',
  },
  {
    id: 'patterns',
    label: 'Historia relacional y patrones',
    title: 'Lo que no quieres seguir repitiendo sin darte cuenta',
    reflection: 'Mirar lo vivido no obliga a quedarse dentro de ello.',
    description:
      'No se trata de exponer heridas, sino de reconocer qué patrones se repiten y qué partes de ti necesitan ser cuidadas con más conciencia.',
    atmosphere: 'silent',
    nextLabel: 'Continuar hacia tu mundo interior',
  },
  {
    id: 'innerWorld',
    label: 'Anhelos y mundo interior',
    title: 'La parte de ti que espera poder ser compartida',
    reflection: 'A veces lo más importante es también lo más difícil de nombrar.',
    description:
      'Lo que anhelamos en el amor dice mucho de lo que buscamos construir, pero también de lo que alguna vez sentimos que nos faltó.',
    atmosphere: 'poetic',
    nextLabel: 'Entrar en tu disponibilidad actual',
  },
  {
    id: 'availability',
    label: 'Disponibilidad relacional',
    title: 'El espacio que hoy puedes ofrecer de verdad',
    reflection: 'Desear una relación y poder cuidarla no siempre son lo mismo.',
    description:
      'Desear una relación no siempre significa estar disponible para sostenerla. Mirarlo con honestidad también es una forma de cuidado.',
    atmosphere: 'mature',
    nextLabel: 'Abrir la dimensión simbólica',
  },
]

export const questions: Question[] = [
  {
    id: 'basic-name',
    category: 'basic',
    prompt: '¿Cómo te gustaría que te llamáramos?',
    type: 'text',
  },
  {
    id: 'basic-age',
    category: 'basic',
    prompt: '¿Qué edad tienes?',
    type: 'text',
  },
  {
    id: 'basic-city',
    category: 'basic',
    prompt: '¿En qué ciudad vives actualmente?',
    type: 'text',
  },
  {
    id: 'basic-identity',
    category: 'basic',
    prompt: '¿Cómo describes tu identidad de género?',
    type: 'single',
    options: [
      'Mujer',
      'Hombre',
      'Persona no binaria',
      'Prefiero describirlo con mis propias palabras',
      'Prefiero no indicarlo ahora',
    ],
  },
  {
    id: 'basic-meet',
    category: 'basic',
    prompt: '¿A quién te gustaría conocer?',
    type: 'multiple',
    options: [
      'Mujeres',
      'Hombres',
      'Personas no binarias',
      'La identidad de género no es un criterio principal para mí',
    ],
  },
  {
    id: 'basic-intention',
    category: 'basic',
    prompt: '¿Qué tipo de relación estás buscando realmente?',
    helper: 'No hace falta que suene perfecto. Basta con que se parezca a tu verdad.',
    type: 'text',
  },
  {
    id: 'basic-moment',
    category: 'practicalLife',
    prompt: '¿Cómo describirías el momento vital en el que estás?',
    type: 'single',
    options: [
      'Con estabilidad y ganas de compartir',
      'En transición, pero con espacio emocional',
      'Reordenando prioridades importantes',
      'Explorando, pero dispuesto/a a observar qué puedo sostener',
    ],
  },
  {
    id: 'basic-time',
    category: 'practicalLife',
    prompt: '¿Cuánto espacio concreto tienes hoy para cuidar una relación?',
    type: 'scale',
    scaleLabels: ['Muy poco ahora', 'Es una prioridad real'],
  },
  {
    id: 'basic-pace',
    category: 'practicalLife',
    prompt: '¿A qué ritmo te gustaría conocer a alguien?',
    type: 'single',
    options: [
      'Despacio, dejando que la confianza crezca',
      'Con intención clara desde el principio',
      'Con calma al principio y más presencia si hay reciprocidad',
      'Con tiempo frecuente para conocernos de verdad',
    ],
  },
  {
    id: 'basic-completion',
    category: 'practicalLife',
    prompt: 'Completa esta frase sin pensarlo demasiado.',
    type: 'sentence',
    sentenceStart: 'Ahora mismo, compartir mi vida con alguien significaría...',
  },
  {
    id: 'practical-rhythm',
    category: 'practicalLife',
    prompt: '¿Qué ritmo describe mejor tu vida cotidiana?',
    type: 'single',
    options: [
      'Estable y previsible la mayor parte del tiempo',
      'Intenso, pero puedo reservar espacio con intención',
      'Cambiante; necesito planificar para estar presente',
      'Flexible y con bastante disponibilidad espontánea',
    ],
  },
  {
    id: 'practical-mobility',
    category: 'practicalLife',
    prompt: '¿Qué margen tienes para integrar a alguien en tu forma de vivir?',
    type: 'single',
    options: [
      'Busco a alguien cerca y con una rutina compatible',
      'Puedo desplazarme y reorganizar parte de mi semana',
      'Aceptaría cierta distancia si existe un plan para acercarnos',
      'Mi vida actual deja poco margen para grandes cambios',
    ],
  },

  {
    id: 'life-place',
    category: 'lifeProject',
    prompt: '¿Qué lugar quieres que ocupe una relación en tu vida durante los próximos años?',
    type: 'single',
    options: [
      'Un proyecto central que cuidar',
      'Una parte importante junto a otros proyectos',
      'Una compañía estable con mucha autonomía',
      'Todavía no tengo definida la forma, pero necesito intención y continuidad',
    ],
  },
  {
    id: 'life-build',
    category: 'lifeProject',
    prompt: '¿Qué estás dispuesto/a a construir, no solo a recibir?',
    type: 'multiple',
    options: [
      'Acuerdos cotidianos',
      'Un hogar compartido',
      'Seguridad emocional',
      'Proyectos comunes',
      'Una red de cuidados',
      'Tiempo de calidad sostenido',
    ],
  },
  {
    id: 'life-future',
    category: 'lifeProject',
    prompt: '¿Qué tendría que pasar para que sintieras que una relación tiene futuro?',
    type: 'text',
  },
  {
    id: 'life-protect',
    category: 'lifeProject',
    prompt: '¿Qué parte de tu vida no estás dispuesto/a a sacrificar por una pareja?',
    type: 'text',
  },
  {
    id: 'life-family',
    category: 'lifeProject',
    prompt: '¿Qué lugar ocupa formar una familia en tu proyecto?',
    type: 'single',
    options: [
      'Es un deseo importante',
      'Estoy abierto/a, pero no es imprescindible',
      'Prefiero una vida sin hijos',
      'Todavía no lo tengo claro; necesito pensar qué vida quiero sostener',
    ],
  },
  {
    id: 'life-commitment',
    category: 'lifeProject',
    prompt: '¿Qué expresa mejor lo que significa comprometerte?',
    type: 'single',
    options: [
      'Elegir cuidar la relación incluso cuando baja la intensidad',
      'Construir un proyecto común sin perder la libertad individual',
      'Estar presente de forma coherente, no solo cuando apetece',
      'Dar seguridad emocional con hechos, no solo palabras',
      'Avanzar despacio, pero con una intención clara',
    ],
  },

  {
    id: 'values-fidelity',
    category: 'values',
    prompt: '¿Qué significa para ti la fidelidad más allá de la exclusividad física?',
    type: 'text',
  },
  {
    id: 'values-core',
    category: 'values',
    prompt: '¿Qué valor no podrías negociar en una relación?',
    type: 'single',
    options: [
      'Honestidad',
      'Lealtad',
      'Libertad',
      'Cuidado',
      'Responsabilidad afectiva',
      'Respeto',
    ],
  },
  {
    id: 'values-honesty',
    category: 'values',
    prompt: '¿Qué entiendes por honestidad cuando la verdad puede incomodar?',
    type: 'single',
    options: [
      'Decirla con cuidado, aunque sea difícil',
      'Esperar al momento en que pueda escucharse',
      'Proteger algunas cosas para no hacer daño',
      'Necesito tiempo para saber qué es verdad para mí',
    ],
  },
  {
    id: 'values-freedom',
    category: 'values',
    prompt: '¿Qué lugar ocupa la libertad individual dentro de una pareja?',
    type: 'single',
    options: [
      'Es imprescindible conservar espacios propios',
      'Quiero mucha cercanía, pero sin sensación de control',
      'La libertad debe convivir con acuerdos claros',
      'Me cuesta equilibrar libertad y seguridad emocional',
      'Necesito sentir que elegir a alguien no significa perderme',
    ],
  },
  {
    id: 'values-consistency',
    category: 'values',
    prompt: '¿Cuánto necesitas que las palabras y los actos coincidan?',
    type: 'scale',
    scaleLabels: ['Puedo tolerar matices', 'Es esencial para confiar'],
  },
  {
    id: 'values-completion',
    category: 'values',
    prompt: 'Completa esta frase desde la experiencia.',
    type: 'sentence',
    sentenceStart: 'Pierdo la confianza cuando...',
  },

  {
    id: 'emotional-first-fear',
    category: 'emotionalStyle',
    prompt: 'Cuando alguien te importa mucho, ¿qué miedo aparece primero?',
    type: 'single',
    options: [
      'Que deje de elegirme',
      'Perder mi espacio o mi identidad',
      'No ser suficiente',
      'Depender demasiado',
      'Que la relación no sea clara',
    ],
  },
  {
    id: 'emotional-distance',
    category: 'emotionalStyle',
    prompt: 'Cuando sientes que alguien se aleja, normalmente...',
    type: 'single',
    options: [
      'Busco hablarlo cuanto antes para recuperar claridad',
      'Me pongo en alerta y necesito señales de claridad',
      'Me cierro y espero a ver qué hace la otra persona',
      'Intento actuar con normalidad, pero por dentro me afecta',
      'Me alejo antes de sentirme rechazado/a',
    ],
    nuancePrompt:
      'Matiza tu respuesta en una frase. ¿Qué suele hacer que reacciones así?',
  },
  {
    id: 'emotional-closeness',
    category: 'emotionalStyle',
    prompt: '¿Qué haces cuando alguien se acerca demasiado?',
    type: 'single',
    options: [
      'Disfruto la cercanía y puedo seguir nombrando mis límites',
      'Necesito recuperar espacio para no sentirme absorbido/a',
      'Empiezo a buscar defectos o dudas para bajar la intensidad',
      'Me adapto aunque me sature y tardo en decirlo',
      'Al principio observo; con coherencia me permito acercarme',
    ],
  },
  {
    id: 'emotional-opening',
    category: 'emotionalStyle',
    prompt: '¿Qué necesitas para abrirte sin sentir que pierdes el control?',
    type: 'multiple',
    options: [
      'Tiempo',
      'Coherencia',
      'Palabras claras',
      'Respeto por mis límites',
      'Reciprocidad',
      'Poder avanzar poco a poco',
    ],
  },
  {
    id: 'emotional-vulnerability',
    category: 'emotionalStyle',
    prompt: '¿Cómo de fácil te resulta mostrar una necesidad sin sentirte débil?',
    type: 'scale',
    scaleLabels: ['Me cuesta mucho', 'Puedo hacerlo con calma'],
  },
  {
    id: 'emotional-completion',
    category: 'emotionalStyle',
    prompt: 'Termina la frase sin corregir lo primero que aparezca.',
    type: 'sentence',
    sentenceStart: 'Cuando temo perder a alguien, suelo...',
  },

  {
    id: 'communication-tension',
    category: 'communication',
    prompt: 'Cuando hay tensión en una relación, tiendes a...',
    type: 'single',
    options: [
      'Hablarlo cuanto antes para recuperar claridad',
      'Necesitar un tiempo antes de poder hablar bien',
      'Callarme para evitar empeorar la situación',
      'Insistir demasiado cuando siento incertidumbre',
      'Desconectarme emocionalmente hasta sentirme seguro/a',
    ],
  },
  {
    id: 'communication-recognize',
    category: 'communication',
    prompt: '¿Qué te cuesta reconocer en una discusión?',
    type: 'text',
  },
  {
    id: 'communication-apology',
    category: 'communication',
    prompt: '¿Qué necesitas para poder pedir perdón de verdad?',
    type: 'multiple',
    options: [
      'Entender el impacto que causé',
      'Sentirme escuchado/a también',
      'Bajar la intensidad',
      'No sentirme humillado/a',
      'Ver una forma concreta de reparar',
    ],
  },
  {
    id: 'communication-unsafe',
    category: 'communication',
    prompt: '¿Qué tipo de discusión te hace sentir inseguro/a?',
    type: 'multiple',
    options: [
      'El silencio prolongado',
      'Los gritos o el desprecio',
      'Las amenazas de ruptura',
      'Que se niegue lo ocurrido',
      'Sentir que no puedo retirarme un momento',
    ],
  },
  {
    id: 'communication-direct',
    category: 'communication',
    prompt: '¿Puedes decir algo incómodo sin retirar el afecto ni castigar?',
    type: 'scale',
    scaleLabels: ['Me cuesta sostenerlo', 'Sí, con respeto'],
  },
  {
    id: 'communication-completion',
    category: 'communication',
    prompt: 'Completa esta frase pensando en una reparación posible.',
    type: 'sentence',
    sentenceStart: 'Después de una discusión, necesito...',
  },

  {
    id: 'intimacy-difference',
    category: 'intimacy',
    prompt: '¿Qué diferencia hay para ti entre deseo, ternura y compromiso?',
    type: 'text',
  },
  {
    id: 'intimacy-desired',
    category: 'intimacy',
    prompt: '¿Qué necesitas para sentirte deseado/a sin sentirte usado/a?',
    type: 'multiple',
    options: [
      'Interés por mi mundo',
      'Ternura fuera de lo sexual',
      'Palabras claras',
      'Reciprocidad',
      'Respeto por mis ritmos',
    ],
  },
  {
    id: 'intimacy-touch',
    category: 'intimacy',
    prompt: '¿Qué lugar ocupa el contacto físico en tu forma de amar?',
    type: 'scale',
    scaleLabels: ['Es secundario', 'Es una expresión central'],
  },
  {
    id: 'intimacy-trust',
    category: 'intimacy',
    prompt: '¿Qué te ayuda a sentir confianza en la intimidad?',
    type: 'text',
  },
  {
    id: 'intimacy-space',
    category: 'intimacy',
    prompt: '¿Cuánto espacio individual necesitas dentro de una relación?',
    type: 'scale',
    scaleLabels: ['Prefiero mucha unión', 'Necesito mucha autonomía'],
  },
  {
    id: 'intimacy-completion',
    category: 'intimacy',
    prompt: 'Completa la frase desde lo que te hace sentir cuidado/a.',
    type: 'sentence',
    sentenceStart: 'La cercanía se vuelve segura cuando...',
  },

  {
    id: 'patterns-repeat',
    category: 'patterns',
    prompt: '¿Qué patrón sientes que se ha repetido en tus relaciones anteriores?',
    type: 'text',
  },
  {
    id: 'patterns-attraction',
    category: 'patterns',
    prompt: '¿Qué tipo de persona suele atraerte aunque no siempre te haga bien?',
    type: 'text',
  },
  {
    id: 'patterns-hidden',
    category: 'patterns',
    prompt: '¿Qué parte de ti sueles esconder al principio de una relación?',
    type: 'text',
  },
  {
    id: 'patterns-wound',
    category: 'patterns',
    prompt: '¿Qué herida tuya no quieres que tu pareja cargue, pero sí debería conocer?',
    type: 'text',
  },
  {
    id: 'patterns-trigger',
    category: 'patterns',
    prompt: '¿Qué situación activa más tu necesidad de protegerte?',
    type: 'single',
    options: [
      'La ambigüedad',
      'La distancia emocional',
      'La crítica',
      'Sentirme invadido/a',
      'La falta de reciprocidad',
    ],
    nuancePrompt:
      'Matiza tu respuesta en una frase. ¿Qué sueles hacer cuando esto ocurre?',
  },
  {
    id: 'patterns-awareness',
    category: 'patterns',
    prompt: '¿Cuánto reconoces tus propios patrones mientras están ocurriendo?',
    type: 'scale',
    scaleLabels: ['Los veo después', 'Los identifico a tiempo'],
  },

  {
    id: 'inner-home',
    category: 'innerWorld',
    prompt: '¿Qué tendría que pasar para que sintieras que una relación es hogar?',
    type: 'text',
  },
  {
    id: 'inner-love',
    category: 'innerWorld',
    prompt: '¿Qué tipo de amor estás buscando realmente?',
    type: 'text',
  },
  {
    id: 'inner-chosen',
    category: 'innerWorld',
    prompt: '¿Qué necesitas para sentirte elegido/a?',
    type: 'multiple',
    options: [
      'Presencia consistente',
      'Palabras claras',
      'Deseo y contacto',
      'Planes compartidos',
      'Detalles cotidianos',
      'Curiosidad por quién soy',
    ],
    nuancePrompt:
      'Matiza tu respuesta en una frase. ¿Cómo notas que alguien te elige sin dejar de ser libre?',
  },
  {
    id: 'inner-show',
    category: 'innerWorld',
    prompt: '¿Qué parte de ti deseas poder mostrar sin miedo?',
    type: 'text',
  },
  {
    id: 'inner-depth',
    category: 'innerWorld',
    prompt: '¿Qué lugar ocupan las conversaciones íntimas en tu día a día?',
    type: 'scale',
    scaleLabels: ['Ocasional', 'Fundamental'],
  },
  {
    id: 'inner-completion',
    category: 'innerWorld',
    prompt: 'Completa la frase pensando en aquello que aún no has encontrado.',
    type: 'sentence',
    sentenceStart: 'Me sentiría verdaderamente acompañado/a si...',
  },

  {
    id: 'availability-carence',
    category: 'availability',
    prompt: '¿Qué describe mejor lo que te mueve a buscar una relación ahora?',
    type: 'single',
    options: [
      'Quiero compartir una vida que ya tiene sentido',
      'Echo de menos intimidad y compañía',
      'Quiero dejar atrás una etapa de soledad',
      'Busco sentirme elegido/a',
      'Todavía no distingo bien entre deseo de relación y necesidad de compañía',
    ],
    nuancePrompt:
      'Matiza tu respuesta en una frase. ¿Qué puedes ofrecer hoy, además de lo que deseas recibir?',
  },
  {
    id: 'availability-space',
    category: 'availability',
    prompt: '¿Qué espacio real tienes ahora mismo para cuidar una relación?',
    type: 'scale',
    scaleLabels: ['Muy limitado', 'Amplio y sostenible'],
  },
  {
    id: 'availability-change',
    category: 'availability',
    prompt: '¿Qué tendría que cambiar en ti para poder sostener una relación sana?',
    type: 'text',
  },
  {
    id: 'availability-seen',
    category: 'availability',
    prompt: '¿Estás dispuesto/a a ser visto/a con honestidad por otra persona?',
    type: 'scale',
    scaleLabels: ['Todavía me protejo mucho', 'Sí, incluso con incomodidad'],
  },
  {
    id: 'availability-past',
    category: 'availability',
    prompt: '¿Cuánto espacio emocional ocupa todavía una relación pasada?',
    type: 'scale',
    scaleLabels: ['Ocupa mucho', 'Está suficientemente integrada'],
  },
  {
    id: 'availability-completion',
    category: 'availability',
    prompt: 'Completa esta frase con una acción concreta.',
    type: 'sentence',
    sentenceStart: 'Para cuidar una relación, hoy sí puedo ofrecer...',
  },
]

export const questionsBySection = questionSections.map((section) => ({
  ...section,
  questions: questions.filter((question) => question.category === section.id),
}))
