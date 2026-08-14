# Kalyani Ghee Sweets — Full Project

A complete e-commerce project for **Kalyani Ghee Sweets**: a customer-facing storefront
and an owner/admin dashboard, matching the provided flow diagram and UI screenshots.

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + Redux Toolkit
- **Backend:** FastAPI (Python 3.11) + SQLAlchemy + SQLite + JWT Auth
- **Database:** SQLite by default (`kalyani.db`), swappable for MySQL/Postgres

## Quick start

**1. Backend**
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python seed.py
uvicorn main:app --reload --port 8000
```

**2. Frontend** (in a second terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Then open:
- Customer website → **http://localhost:5173/**
- Owner dashboard → **http://localhost:5173/owner/login**
  (login: `owner@kalyanigheesweets.com` / `admin123`)

See `frontend/README.md` and `backend/README.md` for full folder-by-folder details.

## What's included
- Full customer journey: Splash/Home → Search → Category → Product Details → Cart →
  Checkout → Payment → Order Success → My Orders → Track Order → Profile → Wishlist → Logout
- Full owner dashboard: Login → Dashboard (KPIs + charts matching the reference design) →
  Orders → Products → Categories → Customers → Payments → Reviews → Banners → Coupons →
  CMS Pages → Gallery → Reports → Analytics → Settings → Staff Management → Logout
- FastAPI routers for every module (auth, products, categories, orders, cart, wishlist,
  payments, users, reviews, banners, coupons, gallery, cms, settings, analytics, reports)
- SQLAlchemy models for every table in the data design (users, admins, products,
  categories, orders, order_items, payments, cart, wishlist, addresses, reviews, coupons,
  banners, gallery, cms_pages, settings, newsletter, contacts, testimonials)
- Brand styling (maroon/gold/cream palette, Merriweather + Poppins) matching the screenshots

## Notes on scope
This is a working, from-scratch full-stack build — not a copy of any existing site.
A couple of things worth knowing before you run it:
- The sandbox this was built in has no internet access, so `npm install` / `pip install`
  haven't been run here — you'll need to run them yourself (commands above). All source
  files have been syntax-checked.
- Product/category images are placeholders (emoji icons) since no real photos were
  provided — drop real images into `frontend/src/assets/images` and update the `image`
  field in `mockData.ts` / the database to swap them in.
- Some deeper admin pages (Reports, Analytics, Settings) are functional but intentionally
  simpler than Products/Orders/Dashboard — happy to flesh out any specific one further.
