# Panduan Setup Google OAuth Login

## Overview

Backend sudah memiliki endpoint untuk login dengan Google OAuth. Endpoint ini menerima Google ID token dari frontend dan melakukan verifikasi, kemudian membuat atau login user.

## Endpoint

**POST** `/api/auth/google`

### Request Body:
```json
{
  "credential": "google_id_token_dari_frontend"
}
```

### Response Success (200):
```json
{
  "success": true,
  "message": "Login dengan Google berhasil",
  "token": "jwt_token_untuk_autentikasi",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "Nama User",
    "avatar": "https://...",
    "provider": "google"
  }
}
```

### Response Error (400/500):
```json
{
  "success": false,
  "message": "Error message"
}
```

## Setup Google OAuth

### 1. Buat Google OAuth Credentials

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Aktifkan **Google+ API**:
   - Pergi ke **APIs & Services** > **Library**
   - Cari "Google+ API" atau "Google Identity Services"
   - Klik **Enable**

4. Buat OAuth 2.0 Client ID:
   - Pergi ke **APIs & Services** > **Credentials**
   - Klik **Create Credentials** > **OAuth client ID**
   - Pilih **Web application**
   - Isi **Name**: Nama aplikasi Anda
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (untuk development)
     - `http://localhost:5173` (jika menggunakan Vite)
     - URL production Anda (untuk production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000` (untuk development)
     - `http://localhost:5173` (jika menggunakan Vite)
     - URL production Anda (untuk production)
   - Klik **Create**

5. Copy **Client ID** yang dihasilkan

### 2. Update File `.env`

Tambahkan `GOOGLE_CLIENT_ID` ke file `.env` di folder `server/`:

```env
# MongoDB Connection URI
MONGODB_URI=mongodb://localhost:27017/madu_db

# Server Port
PORT=5000

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Google OAuth Client ID
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

### 3. Frontend Integration

Di frontend, Anda perlu menggunakan Google Sign-In button. Contoh dengan Google Identity Services:

```html
<!-- Load Google Identity Services -->
<script src="https://accounts.google.com/gsi/client" async defer></script>

<!-- Google Sign-In Button -->
<div id="g_id_onload"
     data-client_id="YOUR_GOOGLE_CLIENT_ID"
     data-callback="handleCredentialResponse">
</div>
<div class="g_id_signin" data-type="standard"></div>

<script>
function handleCredentialResponse(response) {
  // Kirim credential ke backend
  fetch('http://localhost:5000/api/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      credential: response.credential
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // Simpan token
      localStorage.setItem('token', data.token);
      // Redirect atau update UI
      console.log('Login berhasil:', data.user);
    }
  });
}
</script>
```

### 4. Testing

1. Pastikan server backend berjalan:
   ```bash
   cd server
   npm run dev
   ```

2. Test endpoint dengan Postman atau curl:
   ```bash
   curl -X POST http://localhost:5000/api/auth/google \
     -H "Content-Type: application/json" \
     -d '{"credential": "google_id_token_here"}'
   ```

## Fitur

- ✅ Verifikasi Google ID token
- ✅ Auto-create user jika belum ada
- ✅ Auto-login jika user sudah ada
- ✅ Link Google account ke existing user (jika email sama)
- ✅ Generate JWT token untuk autentikasi
- ✅ Return user data (id, email, name, avatar, provider)

## Troubleshooting

### Error: "Google OAuth tidak dikonfigurasi"
- Pastikan `GOOGLE_CLIENT_ID` sudah diisi di file `.env`
- Restart server setelah mengubah `.env`

### Error: "Token Google tidak valid"
- Pastikan `GOOGLE_CLIENT_ID` di backend sama dengan yang digunakan di frontend
- Pastikan token belum kadaluarsa (token Google biasanya valid selama 1 jam)
- Pastikan origin frontend sudah ditambahkan di Google Cloud Console

### Error: "Invalid token signature"
- Pastikan `GOOGLE_CLIENT_ID` sudah benar
- Pastikan token berasal dari Google Identity Services yang valid

### User tidak terbuat di database
- Pastikan MongoDB sudah terhubung
- Periksa console untuk error messages
- Pastikan model User sudah benar

## Security Notes

1. **Jangan expose GOOGLE_CLIENT_ID di frontend** - Ini aman karena Client ID adalah public
2. **Selalu verifikasi token di backend** - Jangan percaya token dari frontend tanpa verifikasi
3. **Gunakan HTTPS di production** - Untuk keamanan koneksi
4. **Simpan JWT token dengan aman** - Gunakan httpOnly cookies jika memungkinkan

