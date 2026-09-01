import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { isSoundEnabled, toggleSound } from '../utils/soundEffects';

export default function Navbar() {
  const { user, isAuthenticated, canCreateQuiz, logout } = useAuth();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const levelStr = String(user?.level || 1).padStart(2, '0');
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '👾';

  return (
    <header className="nav-header">
      <div className="wrap nav-inner">
        <Link to="/" className="nav-brand">
          DEV<span>.ARENA</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Overview
          </NavLink>
          <NavLink to="/quizzes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Challenges
          </NavLink>
          <NavLink to="/practice" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Quick Warm-Up
          </NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Leaderboard
          </NavLink>
          {isAuthenticated && canCreateQuiz && (
            <NavLink to="/studio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Studio
            </NavLink>
          )}
        </nav>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isAuthenticated ? (
            <>
              {/* Level & XP Teller Pill */}
              <Link to="/profile" className="nav-level-pill" title="Player Rank & XP Progression">
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: 'var(--lime)',
                    boxShadow: '0 0 8px var(--lime)',
                    display: 'inline-block',
                  }}
                />
                <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--lime)', fontWeight: 700 }}>
                  LVL {levelStr} • {(user?.xp || 0).toLocaleString()} XP
                </span>
              </Link>

              {/* Profile Picture Avatar & Dropdown */}
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="nav-avatar-btn"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  title={`${user?.name || 'Developer'} Account`}
                  aria-expanded={dropdownOpen}
                >
                  {userInitial}
                  <span className="nav-avatar-online-dot" />
                </button>

                {dropdownOpen && (
                  <div className="nav-dropdown-menu">
                    {/* User Info Header */}
                    <div className="nav-dropdown-header">
                      <div style={{ fontWeight: 600, fontSize: '0.94rem', color: '#f3f4f6', marginBottom: '2px' }}>
                        {user?.name || 'Developer Contender'}
                      </div>
                      <div className="mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {user?.email}
                      </div>
                      <div style={{ marginTop: '6px' }}>
                        <span className="badge badge-lime" style={{ fontSize: '0.64rem', padding: '2px 8px' }}>
                          DEV CONTENDER • LEVEL {levelStr}
                        </span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <Link
                      to="/profile"
                      className="nav-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span>👤 Player Dossier</span>
                      <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>↗</span>
                    </Link>

                    {canCreateQuiz ? (
                      <Link
                        to="/create-quiz"
                        className="nav-dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span>➕ Author Challenge</span>
                        <span className="badge badge-lime" style={{ fontSize: '0.62rem' }}>NEW</span>
                      </Link>
                    ) : (
                      <Link
                        to="/profile"
                        className="nav-dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                        style={{ opacity: 0.75 }}
                      >
                        <span>🔒 Creator Mode</span>
                        <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--amber)' }}>Lvl 3 req</span>
                      </Link>
                    )}

                    {canCreateQuiz && (
                      <Link
                        to="/studio"
                        className="nav-dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span>🛠️ Challenge Studio</span>
                        <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>↗</span>
                      </Link>
                    )}

                    {/* Sound Effects Toggle Row */}
                    <button
                      type="button"
                      className="nav-dropdown-item"
                      onClick={handleToggleSound}
                    >
                      <span>{soundOn ? '🔊 Sound Effects' : '🔇 Sound Effects'}</span>
                      <span
                        className="mono"
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: soundOn ? 'var(--lime)' : 'var(--text-muted)',
                        }}
                      >
                        {soundOn ? 'ON' : 'MUTED'}
                      </span>
                    </button>

                    <div className="nav-dropdown-divider" />

                    {/* Sign Out */}
                    <button
                      type="button"
                      className="nav-dropdown-item danger"
                      onClick={handleLogout}
                    >
                      <span>⎋ Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Audio Toggle for Guests */}
              <button
                type="button"
                onClick={handleToggleSound}
                className="btn btn-secondary btn-sm"
                style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                title={soundOn ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
              >
                {soundOn ? '🔊' : '🔇'}
              </button>

              <Link to="/login" className="btn btn-secondary btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Join Arena ↗
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
