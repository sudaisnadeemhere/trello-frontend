import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useEffect } from 'react';

export default function Introduction() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      navigate('/board', { replace: true });
    }
  }, [user, token, navigate]);

  return (
    <div className="intro-page page-transition">
      <nav className="intro-nav">
        <div className="nav-content">
          <h2 className="nav-logo">TaskFlow</h2>
          <div className="nav-links">
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/features" className="nav-link">Features</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/login" className="nav-btn-login">Sign In</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title animate-fadeInDown">
            Manage Your Tasks <span>Beautifully</span>
          </h1>
          <p className="hero-subtitle animate-fadeInUp">
            A modern task management board that helps you organize work, collaborate with your team, and get more done.
          </p>
          <div className="hero-buttons animate-fadeInUp">
            <Link to="/register" className="btn-primary btn-large">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-secondary btn-large">
              Sign In
            </Link>
          </div>
        </div>
        <div className="hero-visual animate-slideInRight">
          <div className="floating-card card-1">
            <div className="card-dot"></div>
            <p>To Do</p>
          </div>
          <div className="floating-card card-2">
            <div className="card-dot"></div>
            <p>In Progress</p>
          </div>
          <div className="floating-card card-3">
            <div className="card-dot"></div>
            <p>Done</p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Why Choose TaskFlow?</h2>
        <div className="features-grid">
          <div className="feature-card animate-fadeInUp">
            <div className="feature-icon">📋</div>
            <h3>Organize Tasks</h3>
            <p>Create, manage, and track your tasks in a beautiful kanban board layout.</p>
          </div>
          <div className="feature-card animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="feature-icon">🎯</div>
            <h3>Stay Focused</h3>
            <p>Keep your team on track with clear task assignments and status updates.</p>
          </div>
          <div className="feature-card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="feature-icon">⚡</div>
            <h3>Real-time Sync</h3>
            <p>Drag and drop tasks to update status instantly across your board.</p>
          </div>
          <div className="feature-card animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="feature-icon">👥</div>
            <h3>Collaborate</h3>
            <p>Assign tasks to team members and track progress together.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of teams already using TaskFlow to manage their work.</p>
        <Link to="/register" className="btn-primary btn-large">
          Start Free Trial
        </Link>
      </section>

      <footer className="footer">
        <p>&copy; 2026 TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}
