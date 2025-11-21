# Email Setup - Nodemailer Configuration Guide

## Installation Status ✅

Nodemailer has been successfully installed:
```bash
npm install nodemailer --legacy-peer-deps
```

## Quick Start

### 1. Configure Environment Variables

Create or update `.env` file in the `server` directory:

```env
# Email Configuration (Gmail Example)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173
```

### 2. Get Gmail App Password

**For Gmail Users (Recommended):**

1. Go to [myaccount.google.com](https://myaccount.google.com/)
2. Select **Security** from the left menu
3. Make sure **2-Step Verification** is enabled
4. Find **App passwords** (if you don't see it, 2-Step isn't enabled)
5. Select **Mail** and **Windows Computer**
6. Copy the 16-character password
7. Use this password as `EMAIL_PASSWORD` in `.env`

**For Other Email Services:**

Gmail:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-password-or-regular-password
```

Outlook:
```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

Yahoo:
```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-password
```

### 3. Test Email Configuration

**Test 1: Forgot Password Request**
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"your-test-email@example.com"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Jika email terdaftar, kami akan mengirimkan link reset password"
}
```

**Test 2: Check Server Logs**
When configured correctly, you should see:
```
✓ Email service ready
✓ Reset password email sent to user@example.com
```

## Feature Flows

### Forgot Password Flow
1. User visits `/forgot-password`
2. Enters email address
3. Server generates reset token (1 hour expiry)
4. Email sent with reset link
5. User receives email with button/link
6. Clicks link → redirected to `/reset-password?token=TOKEN`

### Reset Password Flow
1. User accesses `/reset-password?token=TOKEN`
2. Server verifies token validity
3. User enters new password
4. Password is hashed and saved
5. Confirmation email sent
6. User redirected to login
7. User can login with new password

## Email Templates

### Template 1: Forgot Password Email
- Subject: "Reset Password - Madu Margo Lestari"
- Contains reset link with 1-hour expiry warning
- Professional HTML layout with company branding
- Support contact information

### Template 2: Password Reset Confirmation
- Subject: "Password Reset Berhasil - Madu Margo Lestari"
- Confirms password change with timestamp
- Security notice
- Link back to login
- Support contact information

## Frontend URLs

- **Forgot Password Page**: `http://localhost:5174/forgot-password`
- **Reset Password Page**: `http://localhost:5174/reset-password?token=TOKEN_HERE`

## Backend Endpoints

### POST /api/auth/forgot-password
Request:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Jika email terdaftar, kami akan mengirimkan link reset password"
}
```

### POST /api/auth/verify-reset-token
Request:
```json
{
  "token": "JWT_TOKEN"
}
```

Response:
```json
{
  "success": true,
  "email": "user@example.com",
  "message": "Token valid"
}
```

### POST /api/auth/reset-password
Request:
```json
{
  "token": "JWT_TOKEN",
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "Password berhasil diubah. Silakan login dengan password baru Anda."
}
```

## Troubleshooting

### Issue: "Email service ready" but email not sending

**Solution:**
1. Check EMAIL_USER and EMAIL_PASSWORD are correct
2. Verify FRONTEND_URL matches your actual frontend URL
3. Check MongoDB connection is working
4. Verify user exists in database

### Issue: "Email configuration error"

**Solution:**
1. Verify EMAIL_USER format (must be valid email)
2. For Gmail: Use App Password, not regular password
3. Check EMAIL_SERVICE value is correct
4. Ensure 2-Step Verification enabled (for Gmail)

### Issue: Token verification fails

**Solution:**
1. Token expires after 1 hour - need new request
2. Check token format is correct
3. Verify resetToken field exists in User collection

### Issue: Link in email not working

**Solution:**
1. Check FRONTEND_URL environment variable
2. Ensure FRONTEND_URL matches actual frontend domain
3. For production: Update to production domain

## Production Setup

### Environment Variables
```env
# Production
EMAIL_SERVICE=gmail
EMAIL_USER=production-email@madumargolestari.com
EMAIL_PASSWORD=production-app-password
FRONTEND_URL=https://madumargolestari.com
NODE_ENV=production
```

### Recommended Email Services for Production

1. **Gmail** (Free)
   - 500 emails/day
   - Good for small-medium projects

2. **SendGrid** (Paid with free tier)
   - 100 emails/day free
   - Excellent deliverability
   - Professional service

3. **Mailgun** (Paid with free tier)
   - 5,000 emails/month free
   - Great documentation

4. **AWS SES** (Paid)
   - Very affordable
   - High volume support
   - Best for large projects

## Testing Checklist

- [ ] Node packages installed (`npm install nodemailer`)
- [ ] Environment variables configured
- [ ] Email service verified (logs show "✓ Email service ready")
- [ ] Forgot password email sends successfully
- [ ] Reset link contains valid token
- [ ] Password reset completes successfully
- [ ] Confirmation email sends after reset
- [ ] User can login with new password

## Next Steps

1. ✅ Nodemailer installed
2. ✅ Backend endpoints created
3. ✅ Frontend pages created
4. ⏳ **Configure email credentials in .env**
5. ⏳ Test email sending
6. ⏳ Test complete flow (frontend to email to reset)

## Support

For issues: support@madumargolestari.com

---

Last Updated: November 22, 2025
Current Status: ✅ Ready for Testing
