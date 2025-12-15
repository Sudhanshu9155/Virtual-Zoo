const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  try {
    const result = await axios.post(
      "https://api.elevenlabs.io/v1/sound-generation",
      { text: prompt },
      {
        headers: {
          "xi-api-key": "e4167b60024f56b71267c20d5690e230c61decd556253dcdeed145f21c3d756a",
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    res.set("Content-Type", "audio/mpeg");
    res.send(result.data);
  } catch (error) {
    console.error("Sound API error:", error.message);
    res.status(500).json({ error: "Sound generation failed" });
  }
});

module.exports = router;
