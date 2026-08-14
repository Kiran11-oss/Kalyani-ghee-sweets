import { useState } from "react";
import toast from "react-hot-toast";

export default function Settings() {
  const [store, setStore] = useState({
    name: "Kalyani Ghee Sweets",
    email: "kalyanigheesweets@gmail.com",
    phone: "8341930200",
    address: "Lalazar Bazar, Hanamkonda, Telangana – 506001",
    seo_title: "Kalyani Ghee Sweets | Pure Ghee, True Taste",
    seo_description: "Authentic Telangana sweets, pickles & snacks made with pure ghee since 1999.",
  });

  const save = (e: React.FormEvent) => { e.preventDefault(); toast.success("Settings saved"); };

  return (
    <div className="space-y-5 max-w-3xl">
      <h1 className="text-xl font-bold text-gray-800">General Settings</h1>
      <form onSubmit={save} className="card p-6 space-y-4">
        <div><label className="text-sm text-gray-600 font-medium">Store Name</label><input value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="text-sm text-gray-600 font-medium">Contact Email</label><input value={store.email} onChange={(e) => setStore({ ...store, email: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" /></div>
          <div><label className="text-sm text-gray-600 font-medium">Contact Phone</label><input value={store.phone} onChange={(e) => setStore({ ...store, phone: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" /></div>
        </div>
        <div><label className="text-sm text-gray-600 font-medium">Store Address</label><textarea value={store.address} onChange={(e) => setStore({ ...store, address: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" rows={2} /></div>
        <hr />
        <h3 className="font-semibold text-gray-700">SEO &amp; Social Links</h3>
        <div><label className="text-sm text-gray-600 font-medium">SEO Title</label><input value={store.seo_title} onChange={(e) => setStore({ ...store, seo_title: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" /></div>
        <div><label className="text-sm text-gray-600 font-medium">SEO Description</label><textarea value={store.seo_description} onChange={(e) => setStore({ ...store, seo_description: e.target.value })} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" rows={2} /></div>
        <button className="btn-primary text-sm">Save Settings</button>
      </form>
    </div>
  );
}
