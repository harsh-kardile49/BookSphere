import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const AdminLayout = () => {
  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: "var(--surface-page)", transition: "background-color 0.2s ease" }}>
      {/* Sidebar - Narrow Full Height on Left */}
      <div className="d-none d-md-block" style={{ width: "90px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Main Content Column (Navbar + Outlet) */}
      <div className="d-flex flex-column flex-grow-1 min-vw-0">
        <Navbar />
        
        <main className="flex-grow-1 p-3 p-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
