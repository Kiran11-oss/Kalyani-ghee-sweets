# Start Kalyani Ghee Sweets Application
# This script starts both the backend and frontend servers

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = $scriptDir

# Backend path
$backendPath = Join-Path $projectRoot "backend"
$frontendPath = Join-Path $projectRoot "frontend"

# Colors for output
$colors = @{
    Success = 'Green'
    Info = 'Cyan'
    Warning = 'Yellow'
}

Write-Host "========================================" -ForegroundColor $colors.Success
Write-Host "  Kalyani Ghee Sweets - Application Starter" -ForegroundColor $colors.Success
Write-Host "========================================" -ForegroundColor $colors.Success

# Start Backend in a new window
Write-Host "`n[1/2] Starting Backend Server (FastAPI)..." -ForegroundColor $colors.Info
$backendCmd = @"
cd "$backendPath"
python main.py
pause
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd -WindowStyle Normal

Start-Sleep -Seconds 2

# Start Frontend in a new window
Write-Host "[2/2] Starting Frontend Server (React)..." -ForegroundColor $colors.Info
$frontendCmd = @"
cd "$frontendPath"
python -m http.server 3000 --directory dist --bind 0.0.0.0
pause
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd -WindowStyle Normal

Write-Host "`n========================================" -ForegroundColor $colors.Success
Write-Host "  SERVERS STARTED!" -ForegroundColor $colors.Success
Write-Host "========================================" -ForegroundColor $colors.Success
Write-Host "`nLocal Network Access:" -ForegroundColor $colors.Info
Write-Host "  Frontend: http://192.168.29.169:3000" -ForegroundColor $colors.Info
Write-Host "  Backend:  http://192.168.29.169:8000" -ForegroundColor $colors.Info
Write-Host "  API Docs: http://192.168.29.169:8000/docs" -ForegroundColor $colors.Info

Write-Host "`nPublic URL Setup (Optional):" -ForegroundColor $colors.Warning
Write-Host "  See: setup-ngrok.ps1 for public access" -ForegroundColor $colors.Warning

Write-Host "`n[WAITING] Both servers are running. Close these windows to stop." -ForegroundColor $colors.Info
