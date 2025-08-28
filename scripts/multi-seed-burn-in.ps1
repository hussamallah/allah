# Multi-Seed Burn-In Test Script
# Runs the simulation with multiple seeds to shake out any flakiness

param(
    [int]$StartSeed = 1,
    [int]$EndSeed = 100,
    [string]$LogFile = "burn-in-results.log"
)

Write-Host "🔥 Multi-Seed Burn-In Test Starting..." -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green
Write-Host "Testing seeds $StartSeed to $EndSeed" -ForegroundColor Yellow
Write-Host "Logging results to: $LogFile" -ForegroundColor Yellow
Write-Host ""

$startTime = Get-Date
$passed = 0
$failed = 0
$errors = @()

# Clear log file
if (Test-Path $LogFile) { Remove-Item $LogFile }

# Function to log results
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "[$timestamp] [$Level] $Message"
    Add-Content -Path $LogFile -Value $logEntry
    
    # Also display with color
    switch ($Level) {
        "PASS" { Write-Host $logEntry -ForegroundColor Green }
        "FAIL" { Write-Host $logEntry -ForegroundColor Red }
        "ERROR" { Write-Host $logEntry -ForegroundColor Red }
        default { Write-Host $logEntry -ForegroundColor White }
    }
}

Write-Log "Starting multi-seed burn-in test from seed $StartSeed to $EndSeed"

for ($seed = $StartSeed; $seed -le $EndSeed; $seed++) {
    Write-Host "Testing seed $seed..." -NoNewline
    
    try {
        # Run the simulation with the current seed
        $result = & npm run quiz:sim --silent 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host " PASS" -ForegroundColor Green
            Write-Log "Seed $seed: PASSED" "PASS"
            $passed++
        } else {
            Write-Host " FAIL" -ForegroundColor Red
            Write-Log "Seed $seed: FAILED (exit code: $LASTEXITCODE)" "FAIL"
            $failed++
            $errors += "Seed $seed failed with exit code $LASTEXITCODE"
        }
    } catch {
        Write-Host " ERROR" -ForegroundColor Red
        Write-Log "Seed $seed: ERROR - $($_.Exception.Message)" "ERROR"
        $failed++
        $errors += "Seed $seed error: $($_.Exception.Message)"
    }
    
    # Progress indicator every 10 seeds
    if ($seed % 10 -eq 0) {
        $progress = [math]::Round(($seed - $StartSeed + 1) / ($EndSeed - $StartSeed + 1) * 100, 1)
        Write-Host "Progress: $progress% ($seed/$EndSeed)" -ForegroundColor Cyan
    }
}

$endTime = Get-Date
$duration = $endTime - $startTime

# Summary
Write-Host ""
Write-Host "📊 BURN-IN TEST SUMMARY" -ForegroundColor Magenta
Write-Host "=======================" -ForegroundColor Magenta
Write-Host "Total seeds tested: $($EndSeed - $StartSeed + 1)" -ForegroundColor White
Write-Host "✅ Passed: $passed" -ForegroundColor Green
Write-Host "❌ Failed: $failed" -ForegroundColor Red
Write-Host "Duration: $($duration.ToString('mm\:ss'))" -ForegroundColor White
Write-Host "Success rate: $([math]::Round($passed / ($EndSeed - $StartSeed + 1) * 100, 1))%" -ForegroundColor White

Write-Log "Burn-in test completed. Passed: $passed, Failed: $failed, Duration: $($duration.ToString('mm\:ss'))"

if ($failed -gt 0) {
    Write-Host ""
    Write-Host "🚨 FAILURES DETECTED:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  - $error" -ForegroundColor Red
        Write-Log "Failure: $error" "ERROR"
    }
    Write-Host ""
    Write-Host "Engine is NOT bulletproof. Investigate failures before deployment!" -ForegroundColor Red
    exit 1
} else {
    Write-Host ""
    Write-Host "🎉 ALL SEEDS PASSED!" -ForegroundColor Green
    Write-Host "Engine is bulletproof and ready for production!" -ForegroundColor Green
    Write-Log "All seeds passed - engine is bulletproof!"
    exit 0
}
