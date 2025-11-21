# Fix: Duplikasi Path di URL API

## Masalah
URL yang digunakan menunjukkan duplikasi path:
```
https://madu-server.onrender.com/auth/google/auth/google
```

## Penyebab
`VITE_API_URL` kemungkinan di-set dengan path yang sudah termasuk endpoint, atau tidak dinormalisasi dengan benar.

## Solusi

### 1. Update Environment Variable di Platform Deployment

Di Vercel/Netlify/dll, set `VITE_API_URL` dengan salah satu format berikut:

**Format 1 (Recommended - tanpa /api):**
```env
VITE_API_URL=https://madu-server.onrender.com
```

**Format 2 (Dengan /api - juga OK):**
```env
VITE_API_URL=https://madu-server.onrender.com/api
```

**JANGAN gunakan format ini (akan menyebabkan duplikasi):**
```env
❌ VITE_API_URL=https://madu-server.onrender.com/auth/google
❌ VITE_API_URL=https://madu-server.onrender.com/api/auth/google
```

### 2. Utility Function Baru

Saya sudah membuat utility function di `madu/src/lib/api.ts` yang akan:
- Normalisasi URL secara otomatis
- Memastikan URL selalu berakhir dengan `/api`
- Menghindari duplikasi path
- Menghapus trailing slash

### 3. Cara Kerja

Utility function `buildApiUrl()` akan:
1. Mengambil `VITE_API_URL` dari environment variable
2. Normalisasi URL (hapus trailing slash, pastikan ada `/api`)
3. Menambahkan endpoint yang diminta
4. Mengembalikan URL lengkap yang benar

Contoh:
- Input: `VITE_API_URL=https://madu-server.onrender.com`, endpoint: `/auth/google`
- Output: `https://madu-server.onrender.com/api/auth/google`

- Input: `VITE_API_URL=https://madu-server.onrender.com/api`, endpoint: `/auth/google`
- Output: `https://madu-server.onrender.com/api/auth/google`

### 4. Langkah Deployment

1. **Update Environment Variable:**
   - Buka platform deployment (Vercel/Netlify)
   - Edit environment variable `VITE_API_URL`
   - Set sebagai: `https://madu-server.onrender.com` (tanpa /api)
   - Atau: `https://madu-server.onrender.com/api` (dengan /api)

2. **Redeploy:**
   - Setelah mengubah environment variable, **WAJIB redeploy**
   - Environment variable hanya di-load saat build time
   - Perubahan tidak akan berlaku tanpa rebuild

3. **Verifikasi:**
   - Buka browser console
   - Coba login dengan Google
   - Cek log: "Full endpoint: https://madu-server.onrender.com/api/auth/google"
   - Pastikan tidak ada duplikasi path

### 5. Checklist

- [ ] `VITE_API_URL` di-set sebagai `https://madu-server.onrender.com` atau `https://madu-server.onrender.com/api`
- [ ] **TIDAK** include path seperti `/auth/google` di `VITE_API_URL`
- [ ] Sudah redeploy setelah mengubah environment variable
- [ ] Browser console menunjukkan URL yang benar (tanpa duplikasi)
- [ ] Login Google berhasil

### 6. Testing

Setelah update, test dengan:
1. Buka browser console
2. Coba login dengan Google
3. Cek log untuk melihat URL yang digunakan
4. Pastikan URL adalah: `https://madu-server.onrender.com/api/auth/google`
5. Bukan: `https://madu-server.onrender.com/auth/google/auth/google`

## Catatan Penting

- Environment variable di Vite hanya di-load saat **build time**
- Setelah mengubah environment variable, **WAJIB rebuild/redeploy**
- URL yang benar untuk backend Anda: `https://madu-server.onrender.com/api/auth/google`

