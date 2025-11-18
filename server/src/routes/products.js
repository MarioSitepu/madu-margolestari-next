import express from 'express';
import multer from 'multer';
import Product from '../models/product.js';
import { authenticateToken, verifyAdmin } from './auth.js';
import { uploadImageToSupabase, resizeImage } from '../lib/supabase.js';

const router = express.Router();

// Configure multer for file upload (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for product images
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

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Get all products (admin only - includes all)
router.get('/all', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .select('-__v');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Create product (admin only)
router.post('/', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Nama dan harga produk harus diisi'
      });
    }

    const product = new Product({
      name,
      description: description || '',
      price: Number(price),
      imageUrl: imageUrl || ''
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Produk berhasil dibuat',
      product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Update product (admin only)
router.put('/:id', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }

    if (name) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (imageUrl !== undefined) product.imageUrl = imageUrl;

    await product.save();

    res.json({
      success: true,
      message: 'Produk berhasil diupdate',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Produk berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Upload product image (admin only)
router.post('/upload-image', authenticateToken, verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    console.log('Upload request received:', {
      hasFile: !!req.file,
      fileSize: req.file?.size,
      mimetype: req.file?.mimetype,
      fieldname: req.file?.fieldname
    });

    if (!req.file) {
      console.error('No file received in request');
      return res.status(400).json({
        success: false,
        message: 'File gambar diperlukan. Pastikan file dikirim dengan field name "image"'
      });
    }

    // Resize image for product (max 1200px width/height, maintain aspect ratio without cropping)
    // Preserve original format (PNG stays PNG, JPG stays JPG)
    const sharp = (await import('sharp')).default;
    let resizedBuffer;
    let fileExtension = 'png'; // Default to PNG to preserve transparency
    let contentType = 'image/png';
    
    try {
      const metadata = await sharp(req.file.buffer).metadata();
      const isPng = metadata.format === 'png' || req.file.mimetype === 'image/png';
      
      // Determine file extension and content type based on original format
      if (isPng) {
        fileExtension = 'png';
        contentType = 'image/png';
        // Resize PNG while preserving transparency
        resizedBuffer = await sharp(req.file.buffer)
          .resize(1200, 1200, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .png({
            quality: 90,
            compressionLevel: 9
          })
          .toBuffer();
      } else {
        // For JPG and other formats, convert to JPG
        fileExtension = 'jpg';
        contentType = 'image/jpeg';
        resizedBuffer = await sharp(req.file.buffer)
          .resize(1200, 1200, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({
            quality: 85,
            mozjpeg: true
          })
          .toBuffer();
      }
    } catch (error) {
      console.error('Error resizing product image:', error);
      // Fallback: try to preserve original format
      if (req.file.mimetype === 'image/png') {
        fileExtension = 'png';
        contentType = 'image/png';
        resizedBuffer = req.file.buffer; // Use original if resize fails
      } else {
        fileExtension = 'jpg';
        contentType = 'image/jpeg';
        resizedBuffer = await resizeImage(req.file.buffer, 1200, 1200, 85);
      }
    }

    // Generate unique filename with correct extension
    const fileName = `product-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

    // Upload to Supabase - use 'products' bucket (create if doesn't exist)
    let imageUrl;
    try {
      // Try 'products' bucket first (preferred for product images)
      try {
        const result = await uploadImageToSupabase(resizedBuffer, fileName, 'products', contentType);
        imageUrl = result.url;
      } catch (productsError) {
        console.log('Bucket "products" tidak tersedia, mencoba bucket "images"...');
        // Fallback to 'images' bucket
        const result = await uploadImageToSupabase(resizedBuffer, fileName, 'images', contentType);
        imageUrl = result.url;
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
    console.error('Error uploading product image:', error);
    res.status(500).json({
      success: false,
      message: (error && error.message) ? error.message : 'Terjadi kesalahan saat mengupload gambar produk'
    });
  }
});

export default router;
