import mongoose from 'mongoose';

const shippingSettingsSchema = new mongoose.Schema({
  cost: {
    type: Number,
    default: 0,
    min: 0
  },
  description: {
    type: String,
    default: 'Gratis'
  }
}, {
  timestamps: true
});

// Ensure only one document exists
shippingSettingsSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingSettings = await mongoose.model('ShippingSettings').findOne();
    if (existingSettings) {
      throw new Error('Pengaturan pengiriman sudah ada');
    }
  }
  next();
});

const ShippingSettings = mongoose.model('ShippingSettings', shippingSettingsSchema);

export default ShippingSettings;
