import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  path: string;
  icon: ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
  sidebarOpen: boolean;
  dashboardTitle: string;
}

export const Sidebar = ({ navItems, sidebarOpen, dashboardTitle }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "bg-[#102E46] text-sidebar-foreground transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-20"
      )}
    >
      {/* Header with Logo */}
      <div className="h-16 px-4 flex items-center border-b border-[#1a4566]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00A8E8] to-[#007EA7] rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-sm text-[#DDE3E8] font-medium capitalize">{dashboardTitle}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-[#6EDFF6]/15 text-[#6EDFF6] font-medium shadow-sm"
                  : "hover:bg-[#4FD3E7]/10 text-[#A7B4BE] hover:text-[#6EDFF6]"
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
