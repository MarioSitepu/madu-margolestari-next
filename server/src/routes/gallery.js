import express from 'express';
import multer from 'multer';
import Gallery from '../models/gallery.js';
import { authenticateToken, verifyAdmin } from './auth.js';
import { uploadImageToSupabase, resizeImage } from '../lib/supabase.js';

const router = express.Router();

// Configure multer for file upload (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for gallery images
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

// Get all gallery images (public - only published)
router.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      galleries
    });
  } catch (error) {
    console.error('Error fetching galleries:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Get all gallery images (admin only - includes unpublished)
router.get('/all', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const galleries = await Gallery.find()
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      galleries
    });
  } catch (error) {
    console.error('Error fetching all galleries:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Get single gallery image by ID
router.get('/:id', async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id).select('-__v');
    
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gambar galeri tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      gallery
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Create gallery image (admin only)
router.post('/', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { title, description, imageUrl, order, published } = req.body;
    
    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Judul dan URL gambar wajib diisi'
      });
    }
    
    const gallery = new Gallery({
      title,
      description: description || '',
      imageUrl,
      order: order || 0,
      published: published !== undefined ? published : true
    });
    
    await gallery.save();
    
    res.status(201).json({
      success: true,
      message: 'Gambar galeri berhasil ditambahkan',
      gallery
    });
  } catch (error) {
    console.error('Error creating gallery:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan saat menambahkan gambar galeri'
    });
  }
});

// Update gallery image (admin only)
router.put('/:id', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { title, description, imageUrl, order, published } = req.body;
    
    const gallery = await Gallery.findById(req.params.id);
    
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gambar galeri tidak ditemukan'
      });
    }
    
    if (title) gallery.title = title;
    if (description !== undefined) gallery.description = description;
    if (imageUrl) gallery.imageUrl = imageUrl;
    if (order !== undefined) gallery.order = order;
    if (published !== undefined) gallery.published = published;
    
    await gallery.save();
    
    res.json({
      success: true,
      message: 'Gambar galeri berhasil diupdate',
      gallery
    });
  } catch (error) {
    console.error('Error updating gallery:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan saat mengupdate gambar galeri'
    });
  }
});

// Delete gallery image (admin only)
router.delete('/:id', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gambar galeri tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      message: 'Gambar galeri berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting gallery:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus gambar galeri'
    });
  }
});

// Upload gallery image (admin only)
router.post('/upload-image', authenticateToken, verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File gambar diperlukan'
      });
    }

    // Resize image for gallery (max 1200px width/height, maintain aspect ratio without cropping)
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
      console.error('Error resizing gallery image:', error);
      // Fallback to resizeImage function
      resizedBuffer = await resizeImage(req.file.buffer, 1200, 1200, 85);
    }

    // Generate unique filename
    const fileName = `gallery-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

    // Upload to Supabase (use 'images' bucket or 'gallery' bucket)
    let imageUrl;
    try {
      // Try 'images' bucket first
      try {
        const { url } = await uploadImageToSupabase(resizedBuffer, fileName, 'images');
        imageUrl = url;
      } catch (imagesError) {
        console.log('Bucket "images" tidak tersedia, mencoba bucket "gallery"...');
        // Try 'gallery' bucket as fallback
        const { url } = await uploadImageToSupabase(resizedBuffer, fileName, 'gallery');
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

