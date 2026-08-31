import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { quizApi } from '../services/api';

export default function Dashboard() {
  const { user, isTeacher } = useAuth();
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
      setActionSuccess('Quiz published successfully! It is now live for students.');
      fetchQuizzes();
      setTimeout(() => setActionSuccess(null), 4000);
    } catch (err) {
      setError(err.message || 'Failed to publish quiz');
    }
  };

  const publishedCount = quizzes.filter((q) => q.status === 'published').length;
  const draftCount = quizzes.filter((q) => q.status === 'draft').length;

  return (
    <div className="dashboard-page wrap">
      {/* Dashboard Top Header */}
      <div className="dashboard-header">
        <div>
          <span className="eyebrow lime">
            {isTeacher ? 'Educator Studio' : 'Candidate Arena'}
          </span>
          <h1>
            Welcome, <span className="serif">{user?.name}</span>
          </h1>
          <p className="dashboard-sub">
            {isTeacher
              ? 'Author new tests, manage question pools, and publish assessments.'
              : 'Browse active tests, challenge yourself under timed conditions, and track your scores.'}
          </p>
        </div>

        {isTeacher && (
          <Link to="/create-quiz" className="btn btn-primary btn-lg">
            + Create New Quiz
          </Link>
        )}
      </div>

      {actionSuccess && <div className="alert-box success">{actionSuccess}</div>}
      {error && <div className="alert-box error">{error}</div>}

      {/* Metrics Row for Teachers */}
      {isTeacher && (
        <div className="dashboard-metrics-grid">
          <div className="card metric-card">
            <span className="eyebrow">Total Quizzes</span>
            <span className="metric-num">{quizzes.length}</span>
          </div>
          <div className="card metric-card">
            <span className="eyebrow">Published & Active</span>
            <span className="metric-num lime">{publishedCount}</span>
          </div>
          <div className="card metric-card">
            <span className="eyebrow">In Draft</span>
            <span className="metric-num amber">{draftCount}</span>
          </div>
        </div>
      )}

      {/* Main Quizzes List */}
      <div className="dashboard-section">
        <div className="section-label">
          <h2>{isTeacher ? '(01) Your Quizzes' : '(01) Available Assessments'}</h2>
          <span>
            {isTeacher
              ? 'Manage and publish your created tests.'
              : 'Select any active quiz below to begin your timed examination.'}
          </span>
        </div>

        {loading ? (
          <div className="loading-box card">
            <span className="mono lime">Loading quiz collection...</span>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="empty-box card">
            <span className="mono eyebrow">No quizzes found</span>
            <h3>{isTeacher ? 'You haven’t created any quizzes yet.' : 'No active quizzes available right now.'}</h3>
            <p>
              {isTeacher
                ? 'Get started by creating your first quiz with custom questions and time limits.'
                : 'Check back soon once an educator publishes an assessment.'}
            </p>
            {isTeacher && (
              <Link to="/create-quiz" className="btn btn-primary btn-sm" style={{ marginTop: '14px' }}>
                + Create Your First Quiz
              </Link>
            )}
          </div>
        ) : (
          <div className="quiz-grid">
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="card quiz-card">
                <div className="quiz-card-top">
                  <span className={`badge ${quiz.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
                    {quiz.status}
                  </span>
                  <span className="quiz-time-pill mono">
                    ⏱ {quiz.timeLimitMinutes || 10} Mins
                  </span>
                </div>

                <h3 className="quiz-title">{quiz.title}</h3>
                <p className="quiz-desc">{quiz.description || 'No description provided.'}</p>

                <div className="quiz-card-actions">
                  {isTeacher ? (
                    <>
                      <Link to={`/quiz/${quiz._id}/edit`} className="btn btn-secondary btn-sm">
                        Manage Questions ↗
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
                    </>
                  ) : (
                    <Link to={`/quiz/${quiz._id}`} className="btn btn-primary btn-sm full-width">
                      Start Assessment ↗
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
