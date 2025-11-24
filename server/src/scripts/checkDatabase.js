import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Article from '../models/article.js';
import Gallery from '../models/gallery.js';
import Comment from '../models/comment.js';
import Product from '../models/product.js';

dotenv.config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/madu_db');
    console.log('✅ Connected to MongoDB\n');
    
    const userCount = await User.countDocuments();
    const articleCount = await Article.countDocuments();
    const galleryCount = await Gallery.countDocuments();
    const commentCount = await Comment.countDocuments();
    const productCount = await Product.countDocuments();
    
    console.log('📊 Database Statistics:');
    console.log('━'.repeat(50));
    console.log(`👥 Users: ${userCount}`);
    console.log(`📝 Articles: ${articleCount}`);
    console.log(`🖼️  Gallery Items: ${galleryCount}`);
    console.log(`💬 Comments: ${commentCount}`);
    console.log(`🛍️  Products: ${productCount}`);
    console.log('━'.repeat(50));
    
    if (articleCount > 0) {
      console.log('\n📝 Sample Articles:');
      const articles = await Article.find({}).limit(2);
      articles.forEach((art, i) => {
        console.log(`  ${i + 1}. "${art.title}" (ID: ${art._id})`);
      });
    }
    
    if (galleryCount > 0) {
      console.log('\n🖼️  Sample Gallery Items:');
      const galleries = await Gallery.find({}).limit(2);
      galleries.forEach((gal, i) => {
        console.log(`  ${i + 1}. "${gal.title}" (ID: ${gal._id})`);
      });
    }
    
    if (commentCount > 0) {
      console.log('\n💬 Sample Comments:');
      const comments = await Comment.find({}).limit(2);
      comments.forEach((com, i) => {
        console.log(`  ${i + 1}. "${com.content?.substring(0, 50)}..." (ID: ${com._id})`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDatabase();
