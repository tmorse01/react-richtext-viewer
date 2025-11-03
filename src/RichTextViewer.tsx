import * as React from 'react';

export type RichTextViewerProps = {
  html?: string;
  className?: string;
  style?: React.CSSProperties;
  // Typography
  fontSize?: string | number;
  lineHeight?: string | number;
  fontFamily?: string;
  color?: string;
  // Container styling
  border?: string;
  borderRadius?: string | number;
  padding?: string | number;
  maxHeight?: string | number;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  backgroundColor?: string;
};

const defaultStyles: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.6',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  color: '#333',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  backgroundColor: '#ffffff',
};

export function RichTextViewer({
  html,
  className,
  style,
  fontSize,
  lineHeight,
  fontFamily,
  color,
  border,
  borderRadius,
  padding,
  maxHeight,
  overflow,
  backgroundColor,
}: RichTextViewerProps) {
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

  const mergedStyles: React.CSSProperties = {
    ...defaultStyles,
    ...(fontSize !== undefined && { fontSize }),
    ...(lineHeight !== undefined && { lineHeight }),
    ...(fontFamily !== undefined && { fontFamily }),
    ...(color !== undefined && { color }),
    ...(border !== undefined && { border }),
    ...(borderRadius !== undefined && { borderRadius }),
    ...(padding !== undefined && { padding }),
    ...(maxHeight !== undefined && { maxHeight }),
    ...(overflow !== undefined && { overflow }),
    ...(backgroundColor !== undefined && { backgroundColor }),
    ...style,
  };

  return (
    <div className={className} style={mergedStyles} dangerouslySetInnerHTML={{ __html: safeHtml }} />
  );
}
