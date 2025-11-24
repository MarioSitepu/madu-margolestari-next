# Forgot Password & Reset Password Complete Setup Guide

## Overview

This guide covers the complete implementation of forgot password and reset password functionality with Nodemailer email integration.

## Features Implemented

✅ Forgot Password page with email input
✅ Email verification with Nodemailer
✅ Reset Password page with token verification
✅ Password reset with email confirmation
✅ Secure token generation (1 hour expiry)
✅ Professional HTML email templates
✅ Error handling and security validation

## Frontend URLs

- **Forgot Password**: `http://localhost:5173/forgot-password`
- **Reset Password**: `http://localhost:5173/reset-password?token=TOKEN_HERE`

## Backend API Endpoints

### 1. Forgot Password Request
```
POST /api/auth/forgot-password
Body: { email: "user@example.com" }
Response: { success: true, message: "..." }
```

### 2. Verify Reset Token
```
POST /api/auth/verify-reset-token
Body: { token: "JWT_TOKEN" }
Response: { success: true, email: "user@example.com" }
```

### 3. Reset Password
```
POST /api/auth/reset-password
Body: {
  token: "JWT_TOKEN",
  password: "newpassword",
  confirmPassword: "newpassword"
}
Response: { success: true, message: "Password berhasil diubah" }
```

## Setup Instructions

### Step 1: Install Nodemailer

```bash
cd server
npm install nodemailer
```

### Step 2: Configure Environment Variables

Update your `.env` file in the `server` directory:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Step 3: Gmail Configuration (Recommended)

#### Option A: Gmail App Password (Recommended)
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Step Verification
3. Go to [App passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer" (or your device)
5. Copy the 16-character password
6. Set `EMAIL_PASSWORD` to this password

#### Option B: Gmail Less Secure Access (Not Recommended)
1. Go to [Less secure app access](https://myaccount.google.com/lesssecureapps)
2. Enable "Allow less secure apps"
3. Use your Gmail password as `EMAIL_PASSWORD`

### Step 4: Alternative Email Services

You can also use other email services by changing `EMAIL_SERVICE`:

**Outlook**:
```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

**Yahoo**:
```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-password
```

**Custom SMTP**:
```env
EMAIL_SERVICE=custom
# Update auth.js with custom SMTP configuration
```

### Step 5: Test the Setup

#### Test 1: Forgot Password
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com"}'
```

#### Test 2: Verify Token
```bash
curl -X POST http://localhost:5000/api/auth/verify-reset-token \
  -H "Content-Type: application/json" \
  -d '{"token":"YOUR_TOKEN_HERE"}'
```

#### Test 3: Reset Password
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token":"YOUR_TOKEN_HERE",
    "password":"newpassword123",
    "confirmPassword":"newpassword123"
  }'
```

## Database Schema Updates

The User model has been updated with:
```javascript
resetToken: {
  type: String,
  default: null
},
resetTokenExpiry: {
  type: Date,
  default: null
}
```

## Security Features

1. **Token Expiry**: Reset tokens expire after 1 hour
2. **One-time Use**: Token is cleared after password reset
3. **Email Verification**: Secure email sending to registered email
4. **Password Hashing**: Passwords are hashed with bcryptjs
5. **Email Privacy**: System doesn't reveal if email exists
6. **Rate Limiting**: Recommended to implement rate limiting in production

## Email Templates

### Forgot Password Email
- Professional HTML layout
- Reset link with token
- 1-hour expiry warning
- Support contact information

### Reset Confirmation Email
- Success confirmation
- Timestamp of change
- Security notice
- Support contact information

## Troubleshooting

### Email Not Sending

**Problem**: "Email configuration error"

**Solution**:
1. Check EMAIL_USER and EMAIL_PASSWORD are correct
2. For Gmail: Make sure App Password is used (not regular password)
3. Check if 2-Step Verification is enabled for Gmail
4. Verify EMAIL_SERVICE is correct

**Check Logs**:
```bash
npm run dev
# Look for: "Email service ready" or error message
```

### Token Verification Fails

**Problem**: "Token tidak valid atau sudah kadaluarsa"

**Solution**:
1. Token expires after 1 hour - request a new one
2. Check token format is correct
3. Verify database has resetToken and resetTokenExpiry fields

### Frontend Not Receiving Reset Link

**Problem**: Email sent but no link in email

**Solution**:
1. Check FRONTEND_URL environment variable
2. Make sure it matches your actual frontend domain
3. For production: Update FRONTEND_URL to production domain

## Production Deployment

### 1. Update Environment Variables

```env
# Production Gmail
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Production Frontend URL
FRONTEND_URL=https://yourdomain.com

# Rate limiting
# Consider implementing rate limiting middleware
```

### 2. Email Service Recommendations

- **Gmail**: Free, 500 emails/day
- **SendGrid**: Free tier available, 100 emails/day
- **Mailgun**: Free tier available, 5000 emails/month
- **AWS SES**: Pay-per-use, very affordable

### 3. Security Checklist

- [ ] Use App Password (Gmail) or OAuth
- [ ] HTTPS enabled
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] JWT secret is strong
- [ ] Database backups enabled

## Integration Examples

### React Component Integration

```typescript
// In ForgotPassword.tsx
const handleForgotPassword = async (email: string) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, {
    email
  });
  // Show success message
};

// In ResetPassword.tsx
const handleResetPassword = async (token: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, {
    token,
    password,
    confirmPassword: password
  });
  // Redirect to login
};
```

## Additional Configuration Options

### SendGrid Integration

Replace Nodemailer transporter:
```javascript
import sgTransport from 'nodemailer-sendgrid-transport';

const transporter = nodemailer.createTransport(
  sgTransport({
    service: 'SendGrid',
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  })
);
```

### Custom Email Templates

Update HTML templates in `auth.js`:
- Modify colors to match your brand
- Add logo/images
- Update footer information
- Add social media links

## Next Steps

1. Test in development environment
2. Configure production email service
3. Implement rate limiting
4. Add email verification on registration
5. Add two-factor authentication
6. Monitor email delivery logs

## Support

For issues or questions, contact: support@madumargolestari.com

---

Last Updated: November 22, 2025
