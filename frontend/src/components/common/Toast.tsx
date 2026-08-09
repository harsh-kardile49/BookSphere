import { Toaster } from "sonner";

const Toast = () => {
  return (
    <Toaster
      position="top-center"
      duration={3200}
      expand={false}
      visibleToasts={3}
      closeButton
      toastOptions={{
        className: "dynamic-island-toast",
      }}
    />
  );
};

export default Toast;
