# Step 2: TypeScript Setup

Configure TypeScript and create the source directory structure.

**Time:** 5 minutes  
**Files to create:**

- `tsconfig.json`
- `src/` directory

---

## 📋 Tasks

### 2.1 Create `tsconfig.json`

TypeScript configuration for strict, modern builds.

**Location:** `tsconfig.json` (root)

**Content:**

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "moduleResolution": "Bundler",
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "lib": ["ES2019", "DOM", "DOM.Iterable"]
  },
  "include": ["src", "tests", "stories"],
  "exclude": ["node_modules", "dist"]
}
```

**Key points:**

- `"strict": true` → Enforces strict type checking
- `"declaration": true` → Generates `.d.ts` files
- `"jsx": "react-jsx"` → Uses React 17+ JSX transform (no import React)
- `"module": "ESNext"` → Modern module syntax (bundler handles CommonJS)

---

### 2.2 Create Source Directories

```bash
mkdir src
mkdir tests
mkdir stories
```

**Expected structure:**

```
react-richtext-viewer/
├── src/          # Source files
├── tests/        # Test files
├── stories/      # Storybook stories
└── ...
```

---

## ✅ Verification

Verify TypeScript configuration:

```bash
# Check tsconfig validity
npx tsc --noEmit --project tsconfig.json
# Should complete without errors (no files yet, so no errors expected)
```

---

## 📝 Checklist

- [ ] `tsconfig.json` created with strict settings
- [ ] `src/` directory created
- [ ] `tests/` directory created
- [ ] `stories/` directory created

---

**Next:** [Step 3 — Main Component →](./03-main-component.md)
