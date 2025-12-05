import { Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LogFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterRole: string;
  onRoleFilterChange: (value: string) => void;
  filterStatus: string;
  onStatusFilterChange: (value: string) => void;
  filterSeverity: string;
  onSeverityFilterChange: (value: string) => void;
  viewMode: string;
  onViewModeChange: (value: string) => void;
}

const LogFilters = ({
  searchTerm,
  onSearchChange,
  filterRole,
  onRoleFilterChange,
  filterStatus,
  onStatusFilterChange,
  filterSeverity,
  onSeverityFilterChange,
  viewMode,
  onViewModeChange
}: LogFiltersProps) => {
  return (
    <Card className="bg-white/60 backdrop-blur-md border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Filter className="w-5 h-5" />
          Filter & Search Logs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white/50 border-white/20"
            />
          </div>
          
          <Select value={filterRole} onValueChange={onRoleFilterChange}>
            <SelectTrigger className="bg-white/50 border-white/20">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Scientist">Scientist</SelectItem>
              <SelectItem value="Policymaker">Policymaker</SelectItem>
              <SelectItem value="Administrator">Administrator</SelectItem>
              <SelectItem value="Background Job">Background Job</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="bg-white/50 border-white/20">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="running">Running</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterSeverity} onValueChange={onSeverityFilterChange}>
            <SelectTrigger className="bg-white/50 border-white/20">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={viewMode} onValueChange={onViewModeChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/50">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogFilters;
