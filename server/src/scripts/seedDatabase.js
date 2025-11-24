import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Article from '../models/article.js';
import Gallery from '../models/gallery.js';
import Comment from '../models/comment.js';
import Product from '../models/product.js';

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/madu_db');
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data (optional - comment out if you want to preserve)
    // await Article.deleteMany({});
    // await Gallery.deleteMany({});
    // await Comment.deleteMany({});
    // await Product.deleteMany({});

    // Get admin user ID for article author
    const adminUser = await User.findOne({ email: 'admin@marles.com' });
    if (!adminUser) {
      console.error('❌ Admin user not found. Please create admin user first.');
      process.exit(1);
    }

    // Seed Articles
    const articles = await Article.insertMany([
      {
        title: 'Manfaat Madu untuk Kesehatan',
        description: 'Pelajari manfaat luar biasa madu untuk kesehatan dan wellness Anda.',
        content: 'Madu adalah cairan berharga yang dihasilkan oleh lebah melalui proses pengumpulan nektar. Madu memiliki berbagai manfaat kesehatan yang luar biasa, mulai dari meningkatkan daya tahan tubuh hingga membantu penyembuhan luka. Dengan kandungan antioksidan dan antibakteri alami, madu telah digunakan sebagai obat tradisional selama berabad-abad.',
        author: adminUser._id,
        authorName: adminUser.name || 'Admin Marles',
        image: 'https://images.unsplash.com/photo-1578849786673-8a56e87b4253?w=800',
        backgroundImage: 'https://images.unsplash.com/photo-1578849786673-8a56e87b4253?w=1200',
        published: true,
        tags: ['madu', 'kesehatan', 'wellness'],
        views: 125
      },
      {
        title: 'Cara Memilih Madu Berkualitas',
        description: 'Panduan lengkap memilih madu asli dan berkualitas premium.',
        content: 'Tidak semua madu yang dijual di pasaran memiliki kualitas yang sama. Ada beberapa tips penting untuk memilih madu berkualitas tinggi yang aman dikonsumsi oleh seluruh keluarga. Madu asli biasanya memiliki tekstur kristal alami dan aroma yang khas. Hindari madu dengan kemasan yang tidak jelas atau harga yang terlalu murah.',
        author: adminUser._id,
        authorName: adminUser.name || 'Admin Marles',
        image: 'https://images.unsplash.com/photo-1588080050059-1089b0059a5a?w=800',
        backgroundImage: 'https://images.unsplash.com/photo-1588080050059-1089b0059a5a?w=1200',
        published: true,
        tags: ['madu', 'tips', 'kualitas'],
        views: 89
      },
      {
        title: 'Madu Organik vs Madu Konvensional',
        description: 'Memahami perbedaan madu organik dan konvensional untuk pilihan terbaik.',
        content: 'Apa perbedaan antara madu organik dan madu konvensional? Dalam artikel ini kami jelaskan perbedaan, kelebihan, dan kekurangan dari kedua jenis madu tersebut. Madu organik diproduksi tanpa menggunakan pestisida atau bahan kimia sintetis, sementara madu konvensional mungkin telah terpapar dengan bahan kimia dari lingkungan sekitarnya.',
        author: adminUser._id,
        authorName: adminUser.name || 'Admin Marles',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        backgroundImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
        published: true,
        tags: ['madu organik', 'organik', 'perbandingan'],
        views: 156
      },
      {
        title: 'Proses Produksi Madu Alami',
        description: 'Kenali proses produksi madu alami dari hulu ke hilir.',
        content: 'Bagaimana proses produksi madu dari awal hingga akhir? Mari kita pelajari perjalanan madu dari sarang lebah hingga sampai ke meja Anda. Proses dimulai dari lebah yang mengumpulkan nektar, kemudian diproses dalam sarang, dan akhirnya dipanen serta dikemas dengan hati-hati untuk menjaga kualitasnya.',
        author: adminUser._id,
        authorName: adminUser.name || 'Admin Marles',
        image: 'https://images.unsplash.com/photo-1569080293221-bc79843a4a2e?w=800',
        backgroundImage: 'https://images.unsplash.com/photo-1569080293221-bc79843a4a2e?w=1200',
        published: true,
        tags: ['produksi', 'proses', 'madu alami'],
        views: 203
      }
    ]);
    console.log(`✅ Created ${articles.length} articles`);

    // Seed Gallery
    const galleries = await Gallery.insertMany([
      {
        title: 'Panen Madu Musim Semi',
        description: 'Koleksi foto proses panen madu pada musim semi 2024',
        imageUrl: 'https://images.unsplash.com/photo-1507598696369-3b13c340c9df?w=800',
        order: 1,
        published: true
      },
      {
        title: 'Perawatan Koloni Lebah',
        description: 'Dokumentasi perawatan dan monitoring koloni lebah kami',
        imageUrl: 'https://images.unsplash.com/photo-1532996122724-8f3c4e6f0ac0?w=800',
        order: 2,
        published: true
      },
      {
        title: 'Produk Madu Kami',
        description: 'Rangkaian produk madu premium dari Madu Margo Lestari',
        imageUrl: 'https://images.unsplash.com/photo-1586985289688-cacbb35b3a4d?w=800',
        order: 3,
        published: true
      },
      {
        title: 'Fasilitas Produksi',
        description: 'Tour virtual fasilitas produksi madu yang modern dan higienis',
        imageUrl: 'https://images.unsplash.com/photo-1578849786673-8a56e87b4273?w=800',
        order: 4,
        published: true
      },
      {
        title: 'Tim Petani Kami',
        description: 'Berkenal dengan tim profesional di balik Madu Margo Lestari',
        imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800',
        order: 5,
        published: true
      }
    ]);
    console.log(`✅ Created ${galleries.length} gallery items`);

    // Seed Comments on articles
    const comments = [];
    for (const article of articles) {
      const articleComments = await Comment.insertMany([
        {
          articleId: article._id,
          author: adminUser._id,
          authorName: adminUser.name || 'Admin Marles',
          authorAvatar: adminUser.avatar || null,
          content: 'Artikel yang sangat informatif! Terima kasih telah berbagi pengetahuan tentang madu.',
          likes: 5
        },
        {
          articleId: article._id,
          author: adminUser._id,
          authorName: adminUser.name || 'Admin Marles',
          authorAvatar: adminUser.avatar || null,
          content: 'Penjelasannya mudah dipahami dan sangat bermanfaat.',
          likes: 2
        }
      ]);
      comments.push(...articleComments);
    }
    console.log(`✅ Created ${comments.length} comments`);

    // Seed Products
    const products = await Product.insertMany([
      {
        name: 'Madu Rasa Original 500ml',
        description: 'Madu premium asli tanpa campuran, langsung dari koloni lebah kami',
        price: 85000,
        imageUrl: 'https://images.unsplash.com/photo-1586985289688-cacbb35b3a4d?w=800',
        tags: ['madu-asli', 'original']
      },
      {
        name: 'Madu Rasa Liar 500ml',
        description: 'Madu dengan rasa yang lebih kuat dari bunga liar pilihan',
        price: 95000,
        imageUrl: 'https://images.unsplash.com/photo-1578849786673-8a56e87b4253?w=800',
        tags: ['madu-spesial', 'premium']
      },
      {
        name: 'Paket Madu Hemat 3x500ml',
        description: 'Hemat dengan membeli paket 3 botol madu pilihan',
        price: 240000,
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        tags: ['paket', 'hemat']
      },
      {
        name: 'Lilin Lebah 100% Natural',
        description: 'Lilin murni dari sarang lebah, eco-friendly dan tahan lama',
        price: 45000,
        imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
        tags: ['produk-sampingan', 'natural']
      },
      {
        name: 'Royal Jelly Premium 30ml',
        description: 'Royal jelly murni untuk kesehatan dan kecantikan maksimal',
        price: 150000,
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5f400f6f0?w=800',
        tags: ['premium', 'royal-jelly']
      }
    ]);
    console.log(`✅ Created ${products.length} products`);

    console.log('\n' + '━'.repeat(60));
    console.log('✅ Database seeding completed successfully!');
    console.log('━'.repeat(60));
    console.log(`
📊 Summary:
   📝 Articles: ${articles.length}
   🖼️  Gallery Items: ${galleries.length}
   💬 Comments: ${comments.length}
   🛍️  Products: ${products.length}
   👥 Total Items: ${articles.length + galleries.length + comments.length + products.length}
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();
