import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  backgroundImage: {
    type: String,
    default: ''
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
  published: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// Index for efficient queries
articleSchema.index({ author: 1 });
articleSchema.index({ published: 1 });
articleSchema.index({ createdAt: -1 });

const Article = mongoose.model('Article', articleSchema);

export default Article;


