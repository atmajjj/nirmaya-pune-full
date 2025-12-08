import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResearcherApplication } from "@/services";
import { Clock, Mail, Building2, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ApplicationsTableProps {
  applications: ResearcherApplication[];
  statusFilter: string;
  onStatusFilterChange: (status: "all" | "pending" | "accepted" | "rejected") => void;
  onApplicationSelect: (application: ResearcherApplication) => void;
  selectedApplication: ResearcherApplication | null;
  isLoading: boolean;
}

const ApplicationsTable = ({
  applications,
  onApplicationSelect,
  selectedApplication,
  isLoading,
}: ApplicationsTableProps) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", className: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
      accepted: { label: "Accepted", className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" },
      rejected: { label: "Rejected", className: "bg-red-100 text-red-800 hover:bg-red-100" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A3D62]"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-slate-500">No applications found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications ({applications.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {applications.map((application) => (
            <div
              key={application.id}
              onClick={() => onApplicationSelect(application)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                selectedApplication?.id === application.id
                  ? "border-[#0A3D62] bg-blue-50"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{application.full_name}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                    <Mail className="w-3 h-3" />
                    {application.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                    <Building2 className="w-3 h-3" />
                    {application.organization}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(application.status)}
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 line-clamp-2 mt-2">
                {application.purpose}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationsTable;
