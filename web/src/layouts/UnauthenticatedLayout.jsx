import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const UnauthenticatedLayout = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/apps" replace />;
  }
  return (
    <div>
      {children}
    </div>
  );
};

UnauthenticatedLayout.propTypes = {
  children: PropTypes.node,
};

export default UnauthenticatedLayout;
