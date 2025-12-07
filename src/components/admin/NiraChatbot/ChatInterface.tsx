import { useState, useRef } from 'react';
import SourcesPanel from './SourcesPanel';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import { Source, Message } from './types';
import { chatbotService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

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
  const [currentSessionId, setCurrentSessionId] = useState<number | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

    try {
      const response = await chatbotService.sendMessage({
        message: inputMessage,
        sessionId: currentSessionId
      });

      if (response.success) {
        setCurrentSessionId(response.data.sessionId);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.data.message,
          isBot: true,
          timestamp: new Date(),
          referencedSources: response.data.sources?.map(s => s.documentId.toString()) || undefined
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Chat Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
