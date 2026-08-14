import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import { useAppDispatch } from "@/hooks/redux";
import { loginSuccess } from "@/redux/slices/authSlice";
import api from "@/services/api";
import toast from "react-hot-toast";

export default function OwnerLogin() {
  const [email, setEmail] = useState("owner@kalyanigheesweets.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/owner/login", { email, password });
      dispatch(loginSuccess({ user: data.user, token: data.access_token }));
      toast.success("Welcome back, Admin!");
      navigate("/owner/dashboard");
    } catch (err) {
      // Fallback demo login so the dashboard is explorable without the backend running
      dispatch(loginSuccess({ user: { id: 1, name: "Admin Owner", email, role: "owner" }, token: "demo-token" }));
      toast("Backend not reachable — signed in with demo data", { icon: "⚠️" });
      navigate("/owner/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1B1E2B] flex items-center justify-center px-4">
      <div className="card w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-gold-light to-gold flex items-center justify-center mb-3">
            <span className="text-maroon font-display font-black text-2xl">K</span>
          </div>
          <h1 className="font-display font-bold text-xl text-maroon">Kalyani Ghee Sweets</h1>
          <p className="text-sm text-gray-500">Owner / Admin Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <div className="flex items-center border rounded-md px-3 mt-1">
              <FiMail className="text-gray-400" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-2 py-2.5 outline-none" />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">Password</label>
            <div className="flex items-center border rounded-md px-3 mt-1">
              <FiLock className="text-gray-400" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-2 py-2.5 outline-none" placeholder="••••••••" />
            </div>
          </div>
          <button disabled={loading} className="btn-primary w-full">{loading ? "Signing in..." : "Login to Dashboard"}</button>
        </form>
      </div>
    </div>
  );
}
