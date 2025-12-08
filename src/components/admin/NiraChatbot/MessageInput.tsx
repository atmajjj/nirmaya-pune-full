import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";

interface MessageInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  isTyping: boolean;
  onSendMessage: () => void;
  onAttachFile: () => void;
}

const MessageInput = ({ inputMessage, setInputMessage, isTyping, onSendMessage, onAttachFile }: MessageInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="bg-slate-50/80 backdrop-blur-lg border-t border-slate-300/50 p-4">
      <div className="flex gap-3 items-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={onAttachFile}
          className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 flex-shrink-0 transition-all duration-200"
        >
          <Paperclip className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 relative">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask NIRA AI Chatbot about your uploaded data…"
            className="bg-white/70 border-slate-300 focus:border-blue-400 focus:ring-blue-200 hover:border-blue-300 pr-12 resize-none transition-all duration-200"
            disabled={isTyping}
          />
        </div>
        
        <Button
          onClick={onSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex-shrink-0 transition-all duration-200"
          size="icon"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
