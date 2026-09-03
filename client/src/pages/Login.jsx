import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';

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

  return (
    <div className="auth-page wrap" style={{ padding: '60px 0', maxWidth: '460px' }}>
      <div className="card" style={{ padding: '36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span className="eyebrow lime" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <LogIn size={14} /> CONTENDER AUTHENTICATION
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', margin: '4px 0 16px', letterSpacing: '-0.03em' }}>
          Sign In
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 24px' }}>
          Access your developer profile, daily challenge streak, and arena history.
        </p>

        {error && <div className="alert-box error" style={{ marginBottom: '20px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={13} color="var(--text-muted)" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input-field"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={13} color="var(--text-muted)" />
              <span>Password</span>
            </label>
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
            style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Arena'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

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
