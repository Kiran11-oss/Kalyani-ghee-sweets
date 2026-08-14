# Kalyani Ghee Sweets — Backend (FastAPI)

## Stack
FastAPI · Python 3.11 · SQLAlchemy · SQLite (swap for MySQL/Postgres by changing `DATABASE_URL`) · JWT Auth · Passlib (bcrypt)

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python seed.py                  # creates kalyani.db and sample data
uvicorn main:app --reload --port 8000
```

API docs (Swagger UI): http://localhost:8000/docs

## Demo logins (created by seed.py)
- **Owner dashboard:** owner@kalyanigheesweets.com / admin123
- **Customer:** ramesh@example.com / customer123

## Folder structure
```
backend/
  app/
    api/            # (reserved for versioned API composition)
    auth/            security.py — JWT + password hashing, get_current_user/get_current_admin
    database/         session.py — SQLAlchemy engine/session
    models/           models.py — all ORM models (users, products, orders, payments, etc.)
    schemas/          schemas.py — Pydantic request/response models
    services/        (reserved for business-logic helpers)
    routers/          one file per API module (see below)
    middleware/       (reserved for custom middleware)
    uploads/          uploaded images (banners, gallery, product photos)
    utils/           (reserved for shared helpers)
  main.py            FastAPI app entry point, mounts all routers + CORS
  seed.py            populates the database with demo data
  requirements.txt
  .env.example
```

## Routers (`app/routers/`)
| File | Purpose |
|---|---|
| `auth.py` | customer register/login, owner login (JWT) |
| `products.py` | public product listing/search + admin CRUD |
| `categories.py` | public category listing + admin CRUD |
| `orders.py` | checkout, customer order history, admin order management |
| `cart.py` | server-side cart persistence (optional — frontend also works via Redux) |
| `wishlist.py` | server-side wishlist toggle |
| `payments.py` | payment/transaction records |
| `users.py` | admin: list & manage customers |
| `reviews.py` | product reviews (create + moderate) |
| `banners.py` | homepage banner CRUD |
| `coupons.py` | discount coupon CRUD |
| `gallery.py` | image gallery CRUD |
| `cms.py` | editable content pages (About, Contact, Footer, etc.) |
| `settings.py` | store settings / SEO / social links (key-value store) |
| `analytics.py` | dashboard summary stats, revenue trend |
| `reports.py` | top products, sales summary |

## Database tables
`users`, `admins`, `products`, `categories`, `orders`, `order_items`, `payments`,
`cart`, `wishlist`, `addresses`, `reviews`, `coupons`, `banners`, `gallery`,
`cms_pages`, `settings`, `newsletter`, `contacts`, `testimonials`

## Notes
- Auth uses JWT bearer tokens. Customer tokens carry `role: customer`; owner tokens carry `role: owner` — routes are protected accordingly via `get_current_user` / `get_current_admin` dependencies.
- CORS is restricted to `CORS_ORIGINS` in `.env` (defaults to the Vite dev server on `http://localhost:5173`).
- Swap SQLite for MySQL/Postgres in production by changing `DATABASE_URL` (e.g. `mysql+pymysql://user:pass@host/dbname`) and running `alembic` migrations instead of the automatic `create_all`.
