import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gauge, Loader2, Save, X, Edit2, Beaker, Calculator, Info } from "lucide-react";
import { standardsService, MetalStandard } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Water Quality Standards</h1>
              <p className="text-sm text-slate-600">Manage metal standards for HPI/MI calculations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-900 font-semibold">About Metal Standards</AlertTitle>
        <AlertDescription className="text-blue-800">
          These standards are based on BIS 10500:2012 and WHO Guidelines. All values are in <strong>ppb (µg/L)</strong>.
          <div className="mt-2 space-y-1">
            <div><strong>Si:</strong> Standard Permissible Limit - Maximum safe concentration for drinking water</div>
            <div><strong>Ii:</strong> Ideal Value - Optimal concentration with no adverse effects</div>
            <div><strong>MAC:</strong> Maximum Allowable Concentration - Critical threshold for MI calculations</div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="metals" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="metals" className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                Heavy Metal Standards
              </TabsTrigger>
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Formula Reference
              </TabsTrigger>
            </TabsList>

            <TabsContent value="metals" className="space-y-4">
              <div className="rounded-lg border bg-white overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      <TableHead className="font-semibold">Symbol</TableHead>
                      <TableHead className="font-semibold">Metal Name</TableHead>
                      <TableHead className="font-semibold">Si (ppb)</TableHead>
                      <TableHead className="font-semibold">Ii (ppb)</TableHead>
                      <TableHead className="font-semibold">MAC (ppb)</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metalStandards.map((standard) => (
                      <TableRow key={standard.id} className="hover:bg-slate-50">
                        <TableCell className="font-mono font-semibold text-blue-700">{standard.symbol}</TableCell>
                        <TableCell className="font-medium">{standard.name}</TableCell>
                        <TableCell>
                          {editingId === standard.id ? (
                            <Input
                              type="number"
                              step="0.001"
                              value={editValues.si}
                              onChange={(e) => setEditValues({ ...editValues, si: e.target.value })}
                              className="w-28"
                            />
                          ) : (
                            <span className="font-mono">{standard.si}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === standard.id ? (
                            <Input
                              type="number"
                              step="0.001"
                              value={editValues.ii}
                              onChange={(e) => setEditValues({ ...editValues, ii: e.target.value })}
                              className="w-28"
                            />
                          ) : (
                            <span className="font-mono">{standard.ii}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === standard.id ? (
                            <Input
                              type="number"
                              step="0.001"
                              value={editValues.mac}
                              onChange={(e) => setEditValues({ ...editValues, mac: e.target.value })}
                              className="w-28"
                            />
                          ) : (
                            <span className="font-mono">{standard.mac}</span>
                          )}
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
                              className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
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

            <TabsContent value="calculator" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    HPI/MI Formula Reference
                  </CardTitle>
                  <CardDescription>
                    Formulas used for Heavy Metal Pollution Index and Metal Index calculations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-blue-50">
                      <div className="font-semibold text-lg mb-2">Heavy Metal Pollution Index (HPI)</div>
                      <div className="bg-white p-3 rounded font-mono text-sm">
                        HPI = Σ(Wi × Qi) / ΣWi
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <div><strong>Wi</strong> = 1/Si (Unit weightage)</div>
                        <div><strong>Qi</strong> = ((Vi - Ii) / (Si - Ii)) × 100 (Sub-index)</div>
                        <div><strong>Vi</strong> = Measured concentration</div>
                        <div><strong>Si</strong> = Standard permissible limit</div>
                        <div><strong>Ii</strong> = Ideal value</div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-green-50">
                      <div className="font-semibold text-lg mb-2">Metal Index (MI)</div>
                      <div className="bg-white p-3 rounded font-mono text-sm">
                        MI = Σ(Vi / MAC)
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <div><strong>Vi</strong> = Measured concentration</div>
                        <div><strong>MAC</strong> = Maximum Allowable Concentration</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="font-semibold mb-3">Current Standards Summary:</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {metalStandards.map((metal) => (
                        <div key={metal.id} className="border rounded-lg p-3 bg-slate-50 hover:bg-slate-100 transition">
                          <div className="font-semibold text-sm mb-2 text-blue-700">
                            {metal.symbol} - {metal.name}
                          </div>
                          <div className="text-xs text-slate-600 space-y-1">
                            <div className="flex justify-between">
                              <span>Si:</span>
                              <span className="font-mono">{metal.si} ppb</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Ii:</span>
                              <span className="font-mono">{metal.ii} ppb</span>
                            </div>
                            <div className="flex justify-between">
                              <span>MAC:</span>
                              <span className="font-mono">{metal.mac} ppb</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Standards;
