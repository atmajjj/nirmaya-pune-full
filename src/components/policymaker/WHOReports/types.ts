export interface ComparisonDataPoint {
  metal: string;
  measured: number;
  whoLimit: number;
  exceedance: number;
}

export interface RecentReport {
  id: number;
  name: string;
  type: string;
  scope: string;
  status: "published" | "draft" | "pending";
  generatedOn: string;
  downloadUrl: string;
}
