import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/** This component checks whether the user is authenticated.
 *  If the user is authenticated, it renders the Outlet component.
 *  Otherwise, it redirects the user to the login page. */

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
