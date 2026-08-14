from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/chat", tags=["Chat"])


class ChatMessage(BaseModel):
    text: str


class ChatResponse(BaseModel):
    reply: str


# Knowledge base for AI responses
KNOWLEDGE_BASE = {
    "order": [
        "You can track your order from the order tracking page using your order ID.",
        "For order status updates, please visit the 'Order History' section in your profile.",
        "We typically deliver within 3-5 business days. You can check the estimated delivery date in your order details.",
    ],
    "price": [
        "For detailed pricing information, please visit our products page or contact our support team.",
        "Prices vary based on product type and quantity. Please check individual product pages for details.",
        "We offer bulk discounts for large orders. Contact us for custom quotes.",
    ],
    "delivery": [
        "We offer free delivery on orders above ₹500 across Telangana.",
        "Delivery typically takes 3-5 business days from the order date.",
        "Please enter your delivery location at checkout to see available delivery options.",
    ],
    "return": [
        "We accept returns within 7 days of delivery if the product is unopened and in original condition.",
        "To initiate a return, please contact our support team with your order number.",
        "Refunds are processed within 5-7 business days after the return is confirmed.",
    ],
    "quality": [
        "All our products are made with pure ghee and quality ingredients following traditional recipes.",
        "We've been serving authentic Telangana sweets, pickles, and snacks since 1999.",
        "Our products are prepared in hygienic conditions and comply with food safety standards.",
    ],
    "payment": [
        "We accept multiple payment methods including credit cards, debit cards, UPI, and net banking.",
        "Your payment is secure and encrypted. We use industry-standard security protocols.",
        "Payment is collected only after order confirmation.",
    ],
    "contact": [
        "You can reach us at +91-9848032256 for support.",
        "Email us at support@kalyaniGheeSweetss.com for queries.",
        "You can also visit our contact page to reach out to our team.",
    ],
    "products": [
        "We offer a wide range of traditional Telangana sweets, pickles, snacks, and namkeens.",
        "Popular items include Boondi Laddu, Chandrakala, Ariselu, and our special ghee-based sweets.",
        "Browse our products page to explore all available items.",
    ],
    "about": [
        "Kalyani Ghee Sweets has been serving authentic Telangana sweets and snacks since 1999.",
        "We use traditional recipes passed down through generations with pure ghee as the key ingredient.",
        "Our mission is to bring the authentic taste of Telangana to your home.",
    ],
}

DEFAULT_RESPONSES = [
    "I'm here to help! How can I assist you with Kalyani Ghee Sweets?",
    "That's a great question! Feel free to ask about our products, orders, or services.",
    "Thanks for reaching out! Is there anything specific about our sweets and snacks you'd like to know?",
    "I'm happy to help! What would you like to know about our offerings?",
]


def generate_ai_response(user_message: str) -> str:
    """Generate AI response based on user message"""
    import random
    from datetime import datetime, timedelta
    
    message_lower = user_message.lower()

    # Order tracking queries
    if any(term in message_lower for term in ["where is my order", "track my order", "track order", "order status", "status of my order", "where is my parcel"]):
        # Simulate different order statuses with delivery times
        order_statuses = [
            {
                "status": "Order on the way",
                "time": "20 minutes",
                "location": "Out for delivery"
            },
            {
                "status": "Order on the way",
                "time": "45 minutes",
                "location": "In transit from warehouse"
            },
            {
                "status": "Order being prepared",
                "time": "1-2 hours",
                "location": "Kitchen preparing your order"
            },
            {
                "status": "Order confirmed and ready to dispatch",
                "time": "2-3 hours",
                "location": "At our fulfillment center"
            },
            {
                "status": "Order on the way",
                "time": "30 minutes",
                "location": "With delivery partner, heading your way"
            }
        ]
        
        selected = random.choice(order_statuses)
        return f"✅ {selected['status']}! It will arrive in approximately {selected['time']}. Current location: {selected['location']}. Track it live on the Track Order page for real-time updates."

    for keyword, responses in KNOWLEDGE_BASE.items():
        if keyword in message_lower:
            return responses[0]

    if any(greeting in message_lower for greeting in ["hello", "hi", "hey", "greetings"]):
        return "Hi there! 👋 How can I help you today? You can ask me about our products, orders, delivery, returns, or anything else!"

    if any(word in message_lower for word in ["how", "what", "when", "where", "why", "who"]):
        if "order" in message_lower:
            return "Your order is on the way! 🚚 It will arrive soon. Visit the Track Order page to see live updates with exact ETA, location, and delivery partner details."
        if "delivery" in message_lower:
            return KNOWLEDGE_BASE["delivery"][0]
        if "price" in message_lower or "cost" in message_lower:
            return KNOWLEDGE_BASE["price"][0]
        if "payment" in message_lower:
            return KNOWLEDGE_BASE["payment"][0]
        return "I can help you with that! Please ask about our products, orders, delivery, returns, payments, or contact information."

    return DEFAULT_RESPONSES[0]


@router.post("/send", response_model=ChatResponse)
async def send_chat_message(message: ChatMessage):
    """Handle chat messages and return AI responses"""
    try:
        if not message.text or not message.text.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        # Generate response
        reply = generate_ai_response(message.text)

        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def chat_health():
    """Health check for chat service"""
    return {"status": "Chat service is running"}
