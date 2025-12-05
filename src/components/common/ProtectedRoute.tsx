import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Props = {
  children: ReactNode;
  allowedRoles?: string[];
};

/**
 * Protected Route Component
 * - Checks if user is authenticated via AuthContext
 * - Optionally validates user role against allowed roles
 * - Redirects to login if not authenticated
 */
const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, role } = useAuth();

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check role-based access if allowedRoles specified
  if (allowedRoles && allowedRoles.length > 0 && role) {
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
