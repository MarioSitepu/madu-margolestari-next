import express from 'express';
import { SitemapStream, streamToPromise } from 'sitemap';
import Product from '../models/product.js';
import Article from '../models/article.js';

const router = express.Router();

const BASE_URL = process.env.FRONTEND_URL?.split(',')[0]?.trim() || 'https://madumargolestari.vercel.app';

router.get('/sitemap.xml', async (req, res) => {
  try {
    const smStream = new SitemapStream({ 
      hostname: BASE_URL,
      cacheTime: 600000, // 10 minutes
    });

    // Static pages
    const staticPages = [
      { url: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date() },
      { url: '/about', changefreq: 'monthly', priority: 0.9, lastmod: new Date() },
      { url: '/product', changefreq: 'weekly', priority: 1.0, lastmod: new Date() },
      { url: '/article', changefreq: 'weekly', priority: 0.8, lastmod: new Date() },
    ];

    staticPages.forEach(page => {
      smStream.write(page);
    });

    // Dynamic product pages
    try {
      const products = await Product.find({}, '_id updatedAt').lean();
      products.forEach(product => {
        smStream.write({
          url: `/product#${product._id}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: product.updatedAt || new Date(),
        });
      });
    } catch (error) {
      console.error('Error fetching products for sitemap:', error);
    }

    // Dynamic article pages
    try {
      const articles = await Article.find({ published: true }, '_id updatedAt createdAt').lean();
      articles.forEach(article => {
        smStream.write({
          url: `/article-galeri/${article._id}`,
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: article.updatedAt || article.createdAt || new Date(),
        });
      });
    } catch (error) {
      console.error('Error fetching articles for sitemap:', error);
    }

    smStream.end();
    const sitemap = await streamToPromise(smStream);

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error generating sitemap' 
    });
  }
});

export default router;

