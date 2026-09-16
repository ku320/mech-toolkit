/**
 * Mechanical Engineer Toolkit - Materials Property Reference Database
 * Standard reference properties for mechanical design, stress analysis, and thermodynamics.
 */

export const MATERIALS = [
  {
    id: 'mat_steel_1020',
    name: 'Mild Steel (AISI 1020, Normalized)',
    category: 'Ferrous Metals',
    density: 7850,
    yieldStrength: 295,
    ultimateStrength: 440,
    youngsModulus: 205,
    shearModulus: 80,
    poissonsRatio: 0.29,
    thermalConductivity: 51.9,
    notes: 'General purpose structural and machining steel with high ductility.'
  },
  {
    id: 'mat_steel_4140',
    name: 'Alloy Steel (AISI 4140, Q&T)',
    category: 'Ferrous Metals',
    density: 7850,
    yieldStrength: 655,
    ultimateStrength: 850,
    youngsModulus: 210,
    shearModulus: 80,
    poissonsRatio: 0.29,
    thermalConductivity: 42.6,
    notes: 'High-strength chromium-molybdenum steel for heavy-duty shafts, gears, and bolts.'
  },
  {
    id: 'mat_stainless_304',
    name: 'Austenitic Stainless Steel (AISI 304)',
    category: 'Ferrous Metals',
    density: 8000,
    yieldStrength: 215,
    ultimateStrength: 505,
    youngsModulus: 193,
    shearModulus: 77,
    poissonsRatio: 0.29,
    thermalConductivity: 16.2,
    notes: 'Excellent corrosion resistance; non-magnetic; food and chemical equipment.'
  },
  {
    id: 'mat_cast_iron_grey',
    name: 'Gray Cast Iron (ASTM Class 30)',
    category: 'Ferrous Metals',
    density: 7150,
    yieldStrength: 130,
    ultimateStrength: 214,
    youngsModulus: 100,
    shearModulus: 41,
    poissonsRatio: 0.26,
    thermalConductivity: 46.0,
    notes: 'Superior vibration damping and machinability; machine tool beds and engine blocks.'
  },
  {
    id: 'mat_al_6061',
    name: 'Aluminum Alloy (6061-T6)',
    category: 'Non-Ferrous Metals',
    density: 2700,
    yieldStrength: 276,
    ultimateStrength: 310,
    youngsModulus: 68.9,
    shearModulus: 26,
    poissonsRatio: 0.33,
    thermalConductivity: 167,
    notes: 'Lightweight structural alloy with high strength-to-weight ratio; aircraft and marine structures.'
  },
  {
    id: 'mat_al_7075',
    name: 'Aluminum Alloy (7075-T6)',
    category: 'Non-Ferrous Metals',
    density: 2810,
    yieldStrength: 503,
    ultimateStrength: 572,
    youngsModulus: 71.7,
    shearModulus: 26.9,
    poissonsRatio: 0.33,
    thermalConductivity: 130,
    notes: 'Ultra-high strength zinc-aluminum alloy for aerospace and defense airframes.'
  },
  {
    id: 'mat_ti_6al4v',
    name: 'Titanium Grade 5 (Ti-6Al-4V)',
    category: 'Non-Ferrous Metals',
    density: 4430,
    yieldStrength: 880,
    ultimateStrength: 950,
    youngsModulus: 113.8,
    shearModulus: 44,
    poissonsRatio: 0.34,
    thermalConductivity: 6.7,
    notes: 'Extreme strength, low density, and high corrosion resistance up to 400°C.'
  },
  {
    id: 'mat_brass_c360',
    name: 'Free-Cutting Brass (C36000)',
    category: 'Non-Ferrous Metals',
    density: 8500,
    yieldStrength: 310,
    ultimateStrength: 400,
    youngsModulus: 97,
    shearModulus: 37,
    poissonsRatio: 0.31,
    thermalConductivity: 115,
    notes: 'Standard machining benchmark (100% machinability rating); valves and fittings.'
  },
  {
    id: 'mat_copper_c110',
    name: 'Pure Copper (ETP C11000)',
    category: 'Non-Ferrous Metals',
    density: 8940,
    yieldStrength: 69,
    ultimateStrength: 220,
    youngsModulus: 117,
    shearModulus: 44,
    poissonsRatio: 0.34,
    thermalConductivity: 388,
    notes: 'High electrical and thermal conductivity; heat exchangers and electrical conductors.'
  },
  {
    id: 'mat_water_20c',
    name: 'Liquid Water (at 20°C, 1 atm)',
    category: 'Fluids & Gases',
    density: 998.2,
    viscosity: 0.001002, // Pa·s
    thermalConductivity: 0.598,
    specificHeat: 4182,
    notes: 'Standard hydraulic and cooling fluid baseline.'
  },
  {
    id: 'mat_air_20c',
    name: 'Air (at 20°C, 101.3 kPa)',
    category: 'Fluids & Gases',
    density: 1.204,
    viscosity: 0.0000182, // Pa·s
    thermalConductivity: 0.0257,
    specificHeat: 1005,
    gasConstant: 287.05,
    notes: 'Standard atmospheric air for aerodynamics, ventilation, and thermodynamics.'
  }
];
