import { Button } from '../components/Button'
import { Card } from '../components/Card'

interface PaymentCancelPageProps {
  onBackToPricing: () => void
  onStartFree: () => void
}

export function PaymentCancelPage({
  onBackToPricing,
  onStartFree,
}: PaymentCancelPageProps) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-5 py-12 sm:px-8">
      <Card className="w-full p-8 text-center sm:p-12">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-ivory text-2xl text-clay">
          ×
        </span>
        <p className="eyebrow mt-7">El proceso sigue disponible</p>
        <h1 className="mt-4 font-serif text-5xl text-forest">
          Pago cancelado
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted">
          No se ha completado el pago. Puedes volver a los procesos de
          compatibilidad cuando quieras.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={onBackToPricing}>Volver a procesos</Button>
          <Button variant="secondary" onClick={onStartFree}>
            Empezar gratis
          </Button>
        </div>
      </Card>
    </div>
  )
}
