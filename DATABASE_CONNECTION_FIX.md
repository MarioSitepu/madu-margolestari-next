# Fix: Database Tidak Muncul di Production

## Masalah
Login Google berhasil, tapi data tidak tersimpan atau tidak muncul di database. Di localhost berfungsi normal.

## Penyebab Umum

### 1. MONGODB_URI Tidak Di-set di Production
Environment variable `MONGODB_URI` tidak dikonfigurasi di platform deployment.

### 2. Format MONGODB_URI Salah
Connection string tidak dalam format yang benar.

### 3. Database Tidak Terhubung
Koneksi ke MongoDB gagal tanpa error yang jelas.

### 4. Error Saat Save Tidak Ditangani
Error saat menyimpan data tidak ditangani dengan baik.

## Solusi

### 1. Set MONGODB_URI di Platform Deployment

#### Di Render.com:
1. Buka dashboard Render
2. Pilih service backend Anda
3. Klik "Environment"
4. Tambahkan environment variable:
   - **Key:** `MONGODB_URI`
   - **Value:** Connection string MongoDB Anda

#### Di Railway:
1. Buka project di Railway
2. Pilih service backend
3. Klik "Variables"
4. Tambahkan:
   - **Name:** `MONGODB_URI`
   - **Value:** Connection string MongoDB Anda

#### Di Platform Lain:
Pastikan environment variable `MONGODB_URI` di-set dengan connection string MongoDB.

### 2. Format MONGODB_URI yang Benar

#### MongoDB Atlas (Recommended):
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

#### MongoDB Local/Compass:
```
mongodb://localhost:27017/database-name
```

#### MongoDB Cloud (MongoDB Atlas):
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database-name>?retryWrites=true&w=majority
```

**PENTING:**
- Ganti `<username>`, `<password>`, dan `<database-name>` dengan nilai yang benar
- Jangan include `MONGODB_URI=` di value (hanya connection string saja)
- Pastikan password tidak mengandung karakter khusus yang perlu di-encode

### 3. Verifikasi Koneksi Database

Setelah set `MONGODB_URI`, cek server logs saat startup:

**Jika berhasil:**
```
✅ MongoDB terhubung dengan sukses
Database: your-database-name
✅ Koneksi MongoDB berhasil dibuat
✅ Server berjalan pada port 5000
```

**Jika gagal:**
```
❌ Gagal menghubungkan ke MongoDB: [error message]
❌ Gagal memulai server: [error]
```

### 4. Checklist Environment Variables

Pastikan semua environment variables berikut di-set di production:

#### Backend (Required):
- [ ] `MONGODB_URI` - Connection string MongoDB
- [ ] `GOOGLE_CLIENT_ID` - Google OAuth Client ID
- [ ] `JWT_SECRET` - Secret untuk JWT token
- [ ] `PORT` - Port server (optional, default 5000)

#### Backend (Optional):
- [ ] `FRONTEND_URL` - URL frontend untuk CORS
- [ ] `ADMIN_EMAILS` - Email admin (pisahkan dengan koma)
- [ ] `NODE_ENV` - Set sebagai `production`

#### Supabase (Jika menggunakan):
- [ ] `SUPABASE_URL` - URL Supabase project
- [ ] `SUPABASE_KEY` - Supabase anon key
- [ ] `SUPABASE_BUCKET` - Nama bucket untuk storage

### 5. Debugging

#### Cek Server Logs:
1. Buka dashboard platform deployment
2. Lihat logs saat server startup
3. Cari pesan:
   - `✅ MongoDB terhubung` = Database terhubung
   - `❌ Gagal menghubungkan ke MongoDB` = Ada masalah koneksi

#### Test Koneksi Database:
Setelah login Google, cek logs untuk:
```
Mencari user dengan googleId: ... atau email: ...
User ditemukan: Ya/Tidak
User baru, membuat user baru...
✅ User baru berhasil dibuat dengan ID: ...
✅ Login Google berhasil untuk user: ...
```

#### Jika User Tidak Tersimpan:
1. Cek apakah ada error di logs saat `user.save()`
2. Pastikan MongoDB Atlas IP whitelist mengizinkan semua IP (0.0.0.0/0) untuk testing
3. Pastikan username dan password MongoDB benar

### 6. Common Issues

#### Issue: "MONGODB_URI belum diatur"
**Solusi:** Set environment variable `MONGODB_URI` di platform deployment

#### Issue: "Format MONGODB_URI tidak valid"
**Solusi:** 
- Pastikan connection string dimulai dengan `mongodb://` atau `mongodb+srv://`
- Jangan include `MONGODB_URI=` di value

#### Issue: "Server Selection Timeout"
**Solusi:**
- Cek IP whitelist di MongoDB Atlas
- Pastikan network connection ke MongoDB Atlas tidak diblokir
- Cek apakah username/password benar

#### Issue: "Authentication failed"
**Solusi:**
- Pastikan username dan password MongoDB benar
- Pastikan user memiliki permission untuk database
- Cek apakah password mengandung karakter khusus yang perlu di-encode

### 7. MongoDB Atlas Setup

Jika menggunakan MongoDB Atlas:

1. **Buat Database User:**
   - Buka MongoDB Atlas dashboard
   - Network Access → Add IP Address
   - Untuk testing, gunakan `0.0.0.0/0` (allow all)
   - Database Access → Add New Database User
   - Set username dan password

2. **Dapatkan Connection String:**
   - Klik "Connect" pada cluster
   - Pilih "Connect your application"
   - Copy connection string
   - Ganti `<password>` dengan password user
   - Ganti `<database-name>` dengan nama database

3. **Set di Environment Variable:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
   ```

### 8. Verifikasi Data Tersimpan

Setelah login berhasil:
1. Buka MongoDB Atlas dashboard atau MongoDB Compass
2. Connect ke database
3. Cek collection `users`
4. Pastikan user baru muncul dengan:
   - `email`: Email dari Google
   - `googleId`: Google ID
   - `provider`: "google"
   - `isVerified`: true

## Testing

Setelah setup:
1. Restart server di platform deployment
2. Cek logs untuk konfirmasi koneksi database
3. Coba login dengan Google
4. Cek logs untuk konfirmasi user tersimpan
5. Verifikasi di MongoDB bahwa user muncul

## Support

Jika masih mengalami masalah:
1. Cek server logs untuk error messages
2. Verifikasi `MONGODB_URI` format benar
3. Test connection string di MongoDB Compass
4. Pastikan semua environment variables sudah di-set
5. Restart server setelah mengubah environment variables

