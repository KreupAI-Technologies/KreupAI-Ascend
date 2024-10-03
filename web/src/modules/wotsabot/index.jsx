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
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import Vendors from "./pages/Vendors";
import Reports from "./pages/Reports";
import Invoices from "./pages/Invoices/components/InvoicePage";
import PriceBook from "./pages/Pricebook";
import EmailVerification from "./pages/Auth/EmailVerification";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import "../../styles/global.module.css"

function WotSABot() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Loader className="animate-spin min-h-screen mx-auto" size={24} />;
  return (
    <>
      <Routes>
        <Route
          path="login"
          element={
            <UnauthenticatedLayout>
              <SignIn />
            </UnauthenticatedLayout>
          }
        />
        <Route
          path="signup"
          element={
            <UnauthenticatedLayout>
              <SignUp />
            </UnauthenticatedLayout>
          }
        />
        <Route
          path="verify-email"
          element={
            <UnauthenticatedLayout>
              <EmailVerification />
            </UnauthenticatedLayout>
          }
        />
        <Route
          path="forgot-password"
          element={
            <UnauthenticatedLayout>
              <ForgotPassword />
            </UnauthenticatedLayout>
          }
        />
        <Route
          path="reset-password/:token"
          element={
            <UnauthenticatedLayout>
              <ResetPassword />
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
