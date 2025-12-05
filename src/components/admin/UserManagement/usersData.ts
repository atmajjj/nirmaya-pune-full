import { User } from './types';

export const initialUsers: User[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    email: "rajesh@nirmaya.gov.in",
    role: "scientist",
    status: "active",
    lastActive: "2 hours ago",
    department: "Groundwater Research",
    phone: "+91 98765 43210",
    joinDate: "2023-01-15",
    permissions: {
      accessDashboard: true,
      manageData: true,
      editFormulas: true,
      manageAlerts: true,
      systemSettings: false,
      exportData: true,
      userManagement: false
    }
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@nirmaya.gov.in",
    role: "scientist",
    status: "active",
    lastActive: "5 hours ago",
    department: "Environmental Analysis",
    phone: "+91 87654 32109",
    joinDate: "2023-03-22",
    permissions: {
      accessDashboard: true,
      manageData: true,
      editFormulas: false,
      manageAlerts: true,
      systemSettings: false,
      exportData: true,
      userManagement: false
    }
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@nirmaya.gov.in",
    role: "policymaker",
    status: "active",
    lastActive: "1 day ago",
    department: "Policy Development",
    phone: "+91 76543 21098",
    joinDate: "2023-02-10",
    permissions: {
      accessDashboard: true,
      manageData: false,
      editFormulas: false,
      manageAlerts: true,
      systemSettings: false,
      exportData: true,
      userManagement: false
    }
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha@nirmaya.gov.in",
    role: "policymaker",
    status: "suspended",
    lastActive: "5 days ago",
    department: "Regulatory Affairs",
    phone: "+91 65432 10987",
    joinDate: "2023-04-05",
    permissions: {
      accessDashboard: true,
      manageData: false,
      editFormulas: false,
      manageAlerts: false,
      systemSettings: false,
      exportData: false,
      userManagement: false
    }
  },
  {
    id: 5,
    name: "Admin User",
    email: "admin@nirmaya.gov.in",
    role: "admin",
    status: "active",
    lastActive: "Just now",
    department: "System Administration",
    phone: "+91 54321 09876",
    joinDate: "2022-12-01",
    permissions: {
      accessDashboard: true,
      manageData: true,
      editFormulas: true,
      manageAlerts: true,
      systemSettings: true,
      exportData: true,
      userManagement: true
    }
  },
  {
    id: 6,
    name: "Vikash Singh",
    email: "vikash@nirmaya.gov.in",
    role: "analyst",
    status: "pending",
    lastActive: "Never",
    department: "Data Analysis",
    phone: "+91 43210 98765",
    joinDate: "2024-11-10",
    permissions: {
      accessDashboard: true,
      manageData: false,
      editFormulas: false,
      manageAlerts: false,
      systemSettings: false,
      exportData: true,
      userManagement: false
    }
  }
];
