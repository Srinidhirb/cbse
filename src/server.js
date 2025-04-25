import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
const app = express();
import nodemailer from "nodemailer";

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
app.post("/addNote", upload.fields([{ name: "files", maxCount: 5 }]), async (req, res) => {

  try {
    const { category, title, description, youtubeLinks } = req.body;

    const Model = getModel(category);
    if (!Model) return res.status(400).json({ error: "❌ Invalid category" });

    const filePaths = req.files.files ? req.files.files.map((file) => file.path) : [];


    const newNote = new Model({
      title,
      description,
      youtubeLinks: youtubeLinks ? youtubeLinks.split(",") : [], // Convert string to array


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
app.get("/note/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;
    const Model = getModel(category);
    if (!Model) return res.status(400).json({ error: "❌ Invalid category" });

    const note = await Model.findById(id);
    if (!note) return res.status(404).json({ error: "❌ Note not found" });

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching note" });
  }
});

// ✅ API Route - Update Note (Supports File Updates)
app.put("/updateNote/:category/:id", upload.array("files", 5), async (req, res) => {
  try {
    const { category, id } = req.params;
    const { title, description, youtubeLinks } = req.body; // ✅ Extract from body

    const Model = getModel(category);
    if (!Model) return res.status(400).json({ error: "❌ Invalid category" });

    let note = await Model.findById(id);
    if (!note) return res.status(404).json({ error: "❌ Note not found" });

    const filePaths = req.files.length > 0 ? req.files.map((file) => file.path) : note.files;

    // ✅ Update fields safely
    if (title) note.title = title;
    if (description) note.description = description;
    if (youtubeLinks) note.youtubeLinks = youtubeLinks.split(",");
    note.files = filePaths;

    await note.save();
    res.status(200).json({ message: "✅ Note updated successfully", data: note });
  } catch (error) {
    console.error("❌ Error updating note:", error);
    res.status(500).json({ error: "❌ Error updating note", details: error.message });
  }
});

app.get("/notes/:category/random", async (req, res) => {
  try {
    const { category } = req.params;
    const Model = getModel(category);
    if (!Model) return res.status(400).json({ error: "❌ Invalid category" });

    const randomNotes = await Model.aggregate([{ $sample: { size: 12 } }]);

    // Add the category to each note before sending
    const withCategory = randomNotes.map(note => ({ ...note, category }));

    res.status(200).json(withCategory);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching random notes" });
  }
});


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

const userSchema = new mongoose.Schema({
  fullName: String,
  emailAddress: { type: String, required: true, unique: true },
  password: String,
  phoneNumber: String,

  gender: String,
  referralId: String,
  otp: String,
  otpExpires: Date,
  referralId: String,
  userReferralId: { type: String, unique: true },
});

const generateReferralId = async () => {
  let userReferralId;
  let isUnique = false;

  while (!isUnique) {
    userReferralId = "REF-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const existingUser = await User.findOne({ userReferralId });
    if (!existingUser) {
      isUnique = true;
    }
  }
  return userReferralId;
};
const User = mongoose.model("User", userSchema);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "srinidhirb03@gmail.com",
    pass: "dzqk ayed kexw udnf",
  },
});


app.post("/register", async (req, res) => {
  try {
    const { fullName, emailAddress, password, phoneNumber, gender, referralId } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ emailAddress });
    if (existingUser) {
      return res.status(400).json({ error: "❌ Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique user referral ID
    const userReferralId = await generateReferralId();

    // Create new user
    const newUser = new User({
      fullName,
      emailAddress,
      password: hashedPassword,
      phoneNumber,
      gender,
      referralId,  // This is the referral ID used by the user while registering
      userReferralId, // This is the unique referral ID assigned to the user
    });

    await newUser.save();

    res.status(201).json({
      message: "✅ User registered successfully",
      data: {
        fullName: newUser.fullName,
        emailAddress: newUser.emailAddress,
        phoneNumber: newUser.phoneNumber,
        gender: newUser.gender,
        referralId: newUser.referralId,
        userReferralId: newUser.userReferralId, // Return generated referral ID
      },
    });
  } catch (error) {
    res.status(500).json({ error: "❌ Error registering user" });
  }
});


const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: "srinidhirb03@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP for login is: ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {

    throw new Error("Failed to send OTP email");
  }
};

app.post("/send-otp", async (req, res) => {
  console.log("Received data:", req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "❌ Email is required" });
  }

  try {
    let user = await User.findOne({ emailAddress: email });


    if (!user) {

      return res.status(400).json({ error: "❌ User not registered. Please sign up." });
    }


    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);


    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();


    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "✅ OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "❌ Error sending OTP" });
  }
});


app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {

    const user = await User.findOne({ emailAddress: email });

    if (!user) {
      return res.status(400).json({ error: "❌ User not found" });
    }


    if (user.otp !== otp.toString()) {
      return res.status(400).json({ error: "❌ Invalid OTP" });
    }


    if (new Date() > new Date(user.otpExpires)) {
      return res.status(400).json({ error: "❌ OTP has expired" });
    }


    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "✅ OTP verified successfully" });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    res.status(500).json({ error: "❌ Error verifying OTP" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});


    const referralOwnerMap = {};
    users.forEach(user => {
      if (user.userReferralId) {
        referralOwnerMap[user.userReferralId] = user.fullName;
      }
    });


    const referralUsageMap = {};
    users.forEach(user => {
      const referredBy = user.referralId;
      if (referredBy && referralOwnerMap[referredBy]) {
        const referrer = referralOwnerMap[referredBy];
        if (!referralUsageMap[referrer]) {
          referralUsageMap[referrer] = [];
        }
        referralUsageMap[referrer].push(user.fullName);
      }
    });


    const updatedUsers = users.map(user => {
      const usedBy = referralUsageMap[user.fullName] || [];
      return {
        ...user._doc,
        usedBy: usedBy.length > 0 ? usedBy : ["Not Used"],
      };
    });

    res.json(updatedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/referral-usage", async (req, res) => {
  try {
    const users = await User.find({});
    const referralUsage = {};


    const referralCodeToUserMap = {};
    users.forEach(user => {
      if (user.userReferralId) {
        referralCodeToUserMap[user.userReferralId] = user.fullName;
      }
    });


    users.forEach(user => {
      if (user.referralId && referralCodeToUserMap[user.referralId]) {
        const referrerName = referralCodeToUserMap[user.referralId];

        if (!referralUsage[referrerName]) {
          referralUsage[referrerName] = [];
        }

        referralUsage[referrerName].push(user.fullName);
      }
    });

    res.json(referralUsage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to build referral usage map" });
  }
});

app.get("/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ emailAddress: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const questionPaperSchema = new mongoose.Schema({
  name: String,
  file: String,
  category: String,  // Added category field
});

const QuestionPaper = mongoose.model("QuestionPaper", questionPaperSchema);

// Upload route to include category
app.post("/upload-question-paper", upload.single("file"), async (req, res) => {
  try {
    const { name, category } = req.body;  // Get category from request body
    const filePath = req.file.path;

    // Create new question paper with category
    const newPaper = new QuestionPaper({ name, file: filePath, category });
    await newPaper.save();

    res.status(201).json({ message: "✅ Question paper uploaded", data: newPaper });
  } catch (error) {
    console.error("❌ Upload failed:", error);
    res.status(500).json({ error: "❌ Failed to upload question paper" });
  }
});

// Fetch route to get all papers, optionally filter by category
app.get("/question-papers", async (req, res) => {
  try {
    // Optionally filter by category if the query parameter is provided
    const category = req.query.category;  
    const filter = category ? { category } : {};  // If category is provided, filter by it

    const papers = await QuestionPaper.find(filter);
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching question papers" });
  }
});
app.delete("/delete-question-paper/:paperId", async (req, res) => {
  try {
    const { paperId } = req.params; // Extract paperId from URL parameters

    // Find and delete the paper by its ID
    const deletedPaper = await QuestionPaper.findByIdAndDelete(paperId);

    if (!deletedPaper) {
      return res.status(404).json({ error: "❌ Paper not found" });
    }

    res.status(200).json({ message: "✅ Paper deleted successfully", data: deletedPaper });
  } catch (error) {
    console.error("❌ Error deleting paper:", error);
    res.status(500).json({ error: "❌ Error deleting paper" });
  }
});


app.listen(5000, () => console.log("🚀 Server running on port 5000"));
