# replit.md

## Overview

Tour Der Wang (ที่นี่ วังสามหมอ) is a Thai tourism promotion platform focused on Wang Sam Mo District in Udon Thani, Thailand. The application serves as a marketplace connecting tourists with local businesses including attractions, restaurants, accommodations, homestays, and services. The platform features AI-driven personalized recommendations, business management tools, payment processing for premium features, and bilingual support (Thai/English).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite for build tooling
- **Styling**: Tailwind CSS with custom Thai tourism theme colors (crocodile orange as primary)
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: Wouter for client-side routing
- **Font Strategy**: Inter for English text, Kanit for Thai text

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Authentication**: Replit Auth with OpenID Connect integration
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple
- **API Design**: RESTful endpoints with consistent error handling middleware
- **File Organization**: Modular route handlers with centralized storage interface

### Database Strategy
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Neon PostgreSQL (configured via DATABASE_URL)
- **Schema Design**: Normalized relational schema with proper foreign key constraints
- **Key Tables**: users, businesses, reviews, virtual tours, payment transactions, sessions
- **Data Validation**: Zod schemas for runtime type checking and API validation

### Authentication & Authorization
- **Provider**: Replit Auth (mandatory for deployment platform)
- **Session Storage**: PostgreSQL-backed sessions for persistence
- **User Flow**: OAuth redirect flow with automatic user creation/updates
- **Protection**: Route-level authentication guards with redirect fallbacks
- **User Types**: Public visitors and authenticated business owners

### Payment Processing
- **Provider**: Stripe for payment processing
- **Integration**: React Stripe.js for frontend, Stripe API for backend
- **Features**: One-time payments and recurring subscriptions
- **Use Cases**: Premium business features, highlighted listings, virtual tours
- **Security**: Server-side payment processing with secure credential handling

### Search & Recommendation System
- **Basic Search**: Category-based and text-based search functionality
- **AI Recommendations**: Placeholder implementation ready for ML integration
- **Data Sources**: Business listings with ratings, reviews, and metadata
- **Personalization**: User-based recommendation system foundation

### Bilingual Support
- **Strategy**: Dual-field approach (name/nameEn, description/descriptionEn)
- **UI**: Mixed Thai/English interface with cultural context
- **Content**: Primary Thai content with English translations for international users

## External Dependencies

### Core Services
- **Neon Database**: PostgreSQL hosting with connection pooling
- **Stripe**: Payment processing and subscription management
- **Replit Auth**: OAuth authentication provider (platform requirement)

### Frontend Libraries
- **UI Framework**: React 18 with TypeScript
- **Build Tool**: Vite with development server and hot reload
- **Styling**: Tailwind CSS with PostCSS processing
- **Component Library**: Radix UI primitives + shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Authentication**: Passport.js with OpenID Connect strategy
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **Payment Integration**: Stripe Node.js SDK
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Path Aliases**: Configured for clean imports (@/, @shared/)
- **Asset Management**: Vite asset handling with attached_assets directory
- **Environment Management**: dotenv for local development configuration