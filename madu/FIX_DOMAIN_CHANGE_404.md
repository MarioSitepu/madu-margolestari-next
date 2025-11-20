# 🔧 Fix 404 Setelah Mengubah Nama Domain di Vercel

## Masalah

Setelah mengubah nama domain/project di Vercel, deployment domain (`*.vercel.app`) menjadi 404.

## Penyebab

Mengubah nama project atau domain di Vercel bisa menyebabkan:
1. Deployment domain berubah
2. Konfigurasi routing perlu di-refresh
3. Build cache perlu di-clear

## ✅ Solusi Cepat

### Step 1: Verifikasi Project Name

1. **Buka Vercel Dashboard**
   - Login ke [vercel.com](https://vercel.com)
   - Pilih project Anda

2. **Cek Project Name**
   - **Settings** → **General**
   - Lihat **Project Name**
   - Pastikan nama project sudah benar

3. **Cek Deployment Domain**
   - **Settings** → **General**
   - Scroll ke **Domains**
   - Lihat **Vercel Domain** (seharusnya `madumargolestari.vercel.app`)

### Step 2: Clear Cache & Redeploy

1. **Clear Build Cache**
   - **Settings** → **General**
   - Scroll ke bawah → **Clear Build Cache**
   - Klik **Clear** → Konfirmasi

2. **Redeploy Project**
   - **Deployments** tab
   - Klik **Deploy** → **Deploy latest commit**
   - Atau klik **...** pada deployment terbaru → **Redeploy**

3. **Tunggu Deploy Selesai**
   - Monitor di tab **Deployments**
   - Pastikan status **Ready** (hijau)

### Step 3: Verifikasi vercel.json

1. **Cek File Di GitHub**
   - Pastikan `madu/vercel.json` ada di repository
   - Pastikan isinya benar:
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

2. **Cek Di Deployment**
   - Setelah deploy selesai
   - Buka: `https://madumargolestari.vercel.app/vercel.json`
   - Seharusnya muncul isi JSON
   - Jika 404, berarti file belum ter-deploy

### Step 4: Test

1. **Test Homepage**
   - Buka: `https://madumargolestari.vercel.app/`
   - Seharusnya tidak 404

2. **Test Route**
   - Buka: `https://madumargolestari.vercel.app/product`
   - Refresh (F5)
   - Seharusnya tidak 404

## 🔍 Troubleshooting

### Masih 404 Setelah Redeploy?

#### 1. Cek Root Directory

1. **Settings** → **General**
2. Scroll ke **Root Directory**
3. **PASTIKAN** tertulis: `madu` (bukan kosong)
4. Jika kosong, klik **Edit** → set ke `madu` → **Save**
5. Redeploy ulang

#### 2. Cek Build Settings

1. **Settings** → **General** → **Build & Development Settings**
2. Pastikan:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### 3. Cek Build Logs

1. Klik deployment terbaru
2. Klik **Build Logs**
3. Pastikan:
   - Build berhasil (tidak ada error)
   - Output directory = `dist`
   - File `vercel.json` terdeteksi

#### 4. Force New Deployment

Jika masih error, coba buat deployment baru:

1. **Deployments** tab
2. Klik **Deploy** → **Deploy latest commit**
3. Atau buat commit kosong untuk trigger deploy:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

### Domain Berubah Setelah Rename?

Jika deployment domain berubah setelah rename project:

1. **Settings** → **General**
2. Lihat **Vercel Domain**
3. Gunakan domain yang baru (jika berbeda)
4. Atau rename project kembali ke nama yang diinginkan

### Error: "Project not found"

**Penyebab**: Project name berubah atau project dihapus

**Solusi**:
1. Cek apakah project masih ada di Vercel Dashboard
2. Jika tidak ada, buat project baru dan connect ke repository yang sama
3. Set Root Directory = `madu`
4. Deploy

## 📝 Checklist

- [ ] Project name sudah benar di Vercel Settings
- [ ] Root Directory = `madu`
- [ ] Build Settings sudah benar (Vite, dist, npm run build)
- [ ] File `vercel.json` ada di `madu/vercel.json`
- [ ] File sudah di-commit dan push ke GitHub
- [ ] Build cache sudah di-clear
- [ ] Sudah redeploy setelah clear cache
- [ ] Test `/` - tidak 404
- [ ] Test `/product` - tidak 404

## 🎯 Langkah-Langkah Lengkap

```bash
# 1. Pastikan file sudah di-commit
cd madu
git add vercel.json
git commit -m "Ensure vercel.json is deployed"
git push

# 2. Di Vercel Dashboard:
# - Settings → General → Clear Build Cache
# - Deployments → Deploy → Deploy latest commit
# - Tunggu deploy selesai
# - Test: https://madumargolestari.vercel.app/
```

## ⚠️ Catatan Penting

- **Jangan sering mengubah project name** - bisa menyebabkan masalah routing
- **Selalu clear cache** setelah mengubah project settings
- **Redeploy** setelah mengubah konfigurasi penting
- **Test** setelah setiap perubahan

---

**Last Updated**: 2024

