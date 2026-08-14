export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  category_name?: string;
  price: number;
  mrp?: number;
  unit: string;
  image: string;
  rating?: number;
  reviews_count?: number;
  stock: number;
  description?: string;
  is_veg?: boolean;
  best_seller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: number;
  full_name: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  is_default?: boolean;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  store_name?: string;
  items: { product_name: string; quantity: number; price: number }[];
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  payment_method: string;
  created_at: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders_count: number;
  total_spent: number;
  joined_at: string;
}

export interface Review {
  id: number;
  product_name: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
  status: "Published" | "Pending" | "Hidden";
}

export interface Coupon {
  id: number;
  code: string;
  discount_type: "flat" | "percent";
  discount_value: number;
  min_order: number;
  expiry: string;
  active: boolean;
}

export interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  active: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "customer" | "owner";
}
