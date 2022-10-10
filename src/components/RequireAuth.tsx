import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("user token is:");
  console.log(auth?.accessToken);

  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
