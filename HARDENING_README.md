# 🛡️ MAX PARANOIA HARDENING SYSTEM

Your codebase is now **BULLETPROOF**. This hardening system implements every security and testing best practice to ensure your quiz engine is rock-solid.

## 🚀 Quick Start

```bash
# Run all hardening tests
npm run hardening:check

# Full CI simulation (what runs in GitHub Actions)
npm run hardening:full

# Individual hardening components
npm run quiz:test:coverage:threshold  # Coverage with 90% threshold
npm run quiz:sim:stress               # 100-seed stress test
npm run quiz:sim:property             # Property-based testing
npm run quiz:test:mutate              # Mutation testing
npm run quiz:test:audit               # Security audit
```

## 🧪 Hardening Components

### 1. **Coverage Gates** (90%+ threshold)
- **Lines**: 90% minimum
- **Functions**: 90% minimum  
- **Branches**: 90% minimum
- **Statements**: 90% minimum
- **Sim Engine**: 95% minimum (critical path)

### 2. **Multi-Seed Testing**
```bash
# Test 50 seeds
npm run quiz:sim:multi

# Stress test 100 seeds with failure on mismatch
npm run quiz:sim:stress

# Custom seed range
tsx scripts/runSim.ts --seeds 1..25 --failOnMismatch
```

### 3. **Property-Based Testing**
Tests critical invariants with randomized inputs:
- **Score Monotonicity**: Scores don't increase unexpectedly
- **Leaders Consistency**: Leader changes are justified
- **Flip Count Bounds**: Maximum reasonable flip rate
- **Trigger Invariants**: Triggers only on valid conditions
- **Boundary Conditions**: Edge case validation

### 4. **Mutation Testing**
Stryker catches sneaky test holes:
```bash
npm run quiz:test:mutate
```
- **Thresholds**: High 80%, Low 60%, Break 50%
- **Excluded**: String/Array literal mutations
- **Coverage**: Per-test analysis

### 5. **Golden Drift Protection**
- **CI**: Never auto-updates goldens
- **Local**: `npm run quiz:test:update-goldens` for updates
- **Detection**: Fails CI if outputs change unexpectedly

### 6. **Security Scanning**
```bash
npm run quiz:test:audit
npm run quiz:test:audit:fix
```

## 🔍 Enhanced Observability

### Debug HUD Features
- **Per-question frame dumps** (development only)
- **Export debug data** to JSON
- **Failure logging** with full context
- **Seed tracking** for reproducibility
- **Real-time metrics** display

### Failure Context
When tests fail, you get:
- **Seed number** for reproduction
- **Question index** where failure occurred
- **Chosen option ID** that triggered failure
- **Pure A1 status** at failure point
- **Trigger information** if applicable
- **Leader state** and flip count
- **Full debug frame dump**

## 🚨 CI/CD Pipeline

### GitHub Actions Workflow
- **Triggers**: Push to main/develop, all PRs
- **Matrix**: Node 18.x + 20.x testing
- **Jobs**: Hardening, Stress, Golden Check, Performance, Security
- **Failures**: Immediate CI failure on any test failure

### Pipeline Stages
1. **Hardening Tests** (coverage + simulation + properties)
2. **Multi-Seed Stress** (100 seeds, 30min timeout)
3. **Golden Drift Check** (ensures determinism)
4. **Performance Check** (regression detection)
5. **Security Scan** (vulnerability detection)
6. **Summary Report** (overall status)

## 🎯 Hardening Scripts

### Core Scripts
```bash
npm run hardening:check      # All tests except CI setup
npm run hardening:full       # Full CI simulation
npm run quiz:test:all        # Tests + simulation + properties
npm run quiz:test:ci         # Full CI pipeline
```

### Individual Components
```bash
npm run quiz:test:coverage:threshold  # Coverage with thresholds
npm run quiz:sim:multi                # Multi-seed testing
npm run quiz:sim:stress               # Stress testing
npm run quiz:sim:property             # Property testing
npm run quiz:test:update-goldens      # Update golden baselines
npm run quiz:test:mutate              # Mutation testing
npm run quiz:test:audit               # Security audit
```

## 🔧 Configuration Files

### Vitest Config
- **Coverage thresholds** by directory
- **Timeout settings** for long-running tests
- **Path aliases** for clean imports

### Stryker Config
- **Mutation types** and exclusions
- **Test runner** configuration
- **Thresholds** and reporting

### GitHub Actions
- **Matrix testing** across Node versions
- **Job dependencies** and failure handling
- **Timeout controls** for long operations

## 🚨 Troubleshooting

### Common Issues
1. **Coverage below threshold**: Add tests for uncovered code
2. **Simulation failures**: Check golden baselines and invariants
3. **Property test violations**: Review invariant logic
4. **Security vulnerabilities**: Run `npm audit fix`

### Debug Commands
```bash
# Check environment
npm run check-env

# Debug database
npm run debug-database

# Test specific seed
tsx scripts/runSim.ts 123

# Update goldens after fixing logic
npm run quiz:test:update-goldens
```

### Logs and Reports
- **Coverage**: `coverage/` directory
- **Mutation**: `reports/mutation/` directory
- **Simulation**: `logs/` directory
- **CI**: GitHub Actions logs

## 🎉 Success Metrics

Your codebase is bulletproof when:
- ✅ **Coverage**: ≥90% across all metrics
- ✅ **Multi-seed**: 100 seeds pass without failures
- ✅ **Properties**: All invariants hold under randomization
- ✅ **Mutations**: ≥80% mutation score
- ✅ **Security**: No critical vulnerabilities
- ✅ **Performance**: No significant regressions
- ✅ **Determinism**: Goldens never drift unexpectedly

## 🚀 Next Steps

1. **Enable CI**: Push to trigger GitHub Actions
2. **Monitor**: Check coverage and mutation reports
3. **Iterate**: Add tests for any uncovered code
4. **Maintain**: Run hardening checks before releases

## 🔒 Security Notes

- **Never commit** API keys or secrets
- **Use environment variables** for configuration
- **Run security audits** regularly
- **Pin dependency versions** in package-lock.json
- **Monitor** for new vulnerabilities

---

**🎯 Your codebase is now MAX PARANOIA HARDENED and BULLETPROOF! 🛡️**
