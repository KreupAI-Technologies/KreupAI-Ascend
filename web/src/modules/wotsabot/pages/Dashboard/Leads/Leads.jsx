import { Routes, Route } from "react-router-dom";
import LeadsTable from "./components/LeadsTable.jsx";
import LeadsOverview from "./components/LeadOverview.jsx";

const Leads = () => {
  return (
    <Routes>
      <Route path="/" element={<LeadsTable />} />
      <Route path="/:id" element={<LeadsOverview />} />
    </Routes>
  );
};

export default Leads;
