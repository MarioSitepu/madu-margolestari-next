# Panduan Koneksi MongoDB

## Cara Connect ke MongoDB

Proyek ini sudah memiliki setup koneksi MongoDB menggunakan Mongoose. Berikut langkah-langkahnya:

### 1. Install MongoDB (Jika Belum Ada)

#### Opsi A: MongoDB Lokal
- Download MongoDB Community Server dari [mongodb.com](https://www.mongodb.com/try/download/community)
- Install dan jalankan MongoDB service
- Default port: `27017`

#### Opsi B: MongoDB Atlas (Cloud - Recommended)
- Daftar di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Buat cluster gratis
- Dapatkan connection string

### 2. Buat File `.env`

Buat file `.env` di folder `server/` dengan isi berikut:

```env
# MongoDB Connection URI
# Untuk MongoDB Lokal:
MONGODB_URI=mongodb://localhost:27017/madu_db

# Untuk MongoDB Atlas (ganti dengan connection string Anda):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/madu_db?retryWrites=true&w=majority

# Server Port
PORT=5000

# JWT Secret (untuk autentikasi)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Google OAuth Client ID (untuk login Google)
# Dapatkan dari Google Cloud Console: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

### 3. Format Connection String

#### MongoDB Lokal:
```
mongodb://localhost:27017/nama_database
```

#### MongoDB Atlas:
```
mongodb+srv://username:password@cluster.mongodb.net/nama_database?retryWrites=true&w=majority
```

**Catatan untuk MongoDB Atlas:**
- Ganti `username` dan `password` dengan credentials Anda
- Ganti `cluster.mongodb.net` dengan cluster URL Anda
- Ganti `nama_database` dengan nama database yang diinginkan (contoh: `madu_db`)

### 4. Jalankan Server

```bash
cd server
npm run dev
```

Jika koneksi berhasil, Anda akan melihat pesan:
```
MongoDB terhubung
Server berjalan pada http://localhost:5000
```

### 5. Troubleshooting

#### Error: "Variabel lingkungan MONGODB_URI belum diatur"
- Pastikan file `.env` ada di folder `server/`
- Pastikan variabel `MONGODB_URI` sudah diisi

#### Error: "MongoServerError: Authentication failed"
- Periksa username dan password di connection string
- Untuk MongoDB Atlas, pastikan IP address Anda sudah di-whitelist

#### Error: "MongoServerSelectionError"
- Pastikan MongoDB service berjalan (untuk lokal)
- Periksa koneksi internet (untuk Atlas)
- Periksa firewall settings

### 6. Struktur Database

Proyek ini menggunakan 2 model:
- **User**: Untuk data pengguna (email, password, dll)
- **Product**: Untuk data produk

Database akan dibuat otomatis saat pertama kali terhubung.

