import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import {
  addonProducts,
  mainProducts,
  type Product,
  type ProductId,
} from '../data/products'
import { startCheckout } from '../utils/payments'

interface PricingPageProps {
  onStartFree: () => void
}

const ethicalPrinciples = [
  'Sin boosts de visibilidad',
  'Sin pagar para aparecer por encima de otros',
  'Sin likes infinitos',
  'Sin ocultar compatibilidades para forzar pago',
  'Sin venta de datos íntimos',
]

export function PricingPage({ onStartFree }: PricingPageProps) {
  const [loadingProductId, setLoadingProductId] =
    useState<ProductId | null>(null)
  const [error, setError] = useState('')

  const buyProduct = async (product: Product) => {
    setLoadingProductId(product.id)
    setError('')

    try {
      await startCheckout(product.id)
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'No se pudo iniciar el pago',
      )
      setLoadingProductId(null)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:px-10">
      <header className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">Pago único · Sin suscripción</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-forest sm:text-6xl">
          Procesos de compatibilidad
        </h1>
        <p className="mx-auto mt-6 max-w-3xl font-serif text-2xl leading-9 text-ink">
          No cobramos para mantenerte deslizando. Cobramos por construir una
          búsqueda seria.
        </p>
        <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted">
          Real Linkings funciona como un proceso de compatibilidad, no como un
          catálogo infinito. Construyes tu mapa relacional, recibes una lectura
          y accedes a una selección limitada de personas con las que merece la
          pena mirar con más atención.
        </p>
      </header>

      {error && (
        <div
          role="alert"
          className="mx-auto mt-8 max-w-3xl rounded-2xl border border-clay/35 bg-clay/8 px-5 py-4 text-sm text-clay"
        >
          {error}
        </div>
      )}

      <section className="mt-12 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="flex h-full flex-col p-7">
          <p className="eyebrow">Para empezar</p>
          <h2 className="mt-4 font-serif text-3xl text-forest">Mapa inicial</h2>
          <p className="mt-3 font-serif text-4xl text-forest">Gratis</p>
          <p className="mt-5 min-h-20 text-sm leading-6 text-muted">
            Construye una primera lectura y entiende cómo funciona tu mapa
            antes de elegir un proceso.
          </p>
          <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6 text-sm text-ink">
            {[
              'Cuestionario relacional',
              'Lectura inicial del mapa',
              'Tres posibilidades de muestra',
            ].map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className="text-moss">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <Button
            variant="secondary"
            fullWidth
            className="mt-8"
            onClick={onStartFree}
          >
            Empezar gratis
          </Button>
        </Card>

        {mainProducts.map((product) => (
          <Card
            key={product.id}
            tone={product.recommended ? 'forest' : 'paper'}
            className={`relative flex h-full flex-col p-7 ${
              product.recommended
                ? 'ring-4 ring-[#b8d5ff]/45'
                : ''
            }`}
          >
            {product.recommended && (
              <span className="absolute right-5 top-5 rounded-full bg-[#dfeeff] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-forest">
                Recomendado
              </span>
            )}
            <p
              className={`eyebrow ${
                product.recommended ? '!text-[#b8d5ff]' : ''
              }`}
            >
              Pago único
            </p>
            <h2 className="mt-4 max-w-[13rem] font-serif text-3xl">
              {product.name}
            </h2>
            <p
              className={`mt-3 font-serif text-4xl ${
                product.recommended ? 'text-paper' : 'text-forest'
              }`}
            >
              {product.priceLabel}
            </p>
            <p
              className={`mt-5 min-h-20 text-sm leading-6 ${
                product.recommended ? 'text-paper/65' : 'text-muted'
              }`}
            >
              {product.description}
            </p>
            <ul
              className={`mt-6 flex-1 space-y-3 border-t pt-6 text-sm ${
                product.recommended
                  ? 'border-white/12 text-paper/82'
                  : 'border-line text-ink'
              }`}
            >
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span
                    className={
                      product.recommended ? 'text-[#b8d5ff]' : 'text-moss'
                    }
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={product.recommended ? 'secondary' : 'primary'}
              fullWidth
              className={`mt-8 ${
                product.recommended
                  ? '!border-white/20 !bg-white/92 hover:!bg-white'
                  : ''
              }`}
              disabled={loadingProductId !== null}
              onClick={() => buyProduct(product)}
            >
              {loadingProductId === product.id
                ? 'Abriendo Stripe…'
                : product.cta}
            </Button>
          </Card>
        ))}
      </section>

      <section className="mt-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Para procesos ya iniciados</p>
          <h2 className="mt-3 font-serif text-4xl text-forest">
            Ampliaciones puntuales
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Añade profundidad o actualiza tu proceso sin convertirlo en una
            cuota recurrente.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {addonProducts.map((product) => (
            <Card key={product.id} className="flex flex-col p-7">
              <div className="flex items-start justify-between gap-5">
                <h3 className="font-serif text-2xl text-forest">
                  {product.name}
                </h3>
                <span className="shrink-0 font-serif text-2xl text-clay">
                  {product.priceLabel}
                </span>
              </div>
              <p className="mt-4 flex-1 text-sm leading-6 text-muted">
                {product.description}
              </p>
              <Button
                variant="secondary"
                fullWidth
                className="mt-7"
                disabled={loadingProductId !== null}
                onClick={() => buyProduct(product)}
              >
                {loadingProductId === product.id
                  ? 'Abriendo Stripe…'
                  : product.cta}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <Card tone="forest" className="grid gap-10 p-8 lg:grid-cols-2 lg:p-11">
          <div>
            <p className="eyebrow !text-[#b8d5ff]">
              Un modelo distinto al swipe infinito
            </p>
            <h2 className="mt-4 font-serif text-4xl">
              Pagas por un proceso definido, no por permanecer atrapado.
            </h2>
          </div>
          <div>
            <ul className="grid gap-3 text-sm text-paper/78 sm:grid-cols-2">
              {ethicalPrinciples.map((principle) => (
                <li
                  key={principle}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  {principle}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-5 text-paper/55">
              Los pagos se procesan mediante Stripe. Real Linkings no almacena
              datos de tarjeta.
            </p>
            <p className="mt-3 text-xs leading-5 text-paper/55">
              En esta fase del prototipo, los productos comprados se simulan
              localmente después del pago. En producción, la activación se
              validará mediante webhook y cuenta de usuario.
            </p>
          </div>
        </Card>
      </section>
    </div>
  )
}
