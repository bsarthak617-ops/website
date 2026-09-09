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
    id: "tyre-pyrolysis-oil",
    code: "OIL-TPO-PRO",
    name: "Tyre Pyrolysis Oil — TPO",
    badge: "Alternative Industrial Fuel",
    subtitle: "High Calorific Value Alternative Fuel from Pyrolysis",
    description: "Tyre Pyrolysis Oil is an alternative industrial fuel derived from the pyrolysis of end-of-life tyres. With a high calorific value and controlled quality parameters, TPO offers an effective fuel solution for a range of industrial heating applications.",
    applications: [
      "Industrial Boilers",
      "Thermic Fluid Heaters",
      "Furnaces",
      "Kilns",
      "Hot-Mix Plants",
      "Industrial Heating Systems",
      "Other compatible fuel-fired applications"
    ],
    specifications: [
      { parameter: "Gross Calorific Value (GCV)", standard: "10,200 – 10,600 kcal/kg", unit: "kcal/kg" },
      { parameter: "Kinematic Viscosity @ 40°C", standard: "3.2 – 8.0 cSt", unit: "cSt" },
      { parameter: "Density @ 15°C", standard: "0.910 – 0.950 g/cm³", unit: "g/cm³" },
      { parameter: "Flash Point (Abel / PMCC)", standard: "> 50°C", unit: "°C" },
      { parameter: "Sulphur Content", standard: "< 1.0% wt", unit: "% wt" },
      { parameter: "Moisture Content", standard: "< 0.40% vol", unit: "% vol" },
      { parameter: "Ash Content", standard: "< 0.05% wt", unit: "% wt" }
    ],
    advantages: [
      "Sustainable industrial fuel from circular end-of-life tyre recovery",
      "High calorific energy output providing rapid, stable thermal soak",
      "Economical heating cost per ton compared to conventional petroleum fuels",
      "Continuous batch testing with certified dispatch Certificate of Analysis (COA)"
    ],
    image: "/images/tyre-pyrolysis-oil.jpg"
  },
  {
    id: "blended-fuel-oil",
    code: "OIL-BFO-SERIES",
    name: "Blended Fuel Oil",
    badge: "Specialized Blending",
    subtitle: "Engineered for Road Construction & Hot Mix Plants",
    description: "Oilteq Industries manufactures and supplies Blended Fuel Oil for reliable performance in industrial heating applications, with a major focus on the road construction and Hot Mix Plant industry. The fuel is produced through controlled blending of suitable industrial fuel components to achieve consistent fuel characteristics, good calorific value and dependable combustion performance.",
    applications: [
      "Road Construction Hot Mix Plants",
      "Bituminous & Asphalt Mix Production",
      "Aggregate Drying Rotary Drums",
      "Industrial Boilers & Heating Systems",
      "Dependable Industrial Heat Generation"
    ],
    specifications: [
      { parameter: "Gross Calorific Value (GCV)", standard: "9,900 – 10,400 kcal/kg", unit: "kcal/kg" },
      { parameter: "Kinematic Viscosity @ 50°C", standard: "18 – 50 cSt", unit: "cSt" },
      { parameter: "Density @ 15°C", standard: "0.890 – 0.940 g/cm³", unit: "g/cm³" },
      { parameter: "Flash Point (PMCC)", standard: "> 66°C", unit: "°C" },
      { parameter: "Sulphur Content", standard: "< 1.2% wt", unit: "% wt" },
      { parameter: "Moisture Content", standard: "< 0.35% vol", unit: "% vol" },
      { parameter: "Ash Content", standard: "< 0.04% wt", unit: "% wt" }
    ],
    advantages: [
      "Specially formulated for hot mix asphalt rotary drying drum burners",
      "Dependable combustion performance with clean, sustained heat transfer",
      "Consistent viscosity and density reducing burner nozzle wear and flame flutter",
      "Controlled industrial blending meeting strict operational heating standards"
    ],
    image: "/images/blended-fuel-oil.jpg"
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
    id: "steel-metals",
    name: "Steel, Rolling Mills & Forging",
    description: "Reheating furnaces, continuous annealing, billet heating, and forging operations requiring heavy radiant heat.",
    image: "/images/ind-steel.jpg",
    keyProducts: ["Tyre Pyrolysis Oil — TPO", "Blended Fuel Oil"],
    stats: "High Flame Stability"
  },
  {
    id: "aluminium",
    name: "Aluminium & Smelting",
    description: "Melting reverberatory furnaces, holding furnaces, and extrusion log heaters with controlled atmosphere requirements.",
    image: "/images/ind-aluminium.jpg",
    keyProducts: ["Tyre Pyrolysis Oil — TPO"],
    stats: "Uniform Thermal Soak"
  },
  {
    id: "road-construction",
    name: "Road Construction & Asphalt",
    description: "Continuous aggregate heating in Asphalt Hotmix drum units, bitumen heating tanks, and road surfacing plant boilers.",
    image: "/images/ind-road.jpg",
    keyProducts: ["Blended Fuel Oil", "Tyre Pyrolysis Oil — TPO"],
    stats: "High Clean Burn / Low Clog"
  },
  {
    id: "boilers",
    name: "Boilers & Steam Generation",
    description: "Process steam generation for textiles, chemicals, paper, food processing, and district industrial heating networks.",
    image: "/images/ind-boilers.jpg",
    keyProducts: ["Tyre Pyrolysis Oil — TPO", "Blended Fuel Oil"],
    stats: "High Thermal Efficiency"
  },
  {
    id: "forgings",
    name: "Forgings & Heat Treatment",
    description: "Heavy forging furnaces, annealing ovens, and tempering lines demanding uniform furnace temperature distribution.",
    image: "/images/ind-forgings.jpg",
    keyProducts: ["Tyre Pyrolysis Oil — TPO"],
    stats: "Accurate Atmosphere Control"
  },
  {
    id: "refractories",
    name: "Refractories & Ceramics",
    description: "High-temperature tunnel kilns and shuttle kilns firing firebricks, castables, and specialized ceramic components.",
    image: "/images/ind-refractories.jpg",
    keyProducts: ["Tyre Pyrolysis Oil — TPO"],
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
    title: "3 Manufacturing Facilities",
    location: "Jharsuguda, Odisha",
    capacity: "6,000 MT / month",
    details: "Equipped with automated process reactors, condensation units, industrial pumps, multi-stage filtration, and comprehensive process instrumentation.",
    image: "/hero-refinery.jpg",
    x: 62,
    y: 48,
  },
  {
    id: "qa-labs",
    title: "In-House Quality Laboratories",
    location: "Odisha & Maharashtra",
    capacity: "Batch-wise COA Testing",
    details: "Full laboratory instrumentation for testing flash point, viscosity, density, calorific value, moisture, ash, and sulfur content before tanker release.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    x: 58,
    y: 54,
  },
  {
    id: "import-terminals",
    title: "Import Port Terminals",
    location: "Maharashtra & Gujarat Ports",
    capacity: "~6,000 MT / month imports",
    details: "Strategically located port storage and receiving infrastructure supporting swift customs clearing, quality sampling, and regional distribution.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    x: 28,
    y: 52,
  },
  {
    id: "tanker-fleet",
    title: "Dedicated Bulk Logistics Fleet",
    location: "Nationwide Movement",
    capacity: "Multi-tonnage Tankers",
    details: "Company-managed petroleum road tankers with tamper-evident seals and digital tracking, guaranteeing transit purity from dispatch to plant gate.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    x: 46,
    y: 60,
  },
  {
    id: "warehousing",
    title: "Regional Warehousing & Storage",
    location: "Strategic Industrial Hubs",
    capacity: "Buffer Reserve Capacity",
    details: "Strategically placed bulk storage reservoirs guaranteeing uninterrupted supply during peak manufacturing demands and seasonal road construction surges.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    x: 52,
    y: 42,
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
