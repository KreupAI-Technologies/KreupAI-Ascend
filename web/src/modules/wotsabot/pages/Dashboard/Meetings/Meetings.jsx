import MeetingsTable from "./components/MeetingsTable";
import { Routes, Route } from "react-router-dom";

const Meetings = () => {
  return (
    <Routes>
      <Route path="/" element={<MeetingsTable />} />
    </Routes>
  );
};

export default Meetings;
