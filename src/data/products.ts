export type ProductId =
  | 'mapa_completo'
  | 'busqueda_compatible'
  | 'busqueda_profunda'
  | 'ampliacion_50'
  | 'informe_profundo'
  | 'rehacer_mapa'

export interface Product {
  id: ProductId
  name: string
  priceLabel: string
  amount: number
  currency: 'eur'
  description: string
  features: string[]
  cta: string
  recommended?: boolean
  category: 'main' | 'addon'
}

export const products: Product[] = [
  {
    id: 'mapa_completo',
    name: 'Mapa completo',
    priceLabel: '9,99 €',
    amount: 999,
    currency: 'eur',
    description:
      'Mapa relacional completo y lectura profunda por dimensiones.',
    features: [
      'Mapa relacional completo',
      'Lectura profunda por dimensiones',
      'Dimensión simbólica opcional',
      'Preguntas de autoconocimiento',
      'Acceso de por vida al mapa generado',
    ],
    cta: 'Comprar mapa completo',
    category: 'main',
  },
  {
    id: 'busqueda_compatible',
    name: 'Búsqueda compatible',
    priceLabel: '29,99 €',
    amount: 2999,
    currency: 'eur',
    description:
      'Mapa completo y hasta 30 perfiles compatibles durante 30 días.',
    features: [
      'Mapa relacional completo',
      'Hasta 30 perfiles compatibles',
      '30 días de búsqueda activa',
      'Informes resumidos de compatibilidad',
      'Preguntas sugeridas para iniciar conversación',
      'Posibilidad de editar el mapa una vez',
    ],
    cta: 'Iniciar búsqueda compatible',
    recommended: true,
    category: 'main',
  },
  {
    id: 'busqueda_profunda',
    name: 'Búsqueda profunda',
    priceLabel: '59,99 €',
    amount: 5999,
    currency: 'eur',
    description:
      'Búsqueda avanzada con hasta 50 perfiles compatibles durante 60 días.',
    features: [
      'Mapa relacional avanzado',
      'Hasta 50 perfiles compatibles',
      '60 días de búsqueda activa',
      'Informes completos de los mejores perfiles',
      'Lectura de fortalezas, tensiones y señales a observar',
      'Descuento futuro en expertos',
    ],
    cta: 'Elegir búsqueda profunda',
    category: 'main',
  },
  {
    id: 'ampliacion_50',
    name: 'Ampliar 50 perfiles',
    priceLabel: '14,99 €',
    amount: 1499,
    currency: 'eur',
    description:
      'Ampliación de búsqueda con hasta 50 perfiles adicionales.',
    features: [
      'Hasta 50 perfiles adicionales',
      'Mantiene el contexto de tu búsqueda activa',
    ],
    cta: 'Ampliar búsqueda',
    category: 'addon',
  },
  {
    id: 'informe_profundo',
    name: 'Informe profundo individual',
    priceLabel: '4,99 €',
    amount: 499,
    currency: 'eur',
    description:
      'Informe profundo de compatibilidad con una persona concreta.',
    features: [
      'Lectura de fortalezas y tensiones',
      'Preguntas y señales para observar',
    ],
    cta: 'Generar informe profundo',
    category: 'addon',
  },
  {
    id: 'rehacer_mapa',
    name: 'Rehacer mi mapa',
    priceLabel: '9,99 €',
    amount: 999,
    currency: 'eur',
    description: 'Actualización completa del mapa relacional.',
    features: [
      'Nueva lectura completa',
      'Actualización de todas las dimensiones',
    ],
    cta: 'Rehacer mapa',
    category: 'addon',
  },
]

export function getProductById(productId: string): Product | undefined {
  return products.find((product) => product.id === productId)
}

export const mainProducts = products.filter(
  (product) => product.category === 'main',
)

export const addonProducts = products.filter(
  (product) => product.category === 'addon',
)
