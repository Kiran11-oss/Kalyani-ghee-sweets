import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import DataTable, { Column } from "@/components/tables/DataTable";
import { products as seedProducts } from "@/utils/mockData";
import { Product } from "@/types";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", unit: "1 kg", category_name: "Sweets", stock: "" });

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  const columns: Column<Product>[] = [
    { header: "Product", accessor: (p) => (
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded bg-gold/10 flex items-center justify-center text-2xl">🍬</div>
          <div>
            <p className="font-semibold text-gray-800">{p.name}</p>
            <p className="text-xs text-gray-400">{p.unit}</p>
          </div>
        </div>
      ) },
    { header: "Category", accessor: (p) => p.category_name },
    { header: "Price", accessor: (p) => `₹${p.price}` },
    { header: "Stock", accessor: (p) => (
        <span className={p.stock < 20 ? "text-red-500 font-semibold" : "text-gray-700"}>{p.stock} units</span>
      ) },
    { header: "Rating", accessor: (p) => `⭐ ${p.rating ?? "-"} (${p.reviews_count ?? 0})` },
    { header: "Actions", accessor: (p) => (
        <div className="flex gap-2">
          <button className="p-2 rounded hover:bg-gray-100 text-blue-600"><FiEdit2 size={15} /></button>
          <button onClick={() => { setProducts((ps) => ps.filter((x) => x.id !== p.id)); toast.success("Product deleted"); }} className="p-2 rounded hover:bg-gray-100 text-red-500"><FiTrash2 size={15} /></button>
        </div>
      ) },
  ];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now(),
      name: form.name,
      slug: form.name.toLowerCase().replace(/\s+/g, "-"),
      category_id: 0,
      category_name: form.category_name,
      price: Number(form.price) || 0,
      unit: form.unit,
      image: "placeholder.jpg",
      stock: Number(form.stock) || 0,
      rating: 0,
      reviews_count: 0,
    };
    setProducts((ps) => [newProduct, ...ps]);
    setShowForm(false);
    setForm({ name: "", price: "", unit: "1 kg", category_name: "Sweets", stock: "" });
    toast.success("Product added");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-bold text-gray-800">Products <span className="text-gray-400 font-normal text-sm">({products.length})</span></h1>
        <div className="flex gap-3">
          <div className="flex items-center border rounded-md px-3 bg-white">
            <FiSearch className="text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="px-2 py-2 outline-none text-sm" />
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 text-sm"><FiPlus /> Add Product</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="card p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="text-xs text-gray-500">Product Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Price (₹)</label>
            <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Stock</label>
            <input required type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
          </div>
          <div className="flex gap-2">
            <button className="btn-primary text-sm flex-1">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="border rounded-md px-3 py-2 text-sm">Cancel</button>
          </div>
        </form>
      )}

      <DataTable columns={columns} data={filtered} keyField={(p) => p.id} />
    </div>
  );
}
