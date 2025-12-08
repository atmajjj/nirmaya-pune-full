// NIRA AI Chatbot Response Generator - Handles AI-like responses for groundwater queries

export const generateNIRAResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('hmpi') || lowerInput.includes('index')) {
    return "🔍 **HMPI Analysis**: The Hydrogeological Multi-Parameter Index ranges from 0-100. Current critical zones:\n\n🚨 **Tamil Nadu**: Coimbatore (84.2) - Textile industry impact\n📊 **Maharashtra**: Aurangabad (79.6) - Chemical cluster\n⚠️ **Gujarat**: Vadodara (73.8) - Industrial corridor\n\nWould you like detailed contamination breakdown for any specific region?";
  }
  
  if (lowerInput.includes('tamil nadu') || lowerInput.includes('coimbatore')) {
    return "🎯 **Tamil Nadu Priority Alert**:\n\n🏭 **Coimbatore Crisis**: HMPI 84.2 (National Highest)\n- 12 textile units emergency shutdown\n- Chromium & Azo dyes detected\n- 3.5M population affected\n\n📋 **Actions Taken**:\n✅ Emergency response team deployed\n✅ Groundwater testing intensified\n⏳ Treatment plant upgrades ongoing\n\nNeed specific data on water quality parameters?";
  }
  
  if (lowerInput.includes('policy') || lowerInput.includes('recommendation')) {
    return "📋 **NIRA AI Chatbot Policy Recommendations**:\n\n🎯 **Immediate Actions**:\n1. Implement Zero Liquid Discharge for industries\n2. Mandatory HMPI monitoring every 48 hours\n3. Cross-state coordination protocol\n\n🔬 **Long-term Strategy**:\n- AI-powered early warning systems\n- Industrial cluster risk assessment\n- Community awareness programs\n\nWhich policy area needs detailed analysis?";
  }
  
  if (lowerInput.includes('contamination') || lowerInput.includes('pollution')) {
    return "🧪 **Contamination Analysis**:\n\n**Primary Sources**:\n🏭 Industrial (45%) - Textile, Chemical, Pharma\n🌾 Agricultural (28%) - Pesticide runoff\n⛏️ Mining (18%) - Heavy metals\n🏘️ Urban (9%) - Municipal waste\n\n**Critical Contaminants**:\n- Heavy metals (Chromium, Lead)\n- Organic compounds (Azo dyes)\n- Salinity intrusion (Coastal areas)\n\nNeed contamination data for specific location?";
  }
  
  if (lowerInput.includes('alert') || lowerInput.includes('warning')) {
    return "🚨 **Active Alerts (Live)**:\n\n🔴 **Critical (28 alerts)**:\n- Tamil Nadu: 4 districts\n- Maharashtra: 2 industrial zones\n- Gujarat: Chemical corridor\n\n🟠 **Moderate (61 alerts)**:\n- Multi-state coordination required\n- Agricultural runoff patterns\n\n📊 **AI Confidence**: 96% accuracy\n\nWant real-time updates for specific region?";
  }
  
  if (lowerInput.includes('data') || lowerInput.includes('statistics')) {
    return "📊 **NIRA AI Chatbot Data Insights**:\n\n🔢 **Current Statistics**:\n- Total Risk Zones: 156\n- Active Monitoring Points: 2,847\n- Population Affected: 54.2M+\n- Response Time: 3.8 hours avg\n\n🎯 **Tamil Nadu Focus**:\n- Highest risk concentration (32%)\n- 4 districts in emergency status\n- Industrial cluster intervention\n\nNeed detailed dataset for analysis?";
  }
  
  if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
    return "🤖 **NIRA AI Chatbot Capabilities**:\n\n🔍 **Analysis & Insights**:\n- HMPI data interpretation\n- Risk assessment & predictions\n- Multi-state pattern analysis\n\n📋 **Policy Support**:\n- Recommendation generation\n- Compliance monitoring\n- Action plan optimization\n\n🚨 **Real-time Updates**:\n- Alert notifications\n- Contamination tracking\n- Response coordination\n\nJust ask me about any groundwater or policy topic!";
  }
  
  // Default response
  return "🤖 I'm NIRA AI Chatbot, your AI assistant for groundwater insights! I can help with:\n\n🔍 HMPI data analysis\n📊 Risk assessments\n🚨 Alert management\n📋 Policy recommendations\n🌍 Multi-state coordination\n\nTry asking about specific regions like 'Tamil Nadu status' or 'HMPI analysis' for detailed insights!";
};
