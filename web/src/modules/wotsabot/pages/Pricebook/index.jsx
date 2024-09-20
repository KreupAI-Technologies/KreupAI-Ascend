import { Route, Routes } from "react-router-dom";
import PriceB from "./components/PriceB";
import Create from "./components/create-pricebook/Create";
import Import from "./components/import-pricebook/Import";
import ExcelImporter from "./components/import-pricebook/ExcelImporter";
import Form from "./components/create-pricebook/CreatePriceBookForm";
function PriceBook() {
  return (
    <Routes>
      <Route path="/" element={<PriceB />} />
      <Route path="/create-pricebook" element={<Create />} />
      <Route path="/create-pricebook-form" element={<Form />} />
      <Route path="/import" element={<Import />} />
      <Route path="/excel-importer" element={<ExcelImporter />} />
    </Routes>
  );
}

export default PriceBook;
