import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Loading from "./components/common/Loading";

// Public pages
const AcceptInvitation = lazy(() => import("./pages/AcceptInvitation"));

// Layout components
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const ScientistLayout = lazy(() => import("./layouts/ScientistLayout"));
const PolicymakerLayout = lazy(() => import("./layouts/PolicymakerLayout"));
const ResearcherLayout = lazy(() => import("./layouts/ResearcherLayout"));

// Lazy-loaded pages to improve initial bundle size
const ScientistOverview = lazy(() => import("./pages/scientist/Overview"));
const HMPIEngine = lazy(() => import("./pages/scientist/HMPIEngine"));
const FormulaEditor = lazy(() => import("./pages/scientist/FormulaEditor"));
const ScientistGeoMap = lazy(() => import("./pages/scientist/GeoMap"));

const RiskAlerts = lazy(() => import("./pages/policymaker/RiskAlerts"));
const WHOReports = lazy(() => import("./pages/policymaker/WHOReports"));
const TrendAnalysis = lazy(() => import("./pages/policymaker/TrendAnalysis"));
const EarlyWarning = lazy(() => import("./pages/policymaker/EarlyWarning"));
const PolicymakerGeoMap = lazy(() => import("./pages/policymaker/GeoMap"));

const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const InvitationManagement = lazy(() => import("./pages/admin/InvitationManagement"));
const SystemOverview = lazy(() => import("./pages/admin/SystemOverview"));
const ReportControl = lazy(() => import("./pages/admin/ReportControl"));
const DataLogs = lazy(() => import("./pages/admin/DataLogs"));
const NiraChatbotPage = lazy(() => import("./pages/admin/NiraChatbot"));
const ResearcherApplications = lazy(() => import("./pages/admin/ResearcherApplications"));

const ResearcherOverview = lazy(() => import("./pages/researcher/Overview"));
const DatasetLinks = lazy(() => import("./pages/researcher/DatasetLinks"));
const APIManagement = lazy(() => import("./pages/researcher/APIManagement"));
const InteractiveGeoMap = lazy(() => import("./pages/researcher/InteractiveGeoMap"));

const Profile = lazy(() => import("./pages/Profile"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <ErrorBoundary>
          <AuthProvider>
            <Suspense fallback={<Loading message="Loading page..." />}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/accept-invitation" element={<AcceptInvitation />} />

                {/* Profile Route (shared across all roles) */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Scientist Routes (protected with layout) */}
                <Route
                  path="/scientist"
                  element={
                    <ProtectedRoute>
                      <ScientistLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="overview" element={<ScientistOverview />} />
                  <Route path="hmpi-engine" element={<HMPIEngine />} />
                  <Route path="formula-editor" element={<FormulaEditor />} />
                  <Route path="geo-map" element={<ScientistGeoMap />} />
                </Route>

                {/* Policymaker Routes (protected with layout) */}
                <Route
                  path="/policymaker"
                  element={
                    <ProtectedRoute>
                      <PolicymakerLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="risk-alerts" element={<RiskAlerts />} />
                  <Route path="who-reports" element={<WHOReports />} />
                  <Route path="trend-analysis" element={<TrendAnalysis />} />
                  <Route path="early-warning" element={<EarlyWarning />} />
                  <Route path="geo-map" element={<PolicymakerGeoMap />} />
                </Route>

                {/* Admin Routes (protected with layout) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="user-management" element={<UserManagement />} />
                  <Route path="invitation-management" element={<InvitationManagement />} />
                  <Route path="system-overview" element={<SystemOverview />} />
                  <Route path="report-control" element={<ReportControl />} />
                  <Route path="data-logs" element={<DataLogs />} />
                  <Route path="researcher-applications" element={<ResearcherApplications />} />
                  <Route path="nira-chatbot" element={<NiraChatbotPage />} />
                </Route>

                {/* Researcher Routes (protected with layout) */}
                <Route
                  path="/researcher"
                  element={
                    <ProtectedRoute>
                      <ResearcherLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="overview" element={<ResearcherOverview />} />
                  <Route path="datasets" element={<DatasetLinks />} />
                  <Route path="apis" element={<APIManagement />} />
                  <Route path="geo-map" element={<InteractiveGeoMap />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
