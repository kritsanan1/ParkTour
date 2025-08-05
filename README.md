
# Tour Der Wang (ที่นี่ วังสามหมอ)

A Thai tourism promotion platform for Wang Sam Mo District in Udon Thani, Thailand. This marketplace connects tourists with local businesses including attractions, restaurants, accommodations, homestays, and services, featuring AI-driven recommendations and bilingual support.

## 🚀 Quick Start

```bash
# Clone and install
git clone <repository-url>
cd tour-der-wang
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Start development
npm run dev
```

## 📋 Technical Requirements

### System Dependencies
- **Node.js**: 20.x or higher
- **npm**: 10.x or higher
- **PostgreSQL**: 13.x or higher (via Neon Database)

### Development Environment
- **OS**: Linux, macOS, or Windows with WSL2
- **Memory**: 4GB RAM minimum, 8GB recommended
- **Storage**: 2GB free space for dependencies

### Required Services
- **Neon Database**: PostgreSQL hosting service
- **Stripe Account**: Payment processing
- **Replit Auth**: Authentication provider (for deployment)

## 🛠️ Installation Guide

### Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   ```bash
   # Push database schema
   npm run db:push
   
   # Verify connection
   npm run check
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration values.

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Application will be available at `http://localhost:5000`

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Common Troubleshooting

**Issue**: `npm install` fails with dependency conflicts
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Issue**: Database connection fails
- Verify `DATABASE_URL` in `.env`
- Check Neon Database status
- Ensure proper network connectivity

**Issue**: TypeScript compilation errors
```bash
# Solution: Check types and rebuild
npm run check
npm run build
```

## 🏗️ Development Guidelines

### Code Style Conventions

- **TypeScript**: Strict mode enabled, explicit types preferred
- **React**: Functional components with hooks
- **Naming**: camelCase for variables, PascalCase for components
- **File Structure**: Feature-based organization
- **Imports**: Absolute imports with `@/` prefix

### Git Workflow

**Branch Naming Format:**
```
[type]/[ticket-number]-[description]

Examples:
feature/TDW-123-add-payment-integration
bugfix/TDW-456-fix-mobile-navigation
hotfix/TDW-789-urgent-auth-issue
```

**Commit Message Format:**
```
type(scope): brief description

Examples:
feat(auth): add Replit authentication
fix(ui): resolve mobile navigation issues
docs(readme): update installation guide
```

### Pull Request Template

```markdown
## 🔄 Changes Made
- [ ] Feature implementation
- [ ] Bug fixes
- [ ] Documentation updates
- [ ] Testing additions

## 🧪 Testing Steps
1. Step-by-step testing instructions
2. Expected outcomes
3. Edge cases covered

## 📱 Screenshots
[Include relevant screenshots for UI changes]

## ✅ Review Checklist
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console errors
- [ ] Mobile responsive (if applicable)
- [ ] Accessibility compliance
```

### Code Review Criteria

**Must Have:**
- ✅ TypeScript strict mode compliance
- ✅ Proper error handling
- ✅ Responsive design (mobile-first)
- ✅ Accessibility standards (WCAG 2.1)
- ✅ Performance optimizations

**Nice to Have:**
- 🎯 Code documentation/comments
- 🎯 Unit test coverage
- 🎯 Performance metrics
- 🎯 SEO optimizations

## 🚀 Deployment Process

### Replit Deployment

The application is configured for Replit's autoscale deployment:

1. **Push to Main Branch**
   ```bash
   git push origin main
   ```

2. **Automatic Build Process**
   - Replit detects changes
   - Runs `npm run build`
   - Starts with `npm run start`

3. **Environment Variables**
   Set in Replit Secrets:
   - `DATABASE_URL`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`

### Manual Deployment Steps

```bash
# Build production assets
npm run build

# Verify build
npm run start

# Deploy to Replit
# Push changes trigger automatic deployment
```

### Rollback Procedures

**Emergency Rollback:**
1. Access Replit Console
2. Revert to previous commit:
   ```bash
   git reset --hard HEAD~1
   git push --force-with-lease origin main
   ```
3. Monitor deployment logs
4. Verify functionality

**Planned Rollback:**
1. Create rollback branch
2. Cherry-pick stable commits
3. Test thoroughly
4. Deploy via standard process

## 🏛️ Architecture Overview

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query + React hooks
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite with hot reload

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL via Neon with Drizzle ORM
- **Authentication**: Replit Auth + Passport.js
- **Payment**: Stripe integration
- **Session Storage**: PostgreSQL-backed sessions

### Key Features
- 🌐 Bilingual support (Thai/English)
- 🔐 Secure authentication flow
- 💳 Stripe payment processing
- 📱 Mobile-responsive design
- 🎯 SEO optimization
- ⚡ Performance monitoring

## 📊 Performance Monitoring

### Key Metrics
- **Core Web Vitals**: LCP, FID, CLS
- **Database Performance**: Query timing
- **API Response Times**: < 200ms target
- **Bundle Size**: < 500KB gzipped

### Monitoring Tools
- Performance API integration
- Custom performance monitor component
- Server-side request logging

## 🤝 Contributing

1. Fork the repository
2. Create feature branch following naming convention
3. Make changes with appropriate tests
4. Submit pull request using template
5. Await code review and approval

## 📞 Support

- **Documentation**: See `architecture.md` and `scripts.md`
- **Issues**: Create GitHub issue with template
- **Community**: Join project discussions
- **Emergency**: Contact maintainers directly

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for Wang Sam Mo District Tourism**
