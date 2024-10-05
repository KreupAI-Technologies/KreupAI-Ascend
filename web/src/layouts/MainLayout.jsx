import PropTypes from "prop-types";
import AuthNavbar from "@/components/AuthNavbar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />
      <div className="mt-16">{children}</div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
