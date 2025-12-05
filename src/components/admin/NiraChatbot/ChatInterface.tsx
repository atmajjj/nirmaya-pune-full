import { useState, useRef } from 'react';
import SourcesPanel from './SourcesPanel';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import { Source, Message } from './types';
import { generateNiraResponse } from './aiResponseGenerator';

interface ChatInterfaceProps {
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatInterface = ({ sources, setSources, messages, setMessages }: ChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateNiraResponse(inputMessage, sources);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isBot: true,
        timestamp: new Date(),
        referencedSources: sources.length > 0 ? [sources[0].id] : undefined
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="h-full flex overflow-hidden gap-6">
      <SourcesPanel 
        sources={sources}
        setSources={setSources}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden">
        <ChatMessages 
          messages={messages}
          sources={sources}
          isTyping={isTyping}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(false)}
        />
        
        <MessageInput 
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          onAttachFile={() => fileInputRef.current?.click()}
        />

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => {
            // Handle file upload through SourcesPanel
            const event = new Event('change', { bubbles: true });
            Object.defineProperty(event, 'target', { value: e.target });
          }}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.json"
        />
      </div>
    </div>
  );
};

export default ChatInterface;
