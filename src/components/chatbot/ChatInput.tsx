import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSend: (message: string) => void;
  isDisabled: boolean;
  isFullScreen: boolean;
}

export const ChatInput = ({ onSend, isDisabled, isFullScreen }: ChatInputProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    onSend(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`border-t border-slate-200 bg-white flex-shrink-0 ${isFullScreen ? 'p-4' : 'p-3'}`}>
      <div className={`flex items-center gap-2 ${isFullScreen ? 'max-w-4xl mx-auto' : ''}`}>
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask NIRA..."
          aria-label="Chat message input"
          className={`flex-1 min-w-0 border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white text-slate-800 placeholder:text-slate-400 text-sm ${
            isFullScreen ? 'h-11 text-base' : 'h-9'
          }`}
        />
        <Button
          onClick={handleSend}
          disabled={!inputMessage.trim() || isDisabled}
          className={`bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 disabled:opacity-50 ${
            isFullScreen ? 'h-11 w-11 p-0' : 'h-9 w-9 p-0'
          }`}
          size="sm"
          aria-label="Send message"
        >
          <Send className={isFullScreen ? 'h-5 w-5' : 'h-4 w-4'} />
        </Button>
      </div>
    </div>
  );
};
