import express from "express";
import getUserExperiences from "./helpers/getUserExperiences.js";

const app = express();
const PORT = 3212;

app.get("/user/:username/experiences", async (req, res) => {
    const { username } = req.params;

    try {
        const experiences = await getUserExperiences(username);
        res.json({
            success: true,
            username,
            experiences
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Ping endpoint for UptimeRobot
app.get("/ping", (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString()
  });
});



app.listen(PORT, () => console.log(`API running on port ${PORT}`));
