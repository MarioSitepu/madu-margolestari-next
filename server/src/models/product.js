import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    imageUrl: {
      type: String,
      default: ''
    },
    tags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;

