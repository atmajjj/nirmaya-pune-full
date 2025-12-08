/**
 * Chatbot Types
 * Type definitions for chatbot API interactions
 */

// Chat message types
export interface ChatMessage {
  id: string;
  session_id: number;
  role: 'user' | 'assistant';
  content: string;
  sources?: ChatSource[];
  created_at: string;
  updated_at: string;
}

export interface ChatSource {
  documentId: number;
  documentName: string;
  relevance: number;
}

// Chat session types
export interface ChatSession {
  id: number;
  user_id: number;
  title?: string;
  message_count: number;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

// Document types (for admin)
export interface ChatbotDocument {
  id: number;
  name: string;
  description?: string;
  file_url: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  chunk_count: number;
  vector_ids?: string[];
  error_message?: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

// API request/response types
export interface ChatRequest {
  message: string;
  sessionId?: number;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  data: {
    sessionId: number;
    sessionTitle?: string;
    isNewSession?: boolean;
    userMessage?: {
      id: number;
      role: string;
      content: string;
      createdAt: string;
    };
    assistantMessage?: {
      id: number;
      role: string;
      content: string;
      sources?: ChatSource[];
      createdAt: string;
    };
  };
}

export interface SessionsResponse {
  success: boolean;
  data: ChatSession[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ChatHistoryResponse {
  success: boolean;
  data: {
    sessionId: number;
    messages: ChatMessage[];
  };
}

export interface DocumentsResponse {
  success: boolean;
  data: ChatbotDocument[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface UploadDocumentResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    status: string;
    file_url: string;
  };
}

// Frontend-specific types
export interface FrontendMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  sources?: ChatSource[];
}