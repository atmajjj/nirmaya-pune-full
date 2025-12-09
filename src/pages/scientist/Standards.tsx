import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Gauge, Loader2, Save, X, Edit2, AlertCircle } from "lucide-react";
import { standardsService, MetalStandard } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Standards = () => {
  const [metalStandards, setMetalStandards] = useState<MetalStandard[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchStandards();
  }, []);

  const fetchStandards = async () => {
    setLoading(true);
    try {
      const metals = await standardsService.listMetalStandards();
      setMetalStandards(metals);
    } catch (error) {
      console.error('Error fetching standards:', error);
      toast({
        title: "Error",
        description: "Failed to load standards",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditMetal = (standard: MetalStandard) => {
    setEditingId(standard.id);
    setEditValues({
      si: standard.si,
      ii: standard.ii,
      mac: standard.mac,
      description: standard.description,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const handleSaveMetal = async (id: number) => {
    setSaving(true);
    try {
      await standardsService.updateMetalStandard(id, {
        si: parseFloat(editValues.si),
        ii: parseFloat(editValues.ii),
        mac: parseFloat(editValues.mac),
        description: editValues.description,
      });
      
      toast({
        title: "Success",
        description: "Metal standard updated successfully",
      });
      
      await fetchStandards();
      setEditingId(null);
      setEditValues({});
    } catch (error) {
      console.error('Error updating metal standard:', error);
      toast({
        title: "Error",
        description: "Failed to update metal standard",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Water Quality Standards</h1>
              <p className="text-sm text-slate-600">Manage limits and thresholds for water quality calculations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          These standards are used in HPI, HEI, and MI calculations. Changes will affect all future calculations.
        </AlertDescription>
      </Alert>

      {/* Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="metals" className="w-full">

            <TabsContent value="metals" className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Si (ppb)</TableHead>
                      <TableHead>Ii (ppb)</TableHead>
                      <TableHead>MAC (ppb)</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metalStandards.map((standard) => (
                      <TableRow key={standard.id}>
                        <TableCell className="font-medium">{standard.symbol}</TableCell>
                        <TableCell>{standard.name}</TableCell>
                        <TableCell>
                          {editingId === standard.id ? (
                            <Input
                              type="number"
                              step="0.001"
                              value={editValues.si}
                              onChange={(e) => setEditValues({ ...editValues, si: e.target.value })}
                              className="w-24"
                            />
                          ) : (
                            standard.si
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === standard.id ? (
                            <Input
                              type="number"
                              step="0.001"
                              value={editValues.ii}
                              onChange={(e) => setEditValues({ ...editValues, ii: e.target.value })}
                              className="w-24"
                            />
                          ) : (
                            standard.ii
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === standard.id ? (
                            <Input
                              type="number"
                              step="0.001"
                              value={editValues.mac}
                              onChange={(e) => setEditValues({ ...editValues, mac: e.target.value })}
                              className="w-24"
                            />
                          ) : (
                            standard.mac
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === standard.id ? (
                            <Input
                              value={editValues.description}
                              onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                              className="w-48"
                            />
                          ) : (
                            <span className="text-sm text-slate-600">{standard.description}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={standard.is_active ? "default" : "secondary"}>
                            {standard.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {editingId === standard.id ? (
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleSaveMetal(standard.id)}
                                disabled={saving}
                                className="bg-brand hover:bg-brand-secondary"
                              >
                                {saving ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <Save className="w-4 h-4 mr-1" />
                                    Save
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                                disabled={saving}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditMetal(standard)}
                            >
                              <Edit2 className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Standards;
