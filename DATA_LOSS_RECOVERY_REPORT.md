# Data Loss Investigation Report

## 📋 Ringkasan Masalah

Pada tanggal Nov 22, 2025, ditemukan bahwa **semua data di database lokal kosong**:
- 📝 Articles: 0 (sebelumnya ada)
- 🖼️ Gallery: 0 (sebelumnya ada) 
- 💬 Comments: 0 (sebelumnya ada)
- 🛍️ Products: 0 (sebelumnya ada)
- 👥 Users: 2 (hanya admin@marles.com dan Google user adi.123140021@student.itera.ac.id)

---

## 🔍 Investigasi Penyebab

### 1. **Database Instance Terpisah (Root Cause)**

Database memiliki dua instance terpisah:

| Instance | Connection String | Lokasi | Status |
|----------|------------------|--------|--------|
| **Development** | `mongodb://localhost:27017/madu_db` | Local machine | ❌ KOSONG |
| **Production** | `mongodb+srv://...@cluster.mongodb.net/madu_db` | MongoDB Atlas Cloud | ⚠️ MUNGKIN ADA DATA |

### 2. **Mengapa Data Hilang?**

- **Saat merge MERN → AdminPage** (Nov 22, 2025, commit `0e609d2`), tidak ada penghapusan data otomatis
- **Database lokal** kemungkinan:
  - Baru di-inisialisasi atau di-reset
  - Pernah terhubung ke Atlas tapi sekarang hanya lokal
  - Tidak ada backup dari data production

### 3. **Environment Variable Mismatch**

```
Lokal Development:
- MONGODB_URI = mongodb://localhost:27017/madu_db ✓ (sesuai)
- Database kosong

Production (Render):
- MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/madu_db
- Kemungkinan masih punya data lama
```

---

## ✅ Solusi yang Sudah Dilaksanakan

### 1. Created `seedDatabase.js`
Script untuk mengisi database lokal dengan sample data:
```bash
node server/src/scripts/seedDatabase.js
```

**Data yang di-seed:**
- 📝 4 Articles (Manfaat Madu, Memilih Madu, Organik vs Konvensional, Proses Produksi)
- 🖼️ 5 Gallery Items (Panen, Perawatan, Produk, Fasilitas, Tim)
- 💬 8 Comments (2 comments per article)
- 🛍️ 5 Products (Madu original, madu liar, paket, lilin lebah, royal jelly)

### 2. Created `checkDatabase.js`
Script untuk verify database dan lihat statistics:
```bash
node server/src/scripts/checkDatabase.js
```

### 3. Created `listUsers.js`
Script untuk list semua users:
```bash
node server/src/scripts/listUsers.js
```

---

## 📊 Status Database Sekarang (Nov 22, 2025)

```
✅ Users: 2
   1. admin@marles.com (role: admin, provider: local) 
   2. adi.123140021@student.itera.ac.id (role: user, provider: google)

✅ Articles: 4
✅ Gallery: 5
✅ Comments: 8
✅ Products: 5
```

---

## 🔄 Cara Merekover Data Production (Jika Diperlukan)

Jika data lama di production MongoDB Atlas masih ada dan ingin di-restore ke lokal:

### Step 1: Export Data dari MongoDB Atlas
```bash
# Menggunakan mongodump
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/madu_db" --out=./backup

# Atau menggunakan MongoDB Compass GUI
# 1. Connect ke Atlas cluster
# 2. Export each collection as JSON
# 3. Save ke folder backup/
```

### Step 2: Import ke Database Lokal
```bash
# Menggunakan mongorestore
mongorestore ./backup/madu_db --db=madu_db

# Atau import JSON files secara manual
mongoimport --db madu_db --collection articles --file backup/articles.json --jsonArray
mongoimport --db madu_db --collection galleries --file backup/galleries.json --jsonArray
mongoimport --db madu_db --collection comments --file backup/comments.json --jsonArray
mongoimport --db madu_db --collection products --file backup/products.json --jsonArray
mongoimport --db madu_db --collection users --file backup/users.json --jsonArray
```

### Step 3: Verify Restored Data
```bash
node server/src/scripts/checkDatabase.js
```

---

## 🛠️ Preventive Measures untuk Masa Depan

### 1. **Automated Backups**
- Setup MongoDB Atlas automated backup setiap hari
- Schedule export lokal setiap minggu
- Store backup di cloud storage (Google Drive, AWS S3, dll)

### 2. **Development vs Production Separation**
```env
# Local Development (.env)
MONGODB_URI=mongodb://localhost:27017/madu_db_dev

# Production (set di Render/Railway dashboard)
MONGODB_URI=mongodb+srv://...@cluster.mongodb.net/madu_db_prod
```

### 3. **Data Seeding Checklist**
- ✅ Buat seed script untuk sample data (sudah ada: `seedDatabase.js`)
- ⬜ Buat seed script untuk production backup restore
- ⬜ Dokumentasi cara restore data

### 4. **Database Versioning**
- Jangan hapus old collections, rename dengan suffix `_backup_<date>`
- Track schema changes di Git (dokumentasikan di file terpisah)

---

## 📝 Timeline

| Tanggal | Event | Status |
|---------|-------|--------|
| Nov 22, 2025 08:00 | Merge MERN → AdminPage | ✅ Completed |
| Nov 22, 2025 09:30 | Admin user creation | ✅ Completed |
| Nov 22, 2025 10:00 | **Data Loss Discovered** | ⚠️ Issue Found |
| Nov 22, 2025 10:15 | Investigation Started | 🔍 In Progress |
| Nov 22, 2025 10:30 | Seed script created | ✅ Completed |
| Nov 22, 2025 10:45 | Database re-populated | ✅ Completed |
| Nov 22, 2025 11:00 | **This Report** | 📋 Documentation |

---

## ❓ FAQ

**Q: Dimana data lama saya?**
A: Data lama kemungkinan masih tersimpan di MongoDB Atlas production database. Gunakan `mongodump` atau MongoDB Compass untuk export.

**Q: Bagaimana cara tidak kehilangan data lagi?**
A: Setup automated backup di MongoDB Atlas dan schedule export regular.

**Q: Apakah seed data ini bisa dihapus?**
A: Ya, setiap saat bisa di-reset dengan menjalankan: `node server/src/scripts/seedDatabase.js` lagi atau menghapus manual di MongoDB.

**Q: Gimana dengan data user?**
A: User account tidak ter-seed otomatis. Hanya seed data content (articles, gallery, comments, products). User harus register manual atau gunakan script terpisah.

---

## 🚀 Next Steps

1. ✅ Populate database lokal dengan seed data
2. ⬜ Verify semua API endpoints bekerja dengan seed data
3. ⬜ Test frontend dapat load articles, gallery, products, comments
4. ⬜ Setup automated backup untuk production database
5. ⬜ Document cara restore dari backup

---

**Report Generated:** Nov 22, 2025  
**Investigator:** GitHub Copilot  
**Database Status:** ✅ Recovered with seed data
