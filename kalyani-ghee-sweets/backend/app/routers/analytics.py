from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Order, User, Payment, Admin
from app.auth.security import get_current_admin

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


@router.get("/summary")
def summary(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    total_orders = db.query(func.count(Order.id)).scalar() or 0
    total_revenue = db.query(func.coalesce(func.sum(Order.total), 0)).scalar() or 0
    total_customers = db.query(func.count(User.id)).scalar() or 0
    total_payments = db.query(func.coalesce(func.sum(Payment.amount), 0)).filter(Payment.status == "Paid").scalar() or 0
    pending_payments = db.query(func.coalesce(func.sum(Payment.amount), 0)).filter(Payment.status == "Pending").scalar() or 0

    status_counts = dict(
        db.query(Order.status, func.count(Order.id)).group_by(Order.status).all()
    )

    return {
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "total_customers": total_customers,
        "total_payments": total_payments,
        "pending_payments": pending_payments,
        "orders_by_status": status_counts,
    }


@router.get("/revenue-trend")
def revenue_trend(days: int = 7, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    since = datetime.utcnow() - timedelta(days=days)
    rows = (
        db.query(func.date(Order.created_at).label("day"), func.sum(Order.total).label("revenue"))
        .filter(Order.created_at >= since)
        .group_by("day")
        .order_by("day")
        .all()
    )
    return [{"day": r.day, "revenue": r.revenue} for r in rows]
