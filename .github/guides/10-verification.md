# Step 10: Verification & Publish

Final verification and publish the package to npm.

**Time:** 15 minutes  
**Tasks:**

- Verify all systems
- Publish to npm (dry-run first)
- Verify published package
- Create GitHub Release

---

## 📋 Tasks

### 10.1 Full System Check

Run all verification steps:

```bash
# 1. Clean install (simulates CI)
rm -rf node_modules dist .ladle
npm ci

# 2. Lint
npm run lint
echo "✓ Linting passed"

# 3. Type checking
npm run typecheck
echo "✓ Type checking passed"

# 4. Tests
npm test
echo "✓ Tests passed"

# 5. Build
npm run build
echo "✓ Build passed"
```

**Expected output:**

```
✓ Linting passed
✓ Type checking passed
✓ Tests passed
✓ Build passed
```

---

### 10.2 Verify Build Artifacts

Check that build output is correct:

```bash
# List dist contents
ls -la dist/

# Verify file types
file dist/index.mjs
file dist/index.cjs
file dist/index.d.ts
```

**Expected output:**

```
dist/index.mjs        # ESM JavaScript
dist/index.cjs        # CommonJS JavaScript
dist/index.d.ts       # TypeScript definitions
dist/index.mjs.map    # Source map
dist/index.cjs.map    # Source map
dist/index.d.ts.map   # Definition map
```

---

### 10.3 Verify Package Contents

Check what will be published (without publishing):

```bash
npm pack --dry-run
```

**Expected output:**

```
react-richtext-viewer-0.0.1.tgz
npm notice === Tarball Contents ===
npm notice 23.6kB dist/index.mjs
npm notice 12.3kB dist/index.cjs
npm notice 1.2kB dist/index.d.ts
npm notice 4.0kB README.md
npm notice 1.1kB LICENSE
npm notice ...
```

Verify:

- ✅ `dist/` files included
- ✅ `README.md` included
- ✅ `LICENSE` included
- ✅ `node_modules/` NOT included
- ✅ `tests/` NOT included
- ✅ `stories/` NOT included

---

### 10.4 Create Changeset & Version

If you haven't already, create a changeset:

```bash
npx changeset
```

**Prompts:**

1. Select package: `react-richtext-viewer` ✓
2. Choose version bump: `minor` (for 0.0.1 → 0.1.0) or `patch` (for 0.0.2)
3. Summary: `Initial public release`

**Result:**

```
.changeset/brave-alphas-speak.md created
```

---

### 10.5 Version & Update CHANGELOG

```bash
npx changeset version
```

**This will:**

- Bump version in `package.json`
- Update `CHANGELOG.md` (created)
- Remove changeset file

**Verify:**

```bash
cat package.json | grep '"version"'
# Should show: "version": "0.1.0" (or next version)

cat CHANGELOG.md | head -20
# Should show latest version and changes
```

---

### 10.6 Commit & Push Version Change

```bash
git add -A
git commit -m "chore: version 0.1.0"
git push
```

Verify on GitHub that commits are visible.

---

### 10.7 Login to npm (First Time Only)

```bash
npm login
```

**Prompts:**

- Username
- Password
- Email
- OTP (if 2FA enabled)

**Verify login:**

```bash
npm whoami
# Should show your npm username
```

---

### 10.8 Dry-Run Publish

Test the publish without actually publishing:

```bash
npm publish --dry-run
```

**Expected output:**

```
npm notice === Tarball Contents ===
npm notice 23.6kB dist/index.mjs
...
npm notice === Tarball Details ===
npm notice name: react-richtext-viewer
npm notice version: 0.1.0
npm notice ...
```

---

### 10.9 Publish to npm

Once dry-run succeeds:

```bash
npm publish --access public
```

**Expected output:**

```
npm notice === Tarball Details ===
npm notice name: react-richtext-viewer
npm notice version: 0.1.0
npm notice ...
+ react-richtext-viewer@0.1.0
```

---

### 10.10 Verify Published Package

Check that package is on npm:

```bash
npm info react-richtext-viewer

# Or visit:
# https://www.npmjs.com/package/react-richtext-viewer
```

**Expected output:**

```
react-richtext-viewer@0.1.0
Tiny, safe React component to render trusted HTML (sanitized with DOMPurify).
...
dist
├── index.cjs
├── index.d.ts
└── index.mjs
```

---

### 10.11 Test Installation

Test installing from npm in a new project:

```bash
# In a temp directory
cd /tmp
npm init -y
npm install react react-dom react-richtext-viewer dompurify

# Try importing
cat > test.js << 'EOF'
const React = require('react');
const { RichTextViewer } = require('react-richtext-viewer');
console.log('✓ Successfully imported RichTextViewer');
EOF

node test.js
```

**Expected:**

```
✓ Successfully imported RichTextViewer
```

---

### 10.12 Create GitHub Release

Tag the release on GitHub:

```bash
git tag v0.1.0
git push --tags
```

Then:

1. Go to GitHub repository
2. Click "Releases" → "Create a new release"
3. Select tag `v0.1.0`
4. Title: `React RichText Viewer 0.1.0`
5. Description: (copy from CHANGELOG.md)
6. Publish release

---

## ✅ Final Verification Checklist

- [ ] All local tests pass
- [ ] Build succeeds with no errors
- [ ] Lint passes
- [ ] Type checking passes
- [ ] Package contents verified (`npm pack --dry-run`)
- [ ] Changeset created and versioned
- [ ] Version bumped in `package.json`
- [ ] `CHANGELOG.md` updated
- [ ] Commits pushed to GitHub
- [ ] npm login successful
- [ ] Dry-run publish succeeds
- [ ] Published to npm (`npm publish`)
- [ ] Package installable from npm
- [ ] Package visible on npmjs.com
- [ ] GitHub Release created with tag

---

## 🎉 Success!

If all checks pass, your package is now live on npm!

**Share it:**

```
https://www.npmjs.com/package/react-richtext-viewer
```

**Install command to share:**

```bash
npm install react-richtext-viewer dompurify
```

---

## 📋 Ongoing Maintenance

### For future releases:

1. Make changes on a feature branch
2. Create changeset: `npx changeset`
3. Push branch and open PR
4. Merge PR to `main`
5. Version: `npx changeset version`
6. Publish: `npm publish`

### Keep everything updated:

```bash
# Monthly security audit
npm audit fix

# Check for outdated deps
npm outdated
npm update
```

---

## 🔗 Useful Links

- **NPM Package:** https://www.npmjs.com/package/react-richtext-viewer
- **GitHub:** https://github.com/yourusername/react-richtext-viewer
- **DOMPurify Docs:** https://github.com/cure53/DOMPurify
- **TypeScript Handbook:** https://www.typescriptlang.org/docs
- **Testing Library:** https://testing-library.com/docs/react-testing-library/intro
- **Changesets:** https://github.com/changesets/changesets
- **Ladle:** https://ladle.dev

---

## 🏁 Congratulations!

You've successfully:

- ✅ Built a professional React component library
- ✅ Set up TypeScript with strict mode
- ✅ Created comprehensive tests
- ✅ Configured linting & formatting
- ✅ Built interactive documentation
- ✅ Automated CI/CD
- ✅ Managed releases with Changesets
- ✅ Published to npm

**Your package is ready for the world!** 🚀

---

**End of Step-by-Step Guide**

For questions or updates, refer back to individual step guides or the main `.github/prompts/react-richtext-viewer-copilot-prompt.md`.
