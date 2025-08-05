
# Pull Request

## 📋 Summary
<!-- Provide a brief description of the changes made -->

**Type of Change:**
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🔧 Configuration change
- [ ] 🎨 Style/UI improvement
- [ ] ⚡ Performance improvement
- [ ] ♻️ Code refactoring

## 🎯 Related Issues
<!-- Link related issues using "Fixes #123" or "Closes #123" -->
- Fixes #
- Related to #

## 🔄 Changes Made

### Frontend Changes
<!-- List specific frontend changes -->
- [ ] New React components added
- [ ] Existing components modified
- [ ] New pages/routes created
- [ ] Styling updates (CSS/Tailwind)
- [ ] State management changes
- [ ] API integration updates

### Backend Changes
<!-- List specific backend changes -->
- [ ] New API endpoints added
- [ ] Existing endpoints modified
- [ ] Database schema changes
- [ ] Authentication/authorization updates
- [ ] External service integration
- [ ] Performance optimizations

### Database Changes
<!-- List any database-related changes -->
- [ ] New tables/columns added
- [ ] Schema modifications
- [ ] Migration scripts included
- [ ] Data seeding updates

## 🧪 Testing

### Testing Steps
<!-- Provide detailed steps for testing the changes -->
1. Step one
2. Step two
3. Step three

### Test Coverage
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

### Tested Environments
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari
- [ ] Mobile iOS Safari
- [ ] Mobile Android Chrome
- [ ] Development environment
- [ ] Production-like environment

## 📱 Screenshots/Videos
<!-- Include screenshots for UI changes, videos for complex interactions -->

### Before
<!-- Screenshots of the current state -->

### After
<!-- Screenshots of the new state -->

## 🌍 Localization
<!-- For changes affecting user-facing text -->
- [ ] Thai language support added/updated
- [ ] English language support added/updated
- [ ] Cultural considerations addressed
- [ ] RTL/LTR layout considerations

## 🔒 Security Considerations
<!-- Address any security implications -->
- [ ] No sensitive data exposed
- [ ] Input validation implemented
- [ ] Authentication/authorization checked
- [ ] SQL injection prevention verified
- [ ] XSS protection maintained

## ⚡ Performance Impact
<!-- Describe performance implications -->
- [ ] Bundle size impact assessed
- [ ] Database query performance checked
- [ ] API response time measured
- [ ] Core Web Vitals not negatively impacted

## 📖 Documentation
<!-- Documentation updates -->
- [ ] Code comments added where necessary
- [ ] README updated (if applicable)
- [ ] API documentation updated
- [ ] User documentation updated
- [ ] Architecture documentation updated

## 🚀 Deployment Considerations

### Environment Variables
<!-- List any new environment variables -->
- `NEW_ENV_VAR`: Description and example value
- Modified: `EXISTING_VAR`: Updated usage

### Database Migrations
- [ ] Migrations are backward compatible
- [ ] Migration rollback plan available
- [ ] Data migration scripts tested

### Configuration Changes
- [ ] `.replit` file updated (if needed)
- [ ] `package.json` dependencies updated
- [ ] Build scripts updated (if needed)

## ✅ Pre-merge Checklist

### Code Quality
- [ ] Code follows project style guidelines
- [ ] No console.log statements left in production code
- [ ] Error handling implemented appropriately
- [ ] Type safety maintained (TypeScript)
- [ ] No linting errors

### Functionality
- [ ] All existing tests pass
- [ ] New functionality works as expected
- [ ] Edge cases handled appropriately
- [ ] Responsive design works on all screen sizes
- [ ] Accessibility standards maintained

### Business Logic
- [ ] Feature aligns with business requirements
- [ ] User experience flow is intuitive
- [ ] Data integrity maintained
- [ ] Privacy requirements met

### Technical Debt
- [ ] No new technical debt introduced
- [ ] Existing technical debt addressed (if applicable)
- [ ] Code duplication avoided/reduced
- [ ] Performance regressions avoided

## 🤝 Review Requests

### Specific Areas for Review
<!-- Highlight specific areas where you want focused review -->
- Authentication flow changes in `server/replitAuth.ts`
- New payment processing logic in `checkout.tsx`
- Database schema changes in `shared/schema.ts`

### Questions for Reviewers
<!-- Ask specific questions -->
1. Does the error handling approach look correct?
2. Are there any security concerns with the new endpoint?
3. Should we add additional validation?

## 📝 Additional Notes
<!-- Any additional context, concerns, or information -->

**Breaking Changes:**
<!-- If there are breaking changes, describe them -->

**Migration Path:**
<!-- If users need to take action, describe the steps -->

**Future Considerations:**
<!-- Note any future work this enables or requires -->

---

**PR Author Checklist:**
- [ ] I have tested these changes locally
- [ ] I have updated relevant documentation
- [ ] I have added appropriate labels to this PR
- [ ] I have requested review from appropriate team members
- [ ] I have linked related issues

**Reviewer Guidelines:**
- Focus on code quality, security, and maintainability
- Test the changes locally if possible
- Verify business logic and user experience
- Check for potential performance or security issues
- Ensure proper error handling and edge cases
