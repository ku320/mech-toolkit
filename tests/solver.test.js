/**
 * Unit Tests for Mechanical Engineer Toolkit Solver Engine
 */

import { solve } from '../js/engine/solver.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

function assertClose(actual, expected, tolerance, message) {
  const diff = Math.abs(actual - expected);
  if (diff <= tolerance) {
    passed++;
    console.log(`  ✓ ${message} (${actual} ≈ ${expected})`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message} (Actual: ${actual}, Expected: ${expected}, Diff: ${diff})`);
  }
}

console.log('--- Testing Engineering Solver Engine ---');

// 1. Force: F = m * a
const fRes = solve('force', { m: 10, a: 9.81 });
assert(fRes.success, 'Force calculation successful');
assertClose(fRes.primaryResult.value, 98.1, 1e-6, 'F = 10 * 9.81 = 98.1 N');

// Force negative mass guard
const fNeg = solve('force', { m: -5, a: 2 });
assert(Boolean(fNeg.error), 'Force rejects negative mass');

// 2. Weight: W = m * g
const wRes = solve('weight', { m: 50, g: 9.80665 });
assertClose(wRes.primaryResult.value, 490.3325, 1e-4, 'W = 50 * 9.80665 = 490.33 N');

// 3. Torque: T = F * r * sin(theta)
const tRes = solve('torque', { F: 200, r: 0.5, theta: 90 });
assertClose(tRes.primaryResult.value, 100, 1e-6, 'T = 200 * 0.5 * sin(90) = 100 N·m');

// 4. Power: P = 2*pi*N*T / 60
const pRes = solve('power_rot', { N: 1500, T: 100 });
// P = (2 * pi * 1500 * 100) / 60 = 15707.96 W = 15.708 kW
assertClose(pRes.primaryResult.value, 15.70796, 0.01, 'Power = 15.71 kW');

// 5. Stress: sigma = F / A
const sRes = solve('stress', { F: 100000, A: 0.001 });
assertClose(sRes.primaryResult.value, 100, 1e-6, 'Stress = 100,000 / 0.001 = 100 MPa');

// Stress zero area guard
const sZero = solve('stress', { F: 500, A: 0 });
assert(Boolean(sZero.error), 'Stress guards against zero area');

// 6. Strain: epsilon = dL / L0
const stRes = solve('strain', { dL: 0.5, L0: 200 });
assertClose(stRes.primaryResult.value, 0.0025, 1e-6, 'Strain = 0.5 / 200 = 0.0025');

// 7. Factor of Safety
const fosRes = solve('fos', { strength: 250, working: 100 });
assertClose(fosRes.primaryResult.value, 2.5, 1e-6, 'FoS = 250 / 100 = 2.5');

// 8. Efficiency
const effRes = solve('mech_eff', { Pout: 85, Pin: 100 });
assertClose(effRes.primaryResult.value, 85, 1e-6, 'Efficiency = 85%');

// Efficiency violation warning
const effOver = solve('mech_eff', { Pout: 120, Pin: 100 });
assert(effOver.warnings.length > 0, 'Efficiency > 100% generates thermodynamic alert');

// 9. Shaft Diameter
// T = 350 N*m, tau = 45 MPa (45e6 Pa)
// d = [ (16 * 350) / (pi * 45e6) ] ^ (1/3)
const shaftRes = solve('shaft_diameter', { T: 350, tau: 45 });
assert(shaftRes.success, 'Shaft diameter calculation succeeds');
assertClose(shaftRes.primaryResult.value, 34.09, 0.2, 'Shaft diameter ≈ 34.1 mm');

// 10. Gear Ratio
const gearRes = solve('gear_ratio', { Z1: 20, Z2: 60, N1: 1500 });
assertClose(gearRes.primaryResult.value, 3.0, 1e-6, 'Gear ratio 60/20 = 3');

// 11. Belt Length
const beltRes = solve('belt_length', { C: 500, D: 200, d: 100 });
assert(beltRes.success, 'Belt length succeeds');

// 12. Bearing Life
const bearRes = solve('bearing_life', { C: 25, P: 5, N: 1500, p: 3 });
// L10 = (25/5)^3 = 125 million revs
assert(bearRes.success, 'Bearing life succeeds');

// 13. Spring Calculation
const sprRes = solve('spring_calc', { d: 4, D: 32, Na: 8, G: 79.3, F: 100 });
assert(sprRes.success, 'Spring calculation succeeds');

// 14. Reynolds Number
// rho = 1000, V = 2, D = 0.05, mu = 0.001 => Re = (1000 * 2 * 0.05) / 0.001 = 100,000 (Turbulent)
const reyRes = solve('reynolds', { rho: 1000, V: 2, D: 0.05, mu: 0.001 });
assertClose(reyRes.primaryResult.value, 100000, 1e-3, 'Re = 100,000');
assert(reyRes.secondaryResults[0].formatted.includes('Turbulent'), 'Classified as Turbulent flow');

// 15. Continuity
const contRes = solve('continuity', { d1: 100, V1: 2, d2: 50 });
// d1/d2 = 2 => area ratio = 4 => V2 = 8 m/s
assertClose(contRes.primaryResult.value, 8.0, 1e-6, 'V2 = 8 m/s');

// 16. Carnot Efficiency
// Th = 500 °C (773.15 K), Tc = 25 °C (298.15 K) => 1 - (298.15 / 773.15) = 61.437%
const carnotRes = solve('carnot_eff', { Th_C: 500, Tc_C: 25 });
assertClose(carnotRes.primaryResult.value, 61.44, 0.1, 'Carnot efficiency ≈ 61.4%');

// Carnot Second Law violation guard: Th <= Tc
const carnotErr = solve('carnot_eff', { Th_C: 25, Tc_C: 500 });
assert(Boolean(carnotErr.error), 'Carnot rejects Th <= Tc');

// 17. Refrigerator COP
const refRes = solve('cop_refrigerator', { QL: 12, W: 4 });
assertClose(refRes.primaryResult.value, 3.0, 1e-6, 'COP_R = 12 / 4 = 3');

// 18. Heat Pump COP
const hpRes = solve('cop_heat_pump', { QH: 16, W: 4 });
assertClose(hpRes.primaryResult.value, 4.0, 1e-6, 'COP_HP = 16 / 4 = 4');

// 19. Vernier Least Count
const vernierRes = solve('vernier_least_count', { msd: 1.0, n: 50 });
assertClose(vernierRes.primaryResult.value, 0.02, 1e-6, 'Vernier LC = 1 / 50 = 0.02 mm');

// 20. Micrometer Least Count
const microRes = solve('micrometer_least_count', { pitch: 0.5, divs: 50 });
assertClose(microRes.primaryResult.value, 0.01, 1e-6, 'Micrometer LC = 0.5 / 50 = 0.01 mm');

// 21. Measurement Error
const errRes = solve('measurement_error', { measured: 50.15, true_val: 50.00 });
assertClose(errRes.primaryResult.value, 0.3, 1e-6, '% Error = 0.3%');

// Measurement Error with true_val = 0
const errZero = solve('measurement_error', { measured: 2.5, true_val: 0 });
assert(errZero.success, 'Handles true value = 0 gracefully without crash');

// 22. Beam Bending: M = 4500 N*m, b = 50 mm, h = 100 mm => Z = 50*10000/6 = 83333.33 mm^3 => sigma = 4.5e6 / 83333.33 = 54 MPa
const beamRes = solve('beam_bending', { M: 4500, b: 50, h: 100 });
assert(beamRes.success, 'Beam bending succeeds');
assertClose(beamRes.primaryResult.value, 54.0, 1e-2, 'Bending stress = 54 MPa');

// 23. Angle of Twist
const twistRes = solve('angle_of_twist', { T: 500, L: 1.0, d: 50, G_GPa: 80 });
assert(twistRes.success, 'Angle of twist succeeds');

// 24. Thin Cylinder: p = 10 bar (1.0 MPa), d = 500 mm, t = 5 mm => sigma_hoop = 1.0 * 500 / 10 = 50 MPa
const cylRes = solve('thin_cylinder', { p: 10, d: 500, t: 5 });
assertClose(cylRes.primaryResult.value, 50.0, 1e-4, 'Hoop stress = 50 MPa');

// 25. Darcy-Weisbach: f = 0.02, L = 100 m, D = 100 mm (0.1 m), V = 2 m/s => h_f = 0.02 * 1000 * 4 / 19.6133 = 4.078 m
const dwRes = solve('darcy_weisbach', { f: 0.02, L: 100, D: 100, V: 2 });
assertClose(dwRes.primaryResult.value, 4.0788, 0.02, 'Darcy-Weisbach head loss ≈ 4.08 m');

// 26. Newton's Cooling: h = 40, A = 1.0, Ts = 80, Tinf = 20 => Q = 40 * 1.0 * 60 = 2400 W
const coolRes = solve('newton_cooling', { h: 40, A: 1.0, Ts: 80, Tinf: 20 });
assertClose(coolRes.primaryResult.value, 2400, 1e-4, 'Convective heat = 2400 W');

// 27. Stefan Boltzmann Radiation
const radRes = solve('stefan_boltzmann', { eps: 0.8, A: 1.0, T1_C: 200, T2_C: 20 });
assert(radRes.success, 'Stefan-Boltzmann succeeds');

// 28. Cutting Speed: D = 100 mm, N = 1000 rpm => Vc = pi * 100 * 1000 / 1000 = 314.16 m/min
const cutRes = solve('cutting_speed', { D: 100, N: 1000, f: 0.2, d_cut: 2.0 });
assertClose(cutRes.primaryResult.value, 314.159, 0.01, 'Cutting speed = 314.16 m/min');

// 29. Beam Deflection (Simply Supported Point Load: F = 5000 N, L = 2.5 m, E = 200 GPa, I = 450 cm^4)
// delta = 5000 * 2.5^3 / (48 * 200e9 * 450e-8) = 78125 / 43200000 = 0.00180845 m = 1.808 mm
const deflRes = solve('beam_deflection', { case_type: 'simply_supported_point', F: 5000, L: 2.5, E_GPa: 200, I_cm4: 450 });
assert(deflRes.success, 'Beam deflection succeeds');
assertClose(deflRes.primaryResult.value, 1.808, 0.01, 'Deflection = 1.81 mm');

// 30. Euler Buckling (Pinned-Pinned: E = 205 GPa, I = 120 cm^4, L = 3.0 m, area = 25 cm^2)
// P_cr = (pi^2 * 205e9 * 120e-8) / 3^2 = 269747 N = 269.7 kN
const buckRes = solve('euler_buckling', { end_condition: 'pinned_pinned', E_GPa: 205, I_cm4: 120, L: 3.0, area_cm2: 25 });
assert(buckRes.success, 'Euler buckling succeeds');
assertClose(buckRes.primaryResult.value, 269.75, 0.5, 'Critical load ≈ 269.7 kN');

// 31. Thermal Expansion (L = 4.0 m, alpha = 12 ppm, delta_T = 60 C, E = 200 GPa)
// delta_L = 12e-6 * 4 * 60 = 0.00288 m = 2.88 mm, sigma = 200e3 * (12e-6 * 60) = 144 MPa
const thermRes = solve('thermal_expansion', { L: 4.0, alpha_ppm: 12.0, delta_T: 60, E_GPa: 200 });
assert(thermRes.success, 'Thermal expansion succeeds');
assertClose(thermRes.primaryResult.value, 2.88, 1e-3, 'Thermal expansion ΔL = 2.88 mm');

// 32. Bolt Torque (d = 16 mm, F_preload = 45 kN, K = 0.20)
// T = 0.20 * 45000 * 0.016 = 144 N*m
const boltRes = solve('bolt_torque', { d_mm: 16, F_preload_kN: 45, K_factor: 0.20 });
assert(boltRes.success, 'Bolt torque succeeds');
assertClose(boltRes.primaryResult.value, 144.0, 1e-4, 'Bolt torque = 144 N·m');

// 33. Aerodynamic Drag (rho = 1.225, V = 30, A = 2.2, Cd = 0.32, Cl = 0.15)
// q = 0.5 * 1.225 * 900 = 551.25 Pa => F_D = 551.25 * 0.32 * 2.2 = 388.08 N
const aeroRes = solve('drag_lift', { rho: 1.225, V: 30, A: 2.2, Cd: 0.32, Cl: 0.15 });
assert(aeroRes.success, 'Drag/lift succeeds');
assertClose(aeroRes.primaryResult.value, 388.08, 0.05, 'Aerodynamic drag = 388.08 N');

// 34. Heat Exchanger LMTD (Th_in = 95, Th_out = 55, Tc_in = 20, Tc_out = 45, U = 850, A = 6.5)
// dt1 = 95 - 45 = 50, dt2 = 55 - 20 = 35 => LMTD = (50 - 35)/ln(50/35) = 42.054 K => Q = 850 * 6.5 * 42.054 / 1000 = 232.35 kW
const lmtdRes = solve('heat_exchanger_lmtd', { Th_in: 95, Th_out: 55, Tc_in: 20, Tc_out: 45, U: 850, A: 6.5 });
assert(lmtdRes.success, 'LMTD heat exchanger succeeds');
assertClose(lmtdRes.primaryResult.value, 42.054, 0.01, 'LMTD = 42.05 K');

// 35. Sensible Heat (m_dot = 1.5 kg/s, cp = 4184 J/(kg*K), Tin = 25, Tout = 75)
// Q_dot = 1.5 * 4184 * 50 / 1000 = 313.8 kW
const sensRes = solve('sensible_heat', { m_dot: 1.5, cp: 4184, T_in: 25, T_out: 75 });
assert(sensRes.success, 'Sensible heat succeeds');
assertClose(sensRes.primaryResult.value, 313.8, 0.01, 'Sensible heat = 313.8 kW');

// 36. Milling Speed & Feed (D = 20 mm, vc = 150 m/min, z = 4, fz = 0.08 mm/tooth, ap = 3 mm, ae = 12 mm)
// N = 150000 / (pi * 20) = 2387.32 rpm => vf = 0.08 * 4 * 2387.32 = 763.94 mm/min
const millRes = solve('milling_speed_feed', { D: 20, vc: 150, z: 4, fz: 0.08, ap: 3.0, ae: 12.0 });
assert(millRes.success, 'Milling speed feed succeeds');
assertClose(millRes.primaryResult.value, 763.94, 0.2, 'Milling table feed = 763.94 mm/min');

// 37. Sheet Metal Bending (angle = 90 deg, R = 3.0 mm, t = 2.0 mm, K = 0.40)
// BA = (pi/180) * 90 * (3 + 0.4*2) = (pi/2) * 3.8 = 5.969 mm
const bendRes = solve('sheet_metal_bending', { angle_deg: 90, R: 3.0, t: 2.0, K_factor: 0.40 });
assert(bendRes.success, 'Sheet metal bending succeeds');
assertClose(bendRes.primaryResult.value, 5.969, 0.01, 'Bend allowance = 5.969 mm');

// 38. Natural Frequency (k = 250 N/mm = 250,000 N/m, m = 15 kg, c = 80 N*s/m)
// omega_n = sqrt(250000 / 15) = 129.099 rad/s => f_n = 129.099 / (2*pi) = 20.547 Hz
const vibRes = solve('natural_frequency', { k: 250, m: 15, c: 80 });
assert(vibRes.success, 'Natural frequency succeeds');
assertClose(vibRes.primaryResult.value, 20.547, 0.01, 'Natural frequency = 20.55 Hz');

console.log(`\nSolver Test Results: ${passed} Passed, ${failed} Failed`);
if (failed > 0) process.exit(1);


