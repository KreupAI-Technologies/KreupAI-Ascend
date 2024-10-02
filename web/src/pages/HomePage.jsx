import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen space-x-4">
        <Link
          to="/wotsabot"
          className="bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition duration-200"
        >
          WotSABot
        </Link>
        <Link
          to="/project-management-tool"
          className="bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition duration-200"
        >
          PMT
        </Link>
      </div>
    </>
  );
};

export default HomePage;
