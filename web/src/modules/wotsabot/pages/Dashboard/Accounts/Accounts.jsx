import AccountsOverview from "./components/AccountsOverview";
import AccountsTable from "./components/AccountsTable";
import { Routes, Route } from "react-router-dom";

const Accounts = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountsTable />} />
      <Route path="/:id" element={<AccountsOverview />} />
    </Routes>
  );
};

export default Accounts;
