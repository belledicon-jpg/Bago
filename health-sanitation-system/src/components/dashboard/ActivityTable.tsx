import { Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "completed" | "pending" | "warning" | "error";
}

const statusConfig = {
  completed: { icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
  pending: { icon: Clock, color: "text-yellow-600 bg-yellow-50" },
  warning: { icon: AlertCircle, color: "text-orange-600 bg-orange-50" },
  error: { icon: XCircle, color: "text-red-600 bg-red-50" },
};

interface ActivityTableProps {
  activities: ActivityItem[];
}

export default function ActivityTable({ activities }: ActivityTableProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const { icon: Icon, color } = statusConfig[activity.status];
        return (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500 mt-0.5">{activity.description}</p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
          </div>
        );
      })}
    </div>
  );
}
