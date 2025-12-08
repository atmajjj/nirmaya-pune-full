import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { userService, ApiError } from "@/services";
import { User } from "@/services/api/userService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Mail, Phone, Calendar, Shield, Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layouts/DashboardLayout";

// Import navigation items for each role
import { Users, BarChart3, FileCheck, Database, MessageCircle, Activity, Map, Calculator, TrendingUp, AlertTriangle, FileText, Wind, Link as LinkIcon, Code, Folder } from "lucide-react";

const getNavItemsForRole = (role: string) => {
  switch (role) {
    case 'admin':
      return [
        { title: "Overview", path: "/admin/system-overview", icon: <BarChart3 className="w-5 h-5" /> },
        { title: "User Management", path: "/admin/user-management", icon: <Users className="w-5 h-5" /> },
        { title: "Report Control", path: "/admin/report-control", icon: <FileCheck className="w-5 h-5" /> },
        { title: "Data Logs", path: "/admin/data-logs", icon: <Database className="w-5 h-5" /> },
        { title: "Nira Chatbot", path: "/admin/nira-chatbot", icon: <MessageCircle className="w-5 h-5" /> },
        { title: "Settings", path: "/profile", icon: <Shield className="w-5 h-5" /> },
      ];
    case 'scientist':
      return [
        { title: "Overview", path: "/scientist/overview", icon: <Activity className="w-5 h-5" /> },
        { title: "HMPI Engine", path: "/scientist/hmpi-engine", icon: <Calculator className="w-5 h-5" /> },
        { title: "Formula Editor", path: "/scientist/formula-editor", icon: <Edit className="w-5 h-5" /> },
        { title: "Geo Map", path: "/scientist/geo-map", icon: <Map className="w-5 h-5" /> },
        { title: "Settings", path: "/profile", icon: <Shield className="w-5 h-5" /> },
      ];
    case 'policymaker':
      return [
        { title: "Early Warning", path: "/policymaker/early-warning", icon: <Wind className="w-5 h-5" /> },
        { title: "Risk Alerts", path: "/policymaker/risk-alerts", icon: <AlertTriangle className="w-5 h-5" /> },
        { title: "WHO Reports", path: "/policymaker/who-reports", icon: <FileText className="w-5 h-5" /> },
        { title: "Trend Analysis", path: "/policymaker/trend-analysis", icon: <TrendingUp className="w-5 h-5" /> },
        { title: "Geo Map", path: "/policymaker/geo-map", icon: <Map className="w-5 h-5" /> },
        { title: "Settings", path: "/profile", icon: <Shield className="w-5 h-5" /> },
      ];
    case 'researcher':
      return [
        { title: "Overview", path: "/researcher/overview", icon: <Activity className="w-5 h-5" /> },
        { title: "Datasets", path: "/researcher/datasets", icon: <LinkIcon className="w-5 h-5" /> },
        { title: "APIs", path: "/researcher/apis", icon: <Code className="w-5 h-5" /> },
        { title: "Workspace", path: "/researcher/workspace", icon: <Folder className="w-5 h-5" /> },
        { title: "Geo Map", path: "/researcher/geo-map", icon: <Map className="w-5 h-5" /> },
        { title: "Settings", path: "/profile", icon: <Shield className="w-5 h-5" /> },
      ];
    default:
      return [
        { title: "Settings", path: "/profile", icon: <Shield className="w-5 h-5" /> },
      ];
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      const currentUser = await userService.getCurrentUser();
      setUser(currentUser);
      setEditForm({
        name: currentUser.name,
        email: currentUser.email,
        phone_number: currentUser.phone_number || "",
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
      toast({
        title: "Error",
        description: error instanceof ApiError ? error.message : "Failed to load profile",
        variant: "destructive",
      });
      
      // If unauthorized, logout
      if (error instanceof ApiError && error.message.toLowerCase().includes('unauthorized')) {
        await logout();
        navigate('/', { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProfile = () => {
    setShowEditDialog(true);
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      await userService.updateCurrentUser({
        name: editForm.name,
        email: editForm.email,
        phone_number: editForm.phone_number || undefined,
      });

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      // Reload profile
      await loadUserProfile();
      setShowEditDialog(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast({
        title: "Error",
        description: error instanceof ApiError ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getRoleBadgeColor = (role: string): "destructive" | "default" | "secondary" | "outline" => {
    switch (role) {
      case "admin": return "destructive";
      case "policymaker": return "default";
      case "scientist": return "secondary";
      case "researcher": return "outline";
      default: return "default";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <p className="text-center text-slate-600">Failed to load profile</p>
            <Button onClick={() => navigate(-1)} className="w-full mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const navItems = getNavItemsForRole(user.role);

  return (
    <DashboardLayout navItems={navItems} userRole={user.role}>
      <div className="space-y-6 bg-slate-50 min-h-screen p-6">
        {/* Profile Header Card */}
        <Card className="bg-white border-slate-200/50 shadow-sm">
          {/* Header with Name, Role, and Action */}
          <CardHeader className="border-b border-slate-100 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{user.name}</h1>
                <Badge variant={getRoleBadgeColor(user.role)} className="capitalize">
                  {user.role}
                </Badge>
              </div>
              <Button 
                variant="outline"
                className="flex items-center gap-2 hover:bg-brand hover:text-white transition-colors"
                onClick={handleEditProfile}
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>

          {/* Profile Information */}
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <p className="text-slate-900 font-medium">{user.email}</p>
              </div>

              {/* Phone */}
              {user.phone_number && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-500 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <p className="text-slate-900 font-medium">{user.phone_number}</p>
                </div>
              )}

              {/* Account Created */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Account Created
                </label>
                <p className="text-slate-900 font-medium">
                  {new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Last Updated */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Last Updated
                </label>
                <p className="text-slate-900 font-medium">
                  {new Date(user.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-lg border-slate-200">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-brand" />
                Edit Profile
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-email">Email Address</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="edit-phone">Phone Number (Optional)</Label>
                <Input
                  id="edit-phone"
                  value={editForm.phone_number}
                  onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="mt-1"
                />
              </div>
            </div>

            <DialogFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
                disabled={isSaving}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                disabled={isSaving || !editForm.name || !editForm.email}
                className="bg-brand hover:bg-brand-light"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
