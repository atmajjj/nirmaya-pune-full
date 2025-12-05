import { Button } from "@/components/ui/button";
import { LogOut, Menu, Settings, UserCircle, Shield, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface UserInfo {
  name: string;
  email: string;
  role: string;
  initials: string;
  department: string;
}

interface HeaderProps {
  userInfo: UserInfo;
  onToggleSidebar: () => void;
  onLogout: () => void;
}

// Reusable class constants for header elements
const headerButtonClass = "text-brand-surface hover:bg-brand-secondary/20 hover:text-brand-accent focus:bg-brand-secondary/20 transition-all duration-200";

export const Header = ({ userInfo, onToggleSidebar, onLogout }: HeaderProps) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 flex-shrink-0 bg-gradient-to-r from-brand via-brand to-brand-light shadow-lg border-b border-brand-navy-light/30">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className={headerButtonClass}
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-wide text-white">Nirmaya</h1>
          <p className="text-sm font-medium text-brand-muted">Heavy Metal Monitoring</p>
        </div>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-brand-light/50 border border-brand-secondary/30 rounded-lg text-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 focus:bg-brand-light/70 transition-all duration-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className={`relative ${headerButtonClass}`}
              aria-label="User profile menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-secondary to-brand-secondary-dark flex items-center justify-center">
                <span className="text-xs font-semibold text-white">{userInfo.initials}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-white shadow-xl border border-slate-200 rounded-xl p-0 overflow-hidden">
            {/* User Header */}
            <div className="bg-gradient-to-r from-brand to-brand-light px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-secondary to-brand-secondary-dark flex items-center justify-center shadow-lg">
                  <span className="text-base font-bold text-white">{userInfo.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{userInfo.name}</p>
                  <p className="text-xs text-brand-muted truncate">{userInfo.email}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-brand-accent" />
                <span className="text-xs font-medium text-brand-accent">{userInfo.role}</span>
              </div>
            </div>
            
            {/* Department Info */}
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
              <p className="text-xs text-slate-500">Department</p>
              <p className="text-sm font-medium text-slate-700">{userInfo.department}</p>
            </div>
            
            {/* Menu Items */}
            <div className="p-2">
              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-slate-100 focus:bg-slate-100">
                <UserCircle className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700">View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-slate-100 focus:bg-slate-100">
                <Settings className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-slate-100 focus:bg-slate-100">
                <Mail className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700">Notifications</span>
              </DropdownMenuItem>
            </div>
            
            <DropdownMenuSeparator className="my-0" />
            
            {/* Logout */}
            <div className="p-2">
              <DropdownMenuItem 
                onClick={onLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Logout Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onLogout}
          className={headerButtonClass}
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
