export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'scientist' | 'policymaker' | 'analyst' | 'viewer';
  status: 'active' | 'suspended' | 'pending';
  lastActive: string;
  department?: string;
  phone?: string;
  joinDate: string;
  avatar?: string;
  permissions: {
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
  name: string;
  email: string;
  role: User['role'];
  department: string;
  phone: string;
  password: string;
}
