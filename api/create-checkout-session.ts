import Stripe from 'stripe'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const appUrl = (process.env.VITE_APP_URL ?? 'http://localhost:5173').replace(
  /\/$/,
  '',
)

const serverProducts = {
  mapa_completo: {
    name: 'Mapa completo',
    amount: 999,
    currency: 'eur',
    description: 'Mapa relacional completo y lectura profunda.',
  },
  busqueda_compatible: {
    name: 'Búsqueda compatible',
    amount: 2999,
    currency: 'eur',
    description:
      'Mapa completo y hasta 30 perfiles compatibles durante 30 días.',
  },
  busqueda_profunda: {
    name: 'Búsqueda profunda',
    amount: 5999,
    currency: 'eur',
    description:
      'Búsqueda avanzada con hasta 50 perfiles compatibles durante 60 días.',
  },
  ampliacion_50: {
    name: 'Ampliar 50 perfiles',
    amount: 1499,
    currency: 'eur',
    description:
      'Ampliación de búsqueda con hasta 50 perfiles adicionales.',
  },
  informe_profundo: {
    name: 'Informe profundo individual',
    amount: 499,
    currency: 'eur',
    description:
      'Informe profundo de compatibilidad con una persona concreta.',
  },
  rehacer_mapa: {
    name: 'Rehacer mi mapa',
    amount: 999,
    currency: 'eur',
    description: 'Actualización completa del mapa relacional.',
  },
} as const

type ServerProductId = keyof typeof serverProducts

function isServerProductId(value: unknown): value is ServerProductId {
  return typeof value === 'string' && value in serverProducts
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const productId = req.body?.productId

  if (!isServerProductId(productId)) {
    return res.status(400).json({ error: 'Invalid productId' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Missing STRIPE_SECRET_KEY' })
  }

  const product = serverProducts[productId]
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      billing_address_collection: 'auto',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.amount,
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
        },
      ],
      metadata: {
        productId,
      },
      success_url: `${appUrl}/payment-success?product=${productId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payment-cancel?product=${productId}`,
    })

    // TODO producción: activar productos solo con Stripe webhook y base de datos.
    // No confiar en query params para conceder acceso real.
    return res.status(200).json({ url: session.url })
  } catch {
    return res
      .status(500)
      .json({ error: 'No se pudo crear la sesión de pago' })
  }
}
