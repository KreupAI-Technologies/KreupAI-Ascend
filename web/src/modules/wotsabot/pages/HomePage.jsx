import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
    <Navbar />
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 p-8 text-white text-center">
      <div className="mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Elevate Your Customer Experience
        </h1>
        <p className="text-lg mb-6">
          Streamline your customer interactions and drive success with our
          intuitive CRM platform.
        </p>
        <Link
          to="signup"
          className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded shadow-lg hover:bg-gray-200 transition"
        >
          Start Free Trial
        </Link>
      </div>
    </section>
    </>
  );
};

export default HomePage;
