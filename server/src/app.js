import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import healthRouter from './routes/health.js';
import productRouter from './routes/products.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/health', healthRouter);
app.use('/api/products', productRouter);

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

