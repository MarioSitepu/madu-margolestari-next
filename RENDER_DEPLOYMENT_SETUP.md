# 🚀 RENDER DEPLOYMENT GUIDE - merge26nov Branch

## Step 1: Create New Web Service di Render

### 1.1 Go to Render Dashboard
- Buka: https://dashboard.render.com
- Click **"New +"** button di top-right
- Select **"Web Service"**

### 1.2 Connect GitHub Repository
- Click **"Connect account"** (atau login jika belum)
- Select repository: **MarioSitepu/madu-margolestari-next**
- Click **"Connect"**

### 1.3 Select Branch & Settings
```
Name: madu-server-staging (atau nama lain)
Region: Singapore (closest to Indonesia)
Branch: merge26nov ← IMPORTANT! Pilih branch ini
Runtime: Node
```

---

## Step 2: Build & Start Commands

### 2.1 Build Command
```bash
npm install
```
Atau jika ingin di-run di folder server:
```bash
cd server && npm install
```

### 2.2 Start Command
```bash
node server/src/index.js
```

### 2.3 Root Directory (jika di-tanya)
```
server
```
Atau kosongkan jika ingin root project.

---

## Step 3: Environment Variables - PENTING ⚠️

Click **"Advanced"** atau **"Environment"** tab dan set ini:

### Required Variables:

#### 1. **DATABASE CONNECTION**
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```
- Ambil dari MongoDB Atlas connection string Anda
- Pastikan IP address Render di-whitelist di MongoDB Atlas

#### 2. **JWT SECRET**
```
JWT_SECRET = your-super-secret-jwt-key-here-make-it-long-and-random
```
- Generate random string, contoh:
```
JWT_SECRET = sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

#### 3. **NODE ENVIRONMENT**
```
NODE_ENV = production
```

#### 4. **PORT (Optional - Render auto-assign)**
```
PORT = 10000
```
Atau biarkan kosong, Render akan auto-assign.

#### 5. **FRONTEND URL (Untuk CORS)**
```
FRONTEND_URL = https://your-frontend-url.vercel.app, http://localhost:3000, http://localhost:5173
```
- Pisahkan dengan koma jika multiple URLs
- Ini penting untuk allow CORS dari frontend
- Contoh jika deploy ke Vercel:
```
FRONTEND_URL = https://madu-margo-lestari.vercel.app
```

#### 6. **GOOGLE OAUTH (Jika pakai)**
```
GOOGLE_CLIENT_ID = your-google-client-id
GOOGLE_CLIENT_SECRET = your-google-client-secret
GOOGLE_CALLBACK_URL = https://your-render-service-url/api/auth/google/callback
```

#### 7. **SUPABASE (Untuk image upload)**
```
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_KEY = your-supabase-anon-key
```

#### 8. **EMAIL SERVICE (Optional)**
```
EMAIL_SERVICE = gmail (atau service lain)
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = your-app-password
```

---

## Step 4: Complete Environment Variables Template

Copy-paste ke Render environment variables:

```
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/madu?retryWrites=true&w=majority

# JWT
JWT_SECRET=sk-proj-your-very-long-random-secret-key-at-least-32-characters

# Environment
NODE_ENV=production
PORT=10000

# Frontend CORS
FRONTEND_URL=https://madumargolestari.vercel.app,https://madu-staging.vercel.app,http://localhost:3000,http://localhost:5173

# Google OAuth (jika pakai)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://madu-server-staging.render.com/api/auth/google/callback

# Supabase (untuk image upload)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key

# Email (optional)
EMAIL_SERVICE=gmail
EMAIL_USER=noreply@madumargolestari.com
EMAIL_PASS=your-email-app-password
```

---

## Step 5: Deploy Configuration

### 5.1 Auto-Deploy Settings
- ✅ **Auto-Deploy**: ON (Automatic redeploy on git push)
- ✅ **Branch**: merge26nov

### 5.2 Instance Type
- **Plan**: Free (atau Starter/Standard sesuai kebutuhan)
- **Auto Scaling**: Disabled (untuk free plan)

### 5.3 Health Check
- URL: `/api/health` ← Backend sudah punya endpoint ini
- Interval: 300 seconds
- Timeout: 30 seconds

---

## Step 6: Click "Create Web Service"

Render akan:
1. ✅ Clone repository
2. ✅ Checkout branch `merge26nov`
3. ✅ Install dependencies (npm install)
4. ✅ Start server dengan command yang ditentukan
5. ✅ Auto-redeploy setiap kali ada push ke `merge26nov`

**Expected Deployment Time**: 3-5 minutes

---

## Step 7: Verify Deployment

Setelah deploy selesai:

### 7.1 Test Health Endpoint
```bash
curl https://your-service-name.render.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-29T12:00:00Z"
}
```

### 7.2 Test Products Endpoint
```bash
curl https://your-service-name.render.com/api/products
```

### 7.3 Test Admin Settings Endpoint
```bash
curl https://your-service-name.render.com/api/admin/general-settings
```

Expected response:
```json
{
  "_id": "...",
  "operatingYears": 10,
  "whatsappNumber": "6287888888888",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Step 8: Frontend Configuration

Update frontend `.env` file di `madu/` folder:

### Before (localhost):
```
VITE_API_URL=http://localhost:5000/api
```

### After (Render):
```
VITE_API_URL=https://your-service-name.render.com/api
```

Then redeploy frontend:
```bash
npm run build
git add .
git commit -m "chore: update API URL to Render service"
git push origin merge26nov
```

---

## Step 9: Monitoring & Logs

### View Logs
- Go to your service di Render dashboard
- Click **"Logs"** tab
- Monitor untuk errors atau warnings

### Common Issues:

#### ❌ "MONGODB_URI not set"
- Solution: Check environment variable setting di Render
- Verify MONGODB_URI adalah valid MongoDB connection string
- Check MongoDB Atlas IP whitelist

#### ❌ "Port already in use"
- Solution: Render auto-assign port, jangan hard-code
- atau set PORT environment variable

#### ❌ "CORS Error"
- Solution: Add frontend URL ke FRONTEND_URL env var
- Format: `https://domain.com,http://localhost:3000`

#### ❌ "Cannot find module 'dotenv'"
- Solution: npm install harus berjalan
- Check build logs

---

## Step 10: Test All Features

### Test WhatsApp Checkout Endpoint
```bash
curl https://your-service-name.render.com/api/admin/general-settings

# Expected to return WhatsApp number yang bisa dipakai di checkout
```

### Test Shipping Settings Endpoint
```bash
curl https://your-service-name.render.com/api/admin/shipping-settings

# Expected to return shipping cost
```

### Test Image Upload Endpoint
```bash
curl -X POST https://your-service-name.render.com/api/products/upload-image \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg"
```

---

## ✅ Checklist Sebelum Deploy

- [ ] GitHub account connected ke Render
- [ ] Select repo: MarioSitepu/madu-margolestari-next
- [ ] Select branch: merge26nov
- [ ] Build command: `npm install`
- [ ] Start command: `node server/src/index.js`
- [ ] MONGODB_URI set dengan valid connection string
- [ ] JWT_SECRET di-set dengan random key
- [ ] NODE_ENV = production
- [ ] FRONTEND_URL set dengan domain frontend Anda
- [ ] SUPABASE credentials set (jika image upload)
- [ ] Health check URL: /api/health
- [ ] Auto-deploy enabled
- [ ] Region dipilih (Singapore)

---

## 📝 Configuration Summary

| Setting | Value |
|---------|-------|
| **Repository** | MarioSitepu/madu-margolestari-next |
| **Branch** | merge26nov |
| **Runtime** | Node.js |
| **Root Directory** | server (atau project root) |
| **Build Command** | npm install |
| **Start Command** | node server/src/index.js |
| **Health Check** | /api/health |
| **Auto-Deploy** | Enabled |
| **Region** | Singapore |
| **Plan** | Free / Starter |

---

## 🎯 Expected Result

Setelah deployment berhasil:

✅ Server berjalan di: `https://your-service-name.render.com`
✅ Health endpoint accessible: `/api/health`
✅ Products endpoint working: `/api/products`
✅ Admin settings endpoints working: `/api/admin/general-settings` & `/api/admin/shipping-settings`
✅ Image upload functional: `/products/upload-image`
✅ Auto-redeploy on merge26nov push

---

## 🚀 Next Steps

1. **Deploy** Web Service mengikuti panduan ini
2. **Update** frontend `.env` dengan Render service URL
3. **Test** semua endpoints
4. **Monitor** logs untuk errors
5. **Deploy** frontend ke Vercel/hosting Anda

---

**Status**: Ready to Deploy 🎉
**Branch**: merge26nov
**Date**: Nov 29, 2025
