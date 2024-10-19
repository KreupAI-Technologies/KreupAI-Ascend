import ContactsOverview from "./components/ContactsOverview";
import ContactsTable from "./components/ContactsTable";
import { Routes, Route } from "react-router-dom";

const Accounts = () => {
  return (
    <Routes>
      <Route path="/" element={<ContactsTable />} />
      <Route path="/:id" element={<ContactsOverview />} />
    </Routes>
  );
};

export default Accounts;
