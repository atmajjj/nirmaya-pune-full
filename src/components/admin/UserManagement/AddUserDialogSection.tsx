import { UserPlus, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { NewUser } from './types';

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newUser: NewUser;
  onNewUserChange: (user: NewUser) => void;
  onCreateUser: () => void;
  isLoading?: boolean;
}

const AddUserDialog = ({ 
  open, 
  onOpenChange, 
  newUser, 
  onNewUserChange, 
  onCreateUser,
  isLoading = false
}: AddUserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-lg border-slate-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Invite User
          </DialogTitle>
          <DialogDescription>
            Send an invitation email with login credentials to a new user
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <Mail className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900 text-sm">
              An email will be sent with login credentials and an invitation link
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={newUser.first_name}
                onChange={(e) => onNewUserChange({...newUser, first_name: e.target.value})}
                placeholder="John"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={newUser.last_name}
                onChange={(e) => onNewUserChange({...newUser, last_name: e.target.value})}
                placeholder="Doe"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => onNewUserChange({...newUser, email: e.target.value})}
              placeholder="john.doe@example.com"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <Label htmlFor="role">Assigned Role</Label>
            <Select 
              value={newUser.assigned_role} 
              onValueChange={(value) => onNewUserChange({...newUser, assigned_role: value as NewUser['assigned_role']})}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scientist">Scientist</SelectItem>
                <SelectItem value="researcher">Researcher</SelectItem>
                <SelectItem value="policymaker">Policymaker</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              User will be assigned this role when they accept the invitation
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={onCreateUser}
              disabled={!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.assigned_role || isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Sending Invitation...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Invitation
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
