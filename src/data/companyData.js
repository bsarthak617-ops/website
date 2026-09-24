export const COMPANY_INFO = {
  name: "OILTEQ INDUSTRIES",
  tagline: "Industrial Fuel Solutions & Bulk Energy Supply",
  description: "Oilteq Industries manufactures, imports, and supplies high-performance industrial fuels engineered for consistent combustion, minimal impurities, and dependable bulk delivery to energy-intensive industries.",
  headquarters: "Jharsuguda, Odisha, India",
  ports: ["Maharashtra Ports", "Gujarat Ports"],
  capacities: {
    monthlyManufacturingMT: 6000,
    facilitiesCount: 3,
    facilityLocation: "Jharsuguda, Odisha",
    monthlyImportMT: 6000,
    qaLaboratories: ["Odisha QA Lab", "Maharashtra Testing Facility"],
  },
  contact: {
    email: "procurement@oilteqindustries.com",
    phone: "+91 98200 00000", // placeholder format
    inquiryHours: "Monday – Saturday | 08:00 – 20:00 IST",
    address: "Industrial Growth Centre, Jharsuguda, Odisha 768201, India",
  }
};

export const PRODUCTS = [
  {
    id: "batch-plant-fuel",
    code: "OIL-BPF-PRO",
    name: "Fuel for Batch Mix Plant",
    badge: "Industrial Heating Fuel",
    subtitle: "High Calorific Value Fuel for Asphalt & Concrete Batch Plants",
    description: "Fuel for Batch Mix Plant is an engineered industrial heating fuel tailored for hot-mix asphalt batching plants, concrete batching, industrial boilers, and burner operations. With a high calorific value and controlled quality parameters, it delivers clean, stable combustion and cost-effective thermal efficiency.",
    applications: [
      "Hot-Mix Asphalt Plants",
      "Concrete Batching Facilities",
      "Industrial Boilers",
      "Thermic Fluid Heaters",
      "Furnaces & Kilns",
      "Industrial Heating Systems",
      "Other compatible fuel-fired applications"
    ],
    specifications: [
      { parameter: "Gross Calorific Value (GCV)", standard: "10,000+ kcal/kg", unit: "kcal/kg" },
      { parameter: "Kinematic Viscosity @ 40°C", standard: "5 cSt", unit: "cSt" },
      { parameter: "Density @ 15°C", standard: "0.90 – 0.92 g/cm³", unit: "g/cm³" },
      { parameter: "Flash Point (Abel / PMCC)", standard: "> 50°C", unit: "°C" },
      { parameter: "Sulphur Content", standard: "< 0.3% wt", unit: "% wt" },
      { parameter: "Moisture Content", standard: "< 0.40% vol", unit: "% vol" },
      { parameter: "Ash Content", standard: "< 0.05% wt", unit: "% wt" }
    ],
    advantages: [
      "Optimized flame geometry for aggregate drying drums and batching burners",
      "High calorific energy output providing rapid, stable thermal soak",
      "Economical heating cost per ton compared to conventional petroleum fuels",
      "Continuous batch testing with certified dispatch Certificate of Analysis (COA)"
    ],
    image: "/images/batch-plant-fuel.jpg?v=abp120-batchmix-v1"
  },
  {
    id: "blended-fuel-oil",
    code: "OIL-BFO-SERIES",
    name: "Fuel for Hotmix Plant",
    badge: "Specialized Blending",
    subtitle: "Engineered for Road Construction & Hot Mix Plants",
    description: "Fuel for Hotmix Plant is engineered for reliable performance across industrial heating applications, with dedicated formulation for road construction and Hot Mix Plants. Controlled blending of industrial fuel components ensures consistent combustion, high calorific value, and stable burner operation.",
    applications: [
      "Road Construction Hot Mix Plants",
      "Bituminous & Asphalt Mix Production",
      "Aggregate Drying Rotary Drums",
      "Industrial Boilers & Heating Systems",
      "Dependable Industrial Heat Generation"
    ],
    specifications: [
      { parameter: "Gross Calorific Value (GCV)", standard: "9,500 – 9,900 kcal/kg", unit: "kcal/kg" },
      { parameter: "Kinematic Viscosity @ 40°C", standard: "5 cSt", unit: "cSt" },
      { parameter: "Density @ 15°C", standard: "0.89 – 0.91 g/cm³", unit: "g/cm³" },
      { parameter: "Flash Point (PMCC)", standard: "> 45°C", unit: "°C" },
      { parameter: "Sulphur Content", standard: "< 0.3% wt", unit: "% wt" },
      { parameter: "Moisture Content", standard: "< 0.35% vol", unit: "% vol" },
      { parameter: "Ash Content", standard: "< 0.04% wt", unit: "% wt" }
    ],
    advantages: [
      "Specially formulated for hot mix asphalt rotary drying drum burners",
      "Dependable combustion performance with clean, sustained heat transfer",
      "Consistent viscosity and density reducing burner nozzle wear and flame flutter",
      "Controlled industrial blending meeting strict operational heating standards"
    ],
    image: "/images/blended-fuel-oil.jpg?v=bfo-plant-v1"
  }
];

export const TEST_PARAMETERS = [
  {
    name: "Density @ 15°C",
    unit: "g/cm³",
    testMethod: "ASTM D1298 / ISO 3675",
    significance: "Determines fuel mass-to-volume ratio, energy concentration, and metering accuracy for burner feed systems.",
    icon: "Layers"
  },
  {
    name: "Kinematic Viscosity",
    unit: "cSt @ 40°C / 50°C",
    testMethod: "ASTM D445 / ISO 3104",
    significance: "Critical for pumpability, pipe friction loss, preheating temperature requirements, and fine droplet atomization.",
    icon: "Activity"
  },
  {
    name: "Gross Calorific Value (GCV)",
    unit: "kcal/kg",
    testMethod: "ASTM D240 / Bomb Calorimeter",
    significance: "Direct measure of total usable thermal energy released during complete combustion in furnaces and boilers.",
    icon: "Flame"
  },
  {
    name: "Flash Point",
    unit: "°C (Pensky-Martens / Abel)",
    testMethod: "ASTM D93 / ISO 2719",
    significance: "Crucial regulatory safety parameter for storage temperature thresholds, transport classification, and burner safety.",
    icon: "ShieldAlert"
  },
  {
    name: "Sulphur Content",
    unit: "% by weight",
    testMethod: "ASTM D4294 / EDXRF",
    significance: "Essential for SOx emissions compliance, refractory longevity, and cold-end corrosion prevention in flues.",
    icon: "Filter"
  },
  {
    name: "Moisture Content",
    unit: "% by volume",
    testMethod: "ASTM D95 / Dean & Stark",
    significance: "Prevents flame instability, spitting/splattering at burner tips, and loss of effective combustion enthalpy.",
    icon: "Droplets"
  },
  {
    name: "Ash Content",
    unit: "% by weight",
    testMethod: "ASTM D482 / Muffle Furnace",
    significance: "Ensures minimal incombustible inorganic residue, protecting furnace refractories and boiler heating surfaces.",
    icon: "Gauge"
  }
];

export const INDUSTRIES = [
  {
    id: "road-construction",
    name: "Road Construction & Asphalt",
    description: "Continuous aggregate heating in Asphalt Hotmix drum units, bitumen heating tanks, and road surfacing plant boilers.",
    image: "/images/ind-road.jpg",
    keyProducts: ["Fuel for Hotmix Plant", "Fuel for Batch Mix Plant"],
    stats: "High Clean Burn / Low Clog"
  },
  {
    id: "steel-metals",
    name: "Steel, Pellet Plant & Forging",
    description: "Pellet plant induration furnaces, reheating furnaces, continuous annealing, billet heating, and forging operations requiring heavy radiant heat.",
    image: "/images/ind-steel.jpg",
    keyProducts: ["Fuel for Batch Mix Plant", "Fuel for Hotmix Plant"],
    stats: "High Flame Stability"
  },
  {
    id: "aluminium",
    name: "Aluminium & Smelting",
    description: "Melting reverberatory furnaces, holding furnaces, and extrusion log heaters with controlled atmosphere requirements.",
    image: "/images/ind-aluminium.jpg",
    keyProducts: ["Fuel for Batch Mix Plant"],
    stats: "Uniform Thermal Soak"
  },
  {
    id: "boilers",
    name: "Boilers & Steam Generation",
    description: "Process steam generation for textiles, chemicals, paper, food processing, and district industrial heating networks.",
    image: "/images/ind-boilers.jpg",
    keyProducts: ["Fuel for Batch Mix Plant", "Fuel for Hotmix Plant"],
    stats: "High Thermal Efficiency"
  },
  {
    id: "forgings",
    name: "Forgings & Heat Treatment",
    description: "Heavy forging furnaces, annealing ovens, and tempering lines demanding uniform furnace temperature distribution.",
    image: "/images/ind-forgings.jpg",
    keyProducts: ["Fuel for Batch Mix Plant"],
    stats: "Accurate Atmosphere Control"
  },
  {
    id: "refractories",
    name: "Refractories & Ceramics",
    description: "High-temperature tunnel kilns and shuttle kilns firing firebricks, castables, and specialized ceramic components.",
    image: "/images/ind-refractories.jpg",
    keyProducts: ["Fuel for Batch Mix Plant"],
    stats: "Consistent Sintering Curves"
  }
];

export const MANUFACTURING_STAGES = [
  {
    number: "01",
    step: "SOURCE",
    title: "Raw Material & Feedstock Sourcing",
    description: "Rigorous intake criteria and selection of high-grade petroleum fractions, blending stocks, and imported feedstocks via coastal ports.",
    equipment: "Receiving manifolds, inline density meters, sealed unloading bays",
    image: "/images/process-01-source.jpg"
  },
  {
    number: "02",
    step: "PROCESS",
    title: "Precision Thermal Processing & Blending",
    description: "Automated processing reactors, condensation systems, industrial distillation, and multi-stage homogenizers to achieve exact viscosity and combustion profiles.",
    equipment: "Reactor vessels, industrial condensers, fractionation columns, automatic flow skids",
    image: "/images/process-02-process.jpg"
  },
  {
    number: "03",
    step: "QUALITY TEST",
    title: "In-House Laboratory Batch Verification",
    description: "Every production batch undergoes comprehensive laboratory analysis for GCV, viscosity, flash point, sulfur, moisture, and ash before clearance.",
    equipment: "Bomb calorimeter, kinematic viscometers, Abel/PMCC flash testers, XRF analyzer",
    image: "/images/process-03-lab.jpg"
  },
  {
    number: "04",
    step: "STORE",
    title: "Bonded Bulk Storage & Settling",
    description: "Segregated bulk vertical and horizontal storage tank farm ensuring zero cross-contamination and continuous product settling.",
    equipment: "Dedicated steel storage tanks, recirculating pumps, thermal insulation jackets",
    image: "/images/process-04-storage.jpg"
  },
  {
    number: "05",
    step: "DISPATCH",
    title: "Bulk Tanker Loading & Delivery",
    description: "Automated top/bottom loading gantries with digital flow metering, calibrated weighbridges, and dedicated tanker fleet dispatch nationwide.",
    equipment: "Digital flow meters, certified weighbridge, sealed bulk petroleum road tankers",
    image: "/images/process-05-dispatch.jpg"
  }
];

export const INFRASTRUCTURE_HOTSPOTS = [
  {
    id: "manufacturing-odisha",
    title: "Odisha Central Hub",
    location: "Jharsuguda, Odisha",
    capacity: "12,000 MT / month",
    details: "Primary manufacturing complex with automated distillation reactors, condensation columns, multi-stage filtration, and bulk tanker dispatch terminal.",
    image: "/images/jharsuguda-plant.jpg",
    x: 53.5,
    y: 55.0,
  },
  {
    id: "corridor-gujarat",
    title: "Gujarat Import Port",
    location: "Kandla & Mundra, Gujarat",
    capacity: "~6,000 MT / month imports",
    details: "Deep-water port reception terminal with bonded storage reservoirs, pipeline discharge infrastructure, and express western corridor dispatch.",
    image: "/images/imported-fuel.jpg",
    x: 13.5,
    y: 38.1,
  },
  {
    id: "corridor-maharashtra",
    title: "Maharashtra Hub",
    location: "Mumbai & Pune, Maharashtra",
    capacity: "QA Lab & Regional Fleet",
    details: "In-house analytical testing laboratory and dedicated petroleum tanker depot servicing Western India automotive and infrastructure projects.",
    image: "/images/process-03-lab.jpg",
    x: 22.8,
    y: 50.0,
  },
  {
    id: "corridor-madhya-pradesh",
    title: "Madhya Pradesh Hub",
    location: "Indore & Jabalpur, MP",
    capacity: "Central Transit Fleet",
    details: "Central corridor transit hub facilitating bulk movement across central industrial belts with real-time GPS fleet monitoring and security seals.",
    image: "/images/tanker-truck.jpg",
    x: 33.9,
    y: 35.0,
  },
  {
    id: "corridor-chhattisgarh",
    title: "Chhattisgarh Hub",
    location: "Raipur & Bhilai, Chhattisgarh",
    capacity: "Steel & Mining Corridor",
    details: "Direct industrial supply corridor powering sponge iron kilns, steel rerolling mills, and heavy infrastructure projects across the central mining belt.",
    image: "/images/ind-steel.jpg",
    x: 46.5,
    y: 47.5,
  },
  {
    id: "corridor-bihar",
    title: "Bihar Corridor",
    location: "Patna & Barauni, Bihar",
    capacity: "Express Highway Supply",
    details: "Strategic distribution corridor servicing state expressway expansions, road paving contractors, and industrial process plants across Bihar.",
    image: "/images/ind-road.jpg",
    x: 59.0,
    y: 32.5,
  },
  {
    id: "corridor-andhra-pradesh",
    title: "Andhra Pradesh Corridor",
    location: "Visakhapatnam & Vijayawada, AP",
    capacity: "Coastal Industrial Belt",
    details: "High-throughput coastal supply network servicing port logistics, maritime infrastructure projects, and metallurgical manufacturing plants.",
    image: "/images/tanker-truck.jpg",
    x: 47.5,
    y: 64.0,
  },
  {
    id: "corridor-tamil-nadu",
    title: "Tamil Nadu Corridor",
    location: "Chennai & Coimbatore, TN",
    capacity: "Southern Distribution",
    details: "Dedicated southern supply route delivering specialized high-calorific fuel oil to boiler installations, road paving, and heavy manufacturing.",
    image: "/images/regional-storage.jpg",
    x: 41.2,
    y: 73.6,
  },
  {
    id: "corridor-haryana",
    title: "Haryana Industrial",
    location: "Panipat & Gurugram, Haryana",
    capacity: "Northern Industrial Belt",
    details: "Strategic supply corridor delivering low-viscosity heating fuel to asphalt batch plants and industrial manufacturing clusters across NCR.",
    image: "/images/ind-road.jpg",
    x: 32.6,
    y: 21.7,
  },
  {
    id: "corridor-uttarakhand",
    title: "Uttarakhand Storage",
    location: "Pantnagar & Dehradun, Uttarakhand",
    capacity: "Buffer Storage Reserve",
    details: "Sub-Himalayan regional storage facility engineered to guarantee uninterrupted supply during monsoon and seasonal road construction peaks.",
    image: "/images/regional-storage.jpg",
    x: 41.9,
    y: 17.5,
  },
  {
    id: "corridor-nepal",
    title: "Nepal Cross-Border",
    location: "Birgunj / Kathmandu Corridor",
    capacity: "Cross-Border Exports",
    details: "Certified cross-border logistics channel providing seamless customs-cleared petroleum bulk supply for major highway and hydropower construction.",
    image: "/images/tanker-truck.jpg",
    x: 62.7,
    y: 19.1,
  },
  {
    id: "corridor-jharkhand",
    title: "Jharkhand Corridor",
    location: "Ranchi & Jamshedpur, Jharkhand",
    capacity: "Heavy Mining & Steel",
    details: "Direct pipeline-connected road corridor powering high-temperature reheating furnaces, refractory kilns, and steel rolling mills.",
    image: "/images/ind-steel.jpg",
    x: 63.9,
    y: 42.1,
  },
  {
    id: "corridor-west-bengal",
    title: "West Bengal Gateway",
    location: "Haldia & Kolkata, West Bengal",
    capacity: "Eastern Port Access",
    details: "Coastal receiving terminal and eastern industrial supply corridor servicing metallurgical plants and export logistics networks.",
    image: "/images/imported-fuel.jpg",
    x: 71.3,
    y: 45.7,
  },
  {
    id: "corridor-assam",
    title: "Assam North-East",
    location: "Guwahati & Digboi, Assam",
    capacity: "North-Eastern Corridor",
    details: "Specialized cold-weather logistics corridor delivering high-flash-point industrial heating fuels for infrastructure and processing plants.",
    image: "/images/process-04-storage.jpg",
    x: 84.7,
    y: 30.9,
  },
  {
    id: "corridor-nagaland",
    title: "Nagaland Route",
    location: "Dimapur & Kohima, Nagaland",
    capacity: "North-Eastern Hill Supply",
    details: "Specialized cold-flow hill logistics channel delivering high-performance industrial fuels for border highway construction and mountain infrastructure.",
    image: "/images/process-04-storage.jpg",
    x: 90.5,
    y: 30.5,
  },
  {
    id: "corridor-mizoram",
    title: "Mizoram Route",
    location: "Aizawl & Lunglei, Mizoram",
    capacity: "Border Infrastructure Route",
    details: "Dedicated mountain transport fleet supporting national highway construction, bridge projects, and regional engineering installations.",
    image: "/images/regional-storage.jpg",
    x: 85.5,
    y: 40.5,
  }
];

export const CLIENT_ROSTER = [
  { name: "Technocraft Industries", sector: "Industrial Engineering & Scaffolding" },
  { name: "Shivalaya Construction", sector: "Highway & Infrastructure Development" },
  { name: "BKD Infrastructure", sector: "Civil Infrastructure & Road Works" },
  { name: "Khemka Refractories", sector: "High-Temperature Industrial Ceramics" },
  { name: "Goel Forgings", sector: "Automotive & Heavy Industrial Forgings" },
  { name: "Bitumix India", sector: "Bitumen & Road Surfacing Formulations" },
  { name: "Yaana Petro Products", sector: "Petroleum & Lubricant Processing" },
  { name: "M/s Vinod Kumar Jain / VKJ Infra Developer", sector: "National Infrastructure Projects" }
];

export const GROUP_BUSINESSES = [
  {
    title: "Bitumen Decanter Plant",
    description: "Industrial decanting and bulk hot bitumen handling infrastructure for national highway construction.",
    icon: "Layers"
  },
  {
    title: "IOCL Authorized Retail Outlet",
    description: "Established petroleum retail operations delivering certified commercial & retail fuels.",
    icon: "Fuel"
  },
  {
    title: "Industrial Coal Supply & Trading",
    description: "Bulk solid fuel sourcing, logistics, and trading for power, steel, and heavy manufacturing.",
    icon: "Truck"
  },
  {
    title: "Road & Highway Construction",
    description: "End-to-end EPC execution of state and national roadway infrastructure.",
    icon: "Compass"
  },
  {
    title: "Toll Plaza Management",
    description: "Systematic tollway administration and electronic transit management operations.",
    icon: "Shield"
  }
];
