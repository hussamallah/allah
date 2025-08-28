# Engine Hardening Guide 🛡️

Your quiz engine is now **bulletproof** ("sh*t tight") with comprehensive hardening measures. This guide documents all the hardening steps and how to use them.

## 🎯 Hardening Checklist - COMPLETED ✅

### 1. Lock the Math in Tests
- **Single EPS constant**: `1e-9` used consistently across all tests
- **Edge cases covered**:
  - `decay=0` (no decay)
  - `decay=0.95` (very high decay)
  - `decay=0.99` (extreme decay)
  - `decay=0.01` (very low decay)
  - `gain=0` (minimal behavior scenarios)
  - Long streaks (100+ steps)
- **Regression test**: Hand-crafted sequence that would fail old test but passes new baseline rule

### 2. Property Tests Turned Up
- **High iteration count**: Default 1000 iterations per property
- **Comprehensive coverage**: Score monotonicity, leaders consistency, flip bounds, triggers, boundaries
- **Command**: `npm run quiz:sim:property` or `npx tsx scripts/propertyTests.ts --iterations 1000`

### 3. Multi-Seed Burn-In
- **PowerShell script**: `scripts/multi-seed-burn-in.ps1`
- **Commands**:
  - `npm run burn:in` - Test 100 seeds
  - `npm run burn:in:quick` - Test 50 seeds
  - Custom range: `powershell -ExecutionPolicy Bypass -File scripts/multi-seed-burn-in.ps1 -StartSeed 1 -EndSeed 200`

### 4. Invariant Documentation
- **Core invariant documented**: `// Invariant: next ≥ prev*(1-decay)` in `quizEngine.ts`
- **Increment rule documented**: `// Increment = next - prev*(1-decay) ≥ -EPS`
- **Location**: `lib/quizEngine.ts` line ~300 in `applyWeightsWithDecay` method

### 5. CI Sanity Check
- **Lightweight verification**: `npm run ci:sanity`
- **Runs**: Unit tests + Property tests (100 iterations) + Simulation tests
- **Perfect for**: Pre-deployment checks, CI/CD pipelines

### 6. Style Fix
- **PowerShell commands**: No more markdown fence issues
- **Proper execution**: All scripts use correct PowerShell syntax

## 🚀 Usage Commands

### Quick Hardening Check
```bash
npm run hardening:check
```

### Full Hardening Suite
```bash
npm run hardening:full
```

### CI Sanity Check
```bash
npm run ci:sanity
```

### Multi-Seed Burn-In
```bash
# Full burn-in (100 seeds)
npm run burn:in

# Quick burn-in (50 seeds)
npm run burn:in:quick

# Custom range
powershell -ExecutionPolicy Bypass -File scripts/multi-seed-burn-in.ps1 -StartSeed 1 -EndSeed 200
```

### Property Tests
```bash
# Default (1000 iterations)
npm run quiz:sim:property

# Custom iterations
npx tsx scripts/propertyTests.ts --iterations 5000
```

## 🔍 What Each Test Validates

### Unit Tests (`npm run quiz:test`)
- **Score monotonicity**: `next ≥ prev*(1-decay)`
- **Score increment validation**: `increment ≥ -EPS`
- **Edge cases**: Extreme decay, zero gain, long streaks
- **Regression tests**: Old vs new invariant behavior

### Property Tests (`npm run quiz:sim:property`)
- **Randomized validation**: 1000+ iterations with different seeds/scripts
- **Mathematical properties**: Score relationships, leader consistency
- **Boundary conditions**: Overtake thresholds, margin calculations
- **Trigger invariants**: Pure A1 behavior, R-choice accumulation

### Simulation Tests (`npm run quiz:sim`)
- **Golden script validation**: Known good scenarios
- **Oracle cross-check**: Engine vs oracle replay
- **Invariant enforcement**: Full frame-by-frame validation

### Multi-Seed Burn-In
- **Flakiness detection**: 100+ different random seeds
- **Consistency validation**: Same logic, different inputs
- **Production readiness**: Bulletproof confidence

## 🎯 Core Mathematical Invariants

### Primary Invariant: Score Decay Baseline
```
For each archetype at each step:
currentScore ≥ previousScore × (1 - decayRate) - EPS

Where:
- EPS = 1e-9 (floating point precision)
- decayRate = 0.92 (from QUIZ_CONFIG)
```

### Secondary Invariant: Score Increment
```
For each archetype at each step:
increment = currentScore - previousScore × (1 - decayRate) ≥ -EPS

This ensures scores never go below the decayed baseline.
```

### Why This Matters
- **Old test was wrong**: Expected `score never decreases`
- **New test is correct**: Expects `score ≥ decayed baseline`
- **Engine behavior**: Applies decay first, then adds weights
- **Mathematical truth**: `decay + add` can result in decrease, but never below baseline

## 🚨 Failure Modes & Debugging

### If Tests Fail
1. **Check EPS consistency**: Ensure `1e-9` used everywhere
2. **Verify decay math**: `prev * (1 - decay)` calculation
3. **Inspect score updates**: Look for off-by-one errors
4. **Check property test seeds**: Reproduce with specific seed

### Common Issues
- **Float precision**: Scores slightly below baseline due to rounding
- **Decay calculation**: Wrong decay rate or formula
- **Weight application**: Incorrect weight addition after decay
- **Invariant checker**: Overly strict validation

### Debug Commands
```bash
# Run specific test with verbose output
npm run quiz:test -- --reporter=verbose

# Property test with specific seed
npx tsx scripts/propertyTests.ts --iterations 1

# Simulation with logging
npm run quiz:sim -- --verbose
```

## 🎉 You're Bulletproof!

With these hardening measures in place:

✅ **Math is locked down** - Single EPS, comprehensive edge cases  
✅ **Property tests are cranked** - 1000+ iterations shake out flakiness  
✅ **Multi-seed burn-in** - 100+ seeds validate consistency  
✅ **Invariants documented** - Clear math rules in code  
✅ **CI sanity checks** - Lightweight pre-deployment validation  
✅ **Style is clean** - No more PowerShell issues  

Your engine can handle:
- Extreme decay rates (0.99)
- Minimal gain scenarios
- Long sequences (100+ steps)
- Random seed variations
- Edge case combinations

**Deploy with confidence!** 🚀
