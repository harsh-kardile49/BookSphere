import { useState } from "react";
import {
  Sliders,
  User,
  Bell,
  Shield,
  Save,
  BookOpen,
  Mail,
  Lock,
  CheckCircle2,
  Clock,
  IndianRupee,
  Smartphone,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";
import "./settings.css";

const Settings = () => {
  const { user } = useAuthStore();
  const isLibrarianOrAdmin = user?.role === "LIBRARIAN" || user?.role === "ADMIN";

  const [activeTab, setActiveTab] = useState<"library" | "profile" | "notifications">(
    isLibrarianOrAdmin ? "library" : "profile"
  );

  // Library Policy Settings
  const [maxLoanDays, setMaxLoanDays] = useState(14);
  const [maxBooksPerMember, setMaxBooksPerMember] = useState(5);
  const [fineRatePerDay, setFineRatePerDay] = useState(5);
  const [autoOverdueReminders, setAutoOverdueReminders] = useState(true);

  // Profile Settings
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Notification Toggles
  const [emailIssueAlerts, setEmailIssueAlerts] = useState(true);
  const [emailReturnAlerts, setEmailReturnAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      toast.success("Preferences Saved", {
        description: isLibrarianOrAdmin
          ? "Library preferences updated successfully."
          : "Your profile details and notification settings have been updated.",
      });
    }, 400);
  };

  return (
    <div className="settings-container py-3">
      {/* ── Page Header ── */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="fw-bold text-dark mb-1" style={{ fontSize: "1.75rem" }}>
            {isLibrarianOrAdmin ? "Settings & System Preferences" : "Account & Preferences"}
          </h1>
          <p className="text-secondary small mb-0">
            {isLibrarianOrAdmin
              ? "Configure library circulation policies, account profile, and notifications."
              : "Manage your member profile, security password, and email notifications."}
          </p>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className="d-flex gap-2 mb-4 p-1 bg-white border rounded-pill shadow-sm d-inline-flex flex-wrap">
        {isLibrarianOrAdmin && (
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 border-0 ${
              activeTab === "library" ? "btn-dark text-white shadow-sm" : "text-secondary"
            }`}
            onClick={() => setActiveTab("library")}
          >
            <Sliders size={16} />
            <span>Library Rules & Policy</span>
          </button>
        )}

        <button
          type="button"
          className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 border-0 ${
            activeTab === "profile" ? "btn-dark text-white shadow-sm" : "text-secondary"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <User size={16} />
          <span>Account & Profile</span>
        </button>

        <button
          type="button"
          className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 border-0 ${
            activeTab === "notifications" ? "btn-dark text-white shadow-sm" : "text-secondary"
          }`}
          onClick={() => setActiveTab("notifications")}
        >
          <Bell size={16} />
          <span>Notifications</span>
        </button>

        {!isLibrarianOrAdmin && (
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 border-0 ${
              activeTab === "library" ? "btn-dark text-white shadow-sm" : "text-secondary"
            }`}
            onClick={() => setActiveTab("library")}
          >
            <Sliders size={16} />
            <span>Library Rules</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSaveSettings}>
        {/* ── TAB 1: Library Circulation Policy ── */}
        {activeTab === "library" && (
          <div className="row g-4">
            <div className="col-lg-8">
              {isLibrarianOrAdmin ? (
                /* Admin / Librarian Policy Controls */
                <div className="bg-white border rounded-4 p-4 p-md-5 shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom">
                    <BookOpen size={18} color="var(--bs-indigo)" />
                    <h5 className="fw-bold text-dark mb-0">Circulation Rules & Policies</h5>
                  </div>

                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-dark small mb-1 d-flex align-items-center gap-1.5">
                        <Clock size={14} className="text-muted" />
                        <span>Standard Loan Duration (Days)</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="90"
                        className="form-control rounded-3 p-2.5 text-dark small"
                        style={{ background: "var(--surface-page)" }}
                        value={maxLoanDays}
                        onChange={(e) => setMaxLoanDays(Number(e.target.value))}
                      />
                      <small className="text-muted d-block mt-1">
                        Default lending period for issued books.
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-dark small mb-1 d-flex align-items-center gap-1.5">
                        <BookOpen size={14} className="text-muted" />
                        <span>Max Books Per Member</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        className="form-control rounded-3 p-2.5 text-dark small"
                        style={{ background: "var(--surface-page)" }}
                        value={maxBooksPerMember}
                        onChange={(e) => setMaxBooksPerMember(Number(e.target.value))}
                      />
                      <small className="text-muted d-block mt-1">
                        Maximum active borrows allowed simultaneously.
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-dark small mb-1 d-flex align-items-center gap-1.5">
                        <IndianRupee size={14} className="text-muted" />
                        <span>Overdue Fine Rate (₹ / Day)</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        className="form-control rounded-3 p-2.5 text-dark small"
                        style={{ background: "var(--surface-page)" }}
                        value={fineRatePerDay}
                        onChange={(e) => setFineRatePerDay(Number(e.target.value))}
                      />
                      <small className="text-muted d-block mt-1">
                        Daily fine penalty charged for overdue books.
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-dark small mb-1 d-flex align-items-center gap-1.5">
                        <Bell size={14} className="text-muted" />
                        <span>Automated Overdue Reminders</span>
                      </label>
                      <div className="form-check form-switch pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="autoOverdueSwitch"
                          checked={autoOverdueReminders}
                          onChange={(e) => setAutoOverdueReminders(e.target.checked)}
                        />
                        <label className="form-check-label text-secondary small fw-medium ms-2" htmlFor="autoOverdueSwitch">
                          Send daily email notifications for overdue loans
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3">
                    <CheckCircle2 size={20} className="text-success flex-shrink-0" />
                    <span className="text-secondary small">
                      Circulation rules take effect immediately across all book borrowing and return workflows.
                    </span>
                  </div>
                </div>
              ) : (
                /* Student / Member Read-Only Policy Overview */
                <div className="bg-white border rounded-4 p-4 p-md-5 shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom">
                    <BookOpen size={18} color="var(--bs-indigo)" />
                    <h5 className="fw-bold text-dark mb-0">Library Member Circulation Policies</h5>
                  </div>

                  <div className="row g-4 mb-4">
                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded-3">
                        <small className="text-muted d-block mb-1">Standard Loan Period</small>
                        <span className="fw-bold fs-5 text-dark">14 Calendar Days</span>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded-3">
                        <small className="text-muted d-block mb-1">Borrowing Limit</small>
                        <span className="fw-bold fs-5 text-dark">5 Active Books</span>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded-3">
                        <small className="text-muted d-block mb-1">Overdue Fine Rate</small>
                        <span className="fw-bold fs-5 text-dark">₹5 / Day</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-indigo-subtle rounded-3 d-flex align-items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="text-dark small">
                      These policies apply to all active loans under your student member account. Contact library admin for extension requests.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Summary Card */}
            <div className="col-lg-4">
              <div className="bg-white border rounded-4 p-4 shadow-sm">
                <h6 className="fw-bold text-dark mb-3">
                  {isLibrarianOrAdmin ? "System Overview" : "Member Account Overview"}
                </h6>

                {isLibrarianOrAdmin ? (
                  <>
                    <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
                      <span className="text-muted small">Database Engine</span>
                      <span className="fw-semibold text-dark small">Relational Database</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
                      <span className="text-muted small">API Gateway</span>
                      <span className="fw-semibold text-dark small">REST Services</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
                      <span className="text-muted small">LMS License</span>
                      <span className="fw-semibold text-dark small">Enterprise Demo</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between py-2">
                      <span className="text-muted small">System Status</span>
                      <span className="badge bg-success-subtle text-success rounded-pill px-2.5 py-1 small">
                        ● Operational
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
                      <span className="text-muted small">Account Type</span>
                      <span className="fw-semibold text-dark small">{user?.role || "STUDENT"}</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
                      <span className="text-muted small">Borrow Allowance</span>
                      <span className="fw-semibold text-dark small">5 Active Books</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
                      <span className="text-muted small">Standard Term</span>
                      <span className="fw-semibold text-dark small">14 Days</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between py-2">
                      <span className="text-muted small">Member Status</span>
                      <span className="badge bg-success-subtle text-success rounded-pill px-2.5 py-1 small">
                        ● Active Member
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: Profile & Security ── */}
        {activeTab === "profile" && (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="bg-white border rounded-4 p-4 p-md-5 shadow-sm mb-4">
                <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom">
                  <User size={18} color="var(--bs-indigo)" />
                  <h5 className="fw-bold text-dark mb-0">Personal Profile</h5>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark small mb-1">First Name</label>
                    <input
                      type="text"
                      className="form-control rounded-3 p-2.5 text-dark small"
                      style={{ background: "var(--surface-page)" }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark small mb-1">Last Name</label>
                    <input
                      type="text"
                      className="form-control rounded-3 p-2.5 text-dark small"
                      style={{ background: "var(--surface-page)" }}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark small mb-1 d-flex align-items-center gap-1.5">
                      <Mail size={14} className="text-muted" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-3 p-2.5 text-dark small"
                      style={{ background: "var(--surface-page)" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark small mb-1 d-flex align-items-center gap-1.5">
                      <Smartphone size={14} className="text-muted" />
                      <span>Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control rounded-3 p-2.5 text-dark small"
                      style={{ background: "var(--surface-page)" }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Section */}
                <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom pt-2">
                  <Lock size={16} color="var(--bs-indigo)" />
                  <h6 className="fw-bold text-primary small text-uppercase tracking-wider mb-0">
                    Security & Password
                  </h6>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark small mb-1">Current Password</label>
                    <input
                      type="password"
                      className="form-control rounded-3 p-2.5 text-dark small"
                      style={{ background: "var(--surface-page)" }}
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark small mb-1">New Password</label>
                    <input
                      type="password"
                      className="form-control rounded-3 p-2.5 text-dark small"
                      style={{ background: "var(--surface-page)" }}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Avatar Card */}
            <div className="col-lg-4">
              <div className="bg-white border rounded-4 p-4 text-center shadow-sm">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mx-auto mb-3"
                  style={{
                    width: 72,
                    height: 72,
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    fontSize: "1.5rem",
                  }}
                >
                  {(firstName[0] || "A") + (lastName[0] || "U")}
                </div>
                <h5 className="fw-bold text-dark mb-1">{firstName} {lastName}</h5>
                <p className="text-muted small mb-2">{email}</p>
                <span className="badge bg-indigo-subtle text-primary rounded-pill px-3 py-1 fw-semibold small">
                  {user?.role || "STUDENT"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: Notifications ── */}
        {activeTab === "notifications" && (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="bg-white border rounded-4 p-4 p-md-5 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom">
                  <Bell size={18} color="var(--bs-indigo)" />
                  <h5 className="fw-bold text-dark mb-0">Email Notifications</h5>
                </div>

                <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                  <div>
                    <h6 className="fw-semibold text-dark mb-1">Book Issue Confirmation Emails</h6>
                    <p className="text-muted small mb-0">
                      Send instant confirmation emails when a book is issued to a member.
                    </p>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={emailIssueAlerts}
                      onChange={(e) => setEmailIssueAlerts(e.target.checked)}
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                  <div>
                    <h6 className="fw-semibold text-dark mb-1">Book Return Receipt Emails</h6>
                    <p className="text-muted small mb-0">
                      Send automated receipt emails when a member completes a book return.
                    </p>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={emailReturnAlerts}
                      onChange={(e) => setEmailReturnAlerts(e.target.checked)}
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between py-3">
                  <div>
                    <h6 className="fw-semibold text-dark mb-1">Weekly Circulation Digest</h6>
                    <p className="text-muted small mb-0">
                      Receive weekly summary reports of borrowing activity and inventory counts.
                    </p>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={weeklyDigest}
                      onChange={(e) => setWeeklyDigest(e.target.checked)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white border rounded-4 p-4 shadow-sm">
                <div className="d-flex align-items-center gap-2 mb-2 text-primary fw-bold small text-uppercase">
                  <Shield size={16} />
                  <span>Privacy Notice</span>
                </div>
                <p className="text-secondary small mb-0 lh-base">
                  Notification settings apply to system-generated messages sent from BookSphere. We never share email or phone details with third parties.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Save Settings Button Bar ── */}
        <div className="d-flex justify-content-start gap-3 mt-4 pt-3 border-top">
          <button
            type="submit"
            className="btn btn-primary fw-bold rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2"
            disabled={isSaving}
            style={{ background: "var(--bs-indigo)", borderColor: "var(--bs-indigo)" }}
          >
            {isSaving ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Preferences</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
