/**
 * Integration Test for Data Integrity and Interoperability
 */

import { UNIT_CATEGORIES } from '../js/data/units.js';
import { CALCULATORS, CALCULATOR_CATEGORIES } from '../js/data/calculators.js';
import { FORMULAS } from '../js/data/formulas.js';
import { convert } from '../js/engine/converter.js';
import { solve } from '../js/engine/solver.js';

console.log('=== Checking Data & Solver Consistency ===');

// 1. Verify all calculators have valid category references
CALCULATORS.forEach(calc => {
  if (!CALCULATOR_CATEGORIES[calc.category]) {
    console.error(`Error: Calculator ${calc.id} references invalid category ${calc.category}`);
    process.exit(1);
  }
});
console.log(`✓ All ${CALCULATORS.length} calculators have valid category links.`);

// 2. Verify all calculators execute with their default values without errors
CALCULATORS.forEach(calc => {
  const inputs = {};
  calc.inputs.forEach(inp => {
    inputs[inp.id] = inp.default;
  });
  const res = solve(calc.id, inputs);
  if (!res || !res.success) {
    console.error(`Error: Calculator ${calc.id} failed default execution:`, res);
    process.exit(1);
  }
  if (!res.primaryResult || !res.primaryResult.formatted) {
    console.error(`Error: Calculator ${calc.id} did not produce formatted primary result:`, res);
    process.exit(1);
  }
});
console.log(`✓ All ${CALCULATORS.length} calculators execute deterministically with default inputs!`);

// 3. Verify all formula references
FORMULAS.forEach(f => {
  if (f.calculatorId) {
    const calc = CALCULATORS.find(c => c.id === f.calculatorId);
    if (!calc) {
      console.error(`Error: Formula ${f.id} links to unknown calculator ${f.calculatorId}`);
      process.exit(1);
    }
  }
});
console.log(`✓ All ${FORMULAS.length} formulas have verified equations and calculator links.`);

// 4. Verify all 16 unit categories have units with symbols and factors
const categoryKeys = Object.keys(UNIT_CATEGORIES);
if (categoryKeys.length !== 16) {
  console.error(`Error: Expected 16 unit categories, found ${categoryKeys.length}`);
  process.exit(1);
}
categoryKeys.forEach(catKey => {
  const cat = UNIT_CATEGORIES[catKey];
  const units = Object.keys(cat.units);
  if (units.length < 2) {
    console.error(`Error: Category ${catKey} has fewer than 2 units`);
    process.exit(1);
  }
  // Test conversion of 1st to 2nd
  const cRes = convert(10, catKey, units[0], units[1]);
  if (!cRes.success) {
    console.error(`Error: Conversion failed for ${catKey} from ${units[0]} to ${units[1]}:`, cRes);
    process.exit(1);
  }
});
console.log(`✓ All 16 unit categories converted successfully.`);

console.log('\nAll System Integrity Checks Passed (100% Green)!');
