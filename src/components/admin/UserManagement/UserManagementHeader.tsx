import { Search, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserManagementHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddUserClick: () => void;
}

const UserManagementHeader = ({ searchTerm, onSearchChange, onAddUserClick }: UserManagementHeaderProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative p-4 md:p-6 space-y-4">
        {/* Title Section */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-0.5 md:mb-1 truncate">User Management</h1>
            <p className="text-xs md:text-sm text-slate-600 truncate">Manage system users and their permissions</p>
          </div>
        </div>
        
        {/* Actions Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 w-full bg-white/70 border-slate-300 focus:border-blue-400 focus:ring-blue-200"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={onAddUserClick}
              className="flex-1 sm:flex-initial bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Invite User</span>
              <span className="sm:hidden">Invite</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementHeader;
