import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ACHIEVEMENTS = [
  { id: 1, title: 'First Blood', desc: 'Completed your first timed challenge session.', unlocked: true },
  { id: 2, title: 'Streak Master', desc: 'Maintained a 5-question correct streak in practice.', unlocked: true },
  { id: 3, title: 'Perfect 100%', desc: 'Scored 100% on any published evaluation.', unlocked: true },
  { id: 4, title: 'Speed Demon', desc: 'Finished a 10-minute assessment in under 3 minutes.', unlocked: false },
  { id: 5, title: 'Grandmaster', desc: 'Accumulated over 3,000 XP contender points.', unlocked: false },
  { id: 6, title: 'Polymath', desc: 'Completed assessments across 4 different domains.', unlocked: false },
];

export default function Profile() {
  const { user, isTeacher } = useAuth();

  return (
    <div className="profile-page wrap" style={{ padding: '50px 0' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime">CONTENDER DOSSIER</span>
          <h2>Player Profile & Progression</h2>
        </div>
        <span>Track your level trajectory, pass rate, and verified achievement medals.</span>
      </div>

      {/* Profile Card */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--lime)' }}>
              {isTeacher ? 'EDUCATOR ACCOUNT' : 'CONTENDER LEVEL 03'}
            </span>
            <h1 style={{ fontSize: '2.6rem', margin: '6px 0 4px', letterSpacing: '-0.03em' }}>
              {user?.name || 'Quiz Contender'}
            </h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.92rem' }}>{user?.email}</p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/practice" className="btn btn-primary btn-sm">
              ⚡ Quick Practice
            </Link>
          </div>
        </div>

        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '8px' }}>
            <span className="mono" style={{ color: 'var(--lime)' }}>Level 03 Progression</span>
            <span className="mono" style={{ color: 'var(--text-muted)' }}>680 / 1,000 XP</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{ width: '68%', height: '100%', background: 'var(--lime)', borderRadius: '100px' }}></div>
          </div>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid-4" style={{ marginBottom: '40px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <span className="eyebrow">Assessments Taken</span>
          <h3 style={{ fontSize: '1.8rem', marginTop: '4px', fontFamily: 'DM Mono' }}>12</h3>
        </div>
        <div className="card" style={{ padding: '20px' }}>
          <span className="eyebrow lime">Accuracy Rating</span>
          <h3 style={{ fontSize: '1.8rem', marginTop: '4px', fontFamily: 'DM Mono', color: 'var(--lime)' }}>94.2%</h3>
        </div>
        <div className="card" style={{ padding: '20px' }}>
          <span className="eyebrow">Arena Rank</span>
          <h3 style={{ fontSize: '1.8rem', marginTop: '4px', fontFamily: 'DM Mono' }}>#14</h3>
        </div>
        <div className="card" style={{ padding: '20px' }}>
          <span className="eyebrow">Best Streak</span>
          <h3 style={{ fontSize: '1.8rem', marginTop: '4px', fontFamily: 'DM Mono', color: 'var(--lime)' }}>8x</h3>
        </div>
      </div>

      {/* Achievements Badges */}
      <div className="section-label">
        <div>
          <span className="eyebrow">MILESTONES</span>
          <h2>Earned Achievement Medals</h2>
        </div>
        <span>Unlocked as you master assessments and hit accuracy targets.</span>
      </div>

      <div className="grid-3">
        {ACHIEVEMENTS.map((a) => (
          <article
            key={a.id}
            className="card"
            style={{
              opacity: a.unlocked ? 1 : 0.45,
              borderColor: a.unlocked ? 'rgba(200, 255, 55, 0.3)' : 'var(--border)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="mono" style={{ fontSize: '0.74rem', color: a.unlocked ? 'var(--lime)' : 'var(--text-muted)' }}>
                {a.unlocked ? '✓ UNLOCKED' : 'LOCKED'}
              </span>
              <span className="badge badge-lime" style={{ fontSize: '0.62rem' }}>MEDAL</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 6px' }}>{a.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.45', margin: 0 }}>{a.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
