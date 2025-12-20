const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// Get current logged in user (without password)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to load user" });
  }
});

// Mark quiz as completed for current user
router.post("/quiz-complete", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { quizCompleted: true },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Quiz marked as completed", user });
  } catch (err) {
    res.status(500).json({ message: "Could not update quiz status" });
  }
});

// Add a quiz score attempt for current user
router.post("/quiz-score", auth, async (req, res) => {
  try {
    const { score } = req.body;
    console.log("🎯 Quiz score submission:", { userId: req.userId, score });

    if (typeof score !== "number") {
      console.log("❌ Invalid score type:", typeof score);
      return res.status(400).json({ message: "Score must be a number" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      console.log("❌ User not found:", req.userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("📊 Before update:", {
      scores: user.scores,
      bestScore: user.bestScore,
      quizzesTaken: user.quizzesTaken
    });

    user.scores.push(score);
    user.lastScore = score;
    user.quizzesTaken = user.scores.length;
    user.bestScore = Math.max(user.bestScore || 0, score);

    await user.save();

    console.log("✅ Score saved successfully:", {
      userId: user._id,
      newScore: score,
      totalScores: user.scores.length,
      bestScore: user.bestScore
    });

    const cleanUser = user.toObject();
    delete cleanUser.password;

    res.json({ message: "Score recorded", user: cleanUser });
  } catch (err) {
    console.error("❌ Quiz score error:", err);
    res.status(500).json({ message: "Could not record score", error: err.message });
  }
});

// Leaderboard: top users by bestScore
router.get("/leaderboard", async (_req, res) => {
  try {
    const users = await User.find({ bestScore: { $gt: 0 } })
      .select("name email bestScore quizzesTaken lastScore")
      .sort({ bestScore: -1, quizzesTaken: -1 })
      .limit(20)
      .lean();

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch leaderboard" });
  }
});

module.exports = router;
