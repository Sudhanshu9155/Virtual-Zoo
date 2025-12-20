# 🔍 User Data Debugging - Enhanced Logging Added

## ✅ Changes Made

I've added detailed console logging to track the entire user data flow:

### 1. **Registration Endpoint** (`routes/auth.js`)
Now logs:
- ✅ When registration is attempted
- ✅ User details (name, email)
- ✅ If user is successfully created with MongoDB ID
- ❌ Any errors that occur

### 2. **Quiz Score Endpoint** (`routes/user.js`)
Now logs:
- ✅ When quiz score is submitted
- ✅ User ID and score value
- ✅ User data before update
- ✅ User data after successful save
- ❌ Any errors that occur

### 3. **MongoDB Connection** (`index.js`)
Now logs:
- ✅ Connection success
- ✅ **Database name** being used
- ✅ Connection string (with hidden credentials)

---

## 🧪 How to Test

### Step 1: Start Your Backend

If you're testing locally:
```bash
cd backend
npm run dev
```

If testing on Render, check the logs in Render dashboard.

### Step 2: Watch the Console/Logs

You should see:
```
✅ MongoDB connected
📁 Database: virtualzoo
🔗 Connection string: mongodb+srv://***:***@cluster0.c6ln493.mongodb.net/virtualzoo
```

**Important:** Check that it says `Database: virtualzoo` (not `virtual-zoo`)

### Step 3: Test Registration

1. Go to your frontend registration page
2. Register a new user
3. Check backend console for:
   ```
   📝 Registration attempt: { name: 'Test User', email: 'test@example.com' }
   ✅ User created successfully: { id: '...', name: 'Test User', email: 'test@example.com' }
   ```

### Step 4: Test Login

1. Login with the registered user
2. You should get a token

### Step 5: Test Quiz Score Saving

1. Complete a quiz
2. Check backend console for:
   ```
   🎯 Quiz score submission: { userId: '...', score: 8 }
   📊 Before update: { scores: [], bestScore: 0, quizzesTaken: 0 }
   ✅ Score saved successfully: { userId: '...', newScore: 8, totalScores: 1, bestScore: 8 }
   ```

---

## 🔍 What to Look For

### ✅ **If Everything Works:**

You'll see these logs in sequence:
1. MongoDB connected to `virtualzoo`
2. Registration successful with user ID
3. Quiz score saved successfully

### ❌ **If User Data Doesn't Save:**

Look for these error patterns:

#### Error 1: Wrong Database
```
📁 Database: virtual-zoo   ← WRONG! Should be "virtualzoo"
```
**Fix:** Update MONGO_URI to use `virtualzoo` (no hyphen)

#### Error 2: User Not Found
```
❌ User not found: 507f1f77bcf86cd799439011
```
**Cause:** User was created in one database but backend is looking in another
**Fix:** Ensure MONGO_URI is consistent everywhere

#### Error 3: MongoDB Connection Error
```
❌ MongoDB Error: MongoServerError: ...
```
**Causes:**
- Wrong credentials
- IP not whitelisted in MongoDB Atlas
- Network issues

#### Error 4: Registration Fails
```
❌ Registration error: MongoError: ...
```
**Common causes:**
- Duplicate email (email already exists)
- MongoDB connection lost
- Validation error

---

## 📊 Verify in MongoDB Atlas

1. Go to: https://cloud.mongodb.com/
2. Click: **Browse Collections**
3. Select database: **virtualzoo**
4. Check collections:
   - `users` - should have your registered users
   - `animals` - should have animal data
   - `quizquestions` - should have quiz data

### Check User Document:

Click on a user in the `users` collection. You should see:
```json
{
  "_id": "...",
  "name": "Test User",
  "email": "test@example.com",
  "password": "$2a$10$...",  // hashed
  "quizCompleted": false,
  "scores": [8, 9, 7],  // Array of scores
  "bestScore": 9,
  "lastScore": 7,
  "quizzesTaken": 3
}
```

If `scores` array is empty or `bestScore` is 0 after taking quizzes, that confirms the issue.

---

## 🎯 Most Likely Issues & Solutions

### Issue 1: Database Name Mismatch

**Symptoms:**
- Registration works
- Login works
- Animals/quiz load
- Quiz scores don't save

**Check:**
```
📁 Database: virtual-zoo   ← If you see this, it's wrong!
```

**Solution:**
Ensure your `MONGO_URI` everywhere uses `virtualzoo`:
```
mongodb+srv://zoouse:VirtualZoo2024%40@cluster0.c6ln493.mongodb.net/virtualzoo
```

### Issue 2: Data in Different Databases

**Symptoms:**
- Some data works, some doesn't
- Inconsistent behavior

**Solution:**
1. Check MongoDB Atlas - which database has which collections?
2. Pick ONE database name
3. Update MONGO_URI everywhere to use that name
4. Re-seed if needed: `node seed.js`

### Issue 3: Render Environment Variable Not Set

**Symptoms:**
- Works locally
- Fails in production

**Solution:**
1. Go to Render dashboard
2. Check Environment Variables
3. Ensure `MONGO_URI` is set correctly
4. Redeploy if needed

---

## 📝 Next Steps

1. **Start your backend** (locally or check Render logs)
2. **Check the database name** in the console output
3. **Test registration** and watch for success log
4. **Test quiz score** and watch for save log
5. **Report back** what you see in the logs

---

## 🚀 Quick Commands

### Test Registration (using curl):
```bash
curl -X POST https://virtual-zoo-5qda.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test123@example.com","password":"password123"}'
```

### Test Login:
```bash
curl -X POST https://virtual-zoo-5qda.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test123@example.com","password":"password123"}'
```

### Test Quiz Score (replace TOKEN):
```bash
curl -X POST https://virtual-zoo-5qda.onrender.com/api/user/quiz-score \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"score":8}'
```

---

**The logging will now tell us exactly where the problem is!**
