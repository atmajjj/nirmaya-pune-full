import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message, Source } from './types';
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface ChatMessagesProps {
  messages: Message[];
  sources: Source[];
  isTyping: boolean;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const ChatMessages = ({ messages, sources, isTyping, sidebarCollapsed, onToggleSidebar }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Only scroll to bottom when new messages are added (length > 1), not on initial mount
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden">
      {sidebarCollapsed && (
        <div className="p-4 border-b border-gray-200/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-slate-600 hover:text-blue-600 hover:bg-blue-100/50 transition-all duration-200"
          >
            <FileText className="w-4 h-4 mr-2" />
            Show Sources
          </Button>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} sources={sources} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
