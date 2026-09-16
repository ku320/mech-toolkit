/**
 * Mechanical Engineer Toolkit - Unit Converter Engine
 * Pure deterministic conversion logic with high numerical stability.
 */

import { UNIT_CATEGORIES } from '../data/units.js';

/**
 * Convert temperature between Celsius, Kelvin, Fahrenheit, and Rankine.
 */
function convertTemperature(value, fromUnit, toUnit) {
  // Convert from source to Kelvin first
  let kelvin;
  switch (fromUnit) {
    case 'K':
      kelvin = value;
      break;
    case 'C':
      kelvin = value + 273.15;
      break;
    case 'F':
      kelvin = (value - 32) * (5 / 9) + 273.15;
      break;
    case 'R':
      kelvin = value * (5 / 9);
      break;
    default:
      throw new Error(`Unsupported source temperature unit: ${fromUnit}`);
  }

  // Convert from Kelvin to target
  let result;
  switch (toUnit) {
    case 'K':
      result = kelvin;
      break;
    case 'C':
      result = kelvin - 273.15;
      break;
    case 'F':
      result = (kelvin - 273.15) * (9 / 5) + 32;
      break;
    case 'R':
      result = kelvin * (9 / 5);
      break;
    default:
      throw new Error(`Unsupported target temperature unit: ${toUnit}`);
  }

  return {
    value: result,
    kelvinValue: kelvin,
    isAbsoluteZeroViolation: kelvin < 0
  };
}

/**
 * Format an engineering number cleanly:
 * - If 0, returns "0"
 * - If |value| >= 1e6 or |value| < 1e-4, uses scientific notation
 * - Otherwise shows up to 6 significant digits without trailing zeros
 */
export function formatEngineeringNumber(num, maxDecimals = 6) {
  if (num === null || num === undefined || isNaN(num)) return 'NaN';
  if (!isFinite(num)) return num > 0 ? '∞' : '-∞';
  if (num === 0) return '0';

  const abs = Math.abs(num);
  if (abs >= 1e7 || (abs < 1e-4 && abs > 0)) {
    return num.toExponential(4).replace('e+', 'e');
  }

  const fixed = num.toFixed(maxDecimals);
  // Strip trailing zeros after decimal point
  const trimmed = parseFloat(fixed).toString();
  return trimmed;
}

/**
 * Convert value from source unit to target unit within a category.
 * @param {number} value
 * @param {string} categoryKey
 * @param {string} fromUnit
 * @param {string} toUnit
 */
export function convert(value, categoryKey, fromUnit, toUnit) {
  const category = UNIT_CATEGORIES[categoryKey];
  if (!category) {
    return { error: `Unknown unit category: ${categoryKey}` };
  }

  const num = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(num)) {
    return { error: 'Please enter a valid numeric value' };
  }

  // Same unit shortcut
  if (fromUnit === toUnit) {
    return {
      success: true,
      originalValue: num,
      convertedValue: num,
      formatted: formatEngineeringNumber(num),
      fromSymbol: category.units[fromUnit]?.symbol || fromUnit,
      toSymbol: category.units[toUnit]?.symbol || toUnit,
      factor: 1,
      explanation: `1 ${category.units[fromUnit]?.symbol || fromUnit} = 1 ${category.units[toUnit]?.symbol || toUnit}`
    };
  }

  // Handle temperature separately
  if (category.isSpecial && categoryKey === 'temperature') {
    const tempRes = convertTemperature(num, fromUnit, toUnit);
    return {
      success: true,
      originalValue: num,
      convertedValue: tempRes.value,
      formatted: formatEngineeringNumber(tempRes.value),
      fromSymbol: category.units[fromUnit]?.symbol || fromUnit,
      toSymbol: category.units[toUnit]?.symbol || toUnit,
      warning: tempRes.isAbsoluteZeroViolation ? 'Warning: Value is below absolute zero (0 K)!' : null,
      explanation: `${formatEngineeringNumber(num)} ${category.units[fromUnit]?.symbol} → ${formatEngineeringNumber(tempRes.value)} ${category.units[toUnit]?.symbol}`
    };
  }

  const fromDef = category.units[fromUnit];
  const toDef = category.units[toUnit];

  if (!fromDef || !toDef) {
    return { error: `Invalid units specified: ${fromUnit} or ${toUnit}` };
  }

  // Convert: value * fromFactor / toFactor
  const baseValue = num * fromDef.factor;
  const convertedValue = baseValue / toDef.factor;
  const relativeFactor = fromDef.factor / toDef.factor;

  return {
    success: true,
    originalValue: num,
    convertedValue,
    formatted: formatEngineeringNumber(convertedValue),
    fromSymbol: fromDef.symbol,
    toSymbol: toDef.symbol,
    factor: relativeFactor,
    baseValue,
    explanation: `1 ${fromDef.symbol} = ${formatEngineeringNumber(relativeFactor)} ${toDef.symbol}`
  };
}
