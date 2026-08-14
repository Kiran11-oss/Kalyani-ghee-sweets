from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, ConfigDict


# ---------- Auth ----------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    email: str
    role: str = "customer"


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class AdminOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    email: str
    role: str = "owner"


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


# ---------- Category ----------
class CategoryBase(BaseModel):
    name: str
    slug: str
    icon: str = "🍽️"


class CategoryCreate(CategoryBase):
    pass


class CategoryOut(CategoryBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Product ----------
class ProductBase(BaseModel):
    name: str
    slug: str
    category_id: int
    price: float
    mrp: Optional[float] = None
    unit: str = "1 kg"
    image: str = "placeholder.jpg"
    description: Optional[str] = None
    stock: int = 0
    is_veg: bool = True
    best_seller: bool = False


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    mrp: Optional[float] = None
    stock: Optional[int] = None
    description: Optional[str] = None
    best_seller: Optional[bool] = None


class ProductOut(ProductBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    rating: float = 0
    reviews_count: int = 0
    category_name: Optional[str] = None


# ---------- Address ----------
class AddressCreate(BaseModel):
    full_name: str
    phone: str
    line1: str
    city: str
    state: str
    pincode: str
    is_default: bool = False


class AddressOut(AddressCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Order ----------
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    address: AddressCreate
    payment_method: str = "COD"
    coupon_code: Optional[str] = None


class OrderItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    product_name: str
    quantity: int
    price: float


class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    order_number: str
    subtotal: float
    shipping: float
    total: float
    payment_method: str
    payment_status: str
    status: str
    created_at: datetime
    items: List[OrderItemOut] = []


class OrderStatusUpdate(BaseModel):
    status: str


# ---------- Review ----------
class ReviewCreate(BaseModel):
    product_id: int
    rating: int
    comment: str


class ReviewOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    product_id: int
    rating: int
    comment: str
    status: str
    created_at: datetime


# ---------- Coupon ----------
class CouponCreate(BaseModel):
    code: str
    discount_type: str = "flat"
    discount_value: float
    min_order: float = 0
    expiry: Optional[datetime] = None
    active: bool = True


class CouponOut(CouponCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Banner ----------
class BannerCreate(BaseModel):
    title: str
    subtitle: Optional[str] = None
    image: str = "placeholder.jpg"
    active: bool = True


class BannerOut(BannerCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- CMS ----------
class CmsPageUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None


class CmsPageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    slug: str
    title: str
    content: str
    updated_at: datetime


# ---------- Settings ----------
class SettingUpdate(BaseModel):
    key: str
    value: str
