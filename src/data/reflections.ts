import type { QuestionCategory } from '../types'

export const reflections = [
  'Amar no es poseer, exigir ni reclamar. Es poder mirar al otro como alguien libre.',
  'No buscamos a alguien que tape una carencia, sino a alguien con quien poder estar presentes.',
  'Una relación no empieza cuando alguien encaja en tus filtros, sino cuando dos personas pueden verse con honestidad.',
  'La compatibilidad no consiste en ser iguales, sino en poder cuidar lo que aparece entre dos.',
  'A veces no buscamos amor: buscamos calma, validación o refugio. Distinguirlo ya es una forma de empezar.',
  'El vínculo no se fuerza. Se reconoce, se cuida y se construye lentamente.',
  'Querer a alguien no debería significar perderse a uno mismo.',
  'La profundidad no está en contarlo todo de golpe, sino en poder abrirse sin actuar un personaje.',
  'No toda atracción merece ser seguida. No toda calma debe confundirse con falta de deseo.',
  'Elegir a alguien también implica mirar qué parte de nosotros se activa ante esa persona.',
] as const

export const onboardingReflections: Partial<
  Record<QuestionCategory, { text: string; context: string }>
> = {
  emotionalStyle: {
    text: 'Lo que hacemos cuando alguien nos importa suele revelar tanto nuestro deseo de amar como nuestra forma de protegernos.',
    context: 'Pausa antes de responder',
  },
  patterns: {
    text: 'No se trata de exponer tus heridas, sino de reconocer qué partes de ti necesitan ser cuidadas con más conciencia.',
    context: 'Una mirada sin juicio',
  },
  innerWorld: {
    text: 'Lo que anhelamos en el amor habla de aquello que nos faltó, pero también de lo que hoy podemos aprender a construir.',
    context: 'Escucha lo que hay debajo del deseo',
  },
  availability: {
    text: 'Desear una relación no siempre significa estar disponible para sostenerla. Mirarlo con honestidad también es una forma de cuidado.',
    context: 'Honestidad antes que exigencia',
  },
}
