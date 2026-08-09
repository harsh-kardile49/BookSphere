import { useState, useMemo } from "react";

type TimeRange = "7D" | "30D" | "3M" | "6M" | "1Y";

interface DataPoint {
  label: string;
  issued: number;
  returned: number;
  newBooks: number;
}

const generateData = (range: TimeRange): DataPoint[] => {
  const templates: Record<TimeRange, DataPoint[]> = {
    "7D": [
      { label: "Mon", issued: 18, returned: 14, newBooks: 3 },
      { label: "Tue", issued: 24, returned: 20, newBooks: 5 },
      { label: "Wed", issued: 20, returned: 18, newBooks: 2 },
      { label: "Thu", issued: 28, returned: 22, newBooks: 7 },
      { label: "Fri", issued: 32, returned: 26, newBooks: 4 },
      { label: "Sat", issued: 14, returned: 12, newBooks: 1 },
      { label: "Sun", issued: 8, returned: 10, newBooks: 0 },
    ],
    "30D": [
      { label: "W1", issued: 82, returned: 68, newBooks: 12 },
      { label: "W2", issued: 96, returned: 84, newBooks: 18 },
      { label: "W3", issued: 78, returned: 72, newBooks: 8 },
      { label: "W4", issued: 110, returned: 92, newBooks: 22 },
    ],
    "3M": [
      { label: "Jan", issued: 320, returned: 280, newBooks: 45 },
      { label: "Feb", issued: 380, returned: 340, newBooks: 52 },
      { label: "Mar", issued: 420, returned: 360, newBooks: 38 },
    ],
    "6M": [
      { label: "Oct", issued: 280, returned: 250, newBooks: 30 },
      { label: "Nov", issued: 310, returned: 280, newBooks: 42 },
      { label: "Dec", issued: 260, returned: 240, newBooks: 25 },
      { label: "Jan", issued: 320, returned: 280, newBooks: 45 },
      { label: "Feb", issued: 380, returned: 340, newBooks: 52 },
      { label: "Mar", issued: 420, returned: 360, newBooks: 38 },
    ],
    "1Y": [
      { label: "Apr", issued: 220, returned: 200, newBooks: 28 },
      { label: "May", issued: 260, returned: 230, newBooks: 32 },
      { label: "Jun", issued: 240, returned: 210, newBooks: 20 },
      { label: "Jul", issued: 200, returned: 180, newBooks: 15 },
      { label: "Aug", issued: 280, returned: 240, newBooks: 35 },
      { label: "Sep", issued: 300, returned: 260, newBooks: 40 },
      { label: "Oct", issued: 280, returned: 250, newBooks: 30 },
      { label: "Nov", issued: 310, returned: 280, newBooks: 42 },
      { label: "Dec", issued: 260, returned: 240, newBooks: 25 },
      { label: "Jan", issued: 320, returned: 280, newBooks: 45 },
      { label: "Feb", issued: 380, returned: 340, newBooks: 52 },
      { label: "Mar", issued: 420, returned: 360, newBooks: 38 },
    ],
  };
  return templates[range];
};

const CHART_H = 200;
const CHART_PAD_TOP = 20;
const CHART_PAD_BOTTOM = 30;
const CHART_PAD_LEFT = 40;
const CHART_PAD_RIGHT = 16;

const COLORS = {
  issued: "#4f46e5",
  returned: "#10b981",
  newBooks: "#f59e0b",
};

const ranges: TimeRange[] = ["7D", "30D", "3M", "6M", "1Y"];

const ActivityChart = () => {
  const [activeRange, setActiveRange] = useState<TimeRange>("7D");
  const data = useMemo(() => generateData(activeRange), [activeRange]);

  const allValues = data.flatMap((d) => [d.issued, d.returned, d.newBooks]);
  const maxVal = Math.max(...allValues);
  const niceMax = Math.ceil(maxVal / 10) * 10;

  const chartW = 600;
  const drawW = chartW - CHART_PAD_LEFT - CHART_PAD_RIGHT;
  const drawH = CHART_H - CHART_PAD_TOP - CHART_PAD_BOTTOM;

  const xStep = data.length > 1 ? drawW / (data.length - 1) : drawW;

  const getY = (v: number) =>
    CHART_PAD_TOP + drawH - (v / niceMax) * drawH;

  const getX = (i: number) => CHART_PAD_LEFT + i * xStep;

  const makePath = (key: "issued" | "returned" | "newBooks") =>
    data
      .map((d, i) => `${i === 0 ? "M" : "L"}${getX(i)},${getY(d[key])}`)
      .join(" ");

  const makeArea = (key: "issued" | "returned" | "newBooks") =>
    makePath(key) +
    ` L${getX(data.length - 1)},${CHART_PAD_TOP + drawH} L${CHART_PAD_LEFT},${CHART_PAD_TOP + drawH} Z`;

  // Y-axis grid lines
  const gridLines = 4;
  const gridStep = niceMax / gridLines;

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <div>
          <h6 className="section-title">Library Activity</h6>
          <p className="section-subtitle">Track circulation activity over time</p>
        </div>
        <div className="chart-filters">
          {ranges.map((r) => (
            <button
              key={r}
              className={`chart-filter-btn ${activeRange === r ? "chart-filter-btn--active" : ""}`}
              onClick={() => setActiveRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="d-flex gap-4 mb-3" style={{ paddingLeft: CHART_PAD_LEFT }}>
        {([
          { key: "issued", label: "Issued", color: COLORS.issued },
          { key: "returned", label: "Returned", color: COLORS.returned },
          { key: "newBooks", label: "New Books", color: COLORS.newBooks },
        ] as const).map((item) => (
          <div key={item.key} className="d-flex align-items-center gap-1">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: item.color,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* SVG Chart */}
      <div style={{ width: "100%", overflow: "hidden" }}>
        <svg
          viewBox={`0 0 ${chartW} ${CHART_H}`}
          style={{ width: "100%", height: "auto" }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="gradIssued" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.issued} stopOpacity="0.18" />
              <stop offset="100%" stopColor={COLORS.issued} stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="gradReturned" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.returned} stopOpacity="0.14" />
              <stop offset="100%" stopColor={COLORS.returned} stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Grid lines + Y labels */}
          {Array.from({ length: gridLines + 1 }, (_, i) => {
            const val = i * gridStep;
            const y = getY(val);
            return (
              <g key={i}>
                <line
                  x1={CHART_PAD_LEFT}
                  y1={y}
                  x2={chartW - CHART_PAD_RIGHT}
                  y2={y}
                  stroke="rgba(0, 0, 0, 0.04)"
                  strokeWidth="1"
                />
                <text
                  x={CHART_PAD_LEFT - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--text-muted)"
                  fontFamily="Inter, sans-serif"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* X labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={getX(i)}
              y={CHART_H - 8}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-muted)"
              fontFamily="Inter, sans-serif"
            >
              {d.label}
            </text>
          ))}

          {/* Area fills */}
          <path d={makeArea("issued")} fill="url(#gradIssued)" />
          <path d={makeArea("returned")} fill="url(#gradReturned)" />

          {/* Lines */}
          <path
            d={makePath("issued")}
            fill="none"
            stroke={COLORS.issued}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={makePath("returned")}
            fill="none"
            stroke={COLORS.returned}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={makePath("newBooks")}
            fill="none"
            stroke={COLORS.newBooks}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 3"
          />

          {/* Data points */}
          {data.map((d, i) => (
            <g key={i}>
              <circle cx={getX(i)} cy={getY(d.issued)} r="3" fill={COLORS.issued} />
              <circle cx={getX(i)} cy={getY(d.returned)} r="3" fill={COLORS.returned} />
              <circle cx={getX(i)} cy={getY(d.newBooks)} r="2.5" fill={COLORS.newBooks} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ActivityChart;
