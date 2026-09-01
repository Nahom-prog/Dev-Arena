import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useToast } from '../context/ToastContext';
import { quizApi } from '../services/api';

const POPULAR_TAGS = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'Algorithms', 'Docker', 'CSS', 'System Design'];

export default function TeacherCreate() {
  const { user, canCreateQuiz, refreshUser } = useAuth();
  const { showToast, showBadgeToast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('JavaScript, React');
  const [difficulty, setDifficulty] = useState('easy');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If locked, render lock screen
  if (!canCreateQuiz) {
    const level = user?.level || 1;
    const quizzesTaken = user?.quizzesTaken || 0;
    const needed = Math.max(0, 3 - quizzesTaken);

    return (
      <div className="wrap" style={{ padding: '60px 0', maxWidth: '680px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '48px 30px', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🔒</span>
          <span className="eyebrow lime">CLEARANCE REQUIRED</span>
          <h1 style={{ fontSize: '2.2rem', margin: '8px 0 16px' }}>Challenge Creator Clearance Locked</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 28px' }}>
            To ensure the highest quality community challenges in the Dev Arena, author privileges require reaching <strong>Level 3</strong> or completing <strong>3 assessments</strong>.
          </p>

          <div
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '16px 20px',
              maxWidth: '420px',
              margin: '0 auto 30px',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '8px' }}>
              <span className="mono">Quizzes Solved:</span>
              <span className="mono" style={{ color: 'var(--lime)', fontWeight: 700 }}>{quizzesTaken} / 3</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
              <span className="mono">Current Rank:</span>
              <span className="mono" style={{ color: 'var(--lime)', fontWeight: 700 }}>LVL {String(level).padStart(2, '0')}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <Link to="/quizzes" className="btn btn-primary btn-lg">
              ⚔️ Play Challenges & Level Up ({needed} more to go)
            </Link>
            <Link to="/profile" className="btn btn-secondary btn-lg">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleTagToggle = (tag) => {
    const currentTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (currentTags.includes(tag)) {
      setTags(currentTags.filter((t) => t !== tag).join(', '));
    } else {
      setTags([...currentTags, tag].join(', '));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Challenge title is required.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await quizApi.createQuiz({
        title,
        description,
        tags,
        difficulty,
        timeLimitMinutes: Number(timeLimitMinutes) || 10,
      });

      if (refreshUser) refreshUser();

      if (res.newBadges && res.newBadges.length > 0) {
        res.newBadges.forEach((b) => showBadgeToast(b));
      }

      showToast({
        title: 'Challenge Initialized!',
        message: 'Add questions and code options in the challenge studio.',
        icon: '🛠️',
      });

      const newId = res.quiz?._id;
      if (newId) {
        navigate(`/quiz/${newId}/edit`);
      } else {
        navigate('/studio');
      }
    } catch (err) {
      setError(err.message || 'Failed to create challenge');
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
        <span className="eyebrow lime">STAGE 01 OF 02 • DEV CHALLENGE BUILDER</span>
        <h1 style={{ fontSize: '2.4rem', margin: '8px 0 20px', letterSpacing: '-0.03em' }}>Create Dev Challenge</h1>

        {error && <div className="alert-box error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Challenge Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Advanced React 19 Concurrency & Compiler Trivia"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description & Briefing</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context on the technologies covered and guidelines for challenger devs..."
              className="textarea-field"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Difficulty Tier</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="input-field"
              style={{ textTransform: 'capitalize' }}
            >
              <option value="easy">Easy (1.0x XP Multiplier)</option>
              <option value="mid">Mid (1.25x XP Multiplier)</option>
              <option value="hard">Hard (1.5x XP Multiplier)</option>
              <option value="very hard">Very Hard (2.0x XP Multiplier)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Tech Stack Tags (Comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. JavaScript, React, Hooks"
              className="input-field"
              style={{ marginBottom: '8px' }}
            />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {POPULAR_TAGS.map((tag) => {
                const isSelected = tags.toLowerCase().includes(tag.toLowerCase());
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className="btn btn-secondary btn-sm"
                    style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      borderColor: isSelected ? 'var(--lime)' : 'var(--border)',
                      color: isSelected ? 'var(--lime)' : 'inherit',
                    }}
                  >
                    +{tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Countdown Time Limit (Minutes)</label>
            <input
              type="number"
              min="1"
              max="180"
              value={timeLimitMinutes}
              onChange={(e) => setTimeLimitMinutes(e.target.value)}
              className="input-field"
            />
          </div>

          <div style={{ display: 'flex', gap: '14px', marginTop: '28px' }}>
            <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
              {loading ? 'Creating...' : 'Proceed to Questions & Code Options →'}
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

