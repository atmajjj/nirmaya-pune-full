import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gauge, Loader2, Save, X, Edit2, Beaker, Calculator, Info, Droplet } from "lucide-react";
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
        <AlertTitle className="text-blue-900 font-semibold">Understanding Water Quality Standards</AlertTitle>
        <AlertDescription className="text-blue-800">
          This page displays all standards used for water quality calculations (BIS 10500:2012 & WHO Guidelines).
          <div className="mt-3">
            <div className="font-semibold mb-1">Heavy Metal Standards (HPI/MI):</div>
            <div className="ml-4 space-y-1 text-sm">
              <div><strong>Si:</strong> Standard Permissible Limit (ppb) - Maximum safe concentration</div>
              <div><strong>Ii:</strong> Ideal Value (ppb) - Optimal concentration with no adverse effects</div>
              <div><strong>MAC:</strong> Maximum Allowable Concentration (ppb) - Critical threshold for MI</div>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-semibold mb-1">WQI Standards (Water Quality Index):</div>
            <div className="ml-4 space-y-1 text-sm">
              <div><strong>Sn:</strong> Standard Permissible Limit - Maximum safe concentration for drinking water</div>
              <div><strong>Vo:</strong> Ideal/Optimal Value - Baseline for quality rating calculation</div>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="metals" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="metals" className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                Heavy Metal Standards
              </TabsTrigger>
              <TabsTrigger value="wqi" className="flex items-center gap-2">
                <Droplet className="h-4 w-4" />
                WQI Standards
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="font-semibold text-sm mb-3 text-blue-900">BIS 10500:2012 & WHO Guidelines - Heavy Metal Limits (Si & Ii Values)</div>
                <div className="bg-white rounded-lg overflow-hidden border border-blue-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-100 hover:bg-slate-100">
                        <TableHead className="font-semibold text-xs">Symbol</TableHead>
                        <TableHead className="font-semibold text-xs">Metal Name</TableHead>
                        <TableHead className="font-semibold text-xs">Si (ppb)</TableHead>
                        <TableHead className="font-semibold text-xs">Ii (ppb)</TableHead>
                        <TableHead className="font-semibold text-xs">MAC (ppb)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">As</TableCell><TableCell className="text-xs">Arsenic</TableCell><TableCell className="font-mono text-xs">50</TableCell><TableCell className="font-mono text-xs">10</TableCell><TableCell className="font-mono text-xs">50</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Cu</TableCell><TableCell className="text-xs">Copper</TableCell><TableCell className="font-mono text-xs">1500</TableCell><TableCell className="font-mono text-xs">50</TableCell><TableCell className="font-mono text-xs">1500</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Zn</TableCell><TableCell className="text-xs">Zinc</TableCell><TableCell className="font-mono text-xs">15000</TableCell><TableCell className="font-mono text-xs">5000</TableCell><TableCell className="font-mono text-xs">15000</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Hg</TableCell><TableCell className="text-xs">Mercury</TableCell><TableCell className="font-mono text-xs">2</TableCell><TableCell className="font-mono text-xs">1</TableCell><TableCell className="font-mono text-xs">1</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Cd</TableCell><TableCell className="text-xs">Cadmium</TableCell><TableCell className="font-mono text-xs">10</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">3</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Ni</TableCell><TableCell className="text-xs">Nickel</TableCell><TableCell className="font-mono text-xs">70</TableCell><TableCell className="font-mono text-xs">20</TableCell><TableCell className="font-mono text-xs">20</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Pb</TableCell><TableCell className="text-xs">Lead</TableCell><TableCell className="font-mono text-xs">50</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">10</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Cr</TableCell><TableCell className="text-xs">Chromium</TableCell><TableCell className="font-mono text-xs">50</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">50</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Fe</TableCell><TableCell className="text-xs">Iron</TableCell><TableCell className="font-mono text-xs">1000</TableCell><TableCell className="font-mono text-xs">300</TableCell><TableCell className="font-mono text-xs">300</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Mn</TableCell><TableCell className="text-xs">Manganese</TableCell><TableCell className="font-mono text-xs">300</TableCell><TableCell className="font-mono text-xs">100</TableCell><TableCell className="font-mono text-xs">100</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Al</TableCell><TableCell className="text-xs">Aluminum</TableCell><TableCell className="font-mono text-xs">200</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">200</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Ba</TableCell><TableCell className="text-xs">Barium</TableCell><TableCell className="font-mono text-xs">700</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">700</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Se</TableCell><TableCell className="text-xs">Selenium</TableCell><TableCell className="font-mono text-xs">10</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">10</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Ag</TableCell><TableCell className="text-xs">Silver</TableCell><TableCell className="font-mono text-xs">100</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">100</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Mo</TableCell><TableCell className="text-xs">Molybdenum</TableCell><TableCell className="font-mono text-xs">70</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">70</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Sb</TableCell><TableCell className="text-xs">Antimony</TableCell><TableCell className="font-mono text-xs">20</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">20</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">Co</TableCell><TableCell className="text-xs">Cobalt</TableCell><TableCell className="font-mono text-xs">50</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">50</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">V</TableCell><TableCell className="text-xs">Vanadium</TableCell><TableCell className="font-mono text-xs">100</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">100</TableCell></TableRow>
                      <TableRow className="hover:bg-slate-50"><TableCell className="font-mono text-xs">U</TableCell><TableCell className="text-xs">Uranium</TableCell><TableCell className="font-mono text-xs">30</TableCell><TableCell className="font-mono text-xs">0</TableCell><TableCell className="font-mono text-xs">30</TableCell></TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-3 text-xs text-blue-700">
                  <strong>Note:</strong> All values in ppb (parts per billion) = µg/L (micrograms per liter). Si = Standard Permissible Limit, Ii = Ideal Value, MAC = Maximum Allowable Concentration for MI calculations.
                </div>
              </div>
            </TabsContent>

            <TabsContent value="wqi" className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900 font-semibold">About WQI Standards</AlertTitle>
                <AlertDescription className="text-blue-800">
                  These standards are based on BIS 10500:2012 for Water Quality Index (WQI) calculations.
                  <div className="mt-2 space-y-1">
                    <div><strong>Sn:</strong> Standard Permissible Limit - Maximum safe concentration for drinking water</div>
                    <div><strong>Vo:</strong> Ideal/Optimal Value - Baseline value for quality rating calculation</div>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="rounded-lg border bg-white overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      <TableHead className="font-semibold">Symbol</TableHead>
                      <TableHead className="font-semibold">Parameter Name</TableHead>
                      <TableHead className="font-semibold">Sn (Standard Limit)</TableHead>
                      <TableHead className="font-semibold">Vo (Ideal Value)</TableHead>
                      <TableHead className="font-semibold">Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">pH</TableCell>
                      <TableCell className="font-medium">pH</TableCell>
                      <TableCell><span className="font-mono">8.5</span></TableCell>
                      <TableCell><span className="font-mono">7.0</span></TableCell>
                      <TableCell className="text-slate-600">unitless</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">TDS</TableCell>
                      <TableCell className="font-medium">Total Dissolved Solids</TableCell>
                      <TableCell><span className="font-mono">500</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">mg/L</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">TH</TableCell>
                      <TableCell className="font-medium">Total Hardness</TableCell>
                      <TableCell><span className="font-mono">300</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">mg/L</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">Ca</TableCell>
                      <TableCell className="font-medium">Calcium</TableCell>
                      <TableCell><span className="font-mono">75</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">mg/L</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">Mg</TableCell>
                      <TableCell className="font-medium">Magnesium</TableCell>
                      <TableCell><span className="font-mono">30</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">mg/L</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">Cl</TableCell>
                      <TableCell className="font-medium">Chloride</TableCell>
                      <TableCell><span className="font-mono">250</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">mg/L</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">NO₃</TableCell>
                      <TableCell className="font-medium">Nitrate</TableCell>
                      <TableCell><span className="font-mono">45</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">mg/L</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">F</TableCell>
                      <TableCell className="font-medium">Fluoride</TableCell>
                      <TableCell><span className="font-mono">1.0</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">mg/L</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">SO₄</TableCell>
                      <TableCell className="font-medium">Sulfate</TableCell>
                      <TableCell><span className="font-mono">200</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">mg/L</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">Turb</TableCell>
                      <TableCell className="font-medium">Turbidity</TableCell>
                      <TableCell><span className="font-mono">5</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">NTU</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">AK</TableCell>
                      <TableCell className="font-medium">Alkalinity</TableCell>
                      <TableCell><span className="font-mono">300</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">mg/L as CaCO₃</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">Fe</TableCell>
                      <TableCell className="font-medium">Iron</TableCell>
                      <TableCell><span className="font-mono">0.3</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">mg/L</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50">
                      <TableCell className="font-mono font-semibold text-blue-700">EC</TableCell>
                      <TableCell className="font-medium">Electrical Conductivity</TableCell>
                      <TableCell><span className="font-mono">300</span></TableCell>
                      <TableCell><span className="font-mono">0</span></TableCell>
                      <TableCell className="text-slate-600">µS/cm</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="font-semibold text-sm mb-2 text-blue-900">WQI Formula:</div>
                <div className="bg-white p-3 rounded font-mono text-sm mb-3">
                  WQI = Σ(Wi × Qi) / ΣWi
                </div>
                <div className="text-sm space-y-1 text-blue-800">
                  <div><strong>Wi</strong> = ki / Σ(ki), where ki = K / Sn</div>
                  <div><strong>Qi</strong> = ((Vi - Vo) / (Sn - Vo)) × 100 (Quality rating)</div>
                  <div><strong>Vi</strong> = Measured value of parameter</div>
                  <div><strong>Vo</strong> = Ideal value</div>
                  <div><strong>Sn</strong> = Standard permissible limit</div>
                  <div><strong>K</strong> = Constant (typically 1)</div>
                </div>
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
