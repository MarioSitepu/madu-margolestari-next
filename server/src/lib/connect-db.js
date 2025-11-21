import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

async function connectDB(uri) {
  if (!uri) {
    throw new Error('Variabel lingkungan MONGODB_URI belum diatur');
  }

  // Trim whitespace and validate format
  let trimmedUri = uri.trim();
  
  if (!trimmedUri) {
    throw new Error('Variabel lingkungan MONGODB_URI kosong');
  }

  // Handle case where someone accidentally included "MONGODB_URI=" in the value
  // This can happen when copying from .env file
  if (trimmedUri.startsWith('MONGODB_URI=')) {
    trimmedUri = trimmedUri.substring('MONGODB_URI='.length).trim();
  }

  // Validate that URI starts with correct protocol
  if (!trimmedUri.startsWith('mongodb://') && !trimmedUri.startsWith('mongodb+srv://')) {
    // Show first 20 characters for debugging (without exposing full credentials)
    const preview = trimmedUri.substring(0, 20);
    throw new Error(
      `Format MONGODB_URI tidak valid. Connection string harus dimulai dengan "mongodb://" atau "mongodb+srv://". ` +
      `Nilai saat ini dimulai dengan: "${preview}...". ` +
      `Pastikan MONGODB_URI di environment variables sudah dikonfigurasi dengan benar. ` +
      `Jika Anda menyalin dari file .env, pastikan hanya menyalin nilainya saja (tanpa "MONGODB_URI=").`
    );
  }

  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB terhubung dengan sukses');
    console.log('Database:', mongoose.connection.db?.databaseName || 'unknown');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Kesalahan koneksi MongoDB:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB terputus');
  });

  try {
    await mongoose.connect(trimmedUri, {
      serverSelectionTimeoutMS: 10000, // Increase timeout for production
      socketTimeoutMS: 45000,
    });
    console.log('✅ Koneksi MongoDB berhasil dibuat');
  } catch (error) {
    console.error('❌ Gagal menghubungkan ke MongoDB:', error.message);
    throw error;
  }
}

export default connectDB;

