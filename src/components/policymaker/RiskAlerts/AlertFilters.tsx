import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AlertFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  regionFilter: string;
  onRegionFilterChange: (value: string) => void;
  severityFilter: string;
  onSeverityFilterChange: (value: string) => void;
}

const AlertFilters = ({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  regionFilter,
  onRegionFilterChange,
  severityFilter,
  onSeverityFilterChange
}: AlertFiltersProps) => {
return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
      <div className="lg:col-span-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search Placeholder"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-slate-300 focus:border-blue-400 rounded-xl"
          />
        </div>
      </div>
      
      <Select value={dateRange} onValueChange={onDateRangeChange}>
        <SelectTrigger className="border-slate-300 rounded-xl">
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7days">"Last7 Days"</SelectItem>
          <SelectItem value="30days">"Last30 Days"</SelectItem>
          <SelectItem value="90days">"Last90 Days"</SelectItem>
        </SelectContent>
      </Select>

      <Select value={regionFilter} onValueChange={onRegionFilterChange}>
        <SelectTrigger className="border-slate-300 rounded-xl">
          <SelectValue placeholder="All Regions" />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          <SelectItem value="all">"All Regions"</SelectItem>
          <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
          <SelectItem value="Coimbatore">Coimbatore</SelectItem>
          <SelectItem value="Madurai">Madurai</SelectItem>
          <SelectItem value="Chennai">Chennai</SelectItem>
          <SelectItem value="Erode">Erode</SelectItem>
          <SelectItem value="Maharashtra">Maharashtra</SelectItem>
          <SelectItem value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</SelectItem>
          <SelectItem value="Kolhapur">Kolhapur</SelectItem>
          <SelectItem value="Nagpur">Nagpur</SelectItem>
          <SelectItem value="Kerala">Kerala</SelectItem>
          <SelectItem value="Ernakulam">Ernakulam (Kochi)</SelectItem>
          <SelectItem value="Kozhikode">Kozhikode</SelectItem>
          <SelectItem value="Karnataka">Karnataka</SelectItem>
          <SelectItem value="Bangalore Urban">Bangalore</SelectItem>
          <SelectItem value="Chikmagalur">Chikmagalur</SelectItem>
          <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
          <SelectItem value="Guntur">Guntur</SelectItem>
          <SelectItem value="Hyderabad">Hyderabad</SelectItem>
          <SelectItem value="Gujarat">Gujarat</SelectItem>
          <SelectItem value="Vadodara">Vadodara</SelectItem>
          <SelectItem value="Kutch">Kutch</SelectItem>
          <SelectItem value="West Bengal">West Bengal</SelectItem>
          <SelectItem value="Hooghly">Hooghly</SelectItem>
          <SelectItem value="Odisha">Odisha</SelectItem>
          <SelectItem value="Sundargarh">Sundargarh (Rourkela)</SelectItem>
        </SelectContent>
      </Select>

      <Select value={severityFilter} onValueChange={onSeverityFilterChange}>
        <SelectTrigger className="border-slate-300 rounded-xl">
          <SelectValue placeholder="All Severities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">"All Severities"</SelectItem>
          <SelectItem value="critical">"Critical"</SelectItem>
          <SelectItem value="moderate">"Moderate"</SelectItem>
          <SelectItem value="low">"Low"</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AlertFilters;
