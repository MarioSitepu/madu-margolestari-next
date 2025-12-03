import mongoose from 'mongoose';

const generalSettingsSchema = new mongoose.Schema({
  operatingYears: {
    type: Number,
    default: 10,
    min: 0
  },
  whatsappNumber: {
    type: String,
    default: '6287888888888',
    trim: true
  },
  whatsappMessageTemplate: {
    type: String,
    default: `Halo, saya ingin melakukan pemesanan madu:

PRODUK YANG DIPESAN:
{productList}

RINGKASAN PESANAN:
Subtotal: Rp {subtotal}
Pengiriman: Rp {shipping}
Total: Rp {total}

Terima kasih!`,
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
