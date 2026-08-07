import { Toaster } from "sonner";

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={3000}
      expand={false}
      visibleToasts={3}
      toastOptions={{
        style: {
          borderRadius: "12px",
        },
      }}
    />
  );
};

export default Toast;
