import CodeBlock from './CodeBlock';

/**
 * Formats question text with support for:
 * 1. Markdown code fences: ```lang\ncode\n```
 * 2. Inline code: `variable`
 * 3. Separate codeSnippet prop
 */
export default function FormattedQuestion({ text, codeSnippet, language = 'javascript' }) {
  if (!text) return null;

  // If there's a dedicated codeSnippet prop, render prompt text + CodeBlock
  if (codeSnippet && typeof codeSnippet === 'string' && codeSnippet.trim()) {
    return (
      <div className="formatted-q-wrap">
        <div style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: '1.5', color: '#f9fafb', marginBottom: '12px' }}>
          {renderInlineBackticks(text)}
        </div>
        <CodeBlock code={codeSnippet} language={language} />
      </div>
    );
  }

  // Parse markdown code fences inside text
  const parts = [];
  const regex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Text before the code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      });
    }

    // Code block itself
    parts.push({
      type: 'code',
      language: match[1] || language || 'javascript',
      content: match[2],
    });

    lastIndex = regex.lastIndex;
  }

  // Remaining text after last code block
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex),
    });
  }

  return (
    <div className="formatted-q-wrap">
      {parts.map((p, idx) => {
        if (p.type === 'code') {
          return <CodeBlock key={idx} code={p.content} language={p.language} />;
        }
        return (
          <div
            key={idx}
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              lineHeight: '1.5',
              color: '#f9fafb',
              marginBottom: '8px',
            }}
          >
            {renderInlineBackticks(p.content)}
          </div>
        );
      })}
    </div>
  );
}

function renderInlineBackticks(text) {
  if (!text) return null;
  const segments = text.split(/(`[^`]+`)/g);

  return segments.map((seg, i) => {
    if (seg.startsWith('`') && seg.endsWith('`') && seg.length > 2) {
      return (
        <code
          key={i}
          style={{
            fontFamily: '"DM Mono", Consolas, monospace',
            fontSize: '0.9em',
            background: 'rgba(200, 255, 55, 0.1)',
            color: 'var(--lime)',
            border: '1px solid rgba(200, 255, 55, 0.25)',
            padding: '2px 6px',
            borderRadius: '4px',
          }}
        >
          {seg.slice(1, -1)}
        </code>
      );
    }
    return seg;
  });
}
