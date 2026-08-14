from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Coupon, Admin
from app.schemas.schemas import CouponCreate, CouponOut
from app.auth.security import get_current_admin

router = APIRouter(prefix="/api/coupons", tags=["Coupons"])


@router.get("", response_model=list[CouponOut])
def list_coupons(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    return db.query(Coupon).all()


@router.post("", response_model=CouponOut)
def create_coupon(payload: CouponCreate, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    if db.query(Coupon).filter(Coupon.code == payload.code).first():
        raise HTTPException(400, "Coupon code already exists")
    coupon = Coupon(**payload.model_dump())
    db.add(coupon)
    db.commit()
    db.refresh(coupon)
    return coupon


@router.delete("/{coupon_id}")
def delete_coupon(coupon_id: int, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    coupon = db.query(Coupon).get(coupon_id)
    if not coupon:
        raise HTTPException(404, "Coupon not found")
    db.delete(coupon)
    db.commit()
    return {"message": "Coupon deleted"}
