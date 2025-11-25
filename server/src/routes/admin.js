import express from 'express';
import User from '../models/user.js';
import Article from '../models/article.js';
import ShippingSettings from '../models/shippingSettings.js';
import GeneralSettings from '../models/generalSettings.js';
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

// Update user role (admin only)
router.put('/users/:userId/role', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Validate role
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role tidak valid'
      });
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password -__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    res.json({
      success: true,
      message: `Role user berhasil diubah menjadi ${role}`,
      user
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Delete user (admin only)
router.delete('/users/:userId', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    // Find and delete user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    res.json({
      success: true,
      message: 'User berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Get shipping settings
// Get shipping settings
router.get('/shipping-settings', async (req, res) => {
  try {
    let settings = await ShippingSettings.findOne();
    
    // If no settings exist, create default ones
    if (!settings) {
      settings = new ShippingSettings({
        cost: 0,
        description: 'Gratis'
      });
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    console.error('Error fetching shipping settings:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Update or create shipping settings (admin only)
router.post('/shipping-settings', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { cost, description } = req.body;

    // Validate input
    if (typeof cost !== 'number' || cost < 0) {
      return res.status(400).json({
        success: false,
        message: 'Biaya pengiriman harus berupa angka non-negatif'
      });
    }

    if (typeof description !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Deskripsi pengiriman harus berupa teks'
      });
    }

    let settings = await ShippingSettings.findOne();

    if (settings) {
      // Update existing settings
      settings.cost = cost;
      settings.description = description;
    } else {
      // Create new settings
      settings = new ShippingSettings({
        cost,
        description
      });
    }

    await settings.save();

    res.json({
      success: true,
      message: 'Pengaturan pengiriman berhasil disimpan',
      data: settings
    });
  } catch (error) {
    console.error('Error updating shipping settings:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Get general settings
router.get('/general-settings', async (req, res) => {
  try {
    let settings = await GeneralSettings.findOne();
    
    // If no settings exist, create default ones
    if (!settings) {
      settings = new GeneralSettings({
        operatingYears: 10
      });
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    console.error('Error fetching general settings:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Update or create general settings (admin only)
router.post('/general-settings', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { operatingYears } = req.body;

    // Validate input
    if (typeof operatingYears !== 'number' || operatingYears < 0) {
      return res.status(400).json({
        success: false,
        message: 'Tahun beroperasi harus berupa angka non-negatif'
      });
    }

    let settings = await GeneralSettings.findOne();

    if (settings) {
      // Update existing settings
      settings.operatingYears = operatingYears;
    } else {
      // Create new settings
      settings = new GeneralSettings({
        operatingYears
      });
    }

    await settings.save();

    res.json({
      success: true,
      message: 'Pengaturan umum berhasil disimpan',
      data: settings
    });
  } catch (error) {
    console.error('Error updating general settings:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

export default router;


