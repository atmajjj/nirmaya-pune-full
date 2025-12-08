import { useState } from "react";
import { DatasetLinksHeader } from "@/components/researcher/DatasetLinks/DatasetLinksHeader";
import { DatasetCards } from "@/components/researcher/DatasetLinks/DatasetCards";
import { datasets } from "@/components/researcher/DatasetLinks/datasetsData";

const DatasetLinks = () => {
  const exportToCSV = () => {
    const headers = ["ID", "Title", "Description", "Type", "Source", "Size", "Format", "Updated", "Available", "Category", "URL"];
    const csvContent = [
      headers.join(","),
      ...datasets.map(dataset => [
        dataset.id,
        `"${dataset.title}"`,
        `"${dataset.description}"`,
        dataset.type,
        dataset.source,
        dataset.size,
        `"${dataset.format.join("; ")}"`,
        dataset.updated,
        dataset.available,
        dataset.category,
        dataset.url || ""
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "datasets.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <DatasetLinksHeader onExport={exportToCSV} />
        
        {/* Dataset Cards */}
        <DatasetCards datasets={datasets} />
      </div>
  );
};

export default DatasetLinks;
