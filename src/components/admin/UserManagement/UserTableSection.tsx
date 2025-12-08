import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from './types';

interface UserTableProps {
  users: User[];
  roleFilter: string;
  statusFilter: string;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onUserSelect: (user: User) => void;
  selectedUser: User | null;
  isLoading?: boolean;
}

const UserTable = ({ 
  users, 
  roleFilter, 
  statusFilter,
  onRoleFilterChange, 
  onStatusFilterChange,
  onUserSelect,
  selectedUser,
  isLoading = false
}: UserTableProps) => {
  const getRoleBadge = (role: string): "destructive" | "default" | "secondary" | "outline" => {
    switch (role) {
      case "admin": return "destructive";
      case "policymaker": return "default";
      case "scientist": return "secondary";
      case "analyst": return "outline";
      case "viewer": return "secondary";
      default: return "default";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return { variant: "default", icon: "🟢", color: "text-green-600" };
      case "suspended": return { variant: "destructive", icon: "🔴", color: "text-red-600" };
      case "pending": return { variant: "secondary", icon: "🟡", color: "text-yellow-600" };
      default: return { variant: "outline", icon: "⚪", color: "text-gray-600" };
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader className="pb-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-base md:text-lg font-semibold">All Users</CardTitle>
            <p className="text-xs md:text-sm text-slate-600 mt-1">{users.length} users</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="w-full sm:w-32 bg-white/70">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={roleFilter} onValueChange={onRoleFilterChange}>
              <SelectTrigger className="w-full sm:w-32 bg-white/70">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="scientist">Scientist</SelectItem>
                <SelectItem value="policymaker">Policymaker</SelectItem>
                <SelectItem value="researcher">Researcher</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="w-10 md:w-12"></TableHead>
                <TableHead className="min-w-[200px]">User</TableHead>
                <TableHead className="min-w-[100px]">Role</TableHead>
                <TableHead className="hidden sm:table-cell min-w-[100px]">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Department</TableHead>
                <TableHead className="hidden md:table-cell">Last Active</TableHead>
                <TableHead className="text-right min-w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2 text-slate-500">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <span>Loading users...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => {
                  const statusInfo = getStatusBadge(user.status || 'active');
                  return (
                    <TableRow 
                      key={user.id} 
                      className={`cursor-pointer hover:bg-blue-50/50 ${
                        selectedUser?.id === user.id ? 'bg-blue-50/70' : ''
                      }`}
                      onClick={() => onUserSelect(user)}
                    >
                    <TableCell>
                      <Avatar className="w-7 h-7 md:w-8 md:h-8">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-800 text-sm md:text-base">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate max-w-[200px]">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadge(user.role)} className="capitalize text-xs">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className={`flex items-center gap-1 text-xs md:text-sm ${statusInfo.color}`}>
                        {statusInfo.icon} {user.status || 'active'}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm text-slate-600">{user.department || 'N/A'}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-xs md:text-sm text-slate-600">{user.lastActive || 'N/A'}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 text-xs md:text-sm px-2 md:px-3">
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTable;
