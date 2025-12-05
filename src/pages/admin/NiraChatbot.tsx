import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { Users, BarChart3, FileCheck, Database, MessageCircle, Brain } from "lucide-react";

// Import NiraChatbot components
import NiraChatbotHeader from "@/components/admin/NiraChatbot/NiraChatbotHeader";
import ChatInterface from "@/components/admin/NiraChatbot/ChatInterface";
import { Source, Message } from "@/components/admin/NiraChatbot/types";

const navItems = [
  { title: "User Management", path: "/admin/user-management", icon: <Users className="w-5 h-5" /> },
  { title: "System Overview", path: "/admin/system-overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "Report Control", path: "/admin/report-control", icon: <FileCheck className="w-5 h-5" /> },
  { title: "Data Logs", path: "/admin/data-logs", icon: <Database className="w-5 h-5" /> },
  { title: "NIRA Training", path: "/admin/nira-chatbot", icon: <Brain className="w-5 h-5" /> },
];

const NiraChatbotRefactored = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome to the **NIRA Knowledge Base Training Center**! 🧠\n\nThis is where you can enhance NIRA's capabilities by uploading new research and findings.\n\n**How to train NIRA:**\n1. 📄 **Upload Research Papers** - PDF, DOC, or TXT files\n2. 🔗 **Add URLs/DOIs** - Link to online publications\n3. 📝 **Add Notes** - Paste key findings or summaries\n\n**What happens next:**\n- Documents are processed and analyzed\n- Key information is extracted and indexed\n- NIRA's knowledge base is updated\n- All users benefit from improved responses\n\nStart by uploading documents in the panel on the left!",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Welcome to the **NIRA Knowledge Base Training Center**! 🧠\n\nThis is where you can enhance NIRA's capabilities by uploading new research and findings.\n\n**How to train NIRA:**\n1. 📄 **Upload Research Papers** - PDF, DOC, or TXT files\n2. 🔗 **Add URLs/DOIs** - Link to online publications\n3. 📝 **Add Notes** - Paste key findings or summaries\n\n**What happens next:**\n- Documents are processed and analyzed\n- Key information is extracted and indexed\n- NIRA's knowledge base is updated\n- All users benefit from improved responses\n\nStart by uploading documents in the panel on the left!",
        isBot: true,
        timestamp: new Date()
      }
    ]);
  };
  
  const trainedCount = sources.filter(s => s.status === 'trained').length;

  return (
    <DashboardLayout navItems={navItems} userRole="admin">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
        <div className="p-6">
          <NiraChatbotHeader 
            onClearChat={clearChat}
            totalSources={sources.length}
            trainedSources={trainedCount}
          />
          
          <ChatInterface 
            sources={sources}
            setSources={setSources}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default NiraChatbotRefactored;