import {
  RotateCcw,
  UserPlus,
  BookPlus,
  BookMarked,
  ArrowRight,
} from "lucide-react";

interface ActivityItem {
  id: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  text: React.ReactNode;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    icon: <RotateCcw size={14} />,
    iconBg: "var(--bs-emerald-light)",
    iconColor: "var(--bs-emerald)",
    text: (
      <>
        <strong>Rahul Sharma</strong> returned <strong>"Clean Code"</strong>
      </>
    ),
    time: "2 minutes ago",
  },
  {
    id: 2,
    icon: <UserPlus size={14} />,
    iconBg: "var(--bs-indigo-light)",
    iconColor: "var(--bs-indigo)",
    text: (
      <>
        New member registered — <strong>Priya Patel</strong>
      </>
    ),
    time: "12 minutes ago",
  },
  {
    id: 3,
    icon: <BookPlus size={14} />,
    iconBg: "var(--bs-cyan-light)",
    iconColor: "var(--bs-cyan)",
    text: (
      <>
        <strong>"Design Patterns"</strong> was added to the library
      </>
    ),
    time: "25 minutes ago",
  },
  {
    id: 4,
    icon: <BookMarked size={14} />,
    iconBg: "var(--bs-amber-light)",
    iconColor: "var(--bs-amber)",
    text: (
      <>
        Reservation created for <strong>"Atomic Habits"</strong>
      </>
    ),
    time: "1 hour ago",
  },
  {
    id: 5,
    icon: <RotateCcw size={14} />,
    iconBg: "var(--bs-emerald-light)",
    iconColor: "var(--bs-emerald)",
    text: (
      <>
        <strong>Alex Morgan</strong> returned{" "}
        <strong>"The Pragmatic Programmer"</strong>
      </>
    ),
    time: "2 hours ago",
  },
];

const RecentActivity = () => {
  return (
    <div className="dash-card" style={{ height: "100%" }}>
      <div className="dash-card-header">
        <h6 className="section-title">Recent Activity</h6>
        <a href="#" className="section-link">
          View all <ArrowRight size={13} />
        </a>
      </div>

      <div>
        {activities.map((act) => (
          <div className="activity-item" key={act.id}>
            <div
              className="activity-dot"
              style={{
                background: act.iconBg,
                color: act.iconColor,
              }}
            >
              {act.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div className="activity-text">{act.text}</div>
              <div className="activity-time">{act.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
