import { useState } from 'react';

/**
 * Lightweight, fast syntax tokenizer for developer code blocks
 */
function highlightCode(code, language = 'javascript') {
  if (!code) return '';

  const escapeHtml = (str) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const lang = (language || 'javascript').toLowerCase();

  // Keyword list
  const jsKeywords = /\b(const|let|var|function|return|if|else|for|while|import|export|from|default|async|await|try|catch|throw|new|typeof|instanceof|class|extends|super|this|switch|case|break|continue|yield|null|undefined|true|false)\b/g;
  const typesKeywords = /\b(type|interface|enum|implements|declare|readonly|keyof|infer|never|any|unknown|void|string|number|boolean|Record|Partial|Required|Pick|Omit)\b/g;

  // Split into tokens for syntax coloring
  const lines = code.split('\n');

  return lines
    .map((line) => {
      let highlighted = escapeHtml(line);

      // 1. Comments
      if (highlighted.trim().startsWith('//') || highlighted.trim().startsWith('#')) {
        return `<span style="color: #6b7280; font-style: italic;">${highlighted}</span>`;
      }

      // 2. Strings (single quotes, double quotes, backticks)
      highlighted = highlighted.replace(
        /(["'`])(?:(?=(\\?))\2.)*?\1/g,
        '<span style="color: #a3e635;">$&</span>'
      );

      // 3. Numbers
      highlighted = highlighted.replace(
        /\b(\d+(\.\d+)?)\b/g,
        '<span style="color: #f59e0b;">$1</span>'
      );

      // 4. JS/TS Keywords
      highlighted = highlighted.replace(
        jsKeywords,
        '<span style="color: #38bdf8; font-weight: 600;">$1</span>'
      );

      // 5. Types
      if (lang === 'typescript' || lang === 'ts') {
        highlighted = highlighted.replace(
          typesKeywords,
          '<span style="color: #c084fc; font-weight: 600;">$1</span>'
        );
      }

      // 6. Function calls (e.g. foo())
      highlighted = highlighted.replace(
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g,
        '<span style="color: #fbbf24;">$1</span>'
      );

      return highlighted;
    })
    .join('\n');
}

export default function CodeBlock({ code, language = 'javascript', title = null }) {
  const [copied, setCopied] = useState(false);

  if (!code || typeof code !== 'string') return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedHtml = highlightCode(code.trim(), language);
  const lines = code.trim().split('\n');

  return (
    <div
      className="code-block-container"
      style={{
        margin: '16px 0 20px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(200, 255, 55, 0.25)',
        background: '#0a0f0c',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Code Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 14px',
          background: '#060907',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.74rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: '#ef4444' }}></span>
          <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: '#f59e0b' }}></span>
          <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: '#10b981' }}></span>
          <span
            className="mono"
            style={{
              color: 'var(--lime)',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginLeft: '6px',
              letterSpacing: '0.05em',
            }}
          >
            {title || language || 'CODE'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: 'none',
            color: copied ? 'var(--lime)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.72rem',
            fontFamily: 'DM Mono, monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {copied ? '✓ COPIED' : '⧉ COPY'}
        </button>
      </div>

      {/* Code Content with Line Numbers */}
      <div
        style={{
          display: 'flex',
          padding: '14px 0',
          overflowX: 'auto',
          fontFamily: '"DM Mono", Consolas, monospace',
          fontSize: '0.88rem',
          lineHeight: '1.6',
        }}
      >
        {/* Line Numbers Column */}
        <div
          style={{
            userSelect: 'none',
            padding: '0 14px',
            textAlign: 'right',
            color: 'rgba(255, 255, 255, 0.2)',
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Lines */}
        <pre
          style={{
            margin: 0,
            padding: '0 16px',
            color: '#e5e7eb',
            background: 'transparent',
            overflowX: 'visible',
          }}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </div>
    </div>
  );
}
