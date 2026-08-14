from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import User, Order, Admin
from app.auth.security import get_current_admin

router = APIRouter(prefix="/api/users", tags=["Users / Customers"])


@router.get("")
def list_customers(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    users = db.query(User).all()
    result = []
    for u in users:
        orders = db.query(Order).filter(Order.customer_id == u.id).all()
        result.append({
            "id": u.id, "name": u.name, "email": u.email, "phone": u.phone,
            "orders_count": len(orders), "total_spent": sum(o.total for o in orders),
            "joined_at": u.created_at,
        })
    return result
