import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message, Source } from './types';

interface MessageBubbleProps {
  message: Message;
  sources: Source[];
}

const MessageBubble = ({ message, sources }: MessageBubbleProps) => {
  return (
    <div
      className={`flex items-start gap-4 ${
        message.isBot ? 'justify-start' : 'justify-end'
      }`}
    >
      {message.isBot && (
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={cn(
        "max-w-2xl rounded-2xl p-4 shadow-sm",
        message.isBot
          ? "bg-white/70 backdrop-blur-sm border border-gray-200/50"
          : "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
      )}>
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>
        
        <div className={cn(
          "flex items-center justify-between mt-3 text-xs",
          message.isBot ? "text-gray-500" : "text-purple-100"
        )}>
          <span>
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
          
          {message.referencedSources && (
            <span className="text-xs opacity-75">
              Referenced: {sources.find(s => s.id === message.referencedSources?.[0])?.name}
            </span>
          )}
        </div>
      </div>
      
      {!message.isBot && (
        <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
