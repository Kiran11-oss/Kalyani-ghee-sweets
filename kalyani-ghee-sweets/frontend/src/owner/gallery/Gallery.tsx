import { useState } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Gallery() {
  const [images, setImages] = useState(Array.from({ length: 8 }, (_, i) => ({ id: i + 1 })));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Gallery <span className="text-gray-400 font-normal text-sm">({images.length} images)</span></h1>
        <button onClick={() => { setImages((im) => [...im, { id: Date.now() }]); toast.success("Image uploaded"); }} className="btn-primary flex items-center gap-2 text-sm"><FiUpload /> Upload Image</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((img) => (
          <div key={img.id} className="card aspect-square flex items-center justify-center relative group overflow-hidden">
            <span className="text-4xl">🍯</span>
            <button onClick={() => setImages((im) => im.filter((x) => x.id !== img.id))} className="absolute top-1 right-1 bg-white/90 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><FiTrash2 size={13} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
