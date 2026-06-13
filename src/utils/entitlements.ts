import { getProductById, type ProductId } from '../data/products'

const STORAGE_KEY = 'realLinkingsPurchasedProducts'

// Prototipo: derechos simulados en localStorage.
// Producción: validar compras con webhook Stripe + backend + usuario.
export function getPurchasedProducts(): ProductId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)

    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (productId): productId is ProductId =>
        typeof productId === 'string' &&
        getProductById(productId) !== undefined,
    )
  } catch {
    return []
  }
}

export function addPurchasedProduct(productId: ProductId) {
  const current = getPurchasedProducts()
  if (!current.includes(productId)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, productId]))
  }
}

export function hasPurchased(productId: ProductId) {
  return getPurchasedProducts().includes(productId)
}

export type AccessLevel =
  | 'free'
  | 'mapa_completo'
  | 'busqueda_compatible'
  | 'busqueda_profunda'

export function getCurrentAccessLevel(): AccessLevel {
  const products = getPurchasedProducts()

  if (products.includes('busqueda_profunda')) return 'busqueda_profunda'
  if (products.includes('busqueda_compatible')) return 'busqueda_compatible'
  if (products.includes('mapa_completo')) return 'mapa_completo'

  return 'free'
}
