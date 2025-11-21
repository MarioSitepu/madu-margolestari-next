import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
    index: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  authorAvatar: {
    type: String,
    default: null
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index for efficient queries
commentSchema.index({ articleId: 1, createdAt: -1 });
commentSchema.index({ author: 1 });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;




