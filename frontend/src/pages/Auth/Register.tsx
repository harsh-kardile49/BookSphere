import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../../validation/registerSchema";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";
import ErrorAlert from "../../components/common/ErrorAlert";

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
      toast.success("Account created successfully!", {
        description: `Welcome to BookSphere as ${data.role}!`,
      });
      navigate("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed.";
      toast.error("Registration Error", { description: msg });
    }
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
                  <h4 className="fw-bold mb-3">Join the Community</h4>
                  <p className="opacity-75 fs-6">
                    Create an account to explore thousands of titles, manage reservations, and track your borrowings.
                  </p>
                </div>

                <div className="p-3 bg-white bg-opacity-10 rounded-3">
                  <small className="d-block fw-bold mb-1">💡 Flexible Role Assignment</small>
                  <small className="opacity-75">
                    Choose between Student, Librarian, or Admin roles to test permission boundaries.
                  </small>
                </div>
              </div>

              {/* Right Form Panel */}
              <div className="col-lg-7 p-4 p-md-5 bg-dark">
                <div className="mb-4">
                  <h3 className="fw-bold mb-1 text-white">Create Account</h3>
                  <p className="text-muted small">
                    Fill in the details below to get started
                  </p>
                </div>

                <ErrorAlert message={error} onDismiss={clearError} />

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* First Name & Last Name */}
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label text-white-50 small fw-bold">
                        First Name
                      </label>
                      <input
                        type="text"
                        className={`form-control bg-dark text-white border-secondary border-opacity-50 ${
                          errors.firstName ? "is-invalid" : ""
                        }`}
                        placeholder="John"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback">{errors.firstName.message}</div>
                      )}
                    </div>
                    <div className="col-6">
                      <label className="form-label text-white-50 small fw-bold">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className={`form-control bg-dark text-white border-secondary border-opacity-50 ${
                          errors.lastName ? "is-invalid" : ""
                        }`}
                        placeholder="Doe"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback">{errors.lastName.message}</div>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="mb-3">
                    <label className="form-label text-white-50 small fw-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control bg-dark text-white border-secondary border-opacity-50 ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="john.doe@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email.message}</div>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div className="mb-3">
                    <label className="form-label text-white-50 small fw-bold">
                      Account Role
                    </label>
                    <select
                      className={`form-select bg-dark text-white border-secondary border-opacity-50 ${
                        errors.role ? "is-invalid" : ""
                      }`}
                      {...register("role")}
                    >
                      <option value="STUDENT">Student / Member</option>
                      <option value="LIBRARIAN">Librarian</option>
                      <option value="ADMIN">System Administrator</option>
                    </select>
                    {errors.role && (
                      <div className="invalid-feedback">{errors.role.message}</div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <label className="form-label text-white-50 small fw-bold">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control bg-dark text-white border-secondary border-opacity-50 ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        placeholder="Min 6 characters, uppercase & number"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-opacity-50"
                        onClick={() => setShowPassword(!showPassword)}
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

                  {/* Confirm Password Field */}
                  <div className="mb-4">
                    <label className="form-label text-white-50 small fw-bold">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control bg-dark text-white border-secondary border-opacity-50 ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      placeholder="Re-enter password"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword.message}</div>
                    )}
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
                        <span>Registering...</span>
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  {/* Login link */}
                  <div className="text-center mt-3">
                    <span className="text-muted small">Already have an account? </span>
                    <Link to="/login" className="text-primary text-decoration-none fw-bold small">
                      Sign In
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

export default Register;
