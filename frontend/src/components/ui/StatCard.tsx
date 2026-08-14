import { IconType } from "react-icons";

interface Props {
  label: string;
  value: string;
  sub?: string;
  icon: IconType;
  iconBg: string;
  iconColor: string;
  trend?: string;
}

export default function StatCard({ label, value, sub, icon: Icon, iconBg, iconColor, trend }: Props) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center`} style={{ background: iconBg }}>
          <Icon size={18} style={{ color: iconColor }} />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      {(sub || trend) && (
        <div className="text-xs text-gray-400 flex items-center gap-1">
          {trend && <span className="text-green-500 font-semibold">{trend}</span>}
          {sub}
        </div>
      )}
    </div>
  );
}
