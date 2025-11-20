# 🔧 Fix 404 Error di Custom Domain Vercel

## Masalah

- ✅ **Deployment domain** (`xxx.vercel.app`) bisa di-refresh dengan benar
- ❌ **Custom domain** (domain utama) tidak bisa di-refresh, masih 404

## Penyebab

Custom domain di Vercel perlu dikonfigurasi ulang atau di-refresh setelah menambahkan `vercel.json` atau mengubah konfigurasi routing.

## ✅ Solusi

### Step 1: Verifikasi Custom Domain di Vercel

1. **Buka Vercel Dashboard**
   - Login ke [vercel.com](https://vercel.com)
   - Pilih project Anda

2. **Cek Domain Settings**
   - Klik **Settings** → **Domains**
   - Pastikan custom domain Anda terdaftar dan statusnya **Valid** (hijau)
   - Jika status **Invalid** atau **Pending**, ikuti instruksi untuk memperbaikinya

### Step 2: Remove dan Add Ulang Custom Domain

**PENTING**: Ini akan menyebabkan downtime singkat (1-2 menit).

1. **Remove Domain**
   - Di **Settings** → **Domains**
   - Klik **...** (three dots) pada custom domain Anda
   - Pilih **Remove**
   - Konfirmasi penghapusan

2. **Add Domain Kembali**
   - Klik **Add Domain**
   - Masukkan custom domain Anda (contoh: `madumargolestari.com`)
   - Klik **Add**
   - Ikuti instruksi untuk verifikasi domain

3. **Tunggu Propagation**
   - Tunggu 1-5 menit untuk DNS propagation
   - Status domain akan berubah menjadi **Valid** (hijau)

### Step 3: Redeploy Setelah Domain Di-Add

Setelah domain di-add kembali:

1. **Redeploy Project**
   - Klik **Deployments** tab
   - Klik **...** pada deployment terbaru
   - Pilih **Redeploy**
   - Atau klik **Deploy** → **Deploy latest commit**

2. **Tunggu Deploy Selesai**
   - Monitor di tab **Deployments**
   - Pastikan status **Ready** (hijau)

### Step 4: Test Custom Domain

1. **Buka Custom Domain**
   - Contoh: `https://madumargolestari.com/product`
   - Atau `https://www.madumargolestari.com/product`

2. **Refresh Halaman**
   - Tekan `F5` atau `Ctrl+R` / `Cmd+R`
   - Seharusnya **TIDAK** muncul 404 lagi

## 🔍 Alternatif: Refresh Domain Tanpa Remove

Jika tidak ingin remove domain, coba langkah ini:

### Option A: Force Redeploy

1. **Settings** → **General**
2. Scroll ke bawah → **Clear Build Cache**
3. Klik **Clear**
4. **Deployments** → **Deploy** → **Deploy latest commit**

### Option B: Update DNS Records

1. **Settings** → **Domains**
2. Klik custom domain Anda
3. Lihat **DNS Configuration**
4. Pastikan semua record sudah benar
5. Jika ada perubahan, update di DNS provider Anda
6. Tunggu 5-10 menit untuk propagation

### Option C: Check Domain Configuration

1. **Settings** → **Domains**
2. Klik custom domain Anda
3. Pastikan:
   - **Type**: Production
   - **Status**: Valid
   - **SSL**: Valid (hijau)
   - **Redirect**: Tidak ada redirect yang salah

## 🚨 Troubleshooting

### Masih 404 Setelah Remove/Add Domain?

#### 1. Cek DNS Propagation

Test apakah DNS sudah terpropagasi:
```bash
# Di terminal atau online tool seperti https://dnschecker.org
nslookup madumargolestari.com
```

Atau gunakan online tool:
- https://dnschecker.org
- https://www.whatsmydns.net

#### 2. Clear Browser Cache

- **Chrome/Edge**: `Ctrl+Shift+Delete` → Clear cache
- **Firefox**: `Ctrl+Shift+Delete` → Clear cache
- Atau gunakan **Incognito/Private mode**

#### 3. Test dengan curl

```bash
curl -I https://madumargolestari.com/product
```

Seharusnya mendapat response `200 OK`, bukan `404`.

#### 4. Cek SSL Certificate

1. **Settings** → **Domains**
2. Klik custom domain
3. Pastikan **SSL** status = **Valid** (hijau)
4. Jika **Invalid**, klik **Renew Certificate**

#### 5. Verifikasi vercel.json Ter-Deploy

1. Buka: `https://madumargolestari.com/vercel.json`
2. Seharusnya muncul isi JSON
3. Jika 404, berarti `vercel.json` belum ter-deploy ke custom domain

### Domain Status "Pending" atau "Invalid"

**Penyebab**: DNS belum terkonfigurasi dengan benar

**Solusi**:
1. **Settings** → **Domains** → Klik domain Anda
2. Lihat **DNS Configuration**
3. Copy semua DNS records yang diminta
4. Buka DNS provider Anda (GoDaddy, Namecheap, Cloudflare, dll)
5. Tambahkan semua records yang diminta
6. Tunggu 5-10 menit
7. Refresh halaman Domains di Vercel

### Domain Redirect Loop

**Penyebab**: Ada redirect yang salah di DNS atau Vercel

**Solusi**:
1. **Settings** → **Domains**
2. Pastikan tidak ada redirect yang salah
3. Jika menggunakan www, pastikan redirect sudah benar:
   - `www.madumargolestari.com` → `madumargolestari.com`
   - Atau sebaliknya

## 📝 Checklist

- [ ] Custom domain terdaftar di Vercel (Settings → Domains)
- [ ] Domain status = **Valid** (hijau)
- [ ] SSL status = **Valid** (hijau)
- [ ] DNS records sudah benar di DNS provider
- [ ] Sudah redeploy setelah menambahkan domain
- [ ] Test `/product` di custom domain - tidak 404
- [ ] Test route lain di custom domain - tidak 404
- [ ] Clear browser cache dan test lagi

## 🎯 Konfigurasi DNS yang Benar

### Untuk Root Domain (madumargolestari.com)

```
Type: A
Name: @
Value: 76.76.21.21
```

### Untuk WWW (www.madumargolestari.com)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Catatan**: Nilai DNS bisa berbeda tergantung Vercel. Lihat di **Settings** → **Domains** → Klik domain Anda untuk melihat nilai yang benar.

## ⏱️ Timeline

- **Remove/Add Domain**: 1-2 menit
- **DNS Propagation**: 5-10 menit (bisa sampai 24 jam)
- **SSL Certificate**: 1-5 menit
- **Total**: Biasanya 5-15 menit

## 📚 Referensi

- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/domains)
- [Vercel DNS Configuration](https://vercel.com/docs/concepts/projects/domains/dns-records)
- [Vercel SSL Certificates](https://vercel.com/docs/concepts/projects/domains/ssl-certificates)

---

**Last Updated**: 2024

