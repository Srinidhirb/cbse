import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/CBSE", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("✅ Connected to MongoDB"));
db.on("error", (err) => console.error("❌ MongoDB connection error:", err));

// Schema and Model
const DataSchema = new mongoose.Schema({
  url: String,
});

const DataModel = mongoose.model("Videos_url", DataSchema);

// ✅ API Route - Add Data
app.post("/add", async (req, res) => {
  try {
    const { url } = req.body;
    const newVideo = new DataModel({ url });
    await newVideo.save();
    res.status(201).json({ message: "✅ Video added successfully", data: newVideo });
  } catch (error) {
    res.status(500).json({ error: "❌ Error saving data" });
  }
});

// ✅ API Route - Fetch All Data
app.get("/videos", async (req, res) => {
  try {
    const videos = await DataModel.find(); // Fetch all video URLs
    res.status(200).json(videos);
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});
// Update Video URL
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;
    const updatedVideo = await DataModel.findByIdAndUpdate(id, { url }, { new: true });
    res.status(200).json({ message: "Video updated successfully", data: updatedVideo });
  } catch (error) {
    res.status(500).json({ error: "Error updating video" });
  }
});
// Delete Video URL
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await DataModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting video" });
  }
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
