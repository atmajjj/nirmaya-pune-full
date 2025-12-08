import { Bot, User } from "lucide-react";
import type { ChatSource } from "@/types/chatbot.types";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  sources?: ChatSource[];
}

interface ChatMessageProps {
  message: Message;
  isFullScreen: boolean;
}

interface TypingIndicatorProps {
  className?: string;
}

export const TypingIndicator = ({ className = '' }: TypingIndicatorProps) => {
  return (
    <div className={`flex items-start gap-2 justify-start ${className}`}>
      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-blue-600" />
      </div>
      <div className="bg-slate-100 p-3 rounded-lg">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export const ChatMessage = ({ message, isFullScreen }: ChatMessageProps) => {
  return (
    <div
      className={`flex items-start gap-2 ${
        message.isBot ? 'justify-start' : 'justify-end'
      }`}
    >
      {message.isBot && (
        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-blue-600" />
        </div>
      )}
      <div
        className={`p-3 rounded-lg text-sm break-words word-wrap ${
          isFullScreen ? 'max-w-3xl' : 'max-w-[280px]'
        } ${
          message.isBot
            ? 'bg-slate-100 text-slate-800'
            : 'bg-[#0A3D62] text-white'
        }`}
      >
        <div 
          className="whitespace-pre-wrap break-words hyphens-auto" 
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {message.content}
        </div>
        <div
          className={`text-xs mt-2 ${
            message.isBot ? 'text-slate-500' : 'text-blue-100'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
      {!message.isBot && (
        <div className="w-6 h-6 bg-[#0A3D62] rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export type { Message };
