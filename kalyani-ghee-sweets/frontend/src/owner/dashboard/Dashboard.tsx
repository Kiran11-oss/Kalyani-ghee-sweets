import { FiShoppingBag, FiDollarSign, FiCreditCard, FiUsers, FiBox, FiPackage } from "react-icons/fi";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { Link } from "react-router-dom";
import {
  dashboardStats, orders, topStores, revenueByDay, ordersByDay, orderStatusSplit,
} from "@/utils/mockData";

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard label="Total Stores" value={String(dashboardStats.totalStores)} sub="Active Stores" icon={HiOutlineBuildingStorefront} iconBg="#EEF2FF" iconColor="#6366F1" />
        <StatCard label="Total Orders" value={dashboardStats.totalOrders.toLocaleString()} trend="↑ 18.6%" sub="vs last month" icon={FiShoppingBag} iconBg="#FFF7E6" iconColor="#D4A017" />
        <StatCard label="Total Revenue" value={fmt(dashboardStats.totalRevenue)} trend="↑ 22.4%" sub="vs last month" icon={FiDollarSign} iconBg="#E9F9EF" iconColor="#22C55E" />
        <StatCard label="Total Payments" value={fmt(dashboardStats.totalPayments)} trend="↑ 20.8%" sub="vs last month" icon={FiCreditCard} iconBg="#EEF2FF" iconColor="#6366F1" />
        <StatCard label="Total Customers" value={dashboardStats.totalCustomers.toLocaleString()} trend="↑ 15.3%" sub="vs last month" icon={FiUsers} iconBg="#FDEDF0" iconColor="#7A0C1E" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">Orders Overview</h3>
            <select className="text-xs border rounded-md px-2 py-1 text-gray-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={ordersByDay}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#D4A017" strokeWidth={2.5} dot={{ r: 4, fill: "#D4A017" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">Recent Orders</h3>
            <Link to="/owner/orders" className="text-xs text-maroon font-semibold hover:underline">View All</Link>
          </div>
          <div className="divide-y">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <p className="font-semibold text-gray-800">#{o.order_number}</p>
                  <p className="text-xs text-gray-400">{o.store_name}</p>
                </div>
                <p className="text-gray-600">₹{o.total.toLocaleString()}</p>
                <p className="text-xs text-gray-400 hidden sm:block">
                  {new Date(o.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })},{" "}
                  {new Date(o.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                </p>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">Revenue Overview</h3>
            <select className="text-xs border rounded-md px-2 py-1 text-gray-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Bar dataKey="revenue" fill="#22C55E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Top Stores</h3>
            <Link to="/owner/customers" className="text-xs text-maroon font-semibold hover:underline">View All</Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b">
                <th className="pb-2 font-medium">Store Name</th>
                <th className="pb-2 font-medium">Orders</th>
                <th className="pb-2 font-medium">Revenue</th>
                <th className="pb-2 font-medium">Customers</th>
              </tr>
            </thead>
            <tbody>
              {topStores.map((s) => (
                <tr key={s.name} className="border-b last:border-0">
                  <td className="py-2.5 font-medium text-gray-700">{s.name}</td>
                  <td className="py-2.5 text-gray-600">{s.orders}</td>
                  <td className="py-2.5 text-gray-600">₹{s.revenue.toLocaleString()}</td>
                  <td className="py-2.5 text-gray-600">{s.customers.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-bold text-gray-800 mb-2">Orders Status</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={orderStatusSplit} dataKey="value" innerRadius={45} outerRadius={80} paddingAngle={2}>
                  {orderStatusSplit.map((s) => <Cell key={s.name} fill={s.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ul className="space-y-2 text-sm flex-1">
              {orderStatusSplit.map((s) => {
                const total = orderStatusSplit.reduce((a, b) => a + b.value, 0);
                return (
                  <li key={s.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-600">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} /> {s.name}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {s.value.toLocaleString()} ({Math.round((s.value / total) * 100)}%)
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Payment Overview</h3>
            <button className="text-xs text-maroon font-semibold hover:underline">View Report</button>
          </div>
          <ul className="divide-y text-sm">
            <li className="flex justify-between py-2.5"><span className="text-gray-500">Total Revenue</span><span className="font-semibold">{fmt(dashboardStats.totalRevenue)}</span></li>
            <li className="flex justify-between py-2.5"><span className="text-gray-500">Total Payments</span><span className="font-semibold">{fmt(dashboardStats.totalPayments)}</span></li>
            <li className="flex justify-between py-2.5"><span className="text-gray-500">Pending Payments</span><span className="font-semibold text-amber-600">{fmt(dashboardStats.pendingPayments)}</span></li>
            <li className="flex justify-between py-2.5"><span className="text-gray-500">Refunds</span><span className="font-semibold text-red-500">{fmt(dashboardStats.refunds)}</span></li>
          </ul>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card p-5">
        <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { label: "Add Product", icon: FiBox, to: "/owner/products", color: "#22C55E", bg: "#E9F9EF" },
            { label: "Add Category", icon: FiPackage, to: "/owner/categories", color: "#6366F1", bg: "#EEF2FF" },
            { label: "Add Banner", icon: FiPackage, to: "/owner/banners", color: "#D4A017", bg: "#FFF7E6" },
            { label: "Add Coupon", icon: FiPackage, to: "/owner/coupons", color: "#7A0C1E", bg: "#FDEDF0" },
            { label: "View Orders", icon: FiShoppingBag, to: "/owner/orders", color: "#3B82F6", bg: "#EFF6FF" },
            { label: "Store Settings", icon: FiUsers, to: "/owner/settings", color: "#374151", bg: "#F3F4F6" },
          ].map((a) => (
            <Link key={a.label} to={a.to} className="flex flex-col items-center gap-2 p-3 rounded-lg border hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: a.bg }}>
                <a.icon style={{ color: a.color }} />
              </div>
              <span className="text-xs font-medium text-gray-600 text-center">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
