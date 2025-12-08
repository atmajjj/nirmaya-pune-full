/**
 * Mock Chatbot Service
 * Temporary mock implementation for testing frontend without backend
 * Replace chatbotService import with this when backend is not available
 */

import type {
  ChatRequest,
  ChatResponse,
  SessionsResponse,
  ChatHistoryResponse,
  DocumentsResponse,
  UploadDocumentResponse,
} from '@/types/chatbot.types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock session storage
let mockSessionId = 1;
let mockSessions: any[] = [];
let mockMessages: any[] = [];
let mockDocuments: any[] = [];

/**
 * Generate AI-like response based on user input
 */
const generateMockResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm NIRA AI Chatbot, powered by uploaded documents in the knowledge base. I can help you with questions about groundwater management, policy recommendations, and research insights. What would you like to know?";
  }

  if (lowerMessage.includes('document') || lowerMessage.includes('upload')) {
    return "Currently, there are documents in the knowledge base that I can reference. Admins can upload new research papers, reports, and datasets to expand my knowledge. Would you like to know about a specific topic?";
  }

  if (lowerMessage.includes('help')) {
    return "I can assist you with:\n\n📚 Research insights from uploaded documents\n💧 Groundwater management questions\n📊 Data analysis and patterns\n🎯 Policy recommendations\n\nJust ask me anything, and I'll search through the knowledge base to help you!";
  }

  // Default intelligent response
  return `Based on the documents in my knowledge base, I can provide insights on "${message}". However, please note that this is a mock response while the backend API is being set up. Once the real API is connected, I'll be able to search through actual uploaded documents and provide accurate, citation-backed answers using RAG (Retrieval-Augmented Generation) with Groq LLM and Pinecone vector search.`;
};

/**
 * Mock Chatbot Service
 */
export const mockChatbotService = {
  /**
   * Send a chat message and get AI response
   */
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    await delay(800); // Simulate network delay

    const sessionId = request.sessionId || mockSessionId++;
    const response = generateMockResponse(request.message);

    // Store message
    mockMessages.push({
      id: Date.now(),
      session_id: sessionId,
      role: 'user',
      content: request.message,
      created_at: new Date().toISOString(),
    });

    mockMessages.push({
      id: Date.now() + 1,
      session_id: sessionId,
      role: 'assistant',
      content: response,
      created_at: new Date().toISOString(),
    });

    return {
      success: true,
      data: {
        sessionId,
        message: response,
        sources: mockDocuments.length > 0 ? [
          {
            documentId: mockDocuments[0].id,
            documentName: mockDocuments[0].name,
            relevance: 0.85,
          }
        ] : undefined,
      },
    };
  },

  /**
   * Get user's chat sessions
   */
  async getSessions(page = 1, limit = 10): Promise<SessionsResponse> {
    await delay(300);

    return {
      success: true,
      data: mockSessions,
      pagination: {
        page,
        limit,
        total: mockSessions.length,
      },
    };
  },

  /**
   * Get chat history for a session
   */
  async getChatHistory(sessionId: number): Promise<ChatHistoryResponse> {
    await delay(300);

    const messages = mockMessages.filter(m => m.session_id === sessionId);

    return {
      success: true,
      data: {
        sessionId,
        messages,
      },
    };
  },

  /**
   * Delete a chat session
   */
  async deleteSession(sessionId: number): Promise<{ success: boolean }> {
    await delay(300);

    mockSessions = mockSessions.filter(s => s.id !== sessionId);
    mockMessages = mockMessages.filter(m => m.session_id !== sessionId);

    return { success: true };
  },

  /**
   * Upload a document (Admin only)
   */
  async uploadDocument(
    file: File,
    name?: string,
    description?: string
  ): Promise<UploadDocumentResponse> {
    await delay(1500);

    const doc = {
      id: mockDocuments.length + 1,
      name: name || file.name,
      description,
      file_url: URL.createObjectURL(file),
      file_path: `/uploads/${file.name}`,
      file_size: file.size,
      mime_type: file.type,
      status: 'processing' as const,
      chunk_count: 0,
      created_at: new Date().toISOString(),
    };

    mockDocuments.push(doc);

    // Simulate processing
    setTimeout(() => {
      const docIndex = mockDocuments.findIndex(d => d.id === doc.id);
      if (docIndex !== -1) {
        mockDocuments[docIndex].status = 'completed';
        mockDocuments[docIndex].chunk_count = 25;
      }
    }, 3000);

    return {
      success: true,
      message: 'Document uploaded and training started',
      data: {
        id: doc.id,
        name: doc.name,
        status: doc.status,
        file_url: doc.file_url,
      },
    };
  },

  /**
   * List documents (Admin only)
   */
  async getDocuments(
    page = 1,
    limit = 10,
    status?: string
  ): Promise<DocumentsResponse> {
    await delay(300);

    let filtered = mockDocuments;
    if (status) {
      filtered = mockDocuments.filter(d => d.status === status);
    }

    return {
      success: true,
      data: filtered,
      pagination: {
        page,
        limit,
        total: filtered.length,
      },
    };
  },

  /**
   * Delete a document (Admin only)
   */
  async deleteDocument(documentId: number): Promise<{ success: boolean }> {
    await delay(500);

    mockDocuments = mockDocuments.filter(d => d.id !== documentId);

    return { success: true };
  },
};

export default mockChatbotService;
