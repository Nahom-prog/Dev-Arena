const TOP_PLAYERS = [
  { rank: 1, name: 'Nahom Alex', level: 18, xp: 4820, accuracy: '96.4%', quizzes: 34, title: 'Grandmaster' },
  { rank: 2, name: 'Sophia Chen', level: 16, xp: 4190, accuracy: '93.8%', quizzes: 29, title: 'Speed Solver' },
  { rank: 3, name: 'Marcus Vance', level: 15, xp: 3950, accuracy: '91.2%', quizzes: 26, title: 'Precision Ace' },
  { rank: 4, name: 'Elena Rostova', level: 14, xp: 3480, accuracy: '89.5%', quizzes: 22, title: 'Streak Master' },
  { rank: 5, name: 'David Kim', level: 12, xp: 2940, accuracy: '87.1%', quizzes: 19, title: 'Algorithm Ace' },
];

export default function Leaderboard() {
  return (
    <div className="leaderboard-page wrap" style={{ padding: '50px 0' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime">HALL OF FAME</span>
          <h2>Global Contender Rankings</h2>
        </div>
        <span>Ranked by verified assessment score, speed, and question accuracy.</span>
      </div>

      {/* Podium Top 3 */}
      <div className="podium-grid">
        {/* #2 Silver */}
        <div className="card podium-card">
          <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>RANK #02</span>
          <h3 style={{ fontSize: '1.35rem', margin: '8px 0 4px' }}>{TOP_PLAYERS[1].name}</h3>
          <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
            {TOP_PLAYERS[1].title}
          </span>
          <div className="mono" style={{ fontSize: '1.2rem', color: 'var(--lime)' }}>
            {TOP_PLAYERS[1].xp.toLocaleString()} XP
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Accuracy: {TOP_PLAYERS[1].accuracy}
          </div>
        </div>

        {/* #1 Gold */}
        <div className="card podium-card gold">
          <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--lime)', fontWeight: 700 }}>
            ★ RANK #01 (CHAMPION)
          </span>
          <h2 style={{ fontSize: '1.7rem', margin: '8px 0 4px' }}>{TOP_PLAYERS[0].name}</h2>
          <span className="badge badge-lime" style={{ marginBottom: '12px' }}>
            {TOP_PLAYERS[0].title}
          </span>
          <div className="mono" style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--lime)' }}>
            {TOP_PLAYERS[0].xp.toLocaleString()} XP
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text)', marginTop: '4px' }}>
            Accuracy: {TOP_PLAYERS[0].accuracy} • {TOP_PLAYERS[0].quizzes} Assessments
          </div>
        </div>

        {/* #3 Bronze */}
        <div className="card podium-card">
          <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>RANK #03</span>
          <h3 style={{ fontSize: '1.35rem', margin: '8px 0 4px' }}>{TOP_PLAYERS[2].name}</h3>
          <span className="badge badge-amber" style={{ marginBottom: '12px' }}>
            {TOP_PLAYERS[2].title}
          </span>
          <div className="mono" style={{ fontSize: '1.2rem', color: 'var(--lime)' }}>
            {TOP_PLAYERS[2].xp.toLocaleString()} XP
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Accuracy: {TOP_PLAYERS[2].accuracy}
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Contender</th>
              <th>Rank Title</th>
              <th>Assessments</th>
              <th>Accuracy</th>
              <th style={{ textAlign: 'right' }}>Total Score XP</th>
            </tr>
          </thead>
          <tbody>
            {TOP_PLAYERS.map((p) => (
              <tr key={p.rank}>
                <td className="mono" style={{ fontWeight: 700, color: p.rank === 1 ? 'var(--lime)' : 'var(--text)' }}>
                  #{String(p.rank).padStart(2, '0')}
                </td>
                <td>
                  <strong>{p.name}</strong>
                </td>
                <td>
                  <span className="mono" style={{ fontSize: '0.76rem', opacity: 0.85 }}>{p.title}</span>
                </td>
                <td className="mono">{p.quizzes} tests</td>
                <td className="mono" style={{ color: 'var(--lime)' }}>{p.accuracy}</td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 700, color: 'var(--lime)' }}>
                  {p.xp.toLocaleString()} XP
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
