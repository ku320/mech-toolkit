/**
 * Unit Tests for Unit Converter Engine
 */

import { convert, formatEngineeringNumber } from '../js/engine/converter.js';

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

console.log('--- Testing Unit Converter ---');

// 1. Length conversion
const lenRes = convert(1, 'length', 'm', 'mm');
assertClose(lenRes.convertedValue, 1000, 1e-6, '1 m = 1000 mm');

const inchRes = convert(1, 'length', 'in', 'mm');
assertClose(inchRes.convertedValue, 25.4, 1e-6, '1 inch = 25.4 mm');

// 2. Pressure conversion
const barRes = convert(1, 'pressure', 'bar', 'kPa');
assertClose(barRes.convertedValue, 100, 1e-6, '1 bar = 100 kPa');

const psiRes = convert(14.6959, 'pressure', 'psi', 'bar');
assertClose(psiRes.convertedValue, 1.01325, 0.01, '14.7 psi ≈ 1.013 bar');

// 3. Temperature conversions
const tempCtoK = convert(100, 'temperature', 'C', 'K');
assertClose(tempCtoK.convertedValue, 373.15, 1e-6, '100 °C = 373.15 K');

const tempFtoC = convert(212, 'temperature', 'F', 'C');
assertClose(tempFtoC.convertedValue, 100, 1e-6, '212 °F = 100 °C');

const tempKtoC = convert(0, 'temperature', 'K', 'C');
assertClose(tempKtoC.convertedValue, -273.15, 1e-6, '0 K = -273.15 °C');

// 4. Force conversion
const forceRes = convert(1, 'force', 'kN', 'N');
assertClose(forceRes.convertedValue, 1000, 1e-6, '1 kN = 1000 N');

// 5. Power conversion
const hpRes = convert(1, 'power', 'hp_mech', 'kW');
assertClose(hpRes.convertedValue, 0.7457, 0.001, '1 hp ≈ 0.7457 kW');

// 6. Formatting
assert(formatEngineeringNumber(0) === '0', 'Format 0 returns "0"');
assert(formatEngineeringNumber(12.345678, 2) === '12.35', 'Format 12.345678 with 2 dec returns 12.35');

// 7. Error handling
const errRes = convert('invalid', 'length', 'm', 'mm');
assert(Boolean(errRes.error), 'Handles NaN input with error object');

console.log(`\nConverter Test Results: ${passed} Passed, ${failed} Failed`);
if (failed > 0) process.exit(1);
