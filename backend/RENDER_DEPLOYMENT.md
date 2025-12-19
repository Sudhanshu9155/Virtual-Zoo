# 🚀 Deploy Virtual Zoo Backend to Render

This guide will help you deploy your Node.js/Express backend to Render.

## 📋 Prerequisites

1. **GitHub Account** - Your code should be pushed to GitHub
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas** - For production database (free tier available)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Production Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free M0 tier)
4. Click **"Connect"** → **"Connect your application"**
5. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
6. Replace `<password>` with your actual database password
7. Add `/virtual-zoo` at the end: `mongodb+srv://username:password@cluster.mongodb.net/virtual-zoo`

**Important**: In Atlas, go to **Network Access** and add `0.0.0.0/0` to allow connections from anywhere (required for Render).

---

## 🔧 Step 2: Push Your Code to GitHub

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit - Virtual Zoo Backend"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Deploy to Render

### A. Create a New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your `nexus-zoo-project` repository

### B. Configure the Service

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `virtual-zoo-backend` (or your preferred name) |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### C. Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key | Value | Example |
|-----|-------|---------|
| `MONGO_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/virtual-zoo` |
| `JWT_SECRET` | Random secure string | `your-super-secret-jwt-key-change-this` |
| `PORT` | `5001` | `5001` |
| `NODE_ENV` | `production` | `production` |
| `FRONTEND_URL` | Your frontend URL (add after frontend is deployed) | `https://your-frontend.onrender.com` |

**Additional variables** (check your `.env` file for any others you need):
- `GOOGLE_CLIENT_ID` (if using Google OAuth)
- `EMAIL_USER` (if using nodemailer)
- `EMAIL_PASS` (if using nodemailer)

### D. Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy your app
3. Wait for the deployment to complete (usually 2-5 minutes)
4. You'll get a URL like: `https://virtual-zoo-backend.onrender.com`

---

## ✅ Step 4: Verify Deployment

Test your deployed backend:

1. **Health Check**: Visit `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"status":"ok"}`

2. **Animals API**: Visit `https://your-backend-url.onrender.com/api/animals`
   - Should return an array of animals (might be empty if not seeded)

3. **Check Logs**: In Render dashboard, click on your service → **"Logs"** to see if there are any errors

---

## 🌱 Step 5: Seed Your Production Database (Optional)

If you want to populate your production database with initial data:

1. In Render dashboard, go to your service
2. Click **"Shell"** tab
3. Run: `npm run seed`
4. Wait for it to complete

---

## 🔄 Step 6: Update Frontend Configuration

Once your backend is deployed, update your frontend to use the production API:

```javascript
// In your frontend config or .env
const API_URL = import.meta.env.PROD 
  ? 'https://virtual-zoo-backend.onrender.com/api'
  : 'http://localhost:5001/api';
```

Don't forget to add your frontend URL to the `FRONTEND_URL` environment variable in Render!

---

## 🐛 Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas allows connections from `0.0.0.0/0`

### CORS errors
- Make sure `FRONTEND_URL` environment variable is set in Render
- Verify your frontend URL is correct (no trailing slash)

### Database connection fails
- Check MongoDB Atlas connection string
- Verify network access settings in Atlas
- Ensure password doesn't contain special characters that need URL encoding

### App sleeps/slow first request
- Free tier on Render spins down after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- Upgrade to paid tier for always-on service

---

## 🔐 Security Checklist

- ✅ Strong `JWT_SECRET` (at least 32 random characters)
- ✅ MongoDB Atlas has network restrictions
- ✅ Environment variables are not committed to Git
- ✅ CORS is properly configured
- ✅ `.env` file is in `.gitignore`

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Service spins down after 15 min of inactivity
   - 750 hours/month of runtime
   - Slower performance than paid tiers

2. **Auto-Deploy**: Render automatically redeploys when you push to your GitHub repository

3. **Custom Domain**: You can add a custom domain in Render settings (paid feature)

---

## 🎉 You're Done!

Your backend is now live at: `https://your-backend-url.onrender.com`

Next steps:
- Deploy your frontend
- Test all API endpoints
- Monitor logs for any issues
- Consider upgrading to paid tier for production use

---

## 📞 Need Help?

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- Check Render logs for detailed error messages
