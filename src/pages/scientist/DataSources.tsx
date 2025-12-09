import { useState, useEffect, useCallback } from "react";
import { Database, FileText, Clock, CheckCircle, XCircle, RefreshCw, Trash2, Calculator, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { dataSourceService } from "@/services/api";
import type { DataSource, DataSourceStatus } from "@/types";
import { toast } from "@/hooks/use-toast";
import { formatBytes, formatDate } from "@/lib/utils";

const DataSources = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<DataSourceStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<number | null>(null);

  const fetchDataSources = useCallback(async () => {
    try {
      setLoading(true);
      const response = await dataSourceService.list({
        page,
        limit: 10,
        status: statusFilter === "all" ? undefined : statusFilter,
        search: searchQuery || undefined,
        sort_by: 'created_at',
        sort_order: 'desc',
      });

      setDataSources(response.data);
      setTotalPages(response.meta.pagination.total_pages);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to load data sources",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, searchQuery]);

  useEffect(() => {
    fetchDataSources();
  }, [fetchDataSources]);

  const handleReprocess = async (id: number) => {
    try {
      await dataSourceService.reprocess(id);
      toast({
        title: "Reprocessing Started",
        description: "The data source is being reprocessed.",
      });
      fetchDataSources();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to reprocess data source",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this data source?")) return;

    try {
      await dataSourceService.delete(id);
      toast({
        title: "Success",
        description: "Data source deleted successfully",
      });
      fetchDataSources();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete data source",
        variant: "destructive",
      });
    }
  };

  const handleCalculate = async (id: number) => {
    setSelectedSource(id);
    try {
      const result = await dataSourceService.calculateFromSource(id);
      toast({
        title: "Calculation Complete",
        description: `Successfully calculated ${result.successful_calculations} records from ${result.total_records} total.`,
      });
    } catch (error: any) {
      toast({
        title: "Calculation Failed",
        description: error?.message || "Failed to calculate HMPI indices",
        variant: "destructive",
      });
    } finally {
      setSelectedSource(null);
    }
  };

  const getStatusBadge = (status: DataSourceStatus) => {
    const variants: Record<DataSourceStatus, { variant: any; icon: any }> = {
      available: { variant: "default", icon: CheckCircle },
      pending: { variant: "secondary", icon: Clock },
      processing: { variant: "secondary", icon: RefreshCw },
      failed: { variant: "destructive", icon: XCircle },
      archived: { variant: "outline", icon: FileText },
    };

    const { variant, icon: Icon } = variants[status];
    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Data Sources</h1>
              <p className="text-sm text-slate-600">Manage and process uploaded water quality datasets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white border-slate-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by filename or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            {/* Refresh Button */}
            <Button onClick={fetchDataSources} variant="outline" className="w-full md:w-auto">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Uploaded Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-slate-400" />
            </div>
          ) : dataSources.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No data sources found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Filename</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Stations</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataSources.map((source) => (
                      <TableRow key={source.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-800">{source.original_filename}</p>
                            {source.description && (
                              <p className="text-xs text-slate-500 mt-1">{source.description}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(source.status)}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{source.uploader.full_name}</p>
                            <p className="text-xs text-slate-500">{source.uploader.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{formatBytes(source.file_size)}</TableCell>
                        <TableCell>
                          {source.metadata ? source.metadata.total_rows.toLocaleString() : "-"}
                        </TableCell>
                        <TableCell>
                          {source.metadata ? source.metadata.stations.length : "-"}
                        </TableCell>
                        <TableCell className="text-sm">{formatDate(source.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {source.status === "available" && (
                              <Button
                                size="sm"
                                onClick={() => handleCalculate(source.id)}
                                disabled={selectedSource === source.id}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                {selectedSource === source.id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <Calculator className="w-4 h-4 mr-1" />
                                    Calculate
                                  </>
                                )}
                              </Button>
                            )}
                            {source.status === "failed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReprocess(source.id)}
                              >
                                <RefreshCw className="w-4 h-4 mr-1" />
                                Retry
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(source.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-slate-600">
                    Page {page} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
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
    </div>
  );
};

export default DataSources;
