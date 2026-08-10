import { Toaster } from "sonner";

const Toast = () => {
  return (
    <Toaster
      position="top-center"
      duration={3200}
      expand={false}
      visibleToasts={3}
      toastOptions={{
        className: "apple-ui-toast",
        style: {
          background: "#ffffff",
          color: "#1c1917",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius: "9999px",
          boxShadow: "0 14px 36px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
          padding: "10px 20px",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Manrope', sans-serif",
        },
      }}
    />
  );
};

export default Toast;
