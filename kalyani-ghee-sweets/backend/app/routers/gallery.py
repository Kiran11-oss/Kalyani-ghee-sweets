from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Gallery, Admin
from app.auth.security import get_current_admin

router = APIRouter(prefix="/api/gallery", tags=["Gallery"])


@router.get("")
def list_gallery(db: Session = Depends(get_db)):
    rows = db.query(Gallery).all()
    return [{"id": r.id, "image": r.image, "caption": r.caption} for r in rows]


@router.post("")
def add_image(image: str, caption: str = "", db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    row = Gallery(image=image, caption=caption)
    db.add(row)
    db.commit()
    db.refresh(row)
    return {"id": row.id, "image": row.image, "caption": row.caption}


@router.delete("/{image_id}")
def delete_image(image_id: int, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    row = db.query(Gallery).get(image_id)
    if not row:
        raise HTTPException(404, "Image not found")
    db.delete(row)
    db.commit()
    return {"message": "Image deleted"}
