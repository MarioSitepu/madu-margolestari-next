import express from 'express';
import multer from 'multer';
import Product from '../models/product.js';
import Review from '../models/review.js';
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
    const { name, description, price, imageUrl, images } = req.body;

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
      imageUrl: imageUrl || '',
      images: images && Array.isArray(images) ? images : []
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
    const { name, description, price, imageUrl, images } = req.body;

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
    if (images !== undefined) product.images = Array.isArray(images) ? images : [];

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

// Get reviews for a product
router.get('/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id })
      .sort({ createdAt: -1 })
      .select('-__v');

    // Calculate average rating
    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    res.json({
      success: true,
      reviews,
      averageRating: parseFloat(avgRating),
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil ulasan'
    });
  }
});

// Create a review (requires authentication)
router.post('/:id/reviews', authenticateToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Validate input
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Rating dan komentar harus diisi'
      });
    }

    if (rating < 0.5 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating harus antara 0.5 dan 5'
      });
    }

    if (comment.length < 5 || comment.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Komentar harus antara 5 dan 500 karakter'
      });
    }

    // Check if product exists
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      productId: req.params.id,
      userId: req.user.id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Anda sudah memberikan ulasan untuk produk ini'
      });
    }

    // Create new review
    const newReview = new Review({
      productId: req.params.id,
      userId: req.user.id,
      userName: req.user.name || req.user.email,
      rating: parseFloat(rating),
      comment: comment.trim()
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: 'Ulasan berhasil ditambahkan',
      review: newReview
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menambahkan ulasan'
    });
  }
});

// Delete a review (owner or admin can delete)
router.delete('/:id/reviews/:reviewId', authenticateToken, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Ulasan tidak ditemukan'
      });
    }

    // Check if user is the review owner OR admin
    const isOwner = review.userId.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki izin untuk menghapus ulasan ini'
      });
    }

    await Review.findByIdAndDelete(req.params.reviewId);

    res.json({
      success: true,
      message: 'Ulasan berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus ulasan'
    });
  }
});

// Get all reviews (admin only)
router.get('/reviews/all/list', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('productId', 'name price imageUrl')
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      reviews,
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil ulasan'
    });
  }
});

// Get highest rated product
router.get('/reviews/highest/rating', async (req, res) => {
  try {
    const reviews = await Review.aggregate([
      {
        $group: {
          _id: '$productId',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      },
      {
        $sort: { averageRating: -1 }
      },
      {
        $limit: 1
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productData'
        }
      }
    ]);

    if (reviews.length === 0) {
      return res.json({
        success: true,
        highestRated: null,
        message: 'Belum ada ulasan'
      });
    }

    const highestRated = {
      productId: reviews[0]._id,
      productName: reviews[0].productData[0]?.name || 'Unknown',
      productImage: reviews[0].productData[0]?.imageUrl || '',
      averageRating: parseFloat(reviews[0].averageRating.toFixed(1)),
      totalReviews: reviews[0].totalReviews
    };

    res.json({
      success: true,
      highestRated
    });
  } catch (error) {
    console.error('Error fetching highest rated product:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil rating tertinggi'
    });
  }
});

// Get featured reviews (for about page)
router.get('/reviews/featured/list', async (req, res) => {
  try {
    const reviews = await Review.find({ isFeatured: true })
      .populate('productId', 'name price imageUrl')
      .sort({ createdAt: -1 })
      .limit(3)
      .select('-__v');

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    console.error('Error fetching featured reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil ulasan unggulan'
    });
  }
});

// Toggle featured status of review (admin only)
router.patch('/admin/reviews/:reviewId/featured', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId).populate('productId', 'name price imageUrl');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Ulasan tidak ditemukan'
      });
    }

    // If trying to feature, check if already have 3 featured reviews
    if (!review.isFeatured) {
      const featuredCount = await Review.countDocuments({ isFeatured: true });
      if (featuredCount >= 3) {
        return res.status(400).json({
          success: false,
          message: 'Maksimal 3 ulasan yang dapat ditampilkan. Silakan hapus ulasan yang sudah ditampilkan terlebih dahulu.'
        });
      }
    }

    review.isFeatured = !review.isFeatured;
    await review.save();

    res.json({
      success: true,
      message: `Ulasan ${review.isFeatured ? 'ditampilkan' : 'disembunyikan'} di halaman About`,
      review
    });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate status'
    });
  }
});

// Delete review (admin only - can delete any review)
router.delete('/admin/reviews/:reviewId', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Ulasan tidak ditemukan'
      });
    }

    await Review.findByIdAndDelete(req.params.reviewId);

    res.json({
      success: true,
      message: 'Ulasan berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus ulasan'
    });
  }
});

// Get total review count
router.get('/reviews/count', async (req, res) => {
  try {
    const count = await Review.countDocuments();
    res.json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Error counting reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghitung ulasan'
    });
  }
});

export default router;
