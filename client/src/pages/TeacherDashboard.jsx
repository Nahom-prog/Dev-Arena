import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizApi } from '../services/api';
import { useAuth } from '../context/useAuth';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await quizApi.getAllQuizzes();
      setQuizzes(res.quizzes || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch quizzes');
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
      setActionSuccess('Assessment published live to the arena!');
      fetchQuizzes();
      setTimeout(() => setActionSuccess(null), 4000);
    } catch (err) {
      setError(err.message || 'Failed to publish assessment');
    }
  };

  const publishedCount = quizzes.filter((q) => q.status === 'published').length;
  const draftCount = quizzes.filter((q) => q.status === 'draft').length;

  return (
    <div className="studio-page wrap" style={{ padding: '50px 0' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime">EDUCATOR WORKBENCH</span>
          <h2>Assessment Studio Control</h2>
        </div>
        <span>Welcome back, {user?.name}. Author and publish evaluation pools.</span>
      </div>

      {actionSuccess && <div className="alert-box success">{actionSuccess}</div>}
      {error && <div className="alert-box error">{error}</div>}

      {/* Metrics */}
      <div className="grid-3" style={{ marginBottom: '36px' }}>
        <div className="card">
          <span className="eyebrow">TOTAL ASSESSMENTS</span>
          <h3 style={{ fontSize: '2.4rem', margin: '8px 0 0', fontFamily: 'DM Mono' }}>{quizzes.length}</h3>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--lime)' }}>
          <span className="eyebrow lime">PUBLISHED IN ARENA</span>
          <h3 style={{ fontSize: '2.4rem', margin: '8px 0 0', fontFamily: 'DM Mono', color: 'var(--lime)' }}>{publishedCount}</h3>
        </div>
        <div className="card">
          <span className="eyebrow">DRAFTS IN WORKBENCH</span>
          <h3 style={{ fontSize: '2.4rem', margin: '8px 0 0', fontFamily: 'DM Mono', color: 'var(--amber)' }}>{draftCount}</h3>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3>Managed Assessment Pools</h3>
        <Link to="/create-quiz" className="btn btn-primary btn-sm">
          + Create New Quiz ↗
        </Link>
      </div>

      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
          <span className="mono" style={{ color: 'var(--lime)' }}>Loading studio catalog...</span>
        </div>
      ) : quizzes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
          <h3>No assessments created yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Start by authoring your first assessment.</p>
          <Link to="/create-quiz" className="btn btn-primary btn-sm">
            + Author First Quiz
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
                  <span className={`badge ${quiz.status === 'published' ? 'badge-lime' : 'badge-amber'}`}>
                    {quiz.status === 'published' ? '● LIVE' : 'DRAFT'}
                  </span>
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
