import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRouteElement({ element, forbidAuthenticated = false }) {
  const isAuthenticated = useSelector((x) => x.auth.isAuthenticated);
  if (!isAuthenticated && !forbidAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (isAuthenticated && forbidAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
}

export { ProtectedRouteElement };
