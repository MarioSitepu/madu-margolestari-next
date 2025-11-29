import mongoose from 'mongoose';

const generalSettingsSchema = new mongoose.Schema({
  operatingYears: {
    type: Number,
    default: 10,
    min: 0
  },
  whatsappNumber: {
    type: String,
    default: '62812345678', // Format: country code + number (Indonesia example)
    trim: true
  }
}, {
  timestamps: true
});

// Ensure only one document exists
generalSettingsSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingSettings = await mongoose.model('GeneralSettings').findOne();
    if (existingSettings) {
      throw new Error('Pengaturan umum sudah ada');
    }
  }
  next();
});

const GeneralSettings = mongoose.model('GeneralSettings', generalSettingsSchema);

export default GeneralSettings;
