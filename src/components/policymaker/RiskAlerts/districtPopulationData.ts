// District-wise population risk data
export interface DistrictRiskData {
  district: string;
  state: string;
  population: number;
  hmpi: number;
  highRisk: number;
  moderateRisk: number;
  lowRisk: number;
  childrenAffected: number;
  elderlyAffected: number;
  pregnantWomenAffected: number;
  populationAboveWHO: number;
}

export const districtPopulationData: DistrictRiskData[] = [
  {
    district: "Coimbatore",
    state: "Tamil Nadu",
    population: 3500000,
    hmpi: 84.2,
    highRisk: 1120000,
    moderateRisk: 980000,
    lowRisk: 1400000,
    childrenAffected: 403200,
    elderlyAffected: 308000,
    pregnantWomenAffected: 67200,
    populationAboveWHO: 1480000
  },
  {
    district: "Madurai",
    state: "Tamil Nadu",
    population: 1800000,
    hmpi: 78.9,
    highRisk: 660000,
    moderateRisk: 520000,
    lowRisk: 620000,
    childrenAffected: 201600,
    elderlyAffected: 158400,
    pregnantWomenAffected: 34800,
    populationAboveWHO: 770000
  },
  {
    district: "Chennai Coastal",
    state: "Tamil Nadu",
    population: 7200000,
    hmpi: 72.4,
    highRisk: 2050000,
    moderateRisk: 1830000,
    lowRisk: 3320000,
    childrenAffected: 590400,
    elderlyAffected: 496800,
    pregnantWomenAffected: 108000,
    populationAboveWHO: 2210000
  },
  {
    district: "Erode",
    state: "Tamil Nadu",
    population: 2300000,
    hmpi: 61.7,
    highRisk: 0,
    moderateRisk: 1220000,
    lowRisk: 1080000,
    childrenAffected: 244000,
    elderlyAffected: 207000,
    pregnantWomenAffected: 45900,
    populationAboveWHO: 1090000
  },
  {
    district: "Sambhajinagar",
    state: "Maharashtra",
    population: 1900000,
    hmpi: 79.6,
    highRisk: 690000,
    moderateRisk: 540000,
    lowRisk: 670000,
    childrenAffected: 189600,
    elderlyAffected: 171000,
    pregnantWomenAffected: 38000,
    populationAboveWHO: 720000
  },
  {
    district: "Surat",
    state: "Gujarat",
    population: 6100000,
    hmpi: 48.3,
    highRisk: 0,
    moderateRisk: 2190000,
    lowRisk: 3910000,
    childrenAffected: 402000,
    elderlyAffected: 390000,
    pregnantWomenAffected: 122000,
    populationAboveWHO: 1040000
  },
  {
    district: "Vadodara",
    state: "Gujarat",
    population: 2300000,
    hmpi: 52.1,
    highRisk: 0,
    moderateRisk: 870000,
    lowRisk: 1430000,
    childrenAffected: 183000,
    elderlyAffected: 161000,
    pregnantWomenAffected: 43000,
    populationAboveWHO: 540000
  },
  {
    district: "Kanpur",
    state: "Uttar Pradesh",
    population: 3100000,
    hmpi: 68.2,
    highRisk: 0,
    moderateRisk: 1420000,
    lowRisk: 1680000,
    childrenAffected: 298200,
    elderlyAffected: 240800,
    pregnantWomenAffected: 65100,
    populationAboveWHO: 1380000
  },
  {
    district: "Bengaluru Rural",
    state: "Karnataka",
    population: 2000000,
    hmpi: 41.8,
    highRisk: 0,
    moderateRisk: 780000,
    lowRisk: 1220000,
    childrenAffected: 176000,
    elderlyAffected: 154000,
    pregnantWomenAffected: 40000,
    populationAboveWHO: 320000
  },
  {
    district: "Nellore",
    state: "Andhra Pradesh",
    population: 2400000,
    hmpi: 73.1,
    highRisk: 890000,
    moderateRisk: 590000,
    lowRisk: 920000,
    childrenAffected: 220800,
    elderlyAffected: 218400,
    pregnantWomenAffected: 50400,
    populationAboveWHO: 980000
  }
];

// Get aggregated data for charts
export const getHMPIChartData = () => {
  return districtPopulationData
    .sort((a, b) => b.hmpi - a.hmpi)
    .map(d => ({
      district: d.district,
      hmpi: d.hmpi,
      state: d.state,
      fill: d.hmpi >= 75 ? '#ef4444' : d.hmpi >= 50 ? '#f59e0b' : '#22c55e'
    }));
};

export const getRiskDistributionData = () => {
  return districtPopulationData
    .sort((a, b) => b.hmpi - a.hmpi)
    .map(d => ({
      district: d.district,
      'High Risk': d.highRisk / 1000000,
      'Moderate Risk': d.moderateRisk / 1000000,
      'Low Risk': d.lowRisk / 1000000,
    }));
};

export const getVulnerablePopulationData = () => {
  const totals = districtPopulationData.reduce((acc, d) => ({
    children: acc.children + d.childrenAffected,
    elderly: acc.elderly + d.elderlyAffected,
    pregnant: acc.pregnant + d.pregnantWomenAffected
  }), { children: 0, elderly: 0, pregnant: 0 });

  return [
    { name: 'Children (<14)', value: totals.children, color: '#3b82f6' },
    { name: 'Elderly (>60)', value: totals.elderly, color: '#8b5cf6' },
    { name: 'Pregnant Women', value: totals.pregnant, color: '#ec4899' }
  ];
};

export const getStateWiseData = () => {
  const stateMap = new Map<string, { population: number; affected: number; districts: number }>();
  
  districtPopulationData.forEach(d => {
    const current = stateMap.get(d.state) || { population: 0, affected: 0, districts: 0 };
    stateMap.set(d.state, {
      population: current.population + d.population,
      affected: current.affected + d.populationAboveWHO,
      districts: current.districts + 1
    });
  });

  return Array.from(stateMap.entries()).map(([state, data]) => ({
    state,
    ...data,
    percentage: ((data.affected / data.population) * 100).toFixed(1)
  }));
};
