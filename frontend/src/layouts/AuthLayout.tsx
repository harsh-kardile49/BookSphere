import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
