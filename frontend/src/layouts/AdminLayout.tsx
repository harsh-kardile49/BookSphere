import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
// import Footer from "../components/common/Footer";

const AdminLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container-fluid flex-grow-1">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 bg-light border-end p-0">
            <Sidebar />
          </div>

          {/* Main Page */}
          <div className="col-md-10 p-4">
            <Outlet />
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default AdminLayout;
