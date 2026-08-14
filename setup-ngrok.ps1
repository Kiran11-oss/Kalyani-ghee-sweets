# Kalyani Ghee Sweets - Public URL Setup with ngrok
# This script sets up public URLs using ngrok tunneling

# IMPORTANT: Before running this script, you must:
# 1. Sign up for FREE at https://ngrok.com
# 2. Get your authtoken from https://dashboard.ngrok.com/auth/your-authtoken
# 3. Set it in the variable below or run: ngrok config add-authtoken YOUR_TOKEN

# Get authtoken from environment or user input
$authToken = $env:NGROK_AUTHTOKEN

if (-not $authToken) {
    Write-Host "NGROK SETUP REQUIRED" -ForegroundColor Red
    Write-Host "`nTo enable public access, you need ngrok:" -ForegroundColor Yellow
    Write-Host "  1. Sign up FREE at: https://ngrok.com/sign-up" -ForegroundColor Cyan
    Write-Host "  2. Get authtoken from: https://dashboard.ngrok.com/auth/your-authtoken" -ForegroundColor Cyan
    Write-Host "  3. Run ngrok config add-authtoken YOUR_TOKEN_HERE" -ForegroundColor Cyan
    Write-Host "`nOR set environment variable:" -ForegroundColor Yellow
    Write-Host '  $env:NGROK_AUTHTOKEN = "YOUR_TOKEN_HERE"' -ForegroundColor Cyan
    exit 1
}

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Public URL Setup - ngrok Tunnels" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Check if ngrok is installed
try {
    $ngrokVersion = ngrok version
    Write-Host "`nngrok version: $ngrokVersion" -ForegroundColor Green
} catch {
    Write-Host "`nngrok not found! Installing..." -ForegroundColor Yellow
    
    # Download and install ngrok
    $ngrokZip = "c:\temp\ngrok.zip"
    $ngrokDir = "c:\Program Files\ngrok"
    
    New-Item -ItemType Directory -Path "c:\temp" -Force | Out-Null
    New-Item -ItemType Directory -Path $ngrokDir -Force | Out-Null
    
    Write-Host "Downloading ngrok..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri "https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip" `
        -OutFile $ngrokZip -TimeoutSec 300
    
    Expand-Archive -Path $ngrokZip -DestinationPath $ngrokDir -Force
    [System.Environment]::SetEnvironmentVariable("Path", "$($env:Path);$ngrokDir", "User")
    
    Write-Host "ngrok installed successfully!" -ForegroundColor Green
}

# Configure authtoken
Write-Host "`nConfiguring ngrok with authtoken..." -ForegroundColor Cyan
ngrok config add-authtoken $authToken

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  Starting Public Tunnels" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Start Frontend tunnel
Write-Host "`n[1/2] Creating Frontend tunnel (port 3000)..." -ForegroundColor Cyan
Start-Process ngrok -ArgumentList "http 3000 --log=stdout --log-format=json" -WindowStyle Normal

Start-Sleep -Seconds 3

# Start Backend tunnel
Write-Host "[2/2] Creating Backend tunnel (port 8000)..." -ForegroundColor Cyan
Start-Process ngrok -ArgumentList "http 8000 --log=stdout --log-format=json" -WindowStyle Normal

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  NGROK TUNNELS STARTING" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host "`nWait 5-10 seconds for tunnels to initialize..." -ForegroundColor Yellow
Write-Host "Then check ngrok dashboard to get your public URLs:" -ForegroundColor Cyan
Write-Host "  https://dashboard.ngrok.com/cloud/tunnels" -ForegroundColor Cyan

Write-Host "`nPublic URLs will look like:" -ForegroundColor Yellow
Write-Host "  Frontend: https://xxxx-xx-xxx-xxx-xx.ngrok.io" -ForegroundColor Yellow
Write-Host "  Backend:  https://yyyy-yy-yyy-yyy-yy.ngrok.io" -ForegroundColor Yellow

Write-Host "`nIMPORTANT: Update frontend .env file with backend public URL:" -ForegroundColor Red
Write-Host "  VITE_API_BASE_URL=https://yyyy-yy-yyy-yyy-yy.ngrok.io/api" -ForegroundColor Red
Write-Host "  Then rebuild: npm run build" -ForegroundColor Red

pause
