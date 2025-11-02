import * as React from 'react';
import type { StoryDefault, Story } from '@ladle/react';
import { RichTextViewer } from '../src';

export default { title: 'RichTextViewer' } satisfies StoryDefault;

export const Basic: Story = () => {
  const [html, setHtml] = React.useState('<p>Hello <strong>world</strong></p>');
  return (
    <div style={{ maxWidth: 640 }}>
      <h2>Interactive Editor</h2>
      <textarea
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        style={{
          width: '100%',
          height: 120,
          fontFamily: 'monospace',
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
    <p style={{ fontSize: 12, color: '#666' }}>↑ The script tag was removed by DOMPurify</p>

    <h3>❌ Event Handlers (Removed)</h3>
    <RichTextViewer html='<button onclick="alert(1)">Click</button>' />
    <p style={{ fontSize: 12, color: '#666' }}>↑ The onclick handler was stripped</p>

    <h3>✅ Safe HTML (Preserved)</h3>
    <RichTextViewer html="<h3>Title</h3><p>Paragraph with <em>emphasis</em></p><ul><li>List item 1</li><li>List item 2</li></ul>" />
  </div>
);

export const Empty: Story = () => (
  <div>
    <p>Component with no HTML prop:</p>
    <RichTextViewer />
    <p style={{ fontSize: 12, color: '#666' }}>↑ Renders empty div</p>
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
