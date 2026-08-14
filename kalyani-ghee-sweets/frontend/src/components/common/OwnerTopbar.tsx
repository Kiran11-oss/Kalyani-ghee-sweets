import { FiCalendar, FiBell, FiChevronDown } from "react-icons/fi";
import { useAppSelector } from "@/hooks/redux";

export default function OwnerTopbar() {
  const user = useAppSelector((s) => s.auth.user);
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-6">
      <div>
        <p className="text-sm text-gray-400">Welcome back,</p>
        <h2 className="text-lg font-bold text-gray-800">{user?.name || "Admin Owner"}</h2>
      </div>
      <div className="flex items-center gap-5">
        <div className="hidden md:flex items-center gap-2 border rounded-md px-3 py-2 text-sm text-gray-600">
          <FiCalendar /> {today}
        </div>
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <FiBell size={20} className="text-gray-500" />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">5</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-maroon/10 text-maroon font-bold flex items-center justify-center">
            {(user?.name || "AO").split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-semibold text-gray-800 leading-tight">{user?.name || "Admin Owner"}</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
          <FiChevronDown className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}
