# react-richtext-viewer

Tiny, safe React component to render trusted HTML (sanitized with DOMPurify).

## ✨ Features

- **Secure by default**: Uses DOMPurify to sanitize HTML and prevent XSS attacks
- **SSR-safe**: No top-level DOM access; lazy-loads heavy dependencies
- **Tree-shakeable**: Minimal bundle footprint with `"sideEffects": false`
- **TypeScript**: Full type safety with strict mode enabled
- **ESM + CJS**: Dual module output with type definitions
- **React 18/19**: Supports both versions as peerDependency

## 📦 Installation

```bash
npm install react-richtext-viewer dompurify
```

## 🚀 Quick Start

```tsx
import { RichTextViewer } from "react-richtext-viewer";

export function App() {
  const html = "<p>Hello <strong>world</strong></p>";
  return <RichTextViewer html={html} />;
}
```

## 📖 API

### `RichTextViewer`

```tsx
interface RichTextViewerProps {
  html?: string;
  className?: string;
}
```

**Props:**

- `html` (string, optional): HTML content to render (will be sanitized)
- `className` (string, optional): CSS class to apply to the wrapper `<div>`

**Example:**

```tsx
<RichTextViewer html="<h1>Title</h1><p>Content</p>" className="content-area" />
```

## 🔒 Security

This component sanitizes all HTML input using DOMPurify with the HTML profile. However:

- **Trusted content**: If you control the HTML source, it's safe to render
- **Untrusted content**: This component defensively sanitizes it, but always validate on the backend when accepting user-generated HTML
- **Scripts**: All `<script>` tags and event handlers are removed by DOMPurify

```tsx
// Safe: sanitized automatically
<RichTextViewer html={userGeneratedHtml} />

// Still dangerous: avoid using if possible
<RichTextViewer html={`<div>${unsafeValue}</div>`} />
```

## 🖥️ Server-Side Rendering (SSR)

This component is SSR-safe:

- No DOM access at module load time
- DOMPurify is lazy-loaded in `useEffect`
- Hydration works correctly with Next.js, Remix, etc.

```tsx
// Works with SSR frameworks
export default function Page() {
  return <RichTextViewer html="<p>Safe to use in SSR</p>" />;
}
```

## 🛠️ Development

### Setup

```bash
npm install
npm run build
```

### Scripts

```bash
# Development
npm run dev              # Watch mode build
npm run typecheck       # Type checking
npm run lint            # ESLint
npm run format          # Prettier format

# Testing
npm test                # Run tests once
npm run test:watch      # Watch mode tests

# Documentation
npm run ladle            # Start interactive docs (Ladle)

# Release
npx changeset           # Create a version bump
npm run release         # Publish to npm
```

### Project Structure

```
react-richtext-viewer/
├── src/
│   ├── index.ts               # Exports
│   └── RichTextViewer.tsx      # Main component
├── tests/
│   └── RichTextViewer.test.tsx # Unit tests
├── stories/
│   └── RichTextViewer.stories.tsx # Interactive docs
├── tsup.config.ts             # Build config
├── tsconfig.json              # TypeScript config
├── .eslintrc.cjs              # ESLint config
├── .prettierrc                # Prettier config
├── package.json               # Dependencies & scripts
└── README.md                  # This file
```

## 🧪 Testing

Tests cover:

- Basic rendering
- HTML sanitization (script tag removal)
- Accessibility smoke tests

```bash
npm test
```

## 📚 Stories / Interactive Docs

View interactive examples and test the component:

```bash
npm run ladle
```

Ladle will start a dev server. Edit HTML in the textarea to see live rendering.

## 🔄 CI/CD

GitHub Actions runs on every push and pull request:

- Linting with ESLint
- Type checking with TypeScript
- Tests with Vitest
- Build with tsup

## 📋 Release Workflow

1. **After making changes**, create a changeset:

   ```bash
   npx changeset
   ```

   This generates a change summary.

2. **Version & commit**:

   ```bash
   npm run release
   ```

   This bumps the version, installs deps, and publishes to npm.

3. **Login to npm**:
   ```bash
   npm login
   ```
   Required before first publish.

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Run `npm run lint` and `npm run test`
6. Submit a pull request

## 📦 Dependencies

- **dompurify**: HTML sanitization library (installed separately)
- **react**: Peer dependency (18 or 19+)

## 🆘 Troubleshooting

**"Cannot find module 'dompurify'"**

```bash
npm install dompurify
```

**SSR hydration mismatch**
This shouldn't occur—the component is SSR-safe. If you experience issues, verify:

- DOMPurify is installed
- You're using React 18+

**Styles not applied**
Use the `className` prop and ensure your CSS is loaded:

```tsx
<RichTextViewer html={html} className="my-styles" />
```

---

**Version:** 0.0.1  
**Author:** Taylor Morse
**Repository:** [github.com/tmorse01/react-richtext-viewer](https://github.com/tmorse01/react-richtext-viewer)
