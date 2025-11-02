# Step 8: CI/CD Pipeline

Set up GitHub Actions for automated linting, testing, and building.

**Time:** 10 minutes  
**Files to create:** `.github/workflows/ci.yml`

---

## 📋 Tasks

### 8.1 Create `.github/workflows/` Directory

```bash
mkdir -p .github/workflows
```

---

### 8.2 Create `.github/workflows/ci.yml`

GitHub Actions workflow for continuous integration.

**Location:** `.github/workflows/ci.yml`

**Content:**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run typecheck

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
```

**Workflow explanation:**

| Step                | Purpose                        |
| ------------------- | ------------------------------ |
| `checkout`          | Clone repository               |
| `setup-node`        | Install Node.js 20 & npm cache |
| `npm ci`            | Clean install (vs npm install) |
| `npm run lint`      | Run ESLint                     |
| `npm run typecheck` | Run TypeScript type checking   |
| `npm test`          | Run Vitest                     |
| `npm run build`     | Build with tsup                |

**When it runs:**

- On every push to `main` branch
- On every pull request
- Automatically on GitHub

---

### 8.3 Optional: Add Test Coverage

To track test coverage, add optional step:

```yaml
- name: Generate coverage
  run: npm test -- --coverage
  continue-on-error: true
```

This requires `@vitest/coverage-v8`:

```bash
npm install -D @vitest/coverage-v8
```

Update `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/"],
    },
  },
});
```

---

### 8.4 Optional: Add Node.js Version Matrix

Test against multiple Node versions:

```yaml
strategy:
  matrix:
    node-version: [18, 20]
```

(Current minimum is Node 20 per requirements, but 18 is LTS)

---

## ✅ Verification

### Local verification:

```bash
# Run all CI checks locally
npm run lint && npm run typecheck && npm test && npm run build
```

**Expected output:**

```
✓ Linting complete
✓ Type checking complete
✓ Tests passed
✓ Build successful
```

### GitHub verification:

1. Push to main branch (or open PR)
2. Go to repository → Actions tab
3. Watch workflow run
4. All checks should pass ✅

---

## 📝 Checklist

- [ ] `.github/workflows/` directory created
- [ ] `ci.yml` created with all steps
- [ ] Local CI checks pass
- [ ] Workflow runs on GitHub automatically
- [ ] All jobs pass ✅

---

## 💡 Troubleshooting

**Workflow fails locally but should pass:**

```bash
# Ensure clean state
rm -rf node_modules dist
npm ci
npm run lint && npm run typecheck && npm test && npm run build
```

**Node version mismatch:**

- Check `.github/workflows/ci.yml` specifies Node 20
- Ensure `package.json` doesn't have incompatible engine constraints
- Test locally with Node 20: `nvm use 20`

---

**Next:** [Step 9 — Release Setup →](./09-release-setup.md)
