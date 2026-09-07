import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizApi } from '../services/api';
import { useAuth } from '../context/useAuth';
import { Swords, Clock, Users, Zap, HelpCircle, RotateCcw, Filter, CheckCircle2 } from 'lucide-react';

const SAMPLE_DEV_QUIZZES = [
  {
    _id: 'sample-1',
    title: 'Full-Stack JavaScript & Node.js Internals',
    description: 'Event loop execution phases, microtask queues, stream pipelines, and memory optimization.',
    timeLimitMinutes: 10,
    tags: ['JavaScript', 'Node.js'],
    difficulty: 'mid',
    creatorName: 'Nahom (Lead Architect)',
    playsCount: 42,
    questionCount: 20,
    status: 'published',
  },
  {
    _id: 'sample-2',
    title: 'React 19 Hooks & Concurrency Battle',
    description: 'Fiber reconciliation, Suspense boundaries, custom hook memoization, and server actions.',
    timeLimitMinutes: 12,
    tags: ['React', 'Frontend'],
    difficulty: 'hard',
    creatorName: 'Dev Arena Bot',
    playsCount: 119,
    questionCount: 20,
    status: 'published',
  },
  {
    _id: 'sample-3',
    title: 'TypeScript Generics & Conditional Types',
    description: 'Infer keyword, template literal types, mapped types, and branded primitive validation.',
    timeLimitMinutes: 15,
    tags: ['TypeScript'],
    difficulty: 'very hard',
    creatorName: 'Dev Arena Bot',
    playsCount: 94,
    questionCount: 20,
    status: 'published',
  },
  {
    _id: 'sample-4',
    title: 'Data Structures & Big-O Quick Fire',
    description: 'Binary trees, hash table collisions, sliding windows, and amortized runtime calculations.',
    timeLimitMinutes: 8,
    tags: ['Algorithms'],
    difficulty: 'easy',
    creatorName: 'Dev Arena Bot',
    playsCount: 76,
    questionCount: 20,
    status: 'published',
  },
];

const DIFFICULTY_MAP = {
  easy: { label: 'EASY (1.0x XP)', badgeClass: 'badge-lime' },
  mid: { label: 'MID (1.25x XP)', badgeClass: 'badge-emerald' },
  hard: { label: 'HARD (1.5x XP)', badgeClass: 'badge-amber' },
  'very hard': { label: 'VERY HARD (2.0x XP)', badgeClass: 'badge-rose' },
};

const PAGE_SIZE = 10;

export default function QuizzesList() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setPage(1);
        const res = await quizApi.getAllQuizzes({
          tag: activeTag,
          difficulty: activeDifficulty,
          search: searchTerm,
          page: 1,
          limit: PAGE_SIZE,
        });
        const serverQuizzes = res.quizzes || [];
        setQuizzes(serverQuizzes);
        setTotalQuizzes(res.total || serverQuizzes.length);
        setHasMore(res.hasMore ?? (serverQuizzes.length < (res.total || 0)));
      } catch (err) {
        console.warn('Using fallback catalog', err);
        setQuizzes(SAMPLE_DEV_QUIZZES);
        setTotalQuizzes(SAMPLE_DEV_QUIZZES.length);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [activeTag, activeDifficulty, searchTerm]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const res = await quizApi.getAllQuizzes({
        tag: activeTag,
        difficulty: activeDifficulty,
        search: searchTerm,
        page: nextPage,
        limit: PAGE_SIZE,
      });
      const newQuizzes = res.quizzes || [];
      setQuizzes((prev) => [...prev, ...newQuizzes]);
      setPage(nextPage);
      if (typeof res.total === 'number') setTotalQuizzes(res.total);
      setHasMore(res.hasMore ?? (quizzes.length + newQuizzes.length < (res.total || 0)));
    } catch (err) {
      console.error('Failed to load more challenges:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const tagsList = [
    'all',
    'TypeScript',
    'JavaScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Python',
    'Docker',
    'HTML & CSS',
    'MongoDB',
    'Java',
    'Git',
  ];
  const difficultyList = ['all', 'easy', 'mid', 'hard', 'very hard'];

  const resetAllFilters = () => {
    setActiveTag('all');
    setActiveDifficulty('all');
    setSearchTerm('');
  };

  return (
    <div className="quizzes-page wrap" style={{ padding: '50px 0' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Swords size={14} /> ARENA CHALLENGES
          </span>
          <h2>Developer Battlegrounds & Quizzes</h2>
        </div>
        <span>Select any track to test your knowledge, grind XP, and climb the leaderboard.</span>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <input
              type="text"
              placeholder="Search challenges by keyword, tag, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        {/* Tags & Difficulty Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginRight: '6px' }}>
              TECH:
            </span>
            {tagsList.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`btn btn-sm ${activeTag === tag ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                onClick={() => setActiveTag(tag)}
              >
                {tag === 'all' ? 'All Stacks' : tag}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginRight: '6px' }}>
              TIER:
            </span>
            {difficultyList.map((diff) => (
              <button
                key={diff}
                type="button"
                className={`btn btn-sm ${activeDifficulty === diff ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '4px 10px', fontSize: '0.76rem', textTransform: 'capitalize' }}
                onClick={() => setActiveDifficulty(diff)}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filter Bar & Results Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            FILTER:
          </span>
          <span className="badge" style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text)' }}>
            Stack: <strong style={{ color: 'var(--lime)' }}>{activeTag === 'all' ? 'All Stacks' : activeTag}</strong>
          </span>
          <span className="badge" style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text)', textTransform: 'capitalize' }}>
            Tier: <strong style={{ color: 'var(--lime)' }}>{activeDifficulty === 'all' ? 'All Tiers' : activeDifficulty}</strong>
          </span>
          {(activeTag !== 'all' || activeDifficulty !== 'all' || searchTerm.trim()) && (
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              style={{ fontSize: '0.72rem', padding: '2px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              onClick={resetAllFilters}
            >
              <RotateCcw size={11} /> Reset Filters
            </button>
          )}
        </div>
        <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          {loading ? 'Searching arena...' : `Showing ${quizzes.length} Challenge${quizzes.length === 1 ? '' : 's'}`}
        </span>
      </div>

      {/* Quiz Cards Grid */}
      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
          <span className="mono" style={{ color: 'var(--lime)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} /> Loading Arena Challenges...
          </span>
        </div>
      ) : quizzes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Filter size={32} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
          <h3 style={{ marginBottom: '8px' }}>No matching challenges found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
            No challenges match the selected filter (Stack: <strong>{activeTag}</strong>, Tier: <strong>{activeDifficulty}</strong>).
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={resetAllFilters}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid-2">
          {quizzes.map((quiz) => {
            const diffInfo = DIFFICULTY_MAP[quiz.difficulty] || DIFFICULTY_MAP.easy;
            const tags = quiz.tags && quiz.tags.length > 0 ? quiz.tags : ['JavaScript'];
            const qCount = quiz.questionCount ?? 20;

            const userAttempt =
              quiz.userAttempt ||
              user?.recentAttempts?.find(
                (att) => att.quizId && (att.quizId === quiz._id || att.quizId.toString() === quiz._id?.toString())
              );
            const isCompleted = !!(quiz.isCompleted || userAttempt);

            return (
              <article
                key={quiz._id}
                className={`card card-interactive ${isCompleted ? 'quiz-card-completed' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '230px',
                  borderLeft: isCompleted ? '3px solid #10b981' : undefined,
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className={`badge ${diffInfo.badgeClass}`} style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
                        {diffInfo.label}
                      </span>
                      {isCompleted && (
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
                          title="You have completed this challenge previously (0 XP on retake)"
                        >
                          <CheckCircle2 size={11} />
                          <span>COMPLETED {userAttempt?.bestPercentage !== undefined ? `(${userAttempt.bestPercentage}%)` : '✓'}</span>
                        </span>
                      )}
                      <span
                        className="badge"
                        style={{
                          fontSize: '0.68rem',
                          padding: '3px 8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: 'rgba(200,255,55,0.1)',
                          color: 'var(--lime)',
                          border: '1px solid rgba(200,255,55,0.25)',
                        }}
                      >
                        <HelpCircle size={11} /> {qCount} Questions
                      </span>
                      <span className="badge" style={{ fontSize: '0.68rem', background: 'rgba(255,255,255,0.06)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={11} /> {quiz.timeLimitMinutes || 10}m
                      </span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={12} /> {quiz.playsCount || 0} plays
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', margin: '0 0 8px' }}>{quiz.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '14px' }}>
                    {quiz.description || 'Challenge designed to evaluate core software principles.'}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {tags.map((t, idx) => (
                      <span key={idx} className="mono" style={{ fontSize: '0.72rem', color: 'var(--lime)', background: 'rgba(200,255,55,0.08)', padding: '2px 8px', borderRadius: '3px' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      Author: <span style={{ color: 'var(--text)' }}>{quiz.creatorName || quiz.teacherId?.name || 'Dev Contributor'}</span>
                    </span>
                    {isCompleted && (
                      <span className="mono" style={{ fontSize: '0.7rem', color: '#10b981', marginTop: '2px' }}>
                        ✓ Previously Completed (0 XP retake)
                      </span>
                    )}
                  </div>

                  {isCompleted ? (
                    <Link to={`/quiz/${quiz._id}`} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <RotateCcw size={13} />
                      <span>Retake Arena ({qCount} Qs)</span>
                    </Link>
                  ) : (
                    <Link to={`/quiz/${quiz._id}`} className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Swords size={14} />
                      <span>Enter Arena ({qCount} Qs)</span>
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Load More & Pagination Bar */}
      {!loading && quizzes.length > 0 && (
        <div
          className="card"
          style={{
            marginTop: '36px',
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            background: 'rgba(8, 13, 10, 0.85)',
            border: '1px solid var(--border)',
          }}
        >
          <div>
            <span className="mono" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Showing <strong style={{ color: 'var(--lime)' }}>{quizzes.length}</strong> of{' '}
              <strong style={{ color: '#fff' }}>{totalQuizzes || quizzes.length}</strong> challenges
              {totalQuizzes > quizzes.length && (
                <span> ({totalQuizzes - quizzes.length} remaining)</span>
              )}
            </span>
            <div
              style={{
                width: '180px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                marginTop: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, Math.round((quizzes.length / (totalQuizzes || quizzes.length || 1)) * 100))}%`,
                  background: 'var(--lime)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {hasMore ? (
              <button
                type="button"
                disabled={loadingMore}
                onClick={handleLoadMore}
                className="btn btn-primary"
                style={{ minWidth: '150px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <RotateCcw size={14} className={loadingMore ? 'spin' : ''} />
                <span>{loadingMore ? 'Loading...' : 'Load More (+10)'}</span>
              </button>
            ) : (
              <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--lime)', padding: '6px 12px' }}>
                ✓ All {totalQuizzes} challenges loaded
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

