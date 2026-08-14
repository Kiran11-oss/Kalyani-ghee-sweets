import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import DataTable, { Column } from "@/components/tables/DataTable";
import { coupons as seed } from "@/utils/mockData";
import { Coupon } from "@/types";
import toast from "react-hot-toast";

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(seed);
  const [form, setForm] = useState({ code: "", discount_value: "", min_order: "" });

  const addCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCoupons((c) => [...c, {
      id: Date.now(), code: form.code.toUpperCase(), discount_type: "flat",
      discount_value: Number(form.discount_value), min_order: Number(form.min_order),
      expiry: "2026-12-31", active: true,
    }]);
    setForm({ code: "", discount_value: "", min_order: "" });
    toast.success("Coupon created");
  };

  const columns: Column<Coupon>[] = [
    { header: "Code", accessor: (c) => <span className="font-mono font-bold text-maroon">{c.code}</span> },
    { header: "Discount", accessor: (c) => c.discount_type === "flat" ? `₹${c.discount_value} off` : `${c.discount_value}% off` },
    { header: "Min Order", accessor: (c) => `₹${c.min_order}` },
    { header: "Expiry", accessor: (c) => c.expiry },
    { header: "Status", accessor: (c) => <span className={c.active ? "text-green-600 font-semibold text-xs" : "text-gray-400 text-xs"}>{c.active ? "Active" : "Expired"}</span> },
    { header: "Actions", accessor: (c) => <button onClick={() => { setCoupons((cs) => cs.filter((x) => x.id !== c.id)); toast.success("Coupon deleted"); }} className="p-2 rounded hover:bg-gray-100 text-red-500"><FiTrash2 size={15} /></button> },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-gray-800">Discount Coupons</h1>
      <form onSubmit={addCoupon} className="card p-5 grid sm:grid-cols-4 gap-3 items-end">
        <div><label className="text-xs text-gray-500">Code</label><input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" /></div>
        <div><label className="text-xs text-gray-500">Discount (₹)</label><input required type="number" value={form.discount_value} onChange={(e) => setForm({ ...form, discount_value: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" /></div>
        <div><label className="text-xs text-gray-500">Min Order (₹)</label><input required type="number" value={form.min_order} onChange={(e) => setForm({ ...form, min_order: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" /></div>
        <button className="btn-primary flex items-center gap-2 justify-center text-sm"><FiPlus /> Create Coupon</button>
      </form>
      <DataTable columns={columns} data={coupons} keyField={(c) => c.id} />
    </div>
  );
}
