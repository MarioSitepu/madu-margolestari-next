import express from 'express';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.js';
import { generateToken, verifyToken } from '../lib/jwt.js';

const router = express.Router();

// Initialize Google OAuth client
if (!process.env.GOOGLE_CLIENT_ID) {
  console.warn('Peringatan: GOOGLE_CLIENT_ID tidak ditemukan di environment variables');
}
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
        provider: user.provider
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
    const { credential } = req.body;

    if (!credential) {
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
    let user = await User.findOne({ 
      $or: [
        { googleId },
        { email }
      ]
    });

    if (user) {
      // Update Google ID if user exists but doesn't have it
      if (!user.googleId && user.email === email) {
        user.googleId = googleId;
        user.provider = 'google';
        user.isVerified = true;
        if (picture) user.avatar = picture;
        await user.save();
      }
    } else {
      // Create new user
      user = new User({
        email,
        name,
        googleId,
        avatar: picture,
        provider: 'google',
        isVerified: true
      });
      await user.save();
    }

    // Generate token
    const token = generateToken(user._id);

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
        provider: user.provider
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

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      provider: 'local'
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
        provider: user.provider
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

// Get current user profile
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar,
      provider: req.user.provider,
      isVerified: req.user.isVerified
    }
  });
});

export default router;