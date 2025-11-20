# 🔍 Setup Google Search Console & Google Analytics

## Masalah

Error verifikasi: "Kami tidak dapat menemukan kode pelacakan Google Analytics apa pun di halaman indeks situs Anda."

## ✅ Solusi

### Opsi 1: Tambahkan Google Analytics (Recommended)

#### Step 1: Dapatkan Google Analytics Tracking ID

1. Buka [Google Analytics](https://analytics.google.com/)
2. Buat property baru atau pilih property yang sudah ada
3. Dapatkan **Measurement ID** (format: `G-XXXXXXXXXX`)

#### Step 2: Tambahkan Kode ke Website

Kode Google Analytics sudah ditambahkan ke `index.html`. Pastikan `GA_MEASUREMENT_ID` sudah di-set di environment variable atau ganti langsung di file.

#### Step 3: Deploy & Verifikasi

1. Commit dan push perubahan
2. Deploy ke Vercel
3. Tunggu 5-10 menit
4. Kembali ke Google Search Console
5. Klik **Verifikasi ulang**

### Opsi 2: Gunakan Meta Tag (Lebih Mudah)

Jika sudah ada meta tag Google Site Verification di `index.html`, gunakan metode ini:

1. **Buka Google Search Console**
2. **Pilih metode verifikasi: HTML tag**
3. **Copy meta tag** yang diberikan Google
4. **Tambahkan ke `index.html`** (sudah ada: `google-site-verification`)
5. **Deploy** dan **Verifikasi**

### Opsi 3: Upload HTML File

1. **Download file HTML** dari Google Search Console
2. **Upload ke folder `public/`** di project
3. **Deploy** dan **Verifikasi**

## 📝 Konfigurasi Lengkap

### File: `madu/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Google Site Verification -->
    <meta name="google-site-verification" content="Yof07KIu_7H52rOfgR-ikc_YywqERRWKaQmXTL9JR5E" />
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    </script>
    
    <meta name="description" content="Madu Margolestari - Platform E-Commerce Modern untuk UMKM Madu dengan Produk Berkualitas Tinggi" />
    <title>Madu Margolestari - UMKM Honey E-Commerce</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**PENTING**: Ganti `GA_MEASUREMENT_ID` dengan Measurement ID Anda (format: `G-XXXXXXXXXX`)

## 🚀 Langkah-Langkah Setup

### 1. Setup Google Analytics

1. Buka [Google Analytics](https://analytics.google.com/)
2. Klik **Admin** (ikon gear)
3. Klik **Create Property**
4. Isi informasi property:
   - Property name: `Madu Margolestari`
   - Time zone: `(GMT+07:00) Jakarta`
   - Currency: `IDR`
5. Klik **Next** → **Next** → **Create**
6. Pilih **Web** platform
7. Isi Website URL: `https://madumargolestari.vercel.app`
8. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Tambahkan ke Website

**Opsi A: Hardcode (Simple)**
- Ganti `GA_MEASUREMENT_ID` di `index.html` dengan Measurement ID Anda
- Commit dan deploy

**Opsi B: Environment Variable (Recommended)**
- Tambahkan ke `.env`:
  ```env
  VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```
- Update `index.html` untuk membaca dari env variable

### 3. Setup Google Search Console

1. Buka [Google Search Console](https://search.google.com/search-console)
2. Klik **Add Property**
3. Pilih **URL prefix**
4. Masukkan: `https://madumargolestari.vercel.app`
5. Pilih metode verifikasi:
   - **HTML tag** (gunakan meta tag yang sudah ada)
   - **Google Analytics** (setelah menambahkan GA code)
   - **HTML file** (upload file ke public/)
6. Klik **Verifikasi**

### 4. Deploy & Verifikasi

1. **Commit perubahan:**
   ```bash
   git add madu/index.html
   git commit -m "Add Google Analytics and Search Console verification"
   git push
   ```

2. **Deploy di Vercel:**
   - Tunggu auto-deploy atau trigger manual deploy
   - Pastikan deployment berhasil

3. **Tunggu 5-10 menit** untuk Google crawl website

4. **Verifikasi di Google Search Console:**
   - Klik **Verifikasi** atau **Verifikasi ulang**
   - Seharusnya berhasil

## 🔍 Verifikasi Kode Ter-Deploy

### Test Google Analytics

1. Buka website: `https://madumargolestari.vercel.app`
2. Buka **Browser DevTools** (F12)
3. Tab **Network**
4. Filter: `gtag` atau `analytics`
5. Seharusnya ada request ke `googletagmanager.com`

### Test Meta Tag

1. Buka website: `https://madumargolestari.vercel.app`
2. Klik kanan → **View Page Source**
3. Cari: `google-site-verification`
4. Seharusnya ada meta tag dengan content yang benar

## 📚 Referensi

- [Google Analytics Setup](https://support.google.com/analytics/answer/9304153)
- [Google Search Console Setup](https://support.google.com/webmasters/answer/9008080)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Last Updated**: 2024

