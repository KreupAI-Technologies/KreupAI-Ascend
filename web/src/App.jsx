import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WotSABot from "./modules/wotsabot";
import HomePage from "./pages/HomePage";
import ProjectManagementTool from "./modules/project-management-tool";
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
import UnauthenticatedRoute from "./routes/UnauthenticatedRoute";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import MainLayout from "./layouts/MainLayout";

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
            <UnauthenticatedRoute redirectTo="/apps">
              <SignIn />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="signup"
          element={
            <UnauthenticatedRoute redirectTo="/apps">
              <SignUp />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <UnauthenticatedRoute redirectTo="/apps">
              <EmailVerification />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <UnauthenticatedRoute redirectTo="/apps">
              <ForgotPassword />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="reset-password/:token"
          element={
            <UnauthenticatedRoute redirectTo="/apps">
              <ResetPassword />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/"
          element={
            <UnauthenticatedRoute redirectTo="/apps">
              <HomePage />
            </UnauthenticatedRoute>
          }
        />
        <Route path="/wotsabot/*" element={<WotSABot />} />
        <Route
          path="/project-management-tool/*"
          element={<ProjectManagementTool />}
        />
        <Route
          path="/*"
          element={
            <AuthenticatedRoute notAuth="/">
              <MainLayout>
                <Routes>
                  <Route path="/apps/*" element={<AppMenu />} />
                </Routes>
              </MainLayout>
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
