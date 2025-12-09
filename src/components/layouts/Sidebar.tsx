import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Droplets } from "lucide-react";

interface NavItem {
  title: string;
  path: string;
  icon: ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
  sidebarOpen: boolean;
}

export const Sidebar = ({ navItems, sidebarOpen }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "bg-brand-navy text-sidebar-foreground transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-20"
      )}
    >
      {/* Header with Logo */}
      <div className="h-16 border-b border-brand-navy-light/40">
        <div className="flex items-center justify-center w-full px-2 h-full">
          <div className="flex items-center h-full py-2 gap-2">
            <Droplets
              className="w-12 h-12 text-brand-surface flex-shrink-0"
            />
            {sidebarOpen && (
              <p className="text-lg text-brand-surface font-bold">NIRMAYA</p>
            )}
          </div>
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
                  ? "bg-brand-accent/15 text-brand-accent font-medium shadow-sm"
                  : "hover:bg-brand-accent-hover/10 text-brand-muted hover:text-brand-accent"
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
