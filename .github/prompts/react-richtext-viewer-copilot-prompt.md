# Copilot Project Prompt — `react-richtext-viewer`

You are **GitHub Copilot**. Scaffold a complete, minimal, professional **React component package** named **`react-richtext-viewer`**. Generate files, configs, and starter code exactly as specified.

---

## 🎯 Goal

Ship a tiny, secure, **tree‑shakeable** component that safely renders trusted/untrusted HTML (sanitized) and is ready to publish to npm.

**Outcomes**
- Outputs **ESM + CJS** with **type definitions** (`.d.ts`)
- **React** as a **peerDependency**
- No global side effects; **`"sideEffects": false`**
- Basic unit tests (render, sanitization, a11y smoke)
- Docs via **Ladle** (or Storybook if Ladle unavailable)
- CI with **GitHub Actions** (lint, typecheck, test, build)
- Versioning & release with **Changesets**

---

## 🧱 Tech

- **Language:** TypeScript (strict)
- **Build:** `tsup`
- **Tests:** Vitest + @testing-library/react + @testing-library/jest-dom + jsdom + axe-core
- **Docs:** `@ladle/react` (fallback: Storybook)
- **Lint/Format:** ESLint + Prettier
- **Release:** `@changesets/cli`
- **Node:** 20+
- **React peer range:** `^18 || ^19`

---

## 📁 Repository Layout (generate all files)

```
react-richtext-viewer/
  .github/workflows/ci.yml
  .changeset/                    # after init
  src/
    index.ts
    RichTextViewer.tsx
  stories/
    RichTextViewer.stories.tsx
  tests/
    RichTextViewer.test.tsx
  tsup.config.ts
  tsconfig.json
  package.json
  .eslintrc.cjs
  .prettierrc
  README.md
  LICENSE
```

---

## 🧩 Implementation Details

### `src/RichTextViewer.tsx`
Create a secure, SSR‑safe component.

**Props**
```ts
export type RichTextViewerProps = {
  html?: string;
  className?: string;
};
```

**Behavior**
- If `html` is undefined/empty, render an empty `<div>`.
- In `useEffect`, **lazy‑import** `dompurify` and sanitize `html` using the HTML profile.
- **SSR‑safe**: no `window`/DOM access at module top level.
- Render with `dangerouslySetInnerHTML`.
- Accept `className` passthrough.

**Example**
```tsx
import * as React from "react";

export type RichTextViewerProps = {
  html?: string;
  className?: string;
};

export function RichTextViewer({ html, className }: RichTextViewerProps) {
  const [safeHtml, setSafeHtml] = React.useState("");

  React.useEffect(() => {
    let alive = true;
    (async () => {
      const input = html ?? "";
      if (!input) { if (alive) setSafeHtml(""); return; }
      const { default: DOMPurify } = await import("dompurify");
      const cleaned = DOMPurify.sanitize(input, { USE_PROFILES: { html: true } });
      if (alive) setSafeHtml(cleaned);
    })();
    return () => { alive = false; };
  }, [html]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
```

### `src/index.ts`
```ts
export type { RichTextViewerProps } from "./RichTextViewer";
export { RichTextViewer } from "./RichTextViewer";
```

---

## 🏗️ Build Config — `tsup.config.ts`
```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/index.ts" },
  dts: true,
  format: ["esm", "cjs"],
  treeshake: true,
  splitting: false,
  clean: true,
  sourcemap: true,
  target: "es2019",
  minify: false
});
```

---

## ⚙️ TypeScript — `tsconfig.json`
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
    "skipLibCheck": true
  },
  "include": ["src", "tests", "stories"]
}
```

---

## 📦 `package.json` (generate with these fields)
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
  "peerDependencies": { "react": "^18 || ^19" },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
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

---

## 🧪 Tests — `tests/RichTextViewer.test.tsx`
Create tests for render, sanitization, and basic a11y.

```ts
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RichTextViewer } from "../src";

describe("RichTextViewer", () => {
  it("renders without crashing", () => {
    render(<RichTextViewer html="<p>Hello</p>" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("sanitizes script tags", () => {
    render(<RichTextViewer html={'<b>Hi</b><script>alert(1)</script>'} />);
    expect(screen.getByText("Hi")).toBeInTheDocument();
    expect(document.body.innerHTML).not.toContain("alert(1)");
  });
});
```

(Optional: add axe-core a11y smoke if desired.)

---

## 📚 Stories — `stories/RichTextViewer.stories.tsx`
```tsx
import * as React from "react";
import type { StoryDefault, Story } from "@ladle/react";
import { RichTextViewer } from "../src";

export default { title: "RichTextViewer" } satisfies StoryDefault;

export const Basic: Story = () => {
  const [html, setHtml] = React.useState("<p>Hello <strong>world</strong></p>");
  return (
    <div style={{ maxWidth: 640 }}>
      <textarea
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        style={{ width: "100%", height: 120 }}
      />
      <hr />
      <RichTextViewer html={html} />
    </div>
  );
};
```

---

## 🧰 ESLint / Prettier

**`.eslintrc.cjs`**
```js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ],
  settings: { react: { version: "detect" } },
  ignorePatterns: ["dist", "node_modules"]
};
```

**`.prettierrc`**
```json
{ "printWidth": 100, "singleQuote": true }
```

---

## 🔁 CI — `.github/workflows/ci.yml`
```yaml
name: CI
on:
  push: { branches: [main] }
  pull_request:
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
```

---

## 🧾 README.md (generate content)
Include:
- Install: `npm i react-richtext-viewer dompurify`
- Quick usage example
- Security note: sanitize untrusted input; DOMPurify used defensively
- SSR note: no top‑level DOM use; heavy libs loaded in `useEffect`
- Contributing + Release flow (Changesets)

---

## 🏁 Setup & Release Commands (for the developer)
Copilot, create a `README.md` section listing these commands for the user:

```bash
# one-time setup
npm i -D typescript tsup vitest @testing-library/react @testing-library/jest-dom jsdom eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier @ladle/react @changesets/cli
npm i dompurify

# run docs
npm run ladle

# run tests
npm test

# build
npm run build

# init changesets (one-time)
npx changeset init

# create a version bump (after changes)
npx changeset

# publish
npm login
npm publish --access public
```
