# Real Linkings

Prototipo frontend navegable de una plataforma de autoconocimiento relacional
y compatibilidad profunda.

## Desarrollo

```bash
npm install
npm run dev
```

## Verificación

```bash
npm run build
npm run lint
```

El MVP usa React, TypeScript, Vite, Tailwind CSS y datos locales. No incluye
autenticación real ni base de datos. Stripe Checkout funciona en modo test
mediante una función serverless de Vercel.

## Stripe Checkout en local

1. Crea una cuenta de Stripe y usa claves de test.
2. Copia `.env.example` a `.env`.
3. Rellena `STRIPE_SECRET_KEY`.
4. Para probar funciones serverless usa:

```bash
vercel dev
```

`npm run dev` levanta solo Vite y puede no ejecutar `/api`.

Los productos comprados se activan en `localStorage` únicamente para simular
el prototipo. En producción será necesario validar cada compra con un webhook
de Stripe, backend y cuenta de usuario.
