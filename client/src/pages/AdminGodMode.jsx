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
  Activity,
  Clock,
  Send,
  Ban,
  History,
  Shield,
  ExternalLink,
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

  // Forensic Dossier & Inquisition State
  const [inspectingDossier, setInspectingDossier] = useState(null);
  const [loadingDossier, setLoadingDossier] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [warningSeverity, setWarningSeverity] = useState('strike');
  const [sendingWarning, setSendingWarning] = useState(false);

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
      if (inspectingDossier?.user?._id === userId) {
        setInspectingDossier(null);
      }
      loadData();
    } catch (err) {
      showToast({ title: 'Deletion failed', message: err.message, type: 'error' });
    }
  };

  const handleOpenDossier = async (u) => {
    setLoadingDossier(true);
    try {
      const res = await adminApi.getUserDossier(u._id);
      setInspectingDossier(res.dossier);
      const isSuspicious = res.dossier.telemetry?.isSuspiciousSpeed;
      const pace = res.dossier.telemetry?.avgSecondsPerQuestion;
      const attempts = res.dossier.telemetry?.totalAttempts;
      setWarningMessage(
        isSuspicious
          ? `⚠️ PLATFORM FAIR-PLAY STRIKE 1:\nOur telemetry flagged irregular solve velocity (~${pace}s/question across ${attempts} challenges). The use of external LLM automation, ChatGPT speed-running, or answer scripts is barred on competitive leaderboards. Continued violations will result in permanent database deletion and forfeiture of all ranks.`
          : `⚠️ PLATFORM GOVERNANCE WARNING:\nYour account activity has been flagged for administrative review. Please adhere strictly to competitive fair-play standards.`
      );
      setWarningSeverity(isSuspicious ? 'strike' : 'warning');
    } catch (err) {
      showToast({ title: 'Failed to load dossier', message: err.message, type: 'error' });
    } finally {
      setLoadingDossier(false);
    }
  };

  const handleIssueWarning = async () => {
    if (!inspectingDossier || !warningMessage.trim()) return;
    setSendingWarning(true);
    try {
      const res = await adminApi.issueWarning(inspectingDossier.user._id, {
        message: warningMessage.trim(),
        severity: warningSeverity,
      });
      showToast({
        title: 'Directive Dispatched',
        message: res.message,
        icon: '🚨',
        type: 'badge',
      });
      const updated = await adminApi.getUserDossier(inspectingDossier.user._id);
      setInspectingDossier(updated.dossier);
      loadData();
    } catch (err) {
      showToast({ title: 'Dispatch failed', message: err.message, type: 'error' });
    } finally {
      setSendingWarning(false);
    }
  };

  const handleClearWarnings = async () => {
    if (!inspectingDossier) return;
    if (!window.confirm(`Pardon and clear all disciplinary strikes for ${inspectingDossier.user.name}?`)) return;
    try {
      await adminApi.clearWarnings(inspectingDossier.user._id);
      showToast({ title: 'Record Cleared', message: 'Disciplinary warnings pardoned.', icon: '🕊️' });
      const updated = await adminApi.getUserDossier(inspectingDossier.user._id);
      setInspectingDossier(updated.dossier);
      loadData();
    } catch (err) {
      showToast({ title: 'Action failed', message: err.message, type: 'error' });
    }
  };

  const handleResetUserXp = async (targetXp = 0) => {
    if (!inspectingDossier) return;
    if (!window.confirm(`Reset ${inspectingDossier.user.name}'s XP to ${targetXp} and recalibrate their leaderboard ranking?`)) return;
    try {
      await adminApi.resetUserXp(inspectingDossier.user._id, { newXp: targetXp });
      showToast({ title: 'XP Calibrated', message: `XP adjusted to ${targetXp}.`, icon: '⚡' });
      const updated = await adminApi.getUserDossier(inspectingDossier.user._id);
      setInspectingDossier(updated.dossier);
      loadData();
    } catch (err) {
      showToast({ title: 'Action failed', message: err.message, type: 'error' });
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
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => handleOpenDossier(u)}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              fontWeight: 600,
                              color: '#fff',
                              cursor: 'pointer',
                              textAlign: 'left',
                              textDecoration: 'underline dotted rgba(255,255,255,0.4)',
                            }}
                            title="Click to inspect player dossier & telemetry"
                          >
                            {u.name}
                          </button>
                          {u.systemWarnings && u.systemWarnings.length > 0 && (
                            <span
                              className="badge"
                              style={{
                                fontSize: '0.62rem',
                                padding: '2px 6px',
                                background: 'rgba(239, 68, 68, 0.2)',
                                color: '#ef4444',
                                border: '1px solid #ef4444',
                              }}
                              title={`${u.systemWarnings.length} active warning(s)`}
                            >
                              ⚠️ {u.systemWarnings.length} {u.systemWarnings.length === 1 ? 'STRIKE' : 'STRIKES'}
                            </span>
                          )}
                        </div>
                      </td>
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
                            onClick={() => handleOpenDossier(u)}
                            className="btn btn-secondary btn-sm"
                            style={{
                              padding: '4px 8px',
                              color: u.systemWarnings && u.systemWarnings.length > 0 ? '#ef4444' : 'var(--lime)',
                              borderColor: u.systemWarnings && u.systemWarnings.length > 0 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(200, 255, 55, 0.3)',
                              background: u.systemWarnings && u.systemWarnings.length > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(200, 255, 55, 0.05)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                            title="Inspect Player Forensic Dossier"
                          >
                            <ShieldAlert size={13} />
                            <span>Dossier</span>
                          </button>
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

      {/* Forensic Dossier & Inquisition Modal */}
      {inspectingDossier && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '880px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#0d1017',
              border: inspectingDossier.telemetry?.isSuspiciousSpeed ? '1.5px solid #ef4444' : '1px solid var(--border)',
              boxShadow: inspectingDossier.telemetry?.isSuspiciousSpeed ? '0 0 50px rgba(239, 68, 68, 0.25)' : '0 20px 40px rgba(0,0,0,0.6)',
              padding: '28px',
              borderRadius: '16px',
            }}
          >
            {/* Dossier Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: inspectingDossier.telemetry?.isSuspiciousSpeed ? 'rgba(239,68,68,0.2)' : 'rgba(200,255,55,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: inspectingDossier.telemetry?.isSuspiciousSpeed ? '#ef4444' : 'var(--lime)',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                  }}
                >
                  {inspectingDossier.user.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="mono" style={{ fontSize: '0.72rem', letterSpacing: '1px', color: '#94a3b8', textTransform: 'uppercase' }}>
                      SECURITY DOSSIER // UID: {inspectingDossier.user._id?.slice(-8)}
                    </span>
                    {inspectingDossier.telemetry?.isSuspiciousSpeed && (
                      <span className="badge" style={{ background: '#ef4444', color: '#fff', fontSize: '0.65rem', fontWeight: 800 }}>
                        🚨 ANOMALOUS SOLVE VELOCITY
                      </span>
                    )}
                  </div>
                  <h2 style={{ margin: '4px 0 0 0', fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {inspectingDossier.user.name}
                    {inspectingDossier.user.country === 'Ethiopia' && <span title="Ethiopian Developer">🇪🇹</span>}
                  </h2>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <span>{inspectingDossier.user.email}</span>
                    <span>•</span>
                    <span style={{ textTransform: 'capitalize' }}>Role: {inspectingDossier.user.role}</span>
                    <span>•</span>
                    <span>Joined: {new Date(inspectingDossier.user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInspectingDossier(null)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '6px 12px' }}
              >
                Close
              </button>
            </div>

            {/* Telemetry Metric Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  ACCURACY & VOLUME
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--lime)' }}>
                  {inspectingDossier.telemetry.accuracy}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {inspectingDossier.telemetry.totalScore} / {inspectingDossier.telemetry.totalQuestionsAttempted} answers ({inspectingDossier.telemetry.totalAttempts} challenges)
                </span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  XP & STANDING
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                  {inspectingDossier.user.xp?.toLocaleString()} XP
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Level {inspectingDossier.user.level} • Streak: {inspectingDossier.user.streak || 0}d
                </span>
              </div>

              <div
                style={{
                  background: inspectingDossier.telemetry.isSuspiciousSpeed ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255,255,255,0.02)',
                  border: inspectingDossier.telemetry.isSuspiciousSpeed ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '14px',
                }}
              >
                <span style={{ fontSize: '0.72rem', color: inspectingDossier.telemetry.isSuspiciousSpeed ? '#ef4444' : 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: inspectingDossier.telemetry.isSuspiciousSpeed ? 700 : 400 }}>
                  SOLVE VELOCITY
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: inspectingDossier.telemetry.isSuspiciousSpeed ? '#ef4444' : '#38bdf8' }}>
                  ~{inspectingDossier.telemetry.avgSecondsPerQuestion || '--'}s / question
                </div>
                <span style={{ fontSize: '0.75rem', color: inspectingDossier.telemetry.isSuspiciousSpeed ? '#fca5a5' : '#94a3b8' }}>
                  {inspectingDossier.telemetry.avgGapSeconds ? `Avg ~${inspectingDossier.telemetry.avgGapSeconds}s / challenge` : 'First session'}
                </span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  DISCIPLINARY RECORD
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: inspectingDossier.warnings?.length > 0 ? '#ef4444' : '#10b981' }}>
                  {inspectingDossier.warnings?.length || 0} Strikes
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {inspectingDossier.warnings?.filter(w => !w.acknowledged).length || 0} unacknowledged
                </span>
              </div>
            </div>

            {/* Authoritarian Disciplinary Command Station */}
            <div
              style={{
                background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.06) 0%, rgba(0,0,0,0.3) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldAlert size={18} color="#ef4444" />
                  <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Dispatch Authoritarian Governance Directive / Warning
                  </h3>
                </div>
                {inspectingDossier.warnings?.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearWarnings}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '3px 8px', color: '#10b981' }}
                  >
                    Pardon / Clear All Strikes
                  </button>
                )}
              </div>

              {/* Severity selection & quick presets */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>SEVERITY:</span>
                {['warning', 'strike', 'final_warning'].map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setWarningSeverity(sev)}
                    className="btn btn-sm"
                    style={{
                      fontSize: '0.72rem',
                      padding: '3px 8px',
                      background: warningSeverity === sev ? (sev === 'warning' ? '#f59e0b' : '#ef4444') : 'rgba(255,255,255,0.05)',
                      color: warningSeverity === sev ? '#000' : 'inherit',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {sev.replace('_', ' ')}
                  </button>
                ))}

                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginLeft: '12px' }}>PRESETS:</span>
                <button
                  type="button"
                  onClick={() => {
                    setWarningSeverity('strike');
                    setWarningMessage(
                      `⚠️ PLATFORM FAIR-PLAY STRIKE 1:\nOur telemetry flagged irregular solve velocity (~${inspectingDossier.telemetry?.avgSecondsPerQuestion || 12}s/question across ${inspectingDossier.telemetry?.totalAttempts} challenges). External LLM automation, ChatGPT speed-running, or answer scripts are barred on competitive leaderboards. Continued violations will result in permanent database deletion and forfeiture of all ranks.`
                    );
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                >
                  ⚡ AI Velocity Strike
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWarningSeverity('warning');
                    setWarningMessage(
                      `⚠️ FAIR PLAY & REPUTATION NOTICE:\nYour account activity has triggered anti-cheat rate warnings. Dev Arena is a competitive arena designed for authentic developer skill. Please complete challenges at normal problem-solving speeds.`
                    );
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                >
                  ⚖️ Fair Play Notice
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWarningSeverity('final_warning');
                    setWarningMessage(
                      `🚨 FINAL EXPULSION NOTICE:\nThis is your absolute final warning. Continued unfair-play telemetry will result in immediate database purging, leaderboard removal, and credential disqualification.`
                    );
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.72rem', padding: '3px 8px', color: '#ef4444' }}
                >
                  🚨 Final Expulsion Notice
                </button>
              </div>

              <textarea
                rows={4}
                value={warningMessage}
                onChange={(e) => setWarningMessage(e.target.value)}
                placeholder="Write the exact directive or warning message that will be forced onto the player's screen upon login..."
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '0.88rem',
                  color: '#f8fafc',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  marginBottom: '12px',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={handleIssueWarning}
                    disabled={sendingWarning || !warningMessage.trim()}
                    className="btn btn-primary btn-sm"
                    style={{
                      background: warningSeverity === 'warning' ? '#f59e0b' : '#ef4444',
                      color: '#000',
                      border: 'none',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Send size={14} />
                    {sendingWarning ? 'Dispatching...' : `Dispatch ${warningSeverity.toUpperCase()}`}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleResetUserXp(0)}
                    className="btn btn-secondary btn-sm"
                    style={{
                      color: '#f59e0b',
                      borderColor: 'rgba(245, 158, 11, 0.4)',
                      background: 'rgba(245, 158, 11, 0.05)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    title="Strip unearned XP and reset leaderboard position"
                  >
                    <Zap size={13} />
                    Reset XP to 0
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(inspectingDossier.user._id, inspectingDossier.user.name)}
                    className="btn btn-secondary btn-sm"
                    style={{
                      color: '#ef4444',
                      borderColor: 'rgba(239, 68, 68, 0.4)',
                      background: 'rgba(239, 68, 68, 0.08)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    title="Completely purge this account"
                  >
                    <Trash2 size={13} />
                    Terminate Account
                  </button>
                </div>
              </div>

              {/* Existing Disciplinary Warnings Log */}
              {inspectingDossier.warnings && inspectingDossier.warnings.length > 0 && (
                <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                    DISCIPLINARY RECORD ON FILE ({inspectingDossier.warnings.length}):
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {inspectingDossier.warnings.map((w, wIdx) => (
                      <div
                        key={wIdx}
                        style={{
                          fontSize: '0.78rem',
                          background: 'rgba(0,0,0,0.4)',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          borderLeft: w.severity === 'warning' ? '3px solid #f59e0b' : '3px solid #ef4444',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <span style={{ fontWeight: 700, color: w.severity === 'warning' ? '#f59e0b' : '#ef4444', textTransform: 'uppercase', marginRight: '8px' }}>
                            [{w.severity}]
                          </span>
                          <span style={{ color: '#e2e8f0' }}>{w.message}</span>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: w.acknowledged ? '#10b981' : '#f59e0b', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                          {w.acknowledged ? '✓ Acknowledged' : '⏳ Pending Display'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Forensic Timeline of All Attempts */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <History size={16} color="var(--lime)" />
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>
                    Complete Attempt Timeline ({inspectingDossier.attempts?.length || 0})
                  </h3>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Chronological Sequence (Latest First)
                </span>
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                      <th style={{ padding: '8px 12px' }}>#</th>
                      <th style={{ padding: '8px 12px' }}>CHALLENGE</th>
                      <th style={{ padding: '8px 12px' }}>SCORE</th>
                      <th style={{ padding: '8px 12px' }}>XP</th>
                      <th style={{ padding: '8px 12px' }}>SOLVE GAP</th>
                      <th style={{ padding: '8px 12px', textAlign: 'right' }}>DATE / TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspectingDossier.attempts?.map((att, attIdx) => (
                      <tr key={attIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td className="mono" style={{ padding: '8px 12px', color: '#64748b' }}>
                          {inspectingDossier.attempts.length - attIdx}
                        </td>
                        <td style={{ padding: '8px 12px', fontWeight: 500, color: '#f8fafc' }}>
                          {att.quizTitle}
                        </td>
                        <td className="mono" style={{ padding: '8px 12px', color: att.percentage === 100 ? 'var(--lime)' : '#f59e0b' }}>
                          {att.score}/{att.totalQuestions} ({att.percentage}%)
                        </td>
                        <td className="mono" style={{ padding: '8px 12px', color: 'var(--lime)' }}>
                          +{att.xpEarned}
                        </td>
                        <td className="mono" style={{ padding: '8px 12px' }}>
                          {att.gapSeconds !== null ? (
                            <span
                              style={{
                                color: att.gapSeconds < 30 ? '#ef4444' : att.gapSeconds < 60 ? '#f59e0b' : '#94a3b8',
                                fontWeight: att.gapSeconds < 30 ? 700 : 400,
                              }}
                            >
                              +{att.gapSeconds}s {att.gapSeconds < 30 && '⚡'}
                            </span>
                          ) : (
                            <span style={{ color: '#64748b' }}>First in run</span>
                          )}
                        </td>
                        <td className="mono" style={{ padding: '8px 12px', textAlign: 'right', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {new Date(att.date).toLocaleDateString()} {new Date(att.date).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
