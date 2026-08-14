import DataTable, { Column } from "@/components/tables/DataTable";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { FiDollarSign, FiCreditCard, FiClock, FiRotateCcw } from "react-icons/fi";
import { orders, dashboardStats } from "@/utils/mockData";
import { Order } from "@/types";

const paymentStatus = (o: Order) => (o.status === "Cancelled" ? "Refunded" : o.status === "Pending" ? "Pending" : "Paid");

export default function Payments() {
  const columns: Column<Order>[] = [
    { header: "Order #", accessor: (o) => <span className="font-semibold text-maroon">#{o.order_number}</span> },
    { header: "Customer", accessor: (o) => o.customer_name },
    { header: "Method", accessor: (o) => o.payment_method },
    { header: "Amount", accessor: (o) => `₹${o.total.toLocaleString()}` },
    { header: "Date", accessor: (o) => new Date(o.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
    { header: "Status", accessor: (o) => <StatusBadge status={paymentStatus(o) === "Paid" ? "Delivered" : paymentStatus(o) === "Pending" ? "Pending" : "Cancelled"} /> },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-gray-800">Payments &amp; Transactions</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={`₹${dashboardStats.totalRevenue.toLocaleString()}`} icon={FiDollarSign} iconBg="#E9F9EF" iconColor="#22C55E" />
        <StatCard label="Total Payments" value={`₹${dashboardStats.totalPayments.toLocaleString()}`} icon={FiCreditCard} iconBg="#EEF2FF" iconColor="#6366F1" />
        <StatCard label="Pending Payments" value={`₹${dashboardStats.pendingPayments.toLocaleString()}`} icon={FiClock} iconBg="#FFF7E6" iconColor="#D4A017" />
        <StatCard label="Refunds" value={`₹${dashboardStats.refunds.toLocaleString()}`} icon={FiRotateCcw} iconBg="#FDEDF0" iconColor="#7A0C1E" />
      </div>
      <DataTable columns={columns} data={orders} keyField={(o) => o.id} />
    </div>
  );
}
