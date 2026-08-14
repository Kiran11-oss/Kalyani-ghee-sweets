from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Cart, Product, User
from app.auth.security import get_current_user

router = APIRouter(prefix="/api/cart", tags=["Cart"])


@router.get("")
def get_cart(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    rows = db.query(Cart).filter(Cart.user_id == user.id).all()
    return [{"id": r.id, "product_id": r.product_id, "quantity": r.quantity} for r in rows]


@router.post("")
def add_to_cart(product_id: int, quantity: int = 1, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    product = db.query(Product).get(product_id)
    if not product:
        raise HTTPException(404, "Product not found")
    row = db.query(Cart).filter(Cart.user_id == user.id, Cart.product_id == product_id).first()
    if row:
        row.quantity += quantity
    else:
        row = Cart(user_id=user.id, product_id=product_id, quantity=quantity)
        db.add(row)
    db.commit()
    return {"message": "Added to cart"}


@router.delete("/{cart_id}")
def remove_from_cart(cart_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    row = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == user.id).first()
    if not row:
        raise HTTPException(404, "Cart item not found")
    db.delete(row)
    db.commit()
    return {"message": "Removed from cart"}
