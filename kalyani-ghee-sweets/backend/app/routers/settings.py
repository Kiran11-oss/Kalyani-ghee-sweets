from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Setting, Admin
from app.schemas.schemas import SettingUpdate
from app.auth.security import get_current_admin

router = APIRouter(prefix="/api/settings", tags=["Settings"])


@router.get("")
def list_settings(db: Session = Depends(get_db)):
    rows = db.query(Setting).all()
    return {r.key: r.value for r in rows}


@router.put("")
def update_setting(payload: SettingUpdate, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    row = db.query(Setting).filter(Setting.key == payload.key).first()
    if row:
        row.value = payload.value
    else:
        row = Setting(key=payload.key, value=payload.value)
        db.add(row)
    db.commit()
    return {"message": "Setting updated"}
