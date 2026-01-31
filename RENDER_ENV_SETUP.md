# Render Environment Variables Setup Guide

## 🚨 Problem
CORS errors are still appearing because environment variables might not be properly set on Render.

## ✅ Solution: Set Environment Variables on Render

### Step 1: Go to Render Dashboard
1. Open: **https://dashboard.render.com/**
2. Login to your account
3. Click on your **backend service** (virtual-zoo-6d78)

### Step 2: Go to Environment Tab
1. On the left sidebar, click **"Environment"**
2. You'll see a list of environment variables

### Step 3: Verify/Add These Variables

**IMPORTANT:** Make sure ALL these variables are present:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `MONGO_URI` | `mongodb+srv://zoouse12:zoouse2025@cluster0.c6ln493.mongodb.net/virtual-zoo?appName=Cluster0` | MongoDB connection |
| `JWT_SECRET` | `9fb0e2809602501623c6628a151fb43b391c291ccd0f982f2e634be24c1471b` | JWT secret key |
| `EMAIL` | `rajsudhanshu106@gmail.com` | Gmail for OTP |
| `EMAIL_PASS` | `rlmwoihuqsloscqn` | Gmail app password |
| `ELEVENLABS_API_KEY` | `sk_6880424fb99c90c981a43addf97f3f47d9333410e316d7c6` | ElevenLabs API |
| `FRONTEND_URL` | `https://virtual-zoo-three.vercel.app` | **CRITICAL for CORS** |
| `NODE_ENV` | `production` | Production mode |
| `PORT` | `5001` | Server port (optional) |

### Step 4: Add Missing Variables

If any variable is missing:
1. Click **"Add Environment Variable"** button
2. Enter the **Key** (variable name)
3. Enter the **Value** (from table above)
4. Click **"Save Changes"**

### Step 5: Manual Deploy (If Needed)

After adding/updating variables:
1. Go to **"Manual Deploy"** section (top right)
2. Click **"Deploy latest commit"**
3. Wait for deployment to complete (2-5 minutes)

---

## 🔍 Check Deployment Logs

### Step 1: Go to Logs Tab
1. Click **"Logs"** in the left sidebar
2. Watch the deployment process

### Step 2: Look for Success Messages
You should see:
```
✅ MongoDB connected
📁 Database: virtual-zoo
Backend running on http://localhost:5001
```

### Step 3: Look for CORS Logs
When you try to register/login, you should see:
```
📝 Registration attempt: { name: '...', email: '...' }
```

If you see:
```
⚠️ CORS blocked origin: https://virtual-zoo-three.vercel.app
```
Then `FRONTEND_URL` is NOT set correctly!

---

## 🧪 Test After Setup

### Test 1: Health Check
Open in browser:
```
https://virtual-zoo-6d78.onrender.com/api/health
```
Should return: `{"status":"ok"}`

### Test 2: CORS Preflight
Open browser console and run:
```javascript
fetch('https://virtual-zoo-6d78.onrender.com/api/auth/register', {
  method: 'OPTIONS',
  headers: {
    'Origin': 'https://virtual-zoo-three.vercel.app',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'Content-Type'
  }
}).then(r => console.log('CORS OK:', r.status))
```

Should return: `CORS OK: 204` or `CORS OK: 200`

### Test 3: Actual Registration
Try registering on your frontend:
```
https://virtual-zoo-three.vercel.app
```

---

## ⚠️ Common Issues

### Issue 1: Variables Not Saving
**Solution:** Make sure to click "Save Changes" after adding each variable

### Issue 2: Old Deployment Still Running
**Solution:** Click "Manual Deploy" → "Deploy latest commit"

### Issue 3: CORS Still Blocked
**Solution:** Double-check `FRONTEND_URL` is EXACTLY:
```
https://virtual-zoo-three.vercel.app
```
(No trailing slash!)

---

## 🎯 Quick Checklist

- [ ] Logged into Render Dashboard
- [ ] Opened backend service (virtual-zoo-6d78)
- [ ] Clicked "Environment" tab
- [ ] Verified all 8 environment variables are present
- [ ] Added missing variables (especially `FRONTEND_URL`)
- [ ] Clicked "Save Changes"
- [ ] Triggered manual deploy (if needed)
- [ ] Checked logs for success messages
- [ ] Tested health endpoint
- [ ] Tested registration on frontend

---

## 📞 If Still Not Working

If CORS errors persist after following all steps:

1. **Screenshot the Environment tab** on Render
2. **Copy the deployment logs** (last 50 lines)
3. **Share the browser console errors**

I'll help debug further!

---

**Next Action:** Go to Render Dashboard → Environment → Add `FRONTEND_URL` variable
