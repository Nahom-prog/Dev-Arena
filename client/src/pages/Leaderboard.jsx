import { useState, useEffect } from 'react';
import { leaderboardApi } from '../services/api';

const getDevTitle = (level, xp) => {
  if (level >= 12 || xp >= 3000) return 'Grandmaster 👑';
  if (level >= 8 || xp >= 2000) return 'Staff Architect 🏗️';
  if (level >= 5 || xp >= 1200) return 'Senior Dev ⚡';
  if (level >= 3 || xp >= 500) return 'Mid Engineer 💻';
  return 'Junior Contender 🚀';
};

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await leaderboardApi.getLeaderboard();
        setPlayers(data.leaderboard || []);
      } catch (err) {
        console.error('Failed to load leaderboard', err);
        setError('Unable to retrieve leaderboard standings.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const top1 = players[0];
  const top2 = players[1];
  const top3 = players[2];

  return (
    <div className="leaderboard-page wrap" style={{ padding: '50px 0' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime">HALL OF FAME</span>
          <h2>Global Developer Arena Rankings</h2>
        </div>
        <span>Real-time standings ranked by verified XP points, accuracy rating, and challenges solved.</span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div className="mono" style={{ fontSize: '1.1rem', color: 'var(--lime)' }}>⚡ Synchronizing Arena Standings...</div>
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
                <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>RANK #02</span>
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
                <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--lime)', fontWeight: 700 }}>
                  ★ RANK #01 (ARENA CHAMPION)
                </span>
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
                <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>RANK #03</span>
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

          {/* Leaderboard Table */}
          <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Developer Contender</th>
                  <th>Tier & Level</th>
                  <th>Challenges</th>
                  <th>Accuracy</th>
                  <th>Badges</th>
                  <th style={{ textAlign: 'right' }}>Total XP</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p) => (
                  <tr key={p.id || p.rank}>
                    <td className="mono" style={{ fontWeight: 700, color: p.rank === 1 ? 'var(--lime)' : 'var(--text)' }}>
                      #{String(p.rank).padStart(2, '0')}
                    </td>
                    <td>
                      <strong style={{ color: p.rank === 1 ? 'var(--lime)' : 'inherit' }}>{p.name}</strong>
                    </td>
                    <td>
                      <span className="mono" style={{ fontSize: '0.76rem', opacity: 0.9 }}>
                        {getDevTitle(p.level, p.xp)} (LVL {p.level})
                      </span>
                    </td>
                    <td className="mono">{p.quizzesTaken} solved</td>
                    <td className="mono" style={{ color: 'var(--lime)' }}>{p.accuracy}</td>
                    <td className="mono">{p.badgeCount || 0} 🏅</td>
                    <td className="mono" style={{ textAlign: 'right', fontWeight: 700, color: 'var(--lime)' }}>
                      {p.xp.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

