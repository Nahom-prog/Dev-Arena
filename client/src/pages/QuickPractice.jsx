import { useState } from 'react';
import { Link } from 'react-router-dom';

const PRACTICE_POOL = [
  {
    id: 1,
    category: 'JAVASCRIPT ENGINE',
    question: 'Which component in the V8 engine is responsible for optimizing hot bytecode into machine code?',
    options: ['Ignition Interpreter', 'TurboFan Compiler', 'Garbage Collector (Scavenger)', 'Libuv Event Loop'],
    correctIndex: 1,
    explanation: 'TurboFan is V8’s optimizing compiler that analyzes hot functions during execution and optimizes them into native machine code.',
  },
  {
    id: 2,
    category: 'REACT HOOKS',
    question: 'Why should useEffect dependencies array include all referenced reactive values?',
    options: [
      'To prevent the component from re-rendering completely',
      'To ensure closures do not capture stale state or props',
      'To automatically trigger CSS reflows',
      'To bypass the React Fiber scheduler',
    ],
    correctIndex: 1,
    explanation: 'Failing to declare reactive dependencies causes the effect closure to reference stale state values from previous renders.',
  },
  {
    id: 3,
    category: 'HTTP & NETWORKING',
    question: 'Which HTTP header prevents cross-site framing attacks (Clickjacking)?',
    options: ['X-Frame-Options', 'Access-Control-Allow-Origin', 'X-Content-Type-Options', 'Strict-Transport-Security'],
    correctIndex: 0,
    explanation: 'X-Frame-Options (or Content-Security-Policy frame-ancestors) instructs the browser whether a page can be rendered in a <frame> or <iframe>.',
  },
  {
    id: 4,
    category: 'ALGORITHMS',
    question: 'What is the average time complexity of searching in a balanced Binary Search Tree (AVL / Red-Black)?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctIndex: 1,
    explanation: 'Because the tree height is guaranteed to be logarithmic relative to the number of nodes, search operations take O(log N).',
  },
  {
    id: 5,
    category: 'DATABASE DESIGN',
    question: 'In MongoDB, which index type optimizes queries involving multiple fields with sorted conditions?',
    options: ['Compound Index', 'Text Index', 'Geospatial Index', 'Hashed Index'],
    correctIndex: 0,
    explanation: 'Compound indexes hold references to multiple fields in a document, accelerating multi-attribute filter and sort operations.',
  },
];

export default function QuickPractice() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = PRACTICE_POOL[currentIdx];

  const handleSelect = (idx) => {
    if (isAnswered) return;

    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx < PRACTICE_POOL.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setStreak(0);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="practice-page wrap" style={{ padding: '50px 0', maxWidth: '780px' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime">SPEED DRILLS</span>
          <h2>Blitz Practice Arena</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-lime">🔥 {streak}x STREAK</span>
          <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {currentIdx + 1} / {PRACTICE_POOL.length}
          </span>
        </div>
      </div>

      {!completed ? (
        <div className="card" style={{ padding: '34px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="badge badge-emerald">{currentQ.category}</span>
          </div>

          <h3 style={{ fontSize: '1.4rem', lineHeight: '1.45', margin: '0 0 28px' }}>
            {currentQ.question}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let customClass = 'exam-option-card';
              if (isAnswered) {
                if (isCorrect) customClass += ' selected';
              } else if (isSelected) {
                customClass += ' selected';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  className={customClass}
                  style={{
                    borderColor: isAnswered && isCorrect ? 'var(--lime)' : isAnswered && isSelected && !isCorrect ? 'var(--rose)' : undefined,
                    background: isAnswered && isSelected && !isCorrect ? 'rgba(248, 113, 113, 0.1)' : undefined,
                  }}
                  onClick={() => handleSelect(idx)}
                >
                  <span className="exam-opt-badge">{String.fromCharCode(65 + idx)}</span>
                  <span style={{ fontSize: '0.94rem' }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div
              style={{
                padding: '16px 20px',
                border: '1px solid var(--lime)',
                background: 'rgba(200, 255, 55, 0.06)',
                borderRadius: '4px',
                marginBottom: '24px',
              }}
            >
              <strong style={{ color: 'var(--lime)', display: 'block', marginBottom: '4px', font: '600 0.88rem "DM Mono", monospace' }}>
                {selectedOpt === currentQ.correctIndex ? '✓ CORRECT ANSWER' : '✕ VERIFIED EXPLANATION:'}
              </strong>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {isAnswered && (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              {currentIdx < PRACTICE_POOL.length - 1 ? 'Next Question →' : 'View Practice Results ↗'}
            </button>
          )}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '50px 30px' }}>
          <div className="score-circle tier-mastery">
            <span className="score-percentage mono">
              {Math.round((score / PRACTICE_POOL.length) * 100)}%
            </span>
            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {score} / {PRACTICE_POOL.length} Correct
            </span>
          </div>

          <h2 style={{ fontSize: '2.2rem', margin: '14px 0 6px' }}>Drill Complete</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '28px', maxWidth: '440px', margin: '0 auto 28px' }}>
            Concepts reinforced. Review your performance and jump into full assessment challenges.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button type="button" onClick={handleRestart} className="btn btn-primary btn-lg">
              Restart Drill ↺
            </button>
            <Link to="/quizzes" className="btn btn-secondary btn-lg">
              Explore Full Quizzes ↗
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
