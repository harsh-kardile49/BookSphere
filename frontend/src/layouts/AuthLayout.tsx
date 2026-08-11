import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-4 position-relative overflow-hidden"
      style={{
        backgroundColor: "#f6f4ee",
      }}
    >
      {/* Ambient background glow elements */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: 500,
          height: 500,
          top: "-150px",
          right: "-150px",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(246, 244, 238, 0) 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: 400,
          height: 400,
          bottom: "-100px",
          left: "-100px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, rgba(246, 244, 238, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="w-100 position-relative" style={{ zIndex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
