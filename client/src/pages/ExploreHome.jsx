import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import DailyChallengeCard from '../components/DailyChallengeCard';
import { Swords, Zap, Trophy, Plus, Clock, ArrowRight } from 'lucide-react';

const DOMAIN_TRACKS = [
  {
    id: '01',
    title: 'React & Frontend Architecture',
    desc: 'Hooks concurrency, Virtual DOM fiber diffing, async server components, and state management.',
    time: '12 MINS',
    difficulty: 'Mid Tier',
    tag: 'React',
  },
  {
    id: '02',
    title: 'Node.js & Backend Internals',
    desc: 'Express middleware chains, JWT token flows, async event loop phases, and streaming buffers.',
    time: '15 MINS',
    difficulty: 'Hard Tier',
    tag: 'Node.js',
  },
  {
    id: '03',
    title: 'Algorithms & Data Structures',
    desc: 'Tree traversals, dynamic programming, sliding windows, recursion, and Big-O runtime analysis.',
    time: '20 MINS',
    difficulty: 'Very Hard',
    tag: 'Algorithms',
  },
  {
    id: '04',
    title: 'TypeScript & Type Gymnastics',
    desc: 'Conditional types, mapped utility types, template literal inferences, and variance checks.',
    time: '10 MINS',
    difficulty: 'Hard Tier',
    tag: 'TypeScript',
  },
];

export default function ExploreHome() {
  const { isAuthenticated, canCreateQuiz } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="arena-hero">
        <div className="wrap">
          {/* Active Players Live Indicator */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: 'rgba(200, 255, 55, 0.08)',
              border: '1px solid rgba(200, 255, 55, 0.3)',
              borderRadius: '100px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                background: 'var(--lime)',
                borderRadius: '50%',
                boxShadow: '0 0 10px var(--lime)',
                display: 'inline-block',
              }}
            ></span>
            <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--lime)', fontWeight: 700, letterSpacing: '0.04em' }}>
              1,420+ DEVS CONTENDING LIVE
            </span>
          </div>

          <h1 className="arena-hero-headline">
            Battle-tested challenges for<br />
            <span className="serif">elite</span> software engineers.
          </h1>

          <p className="arena-hero-desc">
            Sharpen your system instincts against real-world engineering scenarios. Earn verified contender XP, unlock prestigious developer badges, and compete on the global leaderboard.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/quizzes" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Swords size={18} />
              <span>Enter Arena Challenges</span>
            </Link>
            <Link to="/practice" className="btn btn-secondary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} />
              <span>Quick Warm-Up</span>
            </Link>
            <Link to="/leaderboard" className="btn btn-secondary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={18} />
              <span>Live Leaderboard</span>
            </Link>
            {isAuthenticated && canCreateQuiz && (
              <Link to="/create-quiz" className="btn btn-secondary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} />
                <span>Author Challenge</span>
              </Link>
            )}
          </div>


          {/* Stats Strip */}
          <div className="arena-stats-strip">
            <div className="stat-strip-item">
              <span className="stat-strip-num">500+ XP</span>
              <span className="stat-strip-label">Per Conquered Tier</span>
            </div>
            <div className="stat-strip-item">
              <span className="stat-strip-num">8 Trophies</span>
              <span className="stat-strip-label">Unlockable Dev Badges</span>
            </div>
            <div className="stat-strip-item">
              <span className="stat-strip-num">Real-Time</span>
              <span className="stat-strip-label">Global Arena Ranking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Assessment Tracks */}
      <section style={{ padding: '60px 0' }}>
        <div className="wrap">
          {/* Daily Featured Arena Challenge */}
          <DailyChallengeCard />

          <div className="section-label">
            <div>
              <span className="eyebrow lime">FEATURED TRACKS</span>
              <h2>Developer Battlegrounds</h2>
            </div>
            <Link to="/quizzes" className="btn btn-secondary btn-sm">
              View All Challenges ↗
            </Link>
          </div>

          <div className="grid-2">
            {DOMAIN_TRACKS.map((t) => (
              <article key={t.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge badge-lime">#{t.tag}</span>
                    <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={12} /> {t.time} • {t.difficulty}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', margin: '4px 0 8px' }}>{t.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{t.desc}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                  <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--lime)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Zap size={12} /> UP TO 2.0x XP
                  </span>
                  <Link to="/quizzes" className="btn btn-primary btn-sm">
                    Enter Challenge ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Warm-Up Banner */}
      <section style={{ padding: '0 0 70px' }}>
        <div className="wrap">
          <div className="card" style={{ background: '#101712', border: '1px solid var(--border-strong)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <span className="eyebrow lime">WARM-UP DRILLS</span>
                <h3 style={{ fontSize: '1.8rem', margin: '6px 0 4px' }}>Want a quick warm-up before entering full challenges?</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '580px' }}>
                  Jump into our 5-question warm-up round with instant explanations, streak combos, and immediate feedback.
                </p>
              </div>

              <Link to="/practice" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} />
                <span>Start Quick Warm-Up</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}

