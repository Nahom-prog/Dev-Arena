import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useToast } from '../context/ToastContext';
import { authApi } from '../services/api';

const ALL_DEV_BADGES = [
  {
    id: 'first_commit',
    title: 'First Commit',
    icon: '🚀',
    desc: 'Completed your first developer challenge in the arena.',
  },
  {
    id: 'bug_squasher',
    title: 'Bug Squasher',
    icon: '🐛',
    desc: 'Scored a perfect 100% on any published evaluation.',
  },
  {
    id: 'senior_mindset',
    title: 'Senior Mindset',
    icon: '🧠',
    desc: 'Conquered a Hard or Very Hard developer challenge.',
  },
  {
    id: 'accuracy_sniper',
    title: 'Accuracy Sniper',
    icon: '🎯',
    desc: 'Maintained a 90%+ accuracy rating across 3+ assessments.',
  },
  {
    id: 'level_5_elite',
    title: '10x Engineer',
    icon: '👑',
    desc: 'Reached Contender Level 5 in the Developer Arena.',
  },
  {
    id: 'open_source_hero',
    title: 'Open Source Hero',
    icon: '🛠️',
    desc: 'Published a community challenge for other devs to solve.',
  },
  {
    id: 'arena_gladiator',
    title: 'Arena Gladiator',
    icon: '⚔️',
    desc: 'Completed 10+ developer knowledge assessments.',
  },
  {
    id: 'streak_warrior',
    title: 'Streak Warrior',
    icon: '🔥',
    desc: 'Maintained a 3+ day streak of coding trivia.',
  },
];

export default function Profile() {
  const { user: authUser, refreshUser } = useAuth();
  const { showBadgeToast, showLevelUpToast } = useToast();
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
  const level = user.level || 1;
  const xp = user.xp || 0;
  const xpInCurrentLevel = xp % 250;
  const xpProgressPct = Math.min(Math.round((xpInCurrentLevel / 250) * 100), 100);

  const earnedBadgeIds = new Set((user.badges || []).map((b) => b.id));
  const canCreate =
    user.canCreateQuiz ||
    level >= 3 ||
    (user.quizzesTaken || 0) >= 3 ||
    user.role === 'admin' ||
    user.role === 'teacher';

  const quizzesNeeded = Math.max(0, 3 - (user.quizzesTaken || 0));

  const handleTestNotification = () => {
    showBadgeToast({
      name: 'Bug Squasher',
      icon: '🐛',
      description: 'Scored a perfect 100% on a challenge!',
    });
    setTimeout(() => {
      showLevelUpToast(level + 1, 250);
    }, 1200);
  };

  return (
    <div className="profile-page wrap" style={{ padding: '50px 0' }}>
      <div className="section-label">
        <div>
          <span className="eyebrow lime">DEVELOPER DOSSIER</span>
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
            <button
              type="button"
              onClick={handleTestNotification}
              className="btn btn-secondary btn-sm"
              title="Click to preview the badge alert animation"
            >
              🔔 Test Toast
            </button>
            <Link to="/quizzes" className="btn btn-primary btn-sm">
              ⚔️ Arena Challenges
            </Link>
            <Link to="/practice" className="btn btn-secondary btn-sm">
              ⚡ Quick Warm-Up
            </Link>
          </div>
        </div>


        {/* XP Progress Bar */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '8px' }}>
            <span className="mono" style={{ color: 'var(--lime)' }}>
              Level {String(level).padStart(2, '0')} ➔ Level {String(level + 1).padStart(2, '0')}
            </span>
            <span className="mono" style={{ color: 'var(--text-muted)' }}>
              {xpInCurrentLevel} / 250 XP to next level (Total: {xp.toLocaleString()} XP)
            </span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '100px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${xpProgressPct}%`,
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
              <span style={{ fontSize: '1.2rem' }}>{canCreate ? '🛠️' : '🔒'}</span>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                {canCreate ? 'Challenge Creator Clearance Unlocked' : 'Creator Mode Locked'}
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              {canCreate
                ? 'You have earned the privileges to author and publish community challenges for all developers.'
                : `Complete ${quizzesNeeded} more assessment${quizzesNeeded > 1 ? 's' : ''} or reach Level 3 to unlock community challenge creation.`}
            </p>
          </div>
          {canCreate ? (
            <Link to="/create-quiz" className="btn btn-primary btn-sm">
              + Author Challenge
            </Link>
          ) : (
            <div className="badge badge-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              Progress: {user.quizzesTaken || 0}/3 Completed (LVL {level})
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid-4" style={{ marginBottom: '40px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <span className="eyebrow">Assessments Taken</span>
          <h3 style={{ fontSize: '1.8rem', marginTop: '4px', fontFamily: 'DM Mono' }}>
            {user.quizzesTaken || 0}
          </h3>
        </div>
        <div className="card" style={{ padding: '20px' }}>
          <span className="eyebrow lime">Accuracy Rating</span>
          <h3 style={{ fontSize: '1.8rem', marginTop: '4px', fontFamily: 'DM Mono', color: 'var(--lime)' }}>
            {user.accuracyRating || '0.0%'}
          </h3>
        </div>
        <div className="card" style={{ padding: '20px' }}>
          <span className="eyebrow">Arena Rank</span>
          <h3 style={{ fontSize: '1.8rem', marginTop: '4px', fontFamily: 'DM Mono' }}>
            {user.arenaRank || '#--'}
          </h3>
        </div>
        <div className="card" style={{ padding: '20px' }}>
          <span className="eyebrow">Active Streak</span>
          <h3 style={{ fontSize: '1.8rem', marginTop: '4px', fontFamily: 'DM Mono', color: 'var(--lime)' }}>
            {user.streak || 1}x
          </h3>
        </div>
      </div>

      {/* Achievements Badges */}
      <div className="section-label">
        <div>
          <span className="eyebrow lime">TROPHIES & MEDALS</span>
          <h2>Developer Achievement Badges</h2>
        </div>
        <span>Unlocked in real-time as you solve challenges, maintain accuracy, and contribute.</span>
      </div>

      <div className="grid-4" style={{ marginBottom: '48px' }}>
        {ALL_DEV_BADGES.map((b) => {
          const isUnlocked = earnedBadgeIds.has(b.id);
          return (
            <article
              key={b.id}
              className="card"
              style={{
                padding: '20px',
                opacity: isUnlocked ? 1 : 0.4,
                borderColor: isUnlocked ? 'rgba(200, 255, 55, 0.4)' : 'var(--border)',
                background: isUnlocked ? 'rgba(200, 255, 55, 0.04)' : 'rgba(255, 255, 255, 0.01)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.8rem' }}>{b.icon}</span>
                <span
                  className="mono"
                  style={{
                    fontSize: '0.68rem',
                    color: isUnlocked ? 'var(--lime)' : 'var(--text-muted)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {isUnlocked ? '✓ UNLOCKED' : 'LOCKED'}
                </span>
              </div>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 6px' }}>{b.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: '1.45', margin: 0 }}>
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

