import { Routes, Route } from "react-router-dom";
import AccountAndContactReports from "./AccountAndContactReports/AccountAndContactReports";
import DealReports from "./DealReports/DealReports";
import InvoiceReports from "./InvoiceReports/InvoiceReports";
import LeadReports from "./LeadReports/LeadReports";
import MeetingReports from "./MeetingReports/MeetingReports";
import QuoteReports from "./QuoteReports/QuoteReports";
import SalesMetricsReports from "./SalesMetricsReports/SalesMetricsReports";
import SalesOrderReports from "./SalesOrderReports/SalesOrderReports";
import { VisitReports } from "./VisitReports/VisitReports";
import Sidebar from "./components/Sidebar";

function Reports() {
  return (
    <Routes>
      <Route path="/*" element={<Sidebar />} />
      <Route
        path="/account-and-contact-reports/*"
        element={<AccountAndContactReports />}
      />
      <Route path="/deal-reports/*" element={<DealReports />} />
      <Route path="/invoice-reports/*" element={<InvoiceReports />} />
      <Route path="/lead-reports/*" element={<LeadReports />} />
      <Route path="/meeting-reports/*" element={<MeetingReports />} />
      <Route path="/quote-reports/*" element={<QuoteReports />} />
      <Route path="/sales-metrics-reports/*" element={<SalesMetricsReports />} />
      <Route path="/sales-order-reports/*" element={<SalesOrderReports />} />
      <Route path="/visit-reports/*" element={<VisitReports />} />
    </Routes>
  );
}

export default Reports;
