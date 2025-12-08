import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ApplicationsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ApplicationsHeader = ({ searchTerm, onSearchChange }: ApplicationsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Researcher Applications</h1>
        <p className="text-slate-600 mt-1">Review and manage researcher access requests</p>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search by name, email, or organization..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white border-slate-200 focus:border-[#0A3D62] focus:ring-[#0A3D62]"
        />
      </div>
    </div>
  );
};

export default ApplicationsHeader;
