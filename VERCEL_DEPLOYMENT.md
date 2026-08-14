# Frontend Deployment to Vercel

This guide walks you through deploying the React/Vite frontend to Vercel.

## Prerequisites
- GitHub account with the repo pushed
- Vercel account (free at https://vercel.com)

## Steps

### 1. Push Your Latest Changes
```bash
git add .
git commit -m "Ready for Vercel frontend deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose your GitHub repo `Kiran11-oss/Kalyani-ghee-sweets`
5. Click **Import**

### 3. Configure Project Settings

On the "Configure Project" page:

- **Project Name**: `kalyani-ghee-sweets` (or any name)
- **Framework Preset**: Select **"Vite"** (auto-detected)
- **Root Directory**: Change to `frontend`
- **Build Command**: Keep default `npm run build`
- **Output Directory**: Keep default `dist`

### 4. Add Environment Variable

On the same page, scroll to **"Environment Variables"** section:

**Key:** `VITE_API_BASE_URL`

**Value:** `https://kalyani-ghee-sweets-api.onrender.com/api`

> Replace `kalyani-ghee-sweets-api` with your actual Render service name if different.

**Environments:** Select both "Production" and "Preview"

### 5. Deploy

Click **"Deploy"** and wait for the build to complete (usually 2-3 minutes).

Once complete, Vercel will show you the live URL like:
`https://kalyani-ghee-sweets.vercel.app`

## After Deployment

- Frontend: https://your-vercel-url.vercel.app
- Backend: https://your-render-url.onrender.com/api
- API Docs: https://your-render-url.onrender.com/docs

## Troubleshooting

**API calls fail (CORS/404)?**
- Verify `VITE_API_BASE_URL` env var is set in Vercel dashboard
- Check your Render backend is running
- Add your Vercel domain to CORS in backend `.env`:
  ```
  CORS_ORIGINS=http://localhost:5173,https://your-vercel-url.vercel.app
  ```

**Build fails?**
- Check "Deployments" tab in Vercel for error logs
- Run locally: `npm run build` to test

**Redeploy?**
Push a new commit to `main` or use Vercel dashboard → "Redeploy"

---

## Local Development

Still use `npm run dev` locally:
```bash
cd frontend
npm run dev
```

This proxies API calls to `http://localhost:8000/api` (dev backend)
