import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizApi, questionApi } from '../services/api';
import CodeBlock from '../components/CodeBlock';
import FormattedQuestion from '../components/FormattedQuestion';

const QUESTION_TEMPLATES = [
  {
    id: 'standard',
    label: 'Standard Concept',
    icon: '💡',
    defaultPrompt: '',
    defaultSnippet: '',
  },
  {
    id: 'output',
    label: "What's the Output?",
    icon: '💻',
    defaultPrompt: 'What is the exact console output of the following code snippet?',
    defaultSnippet: 'function example() {\n  const data = [10, 20, 30];\n  return data.reduce((acc, curr) => acc + curr, 0);\n}\n\nconsole.log(example());',
  },
  {
    id: 'debugging',
    label: 'Spot the Bug',
    icon: '🐛',
    defaultPrompt: 'Which line in the following implementation contains a critical memory leak or runtime error?',
    defaultSnippet: 'useEffect(() => {\n  const interval = setInterval(() => {\n    setSeconds(s => s + 1);\n  }, 1000);\n  // Bug: Missing cleanup return\n}, []);',
  },
];

export default function TeacherManage() {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Question Form
  const [questionText, setQuestionText] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [explanation, setExplanation] = useState('');
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
      setError(err.message || 'Failed to load challenge data');
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    if (quizId) loadData();
  }, [quizId, loadData]);

  const handleApplyTemplate = (tmpl) => {
    if (tmpl.defaultPrompt) setQuestionText(tmpl.defaultPrompt);
    if (tmpl.defaultSnippet) setCodeSnippet(tmpl.defaultSnippet);
  };

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
        question: questionText.trim(),
        codeSnippet: codeSnippet.trim(),
        language,
        options: cleanedOptions,
        correctAnswer: selectedCorrect,
        explanation: explanation.trim(),
      });

      setSuccessMsg('Question added to challenge pool successfully!');
      setQuestionText('');
      setCodeSnippet('');
      setExplanation('');
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
      setError('You must add at least 1 question before publishing to the arena.');
      return;
    }

    try {
      setPublishing(true);
      setError(null);
      await quizApi.publishQuiz(quizId);
      setSuccessMsg('Challenge is now published live in the Developer Arena!');
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to publish challenge');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
        <span className="mono" style={{ color: 'var(--lime)' }}>⚡ Loading authoring studio...</span>
      </div>
    );
  }

  return (
    <div className="manage-quiz-page wrap" style={{ padding: '40px 0 80px' }}>
      <Link to="/studio" className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
        ← Back to Creator Studio
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '20px 0 32px' }}>
        <div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
            <span className={`badge ${quiz?.status === 'published' ? 'badge-lime' : 'badge-amber'}`}>
              {quiz?.status === 'published' ? '● LIVE IN ARENA' : 'DRAFT IN WORKBENCH'}
            </span>
            <span className="badge" style={{ textTransform: 'capitalize' }}>
              {quiz?.difficulty || 'easy'}
            </span>
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              ⏱ {quiz?.timeLimitMinutes || 10} Mins
            </span>
          </div>
          <h1 style={{ fontSize: '2.4rem', margin: '4px 0', letterSpacing: '-0.03em' }}>{quiz?.title}</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>{quiz?.description || 'No description provided.'}</p>
        </div>

        {quiz?.status !== 'published' ? (
          <button
            type="button"
            disabled={publishing || questions.length === 0}
            onClick={handlePublish}
            className="btn btn-primary btn-lg"
          >
            {publishing ? 'Publishing...' : 'Publish Live to Arena 🚀'}
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
          <h3 style={{ fontSize: '1.35rem', margin: '8px 0 16px' }}>Add Challenge Question</h3>

          {/* Template Chips */}
          <div style={{ marginBottom: '20px' }}>
            <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              QUICK TEMPLATES:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {QUESTION_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                >
                  {tmpl.icon} {tmpl.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleAddQuestion}>
            <div className="form-group">
              <label className="form-label">Question Prompt *</label>
              <textarea
                required
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="e.g. What is the logged output of the following asynchronous function?"
                className="textarea-field"
                style={{ minHeight: '75px' }}
              />
            </div>

            {/* Code Snippet Editor */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Code Snippet (Optional)</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    background: '#101712',
                    color: 'var(--lime)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.74rem',
                    fontFamily: 'DM Mono',
                  }}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="css">CSS</option>
                  <option value="sql">SQL</option>
                  <option value="dockerfile">Dockerfile / Bash</option>
                </select>
              </div>

              <textarea
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder={'const user = { name: "Alice" };\nconsole.log(user?.role ?? "Guest");'}
                className="textarea-field mono"
                style={{ minHeight: '110px', fontSize: '0.86rem', color: '#a3e635' }}
              />
            </div>

            {/* Options */}
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

            {/* Explanation Field */}
            <div className="form-group">
              <label className="form-label">Verified Explanation (Shown after completion)</label>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Explain why this answer is correct and what engineering principle applies..."
                className="textarea-field"
                style={{ minHeight: '65px' }}
              />
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

        {/* Contender Live Simulator Frame */}
        <div className="simulator-frame">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border)', marginBottom: '18px' }}>
            <span className="eyebrow lime">CONTENDER LIVE SIMULATOR</span>
            <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>REAL-TIME ARENA PREVIEW</span>
          </div>

          <div style={{ padding: '8px 0' }}>
            <FormattedQuestion text={questionText || 'Your question prompt will render here in real-time...'} codeSnippet={codeSnippet} language={language} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  className="exam-option-card"
                  style={{
                    padding: '12px 16px',
                    borderColor: correctIndex === idx ? 'var(--lime)' : 'var(--border)',
                    background: correctIndex === idx ? 'rgba(200,255,55,0.08)' : '#111914',
                  }}
                >
                  <span className="exam-opt-badge" style={{ width: '28px', height: '28px', fontSize: '0.78rem' }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span style={{ fontSize: '0.88rem', color: '#f3f4f6' }}>{opt || `[Option ${String.fromCharCode(65 + idx)} placeholder]`}</span>
                  {correctIndex === idx && (
                    <span className="badge badge-lime" style={{ marginLeft: 'auto', fontSize: '0.62rem' }}>
                      CORRECT KEY
                    </span>
                  )}
                </div>
              ))}
            </div>

            {explanation && (
              <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(200, 255, 55, 0.05)', borderRadius: '6px', borderLeft: '3px solid var(--lime)' }}>
                <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--lime)', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                  VERIFIED EXPLANATION PREVIEW:
                </span>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)' }}>{explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Existing Question Pool */}
      <div style={{ marginTop: '60px' }}>
        <div className="section-label">
          <div>
            <span className="eyebrow">QUESTION POOL</span>
            <h2>Current Assessment Questions ({questions.length})</h2>
          </div>
          <span>Questions verified and assigned to this arena challenge.</span>
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

                <FormattedQuestion text={q.question} codeSnippet={q.codeSnippet} language={q.language} />

                <div className="grid-2" style={{ marginTop: '14px' }}>
                  {q.options?.map((opt, optIdx) => {
                    const isCorrect = opt === q.correctAnswer;
                    return (
                      <div
                        key={optIdx}
                        style={{
                          padding: '10px 14px',
                          background: isCorrect ? 'rgba(200, 255, 55, 0.12)' : '#080b09',
                          border: isCorrect ? '1px solid var(--lime)' : '1px solid var(--border)',
                          color: isCorrect ? 'var(--lime)' : '#e5e7eb',
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

                {q.explanation && (
                  <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '4px', borderLeft: '3px solid var(--lime)', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--lime)', fontSize: '0.74rem', fontFamily: 'DM Mono', display: 'block', marginBottom: '2px' }}>
                      EXPLANATION:
                    </strong>
                    {q.explanation}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

