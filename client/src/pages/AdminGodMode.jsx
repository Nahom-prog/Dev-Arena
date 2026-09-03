import { useState, useEffect } from 'react';
import { adminApi } from '../services/api';
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
} from 'lucide-react';

export default function AdminGodMode() {
  const { showToast } = useToast();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
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
      const [statsRes, usersRes, quizzesRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getUsers(searchUser),
        adminApi.getQuizzes(),
      ]);
      setStats(statsRes.stats);
      setUsers(usersRes.users || []);
      setQuizzes(quizzesRes.quizzes || []);
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
  }, [searchUser]);

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
      <div className="grid-4" style={{ marginBottom: '36px' }}>
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
            <span className="mono" style={{ fontSize: '0.74rem' }}>PUBLISHED CHALLENGES</span>
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
            <span className="mono" style={{ fontSize: '0.74rem' }}>CIRCULATING XP</span>
            <Zap size={16} color="#f59e0b" />
          </div>
          <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f59e0b' }}>
            {(stats?.totalXp || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
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
                {users.map((u) => (
                  <tr key={u._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>{u.name}</td>
                    <td className="mono" style={{ padding: '14px 18px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {u.email}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
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
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(u._id, u.name)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', color: '#ef4444' }}
                          title="Purge Player Account"
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
                  <option value="admin">Supreme Admin (God Mode)</option>
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
    </div>
  );
}
