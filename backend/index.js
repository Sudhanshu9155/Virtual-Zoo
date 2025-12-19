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
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ---------------- DATABASE ----------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB Error:", err));

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
