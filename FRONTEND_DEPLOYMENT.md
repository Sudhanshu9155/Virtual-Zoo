# Frontend Deployment Guide - Vercel

This guide will help you deploy your Virtual Zoo frontend to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Your code pushed to GitHub

## Option 1: Deploy via Vercel Dashboard (Recommended for First Time)

### Step 1: Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
# Navigate to project root
cd "c:\Users\sudha\Semester 5 prog\nexus-zoo-project"

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables** (Optional):
   - If you want to override the backend URL, add:
     - Name: `VITE_API_URL`
     - Value: `https://virtual-zoo-6d78.onrender.com/api`

6. Click **"Deploy"**

### Step 3: Wait for Deployment

Vercel will:
- Install dependencies
- Build your project
- Deploy it to a URL like: `https://your-project-name.vercel.app`

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
# Navigate to frontend directory
cd "c:\Users\sudha\Semester 5 prog\nexus-zoo-project\frontend"

# Deploy to production
vercel --prod
```

Follow the prompts:
- **Set up and deploy**: Yes
- **Which scope**: Select your account
- **Link to existing project**: No (first time) or Yes (subsequent deploys)
- **Project name**: virtual-zoo (or your preferred name)
- **Directory**: `./` (current directory)
- **Override settings**: No

## Post-Deployment

### 1. Test Your Deployment

Once deployed, Vercel will give you a URL. Test it by:
- Opening the URL in your browser
- Testing login/register functionality
- Checking if API calls to your backend work
- Verifying all features work correctly

### 2. Update Backend CORS

Make sure your backend on Render allows requests from your Vercel domain. Update the CORS settings in your backend `.env`:

```
FRONTEND_URL=https://your-project-name.vercel.app
```

Then redeploy your backend on Render.

### 3. Custom Domain (Optional)

To add a custom domain:
1. Go to your project on Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow the DNS configuration instructions

## Continuous Deployment

Vercel automatically sets up continuous deployment:
- Every push to `main` branch → Production deployment
- Every push to other branches → Preview deployment

## Troubleshooting

### Build Fails

Check the build logs on Vercel dashboard. Common issues:
- Missing dependencies: Make sure all packages are in `package.json`
- Environment variables: Ensure they're set correctly
- Build errors: Fix any TypeScript/ESLint errors

### API Calls Fail

1. Check browser console for CORS errors
2. Verify backend URL is correct
3. Ensure backend CORS allows your Vercel domain
4. Check if backend is running on Render

### 404 on Refresh

The `vercel.json` file should handle this, but if you still get 404s:
1. Verify `vercel.json` exists in frontend directory
2. Check the rewrites configuration

## Environment Variables

To update environment variables after deployment:
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add/Edit variables
5. Redeploy for changes to take effect

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]
```

## Your Current Configuration

- **Backend URL**: https://virtual-zoo-6d78.onrender.com/api
- **Frontend Framework**: React + Vite
- **Build Output**: `dist/`
- **Node Version**: Latest LTS (automatically detected by Vercel)

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy on Vercel
3. ✅ Test the deployment
4. ✅ Update backend CORS settings
5. ✅ Share your live URL!

---

**Need Help?**
- Vercel Documentation: https://vercel.com/docs
- Vite Documentation: https://vitejs.dev/guide/
