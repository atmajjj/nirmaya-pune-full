import { UserPlus, Mail, Phone, Calendar, Trash2, Edit, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from './types';

interface UserDetailsPanelProps {
  user: User | null;
  onDelete: (userId: number) => void;
}

const UserDetailsPanel = ({ user, onDelete }: UserDetailsPanelProps) => {
  if (!user) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg xl:sticky xl:top-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
            User Details
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center py-8 md:py-12 text-slate-500">
            <Users className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 opacity-50" />
            <p className="text-sm md:text-base">Select a user to view details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg xl:sticky xl:top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
          User Details
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 md:space-y-6">
        <div className="space-y-4 md:space-y-6">
          {/* Profile Section */}
          <div className="text-center space-y-2 md:space-y-3">
            <Avatar className="w-16 h-16 md:w-20 md:h-20 mx-auto">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg md:text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-base md:text-lg">{user.name}</h3>
              <Badge variant="secondary" className="capitalize mt-1 text-xs">{user.role}</Badge>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
            <div className="flex items-start gap-2">
              <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 text-slate-400 flex-shrink-0" />
              <span className="text-slate-700 break-all">{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 text-slate-400 flex-shrink-0" />
                <span className="text-slate-700">{user.phone}</span>
              </div>
            )}
            <div className="flex items-start gap-2">
              <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 text-slate-400 flex-shrink-0" />
              <span className="text-slate-700">Joined: {user.joinDate}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 md:pt-4">
            <Button variant="outline" size="sm" className="flex-1 text-xs md:text-sm">
              <Edit className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              className="flex-1 text-xs md:text-sm"
              onClick={() => onDelete(user.id)}
            >
              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetailsPanel;
