const styles: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Pending: "bg-orange-100 text-orange-700",
  Cancelled: "bg-red-100 text-red-700",
  Published: "bg-green-100 text-green-700",
  Hidden: "bg-gray-100 text-gray-600",
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-600",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
