import { useSelector } from "../../services/hooks";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRouteElement({
  element,
  forbidAuthenticated = false,
}: {
  element: JSX.Element;
  path?: string;
  forbidAuthenticated?: boolean;
}) {
  const location = useLocation();
  const isAuthenticated = useSelector((x) => x.auth.isAuthenticated);
  if (!isAuthenticated && !forbidAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  if (isAuthenticated && forbidAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
}

export { ProtectedRouteElement };
