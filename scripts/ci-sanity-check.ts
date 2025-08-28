#!/usr/bin/env tsx

// CI Sanity Check - Lightweight verification for CI/CD pipelines
// Runs core tests to ensure the engine is solid before deployment

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 CI Sanity Check Starting...');
console.log('==============================');

const startTime = Date.now();
let allPassed = true;

function runCommand(command: string, description: string): boolean {
  console.log(`\n🔍 ${description}...`);
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      cwd: __dirname + '/..'
    });
    console.log(`  ✅ ${description} PASSED`);
    return true;
  } catch (error: any) {
    console.error(`  ❌ ${description} FAILED`);
    if (error.stdout) console.error('STDOUT:', error.stdout);
    if (error.stderr) console.error('STDERR:', error.stderr);
    allPassed = false;
    return false;
  }
}

// Check if we're in the right directory
if (!existsSync(join(__dirname, '..', 'package.json'))) {
  console.error('❌ Must run from project root directory');
  process.exit(1);
}

// 1. Run unit tests
runCommand('npm run quiz:test', 'Unit Tests');

// 2. Run property tests (lightweight version)
runCommand('npx tsx scripts/propertyTests.ts --iterations 100', 'Property Tests (100 iterations)');

// 3. Run simulation tests
runCommand('npm run quiz:sim', 'Simulation Tests');

// Summary
const duration = Date.now() - startTime;
console.log('\n📊 CI SANITY CHECK SUMMARY');
console.log('===========================');
console.log(`Duration: ${duration}ms`);
console.log(`Status: ${allPassed ? '✅ ALL PASSED' : '❌ SOME FAILED'}`);

if (!allPassed) {
  console.log('\n🚨 CI Sanity Check Failed - Do not deploy!');
  process.exit(1);
} else {
  console.log('\n🎉 CI Sanity Check Passed - Ready for deployment!');
  process.exit(0);
}
