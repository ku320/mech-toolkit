/**
 * Mechanical Engineer Toolkit - Engineering Formula Reference Library
 * Comprehensive encyclopedia of mechanical engineering equations, variable definitions,
 * standard SI units, assumptions, worked examples, and direct links to calculators.
 */

export const FORMULAS = [
  // ================= STATICS & DYNAMICS =================
  {
    id: 'f_force',
    name: 'Newton\'s Second Law of Motion',
    category: 'mechanics',
    expression: 'F = m · a',
    description: 'Relates net unbalanced force on a body to its mass and linear acceleration.',
    variables: [
      { symbol: 'F', name: 'Net Force', unit: 'N (kg·m/s²)' },
      { symbol: 'm', name: 'Mass of body', unit: 'kg' },
      { symbol: 'a', name: 'Linear Acceleration', unit: 'm/s²' }
    ],
    assumptions: 'Constant mass, non-relativistic speeds, single inertial reference frame.',
    example: 'An accelerating automobile of mass 1200 kg with acceleration 3.5 m/s² requires F = 1200 × 3.5 = 4200 N.',
    calculatorId: 'force'
  },
  {
    id: 'f_weight',
    name: 'Gravitational Force / Weight',
    category: 'mechanics',
    expression: 'W = m · g',
    description: 'Downward gravitational force exerted by Earth or a planetary body on an object.',
    variables: [
      { symbol: 'W', name: 'Weight force', unit: 'N' },
      { symbol: 'm', name: 'Body mass', unit: 'kg' },
      { symbol: 'g', name: 'Local gravitational acceleration', unit: 'm/s² (Earth standard: 9.80665)' }
    ],
    assumptions: 'Assumes uniform gravitational field over the object dimensions.',
    example: 'A machine component of mass 85 kg on Earth weighs W = 85 × 9.80665 = 833.57 N.',
    calculatorId: 'weight'
  },
  {
    id: 'f_torque',
    name: 'Torque / Moment of Force',
    category: 'mechanics',
    expression: 'T = F · r · sin(θ)',
    description: 'Rotational tendency produced by a force applied at a distance from a pivot axis.',
    variables: [
      { symbol: 'T', name: 'Torque magnitude', unit: 'N·m' },
      { symbol: 'F', name: 'Applied force magnitude', unit: 'N' },
      { symbol: 'r', name: 'Moment arm radius from axis', unit: 'm' },
      { symbol: 'θ', name: 'Angle between force and radius vectors', unit: 'deg / rad' }
    ],
    assumptions: 'Rigid body rotation about a defined fixed axis.',
    example: 'Tightening a cylinder head bolt with 250 N force perpendicular (90°) on a 0.4 m wrench: T = 250 × 0.4 × 1 = 100 N·m.',
    calculatorId: 'torque'
  },
  {
    id: 'f_rot_power',
    name: 'Rotational Shaft Power',
    category: 'mechanics',
    expression: 'P = (2π · N · T) / 60 = T · ω',
    description: 'Mechanical power transmitted by a rotating shaft from rotational speed and torque.',
    variables: [
      { symbol: 'P', name: 'Shaft Power', unit: 'W (Watts)' },
      { symbol: 'N', name: 'Rotational speed', unit: 'rpm' },
      { symbol: 'T', name: 'Torque', unit: 'N·m' },
      { symbol: 'ω', name: 'Angular velocity', unit: 'rad/s' }
    ],
    assumptions: 'Steady rotational speed and uniform torque distribution over time.',
    example: 'An electric motor delivering 150 N·m at 1450 rpm produces P = (2π × 1450 × 150)/60 = 22,776 W (22.78 kW).',
    calculatorId: 'power_rot'
  },
  {
    id: 'f_centrifugal_force',
    name: 'Centrifugal / Centripetal Force',
    category: 'mechanics',
    expression: 'F_c = m · r · ω² = (m · V²) / r',
    description: 'Apparent outward inertial force experienced in a rotating frame of reference.',
    variables: [
      { symbol: 'F_c', name: 'Centrifugal Force', unit: 'N' },
      { symbol: 'm', name: 'Mass of rotating component', unit: 'kg' },
      { symbol: 'r', name: 'Radius from center of rotation', unit: 'm' },
      { symbol: 'ω', name: 'Angular velocity', unit: 'rad/s' },
      { symbol: 'V', name: 'Tangential velocity', unit: 'm/s' }
    ],
    assumptions: 'Uniform circular motion at constant angular speed.',
    example: 'A turbine blade of mass 0.5 kg at radius 0.4 m spinning at 3000 rpm (ω = 314.16 rad/s) experiences F_c = 0.5 × 0.4 × (314.16)² = 19,739 N (19.74 kN).',
    calculatorId: 'force'
  },
  {
    id: 'f_work',
    name: 'Mechanical Work Done',
    category: 'mechanics',
    expression: 'W = F · d · cos(θ)',
    description: 'Scalar product of force vector and linear displacement vector.',
    variables: [
      { symbol: 'W', name: 'Work Done', unit: 'J (Joules = N·m)' },
      { symbol: 'F', name: 'Applied force', unit: 'N' },
      { symbol: 'd', name: 'Displacement', unit: 'm' },
      { symbol: 'θ', name: 'Angle between force and motion', unit: 'deg' }
    ],
    assumptions: 'Constant force magnitude and direction throughout displacement.',
    example: 'Hauling a machine frame with 600 N force at 20° angle across 15 m: W = 600 × 15 × cos(20°) = 8457.2 J (8.46 kJ).',
    calculatorId: 'work'
  },

  // ================= STRENGTH OF MATERIALS & STRUCTURES =================
  {
    id: 'f_stress',
    name: 'Direct Normal Stress (Axial)',
    category: 'mechanics',
    expression: 'σ = F / A',
    description: 'Internal resistance force per unit cross-sectional area under axial tension or compression.',
    variables: [
      { symbol: 'σ', name: 'Normal stress', unit: 'Pa (N/m²) or MPa (N/mm²)' },
      { symbol: 'F', name: 'Axial internal load', unit: 'N' },
      { symbol: 'A', name: 'Resisting cross-sectional area', unit: 'm² or mm²' }
    ],
    assumptions: 'Saint-Venant\'s principle applies; uniform stress distribution away from discontinuities; load passes through centroid.',
    example: 'A 20 mm diameter steel rod (A = 314.16 mm²) carrying a 45 kN tensile load develops σ = 45000 / 314.16 = 143.2 MPa.',
    calculatorId: 'stress'
  },
  {
    id: 'f_strain',
    name: 'Normal Engineering Strain',
    category: 'mechanics',
    expression: 'ε = ΔL / L₀',
    description: 'Ratio of deformation elongation or shortening to the initial undeformed gauge length.',
    variables: [
      { symbol: 'ε', name: 'Engineering strain', unit: 'Dimensionless (m/m)' },
      { symbol: 'ΔL', name: 'Elongation change in length', unit: 'm or mm' },
      { symbol: 'L₀', name: 'Original gauge length', unit: 'm or mm' }
    ],
    assumptions: 'Small deformation theory; uniform elongation across the gauge section.',
    example: 'A 250 mm tensile specimen elongates by 0.5 mm under load: ε = 0.5 / 250 = 0.002 (0.2% strain, 2000 µε).',
    calculatorId: 'strain'
  },
  {
    id: 'f_hooke',
    name: 'Hooke\'s Law (1-D Elasticity)',
    category: 'mechanics',
    expression: 'σ = E · ε',
    description: 'Linear relationship between stress and strain within the proportional elastic limit.',
    variables: [
      { symbol: 'σ', name: 'Normal Stress', unit: 'MPa' },
      { symbol: 'E', name: 'Modulus of Elasticity (Young\'s Modulus)', unit: 'GPa (e.g. Steel ≈ 200 GPa)' },
      { symbol: 'ε', name: 'Elastic strain', unit: 'dimensionless' }
    ],
    assumptions: 'Homogeneous, isotropic material operating strictly within the elastic limit.',
    example: 'Steel (E = 205 GPa) strained to 0.001 experiences σ = 205,000 × 0.001 = 205 MPa.',
    calculatorId: 'stress'
  },
  {
    id: 'f_beam_bending',
    name: 'Euler-Bernoulli Beam Bending Stress',
    category: 'mechanics',
    expression: 'σ = (M · y) / I = M / Z',
    description: 'Flexural normal stress developed in a beam subjected to bending moment.',
    variables: [
      { symbol: 'σ', name: 'Bending stress at distance y from neutral axis', unit: 'Pa or MPa' },
      { symbol: 'M', name: 'Internal bending moment', unit: 'N·m' },
      { symbol: 'y', name: 'Perpendicular distance from neutral axis', unit: 'm or mm' },
      { symbol: 'I', name: 'Second moment of area of cross-section', unit: 'm⁴ or mm⁴' },
      { symbol: 'Z', name: 'Section modulus (I / y_max)', unit: 'm³ or mm³' }
    ],
    assumptions: 'Plane sections remain plane; linear elastic material; pure bending without shear distortion; symmetric section.',
    example: 'A rectangular beam (b=50 mm, h=100 mm, Z = b·h²/6 = 83,333 mm³) under 5 kN·m moment: σ_max = 5×10⁶ / 83333 = 60.0 MPa.',
    calculatorId: 'beam_bending'
  },
  {
    id: 'f_angle_of_twist',
    name: 'Torsional Deflection (Angle of Twist)',
    category: 'machine_design',
    expression: 'θ = (T · L) / (G · J)',
    description: 'Total angular twist in radians of a cylindrical shaft subjected to twisting torque.',
    variables: [
      { symbol: 'θ', name: 'Angle of twist', unit: 'rad (convert to deg: × 180/π)' },
      { symbol: 'T', name: 'Twisting moment', unit: 'N·m' },
      { symbol: 'L', name: 'Shaft length', unit: 'm' },
      { symbol: 'G', name: 'Shear modulus of rigidity', unit: 'Pa or GPa (Steel ≈ 79 GPa)' },
      { symbol: 'J', name: 'Polar second moment of area (π d⁴ / 32)', unit: 'm⁴' }
    ],
    assumptions: 'Uniform circular cross-section, linear elastic shear deformation, no warping.',
    example: 'A steel shaft (G = 80 GPa, d = 50 mm, J = 6.136×10⁻⁷ m⁴) of length 2 m under 800 N·m: θ = (800 × 2)/(80×10⁹ × 6.136×10⁻⁷) = 0.0326 rad (1.87°).',
    calculatorId: 'angle_of_twist'
  },
  {
    id: 'f_euler_buckling',
    name: 'Euler\'s Column Critical Buckling Load',
    category: 'mechanics',
    expression: 'P_cr = (π² · E · I) / (K · L)²',
    description: 'Maximum axial compressive load an elastic slender column can support before sudden lateral buckling failure.',
    variables: [
      { symbol: 'P_cr', name: 'Critical Buckling Load', unit: 'N or kN' },
      { symbol: 'E', name: 'Young\'s Modulus', unit: 'Pa' },
      { symbol: 'I', name: 'Minimum second moment of area', unit: 'm⁴' },
      { symbol: 'L', name: 'Actual column length', unit: 'm' },
      { symbol: 'K', name: 'Effective length factor', unit: 'Pinned-Pinned=1.0, Fixed-Free=2.0, Fixed-Fixed=0.5, Fixed-Pinned=0.7' }
    ],
    assumptions: 'Slender column (slenderness ratio > critical limit), pure axial compression, perfectly straight initially, elastic buckling.',
    example: 'A steel strut (E = 200 GPa, I = 8×10⁻⁸ m⁴, L = 2.5 m, pinned ends K = 1): P_cr = (π² × 200×10⁹ × 8×10⁻⁸) / (2.5)² = 25,266 N (25.27 kN).',
    calculatorId: 'stress'
  },
  {
    id: 'f_thermal_stress',
    name: 'Thermal Expansion & Restrained Stress',
    category: 'mechanics',
    expression: 'ΔL = α · L₀ · ΔT   |   σ_th = E · α · ΔT',
    description: 'Linear dimensional change due to temperature gradient and resulting stress when constrained.',
    variables: [
      { symbol: 'ΔL', name: 'Thermal expansion elongation', unit: 'm or mm' },
      { symbol: 'α', name: 'Linear thermal expansion coefficient', unit: '1/K or 1/°C (Steel ≈ 12×10⁻⁶)' },
      { symbol: 'L₀', name: 'Initial undeformed length', unit: 'm' },
      { symbol: 'ΔT', name: 'Temperature difference', unit: 'K or °C' },
      { symbol: 'σ_th', name: 'Induced thermal stress under full constraint', unit: 'Pa or MPa' }
    ],
    assumptions: 'Homogeneous material, unyielding rigid boundary supports for stress formula, uniform temperature change.',
    example: 'A 10 m steel rail heated by ΔT = 35°C expands by ΔL = 12×10⁻⁶ × 10 × 35 = 4.2 mm. If fully clamped: σ = 200,000 × 12×10⁻⁶ × 35 = 84 MPa compressive.',
    calculatorId: 'stress'
  },
  {
    id: 'f_thin_vessel_cyl',
    name: 'Thin-Walled Cylindrical Vessel Stresses',
    category: 'mechanics',
    expression: 'σ_hoop = (p · d) / (2t)   |   σ_long = (p · d) / (4t)',
    description: 'Circumferential (hoop) and longitudinal membrane tensile stresses in thin pressurized cylinders.',
    variables: [
      { symbol: 'σ_hoop', name: 'Hoop / Circumferential stress', unit: 'Pa or MPa' },
      { symbol: 'σ_long', name: 'Longitudinal / Axial stress', unit: 'Pa or MPa' },
      { symbol: 'p', name: 'Internal gauge fluid pressure', unit: 'Pa or MPa' },
      { symbol: 'd', name: 'Internal diameter of cylinder', unit: 'm or mm' },
      { symbol: 't', name: 'Wall thickness (must satisfy t ≤ d/10)', unit: 'm or mm' }
    ],
    assumptions: 'Thin wall approximation (ratio of diameter to wall thickness d/t ≥ 20); uniform membrane stress across thickness; negligible radial stress.',
    example: 'A 600 mm diameter air receiver pipe with 6 mm wall under 1.5 MPa: σ_hoop = (1.5 × 600) / (2 × 6) = 75 MPa; σ_long = 37.5 MPa.',
    calculatorId: 'thin_cylinder'
  },
  {
    id: 'f_mohr_circle',
    name: '2-D Plane Stress Principal Stresses',
    category: 'mechanics',
    expression: 'σ₁,₂ = (σ_x + σ_y)/2 ± √[ ((σ_x - σ_y)/2)² + τ_xy² ]',
    description: 'Maximum and minimum normal stresses acting on principal planes where shear stress is zero.',
    variables: [
      { symbol: 'σ₁,₂', name: 'Major and minor principal stresses', unit: 'MPa' },
      { symbol: 'σ_x, σ_y', name: 'Normal stresses along orthogonal axes', unit: 'MPa' },
      { symbol: 'τ_xy', name: 'Shear stress on xy plane', unit: 'MPa' },
      { symbol: 'τ_max', name: 'Maximum in-plane shear stress (radius of Mohr\'s circle)', unit: 'MPa' }
    ],
    assumptions: 'Plane stress state (σ_z = 0, τ_xz = τ_yz = 0); infinitesimal stress element.',
    example: 'For σ_x = 80 MPa, σ_y = 20 MPa, τ_xy = 40 MPa: Center = 50 MPa, Radius = √[30² + 40²] = 50 MPa. Therefore σ₁ = 100 MPa, σ₂ = 0 MPa, τ_max = 50 MPa.',
    calculatorId: 'stress'
  },
  {
    id: 'f_fos',
    name: 'Factor of Safety (Design Margin)',
    category: 'mechanics',
    expression: 'FoS = σ_yield / σ_working',
    description: 'Reserve capacity ratio ensuring structural members don\'t yield or fail under unexpected loads.',
    variables: [
      { symbol: 'FoS', name: 'Factor of Safety', unit: 'dimensionless' },
      { symbol: 'σ_yield', name: 'Yield strength or ultimate strength', unit: 'MPa' },
      { symbol: 'σ_working', name: 'Calculated peak working stress', unit: 'MPa' }
    ],
    assumptions: 'Deterministic load and static material properties.',
    example: 'Structural steel with 250 MPa yield subjected to 100 MPa working stress has FoS = 250 / 100 = 2.50.',
    calculatorId: 'fos'
  },

  // ================= MACHINE DESIGN & TRANSMISSION =================
  {
    id: 'f_torsion_shaft',
    name: 'Solid Shaft Torsional Shear Stress',
    category: 'machine_design',
    expression: 'τ = (16 · T) / (π · d³)  ⟹  d = [ (16 · T) / (π · τ) ]^(1/3)',
    description: 'Maximum surface torsional shear stress in a circular solid shaft subjected to twisting moment.',
    variables: [
      { symbol: 'd', name: 'Solid shaft diameter', unit: 'm or mm' },
      { symbol: 'T', name: 'Applied twisting torque', unit: 'N·m' },
      { symbol: 'τ', name: 'Allowable shear stress', unit: 'Pa or MPa' }
    ],
    assumptions: 'Pure torsion, circular cross-section remains plane, linear elastic material response.',
    example: 'For 500 N·m torque and allowable shear stress 40 MPa: d = [ (16 × 500) / (π × 40×10⁶) ]^(1/3) = 0.0399 m = 39.9 mm (spec 40 mm shaft).',
    calculatorId: 'shaft_diameter'
  },
  {
    id: 'f_gear_ratio',
    name: 'Gear Speed Ratio & Transmission',
    category: 'machine_design',
    expression: 'i = Z_driven / Z_driver = N_driver / N_driven',
    description: 'Kinematic relation between mating spur/helical gears regarding tooth numbers and shaft speeds.',
    variables: [
      { symbol: 'i', name: 'Gear reduction ratio', unit: 'ratio' },
      { symbol: 'Z_driver', name: 'Teeth on pinion/driver gear', unit: 'teeth' },
      { symbol: 'Z_driven', name: 'Teeth on driven wheel', unit: 'teeth' },
      { symbol: 'N', name: 'Rotational speed', unit: 'rpm' }
    ],
    assumptions: 'Involute tooth profile with conjugate action and zero slip.',
    example: 'An 18-tooth pinion driving a 72-tooth gear gives ratio i = 72/18 = 4.0. With 1440 rpm input, output is 360 rpm.',
    calculatorId: 'gear_ratio'
  },
  {
    id: 'f_lewis_gear',
    name: 'Lewis Spur Gear Bending Equation',
    category: 'machine_design',
    expression: 'σ = F_t / (b · m · Y)',
    description: 'Root bending stress on a spur gear tooth modeled as a cantilever beam.',
    variables: [
      { symbol: 'σ', name: 'Bending stress at tooth root fillet', unit: 'MPa' },
      { symbol: 'F_t', name: 'Tangential tooth transmitted load (2T / d_pitch)', unit: 'N' },
      { symbol: 'b', name: 'Gear face width', unit: 'mm' },
      { symbol: 'm', name: 'Gear module (d_pitch / Z)', unit: 'mm' },
      { symbol: 'Y', name: 'Lewis form factor based on tooth count', unit: 'dimensionless (e.g. 0.32)' }
    ],
    assumptions: 'Full load carried by single pair of teeth at the tooth tip; uniform distribution across face width; neglect radial component.',
    example: 'A gear with F_t = 3200 N, face width b = 30 mm, module m = 4 mm, Y = 0.32 experiences root stress σ = 3200 / (30 × 4 × 0.32) = 83.3 MPa.',
    calculatorId: 'shaft_diameter'
  },
  {
    id: 'f_flywheel_ke',
    name: 'Flywheel Kinetic Energy & Inertia',
    category: 'machine_design',
    expression: 'E_k = ½ · I · ω² = ½ · m · k² · ω²',
    description: 'Rotational kinetic energy stored in a flywheel rim to smooth cyclic torque fluctuations.',
    variables: [
      { symbol: 'E_k', name: 'Stored kinetic energy', unit: 'J' },
      { symbol: 'I', name: 'Mass moment of inertia (m · k²)', unit: 'kg·m²' },
      { symbol: 'm', name: 'Flywheel mass', unit: 'kg' },
      { symbol: 'k', name: 'Radius of gyration', unit: 'm' },
      { symbol: 'ω', name: 'Mean angular speed', unit: 'rad/s' }
    ],
    assumptions: 'Rim carries predominant inertia; hub and spokes contribution approximated or neglected.',
    example: 'A 250 kg flywheel rim with radius of gyration k = 0.6 m spinning at 600 rpm (ω = 62.83 rad/s): I = 250 × 0.36 = 90 kg·m²; E_k = 0.5 × 90 × (62.83)² = 177.6 kJ.',
    calculatorId: 'power_rot'
  },
  {
    id: 'f_clutch_torque',
    name: 'Single Plate Clutch Torque Capacity',
    category: 'machine_design',
    expression: 'T = n · μ · W · R_m   (Uniform Wear: R_m = (R₁ + R₂)/2)',
    description: 'Frictional torque transmitted across mating clutch disc friction faces under axial clamp load.',
    variables: [
      { symbol: 'T', name: 'Transmissible friction torque', unit: 'N·m' },
      { symbol: 'n', name: 'Number of active friction contact pairs (usually 2 for single plate)', unit: 'pairs' },
      { symbol: 'μ', name: 'Friction coefficient', unit: 'dimensionless (e.g. 0.35)' },
      { symbol: 'W', name: 'Total axial clamping spring load', unit: 'N' },
      { symbol: 'R_m', name: 'Mean effective friction radius', unit: 'm' }
    ],
    assumptions: 'Uniform wear theory applies after running-in (axial wear is uniform across the disc surface).',
    example: 'For n = 2, μ = 0.35, W = 2500 N, R₁ = 0.12 m, R₂ = 0.08 m (R_m = 0.10 m): T = 2 × 0.35 × 2500 × 0.10 = 175 N·m.',
    calculatorId: 'torque'
  },
  {
    id: 'f_bearing_life',
    name: 'ISO 281 Rolling Bearing Rating Life',
    category: 'machine_design',
    expression: 'L₁₀ = (C / P)^p · 10⁶ revolutions',
    description: 'Calculates the nominal rating life exceeded by 90% of a group of identical bearings before fatigue.',
    variables: [
      { symbol: 'L₁₀', name: 'Basic rating life', unit: 'revolutions (10⁶)' },
      { symbol: 'C', name: 'Basic dynamic load rating from manufacturer', unit: 'kN' },
      { symbol: 'P', name: 'Equivalent dynamic radial/axial load', unit: 'kN' },
      { symbol: 'p', name: 'Life exponent', unit: 'p = 3 (ball bearings), p = 10/3 (roller bearings)' }
    ],
    assumptions: 'Clean lubrication, proper alignment, ISO 281 standard fatigue failure mode.',
    example: 'A ball bearing (p=3) with C = 32 kN operating under P = 8 kN has L₁₀ = (32/8)³ = 4³ = 64 million revolutions.',
    calculatorId: 'bearing_life'
  },
  {
    id: 'f_helical_spring',
    name: 'Helical Spring Stiffness Rate',
    category: 'machine_design',
    expression: 'k = (G · d⁴) / (8 · D³ · N_a)',
    description: 'Linear spring rate of an open-coiled or closed-coiled cylindrical helical compression spring.',
    variables: [
      { symbol: 'k', name: 'Spring stiffness rate', unit: 'N/mm' },
      { symbol: 'G', name: 'Torsional modulus of wire', unit: 'MPa or GPa' },
      { symbol: 'd', name: 'Wire diameter', unit: 'mm' },
      { symbol: 'D', name: 'Mean coil diameter', unit: 'mm' },
      { symbol: 'N_a', name: 'Active coils count', unit: 'coils' }
    ],
    assumptions: 'Pure torsion governs deflection; pitch angle is small (< 10°); active coils operate freely.',
    example: 'A spring with d = 4 mm, D = 30 mm, Na = 10, G = 79,300 MPa has k = (79300 × 256) / (8 × 27000 × 10) = 9.40 N/mm.',
    calculatorId: 'spring_calc'
  },

  // ================= FLUID MECHANICS & HYDRAULICS =================
  {
    id: 'f_reynolds',
    name: 'Reynolds Number (Pipe Flow)',
    category: 'fluids',
    expression: 'Re = (ρ · V · D) / μ = (V · D) / ν',
    description: 'Dimensionless parameter predicting whether fluid flow will be laminar, transitional, or turbulent.',
    variables: [
      { symbol: 'Re', name: 'Reynolds number', unit: 'dimensionless' },
      { symbol: 'ρ', name: 'Fluid density', unit: 'kg/m³' },
      { symbol: 'V', name: 'Average flow velocity', unit: 'm/s' },
      { symbol: 'D', name: 'Pipe internal diameter', unit: 'm' },
      { symbol: 'μ', name: 'Dynamic viscosity', unit: 'Pa·s (kg/m·s)' },
      { symbol: 'ν', name: 'Kinematic viscosity (μ/ρ)', unit: 'm²/s' }
    ],
    assumptions: 'Newtonian fluid, fully developed internal flow in circular ducts.',
    example: 'Water at 20°C (ρ=998, μ=0.001002) flowing at 1.5 m/s in a 50 mm pipe gives Re = (998 × 1.5 × 0.05)/0.001002 = 74,700 (Turbulent).',
    calculatorId: 'reynolds'
  },
  {
    id: 'f_darcy_weisbach',
    name: 'Darcy-Weisbach Pipe Head Loss',
    category: 'fluids',
    expression: 'h_f = f · (L / D) · (V² / 2g)',
    description: 'Frictional head loss along a conduit of length L due to fluid viscosity and wall roughness.',
    variables: [
      { symbol: 'h_f', name: 'Friction head loss', unit: 'm of fluid' },
      { symbol: 'f', name: 'Darcy friction factor (laminar: 64/Re, turbulent: Moody diagram)', unit: 'dimensionless' },
      { symbol: 'L', name: 'Pipe length', unit: 'm' },
      { symbol: 'D', name: 'Internal diameter', unit: 'm' },
      { symbol: 'V', name: 'Mean flow velocity', unit: 'm/s' },
      { symbol: 'g', name: 'Gravitational acceleration (9.80665)', unit: 'm/s²' }
    ],
    assumptions: 'Steady incompressible pipe flow; fully developed velocity profile.',
    example: 'For f = 0.02, L = 100 m, D = 0.1 m, V = 2 m/s: h_f = 0.02 × (100/0.1) × (4 / (2 × 9.81)) = 4.08 meters head loss.',
    calculatorId: 'darcy_weisbach'
  },
  {
    id: 'f_continuity',
    name: 'Conservation of Mass (Continuity Equation)',
    category: 'fluids',
    expression: 'ρ₁ · A₁ · V₁ = ρ₂ · A₂ · V₂  ⟹  A₁ · V₁ = A₂ · V₂ (incompressible)',
    description: 'States that fluid mass entering a control volume must equal mass exiting under steady conditions.',
    variables: [
      { symbol: 'A', name: 'Cross-sectional flow area', unit: 'm²' },
      { symbol: 'V', name: 'Average cross-sectional velocity', unit: 'm/s' },
      { symbol: 'Q', name: 'Volumetric flow rate (A · V)', unit: 'm³/s' }
    ],
    assumptions: 'Steady 1-D flow, no fluid storage, constant density throughout cross-section.',
    example: 'A pipe narrowing from 100 mm (A₁ = 0.00785 m²) to 50 mm (A₂ = 0.00196 m²) with V₁ = 2 m/s accelerates to V₂ = 2 × (100/50)² = 8 m/s.',
    calculatorId: 'continuity'
  },
  {
    id: 'f_bernoulli',
    name: 'Bernoulli Streamline Equation',
    category: 'fluids',
    expression: 'p / (ρ · g) + V² / (2g) + z = constant',
    description: 'Expresses conservation of mechanical energy along an ideal fluid streamline.',
    variables: [
      { symbol: 'p / (ρg)', name: 'Pressure head', unit: 'm of fluid' },
      { symbol: 'V² / (2g)', name: 'Velocity head (kinetic energy)', unit: 'm' },
      { symbol: 'z', name: 'Elevation / potential head', unit: 'm' }
    ],
    assumptions: 'Inviscid (frictionless), incompressible, steady flow along an irrotational streamline.',
    example: 'In a horizontal venturi tube (z₁ = z₂), an increase in velocity causes a corresponding drop in static pressure.',
    calculatorId: 'bernoulli'
  },
  {
    id: 'f_venturi_flow',
    name: 'Venturi Meter Flow Rate Equation',
    category: 'fluids',
    expression: 'Q = C_d · [ (A₁ · A₂) / √(A₁² - A₂²) ] · √(2g · Δh)',
    description: 'Volumetric flow discharge rate derived from differential manometer height across a venturi constriction.',
    variables: [
      { symbol: 'Q', name: 'Actual volumetric flow rate', unit: 'm³/s' },
      { symbol: 'C_d', name: 'Discharge coefficient (typically 0.96 - 0.98)', unit: 'dimensionless' },
      { symbol: 'A₁, A₂', name: 'Inlet and throat cross-sectional areas', unit: 'm²' },
      { symbol: 'Δh', name: 'Differential piezometric head', unit: 'm of fluid' }
    ],
    assumptions: 'Steady incompressible liquid flow; small frictional boundary dissipation represented by C_d.',
    example: 'A venturi with A₁ = 0.03 m², A₂ = 0.01 m², C_d = 0.98, Δh = 0.5 m water column yields Q = 0.0315 m³/s (31.5 L/s).',
    calculatorId: 'continuity'
  },
  {
    id: 'f_drag_force',
    name: 'Aerodynamic / Hydrodynamic Drag Force',
    category: 'fluids',
    expression: 'F_D = ½ · C_D · ρ · A · V²',
    description: 'Resistance force exerted by a moving fluid on a submerged solid body opposite to relative motion.',
    variables: [
      { symbol: 'F_D', name: 'Total drag force', unit: 'N' },
      { symbol: 'C_D', name: 'Drag coefficient', unit: 'dimensionless (e.g. Sphere ≈ 0.47, Airfoil ≈ 0.04)' },
      { symbol: 'ρ', name: 'Fluid density', unit: 'kg/m³' },
      { symbol: 'A', name: 'Frontal projected area', unit: 'm²' },
      { symbol: 'V', name: 'Relative flow velocity', unit: 'm/s' }
    ],
    assumptions: 'High Reynolds number flow where pressure drag dominates or empirical C_D captures total skin and form drag.',
    example: 'A passenger vehicle (A = 2.2 m², C_D = 0.30) cruising in air (ρ = 1.2 kg/m³) at 100 km/h (27.78 m/s): F_D = 0.5 × 0.3 × 1.2 × 2.2 × (27.78)² = 305.5 N.',
    calculatorId: 'force'
  },
  {
    id: 'f_mach_number',
    name: 'Mach Number & Speed of Sound',
    category: 'fluids',
    expression: 'Ma = V / c   |   c = √(γ · R · T)',
    description: 'Compressibility parameter comparing vehicle velocity to the local speed of sound in an ideal gas.',
    variables: [
      { symbol: 'Ma', name: 'Mach number', unit: 'dimensionless (Ma < 0.3 incompressible, > 1 supersonic)' },
      { symbol: 'c', name: 'Speed of sound in gas', unit: 'm/s' },
      { symbol: 'γ', name: 'Specific heat ratio (c_p / c_v, Air = 1.40)', unit: 'ratio' },
      { symbol: 'R', name: 'Specific gas constant (Air = 287 J/kg·K)', unit: 'J/(kg·K)' },
      { symbol: 'T', name: 'Absolute gas temperature', unit: 'Kelvin (K)' }
    ],
    assumptions: 'Ideal gas behavior; isentropic acoustic wave propagation.',
    example: 'In air at 15°C (288.15 K): c = √(1.4 × 287 × 288.15) = 340.3 m/s. An aircraft flying at 250 m/s has Ma = 250 / 340.3 = 0.735 (Subsonic).',
    calculatorId: 'ideal_gas'
  },
  {
    id: 'f_hydro_power',
    name: 'Hydraulic Fluid Power',
    category: 'fluids',
    expression: 'P_hyd = ρ · g · Q · H = Δp · Q',
    description: 'Work done per unit time on or by a fluid stream through dynamic head and flow rate.',
    variables: [
      { symbol: 'P_hyd', name: 'Hydraulic Power', unit: 'W or kW' },
      { symbol: 'Q', name: 'Volumetric flow rate', unit: 'm³/s' },
      { symbol: 'H', name: 'Total dynamic head', unit: 'm' },
      { symbol: 'Δp', name: 'Pressure difference (ρ · g · H)', unit: 'Pa' }
    ],
    assumptions: 'Continuous liquid stream, incompressible fluid.',
    example: 'Pumping 0.025 m³/s of water across 40 m head requires ideal hydraulic power P = 1000 × 9.81 × 0.025 × 40 = 9810 W (9.81 kW).',
    calculatorId: 'hydraulic_power'
  },

  // ================= THERMODYNAMICS & HEAT TRANSFER =================
  {
    id: 'f_carnot',
    name: 'Carnot Cycle Maximum Efficiency',
    category: 'thermo',
    expression: 'η_carnot = 1 - (T_cold / T_hot)',
    description: 'Maximum theoretical efficiency any heat engine can achieve operating between two temperatures.',
    variables: [
      { symbol: 'η', name: 'Thermal efficiency limit', unit: 'dimensionless / %' },
      { symbol: 'T_hot', name: 'Absolute hot source temperature', unit: 'Kelvin (K)' },
      { symbol: 'T_cold', name: 'Absolute cold sink temperature', unit: 'Kelvin (K)' }
    ],
    assumptions: 'Reversible cycle (Carnot engine), zero friction, isothermal heat transfers and isentropic work transfers.',
    example: 'Operating between 600°C (873.15 K) and 30°C (303.15 K): η = 1 - (303.15 / 873.15) = 65.28%.',
    calculatorId: 'carnot_eff'
  },
  {
    id: 'f_otto_cycle',
    name: 'Otto Cycle Air-Standard Efficiency',
    category: 'thermo',
    expression: 'η_otto = 1 - (1 / r^(γ - 1))',
    description: 'Thermal efficiency of the ideal 4-stroke spark-ignition internal combustion engine cycle.',
    variables: [
      { symbol: 'η_otto', name: 'Air-standard Otto efficiency', unit: 'dimensionless or %' },
      { symbol: 'r', name: 'Compression ratio (V_max / V_min)', unit: 'ratio (typically 8 to 12)' },
      { symbol: 'γ', name: 'Heat capacity ratio (c_p / c_v, Air = 1.4)', unit: 'ratio' }
    ],
    assumptions: 'Air-standard cycle: constant specific heats; isentropic compression and expansion; constant-volume heat addition.',
    example: 'For compression ratio r = 9.5 and γ = 1.4: η_otto = 1 - (1 / 9.5^0.4) = 1 - (1 / 2.46) = 0.594 (59.4%).',
    calculatorId: 'carnot_eff'
  },
  {
    id: 'f_fourier',
    name: 'Fourier\'s Law of Thermal Conduction',
    category: 'thermo',
    expression: 'Q̇ = (k · A · ΔT) / L',
    description: 'Rate of conductive heat transfer through a solid planar medium under temperature gradient.',
    variables: [
      { symbol: 'Q̇', name: 'Rate of heat flow', unit: 'W (J/s)' },
      { symbol: 'k', name: 'Thermal conductivity of material', unit: 'W/(m·K)' },
      { symbol: 'A', name: 'Heat transfer surface area', unit: 'm²' },
      { symbol: 'ΔT', name: 'Temperature difference (|T₁ - T₂|)', unit: 'K or °C' },
      { symbol: 'L', name: 'Conduction thickness / distance', unit: 'm' }
    ],
    assumptions: 'Steady-state 1-D heat flow, isotropic material with constant thermal conductivity, no internal heat sources.',
    example: 'A 200 mm brick wall (k = 0.8 W/m·K, A = 12 m²) with ΔT = 20°C transfers Q = (0.8 × 12 × 20) / 0.20 = 960 W.',
    calculatorId: 'conduction_heat'
  },
  {
    id: 'f_newton_cooling',
    name: 'Newton\'s Law of Convective Cooling',
    category: 'thermo',
    expression: 'Q̇ = h · A · (T_s - T_∞)',
    description: 'Rate of convective heat transfer between a solid wetted surface and an adjacent moving fluid stream.',
    variables: [
      { symbol: 'Q̇', name: 'Convective heat transfer rate', unit: 'W' },
      { symbol: 'h', name: 'Convective heat transfer coefficient', unit: 'W/(m²·K)' },
      { symbol: 'A', name: 'Solid contact surface area', unit: 'm²' },
      { symbol: 'T_s', name: 'Surface temperature of solid', unit: '°C or K' },
      { symbol: 'T_∞', name: 'Bulk fluid free-stream temperature', unit: '°C or K' }
    ],
    assumptions: 'Uniform convective heat transfer coefficient h across the entire heat exchange area A.',
    example: 'A heat sink of area 0.15 m² at 65°C in ambient air at 25°C with forced air convection h = 45 W/m²·K dissipates Q = 45 × 0.15 × (65 - 25) = 270 W.',
    calculatorId: 'newton_cooling'
  },
  {
    id: 'f_stefan_boltzmann',
    name: 'Stefan-Boltzmann Law of Radiation',
    category: 'thermo',
    expression: 'Q̇ = ε · σ · A · (T₁⁴ - T₂⁴)',
    description: 'Net rate of radiative electromagnetic thermal emission exchange between a gray body surface and surroundings.',
    variables: [
      { symbol: 'Q̇', name: 'Net radiative heat exchange', unit: 'W' },
      { symbol: 'ε', name: 'Surface emissivity (0 < ε ≤ 1.0, blackbody = 1.0)', unit: 'dimensionless' },
      { symbol: 'σ', name: 'Stefan-Boltzmann physical constant (5.670374×10⁻⁸)', unit: 'W/(m²·K⁴)' },
      { symbol: 'A', name: 'Radiating surface area', unit: 'm²' },
      { symbol: 'T₁, T₂', name: 'Absolute temperatures in KELVIN', unit: 'K' }
    ],
    assumptions: 'Diffuse-gray surface approximation; large isothermal surroundings.',
    example: 'An oxidized steel pipe (ε = 0.8, A = 2 m²) at 200°C (473.15 K) in a room at 20°C (293.15 K): Q = 0.8 × 5.67×10⁻⁸ × 2 × (473.15⁴ - 293.15⁴) = 3881.8 W (3.88 kW).',
    calculatorId: 'stefan_boltzmann'
  },
  {
    id: 'f_ideal_gas',
    name: 'Ideal Gas Law Equation of State',
    category: 'thermo',
    expression: 'P · V = n · R_univ · T   or   p = ρ · R_spec · T',
    description: 'Relates pressure, volume, temperature, and mass for ideal gases at low to moderate pressures.',
    variables: [
      { symbol: 'p', name: 'Absolute pressure', unit: 'Pa' },
      { symbol: 'ρ', name: 'Gas density', unit: 'kg/m³' },
      { symbol: 'R_spec', name: 'Specific gas constant (R_univ / M)', unit: 'J/(kg·K) (Air = 287.05)' },
      { symbol: 'T', name: 'Absolute temperature', unit: 'Kelvin (K)' }
    ],
    assumptions: 'Point-mass gas particles, negligible intermolecular attraction, elastic collisions.',
    example: 'Air at 101,325 Pa and 20°C (293.15 K) has density ρ = 101325 / (287.05 × 293.15) = 1.204 kg/m³.',
    calculatorId: 'ideal_gas'
  },

  // ================= MANUFACTURING & MACHINING TECHNOLOGY =================
  {
    id: 'f_cutting_speed',
    name: 'Machining Cutting Speed (Turning & Milling)',
    category: 'machine_design',
    expression: 'V_c = (π · D · N) / 1000',
    description: 'Linear peripheral speed of workpiece or cutting tool edge relative to the cut surface in meters per minute.',
    variables: [
      { symbol: 'V_c', name: 'Cutting speed', unit: 'm/min' },
      { symbol: 'D', name: 'Workpiece or cutter diameter', unit: 'mm' },
      { symbol: 'N', name: 'Spindle rotational speed', unit: 'rpm' }
    ],
    assumptions: 'True circular rotation without runout or spindle speed droop under load.',
    example: 'Turning an 80 mm diameter steel bar at spindle speed N = 750 rpm gives V_c = (π × 80 × 750)/1000 = 188.5 m/min.',
    calculatorId: 'cutting_speed'
  },
  {
    id: 'f_mrr',
    name: 'Material Removal Rate (MRR) - Turning',
    category: 'machine_design',
    expression: 'MRR = V_c · f · d_cut · 1000',
    description: 'Volumetric rate of metal stock chip removal per unit machining time.',
    variables: [
      { symbol: 'MRR', name: 'Material Removal Rate', unit: 'mm³/min' },
      { symbol: 'V_c', name: 'Cutting speed', unit: 'm/min' },
      { symbol: 'f', name: 'Feed rate per revolution', unit: 'mm/rev' },
      { symbol: 'd_cut', name: 'Radial depth of cut', unit: 'mm' }
    ],
    assumptions: 'Constant orthogonal depth of cut and steady linear carriage feed.',
    example: 'With V_c = 150 m/min, feed f = 0.25 mm/rev, depth d = 2.0 mm: MRR = 150 × 0.25 × 2.0 × 1000 = 75,000 mm³/min (75 cm³/min).',
    calculatorId: 'cutting_speed'
  },
  {
    id: 'f_taylor_tool',
    name: 'Taylor\'s Tool Life Equation',
    category: 'machine_design',
    expression: 'V · T^n = C',
    description: 'Empirical relationship between cutting speed V and tool wear endurance life T in machining.',
    variables: [
      { symbol: 'V', name: 'Cutting velocity', unit: 'm/min' },
      { symbol: 'T', name: 'Tool life before resharpening/indexing', unit: 'minutes' },
      { symbol: 'n', name: 'Taylor exponent (HSS: 0.1-0.15, Carbide: 0.2-0.4, Ceramic: 0.4-0.6)', unit: 'dimensionless' },
      { symbol: 'C', name: 'Machinability constant (speed for 1 minute tool life)', unit: 'm/min' }
    ],
    assumptions: 'Consistent workpiece hardness, uniform flank wear criterion (e.g. VB = 0.3 mm), constant coolant lubrication.',
    example: 'For carbide tool with n = 0.25, C = 350: at V = 120 m/min, tool life T = (350 / 120)^(1 / 0.25) = (2.916)⁴ = 72.3 minutes.',
    calculatorId: 'cutting_speed'
  },

  // ================= METROLOGY & PRECISION =================
  {
    id: 'f_vernier_lc',
    name: 'Vernier Caliper Least Count',
    category: 'metrology',
    expression: 'LC = 1 MSD - 1 VSD = (1 MSD) / N_vsd',
    description: 'Minimum measurable increment of a vernier scale determined by graduation differences.',
    variables: [
      { symbol: 'LC', name: 'Least Count', unit: 'mm' },
      { symbol: 'MSD', name: 'Value of 1 Main Scale Division', unit: 'mm (usually 1.0 mm)' },
      { symbol: 'N_vsd', name: 'Total Vernier Scale Divisions', unit: 'divisions (e.g. 50)' }
    ],
    assumptions: 'N vernier divisions equal exactly (N - 1) main scale divisions.',
    example: 'With 1 MSD = 1 mm and 50 vernier divisions: LC = 1 / 50 = 0.02 mm (20 µm).',
    calculatorId: 'vernier_least_count'
  },
  {
    id: 'f_micrometer_lc',
    name: 'Micrometer Screw Gauge Least Count',
    category: 'metrology',
    expression: 'LC = Pitch / Circular Scale Divisions',
    description: 'Axial advance per circular thimble increment in a precision micrometer spindle.',
    variables: [
      { symbol: 'LC', name: 'Least Count', unit: 'mm' },
      { symbol: 'Pitch', name: 'Lead/Pitch of screw thread (1 turn travel)', unit: 'mm (typically 0.5 mm)' },
      { symbol: 'Divisions', name: 'Divisions on rotating thimble scale', unit: 'divisions (typically 50)' }
    ],
    assumptions: 'Uniform thread pitch without backlash or lead screw cumulative pitch error.',
    example: 'A micrometer with 0.5 mm pitch and 50 circular divisions has LC = 0.5 / 50 = 0.01 mm (10 µm).',
    calculatorId: 'micrometer_least_count'
  },
  {
    id: 'f_pct_error',
    name: 'Measurement Percentage Error',
    category: 'metrology',
    expression: '% Error = ( |Measured - True| / |True| ) · 100%',
    description: 'Relative accuracy metric comparing experimental measurement to accepted true reference.',
    variables: [
      { symbol: '% Error', name: 'Percentage relative error', unit: '%' },
      { symbol: 'Measured', name: 'Instrument readout value', unit: 'same as true' },
      { symbol: 'True', name: 'Standard reference / nominal value', unit: 'same as measured' }
    ],
    assumptions: 'True reference standard is non-zero and traceable to certified metrology standards.',
    example: 'Measuring a gauge block nominal 50.00 mm as 50.15 mm yields % Error = (|50.15 - 50.00| / 50.00) × 100% = 0.30%.',
    calculatorId: 'measurement_error'
  },
  {
    id: 'f_sine_bar',
    name: 'Sine Bar Precision Angle Measurement',
    category: 'metrology',
    expression: 'sin(θ) = H / L  ⟹  θ = arcsin(H / L)',
    description: 'Trigonometric setup using slip gauge block stacks to measure taper angles with high precision.',
    variables: [
      { symbol: 'θ', name: 'Taper / Inclination angle', unit: 'deg' },
      { symbol: 'H', name: 'Height of slip gauge block pack', unit: 'mm' },
      { symbol: 'L', name: 'Center distance between sine bar rollers (standard 100 mm or 200 mm)', unit: 'mm' }
    ],
    assumptions: 'Rollers are identical in diameter, perfectly cylindrical, and resting on a precision granite surface plate.',
    example: 'On a 200 mm sine bar, slip gauge pack height H = 51.7638 mm gives sin(θ) = 51.7638 / 200 = 0.258819 ⟹ θ = 15.0° exact.',
    calculatorId: 'measurement_error'
  },

  // ================= EXTENDED ADVANCED ENGINEERING FORMULAS =================
  {
    id: 'f_beam_deflection_lib',
    name: 'Euler-Bernoulli Beam Deflection & Bending Rigidity',
    category: 'mechanics',
    expression: 'δ_max = (F · L³) / (C · E · I)   |   EI = Flexural Rigidity',
    description: 'Elastic deflection of slender prismatic beams subjected to transverse point or distributed forces.',
    variables: [
      { symbol: 'δ_max', name: 'Peak transverse deflection', unit: 'm / mm' },
      { symbol: 'F', name: 'Applied transverse load / total load', unit: 'N' },
      { symbol: 'L', name: 'Unsupported span length', unit: 'm' },
      { symbol: 'E', name: 'Elastic modulus of material', unit: 'Pa (N/m²)' },
      { symbol: 'I', name: 'Area moment of inertia of section', unit: 'm⁴' },
      { symbol: 'C', name: 'Boundary constant (SS center load C=48, Cantilever C=3, SS UDL C=76.8)', unit: 'dimensionless' }
    ],
    assumptions: 'Small deflections (linear elasticity), plane sections remain plane (Euler-Bernoulli hypothesis), isotropic homogeneous material.',
    example: 'A simply supported steel beam (E = 200 GPa, I = 450 cm⁴) of span 2.5 m with center load 5000 N yields δ = (5000 × 2.5³) / (48 × 200×10⁹ × 450×10⁻⁸) = 1.81 mm.',
    calculatorId: 'beam_deflection'
  },
  {
    id: 'f_euler_buckling_lib',
    name: 'Euler Slender Column Critical Buckling Load',
    category: 'mechanics',
    expression: 'P_cr = (π² · E · I) / (K · L)²   |   σ_cr = P_cr / A',
    description: 'Bifurcation instability threshold beyond which slender structural columns buckle elastically under axial compression.',
    variables: [
      { symbol: 'P_cr', name: 'Euler critical buckling load', unit: 'N / kN' },
      { symbol: 'E', name: 'Young\'s elastic modulus', unit: 'Pa' },
      { symbol: 'I', name: 'Minimum area moment of inertia', unit: 'm⁴' },
      { symbol: 'L', name: 'Unsupported column length', unit: 'm' },
      { symbol: 'K', name: 'Effective length factor (Pinned-Pinned=1.0, Fixed-Fixed=0.5, Cantilever=2.0)', unit: 'dimensionless' },
      { symbol: 'σ_cr', name: 'Critical buckling compressive stress', unit: 'MPa' }
    ],
    assumptions: 'Slender column (slenderness ratio λ > transition limit), perfectly straight central axis, concentric axial load.',
    example: 'A steel column (E = 205 GPa, I = 120 cm⁴) of length 3 m with pinned ends (K = 1) buckles at P_cr = (π² × 205×10⁹ × 120×10⁻⁸) / 3² = 269.7 kN.',
    calculatorId: 'euler_buckling'
  },
  {
    id: 'f_thermal_expansion_lib',
    name: 'Linear Thermal Expansion & Restrained Thermal Stress',
    category: 'mechanics',
    expression: 'ΔL = α · L₀ · ΔT   |   σ_th = E · α · ΔT',
    description: 'Dimensional change due to temperature fluctuations and induced internal stress when thermal strain is mechanically constrained.',
    variables: [
      { symbol: 'ΔL', name: 'Change in longitudinal length', unit: 'm / mm' },
      { symbol: 'α', name: 'Coefficient of linear thermal expansion', unit: '1/°C or 1/K' },
      { symbol: 'L₀', name: 'Initial component length', unit: 'm' },
      { symbol: 'ΔT', name: 'Temperature change (T_final - T_initial)', unit: '°C / K' },
      { symbol: 'σ_th', name: 'Internal thermal stress under full restraint', unit: 'Pa / MPa' }
    ],
    assumptions: 'Constant α over operating temperature interval, homogeneous material, 100% rigid unyielding axial constraints.',
    example: 'A 4 m structural steel member (α = 12×10⁻⁶ /°C, E = 200 GPa) heated by ΔT = 60°C expands by ΔL = 12×10⁻⁶ × 4 × 60 = 2.88 mm. If restrained, σ = 144 MPa compressive.',
    calculatorId: 'thermal_expansion'
  },
  {
    id: 'f_von_mises',
    name: 'Von Mises Distortion Energy Yield Criterion',
    category: 'mechanics',
    expression: 'σ_v = √[ 0.5 · ((σ₁ - σ₂)² + (σ₂ - σ₃)² + (σ₃ - σ₁)²) ]',
    description: 'Equivalent scalar stress predicting yielding of ductile engineering metals under complex multiaxial states of stress.',
    variables: [
      { symbol: 'σ_v', name: 'Von Mises equivalent effective stress', unit: 'MPa / Pa' },
      { symbol: 'σ₁, σ₂, σ₃', name: 'Principal normal stresses', unit: 'MPa' },
      { symbol: 'σ_x, σ_y, τ_xy', name: '2D plane stress components', unit: 'MPa' }
    ],
    assumptions: 'Isotropic ductile metal, yielding is governed purely by distortion/shear strain energy (hydrostatic pressure does not cause yielding).',
    example: 'Under pure torsion with shear stress τ = 100 MPa, the von Mises stress is σ_v = √(3 · 100²) = 173.2 MPa.',
    calculatorId: 'stress'
  },
  {
    id: 'f_tresca_shear',
    name: 'Tresca Maximum Shear Stress Yield Criterion',
    category: 'mechanics',
    expression: 'τ_max = (σ₁ - σ₃) / 2   ⟹   σ_tresca = σ₁ - σ₃',
    description: 'Conservative ductile yield criterion stating yielding begins when maximum absolute shear stress equals tensile yield shear.',
    variables: [
      { symbol: 'τ_max', name: 'Maximum absolute shear stress', unit: 'MPa' },
      { symbol: 'σ₁', name: 'Maximum principal stress', unit: 'MPa' },
      { symbol: 'σ₃', name: 'Minimum principal stress', unit: 'MPa' }
    ],
    assumptions: 'Ductile material behavior; predicts equal yield in tension and compression.',
    example: 'For principal stresses σ₁ = 220 MPa, σ₂ = 80 MPa, σ₃ = -60 MPa, τ_max = (220 - (-60)) / 2 = 140 MPa.',
    calculatorId: 'stress'
  },
  {
    id: 'f_resilience_modulus',
    name: 'Modulus of Resilience & Elastic Strain Energy',
    category: 'mechanics',
    expression: 'u_r = σ_y² / (2 · E)   |   U = u_r · Volume',
    description: 'Capacity of an engineering material to absorb energy when deformed elastically and release it upon unloading.',
    variables: [
      { symbol: 'u_r', name: 'Modulus of resilience', unit: 'J/m³ (Pa)' },
      { symbol: 'σ_y', name: 'Tensile yield strength', unit: 'Pa (N/m²)' },
      { symbol: 'E', name: 'Young\'s modulus of elasticity', unit: 'Pa' },
      { symbol: 'U', name: 'Total elastic strain energy', unit: 'J (Joules)' }
    ],
    assumptions: 'Linear elastic behavior up to the proportional yield limit.',
    example: 'High-strength spring steel with σ_y = 1100 MPa and E = 206 GPa has resilience u_r = (1100×10⁶)² / (2 × 206×10⁹) = 2.94 MJ/m³.',
    calculatorId: 'stress'
  },
  {
    id: 'f_bolt_torque_lib',
    name: 'Bolted Joint Preload & Tightening Torque',
    category: 'machine_design',
    expression: 'T = K · F_i · d',
    description: 'Fundamental relationship relating applied wrench tightening torque to resulting axial clamping preload in threaded fasteners.',
    variables: [
      { symbol: 'T', name: 'Tightening torque applied to bolt/nut', unit: 'N·m' },
      { symbol: 'K', name: 'Nut friction factor / torque coefficient', unit: 'dimensionless (~0.20 dry, ~0.15 oiled)' },
      { symbol: 'F_i', name: 'Initial clamping tensile preload', unit: 'N / kN' },
      { symbol: 'd', name: 'Nominal outer thread diameter', unit: 'm / mm' }
    ],
    assumptions: 'Standard ISO 60° metric thread geometry, uniform thread engagement, steady tightening.',
    example: 'Tightening an M16 bolt (d = 0.016 m) to 45 kN preload with dry threads (K = 0.20) requires T = 0.20 × 45,000 × 0.016 = 144 N·m (106 ft·lb).',
    calculatorId: 'bolt_torque'
  },
  {
    id: 'f_sommerfeld_bearing',
    name: 'Sommerfeld Number (Hydrodynamic Journal Bearings)',
    category: 'machine_design',
    expression: 'S = (r / c)² · (μ · N / P)',
    description: 'Dimensionless design parameter characterizing film thickness, load capacity, and lubrication regime in journal bearings.',
    variables: [
      { symbol: 'S', name: 'Sommerfeld number', unit: 'dimensionless' },
      { symbol: 'r', name: 'Journal radius', unit: 'm' },
      { symbol: 'c', name: 'Radial clearance', unit: 'm' },
      { symbol: 'μ', name: 'Dynamic lubricant viscosity', unit: 'Pa·s' },
      { symbol: 'N', name: 'Journal rotational speed', unit: 'rev/s' },
      { symbol: 'P', name: 'Bearing unit projected load (W / (2r·L))', unit: 'Pa (N/m²)' }
    ],
    assumptions: 'Full hydrodynamic fluid film, laminar flow, no shaft deflection or oil aeration.',
    example: 'A clearance ratio r/c = 1000, viscosity 0.02 Pa·s, speed 30 rev/s, and pressure 1.5 MPa gives S = 1000² × (0.02 × 30 / 1.5×10⁶) = 0.40.',
    calculatorId: 'bearing_life'
  },
  {
    id: 'f_belt_tension_ratio',
    name: 'Belt Drive Limiting Tension Ratio (Belt Friction)',
    category: 'machine_design',
    expression: 'T₁ / T₂ = e^(μ · θ / sin(β/2))   |   Power = (T₁ - T₂) · v',
    description: 'Governs maximum torque capacity before slip occurs on flat belts (β=180°) and V-belts of groove angle β.',
    variables: [
      { symbol: 'T₁', name: 'Tight side belt tension', unit: 'N' },
      { symbol: 'T₂', name: 'Slack side belt tension', unit: 'N' },
      { symbol: 'μ', name: 'Coefficient of friction between belt and pulley', unit: 'dimensionless' },
      { symbol: 'θ', name: 'Angle of belt wrap / contact', unit: 'rad' },
      { symbol: 'β', name: 'V-belt groove angle (typically 36° to 40°)', unit: 'deg / rad' }
    ],
    assumptions: 'Flexible extensible belt in steady motion at low speed (negligible centrifugal tension effect).',
    example: 'A flat belt with μ = 0.30 and wrap θ = π rad (180°) has limiting tension ratio T₁/T₂ = e^(0.30 × π) = 2.566.',
    calculatorId: 'belt_length'
  },
  {
    id: 'f_fillet_weld',
    name: 'Fillet Weld Throat Shear Stress',
    category: 'machine_design',
    expression: 'τ = P / (0.707 · h · L)',
    description: 'Standard weld sizing calculation computing nominal shear stress across the minimum throat plane of a fillet weld.',
    variables: [
      { symbol: 'τ', name: 'Shear stress in weld throat', unit: 'MPa / Pa' },
      { symbol: 'P', name: 'Applied shear or tensile load', unit: 'N' },
      { symbol: 'h', name: 'Weld leg size', unit: 'mm' },
      { symbol: '0.707 · h', name: 'Effective throat dimension (t_w)', unit: 'mm' },
      { symbol: 'L', name: 'Effective length of weld seam', unit: 'mm' }
    ],
    assumptions: 'Equal leg fillet weld (45°), stress assumed uniformly distributed along effective length.',
    example: 'An 8 mm fillet weld of length 150 mm supporting 60 kN load has throat shear τ = 60,000 / (0.707 × 8 × 150) = 70.7 MPa.',
    calculatorId: 'stress'
  },
  {
    id: 'f_lame_thick_cylinder',
    name: 'Lamé Equations for Thick-Walled Cylinders',
    category: 'machine_design',
    expression: 'σ_θ = A + B/r²   |   σ_r = A - B/r²',
    description: 'Radial and hoop stresses across the wall thickness of thick-walled cylinders subjected to internal and external pressure.',
    variables: [
      { symbol: 'σ_θ', name: 'Hoop / Circumferential stress at radius r', unit: 'MPa' },
      { symbol: 'σ_r', name: 'Radial normal stress at radius r', unit: 'MPa' },
      { symbol: 'r_i, r_o', name: 'Inner and outer radii of cylinder', unit: 'mm / m' },
      { symbol: 'P_i, P_o', name: 'Internal and external pressures', unit: 'MPa' }
    ],
    assumptions: 'Plane strain / open ends, wall thickness > 0.1 × radius, isotropic linear elastic material.',
    example: 'Peak tensile hoop stress occurs on the inside surface r = r_i where σ_θ = P_i · (r_o² + r_i²) / (r_o² - r_i²).',
    calculatorId: 'thin_cylinder'
  },
  {
    id: 'f_drag_lift_lib',
    name: 'Aerodynamic Drag & Dynamic Lift Forces',
    category: 'fluids',
    expression: 'F_D = 0.5 · C_D · ρ · A · V²   |   F_L = 0.5 · C_L · ρ · A · V²',
    description: 'Fluid dynamic resistance and lifting forces acting on a body in relative motion with an ambient fluid.',
    variables: [
      { symbol: 'F_D', name: 'Drag force resisting motion', unit: 'N' },
      { symbol: 'F_L', name: 'Lift force perpendicular to flow', unit: 'N' },
      { symbol: 'C_D, C_L', name: 'Dimensionless drag and lift coefficients', unit: 'dimensionless' },
      { symbol: 'ρ', name: 'Fluid mass density', unit: 'kg/m³' },
      { symbol: 'A', name: 'Reference frontal or planform area', unit: 'm²' },
      { symbol: 'V', name: 'Relative flow velocity', unit: 'm/s' }
    ],
    assumptions: 'Uniform incoming free-stream flow, constant fluid density (low Mach incompressible regime).',
    example: 'A car with C_D = 0.32, frontal area 2.2 m² at 30 m/s (108 km/h) in air (1.225 kg/m³) experiences F_D = 0.5 × 0.32 × 1.225 × 2.2 × 30² = 388 N.',
    calculatorId: 'drag_lift'
  },
  {
    id: 'f_pipe_minor_loss',
    name: 'Pipe Fitting & Valve Minor Head Loss',
    category: 'fluids',
    expression: 'h_m = K_L · (V² / (2 · g))   |   ΔP_m = K_L · (0.5 · ρ · V²)',
    description: 'Localized energy dissipation caused by pipe flow disruptions (elbows, tees, valves, entrances, exits).',
    variables: [
      { symbol: 'h_m', name: 'Minor head loss', unit: 'm of fluid' },
      { symbol: 'K_L', name: 'Minor loss coefficient of fitting', unit: 'dimensionless (90° elbow ≈ 0.9, Globe valve ≈ 10)' },
      { symbol: 'V', name: 'Mean pipe flow velocity', unit: 'm/s' },
      { symbol: 'g', name: 'Gravitational acceleration', unit: '9.80665 m/s²' }
    ],
    assumptions: 'Fully developed turbulent flow before and downstream of the localized piping fitting.',
    example: 'Water flowing at 2.5 m/s through a 90° flanged elbow (K_L = 0.3) incurs loss h_m = 0.3 × (2.5² / (2 × 9.80665)) = 0.096 m.',
    calculatorId: 'darcy_weisbach'
  },
  {
    id: 'f_pitot_tube',
    name: 'Pitot-Static Tube Fluid Velocity',
    category: 'fluids',
    expression: 'V = √[ (2 · (P_stag - P_static)) / ρ ]',
    description: 'Derives local streamline velocity from differential stagnation and static pressure measurements.',
    variables: [
      { symbol: 'V', name: 'Local fluid flow velocity', unit: 'm/s' },
      { symbol: 'P_stag', name: 'Stagnation / Total pressure', unit: 'Pa (N/m²)' },
      { symbol: 'P_static', name: 'Freestream static pressure', unit: 'Pa' },
      { symbol: 'ρ', name: 'Fluid density', unit: 'kg/m³' }
    ],
    assumptions: 'Incompressible frictionless flow along a streamline (Bernoulli applicable, Mach < 0.3).',
    example: 'A dynamic differential pressure (P_stag - P_stat) of 600 Pa in air (1.225 kg/m³) yields flow velocity V = √(2 × 600 / 1.225) = 31.3 m/s.',
    calculatorId: 'bernoulli'
  },
  {
    id: 'f_hydraulic_cylinder',
    name: 'Hydraulic Cylinder Force & Piston Velocity',
    category: 'fluids',
    expression: 'F = P · A   |   v = Q / A',
    description: 'Actuator output force and extension velocity produced by pressurized fluid flowing into a piston chamber.',
    variables: [
      { symbol: 'F', name: 'Theoretical cylinder push/pull force', unit: 'N / kN' },
      { symbol: 'P', name: 'Hydraulic system gauge pressure', unit: 'Pa (N/m²)' },
      { symbol: 'A', name: 'Effective piston cross-sectional bore area', unit: 'm²' },
      { symbol: 'v', name: 'Piston linear travel speed', unit: 'm/s' },
      { symbol: 'Q', name: 'Supplied fluid volumetric flow rate', unit: 'm³/s' }
    ],
    assumptions: 'Incompressible hydraulic fluid, neglect seal frictional drag and internal leakage.',
    example: 'An 80 mm bore cylinder (A = 0.005027 m²) operating at 160 bar (16 MPa) generates F = 16×10⁶ × 0.005027 = 80.4 kN force.',
    calculatorId: 'hydraulic_power'
  },
  {
    id: 'f_lmtd_lib',
    name: 'Log-Mean Temperature Difference (LMTD) & Heat Exchanger Duty',
    category: 'thermo',
    expression: 'ΔT_lm = (ΔT₁ - ΔT₂) / ln(ΔT₁ / ΔT₂)   |   Q = U · A · ΔT_lm',
    description: 'Mean effective temperature driving force along the length of parallel and counter-current heat exchangers.',
    variables: [
      { symbol: 'ΔT_lm', name: 'Log-mean temperature difference', unit: '°C or K' },
      { symbol: 'ΔT₁', name: 'Approach temp diff at end 1 (T_h,in - T_c,out in counterflow)', unit: 'K' },
      { symbol: 'ΔT₂', name: 'Approach temp diff at end 2 (T_h,out - T_c,in in counterflow)', unit: 'K' },
      { symbol: 'U', name: 'Overall heat transfer coefficient', unit: 'W/(m²·K)' },
      { symbol: 'A', name: 'Effective heat exchange surface area', unit: 'm²' },
      { symbol: 'Q', name: 'Thermal heat duty', unit: 'W / kW' }
    ],
    assumptions: 'Constant overall U-value along exchanger length, steady-state heat transfer, no phase change or heat loss to surroundings.',
    example: 'Counterflow with ΔT₁ = 50 K and ΔT₂ = 35 K gives ΔT_lm = (50 - 35)/ln(50/35) = 42.05 K. With U=850 and A=6.5 m², Q = 232.3 kW.',
    calculatorId: 'heat_exchanger_lmtd'
  },
  {
    id: 'f_sensible_heat_lib',
    name: 'Sensible Heat Rate (Constant Pressure Calorimetry)',
    category: 'thermo',
    expression: 'Q̇ = ṁ · c_p · ΔT   |   ΔT = T_out - T_in',
    description: 'Heat transfer rate associated with raising or lowering temperature of a flowing fluid without undergoing phase change.',
    variables: [
      { symbol: 'Q̇', name: 'Heat transfer rate', unit: 'W / kW' },
      { symbol: 'ṁ', name: 'Fluid mass flow rate', unit: 'kg/s' },
      { symbol: 'c_p', name: 'Specific heat capacity at constant pressure', unit: 'J/(kg·K)' },
      { symbol: 'ΔT', name: 'Temperature change across boundary', unit: 'K / °C' }
    ],
    assumptions: 'Constant specific heat over the temperature span, single-phase liquid or ideal gas.',
    example: 'Heating 1.5 kg/s of water (c_p = 4184 J/(kg·K)) from 25°C to 75°C requires Q̇ = 1.5 × 4184 × (75 - 25) = 313.8 kW.',
    calculatorId: 'sensible_heat'
  },
  {
    id: 'f_brayton_cycle',
    name: 'Brayton Gas Turbine Cycle Thermal Efficiency',
    category: 'thermo',
    expression: 'η_th = 1 - ( 1 / r_p^((γ - 1) / γ) )',
    description: 'Ideal air-standard thermodynamic cycle efficiency for open/closed gas turbine engines as a function of pressure ratio.',
    variables: [
      { symbol: 'η_th', name: 'Thermal cycle efficiency', unit: 'dimensionless / %' },
      { symbol: 'r_p', name: 'Compressor pressure ratio (P₂ / P₁)', unit: 'dimensionless' },
      { symbol: 'γ', name: 'Ratio of specific heats (k = c_p / c_v, air ≈ 1.40)', unit: 'dimensionless' }
    ],
    assumptions: 'Isentropic compression and expansion, constant-pressure heat addition/rejection, cold-air standard assumptions.',
    example: 'A gas turbine with pressure ratio r_p = 12 and γ = 1.4 has ideal efficiency η = 1 - (1 / 12^(0.4/1.4)) = 1 - 0.4916 = 50.8%.',
    calculatorId: 'carnot_eff'
  },
  {
    id: 'f_diesel_cycle',
    name: 'Diesel Internal Combustion Cycle Efficiency',
    category: 'thermo',
    expression: 'η_diesel = 1 - (1 / r^(γ-1)) · [ (r_c^γ - 1) / (γ · (r_c - 1)) ]',
    description: 'Air-standard ideal cycle modeling compression ignition engines with constant-pressure combustion heat addition.',
    variables: [
      { symbol: 'η_diesel', name: 'Diesel cycle thermal efficiency', unit: 'dimensionless / %' },
      { symbol: 'r', name: 'Compression ratio (V_max / V_min)', unit: 'dimensionless (typically 14 to 22)' },
      { symbol: 'r_c', name: 'Cutoff ratio (V₃ / V₂)', unit: 'dimensionless (typically 1.5 to 3.0)' },
      { symbol: 'γ', name: 'Specific heat ratio (1.4 for air)', unit: 'dimensionless' }
    ],
    assumptions: 'Isentropic compression/expansion, constant-pressure heat addition, constant-volume heat rejection.',
    example: 'With r = 18, cutoff r_c = 2.0, and γ = 1.4, the bracket term is (2^1.4 - 1)/(1.4 × 1) = 1.17, giving η = 63.2%.',
    calculatorId: 'carnot_eff'
  },
  {
    id: 'f_sound_speed_gas',
    name: 'Speed of Sound in an Ideal Gas',
    category: 'thermo',
    expression: 'c = √( γ · R_specific · T )',
    description: 'Propagation speed of acoustic compression waves through a compressible gas medium.',
    variables: [
      { symbol: 'c', name: 'Speed of sound', unit: 'm/s' },
      { symbol: 'γ', name: 'Ratio of specific heats (c_p / c_v, air ≈ 1.4)', unit: 'dimensionless' },
      { symbol: 'R_specific', name: 'Specific gas constant (R_universal / M, air = 287.05 J/(kg·K))', unit: 'J/(kg·K)' },
      { symbol: 'T', name: 'Absolute gas temperature', unit: 'K (Kelvin)' }
    ],
    assumptions: 'Small amplitude isentropic acoustic disturbance, ideal gas behavior.',
    example: 'In standard atmospheric air at 20°C (293.15 K): c = √(1.4 × 287.05 × 293.15) = 343.2 m/s (1235.6 km/h).',
    calculatorId: 'ideal_gas'
  },
  {
    id: 'f_milling_lib',
    name: 'Milling Cutting Speed, Table Feed & Volumetric MRR',
    category: 'machine_design',
    expression: 'v_f = f_z · z · n   |   MRR = (a_e · a_p · v_f) / 1000',
    description: 'Kinematics and productivity formulas for CNC and manual multi-point milling cutter operations.',
    variables: [
      { symbol: 'v_f', name: 'Table linear feed speed', unit: 'mm/min' },
      { symbol: 'f_z', name: 'Feed per tooth / chip load', unit: 'mm/tooth' },
      { symbol: 'z', name: 'Number of cutter teeth / flutes', unit: 'teeth' },
      { symbol: 'n', name: 'Spindle rotational speed', unit: 'rpm' },
      { symbol: 'a_p', name: 'Axial depth of cut', unit: 'mm' },
      { symbol: 'a_e', name: 'Radial width of cut / stepover', unit: 'mm' },
      { symbol: 'MRR', name: 'Material removal rate', unit: 'cm³/min' }
    ],
    assumptions: 'Uniform spindle rotation, rigid workpiece and tool clamping, standard rectilinear feed direction.',
    example: 'A 4-flute cutter at 2387 rpm with f_z = 0.08 mm/tooth feeds at v_f = 0.08 × 4 × 2387 = 764 mm/min. With a_e=12 mm and a_p=3 mm, MRR = 27.5 cm³/min.',
    calculatorId: 'milling_speed_feed'
  },
  {
    id: 'f_sheet_metal_bend_lib',
    name: 'Sheet Metal Bend Allowance & Flat Pattern Development',
    category: 'machine_design',
    expression: 'BA = (π / 180) · θ · (R + K · t)   |   OSSB = tan(θ/2) · (R + t)',
    description: 'Neutral axis arc stretching allowance for sheet metal bending, forming, and precision unfolding CAD development.',
    variables: [
      { symbol: 'BA', name: 'Bend allowance arc length along neutral axis', unit: 'mm' },
      { symbol: 'θ', name: 'Bend angle in degrees', unit: 'deg' },
      { symbol: 'R', name: 'Inside bend radius', unit: 'mm' },
      { symbol: 't', name: 'Sheet metal thickness', unit: 'mm' },
      { symbol: 'K', name: 'K-factor neutral axis position shift (0.33 to 0.50)', unit: 'dimensionless' },
      { symbol: 'OSSB', name: 'Outside setback', unit: 'mm' }
    ],
    assumptions: 'Uniform strain along bend line, elastic springback compensated, material within ductility limits.',
    example: 'A 90° bend in 2 mm steel (R = 3 mm, K = 0.40) has neutral radius R_n = 3 + 0.4×2 = 3.8 mm, yielding BA = (π/180) × 90 × 3.8 = 5.969 mm.',
    calculatorId: 'sheet_metal_bending'
  },
  {
    id: 'f_blanking_force',
    name: 'Sheet Metal Punching & Blanking Force',
    category: 'machine_design',
    expression: 'F = L · t · τ_u   |   τ_u ≈ 0.8 · σ_uts',
    description: 'Peak press ram force required to punch holes or shear contours in sheet metal dies.',
    variables: [
      { symbol: 'F', name: 'Peak punching / blanking force', unit: 'N / kN' },
      { symbol: 'L', name: 'Total cut perimeter length (e.g. π · D for circular hole)', unit: 'mm' },
      { symbol: 't', name: 'Sheet thickness', unit: 'mm' },
      { symbol: 'τ_u', name: 'Ultimate shear strength of sheet metal', unit: 'MPa (N/mm²)' }
    ],
    assumptions: 'Flat punches without shear angle beveling, standard die clearance (5-10% of t).',
    example: 'Punching a 25 mm diameter hole (L = π × 25 = 78.54 mm) in 3 mm mild steel (τ_u = 320 MPa) requires F = 78.54 × 3 × 320 = 75.4 kN.',
    calculatorId: 'stress'
  },
  {
    id: 'f_true_stress_strain',
    name: 'True Stress and True Strain Plasticity Relations',
    category: 'mechanics',
    expression: 'ε_true = ln( 1 + ε_eng )   |   σ_true = σ_eng · ( 1 + ε_eng )',
    description: 'Instantaneous stress-strain measures accounting for actual cross-sectional reduction during large plastic deformation.',
    variables: [
      { symbol: 'ε_true', name: 'Natural / True logarithmic strain', unit: 'dimensionless' },
      { symbol: 'ε_eng', name: 'Engineering / Nominal strain (ΔL / L₀)', unit: 'dimensionless' },
      { symbol: 'σ_true', name: 'True flow stress based on current instantaneous area', unit: 'MPa' },
      { symbol: 'σ_eng', name: 'Engineering stress based on original initial area', unit: 'MPa' }
    ],
    assumptions: 'Constant material volume during plastic deformation (Poisson ratio ν = 0.5), valid up to necking point.',
    example: 'At an engineering strain of ε_eng = 0.25 and engineering stress σ_eng = 400 MPa: ε_true = ln(1.25) = 0.223, and σ_true = 400 × 1.25 = 500 MPa.',
    calculatorId: 'strain'
  },
  {
    id: 'f_natural_frequency_lib',
    name: 'SDOF Mechanical Vibration Natural Frequency & Damping',
    category: 'mechanics',
    expression: 'ω_n = √(k / m)   |   f_n = ω_n / (2π)   |   c_c = 2√(k · m)',
    description: 'Resonant frequency and damping characteristics of a single degree of freedom mass-spring-damper oscillator.',
    variables: [
      { symbol: 'ω_n', name: 'Circular undamped natural frequency', unit: 'rad/s' },
      { symbol: 'f_n', name: 'Cyclic natural frequency', unit: 'Hz' },
      { symbol: 'k', name: 'Equivalent system stiffness', unit: 'N/m' },
      { symbol: 'm', name: 'Lumped vibrating mass', unit: 'kg' },
      { symbol: 'c_c', name: 'Critical damping coefficient', unit: 'N·s/m' },
      { symbol: 'ζ', name: 'Viscous damping ratio (c / c_c)', unit: 'dimensionless' }
    ],
    assumptions: 'Single degree of freedom linear lumped parameter model, viscous damping.',
    example: 'A 15 kg machine on mounts with stiffness k = 250 N/mm (250,000 N/m) has ω_n = √(250,000 / 15) = 129.1 rad/s, f_n = 20.55 Hz, and c_c = 3873 N·s/m.',
    calculatorId: 'natural_frequency'
  },
  {
    id: 'f_rankine_cycle',
    name: 'Rankine Steam Power Cycle Thermal Efficiency',
    category: 'thermo',
    expression: 'η_th = (W_turbine - W_pump) / Q_in = [ (h₁ - h₂) - (h₄ - h₃) ] / (h₁ - h₄)',
    description: 'Fundamental thermodynamic model for steam turbine power plants converting thermal energy into shaft work.',
    variables: [
      { symbol: 'η_th', name: 'Rankine cycle thermal efficiency', unit: 'dimensionless / %' },
      { symbol: 'W_turbine', name: 'Turbine work output (h₁ - h₂)', unit: 'kJ/kg' },
      { symbol: 'W_pump', name: 'Feedwater pump work input (h₄ - h₃)', unit: 'kJ/kg' },
      { symbol: 'Q_in', name: 'Boiler heat input (h₁ - h₄)', unit: 'kJ/kg' },
      { symbol: 'h₁, h₂, h₃, h₄', name: 'Specific enthalpies at key thermodynamic states', unit: 'kJ/kg' }
    ],
    assumptions: 'Isentropic turbine expansion and pump compression, isobaric boiler heating and condenser heat rejection.',
    example: 'A steam plant operating with boiler heat input 2800 kJ/kg and net turbine output 1050 kJ/kg achieves thermal efficiency η = 1050 / 2800 = 37.5%.',
    calculatorId: 'carnot_eff'
  }
];


