# 🔧 Fix: Google OAuth Login - Endpoint Tidak Ditemukan (404)

## Masalah

Error saat login dengan Google: "Endpoint tidak ditemukan" atau 404 error.

## Penyebab

Error 404 terjadi karena:
1. **Backend tidak running** atau tidak bisa diakses
2. **VITE_API_URL salah** atau tidak di-set di environment variables
3. **Backend belum ter-deploy** dengan benar
4. **Route tidak terdaftar** dengan benar di backend

## ✅ Solusi

### Step 1: Cek Backend Server

#### Development (Lokal)

1. **Pastikan backend running:**
   ```bash
   cd server
   npm run dev
   ```

2. **Test endpoint:**
   - Buka: `http://localhost:5000/api/health`
   - Seharusnya muncul: `{"status":"ok"}`

3. **Test Google OAuth endpoint:**
   - Buka: `http://localhost:5000/api/auth/google`
   - Seharusnya muncul error (karena POST, bukan GET), tapi tidak 404

#### Production (Deployed)

1. **Cek backend URL:**
   - Buka: `https://your-backend.railway.app/api/health`
   - Seharusnya muncul: `{"status":"ok"}`

2. **Test Google OAuth endpoint:**
   - Buka: `https://your-backend.railway.app/api/auth/google`
   - Seharusnya tidak 404

### Step 2: Cek Environment Variables

#### Frontend (Vercel)

1. **Buka Vercel Dashboard**
2. **Settings → Environment Variables**
3. **Pastikan ada:**
   - `VITE_API_URL` = `https://your-backend.railway.app/api`
   - `VITE_GOOGLE_CLIENT_ID` = `your-google-client-id`

4. **Jika belum ada, tambahkan:**
   - Klik **Add Environment Variable**
   - Key: `VITE_API_URL`
   - Value: URL backend production Anda
   - Environment: Production, Preview, Development

5. **Redeploy** setelah menambahkan environment variables

#### Backend (Render/Railway)

1. **Buka Dashboard** (Render/Railway)
2. **Environment Variables**
3. **Pastikan ada:**
   - `GOOGLE_CLIENT_ID` = `your-google-client-id`
   - `FRONTEND_URL` = `https://your-frontend.vercel.app`
   - `MONGODB_URI` = MongoDB connection string
   - `JWT_SECRET` = JWT secret key

### Step 3: Verifikasi Route di Backend

1. **Cek file `server/src/app.js`:**
   ```javascript
   app.use('/api/auth', authRouter);
   ```

2. **Cek file `server/src/routes/auth.js`:**
   ```javascript
   router.post('/google', async (req, res) => {
     // ... handler code
   });
   ```

3. **Pastikan route sudah benar:**
   - Route: `POST /api/auth/google`
   - Handler: `router.post('/google', ...)`

### Step 4: Test Endpoint Manual

#### Test dengan curl:

```bash
# Test health endpoint
curl https://your-backend.railway.app/api/health

# Test Google OAuth endpoint (akan error karena tidak ada credential, tapi tidak 404)
curl -X POST https://your-backend.railway.app/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"credential":"test"}'
```

**Jika 404:**
- Backend tidak ter-deploy dengan benar
- Route tidak terdaftar
- URL backend salah

**Jika error lain (400, 500, dll):**
- Endpoint ada, tapi ada masalah lain
- Cek error message untuk detail

### Step 5: Debug di Browser Console

1. **Buka website** di browser
2. **F12 → Console tab**
3. **Coba login dengan Google**
4. **Lihat error di console:**
   - Error 404: Endpoint tidak ditemukan
   - Error Network: Backend tidak bisa diakses
   - Error CORS: CORS configuration salah

5. **F12 → Network tab:**
   - Lihat request ke `/auth/google`
   - Cek status code
   - Cek request URL (apakah benar?)

## 🔍 Troubleshooting

### Error 404 di Production

**Penyebab**: Backend tidak ter-deploy atau route tidak terdaftar

**Solusi**:
1. **Cek deployment backend:**
   - Buka Render/Railway dashboard
   - Cek deployment logs
   - Pastikan build berhasil
   - Pastikan server running

2. **Cek route terdaftar:**
   - Pastikan `app.use('/api/auth', authRouter)` ada di `app.js`
   - Pastikan `router.post('/google', ...)` ada di `routes/auth.js`

3. **Redeploy backend:**
   - Trigger manual deploy
   - Atau push commit baru

### Error 404 di Development

**Penyebab**: Backend tidak running atau port salah

**Solusi**:
1. **Pastikan backend running:**
   ```bash
   cd server
   npm run dev
   ```

2. **Cek port:**
   - Default: `5000`
   - Cek di `.env`: `PORT=5000`

3. **Cek API_URL di frontend:**
   - File `.env`: `VITE_API_URL=http://localhost:5000/api`
   - Restart dev server setelah mengubah `.env`

### VITE_API_URL Salah

**Penyebab**: Environment variable tidak di-set atau salah

**Solusi**:
1. **Development:**
   - File `madu/.env`:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
   - Restart dev server

2. **Production:**
   - Vercel Dashboard → Settings → Environment Variables
   - Set `VITE_API_URL` = URL backend production
   - Redeploy frontend

### Backend Route Tidak Terdaftar

**Penyebab**: Route tidak di-mount di `app.js`

**Solusi**:
1. **Cek `server/src/app.js`:**
   ```javascript
   app.use('/api/auth', authRouter);
   ```

2. **Pastikan import benar:**
   ```javascript
   import authRouter from './routes/auth.js';
   ```

3. **Restart backend server**

## 📝 Checklist

- [ ] Backend server running (development) atau deployed (production)
- [ ] Test `/api/health` - berhasil
- [ ] `VITE_API_URL` sudah di-set di frontend
- [ ] `GOOGLE_CLIENT_ID` sudah di-set di backend
- [ ] Route `/api/auth/google` terdaftar di backend
- [ ] CORS sudah dikonfigurasi dengan benar
- [ ] Frontend sudah redeploy setelah mengubah environment variables
- [ ] Backend sudah redeploy jika ada perubahan

## 🎯 Quick Test

1. **Test Backend:**
   ```
   https://your-backend.railway.app/api/health
   ```
   Seharusnya: `{"status":"ok"}`

2. **Test Frontend API URL:**
   - Buka browser console
   - Ketik: `console.log(import.meta.env.VITE_API_URL)`
   - Seharusnya muncul URL backend yang benar

3. **Test Google OAuth:**
   - Buka halaman login
   - Klik "Sign in with Google"
   - Seharusnya tidak error 404

## 📚 Referensi

- [Google OAuth Setup Guide](./server/GOOGLE_OAUTH_SETUP.md)
- [Troubleshooting Google OAuth](./server/TROUBLESHOOTING_GOOGLE_OAUTH.md)
- [Environment Variables Guide](./ENV_DEPLOYMENT_GUIDE.md)

---

**Last Updated**: 2024

