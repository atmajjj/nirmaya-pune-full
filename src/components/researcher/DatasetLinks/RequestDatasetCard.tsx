import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileQuestion, Send, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export const RequestDatasetCard = () => {
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    datasetName: "",
    category: "",
    description: "",
    purpose: "",
    urgency: "normal"
  });

  const handleSubmit = () => {
    // Handle form submission
    setRequestSubmitted(true);
    setTimeout(() => {
      setShowRequestDialog(false);
      setRequestSubmitted(false);
      setFormData({
        datasetName: "",
        category: "",
        description: "",
        purpose: "",
        urgency: "normal"
      });
    }, 2000);
  };

  const recentRequests = [
    { id: 1, name: "Arsenic levels in Punjab groundwater", status: "pending", date: "2 days ago" },
    { id: 2, name: "WHO water quality standards 2024", status: "approved", date: "1 week ago" },
    { id: 3, name: "Industrial effluent discharge data", status: "in-review", date: "3 days ago" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-brand bg-brand/10 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'in-review':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
            <AlertCircle className="w-3 h-3" />
            In Review
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="bg-white border border-slate-200 rounded-lg">
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileQuestion className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-slate-900 mb-1">Request Dataset</h3>
              <p className="text-sm text-slate-500 mb-3">
                Can't find what you need? Request specific datasets and our team will help source them for your research.
              </p>
              <Button 
                size="sm" 
                className="bg-purple-600 text-white hover:bg-purple-700 rounded-md text-xs"
                onClick={() => setShowRequestDialog(true)}
              >
                <Send className="w-3 h-3 mr-1.5" />
                Request Dataset
              </Button>
            </div>
          </div>

          {/* Recent Requests Section */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-slate-700 mb-3">Your Recent Requests</h4>
            <div className="space-y-2">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate">{request.name}</p>
                    <p className="text-xs text-slate-400">{request.date}</p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Request Dataset Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="sm:max-w-lg bg-white">
          {requestSubmitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Request Submitted!</h3>
              <p className="text-sm text-slate-500">
                Your dataset request has been submitted. We'll notify you once it's reviewed.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-slate-900">Request a Dataset</DialogTitle>
                <p className="text-sm text-slate-500">
                  Fill in the details below to request a specific dataset for your research.
                </p>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Dataset Name</label>
                  <Input
                    placeholder="e.g., Heavy metal concentration in Ganga basin"
                    value={formData.datasetName}
                    onChange={(e) => setFormData({ ...formData, datasetName: e.target.value })}
                    className="border-slate-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Category</label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="border-slate-300">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="groundwater">Groundwater Quality</SelectItem>
                      <SelectItem value="surface-water">Surface Water</SelectItem>
                      <SelectItem value="contamination">Contamination Studies</SelectItem>
                      <SelectItem value="geological">Geological Data</SelectItem>
                      <SelectItem value="health">Health Impact Data</SelectItem>
                      <SelectItem value="industrial">Industrial Discharge</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Description</label>
                  <Textarea
                    placeholder="Describe the dataset you need, including specific parameters, regions, or time periods..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border-slate-300 min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Research Purpose</label>
                  <Textarea
                    placeholder="Briefly explain how this dataset will be used in your research..."
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="border-slate-300 min-h-[60px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Urgency Level</label>
                  <Select 
                    value={formData.urgency} 
                    onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                  >
                    <SelectTrigger className="border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Within a month</SelectItem>
                      <SelectItem value="normal">Normal - Within 2 weeks</SelectItem>
                      <SelectItem value="high">High - Within a week</SelectItem>
                      <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-purple-600 text-white hover:bg-purple-700"
                  onClick={handleSubmit}
                  disabled={!formData.datasetName || !formData.category || !formData.description}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
