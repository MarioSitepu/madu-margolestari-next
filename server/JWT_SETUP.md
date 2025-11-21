# Panduan JWT Authentication

## Overview

Backend menggunakan JWT (JSON Web Token) untuk autentikasi. Token memiliki masa berlaku **7 hari** dan digunakan untuk mengakses endpoint yang memerlukan autentikasi.

## Konfigurasi

### Environment Variables

Pastikan file `.env` di folder `server/` memiliki:

```env
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

#### Generate JWT Secret Key

Untuk generate JWT secret key yang aman, gunakan salah satu cara berikut:

**Cara 1: Menggunakan NPM Script (Recommended)**
```bash
cd server
npm run generate:jwt-secret
```

**Cara 1b: Menggunakan Script Langsung**
```bash
cd server
node scripts/generate-jwt-secret.js
```

**Cara 2: Menggunakan Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Cara 3: Menggunakan OpenSSL**
```bash
openssl rand -hex 64
```

**Contoh JWT_SECRET yang sudah di-generate:**
```env
JWT_SECRET=247364f7d0afb1515bf532611b7165de545744d75d543e3696d90e09c4ba97c68fbdfd1c150e3c6bb13d7dccfd5869a61180a194abfc587c69e2a737996a08b3
```

**Penting:** 
- ✅ Gunakan secret key yang kuat dan unik di production
- ✅ Jangan commit secret key ke repository
- ✅ Secret key harus minimal 32 karakter untuk keamanan optimal
- ✅ Generate secret key baru untuk setiap environment (development, staging, production)
- ⚠️ Jangan share secret key ke siapapun!

### Token Expiration

Token JWT memiliki masa berlaku **7 hari** (`7d`). Setelah 7 hari, user harus login kembali.

## Struktur Token

Token JWT berisi payload berikut:
```json
{
  "userId": "mongodb_user_id",
  "iat": 1234567890,
  "exp": 1235173890
}
```

- `userId`: ID user dari MongoDB
- `iat`: Issued at (waktu token dibuat)
- `exp`: Expiration time (waktu token kadaluarsa)

## Penggunaan

### 1. Generate Token

Token di-generate otomatis saat:
- User login (`POST /api/auth/login`)
- User register (`POST /api/auth/register`)
- User login dengan Google (`POST /api/auth/google`)

**Response:**
```json
{
  "success": true,
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "Nama User"
  }
}
```

### 2. Menggunakan Token

Kirim token di header Authorization dengan format Bearer:

```javascript
// JavaScript/Fetch
fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

// Axios
axios.get('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

### 3. Protected Routes

Endpoint yang memerlukan autentikasi menggunakan middleware `authenticateToken`:

```javascript
import { authenticateToken } from '../routes/auth.js';

router.get('/protected', authenticateToken, (req, res) => {
  // req.user berisi data user yang sudah ter-authenticate
  res.json({ user: req.user });
});
```

## Endpoint yang Tersedia

### Public Endpoints (Tidak perlu token)
- `POST /api/auth/register` - Registrasi user baru
- `POST /api/auth/login` - Login dengan email/password
- `POST /api/auth/google` - Login dengan Google

### Protected Endpoints (Perlu token)
- `GET /api/auth/me` - Get current user profile

## Error Handling

### Token Tidak Ditemukan (401)
```json
{
  "success": false,
  "message": "Token akses diperlukan"
}
```

### Token Kadaluarsa (401)
```json
{
  "success": false,
  "message": "Token sudah kadaluarsa. Silakan login kembali",
  "code": "TOKEN_EXPIRED"
}
```

### Token Tidak Valid (403)
```json
{
  "success": false,
  "message": "Token tidak valid",
  "code": "TOKEN_INVALID"
}
```

## Utility Functions

File `server/src/lib/jwt.js` menyediakan utility functions:

### `generateToken(userId)`
Generate JWT token untuk user.

```javascript
import { generateToken } from '../lib/jwt.js';

const token = generateToken(userId);
```

### `verifyToken(token)`
Verify dan decode JWT token.

```javascript
import { verifyToken } from '../lib/jwt.js';

try {
  const decoded = verifyToken(token);
  console.log(decoded.userId);
} catch (error) {
  console.error(error.message);
}
```

### `decodeToken(token)`
Decode token tanpa verifikasi (untuk debugging).

```javascript
import { decodeToken } from '../lib/jwt.js';

const decoded = decodeToken(token);
```

## Best Practices

### 1. Simpan Token dengan Aman
- **Frontend:** Simpan di `localStorage` atau `sessionStorage`
- **Mobile:** Simpan di secure storage (Keychain/Keystore)
- **Jangan** simpan di cookie tanpa httpOnly flag

### 2. Handle Token Expiration
```javascript
// Contoh handling di frontend
async function apiCall(url, options = {}) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    // Token expired, redirect ke login
    localStorage.removeItem('token');
    window.location.href = '/login';
    return;
  }

  return response;
}
```

### 3. Refresh Token (Opsional)
Untuk aplikasi yang memerlukan session lebih lama, pertimbangkan implementasi refresh token mechanism.

### 4. Security
- ✅ Gunakan HTTPS di production
- ✅ Validasi token di setiap request
- ✅ Jangan expose JWT_SECRET
- ✅ Gunakan secret key yang kuat
- ✅ Set expiration time yang wajar

## Testing

### Test dengan cURL
```bash
# Login untuk mendapatkan token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Gunakan token untuk akses protected endpoint
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Test dengan Postman
1. Login untuk mendapatkan token
2. Copy token dari response
3. Di request berikutnya, tambahkan header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN_HERE`

## Troubleshooting

### Error: "Token akses diperlukan"
- Pastikan header `Authorization` sudah dikirim
- Format harus: `Bearer TOKEN` (dengan spasi setelah Bearer)

### Error: "Token sudah kadaluarsa"
- Token sudah melewati 7 hari
- User harus login kembali untuk mendapatkan token baru

### Error: "Token tidak valid"
- Token mungkin rusak atau tidak sesuai format
- Pastikan JWT_SECRET di backend sama dengan yang digunakan saat generate token

### Error: "User tidak ditemukan"
- User mungkin sudah dihapus dari database
- Token masih valid tapi user tidak ada

