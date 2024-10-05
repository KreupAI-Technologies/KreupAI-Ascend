import { logoData } from "../data/CompanyLogo";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PropTypes from "prop-types";

const WotsabotLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar logoSrc={logoData.logoSrc} logoName={logoData.logoName} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 ml-16 mt-16">{children}</div>
      </div>
    </div>
  );
};

WotsabotLayout.propTypes = {
  children: PropTypes.node,
};

export default WotsabotLayout;
