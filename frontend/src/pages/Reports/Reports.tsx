import { useState, useEffect, useMemo } from "react";
import { borrowService, type BorrowResponseDTO } from "../../services/borrow.service";
import { reportService, type ReportSummaryDTO } from "../../services/report.service";
import { Download, BarChart2, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Reports = () => {
  const [reportSummary, setReportSummary] = useState<ReportSummaryDTO | null>(null);
  const [borrows, setBorrows] = useState<BorrowResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    if (!reportSummary) {
      const totalTransactions = borrows.length;
      const activeLoans = borrows.filter((b) => b.status === "ACTIVE").length;
      const returnedLoans = borrows.filter((b) => b.status === "RETURNED").length;
      const overdueLoans = borrows.filter((b) => b.isOverdue || (b.status === "ACTIVE" && b.dueDate && new Date(b.dueDate) < new Date())).length;
      const totalFinesCollected = borrows.reduce((sum, b) => sum + (b.fine || 0), 0);
      return { totalTransactions, activeLoans, returnedLoans, overdueLoans, totalFinesCollected, totalBooks: 0, totalMembers: 0, categoryMap: {} as Record<string, number> };
    }

    return {
      totalTransactions: reportSummary.totalTransactions,
      activeLoans: reportSummary.activeLoans,
      returnedLoans: reportSummary.returnedLoans,
      overdueLoans: reportSummary.overdueLoans,
      totalFinesCollected: reportSummary.totalFines,
      totalBooks: reportSummary.totalBooks,
      totalMembers: reportSummary.totalMembers,
      categoryMap: reportSummary.categoryDistribution || {},
    };
  }, [reportSummary, borrows]);

  const handleExportCSV = () => {
    if (borrows.length === 0) {
      toast.info("No records to export");
      return;
    }

    const headers = ["Loan ID", "Member", "Email", "Book Title", "Borrow Date", "Due Date", "Status", "Fine"];
    const rows = borrows.map((b) => [
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

  return (
    <div className="container-fluid p-4" style={{ maxWidth: 1400 }}>
      {/* Editorial Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1" style={{ fontSize: "1.5rem" }}>
            Analytics & Circulation Reports
          </h3>
          <p className="text-muted small mb-0">
            Real-time library operations summary, category trends, and loan records.
          </p>
        </div>

        <button
          className="btn text-white fw-semibold rounded-3 d-flex align-items-center gap-2 border-0 px-3 py-2"
          style={{ background: "var(--bs-indigo)", fontSize: ".86rem" }}
          onClick={handleExportCSV}
        >
          <Download size={16} />
          Export CSV Report
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-2" role="status" />
          <p className="text-muted small">Generating operational reports...</p>
        </div>
      ) : (
        <>
          {/* KPI Summary Cards */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 rounded-4 shadow-sm p-3.5 bg-white h-100">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small fw-semibold">Total Loans Issued</span>
                  <div className="p-2 rounded-3 bg-indigo-subtle text-primary">
                    <TrendingUp size={18} />
                  </div>
                </div>
                <div className="fs-3 fw-bold text-dark">{stats.totalTransactions}</div>
                <div className="text-muted small" style={{ fontSize: ".76rem" }}>
                  Cumulative loans ({stats.totalMembers} active members)
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 rounded-4 shadow-sm p-3.5 bg-white h-100">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small fw-semibold">Active Circulations</span>
                  <div className="p-2 rounded-3 bg-info-subtle text-info">
                    <Clock size={18} />
                  </div>
                </div>
                <div className="fs-3 fw-bold text-dark">{stats.activeLoans}</div>
                <div className="text-muted small" style={{ fontSize: ".76rem" }}>
                  Books currently checked out
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 rounded-4 shadow-sm p-3.5 bg-white h-100">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small fw-semibold">Overdue Rate</span>
                  <div className="p-2 rounded-3 bg-warning-subtle text-warning">
                    <AlertTriangle size={18} />
                  </div>
                </div>
                <div className="fs-3 fw-bold text-dark">{stats.overdueLoans}</div>
                <div className="text-muted small" style={{ fontSize: ".76rem" }}>
                  Items past return due date
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 rounded-4 shadow-sm p-3.5 bg-white h-100">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small fw-semibold">Total Fines Calculated</span>
                  <div className="p-2 rounded-3 bg-success-subtle text-success">
                    <BarChart2 size={18} />
                  </div>
                </div>
                <div className="fs-3 fw-bold text-dark">₹{stats.totalFinesCollected.toLocaleString()}</div>
                <div className="text-muted small" style={{ fontSize: ".76rem" }}>
                  Overdue penalty revenue
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid: Category Distribution + Status Breakdown */}
          <div className="row g-3">
            {/* Category Distribution */}
            <div className="col-12 col-lg-6">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
                <h5 className="fw-bold text-dark mb-3" style={{ fontSize: "1.05rem" }}>
                  Catalog Category Breakdown
                </h5>
                <div className="d-flex flex-column gap-3">
                  {Object.entries(stats.categoryMap).map(([category, count]) => {
                    const pct = Math.round((count / Math.max(1, stats.totalBooks)) * 100);
                    return (
                      <div key={category}>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="fw-semibold text-dark small">{category}</span>
                          <span className="text-muted small">{count} titles ({pct}%)</span>
                        </div>
                        <div className="progress rounded-pill" style={{ height: 8, background: "rgba(0,0,0,0.05)" }}>
                          <div
                            className="progress-bar rounded-pill"
                            style={{
                              width: `${pct}%`,
                              background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent Transaction Log Table */}
            <div className="col-12 col-lg-6">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
                <h5 className="fw-bold text-dark mb-3" style={{ fontSize: "1.05rem" }}>
                  Circulation Transaction Audit
                </h5>
                {borrows.length === 0 ? (
                  <div className="text-center py-4 text-muted small">
                    No borrowing records found.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-sm table-hover align-middle mb-0" style={{ fontSize: ".82rem" }}>
                      <thead className="table-light text-uppercase text-muted" style={{ fontSize: ".72rem" }}>
                        <tr>
                          <th>Member</th>
                          <th>Book Title</th>
                          <th>Status</th>
                          <th>Fine</th>
                        </tr>
                      </thead>
                      <tbody>
                        {borrows.slice(0, 6).map((b) => (
                          <tr key={`rpt-${b.id}`}>
                            <td>
                              <div className="fw-semibold text-dark">{b.userName}</div>
                            </td>
                            <td>
                              <div className="text-truncate" style={{ maxWidth: 160 }}>
                                {b.bookTitle}
                              </div>
                            </td>
                            <td>
                              <span
                                className={`badge rounded-pill ${
                                  b.status === "RETURNED"
                                    ? "bg-secondary-subtle text-secondary"
                                    : b.isOverdue
                                    ? "bg-warning-subtle text-warning-emphasis"
                                    : "bg-success-subtle text-success"
                                }`}
                              >
                                {b.status}
                              </span>
                            </td>
                            <td className="fw-semibold text-dark">
                              ₹{b.fine || 0}
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
