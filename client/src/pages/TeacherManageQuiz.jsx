import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizApi, questionApi } from '../services/api';

export default function TeacherManageQuiz() {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // New Question Form state
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const loadData = useCallback(async () => {
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
      setError(err.message || 'Failed to load quiz details');
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    if (quizId) {
      loadData();
    }
  }, [quizId, loadData]);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    setError(null);

    if (!questionText.trim()) {
      setError('Question prompt is required.');
      return;
    }

    const filledOptions = options.map((opt) => opt.trim());
    if (filledOptions.some((opt) => !opt)) {
      setError('Please fill in all 4 option choices.');
      return;
    }

    const selectedCorrect = filledOptions[correctAnswerIndex];

    try {
      setAddingQuestion(true);
      await questionApi.createQuestion({
        quizId,
        question: questionText,
        options: filledOptions,
        correctAnswer: selectedCorrect,
      });

      setSuccessMsg('Question added successfully!');
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswerIndex(0);
      loadData();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to add question');
    } finally {
      setAddingQuestion(false);
    }
  };

  const handlePublish = async () => {
    if (questions.length === 0) {
      setError('You must add at least 1 question before publishing.');
      return;
    }

    try {
      setPublishing(true);
      setError(null);
      await quizApi.publishQuiz(quizId);
      setSuccessMsg('Quiz published successfully! It is now live in the student arena.');
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to publish quiz');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="wrap" style={{ padding: '60px 0', textAlign: 'center' }}>
        <span className="mono lime">Loading quiz editor...</span>
      </div>
    );
  }

  return (
    <div className="manage-quiz-page wrap">
      <div className="page-header">
        <Link to="/dashboard" className="back-link mono">
          ← Back to Studio
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className={`badge ${quiz?.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
                {quiz?.status}
              </span>
              <span className="mono" style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                ⏱ {quiz?.timeLimitMinutes} Mins
              </span>
            </div>
            <h1>{quiz?.title}</h1>
            <p>{quiz?.description || 'No description provided.'}</p>
          </div>

          {quiz?.status !== 'published' ? (
            <button
              type="button"
              onClick={handlePublish}
              disabled={publishing || questions.length === 0}
              className="btn btn-primary btn-lg"
            >
              {publishing ? 'Publishing...' : 'Publish Quiz Live ↗'}
            </button>
          ) : (
            <span className="badge badge-published" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              ✓ LIVE FOR STUDENTS
            </span>
          )}
        </div>
      </div>

      {successMsg && <div className="alert-box success">{successMsg}</div>}
      {error && <div className="alert-box error">{error}</div>}

      <div className="manage-grid">
        {/* Question Builder Form */}
        <div className="card question-form-card">
          <span className="eyebrow lime">Authoring Studio</span>
          <h3>Add New Question</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '18px' }}>
            Enter the question prompt, specify 4 potential choices, and select the correct option.
          </p>

          <form onSubmit={handleAddQuestion}>
            <div className="form-group">
              <label className="form-label">Question Text *</label>
              <textarea
                required
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="e.g. Which hook is used to manage mutable local state in functional React components?"
                className="textarea-field"
                style={{ minHeight: '80px' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Answer Options (Mark Correct One)</label>
              <div className="options-input-grid">
                {options.map((opt, idx) => (
                  <div key={idx} className="option-input-row">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={correctAnswerIndex === idx}
                        onChange={() => setCorrectAnswerIndex(idx)}
                      />
                      <span className="mono option-char">{String.fromCharCode(65 + idx)}</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                      className="input-field"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={addingQuestion}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '12px' }}
            >
              {addingQuestion ? 'Saving Question...' : '+ Add Question to Pool'}
            </button>
          </form>
        </div>

        {/* Existing Questions Pool */}
        <div className="questions-list-section">
          <div className="section-label" style={{ marginBottom: '20px' }}>
            <h2>Question Pool ({questions.length})</h2>
            <span>Questions assigned to this quiz.</span>
          </div>

          {questions.length === 0 ? (
            <div className="card empty-box">
              <p style={{ color: 'var(--muted)' }}>
                No questions added yet. Use the form on the left to add your first question.
              </p>
            </div>
          ) : (
            <div className="questions-stack">
              {questions.map((q, qIdx) => (
                <div key={q._id || qIdx} className="card question-display-card">
                  <div className="q-header">
                    <span className="mono eyebrow">Question {qIdx + 1}</span>
                  </div>
                  <h4 className="q-text">{q.question}</h4>

                  <div className="q-options-grid">
                    {q.options?.map((opt, optIdx) => {
                      const isCorrect = opt === q.correctAnswer;
                      return (
                        <div
                          key={optIdx}
                          className={`q-opt-pill ${isCorrect ? 'correct' : ''}`}
                        >
                          <span className="mono opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                          <span>{opt}</span>
                          {isCorrect && <span className="correct-mark">✓ Correct</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
