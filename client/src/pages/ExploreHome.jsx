import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { quizApi } from '../services/api';
import DailyChallengeCard from '../components/DailyChallengeCard';
import { Swords, Zap, Trophy, Plus, Clock, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

const DOMAIN_TRACKS = [
  {
    id: '01',
    quizId: 'sample-1',
    title: 'JavaScript Core Fundamentals',
    desc: 'Variables, scope, closures, array methods (map/filter/reduce), objects, and modern ES6 basics.',
    time: '10 MINS',
    difficulty: 'Beginner',
    tag: 'JavaScript',
    badgeClass: 'badge-emerald',
  },
  {
    id: '02',
    quizId: 'sample-2',
    title: 'React & Frontend Architecture',
    desc: 'Hooks lifecycle, component state, Virtual DOM, async effects, and modern web performance.',
    time: '12 MINS',
    difficulty: 'Intermediate',
    tag: 'React',
    badgeClass: 'badge-lime',
  },
  {
    id: '03',
    quizId: 'sample-3',
    title: 'Node.js & Backend Internals',
    desc: 'Express middleware chains, REST API design, JWT auth flows, async event loop, and buffers.',
    time: '15 MINS',
    difficulty: 'Advanced',
    tag: 'Node.js',
    badgeClass: 'badge-amber',
  },
  {
    id: '04',
    quizId: 'sample-4',
    title: 'Algorithms & System Design',
    desc: 'Data structures, sliding windows, recursion, Big-O runtime, and distributed server thinking.',
    time: '8 MINS',
    difficulty: 'Expert',
    tag: 'Algorithms',
    badgeClass: 'badge-purple',
  },
];

export default function ExploreHome() {
  const { user, isAuthenticated, canCreateQuiz } = useAuth();
  const [featuredQuizzes, setFeaturedQuizzes] = useState([]);

  useEffect(() => {
    let mounted = true;
    const loadFeatured = async () => {
      try {
        const res = await quizApi.getAllQuizzes({ limit: 4 });
        if (mounted && res?.quizzes && res.quizzes.length > 0) {
          setFeaturedQuizzes(res.quizzes.slice(0, 4));
        }
      } catch (err) {
        console.warn('Using fallback featured challenges', err);
      }
    };
    loadFeatured();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="arena-hero">
        <div className="wrap">
          {/* Active Season Live Indicator */}
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
              ⚡ SEASON 1 BATTLEGROUND OPEN • TEST YOUR DEV KNOWLEDGE
            </span>
          </div>

          <h1 className="arena-hero-headline">
            Put your developer knowledge<br />
            <span className="serif">to the test.</span>
          </h1>

          <p className="arena-hero-desc">
            Fast-paced coding quizzes. Real-time community rankings. For developers of all levels who want to test their skills and level up.
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
              <span className="stat-strip-num">One-Time XP</span>
              <span className="stat-strip-label">Earn Verified Points</span>
            </div>
            <div className="stat-strip-item">
              <span className="stat-strip-num">8 Trophies</span>
              <span className="stat-strip-label">Unlockable Dev Badges</span>
            </div>
            <div className="stat-strip-item">
              <span className="stat-strip-num">Real-Time</span>
              <span className="stat-strip-label">Global & Ethiopian Standings</span>
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
            {(featuredQuizzes.length > 0
              ? featuredQuizzes.map((q) => {
                  const diff = (q.difficulty || 'mid').toLowerCase();
                  const badgeClass =
                    diff === 'easy'
                      ? 'badge-emerald'
                      : diff === 'hard'
                      ? 'badge-amber'
                      : diff === 'very hard'
                      ? 'badge-rose'
                      : 'badge-lime';

                  const userAttempt =
                    q.userAttempt ||
                    user?.recentAttempts?.find(
                      (att) => att.quizId && (att.quizId === q._id || att.quizId.toString() === q._id?.toString())
                    );
                  const isCompleted = !!(q.isCompleted || userAttempt);

                  return {
                    id: q._id,
                    quizId: q._id,
                    title: q.title,
                    desc: q.description || 'Challenge designed to evaluate core software engineering principles.',
                    time: `${q.timeLimitMinutes || 10} MINS`,
                    difficulty: q.difficulty || 'Mid',
                    tag: q.tags?.[0] || 'Code',
                    badgeClass,
                    isCompleted,
                    userAttempt,
                  };
                })
              : DOMAIN_TRACKS
            ).map((t) => (
              <article
                key={t.id}
                className={`card card-interactive ${t.isCompleted ? 'quiz-card-completed' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                  borderLeft: t.isCompleted ? '3px solid #10b981' : undefined,
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className={`badge ${t.badgeClass || 'badge-lime'}`}>{t.difficulty}</span>
                      {t.isCompleted && (
                        <span
                          className="badge"
                          style={{
                            fontSize: '0.68rem',
                            padding: '3px 8px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#10b981',
                            border: '1px solid rgba(16, 185, 129, 0.35)',
                            fontWeight: 600,
                          }}
                        >
                          <CheckCircle2 size={11} />
                          <span>COMPLETED ✓</span>
                        </span>
                      )}
                      <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>#{t.tag}</span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={12} /> {t.time}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', margin: '4px 0 8px' }}>{t.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{t.desc}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="mono" style={{ fontSize: '0.78rem', color: t.isCompleted ? '#10b981' : 'var(--lime)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {t.isCompleted ? (
                      <span>✓ Completed (0 XP retake)</span>
                    ) : (
                      <>
                        <Zap size={12} /> UP TO 2.0x XP
                      </>
                    )}
                  </span>

                  {t.isCompleted ? (
                    <Link to={`/quiz/${t.quizId}`} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <RotateCcw size={13} />
                      <span>Retake ↺</span>
                    </Link>
                  ) : (
                    <Link to={`/quiz/${t.quizId}`} className="btn btn-primary btn-sm">
                      Enter Challenge ↗
                    </Link>
                  )}
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

