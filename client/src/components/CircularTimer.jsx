import { useState, useEffect } from 'react';

export default function CircularTimer({ totalMinutes = 10, onExpire }) {
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

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.max(0, secondsRemaining / totalSeconds);
  const strokeDashoffset = circumference - progressRatio * circumference;

  let strokeColor = '#c8ff37'; // Lime default
  if (progressRatio < 0.2 || secondsRemaining < 60) {
    strokeColor = '#f87171'; // Rose
  } else if (progressRatio < 0.5) {
    strokeColor = '#fbbf24'; // Amber
  }

  return (
    <div className="circular-timer-wrapper">
      <svg width="82" height="82" className="circular-timer-svg">
        <circle
          cx="41"
          cy="41"
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="4"
          fill="transparent"
        />
        <circle
          cx="41"
          cy="41"
          r={radius}
          stroke={strokeColor}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
        />
      </svg>
      <span className="circular-timer-text" style={{ color: strokeColor }}>
        {formattedTime}
      </span>
    </div>
  );
}
