/**
 * Mechanical Engineer Toolkit - Calculation Solver Engine
 * Pure mathematical functions for all 28 tools with input validation,
 * step-by-step substitutions, secondary metrics, and engineering alerts.
 */

import { formatEngineeringNumber } from './converter.js';

export function solve(calcId, inputs) {
  switch (calcId) {
    // ================= STATICS & MECHANICS =================
    case 'force': {
      const m = parseFloat(inputs.m);
      const a = parseFloat(inputs.a);
      if (isNaN(m) || isNaN(a)) return { error: 'Please enter valid numbers for mass and acceleration.' };
      if (m < 0) return { error: 'Mass cannot be negative in classical mechanics.' };

      const F = m * a;
      return {
        success: true,
        primaryResult: { value: F, unit: 'N', formatted: formatEngineeringNumber(F), label: 'Net Force (F)' },
        secondaryResults: [
          { label: 'Force in Kilonewtons', formatted: formatEngineeringNumber(F / 1000), unit: 'kN' },
          { label: 'Force in Pound-force', formatted: formatEngineeringNumber(F / 4.44822), unit: 'lbf' }
        ],
        steps: [
          'Formula: F = m × a',
          `Substitution: F = ${m} kg × ${a} m/s²`,
          `Calculation: F = ${formatEngineeringNumber(F)} N`
        ],
        warnings: m === 0 ? ['Warning: Zero mass implies zero inertia.'] : []
      };
    }

    case 'weight': {
      const m = parseFloat(inputs.m);
      const g = parseFloat(inputs.g ?? 9.80665);
      if (isNaN(m) || isNaN(g)) return { error: 'Please provide valid numbers for mass and gravity.' };
      if (m < 0) return { error: 'Mass cannot be negative.' };
      if (g <= 0) return { error: 'Gravitational acceleration must be greater than zero.' };

      const W = m * g;
      return {
        success: true,
        primaryResult: { value: W, unit: 'N', formatted: formatEngineeringNumber(W), label: 'Weight Force (W)' },
        secondaryResults: [
          { label: 'Equivalent Mass Force', formatted: formatEngineeringNumber(m), unit: 'kgf' },
          { label: 'Pound-force (lbf)', formatted: formatEngineeringNumber(W / 4.44822), unit: 'lbf' }
        ],
        steps: [
          'Formula: W = m × g',
          `Substitution: W = ${m} kg × ${g} m/s²`,
          `Result: W = ${formatEngineeringNumber(W)} N`
        ]
      };
    }

    case 'torque': {
      const F = parseFloat(inputs.F);
      const r = parseFloat(inputs.r);
      const deg = parseFloat(inputs.theta ?? 90);
      if (isNaN(F) || isNaN(r) || isNaN(deg)) return { error: 'Please enter valid numbers for force, radius, and angle.' };
      if (r < 0) return { error: 'Lever arm radius cannot be negative.' };

      const rad = (deg * Math.PI) / 180;
      const sinTheta = Math.sin(rad);
      const T = F * r * sinTheta;

      return {
        success: true,
        primaryResult: { value: T, unit: 'N·m', formatted: formatEngineeringNumber(T), label: 'Applied Torque (T)' },
        secondaryResults: [
          { label: 'Torque in kN·m', formatted: formatEngineeringNumber(T / 1000), unit: 'kN·m' },
          { label: 'Pound-feet', formatted: formatEngineeringNumber(T * 0.737562), unit: 'lbf·ft' },
          { label: 'sin(θ)', formatted: formatEngineeringNumber(sinTheta, 4), unit: '' }
        ],
        steps: [
          'Formula: T = F × r × sin(θ)',
          `Substitution: T = ${F} N × ${r} m × sin(${deg}°)`,
          `Angle factor: sin(${deg}°) = ${formatEngineeringNumber(sinTheta, 4)}`,
          `Result: T = ${formatEngineeringNumber(T)} N·m`
        ]
      };
    }

    case 'power_rot': {
      const N = parseFloat(inputs.N);
      const T = parseFloat(inputs.T);
      if (isNaN(N) || isNaN(T)) return { error: 'Please enter valid numbers for speed and torque.' };
      if (N < 0 || T < 0) return { error: 'Speed and torque must be non-negative.' };

      const omega = (2 * Math.PI * N) / 60;
      const P = (2 * Math.PI * N * T) / 60; // Watts
      const P_kW = P / 1000;
      const P_hp = P / 745.69987;

      return {
        success: true,
        primaryResult: { value: P_kW, unit: 'kW', formatted: formatEngineeringNumber(P_kW), label: 'Power Output' },
        secondaryResults: [
          { label: 'Power in Watts', formatted: formatEngineeringNumber(P), unit: 'W' },
          { label: 'Horsepower (Mechanical)', formatted: formatEngineeringNumber(P_hp), unit: 'hp' },
          { label: 'Angular Velocity (ω)', formatted: formatEngineeringNumber(omega), unit: 'rad/s' }
        ],
        steps: [
          'Formula: P = (2π × N × T) / 60 = T × ω',
          `Angular speed: ω = (2 × π × ${N}) / 60 = ${formatEngineeringNumber(omega)} rad/s`,
          `Substitution: P = ${T} N·m × ${formatEngineeringNumber(omega)} rad/s = ${formatEngineeringNumber(P)} W`,
          `Result: P = ${formatEngineeringNumber(P_kW)} kW (${formatEngineeringNumber(P_hp)} hp)`
        ]
      };
    }

    case 'stress': {
      const F = parseFloat(inputs.F);
      const A = parseFloat(inputs.A);
      if (isNaN(F) || isNaN(A)) return { error: 'Please provide valid force and area values.' };
      if (A <= 0) return { error: 'Cross-sectional area must be strictly greater than zero.' };

      const sigma = F / A; // Pa
      const sigma_MPa = sigma / 1e6;

      return {
        success: true,
        primaryResult: { value: sigma_MPa, unit: 'MPa', formatted: formatEngineeringNumber(sigma_MPa), label: 'Normal Stress (σ)' },
        secondaryResults: [
          { label: 'Stress in Pascals', formatted: formatEngineeringNumber(sigma), unit: 'Pa' },
          { label: 'Stress in N/mm²', formatted: formatEngineeringNumber(sigma_MPa), unit: 'N/mm²' },
          { label: 'Stress in psi', formatted: formatEngineeringNumber(sigma * 0.000145038), unit: 'psi' }
        ],
        steps: [
          'Formula: σ = F / A',
          `Substitution: σ = ${F} N / ${A} m²`,
          `Stress in Pa: ${formatEngineeringNumber(sigma)} Pa`,
          `Converted to MPa: σ = ${formatEngineeringNumber(sigma_MPa)} MPa (N/mm²)`
        ],
        warnings: sigma < 0 ? ['Note: Negative stress indicates compressive stress.'] : []
      };
    }

    case 'strain': {
      const dL = parseFloat(inputs.dL);
      const L0 = parseFloat(inputs.L0);
      if (isNaN(dL) || isNaN(L0)) return { error: 'Please provide valid change in length and original length.' };
      if (L0 <= 0) return { error: 'Original gauge length (L₀) must be strictly greater than zero.' };

      const epsilon = dL / L0;
      const epsilon_pct = epsilon * 100;
      const microstrain = epsilon * 1e6;

      return {
        success: true,
        primaryResult: { value: epsilon, unit: 'm/m (dimensionless)', formatted: formatEngineeringNumber(epsilon), label: 'Engineering Strain (ε)' },
        secondaryResults: [
          { label: 'Strain Percentage', formatted: formatEngineeringNumber(epsilon_pct, 4) + '%', unit: '%' },
          { label: 'Microstrain (µε)', formatted: formatEngineeringNumber(microstrain), unit: 'µε' }
        ],
        steps: [
          'Formula: ε = ΔL / L₀',
          `Substitution: ε = ${dL} mm / ${L0} mm`,
          `Dimensionless Strain: ε = ${formatEngineeringNumber(epsilon)}`,
          `Percentage: ε = ${formatEngineeringNumber(epsilon_pct, 4)}%`
        ],
        warnings: Math.abs(epsilon) > 0.05 ? ['Note: Strain > 5% typically falls into the plastic deformation regime for structural metals.'] : []
      };
    }

    case 'pressure': {
      const F = parseFloat(inputs.F);
      const A = parseFloat(inputs.A);
      if (isNaN(F) || isNaN(A)) return { error: 'Please enter valid values for force and area.' };
      if (A <= 0) return { error: 'Contact area must be strictly greater than zero.' };

      const p = F / A; // Pa
      const p_bar = p / 1e5;
      const p_kPa = p / 1e3;
      const p_psi = p * 0.000145038;

      return {
        success: true,
        primaryResult: { value: p_kPa, unit: 'kPa', formatted: formatEngineeringNumber(p_kPa), label: 'Pressure (p)' },
        secondaryResults: [
          { label: 'Pressure in Bar', formatted: formatEngineeringNumber(p_bar), unit: 'bar' },
          { label: 'Pressure in Pascal', formatted: formatEngineeringNumber(p), unit: 'Pa' },
          { label: 'Pressure in psi', formatted: formatEngineeringNumber(p_psi), unit: 'psi' }
        ],
        steps: [
          'Formula: p = F / A',
          `Substitution: p = ${F} N / ${A} m² = ${formatEngineeringNumber(p)} Pa`,
          `Result: ${formatEngineeringNumber(p_kPa)} kPa (${formatEngineeringNumber(p_bar)} bar)`
        ]
      };
    }

    case 'work': {
      const F = parseFloat(inputs.F);
      const d = parseFloat(inputs.d);
      const deg = parseFloat(inputs.theta ?? 0);
      if (isNaN(F) || isNaN(d) || isNaN(deg)) return { error: 'Please enter valid numbers for force, distance, and angle.' };

      const rad = (deg * Math.PI) / 180;
      const cosTheta = Math.cos(rad);
      const W = F * d * cosTheta;

      return {
        success: true,
        primaryResult: { value: W, unit: 'J (Joules)', formatted: formatEngineeringNumber(W), label: 'Work Done (W)' },
        secondaryResults: [
          { label: 'Work in Kilojoules', formatted: formatEngineeringNumber(W / 1000), unit: 'kJ' },
          { label: 'Work in Foot-Pound Force', formatted: formatEngineeringNumber(W * 0.737562), unit: 'ft·lbf' },
          { label: 'Direction factor cos(θ)', formatted: formatEngineeringNumber(cosTheta, 4), unit: '' }
        ],
        steps: [
          'Formula: W = F × d × cos(θ)',
          `Substitution: W = ${F} N × ${d} m × cos(${deg}°)`,
          `cos(${deg}°) = ${formatEngineeringNumber(cosTheta, 4)}`,
          `Result: W = ${formatEngineeringNumber(W)} J (N·m)`
        ]
      };
    }

    case 'fos': {
      const strength = parseFloat(inputs.strength);
      const working = parseFloat(inputs.working);
      if (isNaN(strength) || isNaN(working)) return { error: 'Please provide valid strength and working stress values.' };
      if (working <= 0) return { error: 'Working stress must be strictly positive.' };
      if (strength <= 0) return { error: 'Material strength must be positive.' };

      const fos = strength / working;
      let status = 'Adequate';
      if (fos < 1.0) status = 'CRITICAL FAILURE RISK (FoS < 1)';
      else if (fos < 1.5) status = 'Low Margin (Standard structural usually ≥ 1.5)';
      else if (fos > 4.0) status = 'Conservatively Overdesigned';

      return {
        success: true,
        primaryResult: { value: fos, unit: '', formatted: formatEngineeringNumber(fos, 2), label: 'Factor of Safety (FoS)' },
        secondaryResults: [
          { label: 'Design Assessment', formatted: status, unit: '' },
          { label: 'Excess Capacity', formatted: formatEngineeringNumber((fos - 1) * 100, 1) + '%', unit: '%' }
        ],
        steps: [
          'Formula: FoS = σ_limit / σ_working',
          `Substitution: FoS = ${strength} MPa / ${working} MPa`,
          `Result: FoS = ${formatEngineeringNumber(fos, 3)}`
        ],
        warnings: fos < 1.0 ? ['CRITICAL: Factor of Safety is below 1.0! The applied load exceeds the allowable material limit.'] : []
      };
    }

    case 'mech_eff': {
      const Pout = parseFloat(inputs.Pout);
      const Pin = parseFloat(inputs.Pin);
      if (isNaN(Pout) || isNaN(Pin)) return { error: 'Please enter valid input and output power.' };
      if (Pin <= 0) return { error: 'Input power must be strictly positive.' };
      if (Pout < 0) return { error: 'Output power cannot be negative.' };

      const ratio = Pout / Pin;
      const pct = ratio * 100;
      const losses = Pin - Pout;

      const warnings = [];
      if (pct > 100) {
        warnings.push('THERMODYNAMIC VIOLATION: Efficiency exceeds 100%, violating the Conservation of Energy (First Law)!');
      }

      return {
        success: true,
        primaryResult: { value: pct, unit: '%', formatted: formatEngineeringNumber(pct, 2) + '%', label: 'Mechanical Efficiency (η)' },
        secondaryResults: [
          { label: 'Decimal Ratio', formatted: formatEngineeringNumber(ratio, 4), unit: '' },
          { label: 'Power Losses', formatted: formatEngineeringNumber(losses), unit: 'kW' }
        ],
        steps: [
          'Formula: η = (P_out / P_in) × 100%',
          `Substitution: η = (${Pout} kW / ${Pin} kW) × 100%`,
          `Result: η = ${formatEngineeringNumber(pct, 2)}%`,
          `Dissipated Loss: P_loss = P_in - P_out = ${formatEngineeringNumber(losses)} kW`
        ],
        warnings
      };
    }

    // ================= MACHINE DESIGN =================
    case 'shaft_diameter': {
      const T = parseFloat(inputs.T); // N*m
      const tau_MPa = parseFloat(inputs.tau); // MPa
      if (isNaN(T) || isNaN(tau_MPa)) return { error: 'Please enter valid numbers for torque and allowable shear stress.' };
      if (T <= 0 || tau_MPa <= 0) return { error: 'Torque and allowable stress must be strictly positive.' };

      const tau_Pa = tau_MPa * 1e6;
      // d = [ (16 * T) / (pi * tau) ] ^ (1/3) in meters
      const d_m = Math.cbrt((16 * T) / (Math.PI * tau_Pa));
      const d_mm = d_m * 1000;
      const Zp = (Math.PI * Math.pow(d_m, 3)) / 16;

      return {
        success: true,
        primaryResult: { value: d_mm, unit: 'mm', formatted: formatEngineeringNumber(d_mm, 2), label: 'Required Shaft Diameter (d)' },
        secondaryResults: [
          { label: 'Diameter in Meters', formatted: formatEngineeringNumber(d_m, 5), unit: 'm' },
          { label: 'Diameter in Inches', formatted: formatEngineeringNumber(d_mm / 25.4, 3), unit: 'in' },
          { label: 'Polar Modulus (Zp)', formatted: formatEngineeringNumber(Zp * 1e9, 2), unit: 'mm³' }
        ],
        steps: [
          'Formula (Pure Torsion): d = [ (16 × T) / (π × τ) ]^(1/3)',
          `Unit normalization: τ = ${tau_MPa} MPa = ${formatEngineeringNumber(tau_Pa)} Pa`,
          `Substitution: d = [ (16 × ${T}) / (π × ${formatEngineeringNumber(tau_Pa)}) ]^(1/3)`,
          `Calculation: d = ${formatEngineeringNumber(d_m, 5)} m = ${formatEngineeringNumber(d_mm, 2)} mm`
        ],
        notes: 'Formula assumes pure torsional loading. For combined bending and torsion, equivalent twisting moment Te = √(M² + T²) must be used.'
      };
    }

    case 'gear_ratio': {
      const Z1 = parseInt(inputs.Z1, 10);
      const Z2 = parseInt(inputs.Z2, 10);
      const N1 = parseFloat(inputs.N1);
      if (isNaN(Z1) || isNaN(Z2) || isNaN(N1)) return { error: 'Please enter valid integer teeth counts and input speed.' };
      if (Z1 <= 0 || Z2 <= 0) return { error: 'Tooth count must be at least 1.' };
      if (N1 < 0) return { error: 'Speed cannot be negative.' };

      const ratio = Z2 / Z1;
      const N2 = N1 / ratio;
      const torqueMultiplier = ratio;

      return {
        success: true,
        primaryResult: { value: ratio, unit: ': 1', formatted: formatEngineeringNumber(ratio, 3) + ' : 1', label: 'Gear Ratio (i)' },
        secondaryResults: [
          { label: 'Driven Speed (N₂)', formatted: formatEngineeringNumber(N2, 1), unit: 'rpm' },
          { label: 'Ideal Torque Multiplication', formatted: formatEngineeringNumber(torqueMultiplier, 3) + '×', unit: '' },
          { label: 'Drive Type', formatted: ratio > 1 ? 'Speed Reduction' : (ratio < 1 ? 'Speed Overdrive' : '1:1 Direct Transfer'), unit: '' }
        ],
        steps: [
          'Formula: i = Z₂ / Z₁ = N₁ / N₂',
          `Substitution: i = ${Z2} / ${Z1} = ${formatEngineeringNumber(ratio, 4)}`,
          `Output Speed: N₂ = N₁ / i = ${N1} / ${formatEngineeringNumber(ratio, 4)} = ${formatEngineeringNumber(N2, 2)} rpm`
        ]
      };
    }

    case 'belt_length': {
      const C = parseFloat(inputs.C);
      const D = parseFloat(inputs.D);
      const d = parseFloat(inputs.d);
      if (isNaN(C) || isNaN(D) || isNaN(d)) return { error: 'Please enter valid center distance and pulley diameters.' };
      if (C <= 0 || D <= 0 || d <= 0) return { error: 'All dimensions must be positive.' };
      if (C < (D + d) / 2) return { error: 'Center distance C is too short: pulleys would physically collide!' };

      // L ≈ 2C + (pi/2)(D + d) + (D - d)^2 / (4C)
      const term1 = 2 * C;
      const term2 = (Math.PI / 2) * (D + d);
      const term3 = Math.pow(D - d, 2) / (4 * C);
      const L = term1 + term2 + term3;

      return {
        success: true,
        primaryResult: { value: L, unit: 'mm', formatted: formatEngineeringNumber(L, 2), label: 'Open Belt Pitch Length (L)' },
        secondaryResults: [
          { label: 'Length in Meters', formatted: formatEngineeringNumber(L / 1000, 4), unit: 'm' },
          { label: 'Length in Inches', formatted: formatEngineeringNumber(L / 25.4, 2), unit: 'in' },
          { label: 'Straight span 2C', formatted: formatEngineeringNumber(term1, 1), unit: 'mm' }
        ],
        steps: [
          'Formula: L ≈ 2C + (π/2)(D + d) + (D - d)² / (4C)',
          `Term 1 (2C): 2 × ${C} = ${formatEngineeringNumber(term1)} mm`,
          `Term 2 ((π/2)(D + d)): (π/2) × (${D} + ${d}) = ${formatEngineeringNumber(term2, 2)} mm`,
          `Term 3 ((D - d)² / 4C): (${D} - ${d})² / (4 × ${C}) = ${formatEngineeringNumber(term3, 2)} mm`,
          `Summed Total: L = ${formatEngineeringNumber(L, 2)} mm`
        ]
      };
    }

    case 'bearing_life': {
      const C = parseFloat(inputs.C); // kN
      const P = parseFloat(inputs.P); // kN
      const N = parseFloat(inputs.N); // rpm
      const p = parseFloat(inputs.p ?? 3);
      if (isNaN(C) || isNaN(P) || isNaN(N) || isNaN(p)) return { error: 'Please enter valid numbers for load and speed.' };
      if (C <= 0 || P <= 0 || N <= 0) return { error: 'Dynamic ratings, loads, and speed must be strictly positive.' };

      // L10 = (C/P)^p in millions of revolutions
      const L10_revs = Math.pow(C / P, p); // in 10^6 revs
      const totalRevs = L10_revs * 1e6;
      // L10h = (10^6 / (60 * N)) * (C / P)^p
      const L10_hours = (1e6 / (60 * N)) * L10_revs;

      return {
        success: true,
        primaryResult: { value: L10_hours, unit: 'hours', formatted: formatEngineeringNumber(L10_hours, 1), label: 'Rating Life L₁₀h' },
        secondaryResults: [
          { label: 'Rating Life in Revolutions', formatted: formatEngineeringNumber(L10_revs, 2) + ' × 10⁶', unit: 'revs' },
          { label: 'Load Ratio (C/P)', formatted: formatEngineeringNumber(C / P, 2), unit: '' },
          { label: 'Operating Days (24/7)', formatted: formatEngineeringNumber(L10_hours / 24, 1), unit: 'days' }
        ],
        steps: [
          'Formula: L₁₀ = (C / P)^p  (in millions of revs)',
          `Load Ratio: C / P = ${C} kN / ${P} kN = ${formatEngineeringNumber(C / P, 3)}`,
          `L₁₀ revs: (${formatEngineeringNumber(C / P, 3)})^${p} = ${formatEngineeringNumber(L10_revs, 3)} × 10⁶ revs`,
          `Formula (Hours): L₁₀h = (10⁶ / (60 × N)) × (C / P)^p`,
          `Substitution: (10⁶ / (60 × ${N})) × ${formatEngineeringNumber(L10_revs, 3)} = ${formatEngineeringNumber(L10_hours, 1)} operating hours`
        ]
      };
    }

    case 'spring_calc': {
      const d = parseFloat(inputs.d); // mm
      const D = parseFloat(inputs.D); // mm
      const Na = parseFloat(inputs.Na); // coils
      const G_GPa = parseFloat(inputs.G ?? 79.3); // GPa
      const F = parseFloat(inputs.F); // N
      if (isNaN(d) || isNaN(D) || isNaN(Na) || isNaN(G_GPa) || isNaN(F)) return { error: 'Please enter valid values.' };
      if (d <= 0 || D <= 0 || Na <= 0 || G_GPa <= 0) return { error: 'Geometric wire parameters and modulus must be strictly positive.' };
      if (d >= D) return { error: 'Wire diameter d cannot exceed mean coil diameter D!' };

      const G = G_GPa * 1e3; // N/mm²
      const springIndex = D / d;
      // Spring rate k = (G * d^4) / (8 * D^3 * Na) in N/mm
      const k = (G * Math.pow(d, 4)) / (8 * Math.pow(D, 3) * Na);
      const deflection = F / k; // mm
      // Torsional shear stress tau = (8 * F * D) / (pi * d^3) in N/mm^2 (MPa)
      const tau = (8 * F * D) / (Math.PI * Math.pow(d, 3));
      // Wahl correction factor
      const Kw = (4 * springIndex - 1) / (4 * springIndex - 4) + (0.615 / springIndex);
      const tau_corrected = tau * Kw;

      return {
        success: true,
        primaryResult: { value: k, unit: 'N/mm', formatted: formatEngineeringNumber(k, 3), label: 'Spring Rate (k)' },
        secondaryResults: [
          { label: 'Deflection at Load (δ)', formatted: formatEngineeringNumber(deflection, 2), unit: 'mm' },
          { label: 'Spring Index (C = D/d)', formatted: formatEngineeringNumber(springIndex, 2), unit: '' },
          { label: 'Max Shear Stress (τ)', formatted: formatEngineeringNumber(tau, 1), unit: 'MPa' },
          { label: 'Wahl Corrected Stress (τ_max)', formatted: formatEngineeringNumber(tau_corrected, 1), unit: 'MPa' }
        ],
        steps: [
          'Formula: k = (G × d⁴) / (8 × D³ × N_a)',
          `Modulus conversion: G = ${G_GPa} GPa = ${G} N/mm²`,
          `Spring index: C = D/d = ${D}/${d} = ${formatEngineeringNumber(springIndex, 2)}`,
          `Stiffness: k = (${G} × ${d}⁴) / (8 × ${D}³ × ${Na}) = ${formatEngineeringNumber(k, 3)} N/mm`,
          `Deflection: δ = F / k = ${F} N / ${formatEngineeringNumber(k, 3)} N/mm = ${formatEngineeringNumber(deflection, 2)} mm`
        ],
        warnings: (springIndex < 4 || springIndex > 12) ? ['Note: Preferred commercial spring index (D/d) is typically between 4 and 12.'] : []
      };
    }

    // ================= FLUID MECHANICS =================
    case 'reynolds': {
      const rho = parseFloat(inputs.rho);
      const V = parseFloat(inputs.V);
      const D = parseFloat(inputs.D);
      const mu = parseFloat(inputs.mu);
      if (isNaN(rho) || isNaN(V) || isNaN(D) || isNaN(mu)) return { error: 'Please enter valid numbers for fluid properties.' };
      if (rho <= 0 || D <= 0 || mu <= 0) return { error: 'Density, pipe diameter, and viscosity must be strictly positive.' };
      if (V < 0) return { error: 'Flow velocity cannot be negative.' };

      const Re = (rho * V * D) / mu;
      let regime = 'Laminar Flow (Re < 2300)';
      let regimeColor = 'success';
      if (Re >= 2300 && Re <= 4000) {
        regime = 'Transitional Flow (2300 ≤ Re ≤ 4000)';
        regimeColor = 'warning';
      } else if (Re > 4000) {
        regime = 'Turbulent Flow (Re > 4000)';
        regimeColor = 'info';
      }

      return {
        success: true,
        primaryResult: { value: Re, unit: '(dimensionless)', formatted: formatEngineeringNumber(Re), label: 'Reynolds Number (Re)' },
        secondaryResults: [
          { label: 'Flow Regime', formatted: regime, unit: '' },
          { label: 'Kinematic Viscosity (ν = μ/ρ)', formatted: formatEngineeringNumber(mu / rho), unit: 'm²/s' }
        ],
        steps: [
          'Formula: Re = (ρ × V × D) / μ',
          `Substitution: Re = (${rho} kg/m³ × ${V} m/s × ${D} m) / (${mu} Pa·s)`,
          `Calculation: Re = ${formatEngineeringNumber(Re)}`,
          `Regime classification: ${regime}`
        ]
      };
    }

    case 'continuity': {
      const d1 = parseFloat(inputs.d1);
      const V1 = parseFloat(inputs.V1);
      const d2 = parseFloat(inputs.d2);
      if (isNaN(d1) || isNaN(V1) || isNaN(d2)) return { error: 'Please enter valid diameters and inlet velocity.' };
      if (d1 <= 0 || d2 <= 0) return { error: 'Diameters must be strictly positive.' };
      if (V1 < 0) return { error: 'Inlet velocity cannot be negative.' };

      // A1 * V1 = A2 * V2 => (pi/4)*d1^2 * V1 = (pi/4)*d2^2 * V2 => V2 = V1 * (d1/d2)^2
      const areaRatio = Math.pow(d1 / d2, 2);
      const V2 = V1 * areaRatio;
      const A1_m2 = (Math.PI / 4) * Math.pow(d1 / 1000, 2);
      const Q_m3s = A1_m2 * V1;
      const Q_Lps = Q_m3s * 1000;

      return {
        success: true,
        primaryResult: { value: V2, unit: 'm/s', formatted: formatEngineeringNumber(V2, 3), label: 'Outlet Velocity (V₂)' },
        secondaryResults: [
          { label: 'Volumetric Flow Rate (Q)', formatted: formatEngineeringNumber(Q_Lps, 2), unit: 'L/s' },
          { label: 'Flow Rate in m³/s', formatted: formatEngineeringNumber(Q_m3s, 5), unit: 'm³/s' },
          { label: 'Velocity Ratio (V₂ / V₁)', formatted: formatEngineeringNumber(areaRatio, 3) + '×', unit: '' }
        ],
        steps: [
          'Formula: A₁ × V₁ = A₂ × V₂  ⟹  V₂ = V₁ × (d₁ / d₂)² (for circular pipes)',
          `Diameter ratio: d₁ / d₂ = ${d1} / ${d2} = ${formatEngineeringNumber(d1 / d2, 3)}`,
          `Area ratio: (${formatEngineeringNumber(d1 / d2, 3)})² = ${formatEngineeringNumber(areaRatio, 4)}`,
          `Calculation: V₂ = ${V1} m/s × ${formatEngineeringNumber(areaRatio, 4)} = ${formatEngineeringNumber(V2, 3)} m/s`,
          `Flow rate: Q = A₁ × V₁ = ${formatEngineeringNumber(Q_Lps, 2)} L/s`
        ]
      };
    }

    case 'bernoulli': {
      const rho = parseFloat(inputs.rho);
      const V1 = parseFloat(inputs.V1);
      const z1 = parseFloat(inputs.z1);
      const V2 = parseFloat(inputs.V2);
      const z2 = parseFloat(inputs.z2);
      const g = 9.80665;
      if (isNaN(rho) || isNaN(V1) || isNaN(z1) || isNaN(V2) || isNaN(z2)) return { error: 'Please enter valid numeric inputs.' };
      if (rho <= 0) return { error: 'Fluid density must be positive.' };

      // p1 - p2 = rho * [ g*(z2 - z1) + 0.5*(V2^2 - V1^2) ]
      const deltaZ = z2 - z1;
      const potHeadDiff = g * deltaZ;
      const kinHeadDiff = 0.5 * (Math.pow(V2, 2) - Math.pow(V1, 2));
      const deltaP_Pa = rho * (potHeadDiff + kinHeadDiff);
      const deltaP_kPa = deltaP_Pa / 1000;

      return {
        success: true,
        primaryResult: { value: deltaP_kPa, unit: 'kPa', formatted: formatEngineeringNumber(deltaP_kPa, 3), label: 'Pressure Difference (p₁ - p₂)' },
        secondaryResults: [
          { label: 'Pressure Drop in Bar', formatted: formatEngineeringNumber(deltaP_kPa / 100, 4), unit: 'bar' },
          { label: 'Elevation Head Diff Δz', formatted: formatEngineeringNumber(deltaZ, 2), unit: 'm' },
          { label: 'Kinetic Pressure Component', formatted: formatEngineeringNumber((rho * kinHeadDiff) / 1000, 3), unit: 'kPa' }
        ],
        steps: [
          'Formula: p₁ - p₂ = ρ [ g(z₂ - z₁) + ½(V₂² - V₁²) ]',
          `Elevation term: 9.80665 × (${z2} - ${z1}) = ${formatEngineeringNumber(potHeadDiff, 3)} J/kg`,
          `Kinetic term: ½ × (${V2}² - ${V1}²) = ${formatEngineeringNumber(kinHeadDiff, 3)} J/kg`,
          `Substitution: Δp = ${rho} × (${formatEngineeringNumber(potHeadDiff, 3)} + ${formatEngineeringNumber(kinHeadDiff, 3)})`,
          `Result: Δp = ${formatEngineeringNumber(deltaP_kPa, 3)} kPa`
        ]
      };
    }

    case 'pressure_head': {
      const p_kPa = parseFloat(inputs.p);
      const rho = parseFloat(inputs.rho);
      const g = parseFloat(inputs.g ?? 9.80665);
      if (isNaN(p_kPa) || isNaN(rho) || isNaN(g)) return { error: 'Please enter valid numbers.' };
      if (rho <= 0 || g <= 0) return { error: 'Density and gravity must be strictly positive.' };
      if (p_kPa < 0) return { error: 'Absolute/gauge pressure cannot be negative in standard head calculation.' };

      const p_Pa = p_kPa * 1000;
      const h_m = p_Pa / (rho * g);

      return {
        success: true,
        primaryResult: { value: h_m, unit: 'm of fluid', formatted: formatEngineeringNumber(h_m, 3), label: 'Equivalent Head (h)' },
        secondaryResults: [
          { label: 'Head in Millimeters', formatted: formatEngineeringNumber(h_m * 1000, 1), unit: 'mm' },
          { label: 'Head in Feet', formatted: formatEngineeringNumber(h_m * 3.28084, 2), unit: 'ft' }
        ],
        steps: [
          'Formula: h = p / (ρ × g)',
          `Pressure conversion: ${p_kPa} kPa = ${p_Pa} Pa (N/m²)`,
          `Substitution: h = ${p_Pa} / (${rho} × ${g})`,
          `Result: h = ${formatEngineeringNumber(h_m, 3)} meters of fluid`
        ]
      };
    }

    case 'hydraulic_power': {
      const Q_Lps = parseFloat(inputs.Q);
      const H = parseFloat(inputs.H);
      const rho = parseFloat(inputs.rho ?? 1000);
      const eta = parseFloat(inputs.eta ?? 100);
      const g = 9.80665;
      if (isNaN(Q_Lps) || isNaN(H) || isNaN(rho) || isNaN(eta)) return { error: 'Please enter valid pump parameters.' };
      if (Q_Lps <= 0 || rho <= 0 || eta <= 0 || eta > 100) return { error: 'Flow rate, density, and efficiency (1-100%) must be valid.' };

      const Q_m3s = Q_Lps / 1000;
      const P_hyd_W = rho * g * Q_m3s * H;
      const P_hyd_kW = P_hyd_W / 1000;
      const P_pump_kW = P_hyd_kW / (eta / 100);
      const P_pump_hp = (P_pump_kW * 1000) / 745.69987;

      return {
        success: true,
        primaryResult: { value: P_hyd_kW, unit: 'kW', formatted: formatEngineeringNumber(P_hyd_kW, 3), label: 'Ideal Hydraulic Power' },
        secondaryResults: [
          { label: 'Shaft / Brake Power Required', formatted: formatEngineeringNumber(P_pump_kW, 3), unit: 'kW' },
          { label: 'Required Electric Motor Power', formatted: formatEngineeringNumber(P_pump_hp, 2), unit: 'hp' },
          { label: 'Flow Rate in m³/h', formatted: formatEngineeringNumber(Q_m3s * 3600, 2), unit: 'm³/h' }
        ],
        steps: [
          'Formula (Ideal Hydraulic): P_hyd = ρ × g × Q × H',
          `Unit conversion: Q = ${Q_Lps} L/s = ${Q_m3s} m³/s`,
          `Substitution: P_hyd = ${rho} × 9.80665 × ${Q_m3s} × ${H} = ${formatEngineeringNumber(P_hyd_kW, 3)} kW`,
          `Shaft Brake Power (η = ${eta}%): P_shaft = P_hyd / η = ${formatEngineeringNumber(P_pump_kW, 3)} kW (${formatEngineeringNumber(P_pump_hp, 2)} hp)`
        ]
      };
    }

    // ================= THERMODYNAMICS =================
    case 'carnot_eff': {
      const Th_C = parseFloat(inputs.Th_C);
      const Tc_C = parseFloat(inputs.Tc_C);
      if (isNaN(Th_C) || isNaN(Tc_C)) return { error: 'Please enter valid temperatures.' };

      const Th_K = Th_C + 273.15;
      const Tc_K = Tc_C + 273.15;

      if (Th_K <= 0 || Tc_K <= 0) return { error: 'Temperatures must be strictly above Absolute Zero (-273.15 °C / 0 K).' };
      if (Th_K <= Tc_K) return { error: 'Hot reservoir temperature (T_hot) must be strictly greater than cold sink temperature (T_cold).' };

      const eta = 1 - (Tc_K / Th_K);
      const eta_pct = eta * 100;

      return {
        success: true,
        primaryResult: { value: eta_pct, unit: '%', formatted: formatEngineeringNumber(eta_pct, 2) + '%', label: 'Maximum Carnot Efficiency (η_max)' },
        secondaryResults: [
          { label: 'Hot Reservoir Absolute Temp', formatted: formatEngineeringNumber(Th_K, 2), unit: 'K' },
          { label: 'Cold Sink Absolute Temp', formatted: formatEngineeringNumber(Tc_K, 2), unit: 'K' },
          { label: 'Decimal Efficiency', formatted: formatEngineeringNumber(eta, 4), unit: '' }
        ],
        steps: [
          'Formula: η = 1 - (T_cold / T_hot)  (MUST USE ABSOLUTE TEMPERATURE IN KELVIN)',
          `Kelvin conversion: T_hot = ${Th_C}°C + 273.15 = ${Th_K} K`,
          `Kelvin conversion: T_cold = ${Tc_C}°C + 273.15 = ${Tc_K} K`,
          `Ratio: T_cold / T_hot = ${formatEngineeringNumber(Tc_K / Th_K, 4)}`,
          `Result: η = 1 - ${formatEngineeringNumber(Tc_K / Th_K, 4)} = ${formatEngineeringNumber(eta_pct, 2)}%`
        ],
        notes: 'According to Carnot\'s Theorem and the Second Law of Thermodynamics, no real heat engine operating between these two temperatures can exceed this efficiency.'
      };
    }

    case 'cop_refrigerator': {
      const QL = parseFloat(inputs.QL);
      const W = parseFloat(inputs.W);
      if (isNaN(QL) || isNaN(W)) return { error: 'Please enter valid heat extraction and compressor work.' };
      if (QL <= 0 || W <= 0) return { error: 'Cooling capacity and work input must be strictly positive.' };

      const cop = QL / W;
      const heatRejected = QL + W;

      return {
        success: true,
        primaryResult: { value: cop, unit: '', formatted: formatEngineeringNumber(cop, 2), label: 'Refrigerator COP' },
        secondaryResults: [
          { label: 'Total Heat Rejected to Condenser (Q_H)', formatted: formatEngineeringNumber(heatRejected, 2), unit: 'kW' },
          { label: 'Equivalent Heat Pump COP', formatted: formatEngineeringNumber(cop + 1, 2), unit: '' }
        ],
        steps: [
          'Formula: COP_R = Q_L / W_in',
          `Substitution: COP_R = ${QL} kW / ${W} kW = ${formatEngineeringNumber(cop, 3)}`,
          `Condenser Heat Rejection: Q_H = Q_L + W_in = ${formatEngineeringNumber(heatRejected, 2)} kW`
        ]
      };
    }

    case 'cop_heat_pump': {
      const QH = parseFloat(inputs.QH);
      const W = parseFloat(inputs.W);
      if (isNaN(QH) || isNaN(W)) return { error: 'Please enter valid heat output and electrical work input.' };
      if (QH <= 0 || W <= 0) return { error: 'Heat delivered and work input must be strictly positive.' };
      if (QH <= W) return { error: 'Delivered heat QH must exceed electrical input W (COP of a heat pump must be > 1.0).' };

      const cop = QH / W;
      const heatExtracted = QH - W;

      return {
        success: true,
        primaryResult: { value: cop, unit: '', formatted: formatEngineeringNumber(cop, 2), label: 'Heat Pump COP' },
        secondaryResults: [
          { label: 'Low-Temp Heat Absorbed (Q_L)', formatted: formatEngineeringNumber(heatExtracted, 2), unit: 'kW' },
          { label: 'Refrigeration Cycle Equivalent COP', formatted: formatEngineeringNumber(cop - 1, 2), unit: '' }
        ],
        steps: [
          'Formula: COP_HP = Q_H / W_in',
          `Substitution: COP_HP = ${QH} kW / ${W} kW = ${formatEngineeringNumber(cop, 3)}`,
          `Heat absorbed from ambient source: Q_L = Q_H - W_in = ${formatEngineeringNumber(heatExtracted, 2)} kW`
        ]
      };
    }

    case 'ideal_gas': {
      const rho = parseFloat(inputs.rho);
      const T_C = parseFloat(inputs.T_C);
      const R_spec = parseFloat(inputs.R_spec ?? 287.05);
      if (isNaN(rho) || isNaN(T_C) || isNaN(R_spec)) return { error: 'Please enter valid numbers.' };
      if (rho <= 0 || R_spec <= 0) return { error: 'Gas density and gas constant must be positive.' };

      const T_K = T_C + 273.15;
      if (T_K <= 0) return { error: 'Temperature must be above absolute zero.' };

      // p = rho * R_spec * T_K (Pa)
      const p_Pa = rho * R_spec * T_K;
      const p_kPa = p_Pa / 1000;
      const p_bar = p_Pa / 1e5;

      return {
        success: true,
        primaryResult: { value: p_kPa, unit: 'kPa', formatted: formatEngineeringNumber(p_kPa, 2), label: 'Absolute Pressure (p)' },
        secondaryResults: [
          { label: 'Pressure in Bar', formatted: formatEngineeringNumber(p_bar, 3), unit: 'bar' },
          { label: 'Pressure in Pascal', formatted: formatEngineeringNumber(p_Pa, 1), unit: 'Pa' },
          { label: 'Absolute Temperature', formatted: formatEngineeringNumber(T_K, 2), unit: 'K' }
        ],
        steps: [
          'Formula: p = ρ × R_specific × T',
          `Temperature conversion: T = ${T_C}°C + 273.15 = ${T_K} K`,
          `Substitution: p = ${rho} kg/m³ × ${R_spec} J/(kg·K) × ${T_K} K`,
          `Calculation: p = ${formatEngineeringNumber(p_Pa, 1)} Pa = ${formatEngineeringNumber(p_kPa, 2)} kPa (${formatEngineeringNumber(p_bar, 3)} bar)`
        ]
      };
    }

    case 'conduction_heat': {
      const k = parseFloat(inputs.k);
      const A = parseFloat(inputs.A);
      const T1 = parseFloat(inputs.T1);
      const T2 = parseFloat(inputs.T2);
      const L_mm = parseFloat(inputs.L);
      if (isNaN(k) || isNaN(A) || isNaN(T1) || isNaN(T2) || isNaN(L_mm)) return { error: 'Please enter valid numbers.' };
      if (k <= 0 || A <= 0 || L_mm <= 0) return { error: 'Conductivity, area, and thickness must be strictly positive.' };

      const L_m = L_mm / 1000;
      const deltaT = Math.abs(T1 - T2);
      // Q = (k * A * deltaT) / L in Watts
      const Q_W = (k * A * deltaT) / L_m;
      const heatFlux = Q_W / A; // W/m^2
      const R_thermal = L_m / (k * A); // K/W

      return {
        success: true,
        primaryResult: { value: Q_W, unit: 'W', formatted: formatEngineeringNumber(Q_W, 2), label: 'Rate of Heat Conduction (Q̇)' },
        secondaryResults: [
          { label: 'Heat Flow in Kilowatts', formatted: formatEngineeringNumber(Q_W / 1000, 3), unit: 'kW' },
          { label: 'Heat Flux (q″ = Q/A)', formatted: formatEngineeringNumber(heatFlux, 1), unit: 'W/m²' },
          { label: 'Thermal Resistance (R_th)', formatted: formatEngineeringNumber(R_thermal, 4), unit: 'K/W' }
        ],
        steps: [
          'Formula: Q̇ = (k × A × |T₁ - T₂|) / L',
          `Thickness conversion: L = ${L_mm} mm = ${L_m} m`,
          `Temperature differential: ΔT = |${T1} - ${T2}| = ${deltaT} °C (or K)`,
          `Substitution: Q̇ = (${k} W/m·K × ${A} m² × ${deltaT} K) / ${L_m} m = ${formatEngineeringNumber(Q_W, 2)} W`
        ]
      };
    }

    // ================= METROLOGY & MEASUREMENT =================
    case 'vernier_least_count': {
      const msd = parseFloat(inputs.msd);
      const n = parseInt(inputs.n, 10);
      if (isNaN(msd) || isNaN(n)) return { error: 'Please enter valid numbers for MSD and divisions.' };
      if (msd <= 0 || n <= 1) return { error: 'MSD must be positive and divisions must be at least 2.' };

      const lc_mm = msd / n;
      const lc_um = lc_mm * 1000;

      return {
        success: true,
        primaryResult: { value: lc_mm, unit: 'mm', formatted: formatEngineeringNumber(lc_mm, 4), label: 'Least Count (LC)' },
        secondaryResults: [
          { label: 'Least Count in Micrometers', formatted: formatEngineeringNumber(lc_um, 1), unit: 'µm' },
          { label: 'Value of 1 VSD', formatted: formatEngineeringNumber(msd - lc_mm, 4), unit: 'mm' }
        ],
        steps: [
          'Formula: Least Count = 1 MSD / Total Vernier Scale Divisions (N)',
          `Substitution: LC = ${msd} mm / ${n}`,
          `Result: LC = ${formatEngineeringNumber(lc_mm, 4)} mm (${formatEngineeringNumber(lc_um, 1)} µm)`
        ]
      };
    }

    case 'micrometer_least_count': {
      const pitch = parseFloat(inputs.pitch);
      const divs = parseInt(inputs.divs, 10);
      if (isNaN(pitch) || isNaN(divs)) return { error: 'Please enter valid screw pitch and divisions.' };
      if (pitch <= 0 || divs <= 0) return { error: 'Pitch and circular divisions must be strictly positive.' };

      const lc_mm = pitch / divs;
      const lc_um = lc_mm * 1000;

      return {
        success: true,
        primaryResult: { value: lc_mm, unit: 'mm', formatted: formatEngineeringNumber(lc_mm, 4), label: 'Least Count (LC)' },
        secondaryResults: [
          { label: 'Least Count in Micrometers', formatted: formatEngineeringNumber(lc_um, 1), unit: 'µm' },
          { label: 'Resolution in Inches', formatted: formatEngineeringNumber(lc_mm / 25.4, 5), unit: 'in' }
        ],
        steps: [
          'Formula: LC = Screw Pitch / Number of Circular Divisions',
          `Substitution: LC = ${pitch} mm / ${divs}`,
          `Result: LC = ${formatEngineeringNumber(lc_mm, 4)} mm (${formatEngineeringNumber(lc_um, 1)} µm)`
        ]
      };
    }

    case 'measurement_error': {
      const measured = parseFloat(inputs.measured);
      const true_val = parseFloat(inputs.true_val);
      if (isNaN(measured) || isNaN(true_val)) return { error: 'Please enter valid measured and standard reference values.' };

      const error = measured - true_val;
      const absError = Math.abs(error);

      if (true_val === 0) {
        return {
          success: true,
          primaryResult: { value: absError, unit: '', formatted: formatEngineeringNumber(absError), label: 'Absolute Error (|X_m - X_true|)' },
          secondaryResults: [
            { label: 'Signed Error', formatted: formatEngineeringNumber(error), unit: '' },
            { label: 'Relative & Percentage Error', formatted: 'UNDEFINED (Reference True Value is 0)', unit: '' }
          ],
          steps: [
            'Signed Error: Error = Measured - True = ' + measured + ' - 0 = ' + formatEngineeringNumber(error),
            'Absolute Error: |' + formatEngineeringNumber(error) + '| = ' + formatEngineeringNumber(absError),
            'Percentage Error: Undefined because dividing by zero true value is mathematically invalid.'
          ],
          warnings: ['Notice: Relative and Percentage errors are undefined when true reference value is 0.']
        };
      }

      const relError = absError / Math.abs(true_val);
      const pctError = relError * 100;

      return {
        success: true,
        primaryResult: { value: pctError, unit: '%', formatted: formatEngineeringNumber(pctError, 3) + '%', label: 'Percentage Error' },
        secondaryResults: [
          { label: 'Absolute Error', formatted: formatEngineeringNumber(absError, 4), unit: '' },
          { label: 'Relative Error', formatted: formatEngineeringNumber(relError, 5), unit: '' },
          { label: 'Signed Systematic Error', formatted: formatEngineeringNumber(error, 4), unit: '' }
        ],
        steps: [
          `Signed Error: Error = Measured - True = ${measured} - ${true_val} = ${formatEngineeringNumber(error, 4)}`,
          `Absolute Error: |Error| = ${formatEngineeringNumber(absError, 4)}`,
          `Relative Error: |Error| / |True| = ${formatEngineeringNumber(absError, 4)} / ${Math.abs(true_val)} = ${formatEngineeringNumber(relError, 5)}`,
          `Percentage Error: ${formatEngineeringNumber(relError, 5)} × 100% = ${formatEngineeringNumber(pctError, 3)}%`
        ]
      };
    }

    // ================= EXPANDED CALCULATORS =================
    case 'beam_bending': {
      const M = parseFloat(inputs.M); // N·m
      const b = parseFloat(inputs.b); // mm
      const h = parseFloat(inputs.h); // mm
      if (isNaN(M) || isNaN(b) || isNaN(h)) return { error: 'Please enter valid numbers for moment, width, and height.' };
      if (b <= 0 || h <= 0) return { error: 'Beam cross-section dimensions must be strictly positive.' };

      // I = b * h^3 / 12 in mm^4
      const I_mm4 = (b * Math.pow(h, 3)) / 12;
      // Z = b * h^2 / 6 in mm^3
      const Z_mm3 = (b * Math.pow(h, 2)) / 6;
      // M in N·mm = M * 1000
      const M_Nmm = M * 1000;
      // sigma_max = M_Nmm / Z_mm3 in MPa
      const sigma_MPa = M_Nmm / Z_mm3;

      return {
        success: true,
        primaryResult: { value: sigma_MPa, unit: 'MPa', formatted: formatEngineeringNumber(sigma_MPa, 2), label: 'Max Bending Stress (σ_max)' },
        secondaryResults: [
          { label: 'Section Modulus (Z)', formatted: formatEngineeringNumber(Z_mm3, 1), unit: 'mm³' },
          { label: 'Moment of Inertia (I)', formatted: formatEngineeringNumber(I_mm4, 1), unit: 'mm⁴' },
          { label: 'Neutral Axis Distance (c = h/2)', formatted: formatEngineeringNumber(h / 2, 1), unit: 'mm' }
        ],
        steps: [
          'Formula: σ = (M × y) / I = M / Z',
          `Section Modulus: Z = (b × h²) / 6 = (${b} × ${h}²) / 6 = ${formatEngineeringNumber(Z_mm3, 1)} mm³`,
          `Moment in N·mm: M = ${M} N·m × 1000 = ${formatEngineeringNumber(M_Nmm)} N·mm`,
          `Calculation: σ_max = ${formatEngineeringNumber(M_Nmm)} N·mm / ${formatEngineeringNumber(Z_mm3, 1)} mm³ = ${formatEngineeringNumber(sigma_MPa, 2)} MPa (N/mm²)`
        ]
      };
    }

    case 'angle_of_twist': {
      const T = parseFloat(inputs.T); // N·m
      const L = parseFloat(inputs.L); // m
      const d_mm = parseFloat(inputs.d); // mm
      const G_GPa = parseFloat(inputs.G_GPa ?? 79.3); // GPa
      if (isNaN(T) || isNaN(L) || isNaN(d_mm) || isNaN(G_GPa)) return { error: 'Please enter valid numbers.' };
      if (d_mm <= 0 || L <= 0 || G_GPa <= 0) return { error: 'Dimensions and shear modulus must be strictly positive.' };

      const d_m = d_mm / 1000;
      const G_Pa = G_GPa * 1e9;
      // J = pi * d^4 / 32 in m^4
      const J_m4 = (Math.PI * Math.pow(d_m, 4)) / 32;
      // theta in radians = (T * L) / (G * J)
      const theta_rad = (T * L) / (G_Pa * J_m4);
      const theta_deg = theta_rad * (180 / Math.PI);

      return {
        success: true,
        primaryResult: { value: theta_deg, unit: 'degrees', formatted: formatEngineeringNumber(theta_deg, 3) + '°', label: 'Angle of Twist (θ)' },
        secondaryResults: [
          { label: 'Deflection in Radians', formatted: formatEngineeringNumber(theta_rad, 5), unit: 'rad' },
          { label: 'Polar Moment of Inertia (J)', formatted: formatEngineeringNumber(J_m4 * 1e12, 1), unit: 'mm⁴' },
          { label: 'Twist per Unit Length', formatted: formatEngineeringNumber(theta_deg / L, 3), unit: 'deg/m' }
        ],
        steps: [
          'Formula: θ = (T × L) / (G × J)',
          `Polar moment of area: J = (π × d⁴) / 32 = (π × ${d_mm}⁴) / 32 = ${formatEngineeringNumber(J_m4 * 1e12, 1)} mm⁴`,
          `Substitution: θ = (${T} N·m × ${L} m) / (${G_GPa}×10⁹ Pa × ${formatEngineeringNumber(J_m4)} m⁴)`,
          `Result in Radians: θ = ${formatEngineeringNumber(theta_rad, 5)} rad`,
          `Result in Degrees: θ = ${formatEngineeringNumber(theta_rad, 5)} × (180/π) = ${formatEngineeringNumber(theta_deg, 3)}°`
        ]
      };
    }

    case 'thin_cylinder': {
      const p_bar = parseFloat(inputs.p);
      const d = parseFloat(inputs.d); // mm
      const t = parseFloat(inputs.t); // mm
      if (isNaN(p_bar) || isNaN(d) || isNaN(t)) return { error: 'Please enter valid pressure and cylinder dimensions.' };
      if (d <= 0 || t <= 0) return { error: 'Diameter and thickness must be strictly positive.' };

      // 1 bar = 0.1 MPa
      const p_MPa = p_bar * 0.1;
      const sigma_hoop = (p_MPa * d) / (2 * t);
      const sigma_long = (p_MPa * d) / (4 * t);
      const dt_ratio = d / t;

      const warnings = [];
      if (dt_ratio < 10) {
        warnings.push('Warning: Diameter to thickness ratio (d/t) is less than 10. Thick-walled cylinder theory (Lamé equations) should be used for accurate stress analysis.');
      }

      return {
        success: true,
        primaryResult: { value: sigma_hoop, unit: 'MPa', formatted: formatEngineeringNumber(sigma_hoop, 2), label: 'Hoop Stress (σ_hoop)' },
        secondaryResults: [
          { label: 'Longitudinal Stress (σ_long)', formatted: formatEngineeringNumber(sigma_long, 2), unit: 'MPa' },
          { label: 'Diameter-to-Thickness Ratio', formatted: formatEngineeringNumber(dt_ratio, 1), unit: 'd/t' },
          { label: 'Internal Pressure in MPa', formatted: formatEngineeringNumber(p_MPa, 3), unit: 'MPa' }
        ],
        steps: [
          'Formulas: σ_hoop = (p × d) / (2t)   |   σ_long = (p × d) / (4t)',
          `Pressure normalization: p = ${p_bar} bar = ${formatEngineeringNumber(p_MPa, 3)} MPa`,
          `Hoop Stress: σ_hoop = (${formatEngineeringNumber(p_MPa, 3)} × ${d}) / (2 × ${t}) = ${formatEngineeringNumber(sigma_hoop, 2)} MPa`,
          `Longitudinal Stress: σ_long = σ_hoop / 2 = ${formatEngineeringNumber(sigma_long, 2)} MPa`
        ],
        warnings
      };
    }

    case 'darcy_weisbach': {
      const f = parseFloat(inputs.f);
      const L = parseFloat(inputs.L); // m
      const D_mm = parseFloat(inputs.D); // mm
      const V = parseFloat(inputs.V); // m/s
      const g = 9.80665;
      if (isNaN(f) || isNaN(L) || isNaN(D_mm) || isNaN(V)) return { error: 'Please enter valid pipe flow parameters.' };
      if (D_mm <= 0 || L <= 0 || f <= 0) return { error: 'Pipe dimensions and friction factor must be strictly positive.' };

      const D_m = D_mm / 1000;
      // h_f = f * (L/D) * (V^2 / 2g) in meters
      const h_f = f * (L / D_m) * (Math.pow(V, 2) / (2 * g));
      // deltaP = rho * g * h_f with rho = 1000 (water)
      const deltaP_kPa = (1000 * g * h_f) / 1000;

      return {
        success: true,
        primaryResult: { value: h_f, unit: 'm', formatted: formatEngineeringNumber(h_f, 3), label: 'Frictional Head Loss (h_f)' },
        secondaryResults: [
          { label: 'Pressure Drop (Water)', formatted: formatEngineeringNumber(deltaP_kPa, 2), unit: 'kPa' },
          { label: 'Pressure Drop in Bar', formatted: formatEngineeringNumber(deltaP_kPa / 100, 4), unit: 'bar' },
          { label: 'Velocity Head (V²/2g)', formatted: formatEngineeringNumber(Math.pow(V, 2) / (2 * g), 3), unit: 'm' }
        ],
        steps: [
          'Formula: h_f = f × (L / D) × (V² / 2g)',
          `Pipe Diameter: D = ${D_mm} mm = ${formatEngineeringNumber(D_m, 4)} m`,
          `Velocity Head: V² / (2g) = (${V})² / (2 × 9.80665) = ${formatEngineeringNumber(Math.pow(V, 2) / (2 * g), 4)} m`,
          `Substitution: h_f = ${f} × (${L} / ${formatEngineeringNumber(D_m, 4)}) × ${formatEngineeringNumber(Math.pow(V, 2) / (2 * g), 4)}`,
          `Result: h_f = ${formatEngineeringNumber(h_f, 3)} m (Δp = ${formatEngineeringNumber(deltaP_kPa, 2)} kPa)`
        ]
      };
    }

    case 'newton_cooling': {
      const h = parseFloat(inputs.h);
      const A = parseFloat(inputs.A);
      const Ts = parseFloat(inputs.Ts);
      const Tinf = parseFloat(inputs.Tinf);
      if (isNaN(h) || isNaN(A) || isNaN(Ts) || isNaN(Tinf)) return { error: 'Please enter valid heat transfer values.' };
      if (h <= 0 || A <= 0) return { error: 'Convection coefficient and area must be positive.' };

      const deltaT = Ts - Tinf;
      const Q_W = h * A * deltaT;
      const heatFlux = h * deltaT;

      return {
        success: true,
        primaryResult: { value: Math.abs(Q_W), unit: 'W', formatted: formatEngineeringNumber(Math.abs(Q_W), 2), label: 'Convective Heat Transfer Rate (Q̇)' },
        secondaryResults: [
          { label: 'Heat Rate in Kilowatts', formatted: formatEngineeringNumber(Math.abs(Q_W) / 1000, 3), unit: 'kW' },
          { label: 'Convective Heat Flux (q″)', formatted: formatEngineeringNumber(Math.abs(heatFlux), 1), unit: 'W/m²' },
          { label: 'Heat Flow Direction', formatted: deltaT >= 0 ? 'Surface ➔ Fluid (Cooling)' : 'Fluid ➔ Surface (Heating)', unit: '' }
        ],
        steps: [
          'Formula: Q̇ = h × A × (T_surface - T_fluid)',
          `Temperature differential: ΔT = ${Ts}°C - ${Tinf}°C = ${formatEngineeringNumber(deltaT)} K (or °C)`,
          `Substitution: Q̇ = ${h} W/(m²·K) × ${A} m² × ${formatEngineeringNumber(deltaT)} K = ${formatEngineeringNumber(Q_W, 2)} W`,
          `Heat Flux: q″ = Q / A = ${formatEngineeringNumber(heatFlux, 1)} W/m²`
        ]
      };
    }

    case 'stefan_boltzmann': {
      const eps = parseFloat(inputs.eps);
      const A = parseFloat(inputs.A);
      const T1_C = parseFloat(inputs.T1_C);
      const T2_C = parseFloat(inputs.T2_C);
      const sigma = 5.670374e-8; // W/(m^2 * K^4)
      if (isNaN(eps) || isNaN(A) || isNaN(T1_C) || isNaN(T2_C)) return { error: 'Please enter valid numbers.' };
      if (eps <= 0 || eps > 1.0 || A <= 0) return { error: 'Emissivity must be between 0 and 1.0; area must be positive.' };

      const T1_K = T1_C + 273.15;
      const T2_K = T2_C + 273.15;
      if (T1_K <= 0 || T2_K <= 0) return { error: 'Temperatures must be strictly above Absolute Zero.' };

      // Q = eps * sigma * A * (T1^4 - T2^4)
      const Q_W = eps * sigma * A * (Math.pow(T1_K, 4) - Math.pow(T2_K, 4));

      return {
        success: true,
        primaryResult: { value: Math.abs(Q_W), unit: 'W', formatted: formatEngineeringNumber(Math.abs(Q_W), 2), label: 'Radiative Heat Transfer (Q̇)' },
        secondaryResults: [
          { label: 'Thermal Radiation in kW', formatted: formatEngineeringNumber(Math.abs(Q_W) / 1000, 3), unit: 'kW' },
          { label: 'Surface Absolute Temp', formatted: formatEngineeringNumber(T1_K, 1), unit: 'K' },
          { label: 'Surroundings Absolute Temp', formatted: formatEngineeringNumber(T2_K, 1), unit: 'K' }
        ],
        steps: [
          'Formula: Q̇ = ε × σ × A × (T₁⁴ - T₂⁴)   (MUST USE KELVIN)',
          `Absolute temperatures: T₁ = ${T1_C}°C + 273.15 = ${formatEngineeringNumber(T1_K, 1)} K, T₂ = ${T2_C}°C + 273.15 = ${formatEngineeringNumber(T2_K, 1)} K`,
          `Fourth-power difference: (${formatEngineeringNumber(T1_K, 1)})⁴ - (${formatEngineeringNumber(T2_K, 1)})⁴ = ${formatEngineeringNumber(Math.pow(T1_K, 4) - Math.pow(T2_K, 4))}`,
          `Substitution: Q̇ = ${eps} × (5.6704×10⁻⁸) × ${A} × (...) = ${formatEngineeringNumber(Q_W, 2)} W`
        ]
      };
    }

    case 'cutting_speed': {
      const D = parseFloat(inputs.D); // mm
      const N = parseFloat(inputs.N); // rpm
      const f = parseFloat(inputs.f); // mm/rev
      const d_cut = parseFloat(inputs.d_cut); // mm
      if (isNaN(D) || isNaN(N) || isNaN(f) || isNaN(d_cut)) return { error: 'Please enter valid machining parameters.' };
      if (D <= 0 || N <= 0 || f <= 0 || d_cut <= 0) return { error: 'All machining inputs must be strictly positive.' };

      // Vc = (pi * D * N) / 1000 in m/min
      const Vc = (Math.PI * D * N) / 1000;
      // MRR = Vc * f * d_cut * 1000 in mm^3/min
      const mrr_mm3 = Vc * f * d_cut * 1000;
      const mrr_cm3 = mrr_mm3 / 1000;

      return {
        success: true,
        primaryResult: { value: Vc, unit: 'm/min', formatted: formatEngineeringNumber(Vc, 2), label: 'Cutting Speed (V_c)' },
        secondaryResults: [
          { label: 'Material Removal Rate', formatted: formatEngineeringNumber(mrr_cm3, 2), unit: 'cm³/min' },
          { label: 'MRR in mm³/min', formatted: formatEngineeringNumber(mrr_mm3, 0), unit: 'mm³/min' },
          { label: 'Speed in Feet per Min', formatted: formatEngineeringNumber(Vc * 3.28084, 1), unit: 'SFM' }
        ],
        steps: [
          'Formula: V_c = (π × D × N) / 1000  (m/min)',
          `Substitution: V_c = (π × ${D} mm × ${N} rpm) / 1000 = ${formatEngineeringNumber(Vc, 2)} m/min`,
          'Formula: MRR = V_c × f × d_cut × 1000  (mm³/min)',
          `Substitution: MRR = ${formatEngineeringNumber(Vc, 2)} × ${f} × ${d_cut} × 1000 = ${formatEngineeringNumber(mrr_mm3, 0)} mm³/min (${formatEngineeringNumber(mrr_cm3, 2)} cm³/min)`
        ]
      };
    }

    // ================= NEW ADVANCED ENGINEERING SOLVERS =================
    case 'beam_deflection': {
      const caseType = inputs.case_type || 'simply_supported_point';
      const F = parseFloat(inputs.F);
      const L = parseFloat(inputs.L);
      const E_GPa = parseFloat(inputs.E_GPa);
      const I_cm4 = parseFloat(inputs.I_cm4);

      if (isNaN(F) || isNaN(L) || isNaN(E_GPa) || isNaN(I_cm4)) return { error: 'Please enter valid numerical inputs.' };
      if (F <= 0 || L <= 0 || E_GPa <= 0 || I_cm4 <= 0) return { error: 'Force, span, modulus, and moment of inertia must be strictly positive.' };

      const E_Pa = E_GPa * 1e9;
      const I_m4 = I_cm4 * 1e-8; // 1 cm^4 = 1e-8 m^4
      const EI = E_Pa * I_m4; // N*m^2

      let delta_m = 0;
      let caseDesc = '';
      let denomConstant = 48;

      if (caseType === 'cantilever_point') {
        // delta = F * L^3 / (3 * E * I)
        denomConstant = 3;
        delta_m = (F * Math.pow(L, 3)) / (3 * EI);
        caseDesc = 'Cantilever Beam with End Point Load (C = 3)';
      } else if (caseType === 'simply_supported_udl') {
        // delta = 5 * W * L^3 / (384 * E * I) where W is total distributed load
        delta_m = (5 * F * Math.pow(L, 3)) / (384 * EI);
        denomConstant = 384 / 5;
        caseDesc = 'Simply Supported Beam with Total UDL F (C = 384/5 = 76.8)';
      } else {
        // default simply_supported_point: delta = F * L^3 / (48 * E * I)
        denomConstant = 48;
        delta_m = (F * Math.pow(L, 3)) / (48 * EI);
        caseDesc = 'Simply Supported Beam with Center Point Load (C = 48)';
      }

      const delta_mm = delta_m * 1000;
      const stiffness_Npm = F / delta_m; // N/m
      const stiffness_Np_mm = stiffness_Npm / 1000; // N/mm

      return {
        success: true,
        primaryResult: { value: delta_mm, unit: 'mm', formatted: formatEngineeringNumber(delta_mm, 3), label: 'Maximum Deflection (δ_max)' },
        secondaryResults: [
          { label: 'Equivalent Stiffness (k)', formatted: formatEngineeringNumber(stiffness_Np_mm, 2), unit: 'N/mm' },
          { label: 'Flexural Rigidity (E·I)', formatted: formatEngineeringNumber(EI, 1), unit: 'N·m²' },
          { label: 'Deflection in Inches', formatted: formatEngineeringNumber(delta_mm / 25.4, 4), unit: 'in' },
          { label: 'Span-to-Deflection Ratio', formatted: `L / ${formatEngineeringNumber(L / delta_m, 0)}`, unit: '' }
        ],
        steps: [
          `Load case: ${caseDesc}`,
          `Unit conversions: E = ${E_GPa} GPa = ${formatEngineeringNumber(E_Pa)} Pa, I = ${I_cm4} cm⁴ = ${formatEngineeringNumber(I_m4)} m⁴`,
          `Flexural Rigidity: E·I = ${formatEngineeringNumber(EI, 1)} N·m²`,
          `Deflection Formula: δ = (F × L³) / (${denomConstant} × E·I)`,
          `Substitution: δ = (${F} × ${L}³) / (${denomConstant} × ${formatEngineeringNumber(EI, 1)}) = ${formatEngineeringNumber(delta_m, 6)} m = ${formatEngineeringNumber(delta_mm, 3)} mm`
        ]
      };
    }

    case 'euler_buckling': {
      const condition = inputs.end_condition || 'pinned_pinned';
      const E_GPa = parseFloat(inputs.E_GPa);
      const I_cm4 = parseFloat(inputs.I_cm4);
      const L = parseFloat(inputs.L);
      const area_cm2 = parseFloat(inputs.area_cm2);

      if (isNaN(E_GPa) || isNaN(I_cm4) || isNaN(L) || isNaN(area_cm2)) return { error: 'Please enter valid column parameters.' };
      if (E_GPa <= 0 || I_cm4 <= 0 || L <= 0 || area_cm2 <= 0) return { error: 'Elastic modulus, inertia, length, and area must be positive.' };

      let K = 1.0;
      let condName = 'Pinned - Pinned';
      if (condition === 'fixed_fixed') { K = 0.5; condName = 'Fixed - Fixed'; }
      else if (condition === 'fixed_pinned') { K = 0.707; condName = 'Fixed - Pinned'; }
      else if (condition === 'fixed_free') { K = 2.0; condName = 'Fixed - Free (Cantilever)'; }

      const E_Pa = E_GPa * 1e9;
      const I_m4 = I_cm4 * 1e-8;
      const A_m2 = area_cm2 * 1e-4; // 1 cm^2 = 1e-4 m^2
      const effectiveLength = K * L;

      // P_cr = (pi^2 * E * I) / (K * L)^2
      const P_cr_N = (Math.PI * Math.PI * E_Pa * I_m4) / Math.pow(effectiveLength, 2);
      const P_cr_kN = P_cr_N / 1000;
      const sigma_cr_Pa = P_cr_N / A_m2;
      const sigma_cr_MPa = sigma_cr_Pa / 1e6;

      // Radius of gyration r = sqrt(I / A)
      const r_gyr_m = Math.sqrt(I_m4 / A_m2);
      const slenderness = effectiveLength / r_gyr_m;

      return {
        success: true,
        primaryResult: { value: P_cr_kN, unit: 'kN', formatted: formatEngineeringNumber(P_cr_kN, 2), label: 'Critical Buckling Load (P_cr)' },
        secondaryResults: [
          { label: 'Critical Buckling Stress', formatted: formatEngineeringNumber(sigma_cr_MPa, 2), unit: 'MPa' },
          { label: 'Column Slenderness Ratio (λ)', formatted: formatEngineeringNumber(slenderness, 1), unit: '' },
          { label: 'Effective Length (L_eff)', formatted: formatEngineeringNumber(effectiveLength, 3), unit: 'm' },
          { label: 'Radius of Gyration (r)', formatted: formatEngineeringNumber(r_gyr_m * 1000, 2), unit: 'mm' }
        ],
        steps: [
          `End boundary: ${condName} (Effective length factor K = ${K})`,
          `Effective Length: L_eff = K × L = ${K} × ${L} m = ${formatEngineeringNumber(effectiveLength, 3)} m`,
          'Formula: P_cr = (π² × E × I) / (K × L)²',
          `Substitution: P_cr = (π² × ${formatEngineeringNumber(E_Pa)} × ${formatEngineeringNumber(I_m4)}) / (${formatEngineeringNumber(effectiveLength, 3)})² = ${formatEngineeringNumber(P_cr_N, 0)} N (${formatEngineeringNumber(P_cr_kN, 2)} kN)`,
          `Critical Stress: σ_cr = P_cr / A = ${formatEngineeringNumber(P_cr_N, 0)} / ${formatEngineeringNumber(A_m2)} = ${formatEngineeringNumber(sigma_cr_MPa, 2)} MPa`
        ]
      };
    }

    case 'thermal_expansion': {
      const L = parseFloat(inputs.L);
      const alpha_ppm = parseFloat(inputs.alpha_ppm);
      const delta_T = parseFloat(inputs.delta_T);
      const E_GPa = parseFloat(inputs.E_GPa);

      if (isNaN(L) || isNaN(alpha_ppm) || isNaN(delta_T) || isNaN(E_GPa)) return { error: 'Please enter valid numbers.' };
      if (L <= 0 || alpha_ppm <= 0 || E_GPa <= 0) return { error: 'Length, expansion coefficient, and modulus must be strictly positive.' };

      const alpha = alpha_ppm * 1e-6; // 1/°C
      const delta_L_m = alpha * L * delta_T;
      const delta_L_mm = delta_L_m * 1000;
      const thermal_strain = alpha * delta_T;
      const thermal_stress_MPa = (E_GPa * 1e3) * thermal_strain; // GPa -> MPa * strain

      return {
        success: true,
        primaryResult: { value: delta_L_mm, unit: 'mm', formatted: formatEngineeringNumber(delta_L_mm, 3), label: 'Length Change (ΔL)' },
        secondaryResults: [
          { label: 'Restrained Thermal Stress', formatted: formatEngineeringNumber(Math.abs(thermal_stress_MPa), 2), unit: delta_T >= 0 ? 'MPa (Compressive)' : 'MPa (Tensile)' },
          { label: 'Free Thermal Strain (ε_th)', formatted: formatEngineeringNumber(thermal_strain, 4), unit: '' },
          { label: 'Final Expanded Length', formatted: formatEngineeringNumber(L + delta_L_m, 5), unit: 'm' }
        ],
        steps: [
          'Formula: ΔL = α × L₀ × ΔT',
          `Substitution: ΔL = (${alpha_ppm}×10⁻⁶) × ${L} m × ${delta_T}°C = ${formatEngineeringNumber(delta_L_mm, 3)} mm`,
          'Restrained Stress Formula: σ_th = E × α × ΔT',
          `Substitution: σ_th = ${E_GPa} GPa × (${alpha_ppm}×10⁻⁶) × ${delta_T}°C = ${formatEngineeringNumber(thermal_stress_MPa, 2)} MPa`
        ]
      };
    }

    case 'bolt_torque': {
      const d_mm = parseFloat(inputs.d_mm);
      const F_preload_kN = parseFloat(inputs.F_preload_kN);
      const K_factor = parseFloat(inputs.K_factor);

      if (isNaN(d_mm) || isNaN(F_preload_kN) || isNaN(K_factor)) return { error: 'Please enter valid bolt parameters.' };
      if (d_mm <= 0 || F_preload_kN <= 0 || K_factor <= 0) return { error: 'Diameter, preload, and torque factor must be strictly positive.' };

      const d_m = d_mm / 1000;
      const F_preload_N = F_preload_kN * 1000;
      // T = K * F_i * d
      const T_Nm = K_factor * F_preload_N * d_m;
      const T_ftlb = T_Nm * 0.737562;
      const F_preload_lbf = F_preload_N * 0.224809;

      return {
        success: true,
        primaryResult: { value: T_Nm, unit: 'N·m', formatted: formatEngineeringNumber(T_Nm, 2), label: 'Tightening Torque (T)' },
        secondaryResults: [
          { label: 'Torque in Foot-Pounds', formatted: formatEngineeringNumber(T_ftlb, 2), unit: 'ft·lb' },
          { label: 'Preload Clamping Force', formatted: formatEngineeringNumber(F_preload_kN, 1), unit: 'kN' },
          { label: 'Preload Force in Pounds', formatted: formatEngineeringNumber(F_preload_lbf, 0), unit: 'lbf' }
        ],
        steps: [
          'Formula: T = K × F_i × d',
          `Unit conversions: d = ${d_mm} mm = ${d_m} m, F_i = ${F_preload_kN} kN = ${F_preload_N} N`,
          `Substitution: T = ${K_factor} × ${F_preload_N} N × ${d_m} m = ${formatEngineeringNumber(T_Nm, 2)} N·m`,
          `Imperial equivalent: ${formatEngineeringNumber(T_Nm, 2)} N·m × 0.7376 = ${formatEngineeringNumber(T_ftlb, 2)} ft·lb`
        ]
      };
    }

    case 'drag_lift': {
      const rho = parseFloat(inputs.rho);
      const V = parseFloat(inputs.V);
      const A = parseFloat(inputs.A);
      const Cd = parseFloat(inputs.Cd);
      const Cl = parseFloat(inputs.Cl);

      if (isNaN(rho) || isNaN(V) || isNaN(A) || isNaN(Cd) || isNaN(Cl)) return { error: 'Please enter valid aerodynamic parameters.' };
      if (rho <= 0 || V < 0 || A <= 0 || Cd <= 0) return { error: 'Density, velocity, area, and drag coefficient must be strictly valid.' };

      const dynPressure_Pa = 0.5 * rho * Math.pow(V, 2);
      const F_drag_N = dynPressure_Pa * Cd * A;
      const F_lift_N = dynPressure_Pa * Cl * A;
      const propPower_W = F_drag_N * V;
      const propPower_kW = propPower_W / 1000;
      const propPower_hp = propPower_W / 745.69987;

      return {
        success: true,
        primaryResult: { value: F_drag_N, unit: 'N', formatted: formatEngineeringNumber(F_drag_N, 2), label: 'Aerodynamic Drag Force (F_D)' },
        secondaryResults: [
          { label: 'Aerodynamic Lift Force (F_L)', formatted: formatEngineeringNumber(F_lift_N, 2), unit: 'N' },
          { label: 'Dynamic Pressure (q)', formatted: formatEngineeringNumber(dynPressure_Pa, 1), unit: 'Pa (N/m²)' },
          { label: 'Aerodynamic Drag Power', formatted: formatEngineeringNumber(propPower_kW, 2), unit: 'kW' },
          { label: 'Drag Power in Horsepower', formatted: formatEngineeringNumber(propPower_hp, 2), unit: 'hp' }
        ],
        steps: [
          'Dynamic Pressure Formula: q = 0.5 × ρ × V²',
          `Substitution: q = 0.5 × ${rho} × (${V})² = ${formatEngineeringNumber(dynPressure_Pa, 1)} Pa`,
          'Drag Force Formula: F_D = C_D × q × A',
          `Substitution: F_D = ${Cd} × ${formatEngineeringNumber(dynPressure_Pa, 1)} × ${A} = ${formatEngineeringNumber(F_drag_N, 2)} N`,
          `Lift Force: F_L = ${Cl} × ${formatEngineeringNumber(dynPressure_Pa, 1)} × ${A} = ${formatEngineeringNumber(F_lift_N, 2)} N`,
          `Overcoming Power: P = F_D × V = ${formatEngineeringNumber(propPower_kW, 2)} kW (${formatEngineeringNumber(propPower_hp, 2)} hp)`
        ]
      };
    }

    case 'heat_exchanger_lmtd': {
      const Th_in = parseFloat(inputs.Th_in);
      const Th_out = parseFloat(inputs.Th_out);
      const Tc_in = parseFloat(inputs.Tc_in);
      const Tc_out = parseFloat(inputs.Tc_out);
      const U = parseFloat(inputs.U);
      const A = parseFloat(inputs.A);

      if (isNaN(Th_in) || isNaN(Th_out) || isNaN(Tc_in) || isNaN(Tc_out) || isNaN(U) || isNaN(A)) return { error: 'Please enter valid temperatures and properties.' };
      if (U <= 0 || A <= 0) return { error: 'U-value and surface area must be strictly positive.' };

      // For Counter-flow:
      const dt1 = Th_in - Tc_out;
      const dt2 = Th_out - Tc_in;

      if (dt1 <= 0 || dt2 <= 0) {
        return { error: 'Temperature crossover violation! In counterflow heat exchangers, Th_in must exceed Tc_out and Th_out must exceed Tc_in.' };
      }

      let lmtd = 0;
      if (Math.abs(dt1 - dt2) < 1e-5) {
        lmtd = dt1;
      } else {
        lmtd = (dt1 - dt2) / Math.log(dt1 / dt2);
      }

      const Q_W = U * A * lmtd;
      const Q_kW = Q_W / 1000;

      return {
        success: true,
        primaryResult: { value: lmtd, unit: '°C (or K)', formatted: formatEngineeringNumber(lmtd, 2), label: 'Log-Mean Temp Difference (LMTD)' },
        secondaryResults: [
          { label: 'Heat Transfer Rate (Duty)', formatted: formatEngineeringNumber(Q_kW, 2), unit: 'kW' },
          { label: 'Heat Duty in BTU/hr', formatted: formatEngineeringNumber(Q_W * 3.41214, 0), unit: 'BTU/hr' },
          { label: 'Inlet Approach (ΔT₁)', formatted: formatEngineeringNumber(dt1, 1), unit: '°C' },
          { label: 'Outlet Approach (ΔT₂)', formatted: formatEngineeringNumber(dt2, 1), unit: '°C' }
        ],
        steps: [
          'Counterflow Approach differentials: ΔT₁ = T_h,in - T_c,out, ΔT₂ = T_h,out - T_c,in',
          `Substitution: ΔT₁ = ${Th_in}°C - ${Tc_out}°C = ${formatEngineeringNumber(dt1, 1)} K`,
          `Substitution: ΔT₂ = ${Th_out}°C - ${Tc_in}°C = ${formatEngineeringNumber(dt2, 1)} K`,
          'Formula: ΔT_lm = (ΔT₁ - ΔT₂) / ln(ΔT₁ / ΔT₂)',
          `Substitution: ΔT_lm = (${formatEngineeringNumber(dt1, 1)} - ${formatEngineeringNumber(dt2, 1)}) / ln(${formatEngineeringNumber(dt1/dt2, 4)}) = ${formatEngineeringNumber(lmtd, 2)} °C`,
          `Heat Transfer Rate: Q = U × A × ΔT_lm = ${U} × ${A} × ${formatEngineeringNumber(lmtd, 2)} = ${formatEngineeringNumber(Q_kW, 2)} kW`
        ]
      };
    }

    case 'sensible_heat': {
      const m_dot = parseFloat(inputs.m_dot);
      const cp = parseFloat(inputs.cp);
      const T_in = parseFloat(inputs.T_in);
      const T_out = parseFloat(inputs.T_out);

      if (isNaN(m_dot) || isNaN(cp) || isNaN(T_in) || isNaN(T_out)) return { error: 'Please enter valid thermal parameters.' };
      if (m_dot <= 0 || cp <= 0) return { error: 'Mass flow rate and specific heat must be positive.' };

      const delta_T = T_out - T_in;
      const Q_dot_W = m_dot * cp * delta_T;
      const Q_dot_kW = Q_dot_W / 1000;

      return {
        success: true,
        primaryResult: { value: Math.abs(Q_dot_kW), unit: 'kW', formatted: formatEngineeringNumber(Math.abs(Q_dot_kW), 3), label: 'Sensible Heat Duty (Q̇)' },
        secondaryResults: [
          { label: 'Heat Rate in Watts', formatted: formatEngineeringNumber(Math.abs(Q_dot_W), 1), unit: 'W' },
          { label: 'Heat Rate in BTU/hr', formatted: formatEngineeringNumber(Math.abs(Q_dot_W) * 3.41214, 0), unit: 'BTU/hr' },
          { label: 'Temperature Rise/Drop', formatted: formatEngineeringNumber(delta_T, 2), unit: '°C (or K)' },
          { label: 'Thermal Process Type', formatted: delta_T >= 0 ? 'Heating Process' : 'Cooling Process', unit: '' }
        ],
        steps: [
          'Formula: Q̇ = ṁ × c_p × (T_out - T_in)',
          `Temperature change: ΔT = ${T_out}°C - ${T_in}°C = ${formatEngineeringNumber(delta_T, 2)} K`,
          `Substitution: Q̇ = ${m_dot} kg/s × ${cp} J/(kg·K) × ${formatEngineeringNumber(delta_T, 2)} K = ${formatEngineeringNumber(Q_dot_W, 1)} W = ${formatEngineeringNumber(Q_dot_kW, 3)} kW`
        ]
      };
    }

    case 'milling_speed_feed': {
      const D = parseFloat(inputs.D);
      const vc = parseFloat(inputs.vc);
      const z = parseFloat(inputs.z);
      const fz = parseFloat(inputs.fz);
      const ap = parseFloat(inputs.ap);
      const ae = parseFloat(inputs.ae);

      if (isNaN(D) || isNaN(vc) || isNaN(z) || isNaN(fz) || isNaN(ap) || isNaN(ae)) return { error: 'Please enter valid milling parameters.' };
      if (D <= 0 || vc <= 0 || z < 1 || fz <= 0 || ap <= 0 || ae <= 0) return { error: 'All cutter geometry and cutting parameters must be positive.' };

      // Spindle speed N = (vc * 1000) / (pi * D)
      const N_rpm = (vc * 1000) / (Math.PI * D);
      // Table feed rate vf = fz * z * N
      const vf_mm_min = fz * z * N_rpm;
      // MRR = (ae * ap * vf) / 1000 cm^3/min
      const mrr_cm3_min = (ae * ap * vf_mm_min) / 1000;

      return {
        success: true,
        primaryResult: { value: vf_mm_min, unit: 'mm/min', formatted: formatEngineeringNumber(vf_mm_min, 1), label: 'Table Feed Velocity (v_f)' },
        secondaryResults: [
          { label: 'Calculated Spindle Speed', formatted: formatEngineeringNumber(N_rpm, 0), unit: 'rpm' },
          { label: 'Material Removal Rate (MRR)', formatted: formatEngineeringNumber(mrr_cm3_min, 2), unit: 'cm³/min' },
          { label: 'Feed per Revolution', formatted: formatEngineeringNumber(fz * z, 3), unit: 'mm/rev' },
          { label: 'Feed Velocity in IPM', formatted: formatEngineeringNumber(vf_mm_min / 25.4, 2), unit: 'in/min' }
        ],
        steps: [
          'Spindle Speed Formula: N = (v_c × 1000) / (π × D)',
          `Substitution: N = (${vc} × 1000) / (π × ${D}) = ${formatEngineeringNumber(N_rpm, 0)} rpm`,
          'Table Feed Formula: v_f = f_z × z × N',
          `Substitution: v_f = ${fz} mm/tooth × ${z} flutes × ${formatEngineeringNumber(N_rpm, 0)} rpm = ${formatEngineeringNumber(vf_mm_min, 1)} mm/min`,
          'MRR Formula: MRR = (a_e × a_p × v_f) / 1000',
          `Substitution: MRR = (${ae} × ${ap} × ${formatEngineeringNumber(vf_mm_min, 1)}) / 1000 = ${formatEngineeringNumber(mrr_cm3_min, 2)} cm³/min`
        ]
      };
    }

    case 'sheet_metal_bending': {
      const angle_deg = parseFloat(inputs.angle_deg);
      const R = parseFloat(inputs.R);
      const t = parseFloat(inputs.t);
      const K_factor = parseFloat(inputs.K_factor);

      if (isNaN(angle_deg) || isNaN(R) || isNaN(t) || isNaN(K_factor)) return { error: 'Please enter valid sheet metal parameters.' };
      if (angle_deg <= 0 || angle_deg > 180 || R < 0 || t <= 0 || K_factor <= 0 || K_factor >= 1.0) {
        return { error: 'Angle (1-180°), thickness (>0), and K-factor (0 < K < 1) must be within physical ranges.' };
      }

      // Bend Allowance BA = (pi / 180) * angle * (R + K * t)
      const BA_mm = (Math.PI / 180) * angle_deg * (R + K_factor * t);
      // Outside Setback OSSB = tan(angle/2 in rad) * (R + t)
      const halfAngleRad = (angle_deg * Math.PI) / 360;
      const OSSB_mm = Math.tan(halfAngleRad) * (R + t);
      // Bend Deduction BD = 2 * OSSB - BA
      const BD_mm = 2 * OSSB_mm - BA_mm;

      return {
        success: true,
        primaryResult: { value: BA_mm, unit: 'mm', formatted: formatEngineeringNumber(BA_mm, 3), label: 'Bend Allowance (BA)' },
        secondaryResults: [
          { label: 'Bend Deduction (BD)', formatted: formatEngineeringNumber(BD_mm, 3), unit: 'mm' },
          { label: 'Outside Setback (OSSB)', formatted: formatEngineeringNumber(OSSB_mm, 3), unit: 'mm' },
          { label: 'Neutral Axis Radius', formatted: formatEngineeringNumber(R + K_factor * t, 3), unit: 'mm' }
        ],
        steps: [
          'Formula: BA = (π / 180) × θ × (R + K × t)',
          `Neutral axis radius: R_n = ${R} mm + (${K_factor} × ${t} mm) = ${formatEngineeringNumber(R + K_factor * t, 3)} mm`,
          `Substitution: BA = (π / 180) × ${angle_deg}° × ${formatEngineeringNumber(R + K_factor * t, 3)} = ${formatEngineeringNumber(BA_mm, 3)} mm`,
          `Outside Setback: OSSB = tan(${angle_deg}° / 2) × (${R} + ${t}) = ${formatEngineeringNumber(OSSB_mm, 3)} mm`,
          `Bend Deduction: BD = 2 × OSSB - BA = 2 × ${formatEngineeringNumber(OSSB_mm, 3)} - ${formatEngineeringNumber(BA_mm, 3)} = ${formatEngineeringNumber(BD_mm, 3)} mm`
        ]
      };
    }

    case 'natural_frequency': {
      const k_Npmm = parseFloat(inputs.k); // N/mm
      const m_kg = parseFloat(inputs.m); // kg
      const c = parseFloat(inputs.c); // N*s/m

      if (isNaN(k_Npmm) || isNaN(m_kg) || isNaN(c)) return { error: 'Please enter valid vibration parameters.' };
      if (k_Npmm <= 0 || m_kg <= 0 || c < 0) return { error: 'Stiffness and mass must be positive; damping cannot be negative.' };

      const k_Npm = k_Npmm * 1000; // N/m
      const omega_n = Math.sqrt(k_Npm / m_kg); // rad/s
      const f_n = omega_n / (2 * Math.PI); // Hz
      const T_n = 1 / f_n; // s
      const c_c = 2 * Math.sqrt(k_Npm * m_kg); // N*s/m
      const zeta = c / c_c; // damping ratio

      let regime = 'Underdamped (Oscillatory)';
      if (Math.abs(zeta - 1.0) < 0.001) regime = 'Critically Damped';
      else if (zeta > 1.0) regime = 'Overdamped (Non-oscillatory)';

      return {
        success: true,
        primaryResult: { value: f_n, unit: 'Hz', formatted: formatEngineeringNumber(f_n, 2), label: 'Cyclic Natural Frequency (f_n)' },
        secondaryResults: [
          { label: 'Angular Natural Frequency (ω_n)', formatted: formatEngineeringNumber(omega_n, 2), unit: 'rad/s' },
          { label: 'Natural Period of Oscillation (T)', formatted: formatEngineeringNumber(T_n, 4), unit: 's' },
          { label: 'Critical Damping Coefficient (c_c)', formatted: formatEngineeringNumber(c_c, 1), unit: 'N·s/m' },
          { label: 'Damping Ratio (ζ)', formatted: `${formatEngineeringNumber(zeta, 3)} (${regime})`, unit: '' }
        ],
        steps: [
          `Unit conversion: Stiffness k = ${k_Npmm} N/mm = ${formatEngineeringNumber(k_Npm)} N/m`,
          'Angular Frequency Formula: ω_n = √(k / m)',
          `Substitution: ω_n = √(${formatEngineeringNumber(k_Npm)} / ${m_kg}) = ${formatEngineeringNumber(omega_n, 2)} rad/s`,
          'Cyclic Frequency Formula: f_n = ω_n / (2π)',
          `Substitution: f_n = ${formatEngineeringNumber(omega_n, 2)} / (2π) = ${formatEngineeringNumber(f_n, 2)} Hz (Period T = ${formatEngineeringNumber(T_n, 4)} s)`,
          `Critical Damping: c_c = 2√(k × m) = ${formatEngineeringNumber(c_c, 1)} N·s/m, Damping Ratio ζ = ${formatEngineeringNumber(zeta, 3)}`
        ]
      };
    }

    default:
      return { error: `Calculator with ID "${calcId}" is not registered in the calculation engine.` };
  }
}


