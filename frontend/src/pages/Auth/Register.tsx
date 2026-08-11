import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../../validation/registerSchema";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";
import ErrorAlert from "../../components/common/ErrorAlert";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError();
      await registerUser(data);
      toast.success("Account ready", {
        description: `Registered as ${data.role}`,
      });
      navigate("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed.";
      toast.error("Registration Error", { description: msg });
    }
  };

  return (
    <div className="container py-3">
      <div
        className="bg-white border rounded-4 shadow-sm overflow-hidden mx-auto"
        style={{
          maxWidth: 960,
          minHeight: 540,
          borderColor: "rgba(0, 0, 0, 0.06)",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="row g-0 h-100" style={{ minHeight: 540 }}>
          {/* ── Left Column: Clean Minimal Registration Form ── */}
          <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-between">
            <div>
              <h2 className="fw-bold text-dark mb-1" style={{ fontSize: "1.65rem" }}>
                Create account
              </h2>
              <p className="text-muted small mb-4" style={{ fontSize: ".86rem" }}>
                Join BookSphere to discover, borrow, and manage books.
              </p>

              <ErrorAlert message={error} onDismiss={clearError} />

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* First Name & Last Name */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold text-dark small mb-1">
                      First Name
                    </label>
                    <div className="position-relative">
                      <span
                        className="position-absolute top-50 translate-middle-y d-flex align-items-center"
                        style={{ left: 12, color: "#a8a29e" }}
                      >
                        <User size={15} />
                      </span>
                      <input
                        type="text"
                        className={`form-control border-light rounded-3 py-2 ${
                          errors.firstName ? "is-invalid" : ""
                        }`}
                        placeholder="Alex"
                        style={{
                          paddingLeft: 36,
                          fontSize: ".88rem",
                          height: 42,
                          background: "var(--surface-page)",
                        }}
                        {...register("firstName")}
                      />
                    </div>
                    {errors.firstName && (
                      <div className="invalid-feedback d-block mt-1" style={{ fontSize: ".75rem" }}>
                        {errors.firstName.message}
                      </div>
                    )}
                  </div>

                  <div className="col-6">
                    <label className="form-label fw-semibold text-dark small mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control border-light rounded-3 py-2 ${
                        errors.lastName ? "is-invalid" : ""
                      }`}
                      placeholder="Morgan"
                      style={{
                        fontSize: ".88rem",
                        height: 42,
                        background: "var(--surface-page)",
                      }}
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback d-block mt-1" style={{ fontSize: ".75rem" }}>
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark small mb-1">
                    Email Address
                  </label>
                  <div className="position-relative">
                    <span
                      className="position-absolute top-50 translate-middle-y d-flex align-items-center"
                      style={{ left: 14, color: "#a8a29e" }}
                    >
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      className={`form-control border-light rounded-3 py-2 ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="alex.morgan@example.com"
                      style={{
                        paddingLeft: 40,
                        fontSize: ".88rem",
                        height: 42,
                        background: "var(--surface-page)",
                      }}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <div className="invalid-feedback d-block mt-1" style={{ fontSize: ".75rem" }}>
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Account Role */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark small mb-1">
                    Account Role
                  </label>
                  <div className="position-relative">
                    <span
                      className="position-absolute top-50 translate-middle-y d-flex align-items-center"
                      style={{ left: 14, color: "#a8a29e", zIndex: 5 }}
                    >
                      <Shield size={16} />
                    </span>
                    <select
                      className={`form-select border-light rounded-3 py-2 ${
                        errors.role ? "is-invalid" : ""
                      }`}
                      style={{
                        paddingLeft: 40,
                        fontSize: ".88rem",
                        height: 42,
                        background: "var(--surface-page)",
                      }}
                      {...register("role")}
                    >
                      <option value="STUDENT">Student / Member</option>
                      <option value="LIBRARIAN">Librarian</option>
                      <option value="ADMIN">System Administrator</option>
                    </select>
                  </div>
                  {errors.role && (
                    <div className="invalid-feedback d-block mt-1" style={{ fontSize: ".75rem" }}>
                      {errors.role.message}
                    </div>
                  )}
                </div>

                {/* Password & Confirm Password */}
                <div className="row g-2 mb-4">
                  <div className="col-6">
                    <label className="form-label fw-semibold text-dark small mb-1">
                      Password
                    </label>
                    <div className="position-relative">
                      <span
                        className="position-absolute top-50 translate-middle-y d-flex align-items-center"
                        style={{ left: 12, color: "#a8a29e" }}
                      >
                        <Lock size={15} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control border-light rounded-3 py-2 ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        placeholder="••••••••"
                        style={{
                          paddingLeft: 36,
                          paddingRight: 32,
                          fontSize: ".88rem",
                          height: 42,
                          background: "var(--surface-page)",
                        }}
                        {...register("password")}
                      />
                      <button
                        type="button"
                        className="btn border-0 position-absolute top-50 end-0 translate-middle-y me-1 text-muted p-1"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                        style={{ background: "transparent" }}
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="text-danger small mt-1" style={{ fontSize: ".74rem" }}>
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className="col-6">
                    <label className="form-label fw-semibold text-dark small mb-1">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control border-light rounded-3 py-2 ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      placeholder="••••••••"
                      style={{
                        fontSize: ".88rem",
                        height: 42,
                        background: "var(--surface-page)",
                      }}
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <div className="text-danger small mt-1" style={{ fontSize: ".74rem" }}>
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="btn w-100 fw-bold text-white rounded-3 border-0 py-2 mb-3"
                  disabled={isLoading}
                  style={{
                    height: 44,
                    background: "var(--bs-indigo)",
                    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
                    transition: "all var(--transition-fast)",
                    fontSize: ".88rem",
                  }}
                >
                  {isLoading ? (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <span className="spinner-border spinner-border-sm" role="status" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      Create Account <ArrowRight size={15} />
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Footer & Security Badge */}
            <div>
              <div className="d-flex align-items-center justify-content-center gap-1 text-muted mb-2" style={{ fontSize: ".74rem" }}>
                <ShieldCheck size={13} color="#10b981" />
                <span>Protected by 256-bit SSL encryption</span>
              </div>
              <p className="text-center text-muted small mb-0" style={{ fontSize: ".82rem" }}>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="fw-semibold text-decoration-none"
                  style={{ color: "var(--bs-indigo)" }}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* ── Right Column: Modern Minimal 2026 Showcase Card ── */}
          <div className="col-lg-6 d-none d-lg-flex p-3">
            <div
              className="w-100 rounded-4 p-4 p-xl-5 d-flex flex-column justify-content-between text-white position-relative overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #18181b 0%, #09090b 100%)",
                minHeight: 516,
              }}
            >
              {/* Minimal Ambient Glow */}
              <div
                className="position-absolute rounded-circle"
                style={{
                  width: 260,
                  height: 260,
                  top: "-60px",
                  right: "-60px",
                  background: "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(9, 9, 11, 0) 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                className="position-absolute rounded-circle"
                style={{
                  width: 220,
                  height: 220,
                  bottom: "-40px",
                  left: "-40px",
                  background: "radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(9, 9, 11, 0) 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Top Tag */}
              <div className="position-relative d-flex align-items-center justify-content-between" style={{ zIndex: 1 }}>
                <span className="badge bg-white bg-opacity-10 text-white-50 px-3 py-1.5 rounded-pill small fw-medium">
                  <Sparkles size={12} className="me-1" color="#a5b4fc" /> Join BookSphere
                </span>
                <span className="text-white-50" style={{ fontSize: ".72rem" }}>
                  v2.0
                </span>
              </div>

              {/* Minimal Hero Feature Highlights */}
              <div className="my-auto position-relative py-3" style={{ zIndex: 1 }}>
                <h4 className="fw-bold text-white mb-3" style={{ fontSize: "1.3rem", lineHeight: 1.35 }}>
                  Access thousands of titles & seamless library services.
                </h4>

                <div className="d-flex flex-column gap-3">
                  <div
                    className="p-3 rounded-3"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <CheckCircle2 size={15} color="#34d399" />
                      <span className="fw-semibold text-white small">Student Access</span>
                    </div>
                    <div className="text-white-50" style={{ fontSize: ".74rem" }}>
                      Browse the catalog, create reservations, and manage borrowed books.
                    </div>
                  </div>

                  <div
                    className="p-3 rounded-3"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <CheckCircle2 size={15} color="#818cf8" />
                      <span className="fw-semibold text-white small">Librarian Tools</span>
                    </div>
                    <div className="text-white-50" style={{ fontSize: ".74rem" }}>
                      Process loans, returns, overdue items, and maintain inventory.
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal Footer */}
              <div className="position-relative d-flex align-items-center justify-content-between text-white-50" style={{ zIndex: 1, fontSize: ".74rem" }}>
                <span>Instant Setup</span>
                <span>Role-Based Access</span>
                <span>Secure Sync</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
