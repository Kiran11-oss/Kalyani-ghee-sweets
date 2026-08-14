import { Routes, Route, Navigate } from "react-router-dom";
import CustomerLayout from "@/layouts/CustomerLayout";
import OwnerLayout from "@/layouts/OwnerLayout";

import Home from "@/customer/pages/home/Home";
import Category from "@/customer/pages/category/Category";
import Shop from "@/customer/pages/shop/Shop";
import Search from "@/customer/pages/search/Search";
import ProductDetails from "@/customer/pages/product/ProductDetails";
import Cart from "@/customer/pages/cart/Cart";
import Checkout from "@/customer/pages/checkout/Checkout";
import Payment from "@/customer/pages/payment/Payment";
import OrderSuccess from "@/customer/pages/orders/OrderSuccess";
import MyOrders from "@/customer/pages/orders/MyOrders";
import TrackOrder from "@/customer/pages/track/TrackOrder";
import Profile from "@/customer/pages/profile/Profile";
import Wishlist from "@/customer/pages/wishlist/Wishlist";
import Login from "@/customer/pages/auth/Login";
import Register from "@/customer/pages/auth/Register";
import About from "@/customer/pages/about/About";
import Contact from "@/customer/pages/contact/Contact";
import ShippingPolicy from "@/customer/pages/policies/ShippingPolicy";
import ReturnRefundPolicy from "@/customer/pages/policies/ReturnRefundPolicy";
import TermsAndConditions from "@/customer/pages/policies/TermsAndConditions";
import PrivacyPolicy from "@/customer/pages/policies/PrivacyPolicy";
import NotFound from "@/customer/pages/notfound/NotFound";

import OwnerLogin from "@/owner/auth/OwnerLogin";
import Dashboard from "@/owner/dashboard/Dashboard";
import Products from "@/owner/products/Products";
import Categories from "@/owner/categories/Categories";
import Orders from "@/owner/orders/Orders";
import Customers from "@/owner/customers/Customers";
import Payments from "@/owner/payments/Payments";
import Reviews from "@/owner/reviews/Reviews";
import Banners from "@/owner/banners/Banners";
import Coupons from "@/owner/coupons/Coupons";
import CmsEditor from "@/owner/cms/CmsEditor";
import Gallery from "@/owner/gallery/Gallery";
import Reports from "@/owner/reports/Reports";
import Analytics from "@/owner/analytics/Analytics";
import Subscribers from "@/owner/subscribers/Subscribers";
import Settings from "@/owner/settings/Settings";
import StaffManagement from "@/owner/users/StaffManagement";

import { useAppSelector } from "@/hooks/redux";

function RequireOwner({ children }: { children: JSX.Element }) {
  const user = useAppSelector((s) => s.auth.user);
  if (!user || user.role !== "owner") return <Navigate to="/owner/login" replace />;
  return children;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAppSelector((s) => s.auth.user);
  if (!user) return <Navigate to="/register" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Customer website */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
        <Route path="/payment" element={<RequireAuth><Payment /></RequireAuth>} />
        <Route path="/order-success" element={<RequireAuth><OrderSuccess /></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth><MyOrders /></RequireAuth>} />
        <Route path="/track-order" element={<RequireAuth><TrackOrder /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/wishlist" element={<RequireAuth><Wishlist /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/returns" element={<ReturnRefundPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Route>

      {/* Owner dashboard */}
      <Route path="/owner/login" element={<OwnerLogin />} />
      <Route path="/owner" element={<RequireOwner><OwnerLayout /></RequireOwner>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="customers" element={<Customers />} />
        <Route path="payments" element={<Payments />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="banners" element={<Banners />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="cms" element={<CmsEditor />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="subscribers" element={<Subscribers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<StaffManagement />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
