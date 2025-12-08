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
const SystemOverview = lazy(() => import("./pages/admin/SystemOverview"));
const ReportControl = lazy(() => import("./pages/admin/ReportControl"));
const DataLogs = lazy(() => import("./pages/admin/DataLogs"));
const NiraChatbotPage = lazy(() => import("./pages/admin/NiraChatbot"));

const ResearcherOverview = lazy(() => import("./pages/researcher/Overview"));
const DatasetLinks = lazy(() => import("./pages/researcher/DatasetLinks"));
const APIManagement = lazy(() => import("./pages/researcher/APIManagement"));
const ResearchWorkspace = lazy(() => import("./pages/researcher/ResearchWorkspace"));
const InteractiveGeoMap = lazy(() => import("./pages/researcher/InteractiveGeoMap"));

// Debug page (accessible to all)
const ChatbotDebug = lazy(() => import("./pages/ChatbotDebug"));

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

                {/* Debug Route - Accessible to all for troubleshooting */}
                <Route path="/chatbot-debug" element={<ChatbotDebug />} />

                {/* Scientist Routes (protected) */}
                <Route
                  path="/scientist/overview"
                  element={
                    <ProtectedRoute>
                      <ScientistOverview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/scientist/hmpi-engine"
                  element={
                    <ProtectedRoute>
                      <HMPIEngine />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/scientist/formula-editor"
                  element={
                    <ProtectedRoute>
                      <FormulaEditor />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/scientist/geo-map"
                  element={
                    <ProtectedRoute>
                      <ScientistGeoMap />
                    </ProtectedRoute>
                  }
                />

                {/* Policymaker Routes (protected) */}
                <Route
                  path="/policymaker/risk-alerts"
                  element={
                    <ProtectedRoute>
                      <RiskAlerts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policymaker/who-reports"
                  element={
                    <ProtectedRoute>
                      <WHOReports />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policymaker/trend-analysis"
                  element={
                    <ProtectedRoute>
                      <TrendAnalysis />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policymaker/early-warning"
                  element={
                    <ProtectedRoute>
                      <EarlyWarning />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policymaker/geo-map"
                  element={
                    <ProtectedRoute>
                      <PolicymakerGeoMap />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes (protected) */}
                <Route
                  path="/admin/user-management"
                  element={
                    <ProtectedRoute>
                      <UserManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/system-overview"
                  element={
                    <ProtectedRoute>
                      <SystemOverview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/report-control"
                  element={
                    <ProtectedRoute>
                      <ReportControl />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/data-logs"
                  element={
                    <ProtectedRoute>
                      <DataLogs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/nira-chatbot"
                  element={
                    <ProtectedRoute>
                      <NiraChatbotPage />
                    </ProtectedRoute>
                  }
                />

                {/* Researcher Routes (protected) */}
                <Route
                  path="/researcher/overview"
                  element={
                    <ProtectedRoute>
                      <ResearcherOverview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/researcher/datasets"
                  element={
                    <ProtectedRoute>
                      <DatasetLinks />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/researcher/apis"
                  element={
                    <ProtectedRoute>
                      <APIManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/researcher/workspace"
                  element={
                    <ProtectedRoute>
                      <ResearchWorkspace />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/researcher/geo-map"
                  element={
                    <ProtectedRoute>
                      <InteractiveGeoMap />
                    </ProtectedRoute>
                  }
                />

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
