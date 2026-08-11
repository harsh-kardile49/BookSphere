import React from "react";

interface ErrorAlertProps {
  message: string | null;
  onDismiss?: () => void;
  variant?: "danger" | "warning" | "info";
  title?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onDismiss,
  variant = "danger",
  title = "Error",
}) => {
  if (!message) return null;

  return (
    <div
      className={`alert alert-${variant} alert-dismissible fade show shadow-sm border-start border-4 border-${variant}`}
      role="alert"
    >
      <div className="d-flex align-items-center">
        <span className="fs-5 me-2">⚠️</span>
        <div>
          {title && <strong className="d-block">{title}</strong>}
          <div>{message}</div>
        </div>
      </div>
      {onDismiss && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onDismiss}
        ></button>
      )}
    </div>
  );
};

export default ErrorAlert;
