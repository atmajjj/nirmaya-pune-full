import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { APIEndpoint } from './types';

interface APIEndpointsProps {
  endpoints: APIEndpoint[];
}

const APIEndpoints = ({ endpoints }: APIEndpointsProps) => {
  const getPerformanceColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "moderate": return "text-yellow-600";
      case "poor": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">API Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead>Avg Response</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoints.map((endpoint) => (
                <TableRow key={endpoint.endpoint}>
                  <TableCell className="font-mono text-sm">{endpoint.endpoint}</TableCell>
                  <TableCell>{endpoint.avgResponse}ms</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "capitalize",
                      getPerformanceColor(endpoint.status)
                    )}>
                      {endpoint.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{endpoint.requests.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIEndpoints;
