import { Routes, Route } from "react-router-dom";
import CallsTable from "./components/CallsTable.jsx";
import CallsOverview from "./components/CallsOverview.jsx";

const Leads = () => {
  return (
    <Routes>
      <Route path="/" element={<CallsTable />} />
      <Route path="/calls/:id" element={<CallsOverview />} />
    </Routes>
  );
};

export default Leads;
