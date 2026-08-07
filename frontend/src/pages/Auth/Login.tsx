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
      const msg = err instanceof Error ? err.message : "Invalid email or password";
      toast.error("Login Failed", { description: msg });
    }
  };

  // Helper for quick demo role testing
  const handleQuickFill = (email: string, roleName: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", "password123", { shouldValidate: true });
    toast.info(`Filled credentials for ${roleName}`);
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
          <div className="card bg-secondary bg-opacity-10 border-secondary border-opacity-25 rounded-4 shadow-lg overflow-hidden">
            <div className="row g-0">
              {/* Left Brand Panel */}
              <div
                className="col-lg-5 p-4 p-md-5 d-none d-lg-flex flex-column justify-content-between text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #0d6efd 0%, #0a58ca 50%, #031633 100%)",
                }}
              >
                <div>
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <span className="fs-2">📚</span>
                    <h3 className="fw-bold mb-0">BookSphere</h3>
                  </div>
                  <h4 className="fw-bold mb-3">Library Management Reimagined</h4>
                  <p className="opacity-75 fs-6">
                    Streamline cataloging, member subscriptions, and book issues with real-time tracking.
                  </p>
                </div>

                <div className="mt-4">
                  <small className="opacity-75 d-block mb-2 font-monospace">Quick Demo Credentials:</small>
                  <div className="d-flex flex-column gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickFill("admin@booksphere.com", "Admin")}
                      className="btn btn-sm btn-outline-light text-start border-opacity-50"
                    >
                      👑 Admin Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickFill("librarian@booksphere.com", "Librarian")}
                      className="btn btn-sm btn-outline-light text-start border-opacity-50"
                    >
                      📖 Librarian Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickFill("student@booksphere.com", "Student")}
                      className="btn btn-sm btn-outline-light text-start border-opacity-50"
                    >
                      🎓 Student Demo
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Form Panel */}
              <div className="col-lg-7 p-4 p-md-5 bg-dark">
                <div className="mb-4">
                  <h3 className="fw-bold mb-1 text-white">Sign In</h3>
                  <p className="text-muted small">
                    Enter your credentials to access your BookSphere account
                  </p>
                </div>

                <ErrorAlert message={error} onDismiss={clearError} />

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Email Field */}
                  <div className="mb-3">
                    <label className="form-label text-white-50 small fw-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control form-control-lg bg-dark text-white border-secondary border-opacity-50 ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="e.g. name@domain.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email.message}</div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="form-label text-white-50 small fw-bold mb-0">
                        Password
                      </label>
                    </div>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control form-control-lg bg-dark text-white border-secondary border-opacity-50 ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        placeholder="Enter password"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-opacity-50"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                      {errors.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 fw-bold mb-3 d-flex align-items-center justify-content-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                        <span>Signing In...</span>
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* Register link */}
                  <div className="text-center mt-3">
                    <span className="text-muted small">Don't have an account? </span>
                    <Link to="/register" className="text-primary text-decoration-none fw-bold small">
                      Register Now
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
