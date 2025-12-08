import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { useState, useEffect } from "react";
import { Users, BarChart3, FileCheck, Database, MessageCircle, Settings } from "lucide-react";
import { userService, ApiError } from "@/services";
import { useToast } from "@/hooks/use-toast";

// Import extracted components
import UserManagementHeader from "@/components/admin/UserManagement/UserManagementHeader";
import UserStats from "@/components/admin/UserManagement/UserStatsSection";
import UserTable from "@/components/admin/UserManagement/UserTableSection";
import UserDetailsPanel from "@/components/admin/UserManagement/UserDetailsPanelSection";
import AddUserDialog from "@/components/admin/UserManagement/AddUserDialogSection";
import DeleteConfirmDialog from "@/components/admin/UserManagement/DeleteConfirmDialogSection";
import { User, NewUser } from "@/components/admin/UserManagement/types";

const navItems = [
  { title: "Overview", path: "/admin/system-overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "User Management", path: "/admin/user-management", icon: <Users className="w-5 h-5" /> },
  { title: "Report Control", path: "/admin/report-control", icon: <FileCheck className="w-5 h-5" /> },
  { title: "Data Logs", path: "/admin/data-logs", icon: <Database className="w-5 h-5" /> },
  { title: "Nira Chatbot", path: "/admin/nira-chatbot", icon: <MessageCircle className="w-5 h-5" /> },
  { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const { toast } = useToast();

  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    role: "scientist",
    department: "",
    phone_number: "",
    password: ""
  });

  // Load users from API
  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getAllUsers({ page, limit: 20 });
      
      // Map API users to include default values for UI fields
      const mappedUsers = response.data.map(user => ({
        ...user,
        status: 'active' as const,
        lastActive: new Date(user.updated_at).toLocaleDateString(),
        joinDate: new Date(user.created_at).toLocaleDateString(),
        phone: user.phone_number || undefined,
        permissions: {
          accessDashboard: true,
          manageData: user.role === 'admin' || user.role === 'scientist',
          editFormulas: user.role === 'admin' || user.role === 'scientist',
          manageAlerts: user.role === 'admin',
          systemSettings: user.role === 'admin',
          exportData: true,
          userManagement: user.role === 'admin'
        }
      }));
      
      setUsers(mappedUsers);
      setTotalUsers(response.pagination.total);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast({
        title: "Error",
        description: error instanceof ApiError ? error.message : "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || (user.status && user.status === statusFilter);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: totalUsers,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    admins: users.filter(u => u.role === 'admin').length
  };

  const handleCreateUser = async () => {
    try {
      // Note: User creation would typically use auth/register endpoint
      // For now, we'll show a message that this requires admin invitation
      toast({
        title: "Info",
        description: "User creation requires admin invitation. Use the admin invitation feature.",
        variant: "default",
      });
      setShowAddUser(false);
    } catch (error) {
      console.error('Failed to create user:', error);
      toast({
        title: "Error",
        description: error instanceof ApiError ? error.message : "Failed to create user",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = (userId: number) => {
    setUserToDelete(userId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await userService.deleteUser(userToDelete);
        await loadUsers(); // Reload users after deletion
        setSelectedUser(null);
        setUserToDelete(null);
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
      } catch (error) {
        console.error('Failed to delete user:', error);
        toast({
          title: "Error",
          description: error instanceof ApiError ? error.message : "Failed to delete user",
          variant: "destructive",
        });
      }
    }
    setShowDeleteConfirm(false);
  };

  const updateUserPermissions = async (userId: number, permission: keyof NonNullable<User['permissions']>, value: boolean) => {
    // Find the user and update locally
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate || !userToUpdate.permissions) return;

    // Update local state
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, permissions: { ...user.permissions!, [permission]: value } }
        : user
    ));
    
    if (selectedUser && selectedUser.id === userId && selectedUser.permissions) {
      setSelectedUser({ ...selectedUser, permissions: { ...selectedUser.permissions, [permission]: value } });
    }

    // Note: Permissions would typically be saved to backend
    toast({
      title: "Info",
      description: "Permission changes are local only. Backend integration pending.",
    });
  };

  return (
    <DashboardLayout navItems={navItems} userRole="admin">
      <div className="space-y-6 bg-slate-50 min-h-screen p-6">
        {/* Header Section */}
        <UserManagementHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddUserClick={() => setShowAddUser(true)}
        />

        {/* Summary Cards */}
        <UserStats
          total={userStats.total}
          active={userStats.active}
          pending={userStats.pending}
          admins={userStats.admins}
          onTotalClick={() => setRoleFilter("all")}
          onActiveClick={() => setStatusFilter("active")}
          onPendingClick={() => setStatusFilter("pending")}
          onAdminClick={() => setRoleFilter("admin")}
        />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* User List Section (Left 60%) */}
          <div className="lg:col-span-3">
            <UserTable
              users={filteredUsers}
              roleFilter={roleFilter}
              onRoleFilterChange={setRoleFilter}
              onUserSelect={setSelectedUser}
              selectedUser={selectedUser}
              isLoading={isLoading}
            />
          </div>

          {/* User Details Panel (Right 40%) */}
          <div className="lg:col-span-2">
            <UserDetailsPanel
              user={selectedUser}
              onDelete={handleDeleteUser}
              onPermissionChange={updateUserPermissions}
            />
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserDialog
        open={showAddUser}
        onOpenChange={setShowAddUser}
        newUser={newUser}
        onNewUserChange={setNewUser}
        onCreateUser={handleCreateUser}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={confirmDelete}
      />
      
      {/* NIRA AI Assistant Chatbot */}
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default UserManagement;
