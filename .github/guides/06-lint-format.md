# Step 6: Linting & Formatting

Set up ESLint and Prettier for code quality and consistency.

**Time:** 10 minutes  
**Files to create:**

- `.eslintrc.cjs`
- `.prettierrc`

---

## 📋 Tasks

### 6.1 Install Linting Dependencies

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-plugin-react
```

**Packages:**

- `eslint` — Code linter
- `@typescript-eslint/parser` — Parse TypeScript
- `@typescript-eslint/eslint-plugin` — TypeScript rules
- `prettier` — Code formatter
- `eslint-plugin-react` — React-specific rules

---

### 6.2 Create `.eslintrc.cjs`

ESLint configuration for TypeScript + React.

**Location:** `.eslintrc.cjs` (root)

**Content:**

```js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["dist", "node_modules", ".changeset"],
  env: {
    node: true,
    es2019: true,
  },
};
```

**Configuration breakdown:**

- `parser` → Use TypeScript parser
- `extends` → Recommended rules for ESLint, TypeScript, and React
- `react/jsx-runtime` → No need to import React for JSX (React 17+)
- `ignorePatterns` → Skip dist, node_modules, .changeset
- `env` → ES2019 + Node.js environment

---

### 6.3 Create `.prettierrc`

Prettier configuration for consistent formatting.

**Location:** `.prettierrc` (root)

**Content:**

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true
}
```

**Options:**
| Option | Value | Purpose |
|--------|-------|---------|
| `printWidth` | 100 | Line length before wrap |
| `singleQuote` | true | Use single quotes |
| `trailingComma` | es5 | Trailing commas where valid |
| `tabWidth` | 2 | Indent size |
| `semi` | true | Add semicolons |

---

### 6.4 Create `.prettierignore`

Files to exclude from formatting.

**Location:** `.prettierignore` (root)

**Content:**

```
dist
node_modules
.changeset
.git
```

---

## ✅ Verification

### Run ESLint:

```bash
npm run lint
```

**Expected:** No errors or warnings (clean output)

### Format code:

```bash
npm run format
```

Then verify formatting:

```bash
npm run lint
# Should still pass
```

### Manual format check:

```bash
# Check without fixing
npx prettier --check .
```

---

## 🎨 Optional: IDE Integration

**For VS Code** (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 📝 Checklist

- [ ] ESLint dependencies installed
- [ ] `.eslintrc.cjs` created with TypeScript + React rules
- [ ] `.prettierrc` created with formatting rules
- [ ] `.prettierignore` created
- [ ] `npm run lint` passes
- [ ] `npm run format` works
- [ ] IDE extensions configured (optional)

---

**Next:** [Step 7 — Documentation →](./07-documentation.md)
