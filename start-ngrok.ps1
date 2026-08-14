param([string]$token = "3HuWX6z05CqA7DPVJz6GMFPyL2H_3zZV6DfrhFriW1EAsaBDn")

$ngrokDir = "$env:USERPROFILE\.ngrok"
$ngrokExe = "$ngrokDir\ngrok.exe"

Write-Host "========================================" -ForegroundColor Green
Write-Host "  ngrok Public Tunnel Setup" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Download ngrok if not exists
if (-not (Test-Path $ngrokExe)) {
    Write-Host "`nDownloading ngrok..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Path $ngrokDir -Force | Out-Null
    
    $ngrokZip = "$ngrokDir\ngrok.zip"
    try {
        Invoke-WebRequest -Uri "https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip" -OutFile $ngrokZip -TimeoutSec 300
        Expand-Archive -Path $ngrokZip -DestinationPath $ngrokDir -Force
        Remove-Item $ngrokZip -Force
        Write-Host "✓ ngrok downloaded" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Download failed: $_" -ForegroundColor Red
        exit 1
    }
}

# Configure authtoken
Write-Host "`nConfiguring authtoken..." -ForegroundColor Cyan
& $ngrokExe config add-authtoken $token 2>&1 | Out-Null
Write-Host "✓ Authtoken configured" -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  Starting Tunnels" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host "`n[1/2] Frontend (port 3000)..." -ForegroundColor Yellow
Start-Process -FilePath $ngrokExe -ArgumentList "http 3000" -WindowStyle Minimized

Start-Sleep -Seconds 2

Write-Host "[2/2] Backend (port 8000)..." -ForegroundColor Yellow
Start-Process -FilePath $ngrokExe -ArgumentList "http 8000" -WindowStyle Minimized

Write-Host "`nTunnels starting... wait 5-10 seconds" -ForegroundColor Cyan
Write-Host "`nDashboard: https://dashboard.ngrok.com/cloud/tunnels" -ForegroundColor Green
Write-Host "`nYou'll see URLs like:" -ForegroundColor Yellow
Write-Host "  Frontend: https://xxxx-xxxx.ngrok.io" -ForegroundColor Yellow
Write-Host "  Backend:  https://yyyy-yyyy.ngrok.io" -ForegroundColor Yellow

Write-Host "`nIMPORTANT - Update frontend config:" -ForegroundColor Red
Write-Host "  Edit: frontend/.env" -ForegroundColor Yellow
Write-Host "  Set: VITE_API_BASE_URL=https://yyyy-yyyy.ngrok.io/api" -ForegroundColor Yellow
Write-Host "  Run: npm run build" -ForegroundColor Yellow

pause
