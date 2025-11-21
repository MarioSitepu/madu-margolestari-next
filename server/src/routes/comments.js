import express from 'express';
import Comment from '../models/comment.js';
import Article from '../models/article.js';
import { authenticateToken, verifyAdmin } from './auth.js';

const router = express.Router();

// Get comments for an article
router.get('/article/:articleId', async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId })
      .sort({ createdAt: -1 })
      .populate('author', 'name email avatar')
      .select('-__v');
    
    res.json({
      success: true,
      comments
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Create comment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { articleId, content } = req.body;

    if (!articleId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Article ID dan content harus diisi'
      });
    }

    // Check if article exists
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artikel tidak ditemukan'
      });
    }

    const comment = new Comment({
      articleId,
      author: req.user._id,
      authorName: req.user.name,
      authorAvatar: req.user.avatar || null,
      content: content.trim()
    });

    await comment.save();

    res.status(201).json({
      success: true,
      message: 'Komentar berhasil ditambahkan',
      comment
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Like/Unlike comment
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Komentar tidak ditemukan'
      });
    }

    const userId = req.user._id;
    const isLiked = comment.likedBy.includes(userId);

    if (isLiked) {
      comment.likedBy = comment.likedBy.filter(id => id.toString() !== userId.toString());
      comment.likes = Math.max(0, comment.likes - 1);
    } else {
      comment.likedBy.push(userId);
      comment.likes += 1;
    }

    await comment.save();

    res.json({
      success: true,
      message: isLiked ? 'Like dihapus' : 'Like ditambahkan',
      comment
    });
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Delete comment (admin only)
router.delete('/:id', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Komentar tidak ditemukan'
      });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Komentar berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Get all comments (admin only)
router.get('/', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const comments = await Comment.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email avatar')
      .populate('articleId', 'title')
      .select('-__v');
    
    res.json({
      success: true,
      comments
    });
  } catch (error) {
    console.error('Error fetching all comments:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

export default router;




