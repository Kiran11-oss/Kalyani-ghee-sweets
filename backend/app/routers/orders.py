import random
import string
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Order, OrderItem, Product, Address, Payment, User, Admin, Coupon
from app.schemas.schemas import OrderCreate, OrderOut, OrderStatusUpdate
from app.auth.security import get_current_user, get_current_admin

router = APIRouter(prefix="/api/orders", tags=["Orders"])


def _generate_order_number() -> str:
    return "ORD" + "".join(random.choices(string.digits, k=5))


@router.post("", response_model=OrderOut)
def create_order(payload: OrderCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    subtotal = 0.0
    items_to_create = []
    for item in payload.items:
        product = db.query(Product).get(item.product_id)
        if not product:
            raise HTTPException(404, f"Product {item.product_id} not found")
        if product.stock < item.quantity:
            raise HTTPException(400, f"Insufficient stock for {product.name}")
        subtotal += product.price * item.quantity
        items_to_create.append((product, item.quantity))

    discount = 0.0
    if payload.coupon_code:
        coupon = db.query(Coupon).filter(Coupon.code == payload.coupon_code, Coupon.active == True).first()  # noqa: E712
        if coupon and subtotal >= coupon.min_order:
            discount = coupon.discount_value if coupon.discount_type == "flat" else subtotal * coupon.discount_value / 100

    shipping = 0.0 if subtotal >= 999 else 60.0
    total = max(subtotal - discount, 0) + shipping

    address = Address(user_id=user.id, **payload.address.model_dump())
    db.add(address)
    db.flush()

    order = Order(
        order_number=_generate_order_number(),
        customer_id=user.id,
        address_id=address.id,
        subtotal=subtotal,
        shipping=shipping,
        total=total,
        payment_method=payload.payment_method,
        payment_status="Paid" if payload.payment_method != "COD" else "Pending",
        status="Pending",
        coupon_code=payload.coupon_code,
    )
    db.add(order)
    db.flush()

    for product, qty in items_to_create:
        db.add(OrderItem(order_id=order.id, product_id=product.id, product_name=product.name, quantity=qty, price=product.price))
        product.stock -= qty

    db.add(Payment(order_id=order.id, amount=total, method=payload.payment_method, status=order.payment_status))
    db.commit()
    db.refresh(order)
    return order


@router.get("/my", response_model=list[OrderOut])
def my_orders(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(Order).filter(Order.customer_id == user.id).order_by(Order.created_at.desc()).all()


@router.get("", response_model=list[OrderOut])
def all_orders(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    return db.query(Order).order_by(Order.created_at.desc()).all()


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    order = db.query(Order).get(order_id)
    if not order:
        raise HTTPException(404, "Order not found")
    return order


@router.put("/{order_id}/status", response_model=OrderOut)
def update_order_status(order_id: int, payload: OrderStatusUpdate, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    order = db.query(Order).get(order_id)
    if not order:
        raise HTTPException(404, "Order not found")
    order.status = payload.status
    db.commit()
    db.refresh(order)
    return order
