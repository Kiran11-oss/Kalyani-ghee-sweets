import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import DataTable, { Column } from "@/components/tables/DataTable";
import { categories as seed, products } from "@/utils/mockData";
import { Category } from "@/types";
import toast from "react-hot-toast";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(seed);
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const columns: Column<Category>[] = [
    { header: "Icon", accessor: (c) => <span className="text-2xl">{c.icon}</span> },
    { header: "Category Name", accessor: (c) => <span className="font-semibold text-gray-800">{c.name}</span> },
    { header: "Slug", accessor: (c) => <span className="text-gray-500">/{c.slug}</span> },
    { header: "Products", accessor: (c) => products.filter((p) => p.category_id === c.id).length },
    { header: "Actions", accessor: (c) => (
        <div className="flex gap-2">
          <button className="p-2 rounded hover:bg-gray-100 text-blue-600"><FiEdit2 size={15} /></button>
          <button onClick={() => { setCategories((cs) => cs.filter((x) => x.id !== c.id)); toast.success("Category deleted"); }} className="p-2 rounded hover:bg-gray-100 text-red-500"><FiTrash2 size={15} /></button>
        </div>
      ) },
  ];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setCategories((cs) => [...cs, { id: Date.now(), name, slug: name.toLowerCase().replace(/\s+/g, "-"), icon: "🍽️" }]);
    setName("");
    setShowForm(false);
    toast.success("Category added");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Categories <span className="text-gray-400 font-normal text-sm">({categories.length})</span></h1>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 text-sm"><FiPlus /> Add Category</button>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} className="card p-5 flex gap-3 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-gray-500">Category Name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
          </div>
          <button className="btn-primary text-sm">Save</button>
          <button type="button" onClick={() => setShowForm(false)} className="border rounded-md px-3 py-2 text-sm">Cancel</button>
        </form>
      )}
      <DataTable columns={columns} data={categories} keyField={(c) => c.id} />
    </div>
  );
}
