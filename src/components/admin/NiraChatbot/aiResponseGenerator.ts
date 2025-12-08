import { Source } from './types';

/**
 * Generates AI response for the NIRA AI Chatbot training interface
 * Helps admins understand the training process and document status
 */
export const generateNiraResponse = (input: string, sources: Source[]): string => {
  const lowerInput = input.toLowerCase();
  const trainedSources = sources.filter(s => s.status === 'trained');
  const processingSources = sources.filter(s => s.status === 'processing');

  if (sources.length === 0) {
    return `📚 **No Training Documents Yet**\n\nTo enhance NIRA AI Chatbot's knowledge base, please upload:\n\n**Recommended Document Types:**\n- 📄 Research papers on groundwater quality\n- 📊 Heavy metal contamination studies\n- 📋 WHO/BIS standard guidelines\n- 🗺️ Regional water quality reports\n- 🔬 Laboratory analysis findings\n\n**Supported Formats:**\nPDF, DOC, DOCX, TXT, CSV, XLSX, JSON\n\n**How it works:**\n1. Upload documents using the panel on the left\n2. NIRA AI Chatbot processes and extracts key information\n3. Knowledge is integrated into the AI model\n4. All platform users benefit from improved responses\n\nStart uploading to make NIRA AI Chatbot smarter!`;
  }

  if (lowerInput.includes('status') || lowerInput.includes('progress')) {
    return `📊 **Training Status Report**\n\n**Documents Overview:**\n- Total Uploaded: ${sources.length}\n- Successfully Trained: ${trainedSources.length}\n- Currently Processing: ${processingSources.length}\n- Pending: ${sources.length - trainedSources.length - processingSources.length}\n\n**Training Progress:** ${Math.round((trainedSources.length / sources.length) * 100)}%\n\n**Recently Trained:**\n${trainedSources.slice(-3).map(s => `✅ ${s.name}`).join('\n') || 'No documents trained yet'}\n\n${processingSources.length > 0 ? `**Currently Processing:**\n${processingSources.map(s => `⏳ ${s.name}`).join('\n')}` : ''}`;
  }

  if (lowerInput.includes('help') || lowerInput.includes('how')) {
    return `🤖 **NIRA AI Chatbot Training Guide**\n\n**Step 1: Upload Documents**\nUse the panel on the left to upload research papers, datasets, or paste findings.\n\n**Step 2: Processing**\nNIRA AI Chatbot automatically:\n- Extracts text and data from documents\n- Identifies key concepts and relationships\n- Indexes information for quick retrieval\n- Validates data quality and relevance\n\n**Step 3: Integration**\nOnce processed, the knowledge is integrated into NIRA AI Chatbot's responses across the platform.\n\n**Best Practices:**\n- Upload peer-reviewed research papers\n- Include regional groundwater studies\n- Add WHO/BIS standards documentation\n- Include recent contamination reports\n\n**Current Status:**\n${sources.length} documents uploaded, ${trainedSources.length} integrated`;
  }

  if (lowerInput.includes('what') && (lowerInput.includes('upload') || lowerInput.includes('document'))) {
    return `📁 **Recommended Training Documents**\n\n**High Priority:**\n- Heavy metal pollution index (HMPI) research papers\n- Groundwater quality assessment studies\n- WHO drinking water guidelines updates\n- BIS (Bureau of Indian Standards) specifications\n\n**Regional Studies:**\n- State-wise groundwater quality reports\n- District-level contamination assessments\n- Industrial zone impact studies\n- Agricultural runoff research\n\n**Technical Documents:**\n- Laboratory testing methodologies\n- Sampling protocols and standards\n- Quality control procedures\n- Analytical method validations\n\n**Data Formats:**\n- Research papers (PDF, DOC)\n- Datasets (CSV, XLSX)\n- Reports (PDF, TXT)\n- Standards (JSON, TXT)`;
  }

  if (lowerInput.includes('test') || lowerInput.includes('verify')) {
    return `✅ **Knowledge Verification**\n\nBased on ${trainedSources.length} integrated documents, NIRA AI Chatbot can now answer questions about:\n\n**Topics Covered:**\n${trainedSources.slice(0, 5).map(s => `• ${s.name}`).join('\n')}\n${trainedSources.length > 5 ? `• ...and ${trainedSources.length - 5} more` : ''}\n\n**Test Questions:**\nTry asking NIRA AI Chatbot (via the chatbot) these questions:\n- "What are safe arsenic levels in drinking water?"\n- "How is HMPI calculated?"\n- "What causes groundwater contamination?"\n\n**Verification Status:** ${trainedSources.length > 0 ? '✅ Ready for testing' : '⚠️ Upload documents first'}`;
  }

  // Default response about uploaded documents
  return `📚 **Training Documents Summary**\n\n**Uploaded Documents:** ${sources.length}\n${sources.map(s => `${s.status === 'trained' ? '✅' : s.status === 'processing' ? '⏳' : '⏸️'} ${s.name} (${s.type})`).join('\n')}\n\n**Knowledge Areas Being Enhanced:**\n- Groundwater quality parameters\n- Heavy metal contamination thresholds\n- Regional pollution patterns\n- Treatment recommendations\n\n**Next Steps:**\n${trainedSources.length < 5 ? '- Upload more research papers for comprehensive coverage\n- Add regional studies for better localization' : '- Knowledge base is well-populated\n- Consider adding recent 2024-2025 studies'}\n\nAsk me about training status, what to upload, or how the process works!`;
};
