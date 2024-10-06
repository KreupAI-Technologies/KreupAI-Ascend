import { Routes, Route } from "react-router-dom";
import RolesManagement from "./components/RolesManagement";
const Roles = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<RolesManagement />}/>
      </Route>
    </Routes>
  );
};

export default Roles;
