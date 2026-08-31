import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { quizApi } from '../services/api';

export default function TeacherCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Assessment title is required.');
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

      const newId = res.quiz?._id;
      if (newId) {
        navigate(`/quiz/${newId}/edit`);
      } else {
        navigate('/studio');
      }
    } catch (err) {
      setError(err.message || 'Failed to create assessment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrap" style={{ padding: '50px 0', maxWidth: '680px' }}>
      <Link to="/studio" className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
        ← Back to Studio
      </Link>

      <div className="card" style={{ padding: '36px', marginTop: '18px' }}>
        <span className="eyebrow lime">STAGE 01 OF 02</span>
        <h1 style={{ fontSize: '2.4rem', margin: '8px 0 20px', letterSpacing: '-0.03em' }}>Create Assessment</h1>

        {error && <div className="alert-box error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Assessment Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Advanced TypeScript Generics & Type Systems"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description & Instructions</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Topics covered and guidelines for student test takers..."
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
          </div>

          <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
            <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
              {loading ? 'Creating...' : 'Proceed to Questions & Simulator →'}
            </button>
            <Link to="/studio" className="btn btn-secondary btn-lg">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
