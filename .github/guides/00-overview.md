# React RichText Viewer — Project Setup Guide

This guide walks through scaffolding a complete, professional React component package step-by-step.

## 📋 Table of Contents

1. **[Step 1: Core Configuration Files](./01-core-config.md)** — `package.json`, `tsconfig.json`, build configs
2. **[Step 2: TypeScript Setup](./02-typescript-setup.md)** — Create `tsconfig.json` and source structure
3. **[Step 3: Main Component](./03-main-component.md)** — Build `RichTextViewer.tsx` and exports
4. **[Step 4: Build Configuration](./04-build-config.md)** — Set up `vite.config.ts` (library mode)
5. **[Step 5: Testing Setup](./05-testing-setup.md)** — Configure Vitest and create tests
6. **[Step 6: Linting & Formatting](./06-lint-format.md)** — ESLint & Prettier config
7. **[Step 7: Documentation](./07-documentation.md)** — Ladle stories and README
8. **[Step 8: CI/CD Pipeline](./08-cicd.md)** — GitHub Actions workflow
9. **[Step 9: Release Setup](./09-release-setup.md)** — Changesets configuration
10. **[Step 10: Verification & Publish](./10-verification.md)** — Build, test, and publish

---

## 🎯 Goal

Ship a tiny, secure, **tree-shakeable** React component that:

- ✅ Safely renders HTML (sanitized with DOMPurify)
- ✅ Works with React 18 & 19
- ✅ Exports ESM + CJS with types
- ✅ Has full test coverage
- ✅ Ships with Ladle docs
- ✅ Includes GitHub Actions CI
- ✅ Ready to publish to npm

---

## 🚀 Quick Start

Follow each guide in order. Each step is self-contained but builds on the previous ones.

**Estimated time:** 30–45 minutes

---

## 📝 Current Status

- [x] README created
- [ ] Step 1: Core configuration
- [ ] Step 2: TypeScript
- [ ] Step 3: Main component
- [ ] Step 4: Build config
- [ ] Step 5: Testing
- [ ] Step 6: Lint & format
- [ ] Step 7: Documentation
- [ ] Step 8: CI/CD
- [ ] Step 9: Release setup
- [ ] Step 10: Verification

---

## ⚠️ Prerequisites

- Node.js 20+
- npm 10+
- Git
- GitHub account

---

## 📚 Tech Stack

| Tool                   | Purpose                             |
| ---------------------- | ----------------------------------- |
| TypeScript             | Language & type safety              |
| Vite                   | Build tool (ESM + CJS library mode) |
| Vitest                 | Test runner                         |
| @testing-library/react | Component testing                   |
| ESLint                 | Linting                             |
| Prettier               | Code formatting                     |
| @ladle/react           | Interactive documentation           |
| @changesets/cli        | Version & release management        |
| GitHub Actions         | CI/CD                               |

---

**Next:** [Step 1 — Core Configuration →](./01-core-config.md)
