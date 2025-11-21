import express from 'express';
import multer from 'multer';
import Article from '../models/article.js';
import { authenticateToken, verifyAdmin } from './auth.js';
import { uploadImageToSupabase, resizeImage } from '../lib/supabase.js';

const router = express.Router();

// Configure multer for file upload (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for article images
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File harus berupa gambar'), false);
    }
  }
});

// Get all articles (public)
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find({ published: true })
      .sort({ createdAt: -1 })
      .populate('author', 'name email avatar')
      .select('-__v');
    
    res.json({
      success: true,
      articles
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Get all articles (admin only - includes unpublished)
router.get('/all', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email avatar')
      .select('-__v');
    
    res.json({
      success: true,
      articles
    });
  } catch (error) {
    console.error('Error fetching all articles:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Get single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name email avatar')
      .select('-__v');
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artikel tidak ditemukan'
      });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.json({
      success: true,
      article
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Create article (admin only)
router.post('/', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { title, description, content, image, backgroundImage, published, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title dan description harus diisi'
      });
    }

    const article = new Article({
      title,
      description,
      content: content || '',
      image: image || '',
      backgroundImage: backgroundImage || '',
      author: req.user._id,
      authorName: req.user.name,
      published: published !== undefined ? published : true,
      tags: tags || []
    });

    await article.save();

    res.status(201).json({
      success: true,
      message: 'Artikel berhasil dibuat',
      article
    });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Update article (admin only)
router.put('/:id', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { title, description, content, image, backgroundImage, published, tags } = req.body;

    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artikel tidak ditemukan'
      });
    }

    if (title) article.title = title;
    if (description) article.description = description;
    if (content !== undefined) article.content = content;
    if (image !== undefined) article.image = image;
    if (backgroundImage !== undefined) article.backgroundImage = backgroundImage;
    if (published !== undefined) article.published = published;
    if (tags !== undefined) article.tags = tags;

    await article.save();

    res.json({
      success: true,
      message: 'Artikel berhasil diupdate',
      article
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Delete article (admin only)
router.delete('/:id', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artikel tidak ditemukan'
      });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Artikel berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Upload article image (admin only)
router.post('/upload-image', authenticateToken, verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File gambar diperlukan'
      });
    }

    // Resize image for article (max 1200px width/height, maintain aspect ratio without cropping)
    // Use sharp directly for better control
    const sharp = (await import('sharp')).default;
    let resizedBuffer;
    try {
      const metadata = await sharp(req.file.buffer).metadata();
      // Resize with 'inside' fit to maintain aspect ratio without cropping
      resizedBuffer = await sharp(req.file.buffer)
        .resize(1200, 1200, {
          fit: 'inside', // Fit inside dimensions, maintain aspect ratio
          withoutEnlargement: true // Don't enlarge if image is smaller
        })
        .jpeg({ 
          quality: 85,
          mozjpeg: true
        })
        .toBuffer();
    } catch (error) {
      console.error('Error resizing article image:', error);
      // Fallback to resizeImage function
      resizedBuffer = await resizeImage(req.file.buffer, 1200, 1200, 85);
    }

    // Generate unique filename
    const fileName = `article-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

    // Upload to Supabase (use 'images' bucket or 'articles' bucket)
    let imageUrl;
    try {
      // Try 'images' bucket first
      try {
        const { url } = await uploadImageToSupabase(resizedBuffer, fileName, 'images');
        imageUrl = url;
      } catch (imagesError) {
        console.log('Bucket "images" tidak tersedia, mencoba bucket "articles"...');
        // Try 'articles' bucket as fallback
        const { url } = await uploadImageToSupabase(resizedBuffer, fileName, 'articles');
        imageUrl = url;
      }
    } catch (supabaseError) {
      console.error('Error uploading to Supabase:', supabaseError);
      return res.status(500).json({
        success: false,
        message: `Gagal mengupload gambar ke Supabase: ${supabaseError.message}. Pastikan SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY sudah dikonfigurasi di file .env server.`
      });
    }

    res.json({
      success: true,
      message: 'Gambar berhasil diupload',
      imageUrl
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan saat mengupload gambar'
    });
  }
});

export default router;


