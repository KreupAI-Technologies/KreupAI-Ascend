import { Route, Routes } from "react-router-dom";
import VendorsPage from "./components/VendorsPage";
import CreateVendor from "./components/CreateVendor";
import ImportVendor from "./components/ImportVendor";

function Vendors() {
  return (
    <Routes>
      <Route path="/" element={<VendorsPage />} />
      <Route path="/create-vendor" element={<CreateVendor />} />
      <Route path="/import-vendor" element={<ImportVendor />} />
    </Routes>
  );
}

export default Vendors;
