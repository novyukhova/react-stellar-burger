import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { TCommonState } from "../../utils/types";

function ProtectedRouteElement({
  element,
  path,
  forbidAuthenticated = false,
}: {
  element: JSX.Element;
  path?: string;
  forbidAuthenticated?: boolean;
}) {
  const isAuthenticated = useSelector(
    (x: TCommonState) => x.auth.isAuthenticated
  );
  if (!isAuthenticated && !forbidAuthenticated) {
    return <Navigate to="/login" state={{ from: path }} />;
  }
  if (isAuthenticated && forbidAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
}

export { ProtectedRouteElement };
