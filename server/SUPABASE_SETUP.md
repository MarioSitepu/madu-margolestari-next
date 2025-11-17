# Panduan Setup Supabase untuk Upload Foto Profil

Dokumen ini menjelaskan cara mengkonfigurasi Supabase untuk menyimpan foto profil dari Google OAuth.

## 1. Buat Akun Supabase

1. Kunjungi [supabase.com](https://supabase.com)
2. Daftar atau login ke akun Anda
3. Buat project baru

## 2. Dapatkan Credentials

Setelah project dibuat, Anda perlu mendapatkan:

### Supabase URL
- Buka **Settings** > **API**
- Copy **Project URL** (contoh: `https://xxxxx.supabase.co`)

### Supabase Service Role Key
- Di halaman yang sama (Settings > API)
- Copy **service_role** key (bukan anon key)
- **PENTING**: Service role key memiliki akses penuh, jangan expose ke frontend!

## 3. Buat Storage Bucket

1. Buka **Storage** di sidebar Supabase dashboard
2. Klik **New bucket**
3. Isi:
   - **Name**: `avatars`
   - **Public bucket**: ✅ Centang (agar gambar bisa diakses publik)
4. Klik **Create bucket**

### Set Bucket Policy (Opsional)

Untuk keamanan lebih, Anda bisa set policy:

1. Buka bucket `avatars`
2. Klik **Policies**
3. Tambahkan policy untuk allow upload:
   - **Policy name**: Allow authenticated uploads
   - **Allowed operation**: INSERT, UPDATE
   - **Policy definition**: 
     ```sql
     (bucket_id = 'avatars'::text)
     ```

## 4. Konfigurasi Environment Variables

Tambahkan ke file `server/.env`:

```env
# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**PENTING**: 
- Jangan commit file `.env` ke git
- Pastikan `.env` sudah ada di `.gitignore`
- Service role key hanya untuk backend, jangan gunakan di frontend

## 5. Test Setup

Setelah konfigurasi, test dengan:

1. **Start backend server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Login dengan Google** di frontend

3. **Cek console backend** - seharusnya muncul:
   ```
   Foto profil berhasil diupload ke Supabase: https://xxxxx.supabase.co/storage/v1/object/public/avatars/user-xxx.jpg
   ```

4. **Cek Supabase Storage:**
   - Buka Storage > avatars
   - Seharusnya ada file foto profil user

## 6. Troubleshooting

### Error: "Supabase client tidak dikonfigurasi"
- Pastikan `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` sudah di-set di `.env`
- Restart server setelah mengubah `.env`

### Error: "Gagal upload ke Supabase"
- Pastikan bucket `avatars` sudah dibuat
- Pastikan bucket adalah public
- Cek apakah service role key benar

### Foto tidak muncul di frontend
- Pastikan bucket adalah public
- Cek URL yang dikembalikan dari Supabase
- Test URL di browser untuk memastikan bisa diakses

### Fallback ke Google URL
- Jika upload ke Supabase gagal, sistem akan otomatis menggunakan URL Google sebagai fallback
- Cek console backend untuk error details

## 7. Struktur File di Supabase Storage

File akan disimpan dengan format:
```
avatars/user-{userId}-{timestamp}.{extension}
```

Contoh:
```
avatars/user-507f1f77bcf86cd799439011-1701234567890.jpg
```

## 8. Update Avatar

Sistem akan otomatis:
- Update avatar jika user mengubah foto profil di Google
- Re-upload dengan user ID yang benar jika sebelumnya menggunakan temp ID

## Catatan Keamanan

1. **Service Role Key**: 
   - Hanya gunakan di backend
   - Jangan expose ke frontend atau client-side code
   - Simpan dengan aman

2. **Bucket Policy**:
   - Untuk production, pertimbangkan untuk membuat bucket private
   - Gunakan signed URLs untuk akses gambar
   - Atau set policy yang lebih ketat

3. **File Size**:
   - Default Supabase limit: 50MB per file
   - Untuk avatar, pertimbangkan untuk resize gambar sebelum upload

## Resize Image Otomatis

✅ **Fitur resize sudah aktif secara otomatis!**

Foto profil akan otomatis diresize ke ukuran optimal sebelum diupload ke Supabase:
- **Ukuran maksimal**: 400x400 pixels
- **Format output**: JPEG (untuk kompresi lebih baik)
- **Quality**: 85% (balance antara kualitas dan ukuran file)
- **Crop mode**: Cover (mempertahankan aspect ratio, crop dari center)

### Manfaat Resize Otomatis:
- ✅ Menghemat storage di Supabase
- ✅ Loading lebih cepat di frontend
- ✅ Menghemat bandwidth
- ✅ Ukuran file lebih kecil (biasanya 50-80% lebih kecil)

### Customize Resize Options (Opsional)

Jika ingin mengubah ukuran atau quality, Anda bisa modifikasi di `server/src/routes/auth.js`:

```javascript
// Default: 400x400, quality 85
avatarUrl = await uploadGoogleAvatarToSupabase(picture, userId);

// Custom: 300x300, quality 90
avatarUrl = await uploadGoogleAvatarToSupabase(picture, userId, {
  maxWidth: 300,
  maxHeight: 300,
  quality: 90
});
```

### Logging

Sistem akan otomatis log ukuran file sebelum dan sesudah resize di console backend:
```
Foto profil diresize: 245.3KB → 28.7KB (88.3% lebih kecil)
```

