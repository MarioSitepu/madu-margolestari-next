import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

async function connectDB(uri) {
  if (!uri) {
    throw new Error('Variabel lingkungan MONGODB_URI belum diatur');
  }

  // Trim whitespace and validate format
  const trimmedUri = uri.trim();
  
  if (!trimmedUri) {
    throw new Error('Variabel lingkungan MONGODB_URI kosong');
  }

  // Validate that URI starts with correct protocol
  if (!trimmedUri.startsWith('mongodb://') && !trimmedUri.startsWith('mongodb+srv://')) {
    // Show first 20 characters for debugging (without exposing full credentials)
    const preview = trimmedUri.substring(0, 20);
    throw new Error(
      `Format MONGODB_URI tidak valid. Connection string harus dimulai dengan "mongodb://" atau "mongodb+srv://". ` +
      `Nilai saat ini dimulai dengan: "${preview}...". ` +
      `Pastikan MONGODB_URI di environment variables sudah dikonfigurasi dengan benar.`
    );
  }

  mongoose.connection.on('connected', () => {
    console.log('MongoDB terhubung');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Kesalahan koneksi MongoDB:', err);
  });

  await mongoose.connect(trimmedUri, {
    serverSelectionTimeoutMS: 5000
  });
}

export default connectDB;

