# Google OAuth Login - Bug Fix

## Problem Fixed ✅

**Issue**: Google login was stuck on loading indefinitely
- Loading spinner never stops
- No success or error message appears
- Popup/prompt doesn't respond properly

## Root Causes Identified

1. **Missing Loading State Reset**: When user completed Google authentication, the `isPromptingGoogle` state wasn't being set to false
2. **Infinite Callback Loop**: The prompt callback was being called continuously without proper termination
3. **No Timeout Handling**: If Google prompt failed silently, there was no timeout to recover

## Changes Made

### 1. **Improved Callback Handling**
```typescript
// BEFORE: callback never set loading to false
window.google?.accounts?.id?.prompt((notification) => {
  // ... logic but no proper cleanup
});

// AFTER: properly set loading state
setIsPromptingGoogle(false); // Added at start of callback
```

### 2. **Added Timeout Protection**
```typescript
const promptTimeout = setTimeout(() => {
  console.warn('Google prompt timeout - no response');
  setIsPromptingGoogle(false);
}, 5000);
```
- If Google prompt doesn't respond within 5 seconds, automatically stop loading

### 3. **Fixed Success Handler**
```typescript
const handleGoogleSuccess = useCallback(async (credentialResponse: any) => {
  setIsLoading(true);
  setIsPromptingGoogle(false); // ← Key fix: stop prompting state
  
  // ... rest of authentication
  
  setIsLoading(false); // Ensure always set in catch blocks
}, [login, navigate]);
```

## Testing the Fix

### Step 1: Open Frontend
```
http://localhost:5174/login
```

### Step 2: Click Google Sign-In Button
- Should show Google popup/prompt
- User can select account
- After selection, loading should stop
- Should redirect to home page OR show error message

### Step 3: Expected Behaviors

**Success Case**:
1. Click Google button → Loading spinner appears
2. Google prompt shows → Select account
3. Loading stops → Redirects to home page
4. User is logged in ✅

**Error Case**:
1. Click Google button → Loading spinner appears
2. Network error occurs → Loading stops
3. Error message displays → User can retry ✅

**Timeout Case** (new):
1. Click Google button → Loading spinner appears
2. Google prompt doesn't respond for 5 seconds
3. Loading automatically stops
4. User can try again ✅

## Technical Details

### What Was Fixed

**File**: `src/pages/auth/Login.tsx`

**Function 1**: `handleGoogleSuccess()`
- Added `setIsPromptingGoogle(false)` immediately
- Added `setIsLoading(false)` in error handlers
- Ensures loading states always reset

**Function 2**: `handleGoogleButtonClick()`
- Added prompt timeout (5 seconds)
- Added proper cleanup of timeout
- Better error recovery

## Verification Checklist

- [ ] Google login button appears on login page
- [ ] Clicking button opens Google prompt
- [ ] Can select Google account
- [ ] Loading stops after selection
- [ ] Successfully redirects to home
- [ ] Error messages display properly if connection fails
- [ ] Prompt times out after 5 seconds if no response

## Next Steps if Issues Persist

1. **Check Google Client ID**:
   - Verify `VITE_GOOGLE_CLIENT_ID` is set in `.env`
   - Should be from Google Cloud Console

2. **Check Backend Connection**:
   - Ensure backend server is running on port 5000
   - Verify `/api/auth/google` endpoint exists

3. **Check Browser Console**:
   - Press F12 → Console tab
   - Look for error messages
   - Note any URLs being called

4. **Clear Cache & Reload**:
   ```
   Ctrl+Shift+Delete → Clear all
   Ctrl+F5 → Hard refresh
   ```

## Environment Variables Required

Ensure these are set in `madu/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

For production:
```env
VITE_API_URL=https://madu-server.onrender.com/api
VITE_GOOGLE_CLIENT_ID=your-production-google-client-id
```

## Debugging

To see detailed logs:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Check for logs like:
   ```
   Mengirim Google credential ke backend...
   API Base URL: http://localhost:5000/api
   Full endpoint: http://localhost:5000/api/auth/google
   ```

4. Look for any error messages

---

**Status**: ✅ Fixed and Ready for Testing
**Last Updated**: November 22, 2025
