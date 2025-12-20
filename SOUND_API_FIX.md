# Sound API Troubleshooting Guide

## Issues Found and Fixed

### 1. **Hardcoded API Key (CRITICAL SECURITY ISSUE)** ⚠️
**Problem:** The ElevenLabs API key was hardcoded directly in the source code at `backend/server/api/sound.js:14`

**Security Risks:**
- API key is exposed in your public GitHub repository
- Anyone can see and use your API key
- The key may have been revoked by ElevenLabs for security reasons
- You could face unexpected charges if someone abuses your key

**Fix Applied:**
- Changed the code to use `process.env.ELEVENLABS_API_KEY` instead
- Added validation to check if the environment variable is set

### 2. **Missing Environment Variable Configuration**
**Problem:** The `ELEVENLABS_API_KEY` environment variable is not configured on your hosting platform (Render)

**Fix Required:**
You need to add the environment variable to your Render backend service.

## 🔧 Steps to Fix on Render

### Step 1: Get a New ElevenLabs API Key
Since your old key was exposed in the repository, you should get a new one:

1. Go to [ElevenLabs Dashboard](https://elevenlabs.io/)
2. Sign in to your account
3. Navigate to your profile settings or API section
4. Generate a new API key (or revoke the old one and create a new one)
5. Copy the new API key

### Step 2: Add Environment Variable to Render

1. Go to your [Render Dashboard](https://dashboard.render.com/)
2. Select your backend service (virtual-zoo backend)
3. Click on **"Environment"** in the left sidebar
4. Click **"Add Environment Variable"**
5. Add the following:
   - **Key:** `ELEVENLABS_API_KEY`
   - **Value:** [Paste your new ElevenLabs API key here]
6. Click **"Save Changes"**
7. Your service will automatically redeploy

### Step 3: Verify the Fix

After the deployment completes:

1. Open your hosted website
2. Navigate to an animal details page
3. Click the "Hear [Animal Name]" button
4. Check the browser console (F12) for any error messages
5. Check Render logs for backend error messages

## 🔍 Additional Debugging Steps

### Check Render Logs
1. Go to your Render dashboard
2. Select your backend service
3. Click on **"Logs"** tab
4. Look for messages like:
   - `🔊 Generating sound for: [animal name] animal sound` (success)
   - `❌ ELEVENLABS_API_KEY not configured` (missing env var)
   - `❌ Sound API error:` (API error details)

### Check Browser Console
1. Open your website
2. Press F12 to open Developer Tools
3. Go to the "Console" tab
4. Try to play a sound
5. Look for error messages

### Common Error Messages and Solutions

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Sound API not configured" | Missing `ELEVENLABS_API_KEY` | Add environment variable on Render |
| "401 Unauthorized" | Invalid or expired API key | Get a new API key from ElevenLabs |
| "429 Too Many Requests" | Rate limit exceeded | Wait or upgrade your ElevenLabs plan |
| "Network error" | CORS or connectivity issue | Check CORS settings in backend |
| "Failed to fetch" | Backend not responding | Check if backend is running on Render |

## 📋 Checklist

- [ ] Get new ElevenLabs API key
- [ ] Add `ELEVENLABS_API_KEY` to Render environment variables
- [ ] Wait for Render to redeploy
- [ ] Test sound feature on hosted website
- [ ] Check Render logs for errors
- [ ] Check browser console for errors
- [ ] (Optional) Revoke old exposed API key on ElevenLabs

## 🔐 Security Best Practices

### Never Commit Secrets to Git
- Always use environment variables for API keys
- Never hardcode sensitive information
- Use `.env` files locally (and add them to `.gitignore`)

### If You Accidentally Expose a Secret
1. **Immediately revoke** the exposed key
2. Generate a new key
3. Update environment variables on all platforms
4. Consider using tools like `git-secrets` to prevent future leaks

## 🚀 Code Changes Made

### Backend (`backend/server/api/sound.js`)
- ✅ Replaced hardcoded API key with environment variable
- ✅ Added validation to check if API key is configured
- ✅ Improved error logging with detailed information
- ✅ Better error responses for debugging

### Frontend (`frontend/src/pages/AnimalDetails.jsx`)
- ✅ Added response status checking
- ✅ Better error handling with user feedback
- ✅ Detailed error logging for debugging

## 📞 Need More Help?

If the sound API still doesn't work after following these steps:

1. Check your ElevenLabs account status
2. Verify your API key has the correct permissions
3. Check if you have remaining credits/quota
4. Review the Render logs for specific error messages
5. Test the API endpoint directly using a tool like Postman

## Testing Locally

To test locally before deploying:

1. Create a `.env` file in the `backend` folder (if it doesn't exist)
2. Add: `ELEVENLABS_API_KEY=your_api_key_here`
3. Run: `npm run dev` in the backend folder
4. Test the sound feature on `localhost`
