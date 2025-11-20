# 🔧 Fix CORS Error di Render

## Masalah

Error yang muncul:
```
Error: Not allowed by CORS
    at origin (file:///opt/render/project/src/server/src/app.js:45:16)
```

## Penyebab

CORS error terjadi karena:
1. **FRONTEND_URL environment variable belum di-set** di Render dashboard
2. **Origin frontend tidak ada** di daftar allowed origins
3. **Format URL tidak sesuai** (dengan/tanpa trailing slash)

## ✅ Solusi

### Step 1: Set Environment Variable di Render

1. **Buka Render Dashboard**
   - Login ke [render.com](https://render.com)
   - Pilih service backend Anda (`madu-server`)

2. **Tambahkan Environment Variable**
   - Klik tab **Environment**
   - Klik **Add Environment Variable**
   - Tambahkan variable berikut:

   | Key | Value | Contoh |
   |-----|-------|--------|
   | `FRONTEND_URL` | URL frontend Anda | `https://your-app.vercel.app` |

   **Penting:**
   - Jika frontend di Vercel, gunakan URL lengkap: `https://your-app.vercel.app`
   - Jika ada multiple frontend, pisahkan dengan koma: `https://app1.vercel.app,https://app2.vercel.app`
   - **JANGAN** tambahkan trailing slash di akhir URL
   - **JANGAN** tambahkan `/api` di akhir URL

3. **Pastikan Environment Variables Lainnya Juga Sudah Di-Set**

   | Key | Value | Required |
   |-----|-------|----------|
   | `NODE_ENV` | `production` | ✅ Yes |
   | `PORT` | `5000` | ✅ Yes |
   | `MONGODB_URI` | MongoDB connection string | ✅ Yes |
   | `JWT_SECRET` | JWT secret key | ✅ Yes |
   | `GOOGLE_CLIENT_ID` | Google OAuth Client ID | ✅ Yes |
   | `FRONTEND_URL` | Frontend URL | ✅ Yes |
   | `ADMIN_EMAILS` | Admin emails (comma separated) | ⚠️ Optional |
   | `SUPABASE_URL` | Supabase URL | ⚠️ Optional |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase key | ⚠️ Optional |

### Step 2: Restart Service

Setelah menambahkan environment variables:
1. Klik **Manual Deploy** → **Deploy latest commit**
2. Atau tunggu auto-deploy jika sudah connect ke GitHub

### Step 3: Verifikasi

1. **Cek Logs di Render**
   - Buka tab **Logs** di Render dashboard
   - Cari pesan: `CORS Check - Allowed Origins:`
   - Pastikan frontend URL Anda ada di daftar

2. **Test dari Browser Console**
   ```javascript
   fetch('https://madu-server.onrender.com/api/health')
     .then(r => r.json())
     .then(console.log)
   ```

3. **Test dari Frontend**
   - Buka frontend Anda
   - Buka browser console (F12)
   - Coba login atau fetch data
   - Seharusnya tidak ada CORS error lagi

## 🔍 Debugging

### Cek Environment Variables

Di Render dashboard, pastikan semua environment variables sudah benar:

```bash
# Di Render Logs, Anda bisa cek dengan:
echo $FRONTEND_URL
```

### Cek CORS Logs

Setelah update, cek logs di Render. Anda akan melihat:
```
CORS Check - Origin: https://your-app.vercel.app
CORS Check - Allowed Origins: [array of allowed origins]
```

Jika origin tidak ada di allowed origins, akan muncul:
```
CORS Error - Origin not allowed: https://your-app.vercel.app
CORS Error - Allowed origins: [...]
CORS Error - FRONTEND_URL env: https://your-app.vercel.app
```

### Common Mistakes

❌ **SALAH:**
```env
FRONTEND_URL=https://your-app.vercel.app/
FRONTEND_URL=https://your-app.vercel.app/api
FRONTEND_URL=http://your-app.vercel.app  # HTTP instead of HTTPS
```

✅ **BENAR:**
```env
FRONTEND_URL=https://your-app.vercel.app
```

## 📝 Contoh Konfigurasi Lengkap

### Render Environment Variables

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/madu_db?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here_minimal_32_characters
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
FRONTEND_URL=https://madu-margolestari.vercel.app
ADMIN_EMAILS=admin@madumargolestari.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Vercel Environment Variables (Frontend)

```env
VITE_API_URL=https://madu-server.onrender.com/api
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
VITE_ADMIN_EMAILS=admin@madumargolestari.com
```

## 🚨 Masih Error?

### 1. Clear Browser Cache
- Clear cache dan cookies
- Hard refresh (Ctrl+Shift+R atau Cmd+Shift+R)

### 2. Check Google Cloud Console
- Pastikan frontend URL sudah ditambahkan di **Authorized JavaScript origins**
- Pastikan backend URL sudah ditambahkan juga

### 3. Check Network Tab
- Buka browser DevTools → Network tab
- Lihat request yang gagal
- Cek header `Origin` dan `Access-Control-Allow-Origin`

### 4. Test dengan curl
```bash
curl -H "Origin: https://your-app.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://madu-server.onrender.com/api/health
```

Seharusnya mendapat response dengan header:
```
Access-Control-Allow-Origin: https://your-app.vercel.app
```

## 📞 Support

Jika masih mengalami masalah:
1. Cek logs di Render dashboard
2. Cek browser console untuk error details
3. Pastikan semua environment variables sudah benar
4. Pastikan frontend dan backend sudah di-deploy dengan benar

---

**Last Updated**: 2024

