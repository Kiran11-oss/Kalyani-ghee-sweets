import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingBag, FiHeart, FiMapPin, FiCreditCard, FiLock, FiLogOut, FiEdit2, FiPlus, FiCheck, FiShield, FiTruck, FiHeadphones, FiHome, FiPhone, FiMail, FiStar, FiCamera } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/redux/slices/authSlice";
import ProductCard from "@/components/cards/ProductCard";
import { products } from "@/utils/mockData";
import toast from "react-hot-toast";

const defaultProfile = {
  name: "Kalyani sweet Kalyani sweet",
  email: "kalyaniweetkalyaniweet@gmail.com",
  phone: "9652678232",
  profilePicture: "",
};

const defaultAddresses = [
  {
    id: 1,
    label: "Home",
    name: "Kalyani sweet Kalyani sweet",
    phone: "9652678232",
    address: "H.No 24, Sriram Nagar, Kondapur, Hyderabad, Telangana 500084",
    isDefault: true,
  },
  {
    id: 2,
    label: "Office",
    name: "Kalyani sweet Kalyani sweet",
    phone: "9652678232",
    address: "2nd Floor, Kalyani Plaza, Banjara Hills, Hyderabad, Telangana 500034",
    isDefault: false,
  },
];

const defaultPayments = [
  { id: 1, type: "UPI", detail: "kalyani@upi", isDefault: true },
  { id: 2, type: "Debit Card", detail: "•••• 7842", isDefault: false },
  { id: 3, type: "Cash on Delivery", detail: "Pay on delivery", isDefault: false },
];

const menuItems = [
  { key: "profile", label: "My Profile", icon: FiUser },
  { key: "orders", label: "My Orders", icon: FiShoppingBag },
  { key: "wishlist", label: "Wishlist", icon: FiHeart },
  { key: "addresses", label: "Addresses", icon: FiMapPin },
  { key: "payments", label: "Payment Methods", icon: FiCreditCard },
  { key: "password", label: "Change Password", icon: FiLock },
  { key: "logout", label: "Logout", icon: FiLogOut },
] as const;

export default function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "wishlist" | "addresses" | "payments" | "password" | "logout">("profile");
  const [profile, setProfile] = useState({
    name: user?.name || defaultProfile.name,
    email: user?.email || defaultProfile.email,
    phone: defaultProfile.phone,
    profilePicture: "",
  });
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [payments, setPayments] = useState(defaultPayments);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState({ label: "Home", name: profile.name, phone: profile.phone, address: "" });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [editingPaymentId, setEditingPaymentId] = useState<number | null>(null);
  const [paymentDraft, setPaymentDraft] = useState({ type: "UPI", detail: "" });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("kgs_profile");
    const savedAddresses = localStorage.getItem("kgs_addresses");
    const savedPayments = localStorage.getItem("kgs_payment_methods");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setNewAddress((prev) => ({ ...prev, name: JSON.parse(savedProfile).name, phone: JSON.parse(savedProfile).phone }));
    }
    if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
    if (savedPayments) setPayments(JSON.parse(savedPayments));
  }, []);

  useEffect(() => {
    localStorage.setItem("kgs_profile", JSON.stringify(profile));
    setNewAddress((prev) => ({ ...prev, name: profile.name, phone: profile.phone }));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("kgs_addresses", JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem("kgs_payment_methods", JSON.stringify(payments));
  }, [payments]);

  const wishlistItems = useAppSelector((s) => s.wishlist.items).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.best_seller || p.rating && p.rating >= 4.7).slice(0, 4);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("kgs_profile", JSON.stringify(profile));
    setIsEditingProfile(false);
    toast.success("Profile updated successfully");
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setProfile({ ...profile, profilePicture: base64String });
        localStorage.setItem("kgs_profile", JSON.stringify({ ...profile, profilePicture: base64String }));
        toast.success("Profile picture updated");
      };
      reader.readAsDataURL(file);
    }
  };



  const handleAddAddress = () => {
    if (!newAddress.address.trim()) {
      toast.error("Please enter your address");
      return;
    }

    if (editingAddressId !== null) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === editingAddressId
            ? {
                ...item,
                label: newAddress.label || "Home",
                name: newAddress.name || profile.name,
                phone: newAddress.phone || profile.phone,
                address: newAddress.address,
              }
            : item,
        ),
      );
      toast.success("Address updated successfully");
      setEditingAddressId(null);
    } else {
      const created = {
        id: Date.now(),
        label: newAddress.label || "Home",
        name: newAddress.name || profile.name,
        phone: newAddress.phone || profile.phone,
        address: newAddress.address,
        isDefault: addresses.length === 0,
      };

      setAddresses([created, ...addresses]);
      toast.success("Address added successfully");
    }

    setNewAddress({ label: "Home", name: profile.name, phone: profile.phone, address: "" });
    setShowAddressForm(false);
  };

  const handleEditAddress = (item: typeof addresses[number]) => {
    setEditingAddressId(item.id);
    setNewAddress({
      label: item.label,
      name: item.name,
      phone: item.phone,
      address: item.address,
    });
    setShowAddressForm(true);
  };

  const handleAddPayment = () => {
    const methodType = paymentDraft.type.trim() || "UPI";
    const methodDetail = paymentDraft.detail.trim() || (methodType === "Cash on Delivery" ? "Pay on delivery" : "•••• 9034");

    if (!methodType || !methodDetail) {
      toast.error("Please enter a valid payment method and details");
      return;
    }

    if (editingPaymentId !== null) {
      setPayments((prev) =>
        prev.map((item) =>
          item.id === editingPaymentId
            ? { ...item, type: methodType, detail: methodDetail }
            : item,
        ),
      );
      toast.success("Payment method updated");
      setEditingPaymentId(null);
    } else {
      const newMethod = {
        id: Date.now(),
        type: methodType,
        detail: methodDetail,
        isDefault: payments.length === 0,
      };
      setPayments((prev) => [...prev, newMethod]);
      toast.success("Payment method added");
    }

    setPaymentDraft({ type: "UPI", detail: "" });
    setShowPaymentForm(false);
  };

  const handleEditPayment = (item: typeof payments[number]) => {
    setEditingPaymentId(item.id);
    setPaymentDraft({ type: item.type, detail: item.detail });
    setShowPaymentForm(true);
    toast.success(`Editing ${item.type} method`);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    toast.success("Password updated successfully");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const renderContent = () => {
    if (activeTab === "logout") {
      handleLogout();
      return null;
    }

    switch (activeTab) {
      case "orders":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#5a0d17]">My Orders</h2>
            </div>
            {[
              { id: "ORD12548", date: "20 May 2024", total: "₹12,450", status: "Delivered" },
              { id: "ORD12547", date: "18 May 2024", total: "₹8,900", status: "Processing" },
              { id: "ORD12546", date: "15 May 2024", total: "₹24,500", status: "Shipped" },
            ].map((order) => (
              <div key={order.id} className="rounded-xl border border-[#eadfd2] bg-[#fffaf4] p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-bold text-[#5a0d17]">#{order.id}</p>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="text-sm text-gray-600">Total: <span className="font-bold text-[#5a0d17]">{order.total}</span></div>
                <span className="inline-flex items-center rounded-full bg-[#f7e7d7] px-3 py-1 text-xs font-semibold text-[#5a0d17]">{order.status}</span>
              </div>
            ))}
          </div>
        );

      case "wishlist":
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#5a0d17] mb-4">Wishlist</h2>
            {wishlistItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-[#fffaf4] p-8 text-center text-gray-500">
                Your wishlist is empty.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
                {wishlistItems.map((product) => (
                  <div key={product.id} className="scale-[0.98]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "addresses":
        return (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#5a0d17]">Saved Addresses</h2>
              <button onClick={() => setShowAddressForm((prev) => !prev)} className="rounded-lg border border-[#5a0d17] px-3 py-2 text-sm font-semibold text-[#5a0d17] hover:bg-[#fef2f2]">
                <span className="inline-flex items-center gap-2"><FiPlus /> Add New</span>
              </button>
            </div>

            {showAddressForm && (
              <div className="mb-5 rounded-xl border border-[#eadfd2] bg-[#fffaf4] p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input value={newAddress.label} onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })} placeholder="Label (Home/Office)" className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                  <input value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} placeholder="Full Name" className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                  <input value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} placeholder="Phone" className="rounded-lg border border-gray-300 px-3 py-2 text-sm md:col-span-2" />
                  <textarea value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} placeholder="Address" rows={3} className="rounded-lg border border-gray-300 px-3 py-2 text-sm md:col-span-2" />
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <button onClick={() => { setShowAddressForm(false); setEditingAddressId(null); setNewAddress({ label: "Home", name: profile.name, phone: profile.phone, address: "" }); }} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600">Cancel</button>
                  <button onClick={handleAddAddress} className="rounded-lg bg-[#5a0d17] px-4 py-2 text-sm font-semibold text-white">{editingAddressId !== null ? "Update Address" : "Save Address"}</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {addresses.map((item) => (
                <div key={item.id} className="rounded-xl border border-[#eadfd2] bg-[#fffaf4] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#5a0d17]">{item.label}</span>
                        {item.isDefault && <span className="rounded-full bg-[#f2d5c7] px-2 py-0.5 text-[10px] font-semibold uppercase text-[#5a0d17]">Default</span>}
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{item.name}</p>
                      <p className="text-sm text-gray-700">{item.phone}</p>
                      <p className="mt-2 text-sm text-gray-600">{item.address}</p>
                    </div>
                    <button onClick={() => handleEditAddress(item)} className="rounded-lg border border-[#5a0d17] px-3 py-2 text-sm font-semibold text-[#5a0d17]">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "payments":
        return (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#5a0d17]">Payment Methods</h2>
              <button onClick={() => { setEditingPaymentId(null); setPaymentDraft({ type: "UPI", detail: "" }); setShowPaymentForm((prev) => !prev); }} className="rounded-lg border border-[#5a0d17] px-3 py-2 text-sm font-semibold text-[#5a0d17] hover:bg-[#fef2f2]">{showPaymentForm ? "Close" : "Add Method"}</button>
            </div>

            {showPaymentForm && (
              <div className="mb-5 rounded-xl border border-[#eadfd2] bg-[#fffaf4] p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <select value={paymentDraft.type} onChange={(e) => setPaymentDraft({ ...paymentDraft, type: e.target.value })} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                  <input value={paymentDraft.detail} onChange={(e) => setPaymentDraft({ ...paymentDraft, detail: e.target.value })} placeholder={paymentDraft.type === "Cash on Delivery" ? "Pay on delivery" : "Enter method detail"} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <button onClick={() => { setShowPaymentForm(false); setEditingPaymentId(null); setPaymentDraft({ type: "UPI", detail: "" }); }} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600">Cancel</button>
                  <button onClick={handleAddPayment} className="rounded-lg bg-[#5a0d17] px-4 py-2 text-sm font-semibold text-white">{editingPaymentId !== null ? "Update Method" : "Save Method"}</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {payments.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-[#eadfd2] bg-[#fffaf4] p-4">
                  <div>
                    <p className="font-bold text-[#5a0d17]">{item.type}</p>
                    <p className="text-sm text-gray-600">{item.detail}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.isDefault && <span className="rounded-full bg-[#f2d5c7] px-2 py-1 text-[10px] font-semibold uppercase text-[#5a0d17]">Default</span>}
                    <button onClick={() => handleEditPayment(item)} className="rounded-lg border border-[#5a0d17] px-3 py-2 text-sm font-semibold text-[#5a0d17]">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "password":
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#5a0d17] mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="rounded-xl border border-[#eadfd2] bg-[#fffaf4] p-5 space-y-4 max-w-xl">
              <input type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} placeholder="Current Password" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
              <input type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} placeholder="New Password" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
              <input type="password" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} placeholder="Confirm New Password" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
              <button type="submit" className="rounded-lg bg-[#5a0d17] px-4 py-2.5 text-sm font-semibold text-white">Update Password</button>
            </form>
          </div>
        );

      case "profile":
      default:
        return (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#5a0d17]">Profile Information</h2>
              <button type="button" onClick={() => setIsEditingProfile((prev) => !prev)} className="inline-flex items-center gap-2 rounded-lg border border-[#5a0d17] bg-white px-3 py-2 text-sm font-semibold text-[#5a0d17]">
                <FiEdit2 /> {isEditingProfile ? "Cancel" : "Edit"}
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="rounded-xl border border-[#eadfd2] bg-[#fffaf4] p-5">
              <div className="space-y-4">
                {/* Profile Picture Section */}
                <div className="flex justify-center pb-4 border-b border-[#eadfd2]">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#f2d5c7] text-4xl text-[#5a0d17] overflow-hidden">
                      {profile.profilePicture ? (
                        <img src={profile.profilePicture} alt={profile.name} className="w-full h-full object-cover" />
                      ) : (
                        <FiUser />
                      )}
                    </div>
                    <label htmlFor="profilePicture" className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#5a0d17] text-white cursor-pointer hover:bg-[#3d0811] transition shadow-md">
                      <FiCamera size={16} />
                    </label>
                    <input
                      id="profilePicture"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 border-b border-[#eadfd2] pb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2d5c7] text-xl text-[#5a0d17]">
                    <FiUser />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Name</p>
                    <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} disabled={!isEditingProfile} className="mt-1 w-full bg-transparent text-lg font-bold text-[#3d0811] outline-none disabled:text-[#3d0811]" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-[#eadfd2] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2d5c7] text-[#5a0d17]"><FiMail /></span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Email</p>
                      <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} disabled={!isEditingProfile} className="mt-1 w-full bg-transparent text-sm font-medium text-[#3d0811] outline-none disabled:text-[#3d0811]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2d5c7] text-[#5a0d17]"><FiPhone /></span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Phone</p>
                      <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} disabled={!isEditingProfile} className="mt-1 w-full bg-transparent text-sm font-medium text-[#3d0811] outline-none disabled:text-[#3d0811]" />
                    </div>
                  </div>
                </div>
              </div>

              {isEditingProfile && (
                <div className="mt-5 flex justify-end">
                  <button type="submit" className="rounded-lg bg-[#5a0d17] px-5 py-2.5 text-sm font-semibold text-white">Save Changes</button>
                </div>
              )}
            </form>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-6">
      <h1 className="mb-6 text-4xl font-black text-[#5a0d17]">My Account</h1>
      <p className="mb-6 text-lg text-gray-500">Manage your orders and account details</p>

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-xl border border-[#eadfd2] bg-[#fffaf4] p-3 shadow-sm">
          {/* Profile Header */}
          <div className="mb-4 rounded-lg bg-white p-4 text-center border border-[#eadfd2]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f2d5c7] text-3xl text-[#5a0d17] mx-auto mb-3 overflow-hidden">
              {profile.profilePicture ? (
                <img src={profile.profilePicture} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <FiUser />
              )}
            </div>
            <p className="font-bold text-[#5a0d17] text-sm line-clamp-2">{profile.name}</p>
            <p className="text-xs text-gray-500 mt-1">{profile.email}</p>
          </div>

          <nav className="space-y-1">
            {menuItems.map(({ key, label, icon: Icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    if (key === "logout") {
                      handleLogout();
                      return;
                    }
                    setActiveTab(key as any);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-[15px] font-medium transition ${
                    isActive ? "bg-[#f2d5c7] text-[#5a0d17] shadow-sm" : "text-gray-700 hover:bg-[#fef2f2]"
                  }`}
                >
                  <Icon className="text-lg" />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 rounded-xl border border-[#eadfd2] bg-[#fdf5ee] p-4">
            <div className="flex items-center gap-3 text-[#5a0d17]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2d5c7]">
                <FiHeadphones />
              </div>
              <div>
                <p className="text-lg font-bold">Need Help?</p>
                <p className="text-sm text-gray-500">We are here for you!</p>
              </div>
            </div>


          </div>
        </aside>

        <main className="rounded-xl border border-[#eadfd2] bg-[#fffaf4] p-6 shadow-sm">
          {renderContent()}

          {activeTab === "profile" && (
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                { title: "100% Secure", text: "Your data is safe with us", icon: FiShield },
                { title: "Premium Quality", text: "Best quality sweets always", icon: FiStar },
                { title: "Fast Delivery", text: "Quick and reliable delivery", icon: FiTruck },
                { title: "24/7 Support", text: "We’re here to help you", icon: FiHeadphones },
              ].map(({ title, text, icon: Icon }) => (
                <div key={title} className="rounded-xl border border-[#eadfd2] bg-white p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f2d5c7] text-[#5a0d17]">
                    <Icon className="text-xl" />
                  </div>
                  <p className="font-bold text-[#5a0d17]">{title}</p>
                  <p className="mt-1 text-sm text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>


    </div>
  );
}
