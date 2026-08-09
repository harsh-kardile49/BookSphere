interface Segment {
  label: string;
  value: number;
  color: string;
}

const segments: Segment[] = [
  { label: "Available", value: 74, color: "#10b981" },
  { label: "Issued", value: 18, color: "#4f46e5" },
  { label: "Reserved", value: 6, color: "#f59e0b" },
  { label: "Maintenance", value: 2, color: "#94a3b8" },
];

const AvailabilityRing = () => {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const radius = 62;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;
  const cx = 80;
  const cy = 80;

  let cumulativeOffset = 0;

  return (
    <div className="dash-card" style={{ height: "100%" }}>
      <div className="dash-card-header">
        <h6 className="section-title">Library Availability</h6>
      </div>

      <div className="d-flex align-items-center gap-4">
        {/* Ring */}
        <div style={{ flexShrink: 0 }}>
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="var(--bs-slate-100)"
              strokeWidth={stroke}
            />
            {/* Segments */}
            {segments.map((seg) => {
              const segLen = (seg.value / total) * circumference;
              const gap = 3;
              const dashLen = Math.max(segLen - gap, 0);
              const offset = circumference * 0.25 - cumulativeOffset;
              cumulativeOffset += segLen;

              return (
                <circle
                  key={seg.label}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={stroke}
                  strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dasharray 0.4s ease" }}
                />
              );
            })}
            {/* Center text */}
            <text
              x={cx}
              y={cy - 6}
              textAnchor="middle"
              fontSize="22"
              fontWeight="700"
              fill="var(--text-primary)"
              fontFamily="Inter, sans-serif"
            >
              {segments[0].value}%
            </text>
            <text
              x={cx}
              y={cy + 12}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-muted)"
              fontFamily="Inter, sans-serif"
            >
              Available
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div style={{ flex: 1 }}>
          {segments.map((seg) => (
            <div className="ring-legend-item" key={seg.label}>
              <span
                className="ring-legend-dot"
                style={{ background: seg.color }}
              />
              <span className="ring-legend-label">{seg.label}</span>
              <span className="ring-legend-value">{seg.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityRing;
