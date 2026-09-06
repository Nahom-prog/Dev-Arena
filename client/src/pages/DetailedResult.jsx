import { useEffect, useRef, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { quizApi } from '../services/api';
import { useAuth } from '../context/useAuth';
import { useToast } from '../context/ToastContext';
import FormattedQuestion from '../components/FormattedQuestion';
import CodeSandboxModal from '../components/CodeSandboxModal';
import { Trophy, Award, CheckCircle2, XCircle, Check, Terminal, Swords, ThumbsUp, ThumbsDown, Flag } from 'lucide-react';

export default function DetailedResult() {
  const { quizId } = useParams();
  const location = useLocation();
  const { refreshUser } = useAuth();
  const { showToast, showBadgeToast, showLevelUpToast } = useToast();
  const [sandboxSnippet, setSandboxSnippet] = useState(null);
  const [feedbackVotes, setFeedbackVotes] = useState({});

  const state = location.state || {};
  const result = state.result || {};
  const quizTitle = state.quizTitle || 'Assessment Results';
  const questions = state.questions || [];
  const userAnswers = state.userAnswers || {};

  const score = result.score ?? 0;
  const totalQuestions = result.totalQuestions ?? questions.length ?? 0;
  const percentage = result.percentage ?? (totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0);
  const xpEarned = result.xpEarned ?? 0;
  const xpStatusNote = result.xpStatusNote || '';
  const newBadges = result.newBadges || result.badgesAwarded || [];

  const [reportingQId, setReportingQId] = useState(null);
  const [reportReason, setReportReason] = useState('Typo or misleading wording');
  const [isReporting, setIsReporting] = useState(false);
  const [reportConfirmed, setReportConfirmed] = useState(false);

  const notifiedRef = useRef(false);

  const handleVote = async (qId, voteType) => {
    if (feedbackVotes[qId]) return;
    setFeedbackVotes((prev) => ({ ...prev, [qId]: voteType }));
    try {
      await quizApi.voteQuestion(qId, voteType);
      showToast({ title: 'Feedback Recorded', message: 'Registered question quality rating.', icon: '👍' });
    } catch {
      // Non-blocking
    }
  };

  const handleOpenReport = (qId) => {
    setReportingQId(qId);
    setReportReason('Typo or misleading wording');
  };

  const handleSubmitReport = async () => {
    if (!reportingQId || !reportReason.trim()) return;
    try {
      setIsReporting(true);
      await quizApi.reportQuestion(reportingQId, reportReason.trim());
      setReportingQId(null);
      setReportReason('Typo or misleading wording');
      setReportConfirmed(true);
    } catch (err) {
      showToast({ title: 'Report failed', message: err.message, type: 'error' });
    } finally {
      setIsReporting(false);
    }
  };

  useEffect(() => {
    if (refreshUser) refreshUser();

    if (!notifiedRef.current) {
      notifiedRef.current = true;

      // 1. Fire an XP completion toast or practice retake notice
      showToast({
        title: xpEarned > 0 ? 'Challenge Evaluation Complete!' : 'Practice Evaluation Complete!',
        message: xpEarned > 0
          ? `+${xpEarned.toLocaleString()} XP earned (${score}/${totalQuestions} correct • ${percentage}%)`
          : (xpStatusNote || 'Practice retake (0 XP — One-time points already claimed)'),
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
          {xpEarned > 0 ? (
            <span
              className="badge badge-lime"
              style={{ fontSize: '0.92rem', padding: '8px 20px', letterSpacing: '0.04em' }}
            >
              ⚡ +{xpEarned.toLocaleString()} XP EARNED
            </span>
          ) : (
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span
                className="badge"
                style={{ fontSize: '0.82rem', padding: '6px 16px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}
              >
                🔄 PRACTICE RETAKE • 0 XP AWARDED
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {xpStatusNote || 'One-time XP already earned for this assessment.'}
              </span>
            </div>
          )}
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
          <Link to={`/quiz/${quizId}`} className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Swords size={18} />
            <span>Retake Assessment</span>
          </Link>
          <Link to="/quizzes" className="btn btn-secondary btn-lg">
            Arena Challenges ↗
          </Link>
          <Link to="/leaderboard" className="btn btn-secondary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={18} />
            <span>View Leaderboard</span>
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
          <div className="eyebrow lime" style={{ marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Award size={15} /> NEW ACHIEVEMENT UNLOCKED!
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
                    <span className={`badge ${isCorrect ? 'badge-lime' : 'badge-rose'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 size={13} />
                          <span>CORRECT (+20 XP)</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={13} />
                          <span>MISSED (0 XP)</span>
                        </>
                      )}
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
                            <span className="mono" style={{ fontSize: '0.74rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Check size={12} /> Correct Key
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
                      {['javascript', 'js', 'typescript', 'ts'].includes((q.language || '').toLowerCase()) ? (
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
                          style={{ fontSize: '0.74rem', padding: '5px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Terminal size={14} />
                          <span>Test in Interactive Sandbox</span>
                        </button>
                      ) : (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.74rem',
                            color: 'var(--text-muted)',
                            padding: '4px 10px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '4px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          <span>💡 {q.language ? q.language.toUpperCase() : 'Code'} Syntax & Concept Verified</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Community Question Feedback Strip */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '14px',
                      paddingTop: '10px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      RATE THIS QUESTION
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => handleVote(q._id, 'up')}
                        className={`btn btn-sm ${feedbackVotes[q._id] === 'up' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '3px 8px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        title="Good question"
                      >
                        <ThumbsUp size={11} /> Good
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVote(q._id, 'down')}
                        className={`btn btn-sm ${feedbackVotes[q._id] === 'down' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '3px 8px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        title="Needs improvement"
                      >
                        <ThumbsDown size={11} /> Needs Work
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenReport(q._id)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 8px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#ef4444' }}
                        title="Report issue"
                      >
                        <Flag size={11} /> Report
                      </button>
                    </div>
                  </div>
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

      {/* Question Issue Report Modal */}
      {reportingQId && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={() => setReportingQId(null)}
        >
          <div
            className="card"
            style={{ width: '100%', maxWidth: '440px', padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <Flag size={16} color="#ef4444" /> Report Question Issue
              </h3>
              <button
                type="button"
                onClick={() => setReportingQId(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Help maintain platform engineering quality. Our moderation team reviews every reported question.
            </p>

            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
              REASON FOR REPORT:
            </label>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="input-field"
              style={{ marginBottom: '14px', width: '100%' }}
            >
              <option value="Typo or misleading wording">Typo or misleading wording</option>
              <option value="Objectively wrong answer marked correct">Objectively wrong answer marked correct</option>
              <option value="Code snippet contains syntax error / won't run">Code snippet contains syntax error / won't run</option>
              <option value="Multiple answers are technically correct">Multiple answers are technically correct</option>
              <option value="Duplicate or spam question">Duplicate or spam question</option>
            </select>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setReportingQId(null)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isReporting}
                onClick={handleSubmitReport}
                className="btn btn-primary btn-sm"
                style={{ background: '#ef4444', borderColor: '#ef4444', color: '#fff' }}
              >
                {isReporting ? 'Submitting...' : 'Submit Flag 🚩'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Centered In-App Report Confirmation Popup */}
      {reportConfirmed && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px',
          }}
          onClick={() => setReportConfirmed(false)}
        >
          <div
            className="card"
            style={{ width: '100%', maxWidth: '400px', padding: '28px', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={28} color="#10b981" />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.25rem' }}>Report Submitted</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5', margin: '0 0 20px' }}>
              Thank you for helping keep question quality high. Our moderation team will review this challenge.
            </p>
            <button
              type="button"
              onClick={() => setReportConfirmed(false)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


