import { useLocation, Navigate, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RequirePatientAccess() {
  const { auth } = useAuth();
  const location = useLocation();
  const { id } = useParams();

  console.log("id pat", id)

  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequirePatientAccess;
