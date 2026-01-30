import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calculator, FlaskConical, Droplet, Save, RotateCcw, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Formula {
  id: string;
  name: string;
  type: 'HPI' | 'MI' | 'WQI';
  formula: string;
  description: string;
  parameters: string[];
  isDefault: boolean;
  isActive: boolean;
}

const defaultFormulas: Formula[] = [
  {
    id: 'hpi-default',
    name: 'Heavy Metal Pollution Index (HPI)',
    type: 'HPI',
    formula: 'HPI = Σ(Wi × Qi) / Σ(Wi)',
    description: 'Where Wi = Si / Ii (unit weightage), Qi = [(Ci - Ii) / (Si - Ii)] × 100 (sub-index)',
    parameters: ['Wi (Unit Weightage)', 'Qi (Sub-Index)', 'Si (Standard Value)', 'Ii (Ideal Value)', 'Ci (Concentration)'],
    isDefault: true,
    isActive: true,
  },
  {
    id: 'mi-default',
    name: 'Metal Index (MI)',
    type: 'MI',
    formula: 'MI = Σ(Ci / MACi) / n',
    description: 'Where Ci is the concentration of metal i, MACi is the Maximum Allowable Concentration, n is number of metals',
    parameters: ['Ci (Metal Concentration)', 'MACi (Maximum Allowable Concentration)', 'n (Number of Metals)'],
    isDefault: true,
    isActive: true,
  },
  {
    id: 'wqi-default',
    name: 'Water Quality Index (WQI)',
    type: 'WQI',
    formula: 'WQI = Σ(Wi × Qi) / Σ(Wi)',
    description: 'Where Wi = ki / Σ(ki), ki = K / Si, Qi = [(Vi - Vo) / (Si - Vo)] × 100',
    parameters: ['Wi (Relative Weight)', 'Qi (Quality Rating)', 'Vi (Value)', 'Vo (Ideal Value)', 'Si (Standard Value)', 'K (Constant)'],
    isDefault: true,
    isActive: true,
  },
];

export default function FormulaEditor() {
  const [formulas, setFormulas] = useState<Formula[]>(defaultFormulas);
  const [activeTab, setActiveTab] = useState<'HPI' | 'MI' | 'WQI'>('HPI');
  const [editingFormula, setEditingFormula] = useState<Formula | null>(null);
  const [showFormula, setShowFormula] = useState<{ [key: string]: boolean }>({
    'hpi-default': true,
    'mi-default': true,
    'wqi-default': true,
  });
  const { toast } = useToast();

  const handleEditFormula = (formula: Formula) => {
    setEditingFormula({ ...formula });
  };

  const handleSaveFormula = () => {
    if (!editingFormula) return;

    setFormulas(formulas.map(f => 
      f.id === editingFormula.id ? editingFormula : f
    ));

    toast({
      title: "Formula Updated",
      description: `${editingFormula.name} has been updated successfully.`,
    });

    setEditingFormula(null);
  };

  const handleResetFormula = (id: string) => {
    const defaultFormula = defaultFormulas.find(f => f.id === id);
    if (!defaultFormula) return;

    setFormulas(formulas.map(f => 
      f.id === id ? { ...defaultFormula } : f
    ));

    toast({
      title: "Formula Reset",
      description: "Formula has been reset to default values.",
    });
  };

  const toggleFormulaVisibility = (id: string) => {
    setShowFormula(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getFormulaIcon = (type: string) => {
    switch (type) {
      case 'HPI':
        return <FlaskConical className="w-5 h-5" />;
      case 'MI':
        return <Calculator className="w-5 h-5" />;
      case 'WQI':
        return <Droplet className="w-5 h-5" />;
      default:
        return <Calculator className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'HPI':
        return 'bg-orange-500';
      case 'MI':
        return 'bg-purple-500';
      case 'WQI':
        return 'bg-blue-500';
      default:
        return 'bg-slate-500';
    }
  };

  const currentFormulas = formulas.filter(f => f.type === activeTab);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Formula Editor</h1>
          <p className="text-slate-600 mt-1">
            View and customize calculation formulas for water quality indices
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          <AlertCircle className="w-3 h-3 mr-1" />
          {formulas.filter(f => !f.isDefault).length} Custom Formulas
        </Badge>
      </div>

      {/* Main Content */}
      <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">Index Formulas</CardTitle>
          <CardDescription>
            View current calculation formulas and customize them for your analysis needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="HPI" className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4" />
                HPI
              </TabsTrigger>
              <TabsTrigger value="MI" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                MI
              </TabsTrigger>
              <TabsTrigger value="WQI" className="flex items-center gap-2">
                <Droplet className="w-4 h-4" />
                WQI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="HPI" className="space-y-4">
              {currentFormulas.map((formula) => (
                <FormulaCard
                  key={formula.id}
                  formula={formula}
                  showFormula={showFormula[formula.id]}
                  onToggleVisibility={() => toggleFormulaVisibility(formula.id)}
                  onEdit={() => handleEditFormula(formula)}
                  onReset={() => handleResetFormula(formula.id)}
                  getIcon={getFormulaIcon}
                  getColor={getTypeColor}
                />
              ))}
            </TabsContent>

            <TabsContent value="MI" className="space-y-4">
              {currentFormulas.map((formula) => (
                <FormulaCard
                  key={formula.id}
                  formula={formula}
                  showFormula={showFormula[formula.id]}
                  onToggleVisibility={() => toggleFormulaVisibility(formula.id)}
                  onEdit={() => handleEditFormula(formula)}
                  onReset={() => handleResetFormula(formula.id)}
                  getIcon={getFormulaIcon}
                  getColor={getTypeColor}
                />
              ))}
            </TabsContent>

            <TabsContent value="WQI" className="space-y-4">
              {currentFormulas.map((formula) => (
                <FormulaCard
                  key={formula.id}
                  formula={formula}
                  showFormula={showFormula[formula.id]}
                  onToggleVisibility={() => toggleFormulaVisibility(formula.id)}
                  onEdit={() => handleEditFormula(formula)}
                  onReset={() => handleResetFormula(formula.id)}
                  getIcon={getFormulaIcon}
                  getColor={getTypeColor}
                />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Formula Modal/Panel */}
      {editingFormula && (
        <Card className="rounded-xl border border-blue-200 bg-blue-50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              {getFormulaIcon(editingFormula.type)}
              Edit Formula: {editingFormula.name}
            </CardTitle>
            <CardDescription>
              Customize the formula and its parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="formula-name" className="text-sm font-semibold">
                Formula Name
              </Label>
              <Input
                id="formula-name"
                value={editingFormula.name}
                onChange={(e) =>
                  setEditingFormula({ ...editingFormula, name: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="formula-equation" className="text-sm font-semibold">
                Formula Equation
              </Label>
              <Input
                id="formula-equation"
                value={editingFormula.formula}
                onChange={(e) =>
                  setEditingFormula({ ...editingFormula, formula: e.target.value })
                }
                className="mt-1 font-mono"
                placeholder="e.g., HPI = Σ(Wi × Qi) / Σ(Wi)"
              />
            </div>

            <div>
              <Label htmlFor="formula-description" className="text-sm font-semibold">
                Description
              </Label>
              <Textarea
                id="formula-description"
                value={editingFormula.description}
                onChange={(e) =>
                  setEditingFormula({ ...editingFormula, description: e.target.value })
                }
                className="mt-1"
                rows={3}
                placeholder="Describe the formula and its components..."
              />
            </div>

            <div>
              <Label htmlFor="formula-parameters" className="text-sm font-semibold">
                Parameters (comma-separated)
              </Label>
              <Input
                id="formula-parameters"
                value={editingFormula.parameters.join(', ')}
                onChange={(e) =>
                  setEditingFormula({
                    ...editingFormula,
                    parameters: e.target.value.split(',').map(p => p.trim()).filter(Boolean),
                  })
                }
                className="mt-1"
                placeholder="e.g., Wi, Qi, Si, Ii, Ci"
              />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <Button onClick={handleSaveFormula} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditingFormula(null)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface FormulaCardProps {
  formula: Formula;
  showFormula: boolean;
  onToggleVisibility: () => void;
  onEdit: () => void;
  onReset: () => void;
  getIcon: (type: string) => JSX.Element;
  getColor: (type: string) => string;
}

function FormulaCard({
  formula,
  showFormula,
  onToggleVisibility,
  onEdit,
  onReset,
  getIcon,
  getColor,
}: FormulaCardProps) {
  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getColor(formula.type)} text-white`}>
              {getIcon(formula.type)}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-800">
                {formula.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={formula.isDefault ? "secondary" : "default"} className="text-xs">
                  {formula.isDefault ? 'Default' : 'Custom'}
                </Badge>
                {formula.isActive && (
                  <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                    Active
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleVisibility}
          >
            {showFormula ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {showFormula && (
        <CardContent className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p className="text-sm font-semibold text-slate-700 mb-2">Formula:</p>
            <p className="font-mono text-base text-slate-900">{formula.formula}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Description:</p>
            <p className="text-sm text-slate-600">{formula.description}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Parameters:</p>
            <div className="flex flex-wrap gap-2">
              {formula.parameters.map((param, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {param}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t">
            <Button
              size="sm"
              variant="outline"
              onClick={onEdit}
              className="flex items-center gap-2"
            >
              <Calculator className="w-3 h-3" />
              Edit Formula
            </Button>
            {!formula.isDefault && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onReset}
                className="flex items-center gap-2 text-slate-600"
              >
                <RotateCcw className="w-3 h-3" />
                Reset to Default
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
