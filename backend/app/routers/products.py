from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Product, Category, Admin
from app.schemas.schemas import ProductCreate, ProductUpdate, ProductOut
from app.auth.security import get_current_admin

router = APIRouter(prefix="/api/products", tags=["Products"])


def _serialize(p: Product) -> dict:
    return {
        **{c.name: getattr(p, c.name) for c in p.__table__.columns},
        "category_name": p.category.name if p.category else None,
    }


@router.get("", response_model=list[ProductOut])
def list_products(
    category_slug: Optional[str] = None,
    q: Optional[str] = Query(None, description="Search term"),
    best_seller: Optional[bool] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Product)
    if category_slug:
        query = query.join(Category).filter(Category.slug == category_slug)
    if q:
        query = query.filter(Product.name.ilike(f"%{q}%"))
    if best_seller is not None:
        query = query.filter(Product.best_seller == best_seller)
    return [_serialize(p) for p in query.all()]


@router.get("/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(404, "Product not found")
    return _serialize(product)


@router.post("", response_model=ProductOut)
def create_product(payload: ProductCreate, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    if db.query(Product).filter(Product.slug == payload.slug).first():
        raise HTTPException(400, "Product slug already exists")
    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return _serialize(product)


@router.put("/{product_id}", response_model=ProductOut)
def update_product(product_id: int, payload: ProductUpdate, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    product = db.query(Product).get(product_id)
    if not product:
        raise HTTPException(404, "Product not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(product, k, v)
    db.commit()
    db.refresh(product)
    return _serialize(product)


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    product = db.query(Product).get(product_id)
    if not product:
        raise HTTPException(404, "Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}
