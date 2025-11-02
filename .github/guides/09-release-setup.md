# Step 9: Release Setup

Configure Changesets for automated versioning and npm publishing.

**Time:** 10 minutes  
**Files to create/generate:**

- `.changeset/config.json`
- `.changeset/README.md`

---

## 📋 Tasks

### 9.1 Install Changesets

```bash
npm install -D @changesets/cli
```

---

### 9.2 Initialize Changesets

```bash
npx changeset init
```

This creates:

- `.changeset/config.json` — Configuration
- `.changeset/README.md` — Documentation

**The config will be auto-generated.** Verify it looks like this:

**.changeset/config.json:**

```json
{
  "$schema": "https://unpkg.com/@changesets/config@2.3.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

**Update `access` to `public`** (since we're publishing to npm):

```bash
npm pkg set -D '@changesets/cli' && npx changeset init
```

Or manually edit `.changeset/config.json`:

```json
{
  ...
  "access": "public",
  ...
}
```

---

### 9.3 Understand Changeset Workflow

**For developers:**

After making changes, create a changeset:

```bash
npx changeset
```

You'll be prompted:

```
Which packages would you like to include? (select with space)
❯ ◯ react-richtext-viewer
```

Then choose version bump:

```
What kind of change is this for react-richtext-viewer? (select with enter)
❯ ◯ patch (0.0.x)
  ◯ minor (0.x.0)
  ◯ major (x.0.0)
```

Then describe the change:

```
Please enter a summary for this change:
› Added new feature / Fixed bug / etc.
```

This creates a file in `.changeset/` like:

```
.changeset/brave-alphas-speak.md
```

**Content:**

```markdown
---
"react-richtext-viewer": patch
---

Fixed sanitization issue with nested HTML elements
```

**Commit this file** (it's part of your PR).

---

### 9.4 Release Process

When ready to publish (after PRs are merged to main):

```bash
# 1. Pull latest main
git pull

# 2. Version bump & generate CHANGELOG
npx changeset version

# 3. Commit version changes
git add -A
git commit -m "chore: version bump"

# 4. Push to GitHub
git push

# 5. (Optional) Create GitHub Release tag

# 6. Login to npm
npm login

# 7. Publish to npm
npx changeset publish
```

Or use the convenience script in `package.json`:

```bash
npm run release
```

(Runs: `changeset version && npm i && git add -A && git commit && git push && changeset publish`)

---

## ✅ Verification

### Verify setup:

```bash
# Check config exists
cat .changeset/config.json
# Should show valid JSON

# Try creating a test changeset
npx changeset
# (Don't commit it yet, just test the flow)
```

---

## 📝 Checklist

- [ ] `@changesets/cli` installed
- [ ] `.changeset/` directory and config created
- [ ] `access` set to `"public"` in config
- [ ] `baseBranch` set to `"main"`
- [ ] Can run `npx changeset` without errors
- [ ] Release script in `package.json` exists

---

## 🚀 Release Checklist (For Later)

Before publishing to npm:

- [ ] All tests pass
- [ ] Build succeeds
- [ ] No lint errors
- [ ] Version bumped via changeset
- [ ] CHANGELOG updated
- [ ] Commits pushed to GitHub
- [ ] npm account has publishing rights
- [ ] 2FA enabled on npm (recommended)

---

## 💡 Tips

**Skip a package from changeset:**

```bash
npx changeset
# When prompted for package, press Escape to skip
```

**Review changesets before version bump:**

```bash
ls .changeset/
# See all pending changesets
```

**Dry-run the publish:**

```bash
npm publish --dry-run
```

**Check current npm token:**

```bash
npm config get registry
# Should show: https://registry.npmjs.org/
```

---

**Next:** [Step 10 — Verification & Publish →](./10-verification.md)
