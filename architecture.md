
# System Architecture Documentation

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENT TIER                            │
├─────────────────────────────────────────────────────────────────┤
│  React 18 + TypeScript                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Landing Page  │  │   Listings      │  │   Dashboard     │ │
│  │   - Hero        │  │   - Search      │  │   - Analytics   │ │
│  │   - Features    │  │   - Filters     │  │   - Payments    │ │
│  │   - Pricing     │  │   - Categories  │  │   - Reviews     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 Shared Components                       │   │
│  │  Header | Footer | Navigation | Forms | UI Library     │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                   │
                              HTTP/HTTPS
                                   │
┌─────────────────────────────────────────────────────────────────┐
│                        APPLICATION TIER                         │
├─────────────────────────────────────────────────────────────────┤
│  Express.js + TypeScript                                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Auth Routes   │  │  Business API   │  │  Payment API    │ │
│  │   GET /auth/*   │  │  GET /api/biz   │  │  POST /pay/*    │ │
│  │   POST /login   │  │  POST /api/biz  │  │  GET /checkout  │ │
│  │   POST /logout  │  │  PUT /api/biz   │  │  webhook/*      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Middleware Stack                      │   │
│  │  Session | Auth | CORS | Logging | Error Handling      │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                   │
                              Database Connection
                                   │
┌─────────────────────────────────────────────────────────────────┐
│                          DATA TIER                              │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL (Neon Database)                                    │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │     Users       │  │   Businesses    │  │   Transactions  │ │
│  │  - id (PK)      │  │  - id (PK)      │  │  - id (PK)      │ │
│  │  - email        │  │  - user_id (FK) │  │  - user_id (FK) │ │
│  │  - profile      │  │  - name         │  │  - amount       │ │
│  │  - stripe_id    │  │  - category     │  │  - stripe_id    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │    Reviews      │  │  Virtual Tours  │  │    Sessions     │ │
│  │  - id (PK)      │  │  - id (PK)      │  │  - sid (PK)     │ │
│  │  - business_id  │  │  - business_id  │  │  - sess (JSON)  │ │
│  │  - user_id      │  │  - tour_url     │  │  - expire       │ │
│  │  - rating       │  │  - title        │  │                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 🌐 Frontend Architecture

### Component Hierarchy

```
App.tsx
├── QueryClientProvider
├── TooltipProvider
├── Toaster
└── Router (Wouter)
    ├── Landing Page
    │   ├── Header
    │   ├── HeroSection
    │   ├── CategoryTabs
    │   ├── FeaturedSection
    │   ├── BusinessSection
    │   ├── PricingSection
    │   ├── ReviewsSection
    │   └── Footer
    ├── Listings Page
    │   ├── Header
    │   ├── SearchBar
    │   ├── CategoryTabs
    │   ├── ListingCard[]
    │   └── Pagination
    ├── Business Dashboard
    │   ├── Header
    │   ├── Analytics
    │   ├── BusinessForm
    │   ├── ReviewsManager
    │   └── PaymentSettings
    └── Checkout Page
        ├── Header
        ├── PaymentForm
        ├── PricingSummary
        └── StripeElements
```

### State Management Strategy

```typescript
// Server State (TanStack Query)
const { data: businesses } = useQuery({
  queryKey: ['api', 'businesses'],
  queryFn: fetchBusinesses
});

// Local State (React Hooks)
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');

// Authentication State (Custom Hook)
const { isAuthenticated, user, login, logout } = useAuth();
```

### Routing Structure

```typescript
// Public Routes (Unauthenticated)
'/': Landing Page
'/listings/:category?': Business Listings

// Protected Routes (Authenticated)
'/': Home Dashboard
'/business-dashboard': Business Management
'/checkout': Payment Processing
```

## 🔧 Backend Architecture

### API Endpoints Structure

```typescript
// Authentication Routes
GET    /api/auth/user          // Get current user
POST   /api/auth/login         // Login user
POST   /api/auth/logout        // Logout user
GET    /api/auth/callback      // OAuth callback

// Business Management
GET    /api/businesses         // List all businesses
GET    /api/businesses/:id     // Get specific business
POST   /api/businesses         // Create new business
PUT    /api/businesses/:id     // Update business
DELETE /api/businesses/:id     // Delete business

// Reviews System
GET    /api/reviews/:businessId // Get business reviews
POST   /api/reviews             // Create review
PUT    /api/reviews/:id         // Update review
DELETE /api/reviews/:id         // Delete review

// Payment Processing
POST   /api/payments/create-intent    // Create payment intent
POST   /api/payments/webhook          // Stripe webhook
GET    /api/payments/history          // Payment history

// Virtual Tours
GET    /api/tours/:businessId   // Get business tours
POST   /api/tours               // Create virtual tour
PUT    /api/tours/:id           // Update tour
DELETE /api/tours/:id           // Delete tour
```

### Middleware Stack

```typescript
// Request Processing Order
1. Express JSON Parser
2. URL Encoded Parser
3. Request Logging Middleware
4. Session Management
5. Authentication Check
6. Route Handlers
7. Error Handling Middleware
```

### Database Layer (Drizzle ORM)

```typescript
// Schema Relationships
users (1) ←→ (n) businesses
businesses (1) ←→ (n) reviews
businesses (1) ←→ (n) virtualTours
users (1) ←→ (n) paymentTransactions
businesses (1) ←→ (n) paymentTransactions

// Query Examples
const businessesWithReviews = await db
  .select()
  .from(businesses)
  .leftJoin(reviews, eq(businesses.id, reviews.businessId));
```

## 🔐 Authentication Flow

```
┌─────────────┐    1. Click Login    ┌─────────────┐
│   Client    │ ──────────────────→  │   Server    │
│             │                      │             │
│             │ ←──────────────────  │             │
└─────────────┘  2. Redirect to Auth └─────────────┘
       │                                     │
       │ 3. OAuth Flow                       │
       ↓                                     │
┌─────────────┐                             │
│ Replit Auth │                             │
│  Provider   │                             │
└─────────────┘                             │
       │                                     │
       │ 4. Auth Callback                    │
       └────────────────────────────────────→│
                                             │
┌─────────────┐  5. Set Session Cookie   ┌─────────────┐
│   Client    │ ←──────────────────────  │   Server    │
│             │                          │             │
│             │  6. Authenticated Req    │             │
│             │ ──────────────────────→  │             │
└─────────────┘                          └─────────────┘
```

### Session Management

```typescript
// PostgreSQL Session Store
const sessionStore = new (require('connect-pg-simple')(session))({
  pool: db,
  tableName: 'sessions'
});

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
```

## 💳 Payment Integration (Stripe)

### Payment Flow

```
┌─────────────┐  1. Select Plan     ┌─────────────┐
│   Client    │ ──────────────────→ │   Server    │
│             │                     │             │
│             │ ←────────────────── │             │
└─────────────┘  2. Client Secret   └─────────────┘
       │                                   │
       │ 3. Payment Elements               │ 4. Create Intent
       ↓                                   ↓
┌─────────────┐                    ┌─────────────┐
│   Stripe    │                    │   Stripe    │
│  Elements   │                    │     API     │
└─────────────┘                    └─────────────┘
       │                                   │
       │ 5. Confirm Payment                │
       └──────────────────────────────────→│
                                           │
┌─────────────┐  6. Webhook Event   ┌─────────────┐
│   Server    │ ←─────────────────── │   Stripe    │
│             │                      │             │
│             │  7. Update DB        │             │
└─────────────┘                      └─────────────┘
```

### Stripe Integration Components

```typescript
// Frontend Payment Form
<Elements stripe={stripePromise}>
  <CheckoutForm />
</Elements>

// Backend Payment Intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000, // $20.00
  currency: 'thb',
  customer: user.stripeCustomerId
});
```

## 🗄️ Database Schema Design

### Entity Relationship Diagram

```
┌─────────────────┐         ┌─────────────────┐
│     Users       │         │   Businesses    │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │────────→│ id (PK)         │
│ email           │    1:n  │ user_id (FK)    │
│ firstName       │         │ name            │
│ lastName        │         │ nameEn          │
│ profileImageUrl │         │ description     │
│ stripeCustomerId│         │ category        │
│ createdAt       │         │ isVerified      │
└─────────────────┘         │ isPremium       │
                            │ rating          │
                            │ reviewCount     │
                            └─────────────────┘
                                     │
                        ┌────────────┼────────────┐
                        │            │            │
                        ↓            ↓            ↓
               ┌─────────────┐ ┌──────────────┐ ┌─────────────┐
               │   Reviews   │ │ VirtualTours │ │Transactions │
               ├─────────────┤ ├──────────────┤ ├─────────────┤
               │ id (PK)     │ │ id (PK)      │ │ id (PK)     │
               │business_id  │ │business_id   │ │business_id  │
               │ user_id     │ │ title        │ │ user_id     │
               │ rating      │ │ tourUrl      │ │ amount      │
               │ comment     │ │ isActive     │ │ status      │
               │ isVerified  │ │ createdAt    │ │ type        │
               └─────────────┘ └──────────────┘ └─────────────┘
```

### Data Validation & Types

```typescript
// Zod Schema Validation
export const insertBusinessSchema = createInsertSchema(businesses).omit({
  id: true,
  userId: true,
  rating: true,
  reviewCount: true,
  createdAt: true,
  updatedAt: true,
});

// TypeScript Types
export type Business = typeof businesses.$inferSelect;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
```

## 🌍 Internationalization (i18n)

### Bilingual Content Strategy

```typescript
// Database Schema Design
businesses: {
  name: varchar("name"),        // Thai content
  nameEn: varchar("name_en"),   // English content
  description: text("description"),      // Thai
  descriptionEn: text("description_en")  // English
}

// Frontend Display Logic
const displayName = isEnglish ? business.nameEn || business.name : business.name;
```

## ⚡ Performance Optimizations

### Frontend Performance

```typescript
// Code Splitting (React.lazy)
const BusinessDashboard = lazy(() => import('./pages/business-dashboard'));

// Image Optimization
<LazyImage
  src={business.imageUrl}
  alt={business.name}
  loading="lazy"
  className="aspect-video object-cover"
/>

// Query Optimization (TanStack Query)
const { data } = useQuery({
  queryKey: ['businesses', category, searchTerm],
  queryFn: () => fetchBusinesses({ category, search: searchTerm }),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### Backend Performance

```typescript
// Database Query Optimization
const businesses = await db
  .select({
    id: businesses.id,
    name: businesses.name,
    rating: businesses.rating,
    reviewCount: businesses.reviewCount
  })
  .from(businesses)
  .where(eq(businesses.category, category))
  .limit(20);

// Response Caching Headers
res.set({
  'Cache-Control': 'public, max-age=300', // 5 minutes
  'ETag': generateETag(data)
});
```

## 📊 Monitoring & Analytics

### Performance Metrics

```typescript
// Core Web Vitals Tracking
export function PerformanceMonitor() {
  useEffect(() => {
    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
  }, []);
}

// Server-side Request Logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
  });
  next();
});
```

## 🔒 Security Measures

### Authentication Security
- OAuth 2.0 / OpenID Connect with Replit Auth
- Secure session storage in PostgreSQL
- CSRF protection via SameSite cookies
- Rate limiting on authentication endpoints

### Data Protection
- SQL injection prevention via Drizzle ORM
- Input validation with Zod schemas
- XSS protection through React's built-in escaping
- Secure environment variable management

### Payment Security
- PCI compliance through Stripe
- Server-side payment processing only
- Webhook signature verification
- Encrypted sensitive data storage

## 🚀 Deployment Architecture

### Replit Deployment Configuration

```toml
# .replit
[deployment]
deploymentTarget = "autoscale"
build = ["npm", "run", "build"]
run = ["npm", "run", "start"]

[[ports]]
localPort = 5000
externalPort = 80
```

### Environment Configuration

```bash
# Production Environment
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
SESSION_SECRET=...
```

This architecture supports scalability, maintainability, and provides a solid foundation for the Thai tourism platform's growth and development.
