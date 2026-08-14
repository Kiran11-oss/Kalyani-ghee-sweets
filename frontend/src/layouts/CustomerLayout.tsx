import { Outlet } from "react-router-dom";
import CustomerHeader from "@/components/common/CustomerHeader";
import CustomerFooter from "@/components/common/CustomerFooter";

export default function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <CustomerHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <CustomerFooter />
    </div>
  );
}
