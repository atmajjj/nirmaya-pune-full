import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SavedFormula } from './types';

interface SavedFormulasProps {
  formulas: SavedFormula[];
}

export const SavedFormulas = ({ formulas }: SavedFormulasProps) => {
return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-slate-800 text-lg font-semibold">"Saved Formulas"</CardTitle>
        <p className="text-sm text-slate-500 mt-1">"Saved Formulas Subtitle"</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {formulas.map((formula) => (
            <div key={formula.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-slate-800">{formula.name}</h4>
                    <Badge variant="secondary" className="text-xs">{formula.category}</Badge>
                  </div>
                  <p className="text-xs text-slate-600">{formula.description}</p>
                </div>
              </div>
              <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-sm mb-2">
                {formula.expression}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">"Last Used": {formula.lastUsed}</span>
                <Button variant="outline" size="sm">"Load"</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
