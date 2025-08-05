
# Scripts Documentation

## 📋 Available Scripts

| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| `npm run dev` | Start development server with hot reload | None | `npm run dev` | Port 5000 busy: Kill process or change PORT env var |
| `npm run build` | Build production bundle | None | `npm run build` | TypeScript errors: Run `npm run check` first |
| `npm start` | Start production server | None | `npm start` | Build missing: Run `npm run build` first |
| `npm run check` | TypeScript type checking | None | `npm run check` | Fix type errors shown in output |
| `npm run db:push` | Push database schema changes | None | `npm run db:push` | Connection failed: Check DATABASE_URL in .env |

## 🔧 Development Scripts

### `npm run dev`

**Purpose**: Starts the development server with TypeScript compilation and hot module replacement.

**Environment**: Sets `NODE_ENV=development`

**What it does**:
- Compiles TypeScript files using `tsx`
- Starts Express server on port 5000
- Enables Vite development server
- Watches for file changes and auto-reloads

**Expected Output**:
```bash
> rest-express@1.0.0 dev
> NODE_ENV=development tsx server/index.ts

3:10:49 PM [express] serving on port 5000
```

**Common Issues**:

| Issue | Solution |
|-------|----------|
| `Port 5000 already in use` | `lsof -ti:5000 \| xargs kill -9` or set `PORT=3000` in .env |
| `tsx command not found` | `npm install` or `npm install -g tsx` |
| `Cannot find module` errors | Check import paths and run `npm install` |
| `Database connection failed` | Verify `DATABASE_URL` in .env file |

### `npm run check`

**Purpose**: Runs TypeScript compiler to check for type errors without generating output files.

**Parameters**: None (uses `tsconfig.json` configuration)

**Example Output**:
```bash
> rest-express@1.0.0 check
> tsc

✓ No TypeScript errors found
```

**Error Examples**:
```bash
src/components/Header.tsx(23,5): error TS2322: Type 'string' is not assignable to type 'number'.
server/index.ts(45,12): error TS2339: Property 'unknownProp' does not exist on type 'Request'.
```

**Troubleshooting**:
- Fix TypeScript errors one by one
- Check import statements and type definitions
- Ensure all dependencies have type definitions

## 🏗️ Build Scripts

### `npm run build`

**Purpose**: Creates optimized production build with client bundle and server compilation.

**Build Process**:
1. **Client Build**: Vite builds React app
2. **Server Build**: esbuild compiles server TypeScript
3. **Output**: 
   - Client assets in `dist/` (served statically)
   - Server bundle in `dist/index.js`

**Expected Output**:
```bash
> rest-express@1.0.0 build
> vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

✓ built in 2.34s
dist/index.js  245.6kb
```

**Build Artifacts**:
```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [asset-files]
├── index.html
└── index.js (server bundle)
```

**Common Build Issues**:

| Issue | Cause | Solution |
|-------|-------|----------|
| `Module not found during build` | Missing dependency | `npm install [package-name]` |
| `TypeScript compilation errors` | Type errors in code | Run `npm run check` and fix errors |
| `Vite build fails` | Import path issues | Check relative/absolute import paths |
| `esbuild bundle error` | Server-side import issues | Verify server imports are Node.js compatible |
| `Out of memory error` | Large bundle size | Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=8192"` |

### `npm start`

**Purpose**: Starts production server using built assets.

**Prerequisites**: Must run `npm run build` first

**Environment**: Sets `NODE_ENV=production`

**Server Configuration**:
- Serves static files from `dist/`
- Runs server bundle from `dist/index.js`
- Listens on `PORT` environment variable (default: 5000)

**Expected Output**:
```bash
> rest-express@1.0.0 start
> NODE_ENV=production node dist/index.js

serving on port 5000
```

**Production Checklist**:
- [ ] `dist/` directory exists
- [ ] Environment variables set
- [ ] Database connection configured
- [ ] Static assets served correctly

## 🗄️ Database Scripts

### `npm run db:push`

**Purpose**: Pushes database schema changes to the connected database using Drizzle Kit.

**Requirements**:
- `DATABASE_URL` environment variable set
- Valid PostgreSQL connection
- Schema defined in `shared/schema.ts`

**What it does**:
- Reads schema from TypeScript files
- Generates and executes SQL migrations
- Updates database structure to match schema

**Expected Output**:
```bash
> rest-express@1.0.0 db:push
> drizzle-kit push

📋 You have 3 tables in your schema
✅ Pushed schema changes to database
```

**Schema Files Used**:
- `shared/schema.ts` - Main database schema
- `drizzle.config.ts` - Drizzle configuration

**Common Database Issues**:

| Issue | Cause | Solution |
|-------|-------|----------|
| `Connection refused` | Database not running | Check Neon Database status |
| `Invalid DATABASE_URL` | Incorrect connection string | Verify URL format and credentials |
| `Permission denied` | Insufficient database privileges | Check user permissions |
| `Schema conflict` | Existing data conflicts | Review and resolve schema changes |
| `SSL connection error` | SSL/TLS configuration | Add `?ssl=true` to DATABASE_URL |

**Database URL Format**:
```bash
# Neon Database URL format
DATABASE_URL="postgresql://[user]:[password]@[host]/[database]?ssl=true"

# Local PostgreSQL URL format
DATABASE_URL="postgresql://postgres:password@localhost:5432/tourderwang"
```

## 🚀 Custom Script Creation

### Adding New Scripts

To add custom scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint src/ server/ --ext .ts,.tsx",
    "lint:fix": "eslint src/ server/ --ext .ts,.tsx --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "db:studio": "drizzle-kit studio",
    "db:migrate": "drizzle-kit generate:pg",
    "format": "prettier --write \"src/**/*.{ts,tsx}\" \"server/**/*.ts\"",
    "analyze": "npm run build && npx bundle-analyzer dist/assets/*.js"
  }
}
```

### Script Combinations

**Full Development Workflow**:
```bash
# Complete setup from scratch
npm install
npm run db:push
npm run check
npm run dev
```

**Production Deployment**:
```bash
# Build and deploy
npm run check
npm run build
npm start
```

**Quality Assurance**:
```bash
# Code quality checks
npm run lint
npm run check
npm run test
npm run build
```

## 🔍 Script Dependencies

### Development Dependencies Used

| Package | Used By | Purpose |
|---------|---------|---------|
| `tsx` | `dev` | TypeScript execution for development |
| `esbuild` | `build` | Fast TypeScript/JavaScript bundler |
| `vite` | `build`, `dev` | Frontend build tool and dev server |
| `typescript` | `check` | TypeScript compiler |
| `drizzle-kit` | `db:push` | Database schema management |

### Runtime Dependencies

| Package | Used In | Purpose |
|---------|---------|---------|
| `express` | Server | Web framework |
| `drizzle-orm` | Database | ORM for PostgreSQL |
| `react` | Client | UI framework |
| `@tanstack/react-query` | Client | Data fetching |

## 🐛 Advanced Troubleshooting

### Performance Issues

**Slow Development Server**:
```bash
# Check Node.js memory usage
node --max-old-space-size=8192 node_modules/.bin/tsx server/index.ts

# Clear npm cache
npm cache clean --force

# Remove and reinstall node_modules
rm -rf node_modules package-lock.json
npm install
```

**Build Performance**:
```bash
# Analyze bundle size
npm run build
ls -la dist/assets/

# Check for large dependencies
npx webpack-bundle-analyzer dist/assets/*.js
```

### Database Connection Issues

**Test Database Connection**:
```javascript
// test-db.js
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

try {
  await db.execute('SELECT 1');
  console.log('✅ Database connection successful');
} catch (error) {
  console.error('❌ Database connection failed:', error);
}
```

**Run test**: `node test-db.js`

### Environment Issues

**Verify Environment Variables**:
```bash
# Check if .env is loaded
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL ? '✅ DATABASE_URL loaded' : '❌ DATABASE_URL missing');"
```

**Environment Template**:
```bash
# Copy and configure
cp .env.example .env
nano .env  # Edit with your values
```

This comprehensive scripts documentation provides developers with everything needed to effectively use and troubleshoot the project's build and development processes.
