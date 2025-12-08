/**
 * User Management Types
 * Matches API user structure
 */

export interface User {
  id: number;
  name: string;
  email: string;
  phone_number?: string | null;
  role: 'admin' | 'scientist' | 'researcher' | 'policymaker';
  created_at: string;
  updated_at: string;
  // Frontend-only fields for backward compatibility
  status?: 'active' | 'suspended' | 'pending';
  lastActive?: string;
  department?: string;
  joinDate?: string;
  avatar?: string;
  permissions?: {
    accessDashboard: boolean;
    manageData: boolean;
    editFormulas: boolean;
    manageAlerts: boolean;
    systemSettings: boolean;
    exportData: boolean;
    userManagement: boolean;
  };
}

export interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  assigned_role: 'admin' | 'scientist' | 'researcher' | 'policymaker';
}

