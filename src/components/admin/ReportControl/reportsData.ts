import { Report, TimelineEvent } from './types';

export const initialReports: Report[] = [
  {
    id: 1,
    title: "Delhi NCR HMPI Analysis Q4 2024",
    category: "Environmental",
    author: "Dr. Rajesh Kumar",
    status: "published",
    lastUpdated: "2024-11-10",
    submittedOn: "2024-11-08",
    priority: "high",
    description: "Comprehensive analysis of Heavy Metal Pollution Index across Delhi NCR region for Q4 2024, including groundwater contamination patterns and policy recommendations.",
    tags: ["HMPI", "Delhi", "Groundwater", "Policy"],
    version: "v2.1",
    wordCount: 12450,
    isAIGenerated: false,
    publishedDate: "2024-11-10",
    views: 342
  },
  {
    id: 2,
    title: "WHO Compliance Report - Mumbai Metropolitan",
    category: "Compliance",
    author: "Priya Sharma",
    status: "pending",
    lastUpdated: "2024-11-09",
    submittedOn: "2024-11-07",
    priority: "high",
    description: "Assessment of Mumbai's groundwater quality against WHO standards with detailed compliance metrics and improvement recommendations.",
    tags: ["WHO", "Mumbai", "Compliance", "Standards"],
    version: "v1.3",
    wordCount: 8760,
    isAIGenerated: false,
    views: 89
  },
  {
    id: 3,
    title: "AI-Generated Risk Assessment: Kolkata Industrial Zone",
    category: "Risk Assessment",
    author: "NIRA AI Chatbot",
    status: "draft",
    lastUpdated: "2024-11-11",
    submittedOn: "2024-11-11",
    priority: "medium",
    description: "Automated risk assessment of groundwater contamination in Kolkata's industrial zones using machine learning analysis of water quality data.",
    tags: ["AI", "Risk", "Kolkata", "Industrial"],
    version: "v1.0",
    wordCount: 6540,
    isAIGenerated: true,
    views: 23
  },
  {
    id: 4,
    title: "Chennai Water Quality Technical Analysis",
    category: "Technical Analysis",
    author: "Dr. Rajesh Kumar",
    status: "published",
    lastUpdated: "2024-11-05",
    submittedOn: "2024-11-01",
    priority: "medium",
    description: "Detailed technical examination of Chennai's coastal groundwater quality with focus on saltwater intrusion and contamination patterns.",
    tags: ["Chennai", "Technical", "Coastal", "Intrusion"],
    version: "v1.5",
    wordCount: 9820,
    isAIGenerated: false,
    publishedDate: "2024-11-06",
    views: 156
  }
];

export const publicationTimeline: TimelineEvent[] = [
  {
    type: "published",
    event: "Report Published",
    report: "Delhi NCR HMPI Analysis Q4 2024",
    date: "2024-11-10 14:30"
  },
  {
    type: "submitted",
    event: "New Report Submitted",
    report: "WHO Compliance Report - Mumbai",
    date: "2024-11-09 10:15"
  },
  {
    type: "reviewed",
    event: "Report Under Review",
    report: "Chennai Water Quality Analysis",
    date: "2024-11-08 16:45"
  },
  {
    type: "updated",
    event: "Report Updated",
    report: "Policy Summary - Central India",
    date: "2024-11-07 11:20"
  },
  {
    type: "archived",
    event: "Report Archived",
    report: "Q2 2024 Compliance Report",
    date: "2024-11-06 09:00"
  }
];
