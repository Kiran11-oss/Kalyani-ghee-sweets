import hashlib
import hmac
import os
from uuid import uuid4

import razorpay
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Payment, Admin
from app.auth.security import get_current_admin

router = APIRouter(prefix="/api/payments", tags=["Payments"])


class CreateOrderRequest(BaseModel):
    amount: float
    receipt: str | None = None
    notes: dict | None = None


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


@router.get("")
def list_payments(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    rows = db.query(Payment).order_by(Payment.created_at.desc()).all()
    return [
        {"id": r.id, "order_id": r.order_id, "amount": r.amount, "method": r.method,
         "status": r.status, "transaction_id": r.transaction_id, "created_at": r.created_at}
        for r in rows
    ]


@router.post("/create-order")
def create_order(payload: CreateOrderRequest):
    key_id = os.getenv("RAZORPAY_KEY_ID")
    key_secret = os.getenv("RAZORPAY_KEY_SECRET")

    if not key_id or not key_secret:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in the backend environment.",
        )

    client = razorpay.Client(auth=(key_id, key_secret))
    amount_in_paise = int(round(payload.amount * 100))

    order = client.order.create(
        {
            "amount": amount_in_paise,
            "currency": "INR",
            "receipt": payload.receipt or f"rcpt_{uuid4().hex[:12]}",
            "notes": payload.notes or {
                "source": "kalyani-ghee-sweets",
            },
        }
    )

    return {
        "order_id": order["id"],
        "amount": order["amount"],
        "currency": order["currency"],
        "key": key_id,
    }


@router.post("/verify")
def verify_payment(payload: VerifyPaymentRequest):
    key_secret = os.getenv("RAZORPAY_KEY_SECRET")

    if not key_secret:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Razorpay secret is not configured.",
        )

    expected_signature = hmac.new(
        key_secret.encode(),
        f"{payload.razorpay_order_id}|{payload.razorpay_payment_id}".encode(),
        hashlib.sha256,
    ).hexdigest()

    if not hmac.compare_digest(expected_signature, payload.razorpay_signature):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Razorpay payment signature.",
        )

    return {"success": True, "message": "Payment verified successfully."}
