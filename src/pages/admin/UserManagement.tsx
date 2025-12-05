import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { useState } from "react";
import { Users, BarChart3, FileCheck, Database, MessageCircle } from "lucide-react";

// Import extracted components
import UserManagementHeader from "@/components/admin/UserManagement/UserManagementHeader";
import UserStats from "@/components/admin/UserManagement/UserStatsSection";
import UserTable from "@/components/admin/UserManagement/UserTableSection";
import UserDetailsPanel from "@/components/admin/UserManagement/UserDetailsPanelSection";
import AddUserDialog from "@/components/admin/UserManagement/AddUserDialogSection";
import DeleteConfirmDialog from "@/components/admin/UserManagement/DeleteConfirmDialogSection";
import { initialUsers } from "@/components/admin/UserManagement/usersData";
import { User, NewUser } from "@/components/admin/UserManagement/types";

const navItems = [
  { title: "User Management", path: "/admin/user-management", icon: <Users className="w-5 h-5" /> },
  { title: "System Overview", path: "/admin/system-overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "Report Control", path: "/admin/report-control", icon: <FileCheck className="w-5 h-5" /> },
  { title: "Data Logs", path: "/admin/data-logs", icon: <Database className="w-5 h-5" /> },
  { title: "Nira Chatbot", path: "/admin/nira-chatbot", icon: <MessageCircle className="w-5 h-5" /> },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    role: "viewer",
    department: "",
    phone: "",
    password: ""
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    admins: users.filter(u => u.role === 'admin').length
  };

  const handleCreateUser = () => {
    const user: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      ...newUser,
      status: 'pending',
      lastActive: 'Never',
      joinDate: new Date().toISOString().split('T')[0],
      permissions: {
        accessDashboard: true,
        manageData: false,
        editFormulas: false,
        manageAlerts: false,
        systemSettings: false,
        exportData: false,
        userManagement: false
      }
    };
    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "viewer", department: "", phone: "", password: "" });
    setShowAddUser(false);
  };

  const handleDeleteUser = (userId: number) => {
    setUserToDelete(userId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete));
      setSelectedUser(null);
      setUserToDelete(null);
    }
    setShowDeleteConfirm(false);
  };

  const updateUserPermissions = (userId: number, permission: keyof User['permissions'], value: boolean) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, permissions: { ...user.permissions, [permission]: value } }
        : user
    ));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, permissions: { ...selectedUser.permissions, [permission]: value } });
    }
  };

  return (
    <DashboardLayout navItems={navItems} userRole="admin">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <div className="space-y-6 p-6">
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
