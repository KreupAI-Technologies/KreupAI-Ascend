import PropTypes from "prop-types";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ children, notAuth }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={notAuth} replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="verify-email" replace />;
  }
  return <div>{children}</div>;
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.node,
  notAuth: PropTypes.string,
};

export default AuthenticatedRoute;
