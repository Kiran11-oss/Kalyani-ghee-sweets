import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { banners as seed } from "@/utils/mockData";
import { Banner } from "@/types";
import toast from "react-hot-toast";

export default function Banners() {
  const [banners, setBanners] = useState<Banner[]>(seed);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const addBanner = (e: React.FormEvent) => {
    e.preventDefault();
    setBanners((b) => [...b, { id: Date.now(), title, subtitle, image: "new-banner.jpg", active: true }]);
    setTitle(""); setSubtitle("");
    toast.success("Banner added");
  };

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-gray-800">Homepage Banners</h1>
      <form onSubmit={addBanner} className="card p-5 grid sm:grid-cols-3 gap-3 items-end">
        <div><label className="text-xs text-gray-500">Title</label><input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" /></div>
        <div><label className="text-xs text-gray-500">Subtitle</label><input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full border rounded-md px-3 py-2 mt-1 text-sm" /></div>
        <button className="btn-primary flex items-center gap-2 justify-center text-sm"><FiPlus /> Add Banner</button>
      </form>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((b) => (
          <div key={b.id} className="card overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-maroon to-gold flex items-center justify-center text-white font-display font-bold text-center px-3">{b.title}</div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{b.subtitle}</p>
                <span className={`text-xs font-semibold ${b.active ? "text-green-600" : "text-gray-400"}`}>{b.active ? "Active" : "Inactive"}</span>
              </div>
              <button onClick={() => { setBanners((bs) => bs.filter((x) => x.id !== b.id)); toast.success("Banner removed"); }} className="p-2 rounded hover:bg-gray-100 text-red-500"><FiTrash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
