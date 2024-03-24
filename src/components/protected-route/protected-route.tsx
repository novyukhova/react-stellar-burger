import { useSelector } from "../../services/hooks";
import { Navigate } from "react-router-dom";

function ProtectedRouteElement({
  element,
  path,
  forbidAuthenticated = false,
}: {
  element: JSX.Element;
  path?: string;
  forbidAuthenticated?: boolean;
}) {
  const isAuthenticated = useSelector((x) => x.auth.isAuthenticated);
  if (!isAuthenticated && !forbidAuthenticated) {
    return <Navigate to="/login" state={{ from: path }} />;
  }
  if (isAuthenticated && forbidAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
}

export { ProtectedRouteElement };
