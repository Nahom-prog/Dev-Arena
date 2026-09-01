import { createContext, useContext, useState, useCallback } from 'react';
import { playBadgeUnlockSound, playLevelUpSound } from '../utils/soundEffects';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({ title, message, icon = '✨', type = 'info', duration = 5000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, title, message, icon, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const showBadgeToast = useCallback((badge) => {
    playBadgeUnlockSound();
    showToast({
      title: 'Achievement Unlocked!',
      message: `${badge.icon || '🏅'} ${badge.name} — ${badge.description}`,
      icon: badge.icon || '🏆',
      type: 'badge',
      duration: 6000,
    });
  }, [showToast]);

  const showLevelUpToast = useCallback((level, xp) => {
    playLevelUpSound();
    showToast({
      title: `Rank Up! Reached LVL 0${level}`,
      message: `You earned ${xp} XP and advanced to the next developer tier!`,
      icon: '⚡',
      type: 'levelup',
      duration: 6000,
    });
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, showBadgeToast, showLevelUpToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-card toast-${toast.type}`}>
            <div className="toast-icon">{toast.icon}</div>
            <div className="toast-body">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-msg">{toast.message}</div>
            </div>
            <button
              type="button"
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
