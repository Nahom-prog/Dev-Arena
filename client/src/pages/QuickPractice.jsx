import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useToast } from '../context/ToastContext';
import FormattedQuestion from '../components/FormattedQuestion';
import CodeSandboxModal from '../components/CodeSandboxModal';
import { playCorrectSound, playIncorrectSound, playStreakSound } from '../utils/soundEffects';

const PRACTICE_POOL = [
  {
    id: 1,
    category: 'JAVASCRIPT BASICS',
    question: 'What is the output of the following comparison in JavaScript?',
    codeSnippet: 'console.log(typeof null);\nconsole.log(typeof undefined);',
    language: 'javascript',
    options: ['"object", "undefined"', '"null", "undefined"', '"object", "null"', '"undefined", "undefined"'],
    correctIndex: 0,
    explanation: 'In JavaScript, `typeof null` returns "object" due to a historical bug in the initial 1995 implementation, whereas `typeof undefined` is "undefined".',
  },
  {
    id: 2,
    category: 'ARRAY METHODS',
    question: 'What does the following array transformation output?',
    codeSnippet: 'const numbers = [1, 2, 3, 4];\nconst result = numbers\n  .filter(n => n % 2 === 0)\n  .map(n => n * 10);\n\nconsole.log(result);',
    language: 'javascript',
    options: ['[20, 40]', '[10, 30]', '[2, 4]', '[10, 20, 30, 40]'],
    correctIndex: 0,
    explanation: '`.filter(n => n % 2 === 0)` filters even numbers `[2, 4]`, and `.map(n => n * 10)` multiplies each by 10 to produce `[20, 40]`.',
  },
  {
    id: 3,
    category: 'REACT FUNDAMENTALS',
    question: 'In React, why do we use the state updater function `setCount(prev => prev + 1)` instead of `setCount(count + 1)`?',
    options: [
      'To ensure updates use the most recent state when multiple updates are queued',
      'To prevent React from re-rendering the component',
      'To automatically memoize the variable with useMemo',
      'To convert the state variable to a global window variable',
    ],
    correctIndex: 0,
    explanation: 'State updates in React can be batched. Using the functional updater `(prev => prev + 1)` guarantees you are calculating against the latest queued state value.',
  },
  {
    id: 4,
    category: 'WEB DEV BASICS',
    question: 'What is the difference between `==` and `===` in JavaScript?',
    options: [
      '`===` performs strict comparison checking both value and type without coercion',
      '`==` is faster and checks memory references',
      '`===` converts strings to numbers automatically',
      'They are completely identical in modern ES6+',
    ],
    correctIndex: 0,
    explanation: '`===` (strict equality) checks both type and value without performing type coercion, while `==` coerces values to matching types before comparing.',
  },
  {
    id: 5,
    category: 'CSS & STYLING',
    question: 'Which CSS property centers items along the cross-axis inside a Flexbox container?',
    codeSnippet: '.container {\n  display: flex;\n  /* Which property centers items vertically? */\n  align-items: center;\n}',
    language: 'css',
    options: ['align-items: center', 'justify-content: center', 'align-content: flex-start', 'text-align: center'],
    correctIndex: 0,
    explanation: 'In Flexbox, `justify-content` aligns items along the main axis (horizontal by default), while `align-items` aligns along the cross axis (vertical by default).',
  },
  {
    id: 6,
    category: 'ASYNC JAVASCRIPT',
    question: 'What is the logged order of the following asynchronous code snippet?',
    codeSnippet: 'console.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));\nconsole.log("D");',
    language: 'javascript',
    options: ['A, D, C, B', 'A, B, C, D', 'A, D, B, C', 'C, A, D, B'],
    correctIndex: 0,
    explanation: 'Synchronous statements run first ("A", "D"). Microtasks (Promise `.then`) run next ("C"). Macrotasks (`setTimeout`) run in the subsequent tick ("B").',
  },
];

export default function QuickPractice() {
  const { refreshUser } = useAuth();
  const { showToast } = useToast();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showSandbox, setShowSandbox] = useState(false);

  const currentQ = PRACTICE_POOL[currentIdx];

  const handleSelect = (idx) => {
    if (isAnswered) return;

    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      playCorrectSound();
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        if (next === 3) {
          playStreakSound(3);
          showToast({
            title: '🔥 3x Combo Streak!',
            message: '1.25x Warm-up bonus active!',
            icon: '🔥',
            type: 'badge',
          });
        } else if (next === 5) {
          playStreakSound(5);
          showToast({
            title: '⚡ 5x ON FIRE STREAK!',
            message: 'Flawless instinct! Maximum multiplier reached!',
            icon: '👑',
            type: 'levelup',
          });
        }
        return next;
      });
    } else {
      playIncorrectSound();
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
      const earnedXp = Math.round(score * 30 + maxStreak * 15);
      showToast({
        title: 'Warm-Up Completed!',
        message: `+${earnedXp} Warm-up XP points earned!`,
        icon: '⚡',
        type: 'levelup',
      });
      if (refreshUser) refreshUser();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setStreak(0);
    setMaxStreak(0);
    setScore(0);
    setCompleted(false);
  };

  const streakMultiplier = streak >= 5 ? '1.5x' : streak >= 3 ? '1.25x' : '1.0x';

  return (
    <div className="practice-page wrap" style={{ padding: '50px 0', maxWidth: '780px' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime">WARM-UP DRILLS</span>
          <h2>Developer Quick Warm-Up</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span
            className="badge badge-lime"
            style={{
              padding: '6px 12px',
              fontSize: '0.78rem',
              boxShadow: streak >= 3 ? '0 0 12px rgba(200, 255, 55, 0.3)' : 'none',
            }}
          >
            🔥 {streak}x STREAK ({streakMultiplier} XP)
          </span>
          <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {currentIdx + 1} / {PRACTICE_POOL.length}
          </span>
        </div>
      </div>

      {!completed ? (
        <div className="card" style={{ padding: '34px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="badge badge-emerald">{currentQ.category}</span>
            <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Score: {score} / {currentIdx + (isAnswered ? 1 : 0)}
            </span>
          </div>

          <FormattedQuestion
            text={currentQ.question}
            codeSnippet={currentQ.codeSnippet}
            language={currentQ.language || 'javascript'}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', marginTop: '16px' }}>
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
                    borderColor:
                      isAnswered && isCorrect
                        ? 'var(--lime)'
                        : isAnswered && isSelected && !isCorrect
                        ? 'var(--rose)'
                        : undefined,
                    background:
                      isAnswered && isSelected && !isCorrect
                        ? 'rgba(248, 113, 113, 0.12)'
                        : undefined,
                  }}
                  onClick={() => handleSelect(idx)}
                >
                  <span className="exam-opt-badge">{String.fromCharCode(65 + idx)}</span>
                  <span style={{ fontSize: '0.94rem', color: '#f3f4f6' }}>{opt}</span>
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
                borderRadius: '6px',
                marginBottom: '24px',
              }}
            >
              <strong style={{ color: 'var(--lime)', display: 'block', marginBottom: '6px', font: '600 0.88rem "DM Mono", monospace' }}>
                {selectedOpt === currentQ.correctIndex ? '✓ CORRECT ANSWER' : '✕ VERIFIED EXPLANATION:'}
              </strong>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#d1d5db', lineHeight: '1.55' }}>
                {currentQ.explanation}
              </p>

              {currentQ.codeSnippet && (
                <div style={{ marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowSandbox(true)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                  >
                    🧪 Run & Experiment in Sandbox
                  </button>
                </div>
              )}
            </div>
          )}

          {isAnswered && (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              {currentIdx < PRACTICE_POOL.length - 1 ? 'Next Question →' : 'Complete Warm-Up ⚡'}
            </button>
          )}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '48px 30px' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '14px' }}>⚡</span>
          <span className="eyebrow lime">WARM-UP COMPLETE</span>
          <h2 style={{ fontSize: '2.2rem', margin: '8px 0 12px' }}>Instincts Calibrated!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginBottom: '28px' }}>
            You scored <strong>{score} / {PRACTICE_POOL.length}</strong> with an active streak of <strong>{maxStreak}x</strong>.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" onClick={handleRestart} className="btn btn-primary btn-lg">
              Warm Up Again ↺
            </button>
            <Link to="/quizzes" className="btn btn-secondary btn-lg">
              Enter Arena Challenges ⚔️
            </Link>
            <Link to="/leaderboard" className="btn btn-secondary btn-lg">
              Leaderboard 🏆
            </Link>
          </div>
        </div>
      )}

      {/* Interactive Code Sandbox Modal */}
      {showSandbox && currentQ.codeSnippet && (
        <CodeSandboxModal
          initialCode={currentQ.codeSnippet}
          language={currentQ.language || 'javascript'}
          title={`${currentQ.category} Sandbox`}
          onClose={() => setShowSandbox(false)}
        />
      )}
    </div>
  );
}
