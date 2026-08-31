import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, isTeacher, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="nav-header">
      <div className="wrap nav-inner">
        <Link to="/" className="nav-brand">
          QUIZ<span>.IO</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Overview
          </NavLink>
          <NavLink to="/quizzes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Assessments
          </NavLink>
          <NavLink to="/practice" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Practice
          </NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Leaderboard
          </NavLink>
          {isAuthenticated && isTeacher && (
            <NavLink to="/studio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Studio
            </NavLink>
          )}
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="btn btn-secondary btn-sm">
                <span className="mono">{user?.name?.split(' ')[0]}</span>
                <span className="badge badge-lime" style={{ padding: '2px 8px', fontSize: '0.62rem' }}>
                  {isTeacher ? 'EDUCATOR' : 'LVL 03'}
                </span>
              </Link>

              {isTeacher && (
                <Link to="/create-quiz" className="btn btn-primary btn-sm">
                  + Create Quiz
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started ↗
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
