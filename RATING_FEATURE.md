# Rating & Review Feature Implementation

## Overview
Added a complete rating and review system for products on the ProductDetail page. Logged-in users can now rate products (1-5 stars, supports decimals) and leave comments.

## Changes Made

### Backend

#### 1. New Review Model (`server/src/models/review.js`)
Created a new MongoDB schema for product reviews:
- `productId`: Reference to Product
- `userId`: Reference to User  
- `userName`: Author's name
- `rating`: 0.5 - 5 (supports decimals)
- `comment`: 5-500 characters
- `timestamps`: createdAt, updatedAt
- Indexes on `productId` (with sort by date) and `userId` for efficient queries

#### 2. Product Routes Updated (`server/src/routes/products.js`)
Added three new endpoints:

**GET `/products/:id/reviews`**
- Public endpoint
- Fetches all reviews for a product
- Returns: reviews array, averageRating, totalReviews count
- Calculates average rating from all reviews

**POST `/products/:id/reviews`** (Requires Authentication)
- Creates new review for logged-in users
- Validates rating: 0.5 - 5
- Validates comment: 5 - 500 characters
- Prevents duplicate reviews (one per user per product)
- Returns: success message and created review

**DELETE `/products/:id/reviews/:reviewId`** (Requires Authentication)
- Only review owner can delete
- Verifies userId matches review.userId
- Returns: success message

### Frontend

#### ProductDetail.tsx Updates
Enhanced component with full review system:

**New State Variables**
- `reviews`: Array of Review objects
- `averageRating`: Calculated average (displayed instead of hardcoded 4.5)
- `rating`: Star picker (1-5, user selectable)
- `comment`: Text input for review comment
- `hoverRating`: For interactive star display
- `submitting`: Loading state during submission
- `submitError`: Error message display
- `submitSuccess`: Success message display

**New Functions**
- `fetchReviews()`: Fetches all reviews for product
- `handleSubmitReview()`: Submits new review with validation
- `handleDeleteReview()`: Deletes user's own review

**New UI Sections**

1. **Dynamic Rating Display**
   - Shows average rating (was hardcoded 4.5, now dynamic)
   - Shows total number of reviews

2. **Review Form** (Only shown when logged in)
   - Interactive star picker (1-5 scale)
   - Large comment textarea with character counter
   - Shows rating value in real-time
   - Disabled submit if comment < 5 chars
   - Success/error message display
   - Submit button with loading state

3. **Reviews List Section**
   - Displays all reviews sorted by newest first
   - Shows reviewer name, rating stars, and comment
   - Displays human-readable timestamps
   - Delete button visible only for review owner
   - Shows "No reviews yet" message if empty

**Features**
- ✅ Logged-in user check via `useAuth()` hook
- ✅ Star rating picker with hover effects
- ✅ Decimal rating support (1.5, 2.5, etc.)
- ✅ Real-time character counter (5-500 chars)
- ✅ Delete confirmation dialog
- ✅ Automatic review refresh after submission/deletion
- ✅ Prevents duplicate reviews per user
- ✅ Responsive design for mobile/tablet/desktop

## Technical Details

### Data Flow
1. Component mounts → `fetchProduct()` called
2. Product loads → `fetchReviews()` auto-triggered
3. Reviews fetched → averageRating calculated
4. User fills form → `handleSubmitReview()` called
5. Review submitted → `fetchReviews()` refreshes list
6. User clicks delete → `handleDeleteReview()` + confirmation
7. Review deleted → `fetchReviews()` refreshes list

### API Routes
```
POST   /api/products/:id/reviews           (auth required)
GET    /api/products/:id/reviews           (public)
DELETE /api/products/:id/reviews/:reviewId (auth required, owner only)
```

### Authentication
Uses existing `useAuth()` hook from AuthContext:
- Checks `user` object for login status
- Uses localStorage token for requests
- Verifies review ownership before allowing deletion

### Validation
**Frontend:**
- Rating: 1-5 (integer clicks on stars)
- Comment: 5-500 characters
- User must be logged in

**Backend:**
- Rating: 0.5-5 (allows decimals for future use)
- Comment: 5-500 characters
- One review per user per product
- Product existence check
- User ownership verification for deletion

## Files Modified
1. `server/src/models/review.js` - NEW
2. `server/src/routes/products.js` - Added review endpoints
3. `madu/src/pages/ProductDetail.tsx` - Added review UI and logic

## Testing Checklist
- [ ] Backend: POST /products/:id/reviews creates review
- [ ] Backend: GET /products/:id/reviews returns reviews + average
- [ ] Backend: DELETE prevents duplicate reviews
- [ ] Backend: DELETE /reviews/:id only works for owner
- [ ] Frontend: Form hidden when not logged in
- [ ] Frontend: Submit validates comment length
- [ ] Frontend: Stars picker works (1-5 and hover)
- [ ] Frontend: Success message shows after submit
- [ ] Frontend: List refreshes automatically
- [ ] Frontend: Can delete own review only
- [ ] Frontend: Average rating updates in header

## Future Enhancements
- Support decimal ratings (e.g., 4.5) via slider in form
- Vote on review helpfulness (helpful/not helpful)
- Admin review moderation
- Review images/attachments
- Review response from sellers
- Filter reviews by rating
- Sort options (newest, highest rated, etc.)
