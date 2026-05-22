const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for testing/development
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ideavault';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('💡 Tip: Make sure your local MongoDB instance is running or supply a MONGO_URI in a .env file.');
  });

// Schema Definitions
const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  detailedDescription: { type: String },
  category: { type: String, required: true, enum: ['Tech', 'Health', 'AI', 'Education', 'Finance'] },
  tags: { type: mongoose.Schema.Types.Mixed }, // Handles both String arrays or comma-separated strings
  imageUrl: { type: String },
  estimatedBudget: { type: String },
  targetAudience: { type: String },
  problemStatement: { type: String },
  proposedSolution: { type: String },
  upvotes: { type: Number, default: 0 },
  comments: [commentSchema]
}, { timestamps: true });

const Idea = mongoose.model('Idea', ideaSchema);

// --- ENDPOINTS ---

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'IdeaVault API is fully operational 🚀' });
});

// 1. GET ALL IDEAS
app.get('/idea', async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ideas', details: err.message });
  }
});

// 2. GET SINGLE IDEA BY ID
app.get('/idea/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const idea = await Idea.findById(id);
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    res.json(idea);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch idea details', details: err.message });
  }
});

// 3. POST A NEW IDEA
app.post('/idea', async (req, res) => {
  try {
    const ideaData = req.body;
    
    // Auto-sanitize upvotes/comments if missing
    if (ideaData.upvotes === undefined) ideaData.upvotes = 0;
    if (ideaData.comments === undefined) ideaData.comments = [];

    const newIdea = new Idea(ideaData);
    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (err) {
    res.status(400).json({ error: 'Failed to submit idea', details: err.message });
  }
});

// 4. PATCH GENERAL UPDATE (supports edit)
app.patch('/idea/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const updatedIdea = await Idea.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedIdea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    res.json(updatedIdea);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update idea', details: err.message });
  }
});

// 5. PATCH UPVOTE (Atomic Increment)
app.patch('/idea/:id/upvote', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const updatedIdea = await Idea.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!updatedIdea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    res.json(updatedIdea);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process upvote', details: err.message });
  }
});

// 6. POST COMMENT (Add feedback to list)
app.post('/idea/:id/comment', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    if (!username || !text) {
      return res.status(400).json({ error: 'Username and comment text are required' });
    }

    const comment = { username, text, createdAt: new Date() };

    const updatedIdea = await Idea.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      { new: true }
    );

    if (!updatedIdea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    res.json(updatedIdea);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post comment', details: err.message });
  }
});

// 7. DELETE AN IDEA BY ID
app.delete('/idea/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const deletedIdea = await Idea.findByIdAndDelete(id);
    if (!deletedIdea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    res.json({ message: 'Idea deleted successfully', deletedIdea });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete idea', details: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 IdeaVault Backend Server is running on port ${PORT}`);
  console.log(`📡 Local url: http://localhost:${PORT}`);
});
