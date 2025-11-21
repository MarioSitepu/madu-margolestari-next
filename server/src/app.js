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
import sitemapRouter from './routes/sitemap.js';

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
      // Also add without trailing slash
      frontendUrls.forEach(url => {
        if (url.endsWith('/')) {
          allowedOrigins.push(url.slice(0, -1));
        } else {
          allowedOrigins.push(url + '/');
        }
      });
    }
    
    // In development, allow all origins
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // Log for debugging in production
    if (process.env.NODE_ENV === 'production') {
      console.log('CORS Check - Origin:', origin);
      console.log('CORS Check - Allowed Origins:', allowedOrigins);
    }
    
    // In production, check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Log the rejected origin for debugging
      console.warn('CORS Error - Origin not allowed:', origin);
      console.warn('CORS Error - Allowed origins:', allowedOrigins);
      console.warn('CORS Error - FRONTEND_URL env:', process.env.FRONTEND_URL || 'NOT SET');
      callback(new Error(`Not allowed by CORS. Origin: ${origin}. Please set FRONTEND_URL environment variable.`));
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
app.use('/', sitemapRouter); // Sitemap at root level /sitemap.xml

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

