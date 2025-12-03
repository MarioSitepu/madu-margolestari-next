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

  // Connection options with increased timeouts and retry logic
  const connectionOptions = {
    serverSelectionTimeoutMS: 30000, // 30 seconds - increased for slow networks
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    maxPoolSize: 10,
    retryWrites: true,
    w: 'majority',
    // Add DNS resolution options
    family: 4, // Force IPv4 (sometimes IPv6 causes issues)
  };

  // Retry connection logic
  const maxRetries = 3;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      console.log(`🔄 Mencoba menghubungkan ke MongoDB... (Attempt ${retryCount + 1}/${maxRetries})`);
      await mongoose.connect(trimmedUri, connectionOptions);
      console.log('✅ Koneksi MongoDB berhasil dibuat');
      return; // Success, exit function
    } catch (error) {
      retryCount++;
      console.error(`❌ Gagal menghubungkan ke MongoDB (Attempt ${retryCount}/${maxRetries}):`, error.message);
      
      if (retryCount >= maxRetries) {
        console.error('\n💡 Troubleshooting Tips:');
        console.error('1. Periksa koneksi internet Anda');
        console.error('2. Pastikan IP address Anda di-whitelist di MongoDB Atlas');
        console.error('3. Coba gunakan VPN jika DNS timeout');
        console.error('4. Periksa firewall atau proxy settings');
        console.error('5. Pastikan MONGODB_URI sudah benar');
        throw error;
      }
      
      // Wait before retry (exponential backoff)
      const waitTime = Math.min(1000 * Math.pow(2, retryCount - 1), 5000);
      console.log(`⏳ Menunggu ${waitTime}ms sebelum retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

export default connectDB;

