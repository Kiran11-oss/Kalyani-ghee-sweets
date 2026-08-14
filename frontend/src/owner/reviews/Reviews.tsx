import { useState } from "react";
import { FiTrash2, FiCheck, FiEyeOff } from "react-icons/fi";
import DataTable, { Column } from "@/components/tables/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import { reviews as seed } from "@/utils/mockData";
import { Review } from "@/types";
import toast from "react-hot-toast";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(seed);

  const setStatus = (id: number, status: Review["status"]) => {
    setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`Review ${status.toLowerCase()}`);
  };

  const columns: Column<Review>[] = [
    { header: "Product", accessor: (r) => r.product_name },
    { header: "Customer", accessor: (r) => r.customer_name },
    { header: "Rating", accessor: (r) => "⭐".repeat(r.rating) },
    { header: "Comment", accessor: (r) => <span className="max-w-xs block truncate">{r.comment}</span> },
    { header: "Date", accessor: (r) => r.created_at },
    { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
    { header: "Actions", accessor: (r) => (
        <div className="flex gap-2">
          <button onClick={() => setStatus(r.id, "Published")} className="p-2 rounded hover:bg-gray-100 text-green-600" title="Publish"><FiCheck size={15} /></button>
          <button onClick={() => setStatus(r.id, "Hidden")} className="p-2 rounded hover:bg-gray-100 text-gray-500" title="Hide"><FiEyeOff size={15} /></button>
          <button onClick={() => { setReviews((rs) => rs.filter((x) => x.id !== r.id)); toast.success("Review deleted"); }} className="p-2 rounded hover:bg-gray-100 text-red-500"><FiTrash2 size={15} /></button>
        </div>
      ) },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-gray-800">Product Reviews <span className="text-gray-400 font-normal text-sm">({reviews.length})</span></h1>
      <DataTable columns={columns} data={reviews} keyField={(r) => r.id} />
    </div>
  );
}
