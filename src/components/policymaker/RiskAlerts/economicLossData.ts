// District-wise economic loss data due to groundwater contamination
export interface DistrictEconomicData {
  district: string;
  state: string;
  hmpi: number;
  agricultureLoss: number;
  healthBurden: number;
  industrialLoss: number;
  waterPurification: number;
  emergencyResponse: number;
  totalLoss: number;
  lossAvoided: number;
}

export const districtEconomicData: DistrictEconomicData[] = [
  {
    district: "Coimbatore",
    state: "Tamil Nadu",
    hmpi: 84.2,
    agricultureLoss: 210,
    healthBurden: 320,
    industrialLoss: 180,
    waterPurification: 95,
    emergencyResponse: 22,
    totalLoss: 827,
    lossAvoided: 118
  },
  {
    district: "Madurai",
    state: "Tamil Nadu",
    hmpi: 78.9,
    agricultureLoss: 140,
    healthBurden: 205,
    industrialLoss: 60,
    waterPurification: 70,
    emergencyResponse: 17,
    totalLoss: 492,
    lossAvoided: 68
  },
  {
    district: "Chennai Coastal",
    state: "Tamil Nadu",
    hmpi: 72.4,
    agricultureLoss: 60,
    healthBurden: 410,
    industrialLoss: 250,
    waterPurification: 160,
    emergencyResponse: 28,
    totalLoss: 908,
    lossAvoided: 155
  },
  {
    district: "Erode",
    state: "Tamil Nadu",
    hmpi: 61.7,
    agricultureLoss: 160,
    healthBurden: 120,
    industrialLoss: 45,
    waterPurification: 50,
    emergencyResponse: 12,
    totalLoss: 387,
    lossAvoided: 48
  },
  {
    district: "Sambhajinagar",
    state: "Maharashtra",
    hmpi: 79.6,
    agricultureLoss: 180,
    healthBurden: 260,
    industrialLoss: 140,
    waterPurification: 85,
    emergencyResponse: 20,
    totalLoss: 685,
    lossAvoided: 92
  },
  {
    district: "Surat",
    state: "Gujarat",
    hmpi: 48.3,
    agricultureLoss: 220,
    healthBurden: 140,
    industrialLoss: 90,
    waterPurification: 45,
    emergencyResponse: 10,
    totalLoss: 505,
    lossAvoided: 40
  },
  {
    district: "Vadodara",
    state: "Gujarat",
    hmpi: 52.1,
    agricultureLoss: 175,
    healthBurden: 105,
    industrialLoss: 60,
    waterPurification: 42,
    emergencyResponse: 9,
    totalLoss: 391,
    lossAvoided: 36
  },
  {
    district: "Kanpur",
    state: "Uttar Pradesh",
    hmpi: 68.2,
    agricultureLoss: 240,
    healthBurden: 280,
    industrialLoss: 110,
    waterPurification: 90,
    emergencyResponse: 18,
    totalLoss: 738,
    lossAvoided: 83
  },
  {
    district: "Bengaluru Rural",
    state: "Karnataka",
    hmpi: 41.8,
    agricultureLoss: 70,
    healthBurden: 85,
    industrialLoss: 35,
    waterPurification: 22,
    emergencyResponse: 6,
    totalLoss: 218,
    lossAvoided: 22
  },
  {
    district: "Nellore",
    state: "Andhra Pradesh",
    hmpi: 73.1,
    agricultureLoss: 150,
    healthBurden: 230,
    industrialLoss: 75,
    waterPurification: 80,
    emergencyResponse: 14,
    totalLoss: 549,
    lossAvoided: 79
  }
];

// Get data for stacked bar chart (loss breakdown by district)
export const getLossBreakdownData = () => {
  return districtEconomicData
    .sort((a, b) => b.totalLoss - a.totalLoss)
    .map(d => ({
      district: d.district,
      "Agriculture": d.agricultureLoss,
      "Health Burden": d.healthBurden,
      "Industrial": d.industrialLoss,
      "Water Purification": d.waterPurification,
      "Emergency Response": d.emergencyResponse,
    }));
};

// Get total loss comparison data
export const getTotalLossComparisonData = () => {
  return districtEconomicData
    .sort((a, b) => b.totalLoss - a.totalLoss)
    .map(d => ({
      district: d.district,
      totalLoss: d.totalLoss,
      lossAvoided: d.lossAvoided,
      hmpi: d.hmpi,
      state: d.state,
      fill: d.hmpi >= 75 ? '#ef4444' : d.hmpi >= 50 ? '#f59e0b' : '#22c55e'
    }));
};

// Get summary statistics
export const getEconomicSummary = () => {
  const totalLoss = districtEconomicData.reduce((sum, d) => sum + d.totalLoss, 0);
  const totalAvoided = districtEconomicData.reduce((sum, d) => sum + d.lossAvoided, 0);
  const avgHMPI = districtEconomicData.reduce((sum, d) => sum + d.hmpi, 0) / districtEconomicData.length;
  
  return {
    totalLoss,
    totalAvoided,
    avgHMPI: avgHMPI.toFixed(1),
    districtsCount: districtEconomicData.length,
    highestLossDistrict: districtEconomicData.sort((a, b) => b.totalLoss - a.totalLoss)[0]
  };
};
