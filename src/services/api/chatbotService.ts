/**
 * Chatbot Service
 * API service for chatbot interactions
 */

import { apiClient } from './apiClient';
import { ENV } from '@/config/env';
import type {
  ChatRequest,
  ChatResponse,
  SessionsResponse,
  ChatHistoryResponse,
  DocumentsResponse,
  UploadDocumentResponse,
  ChatSession,
  ChatMessage,
  ChatbotDocument,
} from '@/types/chatbot.types';

/**
 * Chatbot API Service
 */
export const chatbotService = {
  /**
   * Send a chat message and get AI response
   */
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    console.log('🔵 Chatbot Service: Sending message', {
      endpoint: '/chatbot/chat',
      request,
      apiUrl: ENV.API_URL
    });
    
    try {
      const response = await apiClient.post<ChatResponse>('/chatbot/chat', request);
      console.log('✅ Chatbot Service: Response received', response);
      return response;
    } catch (error) {
      console.error('❌ Chatbot Service: Request failed', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        request
      });
      throw error;
    }
  },

  /**
   * Get user's chat sessions
   */
  async getSessions(page = 1, limit = 10): Promise<SessionsResponse> {
    return apiClient.get<SessionsResponse>('/chatbot/sessions', {
      params: { page, limit },
    });
  },

  /**
   * Get chat history for a session
   */
  async getChatHistory(sessionId: number): Promise<ChatHistoryResponse> {
    return apiClient.get<ChatHistoryResponse>(`/chatbot/sessions/${sessionId}/messages`);
  },

  /**
   * Delete a chat session
   */
  async deleteSession(sessionId: number): Promise<{ success: boolean }> {
    return apiClient.delete<{ success: boolean }>(`/chatbot/sessions/${sessionId}`);
  },

  /**
   * Upload a document (Admin only)
   */
  async uploadDocument(
    file: File,
    name?: string,
    description?: string
  ): Promise<UploadDocumentResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (name) formData.append('name', name);
    if (description) formData.append('description', description);

    // Use fetch directly for FormData since apiClient assumes JSON
    const { tokenManager } = await import('./apiClient');
    const token = tokenManager.getAccessToken();
    const response = await fetch(`${ENV.API_URL}/chatbot/documents`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  /**
   * List documents (Admin only)
   */
  async getDocuments(
    page = 1,
    limit = 20,
    status?: string
  ): Promise<DocumentsResponse> {
    return apiClient.get<DocumentsResponse>('/chatbot/documents', {
      params: { page, limit, ...(status && { status }) },
    });
  },

  /**
   * Get document statistics (Admin only)
   */
  async getDocumentStats(): Promise<{
    success: boolean;
    message: string;
    data: {
      totalDocuments: number;
      totalChunks: number;
      byStatus: {
        pending: number;
        processing: number;
        completed: number;
        failed: number;
      };
      totalFileSize: number;
    };
  }> {
    return apiClient.get('/chatbot/documents/stats');
  },

  /**
   * Delete a document (Admin only)
   */
  async deleteDocument(documentId: number): Promise<{ success: boolean }> {
    return apiClient.delete<{ success: boolean }>(`/chatbot/documents/${documentId}`);
  },
};

export default chatbotService;