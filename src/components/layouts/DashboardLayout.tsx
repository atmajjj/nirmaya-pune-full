import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { showSuccessToast } from "@/lib/toast-utils";

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
  const { logout, user } = useAuth();
  
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('sidebarOpen');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Use actual user info from auth context if available, otherwise fallback to role-based defaults
  const defaultUserInfo = getUserInfo(userRole);
  const userInfo = user ? {
    name: user.name,
    email: user.email,
    role: `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard`,
    initials: user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    department: defaultUserInfo.department
  } : defaultUserInfo;
  
  const dashboardTitle = getDashboardTitle(userRole);

  const handleLogout = async () => {
    const userName = user?.name || 'User';
    await logout();
    showSuccessToast("Logged out", `Goodbye, ${userName}!`);
    navigate("/", { replace: true });
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
