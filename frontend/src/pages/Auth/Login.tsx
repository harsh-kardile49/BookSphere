import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../validation/loginSchema";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";
import ErrorAlert from "../../components/common/ErrorAlert";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
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
      toast.success("Welcome back! Login successful.", {
        description: "Redirecting to your dashboard...",
      });
      navigate("/dashboard");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Invalid email or password";
      toast.error("Login Failed", { description: msg });
    }
  };

  const handleQuickFill = (email: string, roleName: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", "password123", { shouldValidate: true });
    toast.info(`Filled credentials for ${roleName}`);
  };

  return (
    <div className="container py-4 py-md-5">
      <div
        className="bg-white rounded-4 shadow-lg overflow-hidden mx-auto"
        style={{ maxWidth: 960 }}
      >
        <div className="row g-0">
          {/* ── Left: Login Form ── */}
          <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center">
            {/* Brand Icon */}
            <div className="mb-4">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: 44,
                  height: 44,
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                }}
              >
                <span className="text-white fs-5">⚡</span>
              </span>
            </div>

            <h2 className="fw-bold text-dark mb-1" style={{ fontSize: "1.85rem" }}>
              Welcome back
            </h2>
            <p className="text-muted mb-4" style={{ fontSize: ".92rem" }}>
              Sign in to continue managing your BookSphere library.
            </p>

            <ErrorAlert message={error} onDismiss={clearError} />

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark small">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control form-control-lg rounded-3 ${errors.email ? "is-invalid" : ""
                    }`}
                  placeholder="Your email"
                  style={{ fontSize: ".95rem" }}
                  {...register("email")}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold text-dark small">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control form-control-lg rounded-start-3 ${errors.password ? "is-invalid" : ""
                      }`}
                    placeholder="Enter password"
                    style={{ fontSize: ".95rem" }}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-end-3 border-start-0"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    style={{ borderColor: "#dee2e6" }}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                  <div className="text-danger small mt-1">
                    {errors.password.message}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-lg w-100 fw-bold text-white rounded-3 border-0 mb-3"
                disabled={isLoading}
                style={{
                  background:
                    "linear-gradient(90deg, #f97316 0%, #ea580c 100%)",
                  transition: "opacity .2s",
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></span>
                    Signing In…
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1" />
                <span className="px-3 text-muted small text-uppercase">
                  Quick Demo
                </span>
                <hr className="flex-grow-1" />
              </div>

              {/* Quick Demo Buttons */}
              <div className="d-flex gap-2 mb-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary flex-fill rounded-3 py-2"
                  onClick={() =>
                    handleQuickFill("admin@booksphere.com", "Admin")
                  }
                >
                  👑 Admin
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary flex-fill rounded-3 py-2"
                  onClick={() =>
                    handleQuickFill("librarian@booksphere.com", "Librarian")
                  }
                >
                  📖 Librarian
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary flex-fill rounded-3 py-2"
                  onClick={() =>
                    handleQuickFill("student@booksphere.com", "Student")
                  }
                >
                  🎓 Student
                </button>
              </div>

              {/* Register link */}
              <p className="text-center text-muted small mb-0">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="fw-bold text-decoration-none"
                  style={{ color: "#ea580c" }}
                >
                  Register
                </Link>
              </p>
            </form>
          </div>

          {/* ── Right: Testimonial / Brand Panel ── */}
          <div className="col-lg-6 d-none d-lg-flex p-3">
            <div
              className="w-100 rounded-4 p-4 d-flex flex-column justify-content-between text-white position-relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(160deg, #fdba74 0%, #f97316 30%, #ea580c 70%, #c2410c 100%)",
              }}
            >
              {/* Decorative blurred circle */}
              <div
                className="position-absolute rounded-circle"
                style={{
                  width: 260,
                  height: 260,
                  top: -40,
                  right: -40,
                  background: "rgba(255,255,255,0.12)",
                  filter: "blur(40px)",
                }}
              />
              <div
                className="position-absolute rounded-circle"
                style={{
                  width: 180,
                  height: 180,
                  bottom: 80,
                  left: -50,
                  background: "rgba(255,255,255,0.08)",
                  filter: "blur(30px)",
                }}
              />



            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
