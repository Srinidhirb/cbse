import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config(); // Load environment variables
import { PDFDocument } from "pdf-lib";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("MONGO_URI:", process.env.MONGO_URI);
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


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
app.post(
  "/add",
  body("url").isURL().withMessage("Invalid URL"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { url } = req.body;
      const newVideo = new VideoModel({ url });
      await newVideo.save();
      res
        .status(201)
        .json({ message: "✅ Video added successfully", data: newVideo });
    } catch (error) {
      res.status(500).json({ error: "❌ Error saving video URL" });
    }
  }
);

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

// Unified Note Schema
const noteSchema = new mongoose.Schema({
  class: { type: String, required: true },
  subject: { type: String, required: true },
  title: String,
  description: String,
  youtubeLinks: [String],
  files: [String],
});

const Note = mongoose.model("Note", noteSchema);

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

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// Utility function to validate YouTube URLs
const isValidYouTubeUrl = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url);
};

// ✅ API Route - Add Note with File Upload
app.post(
  "/addNote",
  upload.fields([{ name: "files", maxCount: 5 }]),
  async (req, res) => {
    try {
      const { class: noteClass, subject, title, description, youtubeLinks } = req.body;

      // Validate required fields
      if (!noteClass || !subject) {
        return res.status(400).json({ error: "❌ 'class' and 'subject' fields are required" });
      }

      const filePaths = req.files.files
        ? req.files.files.map((file) => file.path)
        : [];

      // Validate and sanitize YouTube links
      const sanitizedLinks = youtubeLinks
        ? youtubeLinks.split(",").filter(isValidYouTubeUrl)
        : [];

      if (youtubeLinks && sanitizedLinks.length !== youtubeLinks.split(",").length) {
        return res.status(400).json({ error: "❌ One or more YouTube links are invalid" });
      }

      const newNote = new Note({
        class: noteClass,
        subject,
        title,
        description,
        youtubeLinks: sanitizedLinks,
        files: filePaths,
      });

      await newNote.save();
      res.status(201).json({ message: "✅ Note added successfully", data: newNote });
    } catch (error) {
      console.error("❌ Error adding note:", error);
      res.status(500).json({ error: "❌ Error adding note" });
    }
  }
);

// ✅ API Route - Fetch Notes by Category
app.get("/notes/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const notes = await Note.find({ category });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching notes" });
  }
});
app.get("/note/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: "❌ Note not found" });

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching note" });
  }
});

// ✅ API Route - Update Note
app.put(
  "/updateNote/:id",
  upload.array("files", 5),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, youtubeLinks, class: noteClass, subject } = req.body;

      let note = await Note.findById(id);
      if (!note) return res.status(404).json({ error: "❌ Note not found" });

      const filePaths =
        req.files.length > 0 ? req.files.map((file) => file.path) : note.files;

      // Validate and sanitize YouTube links
      const sanitizedLinks = youtubeLinks
        ? youtubeLinks.split(",").filter(isValidYouTubeUrl)
        : [];

      if (youtubeLinks && sanitizedLinks.length !== youtubeLinks.split(",").length) {
        return res.status(400).json({ error: "❌ One or more YouTube links are invalid" });
      }

      // Update fields safely
      if (title) note.title = title;
      if (description) note.description = description;
      if (youtubeLinks) note.youtubeLinks = sanitizedLinks;
      if (noteClass) note.class = noteClass;
      if (subject) note.subject = subject;
      note.files = filePaths;

      await note.save();
      res.status(200).json({ message: "✅ Note updated successfully", data: note });
    } catch (error) {
      console.error("❌ Error updating note:", error);
      res.status(500).json({ error: "❌ Error updating note" });
    }
  }
);

app.get("/notes/:category/random", async (req, res) => {
  try {
    const { category } = req.params;
    const randomNotes = await Note.aggregate([{ $sample: { size: 12 } }]);

    // Add the category to each note before sending
    const withCategory = randomNotes.map((note) => ({ ...note, category }));

    res.status(200).json(withCategory);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching random notes" });
  }
});

// ✅ API Route - Delete Note
app.delete("/deleteNote/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).json({ error: "❌ Note not found" });

    res.status(200).json({ message: "✅ Note deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting note:", error);
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



// Assuming the user email is used as a unique identifier
app.patch("/users/:emailAddress", async (req, res) => {
  try {
    const { emailAddress } = req.params;
    const { fullName, phoneNumber, gender } = req.body;

    // Validate required fields (can add more validation if needed)
    if (!fullName && !phoneNumber && !gender) {
      return res.status(400).json({ error: "❌ At least one editable field is required" });
    }

    // Only allow updates for fullName, phoneNumber, and gender
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (gender) updateData.gender = gender;

    const user = await User.findOneAndUpdate(
      { emailAddress },
      updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "❌ User not found" });
    }

    res.status(200).json({
      message: "✅ User updated successfully",
      data: {
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ error: "❌ Error updating user" });
  }
});


const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  file: String, // Optional file upload
  createdAt: { type: Date, default: Date.now },
});

// Blog model
const Blog = mongoose.model("Blog", blogSchema);

// Multer configuration for file uploads


// Blog upload route
app.post("/blogs/upload", upload.fields([{ name: "image", maxCount: 1 }, { name: "file", maxCount: 1 }]), async (req, res) => {
  const { title, description } = req.body;

  // Validate required fields
  if (!title || !description || !req.files?.image) {
    return res.status(400).json({ error: "Title, description, and image are required" });
  }

  // Prepare file paths for the image and optional file
  const imagePath = req.files.image[0].path;
  const filePath = req.files.file ? req.files.file[0].path : null;

  try {
    const newBlog = new Blog({
      title,
      description,
      image: imagePath,
      file: filePath,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog uploaded successfully", data: newBlog });
  } catch (err) {
    console.error("Error uploading blog:", err);
    res.status(500).json({ error: "Error uploading blog" });
  }
});

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

app.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ error: "Error fetching blog" });
  }
});


// Edit Blog route
app.put("/blogs/:id", upload.fields([{ name: "image", maxCount: 1 }, { name: "file", maxCount: 1 }]), async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Validate required fields
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  // Prepare file paths if updated
  let imagePath = req.body.image;
  let filePath = req.body.file;

  if (req.files?.image) {
    imagePath = req.files.image[0].path;
  }

  if (req.files?.file) {
    filePath = req.files.file[0].path;
  }

  try {
    // Find the blog by ID and update it
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, image: imagePath, file: filePath },
      { new: true } // Return the updated blog
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", data: updatedBlog });
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ error: "Error updating blog" });
  }
});

// Delete Blog route
app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog by ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ error: "Error deleting blog" });
  }
});

// ✅ API Route - Get Notes
app.get("/notes", async (req, res) => {
  try {
    const { class: noteClass, subject } = req.query;

    const filter = {};
    if (noteClass) filter.class = noteClass;
    if (subject) filter.subject = subject;

    const notes = await Note.find(filter);
    res.status(200).json({ message: "✅ Notes fetched successfully", data: notes });
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    res.status(500).json({ error: "❌ Error fetching notes" });
  }
});

// ✅ API Route - Get Note by Class and ID
app.get("/note/:class/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "❌ Note not found" });
    }

    res.status(200).json({ message: "✅ Note fetched successfully", data: note });
  } catch (error) {
    console.error("❌ Error fetching note:", error);
    res.status(500).json({ error: "❌ Error fetching note" });
  }
});

app.get("/serve-pdf/:filename", async (req, res) => {
  try {
    const decodedFilename = decodeURIComponent(req.params.filename);
    const isLoggedIn = req.query.logged === "true";
    const filePath = path.join(__dirname, "uploads", decodedFilename);

    console.log("📄 Serving file:", filePath);
    console.log("👤 Logged in:", isLoggedIn);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "❌ File not found" });
    }

    const pdfBytes = fs.readFileSync(filePath);

    if (!isLoggedIn) {
      console.log("⚙️ Generating limited PDF preview...");
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const totalPages = pdfDoc.getPageCount();
      const newPdf = await PDFDocument.create();

      // Copy only the first 2 pages (or 1 if there’s only one)
      const pagesToCopy = totalPages > 2 ? [0, 1] : [0];
      const copiedPages = await newPdf.copyPages(pdfDoc, pagesToCopy);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newPdfBytes = await newPdf.save();
      res.setHeader("Content-Type", "application/pdf");
      return res.status(200).send(Buffer.from(newPdfBytes));
    }

    // Full PDF for logged-in users
    res.setHeader("Content-Type", "application/pdf");
    res.status(200).sendFile(filePath);
  } catch (err) {
    console.error("❌ Error serving PDF:", err);
    res.status(500).json({ error: "Error serving PDF", details: err.message });
  }
});


app.listen(5000, () => console.log("🚀 Server running on port 5000"));
