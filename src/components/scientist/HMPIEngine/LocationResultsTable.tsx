import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SampleData } from './types';

interface LocationResultsTableProps {
  data: SampleData[];
}

export const LocationResultsTable = ({ data }: LocationResultsTableProps) => {
return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-slate-800 text-lg font-semibold">Location Results</CardTitle>
        <p className="text-sm text-slate-500 mt-1">Detailed Breakdown</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-3 text-slate-700 font-semibold">Id</th>
                <th className="text-left p-3 text-slate-700 font-semibold">Location</th>
                <th className="text-left p-3 text-slate-700 font-semibold">As (mg/L)</th>
                <th className="text-left p-3 text-slate-700 font-semibold">Cr (mg/L)</th>
                <th className="text-left p-3 text-slate-700 font-semibold">Pb (mg/L)</th>
                <th className="text-left p-3 text-slate-700 font-semibold">Cd (mg/L)</th>
                <th className="text-left p-3 text-slate-700 font-semibold">HMPI</th>
                <th className="text-left p-3 text-slate-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-slate-600 font-mono">{row.id}</td>
                  <td className="p-3 text-slate-700">{row.location}</td>
                  <td className="p-3 text-slate-700">{row.As}</td>
                  <td className="p-3 text-slate-700">{row.Cr}</td>
                  <td className="p-3 text-slate-700">{row.Pb}</td>
                  <td className="p-3 text-slate-700">{row.Cd}</td>
                  <td className="p-3 text-slate-700 font-bold">{row.hmpi}</td>
                  <td className="p-3">
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold border-0 ${
                        row.status === 'Critical' ? 'bg-red-600 text-white' :
                        row.status === 'High' ? 'bg-orange-600 text-white' :
                        row.status === 'Medium' ? 'bg-amber-500 text-white' : 'bg-yellow-400 text-slate-800'
                      }`}
                    >
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
