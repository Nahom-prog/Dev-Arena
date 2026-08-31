import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/quizzes');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (role) => {
    if (role === 'teacher') {
      setEmail('teacher@quiz.io');
      setPassword('password123');
    } else {
      setEmail('student@quiz.io');
      setPassword('password123');
    }
  };

  return (
    <div className="auth-page wrap" style={{ padding: '60px 0', maxWidth: '480px' }}>
      <div className="card" style={{ padding: '36px' }}>
        <span className="eyebrow lime">AUTHENTICATION</span>
        <h1 style={{ fontSize: '2.4rem', margin: '8px 0 20px', letterSpacing: '-0.03em' }}>Sign In</h1>

        {error && <div className="alert-box error">{error}</div>}

        <form onSubmit={handleSubmit}>
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
              placeholder="••••••••"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '8px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Arena ↗'}
          </button>
        </form>

        {/* Quick Demo Test Logins */}
        <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--border)' }}>
          <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '10px', textAlign: 'center' }}>
            ⚡ 1-CLICK DEMO CREDENTIALS:
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleDemoFill('student')}
            >
              Fill Student Demo
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleDemoFill('teacher')}
            >
              Fill Teacher Demo
            </button>
          </div>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--lime)', fontWeight: 600 }}>
            Register free ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
