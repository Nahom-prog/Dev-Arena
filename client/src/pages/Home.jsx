import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, isTeacher } = useAuth();

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="wrap">
          <div className="hero-top-badge">
            <span className="eyebrow lime">Next-Gen Evaluation Engine</span>
            <span className="live-pill">
              <i className="live-dot"></i> Live Testing Online
            </span>
          </div>

          <h1 className="home-headline">
            Evaluate knowledge.<br />
            Measure <span className="serif">mastery.</span>
          </h1>

          <div className="home-hero-grid">
            <p className="home-intro">
              A full-stack interactive assessment platform. Create custom tests with automated evaluation, or enter timed challenge rooms to prove your expertise.
            </p>

            <div className="home-cta-group">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Go to {isTeacher ? 'Teacher Studio' : 'Quiz Arena'} ↗
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Get Started Free ↗
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-lg">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Roles Feature Breakdown */}
      <section className="home-features">
        <div className="wrap">
          <div className="section-label">
            <h2>(01) Platform Capabilities</h2>
            <span>Engineered for seamless assessment workflows between educators and students.</span>
          </div>

          <div className="grid-2">
            <div className="card role-card teacher-highlight">
              <div className="role-card-header">
                <span className="eyebrow">For Educators & Creators</span>
                <span className="role-tag">Teacher Studio</span>
              </div>
              <h3>Author & Publish Quizzes</h3>
              <p>
                Draft multi-question tests with custom time limits, configure multiple-choice options, and publish assessments directly to students with 1-click.
              </p>
              <ul className="role-bullets">
                <li>✓ Configurable time limits & deadlines</li>
                <li>✓ Dynamic 4-option question builder</li>
                <li>✓ Instant publish & draft management</li>
              </ul>
              {isAuthenticated && isTeacher ? (
                <Link to="/create-quiz" className="btn btn-primary btn-sm role-cta">
                  Create a Quiz ↗
                </Link>
              ) : (
                <Link to="/register" className="btn btn-secondary btn-sm role-cta">
                  Register as Teacher ↗
                </Link>
              )}
            </div>

            <div className="card role-card student-highlight">
              <div className="role-card-header">
                <span className="eyebrow">For Learners & Candidates</span>
                <span className="role-tag">Student Arena</span>
              </div>
              <h3>Challenge & Test Skills</h3>
              <p>
                Take timed quizzes under real-world conditions. Enjoy live countdown timers, slick question pagination, and instantaneous score calculations.
              </p>
              <ul className="role-bullets">
                <li>✓ Live ticking countdown clock with auto-submit</li>
                <li>✓ Distraction-free exam room interface</li>
                <li>✓ Instant percentage scores & accuracy grades</li>
              </ul>
              <Link to="/dashboard" className="btn btn-primary btn-sm role-cta">
                Browse Quizzes ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Ticker */}
      <div className="home-ticker">
        <div className="wrap ticker-content mono">
          <span>• EXPRESS & NODE.JS REST API</span>
          <span>• MONGODB PERSISTENCE</span>
          <span>• JWT AUTHENTICATION</span>
          <span>• REAL-TIME TIMERS</span>
          <span>• AUTO-SCORE COMPUTATION</span>
        </div>
      </div>
    </div>
  );
}
