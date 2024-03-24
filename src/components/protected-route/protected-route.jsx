import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

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

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  forbidAuthenticated: PropTypes.bool,
};

export { ProtectedRouteElement };
