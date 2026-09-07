import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizApi } from '../services/api';
import { useAuth } from '../context/useAuth';
import { Flame, Zap, Clock, Timer, Swords, RotateCcw } from 'lucide-react';

export default function DailyChallengeCard() {
  const { user } = useAuth();
  const [dailyData, setDailyData] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchDaily = async () => {
      try {
        const res = await quizApi.getDailyChallenge();
        if (mounted) setDailyData(res);
      } catch (err) {
        console.error('Failed to load daily challenge:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDaily();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!dailyData?.timeRemainingMs) return;

    let remaining = dailyData.timeRemainingMs;
    const updateCountdown = () => {
      if (remaining <= 0) {
        setTimeLeft('00h : 00m : 00s');
        return;
      }
      const hours = String(Math.floor((remaining / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const minutes = String(Math.floor((remaining / (1000 * 60)) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((remaining / 1000) % 60)).padStart(2, '0');
      setTimeLeft(`${hours}h : ${minutes}m : ${seconds}s`);
      remaining -= 1000;
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [dailyData]);

  if (loading) {
    return (
      <div className="card" style={{ padding: '30px', textAlign: 'center', marginBottom: '40px' }}>
        <span className="mono" style={{ color: 'var(--lime)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={16} /> Loading daily arena challenge...
        </span>
      </div>
    );
  }

  if (!dailyData || !dailyData.quiz) return null;

  const quiz = dailyData.quiz;
  const streak = user?.streak || dailyData.streak || 1;
  const isCompleted = dailyData.completedToday;

  return (
    <div className="card daily-challenge-card">
      {/* Background Accent glow */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          background: 'rgba(200, 255, 55, 0.1)',
          filter: 'blur(45px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="daily-challenge-grid">
        {/* Left Info Column */}
        <div className="daily-challenge-content">
          <div className="daily-challenge-badges">
            <span
              className="badge badge-lime"
              style={{ padding: '5px 12px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Flame size={14} color="#080b09" />
              DAILY ARENA CHALLENGE
            </span>
            <span
              className="badge"
              style={{
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#f59e0b',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                fontSize: '0.76rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Zap size={13} color="#f59e0b" />
              2.0x DOUBLE XP
            </span>
            <span className="daily-challenge-streak-pill">
              <Flame size={13} color="#fbbf24" />
              {streak} DAY STREAK
            </span>
          </div>

          <h2 className="daily-challenge-title">
            {quiz.title}
          </h2>

          <p className="daily-challenge-desc">
            {quiz.description || 'Solve today’s community battle challenge to keep your streak flame alive and claim double XP points.'}
          </p>

          {/* Metadata chips */}
          <div className="daily-challenge-meta">
            <span className="badge" style={{ textTransform: 'capitalize' }}>
              Tier: {quiz.difficulty || 'mid'}
            </span>
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={13} /> {quiz.timeLimitMinutes || 10} Mins
            </span>
            {(quiz.tags || []).map((t, idx) => (
              <span key={idx} className="mono" style={{ fontSize: '0.75rem', color: 'var(--lime)', background: 'rgba(200,255,55,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Right HUD Action Box */}
        <div className="daily-challenge-hud">
          <div className="daily-challenge-timer-row">
            <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Challenge Resets In:
            </span>
            <div className="daily-challenge-timer-val">
              <Timer size={15} />
              <span>{timeLeft || 'Calculating...'}</span>
            </div>
          </div>

          <Link
            to={`/quiz/${quiz._id}`}
            className="btn btn-primary btn-lg daily-challenge-btn"
          >
            {isCompleted ? (
              <>
                <RotateCcw size={16} />
                <span>Re-battle Daily ✓</span>
              </>
            ) : (
              <>
                <Swords size={18} />
                <span>Enter Daily Challenge ↗</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
