
# Tour Der Wang - Application Sitemap

## 🗺️ Site Structure Overview

```
Tour Der Wang (ที่นี่ วังสามหมอ)
├── 🏠 Public Routes (Unauthenticated Users)
├── 🔐 Protected Routes (Authenticated Users)  
├── 💼 Business Routes (Business Owners)
├── 🔧 API Endpoints
└── 📄 Static Pages
```

## 🏠 Public Routes (Unauthenticated Users)

### Landing & Discovery
```
/ (Root)
├── 📍 Landing Page
│   ├── Hero Section (Wang Yai Park backdrop)
│   ├── Category Tabs (Attractions, Restaurants, Accommodations, etc.)
│   ├── Featured Businesses
│   ├── Business Promotion Section
│   ├── Pricing Plans
│   ├── Customer Reviews
│   └── Footer with Contact Info
│
└── /listings/:category?
    ├── 📋 Business Listings Page
    │   ├── Search Bar (Thai/English support)
    │   ├── Category Filter Tabs
    │   │   ├── /listings (All categories)
    │   │   ├── /listings/attractions (สถานที่ท่องเที่ยว)
    │   │   ├── /listings/restaurants (ร้านอาหาร)
    │   │   ├── /listings/accommodations (ที่พัก)
    │   │   ├── /listings/homestays (โฮมสเตย์)
    │   │   └── /listings/services (บริการ)
    │   ├── Business Cards Grid
    │   ├── Pagination
    │   └── Filter Sidebar
    │       ├── Price Range
    │       ├── Rating Filter
    │       ├── Location Filter
    │       └── Features Filter
    │
    └── /listings/:id
        └── 📱 Business Detail Page
            ├── Business Gallery
            ├── Basic Information
            ├── Contact Details
            ├── Location Map
            ├── Reviews Section
            ├── Virtual Tour (if available)
            └── Related Businesses
```

### Authentication Flow
```
/auth
├── /login
│   ├── Replit OAuth Login
│   ├── Social Media Login Options
│   └── Redirect to Dashboard after login
│
└── /callback
    └── OAuth Callback Handler
```

### Error Pages
```
/404
└── 🚫 Not Found Page
    ├── Thai/English error message
    ├── Navigation suggestions
    └── Return to homepage link
```

## 🔐 Protected Routes (Authenticated Users)

### User Dashboard
```
/ (Root - Authenticated)
└── 🏠 User Home Dashboard
    ├── Welcome Section
    ├── Personalized Recommendations
    ├── Recent Activity
    ├── Favorite Businesses
    ├── Booking History (future feature)
    └── Quick Actions
```

### Enhanced Listings (Authenticated)
```
/listings/:category?
└── 📋 Enhanced Listings (Same as public + personalization)
    ├── Personalized recommendations
    ├── Saved favorites
    ├── Review capabilities
    └── Booking functionality (future)
```

### User Profile
```
/profile
└── 👤 User Profile Management
    ├── Personal Information
    ├── Profile Picture
    ├── Contact Details
    ├── Preferences
    │   ├── Language Selection
    │   ├── Notification Settings
    │   └── Privacy Settings
    └── Account Actions
        ├── Change Password
        ├── Delete Account
        └── Export Data
```

## 💼 Business Routes (Business Owners)

### Business Dashboard
```
/business-dashboard
└── 📊 Business Management Dashboard
    ├── 📈 Analytics Overview
    │   ├── View Statistics
    │   ├── Review Metrics
    │   ├── Performance Charts
    │   └── Revenue Tracking
    │
    ├── 🏢 Business Profile Management
    │   ├── Basic Information Form
    │   │   ├── Business Name (Thai/English)
    │   │   ├── Description (Thai/English)
    │   │   ├── Category Selection
    │   │   ├── Contact Information
    │   │   └── Operating Hours
    │   ├── Location & Address
    │   ├── Photo Gallery Management
    │   ├── Amenities & Features
    │   └── Social Media Links
    │
    ├── ⭐ Reviews Management
    │   ├── Review Responses
    │   ├── Rating Analytics
    │   ├── Review Moderation
    │   └── Customer Feedback
    │
    ├── 🎥 Virtual Tours (Premium)
    │   ├── Tour Upload
    │   ├── Tour Management
    │   ├── 360° Photo Integration
    │   └── Tour Analytics
    │
    ├── 💰 Premium Features
    │   ├── Featured Listing Status
    │   ├── Priority Placement
    │   ├── Advanced Analytics
    │   └── Multiple Photo Upload
    │
    └── 🔧 Settings
        ├── Notification Preferences
        ├── Visibility Settings
        ├── Integration Settings
        └── Account Management
```

### Business Registration
```
/business/register
└── 📝 Business Registration Wizard
    ├── Step 1: Business Type Selection
    ├── Step 2: Basic Information
    ├── Step 3: Location & Contact
    ├── Step 4: Photos & Description
    ├── Step 5: Verification
    └── Step 6: Payment Plan Selection
```

## 💳 Payment & Checkout

### Payment Processing
```
/checkout
└── 💰 Payment & Subscription
    ├── Plan Selection
    │   ├── Basic Listing (Free)
    │   ├── Featured Listing (฿500/month)
    │   ├── Premium Package (฿1,000/month)
    │   └── Enterprise (฿2,500/month)
    │
    ├── Payment Methods
    │   ├── Credit/Debit Cards (Stripe)
    │   ├── Bank Transfer
    │   └── Mobile Banking (future)
    │
    ├── Billing Information
    ├── Order Summary
    ├── Terms & Conditions
    └── Payment Confirmation
```

### Payment Success/Failure
```
/payment
├── /success
│   └── ✅ Payment Success Page
│       ├── Order Confirmation
│       ├── Receipt Details
│       ├── Next Steps
│       └── Dashboard Link
│
└── /failed
    └── ❌ Payment Failed Page
        ├── Error Details
        ├── Retry Options
        ├── Support Contact
        └── Alternative Payment Methods
```

## 🔧 API Endpoints

### Authentication API
```
/api/auth
├── GET /user                    # Get current user
├── POST /login                  # Login user
├── POST /logout                 # Logout user
└── GET /callback               # OAuth callback
```

### Business Management API
```
/api/businesses
├── GET /                       # List all businesses
├── GET /:id                    # Get specific business
├── POST /                      # Create new business
├── PUT /:id                    # Update business
├── DELETE /:id                 # Delete business
└── GET /:id/analytics          # Business analytics
```

### Reviews API
```
/api/reviews
├── GET /:businessId            # Get business reviews
├── POST /                      # Create review
├── PUT /:id                    # Update review
├── DELETE /:id                 # Delete review
└── POST /:id/response          # Business response to review
```

### Payment API
```
/api/payments
├── POST /create-intent         # Create payment intent
├── POST /confirm               # Confirm payment
├── POST /webhook               # Stripe webhook
├── GET /history                # Payment history
└── GET /subscription/status    # Subscription status
```

### Virtual Tours API
```
/api/tours
├── GET /:businessId            # Get business tours
├── POST /                      # Create virtual tour
├── PUT /:id                    # Update tour
├── DELETE /:id                 # Delete tour
└── GET /:id/analytics          # Tour analytics
```

### Search & Discovery API
```
/api/search
├── GET /businesses             # Search businesses
├── GET /categories             # Get categories
├── GET /featured               # Get featured businesses
├── GET /recommendations        # Personalized recommendations
└── GET /nearby                 # Location-based search
```

## 📄 Static & Utility Pages

### Legal & Compliance
```
/legal
├── /privacy-policy             # Privacy Policy (Thai/English)
├── /terms-of-service          # Terms of Service (Thai/English)
├── /cookie-policy             # Cookie Policy
└── /refund-policy             # Refund Policy
```

### Support & Information
```
/support
├── /help                      # Help Center
│   ├── /faq                   # Frequently Asked Questions
│   ├── /getting-started       # User Guide
│   ├── /business-guide        # Business Owner Guide
│   └── /contact               # Contact Information
│
└── /about
    ├── /wang-sam-mo           # About Wang Sam Mo District
    ├── /our-mission           # Platform Mission
    ├── /team                  # Team Information
    └── /press                 # Press & Media
```

## 🌐 SEO & Language Routes

### Multilingual Support
```
Every route supports language parameters:
├── ?lang=th (Thai - Default)
└── ?lang=en (English)

Example:
├── /listings?lang=en
└── /business-dashboard?lang=th
```

### SEO-Optimized URLs
```
Business Listings:
├── /listings/restaurants/thai-food
├── /listings/attractions/wang-yai-park
└── /listings/homestays/traditional-thai-house

Category Pages:
├── /wang-sam-mo-attractions
├── /wang-sam-mo-restaurants
└── /wang-sam-mo-accommodations
```

## 🔄 User Journey Mapping

### Tourist Journey
```
1. 🏠 Landing Page
   ↓
2. 📋 Browse Listings by Category
   ↓
3. 📱 View Business Details
   ↓
4. ⭐ Read Reviews
   ↓
5. 📞 Contact Business or Book (future)
```

### Business Owner Journey
```
1. 🏠 Landing Page
   ↓
2. 📝 Learn About Business Benefits
   ↓
3. 🔐 Register/Login
   ↓
4. 📝 Register Business
   ↓
5. 💳 Choose Payment Plan
   ↓
6. 📊 Manage Business Dashboard
```

### Authenticated User Journey
```
1. 🔐 Login
   ↓
2. 🏠 Personalized Dashboard
   ↓
3. 📋 Enhanced Listings with Favorites
   ↓
4. ⭐ Leave Reviews
   ↓
5. 👤 Manage Profile
```

## 📊 Analytics & Tracking

### Page Analytics Tracking
```
Key Pages for Analytics:
├── Landing page conversion rates
├── Listing page engagement
├── Business registration completion
├── Payment success rates
└── User retention metrics
```

### User Flow Analysis
```
Critical User Flows:
├── Visitor to Customer conversion
├── Business registration funnel
├── Payment completion rates
├── Review submission rates
└── Return visitor patterns
```

This comprehensive sitemap provides a complete overview of the Tour Der Wang application structure, user journeys, and all available routes for both users and developers.
