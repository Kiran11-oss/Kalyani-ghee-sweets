from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Banner, Admin
from app.schemas.schemas import BannerCreate, BannerOut
from app.auth.security import get_current_admin

router = APIRouter(prefix="/api/banners", tags=["Banners"])


@router.get("", response_model=list[BannerOut])
def list_banners(db: Session = Depends(get_db)):
    return db.query(Banner).filter(Banner.active == True).all()  # noqa: E712


@router.post("", response_model=BannerOut)
def create_banner(payload: BannerCreate, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    banner = Banner(**payload.model_dump())
    db.add(banner)
    db.commit()
    db.refresh(banner)
    return banner


@router.delete("/{banner_id}")
def delete_banner(banner_id: int, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    banner = db.query(Banner).get(banner_id)
    if not banner:
        raise HTTPException(404, "Banner not found")
    db.delete(banner)
    db.commit()
    return {"message": "Banner deleted"}
