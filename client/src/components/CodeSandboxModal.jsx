import { useState } from 'react';
import { Terminal, Play, RotateCcw, X, Lightbulb } from 'lucide-react';

/**
 * Executes a string of JavaScript code safely in an isolated Web Worker.
 * Benefits:
 * - NO access to window, document, localStorage, sessionStorage, or auth tokens.
 * - Watchdog timer (3000ms) terminates infinite loops (e.g. while(true)) without freezing the UI.
 */
function executeJavaScriptInWorker(codeStr, timeoutMs = 3000) {
  return new Promise((resolve) => {
    const workerScript = `
      self.onmessage = function(e) {
        const userCode = e.data;
        const logs = [];
        const customConsole = {
          log: (...args) => {
            logs.push({
              type: 'log',
              text: args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '),
            });
          },
          warn: (...args) => {
            logs.push({
              type: 'warn',
              text: args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '),
            });
          },
          error: (...args) => {
            logs.push({
              type: 'error',
              text: args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '),
            });
          },
        };

        try {
          const runner = new Function('console', userCode);
          const returnVal = runner(customConsole);

          if (returnVal !== undefined) {
            logs.push({
              type: 'return',
              text: '➔ ' + (typeof returnVal === 'object' ? JSON.stringify(returnVal, null, 2) : String(returnVal)),
            });
          }

          if (logs.length === 0) {
            logs.push({
              type: 'log',
              text: '(Code executed successfully with no console output)',
            });
          }

          self.postMessage({ logs, error: null });
        } catch (err) {
          self.postMessage({
            logs,
            error: (err && err.name ? err.name : 'Error') + ': ' + (err && err.message ? err.message : String(err)),
          });
        }
      };
    `;

    let blobUrl = null;
    let worker = null;
    let timer = null;
    let settled = false;

    const cleanup = () => {
      if (timer) clearTimeout(timer);
      if (worker) {
        worker.terminate();
        worker = null;
      }
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        blobUrl = null;
      }
    };

    try {
      const blob = new Blob([workerScript], { type: 'application/javascript' });
      blobUrl = URL.createObjectURL(blob);
      worker = new Worker(blobUrl);

      timer = setTimeout(() => {
        if (!settled) {
          settled = true;
          cleanup();
          resolve({
            logs: [],
            error: 'Execution Timed Out: Infinite loop or long running execution terminated safely.',
          });
        }
      }, timeoutMs);

      worker.onmessage = (e) => {
        if (!settled) {
          settled = true;
          const data = e.data;
          cleanup();
          resolve(data);
        }
      };

      worker.onerror = (err) => {
        if (!settled) {
          settled = true;
          cleanup();
          resolve({
            logs: [],
            error: 'Sandbox Runtime Error: ' + (err.message || 'Worker execution failed'),
          });
        }
      };

      worker.postMessage(codeStr);
    } catch (createErr) {
      cleanup();
      resolve({
        logs: [],
        error: 'Worker Initialization Error: ' + (createErr.message || 'Failed to initialize sandbox'),
      });
    }
  });
}

export default function CodeSandboxModal({ initialCode = '', language = 'javascript', title = 'Interactive Code Sandbox', onClose }) {
  const [code, setCode] = useState(initialCode.trim());
  const [outputLogs, setOutputLogs] = useState([]);
  const [runtimeError, setRuntimeError] = useState(null);
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setHasRun(true);
    const { logs, error } = await executeJavaScriptInWorker(code);
    setOutputLogs(logs);
    setRuntimeError(error);
    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(initialCode.trim());
    setOutputLogs([]);
    setRuntimeError(null);
    setHasRun(false);
    setIsRunning(false);
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '760px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0f0c',
          border: '1px solid rgba(200, 255, 55, 0.4)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
          borderRadius: '10px',
          overflow: 'hidden',
          padding: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 20px',
            background: '#050806',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
            <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
            <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
            <h3 style={{ margin: 0, fontSize: '0.92rem', color: 'var(--lime)', fontFamily: 'DM Mono', marginLeft: '6px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={16} />
              {title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
            }}
            aria-label="Close Sandbox"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              EDITABLE SOURCE ({language.toUpperCase()}):
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary btn-sm"
                style={{ padding: '4px 10px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <RotateCcw size={12} />
                <span>Reset Code</span>
              </button>
              <button
                type="button"
                onClick={handleRun}
                disabled={isRunning}
                className="btn btn-primary btn-sm"
                style={{ padding: '4px 14px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '5px', opacity: isRunning ? 0.7 : 1 }}
              >
                <Play size={12} fill="currentColor" />
                <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
              </button>
            </div>
          </div>

          {/* Code Editor Textarea */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="textarea-field mono"
            style={{
              width: '100%',
              minHeight: '160px',
              fontFamily: '"DM Mono", Consolas, monospace',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              background: '#060a08',
              color: '#a3e635',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              padding: '14px',
              resize: 'vertical',
            }}
          />

          {/* Console Output Terminal */}
          <div style={{ marginTop: '18px' }}>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--lime)', display: 'block', marginBottom: '6px' }}>
              TERMINAL OUTPUT:
            </span>

            <div
              style={{
                background: '#040605',
                border: '1px solid rgba(200, 255, 55, 0.2)',
                borderRadius: '6px',
                padding: '14px 16px',
                minHeight: '100px',
                fontFamily: '"DM Mono", Consolas, monospace',
                fontSize: '0.86rem',
                lineHeight: '1.5',
              }}
            >
              {!hasRun ? (
                <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontStyle: 'italic' }}>
                  Click &quot;▶ Run Code&quot; to execute this snippet and inspect console outputs...
                </span>
              ) : (
                <>
                  {outputLogs.map((log, idx) => (
                    <div
                      key={idx}
                      style={{
                        color: log.type === 'error' ? '#f87171' : log.type === 'warn' ? '#fbbf24' : log.type === 'return' ? '#38bdf8' : '#e5e7eb',
                        marginBottom: '4px',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {log.text}
                    </div>
                  ))}

                  {runtimeError && (
                    <div style={{ color: '#ef4444', fontWeight: 700, marginTop: '6px' }}>
                      ✕ {runtimeError}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '12px 20px',
            background: '#060907',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Lightbulb size={12} color="var(--lime)" /> Tip: Modify variables and experiment with edge cases!
          </span>
          <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
            Close Sandbox
          </button>
        </div>
      </div>
    </div>
  );
}
