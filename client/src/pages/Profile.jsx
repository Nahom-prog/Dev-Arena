import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { authApi } from '../services/api';
import { calculateLevelData } from '../utils/levelEngine';
import {
  User,
  Swords,
  Zap,
  Lock,
  Unlock,
  Terminal,
  Bug,
  Brain,
  Crosshair,
  Crown,
  GitBranch,
  Flame,
  Award,
} from 'lucide-react';

const ALL_DEV_BADGES = [
  {
    id: 'first_commit',
    title: 'First Commit',
    icon: <Terminal size={24} color="var(--lime)" />,
    desc: 'Completed your first developer challenge in the arena.',
  },
  {
    id: 'bug_squasher',
    title: 'Bug Squasher',
    icon: <Bug size={24} color="#38bdf8" />,
    desc: 'Scored a perfect 100% on any published evaluation.',
  },
  {
    id: 'senior_mindset',
    title: 'Senior Mindset',
    icon: <Brain size={24} color="#a855f7" />,
    desc: 'Conquered a Hard or Very Hard developer challenge.',
  },
  {
    id: 'accuracy_sniper',
    title: 'Accuracy Sniper',
    icon: <Crosshair size={24} color="#ef4444" />,
    desc: 'Maintained a 90%+ accuracy rating across 3+ assessments.',
  },
  {
    id: 'level_5_elite',
    title: '10x Engineer',
    icon: <Crown size={24} color="#f59e0b" />,
    desc: 'Reached Contender Level 5 in the Developer Arena.',
  },
  {
    id: 'open_source_hero',
    title: 'Open Source Hero',
    icon: <GitBranch size={24} color="#10b981" />,
    desc: 'Published a community challenge for other devs to solve.',
  },
  {
    id: 'arena_gladiator',
    title: 'Arena Gladiator',
    icon: <Swords size={24} color="#f97316" />,
    desc: 'Completed 10+ developer knowledge assessments.',
  },
  {
    id: 'streak_warrior',
    title: 'Streak Warrior',
    icon: <Flame size={24} color="#eab308" />,
    desc: 'Maintained a 3+ day streak of coding trivia.',
  },
];

export default function Profile() {
  const { user: authUser, refreshUser } = useAuth();
  const [profileData, setProfileData] = useState(authUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLatestProfile = async () => {
      try {
        setLoading(true);
        const data = await authApi.getMe();
        setProfileData(data);
        if (refreshUser) refreshUser();
      } catch (err) {
        console.error('Failed to load profile data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProfile();
  }, [refreshUser]);

  const user = profileData || authUser || {};
  const totalXp = user.xp || 0;

  // Progressive level scaling calculation
  const { level, currentLevelXp, xpNeededForNext, progressPct } = calculateLevelData(totalXp);

  const earnedBadgeIds = new Set((user.badges || []).map((b) => b.id));

  // Strict Creator Gate: Must be Level 3+ AND have completed 3+ challenges
  const canCreate =
    ((level >= 3 && (user.quizzesTaken || 0) >= 3)) ||
    user.role === 'admin' ||
    user.role === 'teacher' ||
    user.canCreateQuiz;

  const quizzesNeeded = Math.max(0, 3 - (user.quizzesTaken || 0));

  return (
    <div className="profile-page wrap" style={{ padding: '50px 0' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <User size={14} /> PLAYER PROFILE
          </span>
          <h2>Player Profile & Progression</h2>
        </div>
        <span>Track your XP trajectory, accuracy rating, and verified developer badges.</span>
      </div>

      {/* Profile Header Card */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--lime)' }}>
              DEV CONTENDER • LEVEL {String(level).padStart(2, '0')}
            </span>
            <h1 style={{ fontSize: '2.6rem', margin: '6px 0 4px', letterSpacing: '-0.03em' }}>
              {user.name || 'Developer Contender'}
            </h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.92rem' }}>{user.email}</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/quizzes" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Swords size={14} />
              <span>Arena Challenges</span>
            </Link>
            <Link to="/practice" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} />
              <span>Quick Warm-Up</span>
            </Link>
          </div>
        </div>

        {/* Progressive XP Progress Bar */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '8px' }}>
            <span className="mono" style={{ color: 'var(--lime)' }}>
              Level {String(level).padStart(2, '0')} ➔ Level {String(level + 1).padStart(2, '0')}
            </span>
            <span className="mono" style={{ color: 'var(--text-muted)' }}>
              {currentLevelXp} / {xpNeededForNext} XP to next level (Total: {totalXp.toLocaleString()} XP)
            </span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '100px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #a3e635, var(--lime))',
                borderRadius: '100px',
                transition: 'width 0.5s ease',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Creator Unlock Banner */}
      <div
        className="card"
        style={{
          marginBottom: '32px',
          borderColor: canCreate ? 'rgba(200, 255, 55, 0.4)' : 'rgba(255, 255, 255, 0.1)',
          background: canCreate
            ? 'linear-gradient(135deg, rgba(200, 255, 55, 0.05), rgba(18, 26, 22, 0.95))'
            : 'rgba(18, 26, 22, 0.6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              {canCreate ? <Unlock size={18} color="var(--lime)" /> : <Lock size={18} color="var(--amber)" />}
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                {canCreate ? 'Challenge Creator Clearance Unlocked' : 'Creator Mode Locked'}
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              {canCreate
                ? 'You have earned the privileges to author and publish community challenges for all developers.'
                : `Requires Level 3 and at least 3 completed assessments to unlock community challenge creation.`}
            </p>
          </div>
          {canCreate ? (
            <Link to="/create-quiz" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Swords size={14} />
              <span>Author Challenge</span>
            </Link>
          ) : (
            <div className="badge badge-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              Progress: {user.quizzesTaken || 0}/3 Completed • LVL {level}/3
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary Grid (2x2 Dashboard on Mobile) */}
      <div className="profile-stats-grid" style={{ marginBottom: '40px' }}>
        <div className="card profile-stat-card">
          <span className="eyebrow">Assessments Taken</span>
          <h3 className="profile-stat-val">
            {user.quizzesTaken || 0}
          </h3>
        </div>
        <div className="card profile-stat-card">
          <span className="eyebrow lime">Accuracy Rating</span>
          <h3 className="profile-stat-val" style={{ color: 'var(--lime)' }}>
            {user.accuracyRating || '0.0%'}
          </h3>
        </div>
        <div className="card profile-stat-card">
          <span className="eyebrow">Arena Rank</span>
          <h3 className="profile-stat-val">
            {user.arenaRank || '#--'}
          </h3>
        </div>
        <div className="card profile-stat-card">
          <span className="eyebrow">Active Streak</span>
          <h3 className="profile-stat-val" style={{ color: 'var(--lime)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={18} color="var(--lime)" />
            <span>{user.streak || 1}x</span>
          </h3>
        </div>
      </div>

      {/* Achievements Badges (2-Column Grid on Mobile) */}
      <div className="section-label">
        <div>
          <span className="eyebrow lime" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Award size={14} /> TROPHIES & MEDALS
          </span>
          <h2>Developer Achievement Badges</h2>
        </div>
        <span>Unlocked in real-time as you solve challenges, maintain accuracy, and contribute.</span>
      </div>

      <div className="profile-badges-grid" style={{ marginBottom: '48px' }}>
        {ALL_DEV_BADGES.map((b) => {
          const isUnlocked = earnedBadgeIds.has(b.id);
          return (
            <article
              key={b.id}
              className="card profile-badge-card"
              style={{
                opacity: isUnlocked ? 1 : 0.45,
                borderColor: isUnlocked ? 'rgba(200, 255, 55, 0.4)' : 'var(--border)',
                background: isUnlocked ? 'rgba(200, 255, 55, 0.04)' : 'rgba(255, 255, 255, 0.01)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: isUnlocked ? 'rgba(200, 255, 55, 0.08)' : 'rgba(255, 255, 255, 0.04)' }}>
                  {b.icon}
                </div>
                <span
                  className="mono"
                  style={{
                    fontSize: '0.64rem',
                    color: isUnlocked ? 'var(--lime)' : 'var(--text-muted)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {isUnlocked ? '✓ UNLOCKED' : 'LOCKED'}
                </span>
              </div>
              <h3 className="profile-badge-title" style={{ fontSize: '0.98rem', margin: '0 0 4px' }}>{b.title}</h3>
              <p className="profile-badge-desc" style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: '1.4', margin: 0 }}>
                {b.desc}
              </p>
            </article>
          );
        })}
      </div>

      {/* Recent Match History */}
      {user.recentAttempts && user.recentAttempts.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div className="section-label">
            <div>
              <span className="eyebrow">HISTORY</span>
              <h2>Recent Arena Matches</h2>
            </div>
            <span>Your last 10 completed developer assessment runs.</span>
          </div>

          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Challenge Title</th>
                  <th>Score</th>
                  <th>Accuracy</th>
                  <th>XP Earned</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {user.recentAttempts.map((run, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{run.quizTitle || 'Arena Challenge'}</td>
                    <td className="mono">{run.score} / {run.totalQuestions}</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background: run.percentage >= 80 ? 'rgba(200, 255, 55, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          color: run.percentage >= 80 ? 'var(--lime)' : 'var(--text)',
                        }}
                      >
                        {run.percentage}%
                      </span>
                    </td>
                    <td className="mono" style={{ color: 'var(--lime)' }}>
                      +{run.xpEarned || 0} XP
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(run.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
