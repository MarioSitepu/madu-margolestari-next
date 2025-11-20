<div align="center">

# 🍯 Madu Margolestari - UMKM Honey E-Commerce Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue.svg)

**Platform E-Commerce Modern untuk UMKM Madu dengan Fitur Lengkap**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Documentation](#-documentation) • [Deployment](#-deployment)

</div>

---

## 📖 Tentang Project

**Madu Margolestari** adalah platform e-commerce modern yang dirancang khusus untuk UMKM madu. Platform ini menyediakan sistem manajemen produk, artikel, galeri, dan komentar yang lengkap dengan autentikasi pengguna dan dashboard admin yang powerful.

Platform ini dibangun dengan teknologi modern untuk memberikan pengalaman terbaik baik untuk pengguna maupun administrator. Dengan antarmuka yang intuitif dan fitur-fitur lengkap, platform ini siap digunakan untuk mengembangkan bisnis UMKM madu secara digital.

### ✨ Highlights

- 🎨 **Modern UI/UX** - Desain responsif dengan Tailwind CSS
- 🔐 **Autentikasi Lengkap** - Login/Register dengan Email & Google OAuth
- 👨‍💼 **Admin Dashboard** - Sistem manajemen konten yang komprehensif
- 📱 **Responsive Design** - Optimal di semua perangkat
- 🚀 **Fast Performance** - Built dengan Vite & React 19
- 🔒 **Secure** - JWT Authentication & Role-based Access Control

---

## 🎯 Features

### 👤 User Features

- ✅ **Autentikasi & Registrasi**
  - Login/Register dengan Email & Password
  - Google OAuth Login
  - Profile Management dengan Avatar Upload
  - User Dashboard

- 🛍️ **E-Commerce**
  - Product Catalog dengan Filter
  - Product Detail Pages
  - Product Search & Filtering

- 📰 **Content Management**
  - Artikel & Dokumentasi
  - Galeri Foto
  - Sistem Komentar dengan Like
  - Search Artikel

- 💬 **Social Features**
  - Komentar pada Artikel
  - Like Komentar
  - Riwayat Komentar
  - Komentar yang Disukai

### 👨‍💼 Admin Features

- 📊 **Dashboard Analytics**
  - Statistik Pengguna, Artikel, Produk, Komentar
  - Quick Actions untuk Manajemen Konten

- 📝 **Content Management**
  - **Artikel**: Create, Read, Update, Delete
  - **Produk**: Full CRUD dengan Image Upload
  - **Galeri**: Upload & Manage Gallery Images
  - **Komentar**: Moderate & Delete Comments

- 👥 **User Management**
  - View All Users
  - Role Management (User/Admin)
  - User Statistics

- ⚙️ **Settings**
  - Profile Settings
  - Avatar Upload (Supabase Storage)
  - Account Information

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI Framework |
| **TypeScript** | 5.9.3 | Type Safety |
| **Vite** | 7.2.2 | Build Tool & Dev Server |
| **React Router** | 7.9.5 | Client-side Routing |
| **Tailwind CSS** | 4.1.17 | Styling Framework |
| **Axios** | 1.13.2 | HTTP Client |
| **Lucide React** | 0.469.0 | Icon Library |
| **Google OAuth** | 0.12.2 | Google Authentication |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | >=18 | Runtime Environment |
| **Express.js** | 4.19.2 | Web Framework |
| **MongoDB** | Latest | Database |
| **Mongoose** | 8.6.0 | ODM |
| **JWT** | 9.0.2 | Authentication |
| **Bcrypt** | 3.0.3 | Password Hashing |
| **Multer** | 2.0.2 | File Upload |
| **Sharp** | 0.34.5 | Image Processing |
| **Supabase** | 2.81.1 | Cloud Storage |

---

## 📁 Project Structure

```
madu-margolestari/
│
├── 📂 madu/                    # Frontend Application
│   ├── 📂 src/
│   │   ├── 📂 components/      # React Components
│   │   │   ├── ui/            # UI Components (Button, Card, Badge)
│   │   │   └── articledoc/    # Article Components
│   │   ├── 📂 pages/          # Page Components
│   │   │   ├── admin/         # Admin Pages
│   │   │   └── auth/          # Authentication Pages
│   │   ├── 📂 context/        # React Context (Auth)
│   │   └── 📂 lib/            # Utilities
│   ├── package.json
│   └── vite.config.ts
│
├── 📂 server/                  # Backend API
│   ├── 📂 src/
│   │   ├── 📂 models/         # MongoDB Models
│   │   ├── 📂 routes/         # API Routes
│   │   ├── 📂 lib/            # Utilities (JWT, DB, Supabase)
│   │   └── 📂 scripts/        # Utility Scripts
│   ├── package.json
│   └── env.example
│
├── 📄 ENV_DEPLOYMENT_GUIDE.md  # Deployment Guide
└── 📄 README.md               # This File
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** >= 18.x
- **MongoDB** (Local atau MongoDB Atlas)
- **npm** atau **yarn**
- **Google Cloud Console** account (untuk OAuth)

### Step 1: Clone Repository

```bash
git clone https://github.com/MarioSitepu/madu-margolestari-next.git
cd madu-margolestari-next
```

### Step 2: Backend Setup

```bash
# Masuk ke folder server
cd server

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env file dengan konfigurasi Anda
# Lihat bagian Environment Variables di bawah
```

### Step 3: Frontend Setup

```bash
# Masuk ke folder frontend
cd ../madu

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env file dengan konfigurasi Anda
```

### Step 4: Configure Environment Variables

#### Backend (`server/.env`)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/madu_db
JWT_SECRET=your_jwt_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
ADMIN_EMAILS=admin@marles.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FRONTEND_URL=http://localhost:5173
```

#### Frontend (`madu/.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_ADMIN_EMAILS=admin@marles.com
```

> 📝 **Note**: Lihat [ENV_DEPLOYMENT_GUIDE.md](./ENV_DEPLOYMENT_GUIDE.md) untuk panduan lengkap environment variables.

### Step 5: Generate JWT Secret

```bash
cd server
npm run generate:jwt-secret
# Copy output ke JWT_SECRET di .env
```

### Step 6: Run Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd madu
npm run dev
```

Aplikasi akan berjalan di:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

---

## 📚 Documentation

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/avatar` - Upload avatar

#### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

#### Articles
- `GET /api/articles` - Get all published articles
- `GET /api/articles/:id` - Get article by ID
- `POST /api/articles` - Create article (admin)
- `PUT /api/articles/:id` - Update article (admin)
- `DELETE /api/articles/:id` - Delete article (admin)

#### Comments
- `GET /api/comments` - Get all comments
- `GET /api/comments/article/:articleId` - Get comments by article
- `POST /api/comments` - Create comment (authenticated)
- `PUT /api/comments/:id/like` - Like/Unlike comment
- `DELETE /api/comments/:id` - Delete comment (admin/owner)

#### Gallery
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Upload gallery image (admin)
- `PUT /api/gallery/:id` - Update gallery (admin)
- `DELETE /api/gallery/:id` - Delete gallery (admin)

#### Admin
- `GET /api/admin/users` - Get all users (admin)
- `GET /api/admin/stats` - Get statistics (admin)

### Database Models

#### User
```javascript
{
  email: String (unique, required),
  name: String (required),
  password: String (required if not Google),
  googleId: String (optional),
  avatar: String (optional),
  provider: 'local' | 'google',
  role: 'user' | 'admin',
  isVerified: Boolean
}
```

#### Product
```javascript
{
  name: String (required),
  description: String,
  price: Number (required),
  imageUrl: String,
  tags: [String]
}
```

#### Article
```javascript
{
  title: String (required),
  description: String (required),
  content: String,
  image: String,
  backgroundImage: String,
  author: ObjectId (ref: User),
  authorName: String (required),
  published: Boolean,
  views: Number,
  tags: [String]
}
```

---

## 🚢 Deployment

### Frontend (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd madu
   vercel
   ```

3. **Set Environment Variables** di Vercel Dashboard:
   - `VITE_API_URL` - URL backend production
   - `VITE_GOOGLE_CLIENT_ID` - Google Client ID
   - `VITE_ADMIN_EMAILS` - Admin emails

### Backend (Railway/Render/Heroku)

#### Railway (Recommended)

1. **Connect GitHub** repository ke Railway
2. **Set Root Directory** ke `server`
3. **Add Environment Variables** dari `server/env.example`
4. **Deploy** - Railway akan otomatis detect dan deploy

#### Render

1. **Create Web Service** di Render
2. **Connect Repository**
3. **Configure**:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
4. **Add Environment Variables**
5. **Deploy**

> 📖 **Panduan Lengkap**: Lihat [ENV_DEPLOYMENT_GUIDE.md](./ENV_DEPLOYMENT_GUIDE.md)

---

## 🔧 Configuration

### MongoDB Setup

Lihat [server/MONGODB_SETUP.md](./server/MONGODB_SETUP.md) untuk panduan setup MongoDB.

### Google OAuth Setup

Lihat [server/GOOGLE_OAUTH_SETUP.md](./server/GOOGLE_OAUTH_SETUP.md) untuk panduan setup Google OAuth.

### Supabase Setup (Optional)

Lihat [server/SUPABASE_SETUP.md](./server/SUPABASE_SETUP.md) untuk panduan setup Supabase Storage.

### JWT Setup

Lihat [server/JWT_SETUP.md](./server/JWT_SETUP.md) untuk panduan setup JWT.

---

## 🧪 Scripts

### Backend Scripts

```bash
npm run dev          # Start development server (nodemon)
npm start            # Start production server
npm run lint         # Run ESLint
npm run generate:jwt-secret  # Generate JWT secret key
npm run create:admin # Create admin user (interactive)
```

### Frontend Scripts

```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production (TypeScript + Vite)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

### Create Admin User

```bash
cd server
npm run create:admin

# Atau dengan parameter:
node src/scripts/createAdmin.js --email admin@example.com --password yourpassword --name "Admin Name"
```

---

## 🐛 Troubleshooting

### Network Error

Jika mengalami network error, lihat [server/NETWORK_ERROR_TROUBLESHOOTING.md](./server/NETWORK_ERROR_TROUBLESHOOTING.md)

### Google OAuth Error

Jika mengalami masalah dengan Google OAuth, lihat [server/TROUBLESHOOTING_GOOGLE_OAUTH.md](./server/TROUBLESHOOTING_GOOGLE_OAUTH.md)

### Common Issues

1. **Port Already in Use**
   ```bash
   # Change PORT in .env file
   PORT=5001
   ```

2. **MongoDB Connection Error**
   - Pastikan MongoDB running
   - Check MONGODB_URI di .env
   - Pastikan network access di MongoDB Atlas

3. **CORS Error**
   - Pastikan FRONTEND_URL di backend .env sudah benar
   - Check allowedOrigins di server/src/app.js

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Style

- Use **ESLint** for code linting
- Follow **TypeScript** best practices
- Write **clear commit messages**
- Add **comments** for complex logic

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mario Sitepu**

- GitHub: [@MarioSitepu](https://github.com/MarioSitepu)
- Project Link: [https://github.com/MarioSitepu/madu-margolestari-next](https://github.com/MarioSitepu/madu-margolestari-next)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Framework
- [Express.js](https://expressjs.com/) - Backend Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build Tool
- [Vercel](https://vercel.com/) - Frontend Hosting
- [Railway](https://railway.app/) - Backend Hosting

---

## 📊 Project Status

![Status](https://img.shields.io/badge/status-active-success.svg)
![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)

**Current Version**: 1.0.0

**Last Updated**: 2024

## 🎨 Screenshots

> 📸 Screenshots akan ditambahkan segera

### Homepage
- Hero section dengan produk unggulan
- Product showcase
- Informasi tentang madu
- Testimonials

### Dashboard
- User dashboard dengan statistik
- Admin dashboard dengan analytics lengkap
- Profile management

### Admin Panel
- Artikel management
- Product management
- Gallery management
- User management
- Comment moderation

## 🔐 Security Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - Bcrypt untuk password security
- ✅ **Role-Based Access Control** - Admin & User roles
- ✅ **CORS Protection** - Configured CORS untuk security
- ✅ **Input Validation** - Server-side validation
- ✅ **File Upload Security** - File type & size validation
- ✅ **Environment Variables** - Sensitive data protection

## 📈 Performance

- ⚡ **Vite Build** - Fast build times
- ⚡ **Code Splitting** - Optimized bundle sizes
- ⚡ **Image Optimization** - Sharp untuk image processing
- ⚡ **Database Indexing** - Optimized MongoDB queries
- ⚡ **Lazy Loading** - Component lazy loading
- ⚡ **CDN Ready** - Static assets optimization

---

<div align="center">

**⭐ Jika project ini membantu Anda, jangan lupa berikan star! ⭐**

Made with ❤️ By Us

</div>

