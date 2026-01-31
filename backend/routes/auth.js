const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// EMAIL CONFIG
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📝 Registration attempt:", { name, email });

    if (!name || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("❌ Email already exists:", email);
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    console.log("✅ User created successfully:", {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    });

    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔐 Login attempt:", { email });

    if (!email || !password) {
      console.log("❌ Missing credentials");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("❌ Invalid password for:", email);
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ Login successful:", { email, userId: user._id });
    res.json({ token });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("🔑 Forgot password request:", { email });

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.resetOTP = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      to: email,
      subject: "Virtual Zoo Password Reset OTP",
      text: `Your OTP is ${otp}`
    });

    console.log("✅ OTP sent to:", email);
    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("❌ Forgot password error:", err);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
});

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    console.log("🔄 Password reset attempt:", { email });

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user || user.resetOTP !== otp || user.otpExpiry < Date.now()) {
      console.log("❌ Invalid or expired OTP for:", email);
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOTP = null;
    user.otpExpiry = null;
    await user.save();

    console.log("✅ Password reset successful for:", email);
    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("❌ Reset password error:", err);
    res.status(500).json({ message: "Failed to reset password", error: err.message });
  }
});

module.exports = router;
