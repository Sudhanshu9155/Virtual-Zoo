# Virtual Zoo — Backend (Quiz API)

Simple Express backend that exposes a quiz endpoint used by the frontend:

- GET /api/quiz — returns an array of quiz questions
- GET /api/health — basic health check

Run locally:

```powershell
cd backend
npm install
# seed database (uses MONGO_URI or defaults to local MongoDB)
npm run seed
npm run start
```

The server listens on PORT (defaults to 5000).

Environment variables:
- MONGO_URI: MongoDB connection string (example: mongodb://127.0.0.1:27017/virtual-zoo)

Make sure the frontend has `VITE_API_URL` set to `http://localhost:5000` (or adjust the URL in the frontend).
