# Step 4: Build Configuration

Set up Vite in library mode to build ESM + CJS with type definitions.

**Time:** 5 minutes  
**Files to create:** `vite.config.ts`

---

## 📋 Tasks

### 4.1 Install Build Tools

First, install Vite and its React plugin:

```bash
npm install -D vite @vitejs/plugin-react
```

**What each package does:**

- `vite` — Modern build tool and dev server
- `@vitejs/plugin-react` — React JSX/HMR support

---

### 4.2 Create `vite.config.ts`

Build configuration for dual ESM/CJS output in library mode.

**Location:** `vite.config.ts` (root)

**Content:**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "RichTextViewer",
      formats: ["es", "cjs"],
      fileName: (format) => {
        const ext = format === "es" ? "mjs" : "cjs";
        return `index.${ext}`;
      },
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: [
        {
          format: "es",
          entryFileNames: "index.mjs",
          dir: "dist",
        },
        {
          format: "cjs",
          entryFileNames: "index.cjs",
          dir: "dist",
        },
      ],
    },
    target: "es2019",
    minify: false,
    sourcemap: true,
  },
});
```

**Configuration explanation:**

| Option                 | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| `plugins: [react()]`   | Enable React JSX transform                              |
| `lib.entry`            | Entry point: `src/index.ts`                             |
| `lib.name`             | Global variable name (required but not used in ESM/CJS) |
| `lib.formats`          | Output both ES modules and CommonJS                     |
| `lib.fileName`         | Custom output filename pattern                          |
| `external`             | Don't bundle React (it's a peer dependency)             |
| `rollupOptions.output` | Define output for each format                           |
| `target: "es2019"`     | Compatible with modern browsers/Node                    |
| `minify: false`        | Keep readable output                                    |
| `sourcemap: true`      | Generate source maps for debugging                      |

**Output:**
After build, you'll have:

```
dist/
├── index.mjs       # ESM module
├── index.cjs       # CommonJS module
├── index.mjs.map   # ESM source map
└── index.cjs.map   # CJS source map
```

TypeScript definitions (`.d.ts`) are generated separately. See Step 4.3.

---

### 4.3 Generate Type Definitions

Vite doesn't auto-generate `.d.ts` files, so we need `tsc` for that.

Update `tsconfig.json` to emit declarations:

**In `tsconfig.json`, ensure these are set:**

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": false,
    "outDir": "dist"
  }
}
```

Then update `package.json` build script to generate types:

```json
{
  "scripts": {
    "build": "tsc && vite build",
    "dev": "vite"
  }
}
```

This runs:

1. `tsc` — Generates `.d.ts` files
2. `vite build` — Builds JS bundles

---

### 4.4 Update `package.json` Exports

Ensure the exports in `package.json` point to the right files:

```json
{
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
  "files": ["dist", "README.md", "LICENSE"]
}
```

---

## ✅ Verification

Test the build:

```bash
npm run build
```

**Expected output:**

```
src/index.ts → dist/index.mjs, dist/index.cjs
dist/index.d.ts (and related .d.ts files)
```

Then verify files exist:

```bash
ls dist/
# index.mjs, index.cjs, index.d.ts, index.mjs.map, index.cjs.map
```

**Verify file contents:**

```bash
# Check ESM export
head -5 dist/index.mjs
# Should start with: import or export

# Check CJS export
head -5 dist/index.cjs
# Should start with: Object.defineProperty or exports
```

---

## 🚀 Development

For local development with Vite dev server:

```bash
npm run dev
```

This starts Vite's dev server with HMR (hot module replacement). Great for testing!

---

## 📝 Checklist

- [ ] Vite and React plugin installed
- [ ] `vite.config.ts` created with library mode config
- [ ] `tsconfig.json` has `declaration: true` and `outDir: "dist"`
- [ ] `package.json` build script runs `tsc && vite build`
- [ ] `npm run build` succeeds
- [ ] `dist/` contains `.mjs`, `.cjs`, `.d.ts` files
- [ ] Source maps generated
- [ ] Entry points in `package.json` are correct

---

## 💡 Why Vite for Libraries?

- **Fast builds** — Uses esbuild under the hood
- **Modern tooling** — Great developer experience
- **Flexible** — Easy to customize with plugins
- **Production-ready** — Optimized for both dev and production
- **Learning tool** — Skills transfer to app development too

---

**Next:** [Step 5 — Testing Setup →](./05-testing-setup.md)
