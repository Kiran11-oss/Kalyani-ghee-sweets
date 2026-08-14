# Register app to start on Windows startup
# Run this script as Administrator

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Registering App for Auto-Startup" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Check if running as Administrator
$currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "`nERROR: This script must run as Administrator!" -ForegroundColor Red
    Write-Host "`nTo fix:" -ForegroundColor Yellow
    Write-Host "  1. Right-click PowerShell" -ForegroundColor Cyan
    Write-Host "  2. Select 'Run as Administrator'" -ForegroundColor Cyan
    Write-Host "  3. Run this script again" -ForegroundColor Cyan
    pause
    exit 1
}

# Get the project root
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$startScript = Join-Path $scriptDir "start-app.ps1"

# Create scheduled task
$taskName = "Kalyani-Ghee-Sweets-App"
$taskDescription = "Auto-start Kalyani Ghee Sweets Application"

Write-Host "`nCreating scheduled task: $taskName" -ForegroundColor Cyan

# Remove existing task if it exists
try {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
    Write-Host "Removed old task." -ForegroundColor Yellow
} catch {}

# Create new task action
$action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-WindowStyle Hidden -ExecutionPolicy Bypass -File `"$startScript`""

# Create trigger for system startup
$trigger = New-ScheduledTaskTrigger -AtStartup

# Create task principal (run as current user)
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType S4U

# Register the task
Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Principal $principal `
    -Description $taskDescription `
    -Force | Out-Null

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  STARTUP REGISTERED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host "`nTask Name: $taskName" -ForegroundColor Cyan
Write-Host "Trigger: At System Startup" -ForegroundColor Cyan
Write-Host "Script: $startScript" -ForegroundColor Cyan

Write-Host "`nThe app will automatically start when Windows boots!" -ForegroundColor Green

Write-Host "`nTo view/manage in Task Scheduler:" -ForegroundColor Yellow
Write-Host "  1. Press Win+R" -ForegroundColor Cyan
Write-Host "  2. Type: taskschd.msc" -ForegroundColor Cyan
Write-Host "  3. Look for '$taskName'" -ForegroundColor Cyan

Write-Host "`nTo disable auto-startup:" -ForegroundColor Yellow
Write-Host '  Unregister-ScheduledTask -TaskName "$taskName" -Confirm:$false' -ForegroundColor Cyan

pause
