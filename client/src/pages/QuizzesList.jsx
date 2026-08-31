import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizApi } from '../services/api';

const SAMPLE_QUIZZES = [
  {
    _id: 'sample-1',
    title: 'Full-Stack JavaScript & Node.js Engine',
    description: 'Master Express middleware, event loop internals, asynchronous streams, and REST API design patterns.',
    timeLimitMinutes: 12,
    category: 'Backend',
    status: 'published',
  },
  {
    _id: 'sample-2',
    title: 'React Architecture & State Mastery',
    description: 'Deep dive into component lifecycle, custom hooks, context performance, and fiber reconciliation.',
    timeLimitMinutes: 15,
    category: 'Frontend',
    status: 'published',
  },
  {
    _id: 'sample-3',
    title: 'Data Structures & Algorithmic Thinking',
    description: 'Solve complexity questions, binary trees, recursion patterns, hash tables, and dynamic programming.',
    timeLimitMinutes: 20,
    category: 'Algorithms',
    status: 'published',
  },
  {
    _id: 'sample-4',
    title: 'Modern CSS, Grid & Layout Systems',
    description: 'Test your understanding of flexbox models, subgrid, container queries, CSS variables, and fluid typography.',
    timeLimitMinutes: 10,
    category: 'Design',
    status: 'published',
  },
];

export default function QuizzesList() {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const res = await quizApi.getAllQuizzes();
        const serverQuizzes = res.quizzes || [];
        setQuizzes(serverQuizzes.length > 0 ? serverQuizzes : SAMPLE_QUIZZES);
      } catch (err) {
        console.warn('Using local fallback catalog', err);
        setQuizzes(SAMPLE_QUIZZES);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="quizzes-page wrap" style={{ padding: '50px 0' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime">ASSESSMENT CATALOG</span>
          <h2>Live Evaluation Library</h2>
        </div>
        <span>Select any assessment to launch the live countdown exam chamber.</span>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ flex: 1, minWidth: '280px', maxWidth: '540px' }}>
          <input
            type="text"
            placeholder="Search by topic, framework, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'Frontend', 'Backend', 'Algorithms', 'Design'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All Tracks' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
          <span className="mono" style={{ color: 'var(--lime)' }}>Loading assessment library...</span>
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
          <h3>No matching assessments found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid-2">
          {filteredQuizzes.map((quiz) => (
            <article
              key={quiz._id}
              className="card card-interactive"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge badge-lime">⏱ {quiz.timeLimitMinutes || 10} MINS</span>
                  <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    {quiz.status === 'published' ? '● LIVE TEST' : 'DRAFT'}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', margin: '0 0 8px' }}>{quiz.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {quiz.description || 'Comprehensive evaluation test designed to measure fundamental principles.'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--lime)' }}>★ 150+ XP</span>
                <Link to={`/quiz/${quiz._id}`} className="btn btn-primary btn-sm">
                  Start Assessment ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
