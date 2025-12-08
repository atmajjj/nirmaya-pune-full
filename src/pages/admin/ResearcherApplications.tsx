import { useState, useEffect } from "react";
import { researcherApplicationService, ResearcherApplication, ApiError } from "@/services";
import { useToast } from "@/hooks/use-toast";

// Import components
import ApplicationsHeader from "@/components/admin/ResearcherApplications/ApplicationsHeader";
import ApplicationsStats from "@/components/admin/ResearcherApplications/ApplicationsStats";
import ApplicationsTable from "@/components/admin/ResearcherApplications/ApplicationsTable";
import ApplicationDetailsPanel from "@/components/admin/ResearcherApplications/ApplicationDetailsPanel";
import RejectDialog from "@/components/admin/ResearcherApplications/RejectDialog";

const ResearcherApplications = () => {
  const [applications, setApplications] = useState<ResearcherApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<ResearcherApplication | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [applicationToReject, setApplicationToReject] = useState<string | null>(null);
  const { toast } = useToast();

  // Load applications from API
  useEffect(() => {
    loadApplications();
  }, [statusFilter]);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const params = statusFilter !== "all" ? { status: statusFilter } : undefined;
      const response = await researcherApplicationService.getApplications(params);
      
      if (response.success) {
        setApplications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error loading applications:", error);
      toast({
        title: "Error",
        description: error instanceof ApiError ? error.message : "Failed to load applications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.organization.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Calculate stats
  const applicationStats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  // Handle accept application
  const handleAcceptApplication = async (applicationId: string) => {
    try {
      const response = await researcherApplicationService.acceptApplication(applicationId);
      
      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
        });
        
        // Reload applications
        await loadApplications();
        
        // Clear selection if it was the accepted application
        if (selectedApplication?.id === applicationId) {
          setSelectedApplication(null);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error accepting application:", error);
      toast({
        title: "Error",
        description: error instanceof ApiError ? error.message : "Failed to accept application",
        variant: "destructive",
      });
    }
  };

  // Handle reject application
  const handleRejectClick = (applicationId: string) => {
    setApplicationToReject(applicationId);
    setShowRejectDialog(true);
  };

  const handleRejectConfirm = async (rejectionReason?: string) => {
    if (!applicationToReject) return;

    try {
      const response = await researcherApplicationService.rejectApplication(
        applicationToReject,
        rejectionReason
      );
      
      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
        });
        
        // Reload applications
        await loadApplications();
        
        // Clear selection if it was the rejected application
        if (selectedApplication?.id === applicationToReject) {
          setSelectedApplication(null);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast({
        title: "Error",
        description: error instanceof ApiError ? error.message : "Failed to reject application",
        variant: "destructive",
      });
    } finally {
      setShowRejectDialog(false);
      setApplicationToReject(null);
    }
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      {/* Header Section */}
      <ApplicationsHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Summary Cards */}
        <ApplicationsStats
          stats={applicationStats}
          onFilterChange={setStatusFilter}
          currentFilter={statusFilter}
        />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Applications List Section (Left 60%) */}
          <div className="lg:col-span-3">
            <ApplicationsTable
              applications={filteredApplications}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              onApplicationSelect={setSelectedApplication}
              selectedApplication={selectedApplication}
              isLoading={isLoading}
            />
          </div>

          {/* Application Details Panel (Right 40%) */}
          <div className="lg:col-span-2">
            <ApplicationDetailsPanel
              application={selectedApplication}
              onAccept={handleAcceptApplication}
              onReject={handleRejectClick}
            />
          </div>
        </div>

        {/* Reject Confirmation Dialog */}
        <RejectDialog
          open={showRejectDialog}
          onOpenChange={setShowRejectDialog}
          onConfirm={handleRejectConfirm}
        />
      </div>
  );
};

export default ResearcherApplications;
