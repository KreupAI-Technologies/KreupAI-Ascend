import PropTypes from "prop-types";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const AuthenticatedRoute = ({ children, notAuth }) => {
  const { isAuthenticated, user } = useAuthStore();
  // In your useAuthStore hook
  useEffect(() => {
    console.log("Authentication state changed:", { isAuthenticated, user });
  }, [isAuthenticated, user]);

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
};

export default AuthenticatedRoute;
