import type { ProductId } from '../data/products'

export async function startCheckout(productId: ProductId) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.error ?? 'No se pudo iniciar el pago')
  }

  const data = await response.json()

  if (!data.url) {
    throw new Error('Stripe no devolvió una URL de pago')
  }

  window.location.href = data.url
}
