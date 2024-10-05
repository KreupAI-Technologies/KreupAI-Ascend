import { Route, Routes } from "react-router-dom";
import Contacts from "./pages/Dashboard/Contacts/Contacts";
import Home from "./pages/Dashboard/Home/Home";
import Leads from "./pages/Dashboard/Leads/Leads";
import Accounts from "./pages/Dashboard/Accounts/Accounts";
import Deals from "./pages/Dashboard/Deals/Deals";
import Tasks from "./pages/Dashboard/Tasks/Tasks";
import Meetings from "./pages/Dashboard/Meetings/Meetings";
import Calls from "./pages/Dashboard/Calls/Calls";
import Vendors from "./pages/Vendors";
import Reports from "./pages/Reports";
import Invoices from "./pages/Invoices/components/InvoicePage";
import PriceBook from "./pages/Pricebook";
import EmailVerification from "./pages/Auth/EmailVerification";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "lucide-react";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import "../../styles/global.module.css";
import UnauthenticatedRoute from "@/routes/UnauthenticatedRoute";
import AuthenticatedRoute from "@/routes/AuthenticatedRoute";
import WotsabotLayout from "./layouts/WotsabotLayout";
import HomePage from "./pages/HomePage";

function WotSABot() {
  const { isCheckingAuth } = useAuthStore();

  if (isCheckingAuth)
    return <Loader className="animate-spin min-h-screen mx-auto" size={24} />;
  return (
    <>
      <Routes>
        <Route
          path="login"
          element={
            <UnauthenticatedRoute redirectTo="../home">
              <SignIn />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="signup"
          element={
            <UnauthenticatedRoute redirectTo="../home">
              <SignUp />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <UnauthenticatedRoute redirectTo="../home">
              <EmailVerification />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <UnauthenticatedRoute redirectTo="../home">
              <ForgotPassword />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="reset-password/:token"
          element={
            <UnauthenticatedRoute redirectTo="../home">
              <ResetPassword />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/"
          element={
            <UnauthenticatedRoute redirectTo="../home">
              <HomePage />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/*"
          element={
            <AuthenticatedRoute notAuth="/wotsabot">
              <WotsabotLayout>
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
              </WotsabotLayout>
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default WotSABot;
