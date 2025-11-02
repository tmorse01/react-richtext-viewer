# Step 1: Core Configuration Files

Set up the foundational configuration files for the project.

**Time:** 5 minutes  
**Files to create:** `package.json`

---

## 📋 Tasks

### 1.1 Create `package.json`

This is the project manifest. It defines dependencies, scripts, and export configuration.

**Location:** `package.json` (root)

**Content:**

```json
{
  "name": "react-richtext-viewer",
  "version": "0.0.1",
  "description": "Tiny, safe React component to render trusted HTML (sanitized with DOMPurify).",
  "keywords": ["react", "richtext", "viewer", "html", "sanitize", "dompurify"],
  "license": "MIT",
  "type": "module",
  "sideEffects": false,
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },
  "files": ["dist", "README.md", "LICENSE"],
  "peerDependencies": {
    "react": "^18 || ^19"
  },
  "devDependencies": {},
  "dependencies": {
    "dompurify": "^3.0.0"
  },
  "scripts": {
    "build": "vite build",
    "dev": "vite",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint .",
    "format": "prettier -w .",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "prepublishOnly": "npm run build",
    "ladle": "ladle serve",
    "release": "changeset version && npm i && git add -A && git commit -m \"chore: version\" || true && git push && changeset publish"
  }
}
```

**Key points:**

- `"type": "module"` → ES modules by default
- `"sideEffects": false` → Tree-shakeable
- `"exports"` → Modern package export configuration
- `peerDependencies` → React 18 or 19 required (not bundled)
- Scripts ready for build, test, lint, docs, and release

---

## ✅ Verification

After creating `package.json`:

```bash
# Verify JSON is valid
npm pkg get name
# Should output: react-richtext-viewer
```

---

## 📝 Checklist

- [ ] `package.json` created with all scripts
- [ ] Entry points configured (main, module, types, exports)
- [ ] Dependencies listed (dompurify)
- [ ] peerDependencies set to React 18/19

---

**Next:** [Step 2 — TypeScript Setup →](./02-typescript-setup.md)
