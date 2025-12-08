import { APIManagementHeader } from "@/components/researcher/APIManagement/APIManagementHeader";
import { APIServiceCards } from "@/components/researcher/APIManagement/APIServiceCards";
import { publicAPIs } from "@/components/researcher/APIManagement/apiData";

const APIManagement = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <APIManagementHeader />

      <APIServiceCards apis={publicAPIs} copyToClipboard={copyToClipboard} />
    </div>
  );
};

export default APIManagement;
