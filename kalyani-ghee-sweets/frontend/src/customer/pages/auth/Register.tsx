import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import { loginSuccess } from "@/redux/slices/authSlice";
import api from "@/services/api";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", password: "" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation (10 digits for Indian numbers)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ""));
  };

  // Password validation (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    
    // Real-time validation
    const newErrors = { ...errors };
    if (field === "email" && value) {
      newErrors.email = validateEmail(value) ? "" : "Invalid email format";
    }
    if (field === "phone" && value) {
      newErrors.phone = validatePhone(value) ? "" : "Phone must be 10 digits";
    }
    if (field === "password" && value) {
      newErrors.password = validatePassword(value) 
        ? "" 
        : "Password must be 8+ chars with uppercase, lowercase, number & special char";
    }
    if (field === "name" && value) {
      newErrors.name = value.trim().length >= 3 ? "" : "Name must be at least 3 characters";
    }
    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    const newErrors = { name: "", email: "", phone: "", password: "" };
    let isValid = true;

    if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!validatePhone(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
      isValid = false;
    }

    if (!validatePassword(form.password)) {
      newErrors.password = "Password must be 8+ chars with uppercase, lowercase, number & special char";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    try {
      const { data } = await api.post("/auth/register", form);
      dispatch(loginSuccess({ user: data.user, token: data.access_token }));
      toast.success("Account created!");
    } catch {
      dispatch(loginSuccess({ user: { id: Date.now(), name: form.name, email: form.email, role: "customer" }, token: "demo-token" }));
      toast("Backend not reachable — signed in with demo session", { icon: "⚠️" });
    }
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card p-8">
        <h1 className="text-xl font-display font-bold text-maroon mb-6 text-center">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              required 
              placeholder="Full Name (min 3 chars)" 
              value={form.name} 
              onChange={(e) => handleInputChange("name", e.target.value)} 
              className={`w-full border rounded-md px-3 py-2.5 text-sm ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <input 
              required 
              type="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={(e) => handleInputChange("email", e.target.value)} 
              className={`w-full border rounded-md px-3 py-2.5 text-sm ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input 
              required 
              placeholder="Phone Number (10 digits)" 
              value={form.phone} 
              onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} 
              maxLength={10}
              className={`w-full border rounded-md px-3 py-2.5 text-sm ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <input 
              required 
              type="password" 
              placeholder="Password (8+ chars, uppercase, lowercase, number, special char)" 
              value={form.password} 
              onChange={(e) => handleInputChange("password", e.target.value)} 
              className={`w-full border rounded-md px-3 py-2.5 text-sm ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            {form.password && !errors.password && <p className="text-green-600 text-xs mt-1">✓ Strong password</p>}
          </div>

          <button className="btn-primary w-full">Register</button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account? <Link to="/login" className="text-maroon font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
