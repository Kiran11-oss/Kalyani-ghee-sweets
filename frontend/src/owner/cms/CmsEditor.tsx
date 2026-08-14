import { useState } from "react";
import toast from "react-hot-toast";

const pages = ["Home Page", "About Us", "Contact Us", "Footer", "Shipping Policy", "Privacy Policy", "Terms & Conditions"];

export default function CmsEditor() {
  const [active, setActive] = useState(pages[0]);
  const [content, setContent] = useState("Edit the content for this page here...");

  const save = () => toast.success(`${active} updated`);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-gray-800">CMS Pages Editor</h1>
      <div className="flex gap-6">
        <div className="w-56 shrink-0 card p-2">
          {pages.map((p) => (
            <button key={p} onClick={() => setActive(p)} className={`w-full text-left px-3 py-2.5 rounded-md text-sm ${active === p ? "bg-gold/20 text-maroon font-semibold" : "hover:bg-gray-50 text-gray-600"}`}>
              {p}
            </button>
          ))}
        </div>
        <div className="flex-1 card p-5 space-y-4">
          <h2 className="font-semibold text-gray-800">{active}</h2>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="w-full border rounded-md p-3 text-sm outline-none" />
          <button onClick={save} className="btn-primary text-sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
