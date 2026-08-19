import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import Index from "../pages/Index";
import PublicPortal from "../pages/public/PublicPortal";
import HealthCenter from "../pages/health-center/HealthCenter";
import Sanitation from "../pages/sanitation/Sanitation";
import Immunization from "../pages/immunization/Immunization";
import Wastewater from "../pages/wastewater/Wastewater";
import Surveillance from "../pages/surveillance/Surveillance";
import Reports from "../pages/reports/Reports";
import Users from "../pages/users/Users";
import Settings from "../pages/settings/Settings";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyCode from "../pages/auth/VerifyCode";
import ResetPassword from "../pages/auth/ResetPassword";

export default function AppRoutes() {
  return (
    <Routes>
       <Route path="/" element={<Index />} />
      <Route path="/portal" element={<PublicPortal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="health-center" element={<HealthCenter />} />
          <Route path="sanitation" element={<Sanitation />} />
          <Route path="immunization" element={<Immunization />} />
          <Route path="wastewater" element={<Wastewater />} />
          <Route path="surveillance" element={<Surveillance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

