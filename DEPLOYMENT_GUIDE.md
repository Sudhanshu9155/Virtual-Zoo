# 🎯 DEPLOYMENT GUIDE - Virtual Zoo

## ✅ What's Already Done:
- ✅ Backend deployed on Render: https://virtual-zoo-6d78.onrender.com
- ✅ Backend code pushed to GitHub
- ✅ Frontend configured to use production backend
- ✅ Environment files created

---

## 🚀 FRONTEND DEPLOYMENT TO VERCEL

### Step 1: Go to Render
1. Open: **https://dashboard.render.com/**
2. Sign in with **GitHub** (recommended)

### Step 2: Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub repository: **Sudhanshu9155/Virtual-Zoo**

### Step 3: Configure Service

**Basic Settings:**
```
Name: virtual-zoo-backend
Region: Singapore (or closest to you)
Branch: main
Root Directory: backend          ⚠️ IMPORTANT!
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

**Required Variables:**

1. **MONGO_URI**
   - If you have MongoDB Atlas: Use that connection string
   - If not, set up MongoDB Atlas first (see below)
   - Example: `mongodb+srv://user:pass@cluster.mongodb.net/virtual-zoo`

2. **JWT_SECRET**
   - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Or use any random 32+ character string

3. **PORT**
   - Value: `5001`

4. **NODE_ENV**
   - Value: `production`

5. **FRONTEND_URL**
   - Value: `https://virtual-zoo-three.vercel.app`

**Optional (if you use them in your .env):**
- GOOGLE_CLIENT_ID
- EMAIL_USER
- EMAIL_PASS

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait 2-5 minutes for deployment
3. Copy your backend URL (e.g., `https://virtual-zoo-backend.onrender.com`)

---

## 🗄️ SET UP MONGODB ATLAS (If you don't have it)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Click **"Build a Database"**
4. Choose **"M0 FREE"** tier
5. Select a cloud provider and region
6. Click **"Create"**
7. Create a database user (username + password)
8. Click **"Network Access"** (left sidebar)
9. Click **"Add IP Address"**
10. Click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
11. Click **"Confirm"**
12. Go back to **"Database"** → Click **"Connect"**
13. Choose **"Connect your application"**
14. Copy the connection string
15. Replace `<password>` with your database password
16. Add `/virtual-zoo` at the end

Your final connection string should look like:
```
mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/virtual-zoo
```

---

## 🔄 UPDATE FRONTEND TO USE PRODUCTION BACKEND

### After your backend is deployed on Render:

1. **Update `.env.production` file:**
   ```
   VITE_API_URL=https://your-actual-backend-url.onrender.com/api
   ```
   Replace `your-actual-backend-url` with your real Render URL

2. **Redeploy frontend on Vercel:**
   ```bash
   cd frontend
   vercel --prod
   ```

---

## ✅ TEST YOUR DEPLOYMENT

### Test Backend:
1. **Health Check**: 
   - URL: `https://your-backend.onrender.com/api/health`
   - Should return: `{"status":"ok"}`

2. **Animals API**:
   - URL: `https://your-backend.onrender.com/api/animals`
   - Should return: Array of animals

### Test Frontend:
1. Open: `https://virtual-zoo-three.vercel.app`
2. Try browsing animals
3. Check browser console for any errors

---

## 🌱 SEED YOUR DATABASE (Optional)

If you want to add initial data:

1. In Render dashboard, go to your service
2. Click **"Shell"** tab
3. Run: `npm run seed`
4. Wait for completion

---

## 🐛 TROUBLESHOOTING

### Backend won't start
- Check logs in Render dashboard
- Verify all environment variables are correct
- Make sure `Root Directory` is set to `backend`

### Database connection fails
- Check MongoDB Atlas Network Access (should have 0.0.0.0/0)
- Verify connection string is correct
- Check if password has special characters (may need URL encoding)

### CORS errors
- Make sure `FRONTEND_URL` is set in Render
- Check that Vercel URL is correct (no trailing slash)

### Frontend can't connect to backend
- Update `.env.production` with correct backend URL
- Redeploy frontend with `vercel --prod`
- Check browser console for errors

---

## 📋 QUICK CHECKLIST

Backend Deployment:
- [ ] MongoDB Atlas set up (or have connection string)
- [ ] Render account created
- [ ] Web Service created on Render
- [ ] Root Directory set to `backend`
- [ ] All environment variables added
- [ ] Service deployed successfully
- [ ] Health check works

Frontend Update:
- [ ] `.env.production` updated with backend URL
- [ ] Frontend redeployed to Vercel
- [ ] App works end-to-end

---

## 🎉 YOUR URLS

Once everything is deployed:

- **Frontend**: https://virtual-zoo-three.vercel.app
- **Backend**: https://your-backend-name.onrender.com
- **API Health**: https://your-backend-name.onrender.com/api/health

---

## ⚠️ IMPORTANT NOTES

1. **Free Tier Limitations**:
   - Render free tier spins down after 15 min of inactivity
   - First request takes ~30 seconds to wake up
   - 750 hours/month limit

2. **Auto-Deploy**:
   - Render auto-deploys when you push to GitHub
   - Vercel auto-deploys when you push to GitHub

3. **Environment Variables**:
   - Never commit `.env` files to GitHub
   - Always use environment variables for secrets

---

Need help? Check the logs in Render dashboard for detailed error messages!
