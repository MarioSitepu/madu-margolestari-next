import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

async function connectDB(uri) {
  if (!uri) {
    throw new Error('Variabel lingkungan MONGODB_URI belum diatur');
  }

  mongoose.connection.on('connected', () => {
    console.log('MongoDB terhubung');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Kesalahan koneksi MongoDB:', err);
  });

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  });
}

export default connectDB;

