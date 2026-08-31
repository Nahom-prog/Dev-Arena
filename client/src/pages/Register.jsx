import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(name, email, password, role);
      navigate('/quizzes');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page wrap" style={{ padding: '60px 0', maxWidth: '500px' }}>
      <div className="card" style={{ padding: '36px' }}>
        <span className="eyebrow lime">REGISTRATION</span>
        <h1 style={{ fontSize: '2.4rem', margin: '8px 0 20px', letterSpacing: '-0.03em' }}>Create Profile</h1>

        {error && <div className="alert-box error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Role selector */}
          <div className="form-group">
            <label className="form-label">Account Role</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                style={{
                  background: role === 'student' ? 'rgba(200, 255, 55, 0.12)' : '#080b09',
                  color: role === 'student' ? 'var(--lime)' : 'var(--text)',
                  border: role === 'student' ? '1px solid var(--lime)' : '1px solid var(--border)',
                  padding: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontFamily: 'inherit',
                }}
                onClick={() => setRole('student')}
              >
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>🎓 Student</strong>
                <small style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Take timed challenges</small>
              </button>

              <button
                type="button"
                style={{
                  background: role === 'teacher' ? 'rgba(200, 255, 55, 0.12)' : '#080b09',
                  color: role === 'teacher' ? 'var(--lime)' : 'var(--text)',
                  border: role === 'teacher' ? '1px solid var(--lime)' : '1px solid var(--border)',
                  padding: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontFamily: 'inherit',
                }}
                onClick={() => setRole('teacher')}
              >
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>👨‍🏫 Educator</strong>
                <small style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Author & publish tests</small>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Nahom Alex"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '10px' }}
          >
            {loading ? 'Creating Profile...' : 'Launch Account ↗'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          Already registered?{' '}
          <Link to="/login" style={{ color: 'var(--lime)', fontWeight: 600 }}>
            Sign in here ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
