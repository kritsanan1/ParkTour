
# File Structure Documentation

## Directory Tree Analysis

```
tour-der-wang/
├── 📁 attached_assets/                              # Project assets and documentation files
│   ├── 📄 Pasted--Project-Name-Tourderwang-Description-Tourderwang-i-1754404795108_1754404795109.txt 🟢
│   ├── 📄 Pasted--Setup-Infrastructure-Easy-Project-Initialization-Set-up-a-new-Vite-Re-1754404802914_1754404802915.txt 🟢
│   ├── 📄 Pasted-You-are-a-technical-documentation-specialist-tasked-with-creating-comprehensive-web-application-docu-1754407036595_1754407036597.txt 🟢
│   ├── 🖼️ logo_1754404819577.png                    # Project logo image
│   └── 🖼️ wang-yai-park-hero_1754404819577.jpg     # Hero section background image
├── 📁 client/                                       # Frontend React application
│   ├── 📁 src/                                      # Source code directory
│   │   ├── 📁 components/                           # React components
│   │   │   ├── 📁 ui/                               # Reusable UI components (shadcn/ui)
│   │   │   │   ├── 📄 accordion.tsx 🟡               # Collapsible content component
│   │   │   │   ├── 📄 alert-dialog.tsx 🟡           # Modal dialog for alerts
│   │   │   │   ├── 📄 alert.tsx 🟢                  # Alert notification component
│   │   │   │   ├── 📄 aspect-ratio.tsx 🟢           # Maintains aspect ratio wrapper
│   │   │   │   ├── 📄 avatar.tsx 🟡                 # User avatar display component
│   │   │   │   ├── 📄 badge.tsx 🟢                  # Status/label badge component
│   │   │   │   ├── 📄 breadcrumb.tsx 🟡             # Navigation breadcrumb component
│   │   │   │   ├── 📄 button.tsx 🟡                 # Primary button component
│   │   │   │   ├── 📄 calendar.tsx 🟡               # Date picker calendar component
│   │   │   │   ├── 📄 card.tsx 🟢                   # Content card wrapper component
│   │   │   │   ├── 📄 carousel.tsx 🟡               # Image/content carousel component
│   │   │   │   ├── 📄 chart.tsx 🟡                  # Data visualization chart component
│   │   │   │   ├── 📄 checkbox.tsx 🟡               # Form checkbox input component
│   │   │   │   ├── 📄 collapsible.tsx 🟢            # Collapsible content wrapper
│   │   │   │   ├── 📄 command.tsx 🟡                # Command palette/search component
│   │   │   │   ├── 📄 context-menu.tsx 🟡           # Right-click context menu component
│   │   │   │   ├── 📄 dialog.tsx 🟡                 # Modal dialog component
│   │   │   │   ├── 📄 drawer.tsx 🟡                 # Side drawer/sheet component
│   │   │   │   ├── 📄 dropdown-menu.tsx 🟡          # Dropdown menu component
│   │   │   │   ├── 📄 form.tsx 🟡                   # Form wrapper and validation
│   │   │   │   ├── 📄 hover-card.tsx 🟡             # Hover popup card component
│   │   │   │   ├── 📄 input-otp.tsx 🟡              # OTP input field component
│   │   │   │   ├── 📄 input.tsx 🟡                  # Form input field component
│   │   │   │   ├── 📄 label.tsx 🟢                  # Form label component
│   │   │   │   ├── 📄 lazy-image.tsx 🟡             # Lazy loading image component
│   │   │   │   ├── 📄 menubar.tsx 🟡                # Navigation menu bar component
│   │   │   │   ├── 📄 navigation-menu.tsx 🟡        # Main navigation menu component
│   │   │   │   ├── 📄 pagination.tsx 🟡             # Page navigation component
│   │   │   │   ├── 📄 popover.tsx 🟡                # Popup content component
│   │   │   │   ├── 📄 progress.tsx 🟢               # Progress bar component
│   │   │   │   ├── 📄 radio-group.tsx 🟡            # Radio button group component
│   │   │   │   ├── 📄 resizable.tsx 🟡              # Resizable panels component
│   │   │   │   ├── 📄 scroll-area.tsx 🟡            # Custom scrollable area component
│   │   │   │   ├── 📄 select.tsx 🟡                 # Dropdown select component
│   │   │   │   ├── 📄 separator.tsx 🟢              # Visual separator component
│   │   │   │   ├── 📄 sheet.tsx 🟡                  # Side sheet/drawer component
│   │   │   │   ├── 📄 sidebar.tsx 🟡                # Sidebar navigation component
│   │   │   │   ├── 📄 skeleton.tsx 🟢               # Loading skeleton component
│   │   │   │   ├── 📄 slider.tsx 🟡                 # Range slider input component
│   │   │   │   ├── 📄 switch.tsx 🟡                 # Toggle switch component
│   │   │   │   ├── 📄 table.tsx 🟡                  # Data table component
│   │   │   │   ├── 📄 tabs.tsx 🟡                   # Tabbed content component
│   │   │   │   ├── 📄 textarea.tsx 🟡               # Multi-line text input component
│   │   │   │   ├── 📄 toast.tsx 🟡                  # Toast notification component
│   │   │   │   ├── 📄 toaster.tsx 🟡                # Toast notification container
│   │   │   │   ├── 📄 toggle-group.tsx 🟡           # Toggle button group component
│   │   │   │   ├── 📄 toggle.tsx 🟡                 # Toggle button component
│   │   │   │   └── 📄 tooltip.tsx 🟡                # Tooltip hover component
│   │   │   ├── 📄 BusinessSection.tsx 🟡            # Business promotion section component
│   │   │   ├── 📄 CategoryTabs.tsx 🟡               # Category filter tabs component
│   │   │   ├── 📄 FeaturedSection.tsx 🟡            # Featured listings section component
│   │   │   ├── 📄 Footer.tsx 🟡                     # Site footer component
│   │   │   ├── 📄 Header.tsx 🟡                     # Site header/navigation component
│   │   │   ├── 📄 HeroSection.tsx 🟡                # Landing page hero section
│   │   │   ├── 📄 Image.tsx 🟡                      # Optimized image component
│   │   │   ├── 📄 ListingCard.tsx 🟡                # Business listing card component
│   │   │   ├── 📄 MobileNav.tsx 🟡                  # Mobile navigation component
│   │   │   ├── 📄 PerformanceMonitor.tsx 🟡         # Performance monitoring component
│   │   │   ├── 📄 PricingSection.tsx 🟡             # Pricing plans section component
│   │   │   ├── 📄 ReviewsSection.tsx 🟡             # Reviews display section component
│   │   │   ├── 📄 SEOHead.tsx 🟡                    # SEO meta tags component
│   │   │   └── 📄 SearchBar.tsx 🟡                  # Search functionality component
│   │   ├── 📁 hooks/                                # Custom React hooks
│   │   │   ├── 📄 use-mobile.tsx 🟡                 # Mobile device detection hook
│   │   │   ├── 📄 use-toast.ts 🟡                   # Toast notifications hook
│   │   │   └── 📄 useAuth.ts 🟡                     # Authentication state hook
│   │   ├── 📁 lib/                                  # Utility libraries and helpers
│   │   │   ├── 📄 authUtils.ts 🟡                   # Authentication utility functions
│   │   │   ├── 📄 queryClient.ts 🟡                 # TanStack Query client configuration
│   │   │   └── 📄 utils.ts 🟡                       # General utility functions
│   │   ├── 📁 pages/                                # Page components for routing
│   │   │   ├── 📄 business-dashboard.tsx 🟡         # Business owner dashboard page
│   │   │   ├── 📄 checkout.tsx 🟡                   # Payment checkout page
│   │   │   ├── 📄 home.tsx 🟡                       # Authenticated user home page
│   │   │   ├── 📄 landing.tsx 🔴                    # Public landing page
│   │   │   ├── 📄 listings.tsx 🟡                   # Business listings page
│   │   │   └── 📄 not-found.tsx 🟡                  # 404 error page
│   │   ├── 📁 styles/                               # CSS and styling files
│   │   │   └── 📄 Image.module.css 🟢               # CSS modules for Image component
│   │   ├── 📄 App.tsx 🟡                            # Main application component with routing
│   │   ├── 📄 index.css 🟢                          # Global CSS styles and Tailwind imports
│   │   └── 📄 main.tsx 🟡                           # React application entry point
│   └── 📄 index.html 🟢                             # HTML template for Vite
├── 📁 server/                                       # Backend Express.js server
│   ├── 📄 index.ts 🔴                               # Main server entry point with middleware
│   ├── 📄 replitAuth.ts 🟡                          # Replit authentication configuration
│   ├── 📄 routes.ts 🟢                              # API routes registration
│   ├── 📄 storage.ts 🟡                             # Database connection and queries
│   └── 📄 vite.ts 🟡                                # Vite development server integration
├── 📁 shared/                                       # Shared code between client and server
│   └── 📄 schema.ts 🔴                              # Database schema and Zod validation
├── 📄 .gitignore 🟢                                 # Git ignore patterns
├── 📄 .replit 🟢                                    # Replit configuration file
├── 📄 components.json 🟢                            # shadcn/ui components configuration
├── 📄 drizzle.config.ts 🟡                          # Drizzle ORM configuration
├── 📄 package-lock.json 🟢                          # NPM dependency lock file
├── 📄 package.json 🟢                               # NPM package configuration
├── 📄 postcss.config.js 🟢                          # PostCSS configuration
├── 📄 replit.md 🟢                                  # Project documentation (existing)
├── 📄 tailwind.config.ts 🟡                         # Tailwind CSS configuration
├── 📄 tsconfig.json 🟢                              # TypeScript configuration
└── 📄 vite.config.ts 🟡                             # Vite build tool configuration
```

## Import Complexity Legend
- 🟢 **Low Complexity** (0-3 imports): Simple, focused files
- 🟡 **Medium Complexity** (4-7 imports): Moderate dependencies
- 🔴 **High Complexity** (8+ imports): Complex files with many dependencies

## Statistics Summary
- **Total Files**: 89
- **Directories**: 8
- **Low Complexity**: 31 files (35%)
- **Medium Complexity**: 55 files (62%)
- **High Complexity**: 3 files (3%)

## Key Architecture Insights
- **Frontend**: React + TypeScript with comprehensive UI component library
- **Backend**: Express.js server with Drizzle ORM
- **Database**: PostgreSQL with Neon hosting
- **Authentication**: Replit Auth with Passport.js
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for development and production builds
