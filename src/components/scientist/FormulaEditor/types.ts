export interface SavedFormula {
  id: string;
  name: string;
  expression: string;
  description: string;
  lastUsed: string;
  category: string;
}

export interface Variable {
  symbol: string;
  name: string;
  unit: string;
  description: string;
}
