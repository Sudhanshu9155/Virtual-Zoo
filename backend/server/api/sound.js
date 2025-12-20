const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  // Check if API key is configured
  if (!process.env.ELEVENLABS_API_KEY) {
    console.error("❌ ELEVENLABS_API_KEY not configured in environment variables");
    return res.status(500).json({
      error: "Sound API not configured. Please contact administrator."
    });
  }

  try {
    console.log("🔊 Generating sound for:", prompt);

    const result = await axios.post(
      "https://api.elevenlabs.io/v1/sound-generation",
      { text: prompt },
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    console.log("✅ Sound generated successfully");
    res.set("Content-Type", "audio/mpeg");
    res.send(result.data);
  } catch (error) {
    // Decode buffer error responses from ElevenLabs
    let errorData = error.response?.data;
    if (errorData && Buffer.isBuffer(errorData)) {
      try {
        errorData = JSON.parse(errorData.toString());
      } catch (e) {
        errorData = errorData.toString();
      }
    }

    console.error("❌ Sound API error:", errorData || error.message);
    console.error("Status:", error.response?.status);

    const statusCode = error.response?.status || 500;
    const errorMessage = errorData?.detail || errorData || error.message || "Sound generation failed";

    res.status(statusCode).json({
      error: "Sound generation failed",
      details: errorMessage
    });
  }
});

module.exports = router;
