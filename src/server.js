import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files statically

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/CBSE", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("✅ Connected to MongoDB"));
db.on("error", (err) => console.error("❌ MongoDB connection error:", err));

/* ---------------- Existing Video URL Functionality ---------------- */

// Schema and Model for Video URLs
const VideoSchema = new mongoose.Schema({
  url: String,
});

const VideoModel = mongoose.model("Videos_url", VideoSchema);

// ✅ API Route - Add Video URL
app.post("/add", async (req, res) => {
  try {
    const { url } = req.body;
    const newVideo = new VideoModel({ url });
    await newVideo.save();
    res.status(201).json({ message: "✅ Video added successfully", data: newVideo });
  } catch (error) {
    res.status(500).json({ error: "❌ Error saving video URL" });
  }
});

// ✅ API Route - Fetch All Video URLs
app.get("/videos", async (req, res) => {
  try {
    const videos = await VideoModel.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching video URLs" });
  }
});

/* ---------------- New Notes Management Functionality ---------------- */

// Define schemas and models for different categories
const noteSchema = new mongoose.Schema({
  title: String,
  description: String,  // ✅ New Field
  youtubeLinks: [String], // ✅ New Field (Array of URLs)
  testPaper: String, // ✅ New Field (Optional)
  files: [String], 
});


const Class9Math = mongoose.model("Class9Math", noteSchema);
const Class10Math = mongoose.model("Class10Math", noteSchema);
const Class9Science = mongoose.model("Class9Science", noteSchema);
const Class10Science = mongoose.model("Class10Science", noteSchema);

// Function to get the correct model based on category
const getModel = (category) => {
  switch (category) {
    case "Class 9 Math":
      return Class9Math;
    case "Class 10 Math":
      return Class10Math;
    case "Class 9 Science":
      return Class9Science;
    case "Class 10 Science":
      return Class10Science;
    default:
      return null;
  }
};

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the folder exists
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ API Route - Add Note with File Upload
app.post("/addNote", upload.fields([{ name: "files", maxCount: 5 }, { name: "testPaper", maxCount: 1 }]), async (req, res) => {

  try {
    const { category, title, description, youtubeLinks } = req.body;
    const testPaperFile = req.files["testPaper"] ? req.files["testPaper"][0].path : "";
    const Model = getModel(category);
    if (!Model) return res.status(400).json({ error: "❌ Invalid category" });

    const filePaths = req.files.map((file) => file.path);
    
    const newNote = new Model({
      title,
      description,
      youtubeLinks: youtubeLinks ? youtubeLinks.split(",") : [], // Convert string to array
      testPaper: testPaperFile, // Store file path

      files: filePaths,
    });

    await newNote.save();
    res.status(201).json({ message: "✅ Note added successfully", data: newNote });
  } catch (error) {
    res.status(500).json({ error: "❌ Error saving note" });
  }
});


// ✅ API Route - Fetch Notes by Category
app.get("/notes/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const Model = getModel(category);
    if (!Model) return res.status(400).json({ error: "❌ Invalid category" });

    const notes = await Model.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching notes" });
  }
});

// ✅ API Route - Update Note (Supports File Updates)
app.put("/updateNote/:category/:id", upload.array("files", 5), async (req, res) => {
  try {
    const { category, id } = req.params;
    const { title, description, youtubeLinks, testPaper } = req.body;
    const Model = getModel(category);
    if (!Model) return res.status(400).json({ error: "❌ Invalid category" });

    let note = await Model.findById(id);
    if (!note) return res.status(404).json({ error: "❌ Note not found" });

    const filePaths = req.files.length > 0 ? req.files.map((file) => file.path) : note.files;

    note.title = title || note.title;
    note.description = description || note.description;
    note.youtubeLinks = youtubeLinks ? youtubeLinks.split(",") : note.youtubeLinks;
    note.testPaper = testPaper || note.testPaper;
    note.files = filePaths;

    await note.save();
    res.status(200).json({ message: "✅ Note updated successfully", data: note });
  } catch (error) {
    res.status(500).json({ error: "❌ Error updating note" });
  }
});



// ✅ API Route - Delete Note
app.delete("/deleteNote/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;
    const Model = getModel(category);
    if (!Model) return res.status(400).json({ error: "❌ Invalid category" });

    await Model.findByIdAndDelete(id);
    res.status(200).json({ message: "✅ Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "❌ Error deleting note" });
  }
});

// ✅ API Route - Serve Uploaded Files
app.get("/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "uploads", filename);
  res.sendFile(filePath);
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
