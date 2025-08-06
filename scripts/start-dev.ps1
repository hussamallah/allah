# PowerShell script to start Next.js dev server on port 3000
# This script kills any existing process on port 3000 before starting

Write-Host "🚀 Starting development server on port 3000..." -ForegroundColor Green

# Function to kill process on port 3000
function Kill-ProcessOnPort3000 {
    Write-Host "🔍 Checking for processes on port 3000..." -ForegroundColor Yellow
    
    try {
        $processes = netstat -ano | Select-String ":3000"
        
        if ($processes) {
            foreach ($process in $processes) {
                $parts = $process -split '\s+'
                if ($parts.Length -gt 4) {
                    $pid = $parts[4]
                    Write-Host "🔫 Killing process $pid on port 3000..." -ForegroundColor Red
                    
                    try {
                        Stop-Process -Id $pid -Force -ErrorAction Stop
                        Write-Host "✅ Killed process $pid" -ForegroundColor Green
                    } catch {
                        Write-Host "⚠️  Could not kill process $pid : $($_.Exception.Message)" -ForegroundColor Yellow
                    }
                }
            }
        } else {
            Write-Host "✅ No processes found on port 3000" -ForegroundColor Green
        }
    } catch {
        Write-Host "⚠️  Error checking port 3000: $($_.Exception.Message)" -ForegroundColor Yellow
    }
    
    # Wait a bit for processes to be killed
    Start-Sleep -Seconds 1
}

# Function to start Next.js dev server
function Start-DevServer {
    Write-Host "🚀 Starting Next.js development server..." -ForegroundColor Green
    
    try {
        # Start the Next.js dev server
        npx next dev -p 3000
    } catch {
        Write-Host "❌ Failed to start development server: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Main execution
try {
    Kill-ProcessOnPort3000
    Start-DevServer
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 