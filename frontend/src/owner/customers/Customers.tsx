import { useState } from "react";
import { FiSearch, FiMail, FiPhone } from "react-icons/fi";
import DataTable, { Column } from "@/components/tables/DataTable";
import { customers as seed } from "@/utils/mockData";
import { Customer } from "@/types";

export default function Customers() {
  const [query, setQuery] = useState("");
  const filtered = seed.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  const columns: Column<Customer>[] = [
    { header: "Customer", accessor: (c) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-maroon/10 text-maroon font-bold flex items-center justify-center text-sm">
            {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <span className="font-semibold text-gray-800">{c.name}</span>
        </div>
      ) },
    { header: "Contact", accessor: (c) => (
        <div className="text-xs text-gray-500 space-y-0.5">
          <p className="flex items-center gap-1"><FiMail size={12} /> {c.email}</p>
          <p className="flex items-center gap-1"><FiPhone size={12} /> {c.phone}</p>
        </div>
      ) },
    { header: "Orders", accessor: (c) => c.orders_count },
    { header: "Total Spent", accessor: (c) => `₹${c.total_spent.toLocaleString()}` },
    { header: "Joined", accessor: (c) => new Date(c.joined_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
    { header: "Actions", accessor: () => <button className="text-xs text-maroon font-semibold hover:underline">View Profile</button> },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-bold text-gray-800">Customers <span className="text-gray-400 font-normal text-sm">({seed.length})</span></h1>
        <div className="flex items-center border rounded-md px-3 bg-white">
          <FiSearch className="text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customers..." className="px-2 py-2 outline-none text-sm w-64" />
        </div>
      </div>
      <DataTable columns={columns} data={filtered} keyField={(c) => c.id} />
    </div>
  );
}
