import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "bg-emerald-100 text-emerald-600",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              {changeType === "positive" && <TrendingUp className="w-4 h-4 text-emerald-600" />}
              {changeType === "negative" && <TrendingDown className="w-4 h-4 text-red-600" />}
              <span
                className={`text-xs font-medium ${
                  changeType === "positive"
                    ? "text-emerald-600"
                    : changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
