import PropTypes from "prop-types";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import AuthNavbar from "@/components/AuthNavbar";

const AuthenticatedLayout = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="verify-email" replace />;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />
      <div className="mt-16">{children}</div>
    </div>
  );
  
};

AuthenticatedLayout.propTypes = {
  children: PropTypes.node,
};

export default AuthenticatedLayout;
