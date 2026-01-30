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
const FieldTechnicianLayout = lazy(() => import("./layouts/FieldTechnicianLayout"));

// Lazy-loaded pages to improve initial bundle size
const ScientistOverview = lazy(() => import("./pages/scientist/Overview"));
const DataSources = lazy(() => import("./pages/scientist/DataSources"));
const NirmayaEngine = lazy(() => import("./pages/scientist/NirmayaEngine"));
const Standards = lazy(() => import("./pages/scientist/Standards"));
const FormulaEditor = lazy(() => import("./pages/scientist/FormulaEditor"));
const ScientistGeoMap = lazy(() => import("./pages/scientist/GeoMap"));

const RiskAlerts = lazy(() => import("./pages/policymaker/RiskAlerts"));
const WHOReports = lazy(() => import("./pages/policymaker/Reports"));
const PolicymakerGeoMap = lazy(() => import("./pages/policymaker/GeoMap"));
const PolicymakerOverview = lazy(() => import("./pages/policymaker/Overview"));

const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const AdminOverview = lazy(() => import("./pages/admin/Overview"));
const ReportControl = lazy(() => import("./pages/admin/ReportControl"));
const NiraChatbotPage = lazy(() => import("./pages/admin/NiraChatbot"));
const ResearcherApplications = lazy(() => import("./pages/admin/ResearcherApplications"));

const ResearcherOverview = lazy(() => import("./pages/researcher/Overview"));
const DatasetLinks = lazy(() => import("./pages/researcher/DatasetLinks"));
const APIManagement = lazy(() => import("./pages/researcher/APIManagement"));
const InteractiveGeoMap = lazy(() => import("./pages/researcher/InteractiveGeoMap"));

const FieldTechnicianOverview = lazy(() => import("./pages/field-technician/Overview"));
const UploadDataset = lazy(() => import("./pages/field-technician/UploadDataset"));
const UploadHistory = lazy(() => import("./pages/field-technician/UploadHistory"));

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
                  <Route path="data-sources" element={<DataSources />} />
                  <Route path="nirmaya-engine" element={<NirmayaEngine />} />
                  <Route path="standards" element={<Standards />} />
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
                  <Route path="overview" element={<PolicymakerOverview />} />
                  <Route path="risk-alerts" element={<RiskAlerts />} />
                  <Route path="who-reports" element={<WHOReports />} />
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
                  <Route path="overview" element={<AdminOverview />} />
                  <Route path="report-control" element={<ReportControl />} />
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

                {/* Field Technician Routes (protected with layout) */}
                <Route
                  path="/field-technician"
                  element={
                    <ProtectedRoute>
                      <FieldTechnicianLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="overview" element={<FieldTechnicianOverview />} />
                  <Route path="upload-dataset" element={<UploadDataset />} />
                  <Route path="upload-history" element={<UploadHistory />} />
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
