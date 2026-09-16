/**
 * Mechanical Engineer Toolkit - Calculator Schemas & Metadata
 * Provides UI schemas, input specifications, standard units, and assumptions.
 */

export const CALCULATOR_CATEGORIES = {
  mechanics: {
    id: 'mechanics',
    name: 'Statics & Mechanics',
    icon: '⚙️',
    description: 'Forces, torque, stress, strain, power, and basic structural fundamentals.'
  },
  machine_design: {
    id: 'machine_design',
    name: 'Machine Design',
    icon: '🔩',
    description: 'Shafts, gears, belts, rolling bearings, and helical springs.'
  },
  fluids: {
    id: 'fluids',
    name: 'Fluid Mechanics',
    icon: '🌊',
    description: 'Reynolds number, continuity, Bernoulli, head, and hydraulic power.'
  },
  thermo: {
    id: 'thermo',
    name: 'Thermodynamics',
    icon: '🔥',
    description: 'Carnot cycles, COP, ideal gas equations, and Fourier conduction.'
  },
  metrology: {
    id: 'metrology',
    name: 'Metrology & Errors',
    icon: '📐',
    description: 'Instrument least count, absolute error, relative error, and precision metrics.'
  }
};

export const CALCULATORS = [
  // ================= STATICS & MECHANICS =================
  {
    id: 'force',
    name: 'Force (Newton\'s 2nd Law)',
    category: 'mechanics',
    icon: '⚡',
    description: 'Calculate net force from mass and linear acceleration.',
    formulaDisplay: 'F = m × a',
    inputs: [
      { id: 'm', label: 'Mass (m)', unit: 'kg', default: 10, min: 0, step: 0.1, helper: 'Mass must be non-negative (≥ 0)' },
      { id: 'a', label: 'Acceleration (a)', unit: 'm/s²', default: 9.81, step: 0.01, helper: 'Rate of velocity change' }
    ],
    notes: 'Based on Newton\'s Second Law for rigid bodies of constant mass in an inertial frame.'
  },
  {
    id: 'weight',
    name: 'Weight from Mass & Gravity',
    category: 'mechanics',
    icon: '⚖️',
    description: 'Calculate gravitational attraction force with customizable local gravity.',
    formulaDisplay: 'W = m × g',
    inputs: [
      { id: 'm', label: 'Mass (m)', unit: 'kg', default: 75, min: 0, step: 0.5 },
      { id: 'g', label: 'Local Gravity (g)', unit: 'm/s²', default: 9.80665, min: 0.0001, step: 0.00001, helper: 'Standard earth gravity is 9.80665 m/s²' }
    ],
    notes: 'Weight represents downward force in Newtons exerted by a gravitational field.'
  },
  {
    id: 'torque',
    name: 'Torque (Moment of Force)',
    category: 'mechanics',
    icon: '🔄',
    description: 'Calculate rotational moment exerted by a force at a lever arm radius.',
    formulaDisplay: 'T = F × r × sin(θ)',
    inputs: [
      { id: 'F', label: 'Force applied (F)', unit: 'N', default: 250, min: 0, step: 1 },
      { id: 'r', label: 'Lever arm radius (r)', unit: 'm', default: 0.5, min: 0, step: 0.01 },
      { id: 'theta', label: 'Angle with lever (θ)', unit: 'deg', default: 90, min: 0, max: 360, step: 1, helper: '90° gives maximum perpendicular torque' }
    ],
    notes: 'Torque vector magnitude: T = r × F. When perpendicular (θ = 90°), sin(90°) = 1.'
  },
  {
    id: 'power_rot',
    name: 'Mechanical Rotational Power',
    category: 'mechanics',
    icon: '💡',
    description: 'Calculate power output from shaft speed (RPM) and delivered torque.',
    formulaDisplay: 'P = (2π × N × T) / 60',
    inputs: [
      { id: 'N', label: 'Rotational Speed (N)', unit: 'rpm', default: 1500, min: 0, step: 10 },
      { id: 'T', label: 'Shaft Torque (T)', unit: 'N·m', default: 120, min: 0, step: 1 }
    ],
    notes: 'Converts RPM to angular velocity ω = 2πN/60 (rad/s), then P = T × ω. 1 hp ≈ 745.7 W.'
  },
  {
    id: 'stress',
    name: 'Normal Stress (Direct & Geometry)',
    category: 'mechanics',
    icon: '🧱',
    description: 'Calculate axial tensile or compressive stress with direct area or cross-section.',
    formulaDisplay: 'σ = F / A',
    inputs: [
      { id: 'F', label: 'Applied Axial Force (F)', unit: 'N', default: 45000, step: 100 },
      { id: 'A', label: 'Cross-sectional Area (A)', unit: 'm²', default: 0.0005, min: 1e-9, step: 0.0001, helper: '0.0005 m² = 500 mm²' }
    ],
    notes: 'Normal stress is uniformly distributed across the plane for pure axial loading. 1 MPa = 1 N/mm².'
  },
  {
    id: 'strain',
    name: 'Engineering Strain',
    category: 'mechanics',
    icon: '📏',
    description: 'Dimensionless axial elongation or contraction under tensile load.',
    formulaDisplay: 'ε = ΔL / L₀',
    inputs: [
      { id: 'dL', label: 'Elongation / Change in length (ΔL)', unit: 'mm', default: 0.8, step: 0.01 },
      { id: 'L0', label: 'Original Gauge Length (L₀)', unit: 'mm', default: 200, min: 0.0001, step: 1 }
    ],
    notes: 'Engineering strain ε is dimensionless (m/m). Percentage strain = ε × 100%.'
  },
  {
    id: 'pressure',
    name: 'Surface Pressure',
    category: 'mechanics',
    icon: '🧭',
    description: 'Uniform normal force distributed over a surface contact area.',
    formulaDisplay: 'p = F / A',
    inputs: [
      { id: 'F', label: 'Normal Force (F)', unit: 'N', default: 12000, min: 0, step: 50 },
      { id: 'A', label: 'Contact Area (A)', unit: 'm²', default: 0.025, min: 1e-7, step: 0.001 }
    ],
    notes: '1 Pa = 1 N/m², 1 bar = 100,000 Pa, 1 MPa = 10 bar.'
  },
  {
    id: 'work',
    name: 'Mechanical Work Done',
    category: 'mechanics',
    icon: '🔨',
    description: 'Energy transferred by a force acting through a linear displacement.',
    formulaDisplay: 'W = F × d × cos(θ)',
    inputs: [
      { id: 'F', label: 'Force (F)', unit: 'N', default: 500, min: 0, step: 10 },
      { id: 'd', label: 'Displacement (d)', unit: 'm', default: 12, min: 0, step: 0.5 },
      { id: 'theta', label: 'Angle to displacement (θ)', unit: 'deg', default: 0, min: 0, max: 360, step: 5 }
    ],
    notes: 'Work is the scalar product W = F · d = F d cos(θ). 1 Joule = 1 N·m.'
  },
  {
    id: 'fos',
    name: 'Factor of Safety (FoS)',
    category: 'mechanics',
    icon: '🛡️',
    description: 'Structural safety margin between material yield/ultimate strength and working stress.',
    formulaDisplay: 'FoS = σ_allowable / σ_working',
    inputs: [
      { id: 'strength', label: 'Material Yield / Ultimate Strength (σ_lim)', unit: 'MPa', default: 250, min: 0.1, step: 5, helper: 'e.g. Mild steel yield ≈ 250 MPa' },
      { id: 'working', label: 'Maximum Working / Applied Stress (σ_work)', unit: 'MPa', default: 100, min: 0.001, step: 5 }
    ],
    notes: 'FoS > 1 indicates design stress is within allowable limits. Typical engineering FoS ranges 1.5 to 4.0 depending on criticality.'
  },
  {
    id: 'mech_eff',
    name: 'Mechanical Efficiency',
    category: 'mechanics',
    icon: '📈',
    description: 'Ratio of useful mechanical power output to total power input.',
    formulaDisplay: 'η = (P_out / P_in) × 100%',
    inputs: [
      { id: 'Pout', label: 'Useful Output Power (P_out)', unit: 'kW', default: 18.5, min: 0, step: 0.5 },
      { id: 'Pin', label: 'Input Power Supplied (P_in)', unit: 'kW', default: 22.0, min: 0.001, step: 0.5 }
    ],
    notes: 'By the 1st and 2nd Laws of Thermodynamics, η cannot exceed 100% for physical machines due to friction and dissipative losses.'
  },

  // ================= MACHINE DESIGN =================
  {
    id: 'shaft_diameter',
    name: 'Solid Shaft Diameter (Torsional Shear)',
    category: 'machine_design',
    icon: '🪵',
    description: 'Minimum required solid transmission shaft diameter based on allowable shear stress.',
    formulaDisplay: 'd = [ (16 × T) / (π × τ_allowable) ]^(1/3)',
    inputs: [
      { id: 'T', label: 'Transmitted Torque (T)', unit: 'N·m', default: 350, min: 0.1, step: 10 },
      { id: 'tau', label: 'Allowable Shear Stress (τ)', unit: 'MPa', default: 45, min: 0.1, step: 1, helper: 'Typical commercial steel shaft τ_allowable = 40 to 60 MPa' }
    ],
    notes: 'Calculates the theoretical minimum diameter for pure torsion based on polar section modulus Zp = π d³ / 16.'
  },
  {
    id: 'gear_ratio',
    name: 'Gear Ratio & Output Speed',
    category: 'machine_design',
    icon: '⚙️',
    description: 'Speed reduction or overdrive ratio from tooth count and input shaft RPM.',
    formulaDisplay: 'i = Z_driven / Z_driver = N_driver / N_driven',
    inputs: [
      { id: 'Z1', label: 'Driver Gear Teeth (Z₁)', unit: 'teeth', default: 18, min: 1, step: 1 },
      { id: 'Z2', label: 'Driven Gear Teeth (Z₂)', unit: 'teeth', default: 54, min: 1, step: 1 },
      { id: 'N1', label: 'Driver Input Speed (N₁)', unit: 'rpm', default: 1440, min: 0, step: 10 }
    ],
    notes: 'Ideal gear transmission assumes zero slip. If torque is considered, T₂ ≈ T₁ × (Z₂/Z₁) × η.'
  },
  {
    id: 'belt_length',
    name: 'Open Belt Drive Length',
    category: 'machine_design',
    icon: '➰',
    description: 'Approximate pitch length for an open flat or V-belt pulley system.',
    formulaDisplay: 'L ≈ 2C + (π/2)(D + d) + (D - d)² / (4C)',
    inputs: [
      { id: 'C', label: 'Center Distance (C)', unit: 'mm', default: 600, min: 1, step: 10 },
      { id: 'D', label: 'Large Pulley Pitch Diameter (D)', unit: 'mm', default: 250, min: 1, step: 5 },
      { id: 'd', label: 'Small Pulley Pitch Diameter (d)', unit: 'mm', default: 125, min: 1, step: 5 }
    ],
    notes: 'Standard industrial formula for open belt drives where center distance C > (D + d) / 2.'
  },
  {
    id: 'bearing_life',
    name: 'Rolling Bearing Nominal Life (L₁₀)',
    category: 'machine_design',
    icon: '⭕',
    description: 'ISO 281 nominal rating life in millions of revolutions and operating hours.',
    formulaDisplay: 'L₁₀ = (C / P)^p × 10⁶ revolutions',
    inputs: [
      { id: 'C', label: 'Basic Dynamic Load Rating (C)', unit: 'kN', default: 28.5, min: 0.1, step: 0.5 },
      { id: 'P', label: 'Equivalent Dynamic Bearing Load (P)', unit: 'kN', default: 7.2, min: 0.01, step: 0.1 },
      { id: 'N', label: 'Rotational Speed (N)', unit: 'rpm', default: 1750, min: 1, step: 50 },
      { id: 'p', label: 'Life Exponent (p)', unit: '', default: 3, min: 1, max: 4, step: 0.333, helper: 'p = 3 for ball bearings, p = 10/3 (3.33) for roller bearings' }
    ],
    notes: '90% reliability basic rating life based on ISO 281 standards without contamination or lubrication factors.'
  },
  {
    id: 'spring_calc',
    name: 'Helical Coil Spring Rate & Stress',
    category: 'machine_design',
    icon: '🌀',
    description: 'Spring stiffness rate (k) and maximum torsional shear stress under axial load.',
    formulaDisplay: 'k = (G × d⁴) / (8 × D³ × N_a)',
    inputs: [
      { id: 'd', label: 'Wire Diameter (d)', unit: 'mm', default: 4, min: 0.1, step: 0.1 },
      { id: 'D', label: 'Mean Coil Diameter (D)', unit: 'mm', default: 32, min: 0.5, step: 1 },
      { id: 'Na', label: 'Active Number of Coils (N_a)', unit: 'coils', default: 8, min: 1, step: 0.5 },
      { id: 'G', label: 'Torsional Modulus of Rigidity (G)', unit: 'GPa', default: 79.3, min: 1, step: 0.5, helper: 'Spring steel G ≈ 79.3 GPa, Stainless ≈ 70.3 GPa' },
      { id: 'F', label: 'Applied Axial Load (F)', unit: 'N', default: 150, min: 0, step: 5 }
    ],
    notes: 'Calculates uncorrected torsional shear stress τ = (8 F D) / (π d³) and deflection δ = F / k.'
  },

  // ================= FLUID MECHANICS =================
  {
    id: 'reynolds',
    name: 'Reynolds Number & Flow Regime',
    category: 'fluids',
    icon: '🌊',
    description: 'Dimensionless ratio of inertial forces to viscous forces in internal pipe flow.',
    formulaDisplay: 'Re = (ρ × V × D) / μ',
    inputs: [
      { id: 'rho', label: 'Fluid Density (ρ)', unit: 'kg/m³', default: 998, min: 0.1, step: 1, helper: 'Water at 20°C ≈ 998 kg/m³, Air ≈ 1.204 kg/m³' },
      { id: 'V', label: 'Mean Flow Velocity (V)', unit: 'm/s', default: 1.5, min: 0, step: 0.1 },
      { id: 'D', label: 'Internal Pipe Diameter (D)', unit: 'm', default: 0.05, min: 0.0001, step: 0.005, helper: '0.05 m = 50 mm pipe' },
      { id: 'mu', label: 'Dynamic Viscosity (μ)', unit: 'Pa·s', default: 0.001002, min: 1e-7, step: 0.0001, helper: 'Water at 20°C ≈ 0.001002 Pa·s (1 cP)' }
    ],
    notes: 'For circular pipe flow: Re < 2300 is Laminar, 2300 ≤ Re ≤ 4000 is Transitional, and Re > 4000 is Turbulent.'
  },
  {
    id: 'continuity',
    name: 'Continuity Equation (Steady Pipe Flow)',
    category: 'fluids',
    icon: '🚰',
    description: 'Calculate downstream velocity in converging/diverging pipes for incompressible fluid.',
    formulaDisplay: 'A₁ × V₁ = A₂ × V₂  ⟹  V₂ = (A₁ / A₂) × V₁',
    inputs: [
      { id: 'd1', label: 'Inlet Diameter (d₁)', unit: 'mm', default: 100, min: 0.1, step: 5 },
      { id: 'V1', label: 'Inlet Velocity (V₁)', unit: 'm/s', default: 2.0, min: 0, step: 0.1 },
      { id: 'd2', label: 'Outlet Diameter (d₂)', unit: 'mm', default: 50, min: 0.1, step: 5 }
    ],
    notes: 'Assumes steady, 1-D, incompressible fluid flow with circular cross-sections (V₂ = V₁ × (d₁/d₂)²).'
  },
  {
    id: 'bernoulli',
    name: 'Bernoulli Equation (Pressure Difference)',
    category: 'fluids',
    icon: '📊',
    description: 'Static pressure change along an ideal streamline between two elevations and velocities.',
    formulaDisplay: 'Δp = p₁ - p₂ = ρ [ g(z₂ - z₁) + 0.5(V₂² - V₁²) ]',
    inputs: [
      { id: 'rho', label: 'Fluid Density (ρ)', unit: 'kg/m³', default: 1000, min: 0.1, step: 10 },
      { id: 'V1', label: 'Inlet Velocity (V₁)', unit: 'm/s', default: 2.0, min: 0, step: 0.1 },
      { id: 'z1', label: 'Inlet Elevation (z₁)', unit: 'm', default: 0, step: 0.5 },
      { id: 'V2', label: 'Outlet Velocity (V₂)', unit: 'm/s', default: 5.0, min: 0, step: 0.1 },
      { id: 'z2', label: 'Outlet Elevation (z₂)', unit: 'm', default: 3.0, step: 0.5 }
    ],
    notes: 'Assumes frictionless, steady, incompressible flow along an ideal streamline without mechanical pump/turbine work.'
  },
  {
    id: 'pressure_head',
    name: 'Pressure Head to Height',
    category: 'fluids',
    icon: '📏',
    description: 'Equivalent static column height of liquid producing a given static pressure.',
    formulaDisplay: 'h = p / (ρ × g)',
    inputs: [
      { id: 'p', label: 'Fluid Gauge Pressure (p)', unit: 'kPa', default: 150, min: 0, step: 5 },
      { id: 'rho', label: 'Fluid Density (ρ)', unit: 'kg/m³', default: 1000, min: 0.1, step: 10 },
      { id: 'g', label: 'Gravity (g)', unit: 'm/s²', default: 9.81, min: 0.1, step: 0.01 }
    ],
    notes: 'Pressure head expresses fluid pressure in terms of the vertical column height of that fluid.'
  },
  {
    id: 'hydraulic_power',
    name: 'Hydraulic & Pump Shaft Power',
    category: 'fluids',
    icon: '⚡',
    description: 'Hydraulic power imparted to fluid and required pump electrical/brake power.',
    formulaDisplay: 'P_hyd = ρ × g × Q × H   |   P_pump = P_hyd / η',
    inputs: [
      { id: 'Q', label: 'Flow Rate (Q)', unit: 'L/s', default: 25, min: 0.01, step: 1, helper: '25 L/s = 0.025 m³/s' },
      { id: 'H', label: 'Total Dynamic Head (H)', unit: 'm', default: 35, min: 0, step: 1 },
      { id: 'rho', label: 'Fluid Density (ρ)', unit: 'kg/m³', default: 1000, min: 1, step: 10 },
      { id: 'eta', label: 'Pump Efficiency (η)', unit: '%', default: 75, min: 1, max: 100, step: 1 }
    ],
    notes: 'Calculates ideal water horsepower / hydraulic power and required electrical drive shaft power.'
  },

  // ================= THERMODYNAMICS =================
  {
    id: 'carnot_eff',
    name: 'Carnot Heat Engine Maximum Efficiency',
    category: 'thermo',
    icon: '🌡️',
    description: 'Theoretical upper limit on thermodynamic cycle efficiency between two heat reservoirs.',
    formulaDisplay: 'η_carnot = 1 - (T_cold / T_hot)',
    inputs: [
      { id: 'Th_C', label: 'Hot Reservoir Temp (T_hot)', unit: '°C', default: 550, step: 10, helper: 'e.g. Steam turbine inlet temperature' },
      { id: 'Tc_C', label: 'Cold Sink Temp (T_cold)', unit: '°C', default: 35, step: 5, helper: 'e.g. Cooling tower sink temperature' }
    ],
    notes: 'Both temperatures MUST be converted to absolute temperature (Kelvin = °C + 273.15). Second Law requires T_hot > T_cold > 0 K.'
  },
  {
    id: 'cop_refrigerator',
    name: 'COP of Refrigerator',
    category: 'thermo',
    icon: '❄️',
    description: 'Performance coefficient: heat extracted from refrigerated space per unit work input.',
    formulaDisplay: 'COP_R = Q_L / W_in',
    inputs: [
      { id: 'QL', label: 'Cooling Capacity / Heat Absorbed (Q_L)', unit: 'kW', default: 14.0, min: 0.01, step: 0.5 },
      { id: 'W', label: 'Compressor Power Input (W_in)', unit: 'kW', default: 4.2, min: 0.001, step: 0.1 }
    ],
    notes: 'Commercial domestic and chiller systems typically operate with COP_R between 2.5 and 5.0.'
  },
  {
    id: 'cop_heat_pump',
    name: 'COP of Heat Pump',
    category: 'thermo',
    icon: '♨️',
    description: 'Performance coefficient: useful heating delivered to warm space per unit work input.',
    formulaDisplay: 'COP_HP = Q_H / W_in = COP_R + 1',
    inputs: [
      { id: 'QH', label: 'Heating Delivered (Q_H)', unit: 'kW', default: 18.2, min: 0.01, step: 0.5 },
      { id: 'W', label: 'Compressor Work Input (W_in)', unit: 'kW', default: 4.2, min: 0.001, step: 0.1 }
    ],
    notes: 'Thermodynamically, COP_HP = (Q_L + W) / W = COP_R + 1. Always greater than 1.0.'
  },
  {
    id: 'ideal_gas',
    name: 'Ideal Gas Law (Pressure & Density)',
    category: 'thermo',
    icon: '🎈',
    description: 'Calculate absolute pressure, volume, temperature or density using the specific gas constant.',
    formulaDisplay: 'p = ρ × R_specific × T',
    inputs: [
      { id: 'rho', label: 'Gas Density (ρ)', unit: 'kg/m³', default: 1.225, min: 0.001, step: 0.05 },
      { id: 'T_C', label: 'Temperature (T)', unit: '°C', default: 20, min: -273, step: 1 },
      { id: 'R_spec', label: 'Specific Gas Constant (R_spec)', unit: 'J/(kg·K)', default: 287.05, min: 1, step: 1, helper: 'Air = 287.05, Nitrogen = 296.8, Helium = 2077' }
    ],
    notes: 'Applies to gases at low to moderate pressures where intermolecular potential forces are negligible.'
  },
  {
    id: 'conduction_heat',
    name: 'Heat Conduction (Fourier\'s 1-D Law)',
    category: 'thermo',
    icon: '🧱',
    description: 'Steady 1-D heat conduction rate through a plane wall or slab of known thermal conductivity.',
    formulaDisplay: 'Q_dot = (k × A × ΔT) / L',
    inputs: [
      { id: 'k', label: 'Thermal Conductivity (k)', unit: 'W/(m·K)', default: 0.8, min: 0.001, step: 0.05, helper: 'Brick ≈ 0.8, Glass ≈ 1.0, Copper ≈ 385' },
      { id: 'A', label: 'Wall Surface Area (A)', unit: 'm²', default: 15.0, min: 0.01, step: 0.5 },
      { id: 'T1', label: 'Hot Side Temp (T₁)', unit: '°C', default: 85, step: 1 },
      { id: 'T2', label: 'Cold Side Temp (T₂)', unit: '°C', default: 22, step: 1 },
      { id: 'L', label: 'Wall Thickness (L)', unit: 'mm', default: 150, min: 0.1, step: 5, helper: '150 mm = 0.15 m' }
    ],
    notes: 'Assumes steady-state, one-dimensional heat flux without internal volumetric heat generation.'
  },

  // ================= METROLOGY & MEASUREMENT =================
  {
    id: 'vernier_least_count',
    name: 'Vernier Caliper Least Count',
    category: 'metrology',
    icon: '📏',
    description: 'Minimum measurable resolution of a standard vernier scale.',
    formulaDisplay: 'LC = 1 MSD - 1 VSD = (1 MSD) / N_vsd',
    inputs: [
      { id: 'msd', label: 'Main Scale Division (1 MSD)', unit: 'mm', default: 1.0, min: 0.01, step: 0.1 },
      { id: 'n', label: 'Total Vernier Scale Divisions (N)', unit: 'divisions', default: 50, min: 2, step: 1, helper: 'Common engineering verniers have 20 or 50 divisions' }
    ],
    notes: 'LC = Value of 1 Main Scale Division divided by total number of divisions on the vernier scale.'
  },
  {
    id: 'micrometer_least_count',
    name: 'Micrometer Screw Gauge Least Count',
    category: 'metrology',
    icon: '🔬',
    description: 'Instrument sensitivity and resolution from spindle screw pitch and thimble divisions.',
    formulaDisplay: 'LC = Screw Pitch / Number of Circular Divisions',
    inputs: [
      { id: 'pitch', label: 'Screw Pitch (Linear travel per 1 turn)', unit: 'mm', default: 0.5, min: 0.01, step: 0.1, helper: 'Standard metric micrometers have 0.5 mm pitch' },
      { id: 'divs', label: 'Circular Thimble Divisions', unit: 'divisions', default: 50, min: 1, step: 1, helper: 'Typically 50 or 100 circular divisions' }
    ],
    notes: 'Standard metric micrometer has 0.5 mm pitch with 50 divisions yielding LC = 0.01 mm (10 µm).'
  },
  {
    id: 'measurement_error',
    name: 'Absolute, Relative & Percentage Error',
    category: 'metrology',
    icon: '🎯',
    description: 'Systematic accuracy validation comparing measured values against true/nominal standards.',
    formulaDisplay: 'Error = Measured - True  |  % Error = (|Error| / |True|) × 100%',
    inputs: [
      { id: 'measured', label: 'Measured Value (X_m)', unit: '', default: 50.18, step: 0.01 },
      { id: 'true_val', label: 'True / Standard Reference Value (X_true)', unit: '', default: 50.00, step: 0.01 }
    ],
    notes: 'True reference value cannot be zero for percentage error calculation.'
  },

  // ================= EXPANDED ENGINEERING CALCULATORS =================
  {
    id: 'beam_bending',
    name: 'Beam Bending Stress (Flexure Formula)',
    category: 'mechanics',
    icon: '🏗️',
    description: 'Calculate maximum flexural tensile or compressive normal stress in a loaded beam.',
    formulaDisplay: 'σ = (M × y) / I = M / Z',
    inputs: [
      { id: 'M', label: 'Bending Moment (M)', unit: 'N·m', default: 4500, min: 0, step: 50 },
      { id: 'b', label: 'Beam Width (b)', unit: 'mm', default: 50, min: 0.1, step: 5 },
      { id: 'h', label: 'Beam Height (h)', unit: 'mm', default: 100, min: 0.1, step: 5 }
    ],
    notes: 'Computes rectangular section modulus Z = b·h²/6 and peak outer fiber stress σ_max = M / Z.'
  },
  {
    id: 'angle_of_twist',
    name: 'Shaft Torsional Deflection (Twist Angle)',
    category: 'machine_design',
    icon: '🌀',
    description: 'Angular torsional deflection of a circular shaft subjected to twisting moment.',
    formulaDisplay: 'θ = (T × L) / (G × J)',
    inputs: [
      { id: 'T', label: 'Torque (T)', unit: 'N·m', default: 600, min: 0.1, step: 10 },
      { id: 'L', label: 'Shaft Length (L)', unit: 'm', default: 1.5, min: 0.01, step: 0.1 },
      { id: 'd', label: 'Shaft Diameter (d)', unit: 'mm', default: 45, min: 1, step: 1 },
      { id: 'G_GPa', label: 'Modulus of Rigidity (G)', unit: 'GPa', default: 79.3, min: 1, step: 0.5, helper: 'Steel G ≈ 79.3 GPa' }
    ],
    notes: 'Uses polar second moment of area J = π d⁴ / 32. Returns deflection in both radians and degrees.'
  },
  {
    id: 'thin_cylinder',
    name: 'Thin Pressure Vessel Hoop & Long Stress',
    category: 'mechanics',
    icon: '🛢️',
    description: 'Circumferential hoop stress and longitudinal stress in thin-walled cylindrical shells.',
    formulaDisplay: 'σ_hoop = (p × d) / (2t)  |  σ_long = (p × d) / (4t)',
    inputs: [
      { id: 'p', label: 'Internal Pressure (p)', unit: 'bar', default: 12, min: 0.01, step: 0.5, helper: '12 bar = 1.2 MPa' },
      { id: 'd', label: 'Internal Diameter (d)', unit: 'mm', default: 500, min: 1, step: 10 },
      { id: 't', label: 'Shell Wall Thickness (t)', unit: 'mm', default: 6, min: 0.1, step: 0.5 }
    ],
    notes: 'Valid for thin-walled vessels where d/t ≥ 20. Hoop stress is twice the longitudinal stress.'
  },
  {
    id: 'darcy_weisbach',
    name: 'Darcy-Weisbach Pipe Friction Head Loss',
    category: 'fluids',
    icon: '🚰',
    description: 'Frictional head loss and pressure drop along circular pipelines in steady flow.',
    formulaDisplay: 'h_f = f × (L / D) × (V² / 2g)',
    inputs: [
      { id: 'f', label: 'Darcy Friction Factor (f)', unit: '', default: 0.02, min: 0.001, max: 0.2, step: 0.001, helper: 'Typical commercial pipes f = 0.015 to 0.035' },
      { id: 'L', label: 'Pipe Length (L)', unit: 'm', default: 120, min: 0.1, step: 5 },
      { id: 'D', label: 'Pipe Internal Diameter (D)', unit: 'mm', default: 80, min: 1, step: 5 },
      { id: 'V', label: 'Flow Velocity (V)', unit: 'm/s', default: 2.2, min: 0.01, step: 0.1 }
    ],
    notes: 'Calculates dynamic head loss in meters and converts to pressure drop ΔP = ρ g h_f.'
  },
  {
    id: 'newton_cooling',
    name: 'Newton\'s Law of Convective Cooling',
    category: 'thermo',
    icon: '💨',
    description: 'Convective heat transfer rate between a solid surface and adjacent moving fluid.',
    formulaDisplay: 'Q_dot = h × A × (T_surface - T_fluid)',
    inputs: [
      { id: 'h', label: 'Convection Coefficient (h)', unit: 'W/(m²·K)', default: 45, min: 0.1, step: 5, helper: 'Free air ≈ 5-25, Forced air ≈ 25-250, Water ≈ 500-10000' },
      { id: 'A', label: 'Surface Contact Area (A)', unit: 'm²', default: 0.8, min: 0.001, step: 0.05 },
      { id: 'Ts', label: 'Surface Temp (T_s)', unit: '°C', default: 85, step: 1 },
      { id: 'Tinf', label: 'Fluid Bulk Temp (T_∞)', unit: '°C', default: 25, step: 1 }
    ],
    notes: 'Assumes steady-state convection with uniform temperature across the solid surface.'
  },
  {
    id: 'stefan_boltzmann',
    name: 'Stefan-Boltzmann Radiation Heat Transfer',
    category: 'thermo',
    icon: '☀️',
    description: 'Net radiative thermal power exchange between a surface and surroundings in Kelvin.',
    formulaDisplay: 'Q_dot = ε × σ × A × (T₁⁴ - T₂⁴)',
    inputs: [
      { id: 'eps', label: 'Surface Emissivity (ε)', unit: '', default: 0.85, min: 0.01, max: 1.0, step: 0.05, helper: 'Polished metal ≈ 0.05, Oxidized metal ≈ 0.8, Blackbody = 1.0' },
      { id: 'A', label: 'Radiating Surface Area (A)', unit: 'm²', default: 1.5, min: 0.001, step: 0.1 },
      { id: 'T1_C', label: 'Hot Surface Temp (T₁)', unit: '°C', default: 220, step: 5 },
      { id: 'T2_C', label: 'Surroundings Temp (T₂)', unit: '°C', default: 25, step: 5 }
    ],
    notes: 'Temperatures are automatically converted to absolute Kelvin (T_K = T_C + 273.15). Physical constant σ = 5.670374×10⁻⁸ W/(m²·K⁴).'
  },
  {
    id: 'cutting_speed',
    name: 'Machining Cutting Speed & Removal Rate (MRR)',
    category: 'machine_design',
    icon: '⚙️',
    description: 'Peripheral linear cutting speed V_c and material removal rate (MRR) for lathe turning.',
    formulaDisplay: 'V_c = (π × D × N) / 1000  |  MRR = V_c × f × d_cut',
    inputs: [
      { id: 'D', label: 'Workpiece Diameter (D)', unit: 'mm', default: 65, min: 0.1, step: 1 },
      { id: 'N', label: 'Spindle Speed (N)', unit: 'rpm', default: 800, min: 1, step: 10 },
      { id: 'f', label: 'Feed per Rev (f)', unit: 'mm/rev', default: 0.2, min: 0.01, step: 0.05 },
      { id: 'd_cut', label: 'Depth of Cut (d)', unit: 'mm', default: 1.5, min: 0.1, step: 0.2 }
    ],
    notes: 'Fundamental metal-cutting parameters for CNC and manual lathe turning operations.'
  },
  {
    id: 'beam_deflection',
    name: 'Beam Deflection & Bending Stiffness',
    category: 'mechanics',
    icon: '📏',
    description: 'Maximum elastic deflection and equivalent bending stiffness for standard beam load cases.',
    formulaDisplay: 'δ_max = (F × L³) / (C × E × I)',
    inputs: [
      { id: 'case_type', label: 'Beam Configuration', unit: '', type: 'select', default: 'simply_supported_point', options: [
        { value: 'simply_supported_point', label: 'Simply Supported - Center Point Load (C=48)' },
        { value: 'cantilever_point', label: 'Cantilever - Free End Point Load (C=3)' },
        { value: 'simply_supported_udl', label: 'Simply Supported - Total UDL W (C=384/5)' }
      ]},
      { id: 'F', label: 'Applied Force / Total Load (F)', unit: 'N', default: 5000, min: 1, step: 100 },
      { id: 'L', label: 'Span Length (L)', unit: 'm', default: 2.5, min: 0.1, step: 0.1 },
      { id: 'E_GPa', label: 'Young\'s Modulus (E)', unit: 'GPa', default: 200, min: 1, step: 5, helper: 'Structural Steel ≈ 200 GPa, Aluminum ≈ 70 GPa' },
      { id: 'I_cm4', label: 'Area Moment of Inertia (I)', unit: 'cm⁴', default: 450, min: 0.1, step: 10 }
    ],
    notes: 'Calculates maximum deflection in millimeters, flexural rigidity (EI), and beam stiffness (k = F/δ).'
  },
  {
    id: 'euler_buckling',
    name: 'Euler Column Buckling Critical Load',
    category: 'mechanics',
    icon: '🏛️',
    description: 'Theoretical elastic critical buckling load P_cr and buckling stress for slender columns.',
    formulaDisplay: 'P_cr = (π² × E × I) / (K × L)²',
    inputs: [
      { id: 'end_condition', label: 'End Boundary Condition', unit: '', type: 'select', default: 'pinned_pinned', options: [
        { value: 'pinned_pinned', label: 'Pinned - Pinned (K = 1.0)' },
        { value: 'fixed_fixed', label: 'Fixed - Fixed (K = 0.5)' },
        { value: 'fixed_pinned', label: 'Fixed - Pinned (K = 0.707)' },
        { value: 'fixed_free', label: 'Fixed - Free / Flagpole (K = 2.0)' }
      ]},
      { id: 'E_GPa', label: 'Young\'s Modulus (E)', unit: 'GPa', default: 205, min: 1, step: 5 },
      { id: 'I_cm4', label: 'Min Moment of Inertia (I_min)', unit: 'cm⁴', default: 120, min: 0.01, step: 5 },
      { id: 'L', label: 'Unsupported Length (L)', unit: 'm', default: 3.0, min: 0.1, step: 0.1 },
      { id: 'area_cm2', label: 'Cross-Sectional Area (A)', unit: 'cm²', default: 25, min: 0.1, step: 1 }
    ],
    notes: 'Applicable for slender columns where slenderness ratio λ exceeds the transition limit.'
  },
  {
    id: 'thermal_expansion',
    name: 'Thermal Expansion & Restrained Stress',
    category: 'mechanics',
    icon: '🌡️',
    description: 'Linear expansion ΔL and thermal stress induced under complete axial restraint.',
    formulaDisplay: 'ΔL = α × L × ΔT  |  σ_th = E × α × ΔT',
    inputs: [
      { id: 'L', label: 'Initial Length (L₀)', unit: 'm', default: 4.0, min: 0.01, step: 0.5 },
      { id: 'alpha_ppm', label: 'Thermal Expansion Coeff (α)', unit: 'µm/(m·°C)', default: 12.0, min: 0.1, step: 0.5, helper: 'Structural Steel ≈ 12, Al 6061 ≈ 23.4, Copper ≈ 16.5' },
      { id: 'delta_T', label: 'Temperature Change (ΔT)', unit: '°C', default: 60, min: -300, max: 2000, step: 5 },
      { id: 'E_GPa', label: 'Young\'s Modulus (E)', unit: 'GPa', default: 200, min: 1, step: 10 }
    ],
    notes: 'Input α is in parts per million (10⁻⁶/°C). Thermal stress assumes 100% rigid mechanical restraint.'
  },
  {
    id: 'bolt_torque',
    name: 'Bolted Joint Tightening Torque & Preload',
    category: 'machine_design',
    icon: '🔩',
    description: 'Required tightening torque T for a target bolt clamping preload F_i.',
    formulaDisplay: 'T = K × F_i × d',
    inputs: [
      { id: 'd_mm', label: 'Nominal Bolt Diameter (d)', unit: 'mm', default: 16, min: 1, step: 1, helper: 'e.g. M16 bolt = 16 mm' },
      { id: 'F_preload_kN', label: 'Target Bolt Preload (F_i)', unit: 'kN', default: 45, min: 0.1, step: 5 },
      { id: 'K_factor', label: 'Nut Torque Coefficient (K)', unit: '', default: 0.20, min: 0.05, max: 0.5, step: 0.01, helper: 'Dry steel ≈ 0.20, Lightly oiled ≈ 0.15, Anti-seize paste ≈ 0.12' }
    ],
    notes: 'Based on standard Shigley/ISO fastener torque-tension relationship.'
  },
  {
    id: 'drag_lift',
    name: 'Aerodynamic Drag & Lift Forces',
    category: 'fluids',
    icon: '✈️',
    description: 'Dynamic drag force F_D and aerodynamic lift F_L on a body moving through a fluid.',
    formulaDisplay: 'F_D = 0.5 × C_D × ρ × A × V²  |  F_L = 0.5 × C_L × ρ × A × V²',
    inputs: [
      { id: 'rho', label: 'Fluid Density (ρ)', unit: 'kg/m³', default: 1.225, min: 0.01, step: 0.1, helper: 'Sea-level air ≈ 1.225, Water ≈ 998' },
      { id: 'V', label: 'Flow Velocity (V)', unit: 'm/s', default: 30, min: 0.1, step: 1 },
      { id: 'A', label: 'Reference Area (A)', unit: 'm²', default: 2.2, min: 0.01, step: 0.1 },
      { id: 'Cd', label: 'Drag Coefficient (C_D)', unit: '', default: 0.32, min: 0.01, max: 2.5, step: 0.01, helper: 'Modern sedan ≈ 0.28-0.35, Sphere ≈ 0.47, Flat plate ≈ 1.28' },
      { id: 'Cl', label: 'Lift Coefficient (C_L)', unit: '', default: 0.15, min: -2.0, max: 4.0, step: 0.05 }
    ],
    notes: 'Also calculates dynamic pressure q = 0.5 ρ V² and aerodynamic propulsion power required P = F_D × V.'
  },
  {
    id: 'heat_exchanger_lmtd',
    name: 'Heat Exchanger LMTD & Heat Duty',
    category: 'thermo',
    icon: '🔄',
    description: 'Log-mean temperature difference (LMTD) and heat transfer rate for counter-current flow.',
    formulaDisplay: 'ΔT_lm = (ΔT₁ - ΔT₂) / ln(ΔT₁ / ΔT₂)  |  Q = U × A × ΔT_lm',
    inputs: [
      { id: 'Th_in', label: 'Hot Fluid Inlet (T_h,in)', unit: '°C', default: 95, step: 1 },
      { id: 'Th_out', label: 'Hot Fluid Outlet (T_h,out)', unit: '°C', default: 55, step: 1 },
      { id: 'Tc_in', label: 'Cold Fluid Inlet (T_c,in)', unit: '°C', default: 20, step: 1 },
      { id: 'Tc_out', label: 'Cold Fluid Outlet (T_c,out)', unit: '°C', default: 45, step: 1 },
      { id: 'U', label: 'Overall Heat Transfer Coeff (U)', unit: 'W/(m²·K)', default: 850, min: 1, step: 50 },
      { id: 'A', label: 'Heat Transfer Surface Area (A)', unit: 'm²', default: 6.5, min: 0.1, step: 0.5 }
    ],
    notes: 'Configured for counter-flow heat exchangers (ΔT₁ = Th_in - Tc_out, ΔT₂ = Th_out - Tc_in).'
  },
  {
    id: 'sensible_heat',
    name: 'Sensible Heat Transfer Rate',
    category: 'thermo',
    icon: '🔥',
    description: 'Thermal heat transfer rate Q required to heat or cool a flowing substance.',
    formulaDisplay: 'Q_dot = m_dot × c_p × (T_final - T_initial)',
    inputs: [
      { id: 'm_dot', label: 'Mass Flow Rate (m_dot)', unit: 'kg/s', default: 1.5, min: 0.001, step: 0.1 },
      { id: 'cp', label: 'Specific Heat Capacity (c_p)', unit: 'J/(kg·K)', default: 4184, min: 10, step: 100, helper: 'Liquid Water ≈ 4184, Air ≈ 1005, Engine Oil ≈ 1900' },
      { id: 'T_in', label: 'Inlet Temperature (T_in)', unit: '°C', default: 25, step: 1 },
      { id: 'T_out', label: 'Outlet Temperature (T_out)', unit: '°C', default: 75, step: 1 }
    ],
    notes: 'Calculates heat duty in kW and BTUs/hr for sizing heaters, coolers, and boilers.'
  },
  {
    id: 'milling_speed_feed',
    name: 'Milling Cutting Speed, Table Feed & MRR',
    category: 'machine_design',
    icon: '🔪',
    description: 'CNC/manual milling spindle speed, table feed rate, and volumetric material removal rate.',
    formulaDisplay: 'v_f = f_z × z × n  |  MRR = (w × a_p × v_f) / 1000',
    inputs: [
      { id: 'D', label: 'Cutter Diameter (D)', unit: 'mm', default: 20, min: 1, step: 1 },
      { id: 'vc', label: 'Target Cutting Speed (v_c)', unit: 'm/min', default: 150, min: 1, step: 10, helper: 'HSS steel ≈ 25-35, Carbide steel ≈ 100-200, Carbide Al ≈ 300-800' },
      { id: 'z', label: 'Number of Flutes / Teeth (z)', unit: '', default: 4, min: 1, step: 1 },
      { id: 'fz', label: 'Feed per Tooth (f_z)', unit: 'mm/tooth', default: 0.08, min: 0.001, step: 0.01 },
      { id: 'ap', label: 'Axial Depth of Cut (a_p)', unit: 'mm', default: 3.0, min: 0.1, step: 0.5 },
      { id: 'ae', label: 'Radial Width / Stepover (a_e)', unit: 'mm', default: 12.0, min: 0.1, step: 1 }
    ],
    notes: 'Computes spindle rpm N = (v_c × 1000)/(π × D), table feed v_f in mm/min, and MRR in cm³/min.'
  },
  {
    id: 'sheet_metal_bending',
    name: 'Sheet Metal Bend Allowance & Developed Length',
    category: 'machine_design',
    icon: '📐',
    description: 'Neutral axis bend allowance (BA) and flat blank flat development for sheet metal forming.',
    formulaDisplay: 'BA = (π / 180) × θ × (R + K × t)',
    inputs: [
      { id: 'angle_deg', label: 'Bend Angle (θ)', unit: 'deg', default: 90, min: 1, max: 180, step: 1 },
      { id: 'R', label: 'Inside Bend Radius (R)', unit: 'mm', default: 3.0, min: 0.1, step: 0.5 },
      { id: 't', label: 'Sheet Thickness (t)', unit: 'mm', default: 2.0, min: 0.1, step: 0.2 },
      { id: 'K_factor', label: 'K-Factor', unit: '', default: 0.40, min: 0.1, max: 0.8, step: 0.02, helper: 'Mild steel air bending ≈ 0.40 to 0.45; Soft copper ≈ 0.35' }
    ],
    notes: 'Calculates neutral axis arc length BA and outside setback OSSB for precise sheet unfolding.'
  },
  {
    id: 'natural_frequency',
    name: 'Vibration Natural Frequency & Critical Damping',
    category: 'mechanics',
    icon: '〰️',
    description: 'Undamped circular natural frequency ω_n, cyclic frequency f_n, and critical damping c_c.',
    formulaDisplay: 'ω_n = √(k / m)  |  f_n = ω_n / 2π  |  c_c = 2√(k × m)',
    inputs: [
      { id: 'k', label: 'System Stiffness (k)', unit: 'N/mm', default: 250, min: 0.01, step: 10 },
      { id: 'm', label: 'Vibrating Mass (m)', unit: 'kg', default: 15, min: 0.01, step: 1 },
      { id: 'c', label: 'Viscous Damping Coeff (c)', unit: 'N·s/m', default: 80, min: 0, step: 5 }
    ],
    notes: 'System stiffness k in N/mm is converted to N/m (×1000). Calculates damping ratio ζ = c / c_c.'
  }
];


