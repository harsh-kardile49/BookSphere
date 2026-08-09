import {
  BookOpen,
  BookCheck,
  AlertTriangle,
  Users,
  CalendarClock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface KpiItem {
  label: string;
  value: string;
  trend: string;
  trendDir: "up" | "down" | "neutral";
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  sparkData: number[];
  sparkColor: string;
}

const kpis: KpiItem[] = [
  {
    label: "Total Books",
    value: "2,450",
    trend: "+8.2% this month",
    trendDir: "up",
    icon: <BookOpen size={17} />,
    iconBg: "var(--bs-indigo-light)",
    iconColor: "var(--bs-indigo)",
    sparkData: [4, 6, 5, 8, 7, 9, 10, 12, 11, 14],
    sparkColor: "var(--bs-indigo)",
  },
  {
    label: "Available",
    value: "1,824",
    trend: "74% of total",
    trendDir: "neutral",
    icon: <BookCheck size={17} />,
    iconBg: "var(--bs-emerald-light)",
    iconColor: "var(--bs-emerald)",
    sparkData: [10, 9, 10, 11, 10, 10, 11, 12, 11, 11],
    sparkColor: "var(--bs-emerald)",
  },
  {
    label: "Issued",
    value: "186",
    trend: "+12 today",
    trendDir: "up",
    icon: <BookOpen size={17} />,
    iconBg: "var(--bs-cyan-light)",
    iconColor: "var(--bs-cyan)",
    sparkData: [3, 5, 4, 7, 6, 8, 5, 9, 7, 8],
    sparkColor: "var(--bs-cyan)",
  },
  {
    label: "Overdue",
    value: "23",
    trend: "+3 from yesterday",
    trendDir: "down",
    icon: <AlertTriangle size={17} />,
    iconBg: "var(--bs-red-light)",
    iconColor: "var(--bs-red)",
    sparkData: [2, 3, 2, 4, 5, 4, 6, 5, 7, 6],
    sparkColor: "var(--bs-red)",
  },
  {
    label: "Members",
    value: "1,240",
    trend: "+24 this week",
    trendDir: "up",
    icon: <Users size={17} />,
    iconBg: "var(--bs-indigo-light)",
    iconColor: "var(--bs-indigo)",
    sparkData: [6, 7, 8, 8, 9, 10, 10, 11, 12, 13],
    sparkColor: "var(--bs-indigo)",
  },
  {
    label: "Reservations",
    value: "48",
    trend: "12 pending",
    trendDir: "neutral",
    icon: <CalendarClock size={17} />,
    iconBg: "var(--bs-amber-light)",
    iconColor: "var(--bs-amber)",
    sparkData: [3, 4, 3, 5, 4, 6, 5, 4, 6, 5],
    sparkColor: "var(--bs-amber)",
  },
];

function MiniSparkline({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  const max = Math.max(...data);
  const h = 32;
  const w = 100;
  const step = w / (data.length - 1);

  const points = data
    .map((v, i) => `${i * step},${h - (v / max) * h}`)
    .join(" ");

  const areaPath =
    `M0,${h} ` +
    data.map((v, i) => `L${i * step},${h - (v / max) * h}`).join(" ") +
    ` L${w},${h} Z`;

  return (
    <svg
      className="kpi-sparkline"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
    >
      <path d={areaPath} fill={color} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.4"
      />
    </svg>
  );
}

const KpiCards = () => {
  return (
    <div className="kpi-grid">
      {kpis.map((kpi) => (
        <div className="kpi-card" key={kpi.label}>
          <div
            className="kpi-icon"
            style={{ backgroundColor: kpi.iconBg, color: kpi.iconColor }}
          >
            {kpi.icon}
          </div>
          <div className="kpi-label">{kpi.label}</div>
          <div className="kpi-value">{kpi.value}</div>
          <div
            className={`kpi-trend kpi-trend--${kpi.trendDir}`}
          >
            {kpi.trendDir === "up" && <TrendingUp size={12} />}
            {kpi.trendDir === "down" && <TrendingDown size={12} />}
            {kpi.trend}
          </div>
          <MiniSparkline data={kpi.sparkData} color={kpi.sparkColor} />
        </div>
      ))}
    </div>
  );
};

export default KpiCards;
