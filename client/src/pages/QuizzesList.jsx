import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizApi } from '../services/api';
import { Swords, Clock, Users, Zap } from 'lucide-react';

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
    status: 'published',
  },
  {
    _id: 'sample-2',
    title: 'React 19 Hooks & Concurrency Battle',
    description: 'Fiber reconciliation, Suspense boundaries, custom hook memoization, and server actions.',
    timeLimitMinutes: 12,
    tags: ['React', 'Frontend'],
    difficulty: 'hard',
    creatorName: 'Sarah Lin',
    playsCount: 28,
    status: 'published',
  },
  {
    _id: 'sample-3',
    title: 'TypeScript Type Gymnastics & Generics',
    description: 'Conditional types, mapped utility types, template literal inferences, and covariance/contravariance.',
    timeLimitMinutes: 15,
    tags: ['TypeScript'],
    difficulty: 'very hard',
    creatorName: 'Alex R.',
    playsCount: 19,
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
    status: 'published',
  },
];

const DIFFICULTY_MAP = {
  easy: { label: 'EASY (1.0x XP)', badgeClass: 'badge-lime' },
  mid: { label: 'MID (1.25x XP)', badgeClass: 'badge-emerald' },
  hard: { label: 'HARD (1.5x XP)', badgeClass: 'badge-amber' },
  'very hard': { label: 'VERY HARD (2.0x XP)', badgeClass: 'badge-rose' },
};

export default function QuizzesList() {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const res = await quizApi.getAllQuizzes({
          tag: activeTag,
          difficulty: activeDifficulty,
          search: searchTerm,
        });
        const serverQuizzes = res.quizzes || [];
        setQuizzes(serverQuizzes.length > 0 ? serverQuizzes : SAMPLE_DEV_QUIZZES);
      } catch (err) {
        console.warn('Using fallback catalog', err);
        setQuizzes(SAMPLE_DEV_QUIZZES);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [activeTag, activeDifficulty, searchTerm]);

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
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

      {/* Quiz Cards Grid */}
      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
          <span className="mono" style={{ color: 'var(--lime)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} /> Loading Arena Challenges...
          </span>
        </div>
      ) : quizzes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
          <h3>No matching challenges found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try broadening your filter criteria or search query.</p>
        </div>
      ) : (
        <div className="grid-2">
          {quizzes.map((quiz) => {
            const diffInfo = DIFFICULTY_MAP[quiz.difficulty] || DIFFICULTY_MAP.easy;
            const tags = quiz.tags && quiz.tags.length > 0 ? quiz.tags : ['JavaScript'];

            return (
              <article
                key={quiz._id}
                className="card card-interactive"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '230px' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span className={`badge ${diffInfo.badgeClass}`} style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
                        {diffInfo.label}
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

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Author: <span style={{ color: 'var(--text)' }}>{quiz.creatorName || quiz.teacherId?.name || 'Dev Contributor'}</span>
                  </span>
                  <Link to={`/quiz/${quiz._id}`} className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Swords size={14} />
                    <span>Enter Arena</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

