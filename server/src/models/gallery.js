import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
gallerySchema.index({ published: 1 });
gallerySchema.index({ order: 1 });

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;

