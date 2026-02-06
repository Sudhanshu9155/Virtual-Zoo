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
const soundRoute = require("./server/api/sound");

const app = express();
const PORT = process.env.PORT || 5001;

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(cookieParser());

// ---------------- CORS (SHORT & SAFE) ----------------
// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:3000",
//     "https://virtual-zoo-three.vercel.app",
//   ],
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(
  cors({
    origin: "https://virtual-zoo-three.vercel.app",
    credentials: true,
  })
);

app.options("*", cors());



// ---------------- DATABASE ----------------
const connectDB = async () => {
  try {
    console.log("DB URI: ",process.env.MONGO_URI)
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(db)
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("🔁 MongoDB reconnected");
});

connectDB();

// ---------------- ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sound", soundRoute);

// ---------------- ANIMAL ROUTES ----------------
app.get("/api/animals", async (req, res) => {
  try {
    const { category } = req.query;
    const query = {};

    if (category) {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    const animals = await Animal.find(query).lean();
    res.json(animals);
  } catch {
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
  } catch {
    res.status(500).json({ message: "Failed to fetch animal" });
  }
});

// ---------------- QUIZ ROUTES ----------------
app.get("/api/quiz", async (req, res) => {
  try {
    const { category, animal } = req.query;
    const filter = {};

    if (category) {
      filter.category = { $regex: `^${category}$`, $options: "i" };
    }
    if (animal) filter.animal = animal;

    const questions = await QuizQuestion.find(filter).lean();
    res.json(questions);
  } catch {
    res.status(500).json({ message: "Quiz fetch error" });
  }
});

// ---------------- HEALTH CHECK ----------------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
