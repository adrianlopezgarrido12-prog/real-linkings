import { useEffect } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { getProductById } from '../data/products'
import { addPurchasedProduct } from '../utils/entitlements'

interface PaymentSuccessPageProps {
  onGoDashboard: () => void
  onContinueMap: () => void
}

export function PaymentSuccessPage({
  onGoDashboard,
  onContinueMap,
}: PaymentSuccessPageProps) {
  const productId =
    new URLSearchParams(window.location.search).get('product') ?? ''
  const product = getProductById(productId)

  useEffect(() => {
    if (product) {
      addPurchasedProduct(product.id)
    }
  }, [product])

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-5 py-12 sm:px-8">
      <Card className="w-full p-8 text-center sm:p-12">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#e2f2ed] text-2xl text-moss">
          ✓
        </span>
        <p className="eyebrow mt-7">Stripe Checkout · Modo test</p>
        <h1 className="mt-4 font-serif text-5xl text-forest">
          Pago completado
        </h1>
        {product && (
          <p className="mt-4 font-serif text-2xl text-clay">{product.name}</p>
        )}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted">
          Tu proceso de compatibilidad ya está activo. Puedes continuar
          construyendo tu mapa o entrar en tu espacio relacional.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={onGoDashboard}>
            Ir a mi espacio relacional
          </Button>
          <Button variant="secondary" onClick={onContinueMap}>
            Continuar mi mapa
          </Button>
        </div>
        <p className="mx-auto mt-7 max-w-2xl text-xs leading-5 text-muted">
          En producción, esta activación se validará mediante webhook de
          Stripe. En este prototipo se simula localmente.
        </p>
      </Card>
    </div>
  )
}
