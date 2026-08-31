import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const DOMAIN_TRACKS = [
  {
    id: '01',
    title: 'React & Frontend Engineering',
    desc: 'Hooks, Virtual DOM fiber diffing, asynchronous transitions, and state management architectures.',
    time: '12 MINS',
    items: '10 QUESTIONS',
  },
  {
    id: '02',
    title: 'Node.js & Backend Architecture',
    desc: 'Express middleware chains, JWT token verification, asynchronous event loops, and REST API design.',
    time: '15 MINS',
    items: '12 QUESTIONS',
  },
  {
    id: '03',
    title: 'Algorithms & Data Structures',
    desc: 'Tree traversals, dynamic programming, recursion, hash tables, and asymptotic time complexity.',
    time: '20 MINS',
    items: '15 QUESTIONS',
  },
  {
    id: '04',
    title: 'Database Design & MongoDB',
    desc: 'Document schema modeling, compound index optimization, aggregation pipelines, and ACID transactions.',
    time: '10 MINS',
    items: '8 QUESTIONS',
  },
];

export default function ExploreHome() {
  const { isAuthenticated, isTeacher } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="arena-hero">
        <div className="wrap">
          <span className="eyebrow lime">LIVE EVALUATION ARENA</span>
          <h1 className="arena-hero-headline">
            Precision assessments for<br />
            <span className="serif">technical</span> mastery.
          </h1>

          <p className="arena-hero-desc">
            A timed assessment engine for developers and educators. Enter live challenge chambers, evaluate your accuracy, and climb global contender ranks.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/quizzes" className="btn btn-primary btn-lg">
              Explore Assessments ↗
            </Link>
            <Link to="/practice" className="btn btn-secondary btn-lg">
              ⚡ Quick Blitz Practice
            </Link>
            {isAuthenticated && isTeacher && (
              <Link to="/studio" className="btn btn-secondary btn-lg">
                Educator Studio ↗
              </Link>
            )}
          </div>

          {/* Stats Strip */}
          <div className="arena-stats-strip">
            <div className="stat-strip-item">
              <span className="stat-strip-num">14,200+</span>
              <span className="stat-strip-label">Questions Evaluated</span>
            </div>
            <div className="stat-strip-item">
              <span className="stat-strip-num">94.2%</span>
              <span className="stat-strip-label">Average Pass Accuracy</span>
            </div>
            <div className="stat-strip-item">
              <span className="stat-strip-num">&lt; 100ms</span>
              <span className="stat-strip-label">Instant Result Grading</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Assessment Tracks */}
      <section style={{ padding: '60px 0' }}>
        <div className="wrap">
          <div className="section-label">
            <div>
              <span className="eyebrow">CURATED TRACKS</span>
              <h2>Featured Assessment Domains</h2>
            </div>
            <Link to="/quizzes" className="btn btn-secondary btn-sm">
              View All Quizzes ↗
            </Link>
          </div>

          <div className="grid-2">
            {DOMAIN_TRACKS.map((t) => (
              <article key={t.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge badge-lime">TRACK {t.id}</span>
                    <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      ⏱ {t.time} • 📝 {t.items}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', margin: '4px 0 8px' }}>{t.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{t.desc}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                  <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--lime)' }}>★ 150+ XP</span>
                  <Link to="/quizzes" className="btn btn-primary btn-sm">
                    Enter Challenge ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Practice Banner */}
      <section style={{ padding: '0 0 70px' }}>
        <div className="wrap">
          <div className="card" style={{ background: '#101712', border: '1px solid var(--border-strong)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <span className="eyebrow lime">SPEED DRILLS</span>
                <h3 style={{ fontSize: '1.8rem', margin: '6px 0 4px' }}>Want to test your speed before full exams?</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '580px' }}>
                  Try our 5-question blitz arena with instant answer breakdowns, streak multipliers, and explanation notes.
                </p>
              </div>

              <Link to="/practice" className="btn btn-primary btn-lg">
                Start Blitz Practice ⚡
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
