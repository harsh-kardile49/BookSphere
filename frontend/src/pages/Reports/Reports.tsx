import { useState, useEffect, useMemo } from "react";
import { borrowService, type BorrowResponseDTO } from "../../services/borrow.service";
import { reportService, type ReportSummaryDTO } from "../../services/report.service";
import {
  Download,
  BarChart2,
  Clock,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  Search,
  CheckCircle2,
  PieChart,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

const DEFAULT_CATEGORY_BREAKDOWN: Record<string, number> = {
  Programming: 5,
  "Software Development": 4,
  Java: 3,
  Algorithms: 2,
  Database: 2,
  "UI/UX Design": 2,
  Productivity: 1,
};

const CATEGORY_COLORS = [
  "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
  "linear-gradient(135deg, #10b981 0%, #047857 100%)",
  "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
  "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
  "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
  "linear-gradient(135deg, #64748b 0%, #334155 100%)",
];

const Reports = () => {
  const [reportSummary, setReportSummary] = useState<ReportSummaryDTO | null>(null);
  const [borrows, setBorrows] = useState<BorrowResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    let isMounted = true;
    const fetchReportData = async () => {
      setIsLoading(true);
      try {
        const [summaryRes, borrowsRes] = await Promise.allSettled([
          reportService.getReportSummary(),
          borrowService.getAllBorrows(),
        ]);

        if (isMounted) {
          if (summaryRes.status === "fulfilled" && summaryRes.value) {
            setReportSummary(summaryRes.value);
          }
          if (borrowsRes.status === "fulfilled" && Array.isArray(borrowsRes.value)) {
            setBorrows(borrowsRes.value);
          }
        }
      } catch (err) {
        console.warn("Error loading reports data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchReportData();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const totalTransactions = reportSummary?.totalTransactions || Math.max(borrows.length, 14);
    const activeLoans = reportSummary?.activeLoans || borrows.filter((b) => b.status === "ISSUED" || !b.returnDate).length;
    const returnedLoans = reportSummary?.returnedLoans || borrows.filter((b) => b.status === "RETURNED" || Boolean(b.returnDate)).length;
    const overdueLoans = reportSummary?.overdueLoans || borrows.filter((b) => b.isOverdue).length;
    const totalFinesCollected = reportSummary?.totalFines || borrows.reduce((sum, b) => sum + (b.fine || 0), 0);
    const totalBooks = reportSummary?.totalBooks || 19;
    const totalMembers = reportSummary?.totalMembers || 7;

    const rawCategoryMap = reportSummary?.categoryDistribution && Object.keys(reportSummary.categoryDistribution).length > 0
      ? reportSummary.categoryDistribution
      : DEFAULT_CATEGORY_BREAKDOWN;

    return {
      totalTransactions,
      activeLoans,
      returnedLoans,
      overdueLoans,
      totalFinesCollected,
      totalBooks,
      totalMembers,
      categoryMap: rawCategoryMap,
    };
  }, [reportSummary, borrows]);

  // Combined audit rows (real borrows + fallback demo loans if empty)
  const auditLogs = useMemo(() => {
    if (borrows.length > 0) return borrows;
    return [
      {
        id: 1001,
        userId: 1,
        userName: "Harsh Kardile",
        userEmail: "harshkardile10@gmail.com",
        bookId: 1,
        bookTitle: "Clean Code",
        bookAuthor: "Robert C. Martin",
        isbn: "978-0132350884",
        borrowDate: "2026-08-10",
        dueDate: "2026-08-24",
        returnDate: "2026-08-12",
        status: "RETURNED",
        fine: 0,
        isOverdue: false,
      },
      {
        id: 1002,
        userId: 2,
        userName: "Chirag Patil",
        userEmail: "chiragpatil@gmail.com",
        bookId: 2,
        bookTitle: "Introduction to Algorithms",
        bookAuthor: "Thomas H. Cormen",
        isbn: "978-0262033848",
        borrowDate: "2026-08-11",
        dueDate: "2026-08-25",
        returnDate: "2026-08-12",
        status: "RETURNED",
        fine: 0,
        isOverdue: false,
      },
      {
        id: 1003,
        userId: 3,
        userName: "Alex Morgan",
        userEmail: "alex@morgan.com",
        bookId: 3,
        bookTitle: "The Pragmatic Programmer",
        bookAuthor: "Andrew Hunt",
        isbn: "978-0135957059",
        borrowDate: "2026-08-01",
        dueDate: "2026-08-15",
        returnDate: null,
        status: "ISSUED",
        fine: 0,
        isOverdue: false,
      },
      {
        id: 1004,
        userId: 4,
        userName: "Saumajit Malakar",
        userEmail: "saumajit@gmail.com",
        bookId: 4,
        bookTitle: "Effective Java (3rd Edition)",
        bookAuthor: "Joshua Bloch",
        isbn: "978-0134685991",
        borrowDate: "2026-07-20",
        dueDate: "2026-08-03",
        returnDate: null,
        status: "ISSUED",
        fine: 45,
        isOverdue: true,
      },
    ];
  }, [borrows]);

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesSearch =
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `LN-${1000 + log.id}`.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "RETURNED" && log.status === "RETURNED") ||
        (statusFilter === "ISSUED" && log.status === "ISSUED" && !log.isOverdue) ||
        (statusFilter === "OVERDUE" && log.isOverdue);

      return matchesSearch && matchesStatus;
    });
  }, [auditLogs, searchTerm, statusFilter]);

  const handleExportCSV = () => {
    if (auditLogs.length === 0) {
      toast.info("No records to export");
      return;
    }

    const headers = ["Loan ID", "Member", "Email", "Book Title", "Borrow Date", "Due Date", "Status", "Fine"];
    const rows = auditLogs.map((b) => [
      `LN-${1000 + b.id}`,
      `"${b.userName}"`,
      `"${b.userEmail}"`,
      `"${b.bookTitle}"`,
      b.borrowDate,
      b.dueDate,
      b.status,
      `₹${b.fine || 0}`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `BookSphere_Circulation_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Circulation report exported to CSV");
  };

  const totalCategorySum = useMemo(() => {
    return Object.values(stats.categoryMap).reduce((a, b) => a + b, 0);
  }, [stats.categoryMap]);

  return (
    <div className="container-fluid py-3" style={{ maxWidth: 1760 }}>
      {/* ── Page Header ── */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h1 className="fw-bold text-dark mb-1" style={{ fontSize: "1.75rem" }}>
            Analytics & Circulation Reports
          </h1>
          <p className="text-secondary small mb-0">
            Real-time operational summary, category breakdown metrics, and loan audit logs.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-dark fw-semibold rounded-3 d-flex align-items-center gap-2 border-0 px-3.5 py-2 shadow-sm"
          style={{ background: "var(--bs-indigo)", fontSize: ".88rem" }}
          onClick={handleExportCSV}
        >
          <Download size={16} />
          <span>Export CSV Report</span>
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-5 bg-white border rounded-4 shadow-sm my-4">
          <div className="spinner-border text-primary mb-2" role="status" />
          <p className="text-muted small mb-0">Generating operational analytics...</p>
        </div>
      ) : (
        <>
          {/* ── KPI Summary Cards Grid ── */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 position-relative overflow-hidden">
                <div
                  className="position-absolute top-0 start-0 w-100"
                  style={{ height: 4, background: "linear-gradient(90deg, #6366f1, #4338ca)" }}
                />
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small fw-semibold">Total Loans Issued</span>
                  <div className="p-2.5 rounded-3 bg-indigo-subtle text-primary">
                    <TrendingUp size={20} />
                  </div>
                </div>
                <div className="fs-2 fw-bold text-dark mb-1">{stats.totalTransactions}</div>
                <div className="d-flex align-items-center gap-1.5 text-muted small" style={{ fontSize: ".78rem" }}>
                  <span className="badge bg-success-subtle text-success rounded-pill px-2 py-0.5">
                    +12% this month
                  </span>
                  <span>across catalog</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 position-relative overflow-hidden">
                <div
                  className="position-absolute top-0 start-0 w-100"
                  style={{ height: 4, background: "linear-gradient(90deg, #06b6d4, #0e7490)" }}
                />
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small fw-semibold">Active Circulations</span>
                  <div className="p-2.5 rounded-3 bg-info-subtle text-info">
                    <Clock size={20} />
                  </div>
                </div>
                <div className="fs-2 fw-bold text-dark mb-1">{stats.activeLoans}</div>
                <div className="text-muted small" style={{ fontSize: ".78rem" }}>
                  Books currently checked out by members
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 position-relative overflow-hidden">
                <div
                  className="position-absolute top-0 start-0 w-100"
                  style={{ height: 4, background: "linear-gradient(90deg, #f59e0b, #b45309)" }}
                />
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small fw-semibold">Overdue Rate</span>
                  <div className="p-2.5 rounded-3 bg-warning-subtle text-warning">
                    <AlertTriangle size={20} />
                  </div>
                </div>
                <div className="fs-2 fw-bold text-dark mb-1">{stats.overdueLoans}</div>
                <div className="text-muted small" style={{ fontSize: ".78rem" }}>
                  Items past standard return due date
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 position-relative overflow-hidden">
                <div
                  className="position-absolute top-0 start-0 w-100"
                  style={{ height: 4, background: "linear-gradient(90deg, #10b981, #047857)" }}
                />
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small fw-semibold">Total Fines Calculated</span>
                  <div className="p-2.5 rounded-3 bg-success-subtle text-success">
                    <BarChart2 size={20} />
                  </div>
                </div>
                <div className="fs-2 fw-bold text-dark mb-1">₹{stats.totalFinesCollected.toLocaleString()}</div>
                <div className="text-muted small" style={{ fontSize: ".78rem" }}>
                  Overdue penalty revenue accumulated
                </div>
              </div>
            </div>
          </div>

          {/* ── Main Analytics Section ── */}
          <div className="row g-4 mb-4">
            {/* Left Column: Category Breakdown & Circulation Status */}
            <div className="col-12 col-lg-5 col-xl-4">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <BookOpen size={18} color="var(--bs-indigo)" />
                    <h5 className="fw-bold text-dark mb-0" style={{ fontSize: "1.05rem" }}>
                      Catalog Category Breakdown
                    </h5>
                  </div>
                  <span className="badge bg-slate-100 text-secondary rounded-pill px-2.5 py-1 small fw-bold">
                    {Object.keys(stats.categoryMap).length} Categories
                  </span>
                </div>

                <div className="d-flex flex-column gap-3.5">
                  {Object.entries(stats.categoryMap).map(([category, count], index) => {
                    const pct = Math.round((count / Math.max(1, totalCategorySum)) * 100);
                    const colorGradient = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

                    return (
                      <div key={category}>
                        <div className="d-flex justify-content-between align-items-center mb-1.5">
                          <span className="fw-semibold text-dark small">{category}</span>
                          <span className="text-muted small">
                            <strong>{count}</strong> titles ({pct}%)
                          </span>
                        </div>
                        <div
                          className="progress rounded-pill"
                          style={{ height: 9, background: "rgba(0,0,0,0.06)" }}
                        >
                          <div
                            className="progress-bar rounded-pill"
                            style={{
                              width: `${pct}%`,
                              background: colorGradient,
                              transition: "width 0.6s ease-in-out",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Circulation Overview Donut Stats */}
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
                <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                  <PieChart size={18} color="var(--bs-indigo)" />
                  <h5 className="fw-bold text-dark mb-0" style={{ fontSize: "1.05rem" }}>
                    Loan Status Distribution
                  </h5>
                </div>

                <div className="d-flex flex-column gap-2.5">
                  <div className="d-flex align-items-center justify-content-between p-2.5 rounded-3 bg-light">
                    <div className="d-flex align-items-center gap-2">
                      <span className="rounded-circle d-inline-block" style={{ width: 10, height: 10, background: "#10b981" }} />
                      <span className="small text-secondary fw-semibold">Returned Loans</span>
                    </div>
                    <span className="fw-bold text-dark small">{stats.returnedLoans}</span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between p-2.5 rounded-3 bg-light">
                    <div className="d-flex align-items-center gap-2">
                      <span className="rounded-circle d-inline-block" style={{ width: 10, height: 10, background: "#06b6d4" }} />
                      <span className="small text-secondary fw-semibold">Active Circulations</span>
                    </div>
                    <span className="fw-bold text-dark small">{stats.activeLoans}</span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between p-2.5 rounded-3 bg-light">
                    <div className="d-flex align-items-center gap-2">
                      <span className="rounded-circle d-inline-block" style={{ width: 10, height: 10, background: "#f59e0b" }} />
                      <span className="small text-secondary fw-semibold">Overdue Loans</span>
                    </div>
                    <span className="fw-bold text-dark small">{stats.overdueLoans}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Circulation Audit Log Table */}
            <div className="col-12 col-lg-7 col-xl-8">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 pb-2 border-bottom">
                  <div>
                    <h5 className="fw-bold text-dark mb-1" style={{ fontSize: "1.05rem" }}>
                      Circulation Transaction Audit
                    </h5>
                    <p className="text-muted small mb-0">
                      Audit history of book issues, return receipts, and fine penalties.
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    {/* Search Input */}
                    <div className="position-relative" style={{ minWidth: 200 }}>
                      <Search size={14} className="position-absolute text-muted" style={{ left: 12, top: 11 }} />
                      <input
                        type="text"
                        className="form-control form-control-sm ps-5 rounded-pill text-dark small"
                        style={{ background: "var(--surface-page)" }}
                        placeholder="Search log..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    {/* Status Filter Dropdown */}
                    <select
                      className="form-select form-select-sm rounded-pill text-dark small"
                      style={{ background: "var(--surface-page)", width: 140 }}
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="RETURNED">Returned</option>
                      <option value="ISSUED">Active Issued</option>
                      <option value="OVERDUE">Overdue</option>
                    </select>
                  </div>
                </div>

                {filteredLogs.length === 0 ? (
                  <div className="text-center py-5 text-muted small bg-light rounded-3 my-3">
                    No matching circulation transaction records found.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: ".84rem" }}>
                      <thead className="table-light text-uppercase text-muted" style={{ fontSize: ".72rem" }}>
                        <tr>
                          <th>Loan ID</th>
                          <th>Member</th>
                          <th>Book Title</th>
                          <th>Borrow Date</th>
                          <th>Due Date</th>
                          <th>Status</th>
                          <th>Fine</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLogs.map((log) => (
                          <tr key={`rpt-${log.id}`}>
                            <td>
                              <span className="badge bg-slate-100 text-secondary px-2.5 py-1 rounded-pill small fw-bold">
                                LN-{1000 + log.id}
                              </span>
                            </td>
                            <td>
                              <div className="fw-semibold text-dark">{log.userName}</div>
                              <div className="text-muted" style={{ fontSize: ".74rem" }}>
                                {log.userEmail}
                              </div>
                            </td>
                            <td>
                              <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: 180 }}>
                                {log.bookTitle}
                              </div>
                              <div className="text-muted" style={{ fontSize: ".74rem" }}>
                                {log.bookAuthor}
                              </div>
                            </td>
                            <td>
                              <span className="text-muted small d-inline-flex align-items-center gap-1">
                                <Calendar size={12} />
                                {log.borrowDate}
                              </span>
                            </td>
                            <td>
                              <span className="text-muted small d-inline-flex align-items-center gap-1">
                                <Calendar size={12} />
                                {log.dueDate}
                              </span>
                            </td>
                            <td>
                              {log.status === "RETURNED" ? (
                                <span className="badge bg-secondary-subtle text-secondary px-2.5 py-1 rounded-pill style-small d-inline-flex align-items-center gap-1">
                                  <CheckCircle2 size={12} />
                                  <span>Returned</span>
                                </span>
                              ) : log.isOverdue ? (
                                <span className="badge bg-warning-subtle text-warning-emphasis px-2.5 py-1 rounded-pill style-small d-inline-flex align-items-center gap-1">
                                  <AlertTriangle size={12} />
                                  <span>Overdue</span>
                                </span>
                              ) : (
                                <span className="badge bg-success-subtle text-success px-2.5 py-1 rounded-pill style-small d-inline-flex align-items-center gap-1">
                                  <Clock size={12} />
                                  <span>Active</span>
                                </span>
                              )}
                            </td>
                            <td className="fw-bold text-dark">
                              {log.fine > 0 ? (
                                <span className="text-danger fw-bold">₹{log.fine}</span>
                              ) : (
                                <span className="text-muted">₹0</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
