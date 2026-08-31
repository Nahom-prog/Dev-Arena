import { useLocation, Link, useParams } from 'react-router-dom';

export default function StudentQuizResult() {
  const { quizId } = useParams();
  const location = useLocation();
  const state = location.state || {};
  const result = state.result || {};
  const quizTitle = state.quizTitle || 'Assessment Results';

  const score = result.score ?? 0;
  const totalQuestions = result.totalQuestions ?? state.totalQuestions ?? 0;
  const percentage = result.percentage ?? (totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0);

  const getTier = (pct) => {
    if (pct >= 80) return { label: 'Mastery Achieved', desc: 'Outstanding performance! You showed exceptional command of the subject.', colorClass: 'tier-mastery' };
    if (pct >= 50) return { label: 'Competent Passed', desc: 'Good job! You demonstrated solid understanding of core concepts.', colorClass: 'tier-passed' };
    return { label: 'Needs Review', desc: 'Practice makes perfect. Review the material and give it another shot.', colorClass: 'tier-review' };
  };

  const tier = getTier(percentage);

  return (
    <div className="result-page wrap">
      <div className="result-card-container">
        <div className="card result-card">
          <span className="eyebrow lime">Evaluation Summary</span>
          <h1 className="result-title">{quizTitle}</h1>

          <div className="score-hero-container">
            <div className={`score-circle ${tier.colorClass}`}>
              <span className="score-percentage mono">{percentage}%</span>
              <span className="score-ratio mono">{score} / {totalQuestions} Correct</span>
            </div>

            <div className="tier-badge-container">
              <span className={`badge ${tier.colorClass}`}>{tier.label}</span>
              <p className="tier-desc">{tier.desc}</p>
            </div>
          </div>

          <div className="result-stats-row">
            <div className="stat-card">
              <span className="eyebrow">Correct Answers</span>
              <strong className="stat-val lime">{score}</strong>
            </div>
            <div className="stat-card">
              <span className="eyebrow">Incorrect / Missed</span>
              <strong className="stat-val rose">{Math.max(0, totalQuestions - score)}</strong>
            </div>
            <div className="stat-card">
              <span className="eyebrow">Total Questions</span>
              <strong className="stat-val">{totalQuestions}</strong>
            </div>
          </div>

          <div className="result-actions">
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Return to Quiz Arena ↗
            </Link>
            <Link to={`/quiz/${quizId}`} className="btn btn-secondary btn-lg">
              Retake Assessment ↺
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
