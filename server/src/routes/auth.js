import express from 'express';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
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

// Configure Nodemailer
let transporter;

// Initialize email transporter
const initializeTransporter = async () => {
  if (process.env.EMAIL_SERVICE === 'ethereal') {
    // Generate Ethereal test account automatically
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('✓ Ethereal Email test account created');
      console.log(`📧 Test email account: ${testAccount.user}`);
      console.log(`📧 Preview URL format: https://ethereal.email/messages`);
    } catch (error) {
      console.error('Failed to create Ethereal account:', error.message);
      transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix'
      });
    }
  } else if (process.env.EMAIL_SMTP_HOST && process.env.EMAIL_SMTP_PORT) {
    // Use custom SMTP
    const auth = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD ? {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    } : undefined;

    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST,
      port: parseInt(process.env.EMAIL_SMTP_PORT),
      secure: process.env.EMAIL_SMTP_PORT === '465',
      ...(auth && { auth })
    });
    console.log(`✓ Using custom SMTP: ${process.env.EMAIL_SERVICE || 'SMTP'}`);
  } else if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    // Use service-based (Gmail, etc)
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    console.log(`✓ Using ${process.env.EMAIL_SERVICE || 'Gmail'} email service`);
  } else {
    console.warn('⚠️ Email service not configured - using dummy transporter');
    transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix'
    });
  }

  // Verify connection
  transporter.verify((error) => {
    if (error) {
      console.warn('⚠️ Email configuration error:', error.message);
    } else {
      console.log('✓ Email service ready');
    }
  });
};

// Initialize on startup
await initializeTransporter();

// Admin emails - dari environment variable atau default
// Format: email1@example.com,email2@example.com (comma-separated)
const ADMIN_EMAILS = process.env.ADMIN_EMAILS 
  ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim()).filter(e => e)
  : ['admin@marles.com', 'admin@madumargolestari.com'];

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
    console.log(`Login user ${user.email}, role: ${user.role}, isAdmin: ${isAdminEmail(user.email)}`);
    
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
    
    // Handle validation errors (e.g., missing fields)
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Data user tidak valid',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
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

    // Handle database errors
    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      console.error('Database error during Google login:', error);
      return res.status(500).json({
        success: false,
        message: 'Error database. Silakan coba lagi.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    // Default error response
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

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email harus diisi'
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Return 404 with clear message for frontend to differentiate
      return res.status(404).json({
        success: false,
        message: 'Email tidak terdaftar di sistem kami. Silakan cek kembali email Anda atau daftar akun baru.',
        code: 'EMAIL_NOT_FOUND'
      });
    }

    // Check if user logged in via Google
    if (user.provider === 'google') {
      return res.status(403).json({
        success: false,
        message: 'Akun Anda terhubung dengan Google. Silakan gunakan fitur "Lupa Password" dari Google untuk mengubah password.',
        code: 'GOOGLE_ACCOUNT_NO_RESET'
      });
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = generateToken(user._id, '1h');
    
    // Save reset token to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // Create reset link
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

    // Send email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: 'Reset Password - Madu Margo Lestari',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #00b8a9 0%, #009c91 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                  .header h1 { margin: 0; font-size: 28px; }
                  .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                  .message { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00b8a9; }
                  .button-container { text-align: center; margin: 30px 0; }
                  .reset-button { 
                    display: inline-block;
                    background: linear-gradient(135deg, #00b8a9 0%, #009c91 100%);
                    color: white;
                    padding: 15px 40px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    transition: opacity 0.3s;
                  }
                  .reset-button:hover { opacity: 0.9; }
                  .link { 
                    display: block;
                    background: white;
                    padding: 15px;
                    margin: 15px 0;
                    border-radius: 5px;
                    word-break: break-all;
                    font-size: 12px;
                    border: 1px solid #ddd;
                  }
                  .footer { 
                    background: #f0f0f0;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                    border-radius: 0 0 8px 8px;
                  }
                  .warning { 
                    background: #fff3cd;
                    border: 1px solid #ffc107;
                    color: #856404;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-size: 14px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Madu Margo Lestari</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Reset Password</p>
                  </div>
                  
                  <div class="content">
                    <div class="message">
                      <h2 style="margin-top: 0; color: #00b8a9;">Halo ${user.name},</h2>
                      <p>Kami menerima permintaan untuk mengatur ulang password akun Anda. Klik tombol di bawah untuk melanjutkan:</p>
                    </div>

                    <div class="button-container">
                      <a href="${resetLink}" class="reset-button">Reset Password Saya</a>
                    </div>

                    <p style="text-align: center; color: #666;">atau salin link di bawah:</p>
                    <div class="link">${resetLink}</div>

                    <div class="warning">
                      <strong>⚠️ Penting:</strong> Link ini hanya berlaku selama 1 jam. Jika Anda tidak meminta reset password, abaikan email ini dan akun Anda akan tetap aman.
                    </div>

                    <p style="margin-top: 30px; font-size: 14px; color: #666;">
                      Jika Anda mengalami masalah, hubungi tim dukungan kami di 
                      <a href="mailto:support@madumargolestari.com">support@madumargolestari.com</a>
                    </p>
                  </div>

                  <div class="footer">
                    <p>© 2024 Madu Margo Lestari. Semua hak dilindungi.</p>
                    <p>Email ini dikirim karena ada permintaan reset password untuk akun Anda.</p>
                  </div>
                </div>
              </body>
            </html>
          `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✓ Reset password email sent to ${user.email}`);
        
        // Show Ethereal preview URL if using test account
        if (process.env.EMAIL_SERVICE === 'ethereal') {
          console.log(`📧 Preview: ${nodemailer.getTestMessageUrl(info)}`);
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError.message);
        // Don't fail the request if email sending fails, token is still saved
      }
    } else {
      console.warn('⚠️ Email not configured. Reset token generated but email not sent.');
      console.log(`Reset link for ${user.email}: ${resetLink}`);
    }

    res.json({
      success: true,
      message: 'Jika email terdaftar, kami akan mengirimkan link reset password'
    });

  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan saat memproses permintaan reset password'
    });
  }
});

// Verify reset token route
router.post('/verify-reset-token', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token tidak ditemukan'
      });
    }

    // Find user with valid reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid atau sudah kadaluarsa'
      });
    }

    res.json({
      success: true,
      message: 'Token valid',
      email: user.email
    });

  } catch (error) {
    console.error('Error verifying reset token:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan saat memverifikasi token'
    });
  }
});

// Reset password route
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    // Validate input
    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token, password, dan konfirmasi password harus diisi'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password dan konfirmasi password tidak cocok'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password harus minimal 6 karakter'
      });
    }

    // Find user with valid reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid atau sudah kadaluarsa'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    // Send confirmation email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: 'Password Reset Berhasil - Madu Margo Lestari',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #00b8a9 0%, #009c91 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                  .header h1 { margin: 0; font-size: 28px; }
                  .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                  .message { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00b8a9; }
                  .button-container { text-align: center; margin: 30px 0; }
                  .login-button { 
                    display: inline-block;
                    background: linear-gradient(135deg, #00b8a9 0%, #009c91 100%);
                    color: white;
                    padding: 15px 40px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                  }
                  .footer { 
                    background: #f0f0f0;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                  }
                  .success-badge { 
                    display: inline-block;
                    background: #4caf50;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 20px;
                    margin: 10px 0;
                    font-weight: bold;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Madu Margo Lestari</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Password Reset Berhasil</p>
                  </div>
                  
                  <div class="content">
                    <div class="message">
                      <h2 style="margin-top: 0; color: #00b8a9;">Halo ${user.name},</h2>
                      <p style="text-align: center;">
                        <span class="success-badge">✓ Password berhasil diubah</span>
                      </p>
                      <p>Password akun Anda telah berhasil diubah. Anda sekarang dapat login dengan password baru Anda.</p>
                    </div>

                    <div class="button-container">
                      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" class="login-button">Masuk ke Akun Saya</a>
                    </div>

                    <p style="margin-top: 30px; font-size: 14px; color: #666;">
                      Jika Anda tidak melakukan perubahan ini, segera hubungi tim dukungan kami di 
                      <a href="mailto:support@madumargolestari.com">support@madumargolestari.com</a>
                    </p>
                  </div>

                  <div class="footer">
                    <p>© 2024 Madu Margo Lestari. Semua hak dilindungi.</p>
                  </div>
                </div>
              </body>
            </html>
          `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✓ Password reset confirmation email sent to ${user.email}`);
        
        // Show Ethereal preview URL if using test account
        if (process.env.EMAIL_SERVICE === 'ethereal') {
          console.log(`📧 Preview: ${nodemailer.getTestMessageUrl(info)}`);
        }
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError.message);
      }
    }

    res.json({
      success: true,
      message: 'Password berhasil diubah. Silakan login dengan password baru Anda.'
    });

  } catch (error) {
    console.error('Error in reset password:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan saat mengubah password'
    });
  }
});

export default router;