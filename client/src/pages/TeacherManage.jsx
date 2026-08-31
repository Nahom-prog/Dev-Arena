import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizApi, questionApi } from '../services/api';

export default function TeacherManage() {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Question Form
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [quizRes, qRes] = await Promise.all([
        quizApi.getQuizById(quizId),
        questionApi.getQuestionsByQuiz(quizId),
      ]);
      setQuiz(quizRes.quiz);
      setQuestions(qRes.questions || []);
    } catch (err) {
      setError(err.message || 'Failed to load assessment data');
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    if (quizId) loadData();
  }, [quizId, loadData]);

  const handleOptionChange = (idx, val) => {
    const next = [...options];
    next[idx] = val;
    setOptions(next);
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) {
      setError('Question prompt is required.');
      return;
    }

    const cleanedOptions = options.map((o) => o.trim());
    if (cleanedOptions.some((o) => !o)) {
      setError('Please provide all 4 answer options.');
      return;
    }

    const selectedCorrect = cleanedOptions[correctIndex];

    try {
      setSaving(true);
      setError(null);
      await questionApi.createQuestion({
        quizId,
        question: questionText,
        options: cleanedOptions,
        correctAnswer: selectedCorrect,
      });

      setSuccessMsg('Question added to pool successfully!');
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectIndex(0);
      loadData();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to create question');
    } finally {
      setSaving(false);
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
      setSuccessMsg('Assessment is now live in the student arena!');
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to publish assessment');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
        <span className="mono" style={{ color: 'var(--lime)' }}>Loading authoring studio...</span>
      </div>
    );
  }

  return (
    <div className="manage-quiz-page wrap" style={{ padding: '40px 0 80px' }}>
      <Link to="/studio" className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
        ← Back to Studio Catalog
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '20px 0 32px' }}>
        <div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
            <span className={`badge ${quiz?.status === 'published' ? 'badge-lime' : 'badge-amber'}`}>
              {quiz?.status === 'published' ? '● LIVE IN ARENA' : 'DRAFT IN WORK'}
            </span>
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              ⏱ {quiz?.timeLimitMinutes} Mins
            </span>
          </div>
          <h1 style={{ fontSize: '2.6rem', margin: '4px 0', letterSpacing: '-0.03em' }}>{quiz?.title}</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>{quiz?.description}</p>
        </div>

        {quiz?.status !== 'published' ? (
          <button
            type="button"
            disabled={publishing || questions.length === 0}
            onClick={handlePublish}
            className="btn btn-primary btn-lg"
          >
            {publishing ? 'Publishing...' : 'Publish Live to Students ↗'}
          </button>
        ) : (
          <span className="badge badge-lime" style={{ padding: '8px 16px', fontSize: '0.78rem' }}>
            ✓ LIVE IN ARENA
          </span>
        )}
      </div>

      {successMsg && <div className="alert-box success">{successMsg}</div>}
      {error && <div className="alert-box error">{error}</div>}

      <div className="teacher-workbench-grid">
        {/* Question Builder Form */}
        <div className="card">
          <span className="eyebrow lime">QUESTION AUTHORING</span>
          <h3 style={{ fontSize: '1.35rem', margin: '8px 0 18px' }}>Add Question</h3>

          <form onSubmit={handleAddQuestion}>
            <div className="form-group">
              <label className="form-label">Question Text *</label>
              <textarea
                required
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="e.g. Which of the following is the correct definition of idempotency in REST API methods?"
                className="textarea-field"
                style={{ minHeight: '90px' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Options (Mark Correct Radio Key)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {options.map((opt, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={correctIndex === idx}
                        onChange={() => setCorrectIndex(idx)}
                      />
                      <span className="mono" style={{ fontWeight: 700, color: correctIndex === idx ? 'var(--lime)' : 'var(--text-muted)' }}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                    </label>

                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + idx)} text`}
                      className="input-field"
                      style={{ flex: 1 }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '14px' }}
            >
              {saving ? 'Adding Question...' : '+ Add Question to Pool'}
            </button>
          </form>
        </div>

        {/* Student Live Simulator Frame */}
        <div className="simulator-frame">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border)', marginBottom: '18px' }}>
            <span className="eyebrow lime">STUDENT LIVE SIMULATOR</span>
            <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>REAL-TIME PREVIEW</span>
          </div>

          <div style={{ padding: '8px 0' }}>
            <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>QUESTION PROMPT:</span>
            <h4 style={{ fontSize: '1.2rem', margin: '8px 0 20px', minHeight: '44px', color: questionText ? 'var(--text)' : 'var(--text-dim)' }}>
              {questionText || 'Your question prompt will render here in real-time as you type...'}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  className="exam-option-card"
                  style={{
                    padding: '12px 16px',
                    borderColor: correctIndex === idx ? 'var(--lime)' : 'var(--border)',
                    background: correctIndex === idx ? 'rgba(200,255,55,0.08)' : '#080b09',
                  }}
                >
                  <span className="exam-opt-badge" style={{ width: '28px', height: '28px', fontSize: '0.78rem' }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span style={{ fontSize: '0.88rem' }}>{opt || `[Option ${String.fromCharCode(65 + idx)} placeholder]`}</span>
                  {correctIndex === idx && (
                    <span className="badge badge-lime" style={{ marginLeft: 'auto', fontSize: '0.62rem' }}>
                      CORRECT KEY
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Existing Question Pool */}
      <div style={{ marginTop: '60px' }}>
        <div className="section-label">
          <div>
            <span className="eyebrow">QUESTION BANK</span>
            <h2>Current Assessment Questions ({questions.length})</h2>
          </div>
          <span>Questions verified and assigned to this assessment.</span>
        </div>

        {questions.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'var(--text-muted)' }}>No questions in pool yet. Add your first question above.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {questions.map((q, idx) => (
              <article key={q._id || idx} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--lime)' }}>
                    Question {idx + 1}
                  </span>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>VERIFIED</span>
                </div>

                <h4 style={{ fontSize: '1.1rem', margin: '0 0 16px' }}>{q.question}</h4>

                <div className="grid-2">
                  {q.options?.map((opt, optIdx) => {
                    const isCorrect = opt === q.correctAnswer;
                    return (
                      <div
                        key={optIdx}
                        style={{
                          padding: '10px 14px',
                          background: isCorrect ? 'rgba(200, 255, 55, 0.12)' : '#080b09',
                          border: isCorrect ? '1px solid var(--lime)' : '1px solid var(--border)',
                          color: isCorrect ? 'var(--lime)' : 'var(--text)',
                          borderRadius: '4px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.86rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="mono" style={{ opacity: 0.7 }}>{String.fromCharCode(65 + optIdx)}</span>
                          <span>{opt}</span>
                        </div>
                        {isCorrect && (
                          <span className="mono" style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                            ✓ Key
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
