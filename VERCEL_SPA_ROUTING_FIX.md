# 🔧 Fix 404 Error saat Refresh di Vercel (SPA Routing)

## Masalah

Saat refresh halaman di route seperti `/product`, `/dashboard`, atau `/about`, muncul error 404:
```
404: NOT_FOUND
```

## Penyebab

Vercel mencoba mencari file fisik di path tersebut, padahal routing di-handle oleh React Router di client-side.

## ✅ Solusi

### Step 1: Pastikan `vercel.json` Sudah Ada

File `vercel.json` harus ada di **root folder frontend** (`madu/vercel.json`):

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 2: Commit dan Push ke GitHub

```bash
cd madu
git add vercel.json
git commit -m "Add vercel.json for SPA routing support"
git push
```

### Step 3: Konfigurasi Vercel Project Settings

**PENTING**: Pastikan Root Directory di-set dengan benar!

1. **Buka Vercel Dashboard**
   - Login ke [vercel.com](https://vercel.com)
   - Pilih project Anda

2. **Set Root Directory**
   - Klik **Settings** → **General**
   - Scroll ke **Root Directory**
   - Klik **Edit**
   - Pilih folder `madu` (atau ketik `madu`)
   - Klik **Save**

3. **Verifikasi Build Settings**
   - Klik **Settings** → **General**
   - Scroll ke **Build & Development Settings**
   - Pastikan:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

### Step 4: Redeploy

Setelah mengubah Root Directory:

1. **Manual Deploy**
   - Klik **Deployments** tab
   - Klik **...** (three dots) pada deployment terbaru
   - Pilih **Redeploy**
   - Atau klik **Deploy** → **Deploy latest commit**

2. **Tunggu Deploy Selesai**
   - Monitor di tab **Deployments**
   - Pastikan status **Ready** (hijau)

### Step 5: Test

1. **Buka URL Production**
   - Contoh: `https://madumargolestari.vercel.app/product`

2. **Refresh Halaman**
   - Tekan `F5` atau `Ctrl+R` / `Cmd+R`
   - Seharusnya **TIDAK** muncul 404 lagi

3. **Test Route Lainnya**
   - `/dashboard`
   - `/about`
   - `/article`
   - `/settings`
   - Semua route seharusnya bisa di-refresh tanpa error

## 🔍 Troubleshooting

### Masih Error 404?

#### 1. Cek Root Directory

Pastikan Root Directory di Vercel sudah di-set ke `madu`:
- Settings → General → Root Directory = `madu`

#### 2. Cek File `vercel.json`

Pastikan file ada di `madu/vercel.json` (bukan di root project):
```bash
ls madu/vercel.json
```

Isi file harus:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 3. Cek Build Logs

Di Vercel Dashboard:
- Klik deployment terbaru
- Klik **Build Logs**
- Pastikan tidak ada error
- Pastikan file `vercel.json` terdeteksi

#### 4. Clear Cache

- Di Vercel Dashboard → Settings → General
- Scroll ke bawah → **Clear Build Cache**
- Klik **Clear**
- Redeploy ulang

#### 5. Test Lokal

Test build lokal untuk memastikan tidak ada error:
```bash
cd madu
npm run build
npm run preview
```

Buka `http://localhost:4173/product` dan refresh - seharusnya tidak error.

### Error: "vercel.json not found"

**Penyebab**: Root Directory belum di-set atau salah

**Solusi**:
1. Pastikan Root Directory = `madu` di Vercel Settings
2. Pastikan file `vercel.json` ada di folder `madu/`
3. Commit dan push file `vercel.json`
4. Redeploy

### Error: "Build failed"

**Penyebab**: Build command atau output directory salah

**Solusi**:
1. Settings → General → Build & Development Settings
2. Pastikan:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## 📝 Checklist

- [ ] File `vercel.json` ada di `madu/vercel.json`
- [ ] File sudah di-commit dan push ke GitHub
- [ ] Root Directory di Vercel = `madu`
- [ ] Build Settings sudah benar (Vite, dist, npm run build)
- [ ] Sudah redeploy setelah perubahan
- [ ] Test refresh di route `/product` - tidak error
- [ ] Test refresh di route lain - tidak error

## 🎯 Konfigurasi Lengkap

### Vercel Project Settings

```
Root Directory: madu
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### File Structure

```
project-root/
├── madu/
│   ├── vercel.json  ← File ini harus ada di sini
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
└── server/
```

## 📚 Referensi

- [Vercel SPA Routing](https://vercel.com/docs/configuration#routes)
- [Vercel Rewrites](https://vercel.com/docs/configuration#routes/rewrites)
- [React Router Deployment](https://reactrouter.com/en/main/start/overview#deployment)

---

**Last Updated**: 2024

