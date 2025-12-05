import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const EditorPanel = () => {
const [formulaName, setFormulaName] = useState('');
  const [formulaExpression, setFormulaExpression] = useState('');

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-slate-800 text-lg font-semibold">"Editor Title"</CardTitle>
        <p className="text-sm text-slate-500 mt-1">"Editor Subtitle"</p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label htmlFor="formula-name" className="text-sm font-medium text-slate-700">"Formula Name"</Label>
          <Input
            id="formula-name"
            placeholder="Formula Name Placeholder"
            value={formulaName}
            onChange={(e) => setFormulaName(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="formula-expression" className="text-sm font-medium text-slate-700">"Formula Expression"</Label>
          <Textarea
            id="formula-expression"
            placeholder="Formula Expression Placeholder"
            value={formulaExpression}
            onChange={(e) => setFormulaExpression(e.target.value)}
            className="mt-1 font-mono text-sm min-h-[120px]"
          />
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300">
            "Test Formula"
          </Button>
          <Button variant="outline" className="flex-1 bg-white/70 border-slate-300 hover:bg-slate-100 text-slate-700">
            "Clear"
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
