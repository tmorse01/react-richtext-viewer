# Step 3: Main Component

Build the core `RichTextViewer` component and exports.

**Time:** 10 minutes  
**Files to create:**

- `src/RichTextViewer.tsx`
- `src/index.ts`

---

## 📋 Tasks

### 3.1 Create `src/RichTextViewer.tsx`

The main component that safely renders HTML with DOMPurify.

**Location:** `src/RichTextViewer.tsx`

**Content:**

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
      if (!input) {
        if (alive) setSafeHtml("");
        return;
      }
      const { default: DOMPurify } = await import("dompurify");
      const cleaned = DOMPurify.sanitize(input, {
        USE_PROFILES: { html: true },
      });
      if (alive) setSafeHtml(cleaned);
    })();
    return () => {
      alive = false;
    };
  }, [html]);

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: safeHtml }} />
  );
}
```

**Key implementation details:**

- ✅ **SSR-safe**: No `window` access at module top level
- ✅ **Lazy-load DOMPurify**: Imported in `useEffect` to reduce bundle size
- ✅ **Cleanup logic**: `alive` flag prevents state updates after unmount
- ✅ **Type-safe**: Full TypeScript support with `RichTextViewerProps`
- ✅ **Flexible**: Accepts optional `html` and `className` props

**Why this approach:**

1. DOMPurify is only imported when the component mounts in the browser
2. The `alive` flag prevents memory leaks if the component unmounts during async import
3. Works perfectly with SSR (Next.js, Remix, etc.)

---

### 3.2 Create `src/index.ts`

Public exports for the package.

**Location:** `src/index.ts`

**Content:**

```ts
export type { RichTextViewerProps } from "./RichTextViewer";
export { RichTextViewer } from "./RichTextViewer";
```

**Purpose:**

- Clean public API
- Type-safe exports
- Single entry point for consumers

---

## ✅ Verification

Check TypeScript compiles without errors:

```bash
npx tsc --noEmit
# Should show no errors
```

---

## 📝 Checklist

- [ ] `src/RichTextViewer.tsx` created with sanitization logic
- [ ] `src/index.ts` created with clean exports
- [ ] TypeScript compiles without errors
- [ ] Component includes proper JSDoc/types

---

## 💡 Example Usage (Preview)

```tsx
import { RichTextViewer } from "react-richtext-viewer";

export function App() {
  return (
    <RichTextViewer
      html="<p>Hello <strong>world</strong></p>"
      className="content"
    />
  );
}
```

---

**Next:** [Step 4 — Build Configuration →](./04-build-config.md)
