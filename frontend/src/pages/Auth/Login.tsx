import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../validation/loginSchema";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";
import ErrorAlert from "../../components/common/ErrorAlert";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  BookMarked,

} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data);
      toast.success("Welcome back", {
        description: "Opening workspace",
      });
      navigate("/dashboard");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Invalid email or password";
      toast.error("Login Failed", { description: msg });
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
          {/* ── Left Column: Clean Minimal Login Form ── */}
          <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-between">
            <div>
              <h2 className="fw-bold text-dark mb-1" style={{ fontSize: "1.65rem" }}>
                Welcome back
              </h2>
              <p className="text-muted small mb-4" style={{ fontSize: ".86rem" }}>
                Enter your credentials to access your library workspace.
              </p>

              <ErrorAlert message={error} onDismiss={clearError} />

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                      className={`form-control border-light rounded-3 py-2 ${errors.email ? "is-invalid" : ""
                        }`}
                      placeholder="name@example.com"
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
                    <div className="invalid-feedback d-block mt-1" style={{ fontSize: ".76rem" }}>
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <label className="form-label fw-semibold text-dark small mb-0">
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Password Reset", {
                          description: "Use quick demo buttons below to fill credentials.",
                        });
                      }}
                      className="text-decoration-none small fw-semibold"
                      style={{ color: "var(--bs-indigo)", fontSize: ".78rem" }}
                    >
                      Forgot?
                    </a>
                  </div>

                  <div className="position-relative">
                    <span
                      className="position-absolute top-50 translate-middle-y d-flex align-items-center"
                      style={{ left: 14, color: "#a8a29e" }}
                    >
                      <Lock size={16} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control border-light rounded-3 py-2 ${errors.password ? "is-invalid" : ""
                        }`}
                      placeholder="••••••••"
                      style={{
                        paddingLeft: 40,
                        paddingRight: 40,
                        fontSize: ".88rem",
                        height: 42,
                        background: "var(--surface-page)",
                      }}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="btn border-0 position-absolute top-50 end-0 translate-middle-y me-1 text-muted"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                      style={{ background: "transparent" }}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="text-danger small mt-1" style={{ fontSize: ".76rem" }}>
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMeCheck"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ cursor: "pointer" }}
                    />
                    <label
                      className="form-check-label text-muted small user-select-none"
                      htmlFor="rememberMeCheck"
                      style={{ cursor: "pointer", fontSize: ".8rem" }}
                    >
                      Remember me on this device
                    </label>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="btn w-100 fw-bold text-white rounded-3 border-0 py-2 mb-3"
                  disabled={isLoading}
                  style={{
                    height: 42,
                    background: "var(--bs-indigo)",
                    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
                    transition: "all var(--transition-fast)",
                    fontSize: ".88rem",
                  }}
                >
                  {isLoading ? (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <span className="spinner-border spinner-border-sm" role="status" />
                      Signing in...
                    </span>
                  ) : (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      Sign In <ArrowRight size={15} />
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Footer & Security Badge */}
            <div>
              <p className="text-center text-muted small mb-0" style={{ fontSize: ".82rem" }}>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="fw-semibold text-decoration-none"
                  style={{ color: "var(--bs-indigo)" }}
                >
                  Sign up
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
                  <Sparkles size={12} className="me-1" color="#a5b4fc" /> BookSphere v2.0
                </span>
                <span className="text-white-50" style={{ fontSize: ".72rem" }}>
                  2026 Edition
                </span>
              </div>

              {/* Minimal Hero Graphic / Quote */}
              <div className="my-auto position-relative py-4" style={{ zIndex: 1 }}>
                <div
                  className="rounded-4 p-4 mb-4"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <BookMarked size={18} color="#818cf8" />
                    <span className="fw-semibold text-white small">Digital Library Platform</span>
                  </div>
                  <h4 className="fw-bold text-white mb-0" style={{ fontSize: "1.35rem", lineHeight: 1.35 }}>
                    "Knowledge at your fingertips, organized effortlessly."
                  </h4>
                </div>

                {/* Minimal Metrics */}
                <div className="row g-3">
                  <div className="col-6">
                    <div
                      className="p-3 rounded-3"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <div className="fw-bold text-white fs-5">2,450+</div>
                      <div className="text-white-50" style={{ fontSize: ".72rem" }}>
                        Books Cataloged
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      className="p-3 rounded-3"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <div className="fw-bold text-white fs-5">1,240+</div>
                      <div className="text-white-50" style={{ fontSize: ".72rem" }}>
                        Active Members
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal Footer */}
              <div className="position-relative d-flex align-items-center justify-content-between text-white-50" style={{ zIndex: 1, fontSize: ".74rem" }}>
                <span>Smart Cataloging</span>
                <span>Fast Loans</span>
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
