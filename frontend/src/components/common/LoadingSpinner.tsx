import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  fullPage?: boolean;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  fullPage = false,
  variant = "primary",
  size = "md",
}) => {
  const spinnerSizeClass = size === "sm" ? "spinner-border-sm" : "";
  const customStyle = size === "lg" ? { width: "3rem", height: "3rem" } : {};

  const content = (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <div
        className={`spinner-border text-${variant} ${spinnerSizeClass}`}
        role="status"
        style={customStyle}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {message && <p className="mt-3 text-secondary fw-semibold mb-0">{message}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div
        className="d-flex align-items-center justify-content-center bg-light min-vh-100 position-fixed top-0 start-0 w-100"
        style={{ zIndex: 1050 }}
      >
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
