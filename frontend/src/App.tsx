import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Toast from "./components/common/Toast";
import { useAuthStore } from "./store/authStore";

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      <AppRoutes />
      <Toast />
    </>
  );
}

export default App;
