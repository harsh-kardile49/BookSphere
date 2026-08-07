import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
