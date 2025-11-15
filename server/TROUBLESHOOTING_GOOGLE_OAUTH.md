# Troubleshooting Google OAuth Login

## Masalah Umum dan Solusinya

### 1. Error: "Terjadi kesalahan saat login dengan Google"

**Kemungkinan Penyebab:**
- GOOGLE_CLIENT_ID tidak dikonfigurasi
- GOOGLE_CLIENT_ID berbeda antara frontend dan backend
- Token Google tidak valid
- MongoDB tidak terhubung

**Solusi:**

#### A. Periksa GOOGLE_CLIENT_ID di Backend

1. Pastikan file `.env` di folder `server/` memiliki:
   ```env
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```

2. Restart server setelah mengubah `.env`:
   ```bash
   cd server
   npm run dev
   ```

3. Verifikasi di console server, seharusnya tidak ada warning:
   ```
   Peringatan: GOOGLE_CLIENT_ID tidak ditemukan di environment variables
   ```

#### B. Periksa GOOGLE_CLIENT_ID di Frontend

1. Pastikan file `.env` di folder `madu/` memiliki:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```

2. **PENTING:** GOOGLE_CLIENT_ID di frontend HARUS SAMA dengan di backend!

3. Restart development server:
   ```bash
   cd madu
   npm run dev
   ```

#### C. Periksa Google Cloud Console

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Pergi ke **APIs & Services** > **Credentials**
3. Pastikan OAuth 2.0 Client ID sudah dibuat
4. Periksa **Authorized JavaScript origins**:
   - `http://localhost:5173` (untuk Vite default)
   - `http://localhost:3000` (jika menggunakan port lain)
   - URL production Anda
5. Periksa **Authorized redirect URIs**:
   - `http://localhost:5173`
   - `http://localhost:3000`
   - URL production Anda

### 2. Error: "Token Google tidak valid. Pastikan GOOGLE_CLIENT_ID sudah benar"

**Penyebab:**
- GOOGLE_CLIENT_ID di backend berbeda dengan di frontend
- Token sudah kadaluarsa
- Token tidak valid

**Solusi:**

1. **Pastikan GOOGLE_CLIENT_ID sama di frontend dan backend:**
   ```bash
   # Backend (.env di server/)
   GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
   
   # Frontend (.env di madu/)
   VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
   ```

2. **Restart kedua server:**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd madu
   npm run dev
   ```

3. **Clear browser cache dan coba lagi**

### 3. Error: "Invalid audience"

**Penyebab:**
- GOOGLE_CLIENT_ID di backend tidak cocok dengan token yang dikirim dari frontend

**Solusi:**

1. Pastikan Client ID yang digunakan di frontend sama dengan di backend
2. Periksa di Google Cloud Console bahwa Client ID yang digunakan adalah untuk "Web application"
3. Pastikan origin frontend sudah ditambahkan di Authorized JavaScript origins

### 4. Error: "Google OAuth tidak dikonfigurasi"

**Penyebab:**
- GOOGLE_CLIENT_ID tidak ada di file `.env` backend

**Solusi:**

1. Buat atau edit file `server/.env`
2. Tambahkan:
   ```env
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```
3. Restart server

### 5. Error: "MongoDB connection error"

**Penyebab:**
- MongoDB tidak terhubung
- MONGODB_URI tidak dikonfigurasi

**Solusi:**

1. Pastikan MongoDB sudah berjalan (untuk lokal) atau cluster sudah aktif (untuk Atlas)
2. Periksa `MONGODB_URI` di `server/.env`
3. Lihat dokumentasi di `MONGODB_SETUP.md`

## Debugging Steps

### 1. Periksa Console Backend

Jalankan server dan periksa console untuk error messages:
```bash
cd server
npm run dev
```

Error akan muncul di console dengan detail:
```
Google login error: Error: ...
Error details: { message: ..., code: ..., name: ... }
```

### 2. Periksa Console Browser

Buka Developer Tools (F12) di browser dan periksa:
- **Console tab**: Untuk JavaScript errors
- **Network tab**: Untuk melihat request/response ke backend

### 3. Test Endpoint Manual

Test endpoint dengan Postman atau curl:
```bash
curl -X POST http://localhost:5000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"credential": "test-token"}'
```

### 4. Verifikasi Environment Variables

**Backend:**
```bash
cd server
# Periksa apakah .env ada
cat .env | grep GOOGLE_CLIENT_ID
```

**Frontend:**
```bash
cd madu
# Periksa apakah .env ada
cat .env | grep VITE_GOOGLE_CLIENT_ID
```

## Checklist Setup

- [ ] Google Cloud Console project sudah dibuat
- [ ] OAuth 2.0 Client ID sudah dibuat (Web application)
- [ ] Authorized JavaScript origins sudah di-set
- [ ] Authorized redirect URIs sudah di-set
- [ ] GOOGLE_CLIENT_ID sudah di-set di `server/.env`
- [ ] VITE_GOOGLE_CLIENT_ID sudah di-set di `madu/.env`
- [ ] GOOGLE_CLIENT_ID sama di frontend dan backend
- [ ] Backend server sudah restart setelah mengubah `.env`
- [ ] Frontend server sudah restart setelah mengubah `.env`
- [ ] MongoDB sudah terhubung
- [ ] Browser cache sudah di-clear

## Testing

1. **Test di Development:**
   - Buka `http://localhost:5173/login`
   - Klik tombol "Sign in with Google"
   - Pilih akun Google
   - Periksa apakah login berhasil

2. **Periksa Response:**
   - Buka Network tab di Developer Tools
   - Lihat request ke `/api/auth/google`
   - Periksa response status dan message

## Masih Bermasalah?

Jika masih mengalami masalah:

1. **Periksa log server** untuk detail error
2. **Periksa Network tab** di browser untuk melihat request/response
3. **Pastikan semua environment variables sudah benar**
4. **Pastikan kedua server (frontend dan backend) sudah restart**
5. **Coba dengan akun Google yang berbeda**
6. **Clear browser cache dan cookies**

## Contoh File .env yang Benar

**server/.env:**
```env
MONGODB_URI=mongodb://localhost:27017/madu_db
PORT=5000
JWT_SECRET=your_jwt_secret_here
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

**madu/.env:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

**PENTING:** GOOGLE_CLIENT_ID harus sama di kedua file!

