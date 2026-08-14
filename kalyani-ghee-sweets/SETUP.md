# Kalyani Ghee Sweets - Application Setup & Running Guide

## Quick Start (Local Network)

Your app is already running on the local network!

**Access URLs:**
- **Frontend:** http://192.168.29.169:3000
- **Backend API:** http://192.168.29.169:8000
- **API Docs:** http://192.168.29.169:8000/docs

**From Phone/Laptop:**
1. Connect to the same WiFi as your computer
2. Open browser
3. Visit: `http://192.168.29.169:3000`

---

## Option 1: Restart App (Local Network Only)

Use the startup script to restart both servers:

```powershell
cd C:\Users\Jonna\Downloads\saipriyaweb\kalyani-ghee-sweets\kalyani-ghee-sweets
.\start-app.ps1
```

This will:
- Start FastAPI backend on port 8000
- Start React frontend on port 3000
- Open two terminal windows (one for each)

---

## Option 2: Setup Public URL (Global Access)

### Step 1: Sign Up for ngrok (FREE)

1. Go to: https://ngrok.com/sign-up
2. Create a free account
3. Get your authtoken from: https://dashboard.ngrok.com/auth/your-authtoken

### Step 2: Configure ngrok

Run this command in PowerShell (replace YOUR_TOKEN):

```powershell
ngrok config add-authtoken YOUR_TOKEN_HERE
```

### Step 3: Start ngrok Tunnels

```powershell
cd C:\Users\Jonna\Downloads\saipriyaweb\kalyani-ghee-sweets\kalyani-ghee-sweets
$env:NGROK_AUTHTOKEN = "YOUR_TOKEN_HERE"
.\setup-ngrok.ps1
```

### Step 4: Get Your Public URLs

1. Check ngrok dashboard: https://dashboard.ngrok.com/cloud/tunnels
2. You'll see URLs like:
   - Frontend: `https://xxxx-xx-xxx-xxx-xx.ngrok.io`
   - Backend: `https://yyyy-yy-yyy-yyy-yy.ngrok.io`

### Step 5: Update Frontend Configuration

Edit `frontend/.env`:

```env
VITE_API_BASE_URL=https://yyyy-yy-yyy-yyy-yy.ngrok.io/api
```

Then rebuild:

```powershell
cd frontend
npm run build
```

---

## Option 3: Auto-Start on Windows Boot

**Required:** Run PowerShell as Administrator

```powershell
cd C:\Users\Jonna\Downloads\saipriyaweb\kalyani-ghee-sweets\kalyani-ghee-sweets
.\register-startup.ps1
```

This will:
- Register a Windows Task Scheduler job
- Auto-start the app when you boot Windows
- Run in hidden mode (no visible windows)

To disable:
```powershell
Unregister-ScheduledTask -TaskName "Kalyani-Ghee-Sweets-App" -Confirm:$false
```

---

## Available Scripts

| Script | Purpose | Command |
|--------|---------|---------|
| `start-app.ps1` | Start backend + frontend | `.\start-app.ps1` |
| `setup-ngrok.ps1` | Setup public URLs | `$env:NGROK_AUTHTOKEN = "TOKEN"; .\setup-ngrok.ps1` |
| `register-startup.ps1` | Auto-start on boot | `.\register-startup.ps1` (as Admin) |

---

## Troubleshooting

### Port Already in Use
If you get "address already in use" error:
```powershell
# Kill processes on ports
Get-NetTCPConnection -LocalPort 8000 | Select-Object OwningProcess | % { Stop-Process -Id $_.OwningProcess -Force }
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess | % { Stop-Process -Id $_.OwningProcess -Force }
```

### ngrok Issues
- ngrok tunnel dropped? Restart the script
- ngrok connection refused? Check internet connection
- Free tier limits: 2 sessions per IP, reconnect after 2 hours

### Frontend Can't Connect to Backend
- Check `frontend/.env` has correct backend URL
- Run `npm run build` after changing `.env`
- Check backend is running on port 8000

---

## Architecture

```
┌─────────────────────────────────────────┐
│   Your Phone / External Device          │
│   (Same WiFi Network)                   │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
   (Local Network)        (Public URL)
  192.168.29.169          ngrok tunnel
   :3000 / :8000          (if enabled)
        │                     │
        └──────────┬──────────┘
                   │
        ┌──────────v──────────┐
        │   Frontend (React)  │
        │   Port 3000         │
        └──────────┬──────────┘
                   │
        ┌──────────v──────────┐
        │  Backend (FastAPI)  │
        │   Port 8000         │
        └─────────────────────┘
```

---

## Support

For issues:
1. Check port availability
2. Verify Python/npm installations
3. Check internet connection for ngrok
4. Review error messages in terminal windows

Happy serving! 🚀
