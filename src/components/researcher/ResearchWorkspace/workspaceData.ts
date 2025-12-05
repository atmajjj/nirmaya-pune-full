import type { TeamMember, Activity, ResearchNote } from './types';

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    designation: "Senior Research Scientist",
    email: "priya.sharma@research.in",
    phone: "+91 98765 43210",
    role: "Research Lead",
    avatar: "PS",
    status: "online",
    joined: "2024-01-15"
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    designation: "Environmental Analyst",
    email: "rajesh.kumar@research.in",
    phone: "+91 87654 32109",
    role: "Contributor",
    avatar: "RK",
    status: "away",
    joined: "2024-02-20"
  },
  {
    id: 3,
    name: "Ms. Anjali Patel",
    designation: "Data Scientist",
    email: "anjali.patel@research.in",
    phone: "+91 76543 21098",
    role: "Analyst",
    avatar: "AP",
    status: "online",
    joined: "2024-03-10"
  }
];

export const recentActivities: Activity[] = [
  {
    id: 1,
    user: "Dr. Priya Sharma",
    avatar: "PS",
    action: "added a new research note",
    time: "2 hours ago",
    type: "note"
  },
  {
    id: 2,
    user: "Dr. Rajesh Kumar", 
    avatar: "RK",
    action: "updated the whiteboard",
    time: "4 hours ago",
    type: "whiteboard"
  },
  {
    id: 3,
    user: "Ms. Anjali Patel",
    avatar: "AP", 
    action: "joined the workspace",
    time: "1 day ago",
    type: "team"
  }
];

export const researchNotes: ResearchNote[] = [
  {
    id: 1,
    title: "HMPI Analysis – Gujarat Region",
    author: "Dr. Priya Sharma",
    avatar: "PS",
    tags: ["HMPI", "Arsenic", "Gujarat"],
    description: "Initial findings show elevated arsenic levels in groundwater samples from northern Gujarat districts...",
    created: "9/15/2024",
    updated: "9/20/2024"
  },
  {
    id: 2,
    title: "Seasonal Variations Study",
    author: "Dr. Rajesh Kumar",
    avatar: "RK", 
    tags: ["Seasonal", "Monsoon", "Surface Water"],
    description: "Research on how monsoon patterns affect heavy metal concentrations in surface water...",
    created: "9/18/2024",
    updated: null
  }
];
