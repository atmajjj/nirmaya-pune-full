import { Upload, Download, BarChart3, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  selectedReportsCount: number;
}

const QuickActions = ({ selectedReportsCount }: QuickActionsProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
          <Upload className="w-4 h-4 mr-2" />
          Import Report
        </Button>
        <Button className="w-full justify-start bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
          <Download className="w-4 h-4 mr-2" />
          Export Summary PDF
        </Button>
        <Button className="w-full justify-start bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200">
          <BarChart3 className="w-4 h-4 mr-2" />
          Generate New Summary
        </Button>
        <Button className="w-full justify-start bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200">
          <Settings className="w-4 h-4 mr-2" />
          Report Settings
        </Button>
        
        {selectedReportsCount > 0 && (
          <div className="pt-3 border-t border-slate-200">
            <p className="text-sm font-medium text-slate-700 mb-2">
              {selectedReportsCount} reports selected
            </p>
            <div className="space-y-2">
              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                Bulk Publish
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Bulk Archive
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
