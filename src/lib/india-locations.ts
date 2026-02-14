export interface IndiaLocationState {
  name: string;
  cities: string[];
  districts: string[];
}

export interface IndiaLocationsData {
  states: IndiaLocationState[];
}

export interface LocationOption {
  state: string;
  city: string;
  district?: string;
  label: string;
}

export const indiaLocations: IndiaLocationsData = {
  states: [
    {
      name: "Andhra Pradesh",
      cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool"],
      districts: ["Visakhapatnam", "Krishna", "Guntur", "Chittoor", "Kurnool"],
    },
    {
      name: "Arunachal Pradesh",
      cities: ["Itanagar", "Tawang", "Ziro", "Pasighat", "Roing"],
      districts: ["Papum Pare", "Tawang", "Lower Subansiri", "East Siang", "Lower Dibang Valley"],
    },
    {
      name: "Assam",
      cities: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur"],
      districts: ["Kamrup", "Dibrugarh", "Cachar", "Jorhat", "Sonitpur"],
    },
    {
      name: "Bihar",
      cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
      districts: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
    },
    {
      name: "Chhattisgarh",
      cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
      districts: ["Raipur", "Durg", "Bilaspur", "Korba", "Bastar"],
    },
    {
      name: "Goa",
      cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
      districts: ["North Goa", "South Goa"],
    },
    {
      name: "Gujarat",
      cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
      districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    },
    {
      name: "Haryana",
      cities: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar"],
      districts: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar"],
    },
    {
      name: "Himachal Pradesh",
      cities: ["Shimla", "Dharamshala", "Solan", "Mandi", "Una"],
      districts: ["Shimla", "Kangra", "Solan", "Mandi", "Una"],
    },
    {
      name: "Jharkhand",
      cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
      districts: ["Ranchi", "East Singhbhum", "Dhanbad", "Bokaro", "Hazaribagh"],
    },
    {
      name: "Karnataka",
      cities: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
      districts: ["Bengaluru Urban", "Mysuru", "Dakshina Kannada", "Dharwad", "Belagavi"],
    },
    {
      name: "Kerala",
      cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur"],
      districts: ["Thiruvananthapuram", "Ernakulam", "Kozhikode", "Thrissur", "Kannur"],
    },
    {
      name: "Madhya Pradesh",
      cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
      districts: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
    },
    {
      name: "Maharashtra",
      cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
      districts: ["Mumbai Suburban", "Pune", "Nagpur", "Thane", "Nashik"],
    },
    {
      name: "Manipur",
      cities: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Senapati"],
      districts: ["Imphal West", "Thoubal", "Bishnupur", "Churachandpur", "Senapati"],
    },
    {
      name: "Meghalaya",
      cities: ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar"],
      districts: ["East Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills", "East Garo Hills"],
    },
    {
      name: "Mizoram",
      cities: ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"],
      districts: ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"],
    },
    {
      name: "Nagaland",
      cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
      districts: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
    },
    {
      name: "Odisha",
      cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
      districts: ["Khordha", "Cuttack", "Sundargarh", "Ganjam", "Sambalpur"],
    },
    {
      name: "Punjab",
      cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
      districts: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    },
    {
      name: "Rajasthan",
      cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
      districts: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    },
    {
      name: "Sikkim",
      cities: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo"],
      districts: ["East Sikkim", "South Sikkim", "West Sikkim", "North Sikkim"],
    },
    {
      name: "Tamil Nadu",
      cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
      districts: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    },
    {
      name: "Telangana",
      cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
      districts: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    },
    {
      name: "Tripura",
      cities: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia"],
      districts: ["West Tripura", "Gomati", "North Tripura", "Unakoti", "South Tripura"],
    },
    {
      name: "Uttar Pradesh",
      cities: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Ghaziabad"],
      districts: ["Lucknow", "Kanpur Nagar", "Varanasi", "Agra", "Ghaziabad"],
    },
    {
      name: "Uttarakhand",
      cities: ["Dehradun", "Haridwar", "Haldwani", "Roorkee", "Nainital"],
      districts: ["Dehradun", "Haridwar", "Nainital", "Udham Singh Nagar", "Pauri Garhwal"],
    },
    {
      name: "West Bengal",
      cities: ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
      districts: ["Kolkata", "Howrah", "Paschim Bardhaman", "Darjeeling", "Paschim Bardhaman"],
    },
    {
      name: "Andaman and Nicobar Islands",
      cities: ["Port Blair", "Diglipur", "Car Nicobar"],
      districts: ["South Andaman", "North and Middle Andaman", "Nicobar"],
    },
    {
      name: "Chandigarh",
      cities: ["Chandigarh"],
      districts: ["Chandigarh"],
    },
    {
      name: "Dadra and Nagar Haveli and Daman and Diu",
      cities: ["Daman", "Diu", "Silvassa"],
      districts: ["Daman", "Diu", "Dadra and Nagar Haveli"],
    },
    {
      name: "Delhi",
      cities: ["New Delhi", "Dwarka", "Rohini", "Saket", "Karol Bagh"],
      districts: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "South Delhi"],
    },
    {
      name: "Jammu and Kashmir",
      cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"],
      districts: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"],
    },
    {
      name: "Ladakh",
      cities: ["Leh", "Kargil"],
      districts: ["Leh", "Kargil"],
    },
    {
      name: "Lakshadweep",
      cities: ["Kavaratti", "Agatti", "Minicoy"],
      districts: ["Lakshadweep"],
    },
    {
      name: "Puducherry",
      cities: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
      districts: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    },
  ],
};

export const buildLocationOptions = (data: IndiaLocationsData = indiaLocations): LocationOption[] => {
  const options: LocationOption[] = [];

  data.states.forEach((state) => {
    state.cities.forEach((city) => {
      options.push({
        state: state.name,
        city,
        label: `${state.name} > ${city}`,
      });
    });
  });

  return options;
};
