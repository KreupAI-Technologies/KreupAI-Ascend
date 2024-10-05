import { Link } from "react-router-dom";

const AppMenu = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <Link
        to="/wotsabot/home" // Update this to your desired route
        className="inline-block px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
      >
        WotSABot
      </Link>
      <Link
        to="/project-management-tool" // Update this to your desired route
        className="inline-block px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-400 to-lime-400 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
      >
        Project Management Tool
      </Link>
    </div>
  );
};

export default AppMenu;
