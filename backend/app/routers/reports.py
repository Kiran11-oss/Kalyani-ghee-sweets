from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Order, OrderItem, Product, Admin
from app.auth.security import get_current_admin

router = APIRouter(prefix="/api/reports", tags=["Reports"])


@router.get("/top-products")
def top_products(limit: int = 10, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    rows = (
        db.query(OrderItem.product_name, func.sum(OrderItem.quantity).label("units_sold"), func.sum(OrderItem.quantity * OrderItem.price).label("revenue"))
        .group_by(OrderItem.product_name)
        .order_by(func.sum(OrderItem.quantity).desc())
        .limit(limit)
        .all()
    )
    return [{"product_name": r.product_name, "units_sold": r.units_sold, "revenue": r.revenue} for r in rows]


@router.get("/sales-summary")
def sales_summary(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    total_orders = db.query(func.count(Order.id)).scalar() or 0
    total_revenue = db.query(func.coalesce(func.sum(Order.total), 0)).scalar() or 0
    avg_order_value = (total_revenue / total_orders) if total_orders else 0
    return {"total_orders": total_orders, "total_revenue": total_revenue, "avg_order_value": round(avg_order_value, 2)}
