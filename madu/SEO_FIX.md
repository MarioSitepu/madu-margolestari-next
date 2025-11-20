# 🔍 Fix SEO Issues - robots.txt & sitemap.xml

## Masalah

Lighthouse SEO check menunjukkan error:
- `robots.txt is not valid` - File robots.txt malah mengembalikan HTML
- Crawlers tidak bisa mengakses robots.txt dengan benar

## Penyebab

Konfigurasi `vercel.json` mengarahkan **semua** request ke `index.html`, termasuk request ke `/robots.txt` dan `/sitemap.xml`.

## ✅ Solusi

### File yang Sudah Dibuat

1. **`madu/public/robots.txt`** - File robots.txt yang benar
2. **`madu/public/sitemap.xml`** - Sitemap untuk SEO
3. **`madu/vercel.json`** - Diperbaiki untuk mengecualikan file statis

### Step 1: Commit dan Deploy

```bash
git add madu/public/robots.txt madu/public/sitemap.xml madu/vercel.json
git commit -m "Add robots.txt and sitemap.xml for SEO"
git push
```

### Step 2: Deploy di Vercel

1. **Vercel Dashboard:**
   - Tunggu auto-deploy atau trigger manual deploy
   - Pastikan deployment berhasil

### Step 3: Verifikasi

1. **Test robots.txt:**
   - Buka: `https://madumargolestari.vercel.app/robots.txt`
   - Seharusnya muncul isi robots.txt (bukan HTML)

2. **Test sitemap.xml:**
   - Buka: `https://madumargolestari.vercel.app/sitemap.xml`
   - Seharusnya muncul XML sitemap

3. **Test Lighthouse lagi:**
   - Buka Chrome DevTools → Lighthouse
   - Run SEO audit
   - Error robots.txt seharusnya hilang

## 📝 Isi File

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://madumargolestari.vercel.app/sitemap.xml
```

### sitemap.xml

File sitemap sudah dibuat dengan halaman utama. Anda bisa update sesuai kebutuhan.

### vercel.json

Konfigurasi sudah diperbaiki untuk:
- ✅ Mengizinkan akses ke `/robots.txt`
- ✅ Mengizinkan akses ke `/sitemap.xml`
- ✅ Mengizinkan akses ke file statis (assets, images, dll)
- ✅ Mengarahkan route lain ke `index.html` (untuk SPA routing)

## 🔍 Troubleshooting

### robots.txt Masih Error?

1. **Cek file ter-deploy:**
   - Buka: `https://madumargolestari.vercel.app/robots.txt`
   - Seharusnya muncul text, bukan HTML

2. **Clear cache & redeploy:**
   - Settings → General → Clear Build Cache
   - Redeploy

3. **Cek vercel.json:**
   - Pastikan routes untuk robots.txt ada di atas
   - Pastikan format JSON valid

### Sitemap Tidak Terdeteksi?

1. **Update sitemap.xml:**
   - Tambahkan semua halaman penting
   - Update `lastmod` date
   - Update URL jika menggunakan custom domain

2. **Submit ke Google Search Console:**
   - Buka Google Search Console
   - Sitemaps → Add new sitemap
   - Masukkan: `sitemap.xml`
   - Submit

## 📚 Referensi

- [robots.txt Specification](https://www.robotstxt.org/)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Vercel Routing](https://vercel.com/docs/configuration#routes)

---

**Last Updated**: 2024

