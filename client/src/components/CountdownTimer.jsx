import { useState, useEffect } from 'react';

export default function CountdownTimer({ totalMinutes = 10, onExpire }) {
  const totalSeconds = totalMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      if (onExpire) onExpire();
      return;
    }

    const timerId = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsRemaining, onExpire]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isUrgent = secondsRemaining < 60;
  const progressPercent = Math.max(0, (secondsRemaining / totalSeconds) * 100);

  return (
    <div className={`countdown-container ${isUrgent ? 'urgent' : ''}`}>
      <div className="countdown-display">
        <span className="mono timer-digits">{formattedTime}</span>
        <span className="eyebrow timer-label">{isUrgent ? 'Hurry up!' : 'Remaining'}</span>
      </div>
      <div className="countdown-track">
        <div
          className="countdown-fill"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: isUrgent ? 'var(--rose)' : 'var(--lime)',
          }}
        />
      </div>
    </div>
  );
}
