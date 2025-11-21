# Fix: Endpoint Tidak Ditemukan saat Login Google di Production

## Masalah
Saat login dengan Google di website yang sudah dideploy, muncul error "Endpoint tidak ditemukan".

## Penyebab
1. **VITE_API_URL tidak di-set dengan benar di production**
2. **URL tidak include `/api` di akhir**
3. **CORS configuration tidak mengizinkan origin production**
4. **Route tidak terdaftar dengan benar**

## Solusi

### 1. Pastikan VITE_API_URL di-set dengan benar

Di platform deployment frontend (Vercel, Netlify, dll), pastikan environment variable `VITE_API_URL` di-set dengan benar:

```env
VITE_API_URL=https://your-backend-url.com/api
```

**PENTING:** URL harus include `/api` di akhir!

Contoh yang BENAR:
- ✅ `https://backend.railway.app/api`
- ✅ `https://api.yourdomain.com/api`
- ✅ `http://localhost:5000/api`

Contoh yang SALAH:
- ❌ `https://backend.railway.app` (tidak ada `/api`)
- ❌ `https://api.yourdomain.com` (tidak ada `/api`)

### 2. Pastikan CORS Configuration di Backend

Di backend, pastikan `FRONTEND_URL` environment variable di-set dengan URL frontend production:

```env
FRONTEND_URL=https://your-frontend-url.vercel.app,https://yourdomain.com
```

Jika menggunakan multiple domain, pisahkan dengan koma.

### 3. Verifikasi Route Terdaftar

Endpoint Google OAuth seharusnya tersedia di:
```
POST /api/auth/google
```

Untuk memverifikasi, cek log server saat request masuk. Logging sudah ditambahkan untuk debugging.

### 4. Test Endpoint

Anda bisa test endpoint dengan curl:

```bash
curl -X POST https://your-backend-url.com/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"credential":"test"}'
```

Jika endpoint tidak ditemukan, akan return 404 dengan message "Endpoint tidak ditemukan".

### 5. Checklist Deployment

#### Frontend (Vercel/Netlify):
- [ ] `VITE_API_URL` di-set dengan benar (include `/api`)
- [ ] `VITE_GOOGLE_CLIENT_ID` di-set dengan benar
- [ ] Environment variables sudah di-redeploy setelah diubah
- [ ] Build ulang setelah mengubah environment variables

#### Backend (Railway/Render/dll):
- [ ] `GOOGLE_CLIENT_ID` di-set dengan benar
- [ ] `FRONTEND_URL` di-set dengan URL frontend production
- [ ] `MONGODB_URI` di-set dengan benar
- [ ] Server sudah restart setelah mengubah environment variables

### 6. Debugging

#### Di Frontend:
Buka browser console dan cek:
1. URL yang digunakan untuk request
2. Error response dari server
3. Network tab untuk melihat request details

#### Di Backend:
Cek server logs untuk:
1. Request path yang masuk
2. CORS errors
3. Route registration

Logging sudah ditambahkan untuk membantu debugging:
- Setiap request akan di-log di production
- 404 errors akan menampilkan path yang diminta
- Google OAuth endpoint akan log ketika di-hit

### 7. Common Issues

#### Issue: "Endpoint tidak ditemukan" tapi route sudah benar
**Solusi:** Pastikan `VITE_API_URL` include `/api` di akhir

#### Issue: CORS error
**Solusi:** Tambahkan frontend URL ke `FRONTEND_URL` di backend

#### Issue: "Network Error"
**Solusi:** 
- Pastikan backend server berjalan
- Pastikan URL backend benar
- Cek firewall/network settings

### 8. Verifikasi Setup

Setelah setup, test dengan:
1. Login dengan Google di production
2. Cek browser console untuk error messages
3. Cek server logs untuk request details
4. Pastikan response berhasil

## Support

Jika masih mengalami masalah:
1. Cek browser console untuk error details
2. Cek server logs untuk request information
3. Verifikasi semua environment variables sudah di-set dengan benar
4. Pastikan URL format benar (include `/api` di akhir)

