import { Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SecurityComplianceSection = () => {
  return (
    <Card className="bg-white/60 backdrop-blur-md border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Shield className="w-5 h-5" />
          Security & Compliance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white/30 rounded-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Data Integrity</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-xs text-gray-500">Last checked: 2 hours ago</p>
          </div>
          
          <div className="p-4 bg-white/30 rounded-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Backup Status</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-xs text-gray-500">Last backup: 30 min ago</p>
          </div>
          
          <div className="p-4 bg-white/30 rounded-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">GDPR Compliance</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-xs text-gray-500">Status: Aligned</p>
          </div>
          
          <div className="p-4 bg-white/30 rounded-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Audit Trail</span>
              <Button size="sm" variant="outline" className="text-xs bg-white/50">
                Download
              </Button>
            </div>
            <p className="text-xs text-gray-500">Ready for export</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityComplianceSection;
