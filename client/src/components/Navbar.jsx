import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { isSoundEnabled, toggleSound } from '../utils/soundEffects';
import { calculateLevelData } from '../utils/levelEngine';
import {
  Volume2,
  VolumeX,
  User,
  PlusCircle,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Menu,
  X,
  Swords,
  Zap,
  Trophy,
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, canCreateQuiz, logout } = useAuth();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown and mobile menu on outside click or route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
    setMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const levelData = calculateLevelData(user?.xp || 0);
  const displayLevel = user?.level ? Math.max(user.level, levelData.level) : levelData.level;
  const levelStr = String(displayLevel).padStart(2, '0');
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : null;

  return (
    <>
      <header className="nav-header">
        <div className="wrap nav-inner">
          <Link to="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
          DEV<span>.ARENA</span>
        </Link>

        {/* Desktop Navigation Links */}
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

        {/* Action Controls & Profile */}
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              {/* Responsive Level Pill: Collapses XP on mobile */}
              <Link to="/profile" className="nav-level-pill" title="Player Rank & XP Progression">
                <span className="nav-level-pill-dot" />
                <span className="mono nav-level-pill-text">
                  LVL {levelStr}
                  <span className="nav-level-pill-xp"> • {(user?.xp || 0).toLocaleString()} XP</span>
                </span>
              </Link>

              {/* Profile Avatar & Desktop Dropdown */}
              <div ref={dropdownRef} className="nav-avatar-wrapper" style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="nav-avatar-btn"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  title={`${user?.name || 'Developer'} Account`}
                  aria-expanded={dropdownOpen}
                >
                  {userInitial || <User size={18} />}
                  <span className="nav-avatar-online-dot" />
                </button>

                {dropdownOpen && (
                  <div className="nav-dropdown-menu">
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

                    <Link
                      to="/profile"
                      className="nav-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={15} />
                      <span>Player Profile</span>
                    </Link>

                    {canCreateQuiz && (
                      <Link
                        to="/create-quiz"
                        className="nav-dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <PlusCircle size={15} />
                        <span>Author Challenge</span>
                      </Link>
                    )}

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="nav-dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                        style={{ color: '#ef4444' }}
                      >
                        <ShieldAlert size={15} color="#ef4444" />
                        <span>God Mode Console</span>
                      </Link>
                    )}

                    <div className="nav-dropdown-divider" />

                    <button
                      type="button"
                      className="nav-dropdown-item"
                      onClick={handleToggleSound}
                    >
                      {soundOn ? <Volume2 size={15} color="var(--lime)" /> : <VolumeX size={15} />}
                      <span>Audio FX: {soundOn ? 'Enabled' : 'Muted'}</span>
                    </button>

                    <div className="nav-dropdown-divider" />

                    <button
                      type="button"
                      className="nav-dropdown-item danger"
                      onClick={handleLogout}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="desktop-auth-btns" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handleToggleSound}
                className="btn btn-secondary btn-sm sound-toggle-desktop"
                style={{ padding: '6px 10px' }}
                title={soundOn ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
              >
                {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Join Arena ↗
              </Link>
            </div>
          )}

          {/* Quick mobile Sign In button for guests */}
          {!isAuthenticated && (
            <Link
              to="/login"
              className="mobile-quick-signin btn btn-secondary btn-sm"
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              Sign In
            </Link>
          )}

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Mobile Navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} color="var(--lime)" /> : <Menu size={22} color="#f3f4f6" />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Sliding Navigation Drawer (Placed OUTSIDE header so backdrop-filter does not trap it) */}
    {mobileMenuOpen && (
      <>
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div className="mobile-nav-drawer">
          {isAuthenticated && (
            <div className="mobile-drawer-user-card">
              <div style={{ fontWeight: 600, fontSize: '0.98rem', color: '#fff' }}>
                {user?.name || 'Developer Contender'}
              </div>
              <div className="mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {user?.email}
              </div>
              <div style={{ marginTop: '8px' }}>
                <span className="badge badge-lime" style={{ fontSize: '0.68rem', padding: '3px 10px' }}>
                  DEV CONTENDER • LEVEL {levelStr} • {(user?.xp || 0).toLocaleString()} XP
                </span>
              </div>
            </div>
          )}

          <nav className="mobile-drawer-links">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
            >
              <span>Overview</span>
              <ExternalLink size={15} />
            </NavLink>

            <NavLink
              to="/quizzes"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Swords size={16} color="var(--lime)" />
                <span>Arena Challenges</span>
              </div>
              <ExternalLink size={15} />
            </NavLink>

            <NavLink
              to="/practice"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} color="#fbbf24" />
                <span>Quick Warm-Up</span>
              </div>
              <ExternalLink size={15} />
            </NavLink>

            <NavLink
              to="/leaderboard"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={16} color="#38bdf8" />
                <span>Global Leaderboard</span>
              </div>
              <ExternalLink size={15} />
            </NavLink>

            {isAuthenticated && (
              <NavLink
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} />
                  <span>Player Profile</span>
                </div>
                <ExternalLink size={15} />
              </NavLink>
            )}

            {isAuthenticated && canCreateQuiz && (
              <NavLink
                to="/studio"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PlusCircle size={16} color="var(--lime)" />
                  <span>Challenge Studio</span>
                </div>
                <ExternalLink size={15} />
              </NavLink>
            )}

            {isAuthenticated && user?.role === 'admin' && (
              <NavLink
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-drawer-link"
                style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldAlert size={16} color="#ef4444" />
                  <span>God Mode Console</span>
                </div>
                <ExternalLink size={15} />
              </NavLink>
            )}
          </nav>

          {/* Sound FX Toggle in Mobile Drawer */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'space-between', padding: '12px 18px', marginTop: '12px' }}
          >
            <span style={{ fontSize: '0.88rem' }}>Sound Effects: {soundOn ? 'Enabled' : 'Muted'}</span>
            {soundOn ? <Volume2 size={16} color="var(--lime)" /> : <VolumeX size={16} />}
          </button>

          {/* Mobile Auth Actions */}
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  borderColor: 'rgba(248, 113, 113, 0.3)',
                  color: '#fca5a5',
                  padding: '12px',
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary" style={{ padding: '12px' }}>
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ padding: '12px' }}>
                  Join Arena ↗
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    )}
  </>
);
}
