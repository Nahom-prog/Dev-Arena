import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="wrap footer-inner">
        <div>
          <span className="mono" style={{ color: 'var(--lime)', fontWeight: 700 }}>QUIZ.IO</span>
          <span style={{ margin: '0 8px', color: 'var(--border)' }}>—</span>
          <span>Automated evaluation & knowledge assessment engine.</span>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/quizzes" className="mono" style={{ fontSize: '0.78rem' }}>Catalog</Link>
          <Link to="/practice" className="mono" style={{ fontSize: '0.78rem' }}>Practice</Link>
          <Link to="/leaderboard" className="mono" style={{ fontSize: '0.78rem' }}>Leaderboard</Link>
          <Link to="/studio" className="mono" style={{ fontSize: '0.78rem' }}>Educator Studio</Link>
        </div>
      </div>
    </footer>
  );
}
