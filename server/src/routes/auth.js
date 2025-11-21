import express from 'express';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.js';
import { generateToken, verifyToken } from '../lib/jwt.js';
import { uploadGoogleAvatarToSupabase, uploadImageToSupabase } from '../lib/supabase.js';
import { resizeImage } from '../lib/supabase.js';

const router = express.Router();

// Initialize Google OAuth client
if (!process.env.GOOGLE_CLIENT_ID) {
  console.warn('Peringatan: GOOGLE_CLIENT_ID tidak ditemukan di environment variables');
}
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Admin emails - bisa diubah sesuai kebutuhan
const ADMIN_EMAILS = [
  'admin@madumargolestari.com',
  'admin@example.com',
  // Tambahkan email admin lainnya di sini
  ...(process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim()) : [])
];

// Helper function to check if email is admin email
const isAdminEmail = (email) => {
  if (!email) return false;
  const normalizedEmail = email.toLowerCase().trim();
  return ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === normalizedEmail);
};

// Helper function to ensure user has admin role if email is admin email
const ensureAdminRole = async (user) => {
  if (isAdminEmail(user.email) && user.role !== 'admin') {
    user.role = 'admin';
    await user.save();
    console.log(`User ${user.email} otomatis diberikan role admin`);
  }
  return user;
};

// Regular login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password harus diisi'
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Check if user registered with Google
    if (user.provider === 'google' && !user.password) {
      return res.status(401).json({
        success: false,
        message: 'Akun ini terdaftar dengan Google. Silakan login menggunakan Google.'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Ensure admin role if email is admin email
    await ensureAdminRole(user);
    // Refresh user data
    await user.populate();

    // Generate token
    const token = generateToken(user._id);

    // Return success response
    res.json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        provider: user.provider,
        role: user.role || (isAdminEmail(user.email) ? 'admin' : 'user')
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Google OAuth login route
router.post('/google', async (req, res) => {
  try {
    console.log('Google OAuth login endpoint hit');
    console.log('Request body:', { credential: req.body.credential ? 'present' : 'missing' });
    console.log('Request headers:', { origin: req.headers.origin, 'content-type': req.headers['content-type'] });
    
    const { credential } = req.body;

    if (!credential) {
      console.log('Error: Google credential tidak ditemukan');
      return res.status(400).json({
        success: false,
        message: 'Google credential diperlukan'
      });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({
        success: false,
        message: 'Google OAuth tidak dikonfigurasi. Silakan set GOOGLE_CLIENT_ID di environment variables'
      });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user already exists
    console.log('Mencari user dengan googleId:', googleId, 'atau email:', email);
    let user = await User.findOne({ 
      $or: [
        { googleId },
        { email }
      ]
    });
    console.log('User ditemukan:', user ? 'Ya' : 'Tidak');

    // Upload Google profile picture to Supabase if available
    let avatarUrl = picture; // Default to Google URL
    let isSupabaseUrl = false;
    
    if (picture) {
      try {
        // Use existing user ID if available, otherwise will use temp ID and update later
        const userId = user?._id?.toString() || 'temp-' + Date.now();
        avatarUrl = await uploadGoogleAvatarToSupabase(picture, userId);
        isSupabaseUrl = avatarUrl.includes('supabase');
        if (isSupabaseUrl) {
          console.log('Foto profil berhasil diupload ke Supabase:', avatarUrl);
        }
      } catch (error) {
        console.error('Error uploading avatar to Supabase, menggunakan URL Google:', error);
        // Fallback to Google URL if Supabase upload fails
        avatarUrl = picture;
        isSupabaseUrl = false;
      }
    }

    if (user) {
      console.log('User sudah ada, mengupdate data...');
      // Ensure admin role if email is admin email
      await ensureAdminRole(user);
      
      // Update Google ID if user exists but doesn't have it
      if (!user.googleId && user.email === email) {
        user.googleId = googleId;
        user.provider = 'google';
        user.isVerified = true;
        if (avatarUrl) user.avatar = avatarUrl;
        try {
          await user.save();
          console.log('✅ User berhasil diupdate');
        } catch (saveError) {
          console.error('❌ Error saat menyimpan user:', saveError);
          throw saveError;
        }
      } else if (avatarUrl && (!user.avatar || user.avatar !== avatarUrl)) {
        // Update avatar if it's different (e.g., user changed profile picture on Google)
        // Re-upload with correct user ID if avatar was uploaded with temp ID
        if (avatarUrl.includes('temp-') && user._id) {
          try {
            avatarUrl = await uploadGoogleAvatarToSupabase(picture, user._id.toString());
            isSupabaseUrl = avatarUrl.includes('supabase');
            if (isSupabaseUrl) {
              console.log('Foto profil diupdate dengan user ID yang benar:', avatarUrl);
            }
          } catch (error) {
            console.error('Error re-uploading avatar with user ID:', error);
            // Keep the temp URL if re-upload fails
          }
        }
        user.avatar = avatarUrl;
        await user.save();
      }
    } else {
      console.log('User baru, membuat user baru...');
      // Determine role based on email
      const role = isAdminEmail(email) ? 'admin' : 'user';
      console.log('Role user:', role);
      
      // Create new user first
      user = new User({
        email,
        name,
        googleId,
        avatar: avatarUrl, // Will be temp URL if Supabase upload happened
        provider: 'google',
        isVerified: true,
        role: role
      });
      
      try {
        await user.save();
        console.log('✅ User baru berhasil dibuat dengan ID:', user._id);
      } catch (saveError) {
        console.error('❌ Error saat menyimpan user baru:', saveError);
        console.error('Error details:', {
          message: saveError.message,
          name: saveError.name,
          code: saveError.code
        });
        throw saveError;
      }
      
      // If avatar was uploaded with temp ID or is still Google URL, re-upload with correct user ID
      if (avatarUrl && (avatarUrl.includes('temp-') || (!isSupabaseUrl && picture))) {
        try {
          const newAvatarUrl = await uploadGoogleAvatarToSupabase(picture, user._id.toString());
          if (newAvatarUrl.includes('supabase')) {
            user.avatar = newAvatarUrl;
            await user.save();
            avatarUrl = newAvatarUrl;
            console.log('Foto profil diupdate dengan user ID yang benar:', avatarUrl);
          }
        } catch (error) {
          console.error('Error re-uploading avatar with user ID:', error);
          // Keep existing avatar URL if re-upload fails
        }
      }
    }

    // Generate token
    console.log('Membuat token untuk user ID:', user._id);
    const token = generateToken(user._id);

    // Ensure admin role if email is admin email (refresh user data)
    await ensureAdminRole(user);
    await user.populate();
    
    console.log('✅ Login Google berhasil untuk user:', user.email);

    // Return success response
    res.json({
      success: true,
      message: 'Login dengan Google berhasil',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        provider: user.provider,
        role: user.role || (isAdminEmail(user.email) ? 'admin' : 'user')
      }
    });

  } catch (error) {
    console.error('Google login error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack
    });
    
    // Handle specific Google OAuth errors
    if (error.message && error.message.includes('Token used too early')) {
      return res.status(400).json({
        success: false,
        message: 'Token Google tidak valid atau sudah kadaluarsa'
      });
    }
    
    if (error.message && (error.message.includes('Invalid token signature') || error.message.includes('Wrong number of segments'))) {
      return res.status(400).json({
        success: false,
        message: 'Token Google tidak valid. Pastikan GOOGLE_CLIENT_ID di backend sama dengan di frontend',
        details: process.env.NODE_ENV === 'development' ? {
          error: error.message,
          clientId: process.env.GOOGLE_CLIENT_ID ? 'Sudah di-set' : 'Belum di-set'
        } : undefined
      });
    }

    if (error.message && error.message.includes('Invalid audience')) {
      return res.status(400).json({
        success: false,
        message: 'GOOGLE_CLIENT_ID tidak cocok. Pastikan Client ID di backend sama dengan di frontend',
        details: process.env.NODE_ENV === 'development' ? {
          error: error.message,
          backendClientId: process.env.GOOGLE_CLIENT_ID ? 'Sudah di-set' : 'Belum di-set'
        } : undefined
      });
    }

    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat login dengan Google',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      details: process.env.NODE_ENV === 'development' ? {
        name: error.name,
        code: error.code
      } : undefined
    });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Semua field harus diisi'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email sudah terdaftar'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Determine role based on email
    const role = isAdminEmail(email) ? 'admin' : 'user';

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      provider: 'local',
      role: role
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        provider: user.provider,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token akses diperlukan'
    });
  }

  try {
    // Verify token menggunakan utility function
    const decoded = verifyToken(token);

    // Find user dari database
    User.findById(decoded.userId)
      .select('-password')
      .then(user => {
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User tidak ditemukan'
          });
        }

        req.user = user;
        next();
      })
      .catch(error => {
        console.error('Error finding user:', error);
        return res.status(500).json({
          success: false,
          message: 'Terjadi kesalahan server'
        });
      });
  } catch (error) {
    // Handle specific JWT errors
    if (error.message === 'Token sudah kadaluarsa') {
      return res.status(401).json({
        success: false,
        message: 'Token sudah kadaluarsa. Silakan login kembali',
        code: 'TOKEN_EXPIRED'
      });
    }

    if (error.message === 'Token tidak valid') {
      return res.status(403).json({
        success: false,
        message: 'Token tidak valid',
        code: 'TOKEN_INVALID'
      });
    }

    return res.status(403).json({
      success: false,
      message: 'Token tidak valid',
      code: 'TOKEN_ERROR'
    });
  }
};

// Middleware to verify admin role
export const verifyAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Autentikasi diperlukan'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak. Hanya admin yang dapat mengakses endpoint ini.'
    });
  }

  next();
};

// Admin login route
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password harus diisi'
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Akses ditolak. Hanya admin yang dapat login di sini.'
      });
    }

    // Check if user registered with Google
    if (user.provider === 'google' && !user.password) {
      return res.status(401).json({
        success: false,
        message: 'Akun admin ini terdaftar dengan Google. Silakan hubungi administrator.'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Return success response
    res.json({
      success: true,
      message: 'Login admin berhasil',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        provider: user.provider,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // Ensure admin role if email is admin email
    await ensureAdminRole(req.user);
    // Refresh user data
    await req.user.populate();

  res.json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar,
      provider: req.user.provider,
      isVerified: req.user.isVerified,
        role: req.user.role || (isAdminEmail(req.user.email) ? 'admin' : 'user')
    }
  });
  } catch (error) {
    console.error('Error in /me route:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Configure multer for file upload (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
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

// Update user avatar
router.post('/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File gambar diperlukan'
      });
    }

    const user = req.user;

    // Resize image
    const resizedBuffer = await resizeImage(req.file.buffer, 400, 400, 85);

    // Generate unique filename
    const fileName = `user-${user._id}-${Date.now()}.jpg`;

    // Upload to Supabase
    let avatarUrl;
    try {
      const { url } = await uploadImageToSupabase(resizedBuffer, fileName, 'avatars');
      avatarUrl = url;
    } catch (supabaseError) {
      console.error('Error uploading to Supabase:', supabaseError);
      return res.status(500).json({
        success: false,
        message: 'Gagal mengupload foto profil. Pastikan Supabase sudah dikonfigurasi.'
      });
    }

    // Update user avatar in database
    user.avatar = avatarUrl;
    await user.save();

    res.json({
      success: true,
      message: 'Foto profil berhasil diupdate',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        provider: user.provider,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan saat mengupdate foto profil'
    });
  }
});

// Update username
router.put('/username', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name || typeof name !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Nama harus diisi'
      });
    }

    // Trim and validate name length
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Nama harus minimal 2 karakter'
      });
    }

    if (trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Nama maksimal 100 karakter'
      });
    }

    // Update user name
    const user = req.user;
    user.name = trimmedName;
    await user.save();

    // Ensure admin role if email is admin email
    await ensureAdminRole(user);

    res.json({
      success: true,
      message: 'Username berhasil diupdate',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        provider: user.provider,
        isVerified: user.isVerified,
        role: user.role || (isAdminEmail(user.email) ? 'admin' : 'user')
      }
    });

  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan saat mengupdate username'
    });
  }
});

export default router;