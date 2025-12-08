import { useState, useEffect } from "react";
import { invitationService, ApiError } from "@/services";
import { useToast } from "@/hooks/use-toast";
import { Mail, Clock, CheckCircle, XCircle, RefreshCw, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Invitation } from "@/types/admin.types";

const InvitationManagement = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const { toast } = useToast();

  useEffect(() => {
    loadInvitations();
  }, [page, statusFilter]);

  const loadInvitations = async () => {
    try {
      setIsLoading(true);
      const params: any = { page, limit };
      
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      const response = await invitationService.getInvitations(params);
      
      if (response.success && response.data) {
        setInvitations(response.data.invitations);
        setTotal(response.data.total);
      }
    } catch (error) {
      console.error('Failed to load invitations:', error);
      toast({
        title: "Error",
        description: error instanceof ApiError ? error.message : "Failed to load invitations",
        variant: "destructive",
      });
      setInvitations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'expired':
        return <XCircle className="w-4 h-4" />;
      case 'revoked':
        return <Trash2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'pending':
        return "default";
      case 'accepted':
        return "secondary";
      case 'expired':
      case 'revoked':
        return "destructive";
      default:
        return "outline";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'scientist':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'researcher':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'policymaker':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isExpiringSoon = (expiresAt: string) => {
    const expiryTime = new Date(expiresAt).getTime();
    const now = new Date().getTime();
    const hoursRemaining = (expiryTime - now) / (1000 * 60 * 60);
    return hoursRemaining < 6 && hoursRemaining > 0;
  };

  const stats = {
    total: total,
    pending: invitations.filter(i => i.status === 'pending').length,
    accepted: invitations.filter(i => i.status === 'accepted').length,
    expired: invitations.filter(i => i.status === 'expired').length,
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Invitation Management</h1>
              <p className="text-sm text-slate-600">Track and manage user invitations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Invitations</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Accepted</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.accepted}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Expired</CardDescription>
            <CardTitle className="text-3xl text-red-600">{stats.expired}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Invitations Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Invitations</CardTitle>
              <CardDescription>All user invitations and their status</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="icon"
                onClick={loadInvitations}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-slate-400" />
            </div>
          ) : invitations.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No invitations found</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Expires At</TableHead>
                    <TableHead>Accepted At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell className="font-medium">
                        {invitation.first_name} {invitation.last_name}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {invitation.email}
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(invitation.assigned_role)}>
                          {invitation.assigned_role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={getStatusVariant(invitation.status)}
                          className="flex items-center gap-1 w-fit"
                        >
                          {getStatusIcon(invitation.status)}
                          {invitation.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {formatDate(invitation.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-600">
                            {formatDate(invitation.expires_at)}
                          </span>
                          {invitation.status === 'pending' && isExpiringSoon(invitation.expires_at) && (
                            <Badge variant="destructive" className="mt-1 w-fit text-xs">
                              Expiring Soon
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {invitation.accepted_at ? formatDate(invitation.accepted_at) : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <p className="text-sm text-slate-600">
                    Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} invitations
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1 || isLoading}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages || isLoading}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert>
        <Mail className="h-4 w-4" />
        <AlertDescription>
          Invitations expire after 24 hours. Users will receive an email with login credentials and an invitation link to activate their account.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default InvitationManagement;
