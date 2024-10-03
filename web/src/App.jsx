import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WotSABot from "./modules/wotsabot";
import HomePage from "./pages/HomePage";
import ProjectManagementTool from "./modules/project-management-tool";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import AppMenu from "./pages/AppMenu";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import EmailVerification from "./pages/Auth/EmailVerification";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import "./styles/global.module.css";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth)
    return <Loader className="animate-spin min-h-screen mx-auto" size={24} />;
  return (
    <Router>
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
          path="/wotsabot/*"
          element={
            <UnauthenticatedLayout>
              <WotSABot />
            </UnauthenticatedLayout>
          }
        />
        <Route
          path="/project-management-tool/*"
          element={
            <UnauthenticatedLayout>
              <ProjectManagementTool />
            </UnauthenticatedLayout>
          }
        />
        <Route
          path="/*"
          element={
            <AuthenticatedLayout>
              <Routes>
                <Route path="/apps/*" element={<AppMenu />} />
              </Routes>
            </AuthenticatedLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
