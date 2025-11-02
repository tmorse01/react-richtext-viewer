import * as React from 'react';

export type RichTextViewerProps = {
  html?: string;
  className?: string;
};

export function RichTextViewer({ html, className }: RichTextViewerProps) {
  const [safeHtml, setSafeHtml] = React.useState('');

  React.useEffect(() => {
    let alive = true;
    (async () => {
      const input = html ?? '';
      if (!input) {
        if (alive) setSafeHtml('');
        return;
      }
      const { default: DOMPurify } = await import('dompurify');
      const cleaned = DOMPurify.sanitize(input, { USE_PROFILES: { html: true } });
      if (alive) setSafeHtml(cleaned);
    })();
    return () => {
      alive = false;
    };
  }, [html]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
