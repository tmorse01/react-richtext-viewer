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

export const CustomTypography: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <h3>Large Text</h3>
      <RichTextViewer
        html="<p>This content has <strong>larger font size</strong> for better readability.</p>"
        fontSize="18px"
        lineHeight="1.8"
      />
    </div>
    <div>
      <h3>Custom Font Family</h3>
      <RichTextViewer
        html="<p>This content uses <em>Georgia</em> font for a more classic look.</p>"
        fontFamily="Georgia, serif"
      />
    </div>
    <div>
      <h3>Custom Color</h3>
      <RichTextViewer
        html="<p>This content has a <strong>custom text color</strong>.</p>"
        color="#1e40af"
      />
    </div>
  </div>
);

export const ContainerStyling: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <h3>Custom Border & Background</h3>
      <RichTextViewer
        html="<p>This has a <strong>custom border</strong> and background color.</p>"
        border="2px solid #10b981"
        backgroundColor="#f0fdf4"
        borderRadius="12px"
      />
    </div>
    <div>
      <h3>Maximum Height with Scrolling</h3>
      <RichTextViewer
        html="<p>This is a long content that will scroll...</p><p>Paragraph 2</p><p>Paragraph 3</p><p>Paragraph 4</p><p>Paragraph 5</p>"
        maxHeight="150px"
        overflow="auto"
      />
    </div>
    <div>
      <h3>No Border, Custom Padding</h3>
      <RichTextViewer
        html="<p>This has <strong>no border</strong> but extra padding.</p>"
        border="none"
        padding="24px"
        backgroundColor="#f8fafc"
      />
    </div>
  </div>
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
    <p style={{ fontSize: 12, color: '#666' }}>↑ Renders empty div with default styles</p>
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
