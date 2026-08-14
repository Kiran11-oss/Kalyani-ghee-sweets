# Deployment Guide: Kalyani Ghee Sweets

## 🚀 Quick Start - Get Public URLs

### Option 1: Vercel (Frontend) + Render (Backend) - RECOMMENDED

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Kalyani Ghee Sweets App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kalyani-ghee-sweets.git
git push -u origin main
```

#### Step 2: Deploy Backend to Render

1. Go to https://render.com
2. Sign up / Log in with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Fill in the details:
   - **Name**: `kalyani-ghee-sweets-api`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**:
     ```
     DATABASE_URL = postgresql://user:pass@host/db
     SECRET_KEY = your-secret-key
     ```
6. Click "Deploy"
7. Wait 5-10 minutes
8. Copy your URL: `https://kalyani-ghee-sweets-api.onrender.com`

**✅ Backend URL**: `https://your-backend-name.onrender.com`

---

#### Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Sign up / Log in with GitHub
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Set the configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     ```
     VITE_API_BASE_URL = https://your-backend-name.onrender.com/api
     ```
6. Click "Deploy"
7. Copy your URL: `https://your-project-name.vercel.app`

**✅ Frontend URL**: `https://your-project-name.vercel.app`

---

### After Deployment

Your public URLs:
```
🌐 Frontend: https://your-project-name.vercel.app
📡 Backend: https://your-backend-name.onrender.com
📡 API: https://your-backend-name.onrender.com/api
```

The frontend will automatically connect to the backend API!

---

## ⚠️ Important Notes

1. **First deployment might take 10-15 minutes** - Be patient!
2. **Render free tier sleeps after 15 mins of inactivity** - Consider upgrading to paid
3. **Database**: You need a PostgreSQL database for production
   - Use Render's PostgreSQL or AWS RDS
4. **CORS is already configured** in the backend for all origins
5. **Keep environment variables secret** - Use platform's env var manager, not git

---

## 🔧 Troubleshooting

### Backend not working?
- Check Render logs in dashboard
- Verify `requirements.txt` has all dependencies
- Ensure database connection string is correct

### Frontend not connecting to backend?
- Verify `VITE_API_BASE_URL` is set correctly in Vercel
- Check browser console for CORS errors
- Ensure backend API is running

### Need to make changes?
- Push to GitHub: `git add . && git commit -m "message" && git push`
- Both Vercel and Render auto-deploy on push!

---

## 📝 Environment Variables Needed

### Backend (Render):
```
DATABASE_URL=postgresql://username:password@host:5432/dbname
SECRET_KEY=your-random-secret-key
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

### Frontend (Vercel):
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```
