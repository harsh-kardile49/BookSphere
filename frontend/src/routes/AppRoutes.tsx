import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Books from "../pages/Books/Books";
import AddBook from "../pages/Books/AddBook";
import BookDetail from "../pages/Books/BookDetail";
import Borrow from "../pages/Borrow/Borrow";
import Return from "../pages/Return/Return";
import Members from "../pages/Members/Members";
import Reports from "../pages/Reports/Reports";
import SavedBooks from "../pages/Saved/SavedBooks";
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

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
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route
            path="/members"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "LIBRARIAN"]}>
                <Members />
              </ProtectedRoute>
            }
          />
          <Route
            path="/borrow"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "LIBRARIAN"]}>
                <Borrow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/return"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "LIBRARIAN"]}>
                <Return />
              </ProtectedRoute>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "LIBRARIAN"]}>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route path="/saved" element={<SavedBooks />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
