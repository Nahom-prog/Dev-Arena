import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { quizApi } from '../services/api';

export default function TeacherCreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a quiz title.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await quizApi.createQuiz({
        title,
        description,
        timeLimitMinutes: Number(timeLimitMinutes) || 10,
      });

      const newQuizId = res.quiz?._id;
      if (newQuizId) {
        navigate(`/quiz/${newQuizId}/edit`);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-quiz-page wrap">
      <div className="page-header">
        <Link to="/dashboard" className="back-link mono">
          ← Back to Studio
        </Link>
        <span className="eyebrow lime" style={{ marginTop: '12px', display: 'block' }}>Step 1 of 2</span>
        <h1>Create New <span className="serif">Assessment</span></h1>
        <p>Define the title, instructions, and duration for your new quiz.</p>
      </div>

      <div className="form-container">
        <div className="card">
          {error && <div className="alert-box error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Quiz Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Modern JavaScript & React Fundamentals"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description & Instructions</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what this test covers, expectations, and any guidelines..."
                className="textarea-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time Limit (Minutes)</label>
              <input
                type="number"
                min="1"
                max="180"
                value={timeLimitMinutes}
                onChange={(e) => setTimeLimitMinutes(e.target.value)}
                className="input-field"
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>
                Students will have an interactive countdown clock with auto-submission upon expiry.
              </span>
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
              >
                {loading ? 'Creating...' : 'Continue to Add Questions →'}
              </button>
              <Link to="/dashboard" className="btn btn-secondary btn-lg">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
