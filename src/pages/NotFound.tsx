import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center p-8">
        <h1 className="mb-4 text-6xl font-bold text-slate-800">404</h1>
        <p className="mb-2 text-xl text-slate-600">Page not found</p>
        <p className="mb-6 text-sm text-slate-500">
          The page <code className="bg-slate-100 px-2 py-1 rounded">{location.pathname}</code> does not exist.
        </p>
        <Link to="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
