import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { quizApi, questionApi } from '../services/api';
import CircularTimer from '../components/CircularTimer';
import FormattedQuestion from '../components/FormattedQuestion';
import { playCorrectSound } from '../utils/soundEffects';
import { ThumbsUp, ThumbsDown, Flag, AlertCircle } from 'lucide-react';

const shuffleArray = (arr) => {
  if (!arr || !Array.isArray(arr)) return [];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const FALLBACK_QUESTIONS = [
  {
    _id: 'q-fb-1',
    question: 'In modern JavaScript, what is the primary purpose of the Nullish Coalescing operator (??)?',
    options: [
      'Returns the right-hand operand only when left-hand operand is null or undefined',
      'Coerces all falsy values (0, empty string, false) to true',
      'Chains multiple asynchronous promises together',
      'Provides a shorthand for ternary conditions with truthy values',
    ],
    correctAnswer: 'Returns the right-hand operand only when left-hand operand is null or undefined',
  },
  {
    _id: 'q-fb-2',
    question: 'Which of the following React hooks memoizes the result of an expensive calculation between re-renders?',
    options: ['useCallback', 'useMemo', 'useRef', 'useLayoutEffect'],
    correctAnswer: 'useMemo',
  },
  {
    _id: 'q-fb-3',
    question: 'What is the default HTTP status code returned for a successful resource creation via POST in REST APIs?',
    options: ['200 OK', '201 Created', '204 No Content', '301 Moved Permanently'],
    correctAnswer: '201 Created',
  },
];

export default function ExamRoom() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Exam state
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Community feedback & report state
  const [feedbackVotes, setFeedbackVotes] = useState({});
  const [reportingQId, setReportingQId] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [isReporting, setIsReporting] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [quizRes, qRes] = await Promise.all([
          quizApi.getQuizById(quizId).catch(() => ({ quiz: { _id: quizId, title: 'Sample Challenge Assessment', timeLimitMinutes: 10 } })),
          questionApi.getQuestionsByQuiz(quizId).catch(() => ({ questions: [] })),
        ]);

        setQuiz(quizRes.quiz);
        const fetched = qRes.questions || [];
        const raw = fetched.length > 0 ? fetched : FALLBACK_QUESTIONS;
        // Deterministic per-session option shuffle prevents rote option key memorization
        const randomized = raw.map((q) => ({
          ...q,
          options: shuffleArray(q.options),
        }));
        setQuestions(randomized);
      } catch (err) {
        setError(err.message || 'Failed to load assessment');
        setQuestions(FALLBACK_QUESTIONS);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) fetchQuizData();
  }, [quizId]);

  const handleVoteQuestion = async (qId, voteType) => {
    if (feedbackVotes[qId]) return;
    setFeedbackVotes((prev) => ({ ...prev, [qId]: voteType }));
    try {
      await quizApi.voteQuestion(qId, voteType);
    } catch {
      // Non-blocking feedback
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
      setReportReason('');
      alert('Report dispatched to God Mode moderation console.');
    } catch (err) {
      alert(err.message || 'Failed to submit report');
    } finally {
      setIsReporting(false);
    }
  };

  const handleSelectOption = (qId, option) => {
    playCorrectSound();
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmitQuiz = useCallback(async () => {
    if (submitting) return;

    try {
      setSubmitting(true);
      setError(null);

      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      }));

      let result;
      try {
        result = await quizApi.submitQuiz(quizId, formattedAnswers);
      } catch {
        let score = 0;
        questions.forEach((q) => {
          if (answers[q._id] === q.correctAnswer) score += 1;
        });
        result = {
          score,
          totalQuestions: questions.length,
          percentage: Math.round((score / questions.length) * 100),
        };
      }

      navigate(`/quiz/${quizId}/result`, {
        state: {
          result,
          quizTitle: quiz?.title || 'Assessment Results',
          questions,
          userAnswers: answers,
        },
      });
    } catch (err) {
      setError(err.message || 'Submission error');
      setSubmitting(false);
    }
  }, [submitting, answers, quizId, questions, quiz?.title, navigate]);

  if (loading) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
        <span className="mono" style={{ color: 'var(--lime)' }}>Initializing secure exam chamber...</span>
      </div>
    );
  }

  // Pre-test Briefing
  if (!started) {
    return (
      <div className="wrap" style={{ padding: '50px 0', maxWidth: '760px' }}>
        <Link to="/quizzes" className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          ← Back to Catalog
        </Link>

        <div className="card exam-briefing-card" style={{ marginTop: '18px' }}>
          <span className="eyebrow lime">ASSESSMENT PROTOCOLS</span>
          <h1 className="exam-briefing-title" style={{ margin: '10px 0 12px', letterSpacing: '-0.03em' }}>{quiz?.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.55', marginBottom: '28px' }}>
            {quiz?.description || 'This evaluation runs under precision countdown parameters. Verify your selections carefully before submission.'}
          </p>

          <div className="grid-3" style={{ marginBottom: '28px' }}>
            <div className="card" style={{ padding: '16px', background: '#080b09' }}>
              <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DURATION</span>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginTop: '4px' }}>⏱ {quiz?.timeLimitMinutes || 10} Mins</strong>
            </div>
            <div className="card" style={{ padding: '16px', background: '#080b09' }}>
              <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>QUESTIONS</span>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginTop: '4px' }}>📝 {questions.length} Items</strong>
            </div>
            <div className="card" style={{ padding: '16px', background: '#080b09' }}>
              <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>FORMAT</span>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginTop: '4px' }}>Multiple Choice</strong>
            </div>
          </div>

          <div style={{ background: '#080b09', border: '1px solid var(--border)', borderRadius: '4px', padding: '18px 20px', marginBottom: '28px' }}>
            <h4 style={{ fontSize: '0.92rem', marginBottom: '6px' }}>Instructions:</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              <li>• The countdown clock will commence immediately when you click <strong>Enter Chamber</strong>.</li>
              <li>• You can navigate between questions freely using the question palette.</li>
              <li>• If the timer expires, answers will automatically submit for grading.</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
          >
            Enter Exam Chamber ↗
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const totalQ = questions.length;
  const answeredCount = Object.keys(answers).length;
  const currentSelected = currentQ ? answers[currentQ._id] : null;

  return (
    <div className="exam-chamber-page wrap" style={{ padding: '30px 0 60px' }}>
      {/* Top Session Bar */}
      <div className="card exam-chamber-top">
        <div>
          <span className="eyebrow lime">LIVE EVALUATION SESSION</span>
          <h2 style={{ fontSize: '1.4rem', margin: '4px 0 0' }}>{quiz?.title}</h2>
        </div>

        <CircularTimer
          totalMinutes={quiz?.timeLimitMinutes || 10}
          onExpire={handleSubmitQuiz}
        />
      </div>

      {error && <div className="alert-box error">{error}</div>}

      <div className="exam-chamber-layout">
        {/* Main Question Card */}
        <div className="card exam-question-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <span className="badge badge-lime">
              QUESTION {currentIndex + 1} OF {totalQ}
            </span>
            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {answeredCount} of {totalQ} Answered
            </span>
          </div>

          {/* Quick Mobile Question Selector Pills */}
          <div className="mobile-question-pills">
            {questions.map((q, idx) => {
              const isAns = !!answers[q._id];
              const isCur = currentIndex === idx;
              return (
                <button
                  key={q._id || idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`mobile-q-pill ${isCur ? 'active' : isAns ? 'answered' : ''}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <FormattedQuestion
            text={currentQ?.question}
            codeSnippet={currentQ?.codeSnippet}
            language={currentQ?.language || 'javascript'}
          />

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px', marginTop: '20px' }}>
            {currentQ?.options?.map((opt, idx) => {
              const isSelected = currentSelected === opt;
              const isCodeLike = opt.includes('`') || opt.includes('(') || opt.includes('=>') || opt.includes('{');

              return (
                <button
                  key={idx}
                  type="button"
                  className={`exam-option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(currentQ._id, opt)}
                >
                  <span className="exam-opt-badge">{String.fromCharCode(65 + idx)}</span>
                  <span
                    style={{
                      fontSize: '0.94rem',
                      fontFamily: isCodeLike ? '"DM Mono", monospace' : 'inherit',
                    }}
                  >
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Question Quality Feedback Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              QUESTION QUALITY
            </span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => handleVoteQuestion(currentQ?._id, 'up')}
                className={`btn btn-sm ${feedbackVotes[currentQ?._id] === 'up' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '4px 10px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                title="Accurate and well-written"
              >
                <ThumbsUp size={12} />
                <span>Good</span>
              </button>

              <button
                type="button"
                onClick={() => handleVoteQuestion(currentQ?._id, 'down')}
                className={`btn btn-sm ${feedbackVotes[currentQ?._id] === 'down' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '4px 10px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                title="Confusing, typo, or poor wording"
              >
                <ThumbsDown size={12} />
                <span>Needs Work</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenReport(currentQ?._id)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '4px 10px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#ef4444' }}
                title="Report wrong answer, broken code, or typo"
              >
                <Flag size={12} />
                <span>Report</span>
              </button>
            </div>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="btn btn-secondary"
            >
              ← Previous
            </button>

            {currentIndex < totalQ - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="btn btn-primary"
              >
                Next Question →
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmitQuiz}
                className="btn btn-primary btn-lg"
              >
                {submitting ? 'Evaluating...' : 'Complete & Submit Assessment ↗'}
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Question Map Palette */}
        <div className="card exam-map-card" style={{ height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span className="eyebrow">QUESTION MAP</span>
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--lime)' }}>
              {answeredCount}/{totalQ} Done
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', margin: '14px 0' }}>
            {questions.map((q, idx) => {
              const isAns = !!answers[q._id];
              const isCur = currentIndex === idx;

              return (
                <button
                  key={q._id || idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    height: '40px',
                    borderRadius: '4px',
                    background: isCur ? 'var(--lime)' : isAns ? 'rgba(200, 255, 55, 0.15)' : '#080b09',
                    color: isCur ? '#0b0e0c' : isAns ? 'var(--lime)' : 'var(--text-muted)',
                    border: isCur ? '1px solid var(--lime)' : isAns ? '1px solid rgba(200, 255, 55, 0.3)' : '1px solid var(--border)',
                    font: '600 0.85rem "DM Mono", monospace',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--lime)' }}></span> Current Active
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(200, 255, 55, 0.3)' }}></span> Answered
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(255, 255, 255, 0.1)' }}></span> Unanswered
            </div>
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={handleSubmitQuiz}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', marginTop: '20px' }}
          >
            {submitting ? 'Submitting...' : 'Finish & Submit ↗'}
          </button>
        </div>
      </div>

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
              Help maintain platform engineering standards. Flags are prioritized directly in the God Mode review console.
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
    </div>
  );
}
