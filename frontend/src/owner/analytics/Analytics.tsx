import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { orderStatusSplit, topStores } from "@/utils/mockData";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Analytics</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-bold text-gray-800 mb-3">Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={orderStatusSplit} dataKey="value" nameKey="name" outerRadius={100} label>
                {orderStatusSplit.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-gray-800 mb-3">Store Performance</h3>
          <div className="space-y-3">
            {topStores.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-700 font-medium">{s.name}</span><span className="text-gray-500">₹{s.revenue.toLocaleString()}</span></div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full" style={{ width: `${(s.revenue / topStores[0].revenue) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
