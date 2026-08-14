from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Wishlist, Product, User
from app.auth.security import get_current_user

router = APIRouter(prefix="/api/wishlist", tags=["Wishlist"])


@router.get("")
def get_wishlist(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    rows = db.query(Wishlist).filter(Wishlist.user_id == user.id).all()
    return [{"id": r.id, "product_id": r.product_id} for r in rows]


@router.post("")
def toggle_wishlist(product_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if not db.query(Product).get(product_id):
        raise HTTPException(404, "Product not found")
    row = db.query(Wishlist).filter(Wishlist.user_id == user.id, Wishlist.product_id == product_id).first()
    if row:
        db.delete(row)
        db.commit()
        return {"message": "Removed from wishlist", "wishlisted": False}
    db.add(Wishlist(user_id=user.id, product_id=product_id))
    db.commit()
    return {"message": "Added to wishlist", "wishlisted": True}
