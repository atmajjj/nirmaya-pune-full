import { UserPlus, Mail, Phone, Calendar, Trash2, Edit, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { User } from './types';

interface UserDetailsPanelProps {
  user: User | null;
  onDelete: (userId: number) => void;
  onPermissionChange: (userId: number, permission: keyof NonNullable<User['permissions']>, value: boolean) => void;
}

const UserDetailsPanel = ({ user, onDelete, onPermissionChange }: UserDetailsPanelProps) => {
  if (!user) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg sticky top-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            User Details
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center py-12 text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select a user to view details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          User Details
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="text-center space-y-3">
            <Avatar className="w-20 h-20 mx-auto">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <Badge variant="secondary" className="capitalize mt-1">{user.role}</Badge>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 text-slate-400" />
              <span className="text-slate-700">{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-slate-400" />
                <span className="text-slate-700">{user.phone}</span>
              </div>
            )}
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 mt-0.5 text-slate-400" />
              <span className="text-slate-700">Joined: {user.joinDate}</span>
            </div>
          </div>

          {/* Permissions */}
          {user.permissions && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-slate-700">Permissions</h4>
              <div className="space-y-2">
                {Object.entries(user.permissions).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Switch 
                      checked={value}
                      onCheckedChange={(checked) => 
                        onPermissionChange(user.id, key as keyof NonNullable<User['permissions']>, checked)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              className="flex-1"
              onClick={() => onDelete(user.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetailsPanel;
