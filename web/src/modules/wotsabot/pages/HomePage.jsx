import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link
        to="sign-up"
        className="bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition duration-200"
      >
        Get started
      </Link>
    </div>
  );
};

export default HomePage;
