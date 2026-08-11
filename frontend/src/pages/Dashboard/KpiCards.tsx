import { BookOpen, BookCheck, Users, Clock } from "lucide-react";

interface KpiCardsProps {
  totalBooks: number;
  availableStock: number;
  activeLoans: number;
  totalMembers: number;
}

const KpiCards = ({
  totalBooks,
  availableStock,
  activeLoans,
  totalMembers,
}: KpiCardsProps) => {
  const kpiItems = [
    {
      label: "Catalog Books",
      value: totalBooks.toLocaleString(),
      subtext: "Titles registered in DB",
      icon: <BookOpen size={20} />,
      iconBg: "var(--bs-indigo-light)",
      iconColor: "var(--bs-indigo)",
    },
    {
      label: "Inventory Stock",
      value: availableStock.toLocaleString(),
      subtext: "Copies available on shelves",
      icon: <BookCheck size={20} />,
      iconBg: "var(--bs-emerald-light)",
      iconColor: "#047857",
    },
    {
      label: "Active Loans",
      value: activeLoans.toLocaleString(),
      subtext: "Books currently issued",
      icon: <Clock size={20} />,
      iconBg: "rgba(6, 182, 212, 0.1)",
      iconColor: "#0891b2",
    },
    {
      label: "Library Members",
      value: totalMembers.toLocaleString(),
      subtext: "Registered member accounts",
      icon: <Users size={20} />,
      iconBg: "var(--bs-amber-light)",
      iconColor: "#b45309",
    },
  ];

  return (
    <div className="row g-3">
      {kpiItems.map((item) => (
        <div key={item.label} className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 rounded-4 shadow-sm p-3 h-100 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold">{item.label}</span>
              <div
                className="p-2 rounded-3 d-flex align-items-center justify-content-center"
                style={{ background: item.iconBg, color: item.iconColor }}
              >
                {item.icon}
              </div>
            </div>
            <div className="fs-3 fw-bold text-dark mb-1">{item.value}</div>
            <div className="text-muted style-small" style={{ fontSize: "0.78rem" }}>
              {item.subtext}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KpiCards;
