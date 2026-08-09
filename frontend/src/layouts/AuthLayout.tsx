import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)",
      }}
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
