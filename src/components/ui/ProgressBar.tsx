interface ProgressBarProps {
  value: number;
  color?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({
  value,
  color = "#0EA5E9",
  showLabel = true,
  size = "md",
}: ProgressBarProps) {
  const height = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {showLabel && (
          <span className="text-xs text-gray-500">
            Progress
          </span>
        )}

        {showLabel && (
          <span className="text-xs font-semibold text-[#0A2942]">
            {value}%
          </span>
        )}
      </div>

      <div
        className={`w-full overflow-hidden rounded-full bg-gray-100 ${height[size]}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out`}
          style={{
            width: `${Math.min(100, Math.max(0, value))}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
