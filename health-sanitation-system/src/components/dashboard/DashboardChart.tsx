interface DashboardChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
}

export default function DashboardChart({
  data,
  color = "#059669",
  height = 200,
}: DashboardChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  const width = 100 / data.length;

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox={`0 0 100 100`} preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={data
            .map((d, i) => {
              const x = i * width + width / 2;
              const y = 100 - (d.value / max) * 80;
              return `${x},${y}`;
            })
            .join(" ")}
        />
        <polygon
          fill="url(#chartGradient)"
          points={`0,100 ${data
            .map((d, i) => {
              const x = i * width + width / 2;
              const y = 100 - (d.value / max) * 80;
              return `${x},${y}`;
            })
            .join(" ")} 100,100`}
        />
        {data.map((d, i) => {
          const x = i * width + width / 2;
          const y = 100 - (d.value / max) * 80;
          return (
            <circle key={i} cx={x} cy={y} r="1.5" fill={color} />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
