import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const UnauthenticatedRoute = ({ children, redirectTo }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to={redirectTo} replace />;
  }
  return <div>{children}</div>;
};

UnauthenticatedRoute.propTypes = {
  children: PropTypes.node,
};

export default UnauthenticatedRoute;
