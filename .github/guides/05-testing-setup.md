# Step 5: Testing Setup

Configure Vitest and create unit tests for the component.

**Time:** 15 minutes  
**Files to create:**

- `tests/RichTextViewer.test.tsx`
- `vitest.config.ts` (optional but recommended)

---

## 📋 Tasks

### 5.1 Install Testing Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**What each package does:**

- `vitest` — Fast unit test runner
- `@testing-library/react` — React component testing utilities
- `@testing-library/jest-dom` — DOM assertions
- `jsdom` — Virtual DOM for tests

---

### 5.2 Create `vitest.config.ts`

Optional but recommended for explicit configuration.

**Location:** `vitest.config.ts` (root)

**Content:**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
  },
});
```

**Configuration:**
| Option | Purpose |
|--------|---------|
| `environment: "jsdom"` | Use DOM (not Node.js) for tests |
| `globals: true` | No need to import `describe`, `it`, etc. |
| `setupFiles: []` | Add global setup if needed |

---

### 5.3 Create `tests/RichTextViewer.test.tsx`

Unit tests covering core functionality.

**Location:** `tests/RichTextViewer.test.tsx`

**Content:**

```tsx
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RichTextViewer } from "../src";

afterEach(cleanup);

describe("RichTextViewer", () => {
  it("renders without crashing", () => {
    render(<RichTextViewer html="<p>Hello</p>" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders empty div when html is undefined", () => {
    const { container } = render(<RichTextViewer />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it("renders empty div when html is empty string", () => {
    const { container } = render(<RichTextViewer html="" />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it("applies custom className", () => {
    const { container } = render(
      <RichTextViewer html="<p>Test</p>" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("sanitizes script tags", () => {
    render(<RichTextViewer html={'<b>Hi</b><script>alert("xss")</script>'} />);
    expect(screen.getByText("Hi")).toBeInTheDocument();
    expect(document.body.innerHTML).not.toContain("alert");
  });

  it("sanitizes event handlers", () => {
    render(<RichTextViewer html={'<div onclick="alert(1)">Click me</div>'} />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
    const div = screen.getByText("Click me");
    expect(div).not.toHaveAttribute("onclick");
  });

  it("preserves safe HTML tags", () => {
    render(
      <RichTextViewer html="<h1>Title</h1><p>Paragraph</p><strong>Bold</strong>" />
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Title"
    );
    expect(screen.getByText("Bold")).toBeInTheDocument();
  });

  it("updates when html prop changes", async () => {
    const { rerender } = render(<RichTextViewer html="<p>First</p>" />);
    expect(screen.getByText("First")).toBeInTheDocument();

    rerender(<RichTextViewer html="<p>Second</p>" />);
    // Wait for state update
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("handles multiline HTML", () => {
    const html = `
      <article>
        <h2>Article Title</h2>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </article>
    `;
    render(<RichTextViewer html={html} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Article Title"
    );
  });
});
```

**Test coverage:**

- ✅ Basic rendering
- ✅ Empty/undefined handling
- ✅ Custom className
- ✅ Script tag sanitization
- ✅ Event handler removal
- ✅ Safe HTML preservation
- ✅ Dynamic updates
- ✅ Complex HTML structures

---

## ✅ Verification

Run tests:

```bash
npm test
```

**Expected output:**

```
✓ tests/RichTextViewer.test.tsx (8 tests)
  ✓ renders without crashing
  ✓ renders empty div when html is undefined
  ✓ renders empty div when html is empty string
  ✓ applies custom className
  ✓ sanitizes script tags
  ✓ sanitizes event handlers
  ✓ preserves safe HTML tags
  ✓ updates when html prop changes
  ✓ handles multiline HTML

Test Files  1 passed (1)
     Tests  9 passed (9)
```

Watch mode for development:

```bash
npm run test:watch
```

---

## 📝 Checklist

- [ ] Testing dependencies installed
- [ ] `vitest.config.ts` created (optional)
- [ ] `tests/RichTextViewer.test.tsx` created
- [ ] All tests pass (`npm test`)
- [ ] Watch mode works (`npm run test:watch`)

---

**Next:** [Step 6 — Linting & Formatting →](./06-lint-format.md)
