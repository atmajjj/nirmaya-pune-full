import { useState, useEffect } from "react";
import { userService, invitationService, ApiError } from "@/services";
import { useToast } from "@/hooks/use-toast";

// Import extracted components
import UserManagementHeader from "@/components/admin/UserManagement/UserManagementHeader";
import UserStats from "@/components/admin/UserManagement/UserStatsSection";
import UserTable from "@/components/admin/UserManagement/UserTableSection";
import UserDetailsPanel from "@/components/admin/UserManagement/UserDetailsPanelSection";
import AddUserDialog from "@/components/admin/UserManagement/AddUserDialogSection";
import DeleteConfirmDialog from "@/components/admin/UserManagement/DeleteConfirmDialogSection";
import { User, NewUser } from "@/components/admin/UserManagement/types";

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
  const [isInviting, setIsInviting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const { toast } = useToast();

  const [newUser, setNewUser] = useState<NewUser>({
    first_name: "",
    last_name: "",
    email: "",
    assigned_role: "scientist"
  });

  // Load users from API
  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getAllUsers({ page, limit: 20 });
      
      // Check if we have data
      if (!response || !response.data) {
        throw new Error('Invalid response format');
      }
      
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
      setTotalUsers(response.pagination?.total || mappedUsers.length);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast({
        title: "Error",
        description: error instanceof ApiError ? error.message : "Failed to load users",
        variant: "destructive",
      });
      // Set empty array on error
      setUsers([]);
      setTotalUsers(0);
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
      setIsInviting(true);
      
      const response = await invitationService.createInvitation({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        assigned_role: newUser.assigned_role
      });

      if (response.success) {
        toast({
          title: "Invitation Sent",
          description: `Invitation email sent to ${newUser.email}. They will receive login credentials via email.`,
        });
        
        // Reset form and close dialog
        setNewUser({
          first_name: "",
          last_name: "",
          email: "",
          assigned_role: "scientist"
        });
        setShowAddUser(false);
        
        // Optionally reload users to show pending invitation
        // await loadUsers();
      }
    } catch (error) {
      console.error('Failed to send invitation:', error);
      toast({
        title: "Error",
        description: error instanceof ApiError ? error.message : "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setIsInviting(false);
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

  return (
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
            />
          </div>
        </div>

        {/* Add User Modal */}
        <AddUserDialog
          open={showAddUser}
          onOpenChange={setShowAddUser}
          newUser={newUser}
          onNewUserChange={setNewUser}
          onCreateUser={handleCreateUser}
          isLoading={isInviting}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmDialog
          open={showDeleteConfirm}
          onOpenChange={setShowDeleteConfirm}
          onConfirm={confirmDelete}
        />
      </div>
  );
};

export default UserManagement;
