# Troubleshooting Network Error

## Penyebab Network Error

Network Error biasanya terjadi ketika frontend tidak dapat terhubung ke backend server. Berikut adalah penyebab umum dan solusinya:

## 1. Backend Server Tidak Berjalan

**Gejala:**
- Error: "Network Error" atau "ERR_NETWORK"
- Tidak ada response dari server

**Solusi:**

1. **Pastikan backend server sudah berjalan:**
   ```bash
   cd server
   npm run dev
   ```

2. **Periksa apakah server berjalan dengan benar:**
   - Seharusnya muncul pesan: `Server berjalan pada http://localhost:5000`
   - Seharusnya muncul pesan: `MongoDB terhubung`

3. **Test koneksi dengan browser:**
   - Buka: `http://localhost:5000/api/health`
   - Seharusnya muncul response JSON: `{"status":"ok"}`

## 2. Port Backend Tidak Sesuai

**Gejala:**
- Frontend mencoba connect ke port yang salah
- Error: "Connection refused"

**Solusi:**

1. **Periksa port backend di `server/.env`:**
   ```env
   PORT=5000
   ```

2. **Periksa API URL di frontend:**
   - File `madu/.env` harus memiliki:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
   - Atau pastikan default di code: `http://localhost:5000/api`

3. **Restart kedua server setelah mengubah .env**

## 3. CORS Error

**Gejala:**
- Error di console browser: "CORS policy"
- Request berhasil tapi di-block oleh browser

**Solusi:**

1. **CORS sudah dikonfigurasi di backend** untuk allow:
   - `http://localhost:3000`
   - `http://localhost:5173`
   - `http://localhost:5174`
   - `http://127.0.0.1:5173`

2. **Jika masih error, periksa origin frontend:**
   - Pastikan frontend berjalan di salah satu port di atas
   - Default Vite: `http://localhost:5173`

## 4. Firewall atau Antivirus

**Gejala:**
- Server berjalan tapi tidak bisa diakses
- Timeout error

**Solusi:**

1. **Periksa Windows Firewall:**
   - Allow Node.js melalui firewall
   - Atau disable firewall sementara untuk testing

2. **Periksa Antivirus:**
   - Beberapa antivirus memblokir localhost connections
   - Tambahkan exception untuk Node.js

## 5. MongoDB Connection Error

**Gejala:**
- Server tidak bisa start
- Error: "MongoDB connection failed"

**Solusi:**

1. **Periksa MongoDB connection:**
   ```bash
   # Untuk MongoDB lokal
   # Pastikan MongoDB service berjalan
   
   # Untuk MongoDB Atlas
   # Pastikan connection string benar
   ```

2. **Periksa `server/.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/madu_db
   # atau
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/madu_db
   ```

## Checklist Troubleshooting

- [ ] Backend server sudah berjalan (`npm run dev` di folder server)
- [ ] Frontend server sudah berjalan (`npm run dev` di folder madu)
- [ ] Test endpoint health: `http://localhost:5000/api/health` berhasil
- [ ] Port backend: 5000 (default)
- [ ] Port frontend: 5173 (Vite default)
- [ ] API URL di frontend: `http://localhost:5000/api`
- [ ] MongoDB sudah terhubung
- [ ] Tidak ada firewall yang memblokir
- [ ] Browser console tidak ada CORS error

## Testing Koneksi

### 1. Test Backend Health Endpoint

**Dari Browser:**
```
http://localhost:5000/api/health
```

**Dari Terminal (curl):**
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{"status":"ok"}
```

### 2. Test Auth Endpoint

**Dari Terminal (curl):**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 3. Test dari Frontend Console

Buka browser console (F12) dan jalankan:
```javascript
fetch('http://localhost:5000/api/health')
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Error:', err));
```

## Quick Fix

Jika masih mengalami Network Error, coba langkah berikut:

1. **Stop semua server** (Ctrl+C)

2. **Restart backend:**
   ```bash
   cd server
   npm run dev
   ```

3. **Tunggu sampai muncul:**
   ```
   MongoDB terhubung
   Server berjalan pada http://localhost:5000
   ```

4. **Test di browser:**
   ```
   http://localhost:5000/api/health
   ```

5. **Restart frontend:**
   ```bash
   cd madu
   npm run dev
   ```

6. **Coba login lagi**

## Masih Bermasalah?

Jika masih mengalami Network Error setelah semua langkah di atas:

1. **Periksa console backend** untuk error messages
2. **Periksa console browser** (F12 > Console tab)
3. **Periksa Network tab** di browser untuk melihat request details
4. **Pastikan tidak ada aplikasi lain yang menggunakan port 5000**
5. **Coba gunakan IP address: `http://127.0.0.1:5000/api`**

