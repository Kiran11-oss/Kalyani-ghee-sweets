import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { revenueByDay, ordersByDay, dashboardStats } from "@/utils/mockData";

export default function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Sales, Revenue &amp; Performance Reports</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card p-5"><p className="text-sm text-gray-500">Total Revenue (7d)</p><p className="text-2xl font-bold text-gray-800">₹{dashboardStats.totalRevenue.toLocaleString()}</p></div>
        <div className="card p-5"><p className="text-sm text-gray-500">Total Orders (7d)</p><p className="text-2xl font-bold text-gray-800">{dashboardStats.totalOrders.toLocaleString()}</p></div>
        <div className="card p-5"><p className="text-sm text-gray-500">Avg Order Value</p><p className="text-2xl font-bold text-gray-800">₹{Math.round(dashboardStats.totalRevenue / dashboardStats.totalOrders)}</p></div>
      </div>
      <div className="card p-5">
        <h3 className="font-bold text-gray-800 mb-3">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueByDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#7A0C1E" strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="card p-5">
        <h3 className="font-bold text-gray-800 mb-3">Orders Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={ordersByDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#D4A017" strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
