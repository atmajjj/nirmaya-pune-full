// Type definitions for NiraChatbot components

export type TrainingStatus = 'pending' | 'processing' | 'trained' | 'failed';

export interface Source {
  id: string;
  name: string;
  type: 'file' | 'url' | 'text';
  fileType?: string;
  dateAdded: Date;
  content?: string;
  size?: string;
  status?: TrainingStatus;
}

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  referencedSources?: string[];
}

export type NiraMode = 'insight' | 'summary' | 'technical';
