# Merge merge26nov ke MERN - Panduan Lengkap

## Status Features di merge26nov Branch ✅

Semua fitur berikut sudah **fully implemented dan tested** di branch `merge26nov`:

### 1. 📦 Image Upload Produk - WORKING ✅
- **File**: `madu/src/pages/admin/ProductForm.tsx`
- **Backend**: `server/src/routes/products.js` (POST dan PUT endpoints)
- **Model**: `server/src/models/product.js` (punya field `images: [String]`)
- **Fitur**:
  - Upload gambar utama (main image)
  - Upload hingga 3 gambar tambahan
  - Resize otomatis dengan Sharp
  - Upload ke Supabase dengan fallback bucket
  - Images array tersimpan di database dan di-return saat fetch produk

### 2. 📱 WhatsApp Checkout Integration - WORKING ✅
- **File**: `madu/src/pages/Checkout.tsx`
- **Features**:
  - Fetch shipping cost dari `/api/admin/shipping-settings`
  - Fetch WhatsApp number dari `/api/admin/general-settings`
  - Generate pesan dengan detail produk dan total harga
  - Buka WhatsApp Web/App via `wa.me` protocol
  - **Fallback ke localStorage jika API gagal** - memastikan fitur berfungsi meski Render down

### 3. ⚙️ Pengaturan Umum (Admin Panel) - WORKING ✅
- **File**: `madu/src/pages/admin/GeneralSettings.tsx`
- **Endpoint**: `GET/POST /api/admin/general-settings`
- **Fields**: 
  - `operatingYears` (Tahun beroperasi)
  - `whatsappNumber` (Nomor WhatsApp untuk checkout)
- **Model**: `server/src/models/generalSettings.js`
- **Validasi**: 
  - operatingYears: number >= 0
  - whatsappNumber: digits only (e.g., 628123456789)

### 4. 🚚 Pengaturan Pengiriman (Admin Panel) - WORKING ✅
- **File**: `madu/src/pages/admin/ShippingSettings.tsx`
- **Endpoint**: `GET/POST /api/admin/shipping-settings`
- **Fields**:
  - `cost` (Biaya pengiriman dalam Rp)
  - `description` (Deskripsi pengiriman)
- **Model**: `server/src/models/shippingSettings.js`

---

## Cara Merge ke MERN Branch

### Opsi 1: Manual Merge (Recommended untuk menghindari conflicts)

```bash
# 1. Checkout ke MERN branch (di local atau di command line di GitHub)
git checkout MERN

# 2. Merge merge26nov
git merge merge26nov --no-ff -m "merge: Integrate WhatsApp checkout, image upload, dan admin settings dari merge26nov"

# 3. Resolve conflicts jika ada (lihat section berikut)

# 4. Push ke remote
git push origin MERN
```

### Opsi 2: Cherry-pick Files (Jika ada banyak conflicts)

Jika Opsi 1 ada banyak conflicts, cherry-pick file yang penting:

```bash
# Switch ke MERN
git checkout MERN

# Copy file-file penting dari merge26nov
git checkout merge26nov -- \
  madu/src/pages/Checkout.tsx \
  madu/src/pages/admin/GeneralSettings.tsx \
  madu/src/pages/admin/ShippingSettings.tsx \
  madu/src/pages/admin/ProductForm.tsx \
  server/src/routes/admin.js \
  server/src/models/generalSettings.js \
  server/src/models/shippingSettings.js \
  server/src/models/product.js

# Commit
git commit -m "merge: Add WhatsApp checkout, admin settings, dan image upload support"

# Push
git push origin MERN
```

---

## Expected Conflicts & Resolution

### Conflict 1: server/src/routes/admin.js
**Penyebab**: MERN mungkin punya endpoint admin yang berbeda

**Solusi**: 
- Merge dari merge26nov (merge26nov punya implementasi yang lebih lengkap)
- Atau manually add endpoint baru sambil keep endpoint lama di MERN

```bash
# Gunakan versi dari merge26nov
git checkout --theirs server/src/routes/admin.js
```

### Conflict 2: madu/src/pages/admin/ProductForm.tsx
**Penyebab**: ProductForm mungkin sudah dimodifikasi di MERN

**Solusi**:
- Pastikan field `images` ada di state dan dikirim ke API
- Pastikan `handleImageUpload` dan image removal logic ada

**Manual check**:
```tsx
// Dalam handleSubmit, pastikan ini ada:
const data = {
  name: formData.name,
  description: formData.description,
  price: Number(formData.price),
  imageUrl: formData.imageUrl,
  images: formData.images  // ← PENTING: images array harus di-include
};
```

### Conflict 3: server/src/models/product.js
**Penyebab**: Model di MERN mungkin tidak punya field `images`

**Solusi**: 
- Pastikan schema punya field ini:
```javascript
images: {
  type: [String],
  default: []
}
```

---

## Testing Setelah Merge

### 1. Test Image Upload
```bash
cd madu
npm run dev
# Navigate ke Admin > Produk > Tambah/Edit Produk
# Upload gambar utama dan 3 gambar tambahan
# Simpan produk
# Verify: Gambar tersimpan di Supabase dan muncul di product detail
```

### 2. Test WhatsApp Checkout
```bash
# Di halaman /checkout
# Add produk ke cart
# Click "Lanjut ke Pembayaran via WhatsApp"
# Verify: WhatsApp Web/App membuka dengan pesan yang benar
# Jika API down: Fallback harus gunakan default values
```

### 3. Test Admin Settings
```bash
# Navigate ke Admin > Pengaturan > Umum
# Masukkan nomor WhatsApp: 628123456789
# Masukkan tahun beroperasi: 15
# Click Simpan
# Verify: Settings tersimpan di database

# Navigate ke Admin > Pengaturan > Pengiriman
# Masukkan biaya: 10500
# Masukkan deskripsi: "Gratis untuk area Jabodetabek"
# Click Simpan
# Verify: Muncul di halaman Checkout
```

---

## Important Notes ⚠️

1. **Images Array Handling**
   - ProductForm HARUS mengirim `images` array dalam payload
   - Backend HARUS handle `images` di POST dan PUT
   - Database HARUS support `images: [String]` field

2. **localStorage Fallback**
   - Checkout.tsx punya fallback ke localStorage
   - Ini memastikan checkout berfungsi meski API endpoint down
   - Data akan ter-cache setelah first successful fetch

3. **Model Singleton Pattern**
   - GeneralSettings dan ShippingSettings hanya boleh ada 1 document per collection
   - Schema punya pre-save hook untuk enforce ini

4. **Authorization**
   - Admin endpoints require Bearer token
   - Frontend HARUS include `Authorization: Bearer ${token}` header
   - verifyAdmin middleware check apakah user.role === 'admin'

5. **CORS Setting**
   - Pastikan FRONTEND_URL environment variable di-set di Render
   - Production harus list frontend URL in allowedOrigins

---

## Files Changed Summary

| File | Type | Perubahan |
|------|------|-----------|
| server/src/routes/admin.js | Modified | +general-settings & +shipping-settings endpoints |
| server/src/models/generalSettings.js | Modified | +whatsappNumber field |
| server/src/models/product.js | Modified | +images field |
| madu/src/pages/Checkout.tsx | Modified | +localStorage fallback, +settings fetch |
| madu/src/pages/admin/GeneralSettings.tsx | New/Modified | Admin panel untuk general settings |
| madu/src/pages/admin/ShippingSettings.tsx | New/Modified | Admin panel untuk shipping settings |
| madu/src/pages/admin/ProductForm.tsx | Modified | Ensure images array included |

---

## Commit History

```
621051b - fix: Add whatsappNumber support to general-settings POST endpoint
7e29fe2 - feat: Add localStorage fallback for WhatsApp settings
...
```

---

## Quick Checklist Sebelum Merge

- [ ] All test passed di merge26nov branch
- [ ] Backup branch sudah di-create (`merge26nov-backup`)
- [ ] MERN branch di-fetch ke local
- [ ] Merge strategy dipilih (Opsi 1 atau Opsi 2)
- [ ] Conflict resolution sudah disiapkan
- [ ] Testing plan siap dijalankan setelah merge
- [ ] Render FRONTEND_URL env var sudah set dengan MERN frontend URL

---

**Status**: ✅ Ready to merge ke MERN
**Last Updated**: Nov 29, 2025
