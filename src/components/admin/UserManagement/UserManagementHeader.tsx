import { Search, Plus, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserManagementHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddUserClick: () => void;
}

const UserManagementHeader = ({ searchTerm, onSearchChange, onAddUserClick }: UserManagementHeaderProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">User Management</h1>
            <p className="text-sm text-slate-600">Manage system users and their permissions</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 w-64 bg-white/70 border-slate-300 focus:border-blue-400 focus:ring-blue-200"
            />
          </div>
          
          <Button 
            onClick={onAddUserClick}
            className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New User
          </Button>
          
          <Button variant="outline" size="icon" className="bg-white/70 border-slate-300 hover:bg-slate-100 text-slate-700">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementHeader;
