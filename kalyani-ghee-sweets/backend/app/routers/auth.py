from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import User, Admin
from app.schemas.schemas import UserCreate, UserLogin, AdminLogin, Token
from app.auth.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/register", response_model=Token)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(400, "Email already registered")
    user = User(
        name=payload.name, email=payload.email, phone=payload.phone,
        hashed_password=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    token = create_access_token({"sub": str(user.id), "role": "customer"})
    return {"access_token": token, "user": {"id": user.id, "name": user.name, "email": user.email, "role": "customer"}}


@router.post("/login", response_model=Token)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(401, "Invalid email or password")
    token = create_access_token({"sub": str(user.id), "role": "customer"})
    return {"access_token": token, "user": {"id": user.id, "name": user.name, "email": user.email, "role": "customer"}}


@router.post("/owner/login", response_model=Token)
def owner_login(payload: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == payload.email).first()
    if not admin or not verify_password(payload.password, admin.hashed_password):
        raise HTTPException(401, "Invalid admin email or password")
    token = create_access_token({"sub": str(admin.id), "role": "owner"})
    return {"access_token": token, "user": {"id": admin.id, "name": admin.name, "email": admin.email, "role": "owner"}}
