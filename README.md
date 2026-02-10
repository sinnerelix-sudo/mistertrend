# MISTER TREND

Next.js 14 + TypeScript + Prisma starter for a bilingual (AZ/RU) non-marketplace e-commerce app with admin tools, OTP auth, and adapter-based payment/delivery integrations.

## Features
- Storefront routes: home, catalog, category, product, cart, checkout, orders, favorites, auth.
- Admin routes scaffold + role guard on `/admin/*`.
- OTP auth API (`request-otp`, `verify-otp`) with rate limiting + pluggable provider.
- Payment/Delivery ports with stubs (`EpointStubProvider`, `ColumbaStubProvider`).
- Payment callback route and mock payment UI (`/payment/mock`).
- Prisma schema + seed script + integration logs.
- Unit/API/E2E baseline tests.

## Run
```bash
npm i
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Tests
```bash
npm test
npm run test:e2e
```

## Notes
- Currency fixed to AZN.
- Shipping and free threshold live in `Settings` singleton (`id=1`).
- Replace stub providers with real epoint/Columba adapters without changing core flow.
