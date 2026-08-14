import { useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";
import DataTable, { Column } from "@/components/tables/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import { orders as seed } from "@/utils/mockData";
import { Order } from "@/types";
import toast from "react-hot-toast";

const STATUSES: Order["status"][] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(seed);
  const [query, setQuery] = useState("");

  const filtered = orders.filter(
    (o) => o.order_number.toLowerCase().includes(query.toLowerCase()) || o.customer_name.toLowerCase().includes(query.toLowerCase())
  );

  const updateStatus = (id: number, status: Order["status"]) => {
    setOrders((os) => os.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success("Order status updated");
  };

  const columns: Column<Order>[] = [
    { header: "Order #", accessor: (o) => <span className="font-semibold text-maroon">#{o.order_number}</span> },
    { header: "Customer", accessor: (o) => o.customer_name },
    { header: "Items", accessor: (o) => o.items.map((i) => `${i.product_name} x${i.quantity}`).join(", ") },
    { header: "Total", accessor: (o) => `₹${o.total.toLocaleString()}` },
    { header: "Payment", accessor: (o) => o.payment_method },
    { header: "Date", accessor: (o) => new Date(o.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
    { header: "Status", accessor: (o) => (
        <select
          value={o.status}
          onChange={(e) => updateStatus(o.id, e.target.value as Order["status"])}
          className="border-0 bg-transparent text-xs font-semibold outline-none cursor-pointer"
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      ) },
    { header: "", accessor: (o) => <button className="p-2 rounded hover:bg-gray-100 text-gray-500"><FiEye size={15} /></button> },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-bold text-gray-800">Orders <span className="text-gray-400 font-normal text-sm">({orders.length})</span></h1>
        <div className="flex items-center border rounded-md px-3 bg-white">
          <FiSearch className="text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search order # or customer..." className="px-2 py-2 outline-none text-sm w-64" />
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        {STATUSES.map((s) => (
          <div key={s} className="card px-4 py-2 flex items-center gap-2 text-sm">
            <StatusBadge status={s} /> {orders.filter((o) => o.status === s).length}
          </div>
        ))}
      </div>
      <DataTable columns={columns} data={filtered} keyField={(o) => o.id} />
    </div>
  );
}
