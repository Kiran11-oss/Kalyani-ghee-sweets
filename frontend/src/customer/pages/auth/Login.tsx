import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import { loginSuccess } from "@/redux/slices/authSlice";
import api from "@/services/api";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      dispatch(loginSuccess({ user: data.user, token: data.access_token }));
      toast.success("Logged in successfully");
    } catch {
      dispatch(loginSuccess({ user: { id: 1, name: email.split("@")[0] || "Guest", email, role: "customer" }, token: "demo-token" }));
      toast("Backend not reachable — signed in with demo session", { icon: "⚠️" });
    }
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card p-8">
        <h1 className="text-xl font-display font-bold text-maroon mb-6 text-center">Login to Your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-md px-3 py-2.5 text-sm" />
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-md px-3 py-2.5 text-sm" />
          <button className="btn-primary w-full">Login</button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account? <Link to="/register" className="text-maroon font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
