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
            : 'bg-blue-600 text-white'
        }`}
      >
        <div 
          className="whitespace-pre-wrap break-words hyphens-auto" 
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {message.content}
        </div>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-300">
            <div className="text-xs text-slate-500 mb-1">Sources:</div>
            {message.sources.map((source, index) => (
              <div key={index} className="text-xs text-slate-600">
                📄 {source.documentName} (Relevance: {(source.relevance * 100).toFixed(1)}%)
              </div>
            ))}
          </div>
        )}
        <div
          className={`text-xs mt-2 ${message.sources ? 'mt-1' : 'mt-2'} ${
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
        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-2">
      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-blue-600" />
      </div>
      <div className="bg-slate-100 p-3 rounded-lg">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
};

export type { Message };
