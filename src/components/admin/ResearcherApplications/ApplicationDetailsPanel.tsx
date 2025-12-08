import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResearcherApplication } from "@/services";
import { Mail, Phone, Building2, Calendar, CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import { format } from "date-fns";

interface ApplicationDetailsPanelProps {
  application: ResearcherApplication | null;
  onAccept: (applicationId: string) => void;
  onReject: (applicationId: string) => void;
}

const ApplicationDetailsPanel = ({ application, onAccept, onReject }: ApplicationDetailsPanelProps) => {
  if (!application) {
    return (
      <Card className="sticky top-6">
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Select an application to view details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending Review", className: "bg-amber-100 text-amber-800", icon: Clock },
      accepted: { label: "Accepted", className: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
      rejected: { label: "Rejected", className: "bg-red-100 text-red-800", icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const isPending = application.status === 'pending';

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Application Details</CardTitle>
          {getStatusBadge(application.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Applicant Information */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Applicant Information</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-600">Full Name</label>
              <p className="text-slate-900 mt-1">{application.full_name}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                Email Address
              </label>
              <p className="text-slate-900 mt-1">{application.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Phone Number
              </label>
              <p className="text-slate-900 mt-1">{application.phone_number}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                Organization
              </label>
              <p className="text-slate-900 mt-1">{application.organization}</p>
            </div>
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label className="text-sm font-medium text-slate-600 mb-2 block">Purpose / Reason for Joining</label>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-700 whitespace-pre-wrap">{application.purpose}</p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Timeline</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">Submitted:</span>
              <span className="text-slate-900 font-medium">
                {format(new Date(application.created_at), 'MMM dd, yyyy hh:mm a')}
              </span>
            </div>
            
            {application.reviewed_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Reviewed:</span>
                <span className="text-slate-900 font-medium">
                  {format(new Date(application.reviewed_at), 'MMM dd, yyyy hh:mm a')}
                </span>
              </div>
            )}
            
            {application.status === 'accepted' && application.invite_sent_at && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Invitation Sent:</span>
                <span className="text-slate-900 font-medium">
                  {format(new Date(application.invite_sent_at), 'MMM dd, yyyy hh:mm a')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Rejection Reason */}
        {application.status === 'rejected' && application.rejection_reason && (
          <div>
            <label className="text-sm font-medium text-red-600 mb-2 block">Rejection Reason</label>
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <p className="text-sm text-red-800">{application.rejection_reason}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isPending && (
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={() => onAccept(application.id)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Accept Application
            </Button>
            <Button
              onClick={() => onReject(application.id)}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>
        )}

        {/* Status Info */}
        {!isPending && (
          <div className={`p-3 rounded-lg border ${
            application.status === 'accepted' 
              ? 'bg-emerald-50 border-emerald-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <p className={`text-sm ${
              application.status === 'accepted' ? 'text-emerald-800' : 'text-red-800'
            }`}>
              {application.status === 'accepted' 
                ? 'This application has been accepted and an invitation email has been sent to the researcher.' 
                : 'This application has been rejected.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationDetailsPanel;
