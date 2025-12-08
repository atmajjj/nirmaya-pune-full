import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface RejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (rejectionReason?: string) => void;
}

const RejectDialog = ({ open, onOpenChange, onConfirm }: RejectDialogProps) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    // Validation: if reason is provided, it must be at least 10 characters
    if (rejectionReason.trim() && rejectionReason.trim().length < 10) {
      setError("Rejection reason must be at least 10 characters if provided");
      return;
    }

    // Clear error and proceed
    setError("");
    onConfirm(rejectionReason.trim() || undefined);
    setRejectionReason("");
  };

  const handleCancel = () => {
    setRejectionReason("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            Reject Application
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to reject this application? You can optionally provide a reason
            that will be stored with the application record.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="rejection-reason">
              Rejection Reason <span className="text-slate-400">(Optional)</span>
            </Label>
            <Textarea
              id="rejection-reason"
              placeholder="E.g., Application does not meet our current research focus criteria..."
              value={rejectionReason}
              onChange={(e) => {
                setRejectionReason(e.target.value);
                setError("");
              }}
              rows={4}
              className={error ? "border-red-500" : ""}
            />
            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </p>
            )}
            <p className="text-xs text-slate-500">
              Minimum 10 characters if providing a reason. Leave blank to reject without a specific reason.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Reject Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectDialog;
