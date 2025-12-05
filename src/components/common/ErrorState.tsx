import { AlertCircle, RefreshCw, WifiOff, ServerCrash, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorType = 'default' | 'network' | 'server' | 'not-found';

interface ErrorStateProps {
  title?: string;
  message?: string;
  type?: ErrorType;
  onRetry?: () => void;
  retryLabel?: string;
}

const errorConfig = {
  default: {
    icon: AlertCircle,
    title: "Something went wrong",
    message: "An error occurred while loading this content.",
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
  },
  network: {
    icon: WifiOff,
    title: "Connection error",
    message: "Please check your internet connection and try again.",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  server: {
    icon: ServerCrash,
    title: "Server error",
    message: "Our servers are having trouble. Please try again later.",
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
  },
  'not-found': {
    icon: FileX,
    title: "Not found",
    message: "The requested content could not be found.",
    iconColor: "text-slate-500",
    bgColor: "bg-slate-50",
  },
};

const ErrorState = ({
  title,
  message,
  type = 'default',
  onRetry,
  retryLabel = "Try again",
}: ErrorStateProps) => {
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] p-8 text-center">
      <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mb-4`}>
        <Icon className={`w-8 h-8 ${config.iconColor}`} />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        {title || config.title}
      </h3>
      <p className="text-sm text-slate-500 mb-6 max-w-sm">
        {message || config.message}
      </p>
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
