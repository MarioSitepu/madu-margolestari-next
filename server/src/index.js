import dotenv from 'dotenv';
import http from 'http';

import app from './app.js';
import connectDB from './lib/connect-db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server berjalan pada http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Gagal memulai server:', error);
    process.exit(1);
  }
}

start();

