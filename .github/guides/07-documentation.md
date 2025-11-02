# Step 7: Documentation

Create interactive documentation with Ladle and finalize README.

**Time:** 15 minutes  
**Files to create:**

- `stories/RichTextViewer.stories.tsx`
- Update `README.md` (already done, but verify)
- `.ladle/config.mjs` (optional)

---

## 📋 Tasks

### 7.1 Install Ladle

```bash
npm install -D @ladle/react
```

Ladle is a lightweight alternative to Storybook for documenting React components.

---

### 7.2 Create `stories/RichTextViewer.stories.tsx`

Interactive documentation and examples.

**Location:** `stories/RichTextViewer.stories.tsx`

**Content:**

```tsx
import * as React from "react";
import type { StoryDefault, Story } from "@ladle/react";
import { RichTextViewer } from "../src";

export default { title: "RichTextViewer" } satisfies StoryDefault;

export const Basic: Story = () => {
  const [html, setHtml] = React.useState("<p>Hello <strong>world</strong></p>");
  return (
    <div style={{ maxWidth: 640 }}>
      <h2>Interactive Editor</h2>
      <textarea
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        style={{
          width: "100%",
          height: 120,
          fontFamily: "monospace",
          padding: 8,
          marginBottom: 16,
        }}
        placeholder="Enter HTML here..."
      />
      <hr />
      <h3>Output:</h3>
      <RichTextViewer html={html} />
    </div>
  );
};

export const SafeHtml: Story = () => (
  <RichTextViewer html="<h2>Article Title</h2><p>This is a <strong>safe</strong> paragraph with a <a href='#'>link</a>.</p>" />
);

export const WithClassName: Story = () => (
  <div>
    <style>{`
      .custom-content {
        border: 2px solid #ccc;
        padding: 16px;
        border-radius: 8px;
        background-color: #f5f5f5;
      }
      .custom-content p {
        margin: 8px 0;
      }
      .custom-content strong {
        color: #2563eb;
      }
    `}</style>
    <RichTextViewer
      html="<p>This is <strong>styled content</strong> with custom CSS.</p>"
      className="custom-content"
    />
  </div>
);

export const SanitizationDemo: Story = () => (
  <div>
    <h2>Sanitization Examples</h2>
    <h3>❌ Dangerous Input (Automatically Removed)</h3>
    <RichTextViewer html='<p>Safe text</p><script>alert("XSS")</script>' />
    <p style={{ fontSize: 12, color: "#666" }}>
      ↑ The script tag was removed by DOMPurify
    </p>

    <h3>❌ Event Handlers (Removed)</h3>
    <RichTextViewer html='<button onclick="alert(1)">Click</button>' />
    <p style={{ fontSize: 12, color: "#666" }}>
      ↑ The onclick handler was stripped
    </p>

    <h3>✅ Safe HTML (Preserved)</h3>
    <RichTextViewer html="<h3>Title</h3><p>Paragraph with <em>emphasis</em></p><ul><li>List item 1</li><li>List item 2</li></ul>" />
  </div>
);

export const Empty: Story = () => (
  <div>
    <p>Component with no HTML prop:</p>
    <RichTextViewer />
    <p style={{ fontSize: 12, color: "#666" }}>↑ Renders empty div</p>
  </div>
);

export const LongContent: Story = () => (
  <RichTextViewer
    html={`
    <article>
      <h2>Sample Article</h2>
      <p>This is the first paragraph of content. It contains some <strong>important information</strong>.</p>
      <h3>Subsection</h3>
      <p>More content here with a <a href="#">link</a>.</p>
      <ul>
        <li>Point 1</li>
        <li>Point 2</li>
        <li>Point 3</li>
      </ul>
      <blockquote>
        <p>A famous quote goes here.</p>
      </blockquote>
    </article>
  `}
  />
);
```

**Story explanations:**

- **Basic** → Interactive editor to test sanitization in real-time
- **SafeHtml** → Example of preserved HTML
- **WithClassName** → Demonstrates CSS styling via className
- **SanitizationDemo** → Shows what DOMPurify removes
- **Empty** → Tests empty/undefined behavior
- **LongContent** → Tests complex HTML structures

---

### 7.3 Create `.ladle/config.mjs` (Optional)

Configuration file for Ladle.

**Location:** `.ladle/config.mjs`

**Content:**

```mjs
export default {
  title: "RichTextViewer",
  outDir: ".ladle/dist",
  openStory: "richtext-viewer--basic",
};
```

---

### 7.4 Update `package.json` (if not already)

Verify the Ladle script exists:

```bash
npm pkg get scripts.ladle
# Should show: "ladle serve"
```

If missing, add it:

```bash
npm pkg set scripts.ladle="ladle serve"
```

---

## ✅ Verification

### Run Ladle dev server:

```bash
npm run ladle
```

**Expected output:**

```
Ladle server is running at http://localhost:61000
```

Then:

1. Open browser to `http://localhost:61000`
2. You should see the RichTextViewer stories
3. Test the interactive editor
4. Verify sanitization demo removes scripts

### Build Ladle for deployment:

```bash
npx ladle build
```

---

## 📝 Checklist

- [ ] Ladle installed
- [ ] `stories/RichTextViewer.stories.tsx` created with multiple examples
- [ ] `.ladle/config.mjs` created (optional)
- [ ] `npm run ladle` starts dev server
- [ ] All stories render correctly
- [ ] Interactive editor works
- [ ] Sanitization demo shows XSS prevention

---

## 💡 Tips

**Adding more stories:**

1. Create new `export const StoryName: Story = () => {...}`
2. Ladle auto-detects and displays them
3. No need to restart dev server

**Styling:**

- Use inline `<style>` tags in stories
- Or CSS modules (if configured)
- Each story is isolated

---

**Next:** [Step 8 — CI/CD Pipeline →](./08-cicd.md)
