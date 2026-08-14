import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.database.session import Base, engine
from app.models import models  # noqa: F401 (ensures models are registered)
from app.routers import (
    auth, categories, products, orders, cart, wishlist,
    payments, users, reviews, banners, coupons, gallery,
    cms, settings, analytics, reports, chat,
)

# Create tables if they don't exist yet (use Alembic migrations for production)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Kalyani Ghee Sweets API",
    description="Backend API powering the Kalyani Ghee Sweets customer website and owner dashboard",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(cart.router)
app.include_router(wishlist.router)
app.include_router(payments.router)
app.include_router(users.router)
app.include_router(reviews.router)
app.include_router(banners.router)
app.include_router(coupons.router)
app.include_router(gallery.router)
app.include_router(cms.router)
app.include_router(settings.router)
app.include_router(analytics.router)
app.include_router(reports.router)
app.include_router(chat.router)


@app.get("/")
def root():
    return {"message": "Kalyani Ghee Sweets API is running", "docs": "/docs"}


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
