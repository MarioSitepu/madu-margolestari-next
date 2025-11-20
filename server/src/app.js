import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import healthRouter from './routes/health.js';
import productRouter from './routes/products.js';
import authRouter from './routes/auth.js';
import articleRouter from './routes/articles.js';
import commentRouter from './routes/comments.js';
import adminRouter from './routes/admin.js';
import galleryRouter from './routes/gallery.js';

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000'
    ];
    
    // Add production frontend URLs from environment variable
    if (process.env.FRONTEND_URL) {
      const frontendUrls = process.env.FRONTEND_URL.split(',').map(url => url.trim());
      allowedOrigins.push(...frontendUrls);
    }
    
    // In development, allow all origins
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // In production, check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/health', healthRouter);
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/articles', articleRouter);
app.use('/api/comments', commentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/gallery', galleryRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
  next();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Terjadi kesalahan pada server'
  });
});

export default app;

