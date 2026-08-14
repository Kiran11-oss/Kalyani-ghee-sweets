# Kalyani Ghee Sweets — Frontend

## Stack
React 18 · TypeScript · Vite · Tailwind CSS · Redux Toolkit · React Router · Axios · Recharts · Framer Motion

## Setup

```bash
cd frontend
npm install
cp .env.example .env      # points to the backend at http://localhost:8000/api
npm run dev
```

Visit:
- Customer site → http://localhost:5173/
- Owner dashboard → http://localhost:5173/owner/login

> The frontend also works standalone (without the backend running) using
> the seed data in `src/utils/mockData.ts` for owner-dashboard analytics, and
> falls back to a local demo session if `/api/auth/login` isn't reachable —
> handy for previewing the UI immediately.

## Folder structure
```
frontend/
  src/
    assets/                images, icons, banners, logos
    components/
      common/               CustomerHeader, CustomerFooter, OwnerSidebar, OwnerTopbar
      cards/                ProductCard
      tables/               DataTable (generic admin table)
      ui/                   StatCard, StatusBadge
      forms/, charts/, modals/   (reserved for growth)
    layouts/                CustomerLayout.tsx, OwnerLayout.tsx
    customer/pages/
      home/ shop/ product/ category/ search/ cart/ checkout/ payment/
      wishlist/ orders/ profile/ auth/ about/ contact/ track/ notfound/
    owner/
      auth/ dashboard/ products/ categories/ orders/ customers/ payments/
      banners/ coupons/ reviews/ gallery/ cms/ reports/ analytics/
      subscribers/ settings/ users/
    routes/                (App.tsx composes all routes; folder reserved for splitting further)
    services/               api.ts — shared axios instance (JWT header injection)
    redux/                  store.ts + slices/ (cart, wishlist, auth)
    hooks/                  redux.ts — typed useAppDispatch/useAppSelector
    types/                  shared TypeScript interfaces
    utils/                  mockData.ts — seed/fallback data mirroring the backend
    App.tsx                 route table
    main.tsx                app entry point
```

## Customer website pages
Splash-equivalent handled by initial load → Home → Search → Category → Product Details →
Add to Cart → Cart → Checkout → Payment → Order Success → My Orders → Track Order →
Profile → Wishlist → Login/Register → About → Contact.

## Owner dashboard pages
Login → Dashboard (stats + charts) → Orders → Products → Categories → Customers →
Payments → Reviews → Banners → Coupons → CMS Pages → Gallery → Reports → Analytics →
Subscribers → Settings → Staff Management.

## Design tokens (tailwind.config.js)
- `maroon` (#7A0C1E) / `maroon-dark` / `maroon-darker` — primary brand color
- `gold` (#D4A017) / `gold-light` / `gold-dark` — accent color
- `cream` (#FFF8ED) — background
- Fonts: Merriweather (display/headings), Poppins (body)
