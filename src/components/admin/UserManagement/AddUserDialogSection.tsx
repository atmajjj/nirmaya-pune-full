import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewUser, User } from './types';

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newUser: NewUser;
  onNewUserChange: (user: NewUser) => void;
  onCreateUser: () => void;
}

const AddUserDialog = ({ 
  open, 
  onOpenChange, 
  newUser, 
  onNewUserChange, 
  onCreateUser 
}: AddUserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-lg border-slate-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add New User
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => onNewUserChange({...newUser, name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => onNewUserChange({...newUser, email: e.target.value})}
                placeholder="john@nirmaya.gov.in"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={newUser.role} onValueChange={(value) => onNewUserChange({...newUser, role: value as User['role']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="analyst">Analyst</SelectItem>
                  <SelectItem value="scientist">Scientist</SelectItem>
                  <SelectItem value="policymaker">Policymaker</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={newUser.department}
                onChange={(e) => onNewUserChange({...newUser, department: e.target.value})}
                placeholder="Research"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              value={newUser.phone}
              onChange={(e) => onNewUserChange({...newUser, phone: e.target.value})}
              placeholder="+91 98765 43210"
            />
          </div>
          
          <div>
            <Label htmlFor="password">Temporary Password</Label>
            <Input
              id="password"
              type="password"
              value={newUser.password}
              onChange={(e) => onNewUserChange({...newUser, password: e.target.value})}
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={onCreateUser}
              disabled={!newUser.name || !newUser.email || !newUser.password}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Create User
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
