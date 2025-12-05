export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  status: string;
  joined: string;
}

export interface Activity {
  id: number;
  user: string;
  avatar: string;
  action: string;
  time: string;
  type: string;
}

export interface ResearchNote {
  id: number;
  title: string;
  author: string;
  avatar: string;
  tags: string[];
  description: string;
  created: string;
  updated: string | null;
}

export interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
