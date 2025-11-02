import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RichTextViewer } from '../src';

afterEach(cleanup);

describe('RichTextViewer', () => {
  it('renders without crashing', async () => {
    render(<RichTextViewer html="<p>Hello</p>" />);
    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });

  it('renders empty div when html is undefined', () => {
    const { container } = render(<RichTextViewer />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('renders empty div when html is empty string', () => {
    const { container } = render(<RichTextViewer html="" />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('applies custom className', async () => {
    const { container } = render(<RichTextViewer html="<p>Test</p>" className="custom-class" />);
    await waitFor(() => {
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  it('sanitizes script tags', async () => {
    render(<RichTextViewer html={'<b>Hi</b><script>alert("xss")</script>'} />);
    await waitFor(() => {
      expect(screen.getByText('Hi')).toBeInTheDocument();
      expect(document.body.innerHTML).not.toContain('alert');
    });
  });

  it('sanitizes event handlers', async () => {
    render(<RichTextViewer html={'<div onclick="alert(1)">Click me</div>'} />);
    await waitFor(() => {
      expect(screen.getByText('Click me')).toBeInTheDocument();
      const div = screen.getByText('Click me');
      expect(div).not.toHaveAttribute('onclick');
    });
  });

  it('preserves safe HTML tags', async () => {
    render(<RichTextViewer html="<h1>Title</h1><p>Paragraph</p><strong>Bold</strong>" />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title');
      expect(screen.getByText('Bold')).toBeInTheDocument();
    });
  });

  it('updates when html prop changes', async () => {
    const { rerender } = render(<RichTextViewer html="<p>First</p>" />);
    await waitFor(() => {
      expect(screen.getByText('First')).toBeInTheDocument();
    });

    rerender(<RichTextViewer html="<p>Second</p>" />);
    await waitFor(() => {
      expect(screen.getByText('Second')).toBeInTheDocument();
    });
  });

  it('handles multiline HTML', async () => {
    const html = `
      <article>
        <h2>Article Title</h2>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </article>
    `;
    render(<RichTextViewer html={html} />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Article Title');
    });
  });
});
