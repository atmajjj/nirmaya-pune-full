export interface Report {
  id: number;
  title: string;
  category: 'Environmental' | 'Risk Assessment' | 'Policy Summary' | 'Technical Analysis' | 'Compliance';
  author: string;
  status: 'published' | 'pending' | 'draft' | 'rejected' | 'archived';
  lastUpdated: string;
  submittedOn: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  tags: string[];
  version: string;
  wordCount: number;
  isAIGenerated: boolean;
  publishedDate?: string;
  views: number;
}

export interface TimelineEvent {
  type: 'submitted' | 'published' | 'reviewed' | 'updated' | 'archived';
  event: string;
  report: string;
  date: string;
}
