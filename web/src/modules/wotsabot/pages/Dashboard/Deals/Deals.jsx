import DealsCardView from "./components/DealsCardView";
import { Routes, Route } from "react-router-dom";

const Accounts = () => {
  return (
    <Routes>
      <Route path="/" element={<DealsCardView />} />
    </Routes>
  );
};

export default Accounts;
