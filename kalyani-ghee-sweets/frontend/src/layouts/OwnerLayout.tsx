import { Outlet } from "react-router-dom";
import OwnerSidebar from "@/components/common/OwnerSidebar";
import OwnerTopbar from "@/components/common/OwnerTopbar";

export default function OwnerLayout() {
  return (
    <div className="flex min-h-screen bg-[#F4F6FA]">
      <OwnerSidebar />
      <div className="flex-1 min-w-0">
        <OwnerTopbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
