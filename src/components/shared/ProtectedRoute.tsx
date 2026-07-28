import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "@/store/useAuthPersistStore";

const ProtectedRoute = () => {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

export { ProtectedRoute };
