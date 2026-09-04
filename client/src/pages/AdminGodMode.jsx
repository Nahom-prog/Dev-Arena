import { useState, useEffect } from 'react';
import { adminApi } from '../services/api';
import { useAuth } from '../context/useAuth';
import { useToast } from '../context/ToastContext';
import {
  ShieldAlert,
  Users,
  Swords,
  Zap,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  RefreshCw,
  Edit3,
  Crown,
  Flag,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Eye,
} from 'lucide-react';

export default function AdminGodMode() {
  const { user: currentAuthUser } = useAuth();
  const isFounder = currentAuthUser?.email === 'abiynahom570@gmail.com';
  const { showToast } = useToast();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [inspectingQuestion, setInspectingQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'quizzes' | 'questions'
  const [questionFilter, setQuestionFilter] = useState('reported'); // 'reported' | 'all'
  const [searchUser, setSearchUser] = useState('');
  const [loading, setLoading] = useState(true);

  // Edit user modal / inline state
  const [editingUser, setEditingUser] = useState(null);
  const [editXp, setEditXp] = useState(0);
  const [editLevel, setEditLevel] = useState(1);
  const [editRole, setEditRole] = useState('student');
  const [editStreak, setEditStreak] = useState(1);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, quizzesRes, questionsRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getUsers(searchUser),
        adminApi.getQuizzes(),
        adminApi.getQuestions(questionFilter),
      ]);
      setStats(statsRes.stats);
      setUsers(usersRes.users || []);
      setQuizzes(quizzesRes.quizzes || []);
      setQuestions(questionsRes.questions || []);
    } catch (err) {
      showToast({
        title: 'Error loading God Mode telemetry',
        message: err.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchUser, questionFilter]);

  const handleOpenEdit = (u) => {
    setEditingUser(u);
    setEditXp(u.xp || 0);
    setEditLevel(u.level || 1);
    setEditRole(u.role || 'student');
    setEditStreak(u.streak || 1);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    try {
      await adminApi.updateUser(editingUser._id, {
        xp: editXp,
        level: editLevel,
        role: editRole,
        streak: editStreak,
      });
      showToast({
        title: 'Player Updated',
        message: `${editingUser.name}'s stats were updated in God Mode.`,
        icon: '⚡',
        type: 'badge',
      });
      setEditingUser(null);
      loadData();
    } catch (err) {
      showToast({ title: 'Update failed', message: err.message, type: 'error' });
    }
  };

  const handleDeleteUser = async (userId, name) => {
    if (!window.confirm(`Are you sure you want to completely PURGE ${name} from the database?`)) return;
    try {
      await adminApi.deleteUser(userId);
      showToast({ title: 'User Purged', message: `${name} was deleted.`, icon: '🗑️' });
      loadData();
    } catch (err) {
      showToast({ title: 'Deletion failed', message: err.message, type: 'error' });
    }
  };

  const handleToggleQuizStatus = async (quizId, currentStatus) => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      await adminApi.toggleQuizStatus(quizId, nextStatus);
      showToast({
        title: 'Challenge Status Changed',
        message: `Set to ${nextStatus.toUpperCase()}`,
        icon: '⚔️',
      });
      loadData();
    } catch (err) {
      showToast({ title: 'Action failed', message: err.message, type: 'error' });
    }
  };

  const handleDeleteQuiz = async (quizId, title) => {
    if (!window.confirm(`Delete challenge "${title}" and all its questions?`)) return;
    try {
      await adminApi.deleteQuiz(quizId);
      showToast({ title: 'Challenge Deleted', message: `Purged "${title}".`, icon: '🗑️' });
      loadData();
    } catch (err) {
      showToast({ title: 'Deletion failed', message: err.message, type: 'error' });
    }
  };

  const handleDismissReports = async (questionId) => {
    try {
      await adminApi.dismissQuestionReports(questionId);
      showToast({ title: 'Reports Dismissed', message: 'Question verified and reports cleared.', icon: '✅' });
      loadData();
    } catch (err) {
      showToast({ title: 'Action failed', message: err.message, type: 'error' });
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Are you sure you want to permanently delete this question?')) return;
    try {
      await adminApi.deleteQuestion(questionId);
      showToast({ title: 'Question Purged', message: 'Question was removed.', icon: '🗑️' });
      loadData();
    } catch (err) {
      showToast({ title: 'Deletion failed', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="god-mode-page wrap" style={{ padding: '40px 0 80px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              className="badge"
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                fontSize: '0.74rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <ShieldAlert size={14} /> CLASSIFIED // GOD MODE
            </span>
            <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              SUPREME ARCHITECT CONSOLE
            </span>
          </div>
          <h1 style={{ fontSize: '2.4rem', margin: 0, letterSpacing: '-0.02em' }}>
            System Command Center
          </h1>
        </div>

        <button
          type="button"
          onClick={loadData}
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={14} />
          <span>Sync Telemetry</span>
        </button>
      </div>

      {/* Telemetry Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '36px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span className="mono" style={{ fontSize: '0.74rem' }}>REGISTERED PLAYERS</span>
            <Users size={16} color="var(--lime)" />
          </div>
          <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--lime)' }}>
            {stats?.totalUsers || 0}
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span className="mono" style={{ fontSize: '0.74rem' }}>CHALLENGES</span>
            <Swords size={16} color="#38bdf8" />
          </div>
          <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#38bdf8' }}>
            {stats?.publishedQuizzes || 0} / {stats?.totalQuizzes || 0}
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span className="mono" style={{ fontSize: '0.74rem' }}>VERIFIED QUESTIONS</span>
            <CheckCircle size={16} color="#a855f7" />
          </div>
          <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#a855f7' }}>
            {stats?.totalQuestions || 0}
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span className="mono" style={{ fontSize: '0.74rem' }}>REPORTED ISSUES</span>
            <Flag size={16} color="#ef4444" />
          </div>
          <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: (stats?.reportedQuestionsCount || 0) > 0 ? '#ef4444' : 'var(--text-muted)' }}>
            {stats?.reportedQuestionsCount || 0}
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span className="mono" style={{ fontSize: '0.74rem' }}>CIRCULATING XP</span>
            <Zap size={16} color="#f59e0b" />
          </div>
          <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f59e0b' }}>
            {(stats?.totalXp || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`btn btn-sm ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('users')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Users size={14} />
          <span>Contenders Directory ({users.length})</span>
        </button>

        <button
          type="button"
          className={`btn btn-sm ${activeTab === 'quizzes' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('quizzes')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Swords size={14} />
          <span>Challenge Moderation ({quizzes.length})</span>
        </button>

        <button
          type="button"
          className={`btn btn-sm ${activeTab === 'questions' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('questions')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Flag size={14} />
          <span>Question Feedback & Reports ({stats?.reportedQuestionsCount || 0})</span>
        </button>
      </div>

      {/* Tab 1: Users */}
      {activeTab === 'users' && (
        <div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <input
                type="text"
                placeholder="Filter player by name or email..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '36px' }}
              />
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255, 255, 255, 0.02)' }}>
                  <th style={{ padding: '14px 18px' }}>PLAYER</th>
                  <th style={{ padding: '14px 18px' }}>EMAIL</th>
                  <th style={{ padding: '14px 18px' }}>ROLE</th>
                  <th style={{ padding: '14px 18px' }}>LEVEL / XP</th>
                  <th style={{ padding: '14px 18px' }}>STREAK</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isThisUserFounder = u.email === 'abiynahom570@gmail.com';

                  return (
                    <tr key={u._id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>{u.name}</td>
                      <td className="mono" style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {u.email}
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        {isThisUserFounder ? (
                          <span
                            className="badge"
                            style={{
                              textTransform: 'uppercase',
                              fontSize: '0.66rem',
                              background: 'rgba(245, 158, 11, 0.15)',
                              color: '#f59e0b',
                              border: '1px solid rgba(245, 158, 11, 0.4)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              fontWeight: 700,
                            }}
                          >
                            <Crown size={12} color="#f59e0b" /> SUPREME FOUNDER
                          </span>
                        ) : (
                          <span
                            className="badge"
                            style={{
                              textTransform: 'uppercase',
                              fontSize: '0.66rem',
                              background:
                                u.role === 'admin'
                                  ? 'rgba(239, 68, 68, 0.15)'
                                  : u.role === 'author' || u.role === 'teacher'
                                  ? 'rgba(56, 189, 248, 0.15)'
                                  : 'rgba(255,255,255,0.06)',
                              color:
                                u.role === 'admin'
                                  ? '#ef4444'
                                  : u.role === 'author' || u.role === 'teacher'
                                  ? '#38bdf8'
                                  : 'inherit',
                              border:
                                u.role === 'admin'
                                  ? '1px solid #ef4444'
                                  : u.role === 'author' || u.role === 'teacher'
                                  ? '1px solid rgba(56, 189, 248, 0.4)'
                                  : 'none',
                            }}
                          >
                            {u.role === 'admin'
                              ? 'GOD MODE'
                              : u.role === 'author' || u.role === 'teacher'
                              ? 'CHALLENGE AUTHOR'
                              : 'DEVELOPER'}
                          </span>
                        )}
                      </td>
                      <td className="mono" style={{ padding: '14px 18px', color: 'var(--lime)' }}>
                        LVL {u.level} • {u.xp?.toLocaleString()} XP
                      </td>
                      <td className="mono" style={{ padding: '14px 18px' }}>
                        🔥 {u.streak || 0}
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(u)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '4px 8px' }}
                            title="Modify Stats & Role"
                          >
                            <Edit3 size={13} />
                          </button>
                          {!isThisUserFounder && (
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u._id, u.name)}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '4px 8px', color: '#ef4444' }}
                              title="Purge Player Account"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Quizzes */}
      {activeTab === 'quizzes' && (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255, 255, 255, 0.02)' }}>
                <th style={{ padding: '14px 18px' }}>CHALLENGE TITLE</th>
                <th style={{ padding: '14px 18px' }}>CREATOR</th>
                <th style={{ padding: '14px 18px' }}>STATUS</th>
                <th style={{ padding: '14px 18px' }}>TIER</th>
                <th style={{ padding: '14px 18px' }}>PLAYS</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>MODERATION</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((q) => (
                <tr key={q._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 600 }}>{q.title}</td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-muted)' }}>
                    {q.creatorName || q.teacherId?.name || 'Community'}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span
                      className={`badge ${q.status === 'published' ? 'badge-lime' : 'badge-amber'}`}
                      style={{ fontSize: '0.68rem', textTransform: 'uppercase' }}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', textTransform: 'capitalize' }}>
                    {q.difficulty}
                  </td>
                  <td className="mono" style={{ padding: '14px 18px' }}>
                    {q.playsCount || 0}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleToggleQuizStatus(q._id, q.status)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                      >
                        {q.status === 'published' ? 'Unpublish' : 'Force Publish'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuiz(q._id, q.title)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px', color: '#ef4444' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Questions Quality & Community Reports */}
      {activeTab === 'questions' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className={`btn btn-sm ${questionFilter === 'reported' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setQuestionFilter('reported')}
              >
                Reported / Flagged Only
              </button>
              <button
                type="button"
                className={`btn btn-sm ${questionFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setQuestionFilter('all')}
              >
                All Feedback Telemetry ({questions.length})
              </button>
            </div>
            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Sorted by report priority & community feedback
            </span>
          </div>

          <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255, 255, 255, 0.02)' }}>
                  <th style={{ padding: '14px 18px', width: '35%' }}>QUESTION CONTENT</th>
                  <th style={{ padding: '14px 18px' }}>CHALLENGE</th>
                  <th style={{ padding: '14px 18px' }}>UPVOTES</th>
                  <th style={{ padding: '14px 18px' }}>DOWNVOTES</th>
                  <th style={{ padding: '14px 18px' }}>REPORTS & REASONS</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {questions.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      🎉 Zero questions currently flagged for review! Community quality is clean.
                    </td>
                  </tr>
                ) : (
                  questions.map((q) => (
                    <tr key={q._id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 600, marginBottom: '4px', color: 'var(--text)' }}>
                          {q.question}
                        </div>
                        {q.codeSnippet && (
                          <pre
                            style={{
                              background: '#0d1117',
                              padding: '6px 10px',
                              borderRadius: '4px',
                              fontSize: '0.74rem',
                              color: '#7ee787',
                              margin: 0,
                              maxHeight: '70px',
                              overflowY: 'hidden',
                              border: '1px solid rgba(255,255,255,0.06)',
                            }}
                          >
                            {q.codeSnippet.slice(0, 100)}...
                          </pre>
                        )}
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 600 }}>{q.quizId?.title || 'Unknown Quiz'}</div>
                        <span className="badge" style={{ fontSize: '0.66rem', textTransform: 'capitalize' }}>
                          {q.quizId?.difficulty || 'General'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span className="mono" style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <ThumbsUp size={13} /> {q.upvotes || 0}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span className="mono" style={{ color: (q.downvotes || 0) > 0 ? '#ef4444' : 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <ThumbsDown size={13} /> {q.downvotes || 0}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        {(q.reportsCount || 0) > 0 ? (
                          <div>
                            <span
                              className="badge"
                              style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                color: '#ef4444',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontWeight: 700,
                                marginBottom: '4px',
                              }}
                            >
                              <Flag size={11} /> {q.reportsCount} FLAGGED
                            </span>
                            {q.reports && q.reports.length > 0 && (
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                Latest: &ldquo;{q.reports[q.reports.length - 1]?.reason || 'User report'}&rdquo;
                              </div>
                            )}
                          </div>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Clean</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => setInspectingQuestion(q)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '4px 8px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            title="Inspect Full Question & All Options"
                          >
                            <Eye size={12} /> Inspect
                          </button>
                          {(q.reportsCount || 0) > 0 && (
                            <button
                              type="button"
                              onClick={() => handleDismissReports(q._id)}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                              title="Clear Reports & Mark Verified"
                            >
                              Dismiss
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(q._id)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '4px 8px', color: '#ef4444' }}
                            title="Delete Broken/Toxic Question"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={() => setEditingUser(null)}
        >
          <div
            className="card"
            style={{ width: '100%', maxWidth: '480px', padding: '30px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>⚡ God Mode: Player Override</h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
              Modifying stats for <strong>{editingUser.name}</strong> ({editingUser.email})
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  XP POINTS:
                </label>
                <input
                  type="number"
                  value={editXp}
                  onChange={(e) => setEditXp(e.target.value)}
                  className="input-field mono"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  LEVEL:
                </label>
                <input
                  type="number"
                  value={editLevel}
                  onChange={(e) => setEditLevel(e.target.value)}
                  className="input-field mono"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  STREAK (DAYS):
                </label>
                <input
                  type="number"
                  value={editStreak}
                  onChange={(e) => setEditStreak(e.target.value)}
                  className="input-field mono"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  ROLE CLEARANCE:
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="input-field mono"
                >
                  <option value="developer">Developer (Contender)</option>
                  <option value="author">Challenge Author (Studio Access)</option>
                  {isFounder && <option value="admin">Supreme Admin (God Mode)</option>}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveUser}
                className="btn btn-primary btn-sm"
              >
                Save Overrides
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Full Question & Options Modal */}
      {inspectingQuestion && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={() => setInspectingQuestion(null)}
        >
          <div
            className="card"
            style={{ width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '28px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <div>
                <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--lime)' }}>
                  QUESTION INSPECTION // {inspectingQuestion.quizId?.title || 'Challenge Question'}
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.25rem' }}>Full Question Review</h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingQuestion(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            {/* Question Text */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                FULL QUESTION:
              </label>
              <div style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: '1.5', color: 'var(--text)' }}>
                {inspectingQuestion.question}
              </div>
            </div>

            {/* Code Snippet if present */}
            {inspectingQuestion.codeSnippet && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  CODE SNIPPET:
                </label>
                <pre
                  style={{
                    background: '#0d1117',
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    color: '#7ee787',
                    margin: 0,
                    overflowX: 'auto',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {inspectingQuestion.codeSnippet}
                </pre>
              </div>
            )}

            {/* Options with Correct Answer Indicator */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                OPTIONS & VERIFIED ANSWER KEY:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {inspectingQuestion.options?.map((opt, idx) => {
                  const isCorrect = opt === inspectingQuestion.correctAnswer;
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        background: isCorrect ? 'rgba(200, 255, 55, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                        border: isCorrect ? '1.5px solid var(--lime)' : '1px solid var(--border)',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="mono" style={{ fontWeight: 700, color: isCorrect ? 'var(--lime)' : 'var(--text-muted)' }}>
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span style={{ color: isCorrect ? '#fff' : 'var(--text)' }}>{opt}</span>
                      </div>
                      {isCorrect && (
                        <span className="badge badge-lime" style={{ fontSize: '0.7rem' }}>
                          ✓ Correct Key
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanation if present */}
            {inspectingQuestion.explanation && (
              <div style={{ marginBottom: '20px', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px', borderLeft: '3px solid var(--lime)' }}>
                <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--lime)', display: 'block', marginBottom: '2px' }}>
                  AUTHOR EXPLANATION:
                </span>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                  {inspectingQuestion.explanation}
                </p>
              </div>
            )}

            {/* Community Feedback Stats & Reports */}
            <div style={{ marginBottom: '24px', padding: '14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                <span className="mono" style={{ color: '#10b981', fontSize: '0.84rem' }}>
                  👍 {inspectingQuestion.upvotes || 0} Upvotes
                </span>
                <span className="mono" style={{ color: (inspectingQuestion.downvotes || 0) > 0 ? '#ef4444' : 'var(--text-muted)', fontSize: '0.84rem' }}>
                  👎 {inspectingQuestion.downvotes || 0} Downvotes
                </span>
                <span className="mono" style={{ color: (inspectingQuestion.reportsCount || 0) > 0 ? '#ef4444' : 'var(--text-muted)', fontSize: '0.84rem' }}>
                  🚩 {inspectingQuestion.reportsCount || 0} Reports
                </span>
              </div>

              {inspectingQuestion.reports && inspectingQuestion.reports.length > 0 ? (
                <div>
                  <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    REPORT LOG:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {inspectingQuestion.reports.map((r, rIdx) => (
                      <div key={rIdx} style={{ fontSize: '0.78rem', color: '#fca5a5', background: 'rgba(239, 68, 68, 0.1)', padding: '6px 10px', borderRadius: '4px' }}>
                        • &ldquo;{r.reason}&rdquo; {r.createdAt && <span style={{ opacity: 0.7, fontSize: '0.7rem' }}>({new Date(r.createdAt).toLocaleDateString()})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No report logs recorded for this question.</span>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {(inspectingQuestion.reportsCount || 0) > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    handleDismissReports(inspectingQuestion._id);
                    setInspectingQuestion(null);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Dismiss Reports & Mark Verified
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  handleDeleteQuestion(inspectingQuestion._id);
                  setInspectingQuestion(null);
                }}
                className="btn btn-primary btn-sm"
                style={{ background: '#ef4444', borderColor: '#ef4444', color: '#fff' }}
              >
                Delete Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
