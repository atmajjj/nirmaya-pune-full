import { Download } from "lucide-react";
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
  onRoleFilterChange: (value: string) => void;
  onUserSelect: (user: User) => void;
  selectedUser: User | null;
  isLoading?: boolean;
}

const UserTable = ({ 
  users, 
  roleFilter, 
  onRoleFilterChange, 
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold">All Users</CardTitle>
          <p className="text-sm text-slate-600 mt-1">{users.length} users</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={roleFilter} onValueChange={onRoleFilterChange}>
            <SelectTrigger className="w-32 bg-white/70">
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
          
          <Button variant="outline" size="sm" className="bg-white/70">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="w-12"></TableHead>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadge(user.role)} className="capitalize">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-1 text-sm ${statusInfo.color}`}>
                        {statusInfo.icon} {user.status || 'active'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{user.department || 'N/A'}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{user.lastActive || 'N/A'}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        View Details
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
