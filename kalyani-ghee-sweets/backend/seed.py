"""
Seed the database with sample data matching the Kalyani Ghee Sweets reference
designs (categories, products, an admin login, a demo customer, and orders).

Run with:  python seed.py
"""
from datetime import datetime, timedelta

from app.database.session import Base, engine, SessionLocal
from app.models.models import (
    Category, Product, Admin, User, Order, OrderItem, Payment,
    Coupon, Banner, Review, CmsPage,
)
from app.auth.security import hash_password

Base.metadata.create_all(bind=engine)
db = SessionLocal()

if db.query(Admin).count() == 0:
    print("Seeding data...")

    # --- Categories ---
    categories_data = [
        ("Pickles", "pickles", "🥭"),
        ("Non Veg Pickles", "non-veg-pickles", "🍗"),
        ("Powders", "powders", "🌶️"),
        ("Sweets", "sweets", "🍬"),
        ("Laddu's", "laddus", "🟡"),
        ("Snacks", "snacks", "🥨"),
        ("Namkeens", "namkeens", "🥜"),
        ("Papads", "papads", "🫓"),
    ]
    categories = {}
    for name, slug, icon in categories_data:
        c = Category(name=name, slug=slug, icon=icon)
        db.add(c)
        db.flush()
        categories[slug] = c

    # --- Products ---
    products_data = [
        ("Kaju Pakam", "kaju-pakam", "sweets", 1000, 1100, "1 kg", 42, True, 4.8, 124),
        ("Ghee Mysore Pak", "ghee-mysore-pak", "sweets", 640, 700, "1 kg", 55, True, 4.7, 98),
        ("Mango Pickle", "mango-pickle", "pickles", 400, 450, "1 kg", 80, True, 4.6, 210),
        ("Dry Fruits Laddu", "dry-fruits-laddu", "laddus", 1120, 1250, "1 kg", 30, True, 4.9, 76),
        ("Sakinalu", "sakinalu", "snacks", 400, 430, "1 kg", 65, True, 4.5, 64),
        ("Boondi", "boondi", "snacks", 360, 400, "1 kg", 70, True, 4.4, 51),
        ("Palli Powder", "palli-powder", "powders", 220, 250, "500 g", 90, False, 4.3, 22),
        ("Karam Podi", "karam-podi", "powders", 250, 280, "500 g", 60, False, 4.6, 40),
    ]
    products = {}
    for name, slug, cat_slug, price, mrp, unit, stock, best_seller, rating, reviews_count in products_data:
        p = Product(
            name=name, slug=slug, category_id=categories[cat_slug].id,
            price=price, mrp=mrp, unit=unit, stock=stock, best_seller=best_seller,
            rating=rating, reviews_count=reviews_count,
            description=f"Authentic {name} made the traditional Telangana way with pure ghee.",
        )
        db.add(p)
        db.flush()
        products[slug] = p

    # --- Admin owner ---
    admin = Admin(name="Admin Owner", email="owner@kalyanigheesweets.com", hashed_password=hash_password("admin123"), role="Super Admin")
    db.add(admin)

    # --- Demo customer ---
    customer = User(name="Ramesh Kumar", email="ramesh@example.com", phone="8341930200", hashed_password=hash_password("customer123"))
    db.add(customer)
    db.flush()

    # --- Sample orders ---
    order_seed = [
        ("ORD12548", "Delivered", "UPI", [("kaju-pakam", 1)]),
        ("ORD12547", "Processing", "Card", [("mango-pickle", 2)]),
        ("ORD12546", "Shipped", "COD", [("dry-fruits-laddu", 2)]),
        ("ORD12545", "Pending", "UPI", [("sakinalu", 3)]),
        ("ORD12544", "Cancelled", "COD", [("boondi", 2)]),
    ]
    for i, (order_number, status, method, items) in enumerate(order_seed):
        subtotal = sum(products[slug].price * qty for slug, qty in items)
        shipping = 0 if subtotal >= 999 else 60
        order = Order(
            order_number=order_number, customer_id=customer.id, subtotal=subtotal,
            shipping=shipping, total=subtotal + shipping, payment_method=method,
            payment_status="Refunded" if status == "Cancelled" else ("Pending" if status == "Pending" else "Paid"),
            status=status, created_at=datetime.utcnow() - timedelta(hours=i * 3),
        )
        db.add(order)
        db.flush()
        for slug, qty in items:
            db.add(OrderItem(order_id=order.id, product_id=products[slug].id, product_name=products[slug].name, quantity=qty, price=products[slug].price))
        db.add(Payment(order_id=order.id, amount=order.total, method=method, status=order.payment_status))

    # --- Coupons ---
    db.add(Coupon(code="WELCOME100", discount_type="flat", discount_value=100, min_order=999, expiry=datetime(2026, 12, 31), active=True))
    db.add(Coupon(code="FEST20", discount_type="percent", discount_value=20, min_order=1500, expiry=datetime(2026, 10, 31), active=True))

    # --- Banner ---
    db.add(Banner(title="Pure Ghee, Perfect Love", subtitle="Authentic Telangana Sweets, Pickles & Snacks made with love", image="hero-sweets.jpg", active=True))

    # --- Reviews ---
    db.add(Review(product_id=products["kaju-pakam"].id, user_id=customer.id, rating=5, comment="Tastes just like homemade! Excellent quality.", status="Published"))
    db.add(Review(product_id=products["mango-pickle"].id, user_id=customer.id, rating=4, comment="Authentic spicy flavor, will order again.", status="Published"))

    # --- CMS pages ---
    db.add(CmsPage(slug="about", title="About Us", content="Since 2002, Kalyani Ghee Sweets has been bringing the authentic taste of Telangana to homes across India. Rooted in tradition and inspired by generations of family recipes, we specialize in traditional sweets, pickles, and snacks crafted with pure ghee and carefully selected ingredients.\n\nWhat began as a passion for preserving the rich flavors of Telangana has grown into a trusted family brand. Every product is prepared in small batches using traditional methods, allowing us to maintain the freshness, authentic taste, and quality our customers have come to love.\n\nFrom our kitchen in Hanamkonda to homes across India, we are committed to delivering food that feels homemade. We take pride in maintaining high standards of hygiene, using quality ingredients, and preparing our products without preservatives or artificial additives.\n\nAt Kalyani Ghee Sweets, we believe that every bite should carry the warmth of tradition and the care of a family kitchen. For us, every customer is a part of the Kalyani family."))
    db.add(CmsPage(slug="contact", title="Contact Us", content="Reach us at kalyanigheesweets@gmail.com or +91 8341930200."))
    db.add(CmsPage(slug="footer", title="Footer", content="© Kalyani Ghee Sweets. All rights reserved."))

    db.commit()
    print("Seed complete!")
    print("Owner login  -> email: owner@kalyanigheesweets.com | password: admin123")
    print("Customer login -> email: ramesh@example.com | password: customer123")
else:
    print("Database already seeded, skipping.")

db.close()
