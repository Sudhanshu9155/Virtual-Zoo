require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Models
const Animal = require("./models/Animal");
const QuizQuestion = require("./models/QuizQuestion");

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// ✅ Sound Route (from backend/server/api/sound.js)
const soundRoute = require("./server/api/sound");

const app = express();
const PORT = process.env.PORT || 5001;

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://virtual-zoo-three.vercel.app",
  process.env.FRONTEND_URL // Additional frontend URL if needed
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Return false instead of throwing error to prevent server crash
      console.warn(`⚠️ CORS blocked origin: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests explicitly
app.options('*', cors());

// ---------------- DATABASE ----------------
let connectionAttempts = 0;
const MAX_RETRY_ATTEMPTS = 3; // Only retry 3 times initially

const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    retryWrites: true,
    w: 'majority'
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, options);
    connectionAttempts = 0; // Reset on success
    console.log("✅ MongoDB connected");
    console.log("📁 Database:", mongoose.connection.db.databaseName);
    console.log("🔗 Connection string:", process.env.MONGO_URI?.replace(/\/\/.*:.*@/, '//***:***@'));
  } catch (err) {
    connectionAttempts++;
    console.error("❌ MongoDB Connection Error:", err.message);
    console.error("🔍 Error Code:", err.code);

    if (connectionAttempts <= MAX_RETRY_ATTEMPTS) {
      console.error("⚠️ Make sure:");
      console.error("   1. MongoDB Atlas Network Access allows 0.0.0.0/0");
      console.error("   2. MONGO_URI is correct in environment variables");
      console.error("   3. Your internet connection is stable");
      console.error("   4. MongoDB Atlas cluster is running");
      console.log(`🔄 Retrying connection in 5 seconds... (Attempt ${connectionAttempts}/${MAX_RETRY_ATTEMPTS})`);
      setTimeout(connectDB, 5000);
    } else {
      console.error("\n❌ MongoDB connection failed after", MAX_RETRY_ATTEMPTS, "attempts");
      console.error("⚠️ Server will continue running but database operations will fail");
      console.error("\n💡 LOCAL DEVELOPMENT:");
      console.error("   - This is OK if your network blocks MongoDB Atlas");
      console.error("   - You can still develop frontend using Render backend");
      console.error("\n💡 RENDER/PRODUCTION:");
      console.error("   - Go to MongoDB Atlas → Network Access");
      console.error("   - Add IP: 0.0.0.0/0 (Allow from anywhere)");
      console.error("   - Update Render environment variables");
      console.error("   - Redeploy on Render\n");
    }
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected.');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB reconnected successfully');
});

// Start connection
connectDB();

// ---------------- ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// ✅ SOUND API
app.use("/api/sound", soundRoute);

// ---------------- ANIMAL ROUTES ----------------
app.get("/api/animals", async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    const animals = await Animal.find(query).lean();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch animals" });
  }
});

app.get("/api/animals/:id", async (req, res) => {
  try {
    const animal = await Animal.findOne({ id: req.params.id }).lean();
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.json(animal);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch animal" });
  }
});

// ---------------- QUIZ ROUTES ----------------
app.get("/api/quiz", async (req, res) => {
  try {
    const { category, animal } = req.query;
    let filter = {};

    if (category) {
      filter.category = { $regex: `^${category}$`, $options: "i" };
    }
    if (animal) filter.animal = animal;

    const questions = await QuizQuestion.find(filter).lean();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Quiz fetch error" });
  }
});

// ---------------- HEALTH CHECK ----------------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
