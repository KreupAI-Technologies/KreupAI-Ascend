import { Routes, Route } from "react-router-dom";
import TasksTable from "./components/TasksTable.jsx";
import TasksOverview from "./components/TasksOverview.jsx";

const Leads = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksTable />} />
      <Route path="/tasks/:id" element={<TasksOverview />} />
    </Routes>
  );
};

export default Leads;
