import express from 'express';
import User from '../models/user.js';
import Article from '../models/article.js';
import { authenticateToken, verifyAdmin } from './auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/users', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password -__v')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Get user statistics (admin only)
router.get('/stats', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalRegularUsers = await User.countDocuments({ role: 'user' });
    const googleUsers = await User.countDocuments({ provider: 'google' });
    const localUsers = await User.countDocuments({ provider: 'local' });
    const totalArticles = await Article.countDocuments();

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalAdmins,
        totalRegularUsers,
        googleUsers,
        localUsers,
        totalArticles
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

export default router;


