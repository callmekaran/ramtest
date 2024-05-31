/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminLayout from "layouts/Admin";
import SignIn from "views/signin/SignIn";
import { useAuth } from "context/AuthContext";
import { useEffect } from "react";
import SignUp from "views/signup/SignUp";
import ForgotPassword from "views/forgot_password/ForgotPassword";
import ResetPassword from "views/reset_password/ResetPassword";
import RoutesName from "variables/route";

const {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  dashboard,
  company_profile_setup,
} = RoutesName;

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};
function App() {
  const navigate = useNavigate();
  const { isAuthenticated, companyProfile } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && isAuthenticated) {
      const route = !companyProfile ? company_profile_setup : dashboard;
      navigate(route, { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
        <Route path={signin} element={<SignIn />} />
        <Route path={signup} element={<SignUp />} />
        <Route path={forgotPassword} element={<ForgotPassword />} />
        <Route path={resetPassword} element={<ResetPassword />} />
        <Route path="*" element={<Navigate to={signin} replace />} />
      </Routes>
    </div>
  );
}

export default App;
