import { useEffect, useRef, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useToast } from '../context/ToastContext';
import FormattedQuestion from '../components/FormattedQuestion';
import CodeSandboxModal from '../components/CodeSandboxModal';

export default function DetailedResult() {
  const { quizId } = useParams();
  const location = useLocation();
  const { refreshUser } = useAuth();
  const { showToast, showBadgeToast, showLevelUpToast } = useToast();
  const [sandboxSnippet, setSandboxSnippet] = useState(null);

  const state = location.state || {};
  const result = state.result || {};
  const quizTitle = state.quizTitle || 'Assessment Results';
  const questions = state.questions || [];
  const userAnswers = state.userAnswers || {};

  const score = result.score ?? 0;
  const totalQuestions = result.totalQuestions ?? questions.length ?? 0;
  const percentage = result.percentage ?? (totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0);
  const xpEarned = result.xpEarned ?? score * 50;
  const newBadges = result.newBadges || result.badgesAwarded || [];

  const notifiedRef = useRef(false);

  useEffect(() => {
    if (refreshUser) refreshUser();

    if (!notifiedRef.current) {
      notifiedRef.current = true;

      // 1. Always fire an XP completion toast
      showToast({
        title: 'Challenge Evaluation Complete!',
        message: `+${xpEarned.toLocaleString()} XP earned (${score}/${totalQuestions} correct • ${percentage}%)`,
        icon: percentage >= 80 ? '🎯' : '⚡',
        type: percentage >= 80 ? 'badge' : 'levelup',
        duration: 6000,
      });

      // 2. Fire toasts for any newly unlocked badges
      if (newBadges && newBadges.length > 0) {
        newBadges.forEach((b, idx) => {
          setTimeout(() => {
            showBadgeToast(b);
          }, (idx + 1) * 800);
        });
      } else if (percentage === 100) {
        // Fallback for sample/demo quizzes
        setTimeout(() => {
          showBadgeToast({
            name: 'Bug Squasher',
            icon: '🐛',
            description: 'Scored a perfect 100% on a challenge',
          });
        }, 800);
      }
    }
  }, [refreshUser, xpEarned, score, totalQuestions, percentage, newBadges, showToast, showBadgeToast]);

  const getTier = (pct) => {
    if (pct >= 80) return { label: 'Mastery Tier 👑', desc: 'Outstanding achievement! You demonstrated complete command of this material.', colorClass: 'tier-mastery' };
    if (pct >= 50) return { label: 'Competent Passed 🎯', desc: 'Solid score! You demonstrated good foundational comprehension.', colorClass: 'tier-passed' };
    return { label: 'Novice Review 💡', desc: 'Review the question breakdown below and challenge yourself again.', colorClass: 'tier-review' };
  };

  const tier = getTier(percentage);


  return (
    <div className="result-page wrap" style={{ padding: '50px 0', maxWidth: '840px' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime">EVALUATION REPORT</span>
          <h2>Official Assessment Scorecard</h2>
        </div>
        <span>Automated evaluation completed. Verified breakdown below.</span>
      </div>

      {/* Score Card */}
      <div className="card" style={{ textAlign: 'center', padding: '48px 30px', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', margin: '0 0 16px', letterSpacing: '-0.03em' }}>{quizTitle}</h1>

        <div className={`score-circle ${tier.colorClass}`}>
          <span className="score-percentage">{percentage}%</span>
          <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {score} / {totalQuestions} Correct
          </span>
        </div>

        {/* XP Reward Ribbon */}
        <div style={{ margin: '20px 0 14px' }}>
          <span
            className="badge badge-lime"
            style={{ fontSize: '0.92rem', padding: '8px 20px', letterSpacing: '0.04em' }}
          >
            ⚡ +{xpEarned.toLocaleString()} XP EARNED
          </span>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <span className="badge" style={{ fontSize: '0.8rem', padding: '4px 14px' }}>
            {tier.label}
          </span>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', maxWidth: '520px', margin: '10px auto 28px' }}>
          {tier.desc}
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={`/quiz/${quizId}`} className="btn btn-primary btn-lg">
            Retake Assessment ↺
          </Link>
          <Link to="/quizzes" className="btn btn-secondary btn-lg">
            Arena Challenges ↗
          </Link>
          <Link to="/leaderboard" className="btn btn-secondary btn-lg">
            View Leaderboard 🏆
          </Link>
        </div>
      </div>

      {/* Unlocked Badges Celebration Banner */}
      {newBadges.length > 0 && (
        <div
          className="card"
          style={{
            marginBottom: '32px',
            borderColor: 'var(--lime)',
            background: 'radial-gradient(circle at top right, rgba(200, 255, 55, 0.1), rgba(18, 26, 22, 0.95))',
            padding: '24px',
          }}
        >
          <div className="eyebrow lime" style={{ marginBottom: '8px' }}>
            ★ NEW ACHIEVEMENT UNLOCKED!
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {newBadges.map((b, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '12px 18px',
                  borderRadius: '6px',
                  border: '1px solid rgba(200, 255, 55, 0.3)',
                }}
              >
                <span style={{ fontSize: '2rem' }}>{b.icon}</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--lime)' }}>{b.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Question-by-Question Breakdown */}
      {questions.length > 0 && (
        <div>
          <div className="section-label">
            <div>
              <span className="eyebrow">QUESTION BREAKDOWN</span>
              <h2>Detailed Verification</h2>
            </div>
            <span>Review your submitted answers against the verified keys.</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {questions.map((q, idx) => {
              const userPick = userAnswers[q._id];
              const isCorrect = userPick === q.correctAnswer;

              return (
                <article
                  key={q._id || idx}
                  className="card"
                  style={{
                    borderLeft: isCorrect ? '4px solid var(--lime)' : '4px solid var(--rose)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Question {idx + 1}
                    </span>
                    <span className={`badge ${isCorrect ? 'badge-lime' : 'badge-rose'}`}>
                      {isCorrect ? '✓ CORRECT (+20 XP)' : '✕ MISSED (0 XP)'}
                    </span>
                  </div>

                  <FormattedQuestion text={q.question} codeSnippet={q.codeSnippet} language={q.language} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    {q.options?.map((opt, optIdx) => {
                      const isSelectedByUser = userPick === opt;
                      const isTheRightAnswer = opt === q.correctAnswer;

                      let bg = '#080b09';
                      let color = '#e5e7eb';
                      let border = '1px solid var(--border)';

                      if (isTheRightAnswer) {
                        bg = 'rgba(200, 255, 55, 0.12)';
                        border = '1px solid var(--lime)';
                        color = 'var(--lime)';
                      } else if (isSelectedByUser && !isTheRightAnswer) {
                        bg = 'rgba(248, 113, 113, 0.12)';
                        border = '1px solid var(--rose)';
                        color = '#fca5a5';
                      }

                      return (
                        <div
                          key={optIdx}
                          style={{
                            padding: '12px 16px',
                            background: bg,
                            color: color,
                            border: border,
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.9rem',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span className="mono" style={{ opacity: 0.7 }}>{String.fromCharCode(65 + optIdx)}</span>
                            <span>{opt}</span>
                          </div>

                          {isTheRightAnswer && (
                            <span className="mono" style={{ fontSize: '0.74rem', fontWeight: 700 }}>
                              ✓ Correct Key
                            </span>
                          )}
                          {isSelectedByUser && !isTheRightAnswer && (
                            <span className="mono" style={{ fontSize: '0.74rem', fontWeight: 700 }}>
                              Your Pick
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div style={{ marginTop: '14px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '4px', borderLeft: '3px solid var(--lime)', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                      <strong style={{ color: 'var(--lime)', display: 'block', marginBottom: '2px', fontSize: '0.76rem', fontFamily: 'DM Mono' }}>
                        EXPLANATION:
                      </strong>
                      {q.explanation}
                    </div>
                  )}

                  {q.codeSnippet && (
                    <div style={{ marginTop: '12px' }}>
                      <button
                        type="button"
                        onClick={() =>
                          setSandboxSnippet({
                            code: q.codeSnippet,
                            language: q.language || 'javascript',
                            title: `Question ${idx + 1} Code Sandbox`,
                          })
                        }
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.74rem', padding: '5px 12px' }}
                      >
                        🧪 Test in Interactive Sandbox
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Code Sandbox Modal */}
      {sandboxSnippet && (
        <CodeSandboxModal
          initialCode={sandboxSnippet.code}
          language={sandboxSnippet.language}
          title={sandboxSnippet.title}
          onClose={() => setSandboxSnippet(null)}
        />
      )}
    </div>
  );
}


