import dotenv from 'dotenv';
import http from 'http';

import app from './app.js';
import connectDB from './lib/connect-db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    console.log('🚀 Memulai server...');
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Di-set' : '❌ Tidak di-set');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ ERROR: MONGODB_URI tidak di-set di environment variables!');
      console.error('Silakan set MONGODB_URI di platform deployment (Render, Railway, dll)');
      process.exit(1);
    }
    
    await connectDB(process.env.MONGODB_URI);

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`✅ Server berjalan pada port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Gagal memulai server:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name
    });
    process.exit(1);
  }
}

start();

