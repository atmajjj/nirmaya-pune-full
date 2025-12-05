import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface NavItem {
  title: string;
  path: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  userRole: string;
}

// User info based on role
const getUserInfo = (userRole: string) => {
  const roleData: Record<string, { name: string; email: string; role: string; initials: string; department: string }> = {
    scientist: {
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@nirmaya.gov.in',
      role: 'Scientist Dashboard',
      initials: 'PS',
      department: 'Environmental Science Division'
    },
    policymaker: {
      name: 'Shri Rajesh Kumar',
      email: 'rajesh.kumar@nirmaya.gov.in',
      role: 'Policymaker Dashboard',
      initials: 'RK',
      department: 'Water Resources Ministry'
    },
    researcher: {
      name: 'Anika Patel',
      email: 'anika.patel@nirmaya.gov.in',
      role: 'Researcher Dashboard',
      initials: 'AP',
      department: 'Hydrogeology Research Lab'
    },
    admin: {
      name: 'System Administrator',
      email: 'admin@nirmaya.gov.in',
      role: 'Admin Dashboard',
      initials: 'SA',
      department: 'IT Administration'
    }
  };

  return roleData[userRole] || {
    name: 'Guest User',
    email: 'guest@nirmaya.gov.in',
    role: 'Dashboard',
    initials: 'GU',
    department: 'Guest Access'
  };
};

const getDashboardTitle = (userRole: string): string => {
  const titles: Record<string, string> = {
    scientist: 'Scientist Dashboard',
    policymaker: 'Policymaker Dashboard',
    researcher: 'Researcher Dashboard',
    admin: 'Admin Dashboard'
  };
  return titles[userRole] || 'Dashboard';
};

const DashboardLayout = ({ children, navItems, userRole }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('sidebarOpen');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const userInfo = getUserInfo(userRole);
  const dashboardTitle = getDashboardTitle(userRole);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleToggleSidebar = () => {
    setSidebarOpen((prev: boolean) => !prev);
  };

  // Save sidebar state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
    } catch {
      // Silently fail
    }
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        navItems={navItems} 
        sidebarOpen={sidebarOpen} 
        dashboardTitle={dashboardTitle} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          userInfo={userInfo}
          onToggleSidebar={handleToggleSidebar}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
