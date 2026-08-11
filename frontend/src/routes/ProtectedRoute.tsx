import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { UserRole } from "../types/auth";
import LoadingSpinner from "../components/common/LoadingSpinner";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner fullPage message="Verifying session..." />;
  }

  // 1. Redirect to login if user is not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Normalize role checking (USER alias maps to STUDENT)
  const currentRole = user.role === "USER" ? "STUDENT" : user.role;

  // 3. Check role-based permissions if specified
  if (allowedRoles && allowedRoles.length > 0) {
    const normalizedAllowedRoles = allowedRoles.map((r) =>
      r === "USER" ? "STUDENT" : r
    );

    if (!normalizedAllowedRoles.includes(currentRole)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Render children or nested routes via Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
