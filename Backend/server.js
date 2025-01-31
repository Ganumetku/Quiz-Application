import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;
const QUIZ_API = "https://api.jsonserve.com/Uw5CrX";

app.use(cors());

app.get("/quiz", async (req, res) => {
  try {
    console.log("Fetching quiz data...");
    const response = await fetch(QUIZ_API);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch quiz data. Please try again." });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
