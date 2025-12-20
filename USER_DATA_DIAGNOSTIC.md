# 🔍 User Data Issue - Diagnostic & Fix

## 📊 Current Situation

You mentioned:
- ✅ Login/Register work properly
- ✅ Animals and quiz data work
- ❌ User data is not being saved

**Your MongoDB URI:**
```
mongodb+srv://zoouse:VirtualZoo2024%40@cluster0.c6ln493.mongodb.net/virtualzoo
```

This URI **is correct** - it includes the database name (`virtualzoo`).

---

## 🎯 Likely Issues

Since your MongoDB URI is correct, the problem might be one of these:

### Issue 1: Different Database Names (Local vs Production)

**Symptom:** Works locally but not in production

**Cause:** 
- Local backend uses: `virtualzoo` database
- Animals/Quiz data seeded to: `virtual-zoo` database (with hyphen)
- **Database name mismatch!**

**Check:**
```javascript
// In your seed.js or data files, check which database was used
// It might be 'virtual-zoo' instead of 'virtualzoo'
```

### Issue 2: Render Environment Variable Not Set

**Symptom:** Backend can't connect to MongoDB on Render

**Cause:** `MONGO_URI` not set or set incorrectly on Render

**Fix:** Update on Render Dashboard

---

## ✅ Solution Steps

### Step 1: Check Which Database Has Your Data

1. Go to **MongoDB Atlas Dashboard**
2. Click on **Browse Collections**
3. Check which database has your animals and quiz data:
   - Is it `virtualzoo`? (no hyphen)
   - Or `virtual-zoo`? (with hyphen)

### Step 2: Update Render Environment Variable

Based on which database has your data:

#### If data is in `virtualzoo`:
```
MONGO_URI=mongodb+srv://zoouse:VirtualZoo2024%40@cluster0.c6ln493.mongodb.net/virtualzoo
```

#### If data is in `virtual-zoo`:
```
MONGO_URI=mongodb+srv://zoouse:VirtualZoo2024%40@cluster0.c6ln493.mongodb.net/virtual-zoo
```

**How to update:**
1. Go to: https://dashboard.render.com/
2. Select: `virtual-zoo-5qda` backend service
3. Navigate: **Environment** → **Environment Variables**
4. Set `MONGO_URI` to the correct value
5. Click **Save Changes**

### Step 3: Verify Other Environment Variables

Make sure these are also set on Render:

```bash
MONGO_URI=mongodb+srv://zoouse:VirtualZoo2024%40@cluster0.c6ln493.mongodb.net/virtualzoo
JWT_SECRET=<your-secret-key>
PORT=5001
EMAIL=<your-email-for-password-reset>
EMAIL_PASS=<your-email-app-password>
```

**Note:** `JWT_SECRET` is critical for authentication to work!

---

## 🔍 Debugging: Check What's Actually Happening

### Option 1: Check Render Logs

1. Go to your Render dashboard
2. Select your backend service
3. Click on **Logs**
4. Look for:
   ```
   MongoDB connected
   ```
   or errors like:
   ```
   MongoDB Error: ...
   MongoServerError: ...
   ```

### Option 2: Test API Endpoints

Use a tool like Postman or curl to test:

#### Test 1: Health Check
```bash
GET https://virtual-zoo-5qda.onrender.com/api/health
```
Expected: `{ "status": "ok" }`

#### Test 2: Register a User
```bash
POST https://virtual-zoo-5qda.onrender.com/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test123@example.com",
  "password": "password123"
}
```
Expected: `{ "message": "Registration successful" }`

#### Test 3: Login
```bash
POST https://virtual-zoo-5qda.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "test123@example.com",
  "password": "password123"
}
```
Expected: `{ "token": "..." }`

#### Test 4: Get User Data
```bash
GET https://virtual-zoo-5qda.onrender.com/api/user/me
Authorization: Bearer <token-from-login>
```
Expected: User object with name, email, etc.

#### Test 5: Save Quiz Score
```bash
POST https://virtual-zoo-5qda.onrender.com/api/user/quiz-score
Authorization: Bearer <token-from-login>
Content-Type: application/json

{
  "score": 8
}
```
Expected: `{ "message": "Score recorded", "user": {...} }`

---

## 🐛 Common Issues & Solutions

### Issue: "User not found" after login

**Cause:** User was created but can't be retrieved

**Possible reasons:**
1. Database name mismatch
2. MongoDB connection lost
3. JWT_SECRET not set or different between environments

**Fix:**
- Ensure `MONGO_URI` on Render matches your local one
- Ensure `JWT_SECRET` is set on Render
- Check Render logs for errors

### Issue: Quiz scores not saving

**Cause:** Authentication middleware failing

**Possible reasons:**
1. Token not being sent correctly
2. JWT_SECRET mismatch
3. User not found in database

**Fix:**
- Check browser console for 401/403 errors
- Verify JWT_SECRET is set on Render
- Test `/api/user/me` endpoint

### Issue: Animals work but users don't

**Cause:** Different collections in different databases

**Possible reasons:**
1. Animals seeded to one database
2. Users being created in another database
3. Database name has typo or different casing

**Fix:**
- Check MongoDB Atlas to see which database has which collections
- Ensure all collections are in the same database
- Update `MONGO_URI` to use the correct database name

---

## 📋 Quick Checklist

- [ ] Check MongoDB Atlas - which database has your animals/quiz data?
- [ ] Verify database name: `virtualzoo` or `virtual-zoo`?
- [ ] Update `MONGO_URI` on Render with correct database name
- [ ] Verify `JWT_SECRET` is set on Render
- [ ] Check Render logs for MongoDB connection success
- [ ] Test user registration via API
- [ ] Test user login via API
- [ ] Test quiz score saving via API
- [ ] Check MongoDB Atlas to see if new users appear in the database

---

## 🎯 Most Likely Fix

Based on your setup, the most likely issue is:

**Your animals/quiz data is in `virtual-zoo` (with hyphen)**  
**But your MONGO_URI uses `virtualzoo` (no hyphen)**

**Solution:**
1. Check MongoDB Atlas to confirm which database has your data
2. Update your `MONGO_URI` to match that database name
3. Update both locally (`.env`) and on Render

---

## 📞 Next Steps

1. **Check MongoDB Atlas** - Which database has your collections?
2. **Check Render Logs** - Any MongoDB errors?
3. **Test the API endpoints** - Which ones fail?
4. **Report back** with what you find, and I can help you fix it!

---

**Last Updated:** 2025-12-20 12:35 IST
