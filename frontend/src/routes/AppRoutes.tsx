import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Books from "../pages/Books/Books";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

// Placeholder pages for demonstration
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container-fluid p-4">
    <div className="card shadow-sm p-4 border-0">
      <h3 className="fw-bold text-primary mb-2">📌 {title} Page</h3>
      <p className="text-secondary mb-0">
        This feature module is set up and will be completed in subsequent development days.
      </p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Main Layout Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Books Routes */}
          <Route path="/books" element={<Books />} />
          <Route
            path="/books/add"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "LIBRARIAN"]}>
                <PlaceholderPage title="Add New Book Form" />
              </ProtectedRoute>
            }
          />
          <Route path="/books/:id" element={<Books />} />
          <Route
            path="/members"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "LIBRARIAN"]}>
                <PlaceholderPage title="Members Management" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/borrow"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "LIBRARIAN"]}>
                <PlaceholderPage title="Borrow & Return Management" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <PlaceholderPage title="Analytics & Reports" />
              </ProtectedRoute>
            }
          />

          {/* Student Routes */}
          <Route
            path="/my-books"
            element={
              <ProtectedRoute allowedRoles={["STUDENT", "USER"]}>
                <PlaceholderPage title="My Borrowed Books" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["STUDENT", "USER"]}>
                <PlaceholderPage title="User Profile" />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
