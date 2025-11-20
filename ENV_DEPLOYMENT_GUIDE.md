# Panduan Environment Variables untuk Deployment Terpisah

Dokumen ini menjelaskan format environment variables yang benar untuk deployment **Backend** dan **Frontend** secara terpisah.

---

## 📋 Daftar Isi

1. [Backend Environment Variables](#backend-environment-variables)
2. [Frontend Environment Variables](#frontend-environment-variables)
3. [Cara Setup di Vercel (Frontend)](#cara-setup-di-vercel-frontend)
4. [Cara Setup di Platform Backend (Railway/Render/Heroku)](#cara-setup-di-platform-backend)
5. [CORS Configuration](#cors-configuration)
6. [Testing Environment Variables](#testing-environment-variables)

---

## 🔧 Backend Environment Variables

Buat file `.env` di folder `server/` dengan format berikut:

```env
# ============================================
# SERVER CONFIGURATION
# ============================================
NODE_ENV=production
PORT=5000

# ============================================
# DATABASE
# ============================================
# MongoDB Atlas (Recommended untuk production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/madu_db?retryWrites=true&w=majority

# Atau MongoDB Lokal (untuk development)
# MONGODB_URI=mongodb://localhost:27017/madu_db

# ============================================
# JWT AUTHENTICATION
# ============================================
# Generate dengan: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_super_secret_jwt_key_minimal_32_karakter_untuk_production

# ============================================
# GOOGLE OAUTH
# ============================================
# Dapatkan dari Google Cloud Console: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com

# ============================================
# ADMIN CONFIGURATION
# ============================================
# Email admin yang akan otomatis mendapat role admin (pisahkan dengan koma)
ADMIN_EMAILS=admin@madumargolestari.com,admin@example.com

# ============================================
# SUPABASE STORAGE (Optional - untuk upload gambar)
# ============================================
# Jika menggunakan Supabase untuk storage avatar/gambar
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
# Atau gunakan ANON_KEY jika tidak ada SERVICE_ROLE_KEY
# SUPABASE_ANON_KEY=your_anon_key_here

# ============================================
# CORS (Optional - untuk production)
# ============================================
# Frontend URL yang diizinkan (pisahkan dengan koma jika lebih dari satu)
# Contoh: FRONTEND_URL=https://your-app.vercel.app,https://www.yourdomain.com
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 📝 Catatan Backend:

- **MONGODB_URI**: Gunakan MongoDB Atlas untuk production (gratis tier tersedia)
- **JWT_SECRET**: Harus minimal 32 karakter, generate dengan command:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- **GOOGLE_CLIENT_ID**: Harus sama dengan yang digunakan di frontend
- **SUPABASE**: Optional, hanya jika menggunakan Supabase untuk storage
- **FRONTEND_URL**: URL frontend production untuk CORS

---

## 🎨 Frontend Environment Variables

Buat file `.env` di folder `madu/` dengan format berikut:

```env
# ============================================
# API CONFIGURATION
# ============================================
# URL Backend API (Production)
VITE_API_URL=https://your-backend-api.railway.app/api
# Atau jika menggunakan domain custom:
# VITE_API_URL=https://api.yourdomain.com/api

# ============================================
# GOOGLE OAUTH
# ============================================
# HARUS SAMA dengan GOOGLE_CLIENT_ID di backend
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com

# ============================================
# ADMIN CONFIGURATION (Optional)
# ============================================
# Email admin tambahan (pisahkan dengan koma)
VITE_ADMIN_EMAILS=admin@madumargolestari.com,admin@example.com
```

### 📝 Catatan Frontend:

- **VITE_** prefix: WAJIB untuk semua environment variables di Vite
- **VITE_API_URL**: URL backend production (bukan localhost)
- **VITE_GOOGLE_CLIENT_ID**: Harus sama persis dengan `GOOGLE_CLIENT_ID` di backend
- Setelah mengubah `.env`, restart development server

---

## 🚀 Cara Setup di Vercel (Frontend)

### 1. Deploy ke Vercel

```bash
cd madu
vercel
```

### 2. Setup Environment Variables di Vercel Dashboard

1. Buka project di [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project Anda
3. Klik **Settings** → **Environment Variables**
4. Tambahkan variables berikut:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_API_URL` | `https://your-backend-api.railway.app/api` | Production, Preview, Development |
| `VITE_GOOGLE_CLIENT_ID` | `123456789-...` | Production, Preview, Development |
| `VITE_ADMIN_EMAILS` | `admin@madumargolestari.com,admin@example.com` | Production, Preview, Development |

### 3. Redeploy

Setelah menambahkan environment variables, klik **Redeploy** di Vercel dashboard.

---

## ⚙️ Cara Setup di Platform Backend

### Opsi 1: Railway (Recommended)

1. **Buat Project di Railway**
   - Kunjungi [railway.app](https://railway.app)
   - Buat project baru
   - Connect GitHub repository

2. **Setup Environment Variables**
   - Klik project → **Variables** tab
   - Tambahkan semua variables dari [Backend Environment Variables](#backend-environment-variables)

3. **Deploy**
   - Railway akan otomatis detect `package.json`
   - Pastikan **Start Command**: `npm start`
   - Pastikan **Root Directory**: `server`

4. **Dapatkan URL**
   - Railway akan memberikan URL seperti: `https://your-app.railway.app`
   - Gunakan URL ini untuk `VITE_API_URL` di frontend

### Opsi 2: Render

1. **Buat Web Service di Render**
   - Kunjungi [render.com](https://render.com)
   - Buat **Web Service** baru
   - Connect GitHub repository

2. **Setup Environment Variables**
   - Di dashboard, klik **Environment**
   - Tambahkan semua variables dari [Backend Environment Variables](#backend-environment-variables)

3. **Configure Build & Start**
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: (kosongkan atau `server`)

### Opsi 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login & Create App**
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Setup Environment Variables**
   ```bash
   cd server
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set GOOGLE_CLIENT_ID=your_google_client_id
   heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

---

## 🔒 CORS Configuration

Untuk production, pastikan backend mengizinkan origin frontend Anda.

### Update `server/src/app.js`:

```javascript
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.FRONTEND_URL, // URL frontend production
      'https://your-app.vercel.app', // Ganti dengan URL Vercel Anda
      'http://localhost:5173', // Untuk development
      'http://localhost:3000', // Untuk development
    ];
    
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
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
```

---

## ✅ Testing Environment Variables

### Test Backend:

```bash
cd server
node -e "require('dotenv').config(); console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'OK' : 'MISSING'); console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'OK' : 'MISSING'); console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'OK' : 'MISSING');"
```

### Test Frontend:

```bash
cd madu
npm run build
# Cek apakah build berhasil tanpa error
```

### Test API Connection:

1. Buka browser console di frontend production
2. Jalankan:
   ```javascript
   fetch('https://your-backend-api.railway.app/api/health')
     .then(r => r.json())
     .then(console.log)
   ```
3. Seharusnya mendapat response: `{status: "ok"}`

---

## 🔐 Security Checklist

- [ ] JWT_SECRET minimal 32 karakter dan unik
- [ ] Jangan commit `.env` ke Git (sudah ada di `.gitignore`)
- [ ] Gunakan MongoDB Atlas dengan password kuat
- [ ] GOOGLE_CLIENT_ID sama di frontend dan backend
- [ ] CORS dikonfigurasi dengan benar untuk production
- [ ] SUPABASE_SERVICE_ROLE_KEY tidak di-expose ke frontend
- [ ] Semua environment variables sudah di-set di platform deployment

---

## 📞 Troubleshooting

### Error: "Network Error" di Frontend

**Penyebab**: `VITE_API_URL` salah atau backend tidak running

**Solusi**:
1. Pastikan `VITE_API_URL` di Vercel sudah benar
2. Test backend URL: `https://your-backend.railway.app/api/health`
3. Redeploy frontend setelah mengubah environment variables

### Error: "CORS policy" di Browser

**Penyebab**: Backend tidak mengizinkan origin frontend

**Solusi**:
1. Pastikan `FRONTEND_URL` di backend environment variables sudah benar
2. Update `allowedOrigins` di `server/src/app.js`
3. Restart backend server

### Error: "Google OAuth failed"

**Penyebab**: `GOOGLE_CLIENT_ID` berbeda atau tidak di-set

**Solusi**:
1. Pastikan `GOOGLE_CLIENT_ID` sama di frontend dan backend
2. Update Authorized JavaScript origins di Google Cloud Console:
   - Tambahkan: `https://your-frontend.vercel.app`
   - Tambahkan: `https://your-backend.railway.app`
3. Redeploy kedua aplikasi

---

## 📚 Referensi

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Railway Environment Variables](https://docs.railway.app/develop/variables)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Last Updated**: 2024

