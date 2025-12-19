# 🚀 Quick Deployment Checklist

## Before Deploying

- [ ] Code is working locally (`npm run dev`)
- [ ] All dependencies are in `package.json`
- [ ] `.env` is in `.gitignore`
- [ ] Code is pushed to GitHub

## Render Configuration

### Build Settings
```
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### Environment Variables (Add these in Render)
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/virtual-zoo
JWT_SECRET=your-super-secret-jwt-key
PORT=5001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.onrender.com
```

## After Deployment

- [ ] Test health endpoint: `https://your-app.onrender.com/api/health`
- [ ] Test animals endpoint: `https://your-app.onrender.com/api/animals`
- [ ] Check logs in Render dashboard
- [ ] Seed database if needed (use Shell in Render)
- [ ] Update frontend to use production API URL
- [ ] Add backend URL to frontend environment variables

## MongoDB Atlas Setup

1. Create free cluster at mongodb.com/cloud/atlas
2. Create database user
3. Get connection string
4. Network Access → Add `0.0.0.0/0`
5. Add connection string to Render env vars

## Your URLs

- Backend: `https://virtual-zoo-backend.onrender.com`
- Frontend: `https://your-frontend.onrender.com` (deploy separately)

## Common Issues

**App won't start?**
→ Check Render logs for errors
→ Verify all env variables are set

**CORS errors?**
→ Add frontend URL to `FRONTEND_URL` env variable
→ Make sure no trailing slash

**Database connection fails?**
→ Check MongoDB Atlas network access (0.0.0.0/0)
→ Verify connection string is correct

**Slow first request?**
→ Free tier spins down after 15 min inactivity
→ First request takes ~30 seconds to wake up
