import { useLocation, Link, useParams } from 'react-router-dom';

export default function DetailedResult() {
  const { quizId } = useParams();
  const location = useLocation();
  const state = location.state || {};
  const result = state.result || {};
  const quizTitle = state.quizTitle || 'Assessment Results';
  const questions = state.questions || [];
  const userAnswers = state.userAnswers || {};

  const score = result.score ?? 0;
  const totalQuestions = result.totalQuestions ?? questions.length ?? 0;
  const percentage = result.percentage ?? (totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0);

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
      <div className="card" style={{ textAlign: 'center', padding: '48px 30px', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.4rem', margin: '0 0 24px', letterSpacing: '-0.03em' }}>{quizTitle}</h1>

        <div className={`score-circle ${tier.colorClass}`}>
          <span className="score-percentage">{percentage}%</span>
          <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {score} / {totalQuestions} Correct
          </span>
        </div>

        <span className="badge badge-lime" style={{ fontSize: '0.8rem', padding: '6px 16px', marginBottom: '8px' }}>
          {tier.label}
        </span>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', maxWidth: '520px', margin: '10px auto 28px' }}>
          {tier.desc}
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={`/quiz/${quizId}`} className="btn btn-primary btn-lg">
            Retake Assessment ↺
          </Link>
          <Link to="/quizzes" className="btn btn-secondary btn-lg">
            Explore Quizzes ↗
          </Link>
          <Link to="/leaderboard" className="btn btn-secondary btn-lg">
            View Leaderboard 🏆
          </Link>
        </div>
      </div>

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

                  <h4 style={{ fontSize: '1.15rem', margin: '0 0 16px' }}>{q.question}</h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options?.map((opt, optIdx) => {
                      const isSelectedByUser = userPick === opt;
                      const isTheRightAnswer = opt === q.correctAnswer;

                      let bg = '#080b09';
                      let color = 'var(--text)';
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
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
