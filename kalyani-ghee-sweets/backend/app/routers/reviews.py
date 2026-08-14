from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Review, Product, User, Admin
from app.schemas.schemas import ReviewCreate, ReviewOut
from app.auth.security import get_current_user, get_current_admin

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])


@router.get("/product/{product_id}", response_model=list[ReviewOut])
def product_reviews(product_id: int, db: Session = Depends(get_db)):
    return db.query(Review).filter(Review.product_id == product_id, Review.status == "Published").all()


@router.get("", response_model=list[ReviewOut])
def all_reviews(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    return db.query(Review).order_by(Review.created_at.desc()).all()


@router.post("", response_model=ReviewOut)
def create_review(payload: ReviewCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if not db.query(Product).get(payload.product_id):
        raise HTTPException(404, "Product not found")
    review = Review(product_id=payload.product_id, user_id=user.id, rating=payload.rating, comment=payload.comment, status="Pending")
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


@router.put("/{review_id}/status")
def set_review_status(review_id: int, status: str, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    review = db.query(Review).get(review_id)
    if not review:
        raise HTTPException(404, "Review not found")
    review.status = status
    db.commit()
    return {"message": "Review status updated"}


@router.delete("/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    review = db.query(Review).get(review_id)
    if not review:
        raise HTTPException(404, "Review not found")
    db.delete(review)
    db.commit()
    return {"message": "Review deleted"}
