import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default Home; 