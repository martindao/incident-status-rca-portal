interface UptimeSparklineProps {
  uptime: number;
  className?: string;
}

export function UptimeSparkline({ uptime, className = '' }: UptimeSparklineProps) {
  // Generate 90 data points representing 90 days of uptime
  // Higher uptime = higher values, with some realistic variation
  const generateData = () => {
    const data: number[] = [];
    const baseValue = uptime / 100; // Convert to 0-1 scale
    
    for (let i = 0; i < 90; i++) {
      // Add small random variation around the base uptime
      const variation = (Math.random() - 0.5) * 0.02;
      const value = Math.max(0.85, Math.min(1, baseValue + variation));
      data.push(value);
    }
    return data;
  };

  const data = generateData();
  const width = 200;
  const height = 30;
  const padding = 2;
  
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue || 1;
  
  // Generate SVG path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  // Determine color based on uptime
  const getColor = () => {
    if (uptime >= 99.9) return '#10b981'; // emerald-500
    if (uptime >= 99.5) return '#22c55e'; // green-500
    if (uptime >= 99) return '#eab308';   // yellow-500
    return '#f97316';                      // orange-500
  };

  return (
    <svg
      width={width}
      height={height}
      className={`overflow-visible ${className}`}
      aria-label={`Uptime sparkline showing ${uptime}% uptime over 90 days`}
    >
      {/* Background grid lines */}
      <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
      
      {/* Sparkline path */}
      <path
        d={pathD}
        fill="none"
        stroke={getColor()}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* End dot */}
      <circle
        cx={width}
        cy={height - padding - ((data[data.length - 1] - minValue) / range) * (height - 2 * padding)}
        r="3"
        fill={getColor()}
      />
    </svg>
  );
}
