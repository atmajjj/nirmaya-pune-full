import type { MonthlyData, ResearchArea, Publication } from './types';

export const monthlyCitationsData: MonthlyData[] = [
  { month: 'Jan', publications: 12, citations: 38 },
  { month: 'Feb', publications: 15, citations: 42 },
  { month: 'Mar', publications: 18, citations: 45 },
  { month: 'Apr', publications: 22, citations: 48 },
  { month: 'May', publications: 25, citations: 52 },
  { month: 'Jun', publications: 28, citations: 55 },
];

export const researchAreasData: ResearchArea[] = [
  { name: 'Heavy Metal Toxicology', papers: 54, percentage: 35, color: '#06b6d4' },
  { name: 'Water Quality Assessment', papers: 44, percentage: 28, color: '#0ea5e9' },
  { name: 'Environmental Impact', papers: 28, percentage: 18, color: '#3b82f6' },
  { name: 'Health Risk Analysis', papers: 19, percentage: 12, color: '#6366f1' },
  { name: 'Policy Research', papers: 11, percentage: 7, color: '#8b5cf6' },
];

export const recentPublications: Publication[] = [
  {
    id: 1,
    title: "Arsenic Contamination in Gujarat Groundwater",
    journal: "Environmental Science & Technology",
    publishedDate: "2 weeks ago",
    status: "Published",
    statusColor: "green",
    citations: 45
  },
  {
    id: 2,
    title: "Lead Exposure and Health Impacts in Urban Areas",
    journal: "Journal of Environmental Health",
    publishedDate: "1 month ago",
    status: "Under Review",
    statusColor: "yellow",
    citations: 32
  },
  {
    id: 3,
    title: "Mercury Bioaccumulation in Aquatic Ecosystems",
    journal: "Ecotoxicology and Environmental Safety",
    publishedDate: "6 weeks ago",
    status: "Published",
    statusColor: "green",
    citations: 28
  },
  {
    id: 4,
    title: "Chromium Pollution Patterns in Industrial Regions",
    journal: "Water Research",
    publishedDate: "2 months ago",
    status: "Published",
    statusColor: "green",
    citations: 51
  }
];
