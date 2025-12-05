import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteConfirmDialog = ({ open, onOpenChange, onConfirm }: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-lg border-slate-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            Confirm Delete
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-slate-600">
            Are you sure you want to delete this user? This action cannot be undone.
          </p>
          
          <div className="flex gap-3">
            <Button 
              variant="destructive" 
              onClick={onConfirm}
              className="flex-1"
            >
              Delete User
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

export default DeleteConfirmDialog;
