import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { leaderboardApi } from '../services/api';
import { useAuth } from '../context/useAuth';
import { Trophy, Crown, Medal, Award, Zap, Compass, ArrowRight, Flame, Globe } from 'lucide-react';

const getDevTitle = (level, xp) => {
  if (level >= 12 || xp >= 3000) return 'Grandmaster';
  if (level >= 8 || xp >= 2000) return 'Staff Architect';
  if (level >= 5 || xp >= 1200) return 'Senior Dev';
  if (level >= 3 || xp >= 500) return 'Mid Engineer';
  return 'Junior Contender';
};

export default function Leaderboard() {
  const { user: authUser, isAuthenticated } = useAuth();
  const [players, setPlayers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'ethiopia'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboard = async (filterType) => {
    try {
      setLoading(true);
      const params = filterType === 'ethiopia' ? { filter: 'ethiopia' } : {};
      const data = await leaderboardApi.getLeaderboard(params);
      setPlayers(data.leaderboard || []);
    } catch (err) {
      console.error('Failed to load leaderboard', err);
      setError('Unable to retrieve leaderboard standings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(activeFilter);
  }, [activeFilter]);

  const top1 = players[0];
  const top2 = players[1];
  const top3 = players[2];

  // User position & overtake calculation
  const myLeaderboardEntry = authUser
    ? players.find((p) => p.id === authUser.id || p.name === authUser.name)
    : null;
  const myRank = myLeaderboardEntry ? myLeaderboardEntry.rank : null;
  const rivalAbove = myRank && myRank > 1 ? players[myRank - 2] : null;
  const xpToOvertake = rivalAbove && myLeaderboardEntry
    ? Math.max(1, (rivalAbove.xp - myLeaderboardEntry.xp) + 1)
    : null;

  return (
    <div className="leaderboard-page wrap" style={{ padding: '50px 0' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Trophy size={14} /> HALL OF FAME
          </span>
          <h2>Arena Leaderboard Rankings</h2>
        </div>
        <span>Real-time standings ranked by verified XP points, accuracy rating, and challenges solved.</span>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`btn btn-sm ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Globe size={14} />
          <span>Global Standings</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('ethiopia')}
          className={`btn btn-sm ${activeFilter === 'ethiopia' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <span>🇪🇹</span>
          <span>Ethiopian Devs Leaderboard</span>
        </button>
      </div>

      {/* Personal Overtake HUD */}
      <div
        className="card"
        style={{
          marginBottom: '32px',
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(200, 255, 55, 0.05) 0%, rgba(13, 17, 23, 0.95) 100%)',
          border: '1px solid rgba(200, 255, 55, 0.25)',
        }}
      >
        {isAuthenticated ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="badge badge-lime" style={{ fontSize: '0.7rem' }}>
                  {myRank ? `YOUR ARENA RANK #${myRank}` : 'PROVISIONAL CONTENDER'}
                </span>
                <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Level {authUser.level || 1} • {(authUser.xp || 0).toLocaleString()} Total XP
                </span>
              </div>

              {myRank === 1 ? (
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--lime)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Crown size={18} color="#f59e0b" /> You are currently #1 in the Arena! Defend your throne.
                </div>
              ) : myRank && rivalAbove ? (
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>
                  ⚡ You need <span style={{ color: 'var(--lime)', fontWeight: 800 }}>{xpToOvertake.toLocaleString()} XP</span> to overtake{' '}
                  <strong>#{myRank - 1} {rivalAbove.name}</strong>!
                </div>
              ) : (
                <div style={{ fontSize: '0.95rem', color: 'var(--text)' }}>
                  Complete challenges to claim your spot in the official Top 50 Leaderboard.
                </div>
              )}
            </div>

            <Link
              to="/quizzes"
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Zap size={14} />
              <span>Conquer Next Challenge ↗</span>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--lime)', fontWeight: 700 }}>
                ⚡ SIGN IN TO TRACK YOUR PROGRESS
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Track your exact leaderboard position, calculate overtake XP, and unlock developer badges.
              </p>
            </div>
            <Link to="/login" className="btn btn-primary btn-sm">
              Sign In to Compete ↗
            </Link>
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div className="mono" style={{ fontSize: '1.1rem', color: 'var(--lime)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} /> Synchronizing Arena Standings...
          </div>
        </div>
      ) : error ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
          <p>{error}</p>
        </div>
      ) : players.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
          <h3>No contenders on the board yet!</h3>
          <p style={{ color: 'var(--text-muted)' }}>Be the first developer to complete a challenge and claim #1 spot.</p>
        </div>
      ) : (
        <>
          {/* Podium Top 3 */}
          {players.length >= 1 && (
            <div className="podium-grid">
              {/* #2 Silver */}
              <div className="card podium-card" style={{ opacity: top2 ? 1 : 0.4 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>RANK #02</span>
                  <Medal size={20} color="#94a3b8" />
                </div>
                <h3 style={{ fontSize: '1.35rem', margin: '8px 0 4px' }}>{top2 ? top2.name : 'Awaiting Contender'}</h3>
                {top2 && (
                  <>
                    <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                      {getDevTitle(top2.level, top2.xp)}
                    </span>
                    <div className="mono" style={{ fontSize: '1.2rem', color: 'var(--lime)' }}>
                      {top2.xp.toLocaleString()} XP
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Accuracy: {top2.accuracy} • LVL {top2.level}
                    </div>
                  </>
                )}
              </div>

              {/* #1 Gold */}
              <div className="card podium-card gold">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--lime)', fontWeight: 700 }}>
                    RANK #01 (ARENA CHAMPION)
                  </span>
                  <Crown size={22} color="#f59e0b" />
                </div>
                <h2 style={{ fontSize: '1.7rem', margin: '8px 0 4px' }}>{top1.name}</h2>
                <span className="badge badge-lime" style={{ marginBottom: '12px' }}>
                  {getDevTitle(top1.level, top1.xp)}
                </span>
                <div className="mono" style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--lime)' }}>
                  {top1.xp.toLocaleString()} XP
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text)', marginTop: '4px' }}>
                  Accuracy: {top1.accuracy} • {top1.quizzesTaken} Challenges • LVL {top1.level}
                </div>
              </div>

              {/* #3 Bronze */}
              <div className="card podium-card" style={{ opacity: top3 ? 1 : 0.4 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>RANK #03</span>
                  <Award size={20} color="#d97706" />
                </div>
                <h3 style={{ fontSize: '1.35rem', margin: '8px 0 4px' }}>{top3 ? top3.name : 'Awaiting Contender'}</h3>
                {top3 && (
                  <>
                    <span className="badge badge-amber" style={{ marginBottom: '12px' }}>
                      {getDevTitle(top3.level, top3.xp)}
                    </span>
                    <div className="mono" style={{ fontSize: '1.2rem', color: 'var(--lime)' }}>
                      {top3.xp.toLocaleString()} XP
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Accuracy: {top3.accuracy} • LVL {top3.level}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Full Table */}
          <div className="card table-responsive" style={{ padding: '0', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table className="leaderboard-table" style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 20px', fontSize: '0.78rem' }}>RANK</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.78rem' }}>DEVELOPER</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.78rem' }}>TIER</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.78rem' }}>ACCURACY</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.78rem' }}>SOLVED</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.78rem', textAlign: 'right' }}>XP POINTS</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p) => {
                  const isTop = p.rank <= 3;
                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: '1px solid var(--border)',
                        background: isTop ? 'rgba(200, 255, 55, 0.02)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '16px 20px' }}>
                        <span
                          className="mono"
                          style={{
                            fontWeight: 700,
                            color: p.rank === 1 ? 'var(--lime)' : p.rank <= 3 ? '#e5e7eb' : 'var(--text-muted)',
                          }}
                        >
                          #{String(p.rank).padStart(2, '0')}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span>{p.name}</span>
                          {(p.country === 'Ethiopia' || !p.country) && (
                            <span title="Ethiopian Developer" style={{ fontSize: '0.9rem' }}>🇪🇹</span>
                          )}
                          {p.affiliation && (
                            <span className="badge" style={{ fontSize: '0.65rem', padding: '2px 6px', background: 'rgba(255,255,255,0.06)' }}>
                              {p.affiliation}
                            </span>
                          )}
                          {p.rank === 1 && <Crown size={14} color="#f59e0b" />}
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span className="badge" style={{ fontSize: '0.72rem' }}>
                          {getDevTitle(p.level, p.xp)}
                        </span>
                      </td>
                      <td className="mono" style={{ padding: '16px 20px', fontSize: '0.85rem' }}>
                        {p.accuracy}
                      </td>
                      <td className="mono" style={{ padding: '16px 20px', fontSize: '0.85rem' }}>
                        {p.quizzesTaken}
                      </td>
                      <td
                        className="mono"
                        style={{
                          padding: '16px 20px',
                          textAlign: 'right',
                          fontWeight: 700,
                          color: 'var(--lime)',
                        }}
                      >
                        {p.xp.toLocaleString()} XP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
