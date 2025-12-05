import { toast } from "@/hooks/use-toast";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import React from "react";

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
}

const toastConfig: Record<ToastType, { icon: React.ComponentType<{ className?: string }>; variant?: "default" | "destructive" }> = {
  success: {
    icon: CheckCircle2,
    variant: "default",
  },
  error: {
    icon: AlertCircle,
    variant: "destructive",
  },
  warning: {
    icon: AlertTriangle,
    variant: "default",
  },
  info: {
    icon: Info,
    variant: "default",
  },
};

const iconColors: Record<ToastType, string> = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-amber-500",
  info: "text-blue-500",
};

function showToast(type: ToastType, options: ToastOptions) {
  const config = toastConfig[type];
  const Icon = config.icon;

  return toast({
    title: (
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${iconColors[type]}`} />
        <span>{options.title}</span>
      </div>
    ) as unknown as string,
    description: options.description,
    variant: config.variant,
    duration: options.duration ?? 4000,
  });
}

export const showSuccessToast = (title: string, description?: string) => 
  showToast('success', { title, description });

export const showErrorToast = (title: string, description?: string) => 
  showToast('error', { title, description, duration: 5000 });

export const showWarningToast = (title: string, description?: string) => 
  showToast('warning', { title, description });

export const showInfoToast = (title: string, description?: string) => 
  showToast('info', { title, description });

// Convenience function for common actions
export const toastActions = {
  saved: (itemName?: string) => 
    showSuccessToast("Saved successfully", itemName ? `${itemName} has been saved.` : undefined),
  
  deleted: (itemName?: string) => 
    showSuccessToast("Deleted", itemName ? `${itemName} has been deleted.` : undefined),
  
  created: (itemName?: string) => 
    showSuccessToast("Created", itemName ? `${itemName} has been created.` : undefined),
  
  updated: (itemName?: string) => 
    showSuccessToast("Updated", itemName ? `${itemName} has been updated.` : undefined),
  
  copied: (itemName?: string) => 
    showSuccessToast("Copied", itemName ? `${itemName} copied to clipboard.` : "Copied to clipboard."),
  
  error: (message?: string) => 
    showErrorToast("Error", message ?? "Something went wrong. Please try again."),
  
  networkError: () => 
    showErrorToast("Connection error", "Please check your internet connection."),
  
  unauthorized: () => 
    showErrorToast("Unauthorized", "Please log in to continue."),
};
