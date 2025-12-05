import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Loading..." }: LoadingProps) => (
  <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
    <p className="text-sm text-slate-500">{message}</p>
  </div>
);

export default Loading;
