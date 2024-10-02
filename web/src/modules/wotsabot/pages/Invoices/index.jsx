import { Route, Routes } from "react-router-dom";
import  InvoicePage from './components/InvoicePage'

function Invoices() {
  return (
    <Routes>
      <Route path="/" element={<InvoicePage />} />
    </Routes>
  );
}

export default Invoices;
