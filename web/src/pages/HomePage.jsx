import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-8 text-white text-center">
        <div className=" mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Simplify Your Business Processes
          </h1>
          <p className="text-lg mb-6">
            Experience seamless integration and collaboration with our
            cloud-based solutions.
          </p>
          <Link
            to="/signup"
            className="bg-white text-green-600 font-semibold py-2 px-6 rounded shadow-lg hover:bg-green-50 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
