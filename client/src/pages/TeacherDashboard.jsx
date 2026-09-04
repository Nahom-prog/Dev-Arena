import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizApi } from '../services/api';
import { useAuth } from '../context/useAuth';
import { useToast } from '../context/ToastContext';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await quizApi.getMyQuizzes();
      setQuizzes(res.quizzes || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch your authored challenges');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handlePublish = async (quizId) => {
    try {
      await quizApi.publishQuiz(quizId);
      setActionSuccess('Challenge published live to the Dev Arena!');
      showToast({
        title: 'Challenge Published!',
        message: 'Your challenge is now live in the community arena.',
        icon: '🚀',
        type: 'badge',
      });
      fetchQuizzes();
      setTimeout(() => setActionSuccess(null), 4000);
    } catch (err) {
      setError(err.message || 'Failed to publish challenge');
    }
  };

  const publishedCount = quizzes.filter((q) => q.status === 'published').length;
  const draftCount = quizzes.filter((q) => q.status === 'draft').length;

  return (
    <div className="studio-page wrap" style={{ padding: '50px 0' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime">CREATOR WORKBENCH</span>
          <h2>Challenge Author Studio</h2>
        </div>
        <span>Welcome back, {user?.name}. Author questions, configure test parameters, and publish challenges.</span>
      </div>

      {actionSuccess && <div className="alert-box success">{actionSuccess}</div>}
      {error && <div className="alert-box error">{error}</div>}

      {/* Metrics */}
      <div className="teacher-stats-grid">
        <div className="card">
          <span className="eyebrow">AUTHORED CHALLENGES</span>
          <h3 style={{ fontSize: '2.4rem', margin: '8px 0 0', fontFamily: 'DM Mono' }}>{quizzes.length}</h3>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--lime)' }}>
          <span className="eyebrow lime">LIVE IN ARENA</span>
          <h3 style={{ fontSize: '2.4rem', margin: '8px 0 0', fontFamily: 'DM Mono', color: 'var(--lime)' }}>{publishedCount}</h3>
        </div>
        <div className="card">
          <span className="eyebrow">DRAFTS IN PROGRESS</span>
          <h3 style={{ fontSize: '2.4rem', margin: '8px 0 0', fontFamily: 'DM Mono', color: 'var(--amber)' }}>{draftCount}</h3>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3>Your Authored Challenges</h3>
        <Link to="/create-quiz" className="btn btn-primary btn-sm">
          + Build New Challenge ↗
        </Link>
      </div>

      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
          <span className="mono" style={{ color: 'var(--lime)' }}>⚡ Loading authored challenges...</span>
        </div>
      ) : quizzes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
          <h3>No authored challenges yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            Build your first challenge and contribute to the community arena.
          </p>
          <Link to="/create-quiz" className="btn btn-primary btn-sm">
            + Author First Challenge
          </Link>
        </div>
      ) : (
        <div className="grid-2">
          {quizzes.map((quiz) => (
            <article
              key={quiz._id}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '210px' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className={`badge ${quiz.status === 'published' ? 'badge-lime' : 'badge-amber'}`}>
                      {quiz.status === 'published' ? '● LIVE' : 'DRAFT'}
                    </span>
                    <span className="badge" style={{ fontSize: '0.7rem', textTransform: 'capitalize' }}>
                      {quiz.difficulty || 'easy'}
                    </span>
                  </div>
                  <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    ⏱ {quiz.timeLimitMinutes || 10} Mins
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', margin: '0 0 6px' }}>{quiz.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{quiz.description || 'No description provided.'}</p>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <Link to={`/quiz/${quiz._id}/edit`} className="btn btn-secondary btn-sm">
                  Author Questions & Simulator ↗
                </Link>
                {quiz.status !== 'published' && (
                  <button
                    type="button"
                    onClick={() => handlePublish(quiz._id)}
                    className="btn btn-primary btn-sm"
                  >
                    Publish Live ↗
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

