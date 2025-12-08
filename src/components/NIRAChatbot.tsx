import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Bot, Minimize2, Maximize2, Expand, Shrink } from 'lucide-react';
import { ChatMessage, ChatInput, type Message } from '@/components/chatbot';
import { chatbotService } from '@/services/api';
import { showErrorToast } from '@/lib/toast-utils';

interface NIRAChatbotProps {
  className?: string;
}

const MAX_MESSAGES = 50;

const NIRAChatbot: React.FC<NIRAChatbotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<number | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (msg: Message) => {
    setMessages((prev) => {
      const updated = [...prev, msg];
      return updated.length > MAX_MESSAGES ? updated.slice(-MAX_MESSAGES) : updated;
    });
  };

  const handleSendMessage = async (inputMessage: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    addMessage(userMessage);
    
    console.log('🚀 NIRAChatbot: Sending message', {
      message: inputMessage,
      sessionId: currentSessionId,
      timestamp: new Date().toISOString()
    });

    try {
      const response = await chatbotService.sendMessage({
        message: inputMessage,
        sessionId: currentSessionId
      });

      console.log('📩 NIRAChatbot: API Response received', {
        fullResponse: response,
        success: response?.success,
        hasData: !!response?.data,
        dataKeys: response?.data ? Object.keys(response.data) : [],
      });

      if (response.success && response.data) {
        // Extract message from response.data.assistantMessage.content
        const botMessageContent = response.data.assistantMessage?.content || '';
        
        const sources = response.data.assistantMessage?.sources || [];

        console.log('✅ NIRAChatbot: Processing successful response', {
          sessionId: response.data.sessionId,
          messageLength: botMessageContent.length,
          sourcesCount: sources.length,
          responseStructure: {
            hasAssistantMessage: !!response.data.assistantMessage,
            assistantMessageContent: response.data.assistantMessage?.content || 'none'
          }
        });

        setCurrentSessionId(response.data.sessionId);
        
        if (botMessageContent) {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: botMessageContent,
            isBot: true,
            timestamp: new Date(),
            sources: sources
          };
          addMessage(botMessage);
        } else {
          console.error('⚠️ NIRAChatbot: No message content found in response', {
            data: response.data
          });
          throw new Error('No message content in response');
        }
      } else {
        console.error('⚠️ NIRAChatbot: Invalid response structure', {
          response,
          hasSuccess: 'success' in response,
          hasData: 'data' in response,
        });
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ NIRAChatbot: Error occurred', {
        error,
        errorType: error?.constructor?.name,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Show detailed error to user
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      showErrorToast("Chat Error", `Failed to send message: ${errorMsg}. Please check your connection and try again.`);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting to the server right now. Please ensure the backend API is running and try again later.",
        isBot: true,
        timestamp: new Date()
      };
      addMessage(errorMessage);
    } finally {
      console.log('🏁 NIRAChatbot: Message handling complete');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsFullScreen(false);
    setIsMinimized(false);
  };

  return (
    <div className={`fixed ${isFullScreen ? 'inset-4' : 'bottom-4 right-4'} z-50 ${className}`}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white"
          size="lg"
          aria-label="Open NIRA chatbot"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`shadow-2xl border-2 border-slate-200 overflow-hidden transition-all duration-300 flex flex-col ${
          isFullScreen 
            ? 'w-full h-full' 
            : isMinimized 
              ? 'w-96 h-auto' 
              : 'w-96 h-[650px]'
        }`}>
          <CardHeader className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] text-white p-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base font-bold text-white leading-tight">NIRA</CardTitle>
                  <p className="text-xs text-blue-100 opacity-90 leading-tight">NEERA AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsFullScreen(!isFullScreen);
                    if (isMinimized) setIsMinimized(false);
                  }}
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  title={isFullScreen ? "Exit full screen" : "Full screen"}
                  aria-label={isFullScreen ? "Exit full screen" : "Full screen"}
                >
                  {isFullScreen ? <Shrink className="h-3 w-3" /> : <Expand className="h-3 w-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  title={isMinimized ? "Restore" : "Minimize"}
                  aria-label={isMinimized ? "Restore chatbot" : "Minimize chatbot"}
                  disabled={isFullScreen}
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  title="Close"
                  aria-label="Close chatbot"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
              {/* Messages Area */}
              <div className={`flex-1 overflow-y-auto overflow-x-hidden ${isFullScreen ? 'p-6' : 'p-3'}`}>
                <div className={`space-y-3 w-full ${isFullScreen ? 'max-w-4xl mx-auto' : ''}`}>
                  {messages.map((message) => (
                    <ChatMessage 
                      key={message.id} 
                      message={message} 
                      isFullScreen={isFullScreen} 
                    />
                  ))}
                  
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <ChatInput 
                onSend={handleSendMessage} 
                isDisabled={false} 
                isFullScreen={isFullScreen} 
              />
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
};

export default NIRAChatbot;
