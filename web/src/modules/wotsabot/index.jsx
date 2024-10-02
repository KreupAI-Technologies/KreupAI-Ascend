import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Contacts from "./pages/Dashboard/Contacts/Contacts";
import Home from "./pages/Dashboard/Home/Home";
import Leads from "./pages/Dashboard/Leads/Leads";
import Accounts from "./pages/Dashboard/Accounts/Accounts";
import Deals from "./pages/Dashboard/Deals/Deals";
import Tasks from "./pages/Dashboard/Tasks/Tasks";
import Meetings from "./pages/Dashboard/Meetings/Meetings";
import Calls from "./pages/Dashboard/Calls/Calls";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import Vendors from "./pages/Vendors";
import Reports from "./pages/Reports";
import './styles/global.module.css'
import Invoices from "./pages/Invoices/components/InvoicePage";
import PriceBook from "./pages/Pricebook";

function WotSABot() {
  return (
    <>
      <Routes>
        <Route
          path="sign-in"
          element={
            <UnauthenticatedLayout>
              <SignIn />
            </UnauthenticatedLayout>
          }
        />
        <Route
          path="sign-up"
          element={
            <UnauthenticatedLayout>
              <SignUp />
            </UnauthenticatedLayout>
          }
        />
        <Route
          path="/"
          element={
            <UnauthenticatedLayout>
              <HomePage />
            </UnauthenticatedLayout>
          }
        />
        <Route
          path="/*"
          element={
            <AuthenticatedLayout>
              <Routes>
                <Route path="/home/*" element={<Home />} />
                <Route path="/contacts/*" element={<Contacts />} />
                <Route path="/leads/*" element={<Leads />} />
                <Route path="/accounts/*" element={<Accounts />} />
                <Route path="/deals/*" element={<Deals />} />
                <Route path="/tasks/*" element={<Tasks />} />
                <Route path="/meetings/*" element={<Meetings />} />
                <Route path="/calls/*" element={<Calls />} />
                {/* Others */}
                <Route path="/vendors/*" element={<Vendors />} />
                <Route path="/reports/*" element={<Reports />} />
                <Route path="/invoices/*" element={<Invoices />} />
                <Route path="/price-book/*" element={<PriceBook />} />
              </Routes>
            </AuthenticatedLayout>
          }
        />
      </Routes>
    </>
  );
}

export default WotSABot;
