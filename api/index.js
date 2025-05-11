const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://malikwanigasinghe00:A5QWKTUvJ5C1PLra@cluster0.mpvq5q0.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Photo Schema
const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, { 
  timestamps: true 
});

const Photo = mongoose.model('Photo', photoSchema);

// Routes

// Get all photos
app.get('/api/photos', async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: photos
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch photos'
    });
  }
});

// Get a single photo by ID
app.get('/api/photos/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    
    if (!photo) {
      return res.status(404).json({
        success: false,
        error: 'Photo not found'
      });
    }
    
    res.json({
      success: true,
      data: photo
    });
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch photo'
    });
  }
});

// Create a new photo
app.post('/api/photos', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      console.error('No image uploaded:', req.body, req.files);
      return res.status(400).json({
        success: false,
        error: 'No image uploaded'
      });
    }

    // Get server URL dynamically
    const protocol = req.protocol;
    const host = req.get('host');
    const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    
    // Parse tags from JSON string if provided
    let tags = [];
    if (req.body.tags) {
      try {
        tags = JSON.parse(req.body.tags);
      } catch (err) {
        console.error('Error parsing tags:', err);
      }
    }

    const photo = new Photo({
      title: req.body.title,
      description: req.body.description || '',
      imageUrl,
      tags
    });

    await photo.save();
    
    res.status(201).json({
      success: true,
      data: photo
    });
  } catch (error) {
    console.error('Error creating photo:', error, req.body, req.file);
    res.status(500).json({
      success: false,
      error: 'Failed to create photo'
    });
  }
});

// Update a photo
app.put('/api/photos/:id', upload.single('image'), async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    
    if (!photo) {
      return res.status(404).json({
        success: false,
        error: 'Photo not found'
      });
    }
    
    // Update photo fields
    photo.title = req.body.title;
    photo.description = req.body.description || '';
    
    // Parse tags from JSON string if provided
    if (req.body.tags) {
      try {
        photo.tags = JSON.parse(req.body.tags);
      } catch (err) {
        console.error('Error parsing tags:', err);
      }
    }
    
    // Update image if a new one was uploaded
    if (req.file) {
      // Get server URL dynamically
      const protocol = req.protocol;
      const host = req.get('host');
      const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
      
      // Delete old image file if it exists
      if (photo.imageUrl) {
        const oldImagePath = photo.imageUrl.split('/uploads/')[1];
        if (oldImagePath) {
          const filePath = path.join(uploadsDir, oldImagePath);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }
      
      photo.imageUrl = imageUrl;
    }
    
    await photo.save();
    
    res.json({
      success: true,
      data: photo
    });
  } catch (error) {
    console.error('Error updating photo:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update photo'
    });
  }
});

// Delete a photo
app.delete('/api/photos/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    
    if (!photo) {
      return res.status(404).json({
        success: false,
        error: 'Photo not found'
      });
    }
    
    // Delete the image file
    if (photo.imageUrl) {
      const imagePath = photo.imageUrl.split('/uploads/')[1];
      if (imagePath) {
        const filePath = path.join(uploadsDir, imagePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }
    
    await photo.deleteOne();
    
    res.json({
      success: true,
      data: true
    });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete photo'
    });
  }
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Something went wrong!'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;