// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// 🟢 Public Pages
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedTestPage from "./pages/ProtectedTestPage";

// 👩‍💼 Job Seeker Pages
import JobSeekerPage from "./pages/JobSeekerPage";
import JobsListPage from "./pages/JobsListPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ProfilePage from "./pages/ProfilePage";
import ApplyJobPage from "./pages/ApplyJobPage";

// 🏢 Employer Pages (ALL located in /pages/)
import EmployerDashboardPage from "./pages/EmployerDashboardPage";
import CreateJobPage from "./pages/CreateJobPage";
import EditJobPage from "./pages/EditJobPage";
import JobApplicationsPage from "./pages/JobApplicationsPage";

// 🔐 User type
type User = {
  id: number;
  role: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  // 🔒 Auth Wrapper
  const RequireAuth = ({
    children,
    role,
  }: {
    children: ReactNode;
    role?: string;
  }) => {
    if (!user) return <Navigate to="/login" replace />;

    if (role && user.role !== role) {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 🟢 Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/job-seeker/apply/:jobId" element={<ApplyJobPage />} />

        {/* 🔒 Test Protected Route */}
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <ProtectedTestPage />
            </RequireAuth>
          }
        />

        {/* 👩‍💼 Job Seeker Routes */}
        <Route
          path="/job-seeker"
          element={
            <RequireAuth role="job_seeker">
              <JobSeekerPage />
            </RequireAuth>
          }
        />
        <Route
          path="/job-seeker/jobs"
          element={
            <RequireAuth role="job_seeker">
              <JobsListPage />
            </RequireAuth>
          }
        />
        <Route
          path="/job-seeker/applications"
          element={
            <RequireAuth role="job_seeker">
              <ApplicationsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/job-seeker/profile"
          element={
            <RequireAuth role="job_seeker">
              <ProfilePage />
            </RequireAuth>
          }
        />

        {/* 🏢 Employer Routes */}
        <Route
          path="/employer/dashboard"
          element={
            <RequireAuth role="employer">
              <EmployerDashboardPage />
            </RequireAuth>
          }
        />

        <Route
          path="/employer/create-job"
          element={
            <RequireAuth role="employer">
              <CreateJobPage />
            </RequireAuth>
          }
        />

        <Route
          path="/employer/edit-job/:id"
          element={
            <RequireAuth role="employer">
              <EditJobPage />
            </RequireAuth>
          }
        />

        <Route
          path="/employer/job/:jobId/applications"
          element={
            <RequireAuth role="employer">
              <JobApplicationsPage />
            </RequireAuth>
          }
        />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
