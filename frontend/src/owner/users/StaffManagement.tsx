import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import DataTable, { Column } from "@/components/tables/DataTable";
import toast from "react-hot-toast";

interface Staff { id: number; name: string; email: string; role: string; }

export default function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>([
    { id: 1, name: "Admin Owner", email: "owner@kalyanigheesweets.com", role: "Super Admin" },
    { id: 2, name: "Ravi Teja", email: "ravi@kalyanigheesweets.com", role: "Order Manager" },
    { id: 3, name: "Priya Sharma", email: "priya@kalyanigheesweets.com", role: "Content Editor" },
  ]);

  const columns: Column<Staff>[] = [
    { header: "Name", accessor: (s) => <span className="font-semibold text-gray-800">{s.name}</span> },
    { header: "Email", accessor: (s) => s.email },
    { header: "Role", accessor: (s) => <span className="text-xs font-semibold bg-gold/20 text-maroon px-2 py-1 rounded-full">{s.role}</span> },
    { header: "Actions", accessor: (s) => <button onClick={() => { setStaff((st) => st.filter((x) => x.id !== s.id)); toast.success("Staff removed"); }} className="p-2 rounded hover:bg-gray-100 text-red-500"><FiTrash2 size={15} /></button> },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Staff Management</h1>
        <button onClick={() => toast("Invite form coming soon")} className="btn-primary flex items-center gap-2 text-sm"><FiPlus /> Invite Staff</button>
      </div>
      <DataTable columns={columns} data={staff} keyField={(s) => s.id} />
    </div>
  );
}
