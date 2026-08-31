import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { quizApi, questionApi } from '../services/api';
import CountdownTimer from '../components/CountdownTimer';

export default function StudentTakeQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Quiz state
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: selectedAnswer }
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const [quizRes, questionsRes] = await Promise.all([
          quizApi.getQuizById(quizId),
          questionApi.getQuestionsByQuiz(quizId),
        ]);
        setQuiz(quizRes.quiz);
        setQuestions(questionsRes.questions || []);
      } catch (err) {
        setError(err.message || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    if (quizId) fetchQuizDetails();
  }, [quizId]);

  const handleSelectOption = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);
      setError(null);

      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      }));

      const result = await quizApi.submitQuiz(quizId, formattedAnswers);

      navigate(`/quiz/${quizId}/result`, {
        state: {
          result,
          quizTitle: quiz?.title,
          totalQuestions: questions.length,
        },
      });
    } catch (err) {
      setError(err.message || 'Failed to submit quiz');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
        <span className="mono lime">Loading exam environment...</span>
      </div>
    );
  }

  if (error && !quiz) {
    return (
      <div className="wrap" style={{ padding: '60px 0' }}>
        <div className="card alert-box error">{error}</div>
        <Link to="/dashboard" className="btn btn-secondary btn-sm" style={{ marginTop: '16px' }}>
          ← Back to Arena
        </Link>
      </div>
    );
  }

  // Pre-test Briefing Screen
  if (!started) {
    return (
      <div className="pre-quiz-page wrap">
        <Link to="/dashboard" className="back-link mono">
          ← Back to Arena
        </Link>

        <div className="briefing-card-container">
          <div className="card briefing-card">
            <span className="eyebrow lime">Assessment Briefing</span>
            <h1 className="briefing-title">{quiz?.title}</h1>
            <p className="briefing-desc">{quiz?.description || 'No special instructions provided.'}</p>

            <div className="briefing-specs-grid">
              <div className="spec-item">
                <span className="eyebrow">Duration</span>
                <strong>⏱ {quiz?.timeLimitMinutes || 10} Minutes</strong>
              </div>
              <div className="spec-item">
                <span className="eyebrow">Questions</span>
                <strong>📝 {questions.length} Items</strong>
              </div>
              <div className="spec-item">
                <span className="eyebrow">Format</span>
                <strong>Multiple Choice</strong>
              </div>
            </div>

            <div className="briefing-rules">
              <h4>Guidelines:</h4>
              <ul>
                <li>• The timer will begin immediately when you click <strong>Start Assessment</strong>.</li>
                <li>• You may navigate freely between questions before submitting.</li>
                <li>• If the countdown timer expires, your answers will automatically be submitted.</li>
              </ul>
            </div>

            {questions.length === 0 ? (
              <div className="alert-box error" style={{ marginTop: '20px' }}>
                This quiz currently has no questions available. Please check back later.
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '24px' }}
              >
                Start Assessment Now ↗
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const currentSelected = currentQuestion ? answers[currentQuestion._id] : null;

  return (
    <div className="quiz-room-page wrap">
      {/* Top Session Bar */}
      <div className="quiz-top-bar card">
        <div>
          <span className="eyebrow lime">Live Exam Room</span>
          <h2 className="room-quiz-title">{quiz?.title}</h2>
        </div>

        <CountdownTimer
          totalMinutes={quiz?.timeLimitMinutes || 10}
          onExpire={handleSubmitQuiz}
        />
      </div>

      {error && <div className="alert-box error">{error}</div>}

      <div className="quiz-room-grid">
        {/* Main Question Display */}
        <div className="card question-active-card">
          <div className="q-nav-header">
            <span className="mono eyebrow">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="mono answered-tracker">
              {answeredCount}/{totalQuestions} Answered
            </span>
          </div>

          <h3 className="active-q-text">{currentQuestion?.question}</h3>

          <div className="options-selection-grid">
            {currentQuestion?.options.map((option, idx) => {
              const isSelected = currentSelected === option;
              return (
                <div
                  key={idx}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(currentQuestion._id, option)}
                  role="button"
                  tabIndex={0}
                >
                  <span className="mono option-badge">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{option}</span>
                </div>
              );
            })}
          </div>

          {/* Navigation & Submit controls */}
          <div className="q-action-bar">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="btn btn-secondary btn-sm"
            >
              ← Previous
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="btn btn-primary btn-sm"
              >
                Next Question →
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmitQuiz}
                className="btn btn-primary btn-sm highlight-btn"
              >
                {submitting ? 'Evaluating...' : 'Finish & Submit Quiz ↗'}
              </button>
            )}
          </div>
        </div>

        {/* Question Quick Jump Palette */}
        <div className="card question-palette-card">
          <span className="eyebrow">Question Map</span>
          <div className="palette-grid">
            {questions.map((q, idx) => {
              const isAnswered = !!answers[q._id];
              const isCurrent = currentIndex === idx;
              return (
                <button
                  key={q._id || idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`palette-num-btn ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="palette-legend">
            <div className="legend-item">
              <span className="legend-dot current"></span> Current
            </div>
            <div className="legend-item">
              <span className="legend-dot answered"></span> Answered
            </div>
            <div className="legend-item">
              <span className="legend-dot unanswered"></span> Unanswered
            </div>
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={handleSubmitQuiz}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', marginTop: '20px' }}
          >
            {submitting ? 'Submitting...' : 'Submit Assessment ↗'}
          </button>
        </div>
      </div>
    </div>
  );
}
