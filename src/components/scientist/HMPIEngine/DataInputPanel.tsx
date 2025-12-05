import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Database, Upload, PenTool } from "lucide-react";

export const DataInputPanel = () => {
const [formData, setFormData] = useState({ location: '', As: '', Cr: '', Pb: '', Cd: '' });

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-slate-800 text-lg font-semibold">"Data Input"</CardTitle>
        <p className="text-sm text-slate-500 mt-1">"Select Input Method"</p>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="database" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              "Database"
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              "Upload"
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              "Manual"
            </TabsTrigger>
          </TabsList>

          <TabsContent value="database" className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-sm text-slate-600 mb-3">"Select Database"</p>
              <select className="w-full p-2 border border-slate-300 rounded-lg text-sm">
                <option>"Cgwb Database"</option>
                <option>"Regional Database"</option>
                <option>"Research Archive"</option>
              </select>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg text-center">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-sm text-slate-600 mb-2">"Drop File"</p>
              <Button variant="outline" size="sm">"Choose File"</Button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="location" className="text-sm font-medium text-slate-700">"Sample Location"</Label>
                <Input
                  id="location"
                  placeholder="Sample Location Placeholder"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="As" className="text-sm font-medium text-slate-700">"Arsenic Label"</Label>
                <Input
                  id="As"
                  type="number"
                  placeholder="0.00"
                  value={formData.As}
                  onChange={(e) => setFormData({ ...formData, As: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="Cr" className="text-sm font-medium text-slate-700">"Chromium Label"</Label>
                <Input
                  id="Cr"
                  type="number"
                  placeholder="0.00"
                  value={formData.Cr}
                  onChange={(e) => setFormData({ ...formData, Cr: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="Pb" className="text-sm font-medium text-slate-700">"Lead Label"</Label>
                <Input
                  id="Pb"
                  type="number"
                  placeholder="0.00"
                  value={formData.Pb}
                  onChange={(e) => setFormData({ ...formData, Pb: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="Cd" className="text-sm font-medium text-slate-700">"Cadmium Label"</Label>
                <Input
                  id="Cd"
                  type="number"
                  placeholder="0.00"
                  value={formData.Cd}
                  onChange={(e) => setFormData({ ...formData, Cd: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300">
              "Add Sample"
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
