# ✅ Checklist Deploy vercel.json untuk Fix 404

## 🔴 Masalah Saat Ini
Middleware Vercel mengembalikan 404 untuk route `/product`, yang berarti `vercel.json` belum terdeteksi atau belum ter-deploy.

## ✅ Langkah-langkah Fix

### Step 1: Pastikan File Sudah Di-Commit

```bash
# Di terminal, jalankan:
cd madu
git status
```

Pastikan `vercel.json` muncul di "Changes to be committed" atau sudah di-commit.

Jika belum:
```bash
git add vercel.json
git commit -m "Add vercel.json for SPA routing"
git push
```

### Step 2: Verifikasi File Di GitHub

1. Buka repository GitHub Anda
2. Masuk ke folder `madu/`
3. Pastikan file `vercel.json` ada di sana
4. Klik file tersebut dan pastikan isinya:
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

### Step 3: Verifikasi Root Directory di Vercel

1. Buka Vercel Dashboard
2. Pilih project `madumargolestari`
3. Settings → General
4. Scroll ke **Root Directory**
5. **PASTIKAN** tertulis: `madu` (bukan kosong, bukan root)
6. Jika kosong atau salah, klik **Edit** dan set ke `madu`
7. Klik **Save**

### Step 4: Clear Cache & Redeploy

1. Di Vercel Dashboard → Settings → General
2. Scroll ke bawah → **Clear Build Cache**
3. Klik **Clear** (konfirmasi jika diminta)
4. Kembali ke tab **Deployments**
5. Klik **Deploy** → **Deploy latest commit**
6. **ATAU** klik **...** pada deployment terbaru → **Redeploy**

### Step 5: Monitor Build Logs

1. Klik deployment yang sedang berjalan
2. Klik tab **Build Logs**
3. Pastikan:
   - Build berhasil (tidak ada error)
   - File `vercel.json` terdeteksi
   - Output directory = `dist`

### Step 6: Verifikasi Setelah Deploy

Setelah deployment selesai (status = Ready):

1. Buka: `https://madumargolestari.vercel.app/product`
2. Refresh halaman (F5)
3. Seharusnya **TIDAK** muncul 404 lagi

## 🔍 Troubleshooting

### Masih 404 Setelah Deploy?

#### 1. Cek File Di Deployment

Di Vercel Dashboard:
- Klik deployment terbaru
- Klik **View Function Logs** atau **Runtime Logs**
- Cari apakah ada error terkait `vercel.json`

#### 2. Test File vercel.json

Buat file test untuk memastikan Vercel membaca konfigurasi:

```bash
# Di folder madu/, buat file test
echo '{"test": "vercel-config"}' > test-vercel.json
git add test-vercel.json
git commit -m "Test vercel config"
git push
```

Setelah deploy, cek apakah file `test-vercel.json` ada di deployment.

#### 3. Cek Build Output

Di Build Logs, pastikan:
```
> madu@0.0.0 build
> tsc -b && vite build
```

Output directory harus `dist/` dan berisi:
- `index.html`
- `assets/` folder
- File lainnya

#### 4. Manual Test vercel.json

Coba akses langsung:
- `https://madumargolestari.vercel.app/vercel.json`

Jika file terdeteksi, akan muncul isi JSON. Jika 404, berarti file tidak ter-deploy.

### Alternatif: Gunakan _redirects File

Jika `vercel.json` masih tidak bekerja, gunakan file `_redirects`:

1. File sudah dibuat di `madu/public/_redirects`
2. Isi: `/*    /index.html   200`
3. Commit dan push
4. Redeploy

File `_redirects` akan otomatis di-copy ke `dist/` saat build.

## 📝 Checklist Final

- [ ] File `vercel.json` ada di `madu/vercel.json`
- [ ] File sudah di-commit dan push ke GitHub
- [ ] File terlihat di GitHub repository
- [ ] Root Directory di Vercel = `madu`
- [ ] Build cache sudah di-clear
- [ ] Sudah redeploy setelah perubahan
- [ ] Build logs tidak ada error
- [ ] Test `/product` - tidak 404
- [ ] Test route lain - tidak 404

## 🚨 Jika Masih Error

Jika setelah semua langkah di atas masih error:

1. **Screenshot Build Logs** dari Vercel
2. **Screenshot Settings** (Root Directory section)
3. **Screenshot GitHub** (folder madu/ dengan vercel.json)
4. Kirim ke support atau buat issue

---

**Last Updated**: 2024

