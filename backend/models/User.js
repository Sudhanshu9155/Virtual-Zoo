const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  // For password reset
  resetOTP: String,
  otpExpiry: Date,

  // Track whether user has successfully completed the quiz
  quizCompleted: {
    type: Boolean,
    default: false
  },

  // Store ALL quiz scores for leaderboard/stats
  scores: {
    type: [Number],
    default: []
  },

  // Convenience fields derived from scores
  bestScore: {
    type: Number,
    default: 0
  },
  lastScore: {
    type: Number,
    default: 0
  },
  quizzesTaken: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("User", userSchema);
